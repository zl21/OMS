
import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessLabel from 'professionalComponents/businessLabel';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import jordanModal from 'professionalComponents/businessDialog';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';
import { dataAccessMixin } from '@/assets/js/mixins/dataAccess';

const areaList = require('@/assets/js/address/area-list');
const { parse, parseArea } = require('@/assets/js/address/address-parse');

parseArea(areaList);
export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessLabel,
    jordanModal,
  },
  mixins: [buttonPermissionsMixin, dataAccessMixin],
  data() {
    return {
      vmI18n: window.vmI18n,
      isShowFromLoading: false, // 加载
      matrixBox: {
        refFuns: 'confirmFun',
        confirmTitle: vmI18n.t('modalTitle.matrixEntry'), // 矩阵录入
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '860',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'matrixBox', // 组件名称
        url: 'modal/orderCenter/matrixBox',
        keepAlive: true,
        excludeString: 'matrixBox', // 将name传进去，确认不缓存
        componentData: {},
      }, // 退单编号查询
      ORDER_TYPE: '', // 丢单的值
      isgift: [
        {
          label: vmI18n.t('common.yes'),
          value: '1',
        },
        {
          label: vmI18n.t('common.no'),
          value: '0',
        },
      ],
      isSetOption: false, // 付款方式是否赋值options
      isCopy: false, // 是否丢单复制和复制订单来时,第一次查询条码
      address: '', // 存储解析后的地址
      delTableList: [], // 删除明细中记录选中的标识
      ID: '', // 大保存需要的id
      selectData: [], // 支付方式的下拉选项值
      message: '', // 输入框输入的值
      columns: ['label', 'value'],
      fkcolumn: {
        PROV: {
          col: 1,
          colid: 167814,
          colname: 'RECEIVER_PROVINCE', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: vmI18n.t('form_label.consignee_province'), // 收货人省份
          inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: vmI18n.t('form_label.consignee_province'), // 收货人省份 // input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_PROVINCE', // 对应的表
          reftableid: 10010, // 对应的表ID
          row: 1,
          statsize: -1,
          type: 'STRING', // 这个是后台用的
          pid: '',
          valuedata: '', // 这个是选择的值
        },
        CITY: {
          col: 1,
          colid: 167815,
          colname: 'RECEIVER_CITY', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: vmI18n.t('form_label.consignee_city'), // 收货人市
          inputname: 'RECEIVER_CITY:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: vmI18n.t('form_label.consignee_city'), // 收货人市 // input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_CITY', // 对应的表
          reftableid: 23864, // 对应的表ID
          refcolval: {
            fixcolumn: 'C_UP_ID',
            expre: 'equal',
            srccol: 'RECEIVER_PROVINCE',
          },
          row: 1,
          statsize: -1,
          type: 'STRING', // 这个是后台用的
          pid: '',
          valuedata: '', // 这个是选择的值
        },
        STORE: {
          col: 1,
          colid: 167606,
          colname: 'CP_C_STORE_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: vmI18n.t('form_label.orderShop'), // 下单店铺
          inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: vmI18n.t('form_label.orderShop'), // 下单店铺 // input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_SHOP', // 对应的表
          reftableid: 24475, // 对应的表ID
          row: 1,
          statsize: -1,
          type: 'STRING', // 这个是后台用的
          valuedata: '', // 这个是选择的值
          precolnameslist: [
            {
              premtype: 'CP_C_SHOP_PERMISSION_ID',
              refcol: 'ID',
              iswrite: 'true',
            },
          ],
        },
      },

      isActive: true, // 商品编码搜索框是否显示 true为显示,false隐藏
      value1: ['1', '2', '3'],
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: vmI18n.t('btn.save'), // 按钮文本
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              const masterTable = Object.assign(
                this.formConfig.formValue,
                this.formConfig1.formValue,
                this.formConfig2.formValue
              );
              if (!self.isEmpty(masterTable)) {
                return;
              }
              if (masterTable.is_kaip) {
                masterTable.IS_INVOICE = 1;
              } else {
                masterTable.IS_INVOICE = 0;
              }
              const ocBorderDto = masterTable;
              ocBorderDto.ORDER_STATUS = 1;
              ocBorderDto.ID = self.ID;
              const ocBorderItemDto = self.jordanTableConfig.data;
              // 将是否赠品,实物或缺是否转化为YN
              ocBorderItemDto.forEach((item) => {
                if (item.IS_GIFT === self.vmI18n.t('common.yes')) {
                  item.IS_GIFT = 1;
                } else if (item.IS_GIFT === self.vmI18n.t('common.no')) {
                  item.IS_GIFT = 0;
                }
                item.PRICE_LIST = item.RESERVE_DECIMAL02;
              });
              // 直接获取下拉单选里的值(valuedata , pid)
              // 基本信息模块下拉单选数据取值
              self.formConfig.formData.forEach((item) => {
                if (
                  item.itemdata
                  && item.itemdata.name === self.vmI18n.t('form_label.orderShop')
                ) {
                  ocBorderDto.CP_C_SHOP_TITLE = item.itemdata.valuedata;
                  ocBorderDto.CP_C_SHOP_ID = item.itemdata.pid;
                } else if (
                  item.itemdata
                  && item.itemdata.name
                    === self.vmI18n.t('form_label.distribution_logistics')
                ) {
                  ocBorderDto.CP_C_LOGISTICS_ENAME = item.itemdata.valuedata;
                  ocBorderDto.CP_C_LOGISTICS_ID = item.itemdata.pid;
                }
              });
              // 收货人信息下拉单选数据取值 收货人省 收货人市 下单店铺
              self.formConfig1.formData.forEach((item) => {
                if (
                  item.itemdata
                  && item.itemdata.name
                    === self.vmI18n.t('form_label.consignee_province')
                ) {
                  ocBorderDto.CP_C_REGION_PROVINCE_ENAME = item.itemdata.valuedata;
                  ocBorderDto.CP_C_REGION_PROVINCE_ID = item.itemdata.pid;
                } else if (
                  item.itemdata
                  && item.itemdata.name
                    === self.vmI18n.t('form_label.consignee_city')
                ) {
                  ocBorderDto.CP_C_REGION_CITY_ENAME = item.itemdata.valuedata;
                  ocBorderDto.CP_C_REGION_CITY_ID = item.itemdata.pid;
                }
                if (
                  item.itemdata
                  && item.itemdata.name === self.vmI18n.t('form_label.orderShop')
                ) {
                  ocBorderDto.CP_C_REGION_AREA_ENAME = item.itemdata.valuedata;
                  ocBorderDto.CP_C_REGION_AREA_ID = item.itemdata.pid;
                }
              });

              const data = {
                ocBorderDto,
                ocBorderItemDto,
              };
              // 新增订单走新保存（去掉草稿模式）
              if (self.$route.query.id === '-1') {
                return self.saveAdd(data);
              }
              // 如果是丢单复制或者复制订单的保存，传被复制订单的id
              // 如果为丢单复制,则新增一个标识
              const copyID = self.$route.query;
              if (copyID.orderCopy) {
                data.type = '2';
                data.orderId = copyID.id;
                data.ocBorderDto.ORDER_TYPE = self.ORDER_TYPE;
              }
              // 如果为复制订单,则新增一个标识
              if (copyID.copyOrder) {
                data.type = '1';
                data.orderId = copyID.id;
              }
              self.btnConfig.buttons[0].disabled = true;
              self.sava(data);
            },
          },
          {
            text: vmI18n.t('common.return'), // 返回
            btnclick: () => {
              this.back();
              // 销毁当前实例
              this.$destroy();
            },
          },
        ],
      },
      formConfig: {
        formData: [
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            dataAcessKey: 'CP_C_SHOP_TITLE',
            itemdata: {},
            oneObj: () => {
              // 点击选中事件
              // 市 区/县值为空
              const _this = this;
              _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = '';
              _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = '';
              _this.getWarehouse();
            },
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            dataAcessKey: 'CP_C_LOGISTICS_ENAME',
            itemdata: {
              col: 1,
              colid: 167630,
              colname: 'AD_C_LOGISTIC_COMPANY_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: vmI18n.t('form_label.distribution_logistics'), // 配送物流
              inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: vmI18n.t('form_label.distribution_logistics'), // 配送物流 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_LOGISTICS', // 对应的表
              reftableid: 24411, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
            },
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.distribution_costs'), // 配送费用
            value: 'SHIP_AMT',
            dataAcessKey: 'SHIP_AMT',
            disabled: false,
            width: '6',
          },
          {
            style: 'input', // 输入框弹框单多选
            label: vmI18n.t('table_label.buyerNickname'), // 买家昵称
            value: 'USER_NICK',
            dataAcessKey: 'USER_NICK',
            disabled: false,
            width: '6',
          },
          {
            style: 'input', // 输入框弹框单多选
            value: 'SOURCE_CODE',
            label: vmI18n.t('form_label.platform_billNo'), // 平台单号
            disabled: false,
            dataAcessKey: 'SOURCE_CODE',
            width: '6',
          },
          {
            style: 'select', // 下拉框类型
            label: vmI18n.t('form_label.paymentMethod'), // 付款方式 下拉框前的值
            width: '6', // 所占宽度宽度
            value: 'PAY_TYPE', // 输入框的值
            disabled: false,
            dataAcessKey: 'PAYTYPENAME',
            selectChange: () => {
              const self = this;
              self.watch_paytype();
            }, // 选中事件，默认返回选中的值
            options: [
              // 下拉框选项值
            ],
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.collection_amount'), // 代收金额
            value: 'COD_AMT',
            disabled: false,
            width: '6',
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.service_charge'), // 服务费
            value: 'SERVICE_AMT',
            disabled: false,
            width: '6',
          },
          {
            style: 'select', // 下拉框类型
            label: vmI18n.t('form_label.delivery_warehouse'), // 发货仓库 下拉框前的值
            width: '6', // 所占宽度宽度
            dataAcessKey: 'CP_C_PHY_WAREHOUSE_ENAME',
            value: 'CP_C_PHY_WAREHOUSE_ID', // 输入框的值
            selectChange: () => {
              const _this = this;
              // _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME
              const optionsArr = _this.formConfig.formData[8].options;
              for (let i = 0; i < optionsArr.length; i++) {
                if (
                  optionsArr[i].value
                  === _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID
                ) {
                  _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = optionsArr[i].label;
                  return;
                }
              }
            }, // 选中事件，默认返回选中的值
            options: [
              // 下拉框选项值
            ],
          },
          // {
          //   style: "popInput", //输入框弹框单多选
          //   width: "6",
          //   inputList: [],
          //   itemdata: {
          //     col: 1,
          //     colid: 167640,
          //     colname: "CP_C_PHY_WAREHOUSE_ID", //当前字段的名称
          //     datelimit: "all",
          //     display: "text", //显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          //     fkdisplay: "drp", //外键关联类型
          //     fkdesc: "发货仓库",
          //     inputname: "CP_C_PHY_WAREHOUSE_ID:ENAME", //这个是做中文类型的模糊查询字段，例如ENAME
          //     isfk: true, //是否有fk键
          //     isnotnull: false, //是否必填
          //     isuppercase: false, //是否转大写
          //     length: 65535, //最大长度是多少
          //     name: "发货仓库", //input前面显示的lable值
          //     readonly: false, //是否可编辑，对应input   readonly属性
          //     reftable: "OC_B_ORDER", //对应的表
          //     reftableid: 24565, //对应的表ID
          //     row: 1,
          //     statsize: -1,
          //     type: "STRING", //这个是后台用的
          //     valuedata: "", //这个是选择的值
          //     refcolval: {
          //       fixcolumn: "CP_C_SHOP_ID",
          //       expre: "equal",
          //       srccol: "CP_C_STORE_ID"
          //     },
          //     // "precolnameslist":[{
          //     //   "premtype":"CP_C_MAIN_STORE_ID",
          //     //   "refcol":"ID",
          //     //   "iswrite":"true"
          //     // }]
          //   },
          //   oneObj: (e) => {
          //     this.oneObjs(e);
          //   }
          // },
          {
            style: 'date', // 输入框类型
            type: 'datetime', // 文本框类型的input
            label: vmI18n.t('table_label.paymentTime'), // 付款时间 输入框前文字
            value: 'PAY_TIME', // 输入框的值
            dataAcessKey: 'PAY_TIME',
            disabled: false,
            format: 'yyyy-MM-dd HH:mm:ss',
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: 'md-alarm', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            transfer: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {}, // 表单回车事件
            iconclick: () => {}, // 点击icon图标事件
            clearable: true,
          },
          {
            style: '', // 输入框弹框单多选
            value: 'EXPRESS_CODE',
            label: vmI18n.t('form_label.logisticsOrder_No'), // 物流单号
            disabled: false,
            dataAcessKey: 'EXPRESS_CODE',
            width: '6',
          },
          {
            style: 'checkbox',
            label: vmI18n.t('form_label.invoice_or_not'), // 是否开票
            value: 'is_kaip',
            disabled: false,
            dataAcessKey: 'IS_INVOICE',
            width: '6',
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.internalRemarks'), // 内部备注
            value: 'INSIDE_REMARK',
            disabled: false,
            dataAcessKey: 'INSIDE_REMARK',
            width: '12',
          },
        ],
        // 表单一
        formValue: {
          SHIP_AMT: 0, // 配送费用
          USER_NICK: '', // 买家昵称
          SOURCE_CODE: '', // 平台单号
          COD_AMT: '', // 代收金额
          SERVICE_AMT: '', // 服务费
          is_kaip: false, // 是否开票
          PAY_TIME: new Date(), // 创建时间
          INSIDE_REMARK: '', // 内部备注
          // 弹出单选值
          CP_C_SHOP_ID: '', // 下单店铺id
          CP_C_SHOP_TITLE: '', // 下单店铺名称
          CP_C_LOGISTICS_ID: '', // 配送物流id
          CP_C_LOGISTICS_ENAME: '', // 配送物流名称
          CP_C_PHY_WAREHOUSE_ID: '', // 发货仓库id
          CP_C_PHY_WAREHOUSE_ENAME: '',
          PAY_TYPE: 1, // 付款方式
        },
        // 表单非空提示
        ruleValidate: {
          SOURCE_CODE: [{ required: true, message: ' ', trigger: 'blur' }],
          COD_AMT: [{ required: true, message: ' ', trigger: 'blur' }], // 代收金额
          // USER_NICK: [{ required: true, message: " ", trigger: "blur" }],
          PAY_TYPE: [{ required: true, message: ' ', trigger: 'blur' }],
        },
      },
      // 表单二
      formConfig1: {
        // img: {
        //     type: 'imgLeft',
        //     url: '../../../static/img/boxing.png',
        //     width: '100',
        //     height: '100'
        // },
        formData: [
          {
            style: 'input',
            label: vmI18n.t('form_label.match_smart_address'), // 智能匹配地址
            value: 'site',
            disabled: false,
            dataAcessKey: 'RECEIVER_NAME',
            width: '24',
            inputenter: () => {
              const self = this;
              self.address = parse(self.formConfig1.formValue.site);
              if (
                self.address.addr == ''
                || self.address.area == ''
                || self.address.city == ''
                || self.address.name == ''
                || self.address.mobile == ''
                || self.address.province == ''
              ) {
                // "请填入完整信息,如:XX,17788888888,上海上海市闵行区XXXXXXXXXXX"
                self.$Message.warning(self.vmI18n.t('modalTips.f9'));
              } else {
                self.formConfig1.formValue.RECEIVER_NAME = self.address.name; // 收货人赋值
                // self.formConfig1.formValue.RECEIVER_PHONE = self.address.phone;
                self.formConfig1.formValue.RECEIVER_MOBILE = self.address.mobile; // 收货人手机赋值
                self.formConfig1.formValue.RECEIVER_ADDRESS = self.address.addr; // 收货人地址赋值

                const queryData = self.formConfig1.formData;
                self
                  .getAddressId(
                    self.address.province,
                    self.address.city,
                    self.address.area
                  )
                  .then((res) => {
                    if (res.data.code === 0) {
                      queryData[5].itemdata.pid = res.data.data.CP_C_REGION_PROVINCE_ID;
                      queryData[5].itemdata.valuedata = res.data.data.CP_C_REGION_PROVINCE_ENAME; // 省赋值
                      queryData[6].itemdata.pid = res.data.data.CP_C_REGION_CITY_ID;
                      queryData[6].itemdata.valuedata = res.data.data.CP_C_REGION_CITY_ENAME; // 市赋值
                      queryData[7].itemdata.pid = res.data.data.CP_C_REGION_AREA_ID;
                      queryData[7].itemdata.valuedata = res.data.data.CP_C_REGION_AREA_ENAME; // 区赋值
                    }
                  });
                // queryData.forEach(item => {
                //   if (item.itemdata && item.itemdata.name === "收货人省份") {
                //     item.itemdata.valuedata = self.address.province;
                //     self.formConfig1.formValue.CP_C_REGION_PROVINCE_ENAME =
                //       self.address.province;
                //     self
                //       .getAddressId("PROV", self.address.province)
                //       .then(res => {
                //         if (res.data.data) {
                //           console.log(res.data.data.id);
                //           item.itemdata.pid = res.data.data.id;
                //           self.formConfig1.formValue.CP_C_REGION_PROVINCE_ID =
                //             res.data.data.id;
                //         } else {
                //           self.$Message.warning("省市区id获取失败");
                //         }
                //       });
                //   } else if (
                //     item.itemdata &&
                //     item.itemdata.name === "收货人市"
                //   ) {
                //     item.itemdata.valuedata = self.address.city;
                //     self.formConfig1.formValue.CP_C_REGION_CITY_ENAME =
                //       self.address.city;
                //     self.getAddressId("CITY", self.address.city).then(res => {
                //       if (res.data.data) {
                //         console.log(res.data.data.id);
                //         item.itemdata.pid = res.data.data.id;
                //         self.formConfig1.formValue.CP_C_REGION_CITY_ID =
                //           res.data.data.id;
                //       } else {
                //         self.$Message.warning("省市区id获取失败");
                //       }
                //     });
                //   } else if (
                //     item.itemdata &&
                //     item.itemdata.name === "收货人区"
                //   ) {
                //     item.itemdata.valuedata = self.address.area;
                //     self.formConfig1.formValue.CP_C_REGION_AREA_ENAME =
                //       self.address.area;
                //     self.getAddressId("DIST", self.address.area).then(res => {
                //       if (res.data.data) {
                //         console.log(res.data.data.id);
                //         item.itemdata.pid = res.data.data.id;
                //         self.formConfig1.formValue.CP_C_REGION_AREA_ID =
                //           res.data.data.id;
                //       } else {
                //         self.$Message.warning("省市区id获取失败");
                //       }
                //     });
                //   }
                // });
              }
            },
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.consignee'), // 收货人
            disabled: false,
            value: 'RECEIVER_NAME',
            dataAcessKey: 'RECEIVER_NAME',
            width: '6',
            rules: true,
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.consignee_phone'), // 收货人手机
            disabled: false,
            value: 'RECEIVER_MOBILE',
            dataAcessKey: 'RECEIVER_MOBILE',
            width: '6',
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.consignee_tel'), // 收货人电话
            disabled: false,
            value: 'RECEIVER_PHONE',
            dataAcessKey: 'RECEIVER_PHONE',
            width: '6',
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.consignee_postcode'), // 收货人邮编
            disabled: false,
            value: 'RECEIVER_ZIP',
            dataAcessKey: 'RECEIVER_ZIP',
            width: '6',
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            dataAcessKey: 'CP_C_REGION_PROVINCE_ENAME',
            itemdata: {},
            oneObj: () => {
              // 点击选中事件
              // 市 区/县值为空
              this.formConfig1.formData[6].itemdata.pid = '';
              this.formConfig1.formData[6].itemdata.valuedata = '';
              this.formConfig1.formValue.CP_C_REGION_CITY_ID = '';
              this.formConfig1.formValue.CP_C_REGION_CITY_ENAME = '';
              this.formConfig1.formData[7].itemdata.pid = '';
              this.formConfig1.formData[7].itemdata.valuedata = '';
              this.formConfig1.formValue.CP_C_REGION_AREA_ID = '';
            },
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            dataAcessKey: 'CP_C_REGION_CITY_ENAME',
            inputList: [],
            objList: [],
            itemdata: {},
            oneObj: () => {
              // 市 区/县值为空
              this.formConfig1.formData[7].itemdata.pid = '';
              this.formConfig1.formData[7].itemdata.valuedata = '';
              this.formConfig1.formValue.CP_C_REGION_AREA_ID = '';
            },
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            inputList: [],
            dataAcessKey: 'CP_C_REGION_AREA_ENAME',
            itemdata: {
              col: 1,
              colid: 167816,
              colname: 'RECEIVER_AREA', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: vmI18n.t('form_label.aconsignee_area'), // 收货人区
              inputname: 'RECEIVER_AREA:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: vmI18n.t('form_label.aconsignee_area'), // 收货人区 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_DISTAREA', // 对应的表
              reftableid: 23863, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              pid: '',
              valuedata: '', // 这个是选择的值
              refcolval: {
                fixcolumn: 'C_UP_ID',
                expre: 'equal',
                srccol: 'RECEIVER_CITY',
              }, // 过滤配置
            },
          },
          // {
          //   style: "input",
          //   label: "收货人邮费",
          //   value: "CONSIGN_SHIP_AMT",
          //   width: "6"
          // },
          {
            style: 'input',
            label: vmI18n.t('form_label.aconsignee_address'), // 收获人地址
            value: 'RECEIVER_ADDRESS',
            dataAcessKey: 'RECEIVER_ADDRESS',
            width: '12',
            rules: true,
          },
        ],
        formValue: {
          time: '',
          site: '', // 智能地址值
          RECEIVER_NAME: '', // 收货人
          RECEIVER_MOBILE: '', // 收货人手机
          RECEIVER_PHONE: '', // 收货人电话
          RECEIVER_ZIP: '', // 收货人邮编
          // CONSIGN_SHIP_AMT: "", //收货人邮费
          RECEIVER_ADDRESS: '', // 收货人地址

          CP_C_REGION_PROVINCE_ID: '', // 收货人省份id
          CP_C_REGION_PROVINCE_ENAME: '', // 收货人省名称

          CP_C_REGION_CITY_ID: '', // 收货人市id
          CP_C_REGION_CITY_ENAME: '', // 收货人市明称

          CP_C_REGION_AREA_ID: '', // 收货人区id
          CP_C_REGION_AREA_ENAME: '', // 收货人区名称
        },
        // 表单非空提示
        ruleValidate: {
          RECEIVER_NAME: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVER_ADDRESS: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVER_MOBILE: [{ required: true, message: ' ', trigger: 'blur' }],
        },
      },
      // 表单三
      formConfig2: {
        formData: [
          {
            style: 'input',
            label: vmI18n.t('form_label.buyerNotes'), // 买家备注
            value: 'BUYER_MESSAGE',
            disabled: false,
            dataAcessKey: 'BUYER_MESSAGE',
            width: '12',
          },
          {
            style: 'input',
            label: vmI18n.t('form_label.sellerNotes'), // 卖家备注
            value: 'SELLER_MEMO',
            disabled: false,
            dataAcessKey: 'SELLER_MEMO',
            width: '12',
          },
        ],
        formValue: {
          BUYER_MESSAGE: '', // 买家备注
          SELLER_MEMO: '', // 卖家备注
        },
      },
      // 表格
      jordanTableConfig: {
        indexColumn: false,
        // isShowSelection: true, // 是否存在多选框
        businessFormConfig: {
          formValue: {
            dimData: '',
            Num: '',
            gbCode: '',
          },
          formData: [
            {
              label: vmI18n.t('table_label.productNo'), // 商品编码
              style: 'dimSearch',
              width: '6',
              value: 'gbCode',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
              dimChange: (val) => {
                // 模糊查询的方法
                const _this = this;
                _this.jordanTableConfig.businessFormConfig.formValue.gbCode = val.trim();
                const fromdata = new FormData();
                const params = {
                  GLOBAL: val.trim(),
                  PAGENUM: 1,
                  PAGESIZE: 10,
                  CONDITION: {},
                  TABLENAME: 'PS_C_PRO',
                };
                fromdata.append('param', JSON.stringify(params));
                this.service.orderCenter.screenresult(fromdata)
                // this.$network
                //   .post("/p/cs/screenresult", fromdata)
                  .then((res) => {
                    if (res.data.code === 0) {
                      const dimList = _this.jordanTableConfig.businessFormConfig.formData;

                      dimList.forEach((item) => {
                        if (
                          item.label === this.vmI18n.t('table_label.productNo')
                        ) {
                          item.AuotData = res.data.data.list;
                        }
                      });
                    }
                  });
              },
              dimEnter: (val) => {
                const self = this;
                if (!self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID) {
                  self.$Message.warning(self.vmI18n.t('modalTips.g0')); // 发货店仓，不能为空
                  return;
                }
                self.matrixBox.componentData = {
                  objid: -1,
                  encode: val,
                  distribIds: self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID,
                  tablename: 'OC_B_ORDER',
                };
                self.$children
                  .find(item => item.name === 'matrixBox')
                  .openConfirm();
              },
              dimSelect: (val) => {
                const self = this;
                if (!self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID) {
                  self.$Message.warning(self.vmI18n.t('modalTips.g0')); // 发货店仓，不能为空
                  return;
                }
                self.matrixBox.componentData = {
                  objid: -1,
                  encode: val.label,
                  distribIds: self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID,
                  tablename: 'OC_B_ORDER',
                };
                self.$children
                  .find(item => item.name === 'matrixBox')
                  .openConfirm();
                // document.getElementById("Num").focus();
              },
            },
            {
              label: vmI18n.t('form_label.barCode'), // 条码
              style: 'dimSearch',
              width: '6',
              value: 'dimData',
              columns: ['ECODE'],
              AuotData: [], // 匹配的选项
              dimChange: (val) => {
                // 模糊查询的方法
                const _this = this;
                _this.jordanTableConfig.businessFormConfig.formValue.dimData = val.trim();
                this.service.orderCenter.skuQuery({
                  isBlur: 'Y', // N为精确匹配
                  psCSku: {
                    ECODE: val.trim(),
                  },
                })
                // this.$network
                //   .post('/p/cs/skuQuery', {
                //     isBlur: 'Y', // N为精确匹配
                //     psCSku: {
                //       ECODE: val.trim(),
                //     },
                //   })
                  .then((res) => {
                    if (res.status === 200) {
                      const data = res.data.data.data;
                      const dimList = _this.jordanTableConfig.businessFormConfig.formData;
                      data.forEach((item) => {
                        // 删除不需要展示的模糊搜索项
                        delete item.GBCODE;
                        delete item.IS_GIFT;
                        delete item.IS_GROUP;
                        delete item.PRICELIST;
                        // delete item.PS_C_PRO_ECODE;
                        delete item.PS_C_PRO_ID;
                        delete item.colorId;
                        delete item.colorName;
                        delete item.sizeId;
                        delete item.sizeName;
                        delete item.skuId;
                      });
                      dimList.forEach((item) => {
                        // 条码
                        if (
                          item.label === _this.vmI18n.t('form_label.barCode')
                        ) {
                          item.AuotData = data;
                          // 调用查询提取方法,传给条码,默认数量为一,调用状态为0的保存接口
                        }
                      });
                    }
                  });
              },
              dimEnter: (val) => {
                const self = this;
                self.querySave(val);
              },
              dimSelect: (val) => {
                const self = this;
                self.jordanTableConfig.businessFormConfig.formValue.dimData = val.label;
                // const self = this;
                // if (!self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID) {
                //   self.$Message.warning("发货店仓，不能为空");
                //   return;
                // }
                // self.matrixBox.componentData = {
                //   objid: self.$route.query.id,
                //   encode: val.tem.PS_C_PRO_ECODE,
                //   distribIds: self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID,
                //   tablename: 'OC_B_ORDER'
                // }
                // self.$children
                //   .find(item => item.name === "jordanMatrixBox")
                //   .openConfirm();
                // document.getElementById("Num").focus();
              },
            },
            // {
            //   style: "input", //输入框类型
            //   label: "数量", //输入框前文字
            //   value: "Num", //输入框的值
            //   width: "6", //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            //   id: "Num",
            //   inputenter: () => {
            //     let self = this;
            //     // let ecode =
            //     //   self.jordanTableConfig.businessFormConfig.formValue.dimData;
            //     // self.searchOnEnter(ecode);
            //     self.enterQuerySave();
            //   }
            // }
          ],
        }, // 表单配置

        // 是否修改搜索框为select
        isSearchText: true,
        isShowDeleteDetailBtn: true, // 控制是否显示删除明细
        // isSearchText为false的情况下使用 搜索框list
        searchSelectList: [
          {
            value: '1',
            label: 'aa',
          },
          {
            value: '2',
            label: 'bb',
          },
        ],
        pageShow: false, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '280', // 表格高度
        border: true, // 是否显示纵向边框
        total: 1, // 设置总条数
        pageSizeOpts: [10, 30, 45, 60], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        columns: [
          {
            key: 'selection',
            type: 'selection',
            width: '50',
            align: 'center',
          },
          {
            title: vmI18n.t('table_label.productNo'), // 商品编码
            key: 'PS_C_PRO_ECODE',
            dataAcessKey: 'PS_C_PRO_ECODE',
          },
          // 颜色
          {
            title: vmI18n.t('other.color'), // 颜色
            key: 'PS_C_CLR_ENAME',
            dataAcessKey: 'PS_C_CLR_ENAME',
          },
          // 尺寸
          {
            title: vmI18n.t('other.sizes'),
            key: 'PS_C_SIZE_ENAME',
            dataAcessKey: 'PS_C_SIZE_ENAME',
          },
          {
            title: vmI18n.t('form_label.barCode'), // 条码
            key: 'PS_C_SKU_ECODE',
            dataAcessKey: 'PS_C_SKU_ECODE',
          },
          {
            title: vmI18n.t('table_label.productName'), // 商品名称
            key: 'PS_C_PRO_ENAME',
            dataAcessKey: 'PS_C_PRO_ENAME',
            width: 100,
            render: (h, params) => h('span', [
              h(
                'Poptip',
                {
                  props: {
                    placement: 'bottom',
                    transfer: true,
                    trigger: 'hover',
                  },
                },
                [
                  h(
                    'span',
                    {
                      style: {
                        width: '100px',
                        'white-space': 'nowrap',
                        'text-overflow': 'ellipsis',
                        overflow: 'hidden',
                      },
                    },
                    params.row.PS_C_PRO_ENAME
                  ),
                  h(
                    'span',
                    {
                      slot: 'content',
                    },
                    params.row.PS_C_PRO_ENAME
                  ),
                ]
              ),
            ]),
          },
          // 性别
          {
            title: vmI18n.t('table_label.gender'), // 性别
            key: 'SEX_NAME',
            dataAcessKey: 'SEX',
          },
          // 性别
          {
            title: vmI18n.t('table_label.tagPrice'), // 吊牌价
            key: 'RESERVE_DECIMAL02',
            dataAcessKey: 'RESERVE_DECIMAL02',
            // render: (h, params) => {
            //   return h(
            //     "span",
            //     {},
            //     params.row.STANDARDS_LIST[0].RESERVE_DECIMAL02 !== undefined
            //       ? params.row.STANDARDS_LIST[0].RESERVE_DECIMAL02.toFixed(2)
            //       : params.row.RESERVE_DECIMAL02
            //   );
            // }
          },
          // {
          //   title: "平台价格",
          //   key: "PRICE_LIST",
          //   render: (h, params) => {
          //     return h("span", {}, params.row.PRICE_LIST.toFixed(2));
          //   }
          // },
          {
            title: vmI18n.t('table_label.unitPrice'), // 成交单价
            key: 'PRICE_ACTUAL',
            dataAcessKey: 'PRICE',
            render: (h, params) => {
              const self = this;
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    display: 'flex',
                    alignitems: 'center',
                    justifyContent: 'space-between',
                  },
                },
                [
                  h('Input', {
                    class: 'isNone',
                    style: {
                      width: '150',
                      height: '100%',
                      border: '1px solid #dcdee2',
                      'text-align': 'center',
                    },
                    props: {
                      value: params.row.PRICE_ACTUAL,
                      autosize: true,
                      // regx:/^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$/,
                      regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
                    },

                    on: {
                      'on-change': (e) => {
                        params.row.PRICE_ACTUAL = Number(e.target.value);
                        params.row.PRICE = Number(e.target.value);
                        if (params.row.QTY) {
                          params.row.REAL_AMT = publicMethodsUtil
                            .accMul(params.row.QTY, params.row.PRICE_ACTUAL)
                            .toFixed(2);
                        }
                        self.jordanTableConfig.data[params.index] = params.row;
                        self.totalNum();
                      },
                    },
                  }),
                ]
              );
            },
          },
          {
            title: vmI18n.t('table_label.quantities'), // 数量
            key: 'QTY',
            dataAcessKey: 'QTY',
            render: (h, params) => {
              const self = this;
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    display: 'flex',
                    alignitems: 'center',
                    justifyContent: 'space-between',
                  },
                },
                [
                  h(
                    'Input',
                    {
                      class: 'isNone',
                      style: {
                        width: '150',
                        height: '100%',
                        border: '1px solid #dcdee2',
                        'text-align': 'center',
                      },
                      props: {
                        value: params.row.QTY,
                        autosize: true,
                        regx: /^[0-9]*$/,
                      },

                      on: {
                        'on-change': (e) => {
                          params.row.QTY = Number(e.target.value);
                          if (params.row.PRICE_ACTUAL) {
                            params.row.REAL_AMT = publicMethodsUtil
                              .accMul(params.row.QTY, params.row.PRICE_ACTUAL)
                              .toFixed(2);
                          }
                          self.jordanTableConfig.data[params.index] = params.row;
                          self.totalNum();
                        },
                      },
                    }
                    // params.row.QTY
                  ),
                ]
              );
            },
          },
          {
            title: vmI18n.t('table_label.transactionAmount'), // 成交金额
            key: 'REAL_AMT',
            dataAcessKey: 'REAL_AMT',
            render: (h, params) => {
              const self = this;
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    display: 'flex',
                    alignitems: 'center',
                    justifyContent: 'space-between',
                  },
                },
                [
                  h('Input', {
                    class: 'isNone',
                    style: {
                      width: '150',
                      height: '100%',
                      border: '1px solid #dcdee2',
                      'text-align': 'center',
                    },
                    props: {
                      value: params.row.REAL_AMT,
                      autosize: true,
                      // regx:/^(([1-9]{1}\\d*)|([0]{1}))(\\.(\\d){0,2})?$/,
                      regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
                    },

                    on: {
                      'on-change': (e) => {
                        params.row.REAL_AMT = Number(e.target.value);
                        if (params.row.QTY) {
                          params.row.PRICE_ACTUAL = (
                            params.row.REAL_AMT / params.row.QTY
                          ).toFixed(2);
                          params.row.PRICE = params.row.PRICE_ACTUAL;
                        }
                        self.jordanTableConfig.data[params.index] = params.row;
                        self.totalNum();
                      },
                    },
                  }),
                ]
              );
            },
          },
          {
            title: vmI18n.t('table_label.whetherGift'), // 是否赠品
            key: 'IS_GIFT',
            dataAcessKey: 'IS_GIFT',
            render: (h, params) => h(
              'Select',
              {
                style: {
                  width: '150px',
                },
                attrs: {
                  disabled: true,
                },
                props: {
                  value: String(params.row.IS_GIFT),
                },
                on: {
                  'on-change': (value, ev) => {
                    this.jordanTableConfig.data[
                      params.index
                    ].IS_GIFT = Number(value);
                  },
                },
              },
              this.isgift.forEach(item => h('Option', {
                props: {
                  value: item.value,
                  label: item.label,
                  transfer: true,
                },
              }))
            ),
          },
          {
            title: vmI18n.t('table_label.adjustment_amount'),
            key: 'ADJUST_AMT',
            dataAcessKey: 'ADJUST_AMT',
            render: (h, params) => h('span', {}, params.row.ADJUST_AMT.toFixed(2)),
          },
          {
            title: vmI18n.t('table_label.preferential_amount'),
            key: 'AMT_DISCOUNT',
            dataAcessKey: 'AMT_DISCOUNT',
            render: (h, params) => h('span', {}, params.row.AMT_DISCOUNT.toFixed(2)),
          },
          // {
          //   title: "实物报缺",
          //   key: "IS_LACKSTOCK"
          // },
          // {
          //   title: "分销金额",
          //   key: "DISTRIBUTION_PRICE"
          // }
        ],
        data: [],
        totalData: [], // 合计
      },
      // tab切换配置
      labelList: [
        {
          label: vmI18n.t('panel_label.order_detailed'), // 订单明细
          value: '1',
          isShow: true,
        },
      ],
      labelDefaultValue: '1', // 设置tab默认值
      orderNo: {
        refFuns: 'confirmFun',
        confirmTitle: vmI18n.t('modalTitle.matrixEntry'), // 矩阵录入
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '800',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: false, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'orderNo', // 组件名称
        url: 'order/orderManager/changeRemark',
      },
    };
  },
  watch: {
    isSetOption(val) {
      const self = this;
      if (val) {
        self.orderCopy();
      }
    },
    selectData(val) {
      const self = this;
      const arr = [];
      val.forEach((item) => {
        const obj = {};
        obj.label = item.limitdesc;
        obj.value = Number(item.limitval);
        arr.push(obj);
      });
      self.formConfig.formData.forEach((item) => {
        if (item.label === '付款方式') {
          item.options = arr;
          self.isSetOption = true;
        }
      });
      self.watch_paytype();
    }, // 监听付款方式的字段选项组的值,如果有值,这赋值给付款方式下拉选项值中
  },
  created() {
    this.$nextTick(() => {
      // 订单新增-表格
      this.getDataAccess('OC_B_ORDER', (res) => {
        // 订单新增-基础信息
        this.formConfig.formData.forEach((parent) => {
          res.SENSITIVE_COLUMNS.forEach((child) => {
            if (parent.dataAcessKey == child.ecode) {
              this.setFormPermissions(parent, child, 'add');
            }
          });
        });
        // 订单新增-收货人信息
        this.formConfig1.formData.forEach((parent) => {
          res.SENSITIVE_COLUMNS.forEach((child) => {
            if (parent.dataAcessKey == child.ecode) {
              console.log(parent);
              console.log(child);
              this.setFormPermissions(parent, child, 'add');
            }
          });
        });
        // 订单新增-备注信息
        this.formConfig2.formData.forEach((parent) => {
          res.SENSITIVE_COLUMNS.forEach((child) => {
            if (parent.dataAcessKey == child.ecode) {
              this.setFormPermissions(parent, child, 'add');
            }
          });
        });
        // 订单新增-表格-表单
        this.jordanTableConfig.businessFormConfig.formData.forEach((parent) => {
          res.SENSITIVE_COLUMNS.forEach((child) => {
            if (parent.dataAcessKey == child.ecode) {
              this.setFormPermissions(parent, child, 'add');
            }
          });
        });
        // 解决表格表头
        this.jordanTableConfig.columns = this.setTablePermissions(
          this.jordanTableConfig.columns,
          res
        );
      });
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'orderManager');
    });
    //
    const self = this;
    const fromdata = new FormData();
    fromdata.append('table', 'OC_B_ORDER');
    fromdata.append('objid', -1);
    self.service.orderCenter.getObject(fromdata)
    // self.$network.post('/p/cs/getObject', fromdata)
      .then((res) => {
        res.data.data.addcolums.forEach((item) => {
          if (item.parentdesc === '基本信息') {
            const selectData = item.childs;
            selectData.forEach((item) => {
              if (item.name === '支付类型') {
                self.selectData = item.combobox;
              }
            });
          }
        });
      });
    this.relationShip();
  }, // 获取支付方式下拉选项值
  methods: {
    // 发货仓库
    async getWarehouse(id, cid) {
      const _this = this;
      _this.formConfig.formData[8].options = [];
      const formData = new FormData();
      if (id) {
        formData.append(
          'param',
          JSON.stringify({
            shopId: id,
            cityShopFlag: _this.formConfig1.formValue.RESERVE_BIGINT12,
          })
        );
      } else {
        formData.append(
          'param',
          JSON.stringify({ shopId: _this.formConfig.formData[0].itemdata.pid })
        );
      }
      if (_this.formConfig.formData[0].itemdata.pid) {
        const res = await _this.service.common.queryPhyWareHouseList(formData);
        if (res.data.code === 0) {
          _this.formConfig.formData.forEach((item) => {
            if (item.label === '发货仓库') item.options = res.data.data;
          });
          let existsFlag = false;
          let cidStr = `${cid}`;
          res.data.data.forEach((item) => {
            if (item.value === cidStr) {
              existsFlag = true;
            }
          });
          if (!existsFlag) {
            cidStr = '';
          }
          if (cid) {
            setTimeout(() => {
              _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = cidStr;
            }, 100);
          }
        }
      } else {
        // _this.$Message.error('请先选择下单店铺');
      }
    },
    // 返回
    back() {
      this.$store.commit('customize/TabHref', {
        id: 2627,
        type: 'action',
        name: 'orderManager',
        label: vmI18n.t('panel_label.orderManager'), // 订单管理
        back: true,
        query: Object.assign({
          id: 2627,
          tabTitle: vmI18n.t('panel_label.orderManager'), // 订单管理
        }),
      });
    },
    // 合计
    totalNum() {
      const self = this;
      let amt = 0;
      let qty = 0;
      self.jordanTableConfig.totalData = [];
      self.jordanTableConfig.data.forEach((item) => {
        qty += parseInt(item.QTY);
        amt = publicMethodsUtil.accAdd(
          parseFloat(item.REAL_AMT).toFixed(2),
          amt
        );
      });
      setTimeout(() => {
        self.jordanTableConfig.totalData.push({
          selection: `${self.vmI18n.t('other.total')}:`,
          REAL_AMT: amt,
          QTY: qty,
        });
      }, 10);
    },
    // 判断付款方式值的变化,隐藏显示某些表单
    watch_paytype() {
      const showNo = this.formConfig.formData;
      const selectData = this.formConfig.formValue.PAY_TYPE;
      if (selectData === 1) {
        showNo.forEach((item) => {
          if (item.label === '代收金额' || item.label === '服务费') {
            item.style = '';
          }
        });
      } else {
        showNo.forEach((item) => {
          if (item.label === '代收金额' || item.label === '服务费') {
            item.style = 'input';
          }
        });
      }
    },
    watchPlatform(platform, expressCode) {
      const self = this;
      const formData = self.formConfig.formData;
      if (platform === 50) {
        formData.forEach((item) => {
          if (item.value === 'EXPRESS_CODE') {
            item.style = 'input';
            self.formConfig.formValue.EXPRESS_CODE = expressCode;
          }
        });
      } else {
        formData.forEach((item) => {
          if (item.value === 'EXPRESS_CODE') {
            item.style = '';
          }
        });
      }
    },
    // 丢单赋值或复制订单赋值页面方法
    orderCopy() {
      const self = this;
      const copyID = self.$route.query;
      let type = '';
      // 获取丢单复制,复制订单的值进行渲染
      if (copyID.copyOrder) {
        type = '1'; // 复制订单
      } else if (copyID.orderCopy) {
        type = '2'; // 丢单复制
      } else {
        return;
      }
      self.service.orderCenter.billCopy({
        IDS: [copyID.id],
        TYPE: type,
      })
      // self.$network
      //   .post('/p/cs/billCopy', {
      //     IDS: [copyID.id],
      //     TYPE: type,
      //   })
        .then((res) => {
          if (res.data.code === 0) {
            const obj = Object.assign(
              res.data.data.baseInfo,
              res.data.data.receivingGoods,
              res.data.data.remarksInfo
            );
            self.isCopy = true;
            self.setOrderData(obj);
            self.getOrderDatail(copyID);
          } else {
            self.$Message.warning(res.data.message);
            self.back();
          }
        });
    },
    // 获取订单明细
    getOrderDatail(copyID) {
      const self = this;
      self.service.orderCenter.getOrderDetailList({
        id: copyID.id,
        currentPage: 1,
        pageSize: 1000,
      })
      // self.$network
      //   .post('/p/cs/getOrderDetailList', {
      //     id: copyID.id,
      //     currentPage: 1,
      //     pageSize: 1000,
      //   })
        .then((res) => {
          if (res.data.code === 0) {
            self.jordanTableConfig.data = res.data.data.records;
            self.jordanTableConfig.total = res.data.data.total;
            // 明细合计
            let amt = 0;
            let qty = 0;
            self.jordanTableConfig.data.forEach((item) => {
              amt = publicMethodsUtil.accAdd(
                parseFloat(item.REAL_AMT).toFixed(2),
                amt
              );
              qty += item.QTY;
            });
            self.jordanTableConfig.totalData = [
              {
                selection: `${self.vmI18n.t('other.total')}:`, // 合计
                REAL_AMT: amt,
                QTY: qty,
              },
            ];
          } else {
            self.$Message.warning(res.data.message);
          }
        });
    },
    keyDown(e) {},
    sava(data) {
      const self = this;
      const warnFlag = self.saveWarnCheck(data);
      if (warnFlag) {
        self.$Modal.info({
          title: self.vmI18n.t('modalTitle.tips'), // 提示
          content: self.vmI18n.t('modalTips.g1'), // 订单存在非赠品的成交金额为0， 是否确定保存订单？
          mask: true,
          showCancel: true,
          okText: self.vmI18n.t('common.determine'), // 确定
          cancelText: self.vmI18n.t('common.cancel'), // 取消
          onOk: () => {
            self.isShowFromLoading = true;
            self.service.orderCenter.saveBill(data)
            // self.$network.post('/p/cs/saveBill', data)
              .then((res) => {
                self.isShowFromLoading = false;
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.btnConfig.buttons[0].disabled = false;
                  self.$store.commit('customize/TabHref', {
                    id: -1,
                    type: 'action',
                    name: 'orderManageDetail',
                    label: self.vmI18n.t('panel_label.orderManager_edit'), // 订单管理编辑
                    query: Object.assign({
                      id: res.data.data,
                      tabTitle: self.vmI18n.t('panel_label.orderManager_edit'), // 订单管理编辑
                    }),
                  });
                  // 销毁当前实例
                  self.$destroy();
                } else {
                // 保存未成功
                  self.$Message.warning(
                    res.data.message || self.vmI18n.t('modalTips.g2')
                  );
                  self.btnConfig.buttons[0].disabled = false;
                }
              });
          },
        });
      } else {
        self.isShowFromLoading = true;
        self.service.orderCenter.saveBill(data)
        // self.$network.post('/p/cs/saveBill', data)
          .then((res) => {
            self.isShowFromLoading = false;
            if (res.data.code === 0) {
              self.$Message.success(res.data.message);
              self.btnConfig.buttons[0].disabled = false;
              self.$store.commit('customize/TabHref', {
                id: -1,
                type: 'action',
                name: 'orderManageDetail',
                label: self.vmI18n.t('panel_label.orderManager_edit'), // 订单管理编辑
                query: Object.assign({
                  id: res.data.data,
                  tabTitle: self.vmI18n.t('panel_label.orderManager_edit'), // 订单管理编辑
                }),
              });
              // 销毁当前实例
              self.$destroy();
            } else {
            // 保存未成功
              self.$Message.warning(
                res.data.message || self.vmI18n.t('modalTips.g2')
              );
              self.btnConfig.buttons[0].disabled = false;
            }
          });
      }
    }, // 保存方法
    saveAdd(data) {
      const self = this;
      // data.isNew = 1;
      data.type = 3;
      const warnFlag = self.saveWarnCheck(data);
      if (warnFlag) {
        self.$Modal.info({
          title: self.vmI18n.t('modalTitle.tips'), // 提示
          content: self.vmI18n.t('modalTips.g1'), // 订单存在非赠品的成交金额为0， 是否确定保存订单？
          mask: true,
          showCancel: true,
          okText: self.vmI18n.t('common.determine'), // 确定
          cancelText: self.vmI18n.t('common.cancel'), // 取消
          onOk: () => {
            self.isShowFromLoading = true;
            self.service.orderCenter.saveBill(data)
            // self.$network.post('/p/cs/saveBill', data)
              .then((res) => {
                self.isShowFromLoading = false;
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.btnConfig.buttons[0].disabled = false;
                  self.$store.commit('customize/TabHref', {
                    id: -1,
                    type: 'action',
                    name: 'orderManageDetail',
                    label: self.vmI18n.t('panel_label.orderManager_edit'), // 订单管理编辑
                    query: Object.assign({
                      id: res.data.data,
                      tabTitle: self.vmI18n.t('panel_label.orderManager_edit'), // 订单管理编辑
                    }),
                  });
                  // 销毁当前实例
                  self.$destroy();
                } else {
                  self.$Message.warning(
                    res.data.message || self.vmI18n.t('modalTips.g2')
                  );
                  self.btnConfig.buttons[0].disabled = false;
                }
              });
          },
        });
      } else {
        self.isShowFromLoading = true;
        self.service.orderCenter.saveBill(data)
        // self.$network.post('/p/cs/saveBill', data)
          .then((res) => {
            self.isShowFromLoading = false;
            if (res.data.code === 0) {
              self.$Message.success(res.data.message);
              self.btnConfig.buttons[0].disabled = false;
              self.$store.commit('customize/TabHref', {
                id: -1,
                type: 'action',
                name: 'orderManageDetail',
                label: self.vmI18n.t('panel_label.orderManager_edit'), // 订单管理编辑
                query: Object.assign({
                  id: res.data.data,
                  tabTitle: self.vmI18n.t('panel_label.orderManager_edit'), // 订单管理编辑
                }),
              });
              // 销毁当前实例
              self.$destroy();
            } else {
            // 保存未成功
              self.$Message.warning(
                res.data.message || self.vmI18n.t('modalTips.g2')
              );
              self.btnConfig.buttons[0].disabled = false;
            }
          });
      }
    },
    saveWarnCheck(data) {
      const items = data.ocBorderItemDto;
      let warnFlag = false;
      let noGiftFlag = false;
      let realAmtTotal = 0;
      items.forEach((item) => {
        if (item.IS_GIFT == '0') {
          noGiftFlag = true;
          realAmtTotal = publicMethodsUtil.accAdd(
            parseFloat(item.REAL_AMT).toFixed(2),
            realAmtTotal
          );
        }
      });
      if (noGiftFlag && realAmtTotal === 0) {
        warnFlag = true;
      }
      return warnFlag;
    },
    clearData() {
      // 清空条码数量值
      const self = this;
      // self.$children[3].$children[0].$children[0].$children[0].$children[0].$children[0].$children[0].$children[0].currentValue =
      //   ""; //从实例中清空条码框的值
      self.jordanTableConfig.businessFormConfig.formValue.dimData = '';
      self.jordanTableConfig.businessFormConfig.formValue.Num = '';
    },
    enterQuerySave(value) {
      const self = this;
      let ocBorderItemDto; // 明细参数
      const ecode = self.jordanTableConfig.businessFormConfig.formValue.dimData;
      const Num = self.jordanTableConfig.businessFormConfig.formValue.Num;
      // value有值代表编码弹出矩阵框，否则代表条码直接保存
      if (value) {
        const arr = [];
        Object.keys(value).forEach((keys) => {
          const obj = value[keys];
          arr.push({
            PS_C_SKU_ECODE: obj.PS_C_SKU_ECODE.trim(),
            QTY: obj.count === '' ? 0 : obj.count.trim(), // 数量
            REAL_AMT: '',
            IS_GIFT: -1,
          });
        });
        if (self.isCopy) {
          // 为丢单复制或复制订单第一次进来的
          ocBorderItemDto = JSON.stringify(self.jordanTableConfig.data);
          ocBorderItemDto = JSON.parse(ocBorderItemDto);
          arr.forEach((item) => {
            ocBorderItemDto.push(item); // 保存时将明细里所有数据传给后端
          });
        } else {
          ocBorderItemDto = arr;
        }
      } else if (self.isCopy) {
        // 为丢单复制或复制订单第一次进来的
        ocBorderItemDto = JSON.stringify(self.jordanTableConfig.data);
        ocBorderItemDto = JSON.parse(ocBorderItemDto);
        const oc = {
          PS_C_SKU_ECODE: ecode.trim(),
          QTY: Num.trim(),
          REAL_AMT: '',
          IS_GIFT: -1,
        };
        ocBorderItemDto.push(oc); // 保存时将明细里所有数据传给后端
      } else {
        ocBorderItemDto = [
          {
            PS_C_SKU_ECODE: ecode.trim(),
            QTY: Num.trim(),
            REAL_AMT: '',
            IS_GIFT: -1,
          },
        ];
      }
      if (ecode || value) {
        const ocBorderDto = Object.assign(
          self.formConfig.formValue,
          self.formConfig1.formValue,
          self.formConfig2.formValue
        );
        // 非空验证
        if (!self.isEmpty(ocBorderDto)) {
          return;
        }
        // 对是否开票值进行转换
        if (ocBorderDto.is_kaip) {
          ocBorderDto.IS_INVOICE = 1;
        } else {
          ocBorderDto.IS_INVOICE = 0;
        }
        ocBorderDto.ORDER_STATUS = 0;
        ocBorderDto.ID = self.ID;

        // 直接获取下拉单选里的值(valuedata , pid)
        self.formConfig.formData.forEach((item) => {
          // 下单店铺 配送物流 收货人省份 收货人市 收货人区
          if (
            item.itemdata
            && item.itemdata.name === self.vmI18n.t('form_label.orderShop')
          ) {
            ocBorderDto.CP_C_SHOP_TITLE = item.itemdata.valuedata;
            ocBorderDto.CP_C_SHOP_ID = item.itemdata.pid;
          } else if (
            item.itemdata
            && item.itemdata.name
              === self.vmI18n.t('form_label.distribution_logistics')
          ) {
            ocBorderDto.CP_C_LOGISTICS_ENAME = item.itemdata.valuedata;
            ocBorderDto.CP_C_LOGISTICS_ID = item.itemdata.pid;
          }
        }); // 基本信息模块下拉单选数据取值
        self.formConfig1.formData.forEach((item) => {
          if (
            item.itemdata
            && item.itemdata.name
              === self.vmI18n.t('form_label.consignee_province')
          ) {
            ocBorderDto.CP_C_REGION_PROVINCE_ENAME = item.itemdata.valuedata;
            ocBorderDto.CP_C_REGION_PROVINCE_ID = item.itemdata.pid;
          } else if (
            item.itemdata
            && item.itemdata.name === self.vmI18n.t('form_label.consignee_city')
          ) {
            ocBorderDto.CP_C_REGION_CITY_ENAME = item.itemdata.valuedata;
            ocBorderDto.CP_C_REGION_CITY_ID = item.itemdata.pid;
          }
          if (
            item.itemdata
            && item.itemdata.name === self.vmI18n.t('form_label.aconsignee_area')
          ) {
            ocBorderDto.CP_C_REGION_AREA_ENAME = item.itemdata.valuedata;
            ocBorderDto.CP_C_REGION_AREA_ID = item.itemdata.pid;
          }
        }); // 收货人信息下拉单选数据取值

        const data = {
          ocBorderDto,
          ocBorderItemDto,
        };
        if (self.isCopy) {
          data.orderId = self.$route.query.id;
        }
        self.service.orderCenter.saveBill(data)
        // self.$network.post('/p/cs/saveBill', data)
          .then((res) => {
            if (res.data.code === 0) {
              if (res.data.data) {
                self.ID = res.data.data; // 更新主表ID
              }
              self.$Message.success(res.data.message);
              self.clearData();

              // 调用查询明细接口
              self.service.orderCenter.getOrderDetailList({
                id: self.ID,
                currentPage: 1,
                pageSize: 1000,
              })
              // self.$network
              //   .post('/p/cs/getOrderDetailList', {
              //     id: self.ID,
              //     currentPage: 1,
              //     pageSize: 1000,
              //   })
                .then((result) => {
                  if (result.data.code == '0') {
                    self.jordanTableConfig.data = result.data.data.records;
                    // 动态添加总条数
                    self.jordanTableConfig.total = result.data.data.total;
                    // 明细合计
                    let amt = 0;
                    let qty = 0;
                    self.jordanTableConfig.data.forEach((item) => {
                      amt = publicMethodsUtil.accAdd(
                        parseFloat(item.REAL_AMT).toFixed(2),
                        amt
                      );
                      qty += item.QTY;
                    });
                    self.jordanTableConfig.totalData = [
                      {
                        selection: `${self.vmI18n.t('other.total')}:`, // 合计
                        REAL_AMT: amt,
                        QTY: qty,
                      },
                    ];
                    // self.$children.$children.refreshData();
                    self.$children
                      .find(item => item.name === 'matrixBox')
                      .closeConfirm();
                    if (self.isCopy) {
                      self.isCopy = false;
                    }
                  } else {
                  // 明细查询失败
                    self.$Message.warning(self.vmI18n.t('modalTips.g3'));
                  }
                });
            } else {
            // 明细保存失败
              self.$Message.warning(
                res.data.message || self.vmI18n.t('modalTips.g4')
              );
            }
          });
      } else {
        // 请输入条码
        self.$Message.warning(self.vmI18n.t('modalTips.g5'));
      }
    },
    enterQuerySave1(val) {
      // this.jordanTableConfig.data = this.jordanTableConfig.data.concat(val);
      const _this = this;
      _this.onSelectAllCancel();
      if (val.length) {
        if (_this.jordanTableConfig.data.length) {
          val.forEach((item) => {
            const d = _this.jordanTableConfig.data.find(
              list => list.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE
            );
            if (d) {
              val.forEach((data) => {
                if (data.PS_C_SKU_ECODE === d.PS_C_SKU_ECODE) {
                  d.QTY = parseInt(d.QTY) + parseInt(data.QTY);

                  d.REAL_AMT = publicMethodsUtil.accMul(d.PRICE_ACTUAL, d.QTY);
                }
              });
            } else {
              const arr = [];
              arr.push(item);
              _this.jordanTableConfig.data = _this.jordanTableConfig.data.concat(
                arr
              );
            }
          });
        } else {
          _this.jordanTableConfig.data = _this.jordanTableConfig.data.concat(
            val
          );
        }
      }
      _this.totalNum();
      this.jordanTableConfig.businessFormConfig.formValue.gbCode = '';
      this.$children
        .find(item => item.name === 'matrixBox')
        .closeConfirm();
    },
    querySave(val) {
      const _this = this;
      _this.service.orderCenter.skuQuery({
        isBlur: 'Y', // N为精确匹配
        psCSku: {
          ECODE: val,
        },
      })
      // _this.$network
      //   .post('/p/cs/skuQuery', {
      //     isBlur: 'Y', // N为精确匹配
      //     psCSku: {
      //       ECODE: val,
      //     },
      //   })
        .then((res) => {
          if (res.data.code === 0) {
            const data = [];
            data.push(res.data.data.data[0]);
            const cloneArr = [];
            if (!data.length) { return _this.$Message.error(_this.vmI18n.t('modalTips.g6')); } // 不存在该条码！
            data.forEach((item) => {
              cloneArr.push({
                RESERVE_DECIMAL02: item.tagPrice,
                PRICE_ACTUAL: item.tagPrice,
                REAL_AMT: publicMethodsUtil.accMul(item.tagPrice, 1),
                PS_C_CLR_ENAME: item.colorName,
                PS_C_SIZE_ENAME: item.sizeName,
                PS_C_SKU_ECODE: item.ECODE,
                QTY: 1,
                ADJUST_AMT: 0,
                AMT_DISCOUNT: 0,
                IS_GIFT: item.IS_GIFT,
                SEX_NAME: item.sexName,
                PS_C_PRO_ENAME: item.PS_C_PRO_ENAME,
                PS_C_PRO_ECODE: item.PS_C_PRO_ECODE,
              });
            });
            if (_this.jordanTableConfig.data.length) {
              const x = JSON.parse(
                JSON.stringify(_this.jordanTableConfig.data)
              );
              const d = x.find(
                item => item.PS_C_SKU_ECODE === cloneArr[0].PS_C_SKU_ECODE
              );
              if (d) {
                d.QTY += parseInt(cloneArr[0].QTY);
                d.REAL_AMT = publicMethodsUtil.accMul(d.PRICE_ACTUAL, d.QTY);
                _this.jordanTableConfig.data = [...x];
              } else {
                _this.jordanTableConfig.data = _this.jordanTableConfig.data.concat(
                  cloneArr
                );
              }
            } else {
              _this.jordanTableConfig.data = cloneArr;
            }
            _this.jordanTableConfig.businessFormConfig.formValue.dimData = '';
            _this.totalNum();
          }
        });
    },
    oneObjs(e) {
      const _this = this;
      _this.formConfig.formData.forEach((item) => {
        if (item.itemdata) {
          // 发货仓库
          if (
            item.itemdata.name == e.name
            && item.itemdata.name == vmI18n.t('form_label.delivery_warehouse')
          ) {
            _this.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = item.itemdata.pid;
          }
        }
      });
    },

    onSelectCancel(selection, row) {
      const self = this;
      self.jordanTableConfig.data.forEach((item) => {
        if (row.ID) {
          if (item.ID === row.ID) {
            item.checked = false;
          }
        } else if (item.PS_C_SKU_ECODE === row.PS_C_SKU_ECODE) {
          item.checked = false;
        }
      }); // 表格勾选取消事件
    },
    onSelect(selection, row) {
      const self = this;
      self.jordanTableConfig.data.forEach((item) => {
        if (row.ID) {
          if (item.ID === row.ID) {
            item.checked = true;
          }
        } else if (item.PS_C_SKU_ECODE === row.PS_C_SKU_ECODE) {
          item.checked = true;
        }
      });
    }, // 表格取消勾选事件
    onSelectAllCancel() {
      const self = this;
      self.jordanTableConfig.data.forEach((item) => {
        item.checked = false;
      });
    }, // 全选勾选事件
    onSelectAll() {
      const self = this;
      self.jordanTableConfig.data.forEach((item) => {
        item.checked = true;
      });
    }, // 全选选中事件
    // 删除明细
    tableDeleteDetail() {
      const self = this;
      const arr = [];
      const delarr = []; // 保存删除后的列表
      // 逆向循环
      for (let i = self.jordanTableConfig.data.length - 1; i >= 0; i--) {
        if (!self.jordanTableConfig.data[i].checked) {
          // item.IS_GIFT === "是" ? 1 : 0;
          arr.push(self.jordanTableConfig.data[i]);
        } else {
          // item.IS_GIFT === "是" ? 1 : 0;
          delarr.push(self.jordanTableConfig.data[i]);
          // if (self.$route.query.copyOrder || self.$route.query.orderCopy) {
          if (self.ID === '' || self.ID === null) {
            self.jordanTableConfig.data.splice(i, 1);
            self.jordanTableConfig.total--;
            // 明细合计
            let amt = 0;
            let qty = 0;
            self.jordanTableConfig.data.forEach((item) => {
              amt = publicMethodsUtil.accAdd(
                parseFloat(item.REAL_AMT).toFixed(2),
                amt
              );
              qty += item.QTY;
            });
            self.jordanTableConfig.totalData = [
              {
                selection: `${self.vmI18n.t('other.total')}:`, // 合计
                REAL_AMT: amt,
                QTY: qty,
              },
            ];
          }
        }
      }
      delarr.forEach((item) => {
        if (item.IS_GIFT === self.vmI18n.t('common.yes')) {
          item.IS_GIFT = 1;
        } else {
          item.IS_GIFT = 0;
        }
      });
      const data = {
        ocBorderDto: {
          ID: self.ID,
        },
        ocBorderItemDto: delarr,
      };
      if (self.ID) {
        self.service.orderCenter.delOrderItem(data)
        // self.$network.post('/p/cs/delOrderItem', data)
          .then((res) => {
            if (res.data.code == 0) {
              self.$Message.success(res.data.message);
              // self.jordanTableConfig.data = arr;
              self.service.orderCenter.getOrderDetailList({
                id: self.ID,
                currentPage: 1,
                pageSize: 1000,
              })
              // self.$network
              //   .post('/p/cs/getOrderDetailList', {
              //     id: self.ID,
              //     currentPage: 1,
              //     pageSize: 1000,
              //   })
                .then((result) => {
                  if (result.data.code == '0') {
                  // 对是否赠品,实物报缺进行映射
                    result.data.data.records.forEach((item) => {
                      if (item.IS_GIFT === 1) {
                        item.IS_GIFT = self.vmI18n.t('common.yes'); // 是
                      } else if (item.IS_GIFT === 0) {
                        item.IS_GIFT = self.vmI18n.t('common.no'); // 否
                      }
                    });
                    // result.data.data.records.forEach(item => {
                    //   if (item.IS_LACKSTOCK === "Y") {
                    //     item.IS_LACKSTOCK = "是";
                    //   } else if (item.IS_LACKSTOCK === "N") {
                    //     item.IS_LACKSTOCK = "否";
                    //   }
                    // });
                    self.jordanTableConfig.data = result.data.data.records;
                    // 明细合计
                    let amt = 0;
                    let qty = 0;
                    self.jordanTableConfig.data.forEach((item) => {
                      amt = publicMethodsUtil.accAdd(
                        parseFloat(item.REAL_AMT).toFixed(2),
                        amt
                      );
                      qty += item.QTY;
                    });
                    self.jordanTableConfig.totalData = [
                      {
                        selection: `${self.vmI18n.t('other.total')}:`, // 合计
                        REAL_AMT: amt,
                        QTY: qty,
                      },
                    ];

                    // 动态添加总条数
                    self.jordanTableConfig.total = result.data.data.total;
                  } else {
                    self.$Message.warning('明细查询失败!');
                  }
                });
            // self.$Message.success(res.data.message);
            } else {
              self.$Message.warning(res.data.message);
            }
          });
      }
    },
    // 获取省份id
    getAddressId(provinceName, cityName, areaName) {
      const self = this;
      return self.service.orderCenter.queryResionByName({
        provinceName,
        cityName,
        areaName,
      });
      // self.$network.post('/p/cs/queryResionByName', {
      //   provinceName,
      //   cityName,
      //   areaName,
      // });
    },
    // 获取市id
    // 获取区id

    // 非空验证方法
    isEmpty(masterTable) {
      let promptMessage = ''; // 非空提示信息
      // if (!masterTable.CP_C_SHOP_ID) {
      //   promptMessage += "下单店铺,";
      // }
      this.formConfig.formData.forEach((item) => {
        // 下单店铺
        if (
          item.itemdata
          && item.itemdata.name === self.vmI18n.t('form_label.orderShop')
          && !item.itemdata.pid
        ) {
          promptMessage += self.vmI18n.t('form_label.orderShop');
        }
        // if (
        //   item.itemdata &&
        //   item.itemdata.name === "发货仓库" &&
        //   !item.itemdata.pid
        // ) {
        //   promptMessage += "发货仓库,";
        // }
      });
      if (masterTable.SHIP_AMT === '') {
        promptMessage += self.vmI18n.t('form_label.distribution_costs'); // 配送费用
      }
      // if (!masterTable.CP_C_PHY_WAREHOUSE_ID || !masterTable.CP_C_PHY_WAREHOUSE_ENAME) promptMessage += "发货仓库,";
      if (!masterTable.SOURCE_CODE) {
        promptMessage += self.vmI18n.t('form_label.platform_billNo'); // 平台单号
      }
      // if (!masterTable.USER_NICK) {
      //   promptMessage += "买家昵称,";
      // }
      if (!masterTable.PAY_TYPE) {
        promptMessage += `${self.vmI18n.t('form_label.paymentMethod')},`; // 付款方式
      }
      if (masterTable.PAY_TYPE == 2) {
        if (masterTable.COD_AMT !== 0) {
          if (!masterTable.COD_AMT || masterTable.COD_AMT === '') {
            promptMessage += `${self.vmI18n.t(
              'form_label.collection_amount'
            )},`; // 代收金额
          }
        }
      }
      if (!masterTable.RECEIVER_NAME) {
        promptMessage += self.vmI18n.t('form_label.consignee'); // 收货人
      }
      if (!masterTable.RECEIVER_MOBILE && !masterTable.RECEIVER_PHONE) {
        promptMessage += `${self.vmI18n.t('form_label.consignee_phone')},`; // 收货人手机
      }
      // if (!masterTable.CP_C_REGION_PROVINCE_ENAME) {
      //   promptMessage += "收货人省份,";
      // }
      // if (!masterTable.CP_C_REGION_CITY_ENAME) {
      //   promptMessage += "收货人市,";
      // }
      this.formConfig1.formData.forEach((item) => {
        // 收货人省份 收货人市 收货人地址
        if (
          item.itemdata
          && item.itemdata.name
            === self.vmI18n.t('form_label.consignee_province')
          && !item.itemdata.pid
        ) {
          promptMessage += `${self.vmI18n.t('form_label.consignee_province')},`;
        } else if (
          item.itemdata
          && item.itemdata.name === self.vmI18n.t('form_label.consignee_city')
          && !item.itemdata.pid
        ) {
          promptMessage += `${self.vmI18n.t('form_label.consignee_city')},`;
        }
      });
      if (!masterTable.RECEIVER_ADDRESS) {
        promptMessage += `${self.vmI18n.t('form_label.aconsignee_address')},`;
      }
      if (promptMessage) {
        this.$Message.warning(
          `${promptMessage}${self.vmI18n.t('modalTips.y1')}`
        );
        return false;
      }
      return true;
    },

    // 新增表单赋值
    setOrderData(data) {
      const self = this;
      // 基本信息赋值
      self.formConfig.formValue.SHIP_AMT = data.SHIP_AMT; // 配送费用
      self.formConfig.formValue.USER_NICK = data.USER_NICK; // 买家昵称
      self.formConfig.formValue.SOURCE_CODE = data.TID; // 平台单号
      self.formConfig.formValue.PAY_TYPE = data.PAY_TYPE; // 付款方式
      self.formConfig.formValue.COD_AMT = data.COD_AMT; // 代收金额
      self.formConfig.formValue.SERVICE_AMT = data.SERVICE_AMT; // 服务费
      self.formConfig.formValue.PAY_TIME = new Date(data.PAY_TIME); // 付款时间
      if (data.ORDER_TYPE) {
        self.ORDER_TYPE = data.ORDER_TYPE;
      }
      self.watchPlatform(data.PLATFORM, data.EXPRESSCODE);
      self.formConfig.formValue.is_kaip = data.IS_INVOICE === 1; // 是否开票
      self.formConfig.formValue.INSIDE_REMARK = data.INSIDE_REMARK; // 备注补充新增字段(丢单复制,复制订单需要的)
      self.formConfig.formValue.SUFFIX_INFO = data.SUFFIX_INFO; //

      self.formConfig.formData.forEach((item) => {
        // 下单店铺 配送物流
        if (
          item.itemdata
          && item.itemdata.name === self.vmI18n.t('form_label.orderShop')
        ) {
          item.itemdata.valuedata = data.CP_C_SHOP_TITLE;
          item.itemdata.pid = data.CP_C_SHOP_ID;
        } else if (
          item.itemdata
          && item.itemdata.name
            === self.vmI18n.t('form_label.distribution_logistics')
        ) {
          item.itemdata.valuedata = data.CP_C_LOGISTICS_ENAME;
          item.itemdata.pid = data.CP_C_LOGISTICS_ID;
        }
        // else if (item.itemdata && item.itemdata.name === "发货仓库") {
        //   item.itemdata.valuedata = data.CP_C_PHY_WAREHOUSE_ENAME;
        //   item.itemdata.pid = data.CP_C_PHY_WAREHOUSE_ID;
        //   self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ID = data.CP_C_PHY_WAREHOUSE_ID;
        // }
      });
      self.formConfig.formValue.CP_C_PHY_WAREHOUSE_ENAME = data.CP_C_PHY_WAREHOUSE_ENAME;
      // 收货人信息赋值
      self.formConfig1.formValue.RECEIVER_NAME = data.RECEIVER_NAME; // 收货人
      self.formConfig1.formValue.RECEIVER_MOBILE = data.RECEIVER_MOBILE; // 收货人手机
      self.formConfig1.formValue.RECEIVER_PHONE = data.RECEIVER_PHONE; // 收货人电话
      self.formConfig1.formValue.RECEIVER_ZIP = data.RECEIVER_ZIP; // 收货人邮编
      // self.formConfig1.formValue.CONSIGN_SHIP_AMT = data.CONSIGN_SHIP_AMT; //收货人邮费
      self.formConfig1.formValue.RECEIVER_ADDRESS = data.RECEIVER_ADDRESS; // 收货人地址
      self.formConfig1.formValue.RESERVE_BIGINT11 = data.RESERVE_BIGINT11; // 是否传仓
      self.formConfig1.formValue.RESERVE_BIGINT12 = data.RESERVE_BIGINT12; // 同城标识
      self.formConfig1.formValue.IS_SELF_TAKE = data.IS_SELF_TAKE; // 是否自提
      self.getWarehouse(data.CP_C_SHOP_ID, data.CP_C_PHY_WAREHOUSE_ID);
      self.formConfig1.formData.forEach((item) => {
        // 收货人省份 收货人市 收货人区
        if (
          item.itemdata
          && item.itemdata.name === self.vmI18n.t('form_label.consignee_province')
        ) {
          item.itemdata.valuedata = data.CP_C_REGION_PROVINCE_ENAME;
          item.itemdata.pid = data.CP_C_REGION_PROVINCE_ID;
        } else if (
          item.itemdata
          && item.itemdata.name === self.vmI18n.t('form_label.consignee_city')
        ) {
          item.itemdata.valuedata = data.CP_C_REGION_CITY_ENAME;
          item.itemdata.pid = data.CP_C_REGION_CITY_ID;
        } else if (
          item.itemdata
          && item.itemdata.name === self.vmI18n.t('form_label.aconsignee_area')
        ) {
          item.itemdata.valuedata = data.CP_C_REGION_AREA_ENAME;
          item.itemdata.pid = data.CP_C_REGION_AREA_ID;
        }
      });
      // 备注信息赋值
      self.formConfig2.formValue.BUYER_MESSAGE = data.BUYER_MESSAGE; // 买家备注
      self.formConfig2.formValue.SELLER_MEMO = data.SELLER_MEMO; // 卖家备注
      self.watch_paytype();
    },
    // 过滤条件
    relationShip() {
      this.formConfig1.formData[5].itemdata = this.fkcolumn.PROV;
      this.formConfig1.formData[6].inputList.push(this.fkcolumn.PROV);

      this.formConfig1.formData[6].itemdata = this.fkcolumn.CITY;
      this.formConfig1.formData[7].inputList.push(this.fkcolumn.CITY);

      this.formConfig.formData[0].itemdata = this.fkcolumn.STORE;
      // this.formConfig.formData[8].inputList.push(this.fkcolumn.STORE);
      // this.formConfig1.formData[6].objList.push(this.fkcolumn.PROV);
    },
  },
};
