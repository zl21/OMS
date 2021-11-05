<template>
  <div class="customized-detail" v-loading="loading">
    <div class="customized-detail-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="customized-detail-main">
      <Collapse v-model="collapse">
        <Panel name="panel_baseInfo">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig1" />
          </p>
        </Panel>
        <Panel name="panel_conds">
          <!-- 满足条件（满足以下条件的单据打“播”标） -->
          {{ vmI18n.t('form_label.meet_conditions') }}（{{ vmI18n.t('modalTitle.ae') }}）
          <p slot="content">
            <OmsForm :form-config="formConfig2">
              <template #timeType="{ rowData }">
                <RadioGroup
                  v-model="rowData.value.BILL_TIME_TYPE"
                  @on-change="rowData.item.radioChange"
                  >
                  <Radio
                    v-for="(option , index) in rowData.item.options"
                    :key="index"
                    :label="option.value"
                    :disabled="isEnable"
                  >{{option.label}}</Radio>
                </RadioGroup>
                <DatePicker
                  v-model="rowData.value.TIME_RANGE" 
                  format="yyyy-MM-dd HH:mm:ss" 
                  type="datetimerange"
                  style="width: 300px;"
                  placement="bottom-end"
                  :disabled="rowData.value.BILL_TIME_TYPE == '' || isEnable"
                  @on-change="rowData.item.datePickerChange" />
              </template>
              <template #rule="{ rowData }">
                <div
                  class="identification-rules"
                  v-for="ruleItem, index in rowData.value.RULES"
                  :key="`rule${index}`"
                >
                  <label class="title">
                    <i>*</i>
                    {{ rowData.item.subLabel }}:
                  </label>
                  <RadioGroup
                    v-model="ruleItem.RULE_TYPE"
                    @on-change="rowData.item.radioChange(ruleItem)"
                    >
                    <Radio
                      v-for="(option, index) in rowData.item.options"
                      :key="index"
                      :label="option.value"
                      :disabled="isEnable"
                    >{{option.label}}</Radio>
                  </RadioGroup>
                  <Input v-model="ruleItem.RULE_CONTEXT"
                    :disabled="ruleItem.RULE_TYPE == '' || isEnable"
                    :autosize="{minRows: 2,maxRows: 5}"
                    :placeholder="vmI18n.t('modalTips.jy')"
                    @on-change="rowData.item.inputChange(ruleItem)"
                    style="width: 250px;"
                  />
                  <span class="condition">{{ vmI18n.t('form_label.cg') }}</span>
                  <Icon
                    v-if="!isEnable"
                    :type="index == 0 ? 'ios-add' : 'ios-remove'"
                    @click="rowData.item.handleRuleFields(ruleItem, index)"
                    color="red"
                    class="operation-btn"
                  />
                </div>
              </template>
            </OmsForm>
          </p>
        </Panel>
        <Panel name="panel_action">
          <!-- 执行动作 -->
          {{ vmI18n.t("panel_label.ae") }}
          <p slot="content">
            <OmsForm :form-config="formConfig3" />
          </p>
        </Panel>
      </Collapse>

      <div class="customized-detail-table">
        <!-- tab切换 -->
        <OmsLabel
          v-show="ID != -1"
          :label-list="labelList"
          :label-default-value="labelDefaultValue"
        />
        <!-- 子表Part -->
        <div class="subtablePart">
          <subTable
            v-if="ID != -1 && labelDefaultValue == 'ST_C_LIVE_CAST_STRATEGY_LOG'"
            :component-data="subTableConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import liveParsingAddOrEdit from '@/js/pages/strategyPlatform/liveParsingAddOrEdit.js';
  export default liveParsingAddOrEdit;
</script>

<style lang="less" scoped>
@import '~@/css/pages/strategyPlatform/liveParsingAddOrEdit.less';
</style>