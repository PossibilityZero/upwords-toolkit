import { UpwordsGame } from './game';
import { UpwordsPlay, PlayDirection, UBFHelper } from './boardUtils';
import { MoveErrorCode } from './board';

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

    it('should default to automatically drawing tiles', () => {
      const newGame = new UpwordsGame(2);
      expect(newGame.getTiles(0).tileCount).toBe(7);
      expect(newGame.getTiles(1).tileCount).toBe(7);
    });
  });

  describe('Turn Behavior', () => {
    it('should start with player 0', () => {
      const game = new UpwordsGame(1);
      expect(game.currentPlayer).toBe(0);
    });

    it('should cycle through players when there are more than 1', () => {
      const game = new UpwordsGame(2, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTileBag().removeTiles({ W: 1, R: 2, L: 1, D: 2, A: 1 });
      game.getTiles(1).addTiles({ W: 1, R: 2, L: 1, D: 2, A: 1 });
      expect(game.currentPlayer).toBe(0);
      game.playMove(defaultStarterMove);
      expect(game.currentPlayer).toBe(1);
      game.playMove(defaultSecondMove);
      expect(game.currentPlayer).toBe(0);
    });

    it('should not cycle through players when there is only 1', () => {
      const game = new UpwordsGame(1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      expect(game.currentPlayer).toBe(0);
      game.playMove(defaultStarterMove);
      expect(game.currentPlayer).toBe(0);
      expect(game.getScore(0)).toBe(10);
    });

    it('should draw tiles to replenish the player rack after a move', () => {
      const game = new UpwordsGame(1);
      // return all tiles to the bag and manually set it up with letters for "HELLO"
      // this is necessary because we want to test the automatic drawing behavior,
      // but that option also makes the initial draw random
      // and we need specific tiles for the first play
      game.getTileBag().addTiles(game.getTiles(0).getTiles());
      game.getTiles(0).deleteAllTiles();
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });

      expect(game.getTileBag().tileCount).toBe(93);
      game.playMove(defaultStarterMove);
      expect(game.getTiles(0).tileCount).toBe(7);
      expect(game.getTileBag().tileCount).toBe(88);
    });
  });

  describe('playMove', () => {
    it('should take an UpwordsPlay', () => {
      const game = new UpwordsGame();
      game.playMove(defaultStarterMove);
    });

    it('should update the board with the play', () => {
      const game = new UpwordsGame(1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.playMove(defaultStarterMove);
      const board = game.getUBF();
      expect(UBFHelper.getLetterAt(board, [4, 3])).toBe('H');
    });

    it('should update the score of the player', () => {
      const game = new UpwordsGame(1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.playMove(defaultStarterMove);
      expect(game.getScore(0)).toBe(10);
    });

    it('should only allow plays using the available tiles', () => {
      const game = new UpwordsGame(2, true);
      game.getTileBag().removeTiles({ A: 1, B: 1, C: 1, D: 1, E: 1, F: 1, G: 1 });
      game.getTiles(0).addTiles({ A: 1, B: 1, C: 1, D: 1, E: 1, F: 1, G: 1 });
      const badMove: UpwordsPlay = {
        tiles: 'HELLO',
        start: [4, 3],
        direction: PlayDirection.Horizontal
      };
      game.playMove(badMove);
      expect(game.currentPlayer).toBe(0);
      expect(game.getScore(0)).toBe(0);
    });
  });

  describe('Manual Tile Drawing', () => {
    describe('drawSpecificTiles', () => {
      it('should draw the specified tiles for the specified player', () => {
        const game = new UpwordsGame(2, true);
        const result = game.drawSpecificTiles(1, 'H LLO');
        expect(game.getTiles(1).getTiles()).toEqual({ H: 1, L: 2, O: 1 });
        expect(result).toBeTruthy();
      });

      it('should return false if the tile bag does not have the specified tiles', () => {
        const game = new UpwordsGame(1, true);
        const result = game.drawSpecificTiles(0, 'XXXQQQQ');
        expect(result).toBeFalsy();
      });
    });
  });

  describe('checkMove', () => {
    it('should return the play result if the play is valid', () => {
      const game = new UpwordsGame(1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      const result = game.checkMove(defaultStarterMove);
      expect(result.isValid).toBe(true);
      expect(result.points).toBe(10);
    });

    it('should return the correct error code if the play is invalid', () => {
      const game = new UpwordsGame(1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      const badMove: UpwordsPlay = {
        tiles: 'LLHEO',
        start: [4, 3],
        direction: PlayDirection.Horizontal
      };
      const result = game.checkMove(badMove);
      expect(result.isValid).toBe(false);
      expect(result.error).toBe(MoveErrorCode.InvalidWord);
    });

    it('should return an error if the player does not have the correct tiles', () => {
      const game = new UpwordsGame(1, true);
      game.getTileBag().removeTiles({ A: 1, B: 1, C: 1, D: 1, E: 1, F: 1, G: 1 });
      game.getTiles(0).addTiles({ A: 1, B: 1, C: 1, D: 1, E: 1, F: 1, G: 1 });
      const badMove: UpwordsPlay = {
        tiles: 'HELLO',
        start: [4, 3],
        direction: PlayDirection.Horizontal
      };
      const result = game.checkMove(badMove);
      expect(result.isValid).toBe(false);
    });
  });

  describe('gameState', () => {
    describe('getUBF', () => {
      it('should return a UBF copy of the game board', () => {
        const game = new UpwordsGame();
        expect(game.getUBF()).toBeDefined();
      });
    });

    describe('getBoard', () => {
      it('should return the game board', () => {
        const game = new UpwordsGame();
        expect(game.getBoard().getUBF).toBeDefined();
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
