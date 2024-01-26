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
  SameTileStacked
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
}

class IllegalPlay {
  static playTouchesExistingTile(board: IUpwordsBoardFormat, play: IUpwordsPlay): boolean {
    function coordIsInBounds(coord: Coord): boolean {
      const [x, y] = coord;
      return x >= 0 && x <= 9 && y >= 0 && y <= 9;
    }
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
    return touchesExistingTile;
  }

  static sameTileStacked(board: IUpwordsBoardFormat, play: IUpwordsPlay): boolean {
    const { tiles, start, direction } = play;
    const [startX, startY] = start;
    if (direction === PlayDirection.Horizontal) {
      for (let i = 0; i < tiles.length; i++) {
        const cell = board[startX]![startY + i]!;
        if (cell[1] === tiles[i]) {
          return true;
        }
      }
    } else if (direction === PlayDirection.Vertical) {
      for (let i = 0; i < tiles.length; i++) {
        const cell = board[startX + i]![startY]!;
        if (cell[1] === tiles[i]) {
          return true;
        }
      }
    }
    return false;
  }

  static playHasGap(board: IUpwordsBoardFormat, play: IUpwordsPlay): boolean {
    const { tiles, start, direction } = play;
    const boardAfterPlay = UBFHelper.placeTiles(board, play);
    const [startX, startY] = start;
    if (direction === PlayDirection.Horizontal) {
      for (let i = 0; i < tiles.length; i++) {
        const cell = boardAfterPlay[startX]![startY + i]!;
        if (cell === '0 ') {
          return true;
        }
      }
    } else if (direction === PlayDirection.Vertical) {
      for (let i = 0; i < tiles.length; i++) {
        const cell = boardAfterPlay[startX + i]![startY]!;
        if (cell === '0 ') {
          return true;
        }
      }
    }
    return false;
  }

  static exceedsHeightLimit(board: IUpwordsBoardFormat, play: IUpwordsPlay): boolean {
    const newBoardState = UBFHelper.placeTiles(board, play);
    return newBoardState.some((row) => row.some((tile) => tile[0]! > '5'));
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

  private checkInBounds(tiles: string, start: Coord, direction: PlayDirection): boolean {
    const length = tiles.trimEnd().length;
    if (start[0] < 0 || start[1] < 0) {
      return false;
    } else if (direction === PlayDirection.Vertical && start[0] + length - 1 > 9) {
      return false;
    } else if (direction === PlayDirection.Horizontal && start[1] + length - 1 > 9) {
      return false;
    } else {
      return true;
    }
  }

  playTiles(play: IUpwordsPlay): IMoveResult {
    // Pre-placement validations
    const { tiles, start, direction } = play;
    const inBounds = this.checkInBounds(tiles, start, direction);
    if (!inBounds) {
      return {
        isValid: false,
        error: MoveErrorCode.OutOfBounds
      };
    }
    // Post-placement validations
    const heightLimitExceeded = IllegalPlay.exceedsHeightLimit(this.ubfBoard, play);
    const touchesExistingTile = IllegalPlay.playTouchesExistingTile(this.ubfBoard, play);
    const sameTileStacked = IllegalPlay.sameTileStacked(this.ubfBoard, play);
    const playHasGap = IllegalPlay.playHasGap(this.ubfBoard, play);
    if (heightLimitExceeded) {
      return {
        isValid: false,
        error: MoveErrorCode.HeightLimitExceeded
      };
    } else if (this.moveHistory.length !== 0 && !touchesExistingTile) {
      return {
        isValid: false,
        error: MoveErrorCode.NotConnected
      };
    } else if (playHasGap) {
      return {
        isValid: false,
        error: MoveErrorCode.HasGap
      };
    } else if (sameTileStacked) {
      return {
        isValid: false,
        error: MoveErrorCode.SameTileStacked
      };
    } else {
      this.ubfBoard = UBFHelper.placeTiles(this.ubfBoard, play);
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
export { IUpwordsBoardFormat, Coord, IUpwordsPlay, IMoveResult, PlayDirection, MoveErrorCode };
