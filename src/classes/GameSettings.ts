import Player from './Player';

/**
 * The class for manage the game settings
 */
export default class GameSettings {
  /** If the game is in single or multiple mode */
  public mode: 'SinglePlayer' | 'MultiPlayer';
  /** The game difficulty */
  public difficulty: 'Easy' | 'Medium' | 'Hard';
  /** The list of players of the game */
  public players: Player[];

  constructor() {
    this.mode = 'SinglePlayer';
    this.difficulty = 'Medium';
    this.players = [];
  }
}