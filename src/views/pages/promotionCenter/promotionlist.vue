<template>
  <div v-loading="loadings" class="promactiqueryList">
    <div style="height: 132px">
      <!-- 按钮 -->
      <div class="head_botton">
        <button class="white" @click="getData">
          <!-- <i class="burgeon-icon burgeon-icon-ios-search" /> -->
          <!-- 查找 -->
          {{ vmI18n.t("btn.find") }}
        </button>
        <button class="white" @click="Reset">
          <!-- <i class="burgeon-icon burgeon-icon-ios-refresh" /> -->
          <!-- 重置 -->
          {{ vmI18n.t("btn.reset") }}
        </button>
        <button class="white" @click="promotionClick">
          {{ vmI18n.t("btn.add") }}
        </button>
        <button class="white" @click="promotionBlukClick">
          {{ vmI18n.t("btn.batch_add") }}
        </button>
        <button class="white" @click="publish">
          {{ vmI18n.t("btn.publish") }}
        </button>
        <button class="white" @click="actOffline">
          {{ vmI18n.t("btn.offline") }}
        </button>
        <button class="white" @click="copy">
          {{ vmI18n.t("common.copy") }}
        </button>
        <button class="white" @click="deleteActi">
          {{ vmI18n.t("btn.delete") }}
        </button>
        <button class="white" @click="setGroup">
          {{ vmI18n.t("btn.set_groups") }}
        </button>
        <button class="white" @click="simulation">
          {{ vmI18n.t("btn.simulation") }}
        </button>
        <Favorite />
      </div>
      <!-- 过滤器 -->
      <div class="body_select_three">
        <!--促销编号--->
        <div class="item_three_1">
          <span>
            <i class="query_titile"
              >{{ vmI18n.t("form_label.promotionNo") }}:</i
            >
            <input
              v-model="acti_no"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            />
          </span>
        </div>
        <!-- 活动日期 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile"
              >{{ vmI18n.t("form_label.activityDate") }}:</i
            >
            <el-date-picker
              v-model="acti_date"
              class="M_date_clas"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              type="daterange"
              :placeholder="vmI18n.t('pHolder.a1')"
            />
          </span>
        </div>
        <!-- 活动名称 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile"
              >{{ vmI18n.t("form_label.activityName") }}:</i
            >
            <input
              v-model="acti_name"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            />
          </span>
        </div>
        <!-- 线下门店 -->
        <!-- <div class="item_three_1">
          <myInputLd :isActive="true" :isDisabled="false" :itemdata="my_input_st.itemdata"></myInputLd>
        </div>-->
        <!-- 线上门店 -->
        <div class="item_three_1">
          <TableInput
            :is-active="true"
            :is-disabled="false"
            :itemdata="my_input_sh.itemdata"
          />
        </div>
        <!-- 商品 -->
        <div class="item_three_1">
          <span>
            <i class="query_titile">{{ vmI18n.t("other.goods") }}:</i>
            <TableInput
              style="width: calc(100% - 60px)"
              :is-active="true"
              :isdisabled="false"
              :itemdata="product.itemdata_xitong"
              :has-label="false"
              :is-promotion="true"
            />
          </span>
        </div>
        <!-- 分组-->
        <div class="item_three_1">
          <span>
            <i class="query_titile">{{ vmI18n.t("table_label.grouping") }}:</i>
            <input
              v-model="acti_group"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            />
          </span>
        </div>
        <!--操作人-->
        <div class="item_three_1">
          <span>
            <i class="query_titile">{{ vmI18n.t("form_label.operator") }}:</i>
            <input
              v-model="release_name"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            />
          </span>
        </div>
        <!--促销状态-->
        <div class="item_three_1">
          <span>
            <i class="query_titile"
              >{{ vmI18n.t("form_label.promotion_status") }}:</i
            >
            <div class="query_select">
              <Select v-model="STATUS" multiple>
                <Option
                  v-for="item in diStatusArr"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </span>
        </div>
        <!-- <div class="item_three_1" />
        <div class="item_three_1" />
        <div class="item_three_1" /> -->

        <!-- 搜索按钮 -->
        <div class="item_three_1 button-right"></div>
      </div>
    </div>
    <!-- 列表部分 -->
    <div class="main_body">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane :label="tabTotal.one" name="1">
          <!-- hasNation 是否自动计算序号 -->
          <aTable
            ref="agGridChild1"
            :ag-table-config="agTableConfig1"
            @on-page-change="pageChange1"
            @on-page-size-change="pageSizeChange1"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane :label="tabTotal.two" name="2">
          <aTable
            ref="agGridChild2"
            :ag-table-config="agTableConfig2"
            @on-page-change="pageChange2"
            @on-page-size-change="pageSizeChange2"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane :label="tabTotal.three" name="3">
          <aTable
            ref="agGridChild3"
            :ag-table-config="agTableConfig3"
            @on-page-change="pageChange3"
            @on-page-size-change="pageSizeChange3"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane :label="tabTotal.four" name="4">
          <aTable
            ref="agGridChild4"
            :ag-table-config="agTableConfig4"
            @on-page-change="pageChange4"
            @on-page-size-change="pageSizeChange4"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="promactiIcon">
      <div class="legend">
        <!-- 图例 -->
        <span style="font-weight: bold">{{ vmI18n.t("other.legend") }}:</span>
        <p>
          <!-- 提交状态 -->
          <span>{{ vmI18n.t("other.submission_status") }}:&nbsp;</span>
          <!-- 已发布 -->
          <button class="color-blue">
            {{ vmI18n.t("form_label.published") }}
          </button>
        </p>
        other
        <p>
          <!-- 草稿状态 -->
          <span>{{ vmI18n.t("other.draft_status") }}:&nbsp;</span>
          <!-- 草稿 -->
          <button class="color-italic-black">
            {{ vmI18n.t("btn.draft") }}
          </button>
        </p>
        <p>
          <!-- 下线/过期状态 -->
          <span>{{ vmI18n.t("other.offline_expired_status") }}:&nbsp;</span>
          <!-- 下线 -->
          <button class="color-italic-grey">
            {{ vmI18n.t("btn.offline") }}
          </button>
          <!-- 过期 -->
          <button class="color-italic-grey">
            {{ vmI18n.t("btn.overdue") }}
          </button>
        </p>
      </div>
    </div>
    <div />
    <Mydialog
      v-if="dataError.show"
      :title="dataError.title"
      :visible.sync="dataError.show"
      :show-close="false"
      class="messageDialog"
      :close-on-click-modal="false"
      :class="dataError.type"
    >
      <errorMessage
        :error-message="dataError.errorList"
        :dialog-back="dataError.backBtn"
        :dialog-class="dataError.type"
        @refreshbizlines="errorDialogClose"
      />
    </Mydialog>
    <dialogVisible
      :dialog-visible="dialog_visible"
      :check-list="checkList"
      :set-group-table-data="setGroupTableData"
      @closeDialog="closeDialog"
    />
    <!-- 查看日志弹框 -->
    <Modal v-model="modal">
      <Table :columns="logData.columns" :data="logData.data" :height="300" />
      <div slot="footer">
        <!-- 关闭 -->
        <Button type="error" @click="closeModal">
          {{ vmI18n.t("common.close") }}
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import promotionlist from "@/js/pages/promotionCenter/promotionlist";
  export default promotionlist;
