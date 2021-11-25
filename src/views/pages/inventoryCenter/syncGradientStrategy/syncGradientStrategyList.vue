<!--共享池库存梯度策略 列表-->
<template>
  <div class="syncGradientStrategy" v-loading="loading">
    <OmsButton :btn-config="btnConfig" class="top-btns"/>
    <div class="">
      <action-form
        :form-items="formConfig.formData"
        :form="formConfig.formValue"
        :span="6"
      />
      <!--      <OmsForm :form-config="formConfig2"/>-->
    </div>
    <div class="tableContent mg-tp-20" v-loading="agTableConfig.agLoading">
      <OmsAgTable
        ref="agGridChild"
        :ag-table-config="agTableConfig"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
        @on-row-dblclick="onRowDblclick"
      />
    </div>
  </div>
</template>

<script>
import channelRatioStrategy from '@/js/pages/inventoryCenter/syncGradientStrategy/syncGradientStrategyList';

export default channelRatioStrategy;
</script>
<style lang="less">
.syncGradientStrategy {
  .ark-form-item {
    margin-bottom: 0;
  }
}

//@import '~@/css/pages/inventoryCenter/storeScoreStrategy.less';
</style>
