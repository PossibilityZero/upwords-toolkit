import fs from 'fs';
import path from 'path';

interface IUpwordsPlay {
  tiles: string;
  start: Coord;
  direction: PlayDirection;
}
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
  InvalidWord
}
type IUpwordsBoardFormat = string[][];
type Coord = [number, number];
interface BoardCell {
  letter: string;
  coord: Coord;
  height: number;
}
type BoardWord = BoardCell[];
enum PlayDirection {
  Horizontal,
  Vertical
}

class UBFHelper {
  /* No public method in the class mutates the board.
   * Instead, a new copy is created for each operation.
   */
  static boardLength = 10;
  static createEmptyBoard(): IUpwordsBoardFormat {
    return [
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
      ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
    ];
  }

  static copyBoard(board: IUpwordsBoardFormat): IUpwordsBoardFormat {
    // Tiles are strings and are immutable, so this is a deep copy
    return board.map((row) => row.map((tile) => tile));
  }

  static getTileAt(board: IUpwordsBoardFormat, coord: Coord): string {
    const [x, y] = coord;
    const boardRow = board[x];
    if (!boardRow) {
      throw new RangeError(`Row ${x} does not exist`);
    }
    const tile = boardRow[y];
    if (!tile) {
      throw new RangeError(`Column ${y} does not exist in row ${x}`);
    }
    return tile;
  }

  static getHeightAt(board: IUpwordsBoardFormat, coord: Coord): number {
    const height = this.getTileAt(board, coord)[0];
    if (!height) {
      throw new RangeError(`Height at ${coord} does not exist`);
    }
    return parseInt(height);
  }

  static getLetterAt(board: IUpwordsBoardFormat, coord: Coord): string {
    const letter = this.getTileAt(board, coord)[1];
    if (!letter) {
      throw new RangeError(`Letter at ${coord} does not exist`);
    }
    return letter;
  }

  static offsetCoord(start: Coord, direction: PlayDirection, offset: number): Coord {
    const [x, y] = start;
    if (direction === PlayDirection.Horizontal) {
      return [x, y + offset];
    } else if (direction === PlayDirection.Vertical) {
      return [x + offset, y];
    }
    throw new Error('Invalid direction');
  }

  static getOrthogonalDirection(direction: PlayDirection): PlayDirection {
    return direction === PlayDirection.Horizontal
      ? PlayDirection.Vertical
      : PlayDirection.Horizontal;
  }

  static placeSingleTile(
    board: IUpwordsBoardFormat,
    letter: string,
    coordinate: Coord
  ): IUpwordsBoardFormat {
    const newBoard = UBFHelper.copyBoard(board);
    const [x, y] = coordinate;
    const [currentHeight, currentLetter] = this.getTileAt(newBoard, [x, y]).split('');
    if (letter === ' ') {
      newBoard[x]![y] = `${currentHeight}${currentLetter}`;
    } else {
      const newHeight = (parseInt(currentHeight!) + 1).toString();
      newBoard[x]![y] = `${newHeight}${letter}`;
    }
    return newBoard;
  }

