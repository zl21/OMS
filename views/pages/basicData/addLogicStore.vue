<template>
  <div class="addLogicStore cusArkCollapse">
    <div class="buttons">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          基础资料
          <p slot="content">
            <businessForm :form-config="formConfig" />
          </p>
        </Panel>
        <Panel name="panel_businessInfo">
          业务信息
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
