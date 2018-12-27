/*
用来自定义过滤器的模块
 */
import Vue from 'vue'
import moment from 'moment'

// 日期格式化
Vue.filter('date-format', (value, format) => {
  return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})
