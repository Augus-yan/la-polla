/*
 * @Descripttion:
 * @version: X3版本
 * @Author:
 * @Date: 2020-12-07 16:05:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-20 15:43:14
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 一个对象在存储当前登录信息(token等)
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // user: null
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    // 改变state里面的数据必须在mutations里面
    setUser(state, data) {
      state.user = data // data 里面传什么就变成什么
      // 为防止数据丢失,我们需要将数据保存到本地存储
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
