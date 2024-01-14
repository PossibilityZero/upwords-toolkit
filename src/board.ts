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

  private placeTile(letter: string, coordinate: Coord): boolean {
    const [x, y] = coordinate;
    const [currentHeight, currentLetter] = this.tiles[x]![y]!.split('');
    if (letter === ' ') {
      this.tiles[x]![y] = `${currentHeight}${currentLetter}`;
    } else {
      const newHeight = (parseInt(currentHeight!) + 1).toString();
      this.tiles[x]![y] = `${newHeight}${letter}`;
    }
    return true;
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

  #dryRunPlaceTile(board: IUpwordsBoardFormat, letter: string, coordinate: Coord): boolean {
    const [x, y] = coordinate;
    const [currentHeight, currentLetter] = this.tiles[x]![y]!.split('');
    if (letter === ' ') {
      board[x]![y] = `${currentHeight}${currentLetter}`;
    } else {
      const newHeight = (parseInt(currentHeight!) + 1).toString();
      board[x]![y] = `${newHeight}${letter}`;
    }
    return true;
  }

  #dryRunPlayTiles(
    board: IUpwordsBoardFormat,
    tiles: string,
    start: Coord,
    direction: PlayDirection
  ): IUpwordsBoardFormat {
    const [startX, startY] = start;
    if (direction === PlayDirection.Horizontal) {
      let i = 0;
      for (const letter of tiles) {
        this.#dryRunPlaceTile(board, letter, [startX, startY + i]);
        i++;
      }
    } else if (direction === PlayDirection.Vertical) {
      let i = 0;
      for (const letter of tiles) {
        this.#dryRunPlaceTile(board, letter, [startX + i, startY]);
        i++;
      }
    }
    return board;
  }

  playTiles(tiles: string, start: Coord, direction: PlayDirection): IMoveResult {
    const inBounds = this.checkInBounds(tiles, start, direction);
    if (!inBounds) {
      return {
        isValid: false,
        error: MoveErrorCode.OutOfBounds
      };
    }
    const testBoard = this.tiles.map((row) => row.map((tile) => tile));
    this.#dryRunPlayTiles(testBoard, tiles, start, direction);
    // check if any tiles are above height 5
    const heightLimitExceeded = testBoard.some((row) => row.some((tile) => tile[0]! > '5'));
    if (heightLimitExceeded) {
      return {
        isValid: false,
        error: MoveErrorCode.HeightLimitExceeded
      };
    }

    const [startX, startY] = start;
    if (direction === PlayDirection.Horizontal) {
      let i = 0;
      for (const letter of tiles) {
        this.placeTile(letter, [startX, startY + i]);
        i++;
      }
    } else if (direction === PlayDirection.Vertical) {
      let i = 0;
      for (const letter of tiles) {
        this.placeTile(letter, [startX + i, startY]);
        i++;
      }
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
