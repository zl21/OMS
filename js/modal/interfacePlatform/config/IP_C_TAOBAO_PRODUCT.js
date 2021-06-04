import BurgeonDate from '@/assets/js/__utils__/date.js';
export default {
  // 商品中心 - 淘宝商品（下载商品）
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
            childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 2, valuedata: 2 }]
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
          name: $i18n.t('other.shop'), // 店铺input前面显示的lable值
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
        style: 'input', // 输入框类型
        label: $i18n.t('form_label.platformCommodityID'), // 平台商品ID 输入框前文字 输入框前文字
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
        label: $i18n.t('table_label.modificationTime'), // 修改时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      }
    ]
  },
  // 确定按钮
  determine: async (self) => {
    const paramTime = self.downLoadFormConfig.formValue.timeArr || [];
    if (!self.downLoadFormConfig.formData[0].itemdata.pid) {
      self.$Message.warning($i18n.t('modalTips.be'));// 请选择需要下载的店铺
      return false;
    }
    if (
      self.downLoadFormConfig.formValue.numNumber === ''
        && paramTime[0] === ''
    ) {
      self.$Message.warning($i18n.t('modalTips.bx'));// 请输入需要下载的数字编号或修改时间中的一个
      return false;
    }
    const param = {
      shop_id: self.downLoadFormConfig.formData[0].itemdata.pid, // 店铺id 必传
      item_num: self.downLoadFormConfig.formValue.numNumber, // 数字编号 必传
      table: 'IP_C_TAOBAO_PRODUCT', // 表名字 必传
      start_time: BurgeonDate.standardTimeConversiondateToStr(paramTime[0]),
      end_time: BurgeonDate.standardTimeConversiondateToStr(paramTime[1])
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(param));
    const res = await self.service.common.itemDownload(fromdata);
    if (res.data.code === 0) {
      self.$Message.success(res.data.message);
      self.$emit('confirmImport');
      self.$emit('closeActionDialog');
    } else {
      self.$Message.error(res.data.message);
    }
  }
};
