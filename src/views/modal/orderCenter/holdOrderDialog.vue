<!--
 * @Author: your name
 * @Date: 2021-05-07 19:05:11
 * @LastEditTime: 2021-07-20 17:39:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/orderCenter/holdOrderDialog.vue
-->
<template>
  <!-- 订单管理/订单详情 - 批量Hold单/Hold单 -->
  <div class="hold-dialog customized-modal">
    <loading :loading="loading" />
    <div class="hold-form">
      <re-form :form-config="formConfig">
        <template #formCompile="{ rowData }">
          <div class="form-compile">
            <Select
              v-model="formConfig.formValue.DAY_TYPE"
              class="form-compile-item"
            >
              <Option
                v-for="item in rowData.item.options1"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
            <InputNumber
              v-model="formConfig.formValue.FIXED_DURATION"
              class="form-compile-item compile-item-input"
              :max="10000"
              :min="1"
            />
            <Select
              v-model="formConfig.formValue.TIME_UNIT"
              class="form-compile-item"
            >
              <Option
                v-for="item in rowData.item.options2"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            </Select>
          </div>
        </template>
      </re-form>
    </div>
    <OmsButton
      :class="['modal-footer', holdBtnClass]"
      :btn-config="btnConfig"
    />
  </div>
</template>

<script>
// import httpServer, { post } from '@/utils/request'
import holdOrderDialog from '@/js/modal/orderCenter/holdOrderDialog';

export default holdOrderDialog;
</script>

<style lang="less" scoped>

</style>
