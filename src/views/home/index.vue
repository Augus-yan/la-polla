<!--
 * @Descripttion: 首页组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-20 17:42:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-30 16:59:09
-->
<template>
  <div class="hone-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        class="search-btn"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" class="channel-btn" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表组件 -->
        <article-list :channel="channel"></article-list>
      </van-tab>
      <dir slot="nav-right" class="placeholder"></dir>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEiatShow = true"
      >
        <i class="iconfont icongengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道汉堡弹出列表 -->
    <van-popup
      v-model="isChannelEiatShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <!-- 汉堡按钮频道内容 -->
      <channel-edit
        :myChannels="channels"
        :active="active"
        @updated-active="onUpdatedActive"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import ArticleList from './components/article.list'
import ChannelEdit from './components/channel.edit'
import { mapState } from 'vuex'
import { getItem } from '../../utils/storage'
export default {
  name: 'HomeIndex',
  props: [''],
  data() {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEiatShow: false // 频道弹出按钮状态
    }
  },

  components: {
    ArticleList,
    ChannelEdit
  },

  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadUserChannels()
  },
  beforeMount() {},

  mounted() {},

  methods: {
    async loadUserChannels() {
      try {
        // 定义一个数组
        let channels = []
        // 判断用户是否登录
        if (this.user) {
          // 如果登录直接保存到线上
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录保存到本地
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 判断本地存储是否有数据
          if (localChannels) {
            // 有就直接用本地
            channels = localChannels
          } else {
            // 没有就用默认的
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        // 添加给频道列表
        this.channels = channels
      } catch (error) {
        this.$toast.fail('获取数据失败')
      }
    },
    // 子组件非编辑状态执行切换频道
    onUpdatedActive(index, isChannelEiatShow = true) {
      // 子组件传递过来的索引赋值给active 来切换频道
      this.active = index
      // 关闭弹层
      this.isChannelEiatShow = isChannelEiatShow
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.hone-container {
  padding-top: 174px;
  padding-bottom: 100px;
  .page-nav-bar {
    background-color: #1989fa;
    /deep/.van-nav-bar__title {
      color: #fff;
      font-size: 35px;
    }
    .search-btn {
      width: 555px;
      height: 64px;
      font-size: 28px;
      background-color: #54a7ff;
      border: none;
      color: #fff;
    }
    /deep/ .van-nav-bar__title {
      max-width: unset;
    }
    /deep/ .van-icon {
      font-size: 33px;
      color: #fff;
    }
  }
  /deep/.channel-btn {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 2;
    }
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #2892ff;
      font-size: 35px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      background-color: #2892ff;
      width: 31px;
      height: 6px;
      bottom: 8px;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      display: flex;
      justify-content: center;
      align-items: center;
      i.iconfont {
        font-size: 33px;
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        height: 100%;
        width: 3px;
        background-image: url('../../assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
