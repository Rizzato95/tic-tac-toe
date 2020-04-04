/**
 * The class for manage a win combination
 */
export default class WinCombination {
  /** The index of the first value */
  public index1: number;
  /** The index of the second value */
  public index2: number;
  /** The index of the third value */
  public index3: number;

  constructor(index1: number, index2: number, index3: number) {
    this.index1 = index1;
    this.index2 = index2;
    this.index3 = index3;
  }
}