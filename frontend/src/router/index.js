import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/flex',
    name: 'Flex',
    component: () => import('../views/Flex.vue')
  },
  {
    path: '/lessMenu',
    name: 'LessMenu',
    component: () => import('../views/LessMenu.vue')
  },
  {
    path: '/flex2',
    name: 'Flex2',
    component: () => import('../views/Flex2.vue')
  },
  {
    path: '/flex2/gallery',
    name: 'FlexGallery',
    component: () => import('../views/FlexGallery.vue')
  },
  {
    path: '/nemv',
    name: 'nemv',
    component: () => import('../views/nemv.vue')
  },
  {
    path: '*',
    name: 'e404',
    component: () => import('../views/e404')
  }
]

const router = new VueRouter({
  // 기본은 해시태그 다음을 라우팅 한다.
  // localhost:8080/test 라면 localhost:8080/test#/ 으로 바뀌어서 / 페이지로 이동한다.
  // /test 로 이동하려면 localhost:8080/#/test 로 해야 한다.
  // localhost:8080/test 일때 정상동작 하게 하려면 mode 를 history 로 변경해 줘야 한다.
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
