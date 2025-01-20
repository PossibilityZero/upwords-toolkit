import { UpwordsBoard, UpwordsPlay, IUpwordsBoardFormat, IMoveResult } from './board.js';
import { TileSet, TileRack, TileBag } from './tiles.js';

type Player = {
  tiles: TileRack;
  score: number;
};

class UpwordsGame {
  playerCount: number;
  currentPlayer: number;
  private board: UpwordsBoard;
  private manualTiles: boolean;
  private wordList: string[];
  tileBag: TileBag;
  private players: Player[] = [];

  constructor(wordList: string[], playerCount = 1, manualTiles = false) {
    this.manualTiles = manualTiles;
    this.playerCount = playerCount;
    this.currentPlayer = 0;
    this.wordList = wordList;
    this.tileBag = new TileBag();
    for (let i = 0; i < playerCount; i++) {
      const newPlayer = { tiles: new TileRack(), score: 0 };
      if (!this.manualTiles) {
        this.#drawIntoRack(newPlayer, true);
      }
      this.players.push(newPlayer);
    }
    this.board = new UpwordsBoard(this.wordList);
  }

  isFinished(): boolean {
    return (
      this.tileBag.tileCount === 0 && this.players.some((player) => player.tiles.tileCount === 0)
    );
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
      player.score += playResult.points!;
      if (!this.manualTiles) {
        this.#drawIntoRack(player);
      }
      // Cycle to the next player
      this.currentPlayer = (this.currentPlayer + 1) % this.playerCount;
    }
  }

  skipTurn(): void {
    this.currentPlayer = (this.currentPlayer + 1) % this.playerCount;
  }

  checkMove(play: UpwordsPlay, boardStateOnly = false): IMoveResult {
    const player = this.players[this.currentPlayer];
    if (!player) {
      throw new Error('Player does not exist');
    }
    const tiles = TileSet.tilesFromString(play.tiles);
    if (!player.tiles.hasTiles(tiles) && !boardStateOnly) {
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
    if (this.tileBag.hasTiles(tileSet)) {
      this.tileBag.removeTiles(tileSet);
      playerTiles.addTiles(tileSet);
      return true;
    } else {
      return false;
    }
  }

  returnSpecificTiles(playerId: number, tiles: string): boolean {
    const player = this.players[playerId];
    if (!player) {
      return false;
    }
    const playerTiles = player.tiles;
    const tileSet = TileSet.tilesFromString(tiles);
    if (playerTiles.hasTiles(tileSet)) {
      playerTiles.removeTiles(tileSet);
      this.tileBag.addTiles(tileSet);
      return true;
    } else {
      return false;
    }
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
    // TODO: Fix this method, side effect of messing up UpwordsBoard trie
    // Return a copy of the game board
    return new UpwordsBoard(this.wordList, this.board.getUBF());
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
    if (!this.isFinished()) {
      return this.players[player]!.score;
    } else {
      return this.players[player]!.score - this.players[player]!.tiles.tileCount * 5;
    }
  }
}

export { UpwordsGame };
