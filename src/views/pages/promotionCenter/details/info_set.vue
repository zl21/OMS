<!-- 条件设置-->
<template>
  <div class="infoSet">
    <div class="title">
      <i class="iconfontPromotion iconliuchengtiaojian" />
      <!-- <span>条件信息设置</span>  -->
      <span>{{ vmI18n.t("other.info_set") }}</span>
    </div>
    <div v-if="!onlyShowRules">
      <!--商品参与方式-->
      <div class="row">
        <div class="form_label">
          <i class="red">*</i
          >{{ vmI18n.t("form_label.goods_participation_mode") }}：
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
      <div class="row">
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
      <div class="row">
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
      <!--搭配 选择商品方式 商品列表-->
      <div v-if="showPdtsArr" class="row">
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
            <div slot="MatchOperate" class="form_button">
              <!-- 添加搭配 -->
              <button class="white" @click="addGroup">
                {{ vmI18n.t("btn.add_collocation") }}
              </button>
              <!-- 删除搭配 -->
              <button class="white" @click="removeGroup">
                {{ vmI18n.t("btn.delete_collocation") }}
              </button>
            </div>
          </detailtabs>
        </div>
      </div>
      <!--非搭配 选择商品方式 商品列表-->
      <div v-if="!showPdtsArr" class="row">
        <div class="form_label">{{ vmI18n.t("other.product_list") }}：</div>
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
            <div slot="action" class="form_button">
              <ButtonFkDialog
                :itemdata="itemdataFk"
                @getFkChooseItem="getButtonFkChoose"
              />
              <!-- 新增 -->
              <button class="white" @click="addRowData">
                {{ vmI18n.t("btn.add") }}
              </button>
              <!-- 导入 -->
              <button class="white" @click="importData">
                {{ vmI18n.t("btn.import") }}
              </button>
            </div>
          </detailtable>
        </div>
      </div>
    </div>
    <!--满足条件-->
    <div v-if="showRulesContent" class="row">
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
  import info_set from "@/js/pages/promotionCenter/details/info_set.js";
  export default info_set;
</script>

<style lang="less">
@import "./../less/common.less";
@lineHeight: 24px;
@inputWidth: 400px;
@fontSize: 12px;
.infoSet {
  padding: 10px;
  border: 3px solid rgb(235, 235, 235);
  .title {
    i {
      font-size: 36px;
      color: rgb(236, 110, 78);
    }
    > span {
      line-height: 36px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .row {
    margin: 20px 0px;
    display: flex;
    .form_label {
      text-align: center;
      display: inline-block;
      font-size: 12px;
      width: 150px;
      height: 100%;
      line-height: @lineHeight;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-input {
      label.title {
        width: 90px;
        text-align: center;
      }
      .input-wrap {
        .input-inner {
          width: 300px;
          .el-input {
            width: 300px;
            font-size: @fontSize;
            .el-input__inner {
              font-size: @fontSize;
              border-radius: 2px;
              height: @lineHeight;
              line-height: @lineHeight;
              padding: 0 5px;
            }
          }
        }
      }
      .el-select {
        width: 300px;
        .el-input {
          font-size: 12px;
          .el-input__inner {
            font-size: @fontSize;
            height: @lineHeight;
            line-height: @lineHeight;
            border-radius: 2px;
          }
        }
      }
    }
    .table-input {
      width: 300px;
      .el-input {
        font-size: 12px;
        .el-input__inner {
          text-align: left;
          font-size: @fontSize;
          height: @lineHeight;
          line-height: @lineHeight;
          border-radius: 2px;
        }
      }
    }
    .burgeon-date-picker {
      .burgeon-date-picker-rel {
        .burgeon-input-wrapper {
          .burgeon-input-icon-normal + .burgeon-input {
            padding: 0;
          }
        }
      }
    }
    .form_content {
      height: 100%;
      line-height: @lineHeight;
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 150px);
      .form_item {
        display: inline;
      }
      .form_el_input {
        width: @inputWidth;
        height: 100%;
        input {
          width: calc(100% - 10px);
          height: 100%;
          padding: 0 5px;
          border-radius: 2px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
        }
      }
    }
    .form_button {
      padding: 5px;
      display: flex;
      justify-content: flex-end;
      text-align: right;
      > button {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border: 1px solid #fd6442;
        font-size: 12px;
        background: #fff;
        color: #fd6442;
        border-radius: 2px;
        margin-right: 5px;
      }
    }
    .red {
      padding: 5px;
      color: red;
    }
  }
}
</style>
