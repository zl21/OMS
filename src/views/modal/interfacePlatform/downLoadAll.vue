<template>
  <div class="customized-modal" style="width: 430px">
    <Spin v-if="spinShow" size="large" fix />
    <businessForm :form-config="downLoadFormConfig">
      <template #compile="{ rowData }">
        <div class="import-box" @click="importBoxOpen(rowData.item)">
          <!-- 导入 -->
          [{{ vmI18n.t("btn.import") }}]
        </div>
      </template>
    </businessForm>
    <OmsButton class="modal-footer" :btn-config="downLoadBtnConfig" />
    <!-- 确认下载弹框 订单下载-->
    <Modal
      v-model="downLoadModal"
      class="downLoadModal"
      :title="modalTitle"
      width="450"
      :mask="true"
      @on-ok="downLoadOk"
      @on-cancel="downLoadCancel"
    >
      <p>
        <!-- 订单下载任务已经发送，任务ID： -->
        {{ vmI18n.t("modalTips.bn") }}
        <span class="taskID" @click="taskIDClick">{{ taskId }}</span>
        <!-- ，请前往接口下载任务表查看下载进度！ -->
        {{ vmI18n.t("modalTips.bo") }}
      </p>
    </Modal>

    <businessDialog
      ref="dialog"
      :title="dialogConfig.title"
      :component-data="dialogConfig.componentData"
      :name="dialogConfig.name"
      :url="dialogConfig.url"
      :width="dialogConfig.width"
    />
  </div>
</template>

<script>
import downLoadAll from "@/js/modal/interfacePlatform/downLoadAll";

export default downLoadAll;
</script>

<style >
@import "~@/css/modal/interfacePlatform/downLoadAll.less";
</style>
