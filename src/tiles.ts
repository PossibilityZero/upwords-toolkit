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

  public get tileCount(): number {
    return Object.values(this.tiles).reduce((a, b) => a + b, 0);
  }

  public getLetter(letter: keyof FullTiles): number {
    return this.tiles[letter];
  }

  public listLetters(): Letter[] {
    return Object.entries(this.tiles)
      .filter(([, count]) => count > 0)
      .map(([letter]) => letter as Letter);
  }

  public addTile(letter: Letter, count: number): void {
    this.tiles[letter] += count;
  }

  public addTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.addTile(letter as keyof FullTiles, count);
    });
  }

  public removeTile(letter: Letter, count: number): Tiles {
    this.tiles[letter] -= count;
    return { [letter]: count };
  }

  public removeTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.removeTile(letter as Letter, count);
    });
  }

  public setTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.tiles[letter as Letter] = count;
    });
  }

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

  public get tileCountTarget(): number {
    return this._tileCountTarget;
  }

  public getMissingTiles(): number {
    return this.tileCountTarget - this.tileCount;
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
