<!--
 * @Descripttion: 更新用户昵称
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-14 11:18:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-14 14:04:32
-->
<template>
  <div class="update-container">
    <van-nav-bar
      title="设置昵称"
      left-text="返回"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
    <div class="fieid">
      <van-field
        v-model.trim="locaName"
        rows="2"
        autosize
        type="textarea"
        maxlength="11"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { patchProfile } from '@/api/user'
export default {
  name: 'updateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      locaName: this.value // 修改昵称名字
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async onClickRight() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '正在修改……'
      })
      try {
        // 判断输入的内容不能为空
        const locaName = this.locaName
        if (!locaName.length) {
          this.$toast('昵称不能为空，请输入昵称')
          return
        }
        await patchProfile({
          name: locaName
        })
        // 更新视图
        this.$emit('input', locaName)
        // 关闭弹出层
        this.$emit('close')
        // 提示更新成功
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.update-container {
  .fieid {
    padding: 20px;
  }
}
</style>
