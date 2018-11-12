import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home')
    },
    {
      path: '/play',
      name: 'play',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/play.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/list.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('./views/search.vue')
    }
  ]
})
