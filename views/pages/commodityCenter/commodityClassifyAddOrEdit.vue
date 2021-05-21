<template>
  <div
    :id="this.customizedModuleName"
    class="commodityClassifyAddOrEdit customized-detail"
  >
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
        <Panel name="panel_commodityDimension">
          商品维度
          <p slot="content">
            <businessForm :form-config="formConfig2" @keyDown="keyDown" />
          </p>
        </Panel>
      </Collapse>
      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <businessActionTable
            v-show="labelDefaultValue === 'PROPERTY'"
            :jordan-table-config="cusAttrConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <orderItem
            v-show="labelDefaultValue == 'PS_C_CLASSIFY_LOG'"
            :component-data="subTableConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commodityClassifyAddOrEdit from '@/js/pages/commodityCenter/commodityClassifyAddOrEdit.js';
export default commodityClassifyAddOrEdit;
</script>

<style lang="less" scoped>
.commodityClassifyAddOrEdit {
  /* .subtablePart {
    position: relative;
    /deep/ .businessForm-box {
      width: 500px;
      .orderManageEdit .businessForm_a {
        padding-bottom: 6px;
      }
    }

    /deep/ .businessButtons-box {
      position: absolute;
      top: 0;
      left: 320px;
      .one_button {
        padding: 4px 0 2px;
      }
    }
  } */
}
@import "~professionalComponents/common/css/theme.less";
</style>
