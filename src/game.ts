import { UpwordsBoard, UpwordsPlay, IUpwordsBoardFormat, IMoveResult } from './board.js';
import { TileSet, TileRack, TileBag } from './tiles.js';

type Player = {
  tiles: TileRack;
  score: number;
};

class UpwordsGame {
  #playerCount: number;
  #currentPlayer: number;
  #board: UpwordsBoard;
  #manualTiles: boolean;
  #wordList: string[];
  #tileBag: TileBag;
  #reservedTiles: TileSet;
  #players: Player[] = [];
  #turnHistory: {
    play: UpwordsPlay | null;
    points: number;
    playerTilesState: string[];
    tileBagState: string;
  }[] = [];

  constructor(wordList: string[], playerCount = 1, manualTiles = true) {
    this.#manualTiles = manualTiles;
    this.#playerCount = playerCount;
    this.#currentPlayer = 0;
    this.#wordList = wordList;
    this.#tileBag = new TileBag();
    this.#reservedTiles = new TileSet();
    for (let i = 0; i < playerCount; i++) {
      const newPlayer = { tiles: new TileRack(), score: 0 };
      if (!this.#manualTiles) {
        this.#drawIntoRack(newPlayer, true);
      }
      this.#players.push(newPlayer);
    }
    this.#board = new UpwordsBoard(this.#wordList);
    this.#turnHistory = [];
  }

  get currentPlayer(): number {
    return this.#currentPlayer;
  }

  get playerCount(): number {
    return this.#playerCount;
  }

  isFinished(): boolean {
    return (
      this.#tileBag.tileCount === 0 && this.#players.some((player) => player.tiles.tileCount === 0)
    );
  }

  playMove(play: UpwordsPlay): void {
    const player = this.#players[this.#currentPlayer];
    if (!player) {
      throw new Error('Player does not exist');
    }
    const tiles = TileSet.tilesFromString(play.tiles);
    if (!player.tiles.hasTiles(tiles)) {
      return;
    }

    const playResult = this.#board.playTiles(play);
    if (playResult.isValid) {
      const playerTilesState = this.#players.map((player) => player.tiles.listTiles());
      const tileBagState = this.#tileBag.listTiles();
      player.tiles.removeTiles(tiles);
      player.score += playResult.points!;
      if (!this.#manualTiles) {
        this.#drawIntoRack(player);
      }
      // Cycle to the next player
      this.#currentPlayer = (this.#currentPlayer + 1) % this.#playerCount;
      this.#turnHistory.push({
        play,
        points: playResult.points || 0,
        playerTilesState,
        tileBagState
      });
    }
  }

  skipTurn(): void {
    const playerTilesState = this.#players.map((player) => player.tiles.listTiles());
    const tileBagState = this.#tileBag.listTiles();
    this.#currentPlayer = (this.#currentPlayer + 1) % this.#playerCount;
    this.#turnHistory.push({
      play: null,
      points: 0,
      playerTilesState,
      tileBagState
    });
  }

  undoTurn(): void {
    const lastPlay = this.#turnHistory.pop();
    if (!lastPlay) {
      return;
    }
    this.#currentPlayer = (this.#currentPlayer - 1 + this.#playerCount) % this.#playerCount;
    this.#players[this.#currentPlayer]!.score -= lastPlay.points;
    this.#players.forEach((player, i) => {
      const playerTiles = TileSet.tilesFromString(lastPlay.playerTilesState[i]!);
      player.tiles.deleteAllTiles();
      player.tiles.setTiles(playerTiles);
    });
    this.#tileBag.deleteAllTiles();
    this.#tileBag.setTiles(TileSet.tilesFromString(lastPlay.tileBagState));
    if (lastPlay.play) {
      this.#board.undoMove();
    }
  }

  checkMove(play: UpwordsPlay, boardStateOnly = false): IMoveResult {
    const player = this.#players[this.#currentPlayer];
    if (!player) {
      throw new Error('Player does not exist');
    }
    const tiles = TileSet.tilesFromString(play.tiles);
    if (!player.tiles.hasTiles(tiles) && !boardStateOnly) {
      return { isValid: false, points: 0 };
    }
    return this.#board.checkPlay(play);
  }

  drawSpecificTiles(playerId: number, tiles: string): boolean {
    const player = this.#players[playerId];
    if (!player) {
      return false;
    }
    const playerTiles = player.tiles;
    const tileSet = TileSet.tilesFromString(tiles);
    if (this.#tileBag.hasTiles(tileSet)) {
      this.#tileBag.removeTiles(tileSet);
      playerTiles.addTiles(tileSet);
      return true;
    } else {
      return false;
    }
  }

  returnSpecificTiles(playerId: number, tiles: string): boolean {
    const player = this.#players[playerId];
    if (!player) {
      return false;
    }
    const playerTiles = player.tiles;
    const tileSet = TileSet.tilesFromString(tiles);
    if (playerTiles.hasTiles(tileSet)) {
      playerTiles.removeTiles(tileSet);
      this.#tileBag.addTiles(tileSet);
      return true;
    } else {
      return false;
    }
  }

  drawRandomTiles(playerId: number): void {
    const player = this.#players[playerId];
    if (!player) {
      return;
    }
    if (this.#turnHistory.length <= playerId) {
      this.#drawIntoRack(player, true);
    } else {
      this.#drawIntoRack(player);
    }
  }

  #drawIntoRack(player: Player, firstDraw = false): void {
    if (firstDraw) {
      player.tiles.addTiles(this.#tileBag.drawRandomConsonant());
      player.tiles.addTiles(this.#tileBag.drawRandomVowel());
    }
    while (player.tiles.getMissingTiles() > 0 && this.#tileBag.tileCount > 0) {
      player.tiles.addTiles(this.#tileBag.drawRandomTile());
    }
  }

  getUBF(): IUpwordsBoardFormat {
    // Return a UBF copy of the board
    return this.#board.getUBF();
  }

  getBoard(): UpwordsBoard {
    // Return a copy of the game board
    return new UpwordsBoard(this.#wordList, this.#board.getUBF());
  }

  getTiles(player: number): TileRack {
    // Return the tiles for the specified player
    return this.#players[player]!.tiles;
  }

  getTileBag(): TileBag {
    return this.#tileBag;
  }

  setAsideTiles(tiles: string): boolean {
    const transferedTiles = TileSet.tilesFromString(tiles);
    if (this.#tileBag.hasTiles(transferedTiles)) {
      this.#tileBag.removeTiles(transferedTiles);
      this.#reservedTiles.addTiles(transferedTiles);
      return true;
    }
    return false;
  }

  returnReservedTiles(tiles: string): boolean {
    const transferedTiles = TileSet.tilesFromString(tiles);
    if (this.#reservedTiles.hasTiles(transferedTiles)) {
      this.#reservedTiles.removeTiles(transferedTiles);
      this.#tileBag.addTiles(transferedTiles);
      return true;
    }
    return false;
  }

  returnAllReservedTiles(): void {
    this.#tileBag.addTiles(this.#reservedTiles.getTiles());
    this.#reservedTiles.deleteAllTiles();
  }

  getReservedTiles(): TileSet {
    return this.#reservedTiles;
  }

  getScore(player: number): number {
    // Return the score for the specified player
    if (!this.isFinished()) {
      return this.#players[player]!.score;
    } else {
      return this.#players[player]!.score - this.#players[player]!.tiles.tileCount * 5;
    }
  }

  serialize(): string {
    return JSON.stringify({
      ubf: this.getUBF(),
      tileBagString: this.#tileBag.listTiles(),
      manualTiles: this.#manualTiles,
      playerCount: this.#playerCount,
      currentPlayer: this.#currentPlayer,
      players: this.#players.map((player) => ({
        tilesString: player.tiles.listTiles(),
        score: player.score
      })),
      turnHistory: this.#turnHistory
    });
  }

  loadGameFromSerialized(serialized: string): void {
    const gameData = JSON.parse(serialized);
    this.#board = new UpwordsBoard(this.#wordList);
    for (const turn of gameData.turnHistory) {
      if (turn.play) {
        this.#board.playTiles(turn.play);
      }
    }
    this.#turnHistory = gameData.turnHistory;
    this.#tileBag.deleteAllTiles();
    this.#tileBag.setTiles(TileSet.tilesFromString(gameData.tileBagString));
    this.#manualTiles = gameData.manualTiles;
    this.#playerCount = gameData.playerCount;
    this.#currentPlayer = gameData.currentPlayer;
    this.#players.length = 0;
    gameData.players.forEach((player: { tilesString: string; score: number }) => {
      const restoredPlayer = { tiles: new TileRack(), score: player.score };
      restoredPlayer.tiles.setTiles(TileSet.tilesFromString(player.tilesString));
      this.#players.push(restoredPlayer);
    });
  }

  static newGameFromSerialized(wordList: string[], serialized: string): UpwordsGame {
    const loadedGame = new UpwordsGame(wordList);
    loadedGame.loadGameFromSerialized(serialized);
    return loadedGame;
  }
}

export { UpwordsGame };
