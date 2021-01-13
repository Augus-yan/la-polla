<!--
 * @Descripttion: 搜索页面
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-05 09:11:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 09:22:46
-->
<template>
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3680ff"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索内容 -->
    <search-content
      v-if="isResultShow"
      :search-text="searchText"
    ></search-content>
    <!-- 联想建议 -->
    <search-record
      @search="onSearch"
      v-else-if="searchText"
      :search-text="searchText"
    ></search-record>
    <!-- 搜索历史记录 -->
    <search-history
      @search="onSearch"
      @clear-search-history="searchHistory = []"
      :searchHistory="searchHistory"
      v-else
    ></search-history>
  </div>
</template>

<script>
import searchHistory from './components/searchHistory'
import searchRecord from './components/searchRecord'
import searchContent from './components/searchContent'
import { setItem, getItem } from '../../utils/storage'
export default {
  name: 'searchIndex',
  props: [''],
  data() {
    return {
      searchText: '', // 输入的内容
      isResultShow: false, // 控制搜索结果的展示
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORYS') || [] // 获取搜索的历史记录数据;空数组是如果没有数据会报错
    }
  },

  components: {
    searchHistory,
    searchRecord,
    searchContent
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    // 输入内容搜索
    onSearch(val) {
      // 搜索联想建议里面，点击谁就在输入框显示谁
      this.searchText = val

      // 把搜索的历史记录存储起来
      // 要求：不要重复的历史记录 、把最新的添加到顶部
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      // 添加到历史记录的顶部
      this.searchHistory.unshift(val)

      // 结果渲染到页面上
      this.isResultShow = true
    },
    // 点击取消搜索
    onCancel() {
      this.$router.back()
    }
  },

  watch: {
    // 通过watch监视到searchHistory的时时变化
    searchHistory(value) {
      // 利用setItem存储到本地，做到数据持久化
      setItem('TOUTIAO_SEARCH_HISTORYS', value)
    }
  }
}
</script>
<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
