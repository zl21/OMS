import formatData from '@/assets/js/__utils__/date.js';

export default {
  // 京东退单接口列表界面(下载退单)
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
            childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 4, valuedata: 2 }]
          }
        ],
        itemdata: {
          col: 1,
          colid: 167606,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            expre: 'equal',
            srccol: 'CP_C_SHOP_ID'
          },
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: window.vmI18n.t('other.shop'), // 店铺 
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
        label: '订单号', // 订单号 输入框前文字
        value: 'bill_no', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => { }, // 表单回车事件
        iconclick: () => { }, // 点击icon图标事件
      },
      {
        style: 'input', // 输入框类型
        label: '服务单号', // 订单号 输入框前文字
        value: 'service_no', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => { }, // 表单回车事件
        iconclick: () => { }, // 点击icon图标事件
      }
    ],
    // 表单非空提示
    ruleValidate: {
      numNumber: [{ required: true, message: ' ', trigger: 'blur' }],
      // query_date: [{ required: true }],
      // bill_no: [{ required: true, message: ' ' }],
      // service_no: [{ required: true, message: ' ' }]
    }
  },
  // 确定按钮
  determine: async (self) => {
    const formValue = self.downLoadFormConfig.formValue;
    const shopId = self.downLoadFormConfig.formData[0].itemdata.pid;
    if (!shopId) return self.$message.error('店铺不能为空'); // 店铺不能为空
    // let index = 0
    // if (formValue.query_date[0]) index += 1
    // if (formValue.bill_no) index += 1
    // if (formValue.service_no) index += 1
    // if (index != 1) {
    //   self.$message.error('平台时间,订单号,服务单号只能三选一!');// 店铺和平台时间不能为空
    //   return;
    // }
    // 2021-03/08 再次修改
    // 平台时间 和 (订单号, 服务单号) 是二选一的,  而且没有时间的话,  订单号, 服务单号必须同时有
    console.log(formValue.query_date)
    if (formValue.query_date[0]) {
      if (formValue.bill_no !== undefined || formValue.service_no !== undefined) {
        return self.$message.error('平台时间存在时,订单号、服务单号必须为空!');
      }
    } else {
      if (!formValue.bill_no || !formValue.service_no) {
        return self.$message.error('平台时间不存在时,订单号、服务单号必须同时有!');
      }
    }
    self.dialogLoad = true;
    const params = {
      table: self.$route.params.tableName,
      shop_id: shopId,
      start_time: formatData.standardTimeConversiondateToStr(formValue.query_date[0]),
      end_time: formatData.standardTimeConversiondateToStr(formValue.query_date[1]),
      bill_no: formValue.bill_no,
      service_no: formValue.service_no
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(params));
      
    try {
      // 请求退单下载订单接口
      const { data: { code, message } } = await self.service.interfacePlatform.refundDownload(fromdata);
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
