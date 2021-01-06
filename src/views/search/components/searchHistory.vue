<!--
 * @Descripttion: 历史记录
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2021-01-05 09:41:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-06 14:50:32
-->
<template>
  <div class="history-container">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-history',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistory"
      :key="index"
      :title="item"
      @click="onSearchItemClick(item, index)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistory',
  props: {
    // 接收父组件传过来的内容
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false // 控制删除图标的显示和隐藏
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    // 删除历史记录
    onSearchItemClick(item, index) {
      // 判断状态
      if (this.isDeleteShow) {
        // 如果显示是删除图标点击就进行删除 根据所引进行删除
        this.searchHistory.splice(index, 1)
      } else {
        // 如果显示的不是删除图标就点击进行搜索
        this.$emit('search', item)
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped></style>
