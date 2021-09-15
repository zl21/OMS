<template>
  <div class="bounced" v-loading="loading">
    <Form :label-width="100"> 
      <FormItem label="退回物流公司：">
        <Input
          v-model="form.company"
          :rows="4"
          placeholder="请输入"
        />
      </FormItem>
      <FormItem label="退回物流单号：">
        <Input
          v-model="form.orderNo"
          :rows="4"
          placeholder="请输入"
        />
      </FormItem>
    </Form>
    <jordanBtn :btn-config="btnConfig" />
  </div>
</template>

<script>
import axios from 'axios';
import jordanBtn from 'professionalComponents/businessButton';

export default {
  components: {
    jordanBtn
  },
  data() {
    return {
      loading: false,
      form: {
        company: 'test',
        orderNo: 'test',
      },
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: '取消', // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: '确定', // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.okClick();
            } // 按钮点击事件
          }
        ]
      }
    };
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    async okClick() {
      // this.form
      const self = this;
      this.loading = true;
      const { data: { data: { code, data, message } } } = await this.service.orderCenter.getOrderId(this.form).finally(e => this.loading = false);
    },
  },
  mounted() { },
}
</script>

<style lang="less">
</style>
