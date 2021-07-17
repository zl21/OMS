<!--
 * @Author:xx
 * @Date: 2021-05-22 15:24:50
 * @LastEditTime: 2021-07-12 10:31:23
 * @LastEditors: Please set LastEditors
 * @Description: 退换货订单-退货单明细
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/returnGoods.vue
-->
<template>
  <div>
    <!--保存-->
  </div>
</template>

<script>

  export default { 
    data() {
      return {
       returnAmount: R3.store.state.customize.returnAmount
      };
    },
    async created() {
      let self = this;
      self.$emit('closeActionDialog', false); // 关闭弹框
      let returnData = JSON.parse(JSON.stringify(R3.store.state.customize.returnAmount))
      let route = this.$route.params;
   
      // 获取标准界面更改数据值
      let OC_B_RETURN_ORDER = this.$store.state[`V.${route.tableName}.${route.tableId}.${route.itemId}`].updateData[`${route.tableName}`].modify;
      // 获取退换单的数组
      let returnOrderChangeItem = R3.store.state.customize.returnOrderChangeItem;
      if (route.tableName === 'OC_B_RETURN_ORDER_ECXCHANGE_TABLE' && !returnOrderChangeItem.tui.length && !returnOrderChangeItem.huan.length) {
        this.$Message.warning('退换货单都不能为空！');
        return;
      } 
      console.log('this.returnAmount:',this.returnAmount);
      if (route.tableName === 'OC_B_RETURN_ORDER_ECXCHANGE_TABLE' && !(this.returnAmount.PRO_ACTUAL_AMT === this.returnAmount.EXCHANGE_AMT)) {
        this.$Message.warning('换货金额必须要和退货金额一致！');
        return;
      } 
      if (returnOrderChangeItem.tui && !returnOrderChangeItem.tui.length) {
        this.$Message.warning('退货单不能为空！');
        return;
      }
      const param = {
        ID: route.itemId,
        BILL_TYPE: route.tableName === 'OC_B_RETURN_ORDER_ECXCHANGE_TABLE' ? 0 : 1,
        OC_B_RETURN_ORDER: { 
          ...OC_B_RETURN_ORDER[route.tableName], 
          ID: route.itemId,
          SHIP_AMT:returnData.SHIP_AMT,
          ADJUST_AMT: returnData.ADJUST_AMT
        },
        OC_B_RETURN_ORDER_REFUND_ITEMS: returnOrderChangeItem.tui,
        OC_B_RETURN_ORDER_EXCHANGE_ITEMS: returnOrderChangeItem.huan
      };
      this.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.returnSaveBill(param);
      if (code === 0) {
        this.$Message.success(message || '保存成功！');
        this.$comUtils.tabCloseAppoint(this);
        this.$destroy(true);
        this.$store.commit('customize/TabOpen', {
          id: 2624,
          type: 'action',
          name: 'OC_B_RETURN_ORDER',
          label: $i18n.t('panel_label.a1'), // 退换货单
        })
      }
    },
  };
</script>

<style lang="less" scoped>

</style>
