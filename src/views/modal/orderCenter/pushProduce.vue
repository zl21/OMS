<template>
  <!-- 添加商品 -->
  <div class="pushProduce">
    <div class="i_head">
      <!-- <div style="float:left;marginTop:8px;">
        <RadioGroup v-model="radioValue" @on-change="radioChange">
          <Radio label="2">
            <span>按页面已勾选订单</span>
          </Radio>
          <Radio label="1">
            <span>按筛选条件选中订单</span>
          </Radio>
        </RadioGroup>
      </div>-->
      <div style="display: flex">
        <div class="skuBox">
          <re-form :formConfig="formConfig" />
        </div>
        <div class="number-box">
          <!-- <label>数量:</label> -->
          <label>{{ vmI18n.t("table_label.quantities") }}:</label>
          <Input v-model="qty" style="width: 80px" @on-enter="search" />
        </div>
        <div class="search-button">
          <Button type="error" @click="search">
            <!-- 搜索 -->
            {{ vmI18n.t("btn.search") }}
          </Button>
        </div>
      </div>
    </div>
    <div class="i_body">
      <Table
        :columns="columns"
        :loading="tableLoading"
        :data="data"
        @on-row-click="onRowClick"
        :highlight-row="true"
      ></Table>
    </div>
    <div class="dialog-footer">
      <Button
        style="marginleft: 8px"
        type="error"
        :loading="loading"
        @click="confirm"
      >
        <!-- 确定 -->
        {{ vmI18n.t("common.determine") }}
      </Button>
      <Button
        type="error"
        ghost
        @click="
          () => {
            this.$parent.$parent.closeConfirm();
          }
        "
      >
        <!-- 取消 -->
        {{ vmI18n.t("common.cancel") }}
      </Button>
    </div>
  </div>
</template>

<script>
  import pushProduce from "@/js/modal/orderCenter/pushProduce";
  export default pushProduce;
</script>
<style lang="less">
@import "~@burgeon/oms-theme/skin/public.less";
.pushProduce {
  .i_head {
    height: 30px;
  }
  .i_body {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .i_food {
    display: flex;
    flex-direction: row-reverse;
  }
  .skuBox {
    width: 430px;
    overflow: hidden;
    margin-top: -2px;
    /deep/ .orderManageEdit {
      padding-right: 0;
      .burgeon-form-item {
        display: flex;
        line-height: 28px;
        margin-right: 5px;
        .burgeon-form-item-label {
          padding-top: 0;
          padding-bottom: 0;
          width: auto !important;
          line-height: 28px;
        }
        .burgeon-form-item-content {
          line-height: 28px;
          margin-left: 0px !important;
        }
      }
    }
  }
  .number-box {
    label {
      width: 100px;
      text-align: right;
      padding: 10px 12px 10px 0;
      display: inline-block;
    }
  }
  .search-button {
    text-align: right;
    width: 100px;
    margin-top: 2px;
    .ark-btn-error {
      background-color: @button-bg;
      border-color: @button-border;
    }
  }
}
</style>
