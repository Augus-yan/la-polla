/*
 * @Descripttion: 路由组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-07 16:05:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-05 09:14:51
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  // 登录页面路由组件
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  // 导航栏页面组件
  {
    path: '/',
    // name: 'layout',
    component: () => import('../views/layout/index.vue'),
    // 子路由
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/index.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index.vue')
      }
    ]
  },
  // 搜索页面
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
