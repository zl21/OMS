<!--
 * @Author: your name
 * @Date: 2021-05-20 13:33:28
 * @LastEditTime: 2021-08-23 15:40:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/strategyPlatform/storehouseRule.vue
-->
<template>
  <div class="customized-detail" v-loading="loading">
    <!-- <loading :loading="loading" /> -->
    <div class="customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>

    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          {{ baseInformation }}
          <p slot="content">
            <businessForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
      </Collapse>

      <div v-if="pageShow" class="customized-detail-table">
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />

        <div class="subtablePart" v-show="labelDefaultValue == 'PROPERTY'">
          <div class="subtablePart-labelList">
            <div class="subtablePart-labelList-header">
              <Input
                v-model="seachVal"
                :placeholder="placeholder"
                style="width: 250px; margin-top: 20px"
                @on-keydown="fninput"
              />
              <div class="buttons ">
                <businessButton :btn-config="btnConfig2" />
              </div>
            </div>

            <OmsTable
              :jordan-table-config="tableConfig"
              @on-page-change="fnchange"
              @on-page-size-change="fnSize"
            />
          </div>
        </div>

        <div class="subtablePart" v-show="labelDefaultValue != 'PROPERTY'">
          <subTable :component-data="subTableConfig"></subTable>
        </div>
      </div>
    </div>

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
      :base-path-name="importTable.basePathName"
      :url="importTable.url"
      :width="importTable.width"
      :basePathName="importTable.basePathName"
    ></businessDialog>
  </div>
</template>

<script>
import logisticsNoun from '@/js/pages/strategyPlatform/storehouseRule.js';

export default logisticsNoun;
</script>

<style lang="less" scoped>
@import '~@/css/pages/strategyPlatform/storehouseRule.less';
</style>
