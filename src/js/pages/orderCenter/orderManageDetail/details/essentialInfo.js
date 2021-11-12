
import CusOrderItem from 'allpages/orderCenter/orderManageDetail/details/custOrderItem.vue';
import DialogConfig from 'burgeonConfig/config/dialogs.config';
import goodsTotalAmount from 'allpages/orderCenter/orderManageDetail/details/goodsTotalAmount.vue';

export default {
  name: 'EssentialInfo',
  props: {
    componentData: {}
  },
  components: {
    CusOrderItem,
    goodsTotalAmount
  },

  // 正常：#90BB57
  // 换货：#ffae34
  // 补发：#5461B8
  // 虚拟：#99c2f1
  // 预售：#a375c1

  // 等待买家付款#ffae34
  // 等待卖家发货#ff6951
  // 等待买家确认收货#99c2f1
  // 卖家部分发货#a375c1
  // 交易完成#90BB57

  data() {
    return {
      orderTypeClass: '',
      platformStatusClass: '',
      butArray1: [],
      vmI18n: $i18n,
      isQh: true,
      isQhChild: true,
      is_combination: false, // 是否为组合
      dialogs: DialogConfig.config(), // dialog配置组合
      dialogsConfig: {}, //当前展示的dialog配置项
      queryList: [
        {
          width: '6',
          column: 'SOURCE_CODE',
          label: $i18n.t('table_label.platform_orderNo') + ':', // 平台单号 输入框前文字
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'BILL_NO',
          label: $i18n.t('form_label.billNo') + ':', //'单据编号:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CP_C_SHOP_TITLE',
          label: $i18n.t('other.shop') + ':', // 店铺名称
        },
        {
          flag: false,
          width: '6',
          column: 'ORDER_TYPE',
          label: $i18n.t('form_label.billType') + ':', // 单据类型
        },
        {
          flag: false,
          width: '6',
          column: 'PLATFORM_STATUS',
          label: $i18n.t('form_label.e8') + ':' //平台状态
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CP_C_PHY_WAREHOUSE_ENAME', //
          label: $i18n.t('form_label.delivery_warehouse') + ':' //发货仓库
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CP_C_LOGISTICS_ENAME', //
          label: $i18n.t('form_label.logisticsCompany') + ':' //物流公司
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'EXPRESS_CODE',
          label: $i18n.t('form_label.logisticsOrder_No') + ':' // 物流单号
        },
        // {
        {
          flag: false,
          width: '12',
          column: 'BUYER_MESSAGE',
          label: $i18n.t('form_label.buyerNotes') + ':', // 买家备注
        },
        {
          flag: false,
          width: '12',
          column: 'SELLER_MEMO',
          label: $i18n.t('form_label.sellerNotes') + ':', // 卖家备注
        },

      ],
      detail: [
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_NAME',
          label: $i18n.t('form_label.consignee') + ':'//收货人
        },
        {
          flag: false, // 需要加*
          width: '12',
          column: 'BUYER_NICK',
          label: $i18n.t('table_label.buyerNickname') + ':', // 买家昵称
        },
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_MOBILE',
          label: $i18n.t('form_label.consignee_phone') + ':', // 收货人手机号
        },
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_PHONE',
          label: $i18n.t('form_label.e6') + ':', // 收货人电话
        },
        {
          flag: false,
          width: '12',
          column: 'CP_C_REGION_PROVINCE_ENAME',
          label: $i18n.t('form_label.aa') + ':'  //省市区
        },
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_ZIP',
          label: $i18n.t('form_label.e7') + ':', // 收货人邮编
        },
        {
          flag: false,
          width: '24',
          column: 'RECEIVER_ADDRESS',
          label: $i18n.t('form_label.ab') + ':' // 详细地址
        },
        {
          flag: false,
          width: '24',
          column: 'SYS_REMARK',
          label: $i18n.t('other.systemNotes') + ':',// 系统备注
        },
      ],
      tableConfig: {
        tablename: 'OC_B_ORDER_ITEM',
        order: {},
        options: {
          cols: {
            A: {
              fun: () => { }
            }
          }
        },
        objid: -1
      },
      retailPriceTotal: '',
      orderPriceTotal: '',
      eyeStatus: false, // '订单收获地址'的眼睛icon的开/闭状态
      eyeText: $i18n.t('btn.show'), //显示
      butArr: [{
        webname: 'orderBillInfoSecurity',
        isShow: true,
      }, {
        webname: 'orderModifyReceiverAddress',
        isShow: true,
      }, {
        webname: 'orderModifyBillRemark',
        isShow: true,
      }
      ],
    };
  },
  watch: {
    componentData: {
      handler(newobj) {
        newobj.order.SHIP_AMT = newobj.order.SHIP_AMT ?? 0.00;
        newobj.order.SERVICE_AMT = newobj.order.SERVICE_AMT ?? 0.00;
        this.orderPriceTotal = Number(newobj.order.SHIP_AMT) + Number(newobj.order.SERVICE_AMT);
        if (newobj.sub_item) {
          this.tableConfig.objid = newobj.order.ID;
          this.tableConfig.order = newobj.order;
          this.tableConfig.subItem = newobj.sub_item;
          this.is_combination = this.tableConfig.order.IS_COMBINATION;
        }
      },
      deep: true
    },
    'componentData.order.ORDER_TYPE': {
      handler(newValue) {
        // 颜色配置
        const orderTypeText = ['正常', '换货', '补发', '虚拟', '预售'];
        const orderTypeColor = ['90BB57', 'ffae34', '5461B8', '99c2f1', 'a375c1'];
        this.orderTypeClass = $utils.generateMap(orderTypeText, orderTypeColor, newValue)
      }
    },
    'componentData.order.PLATFORM_STATUS': {
      handler(newValue) {
        // 颜色配置
        const platformStatusText = ['等待买家付款', '等待卖家发货', '等待买家确认收货', '卖家部分发货', '交易完成'];
        const platformStatusColor = ['ffae34', 'ff6951', '99c2f1', 'a375c1', '90BB57'];
        this.platformStatusClass = $utils.generateMap(platformStatusText, platformStatusColor, newValue);
      }
    }
  },
  methods: {
    eyeClick: _.throttle(function () {
      this.eyeText = this.eyeStatus ? $i18n.t('btn.show') : $i18n.t('btn.hide'); //隐藏 显示
      this.eyeStatus = !this.eyeStatus;
      this.$emit('freshLoad', { DECRYPT: this.eyeStatus });
    }, 2000),
    isQhMethod(data) {
      this.isQhChild = data;
    },
    checkCombination() {
      const self = this;
      self.isQh = !self.isQh;
      this.$emit('freshLoad', { PT_SKU: self.isQh });
    },
    freshLoadChild() {
      ƒ
      this.$emit('freshLoad');
    },
    priceTotal(val) {
      // 商品总金额赋值
      this.retailPriceTotal = val;
      this.orderPriceTotal = $utils.floatNumber(Number(this.orderPriceTotal) + Number(val));
    },
    // 添加赠品
    addGiftHandler() {
      this.dialogs.addGift.data = {
        data: [{
          ID: this.componentData.order.ID,
          BILL_NO: this.componentData.order.BILL_NO
        }],
        type: 'add',
      };
      this.dialogsConfig = this.dialogs.addGift;
      setTimeout(() => {
        this.$children.find(item => item.name === 'addGiftDialog').openConfirm();
      }, 100);
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
      if (![$i18n.t('common.toBeReviewed'), $i18n.t('other.outOfStock')].includes(this.componentData.order.ORDER_STATUS)) {
        this.$Message.error($i18n.t('modalTips.fq')); //订单状态不满足，不允许修改地址！
        return false;
      }
      this.dialogs.address.data = this.componentData.order;
      this.dialogsConfig = this.dialogs.address;
      setTimeout(() => {
        this.$children.find(item => item.name === 'addressDialog').openConfirm();
      }, 100);
    },
    // 修改备注
    modifyRemark() {
      this.dialogs.modifyRemark.data = {
        ids: [this.$route.params.customizedModuleId]
      };
      this.dialogsConfig = this.dialogs.modifyRemark;
      setTimeout(() => {
        this.$children.find(item => item.name === 'modifyRemarkDialog').openConfirm();
      }, 100);
    }
  },
  async created() {
    // 按钮权限配置
    let ACTIONS = JSON.parse(sessionStorage.getItem("ACTIONS"));
    let buttonArr1 = this.butArr.map((x) => { if (ACTIONS.some(y => y.webname === x.webname)) return x }).filter(item => item);
    this.butArr = buttonArr1;
    // this.butArr.forEach((x)=>{
    // 判断是否存在不存在设置为false，存在看是否显示ishide
    // if(!ACTIONS.some(y => y.webname === x.webname)){
    //   x.isShow = false
    //   console.log(x.webname);
    // }else{
    //   ACTIONS.forEach((e) => {
    //     if(x.webname === e.webname){
    //       x.isShow = !e.ishide
    //     }
    //   })
    // }
    // })
  },
  mounted() {
    let dataProps = this.componentData;
    this.tableConfig.objid = dataProps.order.ID || -1;
    this.tableConfig.order = dataProps.order || {};
  }
};
