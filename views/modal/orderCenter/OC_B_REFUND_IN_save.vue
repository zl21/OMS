<!--
 * @Author: your name
 * @Date: 2021-06-01 17:27:45
 * @LastEditTime: 2021-07-06 13:43:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/modal/orderCenter/OC_B_REFUND_IN_save.vue
-->
<template>
  <div></div>
</template>

<script>
import service from '@/service/index'

export default {
  data() {
    return {
    }
  },
  created() {
    this.$emit("closeActionDialog");
    this.save()
  },
  methods: {
    save() {
      let person = JSON.parse(sessionStorage.getItem("OC_B_REFUND_IN_data"));
      console.log(person);
      let REFUND_IN_ITEM_LIST = []
      person.forEach(em => {
        if (em._checked) {
          let obj = {
            OC_B_RETURN_ORDER_ID: em.OC_B_RETURN_ORDER_BILL_NO_ID,
            REFUND_IN_ITEM_ID: em.ID,
            PS_C_SKU_ECODE_ACTUAL: em.PS_C_SKU_ECODE_ACTUAL,
            OC_B_RETURN_ORDER_BILL_NO:em.OC_B_RETURN_ORDER_ID,
            PS_C_SKU_ECODE: em.PS_C_SKU_ECODE,
            OC_B_RETURN_ORDER_ITEM_ID:em.OC_B_RETURN_ORDER_ITEM_ID
          }
          REFUND_IN_ITEM_LIST.push(obj)
        }

      })

      let data = {
        MATCH_TYPE: this.type == 1 ? 0 : 1, //匹配类型     -- 0手工  1强制
        REFUND_IN_BILL_NO: '',  //退货入库单编号
        REFUND_IN_ID: this.$route.params.itemId,  //退货入库单id
        REFUND_IN_ITEM_LIST,//明细
      }
      service.orderCenter.saveMatch(data).then(res => {
        if (res.data.code == 0) {
          this.$Message.success(res.data.message)
          this.$parent.$parent.$parent.refresh()
        } else {
          this.$Modal.confirm({
            title: res.data.message,
            width: 500,
            mask: true,
            className: 'ark-dialog',
            render: (h) => {
              if (res.data.data) {
                return h('Table', {
                  props: {
                    columns: [
                        {
                        title: "失败明细", // '提示信息',
                        key: 'key',
                      },
                      {
                        title: '失败信息！', // '错误信息',
                        key: 'message',
                      }
                    ],
                    data: res.data.data,
                  },
                })
              }
              return false
            },
          })
        }

       // sessionStorage.clear();     
      })
    }
  }
}
</script>

<style>
</style>