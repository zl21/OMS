<template>
  <!-- 指定商品拆单 -->
  <div
    v-loading="pageLoad"
    class="specifyGoods"
  >
    <div class="i_head">
      <div style="float:left;marginTop:8px;">
        <RadioGroup
          v-model="radioValue"
          @on-change="radioChange"
        >
          <Radio label="2">
            <!-- 按页面已勾选订单 -->
            <span>{{ vmI18n.t("modalTips.cd") }}</span>
          </Radio>
          <Radio label="1">
            <!-- 按筛选条件选中订单 -->
            <span>{{ vmI18n.t("modalTips.ce") }}</span>
          </Radio>
        </RadioGroup>
      </div>
      <!-- 商品SKU -->
      <div style="float:right">
        {{ vmI18n.t('table_label.commoditySKU') }}:
        <Input
          v-model="searchValue"
          icon="ios-search"
          style="width: 150px;"
          @on-enter="search"
          @on-click="search"
        />
        <!-- 数量:
        <Input v-model="qty" style="width: 80px" />-->
      </div>
    </div>
    <div class="i_body">
      <Table
        :columns="columns"
        :data="data"
      />
    </div>
    <businessButton class="modalBth" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import specifyGoodsAssign from '@/js/modal/orderCenter/specifyGoodsAssign';

  export default specifyGoodsAssign;
</script>
<style lang="less">
  @import "~@/css/modal/orderCenter/specifyGoodsAssign.less";
</style>
