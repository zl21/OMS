<template>
  <!-- 退换货订单新增 -->
  <div class="returngood">
    <!--按钮块-->
    <div class="returnAddBtn">
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
    <div class="returnAddColl">
      <Collapse v-model="openDefault">
        <Panel name="1">
          <!-- 基本信息 -->
          {{ vmI18n.t("common.baseInformation") }}
          <p slot="content">
            <businessForm :formConfig="information"></businessForm>
          </p>
        </Panel>
        <Panel name="2">
          <!-- 换货人信息 -->
          {{ vmI18n.t("panel_label.exchangeInfo") }}
          <p slot="content">
            <businessForm :formConfig="replacement"></businessForm>
          </p>
        </Panel>
        <Panel name="3">
          <!-- 退货金额 -->
          {{ vmI18n.t("panel_label.returnAmount") }}
          <div slot="content">
            <div class="sales">
              <ul>
                <li>
                  <!-- 商品应退金额 -->
                  <p>{{vmI18n.t("other.refundAmountGoods") }}</p>
                  <input type="text" disabled v-model="amountReturned" />
                </li>
                <li class="symbol">+</li>
                <li>
                  <!-- 应退邮费 -->
                  <p>{{vmI18n.t("other.refundablePostage") }}</p>
                  <input
                    type="text"
                    v-model="returnPostage"
                    @input="returnTotal(returnPostage, 1)"
                  />
                </li>
                <li class="symbol">+</li>
                <li>
                  <!-- 其他金额 -->
                  <p>{{vmI18n.t("other.otherAmounts") }}</p>
                  <input
                    type="text"
                    v-model="otherAmount"
                    @input="returnTotal(otherAmount, 2)"
                  />
                </li>
                <li class="symbol">-</li>
                <li>
                  <!-- 换货金额 -->
                  <p>{{vmI18n.t("other.exchangeAmounts") }}</p>
                  <input type="text" disabled v-model="exchangeAmount" />
                </li>
                <li class="symbol">=</li>
                <li>
                  <!-- 退货单总金额 -->
                  <p>{{vmI18n.t("other.totalAmountReturnOrder") }}</p>
                  <input
                    type="text"
                    @input="isSettlementAmount(returnTotalAmount)"
                    disabled
                    v-model="returnTotalAmount"
                  />
                </li>
                <li>
                  <!-- 代销结算金额 -->
                  <p>{{vmI18n.t("other.settlementAmountConsignment") }}</p>
                  <input
                    type="text"
                    @input="isSettlementAmount(settlementAmount)"
                    v-model="settlementAmount"
                  />
                </li>
              </ul>
            </div>
          </div>
        </Panel>
      </Collapse>
    </div>
    <div class="salesTable">
      <!-- tab切换 -->
      <businessLabel
        class="businessLabel"
        :labelList="labelList"
        :labelDefaultValue="DefaultValue"
        @labelClick="labelClick"
      ></businessLabel>
      <!-- 列表组件 -->
      <div class="tableBox">
        <!-- 退货明细 -->
        <business-action-table
          v-show="labelDefaultValue === 1"
          :jordanTableConfig="jordanTableConfig"
          @on-select="returnOnSelect"
          @table-delete-detail="returnDeleteDetail"
          @table-add-detail="returnAddDetail"
          @on-select-cancel="returnCancel"
          @on-select-all="returnSelectAll"
          @on-select-all-cancel="returnSelectAllCancel"
        ></business-action-table>
        <!-- 换货明细 -->
        <business-action-table
          v-show="labelDefaultValue === 2"
          :jordanTableConfig="jordanTableConfig2"
          @on-select="returnOnSelect2"
          @table-delete-detail="returnDeleteDetail2"
          @on-select-cancel="returnCancel2"
          @on-select-all="returnSelectAll2"
          @on-select-all-cancel="returnSelectAllCancel2"
        ></business-action-table>
        <!-- 退货日志 -->
        <OrderItem
          v-show="labelDefaultValue === 3"
          :componentData="tab2"
        ></OrderItem>
        <!-- 次品记录 -->
        <business-action-table
          v-show="labelDefaultValue === 4"
          :jordanTableConfig="jordanTableConfig4"
        ></business-action-table>
      </div>
    </div>
    <!-- <jordanBounced :bouncedData="bouncedList"></jordanBounced> -->
    <div class="queryorderB">
      <!-- 查询原始订单编号 -->
      <Modal
        class="queryorder"
        v-model="order.modal"
        :mask="true"
        :title="vmI18n.t('modalTitle.query_OriginalOrderNo')"
        @on-ok="queryorder"
        @on-cancel="querycancel"
      >
        <div class="orderContent">
          <businessForm :formConfig="order.orderform"></businessForm>
          <businessButton :btnConfig="order.btn"></businessButton>
        </div>
        <business-action-table
          :jordanTableConfig="order.table"
          @on-select="onquerySelect"
          @on-select-cancel="onqueryCancel"
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
        ></business-action-table>
      </Modal>
    </div>
    <!-- 修改备注 11-->
    <jordanModal
      :title="changeRemarkConfig.confirmTitle"
      :titleAlign="changeRemarkConfig.titleAlign"
      :width="changeRemarkConfig.width"
      :scrollable="changeRemarkConfig.scrollable"
      :closable="changeRemarkConfig.closable"
      :draggable="changeRemarkConfig.draggable"
      :mask="changeRemarkConfig.mask"
      :mask-closable="changeRemarkConfig.maskClosable"
      :transfer="changeRemarkConfig.transfer"
      :name="changeRemarkConfig.name"
      :url="changeRemarkConfig.url"
      :keepAlive="changeRemarkConfig.keepAlive"
      :excludeString="changeRemarkConfig.excludeString"
      :componentData="changeRemarkConfig.componentData"
    ></jordanModal>
    <!--单据状态图片展示 -->
    <businessStatusFlag :statusName="statusName"></businessStatusFlag>
    <div class="fromLoading" v-show="isSaveLoading">
      <Spin></Spin>
    </div>
