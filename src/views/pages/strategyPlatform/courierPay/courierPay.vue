<!--
 * @Author: your name
 * @Date: 2021-05-13 15:29:38
 * @LastEditTime: 2021-08-17 14:37:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/strategyPlatform/courierPay/courierPay.vue
-->
<template>
  <div class="courierPay customized-detail">
    <div class="buttons obj-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="obj-main">
      <div
      v-if="identifying === 3"
      class="img"
    >
      <WaterMark v-if="statusName !== ''" :text="statusName"/>
    </div>
      <Collapse v-model="value1" class="obj-form">
        <Panel name="1">
          <!-- 基本信息 -->
          {{ $it("com.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" />
          </p>
        </Panel>
        <Panel name="2">
          <!-- 日志 -->
          {{ $it("com.journal") }}
          <p slot="content">
            <OmsForm :form-config="formConfig1" />
          </p>
        </Panel>
        <Panel name="3">
          <!-- 明细信息 -->
          {{ $it("com.detailed_info") }}
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
