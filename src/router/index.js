import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')

export default new Router({
  routes: [
    {
      path: '/', 
      component: App, // 顶层路由，对应index.html
      children: [
        {
          path: '',
          redirect: '/home'
        },
        // 首页
        {
          path: '/home',
          component: home
        }
      ]
    }
  ]
})
