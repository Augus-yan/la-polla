/*
 * @Descripttion: 封装请求模块
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-08 10:49:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-13 15:38:56
 */
// 引进axios
import axios from 'axios'

// 创建axios.create模块 request进行接收
const request = axios.create({
  // baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  baseURL: 'http://toutiao-app.itheima.net/' // 基准路径
  // baseURL: 'http://api-toutiao-web.itheima.net/app/', // 基准路径
})

// 请求拦截器

// 响应拦截器

// 导出request
export default request
