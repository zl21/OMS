<!--
 * @Author: your name
 * @Date: 2021-04-27 11:20:18
 * @LastEditTime: 2021-06-11 11:31:42
 * @LastEditors: your name
 * @Description: 商品自定义属性
 * @FilePath: /project-logic/views/pages/commodityCenter/commodityCusPropertiesAddOrEdit.vue
-->
<template>
  <div
    class="commodityCusPropertiesAddOrEdit customized-detail"
    :id="this.customizedModuleName"
    v-loading="loading"
  >
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
      </Collapse>
      <div class="customized-detail-table">
        <!-- tab切换 -->
        <OmsLabel
          v-show="showSubtablePart"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <OmsTable
            v-show="showSubtablePart && labelDefaultValue === 'PROPERTYVALUES'"
            :jordan-table-config="propertyValuesConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <orderItem
            v-show="showSubtablePart && labelDefaultValue !== 'PROPERTYVALUES'"
            :component-data="subTableConfig"
          ></orderItem>
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
// @import '~burgeonComponents/burgeon.publish/common/css/theme.less';
@import url(https://cdn.jsdelivr.net/gh/zl21/OMS/burgeon.publish/common/css/theme.less);

.commodityCusPropertiesAddOrEdit {
  position: relative;
}
// @import '~@/css/pages/commodityCenter/commodityCusPropertiesAddOrEdit.less';
</style>
