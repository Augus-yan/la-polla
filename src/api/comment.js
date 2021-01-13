/*
 * @Descripttion: 文章评论列表
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-12 15:23:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-13 11:47:52
 */
import request from '../utils/request'
// 文章评论列表
export const getComments = params => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

/**
 * 对评论或评论回复点赞
 */
export const addCommentLike = target => {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 */
export const deleteCommentLike = target => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${target}`
  })
}

// 发布评论

export const addComments = data => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
