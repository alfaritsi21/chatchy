import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'

Vue.use(Antd)

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDUKH0zq5d5HH-gdbIs7dJoiAdlbBJFrDQ',
    libraries: 'places'
  }
})
Vue.use(VueGeolocation)

new Vue({
  router,
  store,
  render: h => h(App),
  el: '#app',
  components: { App },
  template: '<App/>'
}).$mount('#app')
