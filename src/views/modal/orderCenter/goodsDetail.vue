<template>
  <div class="jordanModal">
    <businessActionTable
      class="jordan-action-table"
      :jordanTableConfig="jordanTableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
    ></businessActionTable>
    <!-- 公共弹框 -->
    <jordanModal
      :title="publicBouncedConfig.confirmTitle"
      :titleAlign="publicBouncedConfig.titleAlign"
      :width="publicBouncedConfig.width"
      :scrollable="publicBouncedConfig.scrollable"
      :closable="publicBouncedConfig.closable"
      :draggable="publicBouncedConfig.draggable"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :transfer="publicBouncedConfig.transfer"
      :name="publicBouncedConfig.name"
      :url="publicBouncedConfig.url"
      :keepAlive="publicBouncedConfig.keepAlive"
      :batchClosed="publicBouncedConfig.batchClosed"
      :excludeString="publicBouncedConfig.excludeString"
      :componentData="publicBouncedConfig.componentData"
      :quit="publicBouncedConfig.quit"
    ></jordanModal>
  </div>
</template>
<script>
  import goodsDetail from "@/js/modal/orderCenter/goodsDetail";
  export default goodsDetail;
</script>

<style scoped>
.header {
  background-color: #eee;
  color: black;
  font-size: 13px;
}
.footer {
  width: 100%;
  margin-top: 20px;
}
</style>
