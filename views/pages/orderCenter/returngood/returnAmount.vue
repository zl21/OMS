<!--
 * @Author: xx
 * @Date: 2021-05-21 18:08:56
 * @LastEditTime: 2021-07-14 19:43:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/return.vue
-->
<template>
  <div>
    <ul class="calculation-main">
      <li>
        <div class="calculation-item">
          <!-- 商品应退金额 -->
          <span :title="vmI18n.t('other.refundAmountGoods')">{{ vmI18n.t('other.refundAmountGoods') }}</span>
          <label>{{ data.PRO_ACTUAL_AMT }}</label>
        </div>
        <div class="calculation-item bg">
          <!-- 商品实退金额 -->
          <span :title="vmI18n.t('form_label.cr')">{{ vmI18n.t('form_label.cr') }}</span>
          <label>{{ data.PRO_REAL_AMT }}</label>
        </div>
      </li>
      <li class="symbol">+</li>
      <li>
        <div class="calculation-item">
          <!-- 应退运费 -->
          <span :title="vmI18n.t('form_label.cr')">{{ vmI18n.t('form_label.cr') }}</span>
          <label>
            <Input v-if="type" v-model="editData.SHIP_AMT" :regx="/^\d*\.{0,1}\d{0,2}$/" @on-change="inputChange"></Input>
            <span v-else>
              {{ data.SHIP_AMT }}
            </span>
          </label>
        </div>
      </li>
      <li class="symbol">+</li>
      <li>
        <div class="calculation-item">
          <!-- 调整金额 -->
          <span :title="vmI18n.t('table_label.adjustment_amount')">{{vmI18n.t('table_label.adjustment_amount')}}</span>
          <label>
            <Input v-if="type" v-model="editData.ADJUST_AMT" :regx=" /(^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{1,2})?$)/" @on-change="inputChange"></Input>
            <span v-else>
              {{ editData.ADJUST_AMT }}
            </span>
          </label>
        </div>
      </li>
      <li v-if="tableName" class="symbol">-</li>
      <li v-if="tableName" >
        <div class="calculation-item">
          <!-- 换货金额 -->
          <span :title="vmI18n.t('other.exchangeAmounts')">{{ vmI18n.t('other.exchangeAmounts') }}</span>
          <label>{{ data.EXCHANGE_AMT }}</label>
        </div>
      </li>
      <li class="symbol">=</li>
      <li>
        <div class="calculation-item">
          <!-- 最终应退总金额 -->
          <span class="black" :title="vmI18n.t('form_label.ae')">{{ vmI18n.t('form_label.ae') }}</span>
          <label>{{ data.FINAL_ACTUAL_AMT }}</label>
        </div>
        <div class="calculation-item bg">
          <!-- 最终实退总金额 -->
          <span class="black" :title="vmI18n.t('form_label.cs')">{{ vmI18n.t('form_label.cs') }}</span>
          <label>{{ data.FINAL_REAL_AMT }}</label>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      vmI18n:$i18n,
      data: R3.store.state.customize.returnAmount,
      editData:JSON.parse(JSON.stringify(R3.store.state.customize.returnAmount)),
      tableName:this.$route.params.tableName === 'OC_B_RETURN_ORDER_VIRTUAL_TABLE' ? 0 : 1,
      // 手工新增
      type:this.$route.query.RETURN_SOURCE === $i18n.t('btn.addManually') ? 1 : 0
    };
  },
  mounted(){
    // 应退运费，正数，选填项
    // 调整金额，可正可负，选填项
    // 换货金额，sum所有换货商品“成交金额“，只读，正数
    // 最终应退总额=商品应退金额+应退运费+/-调整金额-换货金额，自动算出，

  },
  methods:{
    inputChange(e){
      console.log(this.editData);
      let FINAL_ACTUAL_AMT
      if(this.tableName){
        FINAL_ACTUAL_AMT =  Number(this.data.PRO_REAL_AMT) + Number(this.editData.SHIP_AMT) + Number(this.editData.ADJUST_AMT) - Number(this.data.EXCHANGE_AMT);
      }else{
        FINAL_ACTUAL_AMT =  Number(this.data.PRO_REAL_AMT) + Number(this.editData.SHIP_AMT) + Number(this.editData.ADJUST_AMT);
      }
      this.editData.FINAL_ACTUAL_AMT = FINAL_ACTUAL_AMT;
      this.editData.FINAL_REAL_AMT = FINAL_ACTUAL_AMT;
      R3.store.commit(`customize/returnAmount`, JSON.parse(JSON.stringify({
        SHIP_AMT:Number(this.editData.SHIP_AMT),
        ADJUST_AMT:Number(this.editData.ADJUST_AMT),
        FINAL_ACTUAL_AMT:Number(this.editData.FINAL_ACTUAL_AMT),
        FINAL_REAL_AMT:Number(this.editData.FINAL_REAL_AMT),
      })));
    }
  },
};
</script>
<style lang="less">
@import '~@burgeon/oms-theme/skin/public.less';
.calculation-main {
  display: flex;
  padding: 8px;
  background: fade(#4560ab, 8);
  li {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    .calculation-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      min-width: 50%;
      &.bg {
        background: fade(#4560ab, 10);
      }
      input {
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 28px;
        text-align: center;
        z-index: 5;
      }
      span,
      label {
        height: 30px;
        line-height: 35px;
        font-weight: bold;
        font-size: 12px;
        color: #8d91a1;
        width: 100%;
        text-align: center;
        max-width: 150px;
        #bundle > .points;
        input{
          width: 50%;
          padding: 0 10px;
        }
      }
      label {
        height: 30px;
        line-height: 25px;
        font-size: 16px !important;
        color: #ff6951;
        .black {
          color: black;
        }
      }
    }
    &.symbol {
      flex: 0.1;
      font-size: 30px;
      color: #c3c6d2;
    }
  }
}
</style>