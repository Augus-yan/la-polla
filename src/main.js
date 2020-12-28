/*
 * @Descripttion:加载需要的文件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-07 16:05:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-28 14:18:40
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'

// 加载vant核心组件
import Vant from 'vant'
// 加载vant文件夹
import 'vant/lib/index.css'

// 动态设置 REM 基准值
import 'amfe-flexible'

// 加载dayjs
import './utils/dayjs'

// 注册vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
