<template>
  <div class="payableAdjustmentList custom-main" v-loading="agTableConfig.loading">
    <div class="returnBtn totalHeight custom-btn">
      <!-- 按钮 -->
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="returnForm totalHeight custom-form">
      <!-- form表单 -->
      <OmsForm :form-config="formConfig" />
    </div>
    <div class="salesTable custom-table">
      <!-- tab切换 -->
      <OmsLabel
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
    <OmsDialog
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
import payableAdjustmentList from "@/js/pages/financeCenter/payableAdjustmentList";

export default payableAdjustmentList;
</script>

<style lang="less">
@import "~@/css/pages/financialCenter/payableAdjust/payableAdjustmentList.less";
</style>
