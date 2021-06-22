<!--
 * @Author: your name
 * @Date: 2021-05-18 17:02:53
 * @LastEditTime: 2021-06-22 14:28:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /云雀/src/views/pages/strategyPlatform/specialLogistics.vue
-->
<template>
  <div
    class="specialLogistics otherClass customized-detail"
    v-loading="loading"
  >
    <!-- <loading :loading="loading" /> -->
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          基本信息
          <div slot="content">
            <businessForm
              :form-config="formConfighead"
              @keyDown="keyDown"
              :key="force"
            />
          </div>
        </Panel>
      </Collapse>

      <Collapse v-model="panelDefaultValue1">
        <Panel name="panel_baseInfo1">
          满足条件
          <div slot="content">
            <businessForm
              :form-config="formConfig"
              @keyDown="keyDown"
              :key="force"
            />
            <div class="content-li">
              <Button type="info" class="content-li-btn" @click="fnselect"
                >请选择省市区</Button
              >
            </div>
            <div class="content-li">
              <Table
                width="550"
                border
                :columns="columnsCity"
                :data="dataCity"
              ></Table>
            </div>

            <switchList :switchList="switchListdata"></switchList>

            <div class="content-li-item">
              <label style="width: 70px">指定商品:</label>
              <div class="content-li-item-left">
                <Button type="info" @click="fnseek">添加商品</Button>
                <div class="content-li-item-left-a">
                  <Table
                    width="550"
                    border
                    :columns="columns2"
                    :data="data3"
                  ></Table>
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>

      <!-- <Collapse v-model="panelDefaultValue2">
        
        <Panel name="panel_baseInfo2" >
          
        </Panel>

          <div class="subtablePart" v-show="labelDefaultValue != 'PROPERTY'">
          <subTable :component-data="subTableConfig"></subTable>
          </div>
      </Collapse> -->
      <div class="customized-detail-table">
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <div slot="content" v-show="labelDefaultValue == 'PROPERTY'">
          <businessForm :form-config="formConfig1" @keyDown="keyDown" />
          <businessButton :btn-config="btnConfig1" />
          <businessActionTable
            :jordan-table-config="tableConfig2"
            @on-page-change="tablepage2"
            @on-page-size-change="tablesize2"
            @on-select="data1select"
          />
        </div>
        <div class="subtablePart" v-show="labelDefaultValue != 'PROPERTY'">
          <subTable :component-data="subTableConfig"></subTable>
        </div>
      </div>
    </div>

    <!-- 弹窗组件 -->
    <Modal
      v-model="modal2"
      width="460"
      mask
      @on-ok="fnok"
      @on-cancel="fncancelcity"
    >
      <businessForm :form-config="formConfig2" @keyDown="keyDown" />
    </Modal>
    <Modal v-model="modal3" width="660" mask footer-hide>
      <div class="specialLogistics-model-head">
        <div class="specialLogistics-model-head-left">
          <Input
            placeholder="SPU编码/SKU编码"
            style="width: auto"
            @on-enter="fnkeyup"
            @on-click="fnkeyup"
            icon="ios-search"
          >
          </Input>
          <Input
            placeholder="SPU名称/SKU名称"
            style="width: auto"
            @on-enter="fnkeyup1"
            @on-click="fnkeyup1"
            icon="ios-search"
          >
          </Input>
        </div>
        <div class="specialLogistics-model-head-right">
          <Button type="error" ghost @click="fntableAdd">添加</Button>
          <Button type="error" ghost @click="fncancel">取消</Button>
        </div>
      </div>
      <businessActionTable
        :jordan-table-config="tableConfig"
        @on-page-change="pageChange"
        @on-page-size-change="pageSizeChange"
        @on-select="onSelect"
        @on-select-cancel="onSelectCancel"
        @on-select-all="onSelectAll"
        @on-select-all-cancel="onSelectAllCancel"
      />
    </Modal>
  </div>
</template>

<script>
import logisticsNoun from '@/js/pages/strategyPlatform/specialLogistics.js';

export default logisticsNoun;
</script>

<style lang="less" scoped>
@import "~@/css/pages/strategyPlatform/specialLogistics.less";
</style>
