<template>
  <div
    class="downLoadTaobaoOrder"
    style="width:430px;padding-right:20px"
  >
    <businessForm :form-config="downLoadFormConfig" />
    <jordanBtn :btn-config="downLoadBtnConfig" />
    <!-- 确认下载弹框 订单下载-->
    <Modal
      v-model="downLoadModal"
      class="downLoadModal"
      :title="vmI18n.t('modalTitle.orderDownload')"
      width="450"
      :mask="true"
      @on-ok="downLoadOk"
      @on-cancel="downLoadCancel"
    >
      <p>
        <!-- 订单下载任务已经发送，任务ID： -->
        {{ vmI18n.t("modalTips.bn") }}
        <span
          class="taskID"
          @click="taskIDClick"
        >{{ taskId }}</span>
        <!-- ，请前往接口下载任务表查看下载进度！ -->
        {{ vmI18n.t("modalTips.bo") }}
      </p>
    </Modal>
  </div>
</template>

<script>
  import downLoadAll from '@/js/modal/InterfacePlatform/downLoadAll';

  export default downLoadAll;
</script>

<style >
  @import "~@/css/modal/InterfacePlatform/downLoadAll.less";
</style>
