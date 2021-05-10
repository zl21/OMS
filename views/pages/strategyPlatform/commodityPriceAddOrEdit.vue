<template>
  <!-- 商品价格策略 -->
  <div class="commodity-price customized-detail" v-loading="loading">
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          基本信息
          <p slot="content">
            <businessForm :form-config="formConfig" />
          </p>
        </Panel>
      </Collapse>

      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel
          v-show="isCopy || ID != -1 || isMasterRequired"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <businessActionTable
            v-if="(isCopy || ID != -1) && labelDefaultValue == 'goods'"
            :jordan-table-config="goodsTableConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <orderItem
            v-if="(isCopy || ID != -1) && labelDefaultValue == 'logTable'"
            :component-data="subTableConfig"
          />

          <businessDialog
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
