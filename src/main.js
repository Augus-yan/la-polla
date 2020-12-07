/*
 * @Descripttion:加载需要的文件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-07 16:05:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-07 17:01:10
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
