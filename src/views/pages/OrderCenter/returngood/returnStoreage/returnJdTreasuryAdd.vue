<!-- 退货入库新增、详情 -->
<template>
  <div class="returnTreasurys public-main">
    <!--按钮块-->
    <div style="margin-top: 8px">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="public-content">
      <!-- form表单 -->
      <div class="TreasuryDefault">
        <Collapse v-model="openDefault">
          <Panel name="1">
            基本信息
            <p slot="content">
              <businessForm :form-config="information" />
            </p>
          </Panel>
        </Collapse>
      </div>
      <div class="salesTable">
        <!-- tab切换 -->
        <businessLabel class="businessLabel" :label-list="labelList" :label-default-value="DefaultValue" @labelClick="labelClick" />
        <!-- 列表组件 -->
        <div class="tableBox">
          <business-action-table v-if="labelDefaultValue" :jordan-table-config="jordanTableConfig" @on-select="returnOnSelect" @on-select-cancel="returnCancel" />
          <OrderItem v-if="!labelDefaultValue" :component-data="tab2" />
        </div>
      </div>
      <div class="queryorderBox">
        <Modal v-model="order.modal" class="queryorder" :mask="true" :title="'查询原单单号'" @on-ok="queryorder" @on-cancel="querycancel">
          <div class="orderContent">
            <businessForm :form-config="order.orderform" />
            <businessButton :btn-config="order.btn" />
          </div>
          <div class="orderTable">
            <business-action-table :jordan-table-config="order.table" @on-select="onquerySelect" @on-select-cancel="onqueryCancel" />
          </div>
        </Modal>
      </div>
      <!-- 水印图片 -->
      <businessStatusFlag :status-name="statusName" />
    </div>
    <div v-show="isSaveLoading" class="fromLoading">
      <Spin />
    </div>
  </div>
</template>

<script>
import returnJdTreasuryAdd from '@/js/pages/orderCenter/returngood/returnStoreage/returnJdTreasuryAdd';

export default returnJdTreasuryAdd;
</script>

<style lang="less">
@import '~@/css/pages/orderCenter/returngood/returnStoreage/returnTreasuryAdd.less';
</style>
