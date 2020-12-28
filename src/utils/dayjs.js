/*
 * @Descripttion:时间处理
 * @version: X3版本
 * @Author:严田田
 * @Date: 2020-12-28 14:14:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-28 14:57:49
 */
import vue from 'vue'
import dayjs from 'dayjs'

// 加载语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// dayjs默认是英文在这个配置成中文
dayjs.locale('zh-cn') // 全局使用

vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
