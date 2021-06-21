<template>
  <div
    v-loading="loading"
    class="customized-list"
  >
    <div
      class="customized-list-form"
      :class="[Number.isInteger(formConfig.formData.length / 4) ? '' : 'position']"
    >
      <!-- form组件 -->
      <businessForm
        v-if="buttonInit"
        :form-config="formConfig"
      />
      <div :class="[!isFolding ? 'dynamicSearch-content' : 'form-search']">
        <dynamicSearch
          v-if="!isFolding && tablename == 'OC_B_ORDER'"
          ref="dynamicSearch"
          :dynamic-data="dynamicData"
        />

        <div v-if="tablename !== 'OC_B_ORDER'"></div>
        <businessButton :btn-config="searchBtn" />
      </div>
    </div>
    <div class="custom-btn customized-list-btn">
      <businessButton
        :btn-config="btnConfig"
        @dropDownClick="(val) => eventGather.dropDownClickChange(val, extendBtn)"
      />
    </div>
    <div class="customized-list-table">
      <Tabs
        :draggable="true"
        type="card"
        :value="labelValue"
        @on-drag-drop="handleDragDrop"
        @on-click="labelClick"
      >
        <TabPane
          v-for="(item, index) in tabList"
          :key="index"
          :animated="false"
          :label="item.label"
          :name="item.value"
        />
      </Tabs>
      <agTable
        ref="agGridChild"
        :ag-table-config="agTableConfig"
        @on-row-dblclick="onRowDblclick"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
        @on-sort-changed="onSortChanged"
      />
      <!-- <loading :loading="loading" /> -->
    </div>
    <Modal
      v-model="modal"
      class="ark-dialog"
      title="自定义设置"
      footer-hide
      draggable
      :closable="true"
      :mask="true"
    >
      <p>
        <formSetting
          ref="formSetting"
          :modal.sync="modal"
          @success="initList(isFolding)"
        />
      </p>
    </Modal>
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
      :title="publicBouncedConfig.confirmTitle || publicBouncedConfig.title"
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
      :base-path-name="importTable.basePathName"
    />
    <Modal
      v-model="proDetailConfig.modal_proDetail"
      class-name="ark-dialog"
      :title="proDetailConfig.title"
      :width="800"
      mask
    >
      <proDetail
        :title="proDetailConfig.title"
        :itemid="proDetailConfig.ID"
      />
    </Modal>
    <!-- <commonTableByAgGrid
      ref="agGrid"
      height="300px"
      :options="options"
      :data="row"
      :columns="tabth"
      @grid-ready="gridReady"
    /> -->
  </div>
</template>

<script>
  import orderManager from '@/js/pages/orderCenter/orderManager/orderManager';
  export default orderManager;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/orderManager/orderManager.less";
</style>
