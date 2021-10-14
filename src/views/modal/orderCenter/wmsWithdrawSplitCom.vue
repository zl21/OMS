<template>
  <div class="wmsWithdrawSplitDom" v-loading="loading">
    <Form :label-width="210" :model="formItem" :rules="ruleValidate">
      <FormItem :label="`${formItem.label}：`" prop="num">
        <Input v-model="formItem.num" @on-change="inputChange" />
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
    const validateNum = (rule, value, callback) => {
      const regx = /^[1-9]+([0-9]*)$/;
      const tip = '请输入正整数';
      if (value === '') {
        callback(new Error(tip));
      } else {
        if (regx.test(value)) {
          callback();
        } else {
          callback(new Error(tip));
        }
      }
    };
    return {
      ruleValidate: {
        num: [
          // { type: 'integer', message: '请输入正整数'},
          { validator: validateNum, trigger: 'blur' }
        ],
      },
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
      const skuCount = self.formItem.num;
      const regx = /^[1-9]+([0-9]*)$/;
      if (!regx.test(skuCount)) {
        self.$Message.error('请输入正整数！');
        return
      }
      self.loading = true;
      const ids = self.componentData.seletDa.map(item => item.ID);
      this.service.orderCenter.saveWmsWithdrawSplit({ ids, skuCount }).then(res => {
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
