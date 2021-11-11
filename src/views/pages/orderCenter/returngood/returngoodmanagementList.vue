<template>
  <div
    class="returnGoodList custom-main"
    :loading="agTableConfig.agLoading"
    :class="{ loadingActive: loadingActive }"
  >
    <div class="returnBtn totalHeight custom-btn">
      <!-- 按钮 -->
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="returnForm totalHeight custom-form">
      <!-- form表单 -->
      <OmsForm v-if="resetForm" :form-config="formConfig" />
    </div>
    <div class="salesTable custom-table">
      <!-- tab切换 -->
      <OmsLabel
        class="businessLabel totalHeight"
        :label-list="labelList"
        :label-default-value="labelDefaultValue"
        @labelClick="(val) => eventGather.labelClick(val, 'getList')"
      />
      <!-- 列表组件 -->
      <div class="tableBox">
        <OmsAgTable
          ref="agGridChild"
          :ag-table-config="agTableConfig"
          @on-page-change="(val) => eventGather.pageChange(val, 'getList')"
          @on-page-size-change="
            (val) => eventGather.pageSizeChange(val, 'getList')
          "
          @on-row-dblclick="onRowDblclick"
        />
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
      :base-path-name="changeRemarkConfig.basePathName"
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
      :basePathName="importTable.basePathName"
    />

    <!-- 批量原退 提示 -->
    <!-- <Modal
      v-model="errModal"
      :title="vmI18n.t('common.tips')"
      width="500"
      :mask="true"
      @on-keydown="keyenter"
    >
      <Table :columns="errThData" height="300" :data="errdataList" />
    </Modal> -->
  </div>
</template>

<script>
import returngoodmanagementList from "@/js/pages/orderCenter/returngood/returngoodmanagementList";

export default returngoodmanagementList;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returngoodmanagementList.less";
</style>
