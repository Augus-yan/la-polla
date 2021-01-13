/*
 * @Descripttion: 文章请求数据
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-24 17:30:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-12 14:05:40
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

// 获取文章详情
export const getArticleId = articleId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const addCollections = target => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消收藏文章

export const deleteCollections = target => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}

// 点赞
export const addLikings = target => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}

// 取消点赞
export const deleteLikings = target => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
