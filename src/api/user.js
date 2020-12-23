/*
 * @Descripttion: 用户登录注册请求
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-08 15:35:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-13 15:39:08
 */

// 加载封装请求路径
import request from '@/utils/request'

export const userLogin = data => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data
  })
}

// 获取短信验证码
export const sendSms = mobile => {
  return request({
    url: ` /v1_0/sms/codes/${mobile}`,
    method: 'GET'
  })
}