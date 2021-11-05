<!--
 * @Author: your name
 * @Date: 2021-07-15 19:01:59
 * @LastEditTime: 2021-08-20 14:18:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/commodityCenter/commodityClassifyAddOrEdit.vue
-->
<template>
<!-- 商品分类 - 新增/编辑 -->
  <div
    :id="this.customizedModuleName"
    class="commodityClassifyAddOrEdit customized-detail"
  >
    <loading :loading="loading" />
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
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
        <Panel name="panel_commodityDimension">
          <!-- 商品维度 -->
        {{vmI18n.t('panel_label.b6')}}
          <p slot="content">
            <businessForm :form-config="formConfig2" @keyDown="keyDown" :key="fresh2"/>
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
          <OmsTable
            :key="cusAttrConfig.key"
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
  /deep/ .ark-form-item.OPEN_DIMENSION {
    display: flex;
    justify-content: center;
    label {
      display: inline-block;
      width: auto !important;
    }
    .ark-form-item-content {
      margin-left: 0 !important;
    }
  }
  /* .subtablePart {
    position: relative;
    /deep/ .businessForm-box {
      width: 500px;
      .business-form-main .businessForm_a {
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
@import '~burgeonComponents/burgeon.publish/common/css/theme.less';
</style>
