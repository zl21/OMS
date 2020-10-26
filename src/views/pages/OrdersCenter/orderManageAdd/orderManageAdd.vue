<template>
  <div class="order-add">
    <div v-show="isShowFromLoading" class="order_add_loading">
      <Spin />
    </div>
    <div class="orderButtons">
      <businessButton :btn-config="btnConfig" />
    </div>
    <Collapse v-model="value1">
      <Panel name="1">
        <!-- 基本信息 -->
        {{ vmI18n.t("common.baseInformation") }}
        <p slot="content">
          <businessForm :form-config="formConfig" @keyDown="keyDown" />
        </p>
      </Panel>
      <Panel name="2">
        <!-- 收货人信息 -->
        {{ vmI18n.t("common.consigneeInformation") }}
        <p slot="content">
          <businessForm :form-config="formConfig1" />
        </p>
      </Panel>
      <Panel name="3">
        <!-- 备注信息 -->
        {{ vmI18n.t("common.remarksInfo") }}
        <p slot="content">
          <businessForm :form-config="formConfig2" />
        </p>
      </Panel>
    </Collapse>
    <!-- tab切换 -->
    <businessLabel
      :label-default-value="labelDefaultValue"
      :label-list="labelList"
    />
    <!-- 表格 -->
    <div class="table">
      <!-- 订单明细 -->
      <div class="barcodeDetails">
        <businessActionTable
          :jordan-table-config="jordanTableConfig"
          @on-select="onSelect"
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
          @on-select-cancel="onSelectCancel"
          @table-delete-detail="tableDeleteDetail"
        />
      </div>
    </div>
    <!-- 矩阵框-->
    <jordanModal
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
@import "~@/assets/css/css_1_3/theme.less";

.order-add {
  padding-top: 50px;
}

.orderButtons {
  display: block;
  width: 100%;
  z-index: 1000;
  position: absolute;
  top: 14px;
  left: 16px;
  padding: 0;
  background: #fff;
}

.order-add .table {
  display: flex;
}

.order-add .barcodeDetails,
.order-add .orderDetails {
  width: 100%;
}

.order-add .table {
  padding: 0 5px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}

.barcodeDetails {
  .burgeon-table-tfoot {
    transform: translateY(1px) !important;
  }
}

.order_add_loading {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.7);
  z-index: 1000 !important;
}
</style>
