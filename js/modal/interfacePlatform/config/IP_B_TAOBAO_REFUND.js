import BurgeonDate from '@/assets/js/__utils__/date.js';
import i18n from '@burgeon/internationalization/i18n/i18n';
window.$i18n = i18n;
export default {
  // 淘宝退单接口列表界面(淘宝退单下载)
  formConfig: {
    formValue: {
      shop_id: '', // 店铺id
      status: '', // 状态
      timerange: [], // 时间区间
      bill_no: '', // 退单单号
    },
    formData: [
      {
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        isActive: true,
        isdisabled: false,
        version:'1.4',
        itemdata: {
          serviceId:'r3-cp',
          col: 1,
          colid: 168348,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: $i18n.t('other.shop'), // 店铺 
          inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
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
        },
        oneObj: (val) => {
          console.log(val);
         }
      },
      {
        style: 'radio', // 输入框类型
        label: $i18n.t('form_label.chargebackStatus'), // 退单状态输入框前文字
        value: 'status', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        options: [
          // radio选项
          {
            label: $i18n.t('panel_label.all'), // 全部
            value: ''
          },
          {
            label: $i18n.t('form_label.staySellerAgrees'), // 待卖家同意
            value: 'WAIT_SELLER_AGREE'
          }
        ]
      },
      {
        style: 'date', // 输入框类型
        label: $i18n.t('form_label.chargebackModifyTime'), // 退单修改时间 输入框前文字
        value: 'timerange', // 输入框的值
        type: 'datetimerange',
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        format: 'yyyy-MM-dd HH:mm:ss' // 时间格式
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.platform_returnOrder_no'), // 平台退货单号 输入框前文字
        value: 'bill_no', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: '', // 占位文本，默认为请输入
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => {}, // 表单回车事件
        iconclick: () => {} // 点击icon图标事件
      }
    ]
  },
  // 确定按钮
  determine: async (self) => {
    if (!self.downLoadFormConfig.formData[0].itemdata.pid) {
      self.$Message.warning($i18n.t('modalTips.be'));// 请选择需要下载的店铺
      return false;
    }
    if (
      self.downLoadFormConfig.formValue.bill_no === ''
      && self.downLoadFormConfig.formValue.timerange[0] === '' && self.downLoadFormConfig.formValue.timerange[1] === ''
    ) {
      self.$Message.warning($i18n.t('modalTips.bv'));// 退单修改时间和退单单号不能同时为空
      return false;
    }
    const params = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid,
      bill_no: self.downLoadFormConfig.formValue.bill_no,
      start_time: BurgeonDate.standardTimeConversiondateToStr(self.downLoadFormConfig.formValue.timerange[0]),
      end_time: BurgeonDate.standardTimeConversiondateToStr(self.downLoadFormConfig.formValue.timerange[1]),
      status: self.downLoadFormConfig.formValue.status,
      table: 'IP_B_TAOBAO_REFUND'
    };
    // const fromdata = new FormData();
    // fromdata.append('param', JSON.stringify(params));

    // 请求退单下载订单接口
    const { data: { code, message } } = await self.service.interfacePlatform.refundDownload(params);
    if (code === 0) {
      self.$Message.success(message);
      self.$emit('closeActionDialog', true);
    }
  }
};
