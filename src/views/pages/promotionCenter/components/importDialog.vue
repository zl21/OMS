<!-- 导入组件-->
<template>
  <div>
    <div class="content">
      <div class="iconclass">
        <Icon type="md-arrow-dropleft" />
      </div>
      <div class="text">
        <span>注意：上传文件中，不要放置宏或图标，不要更改列的顺序，数据中不要使用公式。</span>
        <a @click="downloadTemplate">(下载模版)</a>
      </div>
      <div class="upload">
        <label
          class="ui_button ui_button_primary"
          for="xFile"
        >上传文件</label>
        <form>
          <input
            id="xFile"
            type="file"
            style="position:absolute;clip:rect(0 0 0 0);"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            @change="handleFiles($event)"
          >
        </form>
        <span>文件最大64M</span>
      </div>
      <p
        v-if="text"
        class="xlsx"
      >
        <Icon
          v-if="text"
          class="icon"
          type="ios-document-outline"
        />
        <span>{{ text }}</span>
      </p>
      <span
        v-if="loading"
        class="uploadmessage"
      >
        数据正在导入中，请稍候...
        <Icon
          class="loading"
          type="ios-loading"
        />
      </span>
      <div
        v-if="isError"
        class="error-message"
      >
        <div class="left-icon">
          <Icon
            type="md-information-circle"
            size="24"
            style="color: red;"
          />
        </div>
        <div class="right-content">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <Button
        type="primary"
        size="large"
        @click="importDialog"
      >
        确定
      </Button>
      <Button
        type="error"
        ghost
        size="large"
        @click="close"
      >
        取消
      </Button>
    </div>
  </div>
</template>
<script>
  import importDialog from '@/js/pages/promotionCenter/components/importDialog';

  export default importDialog;
</script>

<style scoped lang="less">
@import "~@/css/pages/promotionCenter/components/importDialog.less";
</style>
