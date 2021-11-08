export default {
  // 唯品会退工单（退供单下载）
  formConfig: {
    formValue: {
      numNumber: ''
    },
    formData: [
      {
        version: '1.4',
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
          colid: 170109,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            // expre: "equal",
            srccol: 'CP_C_SHOP_ID'
          },
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: $i18n.t('other.shop'), // 店铺
          inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          serviceId: 'r3-cp',
          length: 65535, // 最大长度是多少
          name: $i18n.t('other.shop'), // 店铺 input前面显示的lable值
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
        label: $i18n.t('form_label.platformTime'), // 平台时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.returnNo'), // 退供单号 输入框前文字
        value: 'bill_no', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: $i18n.t('pHolder.z3'), // 多个退供单号，用逗号隔开 占位文本，默认为请输入
        ghost: false, // 是否关闭幽灵按钮，默认开启
      }
    ],
    // 表单非空提示
    ruleValidate: {
      numNumber: [{ required: true, message: ' ', trigger: 'blur' }]
      // 'query_date': [{ required: true }]
    }
  },
  init: (self) => {
    self.$OMS2.omsUtils.formEmpty(self, 'downLoadFormConfig')
  },
  // 确定按钮
  determine: async (self) => {
    const formValue = self.downLoadFormConfig.formValue;
    const shopId = self.downLoadFormConfig.formData[0].itemdata.pid;
    if (!shopId) {
      self.$Message.warning($i18n.t('modalTips.do'));// 店铺不能为空
      return;
    }
    if (!formValue.query_date[0] && !formValue.bill_no) {
      self.$Message.warning($i18n.t('modalTips.bw'));// 请输入平台时间或退供单号
      return;
    }
    self.dialogLoad = true;

    const params = {
      table: self.$route.params.tableName,
      shop_id: shopId,
      bill_no: formValue.bill_no
    };
    if (formValue.query_date[0]) {
      params.start_time = $utils.standardTimeConversiondateToStr(formValue.query_date[0]);
      params.end_time = $utils.standardTimeConversiondateToStr(formValue.query_date[1]);
    }
    try {
      // 唯品会退单下载
      const { data: { code, message } } = await self.service.interfacePlatform.orderDownload(params);
      self.dialogLoad = false;
      if (code === 0) {
        self.$Message.success(message);
        self.$emit('confirmImport');
        self.$emit('closeActionDialog', true);
      }
    } catch (error) {
      self.dialogLoad = false;
    }
  }
};
