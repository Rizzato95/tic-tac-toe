<template>
  <v-card class="col-4" outlined @click="move" @mouseover="onMouseOver($event, value)">
    <span class="symbol ml-5">{{value ? value : ''}}</span>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import { mapState } from 'vuex'
import Game from '../classes/Game';
import WinCombination from '../classes/WinCombination';

@Component({
  computed: {
    ...mapState(['game'])
  }
})
export default class Square extends Vue {
  /** The index of the square */
  @Prop({ required: true }) index!: number;
  /** The value of the field */
  @Prop({ required: true }) value!: string;

  private game!: Game;

  private onMouseOver(element: any, value: any) {
    if (value === '') {
      element.toElement.classList.add('square-enable');
      element.toElement.classList.remove('square-disable');
    } else {
      element.toElement.classList.add('square-disable');
      element.toElement.classList.remove('square-enable');
    }
  }

  private async move() {
    if (this.value === '') {
      await this.$store.dispatch('setMove', this.index);

      if (this.checkWin())
        this.$store.dispatch('setWin');
      else
        this.$store.dispatch('changeTurn');
    }
  }

  private checkWin(): boolean {
    if (this.game.numberOfMoves < 5)
      return false;
    else {
      const winCombinations: WinCombination[] = this.getWinCombinations();
      const currentSymbol: string = this.game.currentTurn.symbol;

      for (const combination of winCombinations) {
        if (this.game.board[combination.index1] !== '' &&
          this.game.board[combination.index1] === this.game.board[combination.index2] &&
          this.game.board[combination.index1] === this.game.board[combination.index3])
          return true;
      };

      return false;
    }
  }

  /**
   * Return the array with all the possible win combinations
   */
  private getWinCombinations(): WinCombination[] {
    // 0|1|2
    // -----
    // 3|4|5
    // -----
    // 6|7|8

    return [
      new WinCombination(0, 1, 2),
      new WinCombination(3, 4, 5),
      new WinCombination(6, 7, 8),
      new WinCombination(0, 3, 6),
      new WinCombination(1, 4, 7),
      new WinCombination(2, 5, 8),
      new WinCombination(0, 4, 8),
      new WinCombination(2, 4, 6)
    ];
  }
}

</script>

<style lang="scss">
.square-enable:hover {
  cursor: pointer;
  border: 1px solid grey !important;
}

.square-disable:hover {
  cursor: no-drop;
}

.symbol {
  font-size: 60px;
}
</style>
