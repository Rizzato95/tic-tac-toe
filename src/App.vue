<template>
  <v-app>
    <v-app-bar app>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/tic-tac-toe.png"
          transition="scale-transition"
          width="40"
        />
        <v-scale-transition appear>
          <span class="ml-2 headline">Tic Tac Toe</span>
        </v-scale-transition>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="ma-2" text icon>
        <v-icon @click="openSettings">mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>
    <GameSettings v-model="showSettings" />

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import GameSettings from '@/components/Settings.vue'

export default Vue.extend({
  name: 'App',
  components: {
    GameSettings
  },
  mounted() {
    this.showSettings = true
  },
  data() {
    return {
      showSettings: false
    }
  },
  methods: {
    openSettings() {
      this.showSettings = true
    }
  }
})
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");

$font-family: "Nunito", sans-serif;
</style>
