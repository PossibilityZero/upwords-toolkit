interface IUpwordsPlay {
  tiles: string;
  start: Coord;
  direction: PlayDirection;
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

export { IUpwordsPlay, IUpwordsBoardFormat, Coord, PlayDirection };

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
    const lineOfPlay: string[] = [];
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
    if (tiles.length === 7) {
      score += 20;
    }
    return score;
  }

  static findWord(board: IUpwordsBoardFormat, coord: Coord, direction: PlayDirection): BoardWord {
    const word: BoardCell[] = [];
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

  static getWordsFromPlay(board: IUpwordsBoardFormat, play: IUpwordsPlay): BoardWord[] {
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
