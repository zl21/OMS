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
          <!-- 新增 -->
          {{ vmI18n.t("btn.add") }}
        </button>
        <button class="white" @click="promotionBlukClick">
          <!-- 批量新增 -->
          {{ vmI18n.t("btn.batch_add") }}
        </button>
        <button class="white" @click="publish">
          <!-- 发布 -->
          {{ vmI18n.t("btn.publish") }}
        </button>
        <button class="white" @click="actOffline">
          <!-- 下线 -->
          {{ vmI18n.t("btn.offline") }}
        </button>
        <button class="white" @click="copy">
          <!-- 复制 -->
          {{ vmI18n.t("common.copy") }}
        </button>
        <button class="white" @click="deleteActi">
          <!-- 删除 -->
          {{ vmI18n.t("btn.delete") }}
        </button>
        <button class="white" @click="setGroup">
          <!-- 设置分组 -->
          {{ vmI18n.t("btn.set_groups") }}
        </button>
        <button class="white" @click="simulation">
          <!-- 模拟仿真 -->
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
              :value="acti_date"
              :placeholder="vmI18n.t('pHolder.a1')"
              format="yyyy-MM-dd"
              type="daterange"
              @on-change="handleChange"
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
        <!-- 店铺名称 -->
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
@import "~@/css/pages/promotionCenter/promotionlist.less";
</style>
