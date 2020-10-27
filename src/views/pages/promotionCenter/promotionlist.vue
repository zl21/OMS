<template>
  <div
    v-loading="loadings"
    class="promactiqueryList"
  >
    <div style="height: 132px">
      <!-- 按钮 -->
      <div class="head_botton">
        <button
          class="white"
          @click="getData"
        >
          <!-- <i class="burgeon-icon burgeon-icon-ios-search" /> -->
          <!-- 查找 -->
          {{ vmI18n.t("btn.find") }}
        </button>
        <button
          class="white"
          @click="Reset"
        >
          <!-- <i class="burgeon-icon burgeon-icon-ios-refresh" /> -->
          <!-- 重置 -->
          {{ vmI18n.t("btn.reset") }}
        </button>
        <button
          class="white"
          @click="promotionClick"
        >
          {{ vmI18n.t("btn.add") }}
        </button>
        <button
          class="white"
          @click="promotionBlukClick"
        >
          {{ vmI18n.t("btn.batch_add") }}
        </button>
        <button
          class="white"
          @click="publish"
        >
          {{ vmI18n.t("btn.publish") }}
        </button>
        <button
          class="white"
          @click="actOffline"
        >
          {{ vmI18n.t("btn.offline") }}
        </button>
        <button
          class="white"
          @click="copy"
        >
          {{ vmI18n.t("common.copy") }}
        </button>
        <button
          class="white"
          @click="deleteActi"
        >
          {{ vmI18n.t("btn.delete") }}
        </button>
        <button
          class="white"
          @click="setGroup"
        >
          {{ vmI18n.t("btn.set_groups") }}
        </button>
        <button
          class="white"
          @click="simulation"
        >
          {{ vmI18n.t("btn.simulation") }}
        </button>
        <Favorite />
      </div>
      <!-- 过滤器 -->
      <div class="body_select_three">
        <!--促销编号--->
        <div class="item_three_1">
          <span>
            <i
              class="query_titile"
            >{{ vmI18n.t("form_label.promotionNo") }}:</i>
            <input
              v-model="acti_no"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            >
          </span>
        </div>
        <!-- 活动日期 -->
        <div class="item_three_1">
          <span>
            <i
              class="query_titile"
            >{{ vmI18n.t("form_label.activityDate") }}:</i>
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
            <i
              class="query_titile"
            >{{ vmI18n.t("form_label.activityName") }}:</i>
            <input
              v-model="acti_name"
              type="text"
              class="pure_text"
              style="width: calc(100% - 60px)"
              @keyup="formUserKeyUp"
            >
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
            >
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
            >
          </span>
        </div>
        <!--促销状态-->
        <div class="item_three_1">
          <span>
            <i
              class="query_titile"
            >{{ vmI18n.t("form_label.promotion_status") }}:</i>
            <div class="query_select">
              <Select
                v-model="STATUS"
                multiple
              >
                <Option
                  v-for="item in diStatusArr"
                  :key="item.value"
                  :value="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
          </span>
        </div>
        <!-- <div class="item_three_1" />
        <div class="item_three_1" />
        <div class="item_three_1" /> -->

        <!-- 搜索按钮 -->
        <div class="item_three_1 button-right" />
      </div>
    </div>
    <!-- 列表部分 -->
    <div class="main_body">
      <el-tabs
        v-model="activeName"
        type="border-card"
      >
        <el-tab-pane
          :label="tabTotal.one"
          name="1"
        >
          <!-- hasNation 是否自动计算序号 -->
          <aTable
            ref="agGridChild1"
            :ag-table-config="agTableConfig1"
            @on-page-change="pageChange1"
            @on-page-size-change="pageSizeChange1"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.two"
          name="2"
        >
          <aTable
            ref="agGridChild2"
            :ag-table-config="agTableConfig2"
            @on-page-change="pageChange2"
            @on-page-size-change="pageSizeChange2"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.three"
          name="3"
        >
          <aTable
            ref="agGridChild3"
            :ag-table-config="agTableConfig3"
            @on-page-change="pageChange3"
            @on-page-size-change="pageSizeChange3"
            @on-row-dblclick="handDblClick"
          />
        </el-tab-pane>

        <el-tab-pane
          :label="tabTotal.four"
          name="4"
        >
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
      <Table
        :columns="logData.columns"
        :data="logData.data"
        :height="300"
      />
      <div slot="footer">
        <!-- 关闭 -->
        <Button
          type="error"
          @click="closeModal"
        >
          {{ vmI18n.t("common.close") }}
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import promotionlist from '@/js/pages/promotionCenter/promotionlist';

  export default promotionlist;
</script>
<style lang="less">
@import "~@/assets/css/css_1_3/datepicker";
@import "~@/css/pages/promotionCenter/promotionlist.less";
</style>
