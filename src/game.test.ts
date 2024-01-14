import UpwordsGame from './game';

describe('UpwordsGame', () => {
  describe('constructor', () => {
    it('should take number of players as an argument', () => {
      const newGame = new UpwordsGame(2);
      expect(newGame.players).toBe(2);
    });

    it('should default to 1 player', () => {
      const newGame = new UpwordsGame();
      expect(newGame.players).toBe(1);
    });
  });

  describe('Turn Behavior', () => {
    it('should start with player 1', () => {
      const game = new UpwordsGame(1);
      expect(game.currentPlayer).toBe(1);
    });

    it('should cycle through players when there are more than 1', () => {
      const game = new UpwordsGame(3);
      expect(game.currentPlayer).toBe(1);
      game.playMove();
      expect(game.currentPlayer).toBe(2);
      game.playMove();
      expect(game.currentPlayer).toBe(3);
      game.playMove();
      expect(game.currentPlayer).toBe(1);
    });

    it('should not cycle through players when there is only 1', () => {
      const game = new UpwordsGame(1);
      expect(game.currentPlayer).toBe(1);
      game.playMove();
      expect(game.currentPlayer).toBe(1);
    });
  });
});
