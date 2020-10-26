<template>
  <div v-loading="pageLoad" class="orderManager-box">
    <div class="btn">
      <jordanBtn :btn-config="btnConfig" @dropDownClick="dropDownClickChange" />
    </div>
    <div class="from">
      <div v-show="isShowFromLoading" class="from_loading">
        <Spin />
      </div>
      <IntegrateSearchFilter
        v-if="isShowSeniorOrOrdinary"
        id="IntegrateSearchFilter"
        v-model="selectValue"
        :drop-down-list="dropList"
        :search-method="searchMethod"
        :tag-list="tagList"
        class="IntegrateSearchFilter"
        @on-clear-all="clearAll"
        @on-clear-item="clearItem"
        @on-search="search"
      />
      <!-- trigger="click" -->
      <businessForm
        v-show="!isShowSeniorOrOrdinary"
        :form-config="formConfig"
        style="margin-top: 10px"
      />
      <jordanBtn
        v-show="!isShowSeniorOrOrdinary"
        :btn-config="btnsSearch"
        style="margin-left: 80px; margin-top: 10px; justify-content: flex-end"
      />
      <div class="from-folding" @click="shutDownOrbounceOff">
        <i :class="iconDownIcon" />
      </div>
    </div>
    <div class="table">
      <businessLabel
        :label-default-value="labelDefaultValue"
        :label-list="labelList"
        class="businessLabel"
        @labelClick="labelClick"
      />
      <div class="aTable">
        <div v-show="agTableConfig.agLoading" class="agLoading">
          <Spin fix>
            <Icon class="demo-spin-icon-load" size="18" type="ios-loading" />
            <div>Loading</div>
          </Spin>
        </div>
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
    <jordanModal
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
    <jordanModal
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
      <br />
      <div class="orderContent">
        <businessForm :form-config="batchReturnFormConfig" />
      </div>
    </Modal>
  </div>
</template>

<script>
  import orderManager from "@/js/pages/orderCenter/orderManager/orderManager";
  export default orderManager;
</script>

<style lang="less">
.burgeon-poptip-body-content {
  overflow-x: unset !important;
  overflow-y: unset !important;
}

.orderManager-box {
  .IntegrateSearchFilter {
    .popSelect
      .burgeon-select-single
      .burgeon-select-selection
      .burgeon-select-single
      .burgeon-select-selected-value {
      height: 35px !important;
      line-height: 35px !important;
    }

    .burgeon-select-selection-head {
      height: 35px !important;
      line-height: 35px !important;
    }

    .popSelect
      .burgeon-select-single
      .burgeon-select-selection
      .burgeon-select-placeholder,
    .burgeon-select-single
      .burgeon-select-selection
      .burgeon-select-selected-value {
      height: 35px !important;
      line-height: 35px !important;
    }

    .burgeon-integrate-search-filter-search-item-list {
      display: flex;
      align-items: center;
    }

    .burgeon-integrate-search-filter-search-item-title {
      display: flex;
      align-items: center;
    }

    .burgeon-input-icon {
      height: 35px !important;
      line-height: 35px !important;
    }

    .burgeon-integrate-search-filter-valid {
      width: 440px !important;
    }

    .burgeon-integrate-search-filter-valid .burgeon-input {
      height: 35px !important;
    }

    .burgeon-select-selection {
      height: 35px !important;
      line-height: 35px !important;
    }

    .burgeon-date-picker {
      width: 440px !important;
    }

    .burgeon-input .burgeon-input-default {
      height: 35px !important;
    }
  }

  .heigtFromListValue {
    height: 217px;
  }

  .burgeon-select-selection-head {
    height: 26px !important;
    line-height: 26px !important;
  }

  .burgeon-poptip {
    display: flex !important;
    align-items: center !important;
  }

  .burgeon-poptip-rel {
    display: flex !important;
    align-items: center !important;
  }
  .businessLabel {
    margin-top: 8px;
  }
  .btn {
    margin-top: 8px;
  }
  .jordan-action-table {
    border-bottom: 1px solid #dcdee2;
    border-right: 1px solid #dcdee2;
    border-left: 1px solid #dcdee2;
    padding: 5px 8px;
  }

  .from {
    border: 1px solid #d3d3d3;
    padding: 8px 10px;
    position: relative;

    .burgeon-col-span-6 {
      width: 20% !important;
    }
  }

  .from_loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.9);
    z-index: 1000 !important;
  }

  .from-folding {
    position: absolute;
    top: 0px;
    right: 0px;
    padding: 3px 10px;
    background-color: #ed4014;
    color: white;
    font-size: 10px;
    z-index: 1001 !important;
  }

  .iconwangwang {
    animation: myfirst 2s infinite;
  }

  .orderTag {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  @keyframes myfirst {
    0% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(-2px, -4px);
    }
    100% {
      transform: translate(0px, 0px);
    }
  }
  // 按钮icon偏移问题
  .btn .burgeon-btn > .burgeon-icon {
    margin-left: 3px;
  }
}

.tableFooter {
  padding: 10px 10px 10px 0px;

  .tableFooter_border {
    padding: 2px 4px;
    border: 1px solid red;
  }
}

.burgeon-fkrp-select {
  width: 100%;
}

.burgeon-fkrp-select-icon {
  top: 9px !important;
}
</style>
