<!-- 查询退单编号弹框 -->
<template>
  <div class="returnNumberPop">
    <div class="orderContent">
      <OmsForm
        :form-config="order.orderform"
        @oneObjs="threeObjs"
      />
      <OmsButton :btn-config="order.btn" />
    </div>
    <OmsTable
      :jordan-table-config="order.table"
      @on-select="onquerySelect"
      @on-select-cancel="onqueryCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
    />
    <OmsButton :btn-config="btnConfig" />
    <div class="wrongForce">
      <Modal
        v-model="wrong.modal"
        :mask-closable="false"
        :draggable="true"
        :title="'查询原始订单编号'"
        @on-ok="wrongForce"
        @on-cancel="querycancel"
      >
        <OmsTable
          :jordan-table-config="wrong.table"
          @on-select="wrongForceSelect"
          @on-select-cancel="wrongForceCancel"
          @on-select-all="wrongSelectAll"
          @on-select-all-cancel="wrongSelectAllCancel"
        />
      </Modal>
    </div>
  </div>
</template>
<script>
  import returnJdNumberPop from '@/js/pages/orderCenter/returngood/returnStoreage/returnJdNumberPop';

  export default returnJdNumberPop;
</script>

<style>
@import '~@/css/pages/orderCenter/returngood/returnStoreage/returnJdNumberPop.less';
</style>
