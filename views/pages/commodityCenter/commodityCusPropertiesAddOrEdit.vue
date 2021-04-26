<template>
  <div class="commodityCusPropertiesAddOrEdit customized-detail" :id="this.customizedModuleName">
    <loading :loading="loading" />
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          基本信息
          <p slot="content">
            <businessForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
      </Collapse>
      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel v-show="showSubtablePart" :label-list="labelList" :label-default-value="labelDefaultValue" @labelClick="labelClick" />
        <!-- 子表Part -->
        <div class="subtablePart">
          <businessActionTable
            v-show="showSubtablePart && labelDefaultValue === 'PROPERTYVALUES'"
            :jordan-table-config="propertyValuesConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <orderItem v-show="showSubtablePart && labelDefaultValue !== 'PROPERTYVALUES'" :component-data="subTableConfig"></orderItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commodityCusPropertiesAddOrEdit from '@/js/pages/commodityCenter/commodityCusPropertiesAddOrEdit.js';
export default commodityCusPropertiesAddOrEdit;
</script>

<style lang="less" scoped>
@import '~professionalComponents/common/css/theme.less';
.commodityCusPropertiesAddOrEdit {
  position: relative;

  /* 标注图标样式 */
  /* /deep/ .ark-tooltip {
    position: absolute;
    right: -20px;
    top: 8px;
    z-index: 99;

    .ark-icon {
      font-size: 18px;
      color: #ed4014;
    }
  } */
}
// @import '~@/css/pages/commodityCenter/commodityCusPropertiesAddOrEdit.less';
</style>
