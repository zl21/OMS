<template>
  <!--  天猫换货策略  -->
  <div class="holdStrategyAddOrEdit customized-detail" v-loading="loading">
    <div class="buttons customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="panelDefaultValue">
        <Panel name="panel_baseInfo">
          基础资料
          <!-- {{ $i18n.t('panel_label.basicData') }}  -->
          <div slot="content" class="customized_Info_form">
            <businessForm :form-config="formConfig1" />
          </div>
        </Panel>
        <Panel name="panel_condition">
          满足条件
          <p slot="content">
            <businessForm :form-config="formConfig2">
              <template #exchangeDesc="{ rowData }">
                <div class="preLable">
                  <i-switch size="small"
                    v-model="rowData.value.IS_AUTO_APPROVE"
                    :disabled="isEnable"
                    @on-change="rowData.item.switchChange"
                  />
                  <label :class="['required', { hidden: !rowData.value.IS_AUTO_APPROVE }]">
                    <i>*</i>{{ rowData.item.label }}：
                  </label>
                </div>
                <CheckboxGroup
                  v-model="rowData.value.EXCHANGE_DESC"
                  @on-change="rowData.item.checkChange"
                  style="width: 180px;">
                  <Checkbox
                    v-for="(option , index) in rowData.item.options"
                    :key="index"
                    :label="option.value"
                    :disabled="isEnable"
                  >{{option.label}}</Checkbox>
                </CheckboxGroup>
                <label :class="['required', { hidden: !rowData.value.IS_AUTO_APPROVE }]">
                  <i>*</i>{{ rowData.item.subLabel }}：
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
                  <span>{{ rowData.item.label }}：</span>
                </div>
                <label :class="['required', { hidden: !rowData.value.OOS_AUTO_REJECT }]">
                  <i>*</i>{{ rowData.item.subLabel1 }}：
                </label>
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
                <label style="margin-left: 10px">{{ rowData.item.subLabel2 }}：</label>
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
                  <span>{{ rowData.item.label }}：</span>
                </div>
                <label :class="['required', { hidden: !rowData.value.DEVIATION_AUTO_REJECT }]">
                  <i>*</i>{{ rowData.item.subLabel1 }}：
                </label>
                <Input
                  v-model="rowData.value.AUTO_REJECT_DEVIATION_PRICE"
                  :disabled="isEnable"
                  :autosize="{minRows: 2,maxRows: 5}"
                  :regx="rowData.item.regx"
                  @on-change="rowData.item.inputChange"
                  style="width: 150px;"
                />
                <label :class="['required', { hidden: !rowData.value.DEVIATION_AUTO_REJECT }]" style="margin-left: 28px">
                  <i>*</i>{{ rowData.item.subLabel2 }}：
                </label>
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
                <label style="margin-left: 20px">{{ rowData.item.subLabel3 }}：</label>
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
