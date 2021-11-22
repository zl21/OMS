<template>
  <div
    :class="['dialogForm', 'customized-modal', { 'fix-height': componentData.type == 'warehouseWarrant' }]"
    v-loading="loading">
    <div class="subtablePart">
      <OmsForm
        v-if="componentData.dialogConfig.length == 1"
        :form-config="componentData.dialogConfig[0].formConfig"
      />
      <Collapse
        v-if="componentData.dialogConfig.length > 1"
        v-model="subTableCollapse"
      >
        <Panel
          v-for="(item, index) in componentData.dialogConfig"
          :key="item.title"
          :name="String(index)"
        >
          {{ item.title }}
          <p slot="content">
            <OmsForm :form-config="item.formConfig" />
          </p>
        </Panel>
      </Collapse>
    </div>
    <OmsButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import scheduleFormDialog from '@/js/modal/strategyPlatform/scheduleFormDialog';
  export default scheduleFormDialog;
</script>
<style lang="less" scoped>
  @import "~@/css/modal/strategyPlatform/scheduleFormDialog.less";
</style>
