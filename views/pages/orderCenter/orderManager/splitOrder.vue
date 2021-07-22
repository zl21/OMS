<template>
  <!-- 手工拆单 -->
  <div class="splitOrder customized-detail">
    <div class="manual_button customized-detail-btn">
      <businessButton :btn-config="btnConfig" />
    </div>
    <div class="manual_list">
      <div class="list_left">
        <Table
          :columns="columns"
          :data="data[dataIndex]"
          height="500"
          :transfer="true"
          @on-select="onSelect"
          @on-select-cancel="onSelectCancel"
          @on-select-all="onSelectAll"
          @on-select-all-cancel="onSelectAllCancel"
        />
      </div>
      <div class="list_right">
        <ul>
          <li
            v-for="(item , index) in data"
            :key="index"
            @click="switchList(index)"
          >
            <Icon
              v-if="index"
              type="ios-close-circle-outline"
              @click.stop="undo(index)"
            />
            {{ item[0]?item[0].cp_c_phy_warehouse_ename:old_cp_c_phy_warehouse_ename }}: 共{{ item[0]?item[0].total:0 }}件
            <div
              v-if="isOutStore && index==0"
              class="subscript"
            >
              缺货
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import splitOrder from '@/js/pages/orderCenter/orderManager/splitOrder';

  export default splitOrder;
</script>
<style lang="less">
@import "~@/css/pages/orderCenter/orderManager/splitOrder.less";
</style>
