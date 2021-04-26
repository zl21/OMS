// import httpServer from 'framework/__utils__/request';
import BurgeonDate from '@/assets/js/__utils__/date.js';

export default {
  // 唯品会 - 淘宝商品（下载商品）
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
            childs: [
              { colname: 'CP_C_SHOP_ID', refobjid: 19, valuedata: 2 }
            ]
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
          name: window.vmI18n.t('other.shop'), // 店铺//input前面显示的lable值
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
        label: window.vmI18n.t('form_label.PlatformModifyTime'), // 平台修改时间
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
  determine: async (self) => {
    const formValue = self.downLoadFormConfig.formValue;
    const shopId = self.downLoadFormConfig.formData[0].itemdata.pid;
    if (!shopId || !formValue.query_date[0]) {
      self.$message.error(self.vmI18n.t('modalTips.bt'));// 店铺和平台时间不能为空
      return;
    }
    const params = JSON.stringify({
      shop_id: shopId,
      start_time: BurgeonDate.standardTimeConversiondateToStr(formValue.query_date[0]),
      end_time: BurgeonDate.standardTimeConversiondateToStr(formValue.query_date[1])
    });
    self.dialogLoad = true;
    // console.log(R3.network);
    try {
      const { data: { code, message } } = await self.service.strategyPlatform.vipItemGet({ param: params });
      if (code === 0) {
        this.$message.success(message);
        this.$emit('confirmImport');
        this.$emit('closeActionDialog');
      } else {
        this.$Message.error(message);
      }
    } catch {
      console.log(err);
    } finally{
      self.dialogLoad = false;
    }
  }
};
