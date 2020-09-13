import Vue from 'vue'
import axios from 'axios'
import { router } from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  // if (response.data && response.status == 401) { // 401, token失效
  //   Vue.cookie.delete('token')
  //   router.push({ name: 'login' }, () => {
  //     location.reload() // 刷新页面, 清空整站临时存储数据
  //   })
  // }
  return response
}, error => {
  if (error.response.status == 401) { // 401, token失效
    Vue.cookie.delete('token')
    router.push({ name: 'login' }, () => {
      location.reload() // 刷新页面, 清空整站临时存储数据
    }, () => {
      location.reload() // 刷新页面, 清空整站临时存储数据
    })
  }
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {

  // if (actionName.startsWith('/')) {
  //   return 'http://localhost:9000' + actionName
  // }
  // return 'http://localhost:9000/' + actionName

  if (actionName.startsWith('/')) {
    return actionName
  }
  return '/' + actionName
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = false) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = false, contentType = 'application/x-www-form-urlencoded;charset=utf-8') => {
  var defaults = {
    't': new Date().getTime()
  }
  // console.log("data: ", data)
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data, {allowDots: true}) // allowDots: true 使用.
}

export default http
