<!--
 * @Author:xx
 * @Date: 2021-05-22 15:24:50
 * @LastEditTime: 2021-06-07 10:20:54
 * @LastEditors: Please set LastEditors
 * @Description: 退换货订单-退货单明细
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/returnGoods.vue
-->
<template>
  <div />
</template>

<script>

  export default {
    data() {
      return {
      
      };
    },
    created() {
      this.$comUtils.tabCloseAppoint(this);
      this.$store.commit('customize/TabOpen', {
        id: '2624',
        type: 'action',
        name: 'OC_B_RETURN_ORDER',
        label: '退换货单',
        back: true,
      });
    },
  };
</script>

<style lang="less" scoped>

</style>
