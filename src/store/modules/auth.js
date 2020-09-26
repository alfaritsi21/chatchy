import axios from 'axios'
import router from '../../router/index'
export default {
  state: {
    urlApi: process.env.VUE_APP_URL,
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setFullUserData(state, payload) {
      state.fullData = payload
    },
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state) {
      state.user = {}
      state.token = null
    },
    setTrigger(state, payload) {
      state.isPt = payload[1]
      state.isRegist = payload[0]
    },
    setLogin(state, payload) {
      state.isOn = payload
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}user/login`, payload)
          .then(response => {
            console.log(response)
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            // router.push('/')
            resolve(response.data.msg)
          })
          .catch(error => {
            reject(error.response.data.msg)
          })
      })
    },
    register(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${context.state.urlApi}user/register`, payload)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            if (error.response === undefined) {
              alert('Tidak dapat terhubung ke server')
            } else {
              reject(error.response)
            }
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/login')
    },
    interceptorRequest(context) {
      console.log('interceptor Works !')
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${context.state.token}`
          // Do something before request is sent
          return config
        },
        function(error) {
          // Do something with request error
          return Promise.reject(error)
        }
      )
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(
        function(response) {
          // Any status code that lie within the range of 2xx cause this function to trigger
          // Do something with response data
          return response
        },
        function(error) {
          console.log(error.response)
          if (error.response.status === 403) {
            if (
              error.response.data.msg === 'invalid token' ||
              error.response.data.msg === 'invalid signature'
            ) {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert(
                'Maaf token anda salah dan anda tidak bisa melanjutkan di halaman ini !'
              )
            } else if (error.response.data.msg === 'jwt expired') {
              localStorage.removeItem('token')
              context.commit('delUser')
              router.push('/login')
              alert('Maaf token session anda telah habis !')
            }
          }
          return Promise.reject(error)
        }
      )
    }
  },
  getters: {
    getFullUserData(state) {
      return state.fullData
    },
    isLogin(state) {
      return state.token !== null
    },
    userData(state) {
      return state.user
    },
    isPt(state) {
      return state.isPt
    },
    isRegist(state) {
      return state.isRegist
    },
    isLogin2(state) {
      return state.isOn
    }
  }
}
