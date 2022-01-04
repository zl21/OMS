export default {
  // 商品中心 - 淘宝商品（下载商品）
  formConfig: {
    formValue: {
      numNumber: ''
    },
    formData: [
      {
        version: '1.3',
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        inputList: [
          {
            childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 2, valuedata: 2 }]
          }
        ],
        isActive: true,
        isdisabled: false,
        itemdata: {
          serviceId: 'r3-cp',
          colid: 167606,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            expre: 'equal',
            srccol: 'CP_C_SHOP_ID'
          },
          fkdisplay: 'drp', // 外键关联类型
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          name: $it('other.shop'), // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          pid: '',
          valuedata: '', // 这个是选择的值
        },
        oneObj: () => {}
      },
      {
        style: 'input', // 输入框类型
        label: $it('fL.ba'), // 商品数字ID 输入框前文字
        value: 'numNumber', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: '', // 占位文本，默认为请输入
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => {}, // 表单回车事件
        iconclick: () => {} // 点击icon图标事件
      },
      {
        style: 'date',
        type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
        value: 'timeArr',
        label: $it('tL.modificationTime'), // 修改时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      }
    ]
  },
  init: (self) => {
    self.$OMS2.omsUtils.formEmpty(self, 'downLoadFormConfig')
  },
  // 确定按钮
  determine: async (self) => {
    const formValue = self.downLoadFormConfig.formValue;
    if (!self.downLoadFormConfig.formData[0].itemdata.pid) {
      self.$Message.warning($it('tip.be'));// 请选择需要下载的店铺
      return false;
    }
    const [start, end] = formValue.timeArr
    if (!(formValue.numNumber || start)) {
      self.$Message.warning($it('tip.bx'));// 请输入需要下载的数字编号或修改时间中的一个
      return false;
    }
    const param = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid, // 店铺id 必传
      item_num: formValue.numNumber, // 数字编号 必传
      table: 'IP_C_TAOBAO_PRODUCT', // 表名字 必传
      start_time: start ? $utils.standardTimeConversiondateToStr(start) : '',
      end_time: end ? $utils.standardTimeConversiondateToStr(end) : ''
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(param));
    const res = await self.service.interfacePlatform.itemDownload(fromdata);
    if (res.data.code === 0) {
      self.$Message.success(res.data.message);
      // self.$emit('confirmImport');
      self.$emit('closeActionDialog');
    }
  }
};
