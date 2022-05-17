<!--
 * @Author: your name
 * @Date: 2021-10-11 11:58:02
 * @LastEditTime: 2021-10-12 15:28:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /r3-web-senmir-v1.4/src/views/pages/OrderCenter/orderManageDetail/details/custOrderItem.vue
-->
<template>
  <div class="order-item">
    <business-action-table
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @table-delete-detail="tableDeleteDetail"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <Modal v-model="modal" title="库存查询" draggable mask  :mask-closable="false" width="600">
      <ul class="stockInfo">
        <li v-for="(item, index) in modalTable.stockInfo" :key="index">
          <label>{{ item.label }}:</label><span>{{ item.value }}</span>
        </li>
      </ul>
      <h6 class="stockTitle">可用库存数据：</h6>
      <table class="stockTable" border="1">
        <tr>
          <!-- <th
            v-for="(item,index) in modalTable.stockInfo"
            :key="index"
          >
            {{ item.value }}
          </th> -->
          <th>实体仓</th>
          <th>仓库可用库存</th>
          <th>逻辑仓库分布情况</th>
        </tr>
        <tr v-for="(item, index) in modalTable.data" :key="index">
          <!-- v-if="item.flag"
            v-rowSpan="item.row" -->
          <td>
            {{ item.MAIN_FLAG === 1 ? item.CP_C_PHY_WAREHOUSE_ENAME : '' }}
          </td>
          <td>
            {{ item.MAIN_FLAG === 1 ? item.QTY_TOTAL_AVAILABLE : '' }}
          </td>
          <td>
            {{ item.CP_C_STORE_ENAME_AND_STOCK }}
          </td>
        </tr>
      </table>
    </Modal>
    <Modal v-model="chargebackModal" title="退单详情" draggable mask  :mask-closable="false" width="900">
      <table class="chargebackTable" border="1">
        <tr>
          <th>申请时间</th>
          <th>售后单编号</th>
          <th>售后类型</th>
          <th>售后原因</th>
          <th>售后申请金额</th>
          <th>售后申请状态</th>
        </tr>
        <tr v-for="(item, index) in chargebackData" :key="index">
          <td>
            {{ item.created }}
          </td>
          <td>
            {{ item.return_no }}
          </td>
          <td>
            {{ item.refund_type_name }}
          </td>
          <td>
            {{ item.return_reason }}
          </td>
          <td>
            {{ item.refund_fee }}
          </td>
          <td>
            {{ item.return_status_name }}
          </td>
        </tr>
      </table>
      <h6 class="stockTitle">当前商品单剩余可退金额=商品单实际支付总金额-汇总售后申请金额 <span>当前剩余可退金额</span> <span>{{realAMT}}</span></h6>
    </Modal>
  </div>
</template>

<script>
import custManageAdd from '@/js/pages/orderCenter/orderManageDetail/details/custManageAdd';

export default custManageAdd;
</script>
<style lang='less'>
@import '~@/css/pages/orderCenter/orderManageDetail/details/custOrderItem.less';
</style>
