<!--
 * @Author: your name
 * @Date: 2021-09-22 17:19:11
 * @LastEditTime: 2021-09-26 15:18:52
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /skx-mid/src/views/pages/inventoryCenter/storeScoreStrategy/storeScoreStrategy.vue
-->
<!--店仓评分设置表 列表-->
<template>
  <div class="storeScoreStrategy">
    <OmsButton :btn-config="btnConfig" class="top-btns" />
    <div class="br-dfdfdf">
      <OmsForm :form-config="formConfig" />
    </div>
    <div class="tableContent mg-tp-20" v-loading="agTableConfig.agLoading">
      <OmsAgTable
        ref="agGridChild"
        :options="options"
        :ag-table-config="agTableConfig"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
        @on-row-dblclick="onRowDblclick"
        @on-sort-change="onSortChange"
        @on-selection-change="onSelectionChange"
      />
    </div>
    <!--导入组件-->
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
</template>

<script>
import channelRatioStrategy from '@/js/pages/inventoryCenter/storeScoreStrategy/storeScoreStrategy';

export default channelRatioStrategy;
</script>
<style lang="less">
@import "~@/css/pages/inventoryCenter/storeScoreStrategy.less";
</style>
