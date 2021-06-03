<!--
 * @Author: your name
 * @Date: 2021-05-20 13:39:45
 * @LastEditTime: 2021-06-03 10:24:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/strategyPlatform/logisticsDistribute.vue
-->
<template>
  <div class="otherClass customized-detail logistics">
    <!-- 按钮 -->
    <div class="customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>

    <!-- 内容 -->
    <div class="customized-detail-main">
      <!-- ark 组件 -->
      <Collapse v-model="value">
        <Panel name="1">
          基本信息
          <div slot="content" class="logistics-top-form">
            <businessForm :form-config="FormConfig" @keyDown="keyDown" />
          </div>
        </Panel>
        <Panel name="2">
          配送区域
          <div slot="content" class="logistics-top-form">
            <businessForm :form-config="formConfig" @keyDown="keyDown" />
          </div>
        </Panel>
      </Collapse>

      <div
        class="logistics-foot-table customized-detail-table"
        v-if="tableshow"
      >
        <!-- tab切换 -->
        <div class="customized-detail-footbtn">
          <businessButton :btn-config="btnConfig2" />
        </div>

        <Table
          ref="selection"
          border
          :columns="tableColumns"
          :data="tableData"
          @on-select="fnselect"
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

      <div v-if="id !== '-1'" class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <subTable :component-data="subTableConfig"></subTable>
        </div>
      </div>
    </div>

    <!-- 各类弹窗 -->
    <Modal
      v-model="modal1"
      :footer-hide="true"
      :draggable="true"
      :mask="true"
      :title="modalTitle"
      :scrollable="true"
      :class-name="'ark-dialog'"
    >
      <div class="layout">
        <FormLayout
          ref="FormLayout"
          :default-column="defaultColumn"
          :defaultconfig="formconfig2"
        />
      </div>

      <!-- fnSave -->
      <div class="foot-btns">
        <Button
          type="primary"
          style="margin-right: 10px"
          @click="getCheckedNodes"
          >保存</Button
        >
        <Button type="primary" @click="fnCancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import logisticsdistribute from '@/js/pages/strategyPlatform/logisticsDistribute.js';

export default logisticsdistribute;
</script>

<style lang="less" scoped>
@import "~@/css/pages/strategyPlatform/logisticsDistribute.less";
</style>
