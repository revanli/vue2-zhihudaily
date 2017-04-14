import { TOGGLE_MENU, SAVE_DETAILID } from './mutation-types.js'

export default {
  [TOGGLE_MENU](state, {}) {
    state.isShowMenu = !state.isShowMenu
  },
  [SAVE_DETAILID](state, id) {
    state.detailId = id
  }
}