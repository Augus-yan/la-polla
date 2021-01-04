/*
 * @Descripttion:获取新闻列表数据
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-29 11:22:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-30 16:13:59
 */
import request from '../utils/request'

// 请求获取全部列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

// 修改用户频道列表

export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除指定用户频道
export const deleteUserChannels = targetId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${targetId}`
  })
}
