<!--
 * @Author: your name
 * @Date: 2021-07-07 16:19:54
 * @LastEditTime: 2021-08-06 15:19:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/orderCenter/returnOrder/orderManageDetails.vue
-->
<template>
  <div class="customized-detail orderManageDetails" v-loading="pageLoad">
    <div class="obj-btn">
      <OmsButton :btn-config="btnConfig" />
    </div>
    <div class="obj-main">
      <!-- <div class="Step-Box">
        <Steps class="steps-content">
          <Step
            v-for="(item, index) in steps"
            :key="index"
            :title="item.name"
            :icon="item.iconfont"
            :content="item.data ? item.data : item.content"
            :status="item.status"
          />
        </Steps>
      </div> -->
      <div class="customized-detail-label">
        <OmsLabel
          :label-default-value="labelDefaultValue"
          :label-list="labelList"
          @labelClick="labelClick"
        />
      </div>
      <template>
        <!-- 主表界面 - 基本信息 -->
        <EssentialInfo
          v-show="labelDefaultValue === 'OC_B_ORDER'"
          :component-data="baseInfoTab"
          @freshLoad="freshLoad"
        />
        <!-- 子表 -->
        <div class="obj-table">
          <OrderItem
            v-show="labelDefaultValue !== 'OC_B_ORDER'"
            class="custom-table"
            :component-data="otherInfoTab"
          />
        </div>
      </template>
      <!--单据状态图片展示 -->
      <WaterMark
        v-if="statusName !== ''"
        :text="statusName"
      />
    </div>
    <!--错误弹框-->
    <Modal v-model="modal" title="Title" @on-ok="asyncOK">
      <p>error_tip</p>
    </Modal>
  </div>
</template>
<script>
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import EssentialInfo from 'allpages/orderCenter/orderManageDetail/details/essentialInfo.vue';
import OrderItem from 'allpages/orderCenter/orderManageDetail/details/orderItem.vue';
import DropDownConfig from 'burgeonConfig/config/dropDown.config';
import BtnConfig from 'burgeonConfig/config/funBtn.config';
import BurgeonEvent from 'burgeonConfig/config/event.config';

