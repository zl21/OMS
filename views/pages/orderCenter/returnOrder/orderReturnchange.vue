<!--
 * @Author:xx
 * @Date: 2021-05-22 15:24:50
 * @LastEditTime: 2021-07-13 20:31:42
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
      this.$emit('closeActionDialog', true);
      this.$comUtils.tabCloseAppoint(this);
      this.$store.commit('global/tabOpen', {
        type: 'C',
        label: '退换货单',
        // customizedModuleName: 'OC_B_RETURN_ORDER',
        // customizedModuleId:'2828',
        url: `/CUSTOMIZED/OC_B_RETURN_ORDER/2828`
      });
    },
  };
</script>

<style lang="less" scoped>

</style>
