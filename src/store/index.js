import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import menu from './modules/menu'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    menu
  },
  getters: {},
  plugins: [
    createPersistedState({
      paths: ['Auth.user', 'Auth.urlApi'],
      storage: window.sessionStorage
    })
  ]
})