export default {
  name: 'OrderManageDetail',
  components: {
    EssentialInfo,
    OrderItem,
  },
  mixins: [buttonPermissionsMixin],
  data() {
    return {
      pageLoad: false,
      publicBouncedConfig: {},
      statusName: '', // 水印标识
      // 订单状态对应的状态码‘ORDER_STATUS’ => ['未确认', '已审核-3', '配货中-4', '仓库发货-5', '平台发货-6', '已确认收货', '已取消-7', '系统作废-8', '交易完成-12', '预售待发货', '预售缺货', '缺货-2', '待审核-1'];
      // * 后端(孙继东)给的：1,待审核 2,缺货 3,已审核 4,配货中 5,仓库发货 6,平台发货 7,已取消 8,系统作废 9,预售 10,代发 11,物流已送达 12,交易完成 13,未付款 21,传wms中 50,待分配,0,新增订单暂存草稿状态
      orderStatus: '', // 订单状态 - 水印标识码
      objId: -1,
      labelDefaultValue: 'OC_B_ORDER', // or OC_B_ORDER
      labelList: [
        {
          label: $it('com.baseInformation'), // 基本信息
          value: 'OC_B_ORDER'
        },
        {
          label: $it('fL.preferential_info'), // 优惠信息
          value: 'OC_B_ORDER_PROMOTION'
        },
        {
          label: $it('fL.payment_info'), // 支付信息
          value: 'OC_B_ORDER_PAYMENT'
        },
        {
          label: $it('fL.shipping_info'), // 发货信息
          value: 'OC_B_ORDER_DELIVERY'
        },
        {
          label: $it('fL.workOrder'), // 工单
          value: '5',
          isShow: false
        },
        {
          label: $it('fL.status_in_warehouse'), // 仓内状态
          value: 'OC_B_ORDER_WMS_STATUS',
          isShow: false
        },
        {
          label: $it('fL.routing_info'), // 路由信息
          value: 'OC_B_ORDER_ROUTE',
          isShow: false
        },
        {
          label: $it('pL.operationLog'), // 操作日志
          value: 'OC_B_ORDER_LOG'
        }
      ],
      baseInfoTab: {
        order: {},
        sub_item: {}
      },
      otherInfoTab: {
        tablename: '',
        objid: ''
      },
      // 状态条数据
      steps: [],
      modal: false, // 模态框
      error_type: '', // 错误类型【审核错误】
      error_tip: '', // 错误提示
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
          CP_C_PHY_WAREHOUSE_ENAME: ''
        }
      },
      tab2: {
        tablename: '',
        objid: ''
      },
      refresh: true,
      dialogs: {
        address: {
          title: $it('mT.modify_shipping_address'), // 修改收货地址
          titleAlign: 'center',
          data: {},
          width: 650,
          keepAlive: true,
          url: 'modal/orderCenter/resolveAddress',
          name: 'addressDialog',
          excludeString: 'addressDialog',
          footerHide: true,
          maskClosable: false
        },
        blacklist: {
          title: $it('mT.blacklist'), // 加入黑名单
          titleAlign: 'center',
          width: 400,
          data: {},
          keepAlive: true,
          url: 'order/joinBlackList',
          name: 'blackListDialog',
          footerHide: true
        }
      },
      changeInternalRemarksConfig: {
        refFuns: 'confirmFun',
        confirmTitle: '修改内部备注', // 修改内部备注
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '440',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'changeInternalRemarks', // 组件名称
        url: 'modal/orderCenter/changeInternalRemarks',
        keepAlive: true,
        excludeString: 'changeInternalRemarks', // 将name传进去，确认不缓存
        componentData: {}
      },
    }
  },
  watch: {
    // 复制
    // $route(to) {
    //   if (to.path !== '/CUSTOMIZED/ORDERMANAGEDETAIL') {
    //     return;
    //   }
    //   const id = this.$route.params ? this.$route.params.customizedModuleId : -1;
    //   this.objId = id;
    //   this.getDetailsData();
    // }
  },
  activated() {
    const self = this;
    this.$OMS2.BtnConfig.target = self;
    BurgeonEvent.target = self;
  },
  mounted() {
    // 页面加载完在赋值 （取不到值就会赋默认值）
    // this.dialogs = DialogConfig.config();
  },
  methods: {
    dropDownClickChange(val) {
      DropDownConfig.target = this;
      DropDownConfig.configHandler(val, 1);
    },
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (item.value === 'OC_B_ORDER') return;
      this.otherInfoTab = { objid: this.objId, tabValue: item.value };
      // this.otherInfoTab = { tablename: this.labelDefaultValue, objid: this.objId, tabValue: item.value };
    },
    freshLoad(val) {
      this.getDetailsData(val);
    },
    async getDetailsData(val) {
      this.loading = true;
      // let params = {
      //   ID: this.objId,
      //   TABLE: 'OC_B_ORDER',
      //   SUB_TABLE: 'OC_B_ORDER',
      //   index: 1,
      //   PT_SKU: true, //true平台 false商品
      //   REFRESH: true
      // };
      // 是否隐藏
      // if (val) params = Object.assign(params, val);
      const params = { ID: this.objId };
      try {
        const { data: { data } } = await this.service.orderCenter.getDetail(params);
        this.steps = data.DATA.PROCESSING;
        this.baseInfoTab.order = data.DATA.ITEM;
        this.baseInfoTab.sub_item = data.DATA.SUB_ITEM;
        this.loading = false;
        console.log('1111', data.DATA.ITEM);
        // const statusList = ['未确认', '已审核', '配货中', '仓库发货', '平台发货', '已确认收货', '已取消', '系统作废', '交易完成', '预售待发货', '预售缺货', '缺货', '待审核'];
        this.statusName = ['未确认', '已审核', '配货中', '仓库发货', '平台发货', '已确认收货', '已取消', '系统作废', '交易完成', '预售待发货', '预售缺货', '缺货', '待审核'].includes(data.DATA.ITEM.ORDER_STATUS) ? data.DATA.ITEM.ORDER_STATUS : '';
      } catch (error) {
        console.log(error);
      }
    },
    asyncOK() {
      const self = this;
      const ids = [];
      ids.push(this.baseInfoTab.order.ID);
      if (this.error_type === 'auditing') {
        self.service.orderCenter.auditOrder({ ids, type: '2', isCheck: 1 }).then(res => {
          self.$Message.info(res.data.message);
          self.modal = false;
        });
      }
    }
  },
  async created() {
    const id = this.$route.params.customizedModuleId ?? -1;
    this.objId = id;
    // BtnConfig.target = this;
    // BtnConfig.singleType = 1;

    this.btnConfig.buttons = []; // 清空按钮缓存,防止重复叠加按钮
    const buttons = this.$OMS2.BtnConfig.config();
    // this.btnConfig.buttons = [...buttons.buttons, ...this.extendBtn];
    this.btnConfig.buttons = this.extendBtn;
    this.getPermissions('btnConfig', 'orderManager');
    await this.service.orderCenter
    .selectLimitGroups(['UPLOAD_SAP_STATUS'])
    .then(res => {
      if (Array.isArray(res.data)) {
        res.data.forEach(item => {
          this.enumerationList[item.name] = item.adLimitvalues.map(val => ({
            label: val.description,
            value: Number(val.value)
          }));
        });
      } else {
        this.enumerationList.UPLOAD_SAP_STATUS = [];
      }
    })
    .catch(() => {
      this.pageLoad = false;
    });
    await this.getDetailsData();
  },
};
</script>
<style lang="less" scoped>
@import "~omsTheme/public.less";
.orderManageDetails {
  background: #fff;
}
.Step-Box {
  margin: @base-mr @base-mr 0;
  /deep/
    .steps-content.ark-steps
    .ark-steps-item
    .ark-steps-head
    .ark-steps-head-inner {
    height: 21px;
    line-height: 1;
    & > .ark-steps-icon.ark-icon {
      font-size: 24px;
    }
  }
}
.customized-detail-label {
  border-bottom: 1px solid #f4f5f9;
  .jordan-label-box {
    // margin: 0 @base-mr;
    /deep/ .jordan-label {
      height: 48px;
      line-height: 48px;
      border: none;
      color: #292f43;
      &.colorStyle {
        color: #4855af;
        border-bottom: 2px solid #4855af;
      }
    }
    /deep/ .underline-flex {
      border: none;
    }
  }
}
.order-item {
  padding: 0;
}
</style>
