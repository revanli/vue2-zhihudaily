import { 
  TOGGLE_MENU,
  SAVE_DETAILID,
  SAVE_EXTRA
} from './mutation-types.js'

export default {
  [TOGGLE_MENU](state, {}) {
    state.isShowMenu = !state.isShowMenu
  },
  [SAVE_DETAILID](state, id) {
    state.detailId = id
  },
  [SAVE_EXTRA](state, data) {
    state.extra = data
  }
}