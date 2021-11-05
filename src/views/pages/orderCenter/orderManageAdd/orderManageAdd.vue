<template>
  <div class="order-add public-main custom-main">
    <div class="orderButtons custom-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="public-content">
      <Collapse v-model="value1">
        <Panel name="1">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
        <Panel name="2">
          <!-- 收货人信息 -->
          {{ vmI18n.t("common.consigneeInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig1" />
          </p>
        </Panel>
        <Panel name="3">
          <!-- 备注信息 -->
          {{ vmI18n.t("common.remarksInfo") }}
          <p slot="content">
            <OmsForm :form-config="formConfig2" />
          </p>
        </Panel>
      </Collapse>
      <!-- tab切换 -->
      <div class="custom-label">
        <OmsLabel
          :label-default-value="labelDefaultValue"
          :label-list="labelList"
        />
      </div>
      <!-- 表格 -->
      <div class="table custom-table">
        <!-- 订单明细 -->
        <div class="barcodeDetails">
          <OmsTable
            :jordan-table-config="jordanTableConfig"
            @on-select="onSelect"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-select-cancel="onSelectCancel"
            @table-delete-detail="tableDeleteDetail"
          />
        </div>
      </div>
    </div>

    <!-- 矩阵框-->
    <OmsDialog
      :closable="matrixBox.closable"
      :component-data="matrixBox.componentData"
      :draggable="matrixBox.draggable"
      :exclude-string="matrixBox.excludeString"
      :keep-alive="matrixBox.keepAlive"
      :mask="matrixBox.mask"
      :mask-closable="matrixBox.maskClosable"
      :name="matrixBox.name"
      :scrollable="matrixBox.scrollable"
      :title="matrixBox.confirmTitle"
      :title-align="matrixBox.titleAlign"
      :transfer="matrixBox.transfer"
      :url="matrixBox.url"
      :width="matrixBox.width"
    />
  </div>
</template>
<script>
import orderManageAdd from "@/js/pages/orderCenter/orderManageAdd/orderManageAdd";

export default orderManageAdd;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/orderManageAdd/orderManageAdd.less";
</style>
