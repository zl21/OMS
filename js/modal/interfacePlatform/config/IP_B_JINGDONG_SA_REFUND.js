import BurgeonDate from '@/assets/js/__utils__/date';
export default {
  // 下载取消订单
  formConfig: {
    formValue: {
      startEndTimes: []
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
          colid: 169576,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          fkdisplay: 'drp', // 外键关联类型
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          name: '店铺', // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          pid: '',
          valuedata: '', // 这个是选择的值
        },
        oneObj: () => {}
      },
      {
        style: 'date', // 输入框类型
        label: '申请时间', // 输入框前文字
        colname: 'startEndTimes',
        type: 'daterange',
        value: 'startEndTimes', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        format: 'yyyy-MM-dd HH:mm:ss',
        onChange: () => {}
      }
    ],
    ruleValidate: {
      CP_C_SHOP_ID: [{
        required: true,
        message: ' '
      }]
    }
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
    if (!start) {
      self.$Message.warning('请输入申请时间'); // 请输入申请时间
      return false;
    }
    const param = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid,
      start_time: BurgeonDate.standardTimeConversiondateToStr(start),
      end_time: BurgeonDate.standardTimeConversiondateToStr(end),
      table: self.$route.params.tableName // 当前表名 必传
    };

    // 请求下载订单接口
    const {
      data: {
        code,
        message
      }
    } = await self.service.interfacePlatform.refundDownload(param);
    if (code === 0) {
      self.$Message.success(message);
      self.$emit('closeActionDialog', true);
    }
  }
};
