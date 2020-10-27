<template>
  <!-- 指定商品拆单 -->
  <div class="specifyGoods" v-loading="pageLoad">
    <div class="i_head">
      <div style="float:left;marginTop:8px;">
        <RadioGroup v-model="radioValue" @on-change="radioChange">
          <Radio label="2">
            <span>按页面已勾选订单</span>
          </Radio>
          <Radio label="1">
            <span>按筛选条件选中订单</span>
          </Radio>
        </RadioGroup>
      </div>
      <div style="float:right">
        商品SKU:
        <Input
          v-model="searchValue"
          icon="ios-search"
          style="width: 150px; marginRight:8px"
          @on-enter="search"
          @on-click="search"
        />
        <!-- 数量:
        <Input v-model="qty" style="width: 80px" />-->
      </div>
    </div>
    <div class="i_body">
      <Table :columns="columns" :data="data"></Table>
    </div>
    <div class="i_food">
      <Button style="marginLeft:8px;" type="error" @click="confirm">确定</Button>
      <Button type="error" ghost @click="()=>{this.$parent.$parent.closeConfirm();}">取消</Button>
    </div>
  </div>
</template>

<script>
import specifyGoodsAssign from "@/js/pages/orderCenter/orderManager/specifyGoodsAssign";
export default specifyGoodsAssign;
</script>
<style lang="less">
@import "~@/css/pages/orderCenter/orderManager/specifyGoodsAssign.less";
</style>