<!--
 * @Author: xx
 * @Date: 2021-05-19 10:53:30
 * @LastEditTime: 2021-05-19 14:01:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/pages/orderCenter/returngood/returnGoods.vue
-->
<template>
  <div class="returnGoods">
    <div class="switch" v-if="IS_GROUP">
      <span @click="onSitch()"> {{switchText}} </span>
    </div>
    <business-action-table :jordan-table-config="returnDetailAddTable.table"/>
  </div>
</template>

<script>
  import businessForm from 'professionalComponents/businessForm';
  import businessActionTable from 'professionalComponents/businessActionTable';
  export default {
    name:'returnGodds',
    components:{
      businessForm,
      businessActionTable
    },
    data(){
      return{
        isSku:false,
        switchText:'切换为sku商品展示',
        IS_GROUP:true,
        returnDetailAddTable: {
        modal: false,
        pageShow: true, // 控制分页是否显示
        table: {
          columns: [
            {
              key: 'PS_C_PRO_ECODE',
              dataAcessKey: 'PS_C_PRO_ECODE',
              title: $i18n.t('table_label.productNo'), // 商品编码
            },
            {
              key: 'PS_C_PRO_ENAME',
              dataAcessKey: 'PS_C_PRO_ENAME',
              title: $i18n.t('form_label.goodsName'), // 商品名称
            },
            {
              key: 'skuEcode',
              dataAcessKey: 'skuEcode',
              title: $i18n.t('table_label.code_SKU'), // SKU编码
            },
            {
              key: 'PS_C_SKU_ENAME',
              dataAcessKey: 'PS_C_SKU_ENAME',
              title: $i18n.t('form_label.skuName'), // SKU名称
            },
            {
              key: 'PS_C_CLR_ENAME',
              dataAcessKey: 'PS_C_CLR_ENAME',
              title: $i18n.t('table_label.whetherGift'), // 赠品标记
            },
            {
              key: 'PS_C_SIZE_ENAME',
              dataAcessKey: 'PS_C_SIZE_ENAME',
              title: $i18n.t('form_label.specs') + 1, // 规格1
            },
            {
              key: 'QTY_REFUND',
              dataAcessKey: 'QTY_REFUND',
              title: $i18n.t('form_label.specs') + 2, // 规格2
            },
            {
              key: 'PS_C_SKU_ECODE',
              dataAcessKey: 'PS_C_SKU_ECODE',
              title: $i18n.t('form_label.specs') + 3, // 规格3
            },
            {
              key: 'QTY_CAN_REFUND',
              dataAcessKey: 'QTY_CAN_REFUND',
              title: $i18n.t('form_label.purchaseQuantity'), // 购买数量
            },
            {
              key: 'PRICE',
              dataAcessKey: 'PRICE_LIST',
              title: $i18n.t('table_label.unitPrice'), // 成交单价
            },
            {
              key: 'amt_refund_single',
              dataAcessKey: 'AMT_REFUND_SINGLE',
              title: $i18n.t('table_label.transactionAmount'), // 成交金额
            },
            {
              key: 'AMT_REFUND',
              dataAcessKey: 'AMT_REFUND',
              title:$i18n.t('form_label.apply_refundAmount'), // 申请退款金额
            },
            {
              key: 'PRICE_SETTLE',
              dataAcessKey: 'PRICE_SETTLE',
              title: $i18n.t('form_label.actualRefundAmount'), // 实际退款金额
            }
          ], // 表头
          data: [], // 数据配置
          indexColumn: true, // 是否显示序号
          loading: false,
          isShowSelection: true, // 是否显示checkedbox
        }
      },
      }
    },
    created(){
      
    },
    mounted(){

    },
    methods:{
      onSitch(){
        this.isSku ? this.switchText = '切换为sku商品展示' : this.switchText = '切换为平台商品展示';
        this.isSku = !this.isSku;
      }
    }
  }
</script>

<style lang="less">
  @import '~@burgeon/oms-theme/skin/public.less';
  .ItemComponentRoot.VERSION{
    position: relative;
    overflow: inherit;
    .switch{
      position: absolute;
      right: 0;
      top: -38px;
      color: @base-color;
    }
  }
  
</style>