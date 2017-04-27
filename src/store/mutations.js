import { 
  TOGGLE_MENU,
  SAVE_DETAILID,
  SAVE_EXTRA,
  SAVE_SECTIONID,
  TOGGLE_TOP,
  TOGGLE_DOCKED
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
  },
  [SAVE_SECTIONID](state, id) {
    state.sectionId = id
  },
  [TOGGLE_TOP](state, flag) {
    state.circleFlag = flag
  },
  [TOGGLE_DOCKED](state, {}) {
    state.isDocked = !state.isDocked
  }
}