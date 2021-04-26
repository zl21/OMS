<template>
  <div class="sgChannelSynstockQuery custom-main">
    <div class="returnBtn custom-btn">
      <!-- 按钮 -->
      <business-button :btn-config="btnConfig" />
    </div>
    <div class="returnForm custom-form">
      <!-- form表单 -->
      <business-form :form-config="formConfig" />
    </div>
    <div class="salesTable custom-table">
      <!-- tab切换 -->
      <business-label
        class="businessLabel"
        :label-list="labelList"
        :label-default-value="labelDefaultValue"
      />
      <!-- 列表组件 -->
      <div class="tableBox">
        <business-action-table
          :jordan-table-config="jordanTableConfig"
          @on-select="returnOnSelect"
          @table-import="returnImport"
          @table-export="returnExport"
          @on-select-cancel="returnCancel"
          @on-select-all="returnSelectAll"
          @on-select-all-cancel="returnSelectAllCancel"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </div>
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      title="警告"
      width="420"
      :mask="true"
      @on-ok="warningOk"
    >
      <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p>
    </Modal>
  </div>
</template>

<script>
import sgChannelSynstockQuery from "@/js/pages/inventoryCenter/sgChannelSynstockQuery";

export default sgChannelSynstockQuery;
</script>

<style lang="less">
@import "~@/css/pages/inventoryCenter/sgChannelStorageBuffer.less";
</style>
