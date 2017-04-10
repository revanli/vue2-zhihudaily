import { TOGGLE_MENU } from './mutation-types.js'

export default {
  toggleMenu ({commit, state}) {
    commit(TOGGLE_MENU, {})
  }
}