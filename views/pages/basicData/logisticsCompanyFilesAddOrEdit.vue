<!--
 * @Author: your name
 * @Date: 2021-04-28 13:22:03
 * @LastEditTime: 2021-05-26 11:29:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/basicData/logisticsCompanyFilesAddOrEdit.vue
-->
<template>
  <div class="logisticsCompanyFilesAddOrEdit cusArkCollapse customized-detail" :id="this.customizedModuleName">
    <loading :loading="loading" />
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          基本信息
          <p slot="content">
            <businessForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
      </Collapse>
      <Modal v-model="showAddPlatformLogisticsCompany" footer-hide width="800px" mask>
        <addPlatformLogisticsCompany @getData="getTableData"></addPlatformLogisticsCompany>
      </Modal>
      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel :label-list="labelList" :label-default-value="labelDefaultValue" @labelClick="labelClick" />
        <!-- 子表Part -->
        <div class="subtablePart">
          <businessActionTable
            v-show="labelDefaultValue === 'PROPERTYVALUES'"
            :jordan-table-config="subTableConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
          />
          <businessActionTable
            v-show="labelDefaultValue == 'CP_C_LOGISTICS_FIX'"
            :jordan-table-config="subTableConfig"
            @on-select="onSelect"
            @on-select-cancel="onSelectCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
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
</style>
