<template>
  <!-- promactiqueryList -->
  <div class="customized-list" v-loading="loading">
    <div class="" :class="['customized-list-form','promotionForm',Number.isInteger(formConfig.formData.length / this.colRowNum) ? 'formBottomPd' : '']">
      <OmsForm :form-config="formConfig" />
      <OmsButton :btn-config="formBtn" class="formBtn" />
    </div>
    <!-- 按钮 head_botton-->
    <div class="customized-list-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <!-- 列表部分 -->
    <div class="customized-list-table">
      <Tabs v-model="activeName" :animated="false" type="card">
        <TabPane
          v-for="(user, index) in tabConfig"
          :key="index"
          :label="`${user.label} ${user.total}`"
          :name="`${index}`"
        >
          <!-- hasNation 是否自动计算序号 -->
          <!-- <aTable
            :ref="`agGridChild${index + 1}`"
            :ag-table-config="user.agTableConfig"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
            @on-row-dblclick="handDblClick"
          /> -->
          <OmsAgTable
            :ref="`agGridChild${index + 1}`"
            :ag-table-config="agTableConfig"
            :options="options"
            @on-row-dblclick="handDblClick"
            @on-page-change="pageChange"
            @on-page-size-change="pageSizeChange"
            @on-selection-change="onSelectionChange"
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
    <dialogVisible
      :check-list="checkList"
      :dialog-visible="dialog_visible"
      :set-group-table-data="setGroupTableData"
      @closeDialog="closeDialog"
    />
    <!-- 查看日志弹框 -->
    <Modal
      v-model="modal"
      class="ark-dialog"
      mask
      draggable
      title="查看日志"
      :mask-closable="false"
      closable
    >
      <Table :columns="logData.columns" :data="logData.data" :height="250" />
      <div slot="footer">
        <Button ghost @click="closeModal">
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
.colorBlack {
  color: #323233;
}
.colorBlue {
  color: blue;
}
.colorGray {
  color: gray;
}
</style>
