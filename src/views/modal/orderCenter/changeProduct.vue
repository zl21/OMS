<template>
  <!-- 替换商品 -->
  <div class="changeProduct">
    <div class="i_head">
      <div class="i_body">
        <!-- <p>被替换商品SKU</p> -->
        <p>{{ vmI18n.t("modalTips.a1") }}</p>
        <div class="search">
          <div class="skuBox">
            <re-form :formConfig="formConfig" />
          </div>
          <div class="search_child">
            <!-- <span class="lable">商品名称:</span> -->
            <span class="lable"
              >{{ vmI18n.t("table_label.productName") }}:</span
            >
            <Input v-model="proName" @on-enter="search('one')" />
          </div>
          <div class="search_child">
            <!-- 搜索 -->
            <Button type="primary" @click="search('one')">{{
              vmI18n.t("btn.search")
            }}</Button>
          </div>
        </div>
        <Table
          :columns="columns"
          :data="data"
          :loading="tableLoad"
          @on-row-click="onRowClick"
          :highlight-row="true"
          height="250"
        ></Table>
      </div>
      <div class="i_body1">
        <!-- <p>替换后商品SKU</p> -->
        <p>{{ vmI18n.t("modalTips.a1") }}</p>
        <div class="search">
          <div class="skuBox">
            <re-form :formConfig="replaceFormConfig" />
          </div>
          <div class="search_child">
            <!-- <span class="lable">商品名称:</span> -->
            <span class="lable"
              >{{ vmI18n.t("table_label.productName") }}:</span
            >
            <Input v-model="replace_proName" @on-enter="search('two')" />
          </div>
          <div class="search_child">
            <!-- 搜索 -->
            <Button type="primary" @click="search('two')">{{
              vmI18n.t("btn.search")
            }}</Button>
          </div>
        </div>
        <Table
          :columns="columns"
          :data="replace_data"
          :loading="replaceTableLoad"
          @on-row-click="onRowClickReplace"
          :highlight-row="true"
          height="250"
        ></Table>
      </div>
      <img class="icon_switch" src="@/assets/image/switch.png" />
    </div>
    <div class="i_food">
      <span class="title">
        <!-- <span>将</span> -->
        <span>{{ vmI18n.t("modalTips.zf") }}</span>
        <span style="color: #003200">{{ onRowClickText }}</span>
        <!-- <span>替换为</span> -->
        <span>{{ vmI18n.t("modalTips.zg") }}</span>
        <span style="color: #003200">{{ onRowClickReplaceText }}</span>
      </span>
      <div class="dialog-footer">
        <Button
          type="error"
          ghost
          size="small"
          @click="
            () => {
              this.$parent.$parent.closeConfirm();
            }
          "
        >
          <!-- 取消 -->
          {{ vmI18n.t("common.cancel") }}
        </Button>
        <Button type="primary" size="small" @click="confirm">
          <!-- 确定 -->
          {{ vmI18n.t("common.determine") }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
  import changeProduct from "@/js/modal/orderCenter/changeProduct";
  export default changeProduct;
</script>
<style lang="less" scoped>
@import "~@burgeon/oms-theme/skin/public.less";
.changeProduct {
  .i_head {
    display: flex;
    justify-content: space-between;
    p {
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #333333;
    }
    .search {
      display: flex;
      line-height: 26px;
      margin-top: 12px;
      margin-bottom: 18px;
      flex-wrap: wrap;
      white-space: nowrap;
      .search_child {
        width: 50%;
        font-size: 0;
        height: 32px;
        line-height: 1;
        & + .search_child {
          text-align: right;
          padding-top: 3px;
          .ark-btn-primary {
            background-color: @button-bg;
            border-color: @button-border;
          }
        }

        .lable {
          font-size: 12px;
          display: inline-block;
          width: 100px;
          padding: 10px 12px 10px 0;
          text-align: right;
          vertical-align: middle;
        }
        .ark-input-wrapper {
          font-size: 12px;
          width: calc(100% - 100px);
          display: inline-block;
          text-align: right;
          vertical-align: middle;
        }
      }
    }
    .i_body {
      width: 50%;
      border-right: 1px solid #dcdee2;
      padding-top: 0;
      padding-right: 15px;
      // border-bottom: 1px solid #dcdee2;
    }
    .i_body1 {
      width: 50%;
      padding-top: 0;
      padding-left: 15px;
      // padding-bottom: 15px;
      // border-bottom: 1px solid #dcdee2;
    }
    .icon_switch {
      width: 38px;
      height: 38px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .skuBox {
    width: 100%;
    overflow: hidden;
    margin-top: -2px;
    /deep/ .orderManageEdit {
      padding-right: 0;
      .burgeon-form-item {
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
          margin-left: 60px !important;
        }
      }
    }
  }
}
</style>
