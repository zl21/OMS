<!--退换入库列表-->
<template>
  <div class="returnstoreage tableList">
    <!-- <input  type='hidden'  :value=IsDisabled /> -->
    <businessButton :btnConfig="btnConfig"></businessButton>
    <div class="form">
      <businessForm :formConfig="formConfig" class="searchList"></businessForm>
      <div class="fromLoading" v-show="isShowFromLoading">
        <Spin></Spin>
      </div>
    </div>
    <div class="tableContent">
      <div class="agLoading" v-show="agTableConfig.agLoading">
        <Spin fix>
          <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
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
    <Modal
      v-model="warningModal"
      :title="vmI18n.t('modalTitle.warning')"
      width="420"
      @on-ok="warningOk"
      :mask="true"
    >
      <!-- <p>当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？</p> -->
      <p>{{ vmI18n.t("modalTips.e3") }}</p>
    </Modal>
  </div>
</template>
<script>
  import returnStoreageList from "@/js/pages/orderCenter/returngood/returnStoreage/returnStoreageList";
  export default returnStoreageList;
</script>
<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returnStoreage/returnStoreageList.less";
</style>
