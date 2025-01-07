import { UpwordsBoard, UpwordsPlay, IUpwordsBoardFormat } from './board.js';
import { TileSet, TileRack, TileBag } from './tiles.js';
import { TWL06 } from '../data/wordList.js';

class UpwordsGame {
  playerCount: number;
  currentPlayer: number;
  private board: UpwordsBoard;
  private manualTiles: boolean;
  tileBag: TileBag;
  private players: { tiles: TileRack; score: number }[] = [];

  constructor(playerCount = 1, manualTiles = false) {
    this.manualTiles = manualTiles;
    this.playerCount = playerCount;
    this.currentPlayer = 0;
    this.tileBag = new TileBag();
    for (let i = 0; i < playerCount; i++) {
      const tileRack = new TileRack();
      if (!this.manualTiles) {
        tileRack.addTiles(this.tileBag.drawRandomConsonant());
        tileRack.addTiles(this.tileBag.drawRandomVowel());
        while (tileRack.getMissingTiles() > 0 && this.tileBag.tileCount > 0) {
          tileRack.addTiles(this.tileBag.drawRandomTile());
        }
      }
      // Create a new tile rack for each player
      this.players.push({ tiles: tileRack, score: 0 });
    }
    this.board = new UpwordsBoard(TWL06);
  }

  playMove(play: UpwordsPlay): void {
    const currentPlayer = this.players[this.currentPlayer];
    if (!currentPlayer) {
      throw new Error('Player does not exist');
    }
    const tiles = TileSet.tilesFromString(play.tiles);
    if (!currentPlayer.tiles.hasTiles(tiles)) {
      return;
    }

    const playResult = this.board.playTiles(play);
    if (playResult.isValid) {
      currentPlayer.tiles.removeTiles(tiles);
      if (!this.manualTiles) {
        while (currentPlayer.tiles.getMissingTiles() > 0 && this.tileBag.tileCount > 0) {
          currentPlayer.tiles.addTiles(this.tileBag.drawRandomTile());
        }
      }
      this.players[this.currentPlayer]!.score += playResult.points!;
      // Cycle to the next player
      this.currentPlayer = (this.currentPlayer + 1) % this.playerCount;
    }
  }

  getUBF(): IUpwordsBoardFormat {
    // Return a UBF copy of the board
    return this.board.getUBF();
  }

  getBoard(): UpwordsBoard {
    // Return a copy of the game board
    return new UpwordsBoard(TWL06, this.board.getUBF());
  }

  getTiles(player: number): TileRack {
    // Return the tiles for the specified player
    return this.players[player]!.tiles;
  }

  getTileBag(): TileBag {
    return this.tileBag;
  }

  getScore(player: number): number {
    // Return the score for the specified player
    return this.players[player]!.score;
  }
}

export { UpwordsGame };
