import Vue from 'vue'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'

import App from './App'
import router from './router'
import store from './store'

Vue.use(Vuetify, {  // IGNORING ALL
  theme: {
    primary: '#0ca9f7',
    secondary: '#003e60',
    accent: '#00c3ff',
    active: '#0ca9f7',
    sleep: '#d3c900',
    inactive: '#c40505',
    // error: ''
  },
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
