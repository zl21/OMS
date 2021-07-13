import BurgeonDate from '@/assets/js/__utils__/date.js';
export default {
  // JITX寻仓接口列表界面(寻仓订单下载)
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
            childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 50, valuedata: 2 }]
          }
        ],
        itemdata: {
          col: 1,
          colid: 168770,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            expre: 'equal',
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
        style: 'radio', // 单选框
        label: $i18n.t('other.orderState'), // 订单状态 前面字段
        width: '24', // 宽度
        value: 'order_status', // 绑定到formValue的值
        setRequired: '', // 必选标识,值不为required时无标识
        options: [ // radio选项
          {
            value: 'NEW',
            label: $i18n.t('form_label.newlyBuild'), // 新建
          },
          {
            value: 'CONFIRMING',
            label: $i18n.t('form_label.confirming'), // 确认中
          },
          {
            value: 'CONFIRMED',
            label: $i18n.t('form_label.confirmed_as_JITX'), // 确认为JITX
          },
          {
            value: 'ROLLBACK',
            label: $i18n.t('form_label.confirmed_as_non_JITX'), // 确认为非JITX
          }
        ]
      },
      {
        style: 'date',
        type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
        value: 'query_date',
        label: $i18n.t('form_label.orderTime'), // 下单时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      },
    ],
    // 表单非空提示
    ruleValidate: {
      numNumber: [{ required: true, message: ' ', trigger: 'blur' }],
      query_date: [{ required: true, message: ' ', trigger: 'blur' }]
    }
  },
  cancel: (self) => {
    const _this = self;
    _this.$OMS2.omsUtils.formEmpty(_this, 'downLoadFormConfig')
  },
  // 确定按钮
  determine: async (self) => {
    let formValue = self.downLoadFormConfig.formValue
    if (
      !self.downLoadFormConfig.formData[0].itemdata.pid
    ) {
      self.$Message.warning($i18n.t('modalTips.be'));// 请选择需要下载的店铺
      return false;
    }
    const [start, end] = formValue.query_date
    if (!start) {
      self.$Message.warning('请选择下单时间');
      return false;
    }
    const param = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid, // 店铺id 必传
      order_status: self.downLoadFormConfig.formValue.order_status,
      start_time: start ? BurgeonDate.standardTimeConversiondateToStr(start) : '',
      end_time: end ? BurgeonDate.standardTimeConversiondateToStr(end) : '',
      table: self.$route.params.tableName // 当前表名 必传
    };
    // 寻仓订单下载
    const { data: { code, message } } = await self.service.interfacePlatform.orderDownload(param);
    if (code === 0) {
      self.$Message.success(message);
      self.$emit('confirmImport');
      self.$emit('closeActionDialog', true);
      self.$OMS2.omsUtils.formEmpty(self, 'downLoadFormConfig')
    }
  }
};
