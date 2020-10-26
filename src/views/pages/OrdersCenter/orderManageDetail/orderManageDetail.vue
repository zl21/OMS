<!--
date:2019-03-01
author:wdq
feature : 订单中心-零售发货单详情
-->
<template>
  <div v-loading="pageLoad" class="order">
    <div class="order-btn">
      <businessButton
        :btn-config="btnConfig"
        @dropDownClick="dropDownClickChange"
      />
    </div>
    <div class="order-header">
      <businessLabel
        :label-default-value="labelDefaultValue"
        :label-list="labelList"
        @labelClick="labelClick"
      />
    </div>
    <div v-if="refresh" class="order-content">
      <EssentialInfo
        v-show="labelDefaultValue === 'OC_B_ORDER'"
        :component-data="tab1"
        @freshLoad="freshLoad"
      />
      <OrderItem
        v-show="labelDefaultValue !== 'OC_B_ORDER'"
        :component-data="tab2"
      />
    </div>
    <!--单据状态图片展示 -->
    <businessStatusFlag :status-name="statusName" class="statusFlag" />
    <!--错误弹框-->
    <Modal v-model="modal" title="Title" @on-ok="asyncOK">
      <p>error_tip</p>
    </Modal>

    <businessDialog
      :key="index"
      :ref="list.name"
      :component-data="list.data"
      v-for="(list, index) in dialogs"
      :confirm="list.confirm"
      :exclude-string="list.excludeString"
      :footer-hide="list.footerHide"
      :keep-alive="list.keepAlive || true"
      :mask-closable="list.maskClosable === false ? false : true"
      :name="list.name"
      :quit="list.quit"
      :title="list.title"
      :url="list.url"
      :width="list.width || ''"
    />
    <!-- 公共弹框 -->
    <businessDialog
      :batch-closed="publicBouncedConfig.batchClosed"
      :closable="publicBouncedConfig.closable"
      :component-data="publicBouncedConfig.componentData"
      :draggable="publicBouncedConfig.draggable"
      :exclude-string="publicBouncedConfig.excludeString"
      :keep-alive="publicBouncedConfig.keepAlive"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :name="publicBouncedConfig.name"
      :quit="publicBouncedConfig.quit"
      :scrollable="publicBouncedConfig.scrollable"
      :title="publicBouncedConfig.confirmTitle"
      :title-align="publicBouncedConfig.titleAlign"
      :transfer="publicBouncedConfig.transfer"
      :url="publicBouncedConfig.url"
      :width="publicBouncedConfig.width"
    />
  </div>
</template>

<script>
import orderManageDetail from "@/js/pages/orderCenter/orderManageDetail/orderManageDetail";
export default orderManageDetail;
</script>
<style lang="less" scoped>
.order {
  .order-btn {
    // padding: 10px 10px 0px 10px;
    padding-top: 10px;
    width: calc(100% - 190px);
    z-index: 1000;
    position: fixed;
    top: 84px;
    background: #fff;
  }

  .order-header {
    position: fixed;
    z-index: 999;
    top: 128px;
    width: 100%;
    background: #fff;
  }

  .order-content {
    margin-top: 88px;
  }

  .statusFlag {
    position: fixed !important;
    right: 60px !important;
    top: 120px !important;
  }
}
</style>
