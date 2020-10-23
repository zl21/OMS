<template>
  <div class="hold-dialog" v-loading="dialogLoad">
    <div class="hold-form">
      <re-form :formConfig="formConfig">
        <template #formCompile="{ rowData }">
          <div class="form-compile">
            <Select
              class="form-compile-item"
              v-model="formConfig.formValue.DAY_TYPE"
            >
              <Option
                v-for="item in rowData.item.options1"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
            <InputNumber
              class="form-compile-item compile-item-input"
              :max="10000"
              :min="1"
              v-model="formConfig.formValue.FIXED_DURATION"
            ></InputNumber>
            <Select
              class="form-compile-item"
              v-model="formConfig.formValue.TIME_UNIT"
            >
              <Option
                v-for="item in rowData.item.options2"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
        </template>
      </re-form>
    </div>
    <re-button :btnConfig="btnConfig" />
  </div>
</template>

<script>
// import httpServer, { post } from '@/utils/request'
import holdOrderDialog from "@/js/modal/orderCenter/holdOrderDialog";
export default holdOrderDialog;
</script>

<style lang="less" scoped>
.hold-dialog {
  display: flex;
  width: 100%;
  flex-direction: column;
  .hold-form {
    .form-compile {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-top: 6px;
      > .form-compile-item {
        width: 100px;
      }
      > .compile-item-input {
        line-height: 26px;
        /deep/ input {
          height: 26px;
        }
      }
    }
  }
}
</style>
