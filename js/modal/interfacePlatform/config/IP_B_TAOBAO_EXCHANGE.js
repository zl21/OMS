// 通用商品
import BurgeonDate from '@/assets/js/__utils__/date.js';
export default {
  formConfig: {
    formValue: {
      orderStatus: 'WAIT_SELLER_STOCK_OUT',
      startEndTimes: [],
      sp_ids: ''
    },
    ruleValidate: {
      sp_id: [{ required: true, message: ' ', trigger: 'blur' }]
    },
    formData: [
      {
        style: 'popInput', // 输入框弹框单多选
        width: '24',
        version:'1.4',
        itemdata: {
          colid: 168348,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          display: 'OBJ_FK', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          serviceId: 'r3-cp',
          name: $i18n.t('other.shop'), // 店铺 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          pid: '',
          valuedata: '' // 这个是选择的值
        }
      },
      {
        style: 'radio', // 单选框
        label: $i18n.t('other.orderState'), // 订单状态 前面字段
        width: '24', // 宽度
        value: 'orderStatus', // 绑定到formValue的值
        // radioChange: ()=>{alert('123')}, //切换时的方法
        // setRequired: "required", //必选标识,值不为required时无标识
        options: [
          {
            label: $i18n.t('panel_label.all'), // 全部
            value: ''
          },
          {
            // label: $i18n.t('other.toBeDelivered'), // 待发货
            label: '换货待发货', // 换货待发货
            value: 'WAIT_SELLER_STOCK_OUT'
          }
        ]
      },
      {
        style: 'date',
        type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
        value: 'startEndTimes',
        label: $i18n.t('form_label.PlatformModifyTime'), // 平台修改时间
        width: '24',
        format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
        placeholder: ''
      },
      {
        style: 'input', // 输入框类型
        label: $i18n.t('table_label.platform_orderNo'), // 平台单号 输入框前文字
        value: 'sp_ids', // 输入框的值
        width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
        icon: '', // 输入框后带的图标,暂只有输入框支持
        placeholder: $i18n.t('pHolder.z0'), // 多个平台单号，用逗号分隔 占位文本，默认为请输入
        ghost: false, // 是否关闭幽灵按钮，默认开启
        inputenter: () => { }, // 表单回车事件
        iconclick: () => { } // 点击icon图标事件
        // setRequired: "required" //必选标识,值不为required时无标识
      },
      // {
      //   style: 'compile',
      //   slotName: 'compile',
      //   width: '3'
      // }
    ]
  },
  cancel: (self) => {
    const _this = self;
    _this.$OMS2.omsUtils.formEmpty(_this, 'downLoadFormConfig')
  },
  // 确定按钮
  determine: async (self) => {
    const _this = self;
    const downData = _this.downLoadFormConfig;
    if (!downData.formData[0].itemdata.pid) {
      // 请选择需要下载的店铺
      _this.$Message.warning($i18n.t('modalTips.be'));
      return;
    }
    if (
      self.downLoadFormConfig.formValue.startEndTimes
        .length === 0
      && self.downLoadFormConfig.formValue.sp_ids === ''
    ) {
      self.$Message.warning($i18n.t('modalTips.bs'));// 请选择输入的日期或输入订单编号
      return false;
    }
    const param = {
      shop_id: downData.formData[0].itemdata.pid,
      bill_no: downData.formValue.sp_ids,
      start_time: downData.formValue.startEndTimes[0] ? BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[0]) : undefined, // 开始时间
      end_time: downData.formValue.startEndTimes[1] ? BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[1]) : undefined, // 结束时间
      table: _this.$route.params.tableName // 当前表名 必传
    };
    const {
      data: { code, message }
    } = await _this.service.common.publicUrlParams('/p/cs/ip/v1/order/download/orderExchangeDownLoad', param);
    if (code === 0) {
      _this.$Message.success(message);
      _this.$emit('closeActionDialog', true);
      _this.$OMS2.omsUtils.formEmpty(_this, 'downLoadFormConfig')
    } else {
      // _this.$Message.error(message);
    }
  }
};
