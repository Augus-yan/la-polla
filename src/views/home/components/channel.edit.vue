<!--
 * @Descripttion: 汉堡按钮弹出层
 * @version: X3版本
 * @Author: 严田田
 * @Date: 2020-12-28 15:48:14
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-30 16:12:42
-->
<template>
  <div class="ChannelEdit-container">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="cell-title">我的频道</div>
      <van-button
        @click="isEdit = !isEdit"
        round
        type="danger"
        plain
        size="mini"
        class="cell-btn"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="index"
        class="grid-item"
        @click="myChannelsClick(channel, index)"
      >
        <!-- 编辑按钮的图标 -->
        <van-icon
          v-show="isEdit && !fiexChannels.includes(channel.id)"
          slot="icon"
          name="close"
        ></van-icon>
        <!-- 控制文字显示的颜色 -->
        <span class="text" slot="text" :class="{ active: index === active }">{{
          channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell :border="false">
      <div slot="title" class="cell-title">推荐频道</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        icon="plus"
        class="grid-item"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannels
} from '../../../api/channel'
import { mapState } from 'vuex'
import { setItem } from '../../../utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      // 控制我的频道和首页导航栏现实的是一样的
      type: Array,
      required: true
    },
    active: {
      // 控制我的频道和首页选中的内容的文字高亮
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannel: [], // 所有频道
      isEdit: false, // 控制编辑按钮的状态
      fiexChannels: [0] // 固定频道 不允许被删除
    }
  },

  components: {},
  created() {
    this.loadAllChannel()
  },
  computed: {
    ...mapState(['user']),
    // 计算属性  利用计算属性来拿到推荐频道的数据：用请求过来的全部数据-我的频道的数据=推荐频道的数据
    // 先遍历请求过来的全部数据，然后遍历我的频道的数据通过对比，来查找推荐频道中如果有我的频道数据，那么就不要如果没有就要
    // 1.先定义一个方法
    recommendChannels() {
      // 2.定义一个空数组用来接收
      const channels = []
      // 3.遍历请求过来的全部频道数据
      this.allChannel.forEach(channel => {
        // 3.遍历我的频道数据，找到满足的选项
        const res = this.myChannels.find(myChannel => {
          // 返回 对的项，如果满足就返回
          return myChannel.id === channel.id
        })
        // 如果我的频道中不包扣该频道项，则添加到推荐频道中
        if (!res) {
          channels.push(channel)
        }
      })
      // 返回计算结果属性
      return channels
      // filter 方法遍历数组  把符合条件的放到新数组中
      // return this.allChannel.filter(channel => {
      //   // find方法 遍历数组 把符合条件的第一个元素返回
      //   return !this.myChannels.find(mychannel => {
      //     return mychannel.id === channel.id
      //   })
      // })
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    // 请求获取全部频道数据
    async loadAllChannel() {
      try {
        const { data } = await getAllChannels()
        // console.log(data, '全部数据')
        this.allChannel = data.data.channels
      } catch (error) {
        this.$toast.fail('获取数据失败！')
      }
    },

    // 推荐频道数据添加到我的频道
    async addChannel(channel) {
      // 推荐频道的数据添加到我的频道中
      this.myChannels.push(channel)
      try {
        // 处理数据持久化
        if (this.user) {
          // 已登录保存到线上
          await addUserChannels({
            id: channel.id, // 频道id,
            seq: this.myChannels.length // 顺序序号
          })
        } else {
          // 未登录保存到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('请求失败！请稍后重试')
      }
    },
    // 我的频道执行删除和切换频道
    myChannelsClick(channel, index) {
      if (this.isEdit) {
        // 如果固定频道就不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 如果是编辑状态就执行删除功能
        this.myChannels.splice(index, 1)
        // 判断激活状态是自己当删除的时候可以指定到自己的位置
        if (index <= this.active) {
          this.$emit('updated-active', this.active - 1, true)
        }
        // 可视化删除
        this.deleteChannels(channel)
      } else {
        // 非编辑状态就执行切换频道
        // 切换频道根据active来，需要子组件像父组件传递参数改变状态来执行
        this.$emit('updated-active', index, false)
      }
    },
    async deleteChannels(channel) {
      try {
        // 判断是否用户登录
        if (this.user) {
          // 登录了需要保存到线上
          await deleteUserChannels(channel.id)
        } else {
          // 没有登录直接保存到本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (error) {
        this.$toast('请求失败！请稍后重试')
      }
    }
  },

  watch: {}
}
</script>
<style lang="less" scoped>
.ChannelEdit-container {
  padding: 85px 0;
  .cell-title {
    font-size: 32px;
    color: #111;
  }
  .cell-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid#f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background: #f4f5f6;
    }
    .van-grid-item__text,
    .text {
      font-size: 28px;
      color: #222;
      margin-top: 0;
    }
    .active {
      color: #54a7ff;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
  }
  /deep/.my-grid {
    .grid-item {
      .van-icon-close {
        position: absolute;
        top: -5px;
        right: -5px;
        font-size: 20px;
        z-index: 2;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
