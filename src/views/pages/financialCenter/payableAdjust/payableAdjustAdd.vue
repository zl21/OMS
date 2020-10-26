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
@import "~professionalComponents/common/css/theme.less";

.financialManageCenter {
  /deep/ .barcodeDetails {
    .ark-form-item {
      margin-bottom: 0;
    }
  }
  /deep/ .orderManageEdit {
    .ark-fkrp-poptip div {
      outline: none;
      height: 30px;
    }
    .item-col label.title i {
      top: auto;
      left: -2px !important;
      font-size: 12px;
      height: auto;
      line-height: inherit;
      vertical-align: inherit;
    }
    .ark-row {
      div.ark-col-span-8:nth-child(8) {
        .item-col .add-input {
          color: #575757;
          padding: 0 10px !important;
        }
      }
    }
  }
}

.ark-table-wrapper {
  margin-top: 8px;
}

.buttons {
  padding: 8px 0 0 0;
}

.order .table {
  display: flex;
}

.order .barcodeDetails,
.order .orderDetails {
  width: 100%;
}
.detailAdd .burgeon-modal {
  width: 800px !important;
}
.detailAdd .burgeon-modal-body {
  overflow: hidden;
}
.financialManageCenter {
  position: relative;
  .fromLoading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000 !important;
  }
}
.financialManageCenter .burgeon-table-tfoot {
  transform: translateY(0) !important;
}
</style>
