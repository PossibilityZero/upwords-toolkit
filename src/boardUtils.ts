/**
 * Represents a single play on the Upwords board.
 * Properties: tiles, start, direction
 */
type UpwordsPlay = {
  tiles: string;
  start: Coord;
  direction: PlayDirection;
};

/**
 * Represents a single cell on the Upwords board.
 * Properties: letter, coord, height
 */
type BoardCell = {
  letter: string;
  coord: Coord;
  height: number;
};
type IUpwordsBoardFormat = string[][];
type Coord = [number, number];
type BoardWord = BoardCell[];
/**
 * Represents the direction of a play on the Upwords board.
 *
 * Valid values are Horizontal and Vertical.
 */
enum PlayDirection {
  Horizontal,
  Vertical
}

export { UpwordsPlay, IUpwordsBoardFormat, Coord, PlayDirection, BoardWord, BoardCell };

/**
 * A collection of static methods to help with Upwords board operations.
 *
 * No public method in the class mutates the board.
 * Instead, a new copy is created for each operation.
 */
class UBFHelper {
  static boardLength = 10;
  /**
   * Creates an empty Upwords board.
   *
   * @returns An empty 10 x 10 Upwords board
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

  /**
   * Creates a new IUpwordsBoardFormat that is a deep copy of the input board.
   *
   * @param board The board to copy
   * @returns A deep copy of the input board
   */
  static copyBoard(board: IUpwordsBoardFormat): IUpwordsBoardFormat {
    // Tiles are strings and are immutable, so this is a deep copy
    return board.map((row) => row.map((tile) => tile));
  }

  /**
   * Returns the tile at the given coordinate on the board.
   * Throws an error if the coordinate is out of bounds.
   *
   * @param board The board to search
   * @param coord The coordinate to look up
   * @returns A string representing the tile, in the format 'height letter'. eg. '2T'
   */
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

  /**
   * Returns the height of the tile at the given coordinate on the board.
   * Throws an error if the tile does not exist.
   *
   * @param board The board to search
   * @param coord The coordinate to look up
   * @returns The height of the tile at the given coordinate
   */
  static getHeightAt(board: IUpwordsBoardFormat, coord: Coord): number {
    const height = this.getTileAt(board, coord)[0];
    if (!height) {
      throw new RangeError(`Height at ${coord} does not exist`);
    }
    return parseInt(height);
  }

  /**
   * Returns the letter of the tile at the given coordinate on the board.
   * Throws an error if the tile does not exist.
   *
   * @param board The board to search
   * @param coord The coordinate to look up
   * @returns The letter of the tile at the given coordinate
   */
  static getLetterAt(board: IUpwordsBoardFormat, coord: Coord): string {
    const letter = this.getTileAt(board, coord)[1];
    if (!letter) {
      throw new RangeError(`Letter at ${coord} does not exist`);
    }
    return letter;
  }

  /**
   * Returns a new Coord that is offset from the start Coord in the given direction.
   *
   * @param start The starting point coordinate
   * @param direction The direction to offset the coordinate
   * @param offset The distance to offset the coordinate
   * @returns A new coordinate that is offset by the given amount in the given direction
   */
  static offsetCoord(start: Coord, direction: PlayDirection, offset: number): Coord {
    const [x, y] = start;
    if (direction === PlayDirection.Horizontal) {
      return [x, y + offset];
    } else if (direction === PlayDirection.Vertical) {
      return [x + offset, y];
    }
    throw new Error('Invalid direction');
  }

  /**
   * Compares two coordinates and returns true if they are equal.
   *
   * @param coord1 The first coordinate
   * @param coord2 The second coordinate
   * @returns true if coord1 and coord2 have the same x and y values
   */
  static coordsAreEqual(coord1: Coord, coord2: Coord): boolean {
    return coord1[0] === coord2[0] && coord1[1] === coord2[1];
  }

  /**
   * Returns an array of coordinates that are adjacent to the given
   * coordinate in the vertical and horizontal directions.
   *
   * @param coord The coordinate to find adjacent coordinates for
   * @returns An array of coordinates that are adjacent to the given coordinate.
   * Excludes out-of-bounds coordinates.
   */
  static getAdjacentCoords(coord: Coord): Coord[] {
    const [x, y] = coord;
    const adjacents: Coord[] = [];
    adjacents.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
    return adjacents.filter((c) => c.every((i) => i >= 0 && i < UBFHelper.boardLength));
  }

  /**
   * Returns an array of BoardCell objects that are adjacent to the given
   * coordinate in the vertical and horizontal directions.
   *
   * @param coord The coordinate to find adjacent coordinates for
   * @returns An array of BoardCell objects that are adjacent to the given coordinate.
   * Excludes out-of-bounds coordinates.
   */
  static getAdjacentCells(board: IUpwordsBoardFormat, coord: Coord): BoardCell[] {
    const adjacents = this.getAdjacentCoords(coord);
    return adjacents.map((c) => {
      return {
        letter: this.getLetterAt(board, c),
        coord: c,
        height: this.getHeightAt(board, c)
      };
    });
  }

  /**
   * Returns the orthogonal direction to the given direction.
   *
   * ```
   * getOrthogonalDirection(PlayDirection.Horizontal); // PlayDirection.Vertical
   * getOrthogonalDirection(PlayDirection.Vertical); // PlayDirection.Horizontal
   * ```
   *
   * @param direction The input PlayDirection
   * @returns The orthogonal PlayDirection
   */
  static getOrthogonalDirection(direction: PlayDirection): PlayDirection {
    return direction === PlayDirection.Horizontal
      ? PlayDirection.Vertical
      : PlayDirection.Horizontal;
  }

