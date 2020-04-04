import Vue from 'vue'
import Vuex from 'vuex'
import Game from '@/classes/Game'
import Player from '@/classes/Player'
import GameSettings from '@/classes/GameSettings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    game: new Game(),
    history: new Array<Game>(),
    settings: new GameSettings(),
    message: ''
  },
  getters: {},
  mutations: {
    INITIALIZE_GAME(state) {
      state.history = [];
      state.game = new Game();
    },
    SET_SETTINGS(state, setting: GameSettings) {
      state.settings = setting;
    },
    START_GAME(state) {
      state.game = new Game();
      // state.game.state = 'Started';
      state.game.currentTurn = state.settings.players[0];
      state.message = 'It\'s ' + state.game.currentTurn.name + ' turn';
    },
    SET_MESSAGE(state, payload) {
      state.message = payload;
    },
    SET_MOVE(state, payload: number) {
      state.game.numberOfMoves += 1;
      Vue.set(state.game.board, payload, state.game.currentTurn.symbol);
    },
    CHANGE_TURN(state, player: Player) {
      state.game.currentTurn = player;
      state.message = 'It\'s ' + state.game.currentTurn.name + ' turn';
    },
    SET_WIN(state) {
      state.game.isGoldenWin = state.game.numberOfMoves === 5;
      // state.game.state = 'Completed';
      state.game.winner = state.game.currentTurn;
      state.message = state.game.currentTurn.name + ' win with ' + state.game.numberOfMoves.toString() + ' moves!';

      state.history.push(state.game);
    }
  },
  actions: {
    initializeGame({ commit }) {
      commit('INITIALIZE_GAME');
    },
    setSettings({ commit, state }, value) {
      commit('SET_SETTINGS', value);
    },
    setMessage({ commit }, value) {
      commit('SET_MESSAGE', value);
    },
    startGame({ commit }) {
      commit('START_GAME');
    },
    setMove({ commit }, fieldIndex) {
      commit('SET_MOVE', fieldIndex);
    },
    changeTurn({ state, commit }) {
      const playerIndex: number = state.settings.players.findIndex(x => x.symbol !== state.game.currentTurn.symbol);

      if (playerIndex > -1 && state.settings.players[playerIndex])
        commit('CHANGE_TURN', state.settings.players[playerIndex]);
    },
    setWin({ commit }) {
      commit('SET_WIN');
    }
  },
  modules: {
  }
})
