<template>
  <!-- 订单详情 - 订单明细 - 替换商品 -->
  <div
    class="replaceGoodsDetail"
  >
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
      <Table
        :columns="columns"
        :data="data"
      />
    </div>
    <div class="i_food">
      <businessButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import replaceGoodsDetail from '@/js/modal/orderCenter/replaceGoodsDetail';

  export default replaceGoodsDetail;
</script>
<style lang="less">
@import "~@/css/modal/orderCenter/replaceGoodsDetail.less";
</style>
