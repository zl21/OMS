<!--引入曼卡龙的弹框组件-->
<template>
  <div v-if="showModal">
    <Modal v-model="modal"
           :title="title"
           :titleAlign="titleAlign"
           :width="width"
           :scrollable="scrollable"
           :closable="closable"
           :draggable="draggable"
           :mask="mask"
           :mask-closable="maskClosable"
           :transfer="transfer"
           :name="name"
           :url="url"
           :footer-hide="footerHide"
           :ok-text="okText"
           :cancel-text="cancelText"
           @on-cancel="onCancel"
           @on-ok="onOk">
      <component v-if="!$slots.content"
                 v-bind:is="currentViewData"
                 :ref="currentView"
                 :componentData="componentData"
                 @returnData="returnData"></component>
      <!-- 插槽适用范围：多个组件、单个的复杂组件、内容完全自由 -->
      <slot v-else-if="$slots.content"
            name="content"></slot>
    </Modal>
  </div>
</template>

<script>
import businessDialog from './js/businessDialog.js';
export default businessDialog;
</script>

<style lang="less">
@import "css/businessDialog.less";
</style>
