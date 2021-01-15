<!--
 * @Descripttion: 性别组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-14 14:46:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-14 16:07:02
-->
<template>
  <div class="gender-container">
    <van-picker
      title="性别"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
    />
  </div>
</template>

<script>
import { patchProfile } from '@/api/user'
export default {
  name: 'updateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      locaGender: this.value
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    async onConfirm() {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '更新中……'
      })
      try {
        const locaGender = this.locaGender
        await patchProfile({
          gender: locaGender
        })
        // 更新视图
        this.$emit('input', locaGender)
        // 关闭弹出层
        this.$emit('close')
        // 提示修改完毕
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改错误')
      }
    },
    onChange(picker, value, index) {
      this.locaGender = index
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped></style>
