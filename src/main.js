import Vue from 'vue'
import router from './router'
import store from './store/'
import Directive from './config/directive'
import Mixin from './config/mixin'
import Filter from './config/filter'
import FastClick from 'fastclick'
// use px2rem and lib-flexible for mobile style
import 'lib-flexible'

Vue.config.productionTip = false

// 全局
Mixin(Vue)
Directive(Vue)
Filter(Vue)

/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
