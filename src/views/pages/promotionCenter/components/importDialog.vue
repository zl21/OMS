<!-- 导入组件-->
<template>
  <div>
    <div class="content">
      <div class="iconclass">
        <Icon type="md-arrow-dropleft" />
      </div>
      <div class="text">
        <span
          >注意：上传文件中，不要放置宏或图标，不要更改列的顺序，数据中不要使用公式。</span
        >
        <a @click="downloadTemplate">(下载模版)</a>
      </div>
      <div class="upload">
        <label class="ui_button ui_button_primary" for="xFile">上传文件</label>
        <form>
          <input
            type="file"
            id="xFile"
            style="position:absolute;clip:rect(0 0 0 0);"
            @change="handleFiles($event)"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />
        </form>
        <span>文件最大64M</span>
      </div>
      <p class="xlsx" v-if="text">
        <Icon class="icon" v-if="text" type="ios-document-outline" />
        <span>{{ text }}</span>
      </p>
      <span v-if="loading" class="uploadmessage">
        数据正在导入中，请稍候...
        <Icon class="loading" type="ios-loading" />
      </span>
      <div class="error-message" v-if="isError">
        <div class="left-icon">
          <Icon type="md-information-circle" size="24" style="color: red;" />
        </div>
        <div class="right-content">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
    <div class="dialog-footer">
      <Button type="primary" size="large" @click="importDialog">确定</Button>
      <Button type="error" ghost size="large" @click="close">取消</Button>
    </div>
  </div>
</template>
<script>
  import importDialog from "@/js/pages/promotionCenter/components/importDialog";
  export default importDialog;
</script>

<style scoped lang="less">
@import '~@burgeon/oms-theme/skin/public.less';
.content {
  padding: 20px 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .iconclass {
    width: 100%;
    height: 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 20px;
    .iconfont {
      font-size: 28px;
      color: #09a155;
    }
  }
  .upload {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin-top: 8px;
    padding-bottom: 8px;
    .ui_button {
      background-color: @button-transparent;
      border-color: @button-transparent-font;
      border-radius: 2px;
      color: #fff;
      height: 24px;
      text-align: center;
      line-height: 24px;
      font-size: 12px;
      padding: 0;
      width: 66px;
    }
    .ui_button:hover {
      cursor: pointer;
    }
    span {
      margin-left: 6px;
      color: #999;
    }
  }
  .xlsx {
    min-height: 20px;
    line-height: 20px;
    .icon {
      padding-left: 3px;
    }
    span {
      size: 16px;
    }
  }
  .xlsx:hover {
    cursor: pointer;
    background-color: #f5f7fa;

    span {
      color: #57a3f3;
    }
  }
  .uploadmessage {
    padding-left: 7px;
    font-size: 12px;
    height: 21px;
    line-height: 21px;
    color: #b8b8b8;
    .loading {
      margin-left: 4px;
      height: 2px;
      vertical-align: text-top;
      padding-top: 4px;
    }
  }
  .error-message {
    display: flex;
    border-top: 0.5px solid #eee;
    padding-top: 5px;
    margin-top: 5px;
    .left-icon {
      margin-right: 5px;
    }
    .right-content {
      width: 100%;
      max-height: 50px;
      overflow: scroll;
      vertical-align: middle;
      p {
        line-height: 20px;
      }
    }
  }
  .memoImport {
    margin-top: 10px;
    margin-left: 40%;
  }
}

.footer {
  text-align: right;
}
</style>
