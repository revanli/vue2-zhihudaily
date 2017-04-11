import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const detail = r => require.ensure([], () => r(require('../pages/detail/detail')), 'detail')
const theme = r => require.ensure([], () => r(require('../pages/theme/theme')), 'theme')

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
        },
        // 详情页
        {
          path: '/detail/:id',
          component: detail
        },
        // 主题页
        {
          path: '/theme/:id',
          component: theme
        }
      ]
    }
  ]
})
