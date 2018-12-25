/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
import data from './data.json'  // 已自动解析js对应的类型: 对象

// goods的接口
Mock.mock('/goods', {code: 0, data: data.goods})
// ratings的接口
Mock.mock('/ratings', {code: 0, data: data.ratings})
// info的接口
Mock.mock('/info', {code: 0, data: data.info})

console.log('mockServer....')

// export  不需要向外暴露任何东西