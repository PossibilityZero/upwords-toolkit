import { Trie } from '@kamilmielnik/trie';
import { UBFHelper } from './boardUtils.js';
import { IUpwordsPlay, IUpwordsBoardFormat, Coord, PlayDirection } from './boardUtils.js';

interface IMoveResult {
  isValid: boolean;
  points?: number;
  error?: MoveErrorCode;
}
enum MoveErrorCode {
  OutOfBounds,
  HeightLimitExceeded,
  NotConnected,
  HasGap,
  SameTileStacked,
  CoversExistingWord,
  FirstPlayDoesNotCoverCenter,
  InvalidWord,
  OnlyPluralizesWord
}

interface IPlayValidationResult {
  isIllegal: boolean;
  error: MoveErrorCode;
}
class IllegalPlay {
  static validWordsTrie: Trie;
  static init(wordList: string[]): void {
    const validWords = wordList.filter((word) => word.length >= 2);
    this.validWordsTrie = Trie.fromArray(validWords);
  }

  static playOutOfBounds(play: IUpwordsPlay): IPlayValidationResult {
    let isIllegal = false;
    const { tiles, start, direction } = play;
    const length = tiles.trimEnd().length;
    if (start.some((coord) => coord < 0)) {
      isIllegal = true;
    } else if (UBFHelper.offsetCoord(start, direction, length - 1).some((coord) => coord > 9)) {
      isIllegal = true;
    }
    return {
      isIllegal,
      error: MoveErrorCode.OutOfBounds
    };
  }

  static firstPlayDoesNotCoverCenter(
    board: IUpwordsBoardFormat,
    play: IUpwordsPlay
  ): IPlayValidationResult {
    const newBoardState = UBFHelper.placeTiles(board, play);
    // Check whether one of [4, 4], [4, 5], [5, 4], [5, 5] is covered
    let centerCovered = false;
    const centerTiles: Coord[] = [
      [4, 4],
      [4, 5],
      [5, 4],
      [5, 5]
    ];
    for (const [x, y] of centerTiles) {
      if (UBFHelper.getHeightAt(newBoardState, [x, y]) > 0) {
        centerCovered = true;
        break;
      }
    }
    return {
      isIllegal: !centerCovered,
      error: MoveErrorCode.FirstPlayDoesNotCoverCenter
    };
  }

  static playIsIsolated(board: IUpwordsBoardFormat, play: IUpwordsPlay): IPlayValidationResult {
    function coordIsInBounds(coord: Coord): boolean {
      const [x, y] = coord;
      return x >= 0 && x <= 9 && y >= 0 && y <= 9;
    }
    if (UBFHelper.boardIsEmpty(board)) {
      // Don't check for isolation if the board is empty
      return { isIllegal: false, error: MoveErrorCode.NotConnected };
    }
    let isIllegal = false;
    const { tiles, start, direction } = play;
    const adjacentCoords: Coord[] = [];
    // push the coordinates before and after the play
    const beforePlayCoord = UBFHelper.offsetCoord(start, direction, -1);
    const afterPlayCoord = UBFHelper.offsetCoord(start, direction, tiles.length);
    adjacentCoords.push(beforePlayCoord, afterPlayCoord);

    const orthogonal = UBFHelper.getOrthogonalDirection(direction);
    for (let i = 0; i < tiles.length; i++) {
      const playCoord = UBFHelper.offsetCoord(start, direction, i);
      const adjacentPrev = UBFHelper.offsetCoord(playCoord, orthogonal, -1);
      const adjacentNext = UBFHelper.offsetCoord(playCoord, orthogonal, 1);
      adjacentCoords.push(playCoord, adjacentPrev, adjacentNext);
    }
    const touchesExistingTile = adjacentCoords.filter(coordIsInBounds).some((coord) => {
      return UBFHelper.getHeightAt(board, coord) > 0;
    });
    isIllegal = !touchesExistingTile;
    return {
      isIllegal,
      error: MoveErrorCode.NotConnected
    };
  }

  static sameTileStacked(board: IUpwordsBoardFormat, play: IUpwordsPlay): IPlayValidationResult {
    let isIllegal = false;
    const { tiles, start, direction } = play;
    for (let i = 0; i < tiles.length; i++) {
      const newCoord = UBFHelper.offsetCoord(start, direction, i);
      if (UBFHelper.getLetterAt(board, newCoord) === tiles[i]) {
        isIllegal = true;
        break;
      }
    }
    return {
      isIllegal,
      error: MoveErrorCode.SameTileStacked
    };
  }

