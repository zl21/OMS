<template>
  <div class="jordanModal">
    <businessActionTable
      class="jordan-action-table"
      :jordan-table-config="jordanTableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
    />
    <!-- 公共弹框 -->
    <businessDialog
      :title="publicBouncedConfig.confirmTitle"
      :title-align="publicBouncedConfig.titleAlign"
      :width="publicBouncedConfig.width"
      :scrollable="publicBouncedConfig.scrollable"
      :closable="publicBouncedConfig.closable"
      :draggable="publicBouncedConfig.draggable"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :transfer="publicBouncedConfig.transfer"
      :name="publicBouncedConfig.name"
      :url="publicBouncedConfig.url"
      :keep-alive="publicBouncedConfig.keepAlive"
      :batch-closed="publicBouncedConfig.batchClosed"
      :exclude-string="publicBouncedConfig.excludeString"
      :component-data="publicBouncedConfig.componentData"
      :quit="publicBouncedConfig.quit"
    />
  </div>
</template>
<script>
  import goodsDetail from '@/js/modal/orderCenter/goodsDetail';

  export default goodsDetail;
</script>

<style scoped>
  @import "~@/css/modal/orderCenter/goodsDetail.less";
</style>
