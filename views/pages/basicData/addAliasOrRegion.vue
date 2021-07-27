<template>
  <!-- 基础信息-国家省市区-新增别名/新增区域 -->
  <div
    class="cusArkCollapse customized-detail"
    :id="this.customizedModuleName"
  >
    <loading :loading="loading" />
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <businessForm :form-config="formConfig" @keyDown="keyDown" />
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
// @import '~professionalComponents/common/css/theme.less';
</style>
