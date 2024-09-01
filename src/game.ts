import { UpwordsBoard, UpwordsPlay, IUpwordsBoardFormat } from './board.js';
import { TileRack, TileBag } from './tiles.js';
import { TWL06 } from '../data/wordList.js';

class UpwordsGame {
  playerCount: number;
  currentPlayer: number;
  private board: UpwordsBoard;
  tileBag: TileBag;
  private players: { tiles: TileRack; score: number }[] = [];

  constructor(playerCount = 1) {
    this.playerCount = playerCount;
    this.currentPlayer = 0;
    this.tileBag = new TileBag();
    for (let i = 0; i < playerCount; i++) {
      this.players.push({ tiles: new TileRack(), score: 0 });
      // Create a new tile rack for each player
    }
    this.board = new UpwordsBoard(TWL06);
  }

  playMove(play: UpwordsPlay): void {
    const playResult = this.board.playTiles(play);
    if (playResult.isValid) {
      this.players[this.currentPlayer]!.score += playResult.points!;
      // Cycle to the next player
      this.currentPlayer = (this.currentPlayer + 1) % this.playerCount;
    }
  }

  getBoard(): IUpwordsBoardFormat {
    // Return a UBF copy of the board
    return this.board.getUBF();
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
