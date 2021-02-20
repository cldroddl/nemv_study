// import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

// BootstrapVue 는 ./plugins/bootstrap-vue 에서 use 로 플러그인으로 사용하도록 설정되어 있다.
// axios 는 각 필요한 곳에 정의해서 사용할 수 있으나 전역적으로 사용하려면 여기에서 prototype 에 추가해 줘도 된다.
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
