/*
 * @Descripttion: 用户登录注册请求
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-08 15:35:43
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-15 10:39:29
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

// 获取用户自己信息
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    method: 'GET'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}

// 获取用户自己信息
export const getUserChannels = () => {
  return request({
    url: '/v1_0/user/channels',
    method: 'GET'
  })
}

// 添加关注
export const addFollow = target => {
  return request({
    url: 'POST',
    method: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注
export const deleteFollow = target => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

// 获取用户的个人信息

export const getProfile = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}

// 编辑用户个人资料
export const patchProfile = data => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 编辑用户照片资料（头像、身份证照片）
export const patchPhoto = data => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