</script>
<style lang="less">
@import "~@/assets/css/css_1_3/datepicker";
.promactiqueryList {
  display: flex;
  flex-direction: column;
  height: 100%;
  .overall {
    width: 300px;
    text-align: center;
    h1 {
      font-size: 12px;
      color: #e80000;
      text-align: left;
      padding-bottom: 10px;
    }
    p {
      margin-bottom: 7px;
      color: red;
      font-size: 12px;
      line-height: 16px;
    }
    .selectcomp {
      display: flex;
      padding: 0 18px;
      justify-content: flex-start;
      .title {
        font-size: 12px;
      }
      .item-select {
        width: calc(~"100% - 57px");
        .el-input__inner {
          width: 100%;
        }
      }
    }
  }
  .btn_overall {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 7px;
    button {
      box-sizing: border-box;
      height: 24px;
      width: auto;
      margin-right: 8px;
      margin-left: 0px;
      padding: 0 8px;
      background: #fff;
      color: #fd6442;
      border: 1px solid #fd6442;
      border-radius: 2px;
      font-size: 12px;
      &:hover {
        border-color: rgba(253, 100, 66, 0.6);
        color: rgba(253, 100, 66, 0.6);
      }
    }
  }
  .head_botton {
    font-size: 0;
    margin: 9px 0;
    button {
      height: 24px;
      min-width: 50px;
      line-height: 24px;
      padding: 0 8px;
      border: 1px solid #fd6442;
      font-size: 12px;
      background: #fff;
      color: #fd6442;
      border-radius: 2px;
      margin-right: 5px;
      margin-bottom: 4px;
    }
    .active {
      background: #fd6442;
      color: #fff;
      margin-right: 8px;
    }
  }
  .body_select_three {
    box-sizing: border-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -ms-flex-align: center;
    align-items: center;
    border: 1px solid #e7e7e7;
    font-size: 12px;
    margin: 10px 0px;
    padding: 3px 0;

    .item_three_1 {
      box-sizing: border-box;
      -ms-flex: 1 1 24%;
      width: 25%;
      padding: 5px;
      color: #575757;
      .title {
        width: 60px;
      }
      .input-wrap {
        input {
          height: 24px;
          background-color: #fff;
          border-radius: 0 2px 2px 0;
        }
        .popover-icon {
          color: #0f8ee9;
          font-size: 14px;
        }
      }
      span {
        display: flex;
        align-items: center;
        color: #575757;
        .el-date-editor {
          .el-range-input {
            font-size: 12px;
          }
        }
        .query_titile {
          width: 60px;
          display: block;
          font-style: normal;
          text-align: right;
          padding-right: 6px;
        }
        .query_select {
          width: calc(100% - 60px);
        }
        input {
          background: #fff;
        }
        .pure_text {
          border-radius: 2px;
          border: 1px solid #dcdfe6;
          text-indent: 5px;
          height: 24px;
        }
        b {
          color: #f50505;
        }
      }
      .el-autocomplete {
        width: 100%;
        .el-input {
          font-size: 12px;
          width: 100%;
        }
      }
      .ff-current-user-box {
        width: 100%;
        input {
          width: 100%;
          line-height: 24px;
        }
        .iconres {
          border: none;
          height: 15px;
          top: 5px;
          right: 3px;
        }
      }
      .dialog-select.selectcomp {
        width: 100%;
      }
      .my-input {
        width: 100%;
        .title {
          width: 56px;
          display: flex;
          align-items: center;
        }
        .el-autocomplete,
        .el-dropdown {
          width: 100%;
        }
        .el-input__inner {
          height: 24px;
          padding: 0 4px;
          font-size: 12px;
          &:hover,
          &:focus {
            border-color: #bfcbd9;
          }
          .el-autocomplete {
            width: 100%;
          }
        }
        .popover-icon {
          i {
            color: #0f8ee9;
          }
        }
      }
      .M_date_clas {
        border: 1px solid #dcdfe6;
        width: calc(100% - 60px);
        border-radius: 2px;
        .el-input__inner {
          height: 24px;
          line-height: 24px;
          padding: 0 4px;
        }
        .el-input__icon.el-icon-date {
          color: #0f8ee9;
        }
      }
      .item-select {
        .el-input__inner {
          width: 100%;
          height: 24px;
          line-height: 22px;
        }
      }
      .burgeon-btn-posdefault {
        display: inline-flex;
        span {
          color: white;
        }
      }
    }
    .button-right {
      display: none;
    }
  }
  .main_body {
    flex: 20;
    display: flex;
    flex-direction: column;
    // margin-bottom: 10px;
    // margin-top: 20px;
    position: relative;
    overflow: inherit;
    .el-tabs--border-card > .el-tabs__header .el-tabs__item {
      margin-top: 2px;
    }
    .el-tabs--border-card
      > .el-tabs__header
      .el-tabs__item:not(.is-disabled):hover {
      color: #fd6442;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      border-top: 1px solid #ddd;
      border-radius: 3px;
      color: #fd6442;
    }
    .el-tabs--border-card > .el-tabs__header {
      background-color: #fff;
    }
    .el-tabs--border-card {
      background: #fff;
      border: 0;
      -webkit-box-shadow: 0 0 0 0;
      box-shadow: 0 0 0 0;
    }
    .el-tabs__content {
      padding: 0;
      border: 1px solid #e4e7ed;
      border-top: none;
    }
  }
  /*.main_body_card {*/
  /*flex: 1;*/
  /*display: flex;*/
  /*flex-direction: column;*/

  /*.el-tabs--card {*/
  /*.el-tabs__header {*/
  /*margin: 0 !important;*/
  /*}*/
  /*}*/
  /*&.border {*/
  /*border: 1px solid #d4d4d4;*/
  /*border-top: 0;*/
  /*}*/
  /*}*/
  .evaluate_body {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    position: relative;
    padding: 0 12px;
  }
  .evaluate_body_pagination {
    padding: 10px 0 10px 10px;
    display: flex;
    .el-pagination {
      flex: inherit;
    }
    .exportprofititem {
      font-size: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;
      color: #20a0ff;
    }
  }
  .evaluate_table_centen {
    overflow-x: auto;
    overflow-y: auto;
    width: 100%;
    position: relative;
    font-size: 12px;
    height: 100%;
    &.border {
      border: 1px solid #d4d4d4;
    }
  }
  .evaluate_table_top {
    height: 27px;
    overflow: hidden;
    display: inline-block;
    float: left;
    min-width: 100%;
    tbody {
      display: inline-block;
      min-width: 100%;
      border-bottom: 1px solid #d8d8d8;
      background-color: #f5f6fa;
      padding-left: 10px;
    }
    tr {
      height: 27px;
    }
    td {
      word-break: keep-all;
      white-space: nowrap;
      padding: 3px 5px;
      min-width: 120px;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: nowrap;
      text-align: left;
      padding-left: 8px;
      span {
        position: relative;
      }
      i {
        position: absolute;
        cursor: pointer;
        font-size: 20px;
      }
      i:first-child {
        top: 1px;
        left: -6px;
        color: #97a8be;
      }
      i:last-child {
        bottom: 0px;
        left: -6px;
        color: #97a8be;
      }
      i.active {
        color: #48576a;
      }
    }
    input {
      position: relative;
      top: 2px;
      margin-right: 2px;
    }
    .copy_tr {
      position: relative;
      z-index: -1;
      i {
        position: relative;
        top: 0;
        left: 0;
        font-size: 12px;
        color: #0f8ee9;
      }
    }
  }
  .evaluate_table_div {
    overflow-x: auto;
    overflow-y: auto;
    z-index: 9;
    min-height: 27px;
    flex: 1;
    margin-top: 27px;
    display: flex;
    flex-direction: column;
    height: calc(~"100% - 27px");
  }
  .evaluate_table_bottom {
    margin-bottom: 20px;
    position: relative;
    z-index: 2;
    background: #fff;
    font-size: 12px;
    display: inline-block;
    min-width: 100%;
    tr {
      border-bottom: 1px solid #d8d8d8;
      min-width: 100%;
      display: inline-block;
      padding-left: 10px;
    }
    td {
      word-break: keep-all;
      white-space: nowrap;
      padding: 3px 5px;
      min-width: 120px;
      max-width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: nowrap;
      text-align: left;
      padding-left: 8px;
      i {
        cursor: pointer;
        font-size: 12px;
        color: #0f8ee9;
      }
    }
    input {
      position: relative;
      top: 2px;
      margin-right: 5px;
    }
    tr:hover {
      background: #f8f7f7;
    }
  }
  .EvaluationDetails {
    min-width: 250px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 250px;
  }
}
</style>
<style lang="less">
.promactiqueryList {
  .el-tabs__item {
    height: 32px;
    line-height: 32px;
    color: #575757;
  }
  .el-tabs.el-tabs--card {
    display: flex;
    flex-direction: column;
    flex: 1;
    .el-tabs__content {
      display: flex;
      flex-direction: column;
      flex: 1;
      .el-tab-pane {
        border: 1px solid #d4d4d4;
        border-top: 1px solid #fff;
        display: flex;
        flex: 1;
        flex-direction: column;
      }
      .ff-custom--table {
        margin-right: 0;
      }
      .ff-custom--table .ff-custom--table-content th {
        min-width: 110px;
      }
      .ff-custom--table .ff-custom--table-total table th {
        min-width: 110px;
      }
    }
  }
  .el-tabs__item.is-active {
    color: #fd6442;
  }
  .el-tabs__header {
    margin: 0 !important;
  }
  .el-tabs__nav {
    margin-left: 15px;
    .el-tabs__item {
      font-size: 12px;
      line-height: 28px;
      height: 28px;
    }
  }
}
.promactiIcon {
  height: 20px;
  line-height: 30px;
  display: flex;
  font-size: 10px;
  bottom: 0;
  display: -webkit-box;
  display: -ms-flexbox;
  flex: 1;
  -webkit-box-flex: 15;
  -ms-flex: 15;
  flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  margin-bottom: 10px;
  position: relative;
  > div {
    flex: 1;
  }
  .legend {
    > p {
      display: inline-block;
      button {
        border: 1px solid #575757;
        margin-right: 2px;
        background: white;
        padding: 0px 3px;
      }
      .color-blue {
        color: #00f;
        font-weight: 400;
      }
      .color-italic-grey {
        color: #999;
      }
      .color-italic-black {
        color: #000;
      }
      margin-right: 3px;
    }
  }
}
</style>
