<template>
  <!-- 退换货订单新增 -->
  <div class="returngood public-main">
    <!--按钮块-->
    <div class="returnAddBtn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content">
      <div class="returnAddColl">
        <Collapse v-model="openDefault">
          <Panel name="1">
            <!-- 基本信息 -->
            {{ vmI18n.t('common.baseInformation') }}
            <p slot="content">
              <businessForm :form-config="information" />
            </p>
          </Panel>
          <Panel name="2">
            <!-- 换货人信息 -->
            {{ vmI18n.t('panel_label.exchangeInfo') }}
            <p slot="content">
              <businessForm :form-config="replacement" />
            </p>
          </Panel>
          <Panel name="3">
            <!-- 退货金额 -->
            {{ vmI18n.t('panel_label.returnAmount') }}
            <div slot="content">
              <div class="sales">
                <ul>
                  <li>
                    <!-- 商品应退金额 -->
                    <p>{{ vmI18n.t('other.refundAmountGoods') }}</p>
                    <input
                      v-model="amountReturned"
                      type="text"
                      disabled
                    >
                  </li>
                  <li class="symbol">
                    +
                  </li>
                  <li>
                    <!-- 应退邮费 -->
                    <p>{{ vmI18n.t('other.refundablePostage') }}</p>
                    <input
                      v-model="returnPostage"
                      type="text"
                      @input="returnTotal(returnPostage, 1)"
                    >
                  </li>
                  <li class="symbol">
                    +
                  </li>
                  <li>
                    <!-- 其他金额 -->
                    <p>{{ vmI18n.t('other.otherAmounts') }}</p>
                    <input
                      v-model="otherAmount"
                      type="text"
                      @input="returnTotal(otherAmount, 2)"
                    >
                  </li>
                  <li class="symbol">
                    -
                  </li>
                  <li>
                    <!-- 换货金额 -->
                    <p>{{ vmI18n.t('other.exchangeAmounts') }}</p>
                    <input
                      v-model="exchangeAmount"
                      type="text"
                      disabled
                    >
                  </li>
                  <li class="symbol">
                    =
                  </li>
                  <li>
                    <!-- 退货单总金额 -->
                    <p>{{ vmI18n.t('other.totalAmountReturnOrder') }}</p>
                    <input
                      v-model="returnTotalAmount"
                      type="text"
                      disabled
                      @input="isSettlementAmount(returnTotalAmount)"
                    >
                  </li>
                  <li>
                    <!-- 代销结算金额 -->
                    <p>{{ vmI18n.t('other.settlementAmountConsignment') }}</p>
                    <input
                      v-model="settlementAmount"
                      type="text"
                      @input="isSettlementAmount(settlementAmount)"
                    >
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
          :label-list="labelList"
          :label-default-value="DefaultValue"
          @labelClick="labelClick"
        />
        <!-- 列表组件 -->
        <div class="tableBox">
          <!-- 退货明细 -->
          <business-action-table
            v-show="labelDefaultValue === 1"
            :jordan-table-config="jordanTableConfig"
            @on-select="returnOnSelect"
            @table-delete-detail="returnDeleteDetail"
            @table-add-detail="returnAddDetail"
            @on-select-cancel="returnCancel"
            @on-select-all="returnSelectAll"
            @on-select-all-cancel="returnSelectAllCancel"
          />
          <!-- 换货明细 -->
          <business-action-table
            v-show="labelDefaultValue === 2"
            :jordan-table-config="jordanTableConfig2"
            @on-select="returnOnSelect2"
            @table-delete-detail="returnDeleteDetail2"
            @on-select-cancel="returnCancel2"
            @on-select-all="returnSelectAll2"
            @on-select-all-cancel="returnSelectAllCancel2"
          />
          <!-- 退货日志 -->
          <OrderItem
            v-show="labelDefaultValue === 3"
            :component-data="tab2"
          />
          <!-- 次品记录 -->
          <business-action-table
            v-show="labelDefaultValue === 4"
            :jordan-table-config="jordanTableConfig4"
          />
        </div>
      </div>
      <div class="queryorderB">
        <!-- 查询原始订单编号 -->
        <Modal
          v-model="order.modal"
          class="queryorder"
          :mask="true"
          :title="vmI18n.t('modalTitle.query_OriginalOrderNo')"
          @on-ok="queryorder"
          @on-cancel="querycancel"
        >
          <div class="orderContent">
            <businessForm :form-config="order.orderform" />
            <businessButton :btn-config="order.btn" />
          </div>
          <business-action-table
            :jordan-table-config="order.table"
            @on-select="onquerySelect"
            @on-select-cancel="onqueryCancel"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
          />
        </Modal>
      </div>
    </div>
    <!-- 修改备注 11-->
    <businessDialog
      :title="changeRemarkConfig.confirmTitle"
      :title-align="changeRemarkConfig.titleAlign"
      :width="changeRemarkConfig.width"
      :scrollable="changeRemarkConfig.scrollable"
      :closable="changeRemarkConfig.closable"
      :draggable="changeRemarkConfig.draggable"
      :mask="changeRemarkConfig.mask"
      :mask-closable="changeRemarkConfig.maskClosable"
      :transfer="changeRemarkConfig.transfer"
      :name="changeRemarkConfig.name"
      :url="changeRemarkConfig.url"
      :keep-alive="changeRemarkConfig.keepAlive"
      :exclude-string="changeRemarkConfig.excludeString"
      :component-data="changeRemarkConfig.componentData"
    />
    <!--单据状态图片展示 -->
    <businessStatusFlag :status-name="statusName" />
    <div
      v-show="isSaveLoading"
      class="fromLoading"
    >
      <Spin />
    </div>
    <!-- 提示 -->
    <Modal
      v-model="availableStock"
      class="available"
      :title="vmI18n.t('modalTitle.tips')"
      width="400"
      :mask-closable="false"
      :mask="true"
      @on-ok="saveData"
      @on-cancel="cancalModal"
    >
      <!-- 。是否继续？ -->
      <p class="availableStock">
        {{ availableStockMassage }}{{ vmI18n.t('modalTips.n2') }}
      </p>
    </Modal>
    <Modal
      v-model="returnDetailAddTable.modal"
      class="detailAdd"
      :title="vmI18n.t('modalTitle.newReturnDetails')"
      @on-ok="resetReturnMainTable"
      @on-cancel="detailAddCancel"
    >
      <business-action-table
        :jordan-table-config="returnDetailAddTable.table"
        @on-select="returnDetailAddOnSelect"
        @on-select-cancel="returnDetailAddOnCancel"
        @on-select-all="returnDetailAddOnSelectAll"
        @on-select-all-cancel="returnDetailAddOnSelectAllCancel"
      />
    </Modal>
    <!-- 矩阵框-->
    <businessDialog
      :title="matrixBox.confirmTitle"
      :title-align="matrixBox.titleAlign"
      :width="matrixBox.width"
      :scrollable="matrixBox.scrollable"
      :closable="matrixBox.closable"
      :draggable="matrixBox.draggable"
      :mask="matrixBox.mask"
      :mask-closable="matrixBox.maskClosable"
      :transfer="matrixBox.transfer"
      :name="matrixBox.name"
      :url="matrixBox.url"
      :keep-alive="matrixBox.keepAlive"
      :exclude-string="matrixBox.excludeString"
      :component-data="matrixBox.componentData"
    />
  </div>
</template>

<script>
  import returngoodmanagement from '@/js/pages/orderCenter/returngood/returngoodmanagement';

  export default returngoodmanagement;
</script>

<style lang="less">
@import '~@/css/pages/orderCenter/returngood/returngoodmanagement.less';
</style>
