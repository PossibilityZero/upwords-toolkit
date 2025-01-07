import { TileSet, TileRack, TileBag } from './tiles';

describe('TileSet', () => {
  describe('constructor', () => {
    it('should initialize a set of 0 tiles', () => {
      const newTileSet = new TileSet();
      expect(newTileSet.tileCount).toBe(0);
    });
  });

  describe('getTiles', () => {
    it('should return a set of tiles', () => {
      const newTileSet = new TileSet();
      newTileSet.addTiles({ A: 1, B: 2, C: 3 });
      expect(newTileSet.getTiles()).toEqual({ A: 1, B: 2, C: 3 });
    });
  });

  describe('getLetter', () => {
    it('should return the count of the given letter', () => {
      const newTileSet = new TileSet();
      newTileSet.addTile('A', 3);
      expect(newTileSet.getLetter('A')).toBe(3);
    });
  });

  describe('listLetters', () => {
    it('should return a list of all letters with a count greater than 0', () => {
      const newTileSet = new TileSet();
      newTileSet.addTiles({ A: 1, B: 0, C: 3 });
      expect(newTileSet.listLetters()).toEqual(expect.arrayContaining(['A', 'C']));
    });
  });

  describe('listTiles', () => {
    it('should return a string representing each tile once', () => {
      const newTileSet = new TileSet();
      newTileSet.addTiles({ T: 2, E: 1, S: 1 });
      expect(newTileSet.listTiles()).toEqual('ESTT');
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

  describe('deleteAllTiles', () => {
    it('should reset the count of all letters to 0', () => {
      const newTileSet = new TileSet();
      newTileSet.addTiles({ A: 1, B: 2, C: 3 });
      newTileSet.setTiles({ A: 3, C: 2 });
      newTileSet.deleteAllTiles();
      expect(newTileSet.tileCount).toBe(0);
    });
  });

  describe('hasTiles', () => {
    it('should return true if the set has the given tiles', () => {
      const newTileSet = new TileSet();
      newTileSet.addTiles({ A: 1, B: 2, C: 3 });
      expect(newTileSet.hasTiles({ A: 1, B: 2 })).toBe(true);
      expect(newTileSet.hasTiles({ A: 1, B: 2, C: 4 })).toBe(false);
    });
  });

  describe('tilesFromString', () => {
    it('should return a set of tiles from a string', () => {
      expect(TileSet.tilesFromString('HELLO')).toEqual({ H: 1, E: 1, L: 2, O: 1 });
    });

    it('should not count spaces', () => {
      expect(TileSet.tilesFromString('W RLD')).toEqual({ W: 1, R: 1, L: 1, D: 1 });
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

  describe('getMissingTiles', () => {
    it('should return the number of tiles needed to reach the target', () => {
      const playerRack = new TileRack();
      playerRack.setTiles({ A: 1, D: 1, E: 1 });
      expect(playerRack.getMissingTiles()).toBe(4);
    });
  });

  describe('copyToNewRack', () => {
    it('should copy the tiles to a new rack and remove them from the original rack', () => {
      const playerRack = new TileRack();
      playerRack.setTiles({ A: 1, D: 2, E: 1 });
      const newRack = playerRack.copyToNewRack();
      expect(playerRack.tileCount).toBe(4);
      expect(newRack.tileCount).toBe(4);
      expect(newRack).not.toBe(playerRack);
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

  describe('Random tile draws', () => {
    describe('drawRandomTile', () => {
      it('should return a random tile and decrement the count', () => {
        const tileBag = new TileBag();
        tileBag.drawRandomTile();
        expect(tileBag.tileCount).toBe(99);
      });
    });

    describe('drawRandomVowel', () => {
      it('should return a vowel', () => {
        for (let i = 0; i < 20; i++) {
          const tileBag = new TileBag();
          const tile = tileBag.drawRandomVowel();
          expect('AEIOU').toContain(Object.keys(tile)[0]);
        }
      });
    });

    describe('drawRandomConsonant', () => {
      it('should return a vowel', () => {
        for (let i = 0; i < 20; i++) {
          const tileBag = new TileBag();
          const tile = tileBag.drawRandomConsonant();
          expect('AEIOU').not.toContain(Object.keys(tile)[0]);
        }
      });
    });
  });
});
