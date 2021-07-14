<!--
 * @Author: your name
 * @Date: 2021-07-07 16:19:54
 * @LastEditTime: 2021-07-07 16:19:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/orderCenter/returnOrder/orderManageDetails.vue
-->
<template>
  <div class="customized-detail" v-loading="loading">
    <div class="returnBtn">
      <businessButton :btn-config="returnBtn" />
    </div>
    <div class="customized-detail-main">
      <div style="padding:12px;width:100%;margin:0 auto">
        <Steps class="steps-content">
          <Step
            v-for="(item,index) in steps"
            :key="index"
            :title="item.name"
            :icon="item.iconfont"
            :content="item.data ? item.data : item.content"
            :status="item.status"
          />
        </Steps>
      </div>
      <div class="customized-detail-label">
        <businessLabel
          :label-default-value="labelDefaultValue"
          :label-list="labelList"
          @labelClick="labelClick"
        />
      </div>
      <template>
        <!-- 主表界面 - 基本信息 -->
        <EssentialInfo
          v-show="labelDefaultValue === 'OC_B_ORDER_ITEM'"
          :component-data="baseInfoTab"
          @freshLoad="freshLoad"
        />
        <!-- 子表 -->
        <div class="customized-detail-table">
          <OrderItem
            v-show="labelDefaultValue !== 'OC_B_ORDER_ITEM'"
            class="custom-table"
            :component-data="otherInfoTab"
          />
        </div>
      </template>
      <!--单据状态图片展示 -->
      <businessStatusFlag
        :status-name="statusName"
        class="statusFlag"
      />
    </div>
    <!--错误弹框-->
    <Modal
      v-model="modal"
      title="Title"
      @on-ok="asyncOK"
    >
      <p>error_tip</p>
    </Modal>
  </div>
