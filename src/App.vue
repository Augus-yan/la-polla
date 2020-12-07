<!--
 * @Descripttion: 根组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-07 16:05:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-07 16:48:12
-->
<template>
  <div id="app">
    <h1>显示页面</h1>
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
