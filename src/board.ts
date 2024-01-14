interface IMoveResult {
  isValid: boolean;
  points?: number;
  error?: MoveErrorCode;
}
enum MoveErrorCode {
  OutOfBounds,
  HeightLimitExceeded
}
type IUpwordsBoardFormat = string[][];
type Coord = [number, number];
enum PlayDirection {
  Horizontal,
  Vertical
}

class UBFHelper {
  /* No public method in the class mutates the board.
   * Instead, a new copy is created for each operation.
   */
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

  static placeTiles(
    board: IUpwordsBoardFormat,
    tiles: string,
    start: Coord,
    direction: PlayDirection
  ): IUpwordsBoardFormat {
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
}

class UpwordsBoard {
  private tiles: IUpwordsBoardFormat;
  private moveHistory: IMoveResult[];

  constructor(initialUBF?: IUpwordsBoardFormat) {
    this.moveHistory = [];
    if (initialUBF) {
      this.tiles = initialUBF;
    } else {
      this.tiles = [
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
  }

  getUBF(): IUpwordsBoardFormat {
    return this.tiles;
  }

  private checkInBounds(tiles: string, start: Coord, direction: PlayDirection): boolean {
    const length = tiles.trimEnd().length;
    if (start[0] < 0 || start[1] < 0) {
      return false;
    } else if (direction === PlayDirection.Vertical && start[0] + length > 9) {
      return false;
    } else if (direction === PlayDirection.Horizontal && start[1] + length > 9) {
      return false;
    } else {
      return true;
    }
  }

  playTiles(tiles: string, start: Coord, direction: PlayDirection): IMoveResult {
    // Pre-placement validations
    const inBounds = this.checkInBounds(tiles, start, direction);
    if (!inBounds) {
      return {
        isValid: false,
        error: MoveErrorCode.OutOfBounds
      };
    }
    // Post-placement validations
    const newBoardState = UBFHelper.placeTiles(this.tiles, tiles, start, direction);
    const heightLimitExceeded = newBoardState.some((row) => row.some((tile) => tile[0]! > '5'));
    if (heightLimitExceeded) {
      return {
        isValid: false,
        error: MoveErrorCode.HeightLimitExceeded
      };
    } else {
      this.tiles = newBoardState;
    }
    const moveResult = {
      points: 10,
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
export { IUpwordsBoardFormat, Coord, IMoveResult, PlayDirection, MoveErrorCode };
