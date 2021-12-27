<!--
 * @Author: liu.sl
 * @LastEditors: liu.sl
 * @Date: 2021-05-26 13:50:00
 * @LastEditTime: 2021-05-28 14:13:45
 * @FilePath: \r3-web\src\views\modal\strategyPlatform\scheduleFormDialog.vue
-->
<template>
  <div class="scheduleFormDialog customized-modal">
    <div class="subtablePart">
      <OmsForm
        v-if="dialogConfig.length == 1"
        :form-config="dialogConfig[0].formConfig"
      />
      <Collapse
        v-if="dialogConfig.length > 1"
        v-model="subTableCollapse"
      >
        <Panel
          v-for="(item, index) in dialogConfig"
          :key="item.title"
          :name="String(index)"
        >
          {{ item.title }}
          <p slot="content">
            <OmsForm :form-config="item.formConfig" :key="forceReload"/>
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
