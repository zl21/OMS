export default {
  formConfig: {
    formValue: {
      orderStatus: '',
      startEndTimes: [],
      ware_id: '',
      item_num: ''
    },
    formData: [
      {
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        isActive: true,
        isdisabled: false,
        inputList: [
          {
            childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 3, valuedata: 3 }]
          }
        ],
        itemdata: {
          colid: 167606,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            expre: 'equal',
            srccol: 'CP_C_SHOP_ID'
          },
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          name: $it('other.shop'), // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          valuedata: '' // 这个是选择的值
        }
      },
      {
        style: 'date',
        type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
        value: 'startEndTimes',
        label: $it('fL.PlatformModifyTime'), // 平台修改时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      },
      {
        style: 'input', // 输入框类型
        label: $it('fL.goodsPID'), // 输入框前文字
        value: 'ware_id', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: '', // 占位文本，默认为请输入
        ghost: false // 是否关闭幽灵按钮，默认开启
      },
      {
        style: 'input', // 输入框类型
        label: $it('tL.productNo'), // 商品编码 输入框前文字
        value: 'item_num', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: '', // 占位文本，默认为请输入
        ghost: false // 是否关闭幽灵按钮，默认开启
      }
    ],
    ruleValidate: {}
  },
  // 确定按钮
  determine: async (self) => {
    const _this = self;
    const downData = _this.downLoadFormConfig;
    if (!downData.formData[0].itemdata.pid) {
      // 请选择需要下载的店铺
      _this.$Message.warning($it('tip.be'));
      return;
    }
    if (downData.formValue.startEndTimes[0] === '' && downData.formValue.ware_id === '' && downData.formValue.item_num === '') {
      _this.$Message.warning($it('tip.bq')); // 修改时间、商品PID、商品编码必填其一
      return;
    }
    const param = {
      shop_id: downData.formData[0].itemdata.pid,
      ware_id: downData.formValue.ware_id, // 商品id
      item_num: downData.formValue.item_num, // 商品编码
      start_time: $utils.standardTimeConversiondateToStr(downData.formValue.startEndTimes[0]), // 开始时间
      end_time: $utils.standardTimeConversiondateToStr(downData.formValue.startEndTimes[1]), // 结束时间
      table: _this.tablename // 当前表名 必传
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(param));
    const {
      data: { code, message }
    } = await _this.service.com.publicUrlParams('/p/cs/itemDownload', fromdata);
    if (code === 0) {
      _this.$Message.success(message);
      _this.$emit('closeActionDialog', true);
    } else {
      // _this.$Message.error(message);
    }
  }
};
