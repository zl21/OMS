<template>
  <!-- 发货后退款 -->
  <div
    id="cbx"
    class="refundAfterShipment public-main"
  >
    <div class="re_button">
      <reButton :btn-config="btnConfig" />
    </div>
    <div class="public-content">
      <div class="re_form">
        <Collapse v-model="value">
          <Panel name="1">
            <!-- 基础资料 -->
            {{ vmI18n.t("panel_label.basicData") }}
            <p
              slot="content"
              class="basic-message"
            >
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
                <div
                  slot="CBX"
                  class="cbx"
                >
                  <i style="color: #ff9900; padding: 0 6px">*</i>
                  <!-- 退款类型 -->
                  {{ vmI18n.t("form_label.refundType") }}
                  :&nbsp;&nbsp;&nbsp;&nbsp;
                  <RadioGroup
                    v-model="BILL_TYPE"
                    @on-change="billTypeChange"
                  >
                    <!-- 仅退款 -->
                    <Radio label="1">
                      {{ vmI18n.t("form_label.refundOnly") }}
                    </Radio>
                    <!-- 退货退款 -->
                    <Radio label="0">
                      {{ vmI18n.t("form_label.returnRefund") }}
                    </Radio>
                  </RadioGroup>
                </div>
                <div
                  slot="returnType"
                  class="returnType"
                >
                  <reForm :form-config="returnTypeFormConfig" />
                </div>
                <div
                  slot="returnTypeItem"
                  class="returnType"
                >
                  <reForm :form-config="returnTypeItemConfig" />
                </div>
              </FormLayout>
            </p>
          </Panel>
          <Panel
            v-if="!$route.query.new"
            name="2"
          >
            <!-- 日志 -->
            {{ vmI18n.t("panel_label.log") }}
            <div slot="content">
              <re-form :form-config="logFormConfig" />
            </div>
          </Panel>
        </Collapse>
      </div>
      <div class="tab-content">
        <div class="tab-content-navTab">
          <p
            :class="navStatus === 0 ? 'action' : ''"
            @click="navStatus = 0"
          >
            <!-- 退款单详情 -->
            {{ vmI18n.t("panel_label.refundSlipDetails") }}
          </p>
          <p :class="navStatus === 1 ? 'action' : ''" v-if="$route.query.customizedModuleId !== 'New'" @click="navStatus = 1">日志</p>
        </div>
        <div
          v-show="navStatus === 0"
          class="re_table"
        >
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
        <!-- 日志 -->
        <div class="re_table" v-show="navStatus === 1">
          <reTable
            v-loading="returnLogTableLoad"
            :jordanTableConfig="returnLogTableConfig"
          ></reTable>
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
          :title="vmI18n.t('modalTitle.originalChargebackDetails')"
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
        <Modal
          v-model="isModal"
          title="提示"
          @on-ok="deleteImgBySure"
        >
          <!-- 点击后将删除凭证,是否继续? -->
          <p>{{ vmI18n.t("modalTips.z5") }}</p>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
  import orderItem from '@/js/pages/orderCenter/returngood/refundAfterShipment';

  export default orderItem;
</script>

<style lang='less' scoped>
@import "~@/css/pages/orderCenter/returngood/refundAfterShipment.less";
</style>
