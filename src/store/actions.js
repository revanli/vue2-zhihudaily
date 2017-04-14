import { TOGGLE_MENU, SAVE_DETAILID } from './mutation-types.js'

export default {
  toggleMenu ({commit, state}) {
    commit(TOGGLE_MENU, {})
  },
  saveDetailId ({commit, state}) {
    commit(SAVE_DETAILID, id)
  }
}