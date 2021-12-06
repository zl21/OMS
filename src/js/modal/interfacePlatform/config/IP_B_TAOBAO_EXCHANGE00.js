// 淘宝换货单接口 - 换货单下载
export default {
  formConfig: {
    formValue: {
      shop_id: '', // 店铺id
      status: '', // 状态
      timerange: [], // 时间区间
      bill_no: '', // 退单单号
    },
    formData: [
      {
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        isActive: true,
        isdisabled: false,
        itemdata: {
          col: 1,
          colid: 167606,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
          length: 65535, // 最大长度是多少
          name: $it('other.shop'), // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          valuedata: '' // 这个是选择的值
        }
      },
      {
        style: 'radio', // 输入框类型
        label: $it('fL.changeOrderStatus'), // 换货单状态 输入框前文字
        value: 'status', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        options: [
          // radio选项
          {
            label: $it('com.all'), // 全部
            value: ''
          },
          {
            label: $it('fL.exchangePending'), // 换货待处理
            value: '1'
          }
        ]
      },
      {
        style: 'date', // 输入框类型
        label: $it('fL.changeOrderModify_time'), // 换货单修改时间 输入框前文字
        value: 'timerange', // 输入框的值
        type: 'datetimerange',
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        format: 'yyyy-MM-dd HH:mm:ss' // 时间格式
      },
      {
        style: 'input', // 输入框类型
        label: $it('fL.platformExchangeOrder_no'), // 平台换货单号 输入框前文字
        value: 'bill_no', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: '', // 占位文本，默认为请输入
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => { }, // 表单回车事件
        iconclick: () => { } // 点击icon图标事件
      }
    ]
  },
  // 确定按钮
  determine: async (self) => {
    if (!self.downLoadFormConfig.formData[0].itemdata.pid) {
      self.$Message.warning($it('tip.be'));// 请选择需要下载的店铺
      return false;
    }
    if (
      self.downLoadFormConfig.formValue.bill_no === ''
      && self.downLoadFormConfig.formValue.timerange[0] === '' && self.downLoadFormConfig.formValue.timerange[1] === ''
    ) {
      self.$Message.warning($it('tip.bu'));// 换单修改时间和换单单号不能同时为空
      return false;
    }
    const param = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid,
      bill_no: self.downLoadFormConfig.formValue.bill_no,
      start_time: $utils.standardTimeConversiondateToStr(self.downLoadFormConfig.formValue.timerange[0]),
      end_time: $utils.standardTimeConversiondateToStr(self.downLoadFormConfig.formValue.timerange[1]),
      status: self.downLoadFormConfig.formValue.status,
      table: 'IP_B_TAOBAO_EXCHANGE'
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(param));
    self.spinShow = true;
    const { data: { code, message } } = await self.service.interfacePlatform.exchangeDownload(fromdata);
    if (code === 0) {
      self.$Message.success(message);
      self.$emit('closeActionDialog', true);
      self.spinShow = false;
    } else {
      self.spinShow = false;
    }
  }
};
