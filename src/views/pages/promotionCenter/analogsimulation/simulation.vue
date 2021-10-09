<!--  一商模拟仿真   -->
<template>
  <div class="simulation">
    <div class="operation_btn">
      <button
        class="btn"
        @click="cancel_simulation"
      >
        {{ vmI18n.t("common.cancel") }}
      </button>
      <button
        class="btn"
        @click="execute_simulation"
      >
        {{ vmI18n.t("btn.simulation_trial_calculation") }}
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
                >
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
                <input
                  v-model="basicData.vendor_remark"
                  placeholder
                >
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
                <input
                  v-model="basicData.buyer_message"
                  placeholder
                >
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
            @blurRowData="blurRowData"
          >
            <div
              slot="action"
              class="button_list"
            >
              <ButtonFkDialog
                ref="simuFkdialog"
                :itemdata="itemdataFk"
                @getFkChooseItem="getButtonFkChoose"
              />
              <button
                class="btn"
                @click="add_prolist"
              >
                <!-- 新增 -->
                {{ vmI18n.t("btn.add") }}
              </button>
              <!-- <button class="btn" @click="importData">
                
                {{ vmI18n.t("btn.import") }}
              </button> -->
            </div>
          </detailtable>
        </div>
      </div>
      <div class="execute_result">
        <div class="header_title">
          <i class="header_name">
            <!-- 试算执行结果 -->
            {{ vmI18n.t("other.trialCalculation_results") }}</i>
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
  import simulation from '@/js/pages/promotionCenter/analogsimulation/simulation';

  export default simulation;
</script>
<style lang="less">
@import "../less/common.less";
@import "~@burgeon/oms-theme/skin/public.less";
@import "~@/css/pages/promotionCenter/analogsimulation/simulation.less";
</style>
