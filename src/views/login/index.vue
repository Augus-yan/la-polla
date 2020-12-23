<!--
 * @Descripttion: 登录页面
 * @version: X3版本
 * @Author:严田田
 * @Date: 2020-12-08 11:37:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-22 20:37:21
-->
<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon @click="$router.back()" slot="left" name="arrow-left" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit">
      <van-field
        ref="loginForm"
        type="number"
        maxlength="11"
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        type="number"
        maxlength="6"
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>

        <!-- 短信验证码 -->
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            @finish="isCountShow = false"
            v-if="isCountShow"
            :time="1000 * 10"
            format="ss s"
          />
          <van-button
            v-else
            native-type="button"
            class="send-btn-get"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-warp">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { userLogin, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  props: [''],
  data() {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 短信验证码
      },
      // 校验
      userFormRules: {
        mobile: [
          { required: true, message: '请填写手机号' },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          { required: true, message: '请填验证码' },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      // 倒计时显示隐藏
      isCountShow: false
    }
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    // 登录功能
    async onSubmit() {
      // 1获取表单数据
      const user = this.user
      // 2表单验证
      // 登录提示
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      // 3提交表单请求登录
      try {
        const { data } = await userLogin(user)
        // 存储在vuex中的数据
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // console.log(data, '成功')
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败请重试！')
        }
      }
      // 4根据请求结果返回数据后续操作
    },
    // 短信验证
    async onSendSms() {
      // 校验手机号
      console.log('onSendSms')
      // 通过 ref 可以获取到 Form 实例并调用实例方法
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return this.$toast('校验失败', error)
      }
      // 通过手机号验证，显示倒计时
      this.isCountShow = true
      // 请求验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast.success('短信已发送')
      } catch (error) {
        this.isCountShow = false
        if (error.response.status === 429) {
          this.$toast.fail('短信发送过于频繁，请稍后在发送')
        } else {
          this.$toast.fail('获取失败，请稍后再试！')
        }
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.login-container {
  .page-nav-bar {
    background-color: #1989fa;
    /deep/.van-nav-bar__title {
      color: #fff;
      font-size: 35px;
    }
  }
  .iconfont {
    font-size: 40px;
  }
  .send-btn-get {
    width: 162px;
    height: 45px;
    line-height: 45px;
    background-color: #efefef;
    .van-button__text {
      font-size: 16px;
    }
  }

  .login-btn-warp {
    margin: 53px 33px;
    .login-btn {
      background-color: #66b1ff;
      border: none;
      border-radius: 4px;
    }
  }
  /deep/.van-icon {
    color: #fff;
    font-size: 20px;
  }
}
</style>
