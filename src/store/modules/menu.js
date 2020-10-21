export default {
  state: {
    showChat: true,
    showChatroom: false,
    showContact: false,
    showInvite: false,
    target: { user_id: 0, user_nickname: '', user_image: '' },
    messages: []
  },
  mutations: {
    setMessages(state, payload) {
      state.messages = payload
    },
    setShowChat(state, payload) {
      state.showChat = true

      state.showChatroom = false
      state.showContact = false
      state.showInvite = false
    },
    setShowChatroom(state, payload) {
      state.showChat = false
      state.showChatroom = true
      state.showContact = false
      state.showInvite = false
    },
    setShowContact(state, payload) {
      state.showChat = false
      state.showChatroom = false
      state.showContact = true
      state.showInvite = false
    },
    setShowInvite(state, payload) {
      state.showChat = false
      state.showChatroom = false
      state.showContact = false
      state.showInvite = true
    },
    setTarget(state, payload) {
      state.target.user_id = payload.user_id
      state.target.user_nickname = payload.user_nickname
      state.target.user_image = payload.user_image
    }
  },
  actions: {
    setTargetAction(context, payload) {
      context.commit('setTarget', payload)
    }
  },
  getters: {
    getShowChat(state) {
      return state.showChat
    },
    getShowChatroom(state) {
      return state.showChatroom
    },
    getShowContact(state) {
      return state.showContact
    },
    getShowInvite(state) {
      return state.showInvite
    },
    getTarget(state) {
      return state.target
    },
    getMessages(state) {
      return state.messages
    }
  }
}
