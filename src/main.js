import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import NavHeader from './components/NavHeader/NavHeader.vue'

// 注册全局组件
Vue.component('NavHeader', NavHeader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
