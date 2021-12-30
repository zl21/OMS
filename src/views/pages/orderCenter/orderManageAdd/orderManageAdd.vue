<template>
  <div class="customized-detail">
    <div class="obj-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="obj-main">
      <Collapse v-model="value1">
        <Panel name="1">
          <!-- 基本信息 -->
          {{ $it("com.baseInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig" @keyDown="keyDown" />
          </p>
        </Panel>
        <Panel name="2">
          <!-- 收货人信息 -->
          {{ $it("com.consigneeInformation") }}
          <p slot="content">
            <OmsForm :form-config="formConfig1" />
          </p>
        </Panel>
        <Panel name="3">
          <!-- 备注信息 -->
          {{ $it("com.remarksInfo") }}
          <p slot="content">
            <OmsForm :form-config="formConfig2" />
          </p>
        </Panel>
      </Collapse>
      
      <!-- 表格 -->
      <div class="obj-table">
        <!-- tab切换 -->
        <OmsLabel
          :label-default-value="labelDefaultValue"
          :label-list="labelList"
        />
        <!-- 订单明细 -->
        <div class="subtablePart">
          <OmsTable
            :jordan-table-config="jordanTableConfig"
            @on-select="onSelect"
            @on-select-all="onSelectAll"
            @on-select-all-cancel="onSelectAllCancel"
            @on-select-cancel="onSelectCancel"
            @table-delete-detail="tableDeleteDetail"
          />
        </div>
      </div>
    </div>
   
    <!-- 矩阵框-->
    <OmsDialog
      :closable="matrixBox.closable"
      :component-data="matrixBox.componentData"
      :draggable="matrixBox.draggable"
      :exclude-string="matrixBox.excludeString"
      :keep-alive="matrixBox.keepAlive"
      :mask="matrixBox.mask"
      :mask-closable="matrixBox.maskClosable"
      :name="matrixBox.name"
      :scrollable="matrixBox.scrollable"
      :title="matrixBox.confirmTitle"
      :title-align="matrixBox.titleAlign"
      :transfer="matrixBox.transfer"
      :url="matrixBox.url"
      :width="matrixBox.width"
    />
  </div>
</template>
<script>
import orderManageAdd from '@/js/pages/orderCenter/orderManageAdd/orderManageAdd';

export default orderManageAdd;
</script>

<style lang="less">
@import "~@/css/pages/orderCenter/orderManageAdd/orderManageAdd.less";
</style>
