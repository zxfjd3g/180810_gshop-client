/*
管理用户相关状态数据
 */
import {reqLogout, reqUserInfo} from '../../api'
import {
  RECEIVE_USER,
  RESET_USER
} from '../mutation-types'

const state = {
  user: {}, // 登陆的用户信息
}
const mutations = {
  [RECEIVE_USER](state, {user}) {
    state.user = user
  },
  [RESET_USER](state) {
    state.user = {}
  },
}
const actions = {
  // 同步保存user信息
  saveUser({commit}, user) {
    commit(RECEIVE_USER, {user})
  },

  // 异步获取当前用户信息
  async getUser({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const user = result.data
      // 提交mutation
      commit(RECEIVE_USER, {user})
    }
  },

  // 异步退出登陆
  async logout({commit}) {
    const result = await reqLogout()
    if (result.code === 0) {
      commit(RESET_USER)
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
