<!--
 * @Descripttion: 文章列表项
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-27 23:28:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-28 14:53:18
-->
<template>
  <van-cell class="article-item">
    <div class="title van-multi-ellipsis--l2" slot="title">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-warp">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-cover" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-warp">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }} 评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image
      class="item-img"
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
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
<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #333;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .item-img {
    width: 232px;
    height: 146px;
  }
  .label-info-warp span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-warp {
    display: flex;
    padding: 30px 0;
  }
  .cover-item {
    flex: 1;
    height: 146px;
    &:not(:last-child) {
      padding-right: 4px;
    }
  }
  .cover-item-cover {
    height: 146px;
    width: 100%;
  }
}
</style>
