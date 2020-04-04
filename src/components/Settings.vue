<template>
  <v-row justify="center">
    <v-dialog v-model="value" persistent max-width="700px">
      <v-card>
        <v-card-title>
          <span class="headline">Game settings</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row align="center">
              <v-col sm="4">Game mode</v-col>
              <v-col sm="8">
                <v-radio-group v-model="mode" row>
                  <v-radio label="1 vs computer" value="SinglePlayer"></v-radio>
                  <v-radio label="1 vs 1" value="MultiPlayer"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
            <v-scale-transition :hide-on-leave="true">
              <v-row align="center" v-if="mode === 'SinglePlayer'">
                <v-col sm="4">Game difficulty</v-col>
                <v-col sm="8">
                  <v-radio-group v-model="difficulty" row>
                    <v-radio label="Easy" value="Easy"></v-radio>
                    <v-radio label="Medium" value="Medium"></v-radio>
                    <v-radio label="Hard" value="Hard"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-scale-transition>
            <v-row>
              <v-col :sm="mode === 'MultiPlayer' ? 6  :12">
                <v-text-field
                  v-model="player1"
                  :error-messages="player1Error"
                  label="Player 1"
                  required
                  @input="$v.player1.$touch()"
                  @blur="$v.player1.$touch()"
                ></v-text-field>
              </v-col>
              <v-scale-transition :hide-on-leave="true">
                <v-col sm="6" v-if="mode === 'MultiPlayer'">
                  <v-text-field
                    v-model="player2"
                    :error-messages="player2Error"
                    label="Player 2"
                    required
                    @input="$v.player2.$touch()"
                    @blur="$v.player2.$touch()"
                  ></v-text-field>
                </v-col>
              </v-scale-transition>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="mr-3" color="blue darken-1" text @click="saveSettings">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

import { mapState } from 'vuex'

import { validationMixin } from 'vuelidate'
import { required, requiredIf } from 'vuelidate/lib/validators'
import GameSettings from '../classes/GameSettings'
import Player from '../classes/Player'

Component.registerHooks(['validations'])


@Component({
  computed: {
    ...mapState(['game', 'settings'])
  },
  mixins: [validationMixin]
})
export default class Settings extends Vue {
  @Prop({ default: false }) value!: any;

  private mode: 'SinglePlayer' | 'MultiPlayer' = 'SinglePlayer';
  private difficulty: 'Easy' | 'Medium' | 'Hard' = 'Medium';

  private player1 = '';
  private player2 = '';

  private gameSettings: GameSettings = new GameSettings();

  validations() {
    return {
      player1: { required },
      player2: {
        required: requiredIf(() => {
          return this.mode === 'MultiPlayer'
        })
      }
    }
  }
  private get player1Error() {
    const errors: any = [];
    if (!this.$v.player1.$dirty) return errors
    !this.$v.player1.required && errors.push('Name is required.')
    return errors
  }

  private get player2Error() {
    const errors: any = []
    if (!this.$v.player2.$dirty || this.mode === 'SinglePlayer') return errors
    !this.$v.player2.required && errors.push('Name is required.')
    return errors
  }

  /**
   * Save game settings after save button click
   */
  private saveSettings() {
    this.$v.$touch();

    if (!this.$v.$invalid) {
      this.gameSettings = new GameSettings();
      this.gameSettings.mode = this.mode;
      this.gameSettings.difficulty = this.difficulty;

      this.gameSettings.players.push(new Player('X', this.player1));
      this.gameSettings.players.push(new Player('O', this.gameSettings.mode === 'SinglePlayer' ? 'Computer' : this.player2));

      this.$store.dispatch('setSettings', this.gameSettings);

      this.$emit('input', false);

      this.$store.dispatch('startGame');
    }
  }
}
</script>
