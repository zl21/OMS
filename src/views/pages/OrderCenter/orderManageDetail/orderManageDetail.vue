<!--
date:2019-03-01
author:wdq
feature : 订单中心-零售发货单详情
-->
<template>
  <div
    v-loading=""
    class="order public-main"
  >
    <!-- 弹框 -->
    <loading :loading="pageLoad" />
    <div class="order-btn">
      <businessButton
        :btn-config="btnConfig"
        @dropDownClick="dropDownClickChange"
      />
    </div>
    <div class="public-content">
      <div class="order-header">
        <businessLabel
          :label-default-value="labelDefaultValue"
          :label-list="labelList"
          @labelClick="labelClick"
        />
      </div>
      <div
        v-if="refresh"
        class="order-content"
      >
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
      <businessStatusFlag
        :status-name="statusName"
        class="statusFlag"
      />
    </div>
    <!--错误弹框-->
    <Modal
      v-model="modal"
      title="Title"
      @on-ok="asyncOK"
    >
      <p>error_tip</p>
    </Modal>

    <!-- 状态查询 -->
    <Modal
      v-model="statusSelectModal"
      :mask="true"
      :title="'状态查询'"
      width="420"
      :footer-hide="true"
    >
      <div class="orderContent">
        <businessForm :form-config="statusSelectFormConfig" />
      </div>

      <jordanBtn :btnConfig="statusSelectBtnConfig"></jordanBtn>
    </Modal>

    <businessDialog
      v-for="(list, index) in dialogs"
      :key="index"
      :ref="list.name"
      :component-data="list.data"
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
  import orderManageDetail from '@/js/pages/orderCenter/orderManageDetail/orderManageDetail';

  export default orderManageDetail;
</script>
<style lang="less" scoped>
  @import "~@/css/pages/orderCenter/orderManageDetail/orderManageDetail.less";
</style>