  static playHasGap(board: IUpwordsBoardFormat, play: IUpwordsPlay): IPlayValidationResult {
    let isIllegal = false;
    const { tiles, start, direction } = play;
    const boardAfterPlay = UBFHelper.placeTiles(board, play);
    for (let i = 0; i < tiles.length; i++) {
      const newCoord = UBFHelper.offsetCoord(start, direction, i);
      if (UBFHelper.getHeightAt(boardAfterPlay, newCoord) === 0) {
        isIllegal = true;
        break;
      }
    }
    return {
      isIllegal,
      error: MoveErrorCode.HasGap
    };
  }

  static coversExistingWord(board: IUpwordsBoardFormat, play: IUpwordsPlay): IPlayValidationResult {
    let isIllegal = false;
    const { tiles, start, direction } = play;
    const lineOfPlay = UBFHelper.getLineOfPlay(board, start, direction);
    // We will calculate this using a mask
    // Each "word" (contiguous sequence of minimum 2 tiles) is represented by
    // a sequence of A/B/C/...
    // .BE.HELLO. ->
    // .AA.BBBBB.
    // The play is represented by a sequence of Xs
    // SEAS....S. ->
    // XXXX....X.
    // The line is masked by the play, with the larger value taking precedence
    // .AA.BBBBB. +
    // XXXX....X. ->
    // XXXXBBBBX.
    // In this example, there are no "A"s left, which means that the play
    // covers an existing word, and is illegal
    let wordLength = 0;
    const maskLetters = 'ABCDEFGHIJKLMNOPQRSTUVW';
    let currentMask = 0;
    let lineMask = '';
    for (let i = 0; i < lineOfPlay.length; i++) {
      if (lineOfPlay[i] === '0 ') {
        if (wordLength > 1) {
          // arrived at the end of a word, increment the mask letter
          // and reset the word length counter
          currentMask++;
          wordLength = 0;
        } else if (wordLength === 1) {
          // if it was only 1 letter, the previous character was not a word
          // replace the previous mask letter with an empty character ('.')
          // and reset the word length counter
          lineMask = lineMask.slice(0, -1) + '.';
          wordLength = 0;
        }
        // add a dot for an empty cell
        lineMask += '.';
      } else {
        lineMask += maskLetters[currentMask];
        wordLength++;
      }
    }
    const wordMaskLetters = maskLetters.split(maskLetters[currentMask]!)[0]!;

    const startCoord = direction === PlayDirection.Horizontal ? start[1] : start[0];
    let playMask = '.'.repeat(startCoord);
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== ' ') {
        playMask += 'X';
      } else {
        playMask += '.';
      }
    }

    playMask += '.'.repeat(lineMask.length - playMask.length);

    let maskedLine = '';
    for (let i = 0; i < lineMask.length; i++) {
      if (playMask[i] === 'X') {
        maskedLine += playMask[i];
      } else {
        maskedLine += lineMask[i];
      }
    }

    for (const letter of wordMaskLetters) {
      if (!maskedLine.includes(letter)) {
        isIllegal = true;
        break;
      }
    }

    return {
      isIllegal,
      error: MoveErrorCode.CoversExistingWord
    };
  }

  static exceedsHeightLimit(board: IUpwordsBoardFormat, play: IUpwordsPlay): IPlayValidationResult {
    let isIllegal = false;
    const newBoardState = UBFHelper.placeTiles(board, play);
    isIllegal = newBoardState.some((row) => row.some((tile) => tile[0]! > '5'));
    return {
      isIllegal,
      error: MoveErrorCode.HeightLimitExceeded
    };
  }

  static wordIsInvalid(board: IUpwordsBoardFormat, play: IUpwordsPlay): IPlayValidationResult {
    const words = UBFHelper.getWordsFromPlay(board, play);
    const formedWords = words.map((word) =>
      word
        .map((cell) => cell.letter)
        .map((letter) => letter.toLowerCase())
        .map((letter) => (letter === 'q' ? 'qu' : letter))
        .join('')
    );
    for (const word of formedWords) {
      if (IllegalPlay.validWordsTrie.has(word) === false) {
        return {
          isIllegal: true,
          error: MoveErrorCode.InvalidWord
        };
      }
    }
    return {
      isIllegal: false,
      error: MoveErrorCode.InvalidWord
    };
  }

  static onlyAddsPlural(board: IUpwordsBoardFormat, play: IUpwordsPlay): IPlayValidationResult {
    let isIllegal = false;
    // Only check if the play is a single S
    checkPluralConditions: if (play.tiles.trim() === 'S') {
      // Get coordinate of the S
      const position = play.tiles.indexOf('S');
      const [x, y] = UBFHelper.offsetCoord(play.start, play.direction, position);
      // Check if it's on a 0-height square
      if (UBFHelper.getHeightAt(board, [x, y]) !== 0) {
        break checkPluralConditions;
      }
      // Check if it's the last letter in both directions
      const words = UBFHelper.getWordsFromPlay(board, play);
      const isLastLetter = words.every((word) => {
        const lastLetter = word[word.length - 1];
        return lastLetter!.coord[0] === x && lastLetter!.coord[1] === y;
      });
      if (!isLastLetter) {
        break checkPluralConditions;
      }
      // Check if all words formed are 3 letters or longer
      // (Adding an S to form a 2 letter word is not a pluralization)
      if (words.some((word) => word.length < 3)) {
        break checkPluralConditions;
      }
      // Check that the previous word does not end in S
      if (words.some((word) => word[word.length - 2]!.letter === 'S')) {
        break checkPluralConditions;
      }
      // If all the above conditions are met, the play is illegal
      isIllegal = true;
    }
    return {
      isIllegal,
      error: MoveErrorCode.OnlyPluralizesWord
    };
  }
}

