<template>
  <v-scale-transition appear>
    <v-row justify="center">
      <v-col cols="2">
        <v-row align="center" style="height: 300px;">
          <Square
            v-for="(boardField, index) in game.board"
            :key="index"
            :index="index"
            :value="boardField"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-scale-transition>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import Square from './Square.vue'

import { mapState } from 'vuex'

@Component({
  components: {
    Square
  },
  computed: {
    ...mapState(['game'])
  }
})
export default class GameField extends Vue {
}
</script>
