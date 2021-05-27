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
                  slot="returnType"
                  class="returnType"
                >
                  <reForm :form-config="returnTypeFormConfig" />
                </div>
                <div
                  slot="abnormalCategories"
                  class="abnormalCategories"
                >
                  <reForm :form-config="abnormalCategoriesFormConfig" />
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
      <div class="queryorderB">
        <!-- 查询原始订单编号  -->
        <Modal
          v-model="order.modal"
          :mask="true"
          title="零售发货单选择窗口"
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
</template>

<script>
  import skuAbnormalRegistration from '@/js/pages/orderCenter/returngood/skuAbnormalRegistration';

  export default skuAbnormalRegistration;
</script>

<style lang="less">
  @import "~@/css/pages/orderCenter/returngood/skuAbnormalRegistration.less";
</style>
