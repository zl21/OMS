<!--会员卡信息和会员升降记录-->
<template>
  <div class="ff-number-card-detail">
    <el-tabs v-model="activeName">
      <el-tab-pane
        label="会员卡信息"
        name="first"
      >
        <number-card-inform />
      </el-tab-pane>
      <el-tab-pane
        label="会员卡升降记录"
        name="second"
      >
        <card-lifting-record v-if="nameSecond" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-number-card-detail {

  }
</style>
<style lang="less" type="text/less">
  .ff-number-card-detail {
    .el-tabs__active-bar {
      background-color: #FD6442;
      height: 4px;
      border-radius: 4px;
    }
    .el-tabs__item {
      color: #575757;
      font-size: 12px;
      font-weight: 400;
    }
    .el-tabs__item.is-active {
      color: #575757;
    }
    .el-tabs__item:hover {
      color: #575757;
    }
    .el-tabs__nav-wrap::after {
      background-color: #EAEAEA;
      height: 1px;
    }
    .el-tabs__nav-wrap {
      padding-left: 18px;
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  import NumberCardInform from './components/numberCardInform';
  import cardLiftingRecord from './components/cardLiftingRecord.vue';

  export default {
    data() {
      return {
        activeName: 'first',
        nameSecond: false
      };
    },
    watch: {
      activeName(val) {
        if (val === 'second' && !this.nameSecond) {
          this.nameSecond = true;
        }
      },
    },
    components: {
      NumberCardInform,
      cardLiftingRecord
    }
  };
</script>
