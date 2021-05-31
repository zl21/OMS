<!-- 开发文档：http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/749656/1/2061 -->
<template>
  <div class="importContent" style="width:505px">
    <loading :loading="loading" />
    <div class="iconclass">
      <Icon type="md-cloud-upload" />
    </div>
    <div class="text">
      <span>注意：上传文件中，不要放置宏或图标，不要更改列的顺序，数据中不要使用公式。</span>
      <a v-if="!dontShowDownloadA" @click="downloadTemplate">(下载模版)</a>
    </div>
    <div class="upload">
      <label class="ui_button ui_button_primary" for="xFile">上传文件</label>
      <form>
        <input id="xFile" type="file" style="position: absolute; clip: rect(0 0 0 0)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" @change="handleFiles($event)" />
      </form>
      <span>文件最大64M</span>
    </div>
    <!--备注导入专用-->
    <div v-if="importNotes">
      <RadioGroup v-model="cover" class="memoImport">
        <Radio label="true"> 覆盖原备注 </Radio>
        <Radio label="false"> 追加到原备注 </Radio>
      </RadioGroup>
    </div>
    <p v-if="text" class="xlsx">
      <Icon v-if="text" class="icon" type="ios-document-outline" />
      <span>{{ text }}</span>
    </p>
    <span v-if="loading" class="uploadmessage">
      数据正在导入中，请稍候...
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
    <businessButton class="modal-footer" :btn-config="btnConfig" style="margin-top: 10px" />
  </div>
</template>
<script>
import importTable from './js/importTable.js';
export default importTable;
</script>

<style scoped lang="less">
@import 'css/importTable.less';
</style>
