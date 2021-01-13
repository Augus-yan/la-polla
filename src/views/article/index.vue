<!--
 * @Descripttion: 文章详情页面
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-06 16:51:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-13 13:49:52
-->
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="今日头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中……</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <!-- 模板中的$event是时间传参 -->
          <!-- 关注的公共组件
         v-model 1:相当于value :is-follow="article.is_followed"
           2:相当于input @update-is_follow="article.is_follow = $event"
           -->
          <user-isFollow
            v-model="article.is_followed"
            :user-id="article.aut_id"
          ></user-isFollow>
          <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFollow"
            :loading="isFollow"
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
            :loading="isFollow"
            >关注</van-button
          > -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="article.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论列表 -->
        <comment-list
          :source="article.art_id"
          @onLoad-success="totalCommentcount = $event.total_count"
          :list="commentList"
        ></comment-list>
        <van-popup v-model="isPostShow" position="bottom"
          ><comment-post
            @post-success="onPostSuccess"
            :target="article.art_id"
          ></comment-post
        ></van-popup>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            @click="isPostShow = true"
            class="comment-btn"
            type="default"
            round
            size="small"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCommentcount" color="#777" />
          <!-- 收藏组件 -->
          <collectArticle
            v-model="article.is_collected"
            :article-id="article.art_id"
          ></collectArticle>
          <!-- <van-icon color="#777" name="star-o" /> -->
          <!-- 点赞 -->
          <likeArticle
            v-model="article.attitude"
            :articles-id="article.art_id"
          ></likeArticle>
          <!-- <van-icon color="#777" name="good-job-o" /> -->
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errorStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">网络异常,内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import { getArticleId } from '../../api/article'
import { ImagePreview } from 'vant'
import userIsFollow from '../../components/userIsFollow'
import collectArticle from '../../components/collect-article'
import likeArticle from '../../components/like-article'
import commentList from './components/comment-list'
import CommentPost from './components/comment-post'
export default {
  name: 'ArticleIndex',
  components: {
    userIsFollow,
    collectArticle,
    likeArticle,
    commentList,
    CommentPost
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      article: {}, // 文章详情
      loading: true, // 加载loading状态
      errorStatus: 0, // 失败的状态码
      // isFollow: false // 控制关注的loading状态
      totalCommentcount: 0, // 展示评论的总数
      isPostShow: false, // 控制弹出层的状态
      commentList: [] // 评论列表
    }
  },
  computed: {},
  watch: {},
  created() {
    // 页面加载显示数据
    this.loadArticle()
  },
  mounted() {},
  methods: {
    // 请求获取文章详情信息
    async loadArticle() {
      this.loading = true
      try {
        const { data } = await getArticleId(this.articleId) // articleId是从props里面传进来的
        // 测试状态码错误的
        // if (Math.random() > 0.5) {
        //   JSON.parse('dgshgdhsgdh')
        // }
        // console.log(data)
        this.article = data.data
        // 点击图片预览调用方法，因为有条件判断所以，需要用延时才能拿到请求过来的数据
        setTimeout(() => {
          this.ImagePreview()
        }, 0)
      } catch (error) {
        // this.$toast.fail('获取数据失败，请稍后再试！')
        // 判断是资源不存在还是网络异常导致文章错误消息的提示
        if (error.response && error.response.status === 404) {
          this.errorStatus = 404
        }
      }
      this.loading = false
    },
    // 点击图片可以预览
    ImagePreview() {
      // 获取到节点实例
      const articleContent = this.$refs['article-content']
      // 获取到图片
      const imgs = articleContent.querySelectorAll('img')
      // 定义新的图片地址
      const imgas = []
      // 遍历图片拿到图片地址添加到新数组中
      imgs.forEach((img, index) => {
        imgas.push(img.src)
        // 给图片添加点击事件
        img.onclick = () => {
          ImagePreview({
            // 图片链接地址
            imgas,
            // 从什么位置开始
            startPosition: index
          })
        }
      })
    },
    // 发布完评论之后的操作
    onPostSuccess(data) {
      // 发布完之后关闭弹出层
      this.isPostShow = false
      // 将发布的内容添加到顶部
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  /deep/.van-nav-bar__content {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
