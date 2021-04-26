<template>
  <!-- promactiqueryList -->
  <div class="promotion-content custom-main">
    <loading :loading="loadings" />
    <div class="operation-content totalHeight custom-form">
      <!-- 过滤器 -->
      <Row class="operation-form">
        <!--促销编号 item_three_1  query_titile--->
        <Col class="form-item" span="6">
          <span class="form-label">
            {{ vmI18n.t("form_label.promotionNo") }}:
          </span>
          <div class="form-input">
            <Input
              v-model="acti_no"
              class="pure_text"
              type="text"
              @keyup="formUserKeyUp"
            />
          </div>
        </Col>
        <!-- 活动日期 -->
        <Col class="form-item" span="6">
          <span class="form-label">
            {{ vmI18n.t("form_label.activityDate") }}:
          </span>
          <div class="form-input">
            <DatePicker
              :placeholder="vmI18n.t('pHolder.a1')"
              :value="acti_date"
              format="yyyy-MM-dd"
              type="daterange"
              @on-change="handleChange"
            />
          </div>
        </Col>
        <!-- 活动名称 -->
        <Col class="form-item" span="6">
          <span class="form-label">
            {{ vmI18n.t("form_label.activityName") }}:
          </span>
          <div class="form-input">
            <Input
              v-model="acti_name"
              class="pure_text"
              type="text"
              @keyup="formUserKeyUp"
            />
          </div>
        </Col>
        <!-- 店铺名称 -->
        <Col class="form-item tableInput" span="6">
          <span class="form-label"> 店铺名称: </span>
          <div class="form-input label-hidden">
            <TableInput
              :has-label="true"
              :is-active="true"
              :is-disabled="false"
              :itemdata="my_input_sh.itemdata"
            />
          </div>
        </Col>
        <!-- 商品 -->
        <Col class="form-item" span="6">
          <span class="form-label"> {{ vmI18n.t("other.goods") }}: </span>
          <div class="form-input">
            <TableInput
              :has-label="false"
              :is-active="true"
              :is-promotion="true"
              :isdisabled="false"
              :itemdata="product.itemdata_xitong"
            />
          </div>
        </Col>
        <!-- 分组-->
        <Col class="form-item" span="6">
          <span class="form-label">
            {{ vmI18n.t("table_label.grouping") }}:
          </span>
          <div class="form-input">
            <Input
              v-model="acti_group"
              class="pure_text"
              type="text"
              @keyup="formUserKeyUp"
            />
          </div>
        </Col>
        <!--操作人-->
        <Col class="form-item" span="6">
          <span class="form-label">
            {{ vmI18n.t("form_label.operator") }}:
          </span>
          <div class="form-input">
            <Input
              v-model="release_name"
              class="pure_text"
              type="text"
              @keyup="formUserKeyUp"
            />
          </div>
        </Col>
        <!--促销状态 query_select-->
        <Col span="6">
          <div class="form-item" span="6">
            <span class="form-label"
              >{{ vmI18n.t("form_label.promotion_status") }}:
            </span>
            <div class="form-input">
              <Select v-model="STATUS" multiple>
                <Option
                  v-for="item in diStatusArr"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
          </div>
        </Col>
        <!--搜索按钮-->
        <div class="formItem button-right" />
      </Row>
    </div>
    <!-- 按钮 head_botton-->
    <div class="operation-botton custom-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <!-- 列表部分 -->
    <div class="tabale-content custom-table">
      <Tabs v-model="activeName">
        <TabPane
          v-for="(user, index) in tabConfig"
          :key="index"
          :label="`${user.label} ${user.agTableConfig.pagenation.total}`"
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
      </Tabs>
      <div class="promactiIcon">
        <div class="legend">
          <!-- 图例 -->
          <span style="font-weight: bold">{{ vmI18n.t("other.legend") }}:</span>
          <p>
            <!-- 提交状态 -->
            <span>{{ vmI18n.t("other.submission_status") }}:&nbsp;</span>
            <!-- 已发布 -->
            <button class="color-blue">
              {{ vmI18n.t("btn.published") }}
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
    </div>
    <Mydialog
      v-if="dataError.show"
      :class="dataError.type"
      :close-on-click-modal="false"
      :show-close="false"
      :title="dataError.title"
      :visible.sync="dataError.show"
      class="messageDialog"
    >
      <errorMessage
        :dialog-back="dataError.backBtn"
        :dialog-class="dataError.type"
        :error-message="dataError.errorList"
        @refreshbizlines="errorDialogClose"
      />
    </Mydialog>
    <dialogVisible
      :check-list="checkList"
      :dialog-visible="dialog_visible"
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
@import "~@/css/pages/promotionCenter/promotionlist.less";
</style>
