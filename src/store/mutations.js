import { TOGGLE_MENU } from './mutation-types.js'

export default {
  [TOGGLE_MENU](state, {}) {
    state.isShowMenu = !state.isShowMenu
  }
}