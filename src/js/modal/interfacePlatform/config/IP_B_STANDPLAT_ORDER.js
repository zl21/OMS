/*
 * @Author: your name
 * @Date: 2021-05-13 18:38:40
 * @LastEditTime: 2021-06-04 19:34:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/modal/interfacePlatform/config/IP_B_STANDPLAT_ORDER.js
 */
// 通用订单下载
export default {
  formConfig: {
    formValue: {
      startEndTimes: [],
      bill_no: ''
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
          colid: 169657,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          fkdisplay: 'drp', // 外键关联类型
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          serviceId: 'r3-cp',
          name: $it('other.shop'), // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          pid: '',
          valuedata: '', // 这个是选择的值
        },
        oneObj: () => {}
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
        label: $it('fL.platform_billNo'), // 平台单号 输入框前文字
        value: 'bill_no', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: '', // 占位文本，默认为请输入
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => { }, // 表单回车事件
        iconclick: () => { } // 点击icon图标事件
        // setRequired: "required" //必选标识,值不为required时无标识
      }
    ],
    ruleValidate: {
      CP_C_SHOP_ID: [{
        required: true,
        message: ' '
      }]
    }
  },
  init: (self) => {
    self.$OMS2.omsUtils.formEmpty(self, 'downLoadFormConfig')
  },
  // 确定按钮
  determine: async (self) => {
    const _this = self;
    const formValue = _this.downLoadFormConfig.formValue;
    if (!_this.downLoadFormConfig.formData[0].itemdata.pid) {
      // 请选择需要下载的店铺
      _this.$Message.warning($it('tip.be'));
      return;
    }
    const [start, end] = formValue.startEndTimes
    if (!(formValue.bill_no || start)) {
      // _this.$Message.warning($it('tip.bp')); 
      self.$Message.warning($it('tip.hf')); // 请输入平台修改时间或平台单号
      return false;
    }
    const param = {
      shop_id: _this.downLoadFormConfig.formData[0].itemdata.pid,
      bill_no: formValue.bill_no, // 订单编号
      start_time: start ? $utils.standardTimeConversiondateToStr(start) : '', // 开始时间
      end_time: end ? $utils.standardTimeConversiondateToStr(end) : '', // 结束时间
      table: self.$route.params.tableName // 当前表名 必传
    };
    const {
      data: { code, message }
    } = await _this.service.interfacePlatform.orderDownload(param);
    if (code === 0) {
      _this.$Message.success(message);
      _this.$emit('closeActionDialog', true);
    }
  }
};
