<template>
  <!-- 手工拆单 -->
  <div class="splitOrder">
    <div class="manual_button">
      <div class="button1">
        <Button
          type="primary"
          icon="ios-add-circle-outline"
          @click="addPendingOrder"
        >
          添加到待拆单
        </Button>
        <Button
          style="background:#FDF4F2;border:1px solid #EB4832;color:#EB4832"
          icon="ios-photos-outline"
          @click="confirm"
        >
          确认拆单
        </Button>
      </div>
      <div class="button2">
        <Button
          type="error"
          ghost
          @click="getData"
        >
          刷新
        </Button>
        <Button
          type="error"
          ghost
          icon="ios-arrow-dropleft"
          @click="back"
        >
          返回
        </Button>
      </div>
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
            {{ item[0]?item[0].cp_c_phy_warehouse_ename:old_cp_c_phy_warehouse_ename }}: 共{{ item[0]?item[0].total:0 }}件
            <div
              v-if="isOutStore"
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
