<template>
  <div class="payableAdjustmentList">
    <div
      class="returnBtn totalHeight"
    >
      <!-- loading -->
      <loading :loading="agTableConfig.loading"></loading>
      <!-- 按钮 -->
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="returnForm totalHeight">
      <!-- form表单 -->
      <businessForm :form-config="formConfig" />
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <businessLabel
        class="businessLabel totalHeight"
        :label-list="labelList"
        :label-default-value="labelDefaultValue"
      />
      <!-- 列表组件 -->
      <div class="tableBox">
        <aTable
          ref="agtable"
          :ag-table-config="agTableConfig"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
          @on-row-dblclick="onRowDblclick"
        />
      </div>
    </div>
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
    />
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      :title="vmI18n.t('modalTitle.warning')"
      width="420"
      :mask="true"
      @on-ok="warningOk"
    >
      <!-- <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p> -->
      <p>{{ vmI18n.t("modalTips.z0") }}</p>
    </Modal>
  </div>
</template>

<script>
  import payableAdjustmentList from '@/js/pages/financeCenter/payableAdjustmentList';

  export default payableAdjustmentList;
</script>

<style lang="less">
 @import "~@/css/pages/financialCenter/payableAdjust/payableAdjustmentList.less";
</style>
