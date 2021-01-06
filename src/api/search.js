/*
 * @Descripttion: 搜索请求页面
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-05 15:51:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-06 09:28:40
 */

import request from '../utils/request'

// 获取联想建议（自动补全）
export const getRecord = q => {
  return request({
    url: '/v1_0/suggestion',
    method: 'GET',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getContent = params => {
  return request({
    url: '/v1_0/search',
    method: 'GET',
    params
  })
}
