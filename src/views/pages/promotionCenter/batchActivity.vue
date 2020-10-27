<!-- 批量新增、编辑、复制促销活动-->
<template>
  <div v-loading="loading" class="batchActivity">
    <div class="steps_content">
      <div ref="basicSteps" class="basicSteps">
        <BasicInfo ref="area_0" :basic-data="basic_info" />
        <BatchInfoSet
          ref="area_1"
          :objid="objid"
          :basic-data="basic_info"
          :info-data="batch_infos_setting"
        />
      </div>
      <div class="footer">
        <button @click="close">{{ vmI18n.t("common.cancel") }}</button>
        <button v-if="showSaveButton" @click="saveDraft">
          {{ vmI18n.t("btn.saveDraft") }}
        </button>
        <button v-if="showPublishButton" @click="publish">
          {{ vmI18n.t("btn.publish") }}
        </button>
      </div>
    </div>
    <div class="steps_bar">
      <stepsBars :current.sync="current" :steps="stepsBar" />
      <!-- <Steps :current="0" direction="vertical">
        <Step content="基础信息" icon="test iconfont burgeon-iconjibenxinxi"></Step>
        <Step content="条件信息" icon="test iconfont burgeon-iconliuchengtiaojian"></Step>
        <Step content="活动概览" icon="test iconfont burgeon-iconhuodong"></Step>
      </Steps> -->
    </div>
  </div>
</template>
<script>
  import batchActivity from "@/js/pages/promotionCenter/batchActivity";
  export default batchActivity;
</script>
<style lang="less" scoped>
@import "./less/common.less";
@import "~@burgeon/oms-theme/skin/public.less";
@borderColor: #bfcbd9;
@bgColor: #fff;
.batchActivity {
  display: flex;
  height: 100%;
  //height: calc(100% - 30px);
  border: 1px solid @borderColor !important;
  .row {
    .form_content {
      width: 100%;
      display: flex;
    }
    .item-input .input-wrap .input-inner p.mop {
      right: 16px;
    }
  }
  .steps_content {
    position: relative;
    height: 100%;
    width: 92%;
    display: flex;
    flex-direction: column;
    .basicSteps {
      overflow: scroll;
    }
    .footer {
      height: 50px;
      line-height: 50px;
      background: @base-bg;
      border: 1px solid @base-border;
      width: 100%;
      text-align: right;
      > button {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border: 1px solid @button-border;
        font-size: 12px;
        color: @button-border;
        border-radius: 2px;
        margin-right: 10px;
        background: transparent;
      }
    }
  }
  .steps_bar {
    padding: 20px;
    //height: 100%;
    width: 8%;
    border-left: 1px solid #d8d8d8;
    .burgeon-steps-vertical .burgeon-steps-item {
      height: 140px;
      display: flex !important;
      flex-direction: column;
      text-align: center;
    }
    .burgeon-steps
      .burgeon-steps-head-inner
      > .burgeon-steps-icon.burgeon-icon {
      font-size: 50px;
    }
    .burgeon-steps-item.burgeon-steps-custom
      .burgeon-steps-head-inner
      > .burgeon-steps-icon {
      width: 50px;
      height: 50px;
    }
    .burgeon-steps-vertical .burgeon-steps-tail {
      height: calc(100% - 80px);
      //top: 50%;
      left: 50%;
      //transform: translate(-50%, -50%);
      padding: 80px 0 4px 0;
    }
    .burgeon-steps .burgeon-steps-tail > i {
      background: rgb(255, 255, 255);
      border-left: 2px dashed #cccc;
    }
    .burgeon-steps-item.burgeon-steps-status-process .burgeon-steps-tail > i {
      background: rgb(255, 255, 255);
      border-left: 2px dashed #cccc;
    }

    .burgeon-steps-item.burgeon-steps-status-finish
      .burgeon-steps-tail
      > i:after {
      background: rgb(255, 255, 255);
    }
  }
}
</style>
