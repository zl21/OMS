<template>
  <div class="bounced" v-loading="loading">
    <businessForm :form-config="formConfig" />
    <!-- <Form :label-width="100">
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
    </Form> -->
    <jordanBtn :btn-config="btnConfig" />
  </div>
</template>

<script>
import axios from 'axios';
import jordanBtn from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';

export default {
  components: {
    jordanBtn,
    businessForm,
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
      },
      formConfig: {
        formValue: {
          CP_C_LOGISTICS_ENAME: '', // 退回物流公司
          LOGISTICS_CODE: '', // 退回物流单号
        },
        // 表单非空提示
        ruleValidate: {
          ORIG_ORDER_ID: [{ required: true, message: ' ', trigger: 'blur' }],
          BILL_TYPE: [{ required: true, message: ' ', trigger: 'blur' }]
        },
        formData: [
          {
            style: 'popInput',
            width: '400',
            dataAcessKey: 'CP_C_LOGISTICS_ENAME',
            value: 'CP_C_LOGISTICS_ID',
            itemdata: {
              col: 1,
              colid: 168212,
              colname: 'CP_C_LOGISTICS_ENAME', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: window.vmI18n.t('form_label.returnLogisticsCompany'), // 退回物流公司
              inputname: 'CP_C_LOGISTICS_ENAME:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: window.vmI18n.t('form_label.returnLogisticsCompany'), // 退回物流公司input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'OC_B_RETURN_ORDER', // 对应的表
              reftableid: 24578, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '' // 这个是选择的值
            },
            // oneObj: e => {
            //   this.oneObjs(e);
            // }
          },
          {
            style: 'input',
            label: window.vmI18n.t('form_label.returnLogisticsNumber'), // 退回物流单号
            dataAcessKey: 'LOGISTICS_CODE',
            value: 'LOGISTICS_CODE',
            disabled: false, // 按钮禁用控制
            width: '400'
          },
        ],
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
