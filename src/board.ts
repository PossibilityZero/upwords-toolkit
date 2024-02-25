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
  FirstPlayDoesNotCoverCenter
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

  static placeSingleTile(
    board: IUpwordsBoardFormat,
    letter: string,
    coordinate: Coord
  ): IUpwordsBoardFormat {
    const newBoard = UBFHelper.copyBoard(board);
    const [x, y] = coordinate;
    const [currentHeight, currentLetter] = newBoard[x]![y]!.split('');
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
    const [currentHeight, currentLetter] = board[x]![y]!.split('');
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
    const [startX, startY] = start;
    if (direction === PlayDirection.Horizontal) {
      let i = 0;
      for (const letter of tiles) {
        UBFHelper.#placeTileMutate(newBoard, letter, [startX, startY + i]);
        i++;
      }
    } else if (direction === PlayDirection.Vertical) {
      let i = 0;
      for (const letter of tiles) {
        UBFHelper.#placeTileMutate(newBoard, letter, [startX + i, startY]);
        i++;
      }
    }
    return newBoard;
  }

  static getLineOfPlay(
    board: IUpwordsBoardFormat,
    coord: Coord,
    direction: PlayDirection
  ): string[] {
    const lineOfPlay = [];
    if (direction === PlayDirection.Horizontal) {
      const coordX = coord[0];
      for (let i = 0; i < UBFHelper.boardLength; i++) {
        lineOfPlay.push(board[coordX]![i]!);
      }
    } else if (direction === PlayDirection.Vertical) {
      const coordY = coord[1];
      for (let i = 0; i < UBFHelper.boardLength; i++) {
        lineOfPlay.push(board[i]![coordY]!);
      }
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
      if (direction === PlayDirection.Horizontal) {
        if (play.tiles[i] !== ' ') {
          playCoordinates.push(<Coord>[start[0], start[1] + i]);
        }
      } else if (direction === PlayDirection.Vertical) {
        if (play.tiles[i] !== ' ') {
          playCoordinates.push(<Coord>[start[0] + i, start[1]]);
        }
      }
    }
    // 2. For each tile, find the words that it touches in the new board state
    const newBoardState = UBFHelper.placeTiles(board, play);
    const words = [];
    // Start with the direction of play (only one word)
    words.push(this.findWord(newBoardState, playCoordinates[0]!, direction));
    // Find words in the orthogonal direction
    const orthogonal =
      direction === PlayDirection.Horizontal ? PlayDirection.Vertical : PlayDirection.Horizontal;
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
    if (direction === PlayDirection.Horizontal) {
      // Find the start of the word
      let currentY = y;
      while (currentY > 0 && board[x]![currentY - 1] !== '0 ') {
        currentY--;
      }
      // Collect the word
      while (currentY < UBFHelper.boardLength && board[x]![currentY] !== '0 ') {
        const cell: BoardCell = {
          letter: board[x]![currentY]![1]!,
          coord: [x, currentY],
          height: parseInt(board[x]![currentY]![0]!)
        };
        word.push(cell);
        currentY++;
      }
    } else if (direction === PlayDirection.Vertical) {
      // Find the start of the word
      let currentX = x;
      while (currentX > 0 && board[currentX - 1]![y] !== '0 ') {
        currentX--;
      }
      // Collect the word
      while (currentX < UBFHelper.boardLength && board[currentX]![y] !== '0 ') {
        const cell: BoardCell = {
          letter: board[currentX]![y]![1]!,
          coord: [currentX, y],
          height: parseInt(board[currentX]![y]![0]!)
        };
        word.push(cell);
        currentX++;
      }
    }
    return word;
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
    if (start[0] < 0 || start[1] < 0) {
      isIllegal = true;
    } else if (direction === PlayDirection.Vertical && start[0] + length - 1 > 9) {
      isIllegal = true;
    } else if (direction === PlayDirection.Horizontal && start[1] + length - 1 > 9) {
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
      if (newBoardState[x]![y] !== '0 ') {
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
    const [startX, startY] = start;
    const adjacentCoords = [];
    if (direction === PlayDirection.Horizontal) {
      // push the coordinates before and after the play
      adjacentCoords.push([startX, startY - 1] as Coord, [startX, startY + tiles.length] as Coord);
      for (let i = 0; i < tiles.length; i++) {
        // push the current, above, and below coordinates
        adjacentCoords.push(
          [startX, startY + i] as Coord,
          [startX - 1, startY + i] as Coord,
          [startX + 1, startY + i] as Coord
        );
      }
    } else if (direction === PlayDirection.Vertical) {
      adjacentCoords.push([startX - 1, startY] as Coord, [startX + tiles.length, startY] as Coord);
      for (let i = 0; i < tiles.length; i++) {
        // push the current, left, and right coordinates
        adjacentCoords.push(
          [startX + i, startY] as Coord,
          [startX + i, startY - 1] as Coord,
          [startX + i, startY + 1] as Coord
        );
      }
    }
    const touchesExistingTile = adjacentCoords.filter(coordIsInBounds).some((coord) => {
      const [x, y] = coord;
      const cell = board[x]![y]!;
      return cell !== '0 ';
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
    const [startX, startY] = start;
    if (direction === PlayDirection.Horizontal) {
      for (let i = 0; i < tiles.length; i++) {
        const cell = board[startX]![startY + i]!;
        if (cell[1] === tiles[i]) {
          isIllegal = true;
        }
      }
    } else if (direction === PlayDirection.Vertical) {
      for (let i = 0; i < tiles.length; i++) {
        const cell = board[startX + i]![startY]!;
        if (cell[1] === tiles[i]) {
          isIllegal = true;
        }
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
    const [startX, startY] = start;
    if (direction === PlayDirection.Horizontal) {
      for (let i = 0; i < tiles.length; i++) {
        const cell = boardAfterPlay[startX]![startY + i]!;
        if (cell === '0 ') {
          isIllegal = true;
        }
      }
    } else if (direction === PlayDirection.Vertical) {
      for (let i = 0; i < tiles.length; i++) {
        const cell = boardAfterPlay[startX + i]![startY]!;
        if (cell === '0 ') {
          isIllegal = true;
        }
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
}

class UpwordsBoard {
  private ubfBoard: IUpwordsBoardFormat;
  private moveHistory: IMoveResult[];

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

  playTiles(play: IUpwordsPlay): IMoveResult {
    // Play validations
    const playValidations = [IllegalPlay.playOutOfBounds];
    for (const validation of playValidations) {
      const result = validation(play);
      if (result.isIllegal) {
        return {
          isValid: false,
          error: result.error
        };
      }
    }
    // Play and Board validations
    const boardValidations = [
      IllegalPlay.exceedsHeightLimit,
      IllegalPlay.playIsIsolated,
      IllegalPlay.playHasGap,
      IllegalPlay.sameTileStacked,
      IllegalPlay.coversExistingWord,
      IllegalPlay.firstPlayDoesNotCoverCenter
    ];
    for (const validation of boardValidations) {
      const result = validation(this.ubfBoard, play);
      if (result.isIllegal) {
        return {
          isValid: false,
          error: result.error
        };
      }
    }
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
