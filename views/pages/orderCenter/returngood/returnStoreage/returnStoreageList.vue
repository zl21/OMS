<!--退换入库列表-->
<template>
  <div class="returnstoreage tableList custom-main">
    <loading :loading="agTableConfig.agLoading" />
    <div class="returnstoreageBtn totalHeight custom-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="form totalHeight custom-form">
      <businessForm :form-config="formConfig" class="searchList" />
      <loading :loading="isShowFromLoading" />
    </div>
    <div class="tableContent custom-table">
      <!-- loading -->
      <loading :loading="agTableConfig.agLoading" />
      <aTable
        ref="agGridChild"
        :ag-table-config="agTableConfig"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
        @on-row-dblclick="onRowDblclick"
      />
    </div>
    <!-- 修改from表单 -->
    <businessDialog
      :batch-closed="publicBouncedConfig.batchClosed"
      :closable="publicBouncedConfig.closable"
      :component-data="publicBouncedConfig.componentData"
      :draggable="publicBouncedConfig.draggable"
      :exclude-string="publicBouncedConfig.excludeString"
      :keep-alive="publicBouncedConfig.keepAlive"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :name="publicBouncedConfig.name"
      :quit="publicBouncedConfig.quit"
      :scrollable="publicBouncedConfig.scrollable"
      :title="publicBouncedConfig.confirmTitle"
      :title-align="publicBouncedConfig.titleAlign"
      :transfer="publicBouncedConfig.transfer"
      :url="publicBouncedConfig.url"
      :width="publicBouncedConfig.width"
    />
    <!-- 导入 -->
    <businessDialog
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keep-alive="importTable.keepAlive"
      :exclude-string="importTable.excludeString"
      :component-data="importTable.componentData"
      :basePathName="importTable.basePathName"
    />
    <Modal
      v-model="warningModal"
      :title="vmI18n.t('modalTitle.warning')"
      width="420"
      :mask="true"
      @on-ok="warningOk"
    >
      <!-- <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p> -->
      <p>{{ vmI18n.t("modalTips.e3") }}</p>
    </Modal>
  </div>
</template>
<script>
import returnStoreageList from "@/js/pages/orderCenter/returngood/returnStoreage/returnStoreageList";

export default returnStoreageList;
</script>
<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returnStoreage/returnStoreageList.less";
</style>
