<template>
  <div
    v-loading="dialogLoad"
    class="hold-dialog"
  >
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
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
// import httpServer, { post } from '@/utils/request'
  import holdOrderDialog from '@/js/modal/orderCenter/holdOrderDialog';

  export default holdOrderDialog;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/holdOrderDialog.less";
</style>
