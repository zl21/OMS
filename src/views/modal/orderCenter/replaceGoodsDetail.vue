<!--
 * @Author: your name
 * @Date: 2021-05-08 17:33:29
 * @LastEditTime: 2021-07-20 18:09:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/orderCenter/replaceGoodsDetail.vue
-->
<template>
  <!-- 订单详情 - 订单明细 - 替换商品 -->
  <div class="customized-modal">
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
      <OmsTable
        :jordan-table-config="tableConfig"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
        @on-row-click="onRowClick"
        @on-row-dblclick="onRowDblclick"
        @table-delete-detail="tableDeleteDetail"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
    <OmsButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import replaceGoodsDetail from '@/js/modal/orderCenter/replaceGoodsDetail';

  export default replaceGoodsDetail;
</script>
<style lang="less">
@import "~@/css/modal/orderCenter/replaceGoodsDetail.less";
</style>
