<template>
  <div class="financialManageCenter public-main custom-main">
    <loading :loading="loading" />
    <div class="buttons custom-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content">
      <WaterMark v-if="showStatusFlag" class="omsWaterMark" :text="statusName"></WaterMark>
      <Collapse v-model="spreadPanel">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p
            slot="content"
            style="float: left; width: 250px; margin-top: 15px"
          >
            <arkImageUpload
              v-model="imageValue"
              :http="http"
              :PropsData="dataitem"
              @on-delete="deleteImg"
              @on-Change="uploadFileChangeSuccess"
            />
          </p>
          <p slot="content">
            <businessForm
              :form-config="formConfig"
              @keyDown="keyDown"
            />
          </p>
          <div slot="content" class="clear"></div>
        </Panel>
        <Panel name="panel_log">
          <!-- 日志 -->
          {{ vmI18n.t("common.journal") }}
          <p slot="content">
            <businessForm :form-config="formConfigLog" />
          </p>
        </Panel>
        <Modal
          v-model="detailAddTable.modal"
          class="detailAdd customizedModal"
          :title="vmI18n.t('modalTitle.add_adjustmentListDetails')"
          @on-ok="resetMainTable"
          @on-cancel="detailAddCancel"
        >
          <businessActionTable
            :jordan-table-config="detailAddTable.table"
            @on-select="detailAddOnSelect"
            @on-select-cancel="detailAddOnCancel"
            @on-select-all="detailAddOnSelectAll"
            @on-select-all-cancel="detailAddOnSelectAllCancel"
          />
        </Modal>
      </Collapse>
      <!-- tab切换 -->
      <businessLabel
        :label-list="labelList"
        :label-default-value="labelDefaultValue"
        @labelClick="labelClick"
        class="custom-label"
      />
      <!-- 表格 -->
      <div class="table">
        <!-- 赔付单明细 -->
        <div class="barcodeDetails">
          <businessActionTable
            v-show="labelDefaultValue === '1'"
            :jordan-table-config="jordanTableConfig"
            @table-delete-detail="delTableDetail"
            @table-add-detail="addTableDetail"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <businessActionTable
            v-show="labelDefaultValue === '2'"
            :jordan-table-config="payableAdjustLog"
            @on-page-change="logPageChange"
            @on-page-size-change="logPageSizeChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import payableAdjustAdd from '@/js/pages/financeCenter/payableAdjustAdd';

  export default payableAdjustAdd;
</script>
<style lang="less">
@import "~@/css/pages/financialCenter/payableAdjust/payableAdjustAdd.less";
</style>
