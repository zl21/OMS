<template>
  <div class="page" v-loading="loading">
    <OmsButton :btn-config="btnConfig" />
    <OmsTable :jordan-table-config="tableConfig" />
    <OmsDialog
      ref="dialog"
      :visible.sync="dialogConfig.visible"
      :title="dialogConfig.title"
      :width="dialogConfig.width"
    >
      <div slot="content">
        <OmsTable
          :jordan-table-config="dialogTableConfig"
          @table-delete-detail="tableDeleteDetail"
          @table-import="tableImport"
          @table-export="tableExport"
          @on-page-change="onPageChange"
          @on-page-size-change="onPageSizeChange"
          @on-select="dialogTableSelect"
          @on-select-cancel="dialogTableSelect"
          @on-select-all="dialogTableSelect"
          @on-select-all-cancel="dialogTableSelect"
        />
        <div class="dialogFooter">
          <OmsButton :btn-config="dialogBtnConfig" />
        </div>
      </div>
    </OmsDialog>
  </div>
</template>

<script>
  import splitDistributionOrder from '@/js/pages/orderCenter/distribution/splitDistributionOrder';

  export default splitDistributionOrder;
</script>

<style lang="less" scoped>
  @import '~@/css/pages/orderCenter/distribution/splitDistributionOrder.less';
</style>
