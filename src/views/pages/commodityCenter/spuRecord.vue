<!--
 * @Author: your name
 * @Date: 2021-05-19 17:55:24
 * @LastEditTime: 2021-06-24 11:20:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/commodityCenter/spuRecord.vue
-->
<template>
  <div class="spuRecord customized-detail" v-loading="loading">
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- SPU基本信息 -->
          SPU {{ vmI18n.t("common.baseInformation") }}
          <div slot="content" class="customized_Info_img">
            <arkImageUpload
              v-model="imageValue"
              :http="http"
              :PropsData="dataitem"
              @on-delete="deleteImg"
              @on-Change="uploadFileChangeSuccess"
            />
          </div>
          <div slot="content" class="customized_Info_form">
            <OmsForm :form-config="formConfig" />
          </div>
          <div slot="content" class="clear"></div>
        </Panel>
        <Panel name="panel_fixAttr">
          <!-- 固定属性 -->
          {{ vmI18n.t("panel_label.b4") }}
          <div slot="content">
            <OmsForm :form-config="customAttr.fixFormConfig" />
          </div>
        </Panel>
        <Panel name="panel_cusAttr">
          <!-- 自定义属性 -->
          {{ vmI18n.t("panel_label.b5") }}
          <div slot="content">
            <OmsForm :form-config="customAttr.customFormConfig" />
          </div>
        </Panel>
        <!-- <Panel name="attr">
          自定义属性
          <div slot="content" class="customProperties">
            <div class="panel-title">固定属性：</div>
            <OmsForm :form-config="customAttr.fixFormConfig" />
          </div>
          <div slot="content" class="customProperties">
            <div class="panel-title">自定义属性：</div>
            <OmsForm :form-config="customAttr.customFormConfig" />
          </div>
        </Panel> -->
      </Collapse>
      <!-- tab切换 -->
      <div class="customized-detail-table">
        <OmsLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div v-show="labelValue == 'skuInfo'" class="skuInfo">
          <div class="productSpecification_button">
            <OmsButton :btn-config="skuInfoBtnConfig" />
          </div>
          <div class="productSpecification_table">
            <Table
              :columns="skuInfo.columns"
              :data="skuInfo.resData"
              highlight-row
              highlight-th
              @on-column-click="onColumnClick"
              @on-row-click="onRowClick"
            />
          </div>
        </div>
        <div v-show="labelValue == 'supplier'" class="supplier">
          <div class="from-btn">
            <div class="businessForm-box">
              <OmsForm :form-config="tableFormConfig" />
            </div>
            <div class="businessButton">
              <OmsButton :btn-config="supplierBtnConfig" />
            </div>
          </div>
          <div class="supplier_body">
            <Table
              :columns="supplier.columns"
              :data="supplier.resData"
              @on-selection-change="onSelectionChange"
            />
          </div>
        </div>
        <div v-show="labelValue == 'logTable'" class="lgoTable">
          <subTable :component-data="subTableConfig"></subTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import spuRecord from '@/js/pages/commodityCenter/spuRecord.js';

export default spuRecord;
</script>
<style lang="less" scoped>
@import "~@/css/pages/commodityCenter/spuRecord.less";
</style>
