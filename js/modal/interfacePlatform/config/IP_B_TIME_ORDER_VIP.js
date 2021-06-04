/*
 * @Author: your name
 * @Date: 2021-06-04 19:30:53
 * @LastEditTime: 2021-06-04 19:35:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/modal/interfacePlatform/config/IP_B_TIME_ORDER_VIP.js
 */
import BurgeonDate from '@/assets/js/__utils__/date.js';
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
            childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 50, valuedata: 2 }]
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
          fkdesc: $i18n.t('other.shop'), // 店铺
          inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
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
        label: $i18n.t('form_label.queryTime'), // 查询时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      }
    ],
    // 表单非空提示
    ruleValidate: {
      numNumber: [{ required: true, message: ' ', trigger: 'blur' }],
      query_date: [{ required: true }]
    }
  },
  // 确定按钮
  determine: async self => {
    if (!self.downLoadFormConfig.formData[0].itemdata.pid) {
      self.$Message.warning($i18n.t('modalTips.be')); // 请选择需要下载的店铺
      return;
    }
    if (!self.downLoadFormConfig.formValue.query_date[0]) {
      self.$Message.warning($i18n.t('modalTips.br')); // 请选择需要下载的查询时间
      return;
    }
    let startTime = self.downLoadFormConfig.formValue.query_date[0];
    let endTime = self.downLoadFormConfig.formValue.query_date[1];
    if (startTime) {
      startTime = BurgeonDate.standardTimeConversiondateToStr(startTime);
    }
    if (endTime) {
      endTime = BurgeonDate.standardTimeConversiondateToStr(endTime);
    }
    const param = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid, // 店铺id 必传
      start_time: startTime,
      end_time: endTime
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(param));

    // 实效订单下载
    const {
      data: { code, message }
    } = await self.service.interfacePlatform.downLoadVipTimeOrder(fromdata);
    if (code === 0) {
      self.$Message.success(message);
      self.$emit('confirmImport');
      self.$emit('closeActionDialog', true);
    }
  }
};
