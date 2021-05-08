import i18n from '@burgeon/internationalization/i18n/i18n';
export default {
  // 云雀2.0-商品管理-渠道商品-下载商品
  modalTitle: '下载商品',
  formConfig: {
    formValue: {
      orderStatus: '',
      startEndTimes: [],
      orderNum: '',
      dta: '1'
    },
    formData: [{
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        inputList: [],
        isActive: true,
        isdisabled: false,
        itemdata: {
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            expre: 'equal',
            srccol: 'CP_C_SHOP_ID'
          },
          col: 1,
          colid: 167606,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: '平台', // 平台
          inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: '平台', // 平台 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_SHOP',
          reftableid: 24475,
          row: 1,
          statsize: -1,
          type: 'STRING',
          pid: '',
          valuedata: '', // 这个是选择的值
        }
      },
      {
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        inputList: [{
          childs: [{
            colname: 'CP_C_SHOP_ID',
            refobjid: 50,
            valuedata: 2
          }]
        }],
        isActive: true,
        isdisabled: false,
        itemdata: {
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            expre: 'equal',
            srccol: 'CP_C_SHOP_ID'
          },
          col: 1,
          colid: 167606,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: i18n.t('other.shop'), // 店铺
          inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: i18n.t('other.shop'), // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_SHOP',
          reftableid: 24475,
          row: 1,
          statsize: -1,
          type: 'STRING',
          pid: '',
          valuedata: '', // 这个是选择的值
        }
      },
      {
        style: 'input', // 输入框类型
        label: '平台宝贝ID',
        value: 'orderNum', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => {}, // 表单回车事件
      }
    ],
    ruleValidate: {
      orderNum: [{
        required: true,
        message: ' ',
        trigger: 'blur'
      }]
    }
  },
  // 确定按钮
  determine: async (self) => {
    const formValue = self.downLoadFormConfig.formValue;
    if (
      !self.downLoadFormConfig.formData[0].itemdata.pid
    ) {
      self.$Message.warning(i18n.t('modalTips.be')); // 请选择需要下载的店铺
      return false;
    }
    if (formValue.orderNum === '') {
      self.$Message.warning(i18n.t('pHolder.z1')); // 请输入平台单号
      return;
    }
    if (formValue.orderStatus === undefined) {
      self.$Message.warning(i18n.t('pHolder.z2')); // 请选择订单状态
      return;
    }
    const param = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid,
      bill_no: formValue.orderNum, // 订单编号
      status: formValue.orderStatus, // 状态 必传 给默认值
      table: self.$route.params.tableName // 当前表名 必传
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(param));

    // 请求下载订单接口
    const {
      data: {
        code,
        message
      }
    } = await self.service.interfacePlatform.orderDownload(fromdata);
    if (code === 0) {
      self.downLoadModal = true;
      const orderNum = self.downLoadFormConfig.formValue.orderNum;
      if (orderNum) {
        self.$Message.success(message);
        self.$emit('closeActionDialog', true);
      } else {
        self.taskId = message.match(/\d+/)[0];
        self.downLoadModal = true;
      }
    }
  }
};