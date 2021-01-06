<!--
 * @Descripttion: 搜索联想记录
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-05 09:44:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-05 23:26:20
-->
<template>
  <div class="record-container">
    <!-- 给父组件发送事件，点击谁就搜索谁 -->
    <van-cell
      v-for="(text, index) in record"
      :key="index"
      :title="text"
      icon="search"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="highlight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getRecord } from '../../../api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchRecord',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      record: [] // 联想建议输入数据
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async loadgetRecord(q) {
      try {
        const { data } = await getRecord(q)
        // console.log(data, '联想建议')
        this.record = data.data.options
      } catch (error) {
        this.$toast.fail('请求失败，请稍后再试')
      }
    },
    highlight(text) {
      // 正则表达式  中间的内容都会当作匹配字符串来使用 而不是数据变量
      //  如果需要根据数据变量动态的创建正则表达式 则手动new RegExp
      // RegExp 正则表达式构造函数
      // 参数一：匹配模式字符串，它会根据这个字符串创建正则对象
      // 参数二：匹配模式，要写到字符串中
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
  },

  watch: {
    // 监听输入的内容发生变化
    searchText: {
      // handler 是固定写法，当searchText发生变化时，会调用handler函数
      // handler(value) {
      //   this.loadgetRecord(value)
      // },
      handler: debounce(function(searchText) {
        this.loadgetRecord(searchText)
      }, 300),
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  }
}
</script>
<style lang="less" scoped>
.record-container {
  /deep/.active {
    color: #3194f0;
  }
}
</style>
