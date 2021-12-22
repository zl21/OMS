<!--
 * @Author: your name
 * @Date: 2021-04-27 13:44:58
 * @LastEditTime: 2021-05-20 11:34:16
 * @LastEditors: Please set LastEditors
 * @Description: 国家省市区-编辑
 * @FilePath: /burgeon-project-logic/views/pages/basicData/nationalProvincialMunicipalEdit.vue
-->
<template>
  <!-- 基础信息-国家省市区-编辑 -->
  <div :id="this.customizedModuleName" class="customized-detail" v-loading="loading">
    <div class="obj-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ $it("com.baseInformation") }}
          <p slot="content">
            <OmsForm
              :form-config="formConfig"
              @keyDown="keyDown"
            />
          </p>
        </Panel>
      </Collapse>
      <div class="customized-detail-table">
        <OmsLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
        />
        <div class="subtablePart">
          <SubTable :component-data="subTableConfig" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import nationalProvincialMunicipalEdit from '@/js/pages/basicData/nationalProvincialMunicipalEdit.js';
export default nationalProvincialMunicipalEdit;
</script>

<style lang="less" scoped>
// @import '~burgeonComponents/burgeon.publish/common/css/theme.less';
@import url(https://unpkg.zhimg.com/@alanh/oms-ui@2.0.7/burgeon.publish/common/css/theme.less);

</style>
