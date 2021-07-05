/*
 * @Author: your name
 * @Date: 2021-05-13 18:38:40
 * @LastEditTime: 2021-06-04 19:34:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/modal/interfacePlatform/config/IP_B_STANDPLAT_ORDER.js
 */
// 通用订单下载
import BurgeonDate from '@/assets/js/__utils__/date.js';
export default {
  formConfig: {
    formValue: {
      startEndTimes: [],
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
          name: '店铺', // 店铺 input前面显示的lable值
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
        label: $i18n.t('form_label.PlatformModifyTime'), // 平台修改时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      }
    ],
    ruleValidate: {
      CP_C_SHOP_ID: [{
        required: true,
        message: ' '
      }]
    }
  },
  // 确定按钮
  determine: async (self) => {
    const _this = self;
    const formValue = _this.downLoadFormConfig.formValue;
    if (!_this.downLoadFormConfig.formData[0].itemdata.pid) {
      // 请选择需要下载的店铺
      _this.$Message.warning($i18n.t('modalTips.be'));
      return;
    }
    const [start, end] = formValue.startEndTimes
    if (!start) {
      // _this.$Message.warning($i18n.t('modalTips.bp')); 
      self.$Message.warning('请输入平台修改时间'); // 请输入平台修改时间
      return false;
    }
    const param = {
      shop_id: _this.downLoadFormConfig.formData[0].itemdata.pid,
      start_time: start ? BurgeonDate.standardTimeConversiondateToStr(start) : '', // 开始时间
      end_time: end ? BurgeonDate.standardTimeConversiondateToStr(end) : '', // 结束时间
      table: self.$route.params.tableName // 当前表名 必传
    };
    const {
      data: { code, message }
    } = await _this.service.interfacePlatform.orderDownload(param);
    if (code === 0) {
      _this.$Message.success(message);
      _this.$emit('closeActionDialog', true);
    } else {
      // _this.$Message.error(message);
    }
  }
};
