<!-- 赠品设置 -->
<template>
  <div class="giftSet">
    <div class="title">
      <i class="iconfontPromotion iconzengpin" />
      <!-- <span>赠品信息设置</span> -->
      <span>{{ vmI18n.t("other.gift_set") }}</span>
    </div>
    <!--阶梯类型-->
    <div v-if="showPdtsArr" class="row">
      <div class="form_label">{{ vmI18n.t("form_label.ladderType") }}：</div>
      <div class="form_content">
        <SingleBox
          :value="giftData.steps_type"
          :options="groups.stepsType"
          @changeSingle="checkStepsTypeChange"
        />
      </div>
    </div>
    <!--赠品翻倍-->
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>{{ vmI18n.t("form_label.double_gifts") }}：
      </div>
      <div class="form_content">
        <SingleBox
          :value="giftData.gift_doubles"
          :options="groups.giftDoubles"
          @changeSingle="checkGiftDoublesChange"
        />
        <div class="form_item">
          ,{{ vmI18n.t("form_label.max_doubling_times") }}
        </div>
        <div class="form_el_input form_item limitinput">
          <input
            v-model="giftData.max_doubles_limits"
            oninput="this.value= this.value.match(/^[1-9]\d{0,2}/) ? this.value.match(/^[1-9]\d{0,2}/)[0] : ''"
            placeholder
          />
        </div>
      </div>
    </div>
    <!--赠送方式-->
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>{{ vmI18n.t("form_label.giving_ways") }}：
      </div>
      <div class="form_content">
        <SingleBox
          :value="giftData.gift_methods"
          :options="groups.giftMethods"
          @changeSingle="checkGiftMethodsChange"
        />
      </div>
    </div>
    <!--梯度-->
    <div v-if="showPdtsArr" class="row">
      <!-- 赠品列表： -->
      <div class="form_label">{{ vmI18n.t("other.gift_list") }}：</div>
      <div class="form_content">
        <detailtabs
          :current.sync="currentTab"
          :columns="columns"
          :products-arrs="giftData.gift_productsArrs"
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
            <button class="white" @click="addSteps">
              <!-- 添加阶梯 -->
              { vmI18n.t("btn.add_ladder") }}
            </button>
            <button class="white" @click="removeSteps">
              <!-- 删除阶梯 -->
              {{ vmI18n.t("btn.delete_ladder") }}
            </button>
          </div>
        </detailtabs>
      </div>
    </div>
    <!--非梯度-->
    <div v-if="!showPdtsArr" class="row">
      <div class="form_label">
        <!-- 赠品列表 -->
        <i class="red">*</i>{{ vmI18n.t("other.gift_list") }}：
      </div>
      <div class="form_content">
        <detailtable
          :t-columns="columns"
          :t-data="productslistView.data"
          :total="productslistView.total"
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
            <button class="white" @click="addRowData">
              {{ vmI18n.t("btn.add") }}
            </button>
            <button class="white" @click="importData">
              {{ vmI18n.t("btn.import") }}
            </button>
          </div>
        </detailtable>
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
  import gift_set from "@/js/pages/promotionCenter/details/gift_set.js";
  export default gift_set;
</script>
<style lang="less">
@import "./../less/common.less";
@lineHeight: 24px;
@inputWidth: 400px;
@fontSize: 12px;
.giftSet {
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
        //text-align: center;
      }
      .input-wrap {
        .input-inner {
          width: 300px;
          .el-input {
            width: 300px;
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
        display: inline-block;
      }
      .limitinput {
        width: 60px !important;
      }
      .form_el_input {
        width: @inputWidth;
        line-height: @lineHeight;
        height: @lineHeight;
        input {
          width: calc(100% - 10px);
          height: 100%;
          padding: 0 5px;
          border-radius: 2px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
        }
      }
      .table-input {
        width: 300px;
        .el-input {
          font-size: 12px;
          .el-input__inner {
            font-size: @fontSize;
            height: @lineHeight;
            line-height: @lineHeight;
            border-radius: 2px;
            text-align: left;
          }
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
