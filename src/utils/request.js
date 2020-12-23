/*
 * @Descripttion: 封装请求模块
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-08 10:49:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 15:36:00
 */
// 引进axios
import axios from 'axios'
import store from '../store/index'

// 创建axios.create模块 request进行接收
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  baseURL: 'http://toutiao-app.itheima.net/' // 基准路径
  // baseURL: 'http://api-toutiao-web.itheima.net/app/', // 基准路径
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
