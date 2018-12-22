/*
包含n个用于间接更新状态数据的方法的对象
 */

import {
  reqAddress,
  reqShops,
  reqCategorys
} from '../api'

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types'

export default {

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
  async getCategorys({commit}) {
    // 1. 发异步ajax请求
    const result = await reqCategorys()
    // 2. 有了结果后, 提交mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
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