<!--
 * @Descripttion: 关注公共组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-11 13:48:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-11 16:45:51
-->
<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    @click="onFollow"
    :loading="loading"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '../api/user'
export default {
  name: 'userIsFollow',
  // model属性可以修改props名称
  model: {
    prop: 'isFollowed',
    event: 'update-is_follow'
  },
  props: {
    // 父组件传递过来是否关注
    isFollowed: {
      type: Boolean,
      required: true
    },
    // 父组件传递过来的id
    userId: {
      type: [Number, Array, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false // 是否显示加载状态
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async onFollow() {
      this.loading = true
      try {
        // 判断用户是否关注
        if (this.isFollowed) {
          // 如果关注了就取消关注
          await deleteFollow(this.userId)
          // this.article.is_followed = false
        } else {
          // 如果没有关注就添加关注
          await addFollow(this.userId)
          // this.article.is_followed = true
        }
        // this.article.is_followed = !this.article.is_followed
        // 改变视图状态子组件不能修改父组件传递过来的值
        this.$emit('update-is_follow', !this.isFollowed)
      } catch (error) {
        let messages = '操作失败，请稍后重试'
        if (error.response && error.response.status === 400) {
          messages = '你不能自己关注自己'
        }
        this.$toast(messages)
      }
      this.loading = false
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped></style>
