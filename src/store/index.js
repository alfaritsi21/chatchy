import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './modules/auth'
import user from './modules/user'
import menu from './modules/menu'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    Auth,
    user,
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
