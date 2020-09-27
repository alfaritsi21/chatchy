import axios from 'axios'

export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    dataUser: {}
  },
  mutations: {
    editUser(state, payload) {
      state.dataUser = payload
    }
  },
  actions: {
    editUser(context, payload) {
      console.log(payload)
      const data = new FormData()
      data.append('user_id', payload.user_id)
      data.append('user_nickname', payload.user_nickname)
      data.append('user_name', payload.user_name)
      data.append('user_email', payload.user_email)
      data.append('user_password', payload.user_password)
      data.append('user_phone', payload.user_phone)
      data.append('user_image', payload.user_image)
      data.append('user_bio', payload.user_bio)
      data.append('user_status', payload.user_status)
      return new Promise((resolve, reject) => {
        axios
          .patch(`${context.state.urlApi}user/${payload.user_id}`, data, {})
          .then(response => {
            console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
            console.log(error.response)
            reject(error.response.msg)
          })
      })
    }
  },
  getters: {
    getDataUser(state) {
      return state.dataUser
    }
  }
}
