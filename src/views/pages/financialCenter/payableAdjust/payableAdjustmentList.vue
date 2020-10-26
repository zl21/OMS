<template>
  <div class="payableAdjustmentList">
    <div style="margin-top: 8px" class="returnBtn">
      <!-- 按钮 -->
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
    <div class="returnForm">
      <!-- form表单 -->
      <businessForm :formConfig="formConfig"></businessForm>
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <businessLabel
        class="businessLabel"
        :labelList="labelList"
        :labelDefaultValue="labelDefaultValue"
      ></businessLabel>
      <!-- 列表组件 -->
      <div class="tableBox">
        <aTable
          ref="agtable"
          :agTableConfig="agTableConfig"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
          @on-row-dblclick="onRowDblclick"
        ></aTable>
      </div>
    </div>
    <!-- 导入 -->
    <jordanModal
      :title="importTable.confirmTitle"
      :titleAlign="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keepAlive="importTable.keepAlive"
      :excludeString="importTable.excludeString"
      :componentData="importTable.componentData"
    ></jordanModal>
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      :title="vmI18n.t('modalTitle.warning')"
      width="420"
      @on-ok="warningOk"
      :mask="true"
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
.payableAdjustmentList {
  .ark-table-wrapper {
    margin-top: 8px;
  }
  /deep/ .orderManageEdit {
    min-height: 78px;
    .popover-icon {
      right: 10px;
    }
    .flodBtn {
      border-radius: 0 0 2px 2px;
    }
    .ark-form {
      .ark-form-item {
        margin-bottom: 0;
        padding-top: 8px;
        .ark-date-picker {
          display: block;
        }
      }
      div.popInput .ark-form-item-content {
        margin-left: 0 !important;
        .item-input[data-v-6c3e82ea] {
          margin: 0;
        }
        .item-input label.title {
          padding: 0 4px 0 0 !important;
          line-height: 26px !important;
        }
        .item-input .add-input[data-v-6c3e82ea] {
          height: 26px;
          border: 1px solid #d8d8d8;
        }
        .el-input__inner {
          height: 24px;
        }
      }
      .ark-form-item-label {
        text-align: right;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        line-height: 1;
        float: left;
        font-size: 12px;
        color: #575757;
        box-sizing: border-box;
        padding: 0 4px 0 0;
        position: absolute;
        top: 50%;
      }
      .ark-form-item-content {
        position: relative;
        line-height: 1;
        // font-size: 12px;
        flex: 1;
        overflow: hidden;
      }
    }
  }

  .salesTable {
    .businessLabel {
      margin-top: 8px;
    }
    .tableBox {
      border: 1px solid #dcdee2;
      border-top: none;
      padding: 10px 10px 10px 10px;
    }
  }
  .jordan-table-box .page-box {
    margin-top: 0;
  }
  .returnForm {
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
  .burgeon-btn > .burgeon-icon {
    margin-left: 3px;
  }
}
.tableFooter {
  padding: 10px 10px 10px 0px;
  .tableFooter_border {
    padding: 2px 4px;
    border: 1px solid red;
  }
}
</style>
