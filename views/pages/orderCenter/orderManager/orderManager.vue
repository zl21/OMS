<template>
  <div class="orderManager-box custom-main">
    <loading :loading="agTableConfig.agLoading" />
    <div class="totalHeight custom-btn">
      <businessButton
        :btn-config="btnConfig"
        @dropDownClick="eventGather.dropDownClickChange"
      />
    </div>
    <div class="from totalHeight custom-form">
      <loading :loading="isShowFromLoading" />
      <IntegrateSearchFilter
        v-show="isShowSeniorOrOrdinary"
        id="IntegrateSearchFilter"
        ref="integrateSearchFilter"
        v-model="selectValue"
        :drop-down-list="dropList"
        :search-method="searchMethod"
        :tag-list="tagList"
        class="IntegrateSearchFilter"
        @on-clear-all="eventGather.clearAll('searchMethod')"
        @on-clear-item="eventGather.clearItem('searchMethod')"
        @on-search="eventGather.search"
        @on-drop-change="eventGather.onDropChange"
      />
      <!-- trigger="click" -->
      <businessForm
        v-show="!isShowSeniorOrOrdinary"
        :form-config="formConfig"
        style="margin-top: 10px"
      />
      <businessButton 
        class="orderSearchBtn"
        v-show="!isShowSeniorOrOrdinary"
        :btn-config="btnsSearch"
      />
      <div
        class="from-folding"
        @click="eventGather.shutDownOrbounceOff"
      >
        <i :class="iconDownIcon" />
      </div>
    </div>
    <div class="table custom-table">
      <businessLabel
        :label-default-value="labelDefaultValue"
        :label-list="labelList"
        class="businessLabel totalHeight"
        @labelClick="(val) => eventGather.labelClick(val,'getData')"
      />
      <div class="aTable">
        <aTable
          ref="agGridChild"
          :ag-table-config="agTableConfig"
          @on-page-change="(val) => eventGather.pageChange(val,'getData')"
          @on-page-size-change="(val) => eventGather.pageSizeChange(val,'getData')"
          @on-row-dblclick="eventGather.onRowDblclick"
          @on-sort-changed="eventGather.onSortChanged('getData')"
        />
      </div>
    </div>
    <dir />
    <!-- 公共弹框 -->
    <businessDialog
      :batch-closed="publicBouncedConfig.batchClosed"
      :closable="publicBouncedConfig.closable"
      :component-data="publicBouncedConfig.componentData"
      :draggable="publicBouncedConfig.draggable"
      :exclude-string="publicBouncedConfig.excludeString"
      :keep-alive="publicBouncedConfig.keepAlive"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :name="publicBouncedConfig.name"
      :quit="publicBouncedConfig.quit"
      :scrollable="publicBouncedConfig.scrollable"
      :title="publicBouncedConfig.confirmTitle"
      :title-align="publicBouncedConfig.titleAlign"
      :transfer="publicBouncedConfig.transfer"
      :url="publicBouncedConfig.url"
      :width="publicBouncedConfig.width"
    />
    <!-- 导入 -->
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
      :url="importTable.url"
      :width="importTable.width"
      :basePathName="importTable.basePathName"
    />
  </div>
</template>

<script>
  import orderManager from '@/js/pages/orderCenter/orderManager/orderManager';
  export default orderManager;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/orderManager/orderManager.less";
</style>
