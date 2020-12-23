/*
 * @Descripttion: 封装本地存储模块
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-20 15:10:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-20 15:44:14
 */

// 存储数据
export const setItem = (key, value) => {
  // 将数组、对象转换成JSON格式的字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
