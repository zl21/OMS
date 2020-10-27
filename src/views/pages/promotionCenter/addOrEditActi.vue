<!-- 新增 或者 编辑 或者 复制促销-->
<template>
  <div v-loading="loading" class="addOrEditActi">
    <div class="steps_content">
      <div ref="basicSteps" class="basicSteps">
        <BasicInfo ref="area_0" :basic-data="basic_info" />
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
          :load-dis="loadDis"
          :basic-data="basic_info"
          :gift-data="gift_info_setting"
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
      <!-- <Steps :current="0" direction="vertical">
        <Step content="基础信息" icon="test iconfont burgeon-iconjibenxinxi" ></Step>
        <Step content="条件信息" icon="test iconfont burgeon-iconliuchengtiaojian"  @click="positionSteps(1)"></Step>
        <Step content="赠品信息" icon="test iconfont burgeon-iconzengpin" @click="positionSteps(2)"></Step>
        <Step content="活动概览" icon="test iconfont burgeon-iconhuodong" @click="positionSteps(3)"></Step>
      </Steps> -->
      <stepsBars :current.sync="current" :steps="stepsBar" />
    </div>
  </div>
</template>
<script>
  import addOrEditActi from "@/js/pages/promotionCenter/addOrEditActi";
  export default addOrEditActi;
</script>
<style lang="less" scoped>
@import "./less/common.less";
@import "~@burgeon/oms-theme/skin/public.less";
@borderColor: #bfcbd9;
.addOrEditActi {
  /deep/ .ark-table-overflowX {
    input {
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      border: 1px solid #dcdfe6;
      border-radius: 2px;
      text-align: left;
      padding: 0 15px;
      color: #606266;
    }
  }
  /deep/ .form_el_input input {
    color: #606266;
  }
  display: flex;
  height: 100%;
  //height: calc(100% - 30px);
  border: 1px solid @borderColor !important;
  .steps_content {
    position: relative;
    height: 100%;
    width: 85%;
    display: flex;
    flex-direction: column;
    .basicSteps {
      overflow: scroll;
    }
    .footer {
      height: 50px;
      line-height: 50px;
      background: @base-bg;
      width: 100%;
      text-align: right;
      > button {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border: 1px solid @button-border;
        font-size: 12px;
        background: transparent;
        color: @button-transparent-font;
        border-radius: 2px;
        margin-right: 10px;
      }
    }
  }
  .steps_bar {
    padding: 20px;
    //height: 100%;
    width: 15%;
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
