<!--
 * @Author: your name
 * @Date: 2021-05-19 17:55:24
 * @LastEditTime: 2021-06-24 11:20:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/commodityCenter/spuRecord.vue
-->
<template>
  <div class="spuRecord cusArkCollapse customized-detail">
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          SPU基本信息
          <div
            slot="content"
            class="customized_Info_img"
          >
            <ImageUpload
              v-model="imageValue"
              :http="http"
              :PropsData="dataitem"
              @on-delete="deleteImg"
              @on-Change="uploadFileChangeSuccess"
            />
          </div>
          <div slot="content" class="customized_Info_form">
            <businessForm :form-config="formConfig" />
          </div>
          <div slot="content" class="clear"></div>
        </Panel>
        <Panel name="attr">
          自定义属性
          <div slot="content" class="customProperties">
            <div class="panel-title">固定属性：</div>     
            <businessForm :form-config="customAttr.fixFormConfig" />
          </div>
          <div slot="content" class="customProperties">
            <div class="panel-title">自定义属性：</div>     
            <businessForm :form-config="customAttr.customFormConfig" />
          </div>
        </Panel>
      </Collapse>
      <!-- tab切换 -->
      <div class="customized-detail-table">
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div
          v-show="labelValue == 'skuInfo'"
          class="skuInfo"
        >
          <div class="productSpecification_button">
            <businessButton :btn-config="skuInfoBtnConfig" />
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
        <div
          v-show="labelValue == 'supplier'"
          class="supplier"
        >
          <div class="supplier_header">
            <businessForm :form-config="tableFormConfig" />
            <businessButton :btn-config="supplierBtnConfig" />
          </div>
          <div class="supplier_body">
            <Table
              :columns="supplier.columns"
              :data="supplier.resData"
              @on-selection-change="onSelectionChange"
            />
          </div>
        </div>
        <div
          v-show="labelValue == 'logTable'"
          class="lgoTable"
        >
          <subTable :component-data="subTableConfig" ></subTable>
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
@import '~@/css/pages/commodityCenter/spuRecord.less';
</style>
