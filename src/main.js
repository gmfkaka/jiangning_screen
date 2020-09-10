import Vue from 'vue'
import App from './App.vue'
import router from './router/router'

import 'animate.css'
import * as api from './servers/api'
// import VueSocketio from 'vue-socket.io'
// import socketio from 'socket.io-client'
// Vue.use(VueSocketio, socketio('wss://pushserver-api.cloud.hoge.cn/server_all/comment/live_358888?custom_appid=358&custom_appkey=u2H7JB2scb0mPg0Pu7Vpguifg5rMbO1v&device_token=32432weqdwaqdqw')); 
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  api,
  render: h => h(App)
});