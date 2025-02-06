import { UpwordsGame } from './game';
import { UpwordsPlay, PlayDirection, UBFHelper } from './boardUtils';
import { MoveErrorCode } from './board';
import { TileBag } from './tiles';

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
  const testWordList = ['HELLO', 'WORLD'];

  describe('constructor', () => {
    it('should take a word list as an argument', () => {
      new UpwordsGame(testWordList);
    });

    it('should take number of players as an argument', () => {
      const newGame = new UpwordsGame(testWordList, 2);
      expect(newGame.playerCount).toBe(2);
    });

    it('should default to 1 player', () => {
      const newGame = new UpwordsGame(testWordList);
      expect(newGame.playerCount).toBe(1);
    });

    it('should default to manually drawing tiles', () => {
      const newGame = new UpwordsGame(testWordList, 2);
      expect(newGame.getTiles(0).tileCount).toBe(0);
      expect(newGame.getTiles(1).tileCount).toBe(0);
    });
  });

  describe('Turn Behavior', () => {
    it('should start with player 0', () => {
      const game = new UpwordsGame(testWordList, 1);
      expect(game.currentPlayer).toBe(0);
    });

    it('should cycle through players when there are more than 1', () => {
      const game = new UpwordsGame(testWordList, 2, true);
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
      const game = new UpwordsGame(testWordList, 1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      expect(game.currentPlayer).toBe(0);
      game.playMove(defaultStarterMove);
      expect(game.currentPlayer).toBe(0);
      expect(game.getScore(0)).toBe(10);
    });

    it('should draw tiles to replenish the player rack after a move if manual tiles is false', () => {
      const game = new UpwordsGame(testWordList, 1, false);
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

    describe('skipTurn', () => {
      it('should skip the current player', () => {
        const game = new UpwordsGame(testWordList, 2, true);
        game.skipTurn();
        expect(game.currentPlayer).toBe(1);
        game.skipTurn();
        expect(game.currentPlayer).toBe(0);
      });
    });

    describe('End of game', () => {
      describe('isFinished', () => {
        it('should return true if one player has 0 tiles, and the tile bag is empty', () => {
          const game = new UpwordsGame(testWordList, 2);
          game.getTileBag().deleteAllTiles();
          game.getTiles(1).deleteAllTiles();
          expect(game.isFinished()).toBe(true);
        });

        it('should return false if every player still has at least 1 tile', () => {
          const game = new UpwordsGame(testWordList, 2, true);
          game.getTiles(0).setTiles({ A: 1 });
          game.getTiles(1).setTiles({ B: 1 });
          game.getTileBag().deleteAllTiles();
          expect(game.isFinished()).toBe(false);
        });

        it('should return false if the tile bag is not empty', () => {
          const game = new UpwordsGame(testWordList, 1, true);
          game.getTileBag().deleteAllTiles();
          game.getTileBag().setTiles({ A: 1 });
          expect(game.isFinished()).toBe(false);
        });
      });
    });
  });

  describe('playMove', () => {
    it('should take an UpwordsPlay', () => {
      const game = new UpwordsGame(testWordList);
      game.playMove(defaultStarterMove);
    });

    it('should update the board with the play', () => {
      const game = new UpwordsGame(testWordList, 1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.playMove(defaultStarterMove);
      const board = game.getUBF();
      expect(UBFHelper.getLetterAt(board, [4, 3])).toBe('H');
    });

    it('should update the score of the player', () => {
      const game = new UpwordsGame(testWordList, 1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.playMove(defaultStarterMove);
      expect(game.getScore(0)).toBe(10);
    });

    it('should only allow plays using the available tiles', () => {
      const game = new UpwordsGame(testWordList, 2, true);
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
    it('should not automatically draw tiles after a turn if manualTiles is set to true', () => {
      const game = new UpwordsGame(testWordList, 1, true);
      game.drawSpecificTiles(0, 'HELLO');
      expect(game.getTiles(0).tileCount).toBe(5);
      game.playMove(defaultStarterMove);
      expect(game.getTiles(0).tileCount).toBe(0);
      expect(game.getTileBag().tileCount).toBe(95);
    });

    describe('drawSpecificTiles', () => {
      it('should draw the specified tiles for the specified player', () => {
        const game = new UpwordsGame(testWordList, 2, true);
        const result = game.drawSpecificTiles(1, 'H LLO');
        expect(game.getTiles(1).getTiles()).toEqual({ H: 1, L: 2, O: 1 });
        expect(result).toBeTruthy();
      });

      it('should return false if the tile bag does not have the specified tiles', () => {
        const game = new UpwordsGame(testWordList, 1, true);
        const result = game.drawSpecificTiles(0, 'XXXQQQQ');
        expect(result).toBeFalsy();
      });
    });

    describe('returnSpecificTiles', () => {
      it('should return the specified tiles to the tile bag', () => {
        const game = new UpwordsGame(testWordList, 1, true);
        game.drawSpecificTiles(0, 'HELLO');
        const result = game.returnSpecificTiles(0, 'LLO');
        expect(result).toBeTruthy();
        expect(game.getTiles(0).tileCount).toBe(2);
        expect(game.getTileBag().tileCount).toBe(98);
        expect(game.getTiles(0).getTiles()).toEqual({ H: 1, E: 1 });
      });

      it('should return false if the player does not have the specified tiles', () => {
        const game = new UpwordsGame(testWordList, 1, true);
        game.drawSpecificTiles(0, 'HELL');
        const result = game.returnSpecificTiles(0, 'HELLO');
        expect(result).toBeFalsy();
        expect(game.getTiles(0).tileCount).toBe(4);
      });
    });

    describe('drawRandomTiles', () => {
      it('should draw random tiles for the specified player to replenish their rack', () => {
        const game = new UpwordsGame(testWordList, 2, true);
        expect(game.getTiles(0).tileCount).toBe(0);
        expect(game.getTiles(1).tileCount).toBe(0);
        game.drawRandomTiles(0);
        expect(game.getTiles(0).tileCount).toBe(7);
        expect(game.getTiles(1).tileCount).toBe(0);
      });
    });
  });

  describe('Reserve Tiles', () => {
    describe('setAsideTiles', () => {
      it('should move the specified tiles from the tile bag to the reserved set', () => {
        const game = new UpwordsGame(testWordList, 1);
        expect(game.getTileBag().tileCount).toBe(100);
        expect(game.getReservedTiles().tileCount).toBe(0);
        game.setAsideTiles('HELLO');
        expect(game.getTileBag().tileCount).toBe(95);
        expect(game.getReservedTiles().getTiles()).toEqual({ H: 1, E: 1, L: 2, O: 1 });
        expect(game.getReservedTiles().tileCount).toBe(5);
      });

      it('should return boolean for success/failure and only transfer on success', () => {
        const game = new UpwordsGame(testWordList, 1);
        expect(game.getTileBag().tileCount).toBe(100);
        expect(game.setAsideTiles('XXX')).toBe(false); // more than count
        expect(game.getTileBag().tileCount).toBe(100);
        expect(game.setAsideTiles('HELLO')).toBe(true);
        expect(game.getTileBag().tileCount).toBe(95);
        game.getTileBag().deleteAllTiles();
        expect(game.setAsideTiles('A')).toBe(false); // not in bag
      });
    });

    describe('returnReservedTiles', () => {
      it('should move the specified tiles from the reserved set to the tile bag', () => {
        const game = new UpwordsGame(testWordList, 1);
        game.setAsideTiles('HELLO');
        expect(game.getTileBag().tileCount).toBe(95);
        expect(game.getReservedTiles().tileCount).toBe(5);
        game.returnReservedTiles('LOL');
        expect(game.getTileBag().tileCount).toBe(98);
        expect(game.getReservedTiles().getTiles()).toEqual({ H: 1, E: 1 });
        expect(game.getReservedTiles().tileCount).toBe(2);
      });

      it('should return boolean for success/failure and only transfer on success', () => {
        const game = new UpwordsGame(testWordList, 1);
        game.setAsideTiles('HELLO');
        expect(game.returnReservedTiles('LLO')).toBe(true);
        expect(game.getReservedTiles().tileCount).toBe(2);
        expect(game.returnReservedTiles('LLO')).toBe(false);
        expect(game.getReservedTiles().tileCount).toBe(2);
      });
    });

    describe('returnAllReservedTiles', () => {
      it('should move all reserved tiles to the tile bag', () => {
        const game = new UpwordsGame(testWordList, 1);
        game.setAsideTiles('HELLO');
        game.getTileBag().deleteAllTiles();
        expect(game.getTileBag().tileCount).toBe(0);
        expect(game.getReservedTiles().tileCount).toBe(5);
        game.returnAllReservedTiles();
        expect(game.getTileBag().tileCount).toBe(5);
        expect(game.getReservedTiles().tileCount).toBe(0);
        expect(game.getTileBag().getTiles()).toEqual({ H: 1, E: 1, L: 2, O: 1 });
      });
    });
  });

  describe('checkMove', () => {
    it('should return the play result if the play is valid', () => {
      const game = new UpwordsGame(testWordList, 1, true);
      game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
      game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
      const result = game.checkMove(defaultStarterMove);
      expect(result.isValid).toBe(true);
      expect(result.points).toBe(10);
    });

    it('should return the correct error code if the play is invalid', () => {
      const game = new UpwordsGame(testWordList, 1, true);
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
      const game = new UpwordsGame(testWordList, 1, true);
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

    it('should have an option to ignore the player rack when checking a move', () => {
      const game = new UpwordsGame(testWordList, 1, true);
      game.getTileBag().removeTiles({ A: 1, B: 1, C: 1, D: 1, E: 1, F: 1, G: 1 });
      game.getTiles(0).addTiles({ A: 1, B: 1, C: 1, D: 1, E: 1, F: 1, G: 1 });
      const badMove: UpwordsPlay = {
        tiles: 'HELLO',
        start: [4, 3],
        direction: PlayDirection.Horizontal
      };
      const result = game.checkMove(badMove, true);
      expect(result.isValid).toBe(true);
    });
  });

  describe('gameState', () => {
    describe('getUBF', () => {
      it('should return a UBF copy of the game board', () => {
        const game = new UpwordsGame(testWordList);
        expect(game.getUBF()).toBeDefined();
      });
    });

    describe('getBoard', () => {
      it('should return the game board', () => {
        const game = new UpwordsGame(testWordList);
        expect(game.getBoard().getUBF).toBeDefined();
      });
    });

    describe('Tiles', () => {
      describe('getTiles should return the tiles for the specified player', () => {
        const game = new UpwordsGame(testWordList);
        expect(game.getTiles(0)).toBeDefined();
      });

      describe('getTileBag should return the tile bag', () => {
        const game = new UpwordsGame(testWordList);
        expect(game.getTileBag()).toBeInstanceOf(TileBag);
      });
    });

    describe('Save and Load', () => {
      describe('serialize', () => {
        it('should return a string representation of the game state', () => {
          const game = new UpwordsGame(testWordList);
          expect(game.serialize()).toBeDefined();
        });
      });

      describe('newGameFromSerialized', () => {
        it('should create a new game from a string representation', () => {
          const game = new UpwordsGame(testWordList, 2, true);
          game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTileBag().removeTiles({ W: 1, R: 2, L: 1, D: 2, X: 1 });
          game.getTiles(1).addTiles({ W: 1, R: 2, L: 1, D: 2, X: 1 });
          game.playMove(defaultStarterMove);
          const serialized = game.serialize();

          game.playMove(defaultSecondMove);
          const loadedGame = UpwordsGame.newGameFromSerialized(testWordList, serialized);
          expect(loadedGame.getScore(0)).toBe(10);
          expect(loadedGame.getScore(1)).toBe(0);
          expect(loadedGame.currentPlayer).toBe(1);
          expect(loadedGame.getTiles(0).tileCount).toBe(2);
          expect(loadedGame.getTiles(1).tileCount).toBe(7);
          expect(loadedGame.getTileBag().tileCount).toBe(86);
        });
      });

      describe('loadFromSerialized', () => {
        it('should load a game from a string representation', () => {
          const game = new UpwordsGame(testWordList, 2, true);
          game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.playMove(defaultStarterMove);
          const serialized = game.serialize();
          game.getTileBag().removeTiles({ W: 1, R: 2, L: 1, D: 2, X: 1 });
          game.getTiles(1).addTiles({ W: 1, R: 2, L: 1, D: 2, X: 1 });
          game.playMove(defaultSecondMove);
          game.drawSpecificTiles(0, 'ABCDE');

          game.loadGameFromSerialized(serialized);
          // expect the game to be in the state before the second move
          expect(game.getScore(0)).toBe(10);
          expect(game.getScore(1)).toBe(0);
          expect(game.currentPlayer).toBe(1);
          expect(game.getTiles(0).tileCount).toBe(2);
          expect(game.getTiles(1).tileCount).toBe(0);
          expect(game.getTileBag().tileCount).toBe(93);
        });
      });

      describe('Game History in Loaded Game', () => {
        it('should be able to undo turns in a loaded game', () => {
          const game = new UpwordsGame(testWordList, 2, true);
          game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTileBag().removeTiles({ W: 1, R: 2, L: 1, D: 2, X: 1 });
          game.getTiles(1).addTiles({ W: 1, R: 2, L: 1, D: 2, X: 1 });
          game.playMove(defaultStarterMove);
          game.drawSpecificTiles(0, 'ABCDE');
          game.playMove(defaultSecondMove);
          game.drawSpecificTiles(1, 'FGHI');
          const serialized = game.serialize();

          game.loadGameFromSerialized(serialized);
          expect(game.getScore(0)).toBe(10);
          expect(game.getScore(1)).toBe(10);
          expect(game.currentPlayer).toBe(0);
          expect(game.getTileBag().tileCount).toBe(77);
          game.undoTurn();
          expect(game.getScore(0)).toBe(10);
          expect(game.getScore(1)).toBe(0);
          game.undoTurn();
          expect(game.getUBF()).toEqual(new UpwordsGame(testWordList).getUBF());
        });

        it('should not be affected by the game state before loading', () => {
          const game = new UpwordsGame(testWordList, 2, true);
          game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTileBag().removeTiles({ W: 1, R: 2, L: 1, D: 2, X: 1 });
          game.getTiles(1).addTiles({ W: 1, R: 2, L: 1, D: 2, X: 1 });
          game.playMove(defaultStarterMove);
          game.drawSpecificTiles(0, 'ABCDE');
          const serialized = game.serialize();
          game.playMove(defaultSecondMove);
          game.drawSpecificTiles(1, 'FGHI');
          game.skipTurn();

          game.loadGameFromSerialized(serialized);
          expect(game.getScore(0)).toBe(10);
          expect(game.getScore(1)).toBe(0);
          expect(game.currentPlayer).toBe(1);
          expect(game.getTileBag().tileCount).toBe(81);
          game.undoTurn();
          expect(game.getScore(0)).toBe(0);
          expect(game.getScore(1)).toBe(0);
          expect(game.getTileBag().tileCount).toBe(86);
          expect(game.getUBF()).toEqual(new UpwordsGame(testWordList).getUBF());
        });
      });
    });

    describe('Score', () => {
      describe('getScore', () => {
        it('should return the score for the specified player', () => {
          const game = new UpwordsGame(testWordList);
          expect(game.getScore(0)).toBe(0);
        });

        it('should substract 5 for each tile remaining if the game is finished', () => {
          const game = new UpwordsGame(testWordList, 2, true);

          game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
          game.getTileBag().removeTiles({ W: 1, R: 1, L: 1, D: 1 });
          game.getTiles(1).addTiles({ W: 1, R: 1, L: 1, D: 1 });
          game.getTileBag().deleteAllTiles();

          //game is not finished
          game.playMove(defaultStarterMove);
          expect(game.isFinished()).toBe(false);
          expect(game.getScore(0)).toBe(10);
          expect(game.getScore(1)).toBe(0);

          // game is finished
          game.playMove(defaultSecondMove);
          expect(game.isFinished()).toBe(true);
          expect(game.getScore(0)).toBe(0);
          expect(game.getScore(1)).toBe(10);
        });
      });
    });

    describe('undoTurn', () => {
      it('should undo the last turn', () => {
        const game = new UpwordsGame(testWordList, 2, true);
        game.getTileBag().removeTiles({ H: 1, E: 3, L: 2, O: 1 });
        game.getTiles(0).addTiles({ H: 1, E: 3, L: 2, O: 1 });
        const playerTilesBeforeMove = game.getTiles(0).listTiles();
        const tileBagBeforeMove = game.getTileBag().listTiles();
        game.playMove(defaultStarterMove);
        expect(game.currentPlayer).toBe(1);
        expect(game.getTiles(0).getTiles()).toEqual({ E: 2 });
        expect(game.getScore(0)).toBe(10);
        game.drawSpecificTiles(0, 'WORLD');
        expect(game.getTileBag().tileCount).toBe(88);
        game.undoTurn();
        expect(game.currentPlayer).toBe(0);
        expect(game.getTileBag().listTiles()).toEqual(tileBagBeforeMove);
        expect(game.getScore(0)).toBe(0);
        expect(game.getTiles(0).listTiles()).toEqual(playerTilesBeforeMove);
        expect(game.getUBF()).toEqual(new UpwordsGame(testWordList).getUBF());
      });

      it('should undo skipped turns', () => {
        const game = new UpwordsGame(testWordList, 2, true);
        game.skipTurn();
        game.skipTurn();
        game.undoTurn();
        expect(game.currentPlayer).toBe(1);
        game.undoTurn();
        expect(game.currentPlayer).toBe(0);
        // idempotent after reaching the first turn
        game.undoTurn();
        expect(game.currentPlayer).toBe(0);
        game.undoTurn();
        expect(game.currentPlayer).toBe(0);
      });
    });
  });
});
