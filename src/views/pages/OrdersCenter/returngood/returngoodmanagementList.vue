<template>
  <div class="returnGoodList">
    <div style="margin-top: 8px" class="returnBtn">
      <!-- 按钮 -->
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
    <div class="returnForm">
      <!-- form表单 -->
      <businessForm :formConfig="formConfig"></businessForm>
      <div class="fromLoading" v-show="isShowFromLoading">
        <Spin></Spin>
      </div>
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <businessLabel
        class="businessLabel"
        :labelList="labelList"
        :labelDefaultValue="labelDefaultValue"
        @labelClick="labelClick"
      ></businessLabel>
      <!-- 列表组件 -->
      <div class="tableBox">
        <!-- <jordan-action-table
          :jordanTableConfig="jordanTableConfig"
          @on-row-dblclick="onRowDblclick"
          @on-select="returnOnSelect"
          @table-import="returnImport"
          @table-export="returnExport"
          @on-select-cancel="returnCancel"
          @on-select-all="returnSelectAll"
          @on-select-all-cancel="returnSelectAllCancel"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
        ></jordan-action-table> -->
        <div class="agLoading" v-show="agTableConfig.agLoading">
          <Spin fix>
            <Icon
              type="ios-loading"
              size="18"
              class="demo-spin-icon-load"
            ></Icon>
            <div>Loading</div>
          </Spin>
        </div>
        <aTable
          ref="agGridChild"
          :agTableConfig="agTableConfig"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
          @on-row-dblclick="onRowDblclick"
        ></aTable>
      </div>
    </div>
    <!-- 修改备注-->
    <jordanModal
      :title="changeRemarkConfig.confirmTitle"
      :titleAlign="changeRemarkConfig.titleAlign"
      :width="changeRemarkConfig.width"
      :scrollable="changeRemarkConfig.scrollable"
      :closable="changeRemarkConfig.closable"
      :draggable="changeRemarkConfig.draggable"
      :mask="changeRemarkConfig.mask"
      :mask-closable="changeRemarkConfig.maskClosable"
      :transfer="changeRemarkConfig.transfer"
      :name="changeRemarkConfig.name"
      :url="changeRemarkConfig.url"
      :keepAlive="changeRemarkConfig.keepAlive"
      :excludeString="changeRemarkConfig.excludeString"
      :componentData="changeRemarkConfig.componentData"
    ></jordanModal>
    <!-- 修改退回仓库-->
    <jordanModal
      :title="modifyWarehouse.confirmTitle"
      :titleAlign="modifyWarehouse.titleAlign"
      :width="modifyWarehouse.width"
      :scrollable="modifyWarehouse.scrollable"
      :closable="modifyWarehouse.closable"
      :draggable="modifyWarehouse.draggable"
      :mask="modifyWarehouse.mask"
      :mask-closable="modifyWarehouse.maskClosable"
      :transfer="modifyWarehouse.transfer"
      :name="modifyWarehouse.name"
      :url="modifyWarehouse.url"
      :keepAlive="modifyWarehouse.keepAlive"
      :excludeString="modifyWarehouse.excludeString"
      :componentData="modifyWarehouse.componentData"
    ></jordanModal>
    <!-- 修改物流公司-->
    <jordanModal
      :title="modifyReturnOrderLogistics.confirmTitle"
      :titleAlign="modifyReturnOrderLogistics.titleAlign"
      :width="modifyReturnOrderLogistics.width"
      :scrollable="modifyReturnOrderLogistics.scrollable"
      :closable="modifyReturnOrderLogistics.closable"
      :draggable="modifyReturnOrderLogistics.draggable"
      :mask="modifyReturnOrderLogistics.mask"
      :mask-closable="modifyReturnOrderLogistics.maskClosable"
      :transfer="modifyReturnOrderLogistics.transfer"
      :name="modifyReturnOrderLogistics.name"
      :url="modifyReturnOrderLogistics.url"
      :keepAlive="modifyReturnOrderLogistics.keepAlive"
      :excludeString="modifyReturnOrderLogistics.excludeString"
      :componentData="modifyReturnOrderLogistics.componentData"
    ></jordanModal>
    <!-- 修改from表单 -->
    <jordanModal
      :title="setFromInput.confirmTitle"
      :titleAlign="setFromInput.titleAlign"
      :width="setFromInput.width"
      :scrollable="setFromInput.scrollable"
      :closable="setFromInput.closable"
      :draggable="setFromInput.draggable"
      :mask="setFromInput.mask"
      :mask-closable="setFromInput.maskClosable"
      :transfer="setFromInput.transfer"
      :name="setFromInput.name"
      :url="setFromInput.url"
      :keepAlive="setFromInput.keepAlive"
      :excludeString="setFromInput.excludeString"
      :componentData="setFromInput.componentData"
    ></jordanModal>
    <!-- 导入 -->
    <jordanModal
      :title="importTable.confirmTitle"
      :titleAlign="importTable.titleAlign"
      :width="importTable.width"
      :scrollable="importTable.scrollable"
      :closable="importTable.closable"
      :draggable="importTable.draggable"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :transfer="importTable.transfer"
      :name="importTable.name"
      :url="importTable.url"
      :keepAlive="importTable.keepAlive"
      :excludeString="importTable.excludeString"
      :componentData="importTable.componentData"
    ></jordanModal>
    <!-- 导出 -->
    <!-- 警告 -->
    <Modal
      v-model="warningModal"
      :title="vmI18n.t('common.warning')"
      width="420"
      @on-ok="warningOk"
      :mask="true"
    >
    <!-- 当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？ -->
      <p>{{ vmI18n.t("modalTips.e3") }}</p>
    </Modal>
    <Modal
      v-model="virtualWarehouseModal"
      :title="vmI18n.t('common.manualWarehous')"
      width="420"
      @on-ok="virtualWarehouseLibrary"
      :mask="true"
    >
      <!-- <p>当前的操作会执行手动入库，是否继续？</p> -->
      <p>{{ vmI18n.t("modalTips.k3") }}</p>
    </Modal>
    <!-- 批量原退 提示 -->
    <Modal
      v-model="errModal"
      :title="vmI18n.t('common.tips')"
      width="500"
      @on-keydown="keyenter"
      :mask="true"
    >
      <Table :columns="errThData" height="300" :data="errdataList"></Table>
    </Modal>
    <div class="fromLoading" v-show="isSaveLoading">
      <Spin></Spin>
    </div>
  </div>
</template>

<script>
  import returngoodmanagementList from "@/js/pages/orderCenter/returngood/returngoodmanagementList";
  export default returngoodmanagementList;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returngoodmanagementList.less";
</style>
