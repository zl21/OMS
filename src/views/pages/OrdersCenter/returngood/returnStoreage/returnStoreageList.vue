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
.returnstoreage {
  box-sizing: border-box;
  padding: 10px 0;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 12px !important;
  .form {
    display: flex;
    position: relative;
    .folding {
      top: 0px;
      right: 0px;
      position: absolute;
      padding: 2px 8px;
      color: white;
      //width: 30px;
      background: #fd6442;
    }
    .fromLoading {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.9);
      z-index: 1000 !important;
    }
  }
  .tableContent {
    // position: relative;
    // display: flex;
    // flex: 1;
    // .jordan-table-box {
    //   display: flex;
    //   flex-direction: column;
    //   width: 100%;
    //   height: calc(100% - 20px) !important;
    // }
    width: 100%;
    height: 100%;
  }

  .searchList {
    width: 100%;
    margin-bottom: 10px;
    position: relative;
    border: 1px solid #d8d8d8;
    -webkit-transition: height 0.5s;
    transition: height 0.5s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-right: 0 !important;
    overflow: hidden;
    // .item-input input {
    //   width: calc(100% - 10px) !important;
    // }

    .burgeon-select-selection-head {
      line-height: 26px;
    }
  }

  .burgeon-btn > .burgeon-icon {
    line-height: 1;
    margin-right: -3px;
    vertical-align: middle;
  }
}
</style>
