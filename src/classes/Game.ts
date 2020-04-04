import Player from './Player';

/**
 * The class for manage a game
 */
export default class Game {
  /** The player who have to play */
  public currentTurn!: Player;
  /** The current number of moves */
  public numberOfMoves: number;
  /** True if the win has been done in less than 6 turns */
  public isGoldenWin: boolean;
  /** The winner player */
  public winner: Player | null;
  /** The list of moves  */
  public board: string[];

  constructor() {
    this.numberOfMoves = 0;
    this.isGoldenWin = false;
    this.winner = null;
    this.board = ['', '', '', '', '', '', '', '', ''];
  }
}