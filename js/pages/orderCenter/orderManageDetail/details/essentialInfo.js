import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessDialog from 'professionalComponents/businessDialog';
import CusOrderItem from 'allpages/orderCenter/orderManageDetail/details/custOrderItem';
// import publicDialogConfig from 'professionalComponents/common/js/publicDialog.js';
import DialogConfig from 'burgeonConfig/config/dialogs.config';
// import commonUtils from 'burgeonConfig/config/commonUtils';
import goodsTotalAmount from '@/views/pages/orderCenter/orderManageDetail/details/goodsTotalAmount.vue';
export default {
  name: 'EssentialInfo',
  props: {
    componentData: {}
  },
  components: {
    businessButton,
    businessDialog,
    businessActionTable,
    CusOrderItem,
    goodsTotalAmount
  },
  data() {
    return {
      publicBouncedConfig: {},
      isQh: true, 
      isQhChild: true,
      is_combination:0, // 是否为组合
      dialogs: DialogConfig.config(),
      queryList: [
        {
          width: '6',
          column: 'SOURCE_CODE',
          label: '平台单号:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'BILL_NO',
          label: '单据编号:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'SG_B_OUT_BILL_NO',
          label: '出库单号:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'WMS_BILL_NO',
          label: 'WMS单号:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CP_C_SHOP_TITLE',
          label: '店铺名称:'
        },
        {
          flag: false,
          width: '6',
          column: 'ORDER_TYPE',
          label: '单据类型:'
        },
        {
          flag: false,
          width: '6',
          column: 'ORDER_STATUS',
          label: '单据状态:'
        },
        {
          flag: false,
          width: '6',
          column: 'PLATFORM_STATUS',
          label: '平台状态'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'PAY_TYPE',
          label: '付款方式:'
        },{
          flag: false, // 需要加*
          width: '6',
          column: 'PAY_STATUS',
          label: '付款状态:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CREATIONDATE',
          label: '下单时间:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'PAY_TIME',
          label: '付款时间:'
        },
        // {
        //   flag: false, // 需要加*
        //   width: '6',
        //   column: 'CP_C_PLATFORM_ENAME',
        //   label: '平台:'
        // },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'BUYER_NICK',
          label: '买家昵称:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CP_C_LOGISTICS_ENAME',
          label: '物流公司:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'EXPRESS_CODE',
          label: '物流单号:'
        },
        {
          flag: false, // 需要加*
          width: '6',
          column: 'CP_C_PHY_WAREHOUSE_ENAME',
          label: '发货仓库:'
        },
        
      ],
      detail: [
        {
          flag: false,
          width: '24',
          column: 'RECEIVER_NAME',
          label: '收货人:'
        },
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_MOBILE',
          label: '收货人手机:'
        },
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_PHONE',
          label: '电话:'
        },
        {
          flag: false,
          width: '12',
          column: 'CP_C_REGION_PROVINCE_ENAME',
          label: '省市区:'
        },
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_ZIP',
          label: '邮编:'
        },
        {
          flag: false,
          width: '12',
          column: 'RECEIVER_ADDRESS',
          label: '详细地址:'
        },
        {
          flag: false,
          width: '24',
          column: 'BUYER_MESSAGE',
          label: '买家备注:'
        },
        {
          flag: false,
          width: '24',
          column: 'SELLER_MEMO',
          label: '卖家备注:'
        },
        {
          flag: false,
          width: '24',
          column: 'SYS_REMARK',
          label: '系统备注:'
        },
        // {
        //   flag: false,
        //   width: '24',
        //   column: 'INTERNAL_MEMO',
        //   label: '内部便签:'
        // }
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
      retailPriceTotal:'',
      orderPriceTotal:'',
      eyeStatus: false, // '订单收获地址'的眼睛icon的开/闭状态
      eyeText:'显示'
    };
  },
  watch: {
    componentData: {
      handler(newobj) {
        newobj.order.SHIP_AMT = newobj.order.SHIP_AMT ?? 0.00;
        newobj.order.SERVICE_AMT = newobj.order.SERVICE_AMT ?? 0.00;
        this.orderPriceTotal = Number(newobj.order.SHIP_AMT) + Number(newobj.order.SERVICE_AMT);
        if(newobj.sub_item){
          this.tableConfig.objid = newobj.order.ID;
          this.tableConfig.order = newobj.order;
          this.tableConfig.subItem = newobj.sub_item;
        }
      },
      deep: true
    },
    retailPriceTotal(newName) {
      this.orderPriceTotal = this.$OMS2.omsUtils.floatNumber(Number(this.orderPriceTotal) + Number(newName));
    },
  },
  methods: {
    eyeClick() {
      this.eyeStatus = !this.eyeStatus;
      this.eyeText = this.eyeStatus ? '隐藏' : '显示';
      this.$emit('freshLoad', {DECRYPT : this.eyeStatus});
    },
    isQhMethod(data) {
      this.isQhChild = data;
    },
    checkCombination() {
      const self = this;
      self.isQh = !self.isQh;
      this.$emit('freshLoad', {PT_SKU: self.isQh});
    },
    freshLoadChild() {ƒ
      this.$emit('freshLoad');
    },
    priceTotal(val){
      // 商品总金额赋值
      this.retailPriceTotal = val;
    },
    // 子组件点击按钮事件通知
    addGiftHandler() {
      this.dialogs.addGift.data = this.componentData.order;
      console.log(this.dialogs.addGift.data,this.componentData.order);
      self.publicBouncedConfig = Object.assign(this.dialogs.addGift, {
        componentData: {
          ids: [this.componentData.order.ID]
        }
      });
      setTimeout(() => {
        this.$children[0].$children.find(item => item.name === 'addGiftDialog').openConfirm();
      }, 100);
    },
    // 详情按钮替换商品弹框
    replaceGoodsDetail(data) {
      this.publicBouncedConfig = Object.assign(this.dialogs.changeSku, {
        componentData: {
          ids: [this.$route.params.customizedModuleId],
          itemId: data[0].ID
        }
      });
      setTimeout(() => {
        this.$children[0].$children.find(item => item.name === 'changeSkuDialog').openConfirm();
      }, 100);
    },
    // 修改地址
    modifyAddress(){
      this.dialogs.address.data = this.componentData.order;
      this.publicBouncedConfig = Object.assign(this.dialogs.address, {
        componentData: {
          ids: [this.$route.params.customizedModuleId]
        }
      });
      setTimeout(() => {
        this.$children[0].$children.find(item => item.name === 'addressDialog').openConfirm();
      }, 100);
    },
    // 修改备注
    modifyRemark(){
      console.log('修改备注');
    }
  },
  mounted() {
    let dataProps = this.componentData;
    this.tableConfig.objid = dataProps.order.ID || -1;
    this.tableConfig.order = dataProps.order || {};
    this.is_combination = this.tableConfig.order.is_combination ? true : false
  }
};
