import { UpwordsBoard, UpwordsPlay, IUpwordsBoardFormat, IMoveResult } from './board.js';
import { TileSet, TileRack, TileBag } from './tiles.js';

type Player = {
  id: number;
  tiles: TileRack;
  score: number;
};

type PlayRecord = {
  type: 'play';
  play: UpwordsPlay;
  playerId: number;
  points: number;
};

type SkipRecord = {
  type: 'skip';
  playerId: number;
};

type TileStateRecord = {
  type: 'tileState';
  tileBag: string;
  reservedTiles: string;
  racks: { playerId: number; tiles: string }[];
};

function makePlayRecord(play: UpwordsPlay, playerId: number, points: number): PlayRecord {
  return { type: 'play', play, playerId, points };
}

function makeSkipRecord(playerId: number): SkipRecord {
  return { type: 'skip', playerId };
}

function makeTileStateRecord(
  tileBag: TileBag,
  reservedTiles: TileSet,
  players: Player[]
): TileStateRecord {
  return {
    type: 'tileState',
    tileBag: tileBag.listTiles(),
    reservedTiles: reservedTiles.listTiles(),
    racks: players.map((player) => ({ playerId: player.id, tiles: player.tiles.listTiles() }))
  };
}

/**
 * Transfer tiles between two sets
 *
 * @param from - The set to transfer tiles from
 * @param to - The set to transfer tiles to
 * @param letters - The letters to transfer
 * @returns Whether the transfer was successful
 */
function transferTilesBetweenSets(from: TileSet, to: TileSet, letters: string): boolean {
  const transferedTiles = TileSet.tilesFromString(letters);
  if (from.hasTiles(transferedTiles)) {
    from.removeTiles(transferedTiles);
    to.addTiles(transferedTiles);
    return true;
  }
  return false;
}

class UpwordsGame {
  #playerCount: number;
  #currentPlayer: number;
  #board: UpwordsBoard;
  #manualTiles: boolean;
  #wordList: string[];
  #tileBag: TileBag;
  #reservedTiles: TileSet;
  #players: Player[] = [];
  #gameHistory: (PlayRecord | SkipRecord | TileStateRecord)[] = [];

