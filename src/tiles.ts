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

class TileSet {
  private tiles: FullTiles;

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

  public addTile(letter: keyof FullTiles, count: number): void {
    this.tiles[letter] += count;
  }

  public addTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.addTile(letter as keyof FullTiles, count);
    });
  }

  public removeTile(letter: keyof FullTiles, count: number): void {
    this.tiles[letter] -= count;
  }

  public removeTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.removeTile(letter as keyof FullTiles, count);
    });
  }

  public setTiles(letters: Tiles): void {
    Object.entries(letters).forEach(([letter, count]) => {
      this.tiles[letter as keyof FullTiles] = count;
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
}

export { TileSet, TileRack, TileBag };
export default { TileSet, TileRack, TileBag };
