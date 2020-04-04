<template>
  <v-container fluid fill-height>
    <GameField v-if="settings.players.length === 2" />
    <v-row v-if="message" align="center" justify="center">
      <v-col md="12 text-center">
        <span>{{message}}</span>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" v-if="game.winner">
      <v-col md="12 text-center">
        <v-btn x-large @click="createNewGame">New game</v-btn>
      </v-col>
    </v-row>

    <GameSettings v-model="settingsAreVisible" />
  </v-container>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'

import GameField from '@/components/GameField.vue'
import GameSettings from '@/components/Settings.vue'

import { mapState, mapGetters } from 'vuex'

@Component({
  components: {
    GameField,
    GameSettings
  },
  computed: {
    ...mapState(['game', 'settings', 'message'])
  }
})
export default class Home extends Vue {
  private settingsAreVisible = false;

  private created() {
    this.$store.dispatch('initializeGame');
  }

  private mounted() {
    this.settingsAreVisible = true;
  }

  private createNewGame() {
    this.$store.dispatch('startGame');
  }
}
</script>

<style scoped lang="scss">
.home {
  .title {
    font-size: 36px;
  }
}

.fade-enter-active {
  transition: all 1s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
