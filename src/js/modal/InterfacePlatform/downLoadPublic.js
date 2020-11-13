import axios from 'axios';
import businessForm from 'professionalComponents/businessForm';
import jordanDialog from 'professionalComponents/businessDialog';

export default {
  components: {
    businessForm,
    jordanDialog,
  },
  props: {
    objList: {
      type: Array,
      defalut: () => [],
    },
    idArr: {
      type: Array,
      defalut: () => [],
    },
    webid: {
      type: Number,
    },
    tablename: {
      type: String,
    },
    rowData: {
      type: Array,
      defalut: () => [],
    },
    title: {
      type: String,
    },
  },
  mounted() {
    const childList = this.downLoadPublicFormConfig.formData[0].inputList[0]
      .childs[0];
    // 经销订单下载
    if (this.$parent.title === this.vmI18n.t('btn.dealInOrder_download')) {
      childList.refobjid = 77;
      childList.valuedata = 77;
      this.pulicUrl = '/p/cs/orderDownload';
    }
    // 分销商品下载
    else if (
      this.$parent.title === this.vmI18n.t('btn.distributionProduct_download')
    ) {
      childList.refobjid = 3;
      childList.valuedata = 3;
      this.downLoadPublicFormConfig = this.downLoadDistributionGood;
      this.pulicUrl = '/p/cs/itemDownload';
    }
    // 分销订单下载
    else if (
      this.$parent.title === this.vmI18n.t('btn.distributionOrder_download')
    ) {
      childList.refobjid = 3;
      childList.valuedata = 3;
      this.pulicUrl = '/p/cs/orderDownload';
    }
    // 通用订单下载
    else if (
      this.$parent.title === this.vmI18n.t('btn.generalOrder_download')
    ) {
      this.downLoadPublicFormConfig.formData[0].itemdata = {
        col: 1,
        colid: 167023,
        colname: 'CP_C_SHOP_ID', // 当前字段的名称
        datelimit: 'all',
        display: 'OBJ_FK', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
        fkdisplay: 'drp', // 外键关联类型
        fkdesc: this.vmI18n.t('other.shop'), // 店铺
        inputname: 'CP_C_SHOP_ID:CP_C_SHOP_TITLE', // 这个是做中文类型的模糊查询字段，例如ENAME
        isfk: true, // 是否有fk键
        isnotnull: true, // 是否必填
        isuppercase: false, // 是否转大写
        length: 65535, // 最大长度是多少
        name: this.vmI18n.t('other.shop'), // 店铺 input前面显示的lable值
        readonly: false, // 是否可编辑，对应input   readonly属性
        reftable: 'IP_C_COMMON_SHOP',
        reftableid: 25031,
        row: 1,
        statsize: -1,
        type: 'STRING',
        valuedata: '', // 这个是选择的值
      };
      this.downLoadPublicFormConfig.formData[1].style = '';
      this.pulicUrl = '/p/cs/stdp/order/get';
    }
    // 通用商品下载
    else if (
      this.$parent.title
      === this.vmI18n.t('btn.distributionChargeback_download')
    ) {
      this.downLoadPublicFormConfig = this.pulicdownLoadConfig;
      this.pulicUrl = '/p/cs/stdp/item/get';
    }
    // 分销退单下载
    else if (this.$parent.title === '') {
      childList.refobjid = 3;
      childList.valuedata = 3;
      this.pulicUrl = '/p/cs/refundDownload';
      this.downLoadPublicFormConfig.formData.forEach((item) => {
        if (item.label === this.vmI18n.t('other.orderState'))
        // 订单状态
        // 全部
        {
          item.options = [
            { label: this.vmI18n.t('panel_label.all'), value: '' },
          ]; 
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
        fkdesc: this.vmI18n.t('other.shop'), // 店铺
        inputname: 'CP_C_SHOP_ID:CP_C_SHOP_TITLE', // 这个是做中文类型的模糊查询字段，例如ENAME
        isfk: true, // 是否有fk键
        isnotnull: true, // 是否必填
        isuppercase: false, // 是否转大写
        length: 65535, // 最大长度是多少
        name: this.vmI18n.t('other.shop'), // 店铺 input前面显示的lable值
        readonly: false, // 是否可编辑，对应input   readonly属性
        reftable: 'IP_C_COMMON_SHOP',
        reftableid: 25031,
        row: 1,
        statsize: -1,
        type: 'STRING',
        valuedata: '', // 这个是选择的值
      };
      this.pulicUrl = '/p/cs/refundDownload';
      this.downLoadPublicFormConfig.formData[1].style = '';
      this.downLoadPublicFormConfig.formData[3].label = this.vmI18n.t(
        'other.refundNumber'
      ); // 退单号
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      refobjid: 2,
      pulicUrl: '',
      downLoadPublicFormConfig: {
        formValue: {
          orderStatus: '',
          startEndTimes: [],
          orderNum: '',
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
                  { colname: 'CP_C_SHOP_ID', refobjid: 3, valuedata: 3 },
                ],
              },
            ],
            itemdata: {
              col: 1,
              colid: 167606,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              refcolval: {
                fixcolumn: 'CP_C_PLATFORM_ID',
                expre: 'equal',
                srccol: 'CP_C_SHOP_ID',
              },
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: window.vmI18n.t('other.shop'), // 店铺
              inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: window.vmI18n.t('other.shop'), // 店铺 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP',
              reftableid: 24475,
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: '', // 这个是选择的值
            },
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
                label: window.vmI18n.t('panel_label.all'), // 全部
                value: '',
              },
              {
                label: window.vmI18n.t('other.toBeDelivered'), // 待发货
                value: 'WAIT_SELLER_SEND_GOODS',
              },
            ],
          },
          {
            style: 'date',
            type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            value: 'startEndTimes',
            label: window.vmI18n.t('form_label.PlatformModifyTime'), // 平台修改时间
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
          },
          {
            style: 'input', // 输入框类型
            label: '平台单号', // 输入框前文字
            value: 'orderNum', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {}, // 表单回车事件
            iconclick: () => {}, // 点击icon图标事件
            // setRequired: "required" //必选标识,值不为required时无标识
          },
        ],
        // 表单非空提示
        ruleValidate: {},
      }, // 分销订单、经销商品
      pulicdownLoadConfig: {
        formValue: {
          startEndTimes: [],
          sp_ids: '',
        },
        // 表单非空提示
        ruleValidate: {
          sp_id: [{ required: true, message: ' ', trigger: 'blur' }],
        },
        formData: [
          {
            style: 'popInput', // 输入框弹框单多选
            width: '24',
            itemdata: {
              col: 1,
              colid: 167023,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'OBJ_FK', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: window.vmI18n.t('other.shop'), // 店铺
              inputname: 'CP_C_SHOP_ID:CP_C_SHOP_TITLE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: window.vmI18n.t('other.shop'), // 店铺 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'IP_C_COMMON_SHOP',
              reftableid: 25031,
              row: 1,
              statsize: -1,
              type: 'STRING',
              pid: '',
              valuedata: '', // 这个是选择的值
            },
          },
          {
            style: 'date',
            type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            value: 'startEndTimes',
            label: window.vmI18n.t('form_label.PlatformModifyTime'), // 平台修改时间
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
          },
          {
            style: 'input', // 输入框类型
            label: window.vmI18n.t('form_label.platformCommodityID'), // 平台商品ID 输入框前文字
            value: 'sp_ids', // 输入框的值
            width: '21', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {}, // 表单回车事件
            iconclick: () => {}, // 点击icon图标事件
            // setRequired: "required" //必选标识,值不为required时无标识
          },
          {
            style: 'compile',
            slotName: 'compile',
            width: '3',
          },
        ],
      }, // 通用商品下载
      downLoadDistributionGood: {
        formValue: {
          orderStatus: '',
          startEndTimes: [],
          ware_id: '',
          item_num: '',
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
                  { colname: 'CP_C_SHOP_ID', refobjid: 3, valuedata: 3 },
                ],
              },
            ],
            itemdata: {
              col: 1,
              colid: 167606,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              refcolval: {
                fixcolumn: 'CP_C_PLATFORM_ID',
                expre: 'equal',
                srccol: 'CP_C_SHOP_ID',
              },
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: window.vmI18n.t('other.shop'), // 店铺
              inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: window.vmI18n.t('other.shop'), // 店铺 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP',
              reftableid: 24475,
              row: 1,
              statsize: -1,
              type: 'STRING',
              valuedata: '', // 这个是选择的值
            },
          },
          {
            style: 'date',
            type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            value: 'startEndTimes',
            label: window.vmI18n.t('form_label.PlatformModifyTime'), // 平台修改时间
            width: '24',
            format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
            placeholder: '',
          },
          {
            style: 'input', // 输入框类型
            label: window.vmI18n.t('form_label.goodsPID'), // 输入框前文字
            value: 'ware_id', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
          },
          {
            style: 'input', // 输入框类型
            label: window.vmI18n.t('table_label.productNo'), // 商品编码 输入框前文字
            value: 'item_num', // 输入框的值
            width: '24', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: '', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            ghost: false, // 是否关闭幽灵按钮，默认开启
          },
        ],
        // 表单非空提示
        ruleValidate: {},
      }, // 分销商品
      dialogConfig: {
        title: '',
        componentData: {},
        name: '',
        url: '',
        width: 600,
      },
    };
  },
  methods: {
    // 下载
    downloadPublicAll() {
      // 经销订单下载  通用订单下载  分销订单下载  分销退单下载
      const arr = [
        this.vmI18n.t('btn.dealInOrder_download'),
        this.vmI18n.t('btn.generalOrder_download'),
        this.vmI18n.t('btn.distributionOrder_download'),
        this.vmI18n.t('btn.distributionChargeback_download'),
      ];
      if (arr.includes(this.$parent.title)) {
        this.downloadPublic(this.pulicUrl);
      }
      // 通用商品下载
      else if (this.$parent.title === this.vmI18n.t('btn.generalGoods_download')) {
        this.downloadPublicGoods(this.pulicUrl);
      }
      // 分销商品下载
      else if (this.$parent.title === this.vmI18n.t('btn.distributionChargeback_download')) {
        this.downloadDisGood(this.pulicUrl);
      } else if (this.tablename === 'IP_B_STANDPLAT_REFUND') {
        this.downloadRenterOrder(this.pulicUrl);
      }
    },
    // 淘宝分销、淘宝经销、通用订单
    async downloadPublic(url) {
      const _this = this;
      const downData = _this.downLoadPublicFormConfig;
      if (!downData.formData[0].itemdata.pid) {
        // 请选择需要下载的店铺
        return _this.$Message.warning(_this.vmI18n.t('modalTips.be'));
      }
      if (
        downData.formValue.startEndTimes[0] === ''
        && downData.formValue.orderNum === ''
      ) {
        return _this.$Message.warning(_this.vmI18n.t('modalTips.bp'));// 请选择输入日期或输入订单编号
      }
      const param = {
        shop_id: downData.formData[0].itemdata.pid,
        bill_no: downData.formValue.orderNum, // 订单编号
        start_time: _this.standardTimeConversiondateToStr(
          downData.formValue.startEndTimes[0]
        ), // 开始时间
        end_time: _this.standardTimeConversiondateToStr(
          downData.formValue.startEndTimes[1]
        ), // 结束时间
        status: downData.formValue.orderStatus, // 状态 必传 给默认值
        table: _this.tablename, // 当前表名 必传
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      // 淘宝分销、淘宝经销、通用订单 下载
      const { data: { code, message } } = await self.service.common.publicOrderDownload(url, fromdata);
      if (code === 0) {
        _this.$Message.success(message);
        _this.$emit('closeActionDialog', true);
      } else {
        _this.$Message.error(message);
      }
      // axios({
      //   url: url,
      //   method: "post",
      //   data: fromdata,
      // }).then(function (res) {
      //   if (res.data.code === 0) {
      //     _this.$Message.success(res.data.message);
      //     _this.$emit("closeActionDialog");
      //     // _this.taskId = res.data.message.match(/\d+/)[0];
      //     // _this.downLoadModal = true;
      //   } else {
      //     _this.$Message.error(res.data.message);
      //   }
      // });
    },
    // 通用商品下载
    async downloadPublicGoods(url) {
      const _this = this;
      const downData = _this.downLoadPublicFormConfig;
      if (!downData.formData[0].itemdata.pid) {
        // 请选择需要下载的店铺
        return _this.$Message.warning(_this.vmI18n.t('modalTips.be'));
      }
      const param = {
        shop_id: downData.formData[0].itemdata.pid,
        sp_ids: downData.formValue.sp_ids,
        start_time: downData.formValue.startEndTimes[0]
          ? _this.standardTimeConversiondateToStr(
            downData.formValue.startEndTimes[0]
          )
          : undefined, // 开始时间
        end_time: downData.formValue.startEndTimes[1]
          ? _this.standardTimeConversiondateToStr(
            downData.formValue.startEndTimes[1]
          )
          : undefined, // 结束时间
        table: _this.tablename, // 当前表名 必传
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      // 通用商品下载
      const { data: { code, message } } = await self.service.common.publicOrderDownload(url, fromdata);
      if (code === 0) {
        _this.$Message.success(message);
        _this.$emit('closeActionDialog', true);
      } else {
        _this.$Message.error(message);
      }
      // axios({
      //   url: url,
      //   method: "post",
      //   data: fromdata,
      // }).then(function (res) {
      //   if (res.data.code === 0) {
      //     _this.$Message.success(res.data.message);
      //     _this.$emit("closeActionDialog");
      //   } else {
      //     _this.$Message.error(res.data.message);
      //   }
      // });
    },
    // 分销商品
    async downloadDisGood(url) {
      const _this = this;
      const downData = _this.downLoadPublicFormConfig;
      if (!downData.formData[0].itemdata.pid) {
        // 请选择需要下载的店铺
        return _this.$Message.warning(_this.vmI18n.t('modalTips.be'));
      }
      if (
        downData.formValue.startEndTimes[0] === ''
        && downData.formValue.ware_id === ''
        && downData.formValue.item_num === ''
      ) {
        return _this.$Message.warning(_this.vmI18n.t('modalTips.bq'));// 修改时间、商品PID、商品编码必填其一
      }
      const param = {
        shop_id: downData.formData[0].itemdata.pid,
        ware_id: downData.formValue.ware_id, // 商品id
        item_num: downData.formValue.item_num, // 商品编码
        start_time: _this.standardTimeConversiondateToStr(
          downData.formValue.startEndTimes[0]
        ), // 开始时间
        end_time: _this.standardTimeConversiondateToStr(
          downData.formValue.startEndTimes[1]
        ), // 结束时间
        table: _this.tablename, // 当前表名 必传
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      // 分销商品
      const { data: { code, message } } = await self.service.common.publicOrderDownload(url, fromdata);
      if (code === 0) {
        _this.$Message.success(message);
        _this.$emit('closeActionDialog', true);
      } else {
        _this.$Message.error(message);
      }
      // axios({
      //   url: url,
      //   method: "post",
      //   data: fromdata,
      // }).then(function (res) {
      //   if (res.data.code === 0) {
      //     _this.$Message.success(res.data.message);
      //     _this.$emit("closeActionDialog");
      //   } else {
      //     _this.$Message.error(res.data.message);
      //   }
      // });
    },
    // IP_B_STANDPLAT_REFUND
    async downloadRenterOrder(url) {
      // 通用退单下载方法
      const _this = this;
      const downData = _this.downLoadPublicFormConfig;
      if (!downData.formData[0].itemdata.pid) {
        // 请选择需要下载的店铺
        return _this.$Message.warning(this.vmI18n.t('modalTips.be'));
      }
      if (
        downData.formValue.startEndTimes[0] === ''
        && downData.formValue.orderNum === ''
      ) {
        return _this.$Message.warning(this.vmI18n.t('modalTips.bp'));// 请选择输入日期或输入订单编号
      }
      const param = {
        shop_id: downData.formData[0].itemdata.pid,
        bill_no: downData.formValue.orderNum, // 订单编号
        start_time: _this.standardTimeConversiondateToStr(
          downData.formValue.startEndTimes[0]
        ), // 开始时间
        end_time: _this.standardTimeConversiondateToStr(
          downData.formValue.startEndTimes[1]
        ), // 结束时间
        status: downData.formValue.orderStatus, // 状态 必传 给默认值
        table: _this.tablename, // 当前表名 必传
      };
      const fromdata = new FormData();
      fromdata.append('param', JSON.stringify(param));
      // 通用退单下载方法
      const { data: { code, message } } = await self.service.common.publicOrderDownload(url, fromdata);
      if (code === 0) {
        _this.$Message.success(message);
        _this.$emit('closeActionDialog', true);
      } else {
        _this.$Message.error(message);
      }
      // axios({
      //   url: url,
      //   method: "post",
      //   data: fromdata,
      // }).then(function (res) {
      //   if (res.data.code === 0) {
      //     _this.$Message.success(res.data.message);
      //     _this.$emit("closeActionDialog");
      //   } else {
      //     _this.$Message.error(res.data.message);
      //   }
      // });
    },
    // 时间格式化
    standardTimeConversiondateToStr(val) {
      const dateTime = new Date(val);
      const year = dateTime.getFullYear();
      let month = dateTime.getMonth() + 1; // js从0开始取
      let date = dateTime.getDate();
      let hour = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let second = dateTime.getSeconds();
      if (month < 10) {
        month = `0${month}`;
      }
      if (date < 10) {
        date = `0${date}`;
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      return (
        `${year 
        }-${ 
          month 
        }-${ 
          date 
        } ${ 
          hour 
        }:${ 
          minutes 
        }:${ 
          second}`
      );
    },
    // 打开导入弹窗
    importBoxOpen(item) {
      const _this = this;
      // 导入
      this.dialogConfig = {
        title: this.vmI18n.t('btn.import'),
        componentData: {
          tableName: 'IP_C_STANDPLAT_PRO',
          returnData(data) {
            _this.pulicdownLoadConfig.formValue.sp_ids = data;
          },
        },
        name: 'importTable',
        url: 'modal/publicDialog/importTable',
        width: 600,
      };
      this.$refs.dialog.openConfirm();
    },
  },
};
