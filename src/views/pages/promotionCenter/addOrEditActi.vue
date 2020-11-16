<!-- 新增 或者 编辑 或者 复制促销-->
<template>
  <div
    v-loading="loading"
    class="addOrEditActi"
  >
    <div class="steps_content">
      <div
        ref="basicSteps"
        class="basicSteps"
      >
        <BasicInfo
          ref="area_0"
          :basic-data="basic_info"
        />
        <InfoSet
          v-if="showInfoDataContainer"
          ref="area_1"
          :load-dis="loadDis"
          :basic-data="basic_info"
          :info-data="condition_info_setting"
        />
        <GiftSet
          ref="area_2"
          :objid="objid"
          :dialog_visible="dialog_visible"
          :load-dis="loadDis"
          :basic-data="basic_info"
          :gift-data="gift_info_setting"
          @setcommodity="setCommodityEvent"
          @closeDialog="closeDialog"
          @confirm="confirm"
        />
      </div>
      <div class="footer">
        <button @click="close">
          {{ vmI18n.t("common.cancel") }}
        </button>
        <button
          v-if="showSaveButton"
          @click="saveDraft"
        >
          {{ vmI18n.t("btn.saveDraft") }}
        </button>
        <button
          v-if="showPublishButton"
          @click="publish"
        >
          {{ vmI18n.t("btn.publish") }}
        </button>
      </div>
    </div>
    <div class="steps_bar">
      <stepsBars
        :current.sync="current"
        :steps="stepsBar"
      />
    </div>
  </div>
</template>
<script>
  import addOrEditActi from '@/js/pages/promotionCenter/addOrEditActi';

  export default addOrEditActi;
</script>
<style lang="less" scoped>
@import "./less/common.less";
@import "~@burgeon/oms-theme/skin/public.less";
@import "~@/css/pages/promotionCenter/addOrEditActi.less";
</style>
