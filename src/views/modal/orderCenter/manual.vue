<!--
 * @Author: your name
 * @Date: 2021-05-25 16:48:54
 * @LastEditTime: 2021-06-02 20:52:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/manual.vue
-->
<template></template>

<script>
import service from '@/service/index'
export default {
  data() {
    return {

    }
  },
  created() {
    this.$emit("closeActionDialog");
    console.log(this.$parent.$parent.selectRowData);
    if (this.$parent.$parent.idArray.length != 1) {
      this.$Message.warning('请选中一条数据！');
      return
    } else {
      this.init()
    }


  },
  methods: {
    init() {
      service.orderCenter.checkRefundInStatus(`id=${this.$parent.$parent.idArray[0]}`).then(res => {
        if (res.data.code == 0) {
          this.$store.commit('global/tabOpen', {
            tableId: 10542,
            type: 'V',
            tableName: 'OC_B_REFUND_IN',
            id: this.$parent.$parent.idArray[0] + "?type=1",
          });
        } else {
          this.$Message.warning(res.data.message);
        }

      })



    }
  }

}
</script>

<style>
</style>