</template>
<script>
  import businessButton from 'professionalComponents/businessButton';
  import businessLabel from 'professionalComponents/businessLabel';
  import businessStatusFlag from 'professionalComponents/businessStatusFlag';
  import businessDialog from 'professionalComponents/businessDialog';
  import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
  import EssentialInfo from 'allpages/orderCenter/orderManageDetail/details/essentialInfo';
  import OrderItem from 'allpages/orderCenter/orderManageDetail/details/orderItem';
  import DropDownConfig from 'burgeonConfig/config/dropDown.config';
  import BtnConfig from 'burgeonConfig/config/funBtn.config';
  import BurgeonEvent from 'burgeonConfig/config/event.config';

  export default {
    name: 'OrderManageDetail',
    components: {
      businessButton,
      businessLabel,
      EssentialInfo,
      OrderItem,
      businessStatusFlag,
      businessDialog
    },
    mixins: [buttonPermissionsMixin],
    data() {
      return {
        vmI18n: $i18n,
        pageLoad: false,
        publicBouncedConfig: {},
        statusName: '', // 水印标识
        // 订单状态对应的状态码‘ORDER_STATUS’ => ['未确认', '已审核-3', '配货中-4', '仓库发货-5', '平台发货-6', '已确认收货', '已取消-7', '系统作废-8', '交易完成-12', '预售待发货', '预售缺货', '缺货-2', '待审核-1'];
        // * 后端(孙继东)给的：1,待审核 2,缺货 3,已审核 4,配货中 5,仓库发货 6,平台发货 7,已取消 8,系统作废 9,预售 10,代发 11,物流已送达 12,交易完成 13,未付款 21,传wms中 50,待分配,0,新增订单暂存草稿状态
        orderStatus: '', // 订单状态 - 水印标识码
        objId: -1,
        labelDefaultValue: 'OC_B_ORDER_ITEM',
        labelList: [
          {
            label: $i18n.t('common.baseInformation'), // 基本信息
            value: 'OC_B_ORDER_ITEM'
          },
          {
            label: $i18n.t('form_label.preferential_info'), // 优惠信息
            value: 'OC_B_ORDER_PROMOTION'
          },
          {
            label: '发货信息', // 发货信息
            value: 'OC_B_ORDER_DELIVERY'
          },
          {
            label: '操作日志', // 操作日志
            value: 'OC_B_ORDER_LOG'
          }
        ],
        baseInfoTab: {
          order: {},
          sub_item: {}
        },
        baseInfo_default: {
          order: {
            ADJUST_AMT: '',
            BILL_NO: '', // 单据编号
            COLLECT_AMT: '', // 代收金额
            CONSIGN_AMT: 0, // 代销结算金额
            CONSIGN_SHIP_AMT: '', // 收货人邮费
            CP_C_LOGISTICS_ENAME: '', // 快递公司
            CP_C_PHY_WAREHOUSE_ID: '', // 发货仓库ID
            CP_C_REGION_AREA_ENAME: '', // 区
            CP_C_REGION_CITY_ENAME: '', // 市
            CP_C_REGION_PROVINCE_ENAME: '', // 省
            CP_C_SHOP_TITLE: '', // 店铺名称
            EXPRESS_CODE: '', // 快递编码
            INTERNAL_MEMO: '', // 内部备注
            LOGISTICS_COST: '', // 运费
            OPERATE_AMT: '', // 操作费
            ORDER_AMT: '', // 订单总金额
            ORDER_DATE: '', // 下单时间
            ORDER_DISCOUNT_AMT: '', // 订单优惠金额
            ORIG_RETURN_ORDER_ID: '', // 退换货单
            PAY_TYPE: '', // 支付类型
            PLATFORM: '', // 平台
            PRODUCT_AMT: 0, // 商品总额
            PRODUCT_DISCOUNT_AMT: '',
            RECEIVED_AMT: '', // 已收金额
            RECEIVER_ADDRESS: '', // 收货人地址 买家收货详细地址
            RECEIVER_MOBILE: '', // 收货人手机号
            RECEIVER_NAME: '', // 收货人姓名
            RECEIVER_PHONE: '', // 电弧
            RECEIVER_ZIP: '', // 邮编
            SYS_REMARK: '', // 系统备注
            SHIP_AMT: '', // 服务运费
            MERGE_SOURCE_CODE: '', // 平台编号
            USER_NICK: '', // 买家昵称
            CP_C_PHY_WAREHOUSE_ENAME: '' // 发货仓库名称
          }
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
        dialogs: {},
        btnConfig: BtnConfig.config(),
        // 
        returnBtn: {
          typeAll: 'default',
          buttons: [
            {
              text: $i18n.t('common.return'), // 返回
              btnclick: () => {
                this.$comUtils.tabCloseAppoint(this);
                this.$store.commit('customize/TabOpen', {
                  id: '2307',
                  type: 'action',
                  name: 'ORDERMANAGER',
                  label: '零售发货单',
                  back: true,
                });
              }
            },
            {
              text: '刷新',
              btnclick: async() => {
                // 区分子表
                if(this.labelDefaultValue === 'OC_B_ORDER_ITEM'){
                  await this.getDetailsData();
                }else{
                  this.otherInfoTab = { objid: this.objId, tabValue: this.labelDefaultValue };
                }
              }
            }
          ]
        },
        enumerationList: {}
      };
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
    activated(){
      const self = this;
      this.$OMS2.BtnConfig.target = self;
      BurgeonEvent.target = self;
    },
    mounted(){
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
        if (item.value === 'OC_B_ORDER_ITEM') return;
        this.otherInfoTab = { objid: this.objId, tabValue: item.value };
        // this.otherInfoTab = { tablename: this.labelDefaultValue, objid: this.objId, tabValue: item.value };
      },
      freshLoad(val) {
        this.getDetailsData(val);
      },
      async getDetailsData(val) {
        this.loading = true;
        let params = {
          ID: this.objId,
          TABLE: 'OC_B_ORDER',
          SUB_TABLE: 'OC_B_ORDER_ITEM',
          index: 1,
          PT_SKU: true, //true平台 false商品
          REFRESH: true
        };
        // 是否隐藏
        if (val) params = Object.assign(params, val);
        try {
          const { data: { data } } = await this.service.orderCenter.queryObject(params);
          this.steps = data.DATA.PROCESSING;
          this.baseInfoTab.order = data.DATA.ITEM;
          this.baseInfoTab.sub_item = data.DATA.SUB_ITEM;
          this.loading = false;
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
      BtnConfig.target = this;
      BtnConfig.singleType = 1;
      await this.getDetailsData();
    },

  };
</script>
<style lang="less">
  @import '~omsTheme/public.less';
  .returnBtn{
    margin: 0 @base-mr;
  }
</style>
