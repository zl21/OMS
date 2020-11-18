<template>
  <div class="queryConditionRetransmissionWms">
    <!-- 出库通知单->按查询条件重传wms按钮 -->
    <p>确定根据查询条件重传WMS?</p>
    <div class="dialog-footer">
      <Button
        type="primary"
        size="small"
        @click="determine"
      >
        {{ vmI18n.t("common.determine") }}
      </Button>
      <!-- 取消 -->
      <Button
        type="error"
        ghost
        size="small"
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
      >
        {{ vmI18n.t("common.cancel") }}
      </Button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        vmI18n: window.vmI18n,
        is_click: false
      };
    },
    computed: {
      allFormData() {
        return this.$store.state[`S.${this.$route.params.tableName}.${this.$route.params.tableId}`].formItems.data;
      },
      user() {
        return this.$store.state.global.userInfo;
      }
    },
    methods: {
      determine() {
        if (this.is_click) {
          return;
        }
        if (this.allFormData.CP_C_PHY_WAREHOUSE_ID || (this.allFormData.BILL_DATE[0] && this.allFormData.BILL_DATE[1]) || this.allFormData.SOURCE_BILL_TYPE) {
          const formdata = new FormData();
          const obj = {};
          obj.sourceBillType = this.allFormData.SOURCE_BILL_TYPE;
          obj.phyWarehouseIds = this.allFormData.CP_C_PHY_WAREHOUSE_ID;
          obj.startBillDate = this.allFormData.BILL_DATE[0];
          obj.endBillDate = this.allFormData.BILL_DATE[1];
          // obj.user = this.user;
          formdata.append('param', JSON.stringify(obj));
          this.is_click = true;
          this.service.inventoryCenter.sgPhyOutNoticesSendWMSAgainCondition(formdata).then(res=>{
            console.log(res);
            if (res.data.code == 0) {
              this.$Message.success(res.data.message);
              this.$emit('closeActionDialog');
            } else {
              this.is_click = false;
              this.$Message.error(res.data.message);
            }
          });
        } else {
          this.$Message.warning('查询条件 <实体仓> <单据日期> <来源单据类型> 至少有一个不为空.');
        }
      }
    },
    mounted() {

    }
  };
</script>
实体仓:"CP_C_PHY_WAREHOUSE_ID"
单据日期:"BILL_DATE"
来源单据类型:"SOURCE_BILL_NO"
传WMS状态:"WMS_STATUS"
