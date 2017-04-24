import { 
  TOGGLE_MENU,
  SAVE_DETAILID,
  SAVE_EXTRA,
  SAVE_SECTIONID,
  TOGGLE_TOP
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
  },
  saveSectionId ({commit, state}) {
    commit(SAVE_SECTIONID, id)
  },
  toggleTop ({commit, state}) {
    commit(TOGGLE_TOP, flag)
  }
}