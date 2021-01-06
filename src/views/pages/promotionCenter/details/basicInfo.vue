<!-- 基础信息 -->
<template>
  <div class="basicInfo">
    <div class="title">
      <i class="iconfont icon-jibenxinxi" />
      <!-- 基础活动 -->
      <span>{{ vmI18n.t("other.basic_info") }}</span>
    </div>
    <div
      v-if="$route.query.id > 0"
      class="row"
    >
      <div class="form_label">
        <i class="red">*</i>
        <!-- 促销编号 -->
        {{ vmI18n.t("form_label.promotionNo") }}：
      </div>
      <div class="form_content">
        <div class="form_el_input">
          <input
            v-model="basicData.activity_no"
            placeholder=""
            disabled
            @keyup="limitName"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i> {{ vmI18n.t("form_label.activityName") }}：
      </div>
      <div class="form_content">
        <div class="form_el_input">
          <input
            v-model="basicData.activity_name"
            placeholder=""
            @keyup="limitName"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <myInputLd
        :is-active="true"
        :is-disabled="false"
        :itemdata="basicData.stores.itemdata"
        :is-object="basicData.stores.itemdata.isObject"
      />
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>{{ vmI18n.t("form_label.orderType") }}：
      </div>
      <div class="form_content">
        <MultipleBox
          :values="basicData.order_type"
          :options="groups.orderTypes"
          @changeOptions="checkOrderTypeChange"
        />
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red" />{{ vmI18n.t("form_label.platform_marking") }}：
      </div>
      <div class="form_content">
        <MultipleBox
          :values="basicData.platform_mark"
          :options="groups.platformTabs"
          @changeOptions="checkPlatformTabsChange"
        />
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>{{ vmI18n.t("form_label.timeType") }}：
      </div>
      <div class="form_content">
        <SingleBox
          :value="basicData.time_type"
          :options="timeTypes"
          @changeSingle="checkTimeTypeChange"
        />
        <div class="form_item">
          <i class="red">*</i>{{ vmI18n.t("form_label.timeRange") }}：
          <DatePicker
            :value="basicData.time_limit"
            format="yyyy/MM/dd HH:mm:ss"
            type="datetimerange"
            placement="bottom-end"
            placeholder
            style="width: 300px"
            @on-change="handleTimeLimitChange"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>{{ vmI18n.t("form_label.offlineTime") }}：
      </div>
      <div class="form_content">
        <DatePicker
          :value="basicData.offline_time"
          format="yyyy/MM/dd HH:mm:ss"
          type="datetime"
          placeholder
          style="width: 200px"
          @on-change="handleOfflineTimeChange"
        />
      </div>
    </div>

    <div class="row">
      <div class="form_label">
        <i class="red">*</i>{{ vmI18n.t("form_label.activityType") }}：
      </div>
      <div class="form_content">
        <SingleBox
          :value="basicData.activity_type"
          :options="actiTypes"
          @changeSingle="checkActiTypesChange"
        />
      </div>
    </div>
    <div
      v-if="basicData.gradient_gift"
      class="row"
    >
      <div class="form_label">
        <i class="red">*</i>{{ vmI18n.t("form_label.gradient_gift") }}：
      </div>
      <div class="form_content">
        <SingleBox
          :value="basicData.gradient_gift"
          :options="groups.gradientGift"
          @changeSingle="checkGradientGiftChange"
        />
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        {{ vmI18n.t("form_label.order_notes") }}：
      </div>
      <div class="form_content">
        <SingleBox
          :value="basicData.order_notes_type"
          :options="groups.orderRemarks"
          @changeSingle="checkOrderRemarksChange"
        />
        <div class="form_item">
          {{ vmI18n.t("form_label.remarks_content") }}：
        </div>
        <div class="form_el_input form_item">
          <input
            v-model="basicData.order_note_content"
            oninput="this.value=this.value.replace(/ /g,'')"
            :placeholder="vmI18n.t('pHolder.a0')"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <myInputLd
        :is-active="true"
        :is-disabled="false"
        :itemdata="basicData.except_provinces.itemdata"
      />
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red" />{{ vmI18n.t("form_label.one_participation_times") }}：
      </div>
      <div class="form_content">
        <SingleBox
          :value="basicData.buyer_limit_frequency"
          :options="groups.buyerLimitFrequency"
          @changeSingle="checkBuyerLimitFrequencyChange"
        />
        <div class="form_item">
          {{ vmI18n.t("form_label.max_times") }}
        </div>
        <div class="form_el_input form_item limitinput">
          <input
            v-model="basicData.buyer_max_frequency"
            oninput="this.value= this.value.match(/^[1-9]\d{0,2}/) ? this.value.match(/^[1-9]\d{0,2}/)[0] : ''"
            placeholder
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import basicInfo from '@/js/pages/promotionCenter/details/basicInfo';

  export default basicInfo;
</script>
<style lang="less">
@import "~@/css/pages/promotionCenter/details/basicInfo.less";
</style>
