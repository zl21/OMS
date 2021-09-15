<template>
  <!-- 替换商品 -->
  <div class="changeProduct" v-loading="loading">
    <div class="i_head">
      <div class="i_body">
        <!-- <p>被替换商品SKU</p> -->
        <p>{{ renderDialogTitle('before') }}</p>
        <div class="search">
          <div class="skuBox">
            <re-form :form-config="formConfig" />
          </div>
          <div class="search_child">
            <!-- <span class="lable">商品名称:</span> -->
            <span
              class="lable"
            >{{ vmI18n.t("table_label.productName") }}:</span>
            <Input
              v-model="proName"
              @on-enter="search('one')"
            />
          </div>
          <div class="search_child">
            <!-- 搜索 -->
            <Button
              type="primary"
              @click="search('one')"
            >
              {{
                vmI18n.t("btn.search")
              }}
            </Button>
          </div>
        </div>
        <Table
          :columns="columns"
          :data="data"
          :loading="tableLoad"
          :highlight-row="true"
          height="250"
          @on-row-click="onRowClick"
        />
      </div>
      <div class="i_body1">
        <!-- <p>替换后商品SKU</p> -->
        <p>{{ renderDialogTitle('after') }}</p>
        <div class="search">
          <div class="skuBox">
            <re-form :form-config="replaceFormConfig" />
          </div>
          <div class="search_child">
            <!-- <span class="lable">商品名称:</span> -->
            <span
              class="lable"
            >{{ vmI18n.t("table_label.productName") }}:</span>
            <Input
              v-model="replace_proName"
              @on-enter="search('two')"
            />
          </div>
          <div class="search_child">
            <!-- 搜索 -->
            <Button
              type="primary"
              @click="search('two')"
            >
              {{
                vmI18n.t("btn.search")
              }}
            </Button>
          </div>
        </div>
        <Table
          :columns="columns"
          :data="replace_data"
          :loading="replaceTableLoad"
          :highlight-row="true"
          height="250"
          @on-row-click="onRowClickReplace"
        />
      </div>
      <img
        class="icon_switch"
        src="@/assets/image/switch.png"
      >
    </div>
    <div class="i_food">
      <span class="title" v-if="!isTBsku">
        <!-- <span>将</span> -->
        <span>{{ vmI18n.t("modalTips.zf") }}</span>
        <span style="color: #003200">{{ onRowClickText }}</span>
        <!-- <span>替换为</span> -->
        <span>{{ vmI18n.t("modalTips.zg") }}</span>
        <span style="color: #003200">{{ onRowClickReplaceText }}</span>
      </span>
      <businessButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import changeProduct from '@/js/modal/orderCenter/changeProduct';

  export default changeProduct;
</script>
<style lang="less" scoped>
  @import "~@burgeon/oms-theme/skin/public.less";
  @import "~@/css/modal/orderCenter/changeProduct.less";
</style>
