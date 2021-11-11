<template>
  <!-- 商品价格策略 -->
  <div class="customized-detail" v-loading="loading">
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" />
          </p>
        </Panel>
      </Collapse>

      <div class="customized-detail-table">
        <!-- tab切换 -->
        <OmsLabel
          v-show="isCopy || ID != -1 || isMasterRequired"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <OmsTable
            v-if="(isCopy || ID != -1) && labelDefaultValue == 'goods'"
            :jordan-table-config="goodsTableConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <SubTable
            v-if="(isCopy || ID != -1) && labelDefaultValue == 'ST_C_PRICE_LOG'"
            :component-data="subTableConfig"
          />

          <OmsDialog
            :closable="importTable.closable"
            :component-data="importTable.componentData"
            :draggable="importTable.draggable"
            :exclude-string="importTable.excludeString"
            :keep-alive="importTable.keepAlive"
            :mask="importTable.mask"
            :mask-closable="importTable.maskClosable"
            :name="importTable.name"
            :scrollable="importTable.scrollable"
            :title="importTable.confirmTitle"
            :title-align="importTable.titleAlign"
            :transfer="importTable.transfer"
            :base-path-name="importTable.basePathName"
            :url="importTable.url"
            :width="importTable.width"
            :basePathName="importTable.basePathName"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import commodityPriceAddOrEdit from '@/js/pages/strategyPlatform/commodityPriceAddOrEdit';

  export default commodityPriceAddOrEdit;
</script>
<style lang="less" scoped>
@import '~@/css/pages/strategyPlatform/commodityPriceAddOrEdit.less';
</style>
