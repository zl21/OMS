<!--基本信息-->
<template>
  <!-- 订单金额 -->
  <div class="goodsTotalAmount">
    <!-- 商品总金额 -->
    <span class="title">{{ vmI18n.t('form_label.ai')}}</span>
    <ul class="goodsTotalAmount-ul">
      <li>
        <!-- 零售价合计 -->
        <label>{{$i18n.t('form_label.b2')}}</label>
        <p>{{ orderOrder.PRODUCT_AMT }}</p>
      </li>
      <li class="symbol">-</li>
      <li>
        <!-- 商品优惠 -->
        <label>{{$i18n.t('form_label.b3')}}</label>
        <p>{{ orderOrder.PRODUCT_DISCOUNT_AMT }}</p>
      </li>
      <li class="symbol">-</li>
      <li>
        <!-- 订单优惠金额 -->
        <label>{{$i18n.t('form_label.b4')}}</label>
        <p>{{  orderOrder.ORDER_DISCOUNT_AMT }}</p>
      </li>
      <li class="symbol">+</li>
      <li>
        <!-- 调整金额 -->
        <label>{{$i18n.t('table_label.adjustment_amount')}}</label>
        <p>{{ orderOrder.ADJUST_AMT }}</p>
      </li>
      <li class="symbol">=</li>
      <li>
        <!-- 商品总金额 -->
        <label>{{ vmI18n.t('form_label.ai')}}</label>
        <p>{{retailPriceTotal}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  // const _ = require('lodash');
  import publicMethodsUtil from '@/assets/js/public/publicMethods';
  export default {
    name: 'EssentialInfo',
    props: {
      data: {}
    },
    data() {
      return {
        retailPriceTotal: '',
        orderOrder:[]
      };
    },
    methods: {
    },
    watch:{
      data: {
        handler(newVal) {
         this.orderOrder.PRODUCT_AMT =  newVal.order.PRODUCT_AMT || 0.00;
         this.orderOrder.PRODUCT_DISCOUNT_AMT =  newVal.order.PRODUCT_DISCOUNT_AMT || 0.00;
         this.orderOrder.ORDER_DISCOUNT_AMT =  newVal.order.ORDER_DISCOUNT_AMT || 0.00;
         this.orderOrder.ADJUST_AMT =   newVal.order.ADJUST_AMT || 0.00;
         let acc = publicMethodsUtil.accSub(Number(newVal.order.PRODUCT_AMT || 0.00),Number(newVal.order.PRODUCT_DISCOUNT_AMT || 0.00)) 
         let acc1 = publicMethodsUtil.accSub(Number(acc),Number(newVal.order.ORDER_DISCOUNT_AMT || 0.00)) 
         this.retailPriceTotal = publicMethodsUtil.accAdd(acc1,Number(newVal.order.ADJUST_AMT || 0.00));
         this.retailPriceTotal = this.$OMS2.omsUtils.floatNumber(this.retailPriceTotal)
         this.$emit('retailPriceTotal', this.retailPriceTotal);
        },
        deep: true
      },
    },
    mounted() {
    },
    created() {}
  };
</script>

<style lang="less" scoped>
  @import '~@burgeon/oms-theme/skin/public.less';
  .goodsTotalAmount{
      display: grid;
      grid-template-columns: 24px calc(100% - 24px);
      align-items: center;
      min-height: 100px;
      width: 600px;
      .title{
        background: rgba(69,96,171,0.16);
        line-height: 24px;
        text-align: center;
        writing-mode: vertical-lr;
        height: 80px;
        color: rgba(84,97,184,0.60);
        font-weight: bold;
      }
      .goodsTotalAmount-ul{
        display: grid;
        grid-template-columns:repeat(5,auto 20px);
        height: 80px;
        align-content: center;
        background-color: #F5F7FB;
        li{
          display: grid;
          align-items: center;
          text-align: center;
          &.symbol{
            color: #c3c6d2;
            font-size: 32px;
          }
          label{
            height: 25px;
            line-height: 25px;
            color: #8d91a1;
          }
          p{
            font-size: 16px;
            color: #FF6951;
            height: 25px;
            line-height: 25px;
          }
          &:last-child{
            label{
              color: #292f43;
              font-weight: bold;
            }
            p {
              font-weight: bold;
            }
          }
        }
      }
    }
</style>
