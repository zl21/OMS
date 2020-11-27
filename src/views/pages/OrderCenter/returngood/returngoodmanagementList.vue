<template>
  <div class="returnGoodList">
    <div class="returnBtn totalHeight">
      <!-- 按钮 -->
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="returnForm totalHeight">
      <!-- form表单 -->
      <businessForm v-if="resetForm" :form-config="formConfig" />
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <businessLabel class="businessLabel totalHeight" :label-list="labelList" :label-default-value="labelDefaultValue" @labelClick="labelClick" />
      <!-- 列表组件 -->
      <div class="tableBox">
        <loading :loading="agTableConfig.agLoading" />
        <aTable ref="agGridChild" :ag-table-config="agTableConfig" @on-page-change="pageChange" @on-page-size-change="pageSizeChange" @on-row-dblclick="onRowDblclick" />
      </div>
    </div>
    <!-- 修改备注-->
    <businessDialog
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
    <businessDialog
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
    <businessDialog
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
    <businessDialog
      :title="setFromInput.confirmTitle"
      :title-align="setFromInput.titleAlign"
      :width="setFromInput.width"
      :scrollable="setFromInput.scrollable"
      :closable="setFromInput.closable"
      :draggable="setFromInput.draggable"
      :mask="setFromInput.mask"
      :mask-closable="setFromInput.maskClosable"
      :transfer="setFromInput.transfer"
      :name="setFromInput.name"
      :url="setFromInput.url"
      :keep-alive="setFromInput.keepAlive"
      :exclude-string="setFromInput.excludeString"
      :component-data="setFromInput.componentData"
    />
    <!-- 导入 -->
    <businessDialog
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
    <Modal v-model="warningModal" :title="vmI18n.t('common.warning')" width="420" :mask="true" @on-ok="warningOk">
      <!-- 当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？ -->
      <p>{{ vmI18n.t('modalTips.e3') }}</p>
    </Modal>
    <Modal v-model="virtualWarehouseModal" :title="vmI18n.t('modalTitle.manualWarehous')" width="420" :mask="true" @on-ok="virtualWarehouseLibrary">
      <!-- <p>当前的操作会执行手动入库，是否继续？</p> -->
      <p>{{ vmI18n.t('modalTips.k2') }}</p>
    </Modal>
    <!-- 批量原退 提示 -->
    <Modal v-model="errModal" :title="vmI18n.t('common.tips')" width="500" :mask="true" @on-keydown="keyenter">
      <Table :columns="errThData" height="300" :data="errdataList" />
    </Modal>
    <div v-show="isSaveLoading" class="fromLoading">
      <Spin />
    </div>
  </div>
</template>

<script>
import returngoodmanagementList from '@/js/pages/orderCenter/returngood/returngoodmanagementList';

export default returngoodmanagementList;
</script>

<style lang="less">
@import '~@/css/pages/orderCenter/returngood/returngoodmanagementList.less';
</style>
