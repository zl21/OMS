<!--
 * @Author: your name
 * @Date: 2021-05-18 17:02:53
 * @LastEditTime: 2021-08-26 10:41:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /云雀/src/views/pages/strategyPlatform/specialLogistics.vue
-->
<template>
  <div
    class="customized-detail"
    v-loading="loading"
  >
    <!-- <loading :loading="loading" /> -->
    <div class="customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
        
          {{baseInformation}}
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
          <!-- 满足条件 -->
          {{ vmI18n.t('form_label.meet_conditions') }}
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
              <!-- 指定商品 -->
              <label style="width: 70px">{{ vmI18n.t('btn.designGoods')}}:</label> 
              <div class="content-li-item-left">
                <Button type="info" @click="fnseek">添加商品</Button>
                <div class="content-li-item-left-a">
           

                  <businessActionTable
                    :jordan-table-config="tableConfig3"
                    @on-page-change="tablepageA"
                    @on-page-size-change="tablesizeA"
                  />
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>


      <div class="customized-detail-table">
        <businessLabel
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
          @labelClick="labelClick"
        />
        <div slot="content" v-show="labelDefaultValue == 'PROPERTY'">
          <!-- <businessForm :form-config="formConfig1" @keyDown="keyDown" />
          <businessButton :btn-config="btnConfig1" /> -->
          <businessActionTable
            :jordan-table-config="tableConfig2"
            @on-page-change="tablepageB"
            @on-page-size-change="tablesizeB"
            @on-select="data1select"
            @on-select-all="onSelectAllA"
            @on-select-all-cancel="onSelectAllCancelA"
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
      title="请选择省市区"
      mask
      @on-ok="fnok"
      @on-cancel="fncancelcity"
      class-name="customized-detail-modal2"
    >
      <businessForm :form-config="formConfig2" @keyDown="keyDown" />
    </Modal>
    <Modal v-model="modal3" width="660" mask footer-hide  title="添加商品" >
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
        <!-- <div class="specialLogistics-model-head-right">
          <Button type="error" ghost @click="fntableAdd"> {{increase}} </Button>
          <Button type="error" ghost @click="fncancel">{{cancel}}</Button>
        </div> -->
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

      <businessButton :btn-config="btnConfig2" />
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