class UpwordsBoard {
  private ubfBoard: IUpwordsBoardFormat;
  private moveHistory: IMoveResult[];
  private static playValidations = [IllegalPlay.playOutOfBounds];
  private static boardValidations = [
    IllegalPlay.exceedsHeightLimit,
    IllegalPlay.playIsIsolated,
    IllegalPlay.playHasGap,
    IllegalPlay.sameTileStacked,
    IllegalPlay.coversExistingWord,
    IllegalPlay.firstPlayDoesNotCoverCenter,
    IllegalPlay.wordIsInvalid,
    IllegalPlay.onlyAddsPlural
  ];

  constructor(wordList: string[], initialUBF?: IUpwordsBoardFormat) {
    this.moveHistory = [];
    if (initialUBF) {
      this.ubfBoard = initialUBF;
    } else {
      this.ubfBoard = UBFHelper.createEmptyBoard();
    }

    IllegalPlay.init(wordList);
  }

  getUBF(): IUpwordsBoardFormat {
    return UBFHelper.copyBoard(this.ubfBoard);
  }

  #validatePlay(play: IUpwordsPlay): IMoveResult {
    // Check: Play validations
    for (const validation of UpwordsBoard.playValidations) {
      const result = validation(play);
      if (result.isIllegal) {
        return {
          isValid: false,
          error: result.error
        };
      }
    }
    // Check: Play and Board validations
    for (const validation of UpwordsBoard.boardValidations) {
      const result = validation(this.ubfBoard, play);
      if (result.isIllegal) {
        return {
          isValid: false,
          error: result.error
        };
      }
    }
    return { isValid: true };
  }

  playTiles(play: IUpwordsPlay, checkOnly: boolean = false): IMoveResult {
    const validation = this.#validatePlay(play);
    if (!validation.isValid) {
      return validation;
    }
    // Play is valid, calculate points and update the board
    const points = UBFHelper.scorePlay(this.ubfBoard, play);
    const moveResult = {
      points,
      isValid: true
    };
    if (!checkOnly) {
      this.ubfBoard = UBFHelper.placeTiles(this.ubfBoard, play);
      this.moveHistory.push(moveResult);
    }
    return moveResult;
  }

  checkPlay(play: IUpwordsPlay): IMoveResult {
    return this.playTiles(play, true);
  }

  getPreviousMove(numberOfMovesBack = 1): IMoveResult {
    const lastMove = this.moveHistory[this.moveHistory.length - numberOfMovesBack];
    if (!lastMove) {
      throw new RangeError(`History out-of-range: can't go back ${numberOfMovesBack} moves`);
    }
    return lastMove;
  }
}

export {
  UpwordsBoard,
  IUpwordsBoardFormat,
  Coord,
  IUpwordsPlay,
  IMoveResult,
  PlayDirection,
  MoveErrorCode
};
