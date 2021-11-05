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
          <re-form :form-config="formConfig" />
        </div>
        <div class="number-box">
          <!-- <label>数量:</label> -->
          <label>{{ vmI18n.t("table_label.quantities") }}:</label>
          <Input
            v-model="qty"
            style="width: 80px"
            @on-enter="search"
          />
        </div>
        <div class="search-button">
          <Button
            type="error"
            @click="search"
          >
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
        :highlight-row="true"
        @on-row-click="onRowClick"
      />
    </div>
    <OmsButton
      class="modalBth"
      :btn-config="btnConfig"
    />
  </div>
</template>

<script>
  import pushProduce from '@/js/modal/orderCenter/pushProduce';

  export default pushProduce;
</script>
<style lang="less">
  @import "~@burgeon/oms-theme/skin/public.less";
  @import "~@/css/modal/orderCenter/pushProduce.less";
</style>
