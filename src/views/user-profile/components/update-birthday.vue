<!--
 * @Descripttion: 生日组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-14 16:23:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-14 16:52:23
-->
<template>
  <div class="birthday-container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { patchProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'updateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1949, 0, 1),
      maxDate: new Date() && new Date(2100, 10, 1),
      currentDate: new Date(this.value)
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
        message: '修改中……'
      })
      try {
        const currentDate = dayjs(this.currentDate).format('yyyy-mm-dd')
        await patchProfile({
          birthday: currentDate
        })
        // 更新视图
        this.$emit('input', currentDate)
        // 关闭弹出层
        this.$emit('close')
        // 提示修改完毕
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改错误')
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped></style>
