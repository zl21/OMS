<!--寻源策略表-->
<template>
  <div class="storeScoreStrategy ">
    <OmsButton :btn-config="btnConfig" class="top-btns"/>
    <div class="br-d3d3d3 pd-10">
      <OmsForm :form-config="formConfig"/>
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
import channelRatioStrategy from '@/js/pages/inventoryCenter/sourcstrategy/sourcstrategy';
export default channelRatioStrategy;
</script>
<style lang="less">
@import '~@/css/pages/inventoryCenter/sourcstrategy.less';
</style>
