<template>
  <!--  天猫换货策略  -->
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
            <businessForm :form-config="formConfig1" />
          </div>
        </Panel>
        <Panel name="panel_condition">
          <!-- 满足条件 -->
          {{ vmI18n.t('form_label.meet_conditions') }}
          <p slot="content">
            <businessForm :form-config="formConfig2">
              <template #exchangeDesc="{ rowData }">
                <div class="preLable">
                  <i-switch size="small"
                    v-model="rowData.value.IS_AUTO_APPROVE"
                    :disabled="isEnable"
                    @on-change="rowData.item.switchChange"
                  />
                  <label :class="['cust-form-label', 'required', { hidden: !rowData.value.IS_AUTO_APPROVE }]">
                    <!-- <Tooltip :content="rowData.item.label" theme="light"> -->
                      <i>*</i>{{ rowData.item.label }}：
                    <!-- </Tooltip> -->
                  </label>
                </div>
                <CheckboxGroup
                  v-model="rowData.value.EXCHANGE_DESC"
                  @on-change="rowData.item.checkChange"
                  style="padding-left: 10px; width: 180px;">
                  <Checkbox
                    v-for="(option , index) in rowData.item.options"
                    :key="index"
                    :label="option.value"
                    :disabled="isEnable"
                  >{{option.label}}</Checkbox>
                </CheckboxGroup>
                <label :class="['cust-form-label', 'required', { hidden: !rowData.value.IS_AUTO_APPROVE }]">
                  <!-- <Tooltip :content="rowData.item.subLabel" theme="light"> -->
                    <i>*</i><span>{{ rowData.item.subLabel }}：</span>
                  <!-- </Tooltip> -->
                </label>
                <Input
                  v-model="rowData.value.AOTU_APPROVE_DEVIATION_PRICE"
                  :disabled="isEnable"
                  :autosize="{minRows: 2,maxRows: 5}"
                  @on-change="rowData.item.inputChange"
                  :regx="rowData.item.regx"
                  style="width: 150px;"
                />
              </template>
              <template #stockout="{ rowData }">
                <div class="preLable">
                  <i-switch size="small"
                    v-model="rowData.value.OOS_AUTO_REJECT"
                    :disabled="isEnable"
                    @on-change="rowData.item.switchChange" 
                  />
                  <span class="cust-form-label">{{ rowData.item.label }}：</span>
                </div>
                <!-- <Tooltip :content="rowData.item.subLabel1" theme="light"> -->
                  <label :class="['cust-form-label', 'required', { hidden: !rowData.value.OOS_AUTO_REJECT }]">
                    <i>*</i>{{ rowData.item.subLabel1 }}：
                  </label>
                <!-- </Tooltip> -->
                <Select
                  v-model="rowData.value.OOS_AUTO_REJECT_REASON_ID"
                  @on-change="(val) => rowData.item.selectChange(val)"
                  :disabled="isEnable"
                  label-in-value
                  style="width: 150px;">
                  <Option
                    v-for="item in rowData.item.options"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <!-- <Tooltip :content="rowData.item.subLabel2" theme="light"> -->
                  <label class="cust-form-label">{{ rowData.item.subLabel2 }}：</label>
                <!-- </Tooltip> -->
                <Input
                  v-model="rowData.value.OOS_AUTO_REJECT_DESC"
                  :disabled="isEnable"
                  :autosize="{minRows: 2,maxRows: 5}"
                  @on-change="rowData.item.inputChange"
                  style="width: 150px;"
                />
              </template>
              <template #bias="{ rowData }">
                <div class="preLable">
                  <i-switch size="small"
                    v-model="rowData.value.DEVIATION_AUTO_REJECT"
                    :disabled="isEnable"
                    @on-change="rowData.item.switchChange"
                  />
                  <span class="cust-form-label">{{ rowData.item.label }}：</span>
                </div>
                <!-- <Tooltip :content="rowData.item.subLabel1" theme="light"> -->
                  <label :class="['cust-form-label', 'required', { hidden: !rowData.value.DEVIATION_AUTO_REJECT }]">
                    <i>*</i>{{ rowData.item.subLabel1 }}：
                  </label>
                <!-- </Tooltip> -->
                <Input
                  v-model="rowData.value.AUTO_REJECT_DEVIATION_PRICE"
                  :disabled="isEnable"
                  :autosize="{minRows: 2,maxRows: 5}"
                  :regx="rowData.item.regx"
                  @on-change="rowData.item.inputChange"
                  style="width: 150px;"
                />
                <!-- <Tooltip :content="rowData.item.subLabel2" theme="light"> -->
                  <label :class="['cust-form-label', 'required', { hidden: !rowData.value.DEVIATION_AUTO_REJECT }]">
                    <i>*</i>{{ rowData.item.subLabel2 }}：
                  </label>
                <!-- </Tooltip> -->
                <Select
                  v-model="rowData.value.DEVIATION_AUTO_REJECT_REASON_ID"
                  @on-change="(e) => rowData.item.selectChange(e)"
                  :disabled="isEnable"
                  label-in-value
                  style="width: 150px;">
                  <Option
                    v-for="item in rowData.item.options"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
                <!-- <Tooltip :content="rowData.item.subLabel3" theme="light"> -->
                  <label class="cust-form-label">{{ rowData.item.subLabel3 }}：</label>
                <!-- </Tooltip> -->
                <Input
                  v-model="rowData.value.DEVIATION_AUTO_REJECT_DESC"
                  :disabled="isEnable"
                  :autosize="{minRows: 2,maxRows: 5}"
                  @on-change="rowData.item.inputChange2"
                  style="width: 150px;"
                />
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tmExchangeAddOrEdit from '@/js/pages/strategyPlatform/tmExchangeAddOrEdit.js';
  export default tmExchangeAddOrEdit;
</script>

<style lang="less" scoped>
  @import "~@/css/pages/strategyPlatform/tmExchangeAddOrEdit.less";
</style>
