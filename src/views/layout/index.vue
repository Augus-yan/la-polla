<!--
 * @Descripttion: 导航栏组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-20 17:21:17
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-22 20:40:15
-->
<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <van-tabbar v-model="active" class="layout-icon">
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont iconwode"></i>
        <span>{{ user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutIndex',
  props: [''],
  data() {
    return {
      active: 0
    }
  },

  components: {},

  computed: {
    ...mapState(['user'])
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
}
</script>
<style lang="less" scoped>
.layout-container {
  .layout-icon {
    i.iconfont {
      font-size: 40px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
