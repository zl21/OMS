<!--订单中心->智能地址解析页面-->
<template>
  <div class="order_address customized-modal">
    <loading :loading="loading" />
    <Form :label-width="100" :rules="ruleValidate">
      <!-- <FormItem label="收货信息"> -->
      <FormItem :label="vmI18n.t('table_label.receivingInfo')">
        <span v-html="data.receiver_address" />
      </FormItem>
      <!-- 新收货信息 -->
      <FormItem :label="vmI18n.t('table_label.new_receivingInfo')">
        <Input
          ref="newReceivAddress"
          v-model="newReceivAddress"
          placeholder="请输入规范收货地址后，按Enter键"
          @on-blur="parseAddress"
          @on-enter="parseAddress"
        /></Input>
         <Tooltip class="showTooltip" max-width ="400" theme = "dark" content="格式:张三,17788888888,上海上海市闵行区黎安路999号" placement="top-start">
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
        /></Input>
      </FormItem>
      <!-- 收货人手机 -->
      <FormItem :label="vmI18n.t('form_label.consignee_phone')" prop="receiver_mobile">
        <Input
          v-model="data.receiver_mobile"
          placeholder
        /></Input>
      </FormItem>
       <!-- 新详细地址 -->
      <FormItem :label="vmI18n.t('table_label.new_detailed_address')" prop="receiver_address">
        <Input
          v-model="data.receiver_address"
          placeholder
        /></Input>
      </FormItem>
      <!-- 收货人电话 -->
      <FormItem :label="vmI18n.t('form_label.consignee_tel')">
        <Input
          v-model="data.receiver_phone"
          placeholder
        /></Input>
      </FormItem>
      <!-- 收货人邮编 -->
      <FormItem :label="vmI18n.t('form_label.consignee_postcode')">
        <Input
          v-model="data.receiver_zip"
          placeholder
        /></Input>
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
        <span>{{ componentData.SYSREMARK }}</span>
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
</style>
