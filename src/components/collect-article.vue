<!--
 * @Descripttion: 收藏组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-11 17:37:36
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-12 11:50:38
-->
<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
    @click="onCllected"
    :loading="loading"
  />
</template>

<script>
import { addCollections, deleteCollections } from '../api/article'
export default {
  name: 'collectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
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
    async onCllected() {
      this.loading = true
      try {
        if (this.value) {
          // 收藏成功，取消收藏
          await deleteCollections(this.articleId)
        } else {
          // 没有收藏，点击收藏
          await addCollections(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (error) {
        this.$toast.fail('操作失败！')
      }
      this.loading = false
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.collected {
  .van-icon {
    color: #ffe500;
  }
}
</style>
