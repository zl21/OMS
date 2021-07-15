<!--
 * @Author: your name
 * @Date: 2021-05-20 19:02:17
 * @LastEditTime: 2021-05-22 09:39:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/strategyPlatform/holdStrategyAddOrEdit.vue
-->
<template>
  <div class="holdStrategyAddOrEdit customized-detail" v-loading="loading">
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          <!-- 基础资料 -->
          {{ vmI18n.t('panel_label.basicData') }}
          <div slot="content" class="customized_Info_form">
            <businessForm :form-config="formConfig1" @keyDown="keyDown"> </businessForm>
          </div>
        </Panel>
        <Panel name="panel_condition">
          满足条件（满足以下条件的单据会进行hold单）
          <p slot="content">
            <businessForm :form-config="formConfig2" @keyDown="keyDown">
              <template #spec01="{ rowData }">
                <div class="preLable">
                  <i-switch size="small" v-model="rowData.value.IS_DATE_TYPE" :disabled="rowData.item.disabledSwitch" @on-change="rowData.item.switchChange" />
                  <span v-if="rowData.value.IS_DATE_TYPE" class="preLable-item"> * </span>
                  <span>{{ rowData.item.label }}：</span>
                </div>

                <RadioGroup v-model="rowData.value.DAY_TYPE" @on-change="rowData.item.radioChange">
                  <Radio v-for="(it, index) in rowData.item.options" :key="index" :label="it.value" :disabled="rowData.item.disabled">{{ it.label }}</Radio>
                </RadioGroup>
                <DatePicker
                  v-model="rowData.value.TIME"
                  :disabled="rowData.value.IS_DATE_TYPE && rowData.value.DAY_TYPE && !rowData.item.disabledSwitch ? false : true"
                  format="yyyy-MM-dd HH:mm:ss"
                  type="datetimerange"
                  confirm
                  placement="bottom-end"
                  placeholder=""
                  style="width: 300px"
                  @on-change="rowData.item.datePickerChange"
                ></DatePicker>
              </template>
              <template #spec02="{ rowData }">
                <div class="preLable">
                  <i-switch size="small" v-model="rowData.value.ORDER_TAB_TYPE" :disabled="rowData.item.disabledSwitch" @on-change="rowData.item.switchChange" />
                  <span v-if="rowData.value.ORDER_TAB_TYPE" class="preLable-item"> * </span>
                  <span>{{ rowData.item.label }}：</span>
                </div>
                <Checkbox v-model="rowData.value.ORDER_FLAG" @on-change="rowData.item.checkChange" :disabled="rowData.item.disabled">直播</Checkbox>
              </template>
            </businessForm>
          </p>
        </Panel>
        <Panel name="panel_action">
          <!-- 执行动作 -->
          {{ vmI18n.t("panel_label.ae") }}
          <p slot="content">
            <businessForm :form-config="formConfig3" @keyDown="keyDown">
              <template #spec03="{ rowData }">
                <template v-if="formConfig3.formValue.RELEASE_TIME_TYPE === 1">
                  <DatePicker class="fiexdTime" v-model="rowData.value.RELEASE_TIME" :options="rowData.item.optionsTime" format="yyyy-MM-dd HH:mm:ss" type="datetime" confirm @on-change="rowData.item.datePickerChange"></DatePicker>
                </template>
                <template v-else>
                  <!-- 下单类型 -->
                  <Select v-model="rowData.value.RELEASE_DAY_TYPE" class="fixedSelect">
                    <Option v-for="item in rowData.item.orderTimeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                  <!-- 时长 -->
                  <!-- <Input style="display:inline-block;width: 100px;"  v-model="rowData.value.FIXED_DURATION"/> -->
                  <InputNumber :min="1" v-model="rowData.value.FIXED_DURATION"></InputNumber>
                  <!-- 类型 -->
                  <Select v-model="rowData.value.TIME_UNIT" class="fixedSelect">
                    <Option v-for="item in rowData.item.timeUnitOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </template>
              </template>
            </businessForm>
          </p>
        </Panel>
      </Collapse>
      <div v-if="ID !== '-1'" class="customized-detail-table">
        <!-- tab切换 -->
        <businessLabel :label-list="labelList" :label-default-value="labelDefaultValue" />
        <!-- 子表Part -->
        <div class="subtablePart">
          <subTable :component-data="subTableConfig"></subTable>
          <!-- <business-action-table :jordan-table-config="tableConfig" @on-page-change="pageChange" @on-page-size-change="pageSizeChange" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import holdStrategyAddOrEdit from '@/js/pages/strategyPlatform/holdStrategyAddOrEdit.js';
  export default holdStrategyAddOrEdit;
</script>

<style lang="less" scoped>
@import '~@/css/pages/strategyPlatform/holdStrategyAddOrEdit.less';
</style>