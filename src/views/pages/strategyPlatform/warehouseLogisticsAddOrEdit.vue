<!--
 * @Author: your name
 * @Date: 2021-05-21 19:46:25
 * @LastEditTime: 2021-08-24 11:53:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \burgeon-project-logic\views\pages\strategyPlatform\warehouseLogisticsAddOrEdit.vue
-->
<template>
  <!-- 仓库物流设置 -->
  <div class="customized-detail" v-loading="loading">
    <div class="customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <businessForm :key="forceReload" :form-config="formConfig" />
          </p>
        </Panel>
      </Collapse>

      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel
          v-show="this.ID || isAuto"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <div
            :class="[
              'detail-table-form',
              Number.isInteger(logisticsTableFormConfig.length / this.colRowNum)
                ? 'formBottomPd'
                : '',
            ]"
          >
            <businessForm
              v-if="labelDefaultValue == 'logistics'"
              :form-config="logisticsTableFormConfig"
            >
              <template #logistics="{ rowData }">
                <DropMultiSelectFilter
                  :data="filterData || rowData.value[rowData.item.defVal].data"
                  :totalRowCount="
                    rowData.value[rowData.item.defVal].totalRowCount
                  "
                  :AutoData="rowData.value[rowData.item.defVal].autoData"
                  :pageSize="rowData.item.pageSize"
                  @on-popper-show="rowData.item.popShow"
                  @on-page-change="rowData.item.changePage"
                  @on-fkrp-selected="rowData.item.fkrpSelected"
                  @on-input-value-change="rowData.item.inputValueChange"
                  @on-clear="rowData.item.clearInput"
                >
                </DropMultiSelectFilter>
              </template>
            </businessForm>
            <businessButton
              v-if="labelDefaultValue == 'logistics'"
              :btn-config="logisticsTableButtonConfig"
            />
          </div>

          <OmsTable
            v-show="labelDefaultValue == 'logistics'"
            :jordan-table-config="logisticsTableConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectAllCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <subTable
            v-show="labelDefaultValue == 'ST_WAREHOUSE_LOGISTICS_LOG'"
            :component-data="subTableConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import warehouseLogisticsAddOrEdit from "@/js/pages/strategyPlatform/warehouseLogisticsAddOrEdit";

export default warehouseLogisticsAddOrEdit;
</script>
<style lang="less" scoped>
@import "~@/css/pages/strategyPlatform/warehouseLogisticsAddOrEdit.less";
</style>
