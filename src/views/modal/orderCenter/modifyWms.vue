<template>
  <div class="modifyWms">
    <div class="form">
      <label>修改传WMS拣货单字段 : </label>
      <Input v-model="send_wms_pick" />
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
    name: 'ModifyWms',
    data() {
      return {
        send_wms_pick: '',
        vmI18n: window.vmI18n
      };
    },
    props: {
      idArray: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      determine() {
        const self = this;
        if (self.send_wms_pick) {
          const obj = {};
          obj.ids = self.idArray;
          obj.send_wms_pick = self.send_wms_pick;
          const formdata = new FormData();
          formdata.append('param', JSON.stringify(obj));
          self.service.orderCenter.sendWmsPick(formdata).then(res=>{
            console.log(res);
            if (res.data.data.code == 0) {
              self.$Message.success(res.data.data.message);
              self.$emit('closeActionDialog');
            } else {
              self.$Message.error(res.data.data.message);
            }
          });
        } else {
          self.$Message.warning('请输入传WMS拣货单字段!');
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
