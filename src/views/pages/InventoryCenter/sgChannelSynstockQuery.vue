<template>
  <div class="sgChannelSynstockQuery">
    <div
      style="margin-top: 8px;"
      class="returnBtn"
    >
      <!-- 按钮 -->
      <jordanButton :btn-config="btnConfig" />
    </div>
    <div class="returnForm">
      <!-- form表单 -->
      <jordanForm :form-config="formConfig" />
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <jordanLabel
        class="jordanLabel"
        :label-list="labelList"
        :label-default-value="labelDefaultValue"
      />
      <!-- 列表组件 -->
      <div class="tableBox">
        <jordan-action-table
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
  import sgChannelSynstockQuery from '@/js/pages/InventoryCenter/sgChannelSynstockQuery.js';

  export default sgChannelSynstockQuery;
</script>

<style lang="less">
@import '~@/css/pages/InventoryCenter/sgChannelSynstockQuery.less';
</style>
