<template>
  <v-container fluid fill-height>
    <GameField v-if="settings.players.length === 2" />
    <v-row v-if="message" align="center" justify="center">
      <v-col md="12 text-center">
        <span>{{message}}</span>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" v-if="game.winner || game.numberOfMoves === 9">
      <v-col md="12 text-center">
        <v-btn x-large @click="createNewGame">New game</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import GameField from '@/components/GameField.vue'

import { mapState } from 'vuex'

@Component({
  components: {
    GameField
  },
  computed: {
    ...mapState(['game', 'settings', 'message'])
  }
})
export default class Home extends Vue {
  private created() {
    this.$store.dispatch('initializeGame');
  }

  private createNewGame() {
    this.$store.dispatch('startGame');
  }
}
</script>