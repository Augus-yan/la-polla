<!--
 * @Descripttion: 文章评论列表
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-12 14:49:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-13 13:51:37
-->
<template>
  <div class="comment-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :title="item.content"
        :comment="item"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '../../../api/comment'
import commentItem from './comment-item'
export default {
  name: 'commentList',
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 下一页的页码
      limit: 10, // 每一页显示的数量
      error: false
    }
  },

  components: {
    commentItem
  },

  computed: {},
  created() {
    this.onLoad()
  },
  beforeMount() {},

  mounted() {},

  methods: {
    async onLoad() {
      try {
        // 1 请求拿到数据
        const { data } = await getComments({
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
        })
        console.log(data, '评论')
        // 2 将数据添加到列表中
        const { results } = data.data
        this.list.push(...results)

        // 评论的总数量
        this.$emit('onLoad-success', data.data)
        // 3 关闭loading
        this.loading = false
        // 4 判断是否还有数据，
        // 有就请求获取下一页数据
        // 没有就把 finished 关闭
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        // this.$toast.fail('请求失败请稍后再试！')
        this.error = true
        this.loading = false
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped></style>
