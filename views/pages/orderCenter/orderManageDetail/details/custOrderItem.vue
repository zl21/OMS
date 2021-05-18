<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-05-18 15:49:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/orderCenter/orderManageDetail/details/custOrderItem.vue
-->
<template>
  <div class="order-item">
    <business-action-table
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>

<script>
  import custManageAdd from '@/js/pages/orderCenter/orderManageDetail/details/custManageAdd';

  export default custManageAdd;
</script>
<style lang='less'>
  @import "~@/css/pages/orderCenter/orderManageDetail/details/custOrderItem.less";
</style>
