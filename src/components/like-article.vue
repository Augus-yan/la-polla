<!--
 * @Descripttion: 对文章点赞功能
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-12 13:50:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-12 14:25:50
-->
<template>
  <van-button
    :icon="value === 1 ? 'good-job' : 'good-job-o'"
    :class="{
      like: value === 1
    }"
    @click="onLike"
    :loading="loading"
  />
</template>

<script>
import { addLikings, deleteLikings } from '../api/article'
export default {
  name: 'likeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articlesId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async onLike() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          // 一点赞取消点赞
          await deleteLikings(this.articlesId)
        } else {
          // 没有点赞，点赞
          await addLikings(this.articlesId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.like {
  .van-icon {
    color: #dd001b;
  }
}
</style>
