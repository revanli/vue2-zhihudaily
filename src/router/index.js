import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const detail = r => require.ensure([], () => r(require('../pages/detail/detail')), 'detail')
const theme = r => require.ensure([], () => r(require('../pages/theme/theme')), 'theme')
const comments = r => require.ensure([], () => r(require('../pages/comments/comments')), 'comments')
const recommender = r => require.ensure([], () => r(require('../pages/recommender/recommender')), 'recommender')
const section = r => require.ensure([], () => r(require('../pages/section/section')), 'section')
const editor = r => require.ensure([], () => r(require('../pages/editor/editor')), 'editor')
const author = r => require.ensure([], () => r(require('../pages/author/author')), 'author')

export default new Router({
  routes: [
    {
      path: '/', 
      component: App, // 顶层路由，对应index.html
      children: [
        {
          path: '',
          name: 'index',
          redirect: '/home'
        },
        // 首页
        {
          path: '/home',
          name: 'home',
          component: home,
        },
        // 详情页
        {
          path: '/detail/:id',
          component: detail,
          name: 'detail'
        },
        // 主题页
        {
          path: '/theme/:id',
          component: theme,
          name: 'theme'
        },
        // 评论页
        {
          name: 'comments',
          path: '/comments',
          component: comments
        },
        // 推荐者
        {
          name: 'recommender',
          path: '/recommender',
          component: recommender
        },
        // 合集
        {
          name: 'section',
          path: '/section',
          component: section
        },
        // 作者
        {
          name: 'editor',
          path: '/editor',
          component: editor
        },
        // author
        {
          name: 'author',
          path: '/author',
          component: author
        }
      ]
    }
    // {
    //   path: '/detail/:id',
    //   component: detail,
    //   name: 'detail'
    // }
  ]
})
