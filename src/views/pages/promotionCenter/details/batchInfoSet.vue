<!-- 条件设置-->
<template>
  <div class="batchInfoSet">
    <div class="title">
      <i class="iconfont icon-liuchengtiaojian" />
      <!-- <span>条件信息设置</span>  -->
      <span>{{ vmI18n.t("other.info_set") }}</span>
    </div>
    <div class="formList">
      <!--商品来源-->
      <div class="row">
        <div class="form_label">
          {{ vmI18n.t("form_label.goods_source") }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="infoData.products_origin"
            :options="groups.productsOrigin"
            @changeSingle="productsFromChange"
          />
        </div>
      </div>
      <!--赠品翻倍-->
      <div class="row">
        <div class="form_label">
          {{ vmI18n.t("form_label.double_gifts") }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="infoData.gift_doubles"
            :options="groups.giftDoubles"
            @changeSingle="checkBuyerLimitFrequencyChange"
          />
          <!--最大翻倍次数 -->
          <div class="form_item">
            {{ vmI18n.t("form_label.max_doubling_times") }}
          </div>
          <div class="form_el_input form_item doubleNum">
            <input
              v-model="infoData.max_doubles_limits"
              oninput="this.value= this.value.match(/^[1-9]\d{0,2}/) ? this.value.match(/^[1-9]\d{0,2}/)[0] : ''"
              placeholder
            >
          </div>
        </div>
      </div>
      <!--选择商品方式 -- 赠送方式：-->
      <div class="row">
        <div class="form_label">
          {{ vmI18n.t("form_label.giving_ways") }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="infoData.gift_methods"
            :options="groups.batchGiftMethods"
            @changeSingle="checkGiftChange"
          />
        </div>
      </div>
    </div>
    <!--商品列表-->
    <batchTables
      :product-list="infoData.list"
      :products_columns="products_columns"
      :gift_columns="gift_columns"
      :itemdata="itemdata"
      :itemdata_gift="itemdata_gift"
      @addRowData="addRowData"
      @deleteRowData="deleteRowData"
      @addList="addList"
      @blurValue="blurValue"
      @batchImport="batchImport"
    />
  </div>
</template>
<script>
  import batchInfoSet from '@/js/pages/promotionCenter/details/batchInfoSet';

  export default batchInfoSet;
</script>
