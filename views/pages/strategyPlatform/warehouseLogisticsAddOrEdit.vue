<template>
  <!-- 仓库物流设置 -->
  <div class="warehouseLogisticsAddOrEdit public-main customized-detail" v-loading="loading">
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          基本信息
          <p slot="content">
            <businessForm
              :key="forceReload"
              :form-config="formConfig"
            />
          </p>
        </Panel>
      </Collapse>

      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel
          v-show="isAuto"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <businessForm 
            v-if="isAuto && labelDefaultValue == 'logistics'"
            :form-config="logisticsTableFormConfig">
            <template #logistics="{ rowData }">
               <DropMultiSelectFilter
                :data="filterData || rowData.value[rowData.item.defVal].data"
                :totalRowCount="rowData.value[rowData.item.defVal].totalRowCount"
                :AutoData="rowData.value[rowData.item.defVal].autoData"
                :pageSize="rowData.item.pageSize"
                @on-popper-show="rowData.item.popShow"
                @on-page-change="rowData.item.changePage"
                @on-fkrp-selected="rowData.item.fkrpSelected"
                @on-input-value-change="rowData.item.inputValueChange"
                @on-clear="rowData.item.clearInput">
              </DropMultiSelectFilter>
            </template>
          </businessForm>
          <businessButton
            v-if="isAuto && labelDefaultValue == 'logistics'"
            :btn-config="logisticsTableButtonConfig"
          />

          <businessActionTable
            v-show="isAuto && labelDefaultValue == 'logistics'"
            :jordan-table-config="logisticsTableConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectAllCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <subTable
            v-show="isAuto && labelDefaultValue == 'ST_C_WAREHOUSE_LOGISTICS_SET_LOG'"
            :component-data="subTableConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import warehouseLogisticsAddOrEdit from '@/js/pages/strategyPlatform/warehouseLogisticsAddOrEdit';

  export default warehouseLogisticsAddOrEdit;
</script>
<style lang="less" scoped>
@import '~@/css/pages/strategyPlatform/warehouseLogisticsAddOrEdit.less';
</style>
