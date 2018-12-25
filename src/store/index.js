/*
vuex最核心的管理对象模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'

Vue.use(Vuex)

export default new Vuex.Store({ // options
  modules: {
    msite,
    user,
    shop
  },
  // state,
  actions,
  getters,
})

/*

store.state = {
  msite: options.modules.msite.state,
  user: options.modules.user.state,
}
*/

/*
vuex管理的state的结构:
{
  msite: {
    latitude: 40.10038, // 纬度
    longitude: 116.36867, // 经度
    address: {}, // 地址信息对象
    categorys: [], // 食品分类数组
    shops: [], // 商家数组
  },
  user: {
    user: {}, // 登陆的用户信息
  }
}
 */