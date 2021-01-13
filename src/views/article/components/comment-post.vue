<!--
 * @Descripttion: 发布评论组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-13 11:02:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-13 14:31:38
-->
<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button :disabled="!message.length" @click="onPost" class="post-btn"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComments } from '../../../api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // 点击发布评论
    async onPost() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await addComments({
          target: this.target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: this.message, // 评论内容
          art_id: null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        // console.log(data, '评论内容')
        // 发布完之后清空内容
        this.message = ''
        this.$emit('post-success', this.message)
        this.$toast.success('发布成功')
      } catch (error) {
        this.$toast.fail('发布失败!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
