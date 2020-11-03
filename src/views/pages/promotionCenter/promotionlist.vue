<template>
  <!-- promactiqueryList -->
  <div v-loading="loadings" class="promotion-content">
    <div class="operation-content">
      <!-- 按钮 head_botton-->
      <div class="operation-botton">
        <button class="white" @click="getData">
          <!-- 查找 -->
          {{ vmI18n.t("btn.find") }}
        </button>
        <button class="white" @click="Reset">
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
      <Row class="operation-form">
        <!--促销编号 item_three_1  query_titile--->
        <Col span="6" class="form-item">
          <span class="form-label">
            {{ vmI18n.t("form_label.promotionNo") }}:
          </span>
          <div class="form-input">
            <input
              v-model="acti_no"
              type="text"
              class="pure_text"
              @keyup="formUserKeyUp"
            />
          </div>
        </Col>
        <!-- 活动日期 -->
        <Col span="6" class="form-item">
          <span class="form-label">
            {{ vmI18n.t("form_label.activityDate") }}:
          </span>
          <div class="form-input">
            <DatePicker
              v-model="acti_date"
              format="yyyy-MM-dd"
              value-format="yyyyMMdd"
              type="daterange"
              :placeholder="vmI18n.t('pHolder.a1')"
            >
            </DatePicker>
          </div>
        </Col>
        <!-- 活动名称 -->
        <Col span="6" class="form-item">
          <span class="form-label">
            {{ vmI18n.t("form_label.activityName") }}:
          </span>
          <div class="form-input">
            <input
              v-model="acti_name"
              type="text"
              class="pure_text"
              @keyup="formUserKeyUp"
            />
          </div>
        </Col>
        <!-- 线下门店 -->
        <!-- <div class="form-item">
          <myInputLd :isActive="true" :isDisabled="false" :itemdata="my_input_st.itemdata"></myInputLd>
        </div>-->
        <!-- 线上门店 -->
        <Col span="6" class="form-item tableInput">
          <span class="form-label"> 店铺名称: </span>
          <div class="form-input">
            <TableInput
              :is-active="true"
              :has-label="false"
              :is-disabled="false"
              :itemdata="my_input_sh.itemdata"
            />
          </div>
        </Col>
        <!-- 商品 -->
        <Col span="6" class="form-item">
          <span class="form-label"> {{ vmI18n.t("other.goods") }}: </span>
          <div class="form-input">
            <TableInput
              :is-active="true"
              :isdisabled="false"
              :itemdata="product.itemdata_xitong"
              :has-label="false"
              :is-promotion="true"
            />
          </div>
        </Col>
        <!-- 分组-->
        <Col span="6" class="form-item">
          <span class="form-label">
            {{ vmI18n.t("table_label.grouping") }}:
          </span>
          <div class="form-input">
            <input
              v-model="acti_group"
              type="text"
              class="pure_text"
              @keyup="formUserKeyUp"
            />
          </div>
        </Col>
        <!--操作人-->
        <Col span="6" class="form-item">
          <span class="form-label">
            {{ vmI18n.t("form_label.operator") }}:
          </span>
          <div class="form-input">
            <input
              v-model="release_name"
              type="text"
              class="pure_text"
              @keyup="formUserKeyUp"
            />
          </div>
        </Col>
        <!--促销状态 query_select-->
        <Col span="6">
          <div span="6" class="form-item">
            <span class="form-label"
              >{{ vmI18n.t("form_label.promotion_status") }}:
            </span>
            <div class="form-input">
              <Select v-model="STATUS" multiple>
                <Option
                  v-for="item in diStatusArr"
                  :key="item.value"
                  :value="item.value"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </div>
        </Col>
        <!-- <div class="formItem" />
        <div class="formItem" />
        <div class="formItem" /> -->
        <!-- 搜索按钮 -->
        <div class="formItem button-right" />
      </Row>
    </div>
    <!-- 列表部分 -->
    <div class="tabale-content">
      <Tabs v-model="activeName">
        <TabPane
          v-for="(user, index) in tabConfig"
          :key="index"
          :label="`${user.label} ${user.total}`"
          :name="`${index}`"
        >
          <!-- hasNation 是否自动计算序号 -->
          <aTable
            :ref="`agGridChild${index + 1}`"
            :ag-table-config="user.agTableConfig"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
            @on-row-dblclick="handDblClick"
          />
        </TabPane>
        <!-- <TabPane :label="tabTotal.two" name="2">
          <aTable
            ref="agGridChild2"
            :ag-table-config="agTableConfig2"
            @on-page-change="pageChange2"
            @on-page-size-change="pageSizeChange2"
            @on-row-dblclick="handDblClick"
          />
        </TabPane>
        <TabPane :label="tabTotal.three" name="3">
          <aTable
            ref="agGridChild3"
            :ag-table-config="agTableConfig3"
            @on-page-change="pageChange3"
            @on-page-size-change="pageSizeChange3"
            @on-row-dblclick="handDblClick"
          />
        </TabPane>
        <TabPane :label="tabTotal.four" name="4">
          <aTable
            ref="agGridChild4"
            :ag-table-config="agTableConfig4"
            @on-page-change="pageChange4"
            @on-page-size-change="pageSizeChange4"
            @on-row-dblclick="handDblClick"
          />
        </TabPane> -->
      </Tabs>
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
// @import "~@/assets/css/css_1_3/datepicker";
@import "~@/css/pages/promotionCenter/promotionlist.less";
</style>
