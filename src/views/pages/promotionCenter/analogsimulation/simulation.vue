<!--  一商模拟仿真   -->
<template>
  <div class="simulation">
    <div class="operation_btn">
      <button class="btn" @click="cancel_simulation">
        {{ vmI18n.t("common.cancel") }}
      </button>
      <button class="btn" @click="execute_simulation">
        {{ vmI18n.t("common.simulation_trial_calculation") }}
      </button>
    </div>
    <div class="content">
      <div class="orderSet">
        <div class="header_title">
          <i class="header_name">
            <!-- 模拟订单设置 -->
            {{ vmI18n.t("other.simulation_order_setup") }}
          </i>
        </div>
        <div class="formList">
          <div class="row storeName">
            <my-input
              :is-active="basicData.stores.isActive"
              :is-disabled="basicData.stores.isdisabled"
              :itemdata="basicData.stores.itemdata"
            />
          </div>
          <div class="row">
            <div class="form_label">
              <!-- 时间类型 -->
              <i class="red">*</i> {{ vmI18n.t("form_label.timeType") }}：
            </div>
            <div class="form_content">
              <SingleBox
                :value="basicData.time_type"
                :options="groups.timeTypes"
                @changeSingle="checkTimeTypeChange"
              />
              <div class="form_item">
                <!-- 时间范围 -->
                <i class="red">*</i>{{ vmI18n.t("form_label.timeRange") }}：
                <DatePicker
                  v-model="basicData.time_limit"
                  format="yyyy/MM/dd HH:mm:ss"
                  type="datetime"
                  placeholder=""
                  style="width: 200px"
                  @on-change="handleTimeLimitChange"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <!-- 订单类型 -->
              <i class="red">*</i>{{ vmI18n.t("form_label.orderType") }}：
            </div>
            <div class="form_content">
              <SingleBox
                :value="basicData.order_list"
                :options="groups.orderTypes"
                @changeSingle="checkOrderTypeChange"
              />
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <!-- 平台标记 -->
              <i class="red" />{{ vmI18n.t("form_label.platform_marking") }}：
            </div>
            <div class="form_content">
              <SingleBox
                :value="basicData.platform_mark"
                :options="groups.platformTabs"
                @changeSingle="checkPlatformChange"
              />
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <!-- 购买排名 -->
              <i class="red" />{{ vmI18n.t("form_label.purchase_ranking") }}：
            </div>
            <div class="form_content">
              <div class="form_el_input">
                <input
                  v-model="basicData.buy_ranking"
                  placeholder
                  @keyup="
                    basicData.buy_ranking =
                      basicData.buy_ranking.length === 1
                        ? basicData.buy_ranking.replace(/[^1-9]/g, '')
                        : basicData.buy_ranking.replace(/\D/g, '')
                  "
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <!-- 卖家备注 -->
              <i class="red" />{{ vmI18n.t("form_label.sellerNotes") }}：
            </div>
            <div class="form_content">
              <div class="form_el_input">
                <input v-model="basicData.vendor_remark" placeholder />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="form_label">
              <!-- 买家留言 -->
              <i class="red" />{{ vmI18n.t("form_label.buyer_message") }}：
            </div>
            <div class="form_content">
              <div class="form_el_input">
                <input v-model="basicData.buyer_message" placeholder />
              </div>
            </div>
          </div>
          <div class="row storeName">
            <my-input
              :is-active="basicData.receiving_porvince.isActive"
              :is-disabled="basicData.receiving_porvince.isdisabled"
              :itemdata="basicData.receiving_porvince.itemdata"
            />
          </div>
        </div>
        <div class="products_list">
          <div class="header_title">
            <!-- 商品列表 -->
            <i class="header_name">{{ vmI18n.t("other.product_list") }}</i>
          </div>
          <!-- <div class="button_list">
                    <button class="btn add" @click="add_prolist">新增</button>
                    <button class="btn lead">导入</button>
                </div> -->
          <detailtable
            :t-columns="products_columns"
            :itemdata="itemdata"
            :is-object="itemdata.isObject"
            :t-data="productslistView.data"
            :total="productslistView.total"
            :current="productslistView.current"
            :page-size="productslistView.pageSize"
            @deleteRowData="del_prolist"
            @on-page-change="pageChange"
            @on-page-size-change="onPageSizeChange"
            @alertRowData="alertRowData"
          >
            <div slot="action" class="button_list">
              <ButtonFkDialog
                :itemdata="itemdataFk"
                @getFkChooseItem="getButtonFkChoose"
              />
              <button class="btn" @click="add_prolist">
                <!-- 新增 -->
                {{ vmI18n.t("btn.add") }}
              </button>
              <button class="btn">
                <!-- 导入 -->
                {{ vmI18n.t("btn.import") }}
              </button>
            </div>
          </detailtable>
        </div>
      </div>
      <div class="execute_result">
        <div class="header_title">
          <i class="header_name">
            <!-- 试算执行结果 -->
            {{ vmI18n.t("other.trialCalculation_results") }}</i
          >
        </div>
        <div class="table">
          <Table
            :columns="result_columns"
            :data="result_data"
            :tree-props="treePropsData"
            :col-row-method="mergeCells"
            border
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import simulation from "@/js/pages/promotionCenter/analogsimulation/simulation";
export default simulation;
</script>
<style lang="less">
@import "../less/common.less";
@import "~@burgeon/oms-theme/skin/public.less";
@inputWidth: 410px;
// @publicColor: #0068b7;
@bgColr: #fff6f6;
@bgColor: #fff;
.simulation {
  height: 100%;
  position: relative;
  padding-top: 70px;

  /deep/ .ark-table {
    td {
      height: 29px;
    }
    .ark-table-cell-ellipsis {
      input {
        border-radius: 2px;
        border: 1px solid #dcdfe6;
        height: @lineHeight;
        padding: 0 15px;
        text-align: inherit;
      }

      .ark-btn {
        height: @lineHeight;
        padding: 0 21px;
        color: #575757 !important;
        &:hover {
          color: @button-transparent-hover !important;
          border-color: @button-transparent-hover;
        }
      }
    }
  }
  .operation_btn {
    position: absolute;
    top: 10px;
    text-align: left;
    background: @base-bg;
    padding: 10px 20px;
    width: 100%;
    box-sizing: border-box;
    z-index: 101;
    border: 1px solid @base-border;
    .btn {
      font-size: 12px;
      color: @base-color;
      border: 1px solid @base-color;
      padding: 0px 8px;
      border-radius: 2px;
      height: 24px;
      line-height: 24px;
      background: @bgColor;
    }
  }
  .content {
    height: 100%;
    overflow: scroll;
    .orderSet {
      border: 1px solid #bebebe;
      padding: 10px;
      margin: 20px 0 20px;
      position: relative;
      .header_title {
        display: inline-block;
        position: absolute;
        top: -9px;
        left: 12px;
        .header_name {
          font-size: 18px;
          font-style: normal;
          padding: 0 5px;
          background: #fff;
        }
      }
    }
    .formList {
      width: 80%;
      .row {
        margin: 20px 0px;
        .form_label {
          text-align: right;
          display: inline-block;
          font-size: 12px;
          width: 90px;
          height: 100%;
          line-height: 28px;
          padding: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
        .form_content {
          min-height: 24px;
          line-height: @lineHeight;
          display: inline-block;
          vertical-align: top;
          width: calc(100% - 94px);
          .form_item {
            display: inline;
          }
          .form_el_input {
            width: @inputWidth;
            height: 100%;
            input {
              width: 100%;
              height: 24px;
              padding: 0 5px;
              border-radius: 2px;
              border: 1px solid #dcdfe6;
              margin: 2px 0;
              box-sizing: border-box;
            }
          }
          .burgeon-input {
            box-sizing: border-box;
          }
          .burgeon-radio-wrapper {
            padding: 5px 0;
          }
        }
      }
      .storeName {
        width: 500px;
        .el-autocomplete {
          width: 100%;
          height: 100%;
          .el-input {
            width: 100%;
            height: 100%;
            input {
              font-size: 12px;
              width: 100%;
              height: calc(100% - 1px);
              background: #fff;
              color: #2c3e50;
            }
          }
        }
        .item-input {
          line-height: 25px;
          height: 25px;
        }
        .item-input label.title {
          width: 90px;
          text-align: center;
        }
        .item-input label i {
          font-size: 12px;
          top: 0;
          right: 0;
        }
      }
      .timeScope {
        padding-left: 74px;
        position: relative;
        box-sizing: border-box;
        .query_titile {
          font-size: 12px;
          width: 60px;
          display: inline-block;
          font-style: normal;
          text-align: right;
          padding-right: 6px;
          line-height: 34px;
          position: absolute;
          left: 8px;
        }
        input {
          height: 100%;
        }
        .el-input__suffix {
          .el-input__icon {
            top: 10px;
          }
        }
      }
    }
    .products_list {
      border: 1px solid #bebebe;
      width: 90%;
      margin-left: 30px;
      padding: 20px;
      box-sizing: border-box;
      position: relative;
      table tr td .item-input .input-wrap .input-inner p.mop {
        right: 16px;
      }
      .header_title {
        display: inline-block;
        position: absolute;
        top: -7px;
        left: 12px;
        .header_name {
          font-size: 14px;
          font-style: normal;
          padding: 0 5px;
          background: #fff;
        }
      }
      .button_list {
        margin-bottom: 15px;
        text-align: right;
        .btn {
          font-size: 12px;
          color: @base-color;
          border: 1px solid @base-color;
          padding: 0px 8px;
          border-radius: 2px;
          height: 24px;
          line-height: 24px;
          background: @bgColor;
        }
      }
      .page_content {
        .page-allSizes {
          line-height: 24px;
        }
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
      .table-input {
        .el-input {
          width: 300px;
          font-size: @fontSize;
          .el-input__inner {
            text-align: left;
            font-size: @fontSize;
            border-radius: 2px;
            height: @lineHeight;
            line-height: @lineHeight;
            padding: 0 15px;
          }
        }
      }
    }
    .execute_result {
      border: 1px solid #bebebe;
      padding: 20px;
      margin: 20px 0 20px;
      position: relative;
      min-height: 200px;
      .header_title {
        display: inline-block;
        position: absolute;
        top: -9px;
        left: 12px;
        .header_name {
          font-size: 18px;
          font-style: normal;
          padding: 0 5px;
          background: #fff;
        }
      }
      .table {
        width: 90%;
        margin-left: 30px;
      }
    }
    .red {
      padding: 5px;
      color: red;
    }
    .buttonFk {
      display: inline-block;
      button {
        margin-right: 0 !important;
      }
    }
  }
}
</style>
