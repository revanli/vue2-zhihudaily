import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)

const state = {
  isShowMenu: false, // 是否显示theme menu
  detailId: 0, // 新闻的ID
  extra: {}  // 新闻附加消息
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
