import { UpwordsGame } from './game';
import { UpwordsPlay, PlayDirection, UBFHelper } from './boardUtils';

describe('UpwordsGame', () => {
  const defaultStarterMove: UpwordsPlay = {
    tiles: 'HELLO',
    start: [4, 3],
    direction: PlayDirection.Horizontal
  };
  const defaultSecondMove: UpwordsPlay = {
    tiles: 'W RLD',
    start: [3, 7],
    direction: PlayDirection.Vertical
  };
  describe('constructor', () => {
    it('should take number of players as an argument', () => {
      const newGame = new UpwordsGame(2);
      expect(newGame.playerCount).toBe(2);
    });

    it('should default to 1 player', () => {
      const newGame = new UpwordsGame();
      expect(newGame.playerCount).toBe(1);
    });
  });

  describe('Turn Behavior', () => {
    it('should start with player 0', () => {
      const game = new UpwordsGame(1);
      expect(game.currentPlayer).toBe(0);
    });

    it('should cycle through players when there are more than 1', () => {
      const game = new UpwordsGame(2);
      expect(game.currentPlayer).toBe(0);
      game.playMove(defaultStarterMove);
      expect(game.currentPlayer).toBe(1);
      game.playMove(defaultSecondMove);
      expect(game.currentPlayer).toBe(0);
    });

    it('should not cycle through players when there is only 1', () => {
      const game = new UpwordsGame(1);
      expect(game.currentPlayer).toBe(0);
      game.playMove(defaultStarterMove);
      expect(game.currentPlayer).toBe(0);
    });
  });

  describe('playMove', () => {
    it('should take an UpwordsPlay', () => {
      const game = new UpwordsGame();
      game.playMove(defaultStarterMove);
    });

    it('should update the board with the play', () => {
      const game = new UpwordsGame();
      game.playMove(defaultStarterMove);
      const board = game.getBoard();
      expect(UBFHelper.getLetterAt(board, [4, 3])).toBe('H');
    });

    it('should update the score of the player', () => {
      const game = new UpwordsGame();
      game.playMove(defaultStarterMove);
      expect(game.getScore(0)).toBe(10);
    });
  });

  describe('gameState', () => {
    describe('getBoard', () => {
      it('should return the game board', () => {
        const game = new UpwordsGame();
        expect(game.getBoard()).toBeDefined();
      });
    });

    describe('tiles', () => {
      describe('getTiles should return the tiles for the specified player', () => {
        const game = new UpwordsGame();
        expect(game.getTiles(0)).toBeDefined();
      });

      describe('getTileBag should return the tile bag', () => {
        const game = new UpwordsGame();
        expect(game.tileBag).toBeDefined();
      });
    });

    describe('score', () => {
      describe('getScore should return the score for the specified player', () => {
        const game = new UpwordsGame();
        expect(game.getScore(0)).toBe(0);
      });
    });
  });
});
