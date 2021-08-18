<!-- 监控平台 列表 搜索条件下面的半定制组件 -->
<template>
  <div class="monitorPlatformList" v-if="tableName == 'OC_B_ORDER_LOG'">
    <template v-for="(it, index) in config">
      <div :key="index" class="item">
        <img :src="it.img" alt="" />
        <div>
          <p>{{ it.sum }}</p>
          <span>{{ it.desc }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>

export default {
  inheritAttrs: true,
  data() {
    return {
      config: [
        {
          img: "https://avatars1.githubusercontent.com/u/31434913?s=460&v=4",
          sum: 888,
          desc: '总数',
        },
        {
          img: "https://qywechat.s3.cn-northwest-1.amazonaws.com.cn/07ei77-%E7%BB%84%203225%402x.png",
          sum: 888,
          desc: '总数',
        },
        {
          img: "https://avatars1.githubusercontent.com/u/31434913?s=460&v=4",
          sum: 888,
          desc: '总数',
        },
        {
          img: "https://avatars1.githubusercontent.com/u/31434913?s=460&v=4",
          sum: 888,
          desc: '总数',
        },
      ],

    }
  },
  computed: {
    tableName() {
      return this.$store.state.global.activeTab.tableName
    }
  }
}
</script>
<style lang="less" scoped>
.monitorPlatformList {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 2fr));
  grid-gap: 0 25px;
  padding: 12px 10px 0;
  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    min-width: 200px;
    min-height: 100px;
    img {
      height: 80px;
    }
    p {
      height: 32px;
      line-height: 32px;
      font-size: 26px;
      font-weight: bold;
    }
    span {
      // text-align: right;
      height: 24px;
      line-height: 24px;
      float: right;
    }
  }
}
</style>