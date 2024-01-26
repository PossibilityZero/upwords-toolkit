import UpwordsBoard from './board';
import { IUpwordsPlay, PlayDirection, MoveErrorCode } from './board';

function makePlay(tiles: string, start: [number, number], direction: PlayDirection): IUpwordsPlay {
  return {
    tiles,
    start,
    direction
  };
}
describe('UpwordsBoard', () => {
  describe('constructor', () => {
    it('should initialize an empty board', () => {
      const board = new UpwordsBoard();
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
      const board = new UpwordsBoard(testUBF);
      expect(board.getUBF()).toEqual(testUBF);
    });
  });

  describe('playTiles', () => {
    it('should add a word at level 1 when the board is empty and return the UBF', () => {
      const board = new UpwordsBoard();
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
      const board = new UpwordsBoard();
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
      const board = new UpwordsBoard();
      // play the five tiles 'HELLO' from [4, 3] going horizontally
      const moveResult = board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
      expect(moveResult.points).toBe(10);
      expect(moveResult.isValid).toBe(true);
    });

    it('should stack tiles on top of existing tiles', () => {
      const board = new UpwordsBoard();
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
      const board = new UpwordsBoard();
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
        const board = new UpwordsBoard();
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
        const board = new UpwordsBoard(initialUBF);
        // try to make the word 'TEAM' from [4, 3] going horizontally
        // should fail because the 'A' would be stacked on an 'S' of height 5
        const moveResult = board.playTiles(makePlay('AM', [4, 5], PlayDirection.Horizontal));
        expect(moveResult.isValid).toBe(false);
        expect(moveResult.error).toBe(MoveErrorCode.HeightLimitExceeded);
      });

      it("should reject plays that don't connect to any existing tiles", () => {
        const board = new UpwordsBoard();
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
        const board = new UpwordsBoard(initialUBF);
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
        const board = new UpwordsBoard();
        // play the five tiles 'HELLO' from [4, 3] going horizontally
        board.playTiles(makePlay('HELLO', [4, 3], PlayDirection.Horizontal));
        // try to play the word 'WORLD' from [1, 5] going vertically
        // this should fail because the 'L' would be stacked on top of itself
        const moveResult = board.playTiles(makePlay('WORLD', [1, 5], PlayDirection.Vertical));
        expect(moveResult.isValid).toBe(false);
        expect(moveResult.error).toBe(MoveErrorCode.SameTileStacked);
      });

      // Tests:
      // - Reject plays that completely cover existing words
      // - Reject first play that doesn't cover the four center squares
      // - Reject plays with words shorter than 2 letters
      // - Rejected plays should not change the board
      // - Rejected plays should not be added to the play history
      // Advanced tests:
      // - Reject plays that only pluralize existing words with an S
    });

    describe('word checking', () => {
      // Tests:
      // - Check that words are in the dictionary
      // - Check that words are not proper nouns
      // - Check that words are more than 1 letter
      // - Check that "Q" is treated as "Qu" for spelling
    });

    describe('scoring', () => {
      // Tests:
      // - Score double for words of all 1 height
      // - Score plays based on sum of height of tiles
      // - Score all words affected by the play
      // - Award 20 point bonus for using all 7 tiles
    });

    describe('end to end tests / edge cases', () => {
      // Make tests to play edge cases and validate responses
      // Tests:
      // - Play words with gaps
    });
  });

  describe('Play History', () => {
    describe('getPreviousMove', () => {
      it('should contain points scored and validity of the previous move', () => {
        const board = new UpwordsBoard();
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
