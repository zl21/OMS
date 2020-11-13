import httpServer from 'framework/__utils__/request';

export default {
  // 京东订单接口列表界面(下载订单)
  formConfig: {
    formValue: {
      numNumber: ''
    },
    formData: [
      {
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        isActive: true,
        isdisabled: false,
        inputList: [
          {
            childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 'IN (19,999999)', valuedata: 2 }]
          }
        ],
        itemdata: {
          col: 1,
          colid: 167606,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            // expre: "equal",
            srccol: 'CP_C_SHOP_ID'
          },
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: vmI18n.t('other.shop'), // 店铺
          inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: window.vmI18n.t('other.shop'), // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_SHOP',
          reftableid: 24475,
          row: 1,
          statsize: -1,
          type: 'STRING',
          valuedata: '' // 这个是选择的值
        }
      },
      {
        style: 'date',
        type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
        value: 'query_date',
        label: window.vmI18n.t('form_label.platformTime'), // 平台时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      },
      {
        style: 'input', // 输入框类型
        label: window.vmI18n.t('form_label.returnNo'), // 退供单号 输入框前文字
        value: 'refund_nos', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: vmI18n.t('pHolder.z3'), // 多个退供单号，用逗号隔开 占位文本，默认为请输入
        ghost: false, // 是否关闭幽灵按钮，默认开启
      }
    ],
    // 表单非空提示
    ruleValidate: {
      numNumber: [{ required: true, message: ' ', trigger: 'blur' }]
      // 'query_date': [{ required: true }]
    }
  },
  // 确定按钮
  determine: async (self) => {
    const formValue = self.downLoadFormConfig.formValue;
    const shopId = self.downLoadFormConfig.formData[0].itemdata.pid;
    if (!shopId) {
      self.$message.error(self.vmI18n.t('modalTips.bw'));// 店铺不能为空
      return;
    }
    if (!formValue.query_date[0] && !formValue.refund_nos) {
      self.$message.error(self.vmI18n.t('pHolder.bw'));// 请输入平台时间或退供单号
      return;
    }
    self.dialogLoad = true;

    const params = {
      shop_id: shopId,
      refund_nos: formValue.refund_nos
    };
    if (formValue.query_date[0]) {
      params.start_time = self.standardTimeConversiondateToStr(formValue.query_date[0]);
      params.end_time = self.standardTimeConversiondateToStr(formValue.query_date[1]);
    }

    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(params));

    try {
      // 唯品会退单下载
      const { data: { code, message } } = await self.service.interfacePlatform.downLoadVipOrderRefund(fromdata);
      self.dialogLoad = false;
      if (code === 0) {
        self.$message.success(message);
        self.$emit('confirmImport');
        self.$emit('closeActionDialog', true);
      }
    } catch (error) {
      self.dialogLoad = false;
    }
    // httpServer({
    //   url: '/p/cs/downLoadVipOrderRefund',
    //   method: 'post',
    //   data: {
    //     param: JSON.stringify(params)
    //   }
    // }).then(res => {
    //   self.dialogLoad = false
    //   if (res.data.code === 0) {
    //     self.$message.success(res.data.message)
    //     self.$emit('confirmImport')
    //     self.$emit('closeActionDialog')
    //   }
    // }).catch(() => {
    //   self.dialogLoad = false
    // })
  }
};
