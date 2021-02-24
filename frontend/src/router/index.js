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
    // 중첩된 라우터는 그 페이지 안에서 일정 부분이 변하는 것만 담당한다.
    // 그래서 화면 전체가 nemvExam 으로 전환되어야 하는 경우에는 불가능.
    // 이럴때는 중첩된 경로가 아니고 따로 만들어 줘야 한다.
    // children: [
    //   {
    //     /nemv/exam
    // path: 'exam',
    // component: () => import('../views/nemvExam.vue')
    // }
    // ]
  },
  {
    // 경로상 보면 중첩 되지만 상위 vue 의 내부만 변하는 것이 아니라면
    // children 으로 중첩된 라우터로 하는 것이 아니라
    // 이렇게 따로 빼야 한다.
    path: '/nemv/exam',
    component: () => import('../views/nemvExam.vue')
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
