<template>
  <div
    v-loading="pageLoad"
    class="orderManager-box"
  >
    <div class="btn totalHeight">
      <businessButton
        :btn-config="btnConfig"
        @dropDownClick="dropDownClickChange"
      />
    </div>
    <div class="from totalHeight">
      <div
        v-show="isShowFromLoading"
        class="from_loading"
      >
        <!-- <loading :loading="agTableConfig.agLoading" /> -->
      </div>
      <IntegrateSearchFilter
        v-show="isShowSeniorOrOrdinary"
        id="IntegrateSearchFilter"
        ref="integrateSearchFilter"
        v-model="selectValue"
        :drop-down-list="dropList"
        :search-method="searchMethod"
        :tag-list="tagList"
        class="IntegrateSearchFilter"
        @on-clear-all="clearAll"
        @on-clear-item="clearItem"
        @on-search="search"
        @on-drop-change="onDropChange"
      />
      <!-- trigger="click" -->
      <businessForm
        v-show="!isShowSeniorOrOrdinary"
        :form-config="formConfig"
        style="margin-top: 10px"
      />
      <businessButton
        v-show="!isShowSeniorOrOrdinary"
        :btn-config="btnsSearch"
      />
      <div
        class="from-folding"
        @click="shutDownOrbounceOff"
      >
        <i :class="iconDownIcon" />
      </div>
    </div>
    <div class="table">
      <businessLabel
        :label-default-value="labelDefaultValue"
        :label-list="labelList"
        class="businessLabel totalHeight"
        @labelClick="labelClick"
      />
      <div class="aTable">
        <loading 
          :loading="agTableConfig.agLoading"
          :class="{ 'loadingActive': isActive }" 
        />
        <aTable
          ref="agGridChild"
          :ag-table-config="agTableConfig"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
          @on-row-dblclick="onRowDblclick"
          @on-sort-changed="onSortChanged"
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
    />
    <!-- 导出 -->
    <Modal
      v-model="warningModal"
      :mask="true"
      :title="vmI18n.t('common.warning')"
      width="420"
      @on-ok="warningOk"
    >
      <!-- 当前的操作会执行全量导出，导出时间可能会比较慢！是否继续导出？ -->
      <p>{{ vmI18n.t("modalTips.e3") }}</p>
    </Modal>
    <Modal
      v-model="distributeLogisticsModal"
      :mask="true"
      :title="vmI18n.t('common.warning')"
      width="420"
      @on-ok="distributeLogistics"
    >
      <!-- 将对查询出的订单数据重新分配快递，是否继续? -->
      <p>{{ vmI18n.t("modalTips.e4") }}</p>
    </Modal>
    <Modal
      v-model="distributeWarehouseModal"
      :mask="true"
      :title="vmI18n.t('common.warning')"
      width="420"
      @on-ok="distributeWarehouse"
    >
      <!-- 将对查询出的订单数据重新分配仓库，是否继续? -->
      <p>{{ vmI18n.t("modalTips.e5") }}</p>
    </Modal>
    <!-- 警告 -->
    <Modal
      v-model="batchReturnOrderModal"
      :mask="true"
      :title="vmI18n.t('common.warning')"
      width="420"
      class="customizedModal"
      @on-cancel="onBatchReturnOrderCancel"
      @on-ok="doBatchReturnOrder"
    >
      <!-- 批量生成退换货订单，是否继续? -->
      <p>{{ vmI18n.t("modalTips.e6") }}</p>
      <div class="orderContent">
        <businessForm :form-config="batchReturnFormConfig" />
      </div>
    </Modal>
    <!-- 批量撤回 -->
    <Modal
      v-model="batchAntiAuditModal"
      :mask="true"
      :title="'批量撤回'"
      width="420"
      :footer-hide="true"
    >
      <div class="orderContent">
        <businessForm :form-config="batchAntiAuditFormConfig" />
      </div>

      <jordanBtn :btnConfig="antiAuditBtnConfig"></jordanBtn>
    </Modal>
  </div>
</template>

<script>
  import orderManager from '@/js/pages/orderCenter/orderManager/orderManager';

  export default orderManager;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/orderManager/orderManager.less";
</style>