  static #placeTileMutate(board: IUpwordsBoardFormat, letter: string, coordinate: Coord): void {
    const [x, y] = coordinate;
    const [currentHeight, currentLetter] = this.getTileAt(board, [x, y]).split('');
    if (letter === ' ') {
      board[x]![y] = `${currentHeight}${currentLetter}`;
    } else {
      const newHeight = (parseInt(currentHeight!) + 1).toString();
      board[x]![y] = `${newHeight}${letter}`;
    }
  }

  static placeTiles(board: IUpwordsBoardFormat, play: IUpwordsPlay): IUpwordsBoardFormat {
    const { tiles, start, direction } = play;
    const newBoard = UBFHelper.copyBoard(board);
    let i = 0;
    for (const letter of tiles) {
      UBFHelper.#placeTileMutate(newBoard, letter, this.offsetCoord(start, direction, i));
      i++;
    }
    return newBoard;
  }

  static getLineOfPlay(
    board: IUpwordsBoardFormat,
    coord: Coord,
    direction: PlayDirection
  ): string[] {
    const [x, y] = coord;
    const lineStart: Coord = direction === PlayDirection.Horizontal ? [x, 0] : [0, y];
    const lineOfPlay = [];
    for (let i = 0; i < UBFHelper.boardLength; i++) {
      lineOfPlay.push(UBFHelper.getTileAt(board, UBFHelper.offsetCoord(lineStart, direction, i)));
    }
    return lineOfPlay;
  }

  static boardIsEmpty(board: IUpwordsBoardFormat): boolean {
    return board.every((row) => row.every((cell) => cell === '0 '));
  }

  static scorePlay(board: IUpwordsBoardFormat, play: IUpwordsPlay): number {
    const { tiles, start, direction } = play;
    // For each tile placed, find all the words that are formed
    // 1. Find the coordinates of the tiles placed (skip empty tiles)
    const playCoordinates = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== ' ') {
        playCoordinates.push(UBFHelper.offsetCoord(start, direction, i));
      }
    }
    // 2. For each tile, find the words that it touches in the new board state
    const newBoardState = UBFHelper.placeTiles(board, play);
    const words = [];
    // Start with the direction of play (only one word)
    words.push(this.findWord(newBoardState, playCoordinates[0]!, direction));
    // Find words in the orthogonal direction
    const orthogonal = UBFHelper.getOrthogonalDirection(direction);
    for (const [x, y] of playCoordinates) {
      const formedWord = this.findWord(newBoardState, [x, y], orthogonal);
      if (formedWord.length >= 2) {
        words.push(formedWord);
      }
    }
    // 3. For each word, calculate the score and add it to the total
    let score = 0;
    for (const word of words) {
      // Calculate the score for the word
      const wordScore = word.reduce((acc, cell) => acc + cell.height, 0);
      // Double the score if all heights are 1
      if (word.every((cell) => cell.height === 1)) {
        score += wordScore * 2;
      } else {
        score += wordScore;
      }
    }
    // 4. If all 7 tiles are used, add 20 points to the score
    if (tiles.length === 7) {
      score += 20;
    }
    return score;
  }

  static findWord(board: IUpwordsBoardFormat, coord: Coord, direction: PlayDirection): BoardWord {
    const word = [];
    const [x, y] = coord;
    // Find the start of the word
    let i;
    const pos = direction === PlayDirection.Horizontal ? y : x;
    for (i = 1; i <= pos; i++) {
      if (this.getHeightAt(board, this.offsetCoord(coord, direction, -i)) === 0) {
        i--;
        break;
      }
    }
    let wordCoord = this.offsetCoord(coord, direction, -i);
    // Collect the word
    do {
      const cell: BoardCell = {
        letter: this.getLetterAt(board, wordCoord),
        coord: wordCoord,
        height: this.getHeightAt(board, wordCoord)
      };
      word.push(cell);
      wordCoord = this.offsetCoord(wordCoord, direction, 1);
    } while (
      wordCoord.every((c) => c < UBFHelper.boardLength) &&
      this.getHeightAt(board, wordCoord) !== 0
    );
    return word;
  }

  static getWordsFromPlay(board: IUpwordsBoardFormat, play: IUpwordsPlay): BoardWord[] {
    const { tiles, start, direction } = play;
    // For each tile placed, find all the words that are formed
    // 1. Find the coordinates of the tiles placed (skip empty tiles)
    const playCoordinates = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== ' ') {
        playCoordinates.push(UBFHelper.offsetCoord(start, direction, i));
      }
    }
    // 2. For each tile, find the words that it touches in the new board state
    const newBoardState = UBFHelper.placeTiles(board, play);
    const words = [];
    // Start with the direction of play (only one word)
    words.push(this.findWord(newBoardState, playCoordinates[0]!, direction));
    // Find words in the orthogonal direction
    const orthogonal = UBFHelper.getOrthogonalDirection(direction);
    for (const [x, y] of playCoordinates) {
      const formedWord = this.findWord(newBoardState, [x, y], orthogonal);
      if (formedWord.length >= 2) {
        words.push(formedWord);
      }
    }
    return words;
  }
}

interface IPlayValidationResult {
  isIllegal: boolean;
  error: MoveErrorCode;
}
class IllegalPlay {
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
    const adjacentCoords = [];
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
    const validWords = fs
      .readFileSync(path.resolve(__dirname, '../data/dictionary.txt'), 'utf8')
      .split('\n');
    const words = UBFHelper.getWordsFromPlay(board, play);
    const formedWords = words.map((word) =>
      word
        .map((cell) => cell.letter)
        .join('')
        .toLowerCase()
    );
    for (const word of formedWords) {
      if (!validWords.includes(word)) {
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
    IllegalPlay.wordIsInvalid
  ];

  constructor(initialUBF?: IUpwordsBoardFormat) {
    this.moveHistory = [];
    if (initialUBF) {
      this.ubfBoard = initialUBF;
    } else {
      this.ubfBoard = UBFHelper.createEmptyBoard();
    }
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

  playTiles(play: IUpwordsPlay): IMoveResult {
    const validation = this.#validatePlay(play);
    if (!validation.isValid) {
      return validation;
    }
    // Play is valid, calculate points and update the board
    const points = UBFHelper.scorePlay(this.ubfBoard, play);
    this.ubfBoard = UBFHelper.placeTiles(this.ubfBoard, play);
    const moveResult = {
      points,
      isValid: true
    };
    this.moveHistory.push(moveResult);
    return moveResult;
  }

  getPreviousMove(numberOfMovesBack = 1): IMoveResult {
    const lastMove = this.moveHistory[this.moveHistory.length - numberOfMovesBack];
    if (!lastMove) {
      throw new RangeError(`History out-of-range: can't go back ${numberOfMovesBack} moves`);
    }
    return lastMove;
  }
}

export default UpwordsBoard;
export { IUpwordsBoardFormat, Coord, IUpwordsPlay, IMoveResult, PlayDirection, MoveErrorCode };
