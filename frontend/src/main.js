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

import moment from 'moment'
import swal from 'sweetalert'
import * as VueGoogleMaps from 'vue2-google-maps'
import fam from 'fontawesome-markers'

// 다운로드: https://www.npmjs.com/package/vue-awesome
// 아이콘명 참조: https://fontawesome.com/icons
// js 파일에 svg 로 설정되어 있는 리소스를 불러온다. js 파일임
import 'vue-awesome/icons'
// vue-awesome Vue component 를 불러온다.
import Icon from 'vue-awesome/components/Icon'
// 전역으로 사용하기 위해서 Vue.component 로 등록
// v-icon 태그로 사용가능
Vue.component('v-icon', Icon)
// 특정 페이지에서만 지역적으로 사용하려면
// export default {
//   components: {
//     'v-icon': Icon
//   }
// }

moment.locale('ko')

Vue.prototype.$moment = moment
Vue.prototype.$swal = swal
Vue.prototype.$fam = fam
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    // 회사 위치를 표현하기 위한 googlemap init 해당 라이브러리 예제에 있는 키인데 테스트 되길래 사용
    key: 'AIzaSyBzlLYISGjL_ovJwAehh6ydhB56fCCpPQw'
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)
  }
  // installComponents: true,
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
