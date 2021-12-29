<template>
  <!-- 基础信息-国家省市区-新增别名/新增区域 -->
  <div
    class="cusArkCollapse customized-detail"
    :id="this.customizedModuleName"
    v-loading="loading"
  >
    <div class="buttons obj-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="obj-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ $it("com.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import addAliasOrRegion from "@/js/pages/basicData/addAliasOrRegion.js";
export default addAliasOrRegion;
</script>

<style lang="less" scoped>
// @import '~burgeonComponents/burgeon.publish/common/css/theme.less';
</style>
