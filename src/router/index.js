/*
路由器对象模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history', // 去除路由路径中的#
  routes
})

// 所有需要检查是否登陆的path的数组
const paths = ['/a', '/b']

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from)
  // 得到请求的路由路径
  const path = to.path
  // 如果在需要检查的paths中
  if(paths.indexOf(path)>=0) {
    // 判断是否已经登陆
    const userId = Vue.store.state.user.user._id
    // 如果已登陆, 放行
    if(userId) {
      next()
    } else {// 如果没有, 直接跳转到登陆
      next('/login')
    }
  } else { // 如果不在, 直接放行
    // 放行
    next()
  }

})


export default router