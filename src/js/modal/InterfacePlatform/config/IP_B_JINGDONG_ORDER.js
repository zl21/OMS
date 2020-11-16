export default {
  // 京东订单接口列表界面(下载订单)
  formConfig: {
    formValue: {
      orderStatus: 'WAIT_SELLER_STOCK_OUT',
      startEndTimes: [],
      orderNum: '',
      dta: '1'
    },
    formData: [
      {
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        inputList: [
          {
            childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 4, valuedata: 2 }]
          }
        ],
        isActive: true,
        isdisabled: false,
        itemdata: {
          refcolval: {
            fixcolumn: 'CP_C_PLATFORM_ID',
            expre: 'equal',
            srccol: 'CP_C_SHOP_ID'
          },
          col: 1,
          colid: 167606,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: window.vmI18n.t('other.shop'), // 店铺
          inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: window.vmI18n.t('other.shop'), // 店铺 input前面显示的lable值
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
        style: 'radio', // 单选框
        label: window.vmI18n.t('other.orderState'), // 订单状态 前面字段
        width: '24', // 宽度
        value: 'orderStatus', // 绑定到formValue的值
        // radioChange: ()=>{alert('123')}, //切换时的方法
        // setRequired: "required", //必选标识,值不为required时无标识
        options: [
          {
            label: window.vmI18n.t('panel_label.all'), // 全部
            value: ''
          },
          {
            label: window.vmI18n.t('other.toBeDelivered'), // 待发货
            value: 'WAIT_SELLER_STOCK_OUT'
          }
        ]
      },
      {
        style: 'date',
        type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
        value: 'startEndTimes',
        label: window.vmI18n.t('form_label.PlatformModifyTime'), // 平台修改时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      },
      {
        style: 'input', // 输入框类型
        label: window.vmI18n.t('table_label.platform_orderNo'), // 平台单号 输入框前文字
        value: 'orderNum', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: window.vmI18n.t('pHolder.z0'), // 多个平台单号，用逗号分隔 占位文本，默认为请输入
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => { }, // 表单回车事件
        iconclick: () => { } // 点击icon图标事件
        // setRequired: "required" //必选标识,值不为required时无标识
      }
    ]
  },
  // 确定按钮
  determine: async (self) => {
    if (
      !self.downLoadFormConfig.formData[0].itemdata.pid
    ) {
      self.$Message.warning(self.vmI18n.t('modalTips.be'));// 请选择需要下载的店铺
      return false;
    }
    if (
      self.downLoadFormConfig.formValue.startEndTimes
        .length === 0
      && self.downLoadFormConfig.formValue.orderNum === ''
    ) {
      self.$Message.warning(self.vmI18n.t('modalTips.bs'));// 请选择输入的日期或输入订单编号
      return false;
    }
    const param = {
      shop_id:
        self.downLoadFormConfig.formData[0].itemdata.pid,
      bill_no: self.downLoadFormConfig.formValue.orderNum, // 订单编号
      start_time: self.standardTimeConversiondateToStr(
        self.downLoadFormConfig.formValue.startEndTimes[0]
      ), // 开始时间
      end_time: self.standardTimeConversiondateToStr(
        self.downLoadFormConfig.formValue.startEndTimes[1]
      ), // 结束时间
      status:
        self.downLoadFormConfig.formValue.orderStatus, // 状态 必传 给默认值
      table: self.$route.params.tableName // 当前表名 必传
    };
    const fromdata = new FormData();
    fromdata.append('param', JSON.stringify(param));

    // 请求下载订单接口
    const { data: { code, message } } = await self.service.interfacePlatform.orderDownload(fromdata);
    console.log(code, message);
    if (code === 0) {
      self.taskId = message.match(/\d+/)[0];
      self.downLoadModal = true;
    } else {
      self.$Message.error(message);
    }
  }
};
