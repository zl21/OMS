import CusOrderItem from 'allpages/orderCenter/orderManageDetail/details/custOrderItem';
// import publicDialogConfig from 'professionalComponents/common/js/publicDialog.js';
import DialogConfig from 'burgeonConfig/config/dialogs.config';
let val = false;

export default {
  name: 'EssentialInfo',
  props: {
    componentData: {}
  },
  components: {
    CusOrderItem
  },
  data() {
    return {
      dialogs: DialogConfig.config(),
      publicBouncedConfig: {},
      isQh: true,
      isQhChild: true,
      dialogs: {
        addGift: {
          title: '添加赠品',
          titleAlign: 'center',
          data: {},
          url: 'modal/orderCenter/addGiftItem',
          name: 'addGiftDialog',
          keepAlive: true,
          width: 600,
          excludeString: 'addGiftDialog',
          footerHide: true,
        },
        changeSku: {
          title: '替换商品',
          titleAlign: 'center',
          data: {},
          url: 'order/changeProduct',
          width: 800,
          keepAlive: true,
          name: 'changeSkuDialog',
          excludeString: 'changeSkuDialog',
          footerHide: true,
        }
      },
      queryList: [
        {
          width: '6',
          column: 'SOURCE_CODE',
          label: $it('tL.platform_orderNo') + ':', // 平台单号 输入框前文字
        },
        {
          column: 'BILL_NO',
          label: $it('fL.billNo') + ':', //'单据编号:'
        },
        // {
        //   flag: false, // 是否需要加 *
        //   column: 'MERGE_SOURCE_CODE', // 字段
        //   type: 'select', // 类型
        //   label: '合并平台单号:' // 标签
        // },
        {
          flag: false, // 是否需要加 *
          column: 'MERGE_SOURCE_CODE', // 字段
          type: 'select', // 类型
          label: '平台编号:' // 标签
        },        
        {
          flag: false,
          column: 'PLATFORM_STATUS_NAME',
          label: '平台状态'
        },
        {
          flag: false, // 需要加*
          column: 'CP_C_SHOP_TITLE',
          label: '下单店铺:'
        },
        {
          flag: false,
          width: '6',
          column: 'ORDER_TYPE',
          label: $it('fL.billType') + ':', // 单据类型
        },
        {
          flag: false,
          width: '6',
          column: 'PLATFORM_STATUS',
          label: $it('fL.e8') + ':' //平台状态
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CP_C_PHY_WAREHOUSE_ENAME', //
          label: $it('fL.delivery_warehouse') + ':' //发货仓库
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CP_C_LOGISTICS_ENAME', //
          label: $it('fL.logisticsCompany') + ':' //物流公司
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'EXPRESS_CODE',
          label: $it('fL.logisticsOrder_No') + ':' // 物流单号
        },
        {
          flag: false, // 需要加*
          column: 'EXPRESSCODE',
          label: '物流单号:'
        },
        {
          flag: false, // 需要加*
          column: 'WEIGHT',
          label: '商品重量(KG):'
        },
        {
          flag: false, // 需要加*
          column: 'IS_SELF_TAKE_NAME',
          label: '是否自提:'
        },
        // {
        //   flag: false, //需要加*
        //   column: "TO_SETTLE_STATUS_TAG",
        //   label: "是否传SAP:"
        // },
        // {
        //   flag: false, // 需要加*
        //   column: 'TO_SETTLE_STATUS_NAME',
        //   label: '传SAP状态:'
        // },
        {
          flag: false, // 需要加*
          column: 'ORDER_TYPE_NAME',
          label: '单据类型:'
        },
        {
          flag: false,
          width: '12',
          column: 'BUYER_MESSAGE',
          label: $it('fL.buyerNotes') + ':', // 买家备注
        },
        {
          flag: false,
          width: '12',
          column: 'SELLER_MEMO',
          label: $it('fL.sellerNotes') + ':', // 卖家备注
        },
        {
          flag: false, // 需要加*
          column: 'DELIVERY_STORE_NAME',
          label: '发货门店名称:'
        },
        {
          flag: false, // 需要加*
          column: 'DELIVERY_STORE_CODE',
          label: '发货门店编码:'
        },
        {
          flag: false, // 需要加*
          column: 'SG_B_OUT_BILL_NO',
          label: '出库通知单:'
        }
      ],
      detail: [
        {
          flag: false,
          column: 'RECEIVER_NAME',
          label: $it('fL.consignee') + ':'//收货人
        },
        {
          flag: false, // 需要加*
          width: '12',
          column: 'BUYER_NICK',
          label: $it('tL.buyerNickname') + ':', // 买家昵称
        },
        {
          flag: false,
          column: 'RECEIVER_MOBILE',
          label: $it('fL.consignee_phone') + ':', // 收货人手机号
        },
        {
          flag: false,
          column: 'RECEIVER_PHONE',
          label: $it('fL.e6') + ':', // 收货人电话
        },
        {
          flag: false,
          column: 'CP_C_REGION_PROVINCE_ENAME',
          label: $it('fL.aa') + ':'  //省市区
        },
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_ZIP',
          label: $it('fL.e7') + ':', // 收货人邮编
        },
        {
          flag: false,
          width: '24',
          column: 'RECEIVER_ADDRESS',
          label: $it('fL.ab') + ':' // 详细地址
        },
        {
          flag: false,
          column: 'SHIP_AMT',
          label: '邮费:'
        },
        {
          flag: false,
          width: 2,
          column: 'RECEIVER_ADDRESS',
          label: '收货人地址:'
        }
      ],
      tableConfig: {
        tablename: 'OC_B_ORDER_ITEM',
        order: {},
        options: {
          cols: {
            A: {
              fun: () => {
              }
            }
          }
        },
        objid: -1
      },
    };
  },
  watch: {
    componentData: {
      handler(newobj, oldobj) {
        this.tableConfig.objid = newobj.order.ID;
        this.tableConfig.order = newobj.order;
      },
      deep: true
    }
  },
  methods: {
    eyeClick() {
      val = !val;
      this.$emit('freshLoad', val);
    },
    isQhMethod(data) {
      this.isQhChild = data;
    },
    checkCombination() {
      const self = this;
      self.isQh = !self.isQh;
      self.$refs.cusOrderItem.checkCombination();
      // console.log(self.$refs.cusOrderItem)
    },
    freshLoadChild() {
      this.$emit('freshLoad');
    },
    colStretch(obj) {
      const col = obj.width;
      if (col === 2) {
        return 'colsTwo';
      } 
      return '';
    },
    // 子组件点击按钮事件通知
    BtnClickEvent(obj) {
      const name = obj.name || '';
      const rows = obj.rows || [];
      switch (name) {
        case 'ADDGIFT':
          this.dialogs.addGift.data = { objid: this.componentData.order.ID || -1 };
          this.$refs.addGiftDialog[0].openConfirm();
          break;
        case 'CHANGESKU':
          // 判断是否有选中明细
          if (rows.length === 0) return this.$Message.error('请选择需要更换商品记录！');
          if (rows.length > 1) return this.$Message.error('只能选择一条商品记录！');
          const itemobjid = rows[0].ID;
          const itemskuid = rows[0].SKU_ID;
          this.dialogs.changeSku.data = { itemobjid, itemskuid, objid: this.componentData.order.ID || -1 };
          this.$refs.changeSkuDialog[0].openConfirm();
          break;
      }
    },
    // 详情按钮替换商品弹框
    replaceGoodsDetail(itemData) {
      this.dialogs.changeSku.data = {
        orderList: [{
          orderId: this.componentData.order.ID,
          billNo: this.componentData.order.BILL_NO
        }],
        oldSuk: itemData[0].PS_C_SKU_ECODE,
        spuIds: itemData.map(row => row.ID)
      };
      this.dialogsConfig = this.dialogs.changeSku;
      setTimeout(() => {
        this.$children.find(item => item.name === 'changeSkuDialog').openConfirm();
      }, 100);
    },
    // 修改地址
    modifyAddress() {
      // '待审核','缺货'
      if (![$it('com.toBeReviewed'), $it('other.outOfStock')].includes(this.componentData.order.ORDER_STATUS)) {
        this.$Message.error($it('tip.fq')); //订单状态不满足，不允许修改地址！
        return false;
      }
      this.dialogs.address.data = this.componentData.order;
      this.dialogsConfig = this.dialogs.address;
      setTimeout(() => {
        self.$children
          .find(item => item.name === 'replaceGoodsDetail')
          .openConfirm();
      }, 100);
    },
  },
  mounted() {
    this.tableConfig.objid = this.componentData.order.ID || -1;
    this.tableConfig.order = this.componentData.order || {};
  },
  created() {

  }
};