  /**
   * Places a single tile on the board at the given coordinate.
   *
   * @param board The current board state
   * @param letter The letter to place on the board.
   * @param coordinate The coordinate to start from
   * @returns A new board state with the tile placed
   */
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

  /**
   * Places a single tile on a board, mutating the board in place.
   * This method is private and is not part of the public API.
   * Useful for speeding up operations that require multiple tile placements.
   */
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

  /**
   * Places multiple tiles on the board given a play.
   *
   * @param board The current board state
   * @param play The play to place on the board
   * @returns A new board state with the tiles placed
   */
  static placeTiles(board: IUpwordsBoardFormat, play: UpwordsPlay): IUpwordsBoardFormat {
    const { tiles, start, direction } = play;
    const newBoard = UBFHelper.copyBoard(board);
    let i = 0;
    for (const letter of tiles) {
      UBFHelper.#placeTileMutate(newBoard, letter, this.offsetCoord(start, direction, i));
      i++;
    }
    return newBoard;
  }

  /**
   * Given a board state, coordinate, and a direction,
   * returns the row or column of the board as an array of tile strings.
   *
   * Example:
   * ```
   * getLineOfPlay(board, [4, 5], PlayDirection.Horizontal);
   * // ['0 ', '0 ', '2H', '1E', '3L', '1L', '1O', '0 ', '0 ', '0 ']
   * ```
   *
   * @param board The current board state
   * @param coord The coordinate to start from
   * @param direction The direction to get the line of play
   * @returns An array of strings representing the line of play
   */
  static getLineOfPlay(
    board: IUpwordsBoardFormat,
    coord: Coord,
    direction: PlayDirection
  ): string[] {
    const [x, y] = coord;
    const lineStart: Coord = direction === PlayDirection.Horizontal ? [x, 0] : [0, y];
    const lineOfPlay: string[] = [];
    for (let i = 0; i < UBFHelper.boardLength; i++) {
      lineOfPlay.push(UBFHelper.getTileAt(board, UBFHelper.offsetCoord(lineStart, direction, i)));
    }
    return lineOfPlay;
  }

  /**
   * Returns true if the board is empty.
   * An empty board is one where all tiles are '0 '.
   *
   * @param board The board to check
   * @returns true if the board is empty
   */
  static boardIsEmpty(board: IUpwordsBoardFormat): boolean {
    return board.every((row) => row.every((cell) => cell === '0 '));
  }

  /**
   * Given a board and a play, returns the score of the play.
   * Doesn't check if the play is valid.
   *
   * @param board The current board state
   * @param play The play to score
   * @returns The score of the play
   */
  static scorePlay(board: IUpwordsBoardFormat, play: UpwordsPlay): number {
    const { tiles, start, direction } = play;
    // For each tile placed, find all the words that are formed
    // 1. Find the coordinates of the tiles placed (skip empty tiles)
    const playCoordinates: Coord[] = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== ' ') {
        playCoordinates.push(UBFHelper.offsetCoord(start, direction, i));
      }
    }
    // 2. For each tile, find the words that it touches in the new board state
    const newBoardState = UBFHelper.placeTiles(board, play);
    const words: BoardWord[] = [];
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
    if (playCoordinates.length === 7) {
      score += 20;
    }
    return score;
  }

  /**
   * Given a coordinate on the board and a direction, finds the word that the coordinate is part of.
   *
   * As opposed to the scoring rules, findWord allows for 1-letter "words".
   *
   * If the starting coordinate is empty, returns an empty array.
   *
   * @param board The current board state
   * @param coord The coordinate to start from
   * @param direction The direction to search for the word
   * @returns An array of BoardCell objects representing the word
   */
  static findWord(board: IUpwordsBoardFormat, coord: Coord, direction: PlayDirection): BoardWord {
    const word: BoardCell[] = [];
    const [x, y] = coord;
    if (this.getHeightAt(board, coord) === 0) {
      return word;
    }
    // Find the start of the word
    let i;
    const pos = direction === PlayDirection.Horizontal ? y : x;
    for (i = 1; i <= pos; i++) {
      if (this.getHeightAt(board, this.offsetCoord(coord, direction, -i)) === 0) {
        i--;
        break;
      }
    }
    i = i > pos ? pos : i; // if the start of the word is at the edge of the board
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

  /**
   * Returns the words formed by a play on the board.
   *
   * @param board The current board state
   * @param play The play onto the board, from which to find all words formed
   * @returns An array of words formed by the play
   */
  static getWordsFromPlay(board: IUpwordsBoardFormat, play: UpwordsPlay): BoardWord[] {
    const { tiles, start, direction } = play;
    // For each tile placed, find all the words that are formed
    // 1. Find the coordinates of the tiles placed (skip empty tiles)
    const playCoordinates: Coord[] = [];
    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== ' ') {
        playCoordinates.push(UBFHelper.offsetCoord(start, direction, i));
      }
    }
    // 2. For each tile, find the words that it touches in the new board state
    const newBoardState = UBFHelper.placeTiles(board, play);
    const words: BoardWord[] = [];
    // Start with the direction of play (only one word)
    words.push(this.findWord(newBoardState, playCoordinates[0]!, direction));
    // Find words in the orthogonal direction
    const orthogonal = UBFHelper.getOrthogonalDirection(direction);
    for (const [x, y] of playCoordinates) {
      const formedWord = this.findWord(newBoardState, [x, y], orthogonal);
      words.push(formedWord);
    }
    return words.filter((word) => word.length >= 2);
  }
}

export { UBFHelper };