  constructor(wordList: string[], playerCount = 1, manualTiles = true) {
    this.#wordList = wordList;
    this.#playerCount = playerCount;
    this.#manualTiles = manualTiles;
    this.#currentPlayer = 0;
    this.#board = new UpwordsBoard(this.#wordList);
    this.#tileBag = new TileBag();
    this.#reservedTiles = new TileSet();
    for (let i = 0; i < playerCount; i++) {
      const newPlayer = { id: i, tiles: new TileRack(), score: 0 };
      this.#players.push(newPlayer);
    }
    this.#players.forEach((player) => {
      if (!this.#manualTiles) {
        this.#drawIntoRack(player, true);
      }
    });
    this.#recordTileState();
  }

  #resetGame(): void {
    this.#currentPlayer = 0;
    this.#board = new UpwordsBoard(this.#wordList);
    this.#tileBag = new TileBag();
    this.#reservedTiles = new TileSet();
    for (let i = 0; i < this.#playerCount; i++) {
      const newPlayer = { id: i, tiles: new TileRack(), score: 0 };
      this.#players[i] = newPlayer;
    }
    this.#gameHistory = [];
    this.#recordTileState();
  }

  get currentPlayer(): number {
    return this.#currentPlayer;
  }

  get playerCount(): number {
    return this.#playerCount;
  }

  #cycleToNextPlayer(): void {
    this.#currentPlayer = (this.#currentPlayer + 1) % this.#playerCount;
  }

  #cycleToPrevPlayer(): void {
    this.#currentPlayer = (this.#currentPlayer - 1 + this.#playerCount) % this.#playerCount;
  }

  isFinished(): boolean {
    return (
      this.#tileBag.tileCount === 0 && this.#players.some((player) => player.tiles.tileCount === 0)
    );
  }

  playMove(play: UpwordsPlay): void {
    this.#recordTileState();
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
      const points = playResult.points || 0;
      this.#gameHistory.push(makePlayRecord(play, this.#currentPlayer, points));
      player.tiles.removeTiles(tiles);
      player.score += playResult.points!;
      if (!this.#manualTiles) {
        this.#drawIntoRack(player);
      }
      this.#cycleToNextPlayer();
    }
  }

  skipTurn(): void {
    this.#recordTileState();
    this.#gameHistory.push(makeSkipRecord(this.#currentPlayer));
    this.#cycleToNextPlayer();
  }

  undoTurn(): void {
    while (this.#gameHistory.length > 0) {
      const gameRecord = this.#gameHistory.pop();
      if (!gameRecord) {
        break;
      }
      if (gameRecord.type === 'tileState') {
        this.#restoreTileState(gameRecord);
      } else {
        if (gameRecord.type === 'play') {
          this.#players[gameRecord.playerId]!.score -= gameRecord.points;
          this.#board.undoMove();
        }
        this.#cycleToPrevPlayer();
        const prevStateRecord = this.#gameHistory.pop();
        if (prevStateRecord?.type !== 'tileState') {
          throw new Error('Invalid game history');
        }
        this.#restoreTileState(prevStateRecord);
        break;
      }
    }
    this.#recordTileState();
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
    return transferTilesBetweenSets(this.#tileBag, player.tiles, tiles);
  }

  returnSpecificTiles(playerId: number, tiles: string): boolean {
    const player = this.#players[playerId];
    if (!player) {
      return false;
    }
    return transferTilesBetweenSets(player.tiles, this.#tileBag, tiles);
  }

  drawRandomTiles(playerId: number): void {
    const player = this.#players[playerId];
    if (!player) {
      return;
    }
    this.#drawIntoRack(player);
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

  setAsideTiles(letters: string): boolean {
    return transferTilesBetweenSets(this.#tileBag, this.#reservedTiles, letters);
  }

  returnReservedTiles(letters: string): boolean {
    return transferTilesBetweenSets(this.#reservedTiles, this.#tileBag, letters);
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

  #recordTileState(): void {
    if (this.#gameHistory.slice(-1)[0]?.type === 'tileState') {
      this.#gameHistory.pop();
      this.#gameHistory.push(
        makeTileStateRecord(this.#tileBag, this.#reservedTiles, this.#players)
      );
    } else {
      this.#gameHistory.push(
        makeTileStateRecord(this.#tileBag, this.#reservedTiles, this.#players)
      );
    }
  }

  #restoreTileState(record: TileStateRecord): void {
    this.#tileBag.deleteAllTiles();
    this.#tileBag.setTiles(TileSet.tilesFromString(record.tileBag));
    this.#reservedTiles.deleteAllTiles();
    this.#reservedTiles.setTiles(TileSet.tilesFromString(record.reservedTiles));
    for (const rack of record.racks) {
      const playerRack = this.#players[rack.playerId]?.tiles;
      if (playerRack) {
        playerRack.deleteAllTiles();
        playerRack.setTiles(TileSet.tilesFromString(rack.tiles));
      }
    }
  }

  serialize(): string {
    this.#recordTileState();
    return JSON.stringify({
      version: 'v2.0',
      manualTiles: this.#manualTiles,
      playerCount: this.#playerCount,
      gameHistory: this.#gameHistory
    });
  }

  loadGameFromSerialized(serialized: string): void {
    const gameData = JSON.parse(serialized);
    this.#manualTiles = gameData.manualTiles;
    this.#playerCount = gameData.playerCount;
    this.#resetGame();
    for (const record of gameData.gameHistory) {
      if (record.type === 'play') {
        this.playMove(record.play);
      } else if (record.type === 'skip') {
        this.skipTurn();
      } else if (record.type === 'tileState') {
        this.#restoreTileState(record);
      }
    }
  }

  static newGameFromSerialized(wordList: string[], serialized: string): UpwordsGame {
    const loadedGame = new UpwordsGame(wordList);
    loadedGame.loadGameFromSerialized(serialized);
    return loadedGame;
  }
}

export { UpwordsGame };
