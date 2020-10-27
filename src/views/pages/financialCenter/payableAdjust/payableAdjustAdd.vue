<template>
  <div class="financialManageCenter">
    <div class="buttons">
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
    <businessStatusFlag
      v-if="custAuditFlag"
      :statusName="vmI18n.t('common.custAudited')"
    ></businessStatusFlag>
    <businessStatusFlag
      v-if="financeAuditFlag"
      :statusName="vmI18n.t('common.financeAudited')"
    ></businessStatusFlag>
    <businessStatusFlag
      v-if="voidFlag"
      :statusName="vmI18n.t('common.voided')"
    ></businessStatusFlag>
    <Collapse v-model="spreadPanel">
      <Panel name="panel_baseInfo">
        <!-- 基本信息 -->
        {{ vmI18n.t("common.baseInformation") }}
        <p style="float: left; width: 250px; margin-top: 15px" slot="content">
          <ImageUpload
            :dataitem="dataitem"
            @deleteImg="deleteImg"
            @uploadFileChangeSuccess="uploadFileChangeSuccess"
          ></ImageUpload>
        </p>
        <p slot="content">
          <businessForm
            @keyDown="keyDown"
            :formConfig="formConfig"
          ></businessForm>
        </p>
      </Panel>
      <Panel name="panel_log">
        <!-- 日志 -->
        {{ vmI18n.t("common.journal") }}
        <p slot="content">
          <businessForm :formConfig="formConfigLog"></businessForm>
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
        class="detailAdd customizedModal"
        v-model="detailAddTable.modal"
        :title="vmI18n.t('modalTitle.add_adjustmentListDetails')"
        @on-ok="resetMainTable"
        @on-cancel="detailAddCancel"
      >
        <businessActionTable
          :jordanTableConfig="detailAddTable.table"
          @on-select="detailAddOnSelect"
          @on-select-cancel="detailAddOnCancel"
          @on-select-all="detailAddOnSelectAll"
          @on-select-all-cancel="detailAddOnSelectAllCancel"
        ></businessActionTable>
      </Modal>
    </Collapse>
    <!-- tab切换 -->
    <businessLabel
      :labelList="labelList"
      :labelDefaultValue="labelDefaultValue"
      @labelClick="labelClick"
    ></businessLabel>
    <!-- 表格 -->
    <div class="table">
      <!-- 赔付单明细 -->
      <div class="barcodeDetails">
        <businessActionTable
          v-show="labelDefaultValue === '1'"
          :jordanTableConfig="jordanTableConfig"
          @table-delete-detail="delTableDetail"
          @table-add-detail="addTableDetail"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
        ></businessActionTable>
        <businessActionTable
          v-show="labelDefaultValue === '2'"
          :jordanTableConfig="payableAdjustLog"
          @on-page-change="logPageChange"
          @on-page-size-change="logPageSizeChange"
        ></businessActionTable>
      </div>
    </div>
    <div class="fromLoading" v-show="isSaveLoading">
      <Spin></Spin>
    </div>
  </div>
</template>

<script>
import payableAdjustAdd from "@/js/pages/financeCenter/payableAdjustAdd";
export default payableAdjustAdd;
</script>
<style lang="less">
@import "~@/css/pages/financialCenter/payableAdjust/payableAdjustAdd.less";
</style>
