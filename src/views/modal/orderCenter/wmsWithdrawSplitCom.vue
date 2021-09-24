<template>
  <div class="wmsWithdrawSplitDom" v-loading="loading">
    <Form :label-width="210" :model="formItem">
      <FormItem :label="`${formItem.label}：`">
        <InputNumber v-model="formItem.num" @on-change="inputChange" />
      </FormItem>
    </Form>
    <businessButton class="modalBth" :btn-config="btnConfig" />
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
export default {
  components: {
    businessButton,
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      formItem: {
        cover: 'false',
        flag: '1',
        textarea: '',
        label: '请输入需要拆分的单包裹数量',
        num: null,
      },
      loading: false,
      vmI18n: window.vmI18n,
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: '确定', // 确定 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              self.ok();
            } // 按钮点击事件
          }
        ]
      },
    }

  },
  methods: {
    inputChange() {

    },
    ok() {
      const self = this;
      self.loading = true;
      const ids = self.componentData.seletDa.map(item => item.ID);
      this.service.orderCenter.saveWmsWithdrawSplit({ ids, skuCount: self.formItem.num }).then(res => {
        if (res.data.code == 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.$parent.getData();
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.selection = [];
        } else {
          self.$Message.error(res.data.message);
        }
      }).finally(e => self.loading = false);
    }
  }
}
</script>

<style lang='less'>
@import '~@burgeon/oms-theme/skin/public.less';
</style>
