/**
 * The class for manage a player
 */
export default class Player {
  /** The player symbol */
  public symbol!: 'X' | 'O';
  /** The player name */
  public name!: string;

  constructor(symbol: 'X' | 'O', name: string) {
    this.symbol = symbol;
    this.name = name;
  }
}