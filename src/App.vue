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
          <span class="ml-2 headline title123">Tic Tac Toe</span>
        </v-scale-transition>
      </div>
    </v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>
<style lang="scss">
.title123 {
  transition: "scale-transition";
}

@import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");

$font-family: "Nunito", sans-serif;
</style>
