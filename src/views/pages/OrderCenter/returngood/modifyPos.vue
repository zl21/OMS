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
          CP_C_LOGISTICS_ID: '',
          CP_C_LOGISTICS_ECODE: '',
          CP_C_LOGISTICS_ENAME: '', // 退回物流公司
          LOGISTICS_CODE: '', // 退回物流单号
        },
        // 表单非空提示
        ruleValidate: {
          LOGISTICS_CODE: [{ required: true, message: ' ', trigger: 'blur' }],
        },
        formData: [
          {
            style: 'popInputPlus',
            width: '400',
            dataAcessKey: 'CP_C_LOGISTICS_ENAME',
            value: 'CP_C_LOGISTICS_ID',
            itemdata: {
              isBackRowItem: true,
              colid: 168212,
              colname: 'CP_C_LOGISTICS_ENAME', // 当前字段的名称
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: window.vmI18n.t('form_label.returnLogisticsCompany'), // 退回物流公司input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: '', // 这个是选择的值
              pid: '',
            },
            oneObj: val => {
              if (!Object.keys(val).length) {
                this.formConfig.formValue.CP_C_LOGISTICS_ID = '';
                this.formConfig.formValue.CP_C_LOGISTICS_ENAME = '';
                this.formConfig.formValue.CP_C_LOGISTICS_ECODE = '';
                return
              }
              const it = val.rowItem;
              this.formConfig.formValue.CP_C_LOGISTICS_ID = it.ID.val;
              this.formConfig.formValue.CP_C_LOGISTICS_ENAME = it.ENAME.val;
              this.formConfig.formValue.CP_C_LOGISTICS_ECODE = it.ENAME.val;
            }
          },
          {
            style: 'input',
            placeholder: '请输入',
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
      const { ID: id } = this.componentData.it;
      const { 
        CP_C_LOGISTICS_ID: logisticsId,
        CP_C_LOGISTICS_ECODE: logisticsCode,
        CP_C_LOGISTICS_ENAME: logisticsName,
        LOGISTICS_CODE: expressCode
      } = this.formConfig.formValue;
      if (!logisticsId && !logisticsName && !logisticsCode || !expressCode) {
        this.$Message.error('物流公司/物流单号必填，请录入！');
        return
      }
      const param = {
        id, // id：数据主键
        logisticsId, // logisticsId：物流公司ID
        logisticsCode, // logisticsCode：物流公司编码
        logisticsName,  // logisticsName：物流公司名称
        expressCode, // expressCode：物流单号
      };
      const { data: { code, data, message } } = await this.service.orderCenter.refundInLogisticsUpdate(param).finally(e => this.loading = false);
      if (code == 0) {
        self.$Message.success(message);
        self.$parent.$parent.$parent.getList(self.componentData.status);
        self.$parent.$parent.closeConfirm();
      } else {
        self.$Message.error(message);
      }
    },
  },
  mounted() {
    // 退回物流单号：默认从原退换货单中带出，可编辑修改，必填
    this.formConfig.formValue.LOGISTICS_CODE = this.componentData.it.LOGISTICS_CODE || '';
  },
}
</script>

<style lang="less">
</style>
