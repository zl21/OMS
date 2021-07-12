import BurgeonDate from '@/assets/js/__utils__/date.js';
export default {
  // 京东退单接口列表界面(下载退单)
  formConfig: {
    formValue: {
      startEndTimes: [],
      bill_no: '',
      service_no: ''
    },
    formData: [
      {
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        version: '1.4',
        inputList: [],
        isActive: true,
        isdisabled: false,
        itemdata: {
          colid: 181965,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          fkdisplay: 'drp', // 外键关联类型
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          serviceId: 'r3-cp',
          name: '店铺', // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          pid: '',
          valuedata: '', // 这个是选择的值
        },
        oneObj: () => {}
      },
      {
        style: 'date', // 输入框类型
        label: '退单修改时间', // 输入框前文字
        colname: 'startEndTimes',
        type: 'daterange',
        value: 'startEndTimes', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        format: 'yyyy-MM-dd HH:mm:ss',
        onChange: () => {}
      },
      {
        style: 'input', // 输入框类型
        label: '平台单号',
        value: 'bill_no', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => {}, // 表单回车事件
      },
      {
        style: 'input', // 输入框类型
        label: '服务单号',
        value: 'service_no', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => {}, // 表单回车事件
      }
    ],
    ruleValidate: {
      CP_C_SHOP_ID: [{
        required: true,
        message: ' '
      }]
    }
  },
  cancel: (self) => {
    const _this = self;
    _this.$OMS2.omsUtils.formEmpty(_this, 'downLoadFormConfig')
  },
  // 确定按钮
  determine: async (self) => {
    const formValue = self.downLoadFormConfig.formValue;
    if (
      !self.downLoadFormConfig.formData[0].itemdata.pid
    ) {
      self.$Message.warning($i18n.t('modalTips.be')); // 请选择需要下载的店铺
      return false;
    }
    const [start, end] = formValue.startEndTimes
    if (!(formValue.bill_no || start)) {
      self.$Message.warning('请输入退单修改时间或平台单号');
      return false;
    }
    const param = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid,
      bill_no: formValue.bill_no, // 平台单号
      service_no: formValue.service_no, // 服务单号
      start_time: start ? BurgeonDate.standardTimeConversiondateToStr(start) : '',
      end_time: end ? BurgeonDate.standardTimeConversiondateToStr(end) : '',
      table: self.$route.params.tableName // 当前表名 必传
    };
    self.dialogLoad = true;
    try {
      // 请求退单下载订单接口
      const { data: { code, message } } = await self.service.interfacePlatform.refundDownload(param);
      if (code === 0) {
        self.dialogLoad = false;
        self.$message.success(message);
        self.$emit('confirmImport');
        self.$emit('closeActionDialog', true);
      }
    } catch (error) {
      self.dialogLoad = false;
    }
  }
};
