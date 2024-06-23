import { UpwordsBoard } from './board';
import { IUpwordsPlay, PlayDirection, MoveErrorCode } from './board';

function makePlay(tiles: string, start: [number, number], direction: PlayDirection): IUpwordsPlay {
  return {
    tiles,
    start,
    direction
  };
}
const testWordList = [
  'hello',
  'world',
  'hell',
  'shell',
  'es',
  'hells',
  'follow',
  'longest',
  'great',
  'stretch',
  'team',
  'hen',
  'up',
  'prawn',
  'be',
  'old',
  'board',
  'care',
  'word',
  'cart',
  'art',
  'cares',
  'carts',
  'words',
  'arts',
  'his',
  'hiss',
  'ape',
  'apes',
  'trip',
  'top',
  'quick',
  'test',
  'modal',
  'long',
  'lox',
  'ed',
  'cinders',
  'swims',
  'lion',
  'lad',
  'bone',
  'capes'
];

describe('UpwordsBoard', () => {
  describe('constructor', () => {
    it('should initialize an empty board', () => {
      const board = new UpwordsBoard(testWordList);
      expect(board.getUBF()).toEqual([
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
      ]);
    });

    it('should initialize a board with a given UBF', () => {
      const testUBF = [
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
      const board = new UpwordsBoard(testWordList, testUBF);
      expect(board.getUBF()).toEqual(testUBF);
    });
  });

  describe('playTiles', () => {
    it('should add a word at level 1 when the board is empty and return the UBF', () => {
      const board = new UpwordsBoard(testWordList);
      // play the five tiles 'HELLO' from [4, 3] going horizontally
      board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
      const outputUBF = [
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '1H', '1E', '1L', '1L', '1O', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
      ];
      expect(board.getUBF()).toEqual(outputUBF);
    });

    it('should handle vertical moves', () => {
      const board = new UpwordsBoard(testWordList);
      // play the five tiles 'HELLO' from [2, 5] going vertically
      board.playTiles(makePlay('HELLO', [2, 5], PlayDirection.Vertical));
      const outputUBF = [
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '1H', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '1E', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '1L', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '1L', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '1O', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
      ];
      expect(board.getUBF()).toEqual(outputUBF);
    });

    test('response should contain points scored and validity of the move', () => {
      const board = new UpwordsBoard(testWordList);
      // play the five tiles 'HELLO' from [4, 3] going horizontally
      const moveResult = board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
      expect(moveResult.points).toBeGreaterThan(0);
      expect(moveResult.isValid).toBe(true);
    });

    it('should stack tiles on top of existing tiles', () => {
      const board = new UpwordsBoard(testWordList);
      // play the five tiles 'HELLO' from [4, 3] going horizontally
      board.playTiles(makePlay('HELLS', [4, 3], PlayDirection.Horizontal));
      // play the five tiles 'WORLD' from [3, 7] going vertically
      board.playTiles(makePlay('WORLD', [3, 7], PlayDirection.Vertical));
      const expectedUBF = [
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
      expect(board.getUBF()).toEqual(expectedUBF);
    });

    it('should treat spaces as empty tiles', () => {
      const board = new UpwordsBoard(testWordList);
      // play the word 'HELLO' from [4, 3] going horizontally
      board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
      // play the word 'FOLLOW' from [3, 7] going vertically
      // the first 'O' should use the last 'O' in HELLO,
      board.playTiles(makePlay('F LLOW', [3, 7], PlayDirection.Vertical));
      const expectedUBF = [
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1F', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '1H', '1E', '1L', '1L', '1O', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1L', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1L', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1O', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1W', '0 ', '0 '],
        ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
      ];
      expect(board.getUBF()).toEqual(expectedUBF);
    });

    describe('validation', () => {
      it('should reject plays that put words out of bounds', () => {
        const board = new UpwordsBoard(testWordList);
        // play the word 'HELLO' from [5, 3] going horizontally
        board.playTiles(makePlay('HELLO', [5, 3], PlayDirection.Horizontal));
        // attempt to play the word 'LONGEST' from [5, 5] going vertically
        // actual coordidinate will be [6, 5] to use the first 'L' in 'HELLO'
        // this should be rejected because it would go out of bounds
        const moveResult1 = board.playTiles(makePlay('LONGEST', [6, 5], PlayDirection.Vertical));
        expect(moveResult1.isValid).toBe(false);
        expect(moveResult1.error).toBe(MoveErrorCode.OutOfBounds);
        // same as above, but with the word 'GREAT' from [4, 7] going horizontally
        const moveResult2 = board.playTiles(makePlay('GREAT', [4, 7], PlayDirection.Horizontal));
        expect(moveResult2.isValid).toBe(false);
        expect(moveResult2.error).toBe(MoveErrorCode.OutOfBounds);
        // play a word starting from out of bounds
        const moveResult3 = board.playTiles(makePlay('STRETC', [-1, 3], PlayDirection.Vertical));
        expect(moveResult3.isValid).toBe(false);
        expect(moveResult3.error).toBe(MoveErrorCode.OutOfBounds);
      });

      it('should reject plays that stack tiles over height 5', () => {
        const initialUBF = [
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '1T', '1E', '5S', '4T', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '1R', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '1I', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '1A', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '1L', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
        ];
        const board = new UpwordsBoard(testWordList, initialUBF);
        // try to make the word 'TEAM' from [4, 3] going horizontally
        // should fail because the 'A' would be stacked on an 'S' of height 5
        const moveResult = board.playTiles(makePlay('AM', [4, 5], PlayDirection.Horizontal));
        expect(moveResult.isValid).toBe(false);
        expect(moveResult.error).toBe(MoveErrorCode.HeightLimitExceeded);
      });

      it("should reject plays that don't connect to any existing tiles", () => {
        const board = new UpwordsBoard(testWordList);
        board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
        // try to make the word 'WORLD' from [5, 2] going vertically,
        // so that the 'W' is diagonal from the 'H' in 'HELLO'
        const moveResult = board.playTiles(makePlay('WORLD', [5, 2], PlayDirection.Vertical));
        expect(moveResult.isValid).toBe(false);
        expect(moveResult.error).toBe(MoveErrorCode.NotConnected);
      });

      it('should reject plays that have gaps', () => {
        const initialUBF = [
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1F', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '1H', '1E', '1L', '1L', '1O', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1L', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1L', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1O', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '1P', '1R', '1A', '1W', '1N', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
        ];
        const board = new UpwordsBoard(testWordList, initialUBF);
        // Try to play 'HEN' and 'UP' from [3, 4] going vertically
        // This uses the 'E' in 'HELLO' and the 'P' in 'PRAWN',
        // but there is a gap between the two words.
        const moveResult1 = board.playTiles(makePlay('H N U', [3, 4], PlayDirection.Vertical));
        expect(moveResult1.isValid).toBe(false);
        expect(moveResult1.error).toBe(MoveErrorCode.HasGap);
        // Similar test in the horizontal direction
        // Try to play 'BE' and 'OLD' in row X = 5
        const moveResult2 = board.playTiles(makePlay('BE  O D', [5, 2], PlayDirection.Horizontal));
        expect(moveResult2.isValid).toBe(false);
        expect(moveResult2.error).toBe(MoveErrorCode.HasGap);
      });

      it('should reject plays that stack the same tile on top of itself', () => {
        const board = new UpwordsBoard(testWordList);
        // play the five tiles 'HELLO' from [4, 3] going horizontally
        board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
        // try to play the word 'WORLD' from [1, 5] going vertically
        // this should fail because the 'L' would be stacked on top of itself
        const moveResult = board.playTiles(makePlay('WORLD', [1, 5], PlayDirection.Vertical));
        expect(moveResult.isValid).toBe(false);
        expect(moveResult.error).toBe(MoveErrorCode.SameTileStacked);
      });

      it('should reject plays that completely cover existing words', () => {
        const board = new UpwordsBoard(testWordList);
        // play the five tiles 'HELLO' from [4, 3] going horizontally
        board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
        // try to play the word 'WORLD' from [4, 3] going horizontally
        // this should fail because it completely covers the existing word 'HELLO'
        const moveResult = board.playTiles(makePlay('BOARD', [4, 3], PlayDirection.Horizontal));
        expect(moveResult.isValid).toBe(false);
        expect(moveResult.error).toBe(MoveErrorCode.CoversExistingWord);
      });

      it('should reject first play that does not cover the four center squares', () => {
        const board = new UpwordsBoard(testWordList);
        // try to play the word 'HELLO' from [3, 3] going horizontally
        // this should fail because it does not cover the four center squares
        const moveResult1 = board.playTiles(makePlay('HELLO', [3, 3], PlayDirection.Horizontal));
        expect(moveResult1.isValid).toBe(false);
        expect(moveResult1.error).toBe(MoveErrorCode.FirstPlayDoesNotCoverCenter);

        // test with a vertical play
        // try to play the word 'WORD' from [0, 4] going vertically
        // this doesn't reach the center tiles by one square
        const moveResult2 = board.playTiles(makePlay('WORD', [0, 4], PlayDirection.Vertical));
        expect(moveResult2.isValid).toBe(false);
        expect(moveResult2.error).toBe(MoveErrorCode.FirstPlayDoesNotCoverCenter);
      });

      // Tests:
      // - Rejected plays should not change the board
      // - Rejected plays should not be added to the play history

      describe('rejecting plays that only pluralize existing words with an S', () => {
        // In the Upwords app, this is implemented by checking if the play appends
        // an S to an existing word which doesn't end in S, regardless of whether
        // the resulting word is actually a pluralization of the original word.
        // This is a slightly lazy implementation, but here we are mimicking the
        // app's behavior for the sake of compatibility.
        it('should reject plays that only append an S to words', () => {
          // one word and two
          const initialUBF = [
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1A', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '1C', '1A', '1R', '1T', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '1A', '0 ', '1T', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '1W', '1O', '1R', '1D', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '1E', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
          ];
          const board = new UpwordsBoard(testWordList, initialUBF);
          // vertical: CARE -> CARES
          const moveResult1 = board.playTiles(makePlay('S', [6, 5], PlayDirection.Vertical));
          expect(moveResult1.isValid).toBe(false);
          expect(moveResult1.error).toBe(MoveErrorCode.OnlyPluralizesWord);
          // horizontal: CART -> CARTS
          const moveResult2 = board.playTiles(makePlay('S', [2, 9], PlayDirection.Horizontal));
          expect(moveResult2.isValid).toBe(false);
          expect(moveResult2.error).toBe(MoveErrorCode.OnlyPluralizesWord);
          // 2 words: WORDs and ARTs
          const moveResult3 = board.playTiles(makePlay('S', [4, 7], PlayDirection.Horizontal));
          expect(moveResult3.isValid).toBe(false);
          expect(moveResult3.error).toBe(MoveErrorCode.OnlyPluralizesWord);
        });

        // Allow various other cases of adding S to words
        it('should allow adding an S to a word if the word already ends in S', () => {
          const initialUBF = [
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '1H', '1I', '1S', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
          ];
          const board = new UpwordsBoard(testWordList, initialUBF);
          // HIS -> HISS
          const moveResult = board.playTiles(makePlay('S', [4, 6], PlayDirection.Horizontal));
          expect(moveResult.isValid).toBe(true);
        });

        it('should allow single S plays that are not pluralizations', () => {
          const initialUBF = [
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '1H', '1E', '1L', '1L', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
          ];
          const board = new UpwordsBoard(testWordList, initialUBF);
          // Adding single S to the start of a word
          const moveResult1 = board.playTiles(makePlay('S', [4, 2], PlayDirection.Vertical));
          expect(moveResult1.isValid).toBe(true);
          // Adding single S to form a 2-letter word
          const moveResult2 = board.playTiles(makePlay('S', [5, 4], PlayDirection.Vertical));
          expect(moveResult2.isValid).toBe(true);
        });

        it('should allow adding an S to a word if it is a pluralization but also forms a new word', () => {
          const initialUBF = [
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1A', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '1T', '1O', '1P', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '1R', '0 ', '1E', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '1H', '1I', '1S', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '1P', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
            ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
          ];
          const board = new UpwordsBoard(testWordList, initialUBF);
          // Horizontally, "HISS" makes this safe
          const moveResult = board.playTiles(makePlay('S', [4, 6], PlayDirection.Horizontal));
          expect(moveResult.isValid).toBe(true);
        });
      });
    });

    describe('word checking', () => {
      it('should reject words that are not in the dictionary', () => {
        const board = new UpwordsBoard(testWordList);
        const moveResult = board.playTiles(makePlay('SSPACE', [4, 3], PlayDirection.Horizontal));
        expect(moveResult.isValid).toBe(false);
        expect(moveResult.error).toBe(MoveErrorCode.InvalidWord);
      });

      it('should treat "Q" as "Qu" for spelling', () => {
        const board = new UpwordsBoard(testWordList);
        // play the word 'QUICK' from [4, 3] going horizontally
        const moveResult = board.playTiles(makePlay('QICK', [4, 3], PlayDirection.Horizontal));
        expect(moveResult.isValid).toBe(true);
      });
    });

    describe('scoring', () => {
      // Tests:
      it('should score double for words of all 1 height', () => {
        const board = new UpwordsBoard(testWordList);
        // play the word 'TESTING' from [4, 1] going horizontally
        const moveResult = board.playTiles(makePlay('TEST', [4, 1], PlayDirection.Horizontal));
        expect(moveResult.points).toBe(8);
      });

      test('score equals the sum of the height of tiles for all words created', () => {
        const initialUBF = [
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1F', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '2J', '0 ', '0 ', '1O', '0 ', '0 '],
          ['0 ', '0 ', '1S', '4C', '2A', '5L', '2E', '1R', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '5M', '2A', '1M', '4A', '1S', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '1N', '0 ', '1Y', '1O', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '1G', '0 ', '0 ', '1X', '0 ']
        ];
        const board = new UpwordsBoard(testWordList, initialUBF);
        // play the word 'MODAL' from [7, 4] going horizontally
        // First letter is omitted because it is already on the board
        const moveResult = board.playTiles(makePlay('OD L', [7, 5], PlayDirection.Horizontal));
        // MODAL: 16, LONG: 10, LOX: 4, ED: 4
        expect(moveResult.points).toBe(34);
      });

      it('should award a 20 point bonus for using all 7 tiles', () => {
        const initialUBF = [
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
        const board = new UpwordsBoard(testWordList, initialUBF);
        // play the word 'CINDERS' from [2, 9] going vertically
        const moveResult = board.playTiles(makePlay('CINDERS', [2, 9], PlayDirection.Vertical));
        expect(moveResult.points).toBe(43);
      });
    });

    describe('end to end tests / edge cases', () => {
      // Make tests to play edge cases and validate responses
      // Tests:
      // - Play words with gaps
      // - Reject plays with only one invalid word
      it('should handle complex cases when calculating whether a word is covered', () => {
        const initialUBF = [
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '2B', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '3B', '0 ', '4A', '1N', '0 ', '3R', '2U', '2G'],
          ['0 ', '0 ', '2A', '0 ', '3N', '0 ', '0 ', '3A', '0 ', '0 '],
          ['0 ', '0 ', '1D', '1I', '1E', '1T', '1I', '1N', '1G', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
        ];
        const board = new UpwordsBoard(testWordList, initialUBF);
        // Place the letters "LIO" to form the word "LION" from [4, 2] going horizontally
        const moveResult = board.playTiles(makePlay('LIO', [4, 2], PlayDirection.Horizontal));
        // This move should be valid, because no whole word is covered
        expect(moveResult.isValid).toBe(true);
      });

      it('should handle words at the edge of the board', () => {
        const initialUBF = [
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1C', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '1A', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '1T', '1O', '1P', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '1R', '0 ', '1E', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '1H', '1I', '1S', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '1P', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 '],
          ['0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ', '0 ']
        ];
        const board = new UpwordsBoard(testWordList, initialUBF);
        // Horizontally, "HISS" makes this safe
        const moveResult = board.playTiles(makePlay('S', [4, 6], PlayDirection.Horizontal));
        expect(moveResult.isValid).toBe(true);
      });
    });
  });

  describe('checkPlay', () => {
    it('should have isValid=true if the play is valid', () => {
      const board = new UpwordsBoard(testWordList);
      const result = board.checkPlay(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
      expect(result.isValid).toBe(true);
    });

    it('should have isValid=false if the play is invalid', () => {
      const board = new UpwordsBoard(testWordList);
      const result = board.checkPlay(makePlay('HELLO', [7, 3], PlayDirection.Horizontal));
      expect(result.isValid).toBe(false);
    });

    it('should not modify the board', () => {
      const board = new UpwordsBoard(testWordList);
      const initialUBF = board.getUBF();
      board.checkPlay(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
      expect(board.getUBF()).toEqual(initialUBF);
    });
  });

  describe('Play History', () => {
    describe('getPreviousMove', () => {
      it('should contain points scored and validity of the previous move', () => {
        const board = new UpwordsBoard(testWordList);
        // play the five tiles 'HELLO' from [4, 3] going horizontally
        board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
        const moveResult = board.getPreviousMove();
        expect(moveResult.points).toBe(10);
        expect(moveResult.isValid).toBe(true);
      });
    });

    // Tests:
    // - Invalid moves should not be added to the play history
  });
});
