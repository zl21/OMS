// import axios from 'axios';
import { OmsForm } from 'burgeonComponents'
import { OmsButton } from 'burgeonComponents'

export default {
  components: {
    BusinessForm,
    BusinessBtn,
  },
  props: {
    objList: {
      type: Array,
    },
    idArray: {
      type: Array,
    },
    webid: {
      type: Number,
    },
    tablename: {
      type: String,
    },
    rowData: {
      type: Array,
    },
  },
  data() {
    return {
      vmI18n:$i18n,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog');
            }, // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirmChange();
            },
          },
        ],
      },
      formConfig: {
        formValue: {
          numNumber: '',
        },
        formData: [
          {
            style: 'select', // 下拉框类型
            label: '拒绝换货原因', // 下拉框前的值
            width: '24', // 所占宽度宽度
            value: 'refuseReasonId', // 输入框的值
            multiple: false,
            options: [
              { value: 4001, label: '库存不足或商品已下架' },
              { value: 4002, label: '申请时间已超7天无理由退换货时限' },
              { value: 4003, label: '定制商品不支持换货' },
              { value: 4004, label: '不符合商品完好标准' },
              { value: 4005, label: '非包邮商品运费未达成一致' },
              { value: 4006, label: '与买家达成一致' },
              { value: 4016, label: '所换商品差价，未协商一致' },
              { value: 153, label: '其他' },
            ],
          },
          {
            style: 'textarea', // 输入框类型
            label: '拒绝换货原因', // 输入框前文字
            value: 'outRefuseCopywriting', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            disabled: false,
            autosize: { minRows: 3, maxRows: 3 },
          },
        ],
        // 表单非空提示
        ruleValidate: {
          refuseReasonId: [{ required: true, message: ' ', trigger: 'blur' }],
        },
      },
    };
  },
  created() {
    if (this.idArray.length == 0) {
      this.$Message.warning('请选择需要拒绝的换货单！');
      this.$emit('closeActionDialog', false)
      return
    }
    console.log(this.$parent.$parent.selectRowData);
    let isValid = this.$parent.$parent.selectRowData.every(i => i.EXCHANGE_STATUS.val == '换货待处理')
    if (!isValid) {
      this.$Message.warning('换货状态不满足，不能拒绝换货！');
      this.$emit('closeActionDialog', false)
      return
    }
  },
  async mounted() {
    const {
      data: { code, datas },
    } = await this.service.interfacePlatform.exchangeRefuseReason();
    if (code === 0) {
      const resData = JSON.parse(datas);
      this.formConfig.formData[0].options = resData.map((val) => ({
        label: val.outRefuseCopywriting,
        value: val.refuseReasonId,
      }));
    } else {
      this.$message.error('拒绝换货原因请求失败');
    }
  },
  methods: {
    async confirmChange() {
      const formValue = this.formConfig.formValue;
      if (!formValue.refuseReasonId) {
        this.$message.warning('拒绝换货原因不能为空');
        return;
      }
     
      const param = {
        ids: this.idArray,
        tableName: 'IP_B_TAOBAO_EXCHANGE',
        menu: '淘宝换货单接口',
        refuseReasonId: formValue.refuseReasonId,
        outRefuseCopywriting: formValue.outRefuseCopywriting,
      };
      const {
        data: { code, message },
      } = await this.service.interfacePlatform.exchangeRefuse(param);
      if (code === 1) {
        this.$message.success(message);
        this.$emit('closeActionDialog', true);
      }
    },
  },
};
