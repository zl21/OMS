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
          <div slot="content"  class="customized_Info_form">
            <businessForm :form-config="formConfig" />
          </div>
          <div class="clear"></div>
        </Panel>
        <Panel name="attr">
          自定义属性
          <p slot="content" class="panel-title">固定属性：</p>
          <p slot="content">
            <businessForm :form-config="customAttr.fixFormConfig" />
          </p>
          <p slot="content" class="panel-title">自定义属性：</p>
          <p slot="content">
            <businessForm :form-config="customAttr.customFormConfig" />
          </p>
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
            <businessButton :btn-config="skuInfo.btnConfig" />
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
            <businessButton :btn-config="supplier.btnConfig" />
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
          <!-- <logTable /> -->
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
