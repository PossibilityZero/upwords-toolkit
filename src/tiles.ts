type Tiles = {
  [Letter in
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z']?: number;
};

type FullTiles = {
  [Letter in
    | 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z']: number;
};

type Letter = keyof FullTiles;

class TileSet {
  protected tiles: FullTiles;

  constructor() {
    // Dynamically generate the A-Z tiles
    this.tiles = Object.fromEntries(
      Array.from({ length: 26 }, (_, i) => [String.fromCharCode(i + 65), 0])
    ) as FullTiles;
  }

  /**
   * Get the total count of tiles in the set
   */
  public get tileCount(): number {
    return Object.values(this.tiles).reduce((a, b) => a + b, 0);
  }

  /**
   * Get the count of a specific letter in the tile set
   *
   * @param letter - The letter to get the count of
   * @returns The count of the letter
   */
  public getLetter(letter: keyof FullTiles): number {
    return this.tiles[letter];
  }

  /**
   * Return a list of unique letters in the tile set
   *
   * @returns An array of Letters (allowed keys of FullTiles)
   */
  public listLetters(): Letter[] {
    return Object.entries(this.tiles)
      .filter(([, count]) => count > 0)
      .map(([letter]) => letter as Letter);
  }

  /**
   * Return the tiles contained in the set as a string
   *
   * Example:
   * ```
   * // tileSet contains 2 A's, 2 B's, and 1 C
   * tileSet.listTiles(); // => 'AABBC'
   * ```
   *
   * @returns A string of all the tiles in the set
   */
  public listTiles(): string {
    return Object.entries(this.tiles)
      .filter(([, count]) => count > 0)
      .map(([letter, count]) => letter.repeat(count))
      .sort()
      .join('');
  }

  /**
   * Add a specified number of one letter to the tile set
   *
   * @param letter The letter to add
   * @param count The number of tiles to add
   *
   * Example:
   * ```
   * // tileSet contains 2 A's
   * tileSet.addTile('A', 1);
   * tileSet.addTile('B', 2);
   * // tileSet now contains 3 A's and 2 B's
   * ```
   */
  public addTile(letter: Letter, count: number): void {
    this.tiles[letter] += count;
  }

  /**
   * Add a specified number of each letter to the tile set
   *
   * @param letters A mapping of letters to their counts
   *
   * Example:
   * ```
   * // tileSet contains 2 A's
   * tileSet.addTiles({ A: 3, B: 2 });
   * // tileSet now contains 5 A's and 2 B's
   * ```
   */
  public addTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.addTile(letter as keyof FullTiles, count);
    });
  }

  /**
   * Remove a specified number of one letter from the tile set
   *
   * @param letter The letter to remove
   * @param count The number of tiles to remove
   *
   * Example:
   * ```
   * // tileSet contains 3 A's
   * tileSet.removeTile('A', 2);
   * // tileSet now contains 1 A
   * ```
   */
  public removeTile(letter: Letter, count: number): Tiles {
    this.tiles[letter] -= count;
    return { [letter]: count };
  }

  /**
   * Remove a specified number of each letter from the tile set
   *
   * @param letters A mapping of letters to their counts
   *
   * Example:
   * ```
   * // tileSet contains 3 A's, 2 B's, and 1 C
   * tileSet.removeTiles({ A: 2, B: 1 });
   * // tileSet now contains 1 A, 1 B, and 1 C
   * ```
   */
  public removeTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.removeTile(letter as Letter, count);
    });
  }

  /**
   * Set the count of each letter in the tile set
   *
   * @param letters A mapping of letters to their counts
   *
   * Example:
   * ```
   * // tileSet contains 2 A's and 1 B
   * tileSet.setTiles({ A: 3, C: 2 });
   * // tileSet now contains 3 A's, 1 B, and 2 C's
   * ```
   */
  public setTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.tiles[letter as Letter] = count;
    });
  }

  /**
   * Remove all tiles from the set
   */
  public deleteAllTiles(): void {
    Object.keys(this.tiles).forEach((letter) => {
      this.tiles[letter as Letter] = 0;
    });
  }
}

class TileRack extends TileSet {
  private _tileCountTarget: number;

  constructor() {
    super();
    this._tileCountTarget = 7;
  }

  /**
   * The maximum number of tiles a player can have in their hand
   *
   * ie. When replenishing tiles, the player will draw until they have this many tiles
   */
  public get tileCountTarget(): number {
    return this._tileCountTarget;
  }

  /**
   * Return the number of tiles needed to reach the target
   *
   * A TileRack represents a player's hand in a game like Scrabble or Upwords.
   * The target is the maximum number of tiles a player can have in their hand.
   *
   * @returns The number of tiles needed to reach the target
   */
  public getMissingTiles(): number {
    return this.tileCountTarget - this.tileCount;
  }

  /**
   * Create a deep copy of the current TileRack
   *
   * @returns A new TileRack with the same tiles as the current rack
   */
  public copyToNewRack(): TileRack {
    const newRack = new TileRack();
    newRack.setTiles(this.tiles);
    return newRack;
  }
}

class TileBag extends TileSet {
  constructor() {
    super();
    this.setTiles({
      A: 7,
      B: 3,
      C: 4,
      D: 5,
      E: 8,
      F: 3,
      G: 3,
      H: 3,
      I: 7,
      J: 1,
      K: 2,
      L: 5,
      M: 5,
      N: 5,
      O: 7,
      P: 3,
      Q: 1,
      R: 5,
      S: 6,
      T: 5,
      U: 5,
      V: 1,
      W: 2,
      X: 1,
      Y: 2,
      Z: 1
    });
  }

  public drawRandomTile(): Tiles {
    const allTiles = Object.entries(this.tiles).reduce(
      (combined, letter) => combined.concat(letter[0].repeat(letter[1])),
      ''
    );
    const randomIndex = Math.floor(Math.random() * allTiles.length);
    const randomLetter = allTiles[randomIndex] as Letter;
    return this.removeTile(randomLetter, 1);
  }

  public drawRandomVowel(): Tiles {
    const allVowels = Object.entries(this.tiles).reduce(function (combined, letter) {
      const count = 'AEIOU'.includes(letter[0]) ? letter[1] : 0;
      return combined.concat(letter[0].repeat(count));
    }, '');
    const randomIndex = Math.floor(Math.random() * allVowels.length);
    const randomVowel = allVowels[randomIndex] as Letter;
    return this.removeTile(randomVowel, 1);
  }

  public drawRandomConsonant(): Tiles {
    const allVowels = Object.entries(this.tiles).reduce(function (combined, letter) {
      const count = 'AEIOU'.includes(letter[0]) ? 0 : letter[1];
      return combined.concat(letter[0].repeat(count));
    }, '');
    const randomIndex = Math.floor(Math.random() * allVowels.length);
    const randomVowel = allVowels[randomIndex] as Letter;
    return this.removeTile(randomVowel, 1);
  }
}

export { TileSet, TileRack, TileBag };
export { Letter, Tiles, FullTiles };
