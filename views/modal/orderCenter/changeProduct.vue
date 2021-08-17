<!--
 * @Author: your name
 * @Date: 2021-07-02 18:40:35
 * @LastEditTime: 2021-08-17 14:36:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/orderCenter/changeProduct.vue
-->
<template>
  <!-- 替换商品 -->
  <div class="changeProduct customized-modal">
    <div class="i_head">
      <div class="i_body">
        <!-- <p>被替换商品SKU</p> -->
        <p>{{ vmI18n.t("modalTitle.th1") }}</p>
        <!-- <div class="search">
          <div class="skuBox">
            <re-form :form-config="formConfig" />
          </div>
          <div class="search_child">
            <Button type="primary" @click="fnsearch('one')">
              {{ vmI18n.t("btn.search") }}
            </Button>
          </div>
        </div> -->
        <businessActionTable
          :jordan-table-config="tableConfig"
          @on-select="onSelect1"
          @on-select-cancel="onSelectCancel1"
          @on-select-all="onSelectAll1"
          @on-select-all-cancel="onSelectAllCancel1"
          @on-row-click="onRowClick1"
          @on-row-dblclick="onRowDblclick1"
          @table-delete-detail="tableDeleteDetail1"
          @on-page-change="pageChange1"
          @on-page-size-change="pageSizeChange1"
        />
        <!-- <Table
          :columns="columns"
          :data="data"
          :loading="tableLoad"
          :highlight-row="true"
          height="250"
          @on-row-click="onRowClick"
        />-->
      </div>
      <div class="i_body1">
        <!-- <p>替换后商品SKU</p> -->
        <p>{{ vmI18n.t("modalTitle.th2") }}</p>
        <!-- <div class="search">
          <div class="skuBox">
            <re-form :form-config="replaceFormConfig" />
          </div>
          <div class="search_child">
            <Button type="primary" @click="fnsearch('two')">
              {{ vmI18n.t("btn.search") }}
            </Button>
          </div>
        </div> -->
        <businessActionTable
          :jordan-table-config="tableConfig2"
          @on-select="onSelect2"
          @on-select-cancel="onSelectCancel2"
          @on-select-all="onSelectAll2"
          @on-select-all-cancel="onSelectAllCancel2"
          @on-row-click="onRowClick2"
          @on-row-dblclick="onRowDblclick2"
          @table-delete-detail="tableDeleteDetail2"
          @on-page-change="pageChange2"
          @on-page-size-change="pageSizeChange2"
        />
      </div>
      <img class="icon_switch" :src="require('@/assets/img/switch.png')" />
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
      <businessButton class="modal-footer" :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
import changeProduct from '@/js/modal/orderCenter/changeProduct'

export default changeProduct
</script>
<style lang="less" scoped>
@import "~@burgeon/oms-theme/skin/public.less";
@import "~@/css/modal/orderCenter/changeProduct.less";

</style>
