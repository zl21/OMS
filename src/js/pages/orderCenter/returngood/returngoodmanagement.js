// 退换货单详情
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import dataAccessMixin from '@/assets/js/mixins/dataAccess';
import BtnConfig from 'burgeonConfig/config/funBtn.config';
import commonUtils from 'burgeonConfig/config/commonUtils'
// import OrderItem from './orderItem';
import OrderItem from 'allpages/orderCenter/orderManageDetail/details/orderItem.vue';
const areaList = require('@/assets/js/address/area-list');
const { parse, parseArea } = require('@/assets/js/address/address-parse');

parseArea(areaList);
export default {
  name: 'returngoodmanagement',
  components: {
    OrderItem,
  },
  mixins: [buttonPermissionsMixin, dataAccessMixin],
  data() {
    return {
      shopId: '',
      Query: '', // 是否是enter事件
      // 显示水印标识
      statusName: '',
      // 水印标识集合
      waterMarkMap: {
        // 单据状态为等待退货入库（20）、等待售后确认（30）、完成（50）、取消（60）时，显示水印
        20: $it('form_label.waitFor_return_warehous'), // '等待退货入库',
        30: $it('form_label.waitFor_afterSale_review'), // '等待售后审核',
        50: $it('form_label.complete'), // '完成',
        60: $it('common.cancelled'), // '已取消',
      },
      // 可用库存不足弹窗提示
      availableStock: false,
      qtyRefundEditFlag: true,
      returnIdEditFlag: true,
      availableStockMassage: '',
      addReturnDetailSelectArr: [],
      addSelection: [],
      isModalSave: false, // 是否弹窗保存
      matrixBox: {
        refFuns: 'confirmFun',
        confirmTitle: $it('modalTitle.matrixEntry'), // 矩阵录入
        titleAlign: 'left', // 设置标题是否居中 center left
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

      // 弹框配置
      changeRemarkConfig: {
        refFuns: 'confirmFun',
        confirmTitle: $it('btn.modifyRemarks'), // 修改备注
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '440',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'rturngoodModifyRemarks', // 组件名称
        url: 'pages/orderCenter/returngood/rturngoodModifyRemarks',
        keepAlive: true,
        excludeString: 'rturngoodModifyRemarks', // 将name传进去，确认不缓存
        componentData: {},
      },
      order: {
        modal: false,
        btn: {
          typeAll: 'default', // 按钮统一风格样式
          buttons: [
            {
              text: $it('btn.find'), // 查找 按钮文本
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.queryBounced();
              }, // 按钮点击事件
            },
          ],
        },
        orderform: {
          formValue: {
            ID: '',
            source_code: '',
            receiver_name: '',
            user_nick: '',
            receiver_mobile: '',
            cp_c_store_ename: '',
          },
          formData: [
            {
              style: 'input',
              label: $it('form_label.orderNumber'), // 订单号
              value: 'ID',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: $it('form_label.billNo'), // 订单编号
              value: 'BILL_NO',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: $it('form_label.platform_billNo'), // 平台单号
              value: 'source_code',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: $it('form_label.consignee'), // 收货人
              value: 'receiver_name',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: $it('table_label.buyerNickname'), // 买家昵称
              value: 'user_nick',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'input',
              label: $it('form_label.consignee_phone'), // 收货人手机
              value: 'receiver_mobile',
              width: '8',
              inputenter: () => this.queryBounced(),
            },
            {
              style: 'popInput',
              width: '8',
              itemdata: {
                col: 1,
                colid: 168210,
                colname: 'SELLER_NICK', // 当前字段的名称
                datelimit: 'all',
                precolnameslist: [
                  {
                    premtype: 'CP_C_SHOP_PERMISSION_ID',
                    refcol: 'ID',
                    iswrite: 'true',
                  },
                ],
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'drp', // 外键关联类型
                fkdesc: $it('table_label.shopName'), // 店铺名称
                inputname: 'SELLER_NICK:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: $it('table_label.shopName'), // 店铺名称
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'OC_B_RETURN_ORDER', // 对应的表
                reftableid: 24578, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
              },
              oneObj: () => {
                this.threeObjs();
              },
            },
          ],
        },
        table: {
          columns: [
            {
              key: 'SOURCE_CODE',
              title: '平台信息', // 平台信息
            },
            {
              key: 'ID',
              title: $it('table_label.orderNo'), // 订单编号
            },
            {
              key: 'USER_NICK',
              title: $it('table_label.buyerNickname'), // 买家昵称
            },
            {
              key: 'ORDER_AMT',
              title: $it('table_label.totalOrderAmount'), // 订单总额
            },
            {
              key: 'RECEIVER_NAME',
              title: $it('form_label.consignee'), // 收货人
            },
            {
              key: 'RECEIVER_MOBILE',
              title: $it('form_label.consignee_phone'), // 收货人手机号
            },
            {
              key: 'CP_C_PHY_WAREHOUSE_ENAME',
              title: '发货仓库',
            },
            // {
            //   key: "PLATFORM",
            //   title: "平台状态"
            // },
            {
              key: 'EXPRESSCODE',
              title: $it('form_label.logisticsOrder_No'), // 物流单号
            },
            {
              key: 'CP_C_SHOP_TITLE',
              title: $it('form_label.orderShop'), // 下单店铺
            },
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          height: '300',
          loading: false,
          isShowSelection: true, // 是否显示checkedbox
        },
        value: '',
      },
      fkcolumn: {
        PROV: {
          col: 1,
          colid: 167814,
          colname: 'RECEIVER_PROVINCE', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: $it('form_label.consignee_province'), // 收货人省份
          inputname: 'CP_C_STORE_IDS:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: $it('form_label.consignee_province'), // 收货人省份 input前面显示的lable值
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
          fkdesc: $it('form_label.consignee_city'), // 收货人市
          inputname: 'RECEIVER_CITY:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: $it('form_label.consignee_city'), // 收货人市
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
      },
      address: '',
      isgoods: true, // 商品单价
      isnumber: true, // 申请数量
      // isreturned: true, // 可退货数量
      isreplacement: true, // 换货数量
      ispurchase: true, // 购买数量
      openDefault: [], // 默认展开设置
      clrListArr: {},
      sizeListArr: {},
      detailSelectOptions: {},
      itemSkuEcode: '',
      itemSkuId: '',
      itemGbcode: '',
      btnConfig: BtnConfig.config(),
      // btnConfig: {
      //   typeAll: 'default', // 按钮统一风格样式
      //   buttons: [],
      // }, // 按钮组
      information: {
        formValue: {
          // 存储表单得所有值
          PRO_RETURN_STATUS: '', // 退状货态
          ORIG_ORDER_ID: '', // 原始订单编号
          BILL_TYPE: '', // 单据类型
          BUYER_NICK: '', // 买家昵称
          CP_C_LOGISTICS_ENAME: '', // 退回物流公司
          ORIG_SOURCE_CODE: '', // 原始平台单号
          CP_C_SHOP_TITLE: '', // 店铺名称
          RETURN_ID: '', // 平台退款单号
          CP_C_LOGISTICS_ID: '', // 退回物流公司
          RETURN_REASON: '', // 退款原因
          LOGISTICS_CODE: '', // 退回物流单号
          IS_RESERVED: true, // 换货预留库存
          IS_BACK: false, // 是否原退
          IS_RETURN_ORDER_EXCHANGE: '',
          CP_C_STORE_ENAME: '', // 仓库
          REMARK: '', // 备注
          SELLER_MEMO: '', // 卖家备注
          BILL_NO: '', // 订单编号
          PLATFORM: '', // 平台
          TO_DRP_STATUS_NAME: '', // 传DRP状态
          TO_DRP_COUNT: 0, // 传DRP次数
          TO_DRP_FAILED_REASON: '', // 传DRP失败原因
          RETURN_DESC: '' // 平台退款原因
        },
        // 表单非空提示
        ruleValidate: {
          ORIG_ORDER_ID: [{ required: true, message: ' ', trigger: 'blur' }],
          BILL_TYPE: [{ required: true, message: ' ', trigger: 'blur' }],
          RETURN_REASON: [{ required: true, message: ' ', trigger: 'blur' }],
          // LOGISTICS_CODE: [{ required: true, message: ' ', trigger: 'blur' }]
        },
        formData: [
          {
            style: '',
            label: $it('form_label.chargebackNumber'), // 退单编号
            disabled: true,
            value: 'ID',
            width: '6',
          },
          {
            style: 'input', // 输入框类型
            dataAcessKey: 'ORIG_ORDER_ID',
            label: $it('form_label.originalOrderNo'), // 原始订单编号输入框前文字
            value: 'ORIG_ORDER_ID', // 输入框的值
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: 'ios-search', // 输入框后带的图标,暂只有输入框支持
            placeholder: '', // 占位文本，默认为请输入
            disabled: false, // 按钮禁用控制
            rules: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
            inputenter: () => {
              this.queryEnter();
            }, // 表单回车事件
            iconclick: () => {
              const _this = this;
              _this.onSelectData = [];
              _this.order.orderform.formValue = {};
              _this.order.orderform.formData[6].itemdata.pid = '';
              _this.order.orderform.formData[6].itemdata.valuedata = '';
              _this.order.table.data = [];
              // document.getElementsByClassName(
              //   "SELLER_NICK"
              // )[1].children[0].children[0].value = "";
              if (_this.$route.query.id == '-1') {
                _this.order.modal = true;
              }
            }, // 点击icon图标事件
          },
          {
            style: 'select', // 下拉框类型
            label: $it('form_label.billType'), // 单据类型 下拉框前的值
            dataAcessKey: 'BILL_TYPE',
            width: '6', // 所占宽度宽度
            disabled: false, // 按钮禁用控制
            rules: true,
            value: 'BILL_TYPE',
            selectChange: () => {
              this.selectSelectt();
            },
            options: [
              // 下拉框选项值
              {
                value: '1',
                label: $it('table_label.returnGood'), // 退货
              },
              {
                value: '2',
                label: $it('table_label.returnGoods'), // 退换货
              },
            ],
          },
          {
            style: 'input',
            label: $it('table_label.buyerNickname'), // 买家昵称
            value: 'BUYER_NICK',
            dataAcessKey: 'BUYER_NICK',
            disabled: true, // 按钮禁用控制
            width: '6',
          },
          {
            style: '',
            label: $it('form_label.originalPlatformNo'), // 原始平台单号
            value: 'ORIG_SOURCE_CODE',
            dataAcessKey: 'ORIG_SOURCE_CODE',
            disabled: true, // 按钮禁用控制
            width: '6',
            inputenter: () => {
              this.querySourceEnter();
            },
          },
          {
            style: 'popInput',
            width: '6',
            value: 'value5',
            dataAcessKey: 'CP_C_SHOP_TITLE',
            itemdata: {
              col: 1,
              colid: 168210,
              colname: 'SELLER_NICK', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $it('table_label.shopName'), // 店铺名称
              inputname: 'SELLER_NICK:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $it('table_label.shopName'), // 店铺名称 input前面显示的lable值
              readonly: true, // 是否可编辑，对应input   readonly属性
              reftable: 'OC_B_RETURN_ORDER', // 对应的表
              reftableid: 24578, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
            },
            oneObj: (e) => {
              this.oneObjs(e);
            },
          },
          {
            style: 'input',
            label: $it('form_label.platformRefundNo'), // 平台退款单号
            dataAcessKey: 'RETURN_ID',
            disabled: false, // 按钮禁用控制
            value: 'RETURN_ID',
            width: '6',
          },
          {
            style: 'popInput',
            width: '6',
            dataAcessKey: 'CP_C_LOGISTICS_ENAME',
            value: 'CP_C_LOGISTICS_ID',
            itemdata: {
              col: 1,
              colid: 168212,
              colname: 'CP_C_LOGISTICS_ENAME', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $it('form_label.returnLogisticsCompany'), // 退回物流公司
              inputname: 'CP_C_LOGISTICS_ENAME:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $it('form_label.returnLogisticsCompany'), // 退回物流公司input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'OC_B_RETURN_ORDER', // 对应的表
              reftableid: 24578, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
            },
            oneObj: (e) => {
              this.oneObjs(e);
            },
          },
          {
            style: 'select', // 下拉框类型
            label: $it('form_label.reasonRefund'), // 退款原因 下拉框前的值
            dataAcessKey: 'RETURN_REASON',
            width: '6', // 所占宽度宽度
            value: 'RETURN_REASON',
            disabled: false, // 按钮禁用控制
            rules: true,
            options: [],
          },
          {
            style: 'input',
            label: $it('form_label.returnLogisticsNumber'), // 退回物流单号
            dataAcessKey: 'LOGISTICS_CODE',
            value: 'LOGISTICS_CODE',
            disabled: false, // 按钮禁用控制
            isnotnull: false,
            width: '6',
          },
          {
            style: '', // 勾选框类型
            label: $it('form_label.reservedStockExchange'), // 换货预留库存前面的文字
            dataAcessKey: 'IS_RESERVED',
            width: '6', // 所占的宽度
            value: 'IS_RESERVED',
            disabled: false, // 按钮禁用控制
            checked: false, // 是否勾选控制
            // 新加需求,换货预留库存不勾选不显示是否生成换货单
            // checkboxChange: e => {
            // const _this = this;
            // if (e) {
            // _this.information.formData[11].style = 'select';
            // _this.information.formValue.IS_RETURN_ORDER_EXCHANGE = 1;
            // setTimeout(() => {
            //   document.getElementsByClassName('ark-select-selected-value')[1].className = 'ark-select-selected-value inputBgcolor';
            // }, 10);
            // } else {
            //   _this.information.formData[11].style = '';
            //   _this.information.formValue.IS_RETURN_ORDER_EXCHANGE = '';
            // }
            // }
          },
          {
            style: '',
            label: $it('panel_label.generate_replacement_order'), // 是否生成换货单
            dataAcessKey: '',
            disabled: false, // 按钮禁用控制
            value: 'IS_RETURN_ORDER_EXCHANGE',
            width: '6',
            options: [
              {
                value: 1,
                label: '是',
              },
              {
                value: 0,
                label: '否',
              },
            ],
          },
          {
            style: 'checkbox', // 勾选框类型
            label: $it('form_label.whether_returned'), // 是否原退 前面的文字
            dataAcessKey: 'IS_BACK',
            width: '6', // 所占的宽度
            value: 'IS_BACK',
            disabled: false, // 按钮禁用控制
            checked: false, // 是否勾选控制
            checkboxChange: e => {
              const _this = this;
              const phy = _this.information.formData[13].itemdata;
              const phyIn = _this.information.formData[14].itemdata;
              if (!e) {
                _this.service.common.queryOcBOrder({ id: _this.information.formValue.ORIG_ORDER_ID }).then(res => {
                  if (res.data.code === 0) {
                    phy.pid = phyIn.pid;
                    phy.valuedata = phyIn.valuedata;
                    const arrList = JSON.parse(res.data.data);
                    // 点击'是否原退'时，'入库实体仓库'赋值取字段：CP_C_PHY_WAREHOUSE_IN_ID
                    phy.pid = arrList.CP_C_PHY_WAREHOUSE_IN_ID;
                    phy.valuedata = arrList.CP_C_PHY_WAREHOUSE_IN_ID_NAME;
                    _this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = arrList.CP_C_PHY_WAREHOUSE_IN_ID;

                    _this.information.formValue.LOGISTICS_CODE = arrList.EXPRESSCODE;
                    _this.information.formValue.CP_C_LOGISTICS_ID = arrList.CP_C_LOGISTICS_ID;
                    _this.information.formData.forEach(list => {
                      // 退回物流公司
                      if (list.style === 'popInput' && list.itemdata.name === _this.vmI18n.t('form_label.returnLogisticsCompany')) {
                        list.itemdata.pid = arrList.CP_C_LOGISTICS_ID;
                        list.itemdata.valuedata = arrList.CP_C_LOGISTICS_ENAME;
                      }
                    });
                  }
                });
              } else {
                _this.information.formValue.LOGISTICS_CODE = '';
                if (_this.$route.query.id === '-1' && _this.warehouseInInfo) {
                  // '入库实体仓库'保留billCopy带出来的值
                  phy.pid = _this.warehouseInInfo.pid;
                  phy.valuedata = _this.warehouseInInfo.valuedata;
                  _this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = _this.warehouseInInfo.pid;
                } else {
                  phy.pid = '';
                  phy.valuedata = '';
                  _this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = '';
                }
              }
            }
          },
          {
            style: 'popInput',
            dataAcessKey: 'CP_C_PHY_WAREHOUSE_ENAME',
            width: '6',
            itemdata: {
              col: 1,
              colid: 176316,
              colname: 'CP_C_PHY_WAREHOUSE_IN_ID', // 当前字段的名称
              datelimit: 'all',
              // precolnameslist: [
              //   {
              //     premtype: "CP_C_WAREHOUSE_ID",
              //     refcol: "ID",
              //     iswrite: "true"
              //   }
              // ],
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $it('form_label.physicalWarehouseFile'), // 实体仓档案
              inputname: 'CP_C_PHY_WAREHOUSE_IN_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: $it('form_label.warehousingEntity'), // 入库实体仓库 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
              reftableid: 24486, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              pid: '',
              valuedata: '', // 这个是选择的值
            },
            oneObj: (e) => {
              this.oneObjs(e);
            },
          },
          {
            style: 'popInput',
            width: '6',
            dataAcessKey: 'CP_C_PHY_WAREHOUSE_ENAME',
            itemdata: {
              col: 1,
              colid: 167997,
              colname: 'CP_C_PHY_WAREHOUSE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $it('form_label.physicalWarehouseFile'), // 实体仓档案
              inputname: 'CP_C_PHY_WAREHOUSE_ID:ENAME:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 20, // 最大长度是多少
              name: $it('form_label.shipPhysicalWarehouse'), // 发货实体仓库input前面显示的lable值
              readonly: true, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
              reftableid: 24486, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              pid: '',
              valuedata: '', // 这个是选择的值
            },
            oneObj: (e) => {
              this.oneObjs(e);
            },
          },
          {
            style: 'input',
            label: $it('table_label.remarks'), // 备注
            dataAcessKey: 'REMARK',
            value: 'REMARK',
            disabled: false, // 按钮禁用控制
            width: '12',
          },
          {
            style: 'input',
            label: $it('form_label.sellerNotes'), // 卖家备注
            value: 'SELLER_MEMO',
            disabled: true, // 按钮禁用控制
            width: '12',
          },
          {
            style: 'input',
            label: $it('form_label.proReturnStatus'), // 退货状态,
            disabled: true,
            value: 'PRO_RETURN_STATUS',
            width: '6',
          },
          {
            style: 'input',
            label: $it('form_label.billNo'), // 单据编号,
            disabled: true,
            value: 'BILL_NO',
            width: '6',
          },
          {
            style: 'input',
            label: '传DRP状态',
            disabled: true,
            value: 'TO_DRP_STATUS_NAME',
            width: '6'
          },
          {
            style: 'input',
            label: '传DRP次数',
            disabled: true,
            value: 'TO_DRP_COUNT',
            width: '6'
          },
          {
            style: 'input',
            label: '传DRP失败原因',
            disabled: true,
            value: 'TO_DRP_FAILED_REASON',
            width: '6'
          },
          {
            style: 'input',
            label: '平台退款原因',
            value: 'RETURN_DESC',
            width: '6',
            disabled: true
          }
        ],
      }, // 基本信息
      returnDetailAddTable: {
        modal: false,
        pageShow: true, // 控制分页是否显示
        table: {
          columns: [
            {
              key: 'PS_C_PRO_ECODE',
              title: $it('table_label.productNo'), // 商品编码
              dataAcessKey: 'PS_C_PRO_ECODE',
            },
            {
              key: 'PS_C_CLR_ENAME',
              title: $it('other.color'), // 颜色
              dataAcessKey: 'PS_C_CLR_ENAME',
            },
            {
              key: 'PS_C_SIZE_ENAME',
              dataAcessKey: 'PS_C_SIZE_ENAME',
              title: $it('other.sizes'), // 尺码
            },
            {
              key: 'QTY_REFUND',
              title: $it('table_label.appleNumber'), // 申请数量
              dataAcessKey: 'QTY_REFUND',
            },
            {
              key: 'AVAILABLE_QTY',
              title: '可用库存',
              dataAcessKey: 'AVAILABLE_QTY'
            },
            {
              key: 'PS_C_SKU_ECODE',
              title: $it('form_label.barCode'), // 条码
              dataAcessKey: 'PS_C_SKU_ECODE',
            },
            {
              key: 'BARCODE',
              title: $it('form_label.gBCode'), // 国标码
              dataAcessKey: 'BARCODE',
            },
            {
              key: 'PS_C_PRO_ENAME',
              title: $it('form_label.goodsName'), // 商品名称
              dataAcessKey: 'PS_C_PRO_ENAME',
            },
            {
              key: 'SEX_NAME',
              title: $it('table_label.gender'), // 性别
              dataAcessKey: 'SEX',
            },
            {
              key: 'QTY_IN',
              title: $it('table_label.storageQuantity'), // 入库数量
              dataAcessKey: 'QTY_IN',
            },
            {
              key: 'QTY_CAN_REFUND',
              title: $it('table_label.orderQuantity'), // 订单数量
              dataAcessKey: 'QTY_CAN_REFUND',
            },
            {
              key: 'PRICE',
              title: $it('table_label.tagPrice'), // 吊牌价
              dataAcessKey: 'PRICE_LIST',
            },
            {
              key: 'amt_refund_single',
              title: $it('table_label.unitReturnAmount'), // 单件退货金额
              dataAcessKey: 'AMT_REFUND_SINGLE',
            },
            {
              key: 'AMT_REFUND',
              dataAcessKey: 'AMT_REFUND',
              title: $it('panel_label.returnAmount'), // 退货金额
            },
            {
              key: 'PRICE_SETTLE',
              dataAcessKey: 'PRICE_SETTLE',
              title: $it('table_label.unitPriceSettlement'), // 结算单价
            },
            {
              key: 'AMT_SETTLE_TOT',
              dataAcessKey: 'AMT_SETTLE_TOT',
              title: $it('table_label.settlementAmount'), // 结算金额
            },
            {
              key: 'PRODUCT_MARK',
              title: $it('form_label.goodsMark'), // 商品标记
              dataAcessKey: 'PRODUCT_MARK',
            },
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          loading: false,
          isShowSelection: true, // 是否显示checkedbox
        },
        value: '',
      },
      replacement: {
        formValue: {
          // 存储表单得所有值
          message: '',
          RECEIVE_NAME: '', // 收货人
          RECEIVE_MOBILE: '', // 收货人手机
          RECEIVE_PHONE: '', // 收货人电话
          RECEIVE_ZIP: '', // 收货人邮编
          receiver_province_name: '', // 收货人省份
          receiver_city_name: '', // 收货人市
          receiver_area_name: '', // 收货人县
          SHIP_AMT: '', // 换货邮费
          RECEIVE_ADDRESS: '', // 收货人地址
        },
        // 表单非空提示
        ruleValidate: {},
        formData: [
          {
            style: 'input',
            label: $it('common.consigneeInformation'), // 收货人信息
            dataAcessKey: '',
            value: 'message',
            disabled: false, // 按钮禁用控制
            width: '24',
            inputenter: () => {
              const self = this;
              self.address = parse(self.replacement.formValue.message);
              if (!self.information.formValue.ORIG_ORDER_ID) {
                self.$Message.warning($it('modalTips.n3')); // 请先填入原订单信息
                return;
              }
              if (Object.values(self.address).includes('')) {
                self.$Message.warning($it('modalTips.f9')); // 请填入完整信息,如:XX,17788888888,上海上海市闵行区XXXXXXXXXXX
              } else {
                self.replacement.formValue.RECEIVE_NAME = self.address.name; // 收货人赋值
                self.replacement.formValue.RECEIVE_PHONE = self.address.phone;
                self.replacement.formValue.RECEIVE_MOBILE = self.address.mobile; // 收货人手机赋值
                self.replacement.formValue.RECEIVE_ADDRESS = self.address.addr; // 收货人地址赋值

                self.getAddressId(self.address.province, self.address.city, self.address.area).then((res) => {
                  if (res.data.code === 0) {
                    self.getQueryResionByName(res.data.data);
                  } else {
                    self.$Message.warning($it('modalTips.n4')); // 省市区id获取失败
                  }
                });
              }
            },
          },
          {
            style: 'input',
            label: $it('form_label.consignee'), // 收货人
            dataAcessKey: 'RECEIVE_NAME',
            value: 'RECEIVE_NAME',
            disabled: false, // 按钮禁用控制
            rules: true,
            width: '6',
          },
          {
            style: 'input',
            label: $it('form_label.consignee_phone'), // 收货人手机
            dataAcessKey: 'RECEIVE_MOBILE',
            value: 'RECEIVE_MOBILE',
            disabled: false, // 按钮禁用控制
            rules: true,
            width: '6',
          },
          {
            style: 'input',
            label: $it('form_label.consignee_tel'), // 收货人电话
            dataAcessKey: 'RECEIVE_PHONE',
            value: 'RECEIVE_PHONE',
            disabled: false, // 按钮禁用控制
            width: '6',
          },
          {
            style: 'input',
            label: $it('form_label.consignee_postcode'), // 收货人邮编
            dataAcessKey: 'RECEIVE_ZIP',
            value: 'RECEIVE_ZIP',
            disabled: false, // 按钮禁用控制
            width: '6',
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            dataAcessKey: 'RECEIVER_PROVINCE_NAME',
            itemdata: {},
            oneObj: (e) => {
              this.replacement.formData[6].itemdata.pid = '';
              this.replacement.formData[6].itemdata.valuedata = '';
              this.replacement.formValue.receiver_city_id = '';
              this.replacement.formValue.receiver_city_name = '';
              this.replacement.formData[7].itemdata.pid = '';
              this.replacement.formData[7].itemdata.valuedata = '';
              this.replacement.formValue.receiver_area_id = '';
              this.replacement.formValue.receiver_area_name = '';
              this.twoObjs(e);
            },
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            inputList: [],
            dataAcessKey: 'RECEIVER_CITY_NAME',
            itemdata: {},
            oneObj: (e) => {
              this.replacement.formData[7].itemdata.pid = '';
              this.replacement.formData[7].itemdata.valuedata = '';
              this.replacement.formValue.receiver_area_id = '';
              this.replacement.formValue.receiver_area_name = '';
              this.twoObjs(e);
            },
          },
          {
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            inputList: [],
            dataAcessKey: 'RECEIVER_AREA_NAME',
            itemdata: {
              col: 1,
              colid: 167816,
              colname: 'RECEIVER_AREA', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: $it('form_label.aconsignee_area'), // 收货人区
              inputname: 'RECEIVER_AREA:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $it('form_label.aconsignee_area'), // 收货人区input前面显示的lable值
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
            oneObj: (e) => {
              this.twoObjs(e);
            },
          },
          {
            style: 'input',
            label: $it('form_label.exchangePostage'), // 换货邮费
            dataAcessKey: 'SHIP_AMT',
            disabled: false, // 按钮禁用控制
            value: 'SHIP_AMT',
            width: '6',
          },
          {
            style: 'input',
            label: $it('form_label.aconsignee_address'), // 收货人地址
            dataAcessKey: 'RECEIVE_ADDRESS',
            value: 'RECEIVE_ADDRESS',
            disabled: false, // 按钮禁用控制
            rules: true,
            width: '12',
          },
        ],
      }, // 换货人信
      labelList: [
        {
          label: $it('form_label.returnDetails'), // 退货明细
          value: '1',
          isShow: true,
        },
        {
          label: $it('form_label.exchangeDetails'), // 换货明细
          value: '2',
          isShow: false,
        },
        {
          label: $it('form_label.returnOrderLog'), // 退货单日志
          value: '3',
          isShow: true,
        },
        {
          label: $it('form_label.defectiveProductRecord'), // 次品记录
          value: '4',
          isShow: true,
        },
      ],
      jordanTableConfig: {
        businessFormConfig: {}, // 表单配置
        columns: [],
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: true, // 控制是否显示删除明细
        isShowAddDetailBtn: true,
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
      }, // 退货明细
      jordanTableConfig2: {
        businessFormConfig: {}, // 表单配置
        columns: [],
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: true, // 控制是否显示删除明细
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
      }, // 退货明细
      jordanTableConfig4: {
        jordanFormConfig: {}, // 表单配置
        columns: [],
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        indexColumn: true, // 是否显示序号
        isShowSelection: false, // 是否显示checkedbox
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
      }, // 次品记录
      DefaultValue: '1', // 控制tab切换样式
      tableIndex: 0, // 切换 0 ==> 退货明细  1 ==> 换货明细
      isExchange: false, // 是否显示换货明
      amountReturned: null, // 商品退回金额
      returnPostage: 0, // 应退邮费
      otherAmount: 0, // 其他金额
      exchangeAmount: null, // 换货金额
      returnTotalAmount: null, // 退货单总金额
      settlementAmount: 0, // 代销结算金额
      returnSelectData: [], // 退货明细列表选中数据
      exchangeSelectData: [], // 换货明细选中数据
      onSelectData: [], // 选中的原始订单编号
      refundDtoList: {
        // 退货明细行数据
        pageSize: 0,
        total: 0,
        data: [],
      },
      exchangeDtoList: {
        // 换货明细行数据
        pageSize: 0,
        total: 0,
        data: [],
      },
      isTab: 0, // 区分tab
      status: '', // 单据状态
      clrAndSizeFlag: false,
      labelDefaultValue: 1, // lable切换显示
      tab2: {
        tablename: '',
        objid: '',
      },
      loading: false, // 控制多次调用事件
      warehouseId: '', // 发货仓库id暂存
      inputValue: '', // table退货金额
      refundValue: '', // table换货金额
      tId: '',
      isTowwms: '', // 是否传wms
      inventedStatus: '', // 虚拟入库状态
      defectiveList: [], // 次品记录
      //* ******* */
      SENSITIVE_COLUMNS: [], // 处理敏感列权限
    };
  },
  created() {
    const _this = this;
    window.addEventListener('keydown', (e) => {
      const key = e.keyCode;
      if (key == 13) {
        if (_this.order.modal && _this.order.table.data.length) {
          _this.queryorder();
        }
      }
      if (key == 27) {
        _this.order.modal = false;
      }
    });
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  },
  mounted() {
    if (this.$route.query.clear) $omsUtils.tabCloseAppoint(this);
    BtnConfig.target = this;
    BtnConfig.singleType = 1;
    this.$nextTick(() => {
      // 配置详情页上的功能按钮;
      if (this.$route.query.id === '-1' || this.$route.query.flag === 'RefundToExchange') {
        // 新增 或者退货转换货单状态
        let webnameArr = ['refund_save', 'refund_return'];
        let buttonArr = []
        this.btnConfig.buttons.forEach((element) => {
          if (element.webname && webnameArr.includes(element.webname)) {
            buttonArr.push(element);
          }
        });
        this.btnConfig.buttons = buttonArr;
      } else {
        let webnameArr = ['refund_save', 'shenhe_tuihuanhuo', 'quxiao_tuihuanhuo', 'xuniruku_tuihuanhuo', 'beizhu_tuihuanh', 'refund_return'];
        let buttonArr = []
        this.btnConfig.buttons.forEach((element) => {
          if (element.webname && webnameArr.includes(element.webname)) {
            buttonArr.push(element);
          }
        });
        this.btnConfig.buttons = buttonArr;
      }
      this.getPermissions('btnConfig', 'returngoodList');
    });
    // 判断是否为新增页面 -1为新增页面

    const _this = this;

    if (this.$route.query.id === '-1') {
      this.information.formValue.BILL_TYPE = '1';
      _this.clrAndSizeFlag = true;
      if (this.$route.query.orderHrefReturnid) {
        _this.service.orderCenter.billCopy({ IDS: _this.$route.query.orderHrefReturnid.split(','), TYPE: '3', })
          .then((res) => {
            if (res.data.code === 0) {
              const item = res.data.data.baseInfo;
              this.shopId = item.ID;
              const replace = _this.replacement.formValue;
              this.onSelectData.push(item);
              this.information.formData.forEach((list) => {
                // '退回物流公司'
                if (list.style === 'popInput' && list.itemdata.name === $it('form_label.returnLogisticsCompany')) {
                  list.itemdata.pid = item.CP_C_LOGISTICS_ID;
                  list.itemdata.valuedata = item.CP_C_LOGISTICS_ENAME;
                  this.information.formValue.CP_C_LOGISTICS_ID = item.CP_C_LOGISTICS_ID;
                  this.information.formValue.CP_C_LOGISTICS_ENAME = item.CP_C_LOGISTICS_ENAME;
                }
              });
              _this.tId = item.TID;
              _this.warehouseId = item.CP_C_PHY_WAREHOUSE_ID || ''; // 发货仓库id
              _this.information.formData[14].itemdata.pid = this.warehouseId;
              _this.information.formData[14].itemdata.valuedata = item.CP_C_PHY_WAREHOUSE_ENAME;
              _this.information.formValue.CP_C_PHY_WAREHOUSE_ID = this.warehouseId;
              _this.information.formData[13].itemdata.pid = item.RESERVE_BIGINT05;
              _this.information.formData[13].itemdata.valuedata = item.RESERVE_VARCHAR05;
              _this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = item.RESERVE_BIGINT05;
              _this.warehouseInInfo = { pid: item.RESERVE_BIGINT05, valuedata: item.RESERVE_VARCHAR05 };
              _this.information.formValue.BILL_NO = item.BILL_NO;
              _this.information.formValue.ORIG_ORDER_ID = item.ID; // 编号
              _this.information.formValue.PRO_RETURN_STATUS = item.PRO_RETURN_STATUS; // 退货状态
              _this.information.formValue.BUYER_NICK = item.USER_NICK;
              _this.information.formValue.ORIG_SOURCE_CODE = item.SOURCE_CODE;
              _this.information.formValue.CP_C_SHOP_TITLE = item.CP_C_SHOP_TITLE;
              _this.information.formValue.CP_C_SHOP_ID = item.CP_C_SHOP_ID;
              _this.information.formValue.SELLER_MEMO = item.SELLER_MEMO;
              _this.replacement.formValue.RECEIVE_ADDRESS = res.data.data.receivingGoods.RECEIVER_ADDRESS; // 收货人地址
              _this.replacement.formValue.RECEIVE_NAME = res.data.data.receivingGoods.RECEIVER_NAME; // 收货人姓名
              _this.replacement.formValue.RECEIVE_MOBILE = res.data.data.receivingGoods.RECEIVER_MOBILE; // 收货人手机
              _this.replacement.formValue.RECEIVE_PHONE = res.data.data.receivingGoods.RECEIVER_PHONE; // 收货人电话
              _this.replacement.formValue.RECEIVE_ZIP = res.data.data.receivingGoods.RECEIVER_ZIP; // 换货人邮编
              _this.settlementAmount = item.CONSIGN_AMT; // 代销结算金额
              replace.PLATFORM = item.PLATFORM; // 平台
              replace.orde_source = item.ORDER_SOURCE; // 订单来源
              replace.receiver_province_id = res.data.data.receivingGoods.CP_C_REGION_PROVINCE_ID; // 省id
              replace.receiver_province_name = res.data.data.receivingGoods.CP_C_REGION_PROVINCE_ENAME; // 收货人省份
              replace.receiver_city_id = res.data.data.receivingGoods.CP_C_REGION_CITY_ID; // 收货人市id
              replace.receiver_city_name = res.data.data.receivingGoods.CP_C_REGION_CITY_ENAME; // 收货人市
              replace.receiver_area_id = res.data.data.receivingGoods.CP_C_REGION_AREA_ID; // 收货人县id
              replace.receiver_area_name = res.data.data.receivingGoods.CP_C_REGION_AREA_ENAME; // 收货人县
              // 展示
              _this.information.formData[5].itemdata.valuedata = item.CP_C_SHOP_TITLE || '';
              _this.replacement.formData[5].itemdata.valuedata = res.data.data.receivingGoods.CP_C_REGION_PROVINCE_ENAME; // 省
              _this.replacement.formData[6].itemdata.valuedata = res.data.data.receivingGoods.CP_C_REGION_CITY_ENAME; // 市
              _this.replacement.formData[7].itemdata.valuedata = res.data.data.receivingGoods.CP_C_REGION_AREA_ENAME; // 区
            } else {
              _this.$message.warning(res.data.message);
            }
          });
        this.service.orderCenter.getOrderDetailList({
          id: _this.$route.query.orderHrefReturnid,
          currentPage: 1,
          pageSize: 1000,
          detailType: 2, // 退换货订单使用
        })
          .then(async (res) => {
            this.shopId = res.data.data.records[0].ID;
            if (res.data.code != 0) {
              _this.$Message.warning(res.data.message);
              return;
            }
            const queryList = res.data.data.records.filter((item) => item.REFUND_STATUS != 6);

            const newQueryList = [];
            const ecodeList = [];
            queryList.forEach((subitem) => {
              const newItem = {};
              newItem.reserve_bigint10 = subitem.ID;
              newItem.ID = -1;
              newItem.oOid = subitem.OOID; // 子订单id
              newItem.PS_C_SKU_ECODE = subitem.PS_C_SKU_ECODE;
              newItem.BARCODE = subitem.BARCODE;
              newItem.PS_C_PRO_ID = subitem.PS_C_PRO_ID;
              newItem.PS_C_PRO_ECODE = subitem.PS_C_PRO_ECODE;
              newItem.PS_C_CLR_ID = subitem.PS_C_CLR_ID; // 颜色
              newItem.PS_C_CLR_ECODE = subitem.PS_C_CLR_ECODE;
              newItem.PS_C_CLR_ENAME = subitem.PS_C_CLR_ENAME;
              newItem.PS_C_SIZE_ID = subitem.PS_C_SIZE_ID; // 尺寸
              newItem.PS_C_SIZE_ECODE = subitem.PS_C_SIZE_ECODE;
              newItem.PS_C_SIZE_ENAME = subitem.PS_C_SIZE_ENAME;
              newItem.clrList = subitem.CLR_LIST;
              newItem.sizeList = subitem.SIZE_LIST;
              newItem.PS_C_PRO_ENAME = subitem.PS_C_PRO_ENAME;
              newItem.QTY_CAN_REFUND = subitem.QTY;
              newItem.QTY_REFUND = Number(subitem.QTY || 0) - Number(subitem.QTY_RETURN_APPLY || 0);
              newItem.QTY_EXCHANGE = subitem.QTY;
              newItem.SEX_NAME = subitem.SEX_NAME;
              newItem.SEX = subitem.SEX;
              newItem.PRICE = subitem.PRICE_LIST;
              newItem.PRICE = subitem.PRICE_SETTLE;
              newItem.amt_refund_single = subitem.PRICE_ACTUAL;
              newItem.AMT_REFUND = $utils.accMul(newItem.QTY_REFUND, subitem.PRICE_ACTUAL).toFixed(2); // 退货金额realAmt
              newItem.QTY_IN = 0;
              newItem.PRODUCT_MARK = '正品';
              newItem.skuId = subitem.PS_C_SKU_ID;
              // _this.reconstructionGetDetail(subitem, newItem, subitem.PS_C_PRO_ECODE);
              newItem.PRICE_SETTLE = subitem.PRICE_SETTLE; // 结算单价
              newItem.AMT_SETTLE_TOT = subitem.TOT_PRICE_SETTLE; // 结算金额
              newItem.OC_B_ORDER_ITEM_ID = subitem.OC_B_ORDER_ITEM_ID;
              newQueryList.push(newItem);
              ecodeList.push(subitem.PS_C_PRO_ECODE);
            });
            _this.reconstructionGetDetail(newQueryList, ecodeList);
            _this.jordanTableConfig.data = newQueryList;
            _this.refundDtoList.data = _this.jordanTableConfig.data;
            _this.amountReturned = _this
              .calculateMoney(_this.jordanTableConfig.data, 1)
              .toFixed(2);
            _this.returnTotal();
          });
      }
      // 退换货复制退单
      if (this.$route.query.cloneReturnGoodId) {
        this.service.common
          .returnOrderquery({
            id: _this.$route.query.cloneReturnGoodId,
            start: 1,
            count: 50,
          })
          .then(async (res) => {
            if (res.data.code == 0) {
              let search = [];
              if (res.data.data.returnOrders.length !== 0) {
                this.shopId = res.data.data.returnOrders.CP_C_SHOP_ID;
                res.data.data.exchangeDtoList.forEach(item => {
                  search.push(item.PS_C_SKU_ECODE)
                })
              }
              _this.jordanTableConfig.loading = false;
              _this.information.formValue.BILL_TYPE = String(res.data.data.returnOrders.BILL_TYPE);
              _this.selectSelectt();
              if (_this.information.formValue.BILL_TYPE == '2' && !res.data.data.returnOrders.IS_RESERVED) {
                // _this.information.formData[11].style = 'select';
                _this.information.formValue.IS_RETURN_ORDER_EXCHANGE = res.data.data.returnOrders.IS_RETURN_ORDER_EXCHANGE;
                setTimeout(() => {
                  document.getElementsByClassName('burgeon-select-selected-value')[1].className = 'burgeon-select-selected-value inputBgcolor';
                }, 10);
              }
              // _this.status = res.data.data.returnOrders.RETURN_STATUS;
              // 设置水印
              _this.statusName = _this.waterMarkMap[_this.status]
                ?_this.waterMarkMap[_this.status]
                : 'Watermark to be added';
              _this.defectiveList = res.data.data.orderDefects;
              const [refundDtoEcodeList, exchangeDtoEcodeList] = [[], []];
              for await (const tempItem of res.data.data.refundDtoList) {
                tempItem.PRODUCT_MARK = tempItem.PRODUCT_MARK == 1 ? '正品' : '次品';
                tempItem.amt_refund_single = tempItem.AMT_REFUND_SINGLE;
                tempItem.SEX_NAME = tempItem.SEX_ENAME;
                tempItem.PRICE = tempItem.PRICE_LIST;
                refundDtoEcodeList.push(tempItem.PS_C_PRO_ECODE);
                // await _this.reconstructionGetDetail(tempItem, tempItem, tempItem.PS_C_PRO_ECODE);
              }
              // await _this.reconstructionGetDetail(res.data.data.refundDtoList, refundDtoEcodeList);
              for await (const exchangeItem of res.data.data.exchangeDtoList) {
                exchangeItem.SEX_NAME = exchangeItem.SEX_ENAME;
                exchangeItem.PRICE = exchangeItem.PRICE_LIST;
                exchangeDtoEcodeList.push(exchangeItem.PS_C_PRO_ECODE);
                // await _this.reconstructionGetDetail(exchangeItem, exchangeItem, exchangeItem.PS_C_PRO_ECODE);
              }
              const detailList = {
                refundDtoList: res.data.data.refundDtoList,
                exchangeDtoList: res.data.data.exchangeDtoList
              }
              const detailEcodeList = [
                ...refundDtoEcodeList,
                ...exchangeDtoEcodeList
              ]
              await _this.reconstructionGetDetail(detailList, detailEcodeList);
              const replace = _this.replacement.formValue;
              replace.PLATFORM = res.data.data.returnOrders.PLATFORM; // 平台

              res.data.data.refundDtoList.forEach((item) => {
                item.QTY_EXCHANGE = item.QTY_REFUND;
              });
              _this.refundDtoList.data = res.data.data.refundDtoList;
              if (_this.exchangeDtoList.data.length !== 0) { // 判断有没有换货明细
                // 获取可用库存
                if (res.data.data.exchangeDtoList.length !== 0) {
                  let search = [];
                  this.shopId = res.data.data.returnOrders.CP_C_SHOP_ID;
                  res.data.data.exchangeDtoList.forEach(item => {
                    search.push(item.PS_C_SKU_ECODE)
                  })
                  const fromdata = new FormData();
                  fromdata.append('param', JSON.stringify({ SkuEcodeList: search, shopId: this.shopId, isQuery: 'Y' }));
                  const resData = await this.service.common.skuListQuery(fromdata);
                  if (resData.data.code === 0) {
                    resData.data.data.forEach((item, index) => {
                      res.data.data.exchangeDtoList[index].AVAILABLE_QTY = item.AVAILABLE_QTY;
                    })
                  }
                }
              }
              _this.jordanTableConfig.data = res.data.data.refundDtoList;
              _this.onSelectData.push(res.data.data.returnOrders);
              _this.assignment(res.data.data.returnOrders);
              _this.tId = res.data.data.returnOrders.TID;
              _this.amountReturned = _this.calculateMoney(res.data.data.refundDtoList, 1).toFixed(2); // 商品退回合计
              _this.exchangeAmount = _this.calculateMoney(res.data.data.exchangeDtoList, 2).toFixed(2); // 换货金额合计
              _this.returnTotal();
              // 是否原退
              _this.isTowwms = res.data.data.returnOrders.IS_TOWMS;
              let checkFlag = res.data.data.returnOrders.RETURN_STATUS == 20 && [0, 2].includes(res.data.data.returnOrders.IS_TOWMS);
              _this.information.formData[12].disabled = !checkFlag;
              if (
                (res.data.data.returnOrders.RETURN_STATUS == 20 &&
                  res.data.data.returnOrders.IS_TOWMS == 2) ||
                res.data.data.returnOrders.IS_TOWMS == 2
              ) {
                _this.information.formData.forEach((item) => {
                  if (['input', 'checkbox', 'select'].includes(item.style)) {
                    item.disabled = true;
                  } else if (item.style == 'popInput') {
                    item.itemdata.readonly = true;
                  }
                });
              }
              // 按钮是否可用
              if (res.data.data.returnOrders.RETURN_STATUS != 30) {
                _this.btnConfig.buttons.forEach((item) => {
                  // 售后审核
                  if (item.webname == 'shenhe_tuihuanhuo') {
                    item.disabled = true;
                  }
                });
              }
              if (res.data.data.returnOrders.RETURN_STATUS != 20) {
                _this.btnConfig.buttons.forEach((item) => {
                  // 取消
                  if (item.webname == 'quxiao_tuihuanhuo') {
                    item.disabled = true;
                  }
                  // 虚拟入库
                  if (item.webname == 'xuniruku_tuihuanhuo') {
                    item.disabled = true;
                  }
                });
              }
              if (res.data.data.returnOrders.RETURN_STATUS == 60) {
                _this.btnConfig.buttons.forEach((item) => {
                  // 修改备注
                  if (item.webname == 'beizhu_tuihuanh') {
                    item.disabled = true;
                  }
                });
              }
            } else {
              // 复制退单失败!
              const err = res.data.message || $it('modalTips.n5');
              _this.$Message.error(err);
            }
          });
      }
    } else {
      this.getList();
      console.log(this.$route.query);
      this.information.formData[1].disabled = true;
      this.information.formData[1].icon = '';
      this.information.formData[2].disabled = this.$route.query.flag !== 'RefundToExchange'; // 如果为退货转换货过来的,换货平台单号可编辑
      this.information.formData[3].disabled = true;
      this.information.formData[4].disabled = true;
      this.information.formData[5].itemdata.readonly = true;
      this.information.formData[10].disabled = this.$route.query.flag !== 'RefundToExchange'; // 如果为退货转换货过来的,换货平台单号可编辑
      this.information.formData.forEach((item) => {
        item.disabled = !(item.value == 'SELLER_MEMO' && (this.$route.query.statusNo == 20 || this.$route.query.statusName == 30));
      });
      const informationArr = [
        {
          style: 'input',
          label: $it('form_label.exchangePlatform_no'), // 换货平台单号
          disabled: this.$route.query.flag !== 'RefundToExchange',
          dataAcessKey: 'TB_DISPUTE_ID',
          value: 'TB_DISPUTE_ID',
          width: '6',
        },
        {
          style: 'input',
          label: $it('form_label.defectiveProduct_allocation_status'), // 次品调拨状态
          disabled: true,
          dataAcessKey: 'RESERVE_BIGINT07_type',
          value: 'RESERVE_BIGINT07_type',
          width: '6',
        },
      ];
      this.information.formData[0].style = 'input';
      this.information.formData = [...this.information.formData, ...informationArr];
    }

    this.$nextTick(() => {
      this.getDataAccess('OC_B_RETURN_ORDER', (res) => {
        this.SENSITIVE_COLUMNS = res.SENSITIVE_COLUMNS;
        // 退换货订单-基础信息
        this.information.formData.forEach((parent) => {
          res.SENSITIVE_COLUMNS.forEach((child) => {
            if (parent.dataAcessKey == child.ecode) {
              const tempStr = this.$route.query.id === '-1' ? 'add' : 'detail';
              this.setFormPermissions(parent, child, tempStr);
            }
          });
        });
        // 退换货订单-收货人信息
        this.replacement.formData.forEach((parent) => {
          res.SENSITIVE_COLUMNS.forEach((child) => {
            if (parent.dataAcessKey == child.ecode) {
              const tempStr = this.$route.query.id === '-1' ? 'add' : 'detail';
              this.setFormPermissions(parent, child, tempStr);
            }
          });
        });
      });
    });
    this.selectSelectt();
    this.obtainWarehouse();
    // 省市赋值
    this.replacement.formData[5].itemdata = this.fkcolumn.PROV;
    this.replacement.formData[6].inputList.push(this.fkcolumn.PROV);
    this.replacement.formData[6].itemdata = this.fkcolumn.CITY;
    this.replacement.formData[7].inputList.push(this.fkcolumn.CITY);
  },
  methods: {
    getQueryResionByName(data) {
      const _this = this;
      const queryData = _this.replacement.formData;
      queryData.forEach((item) => {
        if (item.itemdata) {
          // 收货人省份
          if (item.itemdata.name === $it('form_label.consignee_province')) {
            item.itemdata.valuedata = data.CP_C_REGION_PROVINCE_ENAME;
            _this.replacement.formValue.receiver_province_id = data.CP_C_REGION_PROVINCE_ID;
            _this.replacement.formValue.receiver_province_name = data.CP_C_REGION_PROVINCE_ENAME;// 收货人市
          } else if (item.itemdata.name === $it('form_label.consignee_city')) {
            item.itemdata.valuedata = data.CP_C_REGION_CITY_ENAME;
            _this.replacement.formValue.receiver_city_id = data.CP_C_REGION_CITY_ID;
            _this.replacement.formValue.receiver_city_name = data.CP_C_REGION_CITY_ENAME;
            // 收货人区
          } else if (item.itemdata.name === $it('form_label.aconsignee_area')) {
            item.itemdata.valuedata = data.CP_C_REGION_AREA_ENAME;
            _this.replacement.formValue.receiver_area_id = data.CP_C_REGION_AREA_ID;
            _this.replacement.formValue.receiver_area_name = data.CP_C_REGION_AREA_ENAME;
          }
        }
      });
    },
    // 获取详情数据
    async getList() {
      const _this = this;
      _this.jordanTableConfig.loading = true;
      this.information.formData[4].style = 'input';
      let params = {
        id: _this.$route.query.id,
        start: 1,
        count: 50,
        isRefund2Exchange: this.$route.query.flag == 'RefundToExchange' ? 1 : undefined,
      }
      _this.service.orderCenter.findDetail(params).then(async (res) => {
        if (res.data.code === 0) {
          this.shopId = res.data.data.returnOrders.ID;
          _this.jordanTableConfig.loading = false;
          _this.information.formValue.BILL_TYPE = res.data.data.returnOrders.BILL_TYPE.toString();
          _this.selectSelectt();
          if (_this.information.formValue.BILL_TYPE == '2' && !res.data.data.returnOrders.IS_RESERVED) {
            // _this.information.formData[11].style = 'select';
            _this.information.formValue.IS_RETURN_ORDER_EXCHANGE =
              res.data.data.returnOrders.IS_RETURN_ORDER_EXCHANGE;
            setTimeout(() => {
              document.getElementsByClassName('burgeon-select-selected-value')[1].className = 'burgeon-select-selected-value inputBgcolor';
            }, 10);
          }
          _this.status = res.data.data.returnOrders.RETURN_STATUS;
          // // 设置水印
          _this.statusName = _this.waterMarkMap[_this.status] || 'Watermark to be added';
          _this.defectiveList = res.data.data.orderDefects;
          const tempRefundDtoList = res.data.data.refundDtoList;
          for (let i = 0; i < tempRefundDtoList.length; i++) {
            tempRefundDtoList[i].PRODUCT_MARK = tempRefundDtoList[i].PRODUCT_MARK == 1 ? '正品' : '次品';
            tempRefundDtoList[i].amt_refund_single = tempRefundDtoList[i].AMT_REFUND_SINGLE;
            tempRefundDtoList[i].SEX_NAME = tempRefundDtoList[i].SEX_ENAME;
            tempRefundDtoList[i].PRICE = tempRefundDtoList[i].PRICE_LIST;
            _this.reconstructionGetDetail(tempRefundDtoList[i], tempRefundDtoList[i]);
          }

          res.data.data.refundDtoList = tempRefundDtoList;
          for (let i = 0; i < res.data.data.exchangeDtoList.length; i++) {
            const item = res.data.data.exchangeDtoList[i];
            item.SEX_NAME = item.SEX_ENAME;
            item.PRICE = item.PRICE_LIST;
            _this.reconstructionGetDetail(item, item);
          }
          _this.refundDtoList.data = res.data.data.refundDtoList;
          _this.exchangeDtoList.data = res.data.data.exchangeDtoList;
          // 获取可用库存
          let SkuEcodeList = [];
          res.data.data.exchangeDtoList.forEach(item => {
            SkuEcodeList.push(item.PS_C_SKU_ECODE)
          })
          const fromdata = new FormData();
          fromdata.append('param', JSON.stringify({ SkuEcodeList, shopId: this.shopId, isQuery: 'Y' }));
          await this.service.orderCenter.skuListQuery(fromdata).then(res => {
            if (res.data.code === 0) {
              _this.exchangeDtoList.data.map((item, index) => {
                _this.exchangeDtoList.data[index].AVAILABLE_QTY = res.data.data[index].AVAILABLE_QTY || 0;
              })
            }
          })
          _this.jordanTableConfig.data = res.data.data.refundDtoList;
          _this.tId = res.data.data.returnOrders.TID;
          _this.onSelectData.push(res.data.data.returnOrders);
          _this.assignment(res.data.data.returnOrders);
          _this.amountReturned = _this.calculateMoney(res.data.data.refundDtoList, 1).toFixed(2); // 商品退回合计
          _this.exchangeAmount = _this.calculateMoney(res.data.data.exchangeDtoList, 2).toFixed(2); // 换货金额合计
          _this.returnTotal();
          // // 是否原退
          _this.isTowwms = res.data.data.returnOrders.IS_TOWMS;
          this.information.formData[12].disabled = !(res.data.data.returnOrders.RETURN_STATUS == 20 && [0, 2].includes(_this.isTowwms));
          if (this.$route.query.flag !== 'RefundToExchange' && (res.data.data.returnOrders.RETURN_STATUS == 20 || _this.isTowwms == 2)) {
            _this.information.formData.forEach((item) => {
              switch (item.style) {
                case 'input':
                case 'checkbox':
                case 'select':
                  item.disabled = true;
                  break;
                case 'popInput':
                  item.itemdata.readonly = true;
                  break;
              }
            });
          }
          // 按钮是否可用
          if (res.data.data.returnOrders.RETURN_STATUS != 30) {
            _this.btnConfig.buttons.forEach((item) => {
              // 售后审核
              if (item.webname == 'shenhe_tuihuanhuo') {
                item.disabled = true;
              }
            });
          }
          if (res.data.data.returnOrders.RETURN_STATUS != 20) {
            _this.btnConfig.buttons.forEach((item) => {
              // 取消
              if (item.webname == 'quxiao_tuihuanhuo') {
                item.disabled = true;
              }
              // 虚拟入库
              if (item.webname == 'xuniruku_tuihuanhuo') {
                item.disabled = true;
              }
            });
          }
          if (res.data.data.returnOrders.RETURN_STATUS == 60) {
            _this.btnConfig.buttons.forEach((item) => {
              // 修改备注
              if (item.webname == 'beizhu_tuihuanh') {
                item.disabled = true;
              }
            });
          }
          // 设置不可编辑文本框
          _this.setDisplayByReturnOrder(res.data.data.returnOrders);
        } else {
          // 获取详情失败!
          const err = res.data.message || $it('modalTips.n6');
          _this.$Message.error(err);
        }
      });
    },
    // 设置文本框是否可编辑
    setDisplayByReturnOrder(returnOrders) {
      const _this = this;
      const returnStatus = returnOrders.RETURN_STATUS;
      const inventedStatus = returnOrders.INVENTED_STATUS;
      // 设置物流单号与申请数量是否可编辑
      if (
        (returnStatus === 30 && inventedStatus === 0) ||
        inventedStatus === 2
      ) {
        _this.information.formData.forEach((item) => {
          if (item.value === 'LOGISTICS_CODE') {
            item.disabled = true;
          }
        });
        _this.qtyRefundEditFlag = false;
      }
      // 设置颜色尺码是否可编辑
      if (
        [20].includes(returnStatus) ||
        (this.$route.query.flag === 'RefundToExchange' &&
          [20, 30, 50].includes(returnStatus))
      ) {
        _this.clrAndSizeFlag = true;
        _this.returnIdEditFlag = true;
      } else {
        _this.clrAndSizeFlag = false;
        _this.returnIdEditFlag = false;
      }
    },
    // 赋值
    async assignment(data) {
      const item = this.information.formValue;
      this.inventedStatus = data.INVENTED_STATUS; // 虚拟入库状态
      // 基本信息
      item.ORIG_ORDER_ID = data.ORIG_ORDER_ID ? data.ORIG_ORDER_ID : '';
      item.ID = data.ID;
      item.TB_DISPUTE_ID = data.TB_DISPUTE_ID;
      if (data.STATUS_DEFECTIVE_TRANS == 0)
        item.RESERVE_BIGINT07_type = '无次品调拨';
      else if (data.STATUS_DEFECTIVE_TRANS == 2) {
        item.RESERVE_BIGINT07_type = '次品已调拨';
      } else if (data.STATUS_DEFECTIVE_TRANS == 1) {
        item.RESERVE_BIGINT07_type = '次品未调拨';
        this.btnConfig.buttons.forEach((item) => {
          if (item.webname == 'return_order_goods_db') item.disabled = false;
        });
      }
      item.PLATFORM = data.PLATFORM;
      // item.RESERVE_BIGINT07_type = data.RESERVE_BIGINT07_type;
      const PRO_RETURN_STATUS_DATA = {
        0: '待入库',
        1: '部分入库',
        2: '全部入库',
      };
      item.PRO_RETURN_STATUS = PRO_RETURN_STATUS_DATA[data.PRO_RETURN_STATUS];
      item.SELLER_MEMO = data.BACK_MESSAGE;
      item.BILL_TYPE = String(data.BILL_TYPE) ? String(data.BILL_TYPE) : '';
      item.BILL_NO = data.BILL_NO;
      item.BUYER_NICK = data.BUYER_NICK ? data.BUYER_NICK : '';
      item.CP_C_LOGISTICS_ENAME = data.CP_C_LOGISTICS_ENAME
        ? data.CP_C_LOGISTICS_ENAME
        : '';
      item.ORIG_SOURCE_CODE = data.TID ? data.TID : '';
      item.CP_C_SHOP_TITLE = data.CP_C_SHOP_TITLE ? data.CP_C_SHOP_TITLE : '';
      item.CP_C_SHOP_ID = data.CP_C_SHOP_ID ? data.CP_C_SHOP_ID : '';
      item.RETURN_ID = data.RETURN_ID ? data.RETURN_ID : '';
      item.CP_C_LOGISTICS_ID = data.CP_C_LOGISTICS_ID
        ? data.CP_C_LOGISTICS_ID
        : '';
      item.RETURN_REASON = data.RETURN_REASON ? data.RETURN_REASON : '';
      item.LOGISTICS_CODE = data.LOGISTICS_CODE ? data.LOGISTICS_CODE : '';
      if (data.IS_RESERVED == 1) item.IS_RESERVED = true;
      else if (data.IS_RESERVED == 0) item.IS_RESERVED = false;
      if (data.IS_BACK == 1) item.IS_BACK = true;
      else if (data.IS_BACK == 0) item.IS_BACK = false;
      item.CP_C_STORE_ENAME = data.CP_C_STORE_ENAME
        ? data.CP_C_STORE_ENAME
        : '';
      item.REMARK = data.REMARK ? data.REMARK : '';
      item.TO_DRP_STATUS_NAME = data.TO_DRP_STATUS_NAME;
      item.TO_DRP_COUNT = data.TO_DRP_COUNT;
      item.TO_DRP_FAILED_REASON = data.TO_DRP_FAILED_REASON;
      item.RETURN_DESC = data.RETURN_DESC ? data.RETURN_DESC : ''; // 平台退款原因
      this.information.formData[5].itemdata.valuedata = data.CP_C_SHOP_TITLE
        ? data.CP_C_SHOP_TITLE
        : '';
      this.information.formData[7].itemdata.valuedata = data.CP_C_LOGISTICS_ENAME
        ? data.CP_C_LOGISTICS_ENAME
        : '';
      this.information.formData[13].itemdata.pid = data.CP_C_PHY_WAREHOUSE_IN_ID
        ? data.CP_C_PHY_WAREHOUSE_IN_ID
        : ''; // 入库实体仓库
      this.information.formData[13].itemdata.valuedata =
        data.CP_C_PHY_WAREHOUSE_IN_ID_NAME;
      this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID =
        data.CP_C_PHY_WAREHOUSE_IN_ID;
      this.information.formData[14].itemdata.pid = data.CP_C_PHY_WAREHOUSE_ID
        ? data.CP_C_PHY_WAREHOUSE_ID
        : ''; // 发货实体仓库
      this.information.formData[14].itemdata.valuedata =
        data.CP_C_PHY_WAREHOUSE_ID_NAME;
      this.information.formValue.CP_C_PHY_WAREHOUSE_ID =
        data.CP_C_PHY_WAREHOUSE_ID;
      // 换货人信息
      // 解密
      let objid = data.ORIG_ORDER_ID;
      let searchdata = {
        ID: objid,
        isShowPii: true,
      }
      let decryptData = {};
      await this.$network.post('/api/cs/oc/oms/v1/getDetail', searchdata).then(res => {
        if (res.data.code === 0) {
          let resData = res.data.data;
          this.shopId = resData.CP_C_SHOP_ID;
          decryptData.RECEIVER_NAME = resData.RECEIVER_NAME; // 收货人姓名
          decryptData.RECEIVER_MOBILE = resData.RECEIVER_MOBILE; // 收货人手机
          decryptData.RECEIVER_ADDRESS = resData.RECEIVER_ADDRESS; // 收货人地址
        }
      })
      const replace = this.replacement.formValue;
      replace.RECEIVE_NAME = decryptData.RECEIVER_NAME ? decryptData.RECEIVER_NAME : data.RECEIVE_NAME; // 收货人
      replace.RECEIVE_MOBILE = decryptData.RECEIVER_MOBILE ? decryptData.RECEIVER_MOBILE : data.RECEIVE_MOBILE; // 收货人手机
      replace.RECEIVE_PHONE = data.RECEIVE_PHONE ? data.RECEIVE_PHONE : ''; // 收货人电话
      replace.RECEIVE_ZIP = data.RECEIVE_ZIP ? data.RECEIVE_ZIP : ''; // 收货人邮编
      replace.receiver_province_id = data.RECEIVER_PROVINCE_ID
        ? data.RECEIVER_PROVINCE_ID
        : '';
      replace.receiver_province_name = data.RECEIVER_PROVINCE_NAME
        ? data.RECEIVER_PROVINCE_NAME
        : ''; // 收货人省份
      replace.receiver_city_name = data.RECEIVER_CITY_NAME
        ? data.RECEIVER_CITY_NAME
        : ''; // 收货人市id
      replace.receiver_city_id = data.RECEIVER_CITY_ID
        ? data.RECEIVER_CITY_ID
        : ''; // 收货人市
      replace.receiver_area_id = data.RECEIVER_AREA_ID
        ? data.RECEIVER_AREA_ID
        : ''; // 收货人县id
      replace.receiver_area_name = data.RECEIVER_AREA_NAME
        ? data.RECEIVER_AREA_NAME
        : ''; // 收货人县
      replace.SHIP_AMT = data.SHIP_AMT ? data.SHIP_AMT : ''; // 换货邮费
      replace.RECEIVE_ADDRESS = decryptData.RECEIVER_ADDRESS ? decryptData.RECEIVER_ADDRESS : data.RECEIVE_ADDRESS; // 收货人地址
      this.replacement.formData[5].itemdata.valuedata = data.RECEIVER_PROVINCE_NAME
        ? data.RECEIVER_PROVINCE_NAME
        : '';
      this.replacement.formData[6].itemdata.valuedata = data.RECEIVER_CITY_NAME
        ? data.RECEIVER_CITY_NAME
        : '';
      this.replacement.formData[7].itemdata.valuedata = data.RECEIVER_AREA_NAME
        ? data.RECEIVER_AREA_NAME
        : '';
      // 退货金额
      this.returnPostage = data.RETURN_AMT_SHIP; // 应退邮费
      this.otherAmount = data.RETURN_AMT_OTHER; // 其他金额
      this.settlementAmount = data.CONSIGN_AMT_SETTLE; // 代销结算金额
    },
    // 标记次品已调拨
    async defectiveGoods() {
      const _this = this;
      _this.service.common
        .returnSkuDb({ id: _this.$route.query.id })
        .then((res) => {
          if (res.data.code == 0) {
            _this.$Message.success(res.data.message);
            // _this.getList();
            _this.$router.go(0);
          } else {
            _this.$Message.error(res.data.message);
          }
        });
    },
    // 计算商品/换货金额总和
    calculateMoney(arr, num) {
      let sum = 0;
      if (num == 1 || num == 2) {
        for (let i = 0; i < arr.length; i++) {
          sum += +arr[i].AMT_REFUND;
        }
      }
      return sum || 0;
    },
    // 退货金额合计
    returnTotal(num, id) {
      const _this = this;
      if (num && id === 1) {
        setTimeout(() => {
          _this.returnPostage = /^[0-9]{0,8}(\.[0-9]{0,4})?/.exec(
            _this.returnPostage
          )[0];
        }, 100);
      } else if (num && id === 2) {
        setTimeout(() => {
          _this.otherAmount = /^[0-9]{0,8}(\.[0-9]{0,4})?/.exec(
            _this.otherAmount
          )[0];
        }, 100);
      }
      let a;
      let b;
      setTimeout(() => {
        a = $utils.accAdd(
          _this.amountReturned ? _this.amountReturned : 0,
          _this.returnPostage
        );
        b = $utils.accAdd(a, _this.otherAmount);
        _this.returnTotalAmount = $utils.accSub(
          b,
          _this.exchangeAmount ? _this.exchangeAmount : 0
        );
      }, 150);
    },
    // 代销金额校验
    isSettlementAmount() {
      const _this = this;
      setTimeout(() => {
        _this.settlementAmount = /^[0-9]{0,8}(\.[0-9]{0,4})?/.exec(
          _this.settlementAmount
        )[0];
      }, 100);
    },
    // 切换tab
    async labelClick(item, index) {
      const _this = this;
      if (index === 0) {
        _this.labelDefaultValue = 1;
        _this.isTab = 0;
        this.jordanTableConfig.data = this.refundDtoList.data;
        this.jordanTableConfig.columns = [
          {
            key: 'REFUND_BILL_NO',
            title: $it('form_label.platformRefundNo'), // 平台退款单号
            dataAcessKey: 'REFUND_BILL_NO',
            render: (h, params) => {
              const _this = this;
              if (_this.returnIdEditFlag) {
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
                      class: 'qtyRefund',
                      style: {
                        width: '150',
                        height: '100%',
                        // border: '1px solid #dcdee2',
                        'text-align': 'center',
                      },
                      props: {
                        value: params.row.REFUND_BILL_NO,
                        autosize: true,
                      },
                      on: {
                        'on-change': (e) => {
                          params.row.REFUND_BILL_NO = e.target.value;
                          _this.refundDtoList.data[params.index] = params.row;
                          _this.returnSelectData.forEach((item) => {
                            if (
                              item.PS_C_SKU_ECODE === params.row.PS_C_SKU_ECODE
                            ) {
                              item.REFUND_BILL_NO = params.row.REFUND_BILL_NO;
                            }
                          });
                        },
                      },
                    }),
                  ]
                );
              }
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
                    'Label',
                    {
                      class: 'isNone',
                      style: {
                        width: '100%',
                        height: '100%',
                      },
                      props: {
                        value: params.row.REFUND_BILL_NO,
                        autosize: true,
                      },
                    },
                    params.row.REFUND_BILL_NO
                  ),
                ]
              );
            },
          },
          {
            key: 'PS_C_PRO_ECODE',
            title: $it('table_label.productNo'), // 商品编码
            dataAcessKey: 'PS_C_PRO_ECODE',
          },
          {
            key: 'PS_C_CLR_ID',
            title: $it('other.color'), // 颜色
            dataAcessKey: 'PS_C_CLR_ID',
            render: (h, params) => {
              const proEcode = params.row.PS_C_PRO_ECODE;
              const list = params.row.clrList;
              if (_this.clrAndSizeFlag) {
                return h(
                  'div',
                  {
                    style: {
                      width: '100%',
                      display: 'flex',
                      alignitems: 'center',
                      justifyContent: 'space-between',
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                      },
                    },
                  },
                  [
                    h(
                      'Select',
                      {
                        class: 'coloraa',
                        style: {
                          width: '150px',
                        },
                        props: {
                          value: params.row.PS_C_CLR_ID, // 结算方式
                          transfer: true,
                        },
                        on: {
                          'on-change': async (value) => {
                            // const preClrId = _this.jordanTableConfig.data[params.index].PS_C_CLR_ID;
                            _this.jordanTableConfig.data[
                              params.index
                            ].PS_C_CLR_ID = value;
                            const sizeId = params.row.PS_C_SIZE_ID;
                            if (sizeId) {
                              await _this.getDataByProinfo(
                                proEcode,
                                2,
                                sizeId,
                                value
                              );
                              if (!_this.itemSkuEcode) {
                                _this.jordanTableConfig.data[
                                  params.index
                                ].PS_C_SKU_ECODE = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].PS_C_SKU_ID = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].skuId = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].BARCODE = '';
                                _this.$Message.warning('未查询到条码!');
                                return;
                              }
                              let duplicateFlag = false;
                              _this.jordanTableConfig.data.forEach((item) => {
                                if (
                                  item.PS_C_SKU_ECODE === _this.itemSkuEcode
                                ) {
                                  duplicateFlag = true;
                                }
                              });
                              _this.returnSelectData = [];
                              if (duplicateFlag) {
                                _this.jordanTableConfig.data[
                                  params.index
                                ].PS_C_SKU_ECODE = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].PS_C_SKU_ID = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].skuId = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].BARCODE = '';
                                _this.$Message.warning(
                                  '不允许出现条码一致的明细!'
                                );
                                return;
                              }
                              _this.jordanTableConfig.data[
                                params.index
                              ].PS_C_SKU_ECODE = _this.itemSkuEcode;
                              _this.jordanTableConfig.data[
                                params.index
                              ].PS_C_SKU_ID = _this.itemSkuId;
                              _this.jordanTableConfig.data[params.index].skuId =
                                _this.itemSkuId;
                              _this.jordanTableConfig.data[
                                params.index
                              ].BARCODE = _this.itemGbcode;
                              _this.refundDtoList.data[params.index] =
                                _this.jordanTableConfig.data[params.index];
                              for (let i = 0; i < list.length; i++) {
                                const clrItem = list[i];
                                if (clrItem.psCSpec1objId === value) {
                                  _this.jordanTableConfig.data[
                                    params.index
                                  ].PS_C_CLR_ECODE = clrItem.psCSpec1objCode;
                                  _this.jordanTableConfig.data[
                                    params.index
                                  ].PS_C_CLR_ENAME = clrItem.psCSpec1objName;
                                  break;
                                }
                              }
                            }
                          },
                        },
                      },
                      list.map((item) =>
                        h('Option', {
                          props: {
                            value: item.psCSpec1objId || item.COLOR_ID, // item.COLOR_ID item.COLOR_NAME为零售发货单点击新增退单按钮进来查询给的颜色尺寸列表字段
                            label: item.psCSpec1objName || item.COLOR_NAME,
                          },
                        })
                      )
                    ),
                  ]
                );
              }
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                },
                [
                  h(
                    'Label',
                    {
                      style: {
                        width: '150px',
                      },
                      props: {
                        value: params.row.PS_C_CLR_ID,
                        autosize: true,
                      },
                    },
                    params.row.PS_C_CLR_ENAME
                  ),
                ]
              );
            },
          },
          {
            key: 'PS_C_SIZE_ID',
            dataAcessKey: 'PS_C_SIZE_ID',
            title: $it('other.sizes'), // 尺码
            render: (h, params) => {
              const proEcode = params.row.PS_C_PRO_ECODE;
              const list = params.row.sizeList;
              if (_this.clrAndSizeFlag) {
                return h(
                  'div',
                  {
                    style: {
                      width: '100%',
                      display: 'flex',
                      alignitems: 'center',
                      justifyContent: 'space-between',
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                      },
                    },
                  },
                  [
                    h(
                      'Select',
                      {
                        style: {
                          width: '150px',
                        },
                        props: {
                          value: params.row.PS_C_SIZE_ID,
                          transfer: true,
                        },
                        on: {
                          'on-change': async (value) => {
                            // const preSizeId = _this.jordanTableConfig.data[params.index].PS_C_SIZE_ID;
                            _this.jordanTableConfig.data[
                              params.index
                            ].PS_C_SIZE_ID = value;
                            const clrId = params.row.PS_C_CLR_ID;
                            if (clrId) {
                              await _this.getDataByProinfo(
                                proEcode,
                                2,
                                value,
                                clrId
                              );
                              if (!_this.itemSkuEcode) {
                                _this.jordanTableConfig.data[
                                  params.index
                                ].PS_C_SKU_ECODE = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].PS_C_SKU_ID = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].skuId = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].BARCODE = '';
                                _this.$Message.warning('未查询到条码!');
                                return;
                              }
                              let duplicateFlag = false;
                              _this.jordanTableConfig.data.forEach((item) => {
                                if (item.PS_C_SKU_ECODE === _this.itemSkuEcode)
                                  duplicateFlag = true;
                              });
                              _this.returnSelectData = [];
                              if (duplicateFlag) {
                                _this.jordanTableConfig.data[
                                  params.index
                                ].PS_C_SKU_ECODE = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].PS_C_SKU_ID = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].skuId = '';
                                _this.jordanTableConfig.data[
                                  params.index
                                ].BARCODE = '';
                                _this.$Message.warning(
                                  '不允许出现条码一致的明细!'
                                );
                                return;
                              }
                              // for(let i =0; i<_this.returnSelectData.length;i++){
                              //   let selection = _this.returnSelectData[i];
                              //   if(selection.PS_C_PRO_ECODE === proEcode && selection.PS_C_CLR_ID === clrId && selection.PS_C_SIZE_ID === preSizeId){
                              //     _this.returnSelectData.splice(i, 1);
                              //     break;
                              //   }
                              // }
                              for (let i = 0; i < list.length; i++) {
                                const sizeItem = list[i];
                                if (sizeItem.psCSpec2objId === value) {
                                  _this.jordanTableConfig.data[
                                    params.index
                                  ].PS_C_SIZE_ECODE = sizeItem.psCSpec2objCode;
                                  _this.jordanTableConfig.data[
                                    params.index
                                  ].PS_C_SIZE_ENAME = sizeItem.psCSpec2objName;
                                  break;
                                }
                              }
                              _this.jordanTableConfig.data[
                                params.index
                              ].PS_C_SKU_ECODE = _this.itemSkuEcode;
                              _this.jordanTableConfig.data[
                                params.index
                              ].PS_C_SKU_ID = _this.itemSkuId;
                              _this.jordanTableConfig.data[params.index].skuId =
                                _this.itemSkuId;
                              _this.jordanTableConfig.data[
                                params.index
                              ].BARCODE = _this.itemGbcode;
                              _this.refundDtoList.data[params.index] =
                                _this.jordanTableConfig.data[params.index];
                            }
                          },
                        },
                      },
                      list.map((item) =>
                        h('Option', {
                          props: {
                            value: item.psCSpec2objId || item.SIZE_ID, // item.SIZE_ID item.SIZE_NAME为零售发货单点击新增退单按钮进来查询给的颜色尺寸列表字段
                            label: item.psCSpec2objName || item.SIZE_NAME,
                          },
                        })
                      )
                    ),
                  ]
                );
              }
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                },
                [
                  h(
                    'Label',
                    {
                      style: {
                        width: '150px',
                      },
                      props: {
                        value: params.row.PS_C_SIZE_ID,
                        autosize: true,
                      },
                    },
                    params.row.PS_C_SIZE_ENAME
                  ),
                ]
              );
            },
          },
          {
            key: 'QTY_REFUND',
            title: $it('table_label.appleNumber'), // 申请数量
            dataAcessKey: 'QTY_REFUND',
            render: (h, params) => {
              const _this = this;
              if (_this.qtyRefundEditFlag) {
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
                      class: 'qtyRefund',
                      style: {
                        width: '150',
                        height: '100%',
                        // border: '1px solid #dcdee2',
                        'text-align': 'center',
                      },
                      props: {
                        value: params.row.QTY_REFUND,
                        autosize: true,
                        regx: /^[1-9]\d*$/,
                      },

                      on: {
                        'on-change': (e) => {
                          if (parseInt(_this.jordanTableConfig.data[params.index].QTY_CAN_REFUND) < parseInt(e.target.value)) {
                            _this.$Message.warning('申请数量不允许大于可退数量!');
                            setTimeout(() => {
                              e.target.value = _this.jordanTableConfig.data[params.index].QTY_REFUND;
                            }, 100);
                            return;
                          }
                          params.row.AMT_REFUND = $utils.accMul(e.target.value, params.row.AMT_REFUND);
                          // 计算结算金额
                          params.row.AMT_SETTLE_TOT = $utils.accMul(e.target.value, params.row.PRICE_SETTLE ?? 0);
                          params.row.QTY_REFUND = e.target.value;
                          _this.refundDtoList.data[params.index] = params.row;
                          _this.returnSelectData.forEach((item) => {
                            if (item.PS_C_SKU_ECODE === params.row.PS_C_SKU_ECODE) {
                              item.QTY_CAN_REFUND = params.row.QTY_CAN_REFUND;
                              item.AMT_REFUND = params.row.AMT_REFUND;
                              item.QTY_REFUND = params.row.QTY_REFUND;
                              item.QTY_EXCHANGE = params.row.QTY_REFUND;
                              item.AMT_SETTLE_TOT = params.row.AMT_SETTLE_TOT;
                            }
                          });

                          _this.amountReturned = _this.calculateMoney(_this.returnSelectData.length > 0 ? _this.returnSelectData : _this.refundDtoList.data, 1).toFixed(2);
                          _this.returnTotal();
                        },
                      },
                    }),
                  ]
                );
              }
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
                    'Label',
                    {
                      class: 'isNone',
                      style: {
                        width: '100%',
                        height: '100%',
                      },
                      props: {
                        value: params.row.QTY_REFUND,
                        autosize: true,
                      },
                    },
                    params.row.QTY_REFUND
                  ),
                ]
              );
            },
          },
          {
            key: 'PS_C_SKU_ECODE',
            title: $it('form_label.barCode'), // 条码
            dataAcessKey: 'PS_C_SKU_ECODE',
          },
          {
            key: 'BARCODE',
            title: $it('form_label.gBCode'), // 国标码
            dataAcessKey: 'BARCODE',
          },
          {
            key: 'PS_C_PRO_ENAME',
            title: $it('form_label.goodsName'), // 商品名称
            dataAcessKey: 'PS_C_PRO_ENAME',
          },
          {
            key: 'SEX_NAME',
            title: $it('table_label.gender'), // 性别
            dataAcessKey: 'SEX',
          },
          {
            key: 'QTY_IN',
            title: $it('table_label.storageQuantity'), // 入库数量
            dataAcessKey: 'QTY_IN',
          },
          {
            key: 'QTY_CAN_REFUND',
            title: $it('table_label.orderQuantity'), // 订单数量
            dataAcessKey: 'QTY_CAN_REFUND',
          },
          {
            key: 'PRICE',
            title: $it('table_label.tagPrice'), // 吊牌价
            dataAcessKey: 'PRICE_LIST',
          },
          {
            key: 'amt_refund_single',
            title: $it('table_label.unitReturnAmount'), // 单件退货金额
            dataAcessKey: 'AMT_REFUND_SINGLE',
          },
          {
            key: 'AMT_REFUND',
            dataAcessKey: 'AMT_REFUND',
            title: $it('panel_label.returnAmount'), // 退货金额
          },
          {
            key: 'PRICE_SETTLE',
            dataAcessKey: 'PRICE_SETTLE',
            title: $it('table_label.unitPriceSettlement'), // 结算单价
          },
          {
            key: 'AMT_SETTLE_TOT',
            dataAcessKey: 'AMT_SETTLE_TOT',
            title: $it('table_label.settlementAmount'), // 结算金额
          },
          {
            key: 'PRODUCT_MARK',
            title: $it('form_label.goodsMark'), // 商品标记
            dataAcessKey: 'PRODUCT_MARK',
            render: (h, params) => {
              const list = [
                {
                  SPEC: '正品',
                },
                {
                  SPEC: '次品',
                },
              ];
              return h(
                'Select',
                {
                  style: {
                    width: '150px',
                  },
                  props: {
                    value: params.row.PRODUCT_MARK, // 结算方式
                    transfer: true,
                  },
                  on: {
                    'on-change': (value) => {
                      console.log(params);
                      _this.jordanTableConfig.data[
                        params.index
                      ].PRODUCT_MARK = value;
                    },
                  },
                },
                list.map((item) =>
                  h('Option', {
                    props: {
                      value: item.SPEC,
                      label: item.SPEC,
                    },
                  })
                )
              );
            },
          },
        ]; // 表头
        this.getDataAccess('OC_B_RETURN_ORDER', (res) => {
          this.jordanTableConfig.columns = this.setTablePermissions(
            this.jordanTableConfig.columns,
            res
          );
        });
        // 判断是否为修改页面
        // 是 => 不可新增/删除明细
        // 不是 => 可以新增/删除明细
        _this.jordanTableConfig.businessFormConfig = {};
        const flag = Boolean(_this.$route.query.id === '-1');
        _this.jordanTableConfig.isShowAddDetailBtn = flag;
        _this.jordanTableConfig.isShowImportBtn = flag;
        _this.jordanTableConfig.isShowExportBtn = flag;
        if (!flag) {
          _this.jordanTableConfig.isShowDeleteDetailBtn = flag;
        }
      } else if (index === 1) {
        _this.labelDefaultValue = 2;
        _this.isTab = 1;
        if (_this.returnSelectData.length) {
          _this.exchangeDtoList.data = [];
          _this.jordanTableConfig2.data = [];
          const returnSelectDataArr = JSON.parse(
            JSON.stringify(_this.returnSelectData)
          );
          returnSelectDataArr.forEach((item) => {
            item.ID = -1;
          });
          _this.exchangeDtoList.data = _this.exchangeDtoList.data.concat(
            returnSelectDataArr
          );
          const newArr = [];
          newArr.push(_this.exchangeDtoList.data[0]);
          for (let i = 0; i < _this.exchangeDtoList.data.length; i++) {
            let status = 0;
            for (let j = 0; j < newArr.length; j++) {
              if (
                _this.exchangeDtoList.data[i].OC_B_ORDER_ITEM_ID ==
                newArr[j].OC_B_ORDER_ITEM_ID
              ) {
                status = 1;
                break;
              }
            }
            if (status == 0) {
              newArr.push(_this.exchangeDtoList.data[i]);
            }
          }
          let SkuEcodeList = [];
          _this.exchangeDtoList.data = newArr;
          newArr.forEach(item => {
            SkuEcodeList.push(item.PS_C_SKU_ECODE)
          })
          const fromdata = new FormData();
          fromdata.append('param', JSON.stringify({ SkuEcodeList, shopId: this.shopId, isQuery: 'Y' }));
          await this.service.orderCenter.skuListQuery(fromdata).then(res => {
            if (res.data.code === 0) {
              _this.exchangeDtoList.data.map((item, index) => {
                _this.exchangeDtoList.data[index].AVAILABLE_QTY = res.data.data[index].AVAILABLE_QTY || 0;
              })
            }
          })
          this.exchangeDtoList.data.forEach((item) => {
            item.QTY_EXCHANGE = item.QTY_REFUND;
          });
          _this.exchangeAmount = _this
            .calculateMoney(_this.exchangeDtoList.data, 2)
            .toFixed(2);
          _this.returnTotal();
        }
        this.jordanTableConfig2.data = this.exchangeDtoList.data;
        this.jordanTableConfig2.columns = [
          {
            key: 'PS_C_PRO_ECODE',
            title: $it('table_label.productNo'), // 商品编码
            dataAcessKey: 'PS_C_PRO_ECODE',
          },
          {
            key: 'PS_C_CLR_ID',
            dataAcessKey: 'PS_C_CLR_ID',
            title: $it('other.color'), // 颜色
            render: (h, params) => {
              const proEcode = params.row.PS_C_PRO_ECODE;
              const list = params.row.clrList;
              if (_this.clrAndSizeFlag) {
                return h(
                  'div',
                  {
                    style: {
                      width: '100%',
                      display: 'flex',
                      alignitems: 'center',
                      justifyContent: 'space-between',
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                      },
                    },
                  },
                  [
                    h(
                      'Select',
                      {
                        style: {
                          width: '150px',
                        },
                        props: {
                          value: params.row.PS_C_CLR_ID,
                          transfer: true,
                        },
                        on: {
                          'on-change': async (value) => {
                            _this.jordanTableConfig2.data[
                              params.index
                            ].PS_C_CLR_ID = value;
                            const sizeId = params.row.PS_C_SIZE_ID;
                            if (sizeId) {
                              await _this.getDataByProinfo(
                                proEcode,
                                2,
                                sizeId,
                                value
                              );
                              if (!_this.itemSkuEcode) {
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].PS_C_SKU_ECODE = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].PS_C_SKU_ID = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].skuId = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].BARCODE = '';
                                _this.$Message.warning('未查询到条码!');
                                return;
                              }
                              let duplicateFlag = false;
                              _this.jordanTableConfig2.data.forEach((item) => {
                                if (
                                  item.PS_C_SKU_ECODE === _this.itemSkuEcode
                                ) {
                                  duplicateFlag = true;
                                }
                              });
                              if (duplicateFlag) {
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].PS_C_SKU_ECODE = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].PS_C_SKU_ID = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].skuId = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].BARCODE = '';
                                _this.$Message.warning(
                                  '不允许出现条码一致的明细!'
                                );
                                return;
                              }
                              _this.jordanTableConfig2.data[
                                params.index
                              ].PS_C_SKU_ECODE = _this.itemSkuEcode;
                              _this.jordanTableConfig2.data[
                                params.index
                              ].PS_C_SKU_ID = _this.itemSkuId;
                              _this.jordanTableConfig2.data[
                                params.index
                              ].skuId = _this.itemSkuId;
                              _this.jordanTableConfig2.data[
                                params.index
                              ].BARCODE = _this.itemGbcode;
                              _this.exchangeDtoList.data[params.index] =
                                _this.jordanTableConfig2.data[params.index];
                              for (let i = 0; i < list.length; i++) {
                                const clrItem = list[i];
                                if (clrItem.psCSpec1objId === value) {
                                  _this.jordanTableConfig2.data[
                                    params.index
                                  ].PS_C_CLR_ECODE = clrItem.psCSpec1objCode;
                                  _this.jordanTableConfig2.data[
                                    params.index
                                  ].PS_C_CLR_ENAME = clrItem.psCSpec1objName;
                                  break;
                                }
                              }
                            }
                          },
                        },
                      },
                      list.map((item) =>
                        h('Option', {
                          props: {
                            value: item.psCSpec1objId || item.COLOR_ID,
                            label: item.psCSpec1objName || item.COLOR_NAME,
                          },
                        })
                      )
                    ),
                  ]
                );
              }
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                },
                [
                  h(
                    'Label',
                    {
                      style: {
                        width: '150px',
                      },
                      props: {
                        value: params.row.PS_C_CLR_ID,
                        autosize: true,
                      },
                    },
                    params.row.PS_C_CLR_ENAME
                  ),
                ]
              );
            },
          },
          {
            key: 'PS_C_SIZE_ID',
            dataAcessKey: 'PS_C_SIZE_ID',
            title: $it('other.sizes'), // 尺码
            render: (h, params) => {
              const proEcode = params.row.PS_C_PRO_ECODE;
              const list = params.row.sizeList;
              if (_this.clrAndSizeFlag) {
                return h(
                  'div',
                  {
                    style: {
                      width: '100%',
                      display: 'flex',
                      alignitems: 'center',
                      justifyContent: 'space-between',
                    },
                    on: {
                      click: (e) => {
                        e.stopPropagation();
                      },
                    },
                  },
                  [
                    h(
                      'Select',
                      {
                        style: {
                          width: '150px',
                        },
                        props: {
                          value: params.row.PS_C_SIZE_ID, // 结算方式
                          transfer: true,
                        },
                        on: {
                          'on-change': async (value) => {
                            _this.jordanTableConfig2.data[
                              params.index
                            ].PS_C_SIZE_ID = value;
                            const clrId = params.row.PS_C_CLR_ID;
                            if (clrId) {
                              await _this.getDataByProinfo(
                                proEcode,
                                2,
                                value,
                                clrId
                              );
                              if (!_this.itemSkuEcode) {
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].PS_C_SKU_ECODE = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].PS_C_SKU_ID = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].skuId = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].BARCODE = '';
                                _this.$Message.warning('未查询到条码!');
                                return;
                              }
                              let duplicateFlag = false;
                              _this.jordanTableConfig2.data.forEach((item) => {
                                if (
                                  item.PS_C_SKU_ECODE === _this.itemSkuEcode
                                ) {
                                  duplicateFlag = true;
                                }
                              });
                              if (duplicateFlag) {
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].PS_C_SKU_ECODE = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].PS_C_SKU_ID = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].skuId = '';
                                _this.jordanTableConfig2.data[
                                  params.index
                                ].BARCODE = '';
                                _this.$Message.warning(
                                  '不允许出现条码一致的明细!'
                                );
                                return;
                              }
                              _this.jordanTableConfig2.data[
                                params.index
                              ].PS_C_SKU_ECODE = _this.itemSkuEcode;
                              _this.jordanTableConfig2.data[
                                params.index
                              ].PS_C_SKU_ID = _this.itemSkuId;
                              _this.jordanTableConfig2.data[
                                params.index
                              ].skuId = _this.itemSkuId;
                              _this.jordanTableConfig2.data[
                                params.index
                              ].BARCODE = _this.itemGbcode;
                              _this.exchangeDtoList.data[params.index] =
                                _this.jordanTableConfig2.data[params.index];
                              for (let i = 0; i < list.length; i++) {
                                const sizeItem = list[i];
                                if (sizeItem.psCSpec2objId === value) {
                                  _this.jordanTableConfig2.data[
                                    params.index
                                  ].PS_C_SIZE_ECODE = sizeItem.psCSpec2objCode;
                                  _this.jordanTableConfig2.data[
                                    params.index
                                  ].PS_C_SIZE_ENAME = sizeItem.psCSpec2objName;
                                  break;
                                }
                              }
                            }
                          },
                        },
                      },
                      list.map((item) =>
                        h('Option', {
                          props: {
                            value: item.psCSpec2objId || item.SIZE_ID,
                            label: item.psCSpec2objName || item.SIZE_NAME,
                          },
                        })
                      )
                    ),
                  ]
                );
              }
              return h(
                'div',
                {
                  style: {
                    width: '100%',
                    height: '100%',
                  },
                },
                [
                  h(
                    'Label',
                    {
                      style: {
                        width: '150px',
                      },
                      props: {
                        value: params.row.PS_C_SIZE_ID,
                        autosize: true,
                      },
                    },
                    params.row.PS_C_SIZE_ENAME
                  ),
                ]
              );
            },
          },
          {
            key: 'QTY_EXCHANGE',
            title: $it('table_label.exchangeQuantity'), // 换货数量
            render: (h, params) => {
              const _this = this;
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
                    style: {
                      width: '150',
                      height: '100%',
                      border: '1px solid #dcdee2',
                      'text-align': 'center',
                    },
                    props: {
                      value: params.row.QTY_EXCHANGE,
                      autosize: true,
                      regx: /^[1-9]\d*$/,
                    },

                    on: {
                      'on-change': (e) => {
                        // _this.jordanTableConfig.data[params.index].QTY_EXCHANGE = e.target.value;
                        // _this.jordanTableConfig.data[params.index].AMT_REFUND = $utils.accMul(e.target.value, _this.jordanTableConfig.data[params.index].PRICE);
                        params.row.QTY_EXCHANGE = e.target.value;
                        params.row.AMT_REFUND = $utils.accMul(e.target.value || 0, params.row.PRICE);
                        _this.exchangeDtoList.data[params.index] = params.row;
                        _this.exchangeAmount = _this
                          .calculateMoney(_this.exchangeDtoList.data, 2)
                          .toFixed(2);
                        _this.returnTotal();
                      },
                    },
                  }),
                ]
              );
            },
          },
          {
            key: 'PS_C_SKU_ECODE',
            dataAcessKey: 'PS_C_SKU_ECODE',
            title: $it('form_label.barCode'), // 条码
          },
          {
            key: 'BARCODE',
            dataAcessKey: 'BARCODE',
            title: $it('form_label.gBCode'), // 国标码
          },
          {
            key: 'PS_C_PRO_ENAME',
            dataAcessKey: 'PS_C_PRO_ENAME',
            title: $it('form_label.goodsName'), // 商品名称
          },
          {
            key: 'SEX_NAME',
            dataAcessKey: 'SEX',
            title: $it('table_label.gender'), // 性别
          },
          {
            key: 'PRICE',
            dataAcessKey: 'PRICE_LIST',
            title: $it('table_label.tagPrice'), // 吊牌价
          },
          {
            key: 'AMT_REFUND',
            dataAcessKey: 'AMT_REFUND',
            title: $it('other.exchangeAmounts'), // 退货金额
            render: (h, params) => {
              const _this = this;
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
                    style: {
                      width: '150',
                      height: '100%',
                      border: '1px solid #dcdee2',
                      'text-align': 'center',
                    },
                    props: {
                      value: params.row.AMT_REFUND,
                      autosize: true,
                      regx: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
                    },

                    on: {
                      'on-change': (e) => {
                        params.row.AMT_REFUND = e.target.value;
                        // _this.jordanTableConfig.data[params.index].AMT_REFUND = params.row.AMT_REFUND;
                        _this.exchangeDtoList.data[params.index] = params.row;
                        _this.exchangeAmount = _this
                          .calculateMoney(_this.exchangeDtoList.data, 2)
                          .toFixed(2);
                        _this.returnTotal();
                      },
                    },
                  }),
                ]
              );
            },
          },
        ]; // 表
        this.getDataAccess('OC_B_RETURN_ORDER', (res) => {
          this.jordanTableConfig2.columns = this.setTablePermissions(
            this.jordanTableConfig2.columns,
            res
          );
        });
        if (_this.$route.query.id === '-1') {
          _this.jordanTableConfig2.businessFormConfig = {
            formValue: {
              sku: '',
              number: '1',
              gbCode: '',
            },
            formData: [
              {
                label: $it('table_label.productNo'), // 商品编码
                style: 'dimSearch',
                width: '6',
                value: 'gbCode',
                columns: ['ECODE'],
                AuotData: [], // 匹配的选项
                dimChange: (val) => {
                  if (this.shopId) {
                    // 模糊查询的方法
                    const _this = this;
                    _this.jordanTableConfig2.businessFormConfig.formValue.gbCode = val.trim();
                    const fromdata = new FormData();
                    const params = {
                      GLOBAL: val.trim(),
                      PAGENUM: 1,
                      PAGESIZE: 10,
                      CONDITION: {},
                      TABLENAME: 'PS_C_PRO',
                    };
                    fromdata.append('param', JSON.stringify(params));
                    _this.service.common.screenresult(fromdata).then((res) => {
                      if (res.data.code === 0) {
                        const dimList =
                          _this.jordanTableConfig2.businessFormConfig.formData;

                        dimList.forEach((item) => {
                          // 商品编码
                          if (
                            item.label === $it('table_label.productNo')
                          ) {
                            item.AuotData = res.data.data.list;
                          }
                        });
                      }
                    });
                  }
                  else {
                    this.$Message.warning('店铺名称不允许为空，请选择下单店铺！');
                  }
                },
                dimEnter: (val) => {
                  if (this.shopId) {
                    const self = this;
                    /* if (!self.information.formData[14].itemdata.pid) {
                      // 发货店仓，不能为空
                      self.$Message.warning($it('modalTips.g0'));
                      return;
                    } */
                    self.matrixBox.componentData = {
                      objid: -1,
                      encode: val,
                      distribIds: self.information.formData[14].itemdata.pid,
                      tablename: 'OC_B_RETURN_ORDER',
                      returnType: '2',
                    };
                    self.$children
                      .find((item) => item.name === 'matrixBox')
                      .openConfirm();
                  } else {
                    this.$Message.warning('店铺名称不允许为空，请选择下单店铺！');
                  }
                },
                dimSelect: (val) => {
                  if (this.shopId) {
                    const self = this;
                    /* if (!self.information.formData[14].itemdata.pid) {
                      // 发货店仓，不能为空
                      self.$Message.warning($it('modalTips.g0'));
                      return;
                    } */
                    self.matrixBox.componentData = {
                      objid: -1,
                      encode: val.label,
                      distribIds: self.information.formData[14].itemdata.pid,
                      tablename: 'OC_B_RETURN_ORDER',
                      returnType: '2',
                    };
                    self.$children
                      .find((item) => item.name === 'matrixBox')
                      .openConfirm();
                    // document.getElementById("Num").focus();
                  } else {
                    this.$Message.warning('店铺名称不允许为空，请选择下单店铺！');
                  }
                },
              },
              {
                style: 'dimSearch', // 输入框类型
                label: $it('form_label.barCode'), // 条码 输入框前文字
                value: 'sku', // 输入框的值
                placeholder: '请输入sku、款号',
                width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
                columns: ['ECODE'],
                AuotData: [], // 匹配的选项
                dimChange: (search) => {
                  _this.jordanTableConfig2.businessFormConfig.formValue.sku = _this.jordanTableConfig2.businessFormConfig.formValue.sku.replace(
                    /(^\s*)|(\s*$)/g,
                    ''
                  );
                  // 模糊查询的方法
                  if (this.shopId) {
                    _this.getData(search, 2, 'Notpass');
                  } else {
                    this.$Message.warning('店铺名称不允许为空，请选择下单店铺！');
                  }
                },
                dimEnter: () => {
                  _this.jordanTableConfig2.businessFormConfig.formValue.sku = _this.jordanTableConfig2.businessFormConfig.formValue.sku.replace(
                    /(^\s*)|(\s*$)/g,
                    ''
                  );
                  if (this.shopId) {
                    _this.entry(
                      _this.jordanTableConfig2.businessFormConfig.formValue.sku,
                      2
                    );
                  } else {
                    this.$Message.warning('店铺名称不允许为空，请选择下单店铺！');
                  }
                },
                dimSelect: (obj) => {
                  _this.jordanTableConfig2.businessFormConfig.formValue.sku =
                    obj.label;
                  // document.getElementById("Enumber").focus();
                },
              },
            ],
          };
          _this.jordanTableConfig2.isShowDeleteDetailBtn = true;
          _this.jordanTableConfig2.isShowImportBtn = true;
          _this.jordanTableConfig2.isShowExportBtn = true;
        } else {
          _this.jordanTableConfig2.businessFormConfig = {};
          _this.jordanTableConfig2.isShowDeleteDetailBtn = false;
          _this.jordanTableConfig2.isShowImportBtn = false;
          _this.jordanTableConfig2.isShowExportBtn = false;
        }
        // _this.returnSelectData = [];
        console.log(_this.jordanTableConfig2);
      } else if (index === 2) {
        _this.labelDefaultValue = 3;
        _this.tab2 = {
          tablename: 'OC_B_RETURN_ORDER',
          objid: this.$route.query.id,
        };
        // _this.returnSelectData = [];
      } else if (index === 3) {
        _this.labelDefaultValue = 4;
        this.jordanTableConfig4.data = this.defectiveList;
        this.jordanTableConfig4.columns = [
          {
            key: 'PS_C_PRO_ECODE',
            dataAcessKey: 'PS_C_PRO_ECODE',
            title: $it('table_label.productNo'), // 商品编码
          },
          {
            key: 'PS_C_CLR_ENAME',
            dataAcessKey: 'PS_C_CLR_ENAME',
            title: $it('other.color'), // 颜色
          },
          {
            key: 'PS_C_SIZE_ENAME',
            dataAcessKey: 'PS_C_SIZE_ENAME',
            title: $it('other.sizes'), // 尺码
          },
          {
            key: 'PS_C_SKU_ECODE',
            dataAcessKey: 'PS_C_SKU_ECODE',
            title: $it('form_label.barCode'), // 条码
          },
          {
            key: 'GBCODE',
            dataAcessKey: 'BARCODE',
            title: $it('form_label.gBCode'), // 国标码
          },
          {
            key: 'PS_C_PRO_ENAME',
            dataAcessKey: 'PS_C_PRO_ENAME',
            title: $it('form_label.goodsName'), // 商品名称
          },
          {
            key: 'QTY_IN',
            dataAcessKey: 'QTY_IN',
            title: $it('table_label.storageQuantity'), // 入库数量
          },
        ];
        // 处理页面权限
        this.getDataAccess('OC_B_RETURN_ORDER', (res) => {
          this.jordanTableConfig4.columns = this.setTablePermissions(
            this.jordanTableConfig4.columns,
            res
          );
        });
      }
    },
    // 保存
    saveData() {
      const _this = this;
      // 传WMS成功的单据不允许修改
      if (_this.isTowwms == 2 && _this.$route.query.flag !== 'RefundToExchange') {
        // 传WMS成功状态的单据不可修改！
        this.$Message.warning($it('modalTips.n7'));
        return;
      }
      // 只有等待退货入库和等待售后确认状态的可以修改
      if (_this.$route.query.id !== '-1' && _this.$route.query.flag !== 'RefundToExchange') {
        if (![20, 30, 50].includes(_this.status) || (_this.status == 50 && _this.inventedStatus != 1)) {
          // "只有等待退货入库和等待售后确认状态的单据 或 完成状态且虚拟入库未入库状态的单据可修改!"
          this.$Message.warning($it('modalTips.n8'));
          return;
        }
        if (_this.status == 20 && _this.isTowwms == 2) {
          this.$Message.warning($it('modalTips.n9')); // "等待退货入库且传WMS成功状态的单据不可修改！"
          return;
        }
      }
      if (_this.$route.query.flag === 'RefundToExchange' && _this.status == 60) {
        this.$Message.warning('取消状态单据无法修改!');
      }
      if (!_this.information.formValue.ORIG_ORDER_ID) {
        // 原始订单编号不能为空!
        this.$Message.warning($it('modalTips.j1'));
        return;
      }
      if (!_this.information.formValue.CP_C_SHOP_ID) {
        this.$Message.warning($it('modalTips.o0'));
        return; // 店铺名称不能为空!
      }
      /* if (!_this.information.formValue.CP_C_LOGISTICS_ID) {
        this.$Message.warning('退回物流公司不能为空');
        return
      } */
      if (!_this.information.formValue.RETURN_REASON) {
        this.$Message.warning('退款原因不能为空');
        return
      }
      /* if (!_this.information.formValue.LOGISTICS_CODE) {
        this.$Message.warning('退回物流单号不能为空');
        return
      } */
      if (!_this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID) {
        this.$Message.warning('入库实体仓库不能为空');
        return
      }
      if (_this.information.formValue.BILL_TYPE !== '1') {
        // 换货类型校验
        if (!_this.replacement.formValue.receiver_province_id || !_this.replacement.formValue.receiver_city_id) {
          this.$Message.warning($it('modalTips.aa')); // 省市信息必填!
          return;
        }
        if (_this.replacement.formValue.RECEIVE_NAME.length > 50) {
          this.$Message.warning($it('modalTips.ab')); // 收货人姓名不合法，请重新填写！
          return;
        }
        if (!_this.replacement.formValue.RECEIVE_NAME) {
          this.$Message.warning($it('modalTips.ac')); // 收货人必填!
          return;
        }
        const phone = _this.replacement.formValue.RECEIVE_MOBILE;
        if (!phone) {
          this.$Message.warning($it('modalTips.ad')); // 收货人手机必填!
          return;
        }
        if (phone.indexOf(1) != 0 || phone.length != 11) {
          this.$Message.warning($it('modalTips.ae')); // 电话号码不合法，请重新填写！
          return;
        }
        if (!_this.replacement.formValue.RECEIVE_ADDRESS) {
          this.$Message.warning($it('modalTips.af')); // 收货人地址必填!
          return;
        }
        if (!_this.refundDtoList.data.length) {
          this.$Message.info($it('modalTips.ag')); // 退货明细必须有行数据！
          return;
        }
        if (!_this.exchangeDtoList.data.length) {
          this.$Message.info($it('modalTips.ah')); // 换货明细必须有行数据！
          return;
        }
        if (_this.returnTotalAmount != 0) {
          this.$Message.info($it('modalTips.ai')); // 换货金额必须等于退货金额！
          return;
        }
      } else {
        if (!_this.refundDtoList.data.length) {
          this.$Message.info($it('modalTips.ag')); // 退货明细必须有行数据！
          return;
        }
        if (parseInt(_this.returnTotalAmount) < 0) {
          this.$Message.info($it('modalTips.aj')); // 退货总金额不能小于0，请修改后重新保存！
          return;
        }
      }
      if (_this.replacement.formValue.SHIP_AMT) {
        const n = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
        if (!n.test(_this.replacement.formValue.SHIP_AMT)) {
          this.$Message.warning($it('modalTips.ak')); // 请输入正确的换货邮费!
          return;
        }
      }
      // 是否原退
      _this.information.formValue.IS_BACK = Number(_this.information.formValue.IS_BACK);

      // 换货预留库存
      _this.information.formValue.IS_RESERVED = Number(_this.information.formValue.IS_RESERVED);
      // 退单状态
      _this.information.formValue.PRO_RETURN_STATUS = {
        待入库: 0,
        部分入库: 1,
        全部入库: 2,
      }[_this.information.formValue.PRO_RETURN_STATUS];
      let tempObj = { 'noDefectiveProductAllocation': 0, 'defectiveProductsNotAllocated': 1, 'defectiveProductsAllocated': 2 };

      Object.keys(tempObj).forEach((item) => {
        if ($it(`other.${item}`) == _this.RESERVE_BIGINT07_type) {
          _this.information.formValue.STATUS_DEFECTIVE_TRANS = tempObj.item;
        }
      })
      const Rlist = [];
      let total = 0;
      let item = (_this.returnSelectData.length) ? _this.returnSelectData : _this.refundDtoList.data;
      for (let i = 0; i < item.length; i++) {
        if (!item[i].QTY_REFUND) {
          // _this.$Message.error($it('modalTips.al')); // 退货明细数量不能为空
          _this.$Message.error('申请数量不能为空！'); // 退货明细数量不能为空
          return;
        }
        if (!item[i].PS_C_CLR_ID) {
          _this.$Message.error($it('modalTips.am')); // 退货明细颜色不能为空
          return;
        }
        if (!item[i].PS_C_SIZE_ID) {
          _this.$Message.error($it('modalTips.an')); // 退货明细尺码不能为空
          return;
        }
        if (!item[i].PS_C_SKU_ECODE) {
          _this.$Message.error($it('modalTips.ao')); // 退货明细条码不能为空
          return;
        }
        Rlist.push({
          ID: item[i].ID != -1 ? item[i].ID : -1,
          // reserve_bigint10: item[i].reserve_bigint10, // 与后端没找到该字段,不清楚意义
          OC_B_ORDER_ITEM_ID: item[i].OC_B_ORDER_ITEM_ID,
          ps_c_sku_ecode: item[i].PS_C_SKU_ECODE,
          barcode: item[i].BARCODE,
          ps_c_pro_ecode: item[i].PS_C_PRO_ECODE,
          ps_c_clr_id: item[i].PS_C_CLR_ID, // 颜色
          ps_c_clr_ecode: item[i].PS_C_CLR_ECODE,
          ps_c_clr_ename: item[i].PS_C_CLR_ENAME,
          ps_c_size_id: item[i].PS_C_SIZE_ID, // 颜色
          ps_c_size_ecode: item[i].PS_C_SIZE_ECODE,
          ps_c_size_ename: item[i].PS_C_SIZE_ENAME,
          ps_c_pro_ename: item[i].PS_C_PRO_ENAME,
          qty_can_refund: parseInt(item[i].QTY_CAN_REFUND),
          qty_refund: parseInt(item[i].QTY_REFUND),
          PRICE_LIST: item[i].PRICE,
          price: item[i].PRICE,
          sex: item[i].SEX,
          amt_refund: item[i].AMT_REFUND,
          qty_in: item[i].QTY_IN,
          product_mark:
            item[i].PRODUCT_MARK == $it('form_label.qualityGoods')
              ? '1'
              : '0', // '正品'
          ps_c_sku_id: item[i].skuId ? item[i].skuId : item[i].PS_C_SKU_ID,
          ps_c_pro_id: item[i].PS_C_PRO_ID,
          sku_spec: item[i].SKU_SPEC,
          amt_refund_single: item[i].amt_refund_single,
          oid: item[i].oOId, // 子订单oid
          // "ps_c_pro_id": item[i].psCproId,// 商品id
          amt_adjust:
            parseInt(item[i].AMT_REFUND) -
            parseInt(item[i].PRICE) * parseInt(item[i].QTY_REFUND), // 总调整金额
          PRICE_SETTLE: item[i].PRICE_SETTLE,
          AMT_SETTLE_TOT: item[i].AMT_SETTLE_TOT,
          REFUND_BILL_NO: item[i].REFUND_BILL_NO,
        });
        total += parseInt(item[i].QTY_REFUND); // 商品数量
      }
      const Elist = [];
      const Eitem = _this.exchangeDtoList.data;
      for (let i = 0; i < Eitem.length; i++) {
        if (!Eitem[i].QTY_EXCHANGE) {
          _this.$Message.error($it('modalTips.ap')); // 换货明细换货数量不能为空
          return;
        }
        if (!Eitem[i].PS_C_CLR_ID && Eitem[i].IS_GROUP != 'Y') {
          _this.$Message.error($it('modalTips.aq')); // 换货明细颜色不能为空
          return;
        }
        if (!Eitem[i].PS_C_SIZE_ID && Eitem[i].IS_GROUP != 'Y') {
          _this.$Message.error($it('modalTips.ar')); // 换货明细尺码不能为空
          return;
        }
        if (!Eitem[i].PS_C_SKU_ECODE) {
          _this.$Message.error($it('modalTips.as')); // 换货明细条码不能为空
          return;
        }
        Elist.push({
          ID: Eitem[i].ID != -1 ? Eitem[i].ID : -1,
          OC_B_ORDER_ITEM_ID: Eitem[i].OC_B_ORDER_ITEM_ID,
          ps_c_sku_ecode: Eitem[i].PS_C_SKU_ECODE,
          barcode: Eitem[i].BARCODE,
          ps_c_pro_ecode: Eitem[i].PS_C_PRO_ECODE,
          ps_c_clr_id: Eitem[i].PS_C_CLR_ID, // 颜色PS_C_CLR_ENAME
          ps_c_clr_ecode: Eitem[i].PS_C_CLR_ECODE,
          ps_c_clr_ename: Eitem[i].PS_C_CLR_ENAME,
          ps_c_size_id: Eitem[i].PS_C_SIZE_ID, // 颜色
          ps_c_size_ecode: Eitem[i].PS_C_SIZE_ECODE,
          ps_c_size_ename: Eitem[i].PS_C_SIZE_ENAME,
          ps_c_pro_ename: Eitem[i].PS_C_PRO_ENAME,
          PRICE_LIST: Eitem[i].PRICE,
          price: Eitem[i].PRICE,
          sex: Eitem[i].SEX,
          amt_refund: Eitem[i].AMT_REFUND,
          qty_exchange: parseInt(Eitem[i].QTY_EXCHANGE),
          qty_in: Eitem[i].QTY_IN,
          product_mark:
            Eitem[i].PRODUCT_MARK == $it('form_label.qualityGoods')
              ? '1'
              : '0', // '正品'
          ps_c_sku_id: Eitem[i].skuId ? Eitem[i].skuId : Eitem[i].PS_C_SKU_ID,
          ps_c_pro_id: Eitem[i].PS_C_PRO_ID,
          sku_spec: Eitem[i].SPEC,
          oid: Eitem[i].oOId,
        });
      }

      const money = {
        RETURN_AMT_LIST: _this.amountReturned,
        RETURN_AMT_SHIP: _this.returnPostage,
        RETURN_AMT_OTHER: _this.otherAmount,
        EXCHANGE_AMT: _this.exchangeAmount,
        RETURN_AMT_ACTUAL: _this.returnTotalAmount,
        CONSIGN_AMT_SETTLE: _this.settlementAmount,
        // CP_C_PHY_WAREHOUSE_ID: _this.warehouseId,
        TID: _this.tId,
        QTY_INSTORE: total,
        BACK_MESSAGE: _this.information.formValue.SELLER_MEMO,
      };
      const params = {
        objid: _this.$route.query.id,
        OcBreturnOrder: Object.assign(_this.information.formValue, _this.replacement.formValue, money), // 主表信息
        OcBreturnOrderExchange: Elist, // 换货明细
        OcBreturnOrderRefund: Rlist, // 退货明细
        isRefund2Exchange: this.$route.query.flag === 'RefundToExchange' ? 1 : 0, // 如果未退货转换货订单,保存需传isRefund2Exchange
      };
      // 复制订单标识
      if (_this.$route.query.cloneReturnGoodId) params.copytype = 1;
      if (_this.$route.query.id == -1) {
        if (_this.information.formValue.BILL_TYPE === '2' && !_this.isModalSave) {
          this.service.common.checkAllStroreStock(params).then((res) => {
            if (res.data.code === 0) {
              // 换货明细的商品换货数量小于可用库存，弹窗提示,否则执行保存操作
              if (!res.data.data) {
                _this.availableStockMassage = res.data.message;
                _this.availableStock = true;
                _this.isModalSave = true;
              } else {
                _this.save(params);
              }
            } else {
              const err = res.data.message || $it('modalTips.at'); // 可用库存查询失败!
              _this.$Message.error(err);
            }
          });
        } else {
          _this.save(params);
        }
      } else if (_this.status == 20 && !_this.information.formValue.IS_RESERVED && !_this.isModalSave && _this.information.formValue.BILL_TYPE === '2') {
        this.service.common.checkAllStroreStock(params).then((res) => {
          if (res.data.code === 0) {
            // 换货明细的商品换货数量小于可用库存，弹窗提示,否则执行保存操作
            if (!res.data.data) {
              _this.availableStockMassage = res.data.message;
              _this.availableStock = true;
              _this.isModalSave = true;
            } else {
              _this.save(params);
            }
          } else {
            const err = res.data.message || $it('modalTips.at'); // 可用库存查询失败!
            _this.$Message.error(err);
          }
        });
      } else {
        _this.save(params);
      }
    },
    // 保存接口
    async save(params) {
      // 防止多次触发
      const _this = this;
      // const { customizedModuleName } = this.$router.currentRoute.params;
      _this.loading = true;
      // this.$R3loading.show(customizedModuleName);
      _this.service.common.returnOrder(params).then((res) => {
        _this.availableStock = false;
        _this.isModalSave = false;
        _this.loading = false;
        this.$R3loading.hide(customizedModuleName);
        if (res.data.code === 0) {
          _this.$Message.success(res.data.message);
          $omsUtils.tabCloseAppoint(_this);
          commonUtils.navigateMain('-1', 'TabHref', 'RETURNGOOD', 'panel_label.ReturnOrderDetails')
          _this.$nextTick(() => {
            commonUtils.navigateMain(res.data.objid, 'TabOpen', 'RETURNGOOD', 'panel_label.ReturnOrderDetails', { statusName: res.data.RETURN_STATUS_NAME })
          });
        } else {
          const err = res.data.message || $it('modalTips.au'); // 新增退换货订单失败
          _this.$Message.error(err);
        }
      });
    },
    // 取消自动退款
    async cancelRefund() {
      const _this = this;
      if (this.$route.query.id == '-1') return;
      _this.service.orderCenter.cancelautorefund({ ID: _this.$route.query.id }).then((res) => {
        if (res.data.code == 0) {
          _this.$Message.success(res.data.message);
          _this.getList();
        } else {
          _this.$Message.error(res.data.message);
        }
      });
    },
    // 获取退款原因字段选项组
    async obtainWarehouse() {
      const _this = this;
      const fromdata = new FormData();
      fromdata.append('table', 'OC_B_RETURN_ORDER');
      fromdata.append('objid', -1);
      _this.service.common.getObject(fromdata).then((res) => {
        if (res.data.code == 0) {
          this.information.formData.forEach((value) => {
            // 退款原因
            if (value.label === $it('form_label.reasonRefund')) {
              let arr = [];
              res.data.data.addcolums.find((item) => item.parentdesc && item.parentdesc == $it('common.baseInformation'))
                .childs.forEach((item) => {
                  if (item.name == $it('form_label.reasonRefund')) {
                    arr = item.combobox;
                  }
                });
              for (let i = 0; i < arr.length; i++) {
                value.options.push({ value: arr[i].limitval, label: arr[i].limitdesc, });
              }
            }
          });
        } else {
          this.$Message.warning(res.data.message);
        }
      });
    },
    // 获取省份id
    getAddressId(provinceName, cityName, areaName) {
      const self = this;
      return self.service.orderCenter.queryResionByName({ provinceName, cityName, areaName, });
    },
    // 获取list模糊数据
    getData(search, index, type) {
      const self = this;
      const param = {
        isBlur: 'Y',
        isGift: 'Y',
        psCSku: {
          ECODE: search,
        },
      };
      if (!type) {
        param.isGift = 'Y';
      }
      if (search === '') {
        return;
      }
      this.service.common.skuQuery(param).then((res) => {
        if (res.data.code === 0 && index) {
          self.jordanTableConfig2.businessFormConfig.formData[1].AuotData = res.data.data.data.map((row) => ({
            ECODE: row.ECODE,
            PS_C_PRO_ENAME: row.PS_C_PRO_ENAME,
            SPEC: row.SPEC,
          }));
        }
      });
    },
    async entry(search, index) {
      // index 1 ==> 退货明细 2 ==> 换货明细 -- 去除退货明细20191217
      const self = this;
      if (!search || search === '') return;
      const qty = 1;
      const param = {
        shopId: this.shopId,
        isQuery: 'Y',
        isBlur: 'N',
        psCSku: {
          ECODE: search,
        },
      };
      this.service.common.skuQuery(param).then(async (res) => {
        if (res.data.code === 0) {
          let dataList = [];
          if (index === 2) {
            self.jordanTableConfig2.businessFormConfig.formValue.sku = '';
            dataList = self.jordanTableConfig2.data;
          }
          const lists = res.data.data.data || [];
          if (lists.length === 0) {
            this.$message.error($it('modalTips.g6')); // 不存在该条码！
            return;
          }
          const obj = lists.length > 0 ? lists[0] : {};
          obj.AVAILABLE_QTY = obj.availableQty || 0;
          obj.ID = -1; // 明细id
          obj.QTY_CAN_REFUND = qty; // 退货数量
          obj.QTY_REFUND = qty; // 退货数量
          obj.QTY_EXCHANGE = qty; // 换货数量
          obj.PS_C_SKU_ECODE = obj.ECODE; // 条码
          obj.BARCODE = obj.GBCODE; // 国际码
          // obj.PS_C_PRO_ECODE = obj.PS_C_PRO_ECODE; // 商品编码
          obj.PS_C_CLR_ID = obj.colorId; // 颜色
          obj.PS_C_CLR_ECODE = obj.colorCode;
          obj.PS_C_CLR_ENAME = obj.colorName;
          obj.PS_C_SIZE_ID = obj.sizeId; // 尺寸
          obj.PS_C_SIZE_ECODE = obj.sizeCode;
          obj.PS_C_SIZE_ENAME = obj.sizeName;
          // obj.PS_C_PRO_ENAME = obj.PS_C_PRO_ENAME; // 商品名称
          obj.SEX_NAME = obj.sexName;
          obj.SEX = obj.sex;
          obj.PRICE = obj.tagPrice; // 商品单价
          obj.AMT_REFUND = 0; // 退货金额
          obj.QTY_IN = 0; // 入库数量
          obj.SKU_SPEC = obj.SPEC; // 规格
          obj.amt_refund_single = 0; // 单件退货金额
          obj.PRODUCT_MARK = '正品'; // 商品标记
          obj.AMT_REFUND = 0; // 换货金额
          // await self.reconstructionGetDetail(obj, obj, obj.ECODE);
          await self.reconstructionGetDetail([obj], [obj.PS_C_PRO_ECODE]);
          // await self.reconstructionGetDetail()
          //  obj.ECODE
          // obj.clrList = obj.selected.psCSpec1objList;
          // obj.sizeList = obj.selected.psCSpec2objList;
          // 新增换货明细时判断退货明细中是否存在此商品编号
          // 存在 ==> 将退货明细中数据拿过来
          // 不存在 ==> 新增
          if (index == 2) {
            const x = JSON.parse(JSON.stringify(self.refundDtoList.data));
            const y = x.find((item) => item.ECODE === obj.ECODE || item.PS_C_SKU_ECODE === obj.ECODE);
            if (y) {
              // 如果退货明细中存在再判断换货明细中是否存在
              // 换货明细中存在 => 数量相加、金额计算
              // 不存在push进去PS_C_SKU_ECODE
              const j = JSON.parse(JSON.stringify(dataList));
              const i = j.find((item) => item.ECODE === obj.ECODE || item.PS_C_SKU_ECODE === obj.ECODE);
              if (i) {
                y.QTY_EXCHANGE = (parseInt(y.QTY_EXCHANGE) ? parseInt(y.QTY_EXCHANGE) : 0) + parseInt(obj.QTY_EXCHANGE);
                dataList = [...j];
                y.AMT_REFUND = $utils.accMul(y.QTY_EXCHANGE, obj.PRICE);
              } else {
                // 判断退货明细中是否有单件实际成交价
                // 有 => 单件实际成交价 * 数量
                // 无 => 吊牌价 * 数量
                y.AMT_REFUND = $utils.accMul((y.amtRefundSingle || true) ? obj.PRICE : y.amtRefundSingle, obj.QTY_EXCHANGE);
                // y.QTY_EXCHANGE = parseInt(obj.QTY_EXCHANGE);
                // dataList.push(y);
              }
            } else {
              // 退货明细中无此商品编码 再验证换货明细中是否存在
              // 存在    => 退货数量加
              // 不存在  => push进去
              const eData = dataList;
              const s = eData.find((item) => item.ECODE === obj.ECODE || item.PS_C_SKU_ECODE === obj.ECODE);

              if (s) {
                s.QTY_EXCHANGE = (parseInt(s.QTY_EXCHANGE) ? parseInt(s.QTY_EXCHANGE) : 0) + parseInt(obj.QTY_EXCHANGE);
                dataList = [...eData];
                s.AMT_REFUND = $utils.accMul(s.QTY_EXCHANGE, obj.PRICE);
              } else {
                dataList.push(obj);
                obj.AMT_REFUND = $utils.accMul(obj.QTY_EXCHANGE, obj.PRICE); // 换货金额
              }
            }
            dataList = dataList.map(em => {
              em.sizeList = this.sizeListArr
              em.clrList = this.clrListArr
              return em
            })
          } else {
            // 判断是否要新增一条明细=
            const data = dataList;
            const d = data.find((item) => item.ECODE === obj.ECODE || item.PS_C_SKU_ECODE === obj.ECODE);
            if (d) {
              d.QTY_CAN_REFUND =
                parseInt(d.QTY_CAN_REFUND) + parseInt(obj.QTY_CAN_REFUND);
              d.QTY_REFUND = parseInt(d.QTY_REFUND) + parseInt(obj.QTY_REFUND);
              d.QTY_EXCHANGE = (parseInt(d.QTY_EXCHANGE) ? parseInt(d.QTY_EXCHANGE) : 0) + parseInt(obj.QTY_EXCHANGE);
              dataList = [...data];
              d.AMT_REFUND = $utils.accMul(d.QTY_REFUND, d.PRICE); // 退货金额
              d.AMT_REFUND = $utils.accMul(d.QTY_EXCHANGE, d.PRICE); // 换货金额
            } else {
              dataList.push(obj);
              obj.AMT_REFUND = $utils.accMul(obj.QTY_REFUND, obj.PRICE); // 退货金额
              obj.AMT_REFUND = $utils.accMul(obj.QTY_EXCHANGE, obj.PRICE); // 换货金额
            }
          }
          if (index == 1) {
            // 1 退货明细 2 退换货明细
            dataList.forEach((item) => {
              item.AMT_REFUND = $utils.accMul(item.QTY_REFUND, item.PRICE);
            });
          }
          self[`${(index == 1) ? 'amountReturned' : 'exchangeAmount'}`] = self.calculateMoney(dataList, 1).toFixed(2);
          self.returnTotal();
          self.exchangeDtoList.data = dataList;
        }
      });
    },
    // 列表勾选
    returnOnSelect(e) {
      this.returnSelectData = e;
      if (e.length > 0) {
        this.amountReturned = this.calculateMoney(this.returnSelectData, 1).toFixed(2);
        this.returnTotal();
      }
    },
    // 取消勾选
    returnCancel(e) {
      this.returnSelectData = e;
      this.amountReturned = this.calculateMoney(e.length > 0 ? this.returnSelectData : this.refundDtoList.data, 1).toFixed(2);
      this.returnTotal();
    },
    // 列表全选
    returnSelectAll(e) {
      this.returnSelectData = e;
      if (e.length > 0) {
        this.amountReturned = this.calculateMoney(this.returnSelectData, 1).toFixed(2);
        this.returnTotal();
      }
    },
    // 取消全选
    returnSelectAllCancel(e) {
      this.returnSelectData = e;
      this.amountReturned = this.calculateMoney(this.refundDtoList.data, 1).toFixed(2);
      this.returnTotal();
    },
    // 列表勾选
    returnOnSelect2(e) {
      this.exchangeSelectData = e;
    },
    // 取消勾选
    returnCancel2(e) {
      this.exchangeSelectData = e;
    },
    // 列表全选
    returnSelectAll2(e) {
      this.exchangeSelectData = e;
    },
    // 取消全选
    returnSelectAllCancel2(e) {
      this.exchangeSelectData = e;
    },
    // 退货新增明细
    returnAddDetail() {
      this.returnDetailAddTable.modal = true;
    },
    // 退货删除明细
    returnDeleteDetail() {
      const _this = this;
      if (_this.exchangeSelectData.length ||= true) {
        _this.$Message.error($it('modalTips.aw')); // 请选择一条需要删除的明细!
      } else if (_this.returnSelectData.length > 1) {
        _this.$Message.error($it('modalTips.ax')); // 不允许批量删除明细!
      } else {
        const item = _this.jordanTableConfig.data;
        for (let i = 0; i < item.length; i++) {
          if (_this.returnSelectData[0]?.PS_C_SKU_ECODE && _this.returnSelectData[0].PS_C_SKU_ECODE === item[i].PS_C_SKU_ECODE) {
            _this.jordanTableConfig.data.splice(i, 1);
            // 新增明细列表填充
            _this.addSelection = this.addSelection.concat(_this.returnSelectData);
            _this.returnDetailAddTable.table.data = this.addSelection;
            _this.returnSelectData = [];
            _this.refundDtoList.data = _this.jordanTableConfig.data;
            _this.amountReturned = _this.calculateMoney(_this.refundDtoList.data, 1).toFixed(2);
            _this.returnTotal();
            _this.$Message.success($it('modalTips.ay')); // 删除成功
            return;
          }
        }
      }
    },
    // 换货删除明细
    returnDeleteDetail2() {
      const _this = this;
      if (_this.exchangeSelectData.length ||= true) {
        _this.$Message.error($it('modalTips.aw')); // 请选择一条需要删除的明细!
      } else if (_this.exchangeSelectData.length > 1) {
        _this.$Message.error($it('modalTips.ax')); // 不允许批量删除明细!
      } else {
        const item = _this.jordanTableConfig2.data;
        for (let i = 0; i < item.length; i++) {
          if (_this.exchangeSelectData[0]?.PS_C_SKU_ECODE && _this.exchangeSelectData[0].PS_C_SKU_ECODE === item[i].PS_C_SKU_ECODE) {
            _this.jordanTableConfig2.data.splice(i, 1);
            _this.exchangeSelectData = [];
            _this.exchangeDtoList.data = _this.jordanTableConfig2.data;
            _this.exchangeAmount = _this.calculateMoney(_this.exchangeDtoList.data, 2).toFixed(2);
            _this.returnTotal();
            _this.$Message.success($it('modalTips.ay')); // 删除成功
            return;
          }
        }
      }
    },
    // 查询原始订单编号
    async queryBounced(num) {
      //  获取页面数据
      const _this = this;
      const lists = _this.order.orderform.formValue;
      if ((lists.ID ||= true) && (lists.BILL_NO ||= true) && (lists.source_code ||= true) && (lists.receiver_name || true) &&
        (lists.user_nick || true) && (lists.receiver_mobile || true) && (lists.cp_c_store_ename || true) && num == undefined) {
        _this.$Message.error($it('modalTips.i8')); // 请输入查询条件！
        return;
      }
      _this.order.table.loading = true;
      const fromdata = new FormData();
      const param = {
        IS_UN_GZIP: true,
        page: {
          pageSize: '500',
          pageNum: '1',
        },
        highSearch: [
          {
            type: 'Select',
            queryName: 'ID',
            value: num || lists.ID,
          },
          {
            type: 'Input',
            queryName: 'BILL_NO',
            value: lists.BILL_NO,
          },
          {
            type: 'Input',
            queryName: 'SOURCE_CODE',
            value: lists.source_code,
          },
          {
            type: 'Input',
            queryName: 'RECEIVER_NAME',
            value: lists.receiver_name,
          },
          {
            type: 'Input',
            queryName: 'USER_NICK',
            value: lists.user_nick,
          },
          {
            type: 'Input',
            queryName: 'RECEIVER_MOBILE',
            value: lists.receiver_mobile,
          },
          {
            type: 'Select',
            queryName: 'CP_C_SHOP_ID',
            value: lists.cp_c_store_id,
          },
          // {
          //   type: 'Select',
          //   queryName: 'ID',
          //   value: num
          // },
          {
            type: 'Select',
            queryName: 'ORDER_STATUS',
            value: '5,6,12',
          },
        ],
        detailType: 2, // 退换货订单使用
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.common.queryOrderList(fromdata).then((res) => {
        if (res.data.data) {
          res.data.data.queryOrderResultList.forEach((item) => {
            item.USER_NICK = `${item.USER_NICK}(${item.CP_C_SHOP_TITLE})`;
          });
          _this.order.table.data = res.data.data.queryOrderResultList;
        } else {
          _this.order.table.data = [];
          _this.information.formValue.ORIG_ORDER_ID = '';
        }
        if (num) {
          _this.queryorder(_this.order.table.data, 1);
        }
      })
        .catch((err) => {
          _this.$Message.info(err.message);
          _this.information.formValue.ORIG_ORDER_ID = '';
        })
        .finally(() => {
          _this.order.table.loading = false;
        });
    },
    // 查询原始订单编号回车事件
    queryEnter() {
      if (this.information.formValue.ORIG_ORDER_ID === '') {
        this.assignment('');
        this.refundDtoList.data = [];
        this.exchangeDtoList.data = [];
        this.jordanTableConfig.data = [];
        this.addSelection = [];
        this.returnDetailAddTable.table.data = this.addSelection;
        this.amountReturned = null; // 商品退回金额
        this.returnPostage = 0; // 应退邮费
        this.otherAmount = 0; // 其他金额
        this.exchangeAmount = null; // 换货金额
        this.returnTotalAmount = null; // 退货单总金额
        this.settlementAmount = 0; // 代销结算金额
        this.information.formValue.BILL_TYPE = 0;
      } else {
        this.queryBounced(this.information.formValue.ORIG_ORDER_ID);
      }
    },
    // 查询原始平台单号回车事件
    async querySourceEnter() {
      const _this = this;
      const fromdata = new FormData();
      const param = {
        page: {
          pageSize: '10000',
          pageNum: '1',
        },
        queryInfo: [
          {
            type: 'Input',
            displayName: $it('form_label.platform_billNo'), // 平台单号
            queryName: 'SOURCE_CODE',
            value: this.information.formValue.ORIG_SOURCE_CODE,
            list: [],
          },
        ],
        highSearch: [
          {
            type: 'Select',
            queryName: 'ORDER_STATUS',
            value: '5,6,12',
          },
        ],
        detailType: 2, // 退换货订单使用
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.orderCenter.getOrderList(fromdata).then((res) => {
        if (res.data.data.queryOrderResultList.length != 1) {
          // 原始平台单号存在多条记录，请用订单编号查询！
          _this.$Message.error($it('modalTips.az'));
          return;
        }
        if (res.data.code == 0) {
          _this.order.table.data = res.data.data.queryOrderResultList;
          _this.queryorder(_this.order.table.data);
        } else {
          const err = res.data.message || $it('modalTips.ba'); // 未查询到数据！
          _this.$Message.error(err);
        }
      })
        .catch((err) => {
          _this.$Message.info(err.message);
        });
    },
    // 确定原始订单编号
    async queryorder(listData, isEnter) {
      const _this = this;
      // 判断是否为回车精确查询
      if (isEnter) {
        if (!listData.length) {
          _this.$Message.warning($it('modalTips.bb')); // 查询不到数据！
          return;
        }
      } else if (!this.onSelectData.length) {
        _this.$Message.warning($it('modalTips.bc')); // 请选择一条数据！
        return;
      }
      if (listData) { this.onSelectData = listData; }
      // 解密()
      let objid = this.onSelectData[0].ID;
      let searchdata = {
        ID: objid,
        isShowPii: true,
      }
      let decryptData = {};
      await this.$network.post('/api/cs/oc/oms/v1/getDetail', searchdata).then(res => {
        if (res.data.code === 0) {
          let resData = res.data.data;
          this.shopId = resData.CP_C_SHOP_ID;
          decryptData.RECEIVER_NAME = resData.RECEIVER_NAME; // 收货人姓名
          decryptData.RECEIVER_MOBILE = resData.RECEIVER_MOBILE; // 收货人手机
          decryptData.RECEIVER_ADDRESS = resData.RECEIVER_ADDRESS; // 收货人地址
        }
      })
      this.information.formData.forEach((list) => {
        // 退回物流公司
        if (list.style === 'popInput' && list.itemdata.name === $it('form_label.returnLogisticsCompany')) {
          list.itemdata.pid = this.onSelectData[0].CP_C_LOGISTICS_ID;
          list.itemdata.valuedata = this.onSelectData[0].CP_C_LOGISTICS_ENAME;
        } else if (list.style === 'popInput' && list.itemdata.name === '入库实体仓库') {
          list.itemdata.pid = this.onSelectData[0].CP_C_WAREHOUSE_EXCHANGE_ID;
          list.itemdata.valuedata = this.onSelectData[0].CP_C_WAREHOUSE_EXCHANGE_NAME;
        }
      });
      this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = this.onSelectData[0].CP_C_WAREHOUSE_EXCHANGE_ID;
      this.information.formValue.CP_C_LOGISTICS_ID = this.onSelectData[0].CP_C_LOGISTICS_ID;
      this.information.formValue.CP_C_LOGISTICS_ENAME = this.onSelectData[0].CP_C_LOGISTICS_ENAME;
      this.information.formValue.SELLER_MEMO = this.onSelectData[0].SELLER_MEMO;
      const replace = _this.replacement.formValue;
      this.tId = this.onSelectData[0].TID;
      this.warehouseId = this.onSelectData[0].CP_C_PHY_WAREHOUSE_ID || '';// 发货仓库id
      _this.information.formData[14].itemdata.pid = this.warehouseId;
      _this.information.formData[14].itemdata.valuedata = this.onSelectData[0].CP_C_PHY_WAREHOUSE_ENAME;
      _this.information.formValue.CP_C_PHY_WAREHOUSE_ID = this.warehouseId;
      if (_this.information.formValue.IS_BACK) {
        // 勾选是否原退时入库实体仓从发货实体仓带出
        const phy = _this.information.formData[13].itemdata;
        const phyIn = _this.information.formData[14].itemdata;

        phy.pid = phyIn.pid;
        phy.valuedata = phyIn.valuedata;
        _this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = phyIn.pid;
      }
      this.information.formValue.ORIG_ORDER_ID = this.onSelectData[0].ID; // 编号
      this.information.formValue.BILL_NO = this.onSelectData[0].BILL_NO; // 单据编号
      this.information.formValue.BUYER_NICK = this.onSelectData[0].USER_NICK;
      this.information.formValue.ORIG_SOURCE_CODE = this.onSelectData[0].SOURCE_CODE;
      this.information.formValue.CP_C_SHOP_TITLE = this.onSelectData[0].CP_C_SHOP_TITLE;
      this.information.formValue.CP_C_SHOP_ID = this.onSelectData[0].CP_C_SHOP_ID;
      this.replacement.formValue.RECEIVE_ADDRESS = decryptData.RECEIVER_ADDRESS || this.onSelectData[0].RECEIVER_ADDRESS; // 收货人地址
      this.replacement.formValue.RECEIVE_NAME = decryptData.RECEIVER_NAME || this.onSelectData[0].RECEIVER_NAME; // 收货人姓名
      this.replacement.formValue.RECEIVE_MOBILE = decryptData.RECEIVER_MOBILE || this.onSelectData[0].RECEIVER_MOBILE; // 收货人电话
      this.settlementAmount = this.onSelectData[0].CONSIGN_AMT; // 代销结算金额
      replace.PLATFORM = this.onSelectData[0].PLATFORM; // 平台
      replace.orde_source = this.onSelectData[0].ORDER_SOURCE; // 订单来源
      replace.receiver_province_id = this.onSelectData[0].CP_C_REGION_PROVINCE_ID; // 省id
      replace.receiver_province_name = this.onSelectData[0].CP_C_REGION_PROVINCE_ENAME; // 收货人省份
      replace.receiver_city_id = this.onSelectData[0].CP_C_REGION_CITY_ID; // 收货人市id
      replace.receiver_city_name = this.onSelectData[0].CP_C_REGION_CITY_ENAME; // 收货人市
      replace.receiver_area_id = this.onSelectData[0].CP_C_REGION_AREA_ID; // 收货人县id
      replace.receiver_area_name = this.onSelectData[0].CP_C_REGION_AREA_ENAME; // 收货人县
      // 展示
      this.information.formData[5].itemdata.valuedata = this.onSelectData[0].CP_C_SHOP_TITLE; // 店铺名称
      this.replacement.formData[5].itemdata.valuedata = this.onSelectData[0].CP_C_REGION_PROVINCE_ENAME; // 省
      this.replacement.formData[6].itemdata.valuedata = this.onSelectData[0].CP_C_REGION_CITY_ENAME; // 市
      this.replacement.formData[7].itemdata.valuedata = this.onSelectData[0].CP_C_REGION_AREA_ENAME; // 区
      this.information.formData.forEach((item) => {
        // 是否原退
        if (item.label === $it('form_label.whether_returned') && this.information.formValue.IS_BACK) {
          this.information.formValue.LOGISTICS_CODE = _this.onSelectData[0].EXPRESSCODE;
        }
      });
      const queryList = [];
      _this.addSelection = [];
      _this.returnDetailAddTable.table.data = _this.addSelection;
      for await (const selection of this.onSelectData[0].QUERYORDERITEMRESULTLIST) {
        // const selection = this.onSelectData[0].QUERYORDERITEMRESULTLIST[i];
        if (selection.refundStatus !== 6) {
          const queryListItem = {};
          queryListItem.ID = -1;
          queryListItem.oOId = selection.oOId;
          queryListItem.OC_B_ORDER_ITEM_ID = selection.proId;
          queryListItem.skuId = selection.skuId;
          queryListItem.PS_C_PRO_ID = selection.psCproId; // 商品id
          queryListItem.PS_C_SKU_ECODE = selection.skuEcode;
          queryListItem.BARCODE = selection.barCode;
          queryListItem.PS_C_PRO_ECODE = selection.ecode; // 商品编码
          queryListItem.PS_C_CLR_ECODE = selection.clrsEcode; // 颜色
          queryListItem.PS_C_CLR_ID = selection.clrsId;
          queryListItem.PS_C_CLR_ENAME = selection.clrs;
          queryListItem.PS_C_SIZE_ID = selection.sizeId; // 尺寸
          queryListItem.PS_C_SIZE_ECODE = selection.sizeEcode;
          queryListItem.PS_C_SIZE_ENAME = selection.sizes;
          queryListItem.PS_C_PRO_ENAME = selection.proEname;
          queryListItem.QTY_CAN_REFUND = selection.qty;
          queryListItem.QTY_REFUND = selection.qty - selection.QTY_RETURN_APPLY;
          queryListItem.QTY_EXCHANGE = selection.qty;
          queryListItem.SEX_NAME = selection.sexName;
          queryListItem.SEX = selection.sex;
          queryListItem.PRICE = selection.priceList; // 吊牌价
          queryListItem.SKU_SPEC = selection.skuSpec; // 原单带出的规格
          queryListItem.AMT_REFUND = $utils.accMul(selection.qty, selection.amtRefundSingle).toFixed(2); // 退货金额realAmt
          // queryList[i].AMT_REFUND = queryList[i].realAmt ? $utils.accMul(queryList[i].amtRefundSingle, queryList[i].qty) : $utils.accMul(queryList[i].price, queryList[i].qty); // 退货金额
          queryListItem.QTY_IN = 0;
          queryListItem.PRODUCT_MARK = '正品';
          queryListItem.amtRefundSingle = selection.amtRefundSingle;
          queryListItem.amt_refund_single = selection.amtRefundSingle;
          queryListItem.PRICE_SETTLE = selection.priceSettle;
          queryListItem.AMT_SETTLE_TOT = selection.totPriceSettle;
          await _this.reconstructionGetDetail(selection, queryListItem, selection.ecode);
          queryList.push(queryListItem);
        }
      }
      this.jordanTableConfig.data = queryList;
      this.refundDtoList.data = this.jordanTableConfig.data;
      this.amountReturned = this.calculateMoney(this.jordanTableConfig.data, 1).toFixed(2);
      this.returnTotal();
      this.order.modal = false;
    },
    // 取消
    querycancel() { },
    // 原始订单勾选
    onquerySelect(e) {
      // console.log(e.length);
      if (e.length != 1) {
        // 只能选择一条订单记录
        this.$Message.info($it('modalTips.b'));
        return;
      }
      this.onSelectData = e;
    },
    // 原始订单取消勾选
    onqueryCancel(e) {
      this.onSelectData = e;
    },
    // 原始订单全选
    onSelectAll(e) {
      this.onSelectData = e;
    },
    // 原始订单取消全选
    onSelectAllCancel(e) {
      this.onSelectData = e;
    },
    // 矩阵添加
    enterQuerySave(val, type) {
      const _this = this;
      if (type == 1 && val.length) {
        if (_this.jordanTableConfig.data.length) {
          val.forEach((item) => {
            const d = _this.jordanTableConfig.data.find((list) => list.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE);
            if (d) {
              val.forEach((data) => {
                if (data.PS_C_SKU_ECODE === d.PS_C_SKU_ECODE) {
                  d.QTY_REFUND = parseInt(d.QTY_REFUND) + parseInt(data.QTY_REFUND);
                  d.QTY_EXCHANGE = parseInt(d.QTY_EXCHANGE) + parseInt(data.QTY_EXCHANGE);
                  d.QTY_CAN_REFUND = parseInt(d.QTY_CAN_REFUND) + parseInt(data.QTY_CAN_REFUND);

                  d.AMT_REFUND = $utils.accMul(d.QTY_REFUND, d.PRICE);
                }
              });
            } else {
              const arr = [];
              arr.push(item);
              _this.refundDtoList.data = _this.refundDtoList.data.concat(arr);
              _this.jordanTableConfig.data = _this.jordanTableConfig.data.concat(arr);
            }
          });
        } else {
          _this.jordanTableConfig.data = _this.jordanTableConfig.data.concat(val);
          _this.refundDtoList.data = _this.refundDtoList.data.concat(val);
        }
        _this.refundDtoList.data = _this.jordanTableConfig.data;
        _this.amountReturned = _this.calculateMoney(_this.jordanTableConfig.data, 1).toFixed(2);
        _this.returnTotal();
        _this.jordanTableConfig.businessFormConfig.formValue.gbCode = '';
      } else {
        val.forEach(em => {
          em.clrList = _this.clrListArr;
          em.sizeList = _this.sizeListArr;
        })
        if (_this.jordanTableConfig2.data.length) {
          val.forEach((item) => {
            const d = _this.jordanTableConfig2.data.find((list) => list.PS_C_SKU_ECODE === item.PS_C_SKU_ECODE);
            if (d) {
              val.forEach((data) => {
                if (data.PS_C_SKU_ECODE === d.PS_C_SKU_ECODE) {
                  d.QTY_EXCHANGE = parseInt(d.QTY_EXCHANGE) + parseInt(data.QTY_EXCHANGE);
                  d.AMT_REFUND = $utils.accMul(d.QTY_EXCHANGE, d.PRICE);
                }
              });
            } else {
              const arr = [];
              arr.push(item);
              _this.exchangeDtoList.data = _this.exchangeDtoList.data.concat(arr);
              _this.jordanTableConfig2.data = _this.jordanTableConfig2.data.concat(arr);
            }
          });
        } else {
          _this.jordanTableConfig2.data = _this.jordanTableConfig2.data.concat(val);
          _this.exchangeDtoList.data = _this.exchangeDtoList.data.concat(val);
        }
        _this.exchangeDtoList.data = _this.jordanTableConfig2.data;
        _this.exchangeAmount = _this.calculateMoney(_this.jordanTableConfig2.data, 1).toFixed(2);
        _this.returnTotal();
        _this.jordanTableConfig2.businessFormConfig.formValue.gbCode = '';
      }
      _this.$children.find((item) => item.name === 'matrixBox').closeConfirm();
    },
    oneObjs(e) {
      const _this = this;
      _this.information.formData.forEach((item) => {
        if (item.itemdata) {
          // 店铺名称
          if (item.itemdata.name == e.name) {
            switch (item.itemdata.name) {
              case $it('table_label.shopName'):
                this.information.formValue.CP_C_SHOP_ID = item.itemdata.pid;
                this.information.formValue.CP_C_SHOP_TITLE = item.itemdata.valuedata;
                break;
              case $it('form_label.returnLogisticsCompany'):
                this.information.formValue.CP_C_LOGISTICS_ID = item.itemdata.pid;
                this.information.formValue.CP_C_LOGISTICS_ENAME = item.itemdata.valuedata;
                break;
              case $it('form_label.warehousingEntity'):
                this.information.formValue.CP_C_PHY_WAREHOUSE_IN_ID = item.itemdata.pid;
                break;
              case $it('form_label.shipPhysicalWarehouse'):
                this.information.formValue.CP_C_PHY_WAREHOUSE_ID = item.itemdata.pid;
                break;
            }
          }
        }
      });
    },
    twoObjs(e) {
      const _this = this;
      _this.replacement.formData.forEach((item) => {
        if (item.itemdata) {
          // 收货人省份
          if (item.itemdata.name == $it('form_label.consignee_province') && item.itemdata.name == e.name) {
            this.replacement.formValue.receiver_province_id = item.itemdata.pid;
            this.replacement.formValue.receiver_province_name = item.itemdata.valuedata;
          } else if (item.itemdata.name == $it('form_label.consignee_city') && item.itemdata.name == e.name) {
            // 收货人市
            this.replacement.formValue.receiver_city_id = item.itemdata.pid;
            this.replacement.formValue.receiver_city_name = item.itemdata.valuedata;
          } else if (
            item.itemdata.name == $it('form_label.aconsignee_area') && item.itemdata.name == e.name
          ) {
            // 收货人区
            this.replacement.formValue.receiver_area_id = item.itemdata.pid;
            this.replacement.formValue.receiver_area_name = item.itemdata.valuedata;
          }
        }
      });
    },
    threeObjs() {
      const _this = this;
      _this.order.orderform.formData.forEach((item) => {
        if (item.itemdata) {
          switch (item.itemdata.name) {
            case '店铺名称':
              this.order.orderform.formValue.cp_c_store_id = item.itemdata.pid;
              this.order.orderform.formValue.cp_c_store_ename = item.itemdata.valuedata;
              break;
          }
        }
      });
    },
    // 退换货下拉切换
    selectSelectt() {
      if (this.information.formValue.BILL_TYPE === '2') {
        this.labelList[1].isShow = true;
        this.openDefault = ['1'];
        this.replacement.ruleValidate = {
          RECEIVE_NAME: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVE_MOBILE: [{ required: true, message: ' ', trigger: 'blur' }],
          RECEIVE_ADDRESS: [{ required: true, message: ' ', trigger: 'blur' }],
        };
        this.replacement.formData[5].itemdata.isnotnull = true;
        this.replacement.formData[6].itemdata.isnotnull = true;
        this.information.formData[10].style = 'checkbox';
        this.information.formData[11].style = '';

        // 切换选项且重新赋予表单权限
        this.$nextTick(() => {
          this.getDataAccess('OC_B_RETURN_ORDER', (res) => {
            // 退换货订单-基础信息
            this.information.formData.forEach((parent) => {
              res.SENSITIVE_COLUMNS.forEach((child) => {
                if (parent.dataAcessKey == child.ecode) {
                  let msg = (this.$route.query.id === '-1') ? 'add' : 'detail';
                  this.setFormPermissions(parent, child, msg);
                }
              });
            });
          });
        });
      } else {
        this.labelList[1].isShow = false;
        this.DefaultValue = '1';
        this.openDefault = ['1'];
        this.labelClick({}, 0);
        this.exchangeDtoList.data = [];
        this.replacement.ruleValidate = {
          RECEIVE_NAME: [{ required: false, message: ' ', trigger: 'blur' }],
          RECEIVE_MOBILE: [{ required: false, message: ' ', trigger: 'blur' }],
          RECEIVE_ADDRESS: [{ required: false, message: ' ', trigger: 'blur' }],
        };
        this.replacement.formData[5].itemdata.isnotnull = false;
        this.replacement.formData[6].itemdata.isnotnull = false;
        this.information.formData[10].style = '';
        this.information.formData[11].style = '';
      }
    },
    cancalModal() {
      const self = this;
      self.availableStock = false;
      self.isModalSave = false;
    },
    returnDetailAddOnCancel(selection, row) {
      const selectArr = this.addReturnDetailSelectArr;
      for (let j = 0, len = selectArr.length; j < len; j++) {
        if (selectArr[j] === row.PS_C_SKU_ECODE) {
          selectArr.splice(j, 1);
        }
      }
    },
    returnDetailAddOnSelect(selection, row) {
      this.addReturnDetailSelectArr.push(row.PS_C_SKU_ECODE);
    },
    returnDetailAddOnSelectAllCancel() {
      this.addReturnDetailSelectArr = [];
    }, // 全选勾选事件
    returnDetailAddOnSelectAll() {
      const self = this;
      self.returnDetailAddTable.table.data.forEach((item) => {
        this.addReturnDetailSelectArr.push(item.PS_C_SKU_ECODE);
      });
    }, // 全选选中事件
    detailAddCancel() { },
    resetReturnMainTable() {
      const selectArr = this.addReturnDetailSelectArr;
      const tableArr = this.returnDetailAddTable.table.data;

      // 确认后删除明细对应记录
      const selection = tableArr.filter((item) => {
        if (selectArr.includes(item.PS_C_SKU_ECODE)) {
          return item;
        }
      });
      // 重置选中记录
      this.addReturnDetailSelectArr = [];
      // 新增明细表单回填记录
      this.enterQuerySave(selection, '1');
    },

    /* async reconstructionGetDetail(item, returnItem, ecode = '') {
      // 重构明细拉取请求, 由于项目时间比较紧, 目前只修改了部分接口, 老接口结构保持不变;
      if (ecode != '') {
        await this.getDataByProinfo(ecode, 1);
      }
      returnItem.clrList = ecode != '' ? this.clrListArr : item.selected.psCSpec1objList;
      returnItem.sizeList = ecode != '' ? this.sizeListArr : item.selected.psCSpec2objList;
      // return returnItem;
    }, */
    async reconstructionGetDetail(list, ecodeList) {
      if (ecodeList) {
        await this.getDataByProinfo(ecodeList, 1);
        if (Array.isArray(list)) {
          if (this.labelDefaultValue === 1) { //退货明细
            list.forEach(item => {
              const name = item.PS_C_PRO_ECODE || item.ECODE || item.ecode;
              item.clrList = this.detailSelectOptions[name].psCSpec1objList;
              item.sizeList = this.detailSelectOptions[name].psCSpec2objList;
            });
          }
        } else {
          // 退换货明细同时调用
          for (let key in list) {
            const listItem = list[key];
            listItem.forEach(item => {
              const name = item.PS_C_PRO_ECODE || item.ECODE;
              item.clrList = this.detailSelectOptions[name].psCSpec1objList;
              item.sizeList = this.detailSelectOptions[name].psCSpec2objList;
            });
          }
        }
      } else {
        list.forEach(item => {
          item.clrList = item.selected.psCSpec1objList;
          item.sizeList = item.selected.psCSpec2objList;
        });
      }
    },
    async getDataByProinfo(proEcode, dataType, sizeId, clrId) {
      const _this = this;
      let param = {
        proCodeList: proEcode
      };
      if (sizeId && clrId) {
        param = { proEcode, clrId, sizeId, };
      }
      let url = (sizeId && clrId) ? '/p/cs/extInfoQuery' : '/p/cs/queryColorAndSize'
      const formdata = new FormData();
      formdata.append('param', JSON.stringify(param));
      await this.$network.post(url, formdata).then(res => {
        let resData = res.data.data;
        if (dataType === 1) {
          if (this.labelDefaultValue === 1) {
            this.detailSelectOptions = resData;
          } else {
            // if(this.ECODE !== ''){
            //   _this.clrListArr = res.data.data[this.ECODE].psCSpec1objList;
            //   _this.sizeListArr = res.data.data[this.ECODE].psCSpec2objList;
            // }else{
            _this.clrListArr = res.data.data[proEcode].psCSpec1objList;
            _this.sizeListArr = res.data.data[proEcode].psCSpec2objList;
            // }
          }
        } else if (res.data.code === 0) {
          _this.itemSkuEcode = res.data.data.ecode;
          _this.itemSkuId = res.data.data.skuId;
          _this.itemGbcode = res.data.data.gbcode;
        } else {
          _this.itemSkuEcode = '';
          _this.itemSkuId = '';
          _this.itemGbcode = '';
        }
      });
    },
  },
};
