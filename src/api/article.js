/*
 * @Descripttion: 文章请求数据
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-24 17:30:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-25 11:06:39
 */
import request from '../utils/request'

// 频道新闻推荐
export const getArticle = params => {
  return request({
    url: '/v1_1/articles',
    method: 'GET',
    params
  })
}
