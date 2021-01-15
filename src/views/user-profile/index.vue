<!--
 * @Descripttion: 用户资料组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-14 09:52:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-15 10:44:22
-->
<template>
  <div class="profile-container">
    <van-nav-bar
      class="nav"
      title="个人信息"
      @click-left="$router.back()"
      left-arrow
    />
    <input type="file" hidden ref="file" @change="onChangeFile" />
    <van-cell @click="$refs.file.click()" title="头像" is-link>
      <van-image class="images" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowName = true"
    />
    <van-cell
      title="性别"
      @click="isShowGender = true"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
    />
    <van-cell
      title="生日"
      @click="isShowBirthday = true"
      :value="user.birthday"
      is-link
    />
    <van-cell title="手机号" :value="user.mobile" is-link />
    <!-- 昵称弹出层 -->
    <van-popup
      v-model="isShowName"
      position="bottom"
      :style="{ height: '100%' }"
      ><updateName
        @close="isShowName = false"
        v-model="user.name"
        v-if="isShowName"
    /></van-popup>
    <!-- 性别弹出层 -->
    <van-popup v-model="isShowGender" position="bottom">
      <updateGender
        @close="isShowGender = false"
        v-model="user.gender"
        v-if="isShowGender"
      />
    </van-popup>
    <!-- 生日弹出层 -->
    <van-popup v-model="isShowBirthday" position="bottom">
      <updateBirthday
        @close="isShowBirthday = false"
        v-if="isShowBirthday"
        v-model="user.birthday"
      />
    </van-popup>
    <!-- 修改图片 -->
    <van-popup
      v-model="isShowImages"
      :style="{ height: '100%' }"
      position="bottom"
    >
      <updateImages
        v-if="isShowImages"
        :img="img"
        @close="isShowImages = false"
        @updatePhoto="user.photo = $event"
      />
    </van-popup>
  </div>
</template>

<script>
import { getProfile } from '@/api/user.js'
import updateName from './components/update-name'
import updateGender from './components/update-gender'
import updateBirthday from './components/update-birthday'
import updateImages from './components/update-images'
export default {
  name: 'userProfile',
  props: {},
  data() {
    return {
      user: {}, // 存储用户的个人信息
      isShowName: false, // 用户昵称状态
      isShowGender: false, // 性别状态
      isShowBirthday: false, // 生日弹出状态
      isShowImages: false, // 图片状态
      img: null // 预览图片
    }
  },

  components: {
    updateName,
    updateGender,
    updateBirthday,
    updateImages
  },

  computed: {},

  created() {
    this.loadProfile()
  },

  beforeMount() {},

  mounted() {},

  methods: {
    // 请求获取用户的个人信息
    async loadProfile() {
      try {
        const { data } = await getProfile()
        // console.log(data, '用户资料')
        this.user = data.data
      } catch (error) {
        this.$toast.fail('获取用户失败')
      }
    },
    onChangeFile() {
      // 拿到input对象
      const file = this.$refs.file.files[0]
      // 获取图片数据的bold数据
      this.img = window.URL.createObjectURL(file)
      // 关闭弹出层
      this.isShowImages = true
      this.$refs.file.value = ''
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.profile-container {
  /deep/.nav {
    background-color: #2892ff;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon-arrow-left {
      color: #fff;
    }
  }

  .images {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f6f8fa;
  }
}
</style>
