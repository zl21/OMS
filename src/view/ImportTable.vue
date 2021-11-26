<!--
 * @Author: your name
 * @Date: 2021-11-01 15:07:28
 * @LastEditTime: 2021-11-02 18:06:14
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/importTable.vue
-->
<!-- 开发文档：http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/749656/1/2061 -->
<template>
  <div class="importContent" style="width:540px">
    <loading :loading="loading" />
    <div class="iconclass">
      <Icon type="md-cloud-upload" />
    </div>
    <div class="text">
      <!-- <span>注意：上传文件中，不要放置宏或图标，不要更改列的顺序，数据中不要使用公式。</span> -->
      <span>{{ vmI18n.t('modalTips.za') }}</span>
      <!-- (下载模版) -->
      <a v-if="!dontShowDownloadA" @click="downloadTemplate">({{ vmI18n.t('other.download_template') }})</a>
    </div>
    <div class="upload">
      <!-- 上传文件 -->
      <label class="ui_button ui_button_primary" for="xFile">{{ vmI18n.t('other.upload_files') }}</label>
      <form>
        <input id="xFile" type="file" style="position: absolute; clip: rect(0 0 0 0)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="handleFiles($event)" />
      </form>
      <!-- 文件最大64M -->
      <span>{{ vmI18n.t('modalTips.zb') }}</span>
    </div>
    <!--备注导入专用-->
    <div v-if="importNotes">
      <RadioGroup v-model="cover" class="memoImport">
        <!-- 覆盖原备注 -->
        <Radio label="true"> {{ vmI18n.t('other.override_original_remarks') }} </Radio>
        <!-- 追加到原备注 -->
        <Radio label="false"> {{ vmI18n.t('other.addTo_original_remarks') }} </Radio>
      </RadioGroup>
    </div>
    <p v-if="text" class="xlsx">
      <Icon v-if="text" class="icon" type="ios-document-outline" />
      <span>{{ text }}</span>
    </p>
    <!-- 数据正在导入中，请稍候... -->
    <span v-if="loading" class="uploadmessage">
      {{ vmI18n.t('modalTips.zc') }}
      <Icon class="loading" type="ios-loading" />
    </span>
    <div v-if="isError" class="error-message">
      <div class="left-icon">
        <Icon type="md-information-circle" size="24" style="color: red" />
      </div>
      <div class="right-content">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
    <OmsButton class="modal-footer" :btn-config="btnConfig" style="margin-top: 10px" />
  </div>
</template>
<script>
import ImportTable from 'burgeonComponents/js/ImportTable.js';
export default ImportTable;
</script>

<style scoped lang="less">
@import 'burgeonComponents/css/importTable.less';
</style>
<style scoped>

</style>
