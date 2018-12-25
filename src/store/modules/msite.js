/*
管理msite相关状态数据
 */
import {reqCategorys, reqAddress, reqShops} from '../../api'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-types'

const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 食品分类数组
  shops: [], // 商家数组
}
const mutations = {
  [RECEIVE_ADDRESS](state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORYS](state, {categorys}) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS](state, {shops}) {
    state.shops = shops
  },
}
const actions = {
  // 异步获取地址信息
  async getAddress({commit, state}) {
    // 1. 发异步ajax请求
    const {longitude, latitude} = state
    const result = await reqAddress(longitude, latitude)
    // 2. 有了结果后, 提交mutation
    if (result.code === 0) {
      const address = result.data
      commit(RECEIVE_ADDRESS, {address})
    }
  },

  // 异步获食品分类列表
  async getCategorys({commit}, callback) {
    // 1. 发异步ajax请求
    const result = await reqCategorys()
    // 2. 有了结果后, 提交mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
      // 在提交mutation更新状态之后调用callback
      typeof callback === 'function' && callback()
    }
  },

  // 异步获取商家列表
  async getShops({commit, state}) {
    // 1. 发异步ajax请求
    const {longitude, latitude} = state
    const result = await reqShops(longitude, latitude)
    // 2. 有了结果后, 提交mutation
    if (result.code === 0) {
      const shops = result.data
      commit(RECEIVE_SHOPS, {shops})
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
