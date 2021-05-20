<!--
 * @Author: your name
 * @Date: 2021-05-20 13:33:28
 * @LastEditTime: 2021-05-20 13:35:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/strategyPlatform/storehouseRule.vue
-->
<template>
  <div class="storehouseRule otherClass customized-detail"  v-loading="loading">
    <!-- <loading :loading="loading" /> -->
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>

    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          基本信息
          <p slot="content">
            <businessForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
      </Collapse>

      <div v-if="pageShow" class="customized-detail-table">
        <div class="subtablePart">
          <businessLabel
            :label-list="labelList"
            :label-default-value="labelDefaultValue"
            @labelClick="labelClick"
          />

          <Input
            v-model="seachVal"
            placeholder="省市搜索"
            style="width: 250px; margin-top: 20px"
            @input="fninput"
          />
          <div class="buttons customized-detail-btn">
            <businessButton :btn-config="btnConfig2" />
          </div>

          <Table
            ref="currentRowTable"
            border
            stripe
            highlight-row
            :columns="columns3"
            :data="data1"
          />
          <div class="foot-page">
            <Page
              :total="totalpage"
              show-elevator
              show-sizer
              @on-change="fnchange"
              @on-page-size-change="fnSize"
            />
          </div>
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
