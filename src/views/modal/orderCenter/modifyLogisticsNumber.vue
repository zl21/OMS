<template>
  <div class="modifyLogisticsNumber">
    <div class="form">
      <label>修改物流单号 : </label>
      <Input v-model="sticsNumber" />
    </div>
    <div class="dialog-footer">
      <!-- 确定 -->
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
    name: 'ModifyLogisticsNumber',
    data() {
      return {
        sticsNumber: '',
        vmI18n: window.vmI18n
      };
    },
    props: {
      idArray: {
        type: Array
      }
    },
    methods: {
      determine() {
        const self = this;
        if (self.sticsNumber) {
          const obj = {};
          obj.ids = self.idArray;
          obj.logisticNumber = self.sticsNumber;
          const formdata = new FormData();
          formdata.append('param', JSON.stringify(obj));
          self.service.orderCenter.updateLogisticsBeforePacking(formdata).then(res=>{
            console.log(res);
            if (res.data.code == 0) {
              self.$Message.success(res.data.message);
            } else {
              self.$Message.error(res.data.message);
              self.$emit('closeActionDialog');
            }
          });
        } else {
          self.$Message.warning('请输入物流单号!');
        }
      }
    }
  };
</script>

<style scoped>
    .form {
        display: flex;
        margin-bottom: 8px;
        label {
            font-weight: 500;
            padding-top: 7px;
            width: 105px;
        }
    }
</style>
