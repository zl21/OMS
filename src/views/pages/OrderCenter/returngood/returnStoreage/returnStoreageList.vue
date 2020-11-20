<!--退换入库列表-->
<template>
  <div class="returnstoreage tableList">
    <!-- <input  type='hidden'  :value=IsDisabled /> -->
    <div class="returnstoreageBtn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="form">
      <businessForm
        :form-config="formConfig"
        class="searchList"
      />
      <div
        v-show="isShowFromLoading"
        class="fromLoading"
      >
        <Spin />
      </div>
    </div>
    <div class="tableContent">
      <div
        v-show="agTableConfig.agLoading"
        class="agLoading"
      >
        <Spin fix>
          <Icon
            type="ios-loading"
            size="18"
            class="demo-spin-icon-load"
          />
          <div>Loading</div>
        </Spin>
      </div>
      <aTable
        ref="agGridChild"
        :ag-table-config="agTableConfig"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
        @on-row-dblclick="onRowDblclick"
      />
    </div>
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
    <Modal
      v-model="warningModal"
      :title="vmI18n.t('modalTitle.warning')"
      width="420"
      :mask="true"
      @on-ok="warningOk"
    >
      <!-- <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p> -->
      <p>{{ vmI18n.t("modalTips.e3") }}</p>
    </Modal>
  </div>
</template>
<script>
  import returnStoreageList from '@/js/pages/orderCenter/returngood/returnStoreage/returnStoreageList';

  export default returnStoreageList;
</script>
<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returnStoreage/returnStoreageList.less";
</style>
