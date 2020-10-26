<template>
  <!-- 删除商品 -->
  <div class="itemDelete">
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
          <!-- SKU编码:
          <Input
            v-model="searchValue"
            icon="ios-search"
            style="width: 150px; marginRight:8px"
            @on-enter="search"
            @on-click="search"
          /> -->
        </div>

        <!-- <div>
          商品编码:
          <Input v-model="psCProEcode" style="width: 150px; marginRight:8px" @on-enter="search" />
        </div> -->

        <!-- <div>
          商品名称:
          <Input v-model="psCProEname" style="width: 150px; marginRight:8px" @on-enter="search" />
        </div> -->

        <div class="search-button">
          <Button type="primary" @click="search">
            <!-- 搜索 -->
            {{ vmI18n.t("btn.search") }}
          </Button>
        </div>
      </div>
    </div>
    <div class="i_body">
      <Table
        :columns="columns"
        :data="data"
        :loading="tableLoad"
        @on-row-click="onRowClick"
        :highlight-row="true"
      ></Table>
    </div>
    <div class="dialog-footer">
      <Button style="marginleft: 8px" type="primary" @click="confirm">
        <!-- 确定 -->
        {{ vmI18n.t("common.determine") }}
      </Button>
      <Button
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
  import itemDelete from "@/js/modal/orderCenter/itemDelete";
  export default itemDelete;
</script>
<style lang="less">
  @import "~@burgeon/oms-theme/skin/public.less";
  @import "~@/css/modal/orderCenter/itemDelete.less";
</style>
