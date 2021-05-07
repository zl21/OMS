<template>
  <!-- 订单管理/订单详情 - 批量Hold单/Hold单 -->
  <div class="hold-dialog customized-modal">
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
    <businessButton
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
// @import "~@/css/modal/orderCenter/holdOrderDialog.less";
.hold-dialog {
  display: flex;
  width: 100%;
  flex-direction: column;
  .holdBtnClass {
    bottom: -14px !important;
  }
  .hold-form {
    /deep/ .ark-form-item {
      // margin-top: 0;
      &.releaseClass {
        .ark-form-item-label {
          color: transparent;
        }
      }
    }
    .form-compile {
      display: flex;
      width: 100%;
      justify-content: space-between;
      // margin-top: 6px;
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
