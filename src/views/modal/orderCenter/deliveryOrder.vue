<template>
  <div 
    class="semiCustomModal cus-modal" 
    style="width: 400px;"
  >
    <!-- 唯品会入库单 -->
    <div class="Modal-Form">
      <div class="Modal-Form-Item">
        <!-- 唯品会入库单 -->
        <label>{{ $it("pL.vipshopWarehouseEntry") }}:</label>
        <DropDownSelectFilter
          :single="true"
          :data="datas"
          :total-row-count="totalRowCount"
          :page-size="pageSize"
          :auto-data="autoData"
          :columns="columns"
          :columns-key="columnsKey"
          :hidecolumns="hidecolumns"
          :data-empty-message="dataEmptyMessage"
          @on-popper-show="onPoperShow"
          @on-page-change="onPageChange"
          @on-fkrp-selected="fkrpSelected"
        />
      </div>
    </div>
    
    <OmsButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import deliveryOrder from '@/js/modal/orderCenter/deliveryOrder';

  export default deliveryOrder;
</script>
<style lang="less" scoped></style>
