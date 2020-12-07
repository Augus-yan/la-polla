<!--
 * @Descripttion: 根组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-07 16:05:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-07 20:19:06
-->
<template>
  <div id="app">
    <h1>显示页面</h1>
    <i class="iconfont icondianzan"></i>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  props: {},
  data() {
    return {}
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
}
</script>
<style lang="less"></style>
