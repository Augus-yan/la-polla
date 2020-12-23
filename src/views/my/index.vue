<!--
 * @Descripttion: 我的组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-20 17:46:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-22 20:31:05
-->
<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header info-login">
      <div class="base-login">
        <div class="left">
          <van-image
            class="avater"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="name">你的专属</span>
        </div>
        <div class="right">
          <van-button class="btn-login" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-login">
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">10</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div v-else class="header not-login">
      <div @click="$router.push('/login')" class="login-btn">
        <img class="img-moblie" src="../../assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格 -->
    <van-grid :column-num="2" clickable>
      <van-grid-item class="grid">
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span slot="text" class="text-item">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont iconlishi"></i>
        <span slot="text" class="text-item">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 设置 -->
    <van-cell clickable title="消息通知" is-link url="" />
    <van-cell clickable title="用户反馈" is-link url="" />
    <van-cell clickable title="小智同学" is-link url="" />
    <van-cell v-if="user" clickable class="cell-btn" title="退出登录" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyIndex',
  props: [''],
  data() {
    return {}
  },

  components: {},

  computed: {
    ...mapState(['user'])
  },

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {}
}
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('../../assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .img-moblie {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .text {
      font-size: 32px;
      color: #fff;
    }
  }
  .info-login {
    .base-login {
      height: 231px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avater {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 32px;
          color: #fff;
          margin-left: 15px;
        }
      }
      .right {
        .btn-login {
          width: 140px;
          text-align: center;
        }
      }
    }
    .data-login {
      display: flex;
      align-items: center;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        .count {
          font-size: 32px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid {
    margin-bottom: 6px;
    .iconfont {
      font-size: 46px;
      color: #954b4b;
    }
    .text-item {
      font-size: 30px;
    }
  }
  .grid-item {
    margin-bottom: 6px;
    .iconfont {
      font-size: 46px;
      color: #ffe671;
    }
    .text-item {
      font-size: 30px;
    }
  }
  .cell-btn {
    text-align: center;
    color: red;
    margin-top: 6px;
  }
}
</style>
