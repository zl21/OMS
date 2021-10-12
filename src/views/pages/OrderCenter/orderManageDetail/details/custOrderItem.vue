<!--
 * @Author: your name
 * @Date: 2021-10-11 11:58:02
 * @LastEditTime: 2021-10-12 14:20:05
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
    <Modal v-model="modal" title="库存查询" :loading="loading" draggable mask="true" width="600">
      <ul class="stockInfo">
        <li v-for="(item, index) in modalTable.stockInfo" :key="index">
          <lable>{{ item.label }}:</lable><span>{{ item.value }}</span>
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
  </div>
</template>

<script>
import custManageAdd from '@/js/pages/orderCenter/orderManageDetail/details/custManageAdd';

export default custManageAdd;
</script>
<style lang='less'>
@import '~@/css/pages/orderCenter/orderManageDetail/details/custOrderItem.less';
</style>
