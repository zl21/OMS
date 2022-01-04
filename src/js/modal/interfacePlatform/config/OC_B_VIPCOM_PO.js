export default {
  // 云雀2.0-订单中心-订单管理-唯品会-下载PO单
  modalTitle: '下载PO单',
  formConfig: {
    formData: [{
        version: '1.3',
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
          col: 1,
          colid: 168464,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: $it('other.shop'), // 店铺
          inputname: 'CP_C_SHOP_ID:CP_C_SHOP_TITLE', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          serviceId: 'r3-cp',
          length: 65535, // 最大长度是多少
          name: $it('other.shop'), // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_SHOP',
          reftableid: 10348,
          row: 1,
          statsize: -1,
          type: 'STRING',
          pid: '',
          valuedata: '', // 这个是选择的值
        }
      },
      {
        style: 'input', // 输入框类型
        label: $it('fL.cx'), // PO编号
        value: 'PO_NO', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => {}, // 表单回车事件
      }
    ],
    formValue: {
      PO_NO: ''
    },
    ruleValidate: {}
  },
  init: (self) => {
    self.$OMS2.omsUtils.formEmpty(self, 'downLoadFormConfig')
  },
  // 确定按钮
  determine: async (self) => {
    const formValue = self.downLoadFormConfig.formValue;
    if (
      !self.downLoadFormConfig.formData[0].itemdata.pid
    ) {
      self.$Message.warning($it('tip.be')); // 请选择需要下载的店铺
      return false;
    }
    const param = {
      CP_C_SHOP_ID: self.downLoadFormConfig.formData[0].itemdata.pid,
      PO_NO: formValue.PO_NO,
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(param));

    // 请求下载订单接口
    const {
      data: {
        code,
        message
      }
    } = await self.service.orderCenter.downloadPO(fromdata);
    if (code === 0) {
      self.$Message.success(message);
      self.$emit('closeActionDialog', true);
    }
  }
};
