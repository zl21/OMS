<!--
 * @Author: your name
 * @Date: 2021-06-03 19:34:07
 * @LastEditTime: 2021-06-07 16:49:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/promotionCenter/addOrEditActi.vue
-->
<!-- 新增 或者 编辑 或者 复制促销-->
<template>
  <div class="addOrEditActi" v-loading='loading'>
    <div class="steps_content">
      <div class="footer">
        <button @click="close">
          {{ vmI18n.t('btn.back') }}
        </button>
        <button v-if="showSaveButton" @click="saveDraft">
          {{ vmI18n.t('btn.saveDraft') }}
        </button>
        <button v-if="showPublishButton" @click="publish">
          {{ vmI18n.t('btn.publish') }}
        </button>
      </div>
      <div ref="basicSteps" class="basicSteps">
        <div class="basic">
          <BasicInfo ref="area_0" :basic-data="basic_info" @changeBasicData="basicDataHandel"/>
        </div>
        <div class="basic">
          <InfoSet v-if="showInfoDataContainer" ref="area_1" :load-dis="loadDis" :basic-data="basic_info" :info-data="condition_info_setting" />
        </div>
        <div class="basic">
          <GiftSet ref="area_2" :objid="objid" :load-dis="loadDis" :basic-data="basic_info" :gift-data="gift_info_setting" @setcommodity="setCommodity" @closeDialog="closeDialog" @confirm="confirm" />
        </div>
      </div>
    </div>
    <div class="steps_bar">
      <stepsBars :current.sync="current" :steps="stepsBar" />
    </div>
  </div>
</template>
<script>
import addOrEditActi from '@/js/pages/promotionCenter/addOrEditActi';

export default addOrEditActi;
</script>
