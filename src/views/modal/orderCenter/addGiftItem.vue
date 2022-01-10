<!--
 * @Author: your name
 * @Date: 2021-05-07 15:56:09
 * @LastEditTime: 2021-08-20 15:30:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/orderCenter/addGiftItem.vue
-->
<!--增加赠品-->
<template>
  <div class="cus-modal">
    <EasyMatrix :component-data="matrixData" />
    <!-- <OmsForm :form-config="formConfig"></OmsForm> -->
    <!-- businessButton -->
    <!-- <OmsButton class="absolute" :btn-config="searchBtn"></OmsButton> -->
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
    <OmsButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>
<script>
  import addGiftItem from '@/js/modal/orderCenter/addGiftItem';

  export default addGiftItem;
</script>
<style lang="less">
@import '~omsTheme/public.less';
.cus-modal{
  .absolute{
    position:absolute;
    right: 0;
    top: 3px;
  }
  .business-form-main{
    &.unFlodStyle{
      padding-right:0;
    }
  }
}
</style>
