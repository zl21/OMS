import businessForm from 'professionalComponents/businessForm';
import businessDialog from 'professionalComponents/businessDialog';
import businessButton from 'professionalComponents/businessButton';
import BurgeonDate from '@/assets/js/__utils__/date.js';

export default {
  components: {
    businessForm,
    businessDialog,
    businessButton
  },
  props: {
    objList: {
      type: Array,
      defalut: () => []
    },
    idArray: {
      type: Array,
      defalut: () => []
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    selectRowData: {
      type: Array,
      defalut: () => []
    },
    title: {
      type: String
    }
  },
  mounted() {
    const childList = this.downLoadPublicFormConfig.formData[0].inputList[0].childs[0];

    if (this.$parent.title === $$i18n.t('btn.dealInOrder_download')) {
      // 经销订单下载111
    } else if (this.$parent.title === $$i18n.t('btn.distributionProduct_download')) {
      // 分销商品下载111
    } else if (this.$parent.title === $$i18n.t('btn.distributionOrder_download')) {
      // 分销订单下载111
    } else if (this.$parent.title === $$i18n.t('btn.generalOrder_download')) {
      // 通用订单下载111
    } else if (this.$parent.title === $$i18n.t('btn.generalGoods_download') || this.$parent.title === $$i18n.t('btn.distributionChargeback_download')) {
      // 通用商品下载111
      this.downLoadPublicFormConfig = this.pulicdownLoadConfig;
      this.pulicUrl = '/p/cs/stdp/item/get';
    } else if (this.$parent.title === '') {
      // 分销退单下载111
      childList.refobjid = 3;
      childList.valuedata = 3;
      this.pulicUrl = '/p/cs/refundDownload';
      this.downLoadPublicFormConfig.formData.forEach(item => {
        if (item.label === $$i18n.t('other.orderState')) {
          // 订单状态
          // 全部
          item.options = [{ label: $$i18n.t('panel_label.all'), value: '' }];
        }
      });
    } else if (this.$route.params.tableName === 'IP_B_STANDPLAT_REFUND') {
      this.downLoadPublicFormConfig.formData[0].itemdata = {
        col: 1,
        colid: 167023,
        colname: 'CP_C_SHOP_ID', // 当前字段的名称
        datelimit: 'all',
        display: 'OBJ_FK', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
        fkdisplay: 'drp', // 外键关联类型
        fkdesc: $$i18n.t('other.shop'), // 店铺
        inputname: 'CP_C_SHOP_ID:CP_C_SHOP_TITLE', // 这个是做中文类型的模糊查询字段，例如ENAME
        isfk: true, // 是否有fk键
        isnotnull: true, // 是否必填
        isuppercase: false, // 是否转大写
        length: 65535, // 最大长度是多少
        name: $$i18n.t('other.shop'), // 店铺 input前面显示的lable值
        readonly: false, // 是否可编辑，对应input   readonly属性
        reftable: 'IP_C_COMMON_SHOP',
        reftableid: 25031,
        row: 1,
        statsize: -1,
        type: 'STRING',
        valuedata: '' // 这个是选择的值
      };
      this.pulicdownLoadConfig.formData[2].label = '平台退款单号';
      this.pulicdownLoadConfig.formData[2].width = 24;
      this.pulicdownLoadConfig.formData.splice(-1, 1);
      this.pulicUrl = '/p/cs/refundDownload';
      this.downLoadPublicFormConfig.formData[1].style = '';
      this.downLoadPublicFormConfig.formData[3].label = $$i18n.t('other.refundNumber'); // 退单号
    }
  },
  data() {
    return {
      vmI18n:$i18n,
      refobjid: 2,
      pulicUrl: '',
      downLoadBtnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('btn.download'), // 下载 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.downloadPublicAll();
            } // 按钮点击事件
          }
        ]
      },
      downLoadPublicFormConfig: {
        formValue: {
          orderStatus: '',
          startEndTimes: [],
          orderNum: ''
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
              name: $i18n.t('other.shop'), // 店铺 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: '' // 这个是选择的值
            }
          },
          {
            style: 'radio', // 单选框
            label: '', // 订单状态 前面字段
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
                label: $i18n.t('other.toBeDelivered'), // 待发货
                value: 'WAIT_SELLER_SEND_GOODS'
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
            label: $i18n.t('form_label.platform_billNo'), // 平台单号 输入框前文字
            value: 'orderNum', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {}, // 表单回车事件
            iconclick: () => {} // 点击icon图标事件
            // setRequired: "required" //必选标识,值不为required时无标识
          }
        ],
        ruleValidate: {}
      }, // 分销订单、经销商品
      pulicdownLoadConfig: {
        formValue: {
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
            itemdata: {
              colid: 167023,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              display: 'OBJ_FK', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: $i18n.t('other.shop'), // 店铺 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              pid: '',
              valuedata: '' // 这个是选择的值
            }
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
            label: $i18n.t('form_label.platformCommodityID'), // 平台商品ID 输入框前文字
            value: 'sp_ids', // 输入框的值
            width: '21', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {}, // 表单回车事件
            iconclick: () => {} // 点击icon图标事件
            // setRequired: "required" //必选标识,值不为required时无标识
          },
          {
            style: 'compile',
            slotName: 'compile',
            width: '3'
          }
        ]
      }, // 通用商品下载
      downLoadDistributionGood: {
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
            value: 'startEndTimes',
            label: $i18n.t('form_label.PlatformModifyTime'), // 平台修改时间
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: ''
          },
          {
            style: 'input', // 输入框类型
            label: $i18n.t('form_label.goodsPID'), // 输入框前文字
            value: 'ware_id', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false // 是否关闭幽灵按钮，默认开启
          },
          {
            style: 'input', // 输入框类型
            label: $i18n.t('table_label.productNo'), // 商品编码 输入框前文字
            value: 'item_num', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false // 是否关闭幽灵按钮，默认开启
          }
        ],
        // 表单非空提示
        ruleValidate: {}
      }, // 分销商品
      dialogConfig: {
        title: '',
        componentData: {},
        name: '',
        url: '',
        width: 600
      }
    };
  },
  methods: {
    // 下载
    downloadPublicAll() {
      // 经销订单下载  通用订单下载  分销订单下载  分销退单下载
      const arr = [$$i18n.t('btn.dealInOrder_download'), $$i18n.t('btn.generalOrder_download'), $$i18n.t('btn.distributionOrder_download'), $$i18n.t('btn.distributionChargeback_download')];
      if (arr.includes(this.$parent.title)) {
        this.downloadPublic(this.pulicUrl);
      } else if (this.$parent.title === $$i18n.t('btn.generalGoods_download')) {
        // 通用商品下载
        this.downloadPublicGoods(this.pulicUrl);
      } else if (this.$parent.title === $$i18n.t('btn.distributionChargeback_download')) {
        // 分销商品下载
        this.downloadDisGood(this.pulicUrl);
      } else if (this.$route.params.tableName === 'IP_B_STANDPLAT_REFUND') {
        // console.log('通用退单接口-下载退单');
        this.downloadRenterOrder(this.pulicUrl);
      }
    },
    // 淘宝分销、淘宝经销、通用订单
    async downloadPublic(url) {
      const _this = this;
      const downData = _this.pulicdownLoadConfig;
      if (!downData.formData[0].itemdata.pid) {
        // 请选择需要下载的店铺
        _this.$Message.warning($$i18n.t('modalTips.be'));
        return;
      }
      if (downData.formValue.startEndTimes[0] === '' && !downData.formValue.sp_ids && !downData.formValue.orderNum) {
        _this.$Message.warning($$i18n.t('modalTips.bp')); // 请选择输入日期或输入订单编号
        return;
      }
      const param = {
        shop_id: downData.formData[0].itemdata.pid,
        bill_no: downData.formValue.sp_ids ? downData.formValue.sp_ids : downData.formValue.orderNum, // 订单编号
        start_time: BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[0]), // 开始时间
        end_time: BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[1]), // 结束时间
        status: downData.formValue.orderStatus, // 状态 必传 给默认值
        table: _this.tablename // 当前表名 必传
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      const {
        data: { code, message }
      } = await _this.service.common.publicUrlParams(url, fromdata);
      if (code === 0) {
        _this.$Message.success(message);
        _this.$emit('closeActionDialog', true);
      } else {
        // _this.$Message.error(message);
      }
    },
    // 通用商品下载
    async downloadPublicGoods(url) {
      const _this = this;
      const downData = _this.pulicdownLoadConfig;
      if (!downData.formData[0].itemdata.pid) {
        // 请选择需要下载的店铺
        _this.$Message.warning($$i18n.t('modalTips.be'));
        return;
      }
      const param = {
        shop_id: downData.formData[0].itemdata.pid,
        sp_ids: downData.formValue.sp_ids,
        start_time: downData.formValue.startEndTimes[0] ? BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[0]) : undefined, // 开始时间
        end_time: downData.formValue.startEndTimes[1] ? BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[1]) : undefined, // 结束时间
        table: _this.tablename // 当前表名 必传
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      const {
        data: { code, message }
      } = await _this.service.common.publicUrlParams(url, fromdata);
      if (code === 0) {
        _this.$Message.success(message);
        _this.$emit('closeActionDialog', true);
      } else {
        // _this.$Message.error(message);
      }
    },
    // 分销商品
    async downloadDisGood(url) {
      const _this = this;
      const downData = _this.downLoadPublicFormConfig;
      if (!downData.formData[0].itemdata.pid) {
        // 请选择需要下载的店铺

        _this.$Message.warning($$i18n.t('modalTips.be'));
        return;
      }
      if (downData.formValue.startEndTimes[0] === '' && downData.formValue.ware_id === '' && downData.formValue.item_num === '') {
        _this.$Message.warning($$i18n.t('modalTips.bq')); // 修改时间、商品PID、商品编码必填其一
        return;
      }
      const param = {
        shop_id: downData.formData[0].itemdata.pid,
        ware_id: downData.formValue.ware_id, // 商品id
        item_num: downData.formValue.item_num, // 商品编码
        start_time: BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[0]), // 开始时间
        end_time: BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[1]), // 结束时间
        table: _this.tablename // 当前表名 必传
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      // 分销商品
      const {
        data: { code, message }
      } = await _this.service.common.publicUrlParams(url, fromdata);
      if (code === 0) {
        _this.$Message.success(message);
        _this.$emit('closeActionDialog', true);
      } else {
        // _this.$Message.error(message);
      }
    },
    // IP_B_STANDPLAT_REFUND
    async downloadRenterOrder(url) {
      // 通用退单下载方法
      /*
        1. 通用退单下载 - 下载退单
      */
      const _this = this;
      // const downData = _this.downLoadPublicFormConfig;
      const downData = _this.pulicdownLoadConfig;
      if (!downData.formData[0].itemdata.pid) {
        // 请选择需要下载的店铺

        _this.$Message.warning($$i18n.t('modalTips.be'));
        return;
      }
      if (downData.formValue.startEndTimes[0] === '' && !downData.formValue.sp_ids && !downData.formValue.orderNum) {
        _this.$Message.warning($$i18n.t('modalTips.bp')); // 请选择输入日期或输入订单编号
        return;
      }
      const param = {
        shop_id: downData.formData[0].itemdata.pid,
        bill_no: downData.formValue.sp_ids ? downData.formValue.sp_ids : downData.formValue.orderNum, // 订单编号
        start_time: BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[0]), // 开始时间
        end_time: BurgeonDate.standardTimeConversiondateToStr(downData.formValue.startEndTimes[1]), // 结束时间
        status: downData.formValue.orderStatus || '', // 状态 必传 给默认值
        table: _this.$route.params.tableName // 当前表名 必传
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      // 通用退单下载方法
      const {
        data: { code, message }
      } = await _this.service.common.publicUrlParams(url, fromdata);
      if (code === 0) {
        _this.$Message.success(message);
        _this.$emit('closeActionDialog', true);
      } else {
        // _this.$Message.error(message);
      }
    },
    // 打开导入弹窗
    importBoxOpen() {
      const _this = this;
      // 导入
      this.dialogConfig = {
        title: $$i18n.t('btn.import'),
        componentData: {
          tableName: 'IP_C_STANDPLAT_PRO',
          returnData(data) {
            _this.pulicdownLoadConfig.formValue.sp_ids = data;
          }
        },
        name: 'importTable',
        basePathName: 'business-components',
        url: 'importTable',
        width: 600
      };
      this.$refs.dialog.openConfirm();
    }
  }
};
