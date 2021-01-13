<!--
 * @Descripttion: 搜索内容
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-05 09:49:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-08 17:01:07
-->
<template>
  <div class="content-container">
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
        v-for="(content, index) in list"
        :key="index"
        :title="content.title"
      /> -->
    </van-list>
  </div>
</template>

<script>
import { getContent } from '../../../api/search'
import ArticleItem from '../../../components/article.item'
export default {
  name: 'searchContent',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 20,
      error: false
    }
  },

  components: {
    ArticleItem
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async onLoad() {
      try {
        // 1.发送请求拿数据
        const { data } = await getContent({
          page: this.page, // 页数
          per_page: this.per_page, // 每页数量
          q: this.searchText // 搜索关键词
        })
        // 模拟随机失败的情况
        // if (Math.random() > 0.5) {
        //   JSON.parse('gshd')
        // }
        console.log(data, '结果数据')
        // 2.将数据添加到list列表
        const { results } = data.data
        this.list.push(...results)
        // 3.加载完毕将loading设置为false
        this.loading = false
        // 4.判断数据是否加载完毕
        if (results.length) {
          //   没有加载完毕就更新到下一页
          this.page++
        } else {
          //   加载完毕就设置 finished为false 关闭loading
          this.finished = true
          this.loading = false
        }
      } catch (error) {
        // this.$toast.fail('数据获取失败，请稍后在试！')
        this.error = true
        this.loading = false
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped></style>
