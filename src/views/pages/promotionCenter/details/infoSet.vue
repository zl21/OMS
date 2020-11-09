<!-- 条件设置-->
<template>
  <div class="infoSet">
    <div class="title">
      <i class="iconfontPromotion iconliuchengtiaojian" />
      <!-- <span>条件信息设置</span>  -->
      <span>{{ vmI18n.t("other.info_set") }}</span>
    </div>
    <div>
      <!--商品参与方式-->
      <div class="row" v-if="!onlyShowRules">
        <div class="form_label">
          <i class="red">*</i>{{ vmI18n.t("form_label.goods_participation_mode") }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="infoData.products_join"
            :options="productsJoin"
            @changeSingle="checkProductJoinChange"
          />
        </div>
      </div>
      <!--商品来源-->
      <div class="row" v-if="!onlyShowRules">
        <div class="form_label">
          <i class="red">*</i>{{ vmI18n.t("form_label.goods_source") }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="infoData.products_origin"
            :options="groups.productsOrigin"
            @changeSingle="checkProductOriginChange"
          />
        </div>
      </div>
      <!--选择商品方式-->
      <div class="row"  v-if="!onlyShowRules">
        <div class="form_label">
          <i class="red">*</i>{{ vmI18n.t("form_label.choose_product_ways") }}：
        </div>
        <div class="form_content">
          <SingleBox
            :value="infoData.includeorexclude"
            :options="includeOrExclude"
            @changeSingle="checkIncludeOrExcludeChange"
          />
        </div>
      </div>
      <!--满足条件-->
      <!-- <div class="row" v-if="showRulesContent">
        <div class="form_label"><i class="red">*</i>满足条件：</div>
        <div class="form_content">
          <CTSIT
            v-for="(rule, _index) in infoData.rules"
            :key="_index"
            :rule="rule"
            :onlyShowRules="onlyShowRules"
            v-show="showRules(_index, rule)"
          ></CTSIT>
        </div>
      </div> -->
      <!--搭配 选择商品方式 商品列表-->
      <div v-if="!onlyShowRules && showPdtsArr">
        <div class="form_label">
          <i class="red">*</i>{{ vmI18n.t("other.product_list") }}：
        </div>
        <div class="form_content">
          <detailtabs
            :current.sync="currentTab"
            :columns="columns"
            :products-arrs="infoData.productsArrs"
            :products-arrs-view="productsArrsView"
            :itemdata="itemdata"
            :module-mode="moduleMode"
            @addOneTableRowData="addOneTableRowData"
            @deleteOneTableRowData="deleteOneTableRowData"
            @onePageChange="onePageChange"
            @onOnePageSizeChange="onOnePageSizeChange"
            @getOnePageButtonFkChoose="getOnePageButtonFkChoose"
            @alertOneTableRowData="alertOneTableRowData"
            @returnOneTableData="returnOneTableData"
          >
            <div
              slot="MatchOperate"
              class="form_button"
            >
              <!-- 添加搭配 -->
              <button
                class="white"
                @click="addGroup"
              >
                {{ vmI18n.t("btn.add_collocation") }}
              </button>
              <!-- 删除搭配 -->
              <button
                class="white"
                @click="removeGroup"
              >
                {{ vmI18n.t("btn.delete_collocation") }}
              </button>
            </div>
          </detailtabs>
        </div>
      </div>
      <!--非搭配 选择商品方式 商品列表-->
      <div class="row" v-if="!onlyShowRules && !showPdtsArr">
        <div class="form_label">
          {{ vmI18n.t("other.product_list") }}：
        </div>
        <div class="form_content">
          <detailtable
            :t-columns="columns"
            :t-data="productslistView.data"
            :total="productslistView.total"
            :module-mode="moduleMode"
            :itemdata="itemdata"
            :current="productslistView.current"
            :page-size="productslistView.pageSize"
            @deleteRowData="deleteRowData"
            @on-page-change="pageChange"
            @on-page-size-change="onPageSizeChange"
            @alertRowData="alertRowData"
          >
            <div
              slot="action"
              class="form_button"
            >
              <ButtonFkDialog
                :itemdata="itemdataFk"
                @getFkChooseItem="getButtonFkChoose"
              />
              <!-- 新增 -->
              <button
                class="white"
                @click="addRowData"
              >
                {{ vmI18n.t("btn.add") }}
              </button>
              <!-- 导入 -->
              <button
                class="white"
                @click="importData"
              >
                {{ vmI18n.t("btn.import") }}
              </button>
            </div>
          </detailtable>
        </div>
      </div>
    </div>
    <!--满足条件-->
    <div
      v-if="showRulesContent"
      class="row"
    >
      <div class="form_label">
        <i class="red">*</i>{{ vmI18n.t("form_label.meet_conditions") }}：
      </div>
      <div class="form_content">
        <CTSIT
          v-for="(rule, _index) in infoData.rules"
          v-show="showRules(_index, rule)"
          :key="_index"
          :rule="rule"
          :only-show-rules="onlyShowRules"
        />
      </div>
    </div>
    <!--导入组件-->
    <div v-if="show_dialog">
      <Modal
        v-model="show_dialog"
        class="dialog"
        :footer-hide="dialogSet.footerHide"
        :title="dialogSet.dialogTitle"
        :mask="dialogSet.mask"
      >
        <component
          :is="currentView"
          :ref="popDialog"
          :component-data="dialogModal"
          @returnData="returnData"
        />
      </Modal>
    </div>
  </div>
</template>
<script>
  import info_set from '@/js/pages/promotionCenter/details/infoSet.js';

  export default info_set;
</script>

<style lang="less">
@import "./../less/common.less";
@import "~@/css/pages/promotionCenter/details/infoSet.less";
</style>
