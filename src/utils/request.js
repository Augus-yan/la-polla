/*
 * @Descripttion: 封装请求模块
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-08 10:49:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-07 15:18:58
 */
// 引进axios
import axios from 'axios'
import store from '../store/index'
import JSONBig from 'json-bigint'
// 创建axios.create模块 request进行接收
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  baseURL: 'http://toutiao-app.itheima.net/', // 基准路径
  // baseURL: 'http://api-toutiao-web.itheima.net/app/', // 基准路径

  // transformResponse 允许自定义原始的响应数据（字符串）
  transformResponse: [
    function(data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return JSONBig.parse(data)
      } catch (error) {
        // 如果转换失败，则包装为统一数据格式并返回
        return data
      }
    }
  ]
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// 响应拦截器

// 导出request
export default request
