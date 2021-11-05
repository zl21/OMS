import { OmsButton } from 'burgeonComponents'
import businessLabel from 'burgeonComponents/businessLabel';
import businessDialog from 'burgeonComponents/businessDialog';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import EssentialInfo from 'allpages/orderCenter/orderManageDetail/details/essentialInfo.vue';
import OrderItem from 'allpages/orderCenter/orderManageDetail/details/orderItem.vue';
import DropDownConfig from 'burgeonConfig/config/dropDown.config';
import BtnConfig from 'burgeonConfig/config/funBtn.config';
import DialogConfig from 'burgeonConfig/config/dialogs.config';
import loading from 'burgeonComponents/loading';

export default {
  name: 'OrderManageDetail',
  components: {
    OmsButton,
    businessLabel,
    EssentialInfo,
    OrderItem,
    businessDialog,
    loading
  },
  mixins: [buttonPermissionsMixin],
  data() {
    return {
      vmI18n:$i18n,
      pageLoad: false,
      publicBouncedConfig: {},
      statusName: '', // 水印标识
      // 订单状态对应的状态码‘ORDER_STATUS’ => ['未确认', '已审核-3', '配货中-4', '仓库发货-5', '平台发货-6', '已确认收货', '已取消-7', '系统作废-8', '交易完成-12', '预售待发货', '预售缺货', '缺货-2', '待审核-1'];
      // * 后端(孙继东)给的：1,待审核 2,缺货 3,已审核 4,配货中 5,仓库发货 6,平台发货 7,已取消 8,系统作废 9,预售 10,代发 11,物流已送达 12,交易完成 13,未付款 21,传wms中 50,待分配,0,新增订单暂存草稿状态
      orderStatus: '', // 订单状态 - 水印标识码
      objId: -1,
      labelDefaultValue: 'OC_B_ORDER',
      labelList: [
        {
          label: $i18n.t('common.baseInformation'), // 基本信息
          value: 'OC_B_ORDER',
        },
        {
          label: $i18n.t('form_label.preferential_info'), // 优惠信息
          value: 'OC_B_ORDER_PROMOTION',
        },
        {
          label: $i18n.t('form_label.payment_info'), // 支付信息
          value: 'OC_B_ORDER_PAYMENT',
        },
        {
          label: $i18n.t('form_label.shipping_info'), // 发货信息
          value: 'OC_B_ORDER_DELIVERY',
        },
        {
          label: $i18n.t('form_label.workOrder'), // 工单
          value: '5',
          isShow: false,
        },
        {
          label: $i18n.t('form_label.status_in_warehouse'), // 仓内状态
          value: 'OC_B_ORDER_WMS_STATUS',
          isShow: false,
        },
        {
          label: $i18n.t('form_label.routing_info'), // 路由信息
          value: 'OC_B_ORDER_ROUTE',
          isShow: false,
        },
        {
          label: $i18n.t('panel_label.operationLog'), // 操作日志
          value: 'OC_B_ORDER_LOG',
        },
      ],
      tab1: {},
      tab1_default: {
        order: {
          ADJUST_AMT: '',
          BILL_NO: '',
          COD_AMT: '',
          CONSIGN_AMT: 0,
          CONSIGN_SHIP_AMT: '',
          CP_C_LOGISTICS_ENAME: '',
          CP_C_PHY_WAREHOUSE_ID: '',
          CP_C_REGION_AREA_ENAME: '',
          CP_C_REGION_CITY_ENAME: '',
          CP_C_REGION_PROVINCE_ENAME: '',
          CP_C_SHOP_TITLE: '',
          EXPRESSCODE: '',
          INSIDE_REMARK: '',
          LOGISTICS_COST: '',
          OPERATE_AMT: '',
          ORDER_AMT: '',
          ORDER_DATE: '',
          ORDER_DISCOUNT_AMT: '',
          ORIG_RETURN_ORDER_ID: '',
          PAY_TYPE: '',
          PLATFORM: '',
          PRODUCT_AMT: 0,
          PRODUCT_DISCOUNT_AMT: '',
          RECEIVED_AMT: '',
          RECEIVER_ADDRESS: '',
          RECEIVER_MOBILE: '',
          RECEIVER_NAME: '',
          RECEIVER_PHONE: '',
          RECEIVER_ZIP: '',
          SYSREMARK: '',
          SHIP_AMT: '',
          MERGE_SOURCE_CODE: '',
          USER_NICK: '',
          WEIGHT: '',
          CP_C_PHY_WAREHOUSE_ENAME: '',
        },
      },
      tab2: {
        tablename: '',
        objid: '',
      },
      refresh: true,
      modal: false, // 模态框
      error_type: '', // 错误类型【审核错误】
      error_tip: '', // 错误提示
      dialogs: DialogConfig.config(),
      btnConfig: BtnConfig.config(),
      enumerationList: {},
    };
  },
  watch: {
    $route(to) {
      if (to.path !== '/CUSTOMIZED/ORDERMANAGEDETAIL') {
        return;
      }
      const id = this.$route.params ? this.$route.params.customizedModuleId : -1;
      this.objId = id;
      this.load();
    },
  },
  methods: {
    dropDownClickChange(val) {
      DropDownConfig.target = this;
      DropDownConfig.configHandler(val, 1);
    },
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (item.value === 'OC_B_ORDER') return;
      this.tab2 = { tablename: this.labelDefaultValue, objid: this.objId };
    },
    autoRefresh() {
      const self = this;
      this.refresh = false;
      self.$nextTick(() => {
        this.load();
        this.refresh = true;
      });
    },
    freshLoad(val) {
      this.load(val);
    },
    load(val) {
      const data = { ID: this.objId };
      if (val) data.isShowPii = val;

      const { customizedModuleName } = this.$router.currentRoute.params;
      this.loading = true;

      // this.$R3loading.show(customizedModuleName);
      let self=this;
      this.service.orderCenter.getDetail(data).then((res) => {
        if (res.data && res.data.code === 0) {
          const resData = res.data.data;
          resData.TO_SETTLE_STATUS_TAG =  $i18n.t(`common.${self.$lodash.isNull(data.RESERVE_BIGINT02) ?'no':'yes'}`);
          const TO_SETTLE_STATUS_NAME = (this.enumerationList.UPLOAD_SAP_STATUS.find((val) => val.value === resData.TO_SAP_STATUS) || {}).label;
          resData.TO_SETTLE_STATUS_NAME = TO_SETTLE_STATUS_NAME ?? '';
          this.tab1.order = resData;
          this.orderStatus = resData.ORDER_STATUS;
          // const statusList = ['未确认', '已审核', '配货中', '仓库发货', '平台发货', '已确认收货', '已取消', '系统作废', '交易完成', '预售待发货', '预售缺货', '缺货', '待审核'];
          this.statusName = [1, 2, 3, 4, 5, 6, 7, 8, 12].includes(res.data.data.ORDER_STATUS) ? res.data.data.ORDER_STATUS_NAME : '';
        } else {
          this.tab1 = this.tab1_default;
          // 订单详情获取失败
          this.$Message.error($i18n.t('modalTips.h3'));
        }
      }).finally(() => {
        this.loading = false;
        // this.$R3loading.hide(customizedModuleName);
      });
    },
    asyncOK() {
      const self = this;
      const ids = [];
      ids.push(this.tab1.order.ID);

      if (this.error_type === 'auditing') {
        self.service.orderCenter.auditOrder({ ids, type: '2', isCheck: 1 }).then((res) => {
          self.$Message.info(res.data.message);
          self.modal = false;
        });
      }
    },
  },
  async created() {
    const { customizedModuleName } = this.$router.currentRoute.params;
    this.getPermissions('btnConfig', 'orderManager');
    const id = this.$route.params.customizedModuleId ?? -1;
    this.objId = id;
    this.tab1 = this.tab1_default;
    BtnConfig.target = this;
    BtnConfig.singleType = 1;
    this.loading = true;
    // console.log('dialogs',this.dialogs);
    // this.$R3loading.show(customizedModuleName);
    await this.service.orderCenter.selectLimitGroups(['UPLOAD_SAP_STATUS']).then((res) => {
      if (Array.isArray(res.data)) {
        res.data.forEach((item) => {
          this.enumerationList[item.name] = item.adLimitvalues.map((val) => ({
            label: val.description,
            value: Number(val.value),
          }));
        });
      } else {
        this.enumerationList.UPLOAD_SAP_STATUS = [];
      }
    }).finally(() => {
      this.loading = false;
      // this.$R3loading.hide(customizedModuleName);
    });
    await this.load();
  },
};
