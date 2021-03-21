import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ko from 'vuetify/es5/locale/ko'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { ko },
    current: 'ko'
  },
  icons: {
    iconfont: 'md'
  }
})
