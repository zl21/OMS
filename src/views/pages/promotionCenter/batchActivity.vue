<!-- 批量新增、编辑、复制促销活动-->
<template>
  <div
    v-loading="loading"
    class="batchActivity"
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
        <BatchInfoSet
          ref="area_1"
          :objid="objid"
          :basic-data="basic_info"
          :info-data="batch_infos_setting"
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
      <!-- <Steps :current="0" direction="vertical">
        <Step content="基础信息" icon="test iconfont burgeon-iconjibenxinxi"></Step>
        <Step content="条件信息" icon="test iconfont burgeon-iconliuchengtiaojian"></Step>
        <Step content="活动概览" icon="test iconfont burgeon-iconhuodong"></Step>
      </Steps> -->
    </div>
  </div>
</template>
<script>
  import batchActivity from '@/js/pages/promotionCenter/batchActivity';

  export default batchActivity;
</script>
<style lang="less" scoped>
@import "./less/common.less";
@import "~@burgeon/oms-theme/skin/public.less";
@import "~@/css/pages/promotionCenter/batchActivity.less";
</style>
