import { UpwordsBoard, UpwordsPlay, IUpwordsBoardFormat, IMoveResult } from './board.js';
import { TileSet, TileRack, TileBag } from './tiles.js';
import { TWL06 } from '../data/wordList.js';
import { prepareUpwordsWordList, defaultWordFilterOptions } from './words.js';

type Player = {
  tiles: TileRack;
  score: number;
};

class UpwordsGame {
  playerCount: number;
  currentPlayer: number;
  private board: UpwordsBoard;
  private manualTiles: boolean;
  tileBag: TileBag;
  private players: Player[] = [];

  constructor(playerCount = 1, manualTiles = false) {
    this.manualTiles = manualTiles;
    this.playerCount = playerCount;
    this.currentPlayer = 0;
    this.tileBag = new TileBag();
    for (let i = 0; i < playerCount; i++) {
      const newPlayer = { tiles: new TileRack(), score: 0 };
      if (!this.manualTiles) {
        this.#drawIntoRack(newPlayer, true);
      }
      this.players.push(newPlayer);
    }
    const filteredTWL06 = prepareUpwordsWordList(TWL06, defaultWordFilterOptions);
    this.board = new UpwordsBoard(filteredTWL06.keptWords);
  }

  playMove(play: UpwordsPlay): void {
    const player = this.players[this.currentPlayer];
    if (!player) {
      throw new Error('Player does not exist');
    }
    const tiles = TileSet.tilesFromString(play.tiles);
    if (!player.tiles.hasTiles(tiles)) {
      return;
    }

    const playResult = this.board.playTiles(play);
    if (playResult.isValid) {
      player.tiles.removeTiles(tiles);
      this.#drawIntoRack(player);
      player.score += playResult.points!;
      // Cycle to the next player
      this.currentPlayer = (this.currentPlayer + 1) % this.playerCount;
    }
  }

  checkMove(play: UpwordsPlay): IMoveResult {
    const player = this.players[this.currentPlayer];
    if (!player) {
      throw new Error('Player does not exist');
    }
    const tiles = TileSet.tilesFromString(play.tiles);
    if (!player.tiles.hasTiles(tiles)) {
      return { isValid: false, points: 0 };
    }
    return this.board.checkPlay(play);
  }

  drawSpecificTiles(playerId: number, tiles: string): boolean {
    const player = this.players[playerId];
    if (!player) {
      return false;
    }
    const playerTiles = player.tiles;
    const tileSet = TileSet.tilesFromString(tiles);
    if (this.tileBag.hasTiles(tileSet) === false) {
      return false;
    }
    this.tileBag.removeTiles(tileSet);
    playerTiles.addTiles(tileSet);
    return true;
  }

  #drawIntoRack(player: Player, firstDraw = false): void {
    if (firstDraw) {
      player.tiles.addTiles(this.tileBag.drawRandomConsonant());
      player.tiles.addTiles(this.tileBag.drawRandomVowel());
    }
    while (player.tiles.getMissingTiles() > 0 && this.tileBag.tileCount > 0) {
      player.tiles.addTiles(this.tileBag.drawRandomTile());
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
