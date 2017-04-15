import { 
  TOGGLE_MENU,
  SAVE_DETAILID,
  SAVE_EXTRA
} from './mutation-types.js'

export default {
  toggleMenu ({commit, state}) {
    commit(TOGGLE_MENU, {})
  },
  saveDetailId ({commit, state}) {
    commit(SAVE_DETAILID, id)
  },
  saveExtra ({commit, state}) {
    commit(SAVE_EXTRA, data)
  }
}