<template>
  <!-- 生成拣货单弹框 -->
  <div class="creatPickOrderIn">
    <p>确定生成入库拣货单?</p>
    <div class="button">
      <Button
        ghost
        type="error"
        style="marginLeft:10px;"
        @click="confirm"
      >
        确定
      </Button>
      <Button @click="cancel">
        取消
      </Button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    mounted() {},
    computed: {
      idArr() {
        return this.$attrs.idArr;
      },
    },
    methods: {
      confirm() {
        const self = this;
        const formdata = new FormData();
        const param = {};
        param.ids = self.idArr;
        formdata.append('param', JSON.stringify(param));
        axios({
          url: '/p/cs/sg/generateInPickOrder',
          method: 'post',
          data: formdata,
        }).then((res) => {
          if (res.data.code === 0) {
            self.$Message.success(res.data.message);
            self.$emit('closeActionDialog', true);
            this.$store.commit('customize/TabOpen', {
              id: res.data.data,
              type: 'action',
              name: 'putStorePickOrder',
              label: '入库拣货单',
              back: true,
              query: Object.assign({
                id: res.data.data,
              }),
            });
          } else {
            self.$Message.error(res.data.message);
          }
        });
      },
      cancel() {
        this.$emit('closeActionDialog', false);
      },
    },
  };
</script>

<style lang="less">
.creatPickOrderIn {
  width: 380px;
  .button {
    margin-top: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
