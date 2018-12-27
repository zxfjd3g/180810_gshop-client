import Vue from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import App from './App.vue'
import router from './router'
import store from './store'

import NavHeader from './components/NavHeader/NavHeader.vue'
import Star from './components/Star/Star.vue'
import CartControl from './components/CartControl/CartControl.vue'
import Split from './components/Split/Split.vue'

import loading from './common/imgs/loading.gif'
import './mock/mockServer'
import './filters'

Vue.use(VueLazyload, {
  loading
})  // 内部定义了一个全局指令: lazy


// 注册全局组件
Vue.component('NavHeader', NavHeader)
Vue.component('Star', Star)
Vue.component('CartControl', CartControl)
Vue.component('Split', Split)
Vue.component(Button.name, Button)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
