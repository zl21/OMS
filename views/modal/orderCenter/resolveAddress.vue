<!--
 * @Author: your name
 * @Date: 2021-05-12 14:32:32
 * @LastEditTime: 2021-05-19 18:11:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/orderCenter/resolveAddress.vue
-->
<!--订单中心->智能地址解析页面-->
<template>
  <div class="order_address customized-modal">
    <loading :loading="loading" />
    <Form :model="data" :label-width="100" :rules="ruleValidate">
      <!-- <FormItem label="收货信息"> -->
      <FormItem :label="vmI18n.t('table_label.receivingInfo')">
        <span v-html="ORDER_ADDRESS" />
      </FormItem>
      <!-- 新收货信息 -->
      <FormItem :label="vmI18n.t('table_label.new_receivingInfo')">
        <Input
          ref="newReceivAddress"
          v-model="newReceivAddress"
          placeholder="请输入规范收货地址后，按Enter键"
          @on-change="newAddressChange"
          @on-blur="parseAddress"
          @on-enter="parseAddress"
        />
         <Tooltip class="showTooltip" theme = "light" content="格式:张三,17788888888,上海上海市闵行区黎安路999号" placement="top-start">
           <Icon type="ios-alert-outline" />
         </Tooltip>
      </FormItem>
      <!-- 新地址 -->
      <businessForm :form-config="formConfig" />
      <!-- 收货人 -->
      <FormItem :label="vmI18n.t('form_label.consignee')" prop="receiver_name">
        <Input
          v-model="data.receiver_name"
          placeholder
          :regx="regx.name"
        />
      </FormItem>
      <!-- 收货人手机 -->
      <FormItem :label="vmI18n.t('form_label.consignee_phone')" prop="receiver_mobile">
        <Input
          v-model="data.receiver_mobile"
          placeholder
        />
      </FormItem>
       <!-- 新详细地址 -->
      <FormItem :label="vmI18n.t('table_label.new_detailed_address')" prop="receiver_address">
        <Input
          v-model="data.receiver_address"
          placeholder
        />
      </FormItem>
      <!-- 收货人电话 -->
      <FormItem :label="vmI18n.t('form_label.consignee_tel')">
        <Input
          v-model="data.receiver_phone"
          placeholder
        />
      </FormItem>
      <!-- 收货人邮编 -->
      <FormItem :label="vmI18n.t('form_label.consignee_postcode')">
        <Input
          v-model="data.receiver_zip"
          placeholder
        />
      </FormItem>
      <!-- 买家备注 -->
      <FormItem :label="vmI18n.t('form_label.buyerNotes')">
        <span>{{ componentData.BUYER_MESSAGE }}</span>
      </FormItem>
      <!-- 卖家备注 -->
      <FormItem :label="vmI18n.t('form_label.sellerNotes')">
        <span>{{ componentData.SELLER_MEMO }}</span>
      </FormItem>
      <!-- 系统备注 -->
      <FormItem :label="vmI18n.t('other.systemNotes')">
        <span>{{ componentData.SYS_REMARK }}</span>
      </FormItem>
    </Form>
    <businessButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
import resolveAddress from '@/js/modal/orderCenter/resolveAddress';

export default resolveAddress;
</script>

<style lang="less">
@import '~@/css/modal/orderCenter/resolveAddress.less';
.popInput{
.el-input__inner{
    padding: 0;
  }
}
.fkAutocompleteCP_C_REGION_PROVINCE_ID{
  min-width: 200px !important;
}
.showTooltip{
  .ark-tooltip-inner{
    max-width: 360px;
  }
}
</style>
