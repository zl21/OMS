<!--基本信息-->
<template>
  <div class="order-content-tab">
    <div class="order-tab-content">
      <div class="order-tab-title">
        <i class="iconfont">&#xe653;</i>
        <span>基础资料</span>
      </div>
      <div class="order-tab-detail">
        <ul>
          <li v-for="(list, index) of queryList" :key="index">
            <label>
              <i v-if="list.flag">*</i>
              {{list.label}}
            </label>
            <Tooltip v-if="list.label==='平台编号:'" max-width="250">
              <p class="text-ellipsis">{{componentData.order[list.column]}}</p>
              <p slot="content" class="wordBr">{{componentData.order[list.column]}}</p>
            </Tooltip>
            <p v-if="list.label ==='物流单号:'">
              {{componentData.order[list.column]}}
              <span
                style="color: red;"
                v-if="componentData.order.RESERVE_BIGINT05 == 1"
              >(多包裹)</span>
            </p>
            <p
              v-if="list.label!=='平台编号:' && list.label !=='物流单号:'"
            >{{componentData.order[list.column]}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="order-tab-content">
      <div class="order-tab-title">
        <i class="iconfont">&#xe653;</i>
        <span>订单金额</span>
      </div>
      <div class="order-tab-detail2">
        <ul>
          <li>
            <p>商品金额</p>
            <p>{{componentData.order.PRODUCT_AMT==null?componentData.order.PRODUCT_AMT:componentData.order.PRODUCT_AMT}}</p>
          </li>
          <li>+</li>
          <li>
            <p>配送费用</p>
            <p>{{componentData.order.SHIP_AMT}}</p>
          </li>
          <li>+</li>
          <li>
            <p>调整金额</p>
            <p>{{componentData.order.ADJUST_AMT==null || componentData.order.ADJUST_AMT== 0 ?componentData.order.ADJUST_AMT:componentData.order.ADJUST_AMT}}</p>
          </li>
          <li>+</li>
          <li>
            <p>服务费</p>
            <p>{{componentData.order.SERVICE_AMT==null || componentData.order.SERVICE_AMT== 0 ?componentData.order.SERVICE_AMT:componentData.order.SERVICE_AMT}}</p>
          </li>
          <li>-</li>
          <li>
            <p>订单优惠金额</p>
            <p>{{componentData.order.ORDER_DISCOUNT_AMT==null || componentData.order.ORDER_DISCOUNT_AMT == 0 ?componentData.order.ORDER_DISCOUNT_AMT:componentData.order.ORDER_DISCOUNT_AMT}}</p>
          </li>
          <li>-</li>
          <li>
            <p>商品优惠金额</p>
            <p>{{componentData.order.PRODUCT_DISCOUNT_AMT==null || componentData.order.PRODUCT_DISCOUNT_AMT == 0 ?componentData.order.PRODUCT_DISCOUNT_AMT:componentData.order.PRODUCT_DISCOUNT_AMT}}</p>
          </li>
          <li>=</li>
          <li>
            <p class="red strong">总金额</p>
            <p>{{componentData.order.ORDER_AMT==null || componentData.order.ORDER_AMT == 0 ?componentData.order.ORDER_AMT:componentData.order.ORDER_AMT}}</p>
          </li>
          <li>
            <p class="blue strong">已支付金额</p>
            <p>{{componentData.order.RECEIVED_AMT==null || componentData.order.RECEIVED_AMT == 0 ?componentData.order.RECEIVED_AMT:componentData.order.RECEIVED_AMT}}</p>
          </li>
          <li>
            <p class="blue strong">代收(COD)金额</p>
            <p>{{componentData.order.COD_AMT==null || componentData.order.COD_AMT == 0 ?componentData.order.COD_AMT:componentData.order.COD_AMT}}</p>
          </li>
          <!-- <li>
            <p class="blue strong">结算金额</p>
            <p>{{componentData.order.CONSIGN_AMT==null || componentData.order.CONSIGN_AMT == 0 ?componentData.order.CONSIGN_AMT:componentData.order.CONSIGN_AMT}}</p>
          </li>-->
          <li>
            <p class="blue strong">操作费</p>
            <p>{{componentData.order.OPERATE_AMT==null || componentData.order.OPERATE_AMT == 0 ?componentData.order.OPERATE_AMT:componentData.order.OPERATE_AMT}}</p>
          </li>
          <li>
            <p class="blue strong">代销运费</p>
            <p>{{componentData.order.CONSIGN_SHIP_AMT==null || componentData.order.CONSIGN_SHIP_AMT == 0 ?componentData.order.CONSIGN_SHIP_AMT:componentData.order.CONSIGN_SHIP_AMT}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="order-tab-content">
      <div class="order-tab-title">
        <i class="iconfont">&#xe653;</i>
        <span>订单收货地址</span>
        <Icon
          style="fontSize:35px;paddingBottom:2px;marginLeft:15px"
          type="ios-eye"
          @click="eyeClick"
        />
      </div>
      <div class="order-tab-detail">
        <ul>
          <li v-for="(list, index) of detail" :key="index" :class="colStretch(list)">
            <label>
              <i v-if="list.flag">*</i>
              {{list.label}}
            </label>
            <p>{{componentData.order[list.column]}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="order-tab-content">
      <div class="order-tab-title">
        <i class="iconfont">&#xe653;</i>
        <span>订单明细</span>
        <span
          style="float: right;marginTop:16px;fontSize:12px;color:red;fontWeight:300;marginRight:8px;cursor:pointer;"
          v-if="isQh && isQhChild"
          @click="checkCombination"
        >
          <Icon type="ios-repeat" />切换为sku商品显示
        </span>
        <span
          style="float: right;marginTop:16px;fontSize:12px;color:red;fontWeight:300;marginRight:8px;cursor:pointer;"
          v-if="!isQh && isQhChild"
          @click="checkCombination"
        >
          <Icon type="ios-repeat" />切换为平台商品明细
        </span>
      </div>
      <CusOrderItem
        :componentData="tableConfig"
        @freshLoadChild="freshLoadChild"
        @BtnClickEvent="BtnClickEvent"
        @isQhMethod="isQhMethod"
        @replaceGoodsDetail="replaceGoodsDetail"
        :isQh="isQh"
        ref="cusOrderItem"
      ></CusOrderItem>
    </div>
    <!-- freshLoad -->
    <div class="order-tab-content">
      <div class="order-tab-title">
        <i class="iconfont">&#xe653;</i>
        <span>备注</span>
      </div>
      <div class="order-tab-detail3">
        <ul>
          <li>买家备注: {{componentData.order.BUYER_MESSAGE}}</li>
          <li>卖家备注: {{componentData.order.SELLER_MEMO}}</li>
          <li>系统备注: {{componentData.order.SYSREMARK}}</li>
          <li>内部备注: {{componentData.order.INSIDE_REMARK}}</li>
        </ul>
      </div>
    </div>

    <businessDialog
      v-for="(list, index) in dialogs"
      :key="index"
      :ref="list.name"
      :url="list.url"
      :title="list.title"
      :name="list.name"
      :keepAlive="list.keepAlive||true"
      :width="list.width||''"
      :excludeString="list.excludeString"
      :componentData="list.data"
      :footerHide="list.footerHide"
      :quit="list.quit"
      :confirm="list.confirm"
    ></businessDialog>
    <!-- 公共弹框 -->
    <businessDialog
      :title="publicBouncedConfig.confirmTitle"
      :titleAlign="publicBouncedConfig.titleAlign"
      :width="publicBouncedConfig.width"
      :scrollable="publicBouncedConfig.scrollable"
      :closable="publicBouncedConfig.closable"
      :draggable="publicBouncedConfig.draggable"
      :mask="publicBouncedConfig.mask"
      :mask-closable="publicBouncedConfig.maskClosable"
      :transfer="publicBouncedConfig.transfer"
      :name="publicBouncedConfig.name"
      :url="publicBouncedConfig.url"
      :batchClosed="publicBouncedConfig.batchClosed"
      :keepAlive="publicBouncedConfig.keepAlive"
      :excludeString="publicBouncedConfig.excludeString"
      :componentData="publicBouncedConfig.componentData"
      :quit="publicBouncedConfig.quit"
    ></businessDialog>
  </div>
</template>

<script>
import businessButton from "professionalComponents/businessButton";
import businessActionTable from "professionalComponents/businessActionTable";
const _importA = file => require(`${file}.vue`).default;
import businessDialog from "professionalComponents/businessDialog";
import CusOrderItem from "./custOrderItem";
// import publicMethodsUtil from "@/assets/js/publicMethods";
// import { BILL_STATUS } from "./config.js";
import publicDialogConfig from "professionalComponents/common/js/publicDialog.js";
// import axios from "axios";
let self = null;
export default {
  name: "EssentialInfo",
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
      isQh: false,
      isQhChild: false,
      dialogs: {
        addGift: {
          title: "添加赠品",
          titleAlign: "center",
          data: {},
          url: "order/addGiftItem",
          name: "addGiftDialog",
          keepAlive: true,
          width: 600,
          excludeString: "addGiftDialog",
          footerHide: true,
        },
        changeSku: {
          title: "更换商品",
          titleAlign: "center",
          data: {},
          url: "order/changeProduct",
          width: 800,
          keepAlive: true,
          name: "changeSkuDialog",
          excludeString: "changeSkuDialog",
          footerHide: true,
        }
      },
      queryList: [
        {
          flag: false, //需要加*
          column: "ID",
          label: "订单编号:"
        },
        {
          column: "BILL_NO",
          label: "单据编号:"
        },
        {
          flag: false, //是否需要加 *
          column: "SOURCE_CODE", //字段
          type: "select", //类型
          label: "平台编号:" //标签
        },
        {
          flag: false,
          column: "PLATFORM_STATUS_NAME",
          label: "平台状态"
        },
        {
          flag: false, //需要加*
          column: "CP_C_SHOP_TITLE",
          label: "下单店铺:"
        },
        {
          flag: false,
          column: "ORDER_STATUS_NAME",
          label: "单据状态:"
        },
        {
          flag: false, //需要加*
          column: "PLATFORM_NAME",
          label: "平台:"
        },
        {
          flag: false, //需要加*
          column: "CP_C_PHY_WAREHOUSE_ENAME",
          label: "发货仓库:"
        },
        {
          flag: false, //需要加*
          column: "USER_NICK",
          label: "买家昵称:"
        },
        {
          flag: false, //需要加*
          column: "ORIG_RETURN_ORDER_ID",
          label: "退换货单:"
        },
        {
          flag: false, //需要加*
          column: "ORDER_TIME",
          label: "下单日期:"
        },
        {
          flag: false, //需要加*
          column: "PAY_NAME",
          label: "付款方式:"
        },
        {
          flag: false, //需要加*
          column: "CP_C_LOGISTICS_ENAME",
          label: "物流公司:"
        },
        {
          flag: false, //需要加*
          column: "EXPRESSCODE",
          label: "物流单号:"
        },
        {
          flag: false, //需要加*
          column: "WEIGHT",
          label: "商品重量(KG):"
        },
        {
          flag: false, //需要加*
          column: "IS_SELF_TAKE_NAME",
          label: "是否自提:"
        },
        // {
        //   flag: false, //需要加*
        //   column: "TO_SETTLE_STATUS_TAG",
        //   label: "是否传SAP:"
        // },
        {
          flag: false, //需要加*
          column: "TO_SETTLE_STATUS_NAME",
          label: "传SAP状态:"
        },
        {
          flag: false, //需要加*
          column: "STORE_DELIVERY_STATUS_NAME",
          label: "门店接口状态:"
        },
        {
          flag: false, //需要加*
          column: "DELIVERY_STORE_NAME",
          label: "发货门店名称:"
        },
        {
          flag: false, //需要加*
          column: "DELIVERY_STORE_CODE",
          label: "发货门店编码:"
        }
      ],
      detail: [
        {
          flag: false,
          column: "RECEIVER_NAME",
          label: "收货人:"
        },
        {
          flag: false,
          column: "RECEIVER_MOBILE",
          label: "收货人手机:"
        },
        {
          flag: false,
          column: "RECEIVER_PHONE",
          label: "电话:"
        },
        {
          flag: false,
          column: "RECEIVER_ZIP",
          label: "邮编:"
        },
        {
          flag: false,
          column: "CP_C_REGION_PROVINCE_ENAME",
          label: "省:"
        },
        {
          flag: false,
          column: "CP_C_REGION_CITY_ENAME",
          label: "市:"
        },
        {
          flag: false,
          column: "CP_C_REGION_AREA_ENAME",
          label: "区:"
        },
        {
          flag: false,
          column: "SHIP_AMT",
          label: "邮费:"
        },
        {
          flag: false,
          width: 2,
          column: "RECEIVER_ADDRESS",
          label: "收货人地址:"
        }
      ],
      tableConfig: {
        tablename: "OC_B_ORDER_ITEM",
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
      handler: function (newobj, oldobj) {
        this.tableConfig.objid = newobj.order.ID;
        this.tableConfig.order = newobj.order;
      },
      deep: true
    }
  },
  methods: {
    eyeClick() {
      this.$emit('freshLoad', true);
    },
    isQhMethod(data) {
      this.isQhChild = data;
    },
    checkCombination() {
      let self = this;
      self.isQh = !self.isQh;
      self.$refs.cusOrderItem.checkCombination();
      // console.log(self.$refs.cusOrderItem)
    },
    freshLoadChild() {
      this.$emit('freshLoad')
    },
    colStretch(obj) {
      let col = obj.width;
      if (col === 2) {
        return 'colsTwo';
      } else {
        return '';
      }

    },
    //子组件点击按钮事件通知
    BtnClickEvent(obj) {
      let name = obj.name || "";
      let rows = obj.rows || [];
      switch (name) {
        case "ADDGIFT":
          this.dialogs.addGift.data = { objid: this.componentData.order.ID || -1 }
          this.$refs.addGiftDialog[0].openConfirm();
          break;
        case "CHANGESKU":
          //判断是否有选中明细
          if (rows.length === 0) return this.$Message.error("请选择需要更换商品记录！");
          if (rows.length > 1) return this.$Message.error("只能选择一条商品记录！");
          let itemobjid = rows[0].ID;
          let itemskuid = rows[0].SKU_ID;
          this.dialogs.changeSku.data = { itemobjid: itemobjid, itemskuid: itemskuid, objid: this.componentData.order.ID || -1 }
          this.$refs.changeSkuDialog[0].openConfirm();
          break;
      }
    },
    //详情按钮替换商品弹框
    replaceGoodsDetail(data) {
      console.log(data);
      let self = this;
      self.publicBouncedConfig = Object.assign(
        publicDialogConfig.replaceGoodsDetailConfig,
        {
          componentData: {
            ids: [self.$route.query.id],
            itemId: data[0].ID
          }
        }
      );
      setTimeout(() => {
        self.$children
          .find(item => item.name === "replaceGoodsDetail")
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
</script>

<style lang="less" scoped>
.order-content-tab {
  .order-tab-content {
    margin-bottom: 8px;
    margin-top: 8px;
    padding: 5px;
    overflow: auto;
    border: 1px solid #ccc;

    .order-tab-title {
      margin: 3px;
      font-weight: 600;
      font-size: 16px;
    }

    .order-tab-detail {
      position: relative;
      ul {
        display: flex;
        flex-direction: row;
        flex-flow: wrap;
        li {
          padding: 5px 0px;
          display: flex;
          width: 25%;
          label {
            min-width: 100px;
            text-align: right;
          }
          p {
            margin-left: 10px;
          }
        }

        .colsTwo {
          width: 50%;
        }
      }
    }

    .order-tab-detail2 {
      position: relative;
      ul {
        display: flex;

        li {
          text-align: center;
          margin: 10px;
          height: 40px;
          line-height: 20px;

          .red {
            color: #f52f2f;
          }

          .blue {
            color: blue;
          }

          .strong {
            font-weight: 600;
          }
        }
      }
    }

    .order-tab-detail3 {
      position: relative;

      ul {
        li {
          margin: 10px;
          display: flex;
        }
      }
    }

    ul {
      li {
        i {
          width: 8px;
          display: inline-block;
          position: relative;
          top: 3px;
          right: 4px;
          color: #f52f2f;
        }
      }
    }
  }
}
.text-ellipsis {
  max-width: 175px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.wordBr {
  word-break: break-all;
  word-wrap: break-word;
}
</style>
