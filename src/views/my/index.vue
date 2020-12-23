<!--
 * @Descripttion: 我的组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-20 17:46:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 14:56:42
-->
<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div v-if="user" class="header info-login">
      <div class="base-login">
        <div class="left">
          <van-image class="avater" round :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="btn-login" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-login">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
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
    <van-cell title="消息通知" is-link url="" />
    <van-cell title="用户反馈" is-link url="" />
    <van-cell title="小智同学" is-link url="" />
    <van-cell
      v-if="user"
      @click="onLogout"
      clickable
      class="cell-btn"
      title="退出登录"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/user'
export default {
  name: 'MyIndex',
  props: [''],
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },

  components: {},

  computed: {
    ...mapState(['user'])
  },
  created() {
    // 用户登录之后马上加载
    // user从vuex中获取，如果有user就马上加载
    if (this.user) {
      this.loadUserInfo()
    }
  },
  beforeMount() {},

  mounted() {},

  methods: {
    // 点击退出操作
    onLogout() {
      this.$dialog
        .confirm({
          title: '确认退出',
          message: '亲爱的大大您确定要退出吗？不要走，留下来好不好嘛'
        })
        .then(() => {
          // on confirm
          // 确认退出 执行清除用户登录信息，和本地存储信息
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          // 取消执行这里
          console.log('取消执行这里')
        })
    },
    // 获取用户自己信息
    async loadUserInfo() {
      try {
        const { data } = await getUserInfo()
        // console.log(data, '用户信息')
        // 把请求到的用户信息赋值给userInfo
        this.userInfo = data
      } catch (error) {
        // 请求失败之后给一个提示消息
        this.$toast.fail('获取用户信息失败！')
      }
    }
  },

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
