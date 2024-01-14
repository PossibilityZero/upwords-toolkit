import UpwordsBoard from './board';
import { PlayDirection } from '../src/board';

class UpwordsGame {
  players: number;
  currentPlayer: number;
  board: UpwordsBoard;
  constructor(players = 1) {
    this.players = players;
    this.currentPlayer = 1;
    this.board = new UpwordsBoard();
  }

  playMove(): void {
    // Perform the move logic here

    // Cycle to the next player
    this.currentPlayer = (this.currentPlayer % this.players) + 1;
    this.board.playTiles('HELLO', [4, 3], PlayDirection.Horizontal);
  }
}

export default UpwordsGame;
