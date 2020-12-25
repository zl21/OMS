import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessDialog from 'professionalComponents/businessDialog';
import CusOrderItem from 'allpages/OrderCenter/orderManageDetail/details/custOrderItem';
import publicDialogConfig from 'professionalComponents/common/js/publicDialog.js';

const _importA = file => require(`${file}.vue`).default;
// import axios from "axios";
var val = false;

export default {
  name: 'EssentialInfo',
  props: {
    componentData: {}
  },
  components: {
    businessButton,
    businessDialog,
    businessActionTable,
    CusOrderItem
  },
  data() {
    return {
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
          flag: false, // 需要加*
          column: 'ID',
          label: '订单编号:'
        },
        {
          column: 'BILL_NO',
          label: '单据编号:'
        },
        {
          flag: false, // 是否需要加 *
          column: 'SOURCE_CODE', // 字段
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
          column: 'ORDER_STATUS_NAME',
          label: '单据状态:'
        },
        {
          flag: false, // 需要加*
          column: 'PLATFORM_NAME',
          label: '平台:'
        },
        {
          flag: false, // 需要加*
          column: 'CP_C_PHY_WAREHOUSE_ENAME',
          label: '发货仓库:'
        },
        {
          flag: false, // 需要加*
          column: 'USER_NICK',
          label: '买家昵称:'
        },
        {
          flag: false, // 需要加*
          column: 'ORIG_RETURN_ORDER_ID',
          label: '退换货单:'
        },
        {
          flag: false, // 需要加*
          column: 'ORDER_TIME',
          label: '下单日期:'
        },
        {
          flag: false, // 需要加*
          column: 'PAY_NAME',
          label: '付款方式:'
        },
        {
          flag: false, // 需要加*
          column: 'CP_C_LOGISTICS_ENAME',
          label: '物流公司:'
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
        {
          flag: false, // 需要加*
          column: 'TO_SETTLE_STATUS_NAME',
          label: '传SAP状态:'
        },
        {
          flag: false, // 需要加*
          column: 'STORE_DELIVERY_STATUS_NAME',
          label: '门店接口状态:'
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
        }
      ],
      detail: [
        {
          flag: false,
          column: 'RECEIVER_NAME',
          label: '收货人:'
        },
        {
          flag: false,
          column: 'RECEIVER_MOBILE',
          label: '收货人手机:'
        },
        {
          flag: false,
          column: 'RECEIVER_PHONE',
          label: '电话:'
        },
        {
          flag: false,
          column: 'RECEIVER_ZIP',
          label: '邮编:'
        },
        {
          flag: false,
          column: 'CP_C_REGION_PROVINCE_ENAME',
          label: '省:'
        },
        {
          flag: false,
          column: 'CP_C_REGION_CITY_ENAME',
          label: '市:'
        },
        {
          flag: false,
          column: 'CP_C_REGION_AREA_ENAME',
          label: '区:'
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
    replaceGoodsDetail(data) {
      console.log(data);
      const self = this;
      self.publicBouncedConfig = Object.assign(
        publicDialogConfig.replaceGoodsDetailConfig,
        {
          componentData: {
            ids: [self.$route.params.customizedModuleId],
            itemId: data[0].ID
          }
        }
      );
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
