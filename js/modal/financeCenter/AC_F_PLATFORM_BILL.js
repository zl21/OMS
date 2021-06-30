
  import dateUtil from '@/assets/js/__utils__/date.js';
  export default {
    // 支付宝原始账单-下载账单
    formConfig: {
      formValue: {
        isDate: 'true',
        accountCode: ''
      },
      formData: [
        {
          style: 'popInputPlus', // 输入框弹框单多选
          width: '24',
          isActive: true,
          isdisabled: false,
          itemdata: {
            version: '1.4',
            col: 1,
            colid: 182262,
            colname: 'AC_F_ALIPAY_ACCOUNTMANAGE_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能
            fkdisplay: 'drp', // 外键关联类型，mrp表示下拉多选
            fkdesc: '账户名称',
            inputname: 'AC_F_ALIPAY_ACCOUNTMANAGE_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: true, // 是否必填
            isuppercase: false, // 是否转大写
            isBackRowItem: true,
            serviceId: 'r3-ac',
            length: 65535, // 最大长度是多少
            name: '支付宝账户名称', // input前面显示的lable值
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: 'AC_F_ALIPAY_ACCOUNT_MANAGEMENT', // 对应的表
            reftableid: 249230505, // 对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING',
            columnsKey: ['ALIPAY_ACCOUNT_NAME'],
            valuedata: '' // 这个是选择的值
          },
          oneObj: (e) => {
            console.log(e);
            const { rowItem } = e
            window.custSelf.downLoadFormConfig.formValue.accountCode = rowItem ? rowItem.ALIPAY_ACCOUNT_NAME.val : ''
          }
        },
        {
          style: 'radio', // 输入框类型
          label: '下载方式', // 输入框前文字
          value: 'isDate', // 输入框的值
          width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
          options: [
            // radio选项
            {
              label: '按日下载',
              value: 'true'
            },
            {
              label: '按月下载',
              value: 'false'
            },
          ],
          radioChange: () => {
            if (window.custSelf.downLoadFormConfig.formValue.isDate === 'true') {
              window.custSelf.downLoadFormConfig.formData[2].type = 'date';
              window.custSelf.downLoadFormConfig.formData[2].format = 'yyyy-MM-dd';
            } else {
              window.custSelf.downLoadFormConfig.formData[2].type = 'month';
              window.custSelf.downLoadFormConfig.formData[2].format = 'yyyy-MM';
            }
            window.custSelf.downLoadFormConfig.formValue.query_date = '';
          }
        },
        {
          style: 'date',
          type: 'date', // 日期组件类型,默认为data  (daterange)为双日期区间选择
          value: 'query_date',
          label: '账单时间',
          width: '24',
          format: 'yyyy-MM-dd', // 格式参照burgeonui
          placeholder: ''
        },
      ],
      // 表单非空提示
      ruleValidate: {
        query_date: [{ required: true, message: ' ' }]
      }
    },
    determine: async (self) => {
      const formValue = self.downLoadFormConfig.formValue;
      if (!self.downLoadFormConfig.formData[0].itemdata.pid) {
        self.$Message.warning('请选择需要下载的支付宝账户名称');
        return;
      }
      if (!formValue.query_date) {
        self.$Message.warning('请选择需要下载的账单时间');
        return;
      }
      let startTime = formValue.query_date;
      startTime = dateUtil.getFormatDate(startTime, 'yyyy-MM-dd');
      const param = {
        table: 'AC_F_PLATFORM_BILL',
        accountCode: formValue.accountCode, // 账户名称 必传
        startTime,
        isDate: formValue.isDate == 'true',
      };
      self.service.financeCenter.triggerAlipayBill(param).then(res => {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.$emit('confirmImport');
          self.$emit('closeActionDialog');
        }
      }); 
    }
  };
  