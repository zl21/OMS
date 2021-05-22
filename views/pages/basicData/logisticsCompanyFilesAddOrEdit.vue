<!--
 * @Author: your name
 * @Date: 2021-04-28 13:22:03
 * @LastEditTime: 2021-05-22 12:27:33
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
          <orderItem v-show="showSubtablePart && labelDefaultValue !== 'PROPERTYVALUES'" :component-data="subTableConfig"></orderItem>
        </div>
        <div class="subtablePart" v-show="labelDefaultValue != 'PROPERTYVALUES'">
          <subTable :component-data="subTableConfig2"></subTable>
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
