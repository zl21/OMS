<!--订单中心->智能地址解析页面-->
<template>
  <div class="order_address">
    <div class="order_address_loading" v-show="isShowFromLoading">
      <Spin></Spin>
    </div>
    <Form :label-width="80">
      <!-- <FormItem label="收货信息"> -->
      <FormItem :title="vmI18n.t('table_label.receivingInfo')">
        <span v-html="componentData.OLDRECEIVERADDRESS"></span>
      </FormItem>
      <!-- <FormItem label="新收货信息"> -->
      <FormItem :title="vmI18n.t('table_label.new_receivingInfo')">
        <Input
          v-model="newReceivAddress"
          placeholder
          ref="newReceivAddress"
          @on-blur="parseAddress"
          @on-enter="parseAddress"
        ></Input>
      </FormItem>
      <!-- <FormItem label="新地址"> -->
      <FormItem :title="vmI18n.t('table_label.new_address')">
        <div class="province_city_area">
          <Select
            v-model="data.cp_c_region_province_id"
            class="col-sm-3"
            filterable
            @on-clear="clearProv"
            @on-change="clearProv"
          >
            <Option v-for="item in provList" :value="item.ID" :key="item.ID">{{
              item.ENAME
            }}</Option>
          </Select>
          <!-- <span class="fenge">省</span> -->
          <span class="fenge">{{ vmI18n.t("common.province") }}</span>
          <Select
            v-model="data.cp_c_region_city_id"
            class="col-sm-3"
            filterable
            @on-clear="clearCity"
            @on-change="clearCity"
            @on-open-change="getCity()"
          >
            <Option v-for="item in cityList" :value="item.ID" :key="item.ID">{{
              item.ENAME
            }}</Option>
          </Select>
          <!-- <span class="fenge">市</span> -->
          <span class="fenge">{{ vmI18n.t("common.city") }}</span>
          <Select
            v-model="data.cp_c_region_area_id"
            class="col-sm-3"
            filterable
            @on-clear="clearArea"
            @on-open-change="getArea()"
          >
            <Option v-for="item in areaList" :value="item.ID" :key="item.ID">{{
              item.ENAME
            }}</Option>
          </Select>
          <!-- <span class="fenge">区</span> -->
          <span class="fenge">{{ vmI18n.t("common.region") }}</span>
        </div>
      </FormItem>
      <!-- <FormItem label="新详细地址"> -->
      <FormItem :title="vmI18n.t('table_label.new_detailed_address')">
        <Input v-model="data.receiver_address" placeholder></Input>
      </FormItem>
      <!-- <FormItem label="收货人"> -->
      <FormItem :title="vmI18n.t('form_label.consignee')">
        <Input
          v-model="data.receiver_name"
          placeholder
          :regx="regx.name"
        ></Input>
      </FormItem>
      <!-- <FormItem label="收货人手机"> -->
      <FormItem :title="vmI18n.t('form_label.consignee_phone')">
        <Input v-model="data.receiver_mobile" placeholder></Input>
      </FormItem>
      <!-- <FormItem label="收货人电话"> -->
      <FormItem :title="vmI18n.t('table_label.consignee_tel')">
        <Input v-model="data.receiver_phone" placeholder></Input>
      </FormItem>
      <!-- <FormItem label="收货人邮编"> -->
      <FormItem :title="vmI18n.t('table_label.consignee_postcode')">
        <Input v-model="data.receiver_zip" placeholder></Input>
      </FormItem>
      <!-- <FormItem label="收货人邮费">
        <Input v-model="data.ship_amt" placeholder :regx="regx.shipamt"></Input>
      </FormItem>-->
      <!-- <FormItem label="买家备注"> -->
      <FormItem :title="vmI18n.t('form_label.buyerNotes')">
        <span>{{ componentData.BUYER_MESSAGE }}</span>
      </FormItem>
      <!-- <FormItem label="卖家备注"> -->
      <FormItem :title="vmI18n.t('form_label.sellerNotes')">
        <span>{{ componentData.SELLER_MEMO }}</span>
      </FormItem>
      <!-- <FormItem label="系统备注"> -->
      <FormItem :title="vmI18n.t('other.systemNotes')">
        <span>{{ componentData.SYSREMARK }}</span>
      </FormItem>
    </Form>
    <div class="order-footer">
      <jordanButton :btnConfig="btnConfig"></jordanButton>
    </div>
  </div>
</template>

<script>
  import resolveAddress from "@/js/modal/orderCenter/resolveAddress";
  export default resolveAddress;
</script>

<style lang="less" scoped>
  @import "~@/css/modal/orderCenter/resolveAddress.less";
</style>
