<!--
 * @Author: your name
 * @Date: 2021-05-13 15:29:38
 * @LastEditTime: 2021-08-17 14:37:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/strategyPlatform/courierPay/courierPay.vue
-->
<template>
  <div class="courierPay public-main">
    <div
      v-if="identifying === 3"
      class="img"
    >
      <WaterMark v-if="statusName !== ''" class="omsWaterMark" :text="statusName"/>
    </div>
    <div class="buttons">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="public-content">
      <Collapse v-model="value1">
        <Panel name="1">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" />
          </p>
        </Panel>
        <Panel name="2">
          <!-- 日志 -->
          {{ vmI18n.t("common.journal") }}
          <p slot="content">
            <OmsForm :form-config="formConfig1" />
          </p>
        </Panel>
        <Panel name="3">
          <!-- 明细信息 -->
          {{ vmI18n.t("common.detailed_info") }}
          <p slot="content">
            <OmsTable
              :jordan-table-config="jordanTableConfig"
              @on-select="onSelect"
              @on-select-all="onSelect"
              @on-select-all-cancel="onSelectAllCancel"
              @on-select-cancel="onSelect"
              @table-delete-detail="tableDeleteDetail"
            />
          </p>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>
<script>
  import courierPay from '@/js/pages/strategyPlatform/courierPay/courierPay';

  export default courierPay;
</script>

<style lang="less">
  @import "~@/css/pages/strategyPlatform/courierPay/courierPay.less";
</style>