<!-- 提示 -->
    <Modal
      class="available"
      v-model="availableStock"
      :title='vmI18n.t("modalTitle.tips")'
      width="400"
      :mask-closable="false"
      :mask="true"
      @on-ok="saveData"
      @on-cancel="cancalModal"
    >
    <!-- 。是否继续？ -->
      <p class="availableStock">{{ availableStockMassage }}{{vmI18n.t("modalTips.n2")}}</p>
    </Modal>
    <Modal
      class="detailAdd"
      v-model="returnDetailAddTable.modal"
      :title='vmI18n.t("modalTitle.newReturnDetails")'
      @on-ok="resetReturnMainTable"
      @on-cancel="detailAddCancel"
    >
      <business-action-table
        :jordanTableConfig="returnDetailAddTable.table"
        @on-select="returnDetailAddOnSelect"
        @on-select-cancel="returnDetailAddOnCancel"
        @on-select-all="returnDetailAddOnSelectAll"
        @on-select-all-cancel="returnDetailAddOnSelectAllCancel"
      ></business-action-table>
    </Modal>
    <!-- 矩阵框-->
    <jordanModal
      :title="matrixBox.confirmTitle"
      :titleAlign="matrixBox.titleAlign"
      :width="matrixBox.width"
      :scrollable="matrixBox.scrollable"
      :closable="matrixBox.closable"
      :draggable="matrixBox.draggable"
      :mask="matrixBox.mask"
      :mask-closable="matrixBox.maskClosable"
      :transfer="matrixBox.transfer"
      :name="matrixBox.name"
      :url="matrixBox.url"
      :keepAlive="matrixBox.keepAlive"
      :excludeString="matrixBox.excludeString"
      :componentData="matrixBox.componentData"
    ></jordanModal>
  </div>
</template>

<script>
 import returngoodmanagement from "@/js/pages/orderCenter/returngood/returngoodmanagement";
 export default returngoodmanagement;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/returngood/returngoodmanagement.less";
</style>
