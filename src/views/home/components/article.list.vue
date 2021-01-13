<!--
 * @Descripttion: 首页子组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-24 15:58:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 16:59:09
-->
<template>
  <div class="article-container">
    <!-- 上拉刷新数据 -->
    <van-pull-refresh
      v-model="isRefreshLoading"
      @refresh="onRefresh"
      :success-text="isRefreshSuccessText"
      :success-duration="1500"
    >
      <!-- 列表数据 -->
      <van-list
        v-model="loading"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- 文章列表项组件 -->
        <article-item
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></article-item>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticle } from '../../../api/article'
import ArticleItem from '../../../components/article.item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [], // 列表数据
      loading: false, // loading效果
      finished: false, // 判断数据是否加载完成
      timestamp: null, // 下一页的时间戳
      error: false, // 请求失败提示消息
      isRefreshLoading: false, // 上拉刷新的logding状态
      isRefreshSuccessText: '' // 刷新到新的数据提示
    }
  },

  components: {
    ArticleItem
  },

  computed: {},
  created() {},
  beforeMount() {},

  mounted() {},

  methods: {
    // 上拉刷新数据
    async onRefresh() {
      try {
        const { data } = await getArticle({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now(), // 时间戳
          with_top: 1 // 是否置顶
        })
        // 1.上拉刷新关闭loading状态
        this.isRefreshLoading = false
        // 2.将刷新好的数据添加到顶部
        const { results } = data.data
        this.list.unshift(...results)
        this.isRefreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.isRefreshLoading = false
        this.isRefreshSuccessText = '刷新失败！请重试'
      }
    },
    // 列表数据
    async onLoad() {
      try {
        // 1.请求数据列表
        const { data } = await getArticle({
          channel_id: this.channel.id, // 频道ID
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶
        })
        // console.log(data, '新闻推荐')
        // 2.将请求数据遍历并添加到list列表中
        const { results } = data.data
        // 展开操作符，把数组合并
        this.list.push(...results)
        // 3.数据请求完成关闭列表状态
        this.loading = false
        // 4.判断数据是否加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          // 如果数据加载完成之后就关闭finished
          this.finished = false
        }
      } catch (error) {
        this.error = true
        // 请求失败关闭loading
        this.loading = false
      }
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
.article-container {
  height: 79.5vh;
  overflow-y: auto;
}
</style>
