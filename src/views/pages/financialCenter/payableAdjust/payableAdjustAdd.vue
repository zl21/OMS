<template>
  <div class="financialManageCenter">
    <div class="buttons">
      <businessButton :btn-config="btnConfig" />
    </div>
    <businessStatusFlag
      v-if="custAuditFlag"
      :status-name="vmI18n.t('common.custAudited')"
    />
    <businessStatusFlag
      v-if="financeAuditFlag"
      :status-name="vmI18n.t('common.financeAudited')"
    />
    <businessStatusFlag
      v-if="voidFlag"
      :status-name="vmI18n.t('common.voided')"
    />
    <Collapse v-model="spreadPanel">
      <Panel name="panel_baseInfo">
        <!-- 基本信息 -->
        {{ vmI18n.t("common.baseInformation") }}
        <p
          slot="content"
          style="float: left; width: 250px; margin-top: 15px"
        >
          <ImageUpload
            :dataitem="dataitem"
            @deleteImg="deleteImg"
            @uploadFileChangeSuccess="uploadFileChangeSuccess"
          />
        </p>
        <p slot="content">
          <businessForm
            :form-config="formConfig"
            @keyDown="keyDown"
          />
        </p>
      </Panel>
      <Panel name="panel_log">
        <!-- 日志 -->
        {{ vmI18n.t("common.journal") }}
        <p slot="content">
          <businessForm :form-config="formConfigLog" />
        </p>
      </Panel>

      <Modal
        v-model="isModal"
        :title="vmI18n.t('modalTitle.tips')"
        @on-ok="deleteImgBySure"
      >
        <!-- <p>点击后将删除凭证,是否继续?</p> -->
        <p>{{ vmI18n.t("modalTips.z5") }}</p>
      </Modal>
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
    <div
      v-show="isSaveLoading"
      class="fromLoading"
    >
      <Spin />
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
