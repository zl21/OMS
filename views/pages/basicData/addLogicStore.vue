<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-07-01 13:53:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/basicData/addLogicStore.vue
-->
<template>
  <div class="customized-detail">
    <div class="customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- 基础资料 -->
          {{ vmI18n.t('panel_label.basicData') }}
          <p slot="content">
            <businessForm :form-config="formConfig" />
          </p>
        </Panel>
        <Panel name="panel_businessInfo">
          <!-- 业务信息 -->
          {{ vmI18n.t('panel_label.ax') }}
          <p slot="content">
            <businessForm :form-config="businessFormConfig" />
          </p>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
  import addLogicStore from '@/js/pages/basicData/addLogicStore.js';

  export default addLogicStore;
</script>
<style lang="less">
@import '~professionalComponents/common/css/theme.less';
</style>
