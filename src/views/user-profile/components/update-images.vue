<!--
 * @Descripttion: 图片组件
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-14 17:47:26
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-15 10:50:39
-->
<template>
  <div class="images-container">
    <img class="imags" :src="img" ref="img" />
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confing" @click="onConfing">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { patchPhoto } from '@/api/user.js'
export default {
  name: 'updateImages',
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  data() {
    return {
      cropper: null
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },

  methods: {
    onConfing() {
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updatePhoto(blob)
      })
    },
    async updatePhoto(blob) {
      this.$toast.loading({
        duration: 0,
        forbidClick: true,
        message: '更新中……'
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await patchPhoto(formData)

        // 关闭弹出层
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.images-container {
  height: 100%;
  background-color: #111;
  .imags {
    display: block;
    max-width: 100%;
  }
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    .cancel,
    .confing {
      width: 90px;
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }
  }
}
</style>
