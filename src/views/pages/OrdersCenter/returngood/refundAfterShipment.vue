<template>
  <!-- 发货后退款 -->
  <div id="cbx" class="refundAfterShipment">
    <div class="re_button">
      <reButton :btn-config="btnConfig" />
    </div>
    <div class="re_form">
      <Collapse v-model="value">
        <Panel name="1">
          <!-- 基础资料 -->
          {{ vmI18n.t("panel_label.basicData") }}
          <p slot="content" class="basic-message">
            <ImageUpload
              :dataitem="imageUploadConfig"
              @deleteImg="deleteImg"
              @uploadFileChangeSuccess="uploadFileChangeSuccess"
            />
            <FormLayout
              ref="FormLayout"
              :default-column="reForm.defaultColumn"
              :defaultconfig="reForm.config"
              class="basic-message-form"
            >
              <div slot="CBX" class="cbx">
                <i style="color: #ff9900; padding: 0 6px">*</i>
                <!-- 退款类型 -->
                {{ vmI18n.t("panel_label.refundType") }}
                :&nbsp;&nbsp;&nbsp;&nbsp;
                <RadioGroup v-model="BILL_TYPE" @on-change="billTypeChange">
                  <!-- 仅退款 -->
                  <Radio label="1">
                    {{ vmI18n.t("panel_label.refundOnly") }}</Radio
                  >
                  <!-- 退货退款 -->
                  <Radio label="0">
                    {{ vmI18n.t("panel_label.returnRefund") }}</Radio
                  >
                </RadioGroup>
              </div>
              <div slot="returnType" class="returnType">
                <reForm :form-config="returnTypeFormConfig" />
              </div>
              <div slot="returnTypeItem" class="returnType">
                <reForm :form-config="returnTypeItemConfig" />
              </div>
            </FormLayout>
          </p>
        </Panel>
        <Panel v-if="!$route.query.new" name="2">
          <!-- 日志 -->
          {{ vmI18n.t("panel_label.log") }}
          <div slot="content">
            <re-form :form-config="logFormConfig" />
          </div>
        </Panel>
      </Collapse>
    </div>
    <div class="page-footer">
      <div class="page-footer-navTab">
        <p :class="navStatus === 0 ? 'action' : ''" @click="navStatus = 0">
          <!-- 退款单详情 -->
          {{ vmI18n.t("panel_label.refundSlipDetails") }}
        </p>
      </div>
      <div v-show="navStatus === 0" class="re_table">
        <reTable
          :jordan-table-config="tableConfig"
          @on-page-change="tabllePageChange"
          @on-page-size-change="tabllePageSizeChange"
          @on-select="onDel"
          @on-select-all="onDel"
          @on-select-all-cancel="onDel"
          @on-select-cancel="onDel"
          @table-add-detail="tableAddDetail"
          @table-delete-detail="tableDeleteDetail"
        />
      </div>
    </div>
    <div class="queryorderB">
      <!-- 查询原始订单编号  -->
      <Modal
        v-model="order.modal"
        :mask="true"
        :title="vmI18n.t('panel_label.refundSlipDetails')"
        :width="800"
        class="queryorder"
        @on-cancel="querycancel"
        @on-ok="queryorder"
      >
        <div class="orderContent">
          <reForm :form-config="order.orderform" />
          <reButton :btn-config="order.btn" />
        </div>
        <reTable
          :jordan-table-config="order.table"
          @on-current-change="onCurrentChange"
        />
      </Modal>
    </div>
    <div class="addItem">
      <!--  原始退单明细 -->
      <Modal
        v-model="addItem.modal"
        :mask="true"
        :title="vmI18n.t('panel_label.originalChargebackDetails')"
        :width="800"
        @on-cancel="addItemCancel"
        @on-ok="onAddItem"
      >
        <reTable
          :jordan-table-config="addItem.table"
          @on-select="onSelect"
          @on-select-all="onSelect"
          @on-select-all-cancel="onSelect"
          @on-select-cancel="onSelect"
        />
      </Modal>
      <Modal v-model="isModal" :title="提示" @on-ok="deleteImgBySure">
        <!-- 点击后将删除凭证,是否继续? -->
        <p>{{ vmI18n.t("modalTips.z5") }}</p>
      </Modal>
    </div>
  </div>
</template>
<script>
  import orderItem from "@/js/pages/orderCenter/returngood/orderItem";
  export default orderItem;
</script>

<style lang='less' scoped>
@borderStyle: 1px solid #dcdee2;
.refundAfterShipment {
  .burgeon-collapse {
    background: rgba(238, 241, 246, 1) !important;
  }

  .re_form /deep/ .burgeon-collapse-header {
    text-align: left;
    font-size: 18px !important;
  }

  .re_form /deep/ .burgeon-icon-ios-arrow-forward {
    display: none !important;
  }

  .re_form {
    /deep/ .burgeon-collapse-content-box {
      padding: 16px 0 !important;

      div,
      input {
        box-sizing: border-box !important;
      }
    }
  }

  .re_button {
    // margin-top: 8px;
    padding: 8px 0 0 0;
  }

  .cbx {
    display: flex;
    padding-left: 38px;
    margin-bottom: 8px;
  }

  .queryorderB {
    .queryorder .burgeon-modal {
      width: 800px !important;
    }

    .queryorder .burgeon-modal-body {
      overflow: hidden;
    }

    .queryorder
      .burgeon-modal-content
      .burgeon-modal-body
      .burgeon-form-item-content {
      margin-right: 0 !important;
    }

    .queryorder .burgeon-form-item {
      margin-bottom: 0 !important;
    }

    .queryorder .burgeon-modal-body .orderContent {
      display: flex;
      justify-content: space-between;
    }

    .queryorder .orderContent .buttonBox {
      height: 30px;
      margin-top: 40px;
    }

    .queryorder .jordan-table-box .page-box {
      margin-top: 0 !important;
      padding-top: 0 !important;
    }

    .queryorder .jordan-table-box .burgeon-table-wrapper {
      margin-top: 0 !important;
    }
  }

  .basic-message {
    display: flex;
    width: 100%;

    .basic-message-form {
      flex: 1;

      /deep/ .formlayout-Item {
        .burgeon-date-picker {
          width: 100%;
        }

        .returnType {
          display: flex;
          width: 100%;
          max-width: 100%;
          height: 32px;
          overflow: hidden;

          .orderManageEdit {
            width: 100%;
            padding-right: 0;

            .burgeon-form {
              padding-bottom: 0;

              .title {
                width: 120px;
                padding-right: 14px !important;
              }
            }
          }

          .popSelect {
            /deep/ .burgeon-form-item-label {
              width: 120px !important;
              padding-right: 14px !important;
            }

            /deep/ .burgeon-form-item-content {
              margin-left: 120px !important;
            }
          }
        }
      }
    }
  }

  .page-footer {
    display: flex;
    width: 100%;
    padding: 10px;
    margin-top: 15px;
    border: @borderStyle;
    box-sizing: border-box;
    flex-direction: column;

    .page-footer-navTab {
      position: relative;
      display: flex;
      width: 100%;
      padding: 0 15px;
      border-bottom: @borderStyle;
      box-sizing: border-box;

      > p {
        position: relative;
        display: inline-flex;
        top: 1px;
        padding: 8px 15px;
        border: @borderStyle;
        border-right: 0;

        &.action {
          color: #fd6442;
          border-bottom-color: #ffffff;
        }

        &:last-of-type {
          border-right: @borderStyle;
        }
      }
    }

    > div {
      width: 100%;
    }
  }
}
</style>
