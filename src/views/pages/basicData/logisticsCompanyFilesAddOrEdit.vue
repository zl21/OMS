<!--
 * @Author: your name
 * @Date: 2021-04-28 13:22:03
 * @LastEditTime: 2021-06-02 20:05:38
 * @LastEditors: Please set LastEditors
 * @Description: 物流公司档案
 * @FilePath: /burgeon-project-logic/views/pages/basicData/logisticsCompanyFilesAddOrEdit.vue
-->
<template>
  <div class="customized-detail" >
    <loading :loading="loading" />
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
      </Collapse>
      <Modal v-model="showAddPlatformLogisticsCompany" footer-hide width="830" mask>
        <addPlatformLogisticsCompany @getData="getTableData"></addPlatformLogisticsCompany>
      </Modal>
      <div class="customized-detail-table">
        <!-- tab切换 -->
        <OmsLabel :label-list="labelList" :label-default-value="labelDefaultValue" @labelClick="labelClick" />
        <!-- 子表Part -->
        <div class="subtablePart">
          <OmsTable
            :class="'PROPERTYVALUES'"
            :key="subTableConfig.key"
            v-show="labelDefaultValue === 'PROPERTYVALUES'"
            :jordan-table-config="subTableConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <OmsTable
            :key="subTableConfig1.key"
            v-show="labelDefaultValue == 'CP_C_LOGISTICS_FIX'"
            :jordan-table-config="subTableConfig1"
            @on-select="onSelect1"
            @on-select-cancel="onSelectCancel1"
            @on-select-all="onSelectAll1"
            @on-select-all-cancel="onSelectAllCancel1"
          />
          <subTable :component-data="subTableConfig2" v-show="labelDefaultValue == 'CP_LOGISTICS_LOG'"></subTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import logisticsCompanyFilesAddOrEdit from '@/js/pages/basicData/logisticsCompanyFilesAddOrEdit.js';
export default logisticsCompanyFilesAddOrEdit;
</script>
<style lang="less" scoped>
@import '~@/css/pages/basicData/channelStore.less';
// @import '~@/css/pages/basicData/logisticsCompanyFilesAddOrEdit.less';
.PROPERTYVALUES {
 /deep/ .businessButton {
    padding-top: 11px;
  }
}
</style>
