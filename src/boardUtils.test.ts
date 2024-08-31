import { UBFHelper } from './boardUtils';
import { PlayDirection, IUpwordsPlay } from './board';

describe('UBFHelper', () => {
  const emptyTestUBF = [
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
  const testUBF1 = [
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1W', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '1H', '1E', '1L', '1L', '2O', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1R', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1L', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1D', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
  ];
  const testUBF2 = [
    ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
    ['0 ', '1M', '0 ', '0 ', '0 ', '0 ', '1V', '0 ', '0 ', '0 '],
    ['0 ', '1A', '3H', '0 ', '0 ', '0 ', '1A', '0 ', '0 ', '0 '],
    ['0 ', '1N', '1O', '0 ', '5F', '1U', '4C', '3I', '0 ', '0 '],
    ['0 ', '1S', '2O', '3M', '2A', '1N', '1S', '0 ', '0 ', '0 '],
    ['0 ', '0 ', '4D', '5U', '3R', '4R', '0 ', '0 ', '0 ', '0 '],
    ['2Q', '1A', '1Y', '3S', '0 ', '2I', '1D', '0 ', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '5C', '3O', '5P', '1E', '0 ', '0 ', '0 '],
    ['0 ', '0 ', '0 ', '3A', '0 ', '1S', '3W', '2I', '2M', '0 '],
    ['1B', '1I', '1K', '1E', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
  ];
  describe('createEmptyBoard', () => {
    it('should return a 10x10 board with all 0s', () => {
      const board = UBFHelper.createEmptyBoard();
      expect(board).toEqual(emptyTestUBF);
    });
  });

  describe('copyBoard', () => {
    it('should return a new board with the same values', () => {
      const copy = UBFHelper.copyBoard(testUBF1);
      expect(copy).toEqual(testUBF1);
      expect(copy).not.toBe(testUBF1);
    });
  });

  describe('getTileAt', () => {
    it('should return the tile at the specified coord', () => {
      const testUBF1 = [
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1W', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '1H', '1E', '1L', '1L', '2O', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1R', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1L', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1D', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
      ];
      expect(UBFHelper.getTileAt(testUBF1, [4, 3])).toBe('1H');
      expect(UBFHelper.getTileAt(testUBF1, [4, 4])).toBe('1E');
      expect(UBFHelper.getTileAt(testUBF1, [4, 5])).toBe('1L');
      expect(UBFHelper.getTileAt(testUBF1, [4, 6])).toBe('1L');
      expect(UBFHelper.getTileAt(testUBF1, [4, 7])).toBe('2O');
      expect(UBFHelper.getTileAt(testUBF1, [3, 7])).toBe('1W');
      expect(UBFHelper.getTileAt(testUBF1, [2, 7])).toBe('0 ');
      expect(UBFHelper.getTileAt(testUBF1, [0, 0])).toBe('0 ');
      expect(UBFHelper.getTileAt(testUBF1, [0, 9])).toBe('0 ');
      expect(UBFHelper.getTileAt(testUBF1, [9, 0])).toBe('0 ');
      expect(UBFHelper.getTileAt(testUBF1, [9, 9])).toBe('0 ');
    });
  });

  describe('getHeightAt', () => {
    it('should return the height at the specified coord', () => {
      expect(UBFHelper.getHeightAt(testUBF1, [4, 3])).toBe(1);
      expect(UBFHelper.getHeightAt(testUBF2, [3, 4])).toBe(5);
      expect(UBFHelper.getHeightAt(testUBF2, [8, 3])).toBe(3);
    });
  });

  describe('getLetterAt', () => {
    it('should return the letter at the specified coord', () => {
      expect(UBFHelper.getLetterAt(testUBF1, [4, 3])).toBe('H');
      expect(UBFHelper.getLetterAt(testUBF2, [3, 4])).toBe('F');
      expect(UBFHelper.getLetterAt(testUBF2, [8, 3])).toBe('A');
    });
  });

  describe('offsetCoord', () => {
    it('should return the coord offset by the specified amount', () => {
      expect(UBFHelper.offsetCoord([4, 3], PlayDirection.Horizontal, 2)).toEqual([4, 5]);
      expect(UBFHelper.offsetCoord([4, 3], PlayDirection.Vertical, 2)).toEqual([6, 3]);
      expect(UBFHelper.offsetCoord([4, 3], PlayDirection.Horizontal, -2)).toEqual([4, 1]);
      expect(UBFHelper.offsetCoord([4, 3], PlayDirection.Vertical, -2)).toEqual([2, 3]);
    });
  });

  describe('coordsAreEqual', () => {
    it('should return true if two coords are equal', () => {
      expect(UBFHelper.coordsAreEqual([4, 3], [4, 3])).toBe(true);
    });

    it('should return false if two coords are not equal', () => {
      expect(UBFHelper.coordsAreEqual([4, 3], [3, 4])).toBe(false);
    });
  });

  describe('getOrthogonalDirection', () => {
    it('should return the orthogonal direction', () => {
      expect(UBFHelper.getOrthogonalDirection(PlayDirection.Horizontal)).toBe(
        PlayDirection.Vertical
      );
      expect(UBFHelper.getOrthogonalDirection(PlayDirection.Vertical)).toBe(
        PlayDirection.Horizontal
      );
    });
  });

  describe('getAdjacentCoords', () => {
    it('should return the coords adjacent to the given coord', () => {
      const adjacents = UBFHelper.getAdjacentCoords([4, 4]);
      expect(adjacents).toEqual(
        expect.arrayContaining([
          [3, 4],
          [4, 3],
          [4, 5],
          [5, 4]
        ])
      );
    });

    it('should only return coords on the board when given a square on the edge', () => {
      const adjacents = UBFHelper.getAdjacentCoords([0, 0]);
      expect(adjacents).toEqual(
        expect.arrayContaining([
          [0, 1],
          [1, 0]
        ])
      );
      expect(adjacents).not.toEqual(
        expect.arrayContaining([
          [-1, 0],
          [0, -1]
        ])
      );
    });
  });

  describe('getAdjacentTiles', () => {
    it('should return the tiles adjacent to the given coord', () => {
      const adjacents = UBFHelper.getAdjacentTiles(testUBF1, [4, 6]);
      expect(adjacents.map((cell) => cell.letter)).toEqual(expect.arrayContaining(['L', 'O']));
    });
  });

  describe('placeSingleTile', () => {
    it('should place a single tile at the specified coord', () => {
      const newBoard = UBFHelper.placeSingleTile(testUBF1, 'A', [4, 4]);
      expect(UBFHelper.getTileAt(newBoard, [4, 4])).toBe('2A');
    });
  });

  describe('placeTiles', () => {
    it('should place tiles according to the given play', () => {
      const play: IUpwordsPlay = {
        tiles: ' IN',
        start: [3, 7],
        direction: PlayDirection.Horizontal
      };
      const newBoard = UBFHelper.placeTiles(testUBF1, play);
      expect(UBFHelper.getTileAt(newBoard, [3, 7])).toBe('1W');
      expect(UBFHelper.getTileAt(newBoard, [3, 8])).toBe('1I');
      expect(UBFHelper.getTileAt(newBoard, [3, 9])).toBe('1N');
    });
  });

  describe('getLineOfPlay', () => {
    it('should return the entire row or column of the given play', () => {
      const line = UBFHelper.getLineOfPlay(testUBF1, [3, 7], PlayDirection.Horizontal);
      expect(line).toEqual(['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1W', '0 ', '0 ']);
      const lineVert = UBFHelper.getLineOfPlay(testUBF1, [3, 7], PlayDirection.Vertical);
      expect(lineVert).toEqual(['0 ', '0 ', '0 ', '1W', '2O', '1R', '1L', '1D', '0 ', '0 ']);
    });
  });

  describe('boardIsEmpty', () => {
    it('should return true if the board is empty', () => {
      expect(UBFHelper.boardIsEmpty(emptyTestUBF)).toBe(true);
    });

    it('should return false if the board is not empty', () => {
      expect(UBFHelper.boardIsEmpty(testUBF1)).toBe(false);
      expect(UBFHelper.boardIsEmpty(testUBF2)).toBe(false);
    });
  });

  describe('findWord', () => {
    it('should return the word found at the given coord and direction', () => {
      const word = UBFHelper.findWord(testUBF1, [4, 5], PlayDirection.Horizontal);
      expect(word).toEqual([
        { letter: 'H', height: 1, coord: [4, 3] },
        { letter: 'E', height: 1, coord: [4, 4] },
        { letter: 'L', height: 1, coord: [4, 5] },
        { letter: 'L', height: 1, coord: [4, 6] },
        { letter: 'O', height: 2, coord: [4, 7] }
      ]);
      const letterVert = UBFHelper.findWord(testUBF1, [4, 3], PlayDirection.Vertical);
      expect(letterVert).toEqual([{ letter: 'H', height: 1, coord: [4, 3] }]);
      const wordVert = UBFHelper.findWord(testUBF1, [3, 7], PlayDirection.Vertical);
      expect(wordVert).toEqual([
        { letter: 'W', height: 1, coord: [3, 7] },
        { letter: 'O', height: 2, coord: [4, 7] },
        { letter: 'R', height: 1, coord: [5, 7] },
        { letter: 'L', height: 1, coord: [6, 7] },
        { letter: 'D', height: 1, coord: [7, 7] }
      ]);
    });

    it('should find words at the edges of the board', () => {
      // test case included because of previous bug
      const word = UBFHelper.findWord(testUBF2, [6, 2], PlayDirection.Horizontal);
      expect(word).toEqual([
        { letter: 'Q', height: 2, coord: [6, 0] },
        { letter: 'A', height: 1, coord: [6, 1] },
        { letter: 'Y', height: 1, coord: [6, 2] },
        { letter: 'S', height: 3, coord: [6, 3] }
      ]);
    });

    it('should return an empty array if the coord has no tile placed on it', () => {
      const word = UBFHelper.findWord(testUBF2, [5, 6], PlayDirection.Horizontal);
      expect(word).toHaveLength(0);
    });
  });

  describe('getWordsFromPlay', () => {
    it('should return all words formed by the given play', () => {
      // play "MASS" from [6, 0] horizontally
      // form the words "MASS" and "HOODS"
      const play: IUpwordsPlay = {
        tiles: 'M S',
        start: [6, 0],
        direction: PlayDirection.Horizontal
      };
      const words = UBFHelper.getWordsFromPlay(testUBF2, play);
      expect(words).toHaveLength(2);
      expect(words).toEqual(
        expect.arrayContaining([
          [
            { letter: 'M', height: 3, coord: [6, 0] },
            { letter: 'A', height: 1, coord: [6, 1] },
            { letter: 'S', height: 2, coord: [6, 2] },
            { letter: 'S', height: 3, coord: [6, 3] }
          ],
          [
            { letter: 'H', height: 3, coord: [2, 2] },
            { letter: 'O', height: 1, coord: [3, 2] },
            { letter: 'O', height: 2, coord: [4, 2] },
            { letter: 'D', height: 4, coord: [5, 2] },
            { letter: 'S', height: 2, coord: [6, 2] }
          ]
        ])
      );
    });
  });

  describe('scorePlay', () => {
    it('should return the score of the given play', () => {
      // play "MASS" from [6, 0] horizontally
      // form the words "MASS" and "HOODS"
      const play: IUpwordsPlay = {
        tiles: 'M S',
        start: [6, 0],
        direction: PlayDirection.Horizontal
      };
      const score = UBFHelper.scorePlay(testUBF2, play);
      expect(score).toBe(21);
    });

    it('should add a bonus of 20 points for using all 7 tiles', () => {
      const play: IUpwordsPlay = {
        tiles: 'CINDERS',
        start: [2, 9],
        direction: PlayDirection.Vertical
      };
      const score = UBFHelper.scorePlay(testUBF2, play);
      expect(score).toBe(43);
    });
  });
});
