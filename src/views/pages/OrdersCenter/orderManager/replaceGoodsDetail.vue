<template>
  <!-- 订单详情 替换商品商品 -->
  <div class="replaceGoodsDetail">
    <div class="i_head">
      <div>
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
import replaceGoodsDetail from "@/js/pages/orderCenter/orderManager/replaceGoodsDetail";
export default replaceGoodsDetail;
</script>
<style lang="less">
.replaceGoodsDetail {
  .i_head {
    height: 30px;
  }
  .i_body {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .i_food {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
