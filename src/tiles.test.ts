import { TileSet, TileRack, TileBag } from './tiles';

describe('TileSet', () => {
  describe('constructor', () => {
    it('should initialize a set of 0 tiles', () => {
      const newTileSet = new TileSet();
      expect(newTileSet.tileCount).toBe(0);
    });
  });

  describe('getLetter', () => {
    it('should return the count of the given letter', () => {
      const newTileSet = new TileSet();
      newTileSet.addTile('A', 3);
      expect(newTileSet.getLetter('A')).toBe(3);
    });
  });

  describe('addTile', () => {
    it('should increment the count of the given letter', () => {
      const newTileSet = new TileSet();
      newTileSet.addTile('A', 1);
      expect(newTileSet.tileCount).toBe(1);
      expect(newTileSet.getLetter('A')).toBe(1);
      newTileSet.addTile('B', 3);
      expect(newTileSet.tileCount).toBe(4);
      expect(newTileSet.getLetter('B')).toBe(3);
    });
  });

  describe('addTiles', () => {
    it('should increment the count of the given letters', () => {
      const newTileSet = new TileSet();
      newTileSet.addTiles({ A: 1, B: 2 });
      expect(newTileSet.tileCount).toBe(3);
      newTileSet.addTiles({ C: 3, D: 4 });
      expect(newTileSet.tileCount).toBe(10);
    });
  });

  describe('removeTile', () => {
    it('should decrement the count of the given letter', () => {
      const newTileSet = new TileSet();
      newTileSet.addTile('A', 5);
      newTileSet.removeTile('A', 3);
      expect(newTileSet.tileCount).toBe(2);
    });
  });

  describe('removeTiles', () => {
    it('should decrement the count of the given letters', () => {
      const newTileSet = new TileSet();
      newTileSet.addTiles({ A: 1, B: 2, C: 3 });
      newTileSet.removeTiles({ A: 1, C: 2 });
      expect(newTileSet.tileCount).toBe(3);
    });
  });

  describe('setTiles', () => {
    it('should set the count of the given letters', () => {
      const newTileSet = new TileSet();
      newTileSet.addTiles({ A: 1, B: 2, C: 3 });
      newTileSet.setTiles({ A: 3, C: 2 });
      expect(newTileSet.getLetter('A')).toBe(3);
      expect(newTileSet.getLetter('B')).toBe(2);
      expect(newTileSet.getLetter('C')).toBe(2);
      expect(newTileSet.tileCount).toBe(7);
    });
  });
});

describe('TileRack', () => {
  describe('constructor', () => {
    it('should initialize with a set of 0 tiles and a target of 7 tiles', () => {
      const playerRack = new TileRack();
      expect(playerRack.tileCount).toBe(0);
      expect(playerRack.tileCountTarget).toBe(7);
    });
  });
});

describe('TileBag', () => {
  describe('constructor', () => {
    it('should initialize with a full set of 100 tiles', () => {
      const tileBag = new TileBag();
      expect(tileBag.tileCount).toBe(100);
    });

    it('should initialize with the correct number of each letter', () => {
      const tileBag = new TileBag();
      expect(tileBag.getLetter('A')).toBe(7);
      expect(tileBag.getLetter('B')).toBe(3);
      expect(tileBag.getLetter('C')).toBe(4);
      expect(tileBag.getLetter('D')).toBe(5);
      expect(tileBag.getLetter('E')).toBe(8);
      expect(tileBag.getLetter('F')).toBe(3);
      expect(tileBag.getLetter('G')).toBe(3);
      expect(tileBag.getLetter('H')).toBe(3);
      expect(tileBag.getLetter('I')).toBe(7);
      expect(tileBag.getLetter('J')).toBe(1);
      expect(tileBag.getLetter('K')).toBe(2);
      expect(tileBag.getLetter('L')).toBe(5);
      expect(tileBag.getLetter('M')).toBe(5);
      expect(tileBag.getLetter('N')).toBe(5);
      expect(tileBag.getLetter('O')).toBe(7);
      expect(tileBag.getLetter('P')).toBe(3);
      expect(tileBag.getLetter('Q')).toBe(1);
      expect(tileBag.getLetter('R')).toBe(5);
      expect(tileBag.getLetter('S')).toBe(6);
      expect(tileBag.getLetter('T')).toBe(5);
      expect(tileBag.getLetter('U')).toBe(5);
      expect(tileBag.getLetter('V')).toBe(1);
      expect(tileBag.getLetter('W')).toBe(2);
      expect(tileBag.getLetter('X')).toBe(1);
      expect(tileBag.getLetter('Y')).toBe(2);
      expect(tileBag.getLetter('Z')).toBe(1);
    });
  });
});
