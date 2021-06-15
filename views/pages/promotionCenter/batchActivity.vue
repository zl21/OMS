<!--
 * @Author: your name
 * @Date: 2021-06-03 10:15:37
 * @LastEditTime: 2021-06-15 13:22:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/promotionCenter/batchActivity.vue
-->
<!-- 批量新增、编辑、复制促销活动-->
<template>
  <div class="batchActivity" v-loading='loading'>
    <div class="steps_content">
      <div class="footer">
        <!-- <button @click="close">
          {{ vmI18n.t('common.cancel') }}
        </button>
        <button v-if="showSaveButton" @click="saveDraft">
          {{ vmI18n.t('btn.saveDraft') }}
        </button>
        <button v-if="showPublishButton" @click="publish">
          {{ vmI18n.t('btn.publish') }}
        </button> -->
        <businessButton :btn-config="btnConfig" />
      </div>
      <div ref="basicSteps" class="basicSteps">
        <div class="basic">
          <BasicInfo ref="area_0" :basic-data="basic_info" />
        </div>
        <div class="basic">
          <BatchInfoSet ref="area_1" :objid="objid" :basic-data="basic_info" :info-data="batch_infos_setting" />
        </div>
      </div>
    </div>
    <div class="steps_bar">
      <stepsBars :current.sync="current" :steps="stepsBar" />
    </div>
  </div>
</template>
<script>
import batchActivity from '@/js/pages/promotionCenter/batchActivity';

export default batchActivity;
</script>
