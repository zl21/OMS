<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-07-01 13:53:35
 * @LastEditors: Please set LastEditors
 * @Description: 新增逻辑仓
 * @FilePath: /project-logic/views/pages/basicData/addLogicStore.vue
-->
<template>
  <div class="customized-detail">
    <div class="obj-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="obj-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- 基础资料 -->
          {{ $it('pL.basicData') }}
          <p slot="content">
            <OmsForm :form-config="formConfig" />
          </p>
        </Panel>
        <Panel name="panel_businessInfo">
          <!-- 业务信息 -->
          {{ $it('pL.ax') }}
          <p slot="content">
            <OmsForm :form-config="businessFormConfig" />
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
// @import '~burgeonComponents/burgeon.publish/common/css/theme.less';
@import url(https://unpkg.zhimg.com/@alanh/oms-ui@2.0.7/burgeon.publish/common/css/theme.less);

</style>
