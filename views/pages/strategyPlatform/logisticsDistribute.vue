<!--
 * @Author: your name
 * @Date: 2021-05-20 13:39:45
 * @LastEditTime: 2021-08-24 15:55:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/strategyPlatform/logisticsDistribute.vue
-->
<template>
  <div class="customized-detail logistics">
    <!-- 按钮 -->
    <div class="customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>

    <!-- 内容 -->
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          {{ baseInformation }}
          <div slot="content" class="logistics-top-form">
            <businessForm :form-config="FormConfig" @keyDown="keyDown" />
          </div>
        </Panel>
      </Collapse>

      <!-- ark 组件 -->
      <div class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <div class="subtablePart" v-if="labelDefaultValue == 'jiben'">
          <div slot="content">
            <div slot="content" class="logistics-top-form formlout">
              <div class="customized-detail-footfrom">
                <businessForm :form-config="formConfig" @keyDown="keyDown" />
              </div>

              <div class="customized-detail-footbtn">
                <businessButton :btn-config="btnConfig2" />
              </div>
            </div>

            <div
              class="logistics-foot-table customized-detail-table"
              v-if="tableshow"
            >
              <businessActionTable
                :jordan-table-config="tableConfig"
                @on-select="fnselect"
                @on-select-cancel="fncancel"
                @on-select-all="fnselectAll"
                @on-page-change="fnchange"
                @on-page-size-change="fnSize"
              />
            </div>
          </div>
        </div>
        <div class="subtablePart" v-else>
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
        >
          {{ btnSave }}</Button
        >
        <Button type="primary" @click="fnCancel" class="btn-quxiao">
          {{ btnBack }}
        </Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import logisticsdistribute from '@/js/pages/strategyPlatform/logisticsDistribute.js';

export default logisticsdistribute;
</script>

<style lang="less" scoped>
@import '~@/css/pages/strategyPlatform/logisticsDistribute.less';
</style>
