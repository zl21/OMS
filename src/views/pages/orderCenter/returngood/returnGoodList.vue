<template>
  <div class="returnGoodList custom-main">
    <div class="returnBtn totalHeight custom-btn">
      <!-- 按钮 -->
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="returnForm totalHeight custom-form">
      <!-- form表单 -->
      <OmsForm maxHeight="120" v-if="resetForm" :form-config="formConfig" />
    </div>
    <div class="salesTable custom-table">
      <!-- tab切换 -->
      <OmsLabel class="businessLabel totalHeight" :label-list="labelList" :label-default-value="labelDefaultValue" @labelClick="labelClick" />
      <!-- 列表组件 -->
      <div class="tableBox">
        <div v-loading="agTableConfig.agLoading" :class="{ loadingActive: loadingActive }" />
        <OmsAgTable ref="agGridChild" :options="options" :ag-table-config="agTableConfig" @on-page-change="pageChange" @on-page-size-change="pageSizeChange" @on-row-dblclick="onRowDblclick" @on-selection-change="onSelectionChange" />
      </div>
    </div>
    <!-- 修改备注-->
    <OmsDialog
      :title="changeRemarkConfig.confirmTitle"
      :title-align="changeRemarkConfig.titleAlign"
      :width="changeRemarkConfig.width"
      :scrollable="changeRemarkConfig.scrollable"
      :closable="changeRemarkConfig.closable"
      :draggable="changeRemarkConfig.draggable"
      :mask="changeRemarkConfig.mask"
      :mask-closable="changeRemarkConfig.maskClosable"
      :transfer="changeRemarkConfig.transfer"
      :name="changeRemarkConfig.name"
      :url="changeRemarkConfig.url"
      :keep-alive="changeRemarkConfig.keepAlive"
      :exclude-string="changeRemarkConfig.excludeString"
      :component-data="changeRemarkConfig.componentData"
    />
    <!-- 修改退回仓库-->
    <OmsDialog
      :title="modifyWarehouse.confirmTitle"
      :title-align="modifyWarehouse.titleAlign"
      :width="modifyWarehouse.width"
      :scrollable="modifyWarehouse.scrollable"
      :closable="modifyWarehouse.closable"
      :draggable="modifyWarehouse.draggable"
      :mask="modifyWarehouse.mask"
      :mask-closable="modifyWarehouse.maskClosable"
      :transfer="modifyWarehouse.transfer"
      :name="modifyWarehouse.name"
      :url="modifyWarehouse.url"
      :keep-alive="modifyWarehouse.keepAlive"
      :exclude-string="modifyWarehouse.excludeString"
      :component-data="modifyWarehouse.componentData"
    />
    <!-- 修改物流公司-->
    <OmsDialog
      :title="modifyReturnOrderLogistics.confirmTitle"
      :title-align="modifyReturnOrderLogistics.titleAlign"
      :width="modifyReturnOrderLogistics.width"
      :scrollable="modifyReturnOrderLogistics.scrollable"
      :closable="modifyReturnOrderLogistics.closable"
      :draggable="modifyReturnOrderLogistics.draggable"
      :mask="modifyReturnOrderLogistics.mask"
      :mask-closable="modifyReturnOrderLogistics.maskClosable"
      :transfer="modifyReturnOrderLogistics.transfer"
      :name="modifyReturnOrderLogistics.name"
      :url="modifyReturnOrderLogistics.url"
      :keep-alive="modifyReturnOrderLogistics.keepAlive"
      :exclude-string="modifyReturnOrderLogistics.excludeString"
      :component-data="modifyReturnOrderLogistics.componentData"
    />
    <!-- 修改from表单 -->
    <OmsDialog
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
    <OmsDialog
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keep-alive="importTable.keepAlive"
      :exclude-string="importTable.excludeString"
      :component-data="importTable.componentData"
    />
    <!-- 导出 -->
    <!-- 警告 -->
    <Modal v-model="warningModal" :title="$it('com.warning')" width="420" :mask="true" @on-ok="warningOk">
      <!-- 当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？ -->
      <p>{{ $it('modalTips.e3') }}</p>
    </Modal>
    <Modal v-model="virtualWarehouseModal" :title="$it('mT.manualWarehous')" width="420" :mask="true" @on-ok="virtualWarehouseLibrary">
      <!-- <p>当前的操作会执行手动入库，是否继续？</p> -->
      <p>{{ $it('modalTips.k2') }}</p>
    </Modal>
    <!-- 批量原退 提示 -->
    <Modal v-model="errModal" :title="$it('com.tips')" width="500" :mask="true" @on-keydown="keyenter">
      <Table :columns="errThData" height="300" :data="errdataList" />
    </Modal>
    <div v-show="isSaveLoading" class="fromLoading">
      <Spin />
    </div>
  </div>
</template>

<script>
import returnGoodList from '@/js/pages/orderCenter/returngood/returnGoodList';

export default returnGoodList;
</script>

<style lang="less" scoped>
@import '~@/css/pages/orderCenter/returngood/returnGoodList.less';
</style>
npm 