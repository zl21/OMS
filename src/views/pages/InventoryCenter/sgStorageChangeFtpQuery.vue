<template>
  <div class="sgStorageChangeFtpQuery">
    <div style="margin-top: 8px" class="returnBtn">
      <!-- 按钮 -->
      <jordanButton :btnConfig="btnConfig"></jordanButton>
    </div>
    <div class="returnForm">
      <!-- form表单 -->
      <jordanForm :formConfig="formConfig"></jordanForm>
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <jordanLabel class="jordanLabel" :labelList="labelList" :labelDefaultValue="labelDefaultValue"></jordanLabel>
      <!-- 列表组件 -->
      <div class="tableBox">
        <jordan-action-table
          :jordanTableConfig="jordanTableConfig"
          @on-select="returnOnSelect"
          @table-import="returnImport"
          @table-export="returnExport"
          @on-select-cancel="returnCancel"
          @on-select-all="returnSelectAll"
          @on-select-all-cancel="returnSelectAllCancel"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
        ></jordan-action-table>
      </div>
    </div>
    <!-- 导出 -->
    <Modal v-model="warningModal" title="警告" width="420" @on-ok="warningOk" :mask="true">
      <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p>
    </Modal>
  </div>
</template>
<script>
  import sgStorageChangeFtpQuery from '@/js/pages/InventoryCenter/sgStorageChangeFtpQuery.js';

  export default sgStorageChangeFtpQuery;
</script>

<style lang="less">
@import '~@/css/pages/InventoryCenter/sgStorageChangeFtpQuery.less';
</style>
