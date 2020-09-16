<!-- 导入组件-->
<template>
  <div>
    <div class="content">
      <div class="iconclass">
        <i class="burgeon-icon iconfont icondaoru"></i>
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
    <div class="footer">
      <Button type="error" ghost size="small" @click="close">取消</Button>
      <Button type="primary" size="small" @click="importDialog">确定</Button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
//import ChineseDictionary from "@/assets/js/ChineseDictionary.js"
export default {
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      text: "", // 选择的导入文件名
      files: {}, // 选择的文件
      loading: false, // 导入中loading
      isError: false, // 是否导入失败
      errorMessage: "", // 导入失败原因
      cover: "false" // 缺货备注单选默认选择
    };
  },
  methods: {
    // 选择文件
    handleFiles(e) {
      console.log(e.path);
      this.isError = false;
      if (e.path[0].files[0].name) {
        this.text = e.path[0].files[0].name;
        this.files = e.path[0].files[0];
      }
    },
    // 下载模板
    downloadTemplate() {
      if (
        this.componentData.tableName === "PS_C_SKU" ||
        this.componentData.tableName === "SG_B_CHANNEL_PRODUCT" ||
        this.componentData.tableName === "PS_C_PRO" ||
        this.componentData.tableName === "IP_C_TAOBAO_PRODUCT"
      ) {
        this.getDownloadTemp("/p/cs/pm/v1/getModuleUrl", {
          mode: this.componentData.mode
        });
        return;
      }
    },

    // 定制下载模板
    getDownloadTemp(url, param) {
      if (param) {
        let searchParam = new URLSearchParams();
        searchParam.append("param", JSON.stringify(param));
        axios({
          url: url,
          method: "post",
          data: searchParam
        }).then(res => {
          if (res.data.code === 0) {
            this.downloadUrlFile("http://" + res.data.data);
          }
        });
      } else {
        axios({
          url: url,
          method: "get"
        }).then(res => {
          if (res.data.code === 0) {
            this.downloadUrlFile("http://" + res.data.data);
          }
        });
      }
    },
    // 导出
    downloadUrlFile(src) {
      var download_file = {};
      if (typeof download_file.iframe == "undefined") {
        var iframe = document.createElement("iframe");
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = "none";
    },
    // 导入
    importDialog() {
      if (this.handleBefore(this.files)) return;
      if (this.componentData.mode === "batch") {
        this.getImportDialog("/p/cs/pm/v1/parseActiExcelCmd");
        return;
      }
      if (
        this.componentData.tableName === "PS_C_SKU" ||
        this.componentData.tableName === "SG_B_CHANNEL_PRODUCT" ||
        this.componentData.tableName === "PS_C_PRO" ||
        this.componentData.tableName === "IP_C_TAOBAO_PRODUCT"
      ) {
        this.getImportDialog("/p/cs/pm/v1/parseExcel");
        return;
      }
    },
    // 导入请求
    getImportDialog(url, objid) {
      const _this = this;
      if (!_this.text) {
        return _this.$Message.error("请选择需要导入的文件！");
      }
      _this.loading = true;
      let param = new FormData();
      param.append("file", _this.files, _this.text);
      if (this.componentData.tableName) {
        param.append("table", this.componentData.tableName);
      }
      if (this.componentData.mode) {
        param.append("mode", this.componentData.mode);
      }
      //if(this.componentData.tableName){url = url + "?table=" + this.componentData.tableName};
      // let param = {
      //     file:_this.files,
      //     table:this.componentData.tableName
      // }
      axios({
        url: url,
        method: "post",
        cancelToken: true,
        headers: { "Content-Type": "multipart/form-data" },
        data: param
      }).then(res => {
        if (res.data.code === 0) {
          _this.$Message.success(res.data.message);
          _this.$emit("returnData", res.data.data);
          _this.$parent.$parent.closeDialog();
          // _this.customizeInvoke(_this.componentData.tableName);
        } else if (res.data.code === -1) {
          let err = res.data.message || "导入失败";
          _this.isError = true;
          _this.errorMessage = err;
          _this.$Message.error(_this.errorMessage);
        } else {
          if (res.data.data) {
            _this.loading = false;
            _this.isError = true;
            _this.errorMessage = res.data.message;
            _this.$Message.error(_this.errorMessage);
            this.downloadUrlFile(res.data.data);
          }
        }
        _this.loading = false;
      });
    },
    // 导入成功后操作
    customizeInvoke(table) {
      const _this = this;
      if (table === "AC_F_DISTRIBUTION") {
        _this.$parent.$parent.$parent.getDetail();
      } else if (table === "ST_C_EXPRESS_AREA") {
        _this.$parent.$parent.$parent.getTree("import");
      } else if (table === "OUT_OF_STOCK_MEMO") {
        _this.$parent.$parent.$parent.getData();
      } else if (table === "ST_C_WAREHOUSE_LOGISTICS") {
        _this.$parent.$parent.$parent.refresh();
      } else if (table === "OC_B_REFUND_IN") {
        _this.$parent.$parent.$parent.requestBefore();
      } else if (table === "OC_B_INVOICE_NOTICE") {
        _this.$parent.$parent.$parent.find();
      } else if (table === "ST_C_SEND_RULE") {
        _this.$parent.$parent.$parent.refresh();
      } else if (table === "ST_C_SEND_RULE_RATE") {
        _this.$parent.$parent.$parent.refresh();
      }
    },
    // 上传文件前判断文件大小
    handleBefore(file) {
      let size = file.size / 1024 / 1024;
      if (size > 64) {
        this.isError = true;
        this.errorMessage = "文件最大64M!";
        return true;
      }
    },
    close() {
      this.$parent.$parent.closeDialog();
    }
  },
  created() {
    const _this = this;
    document.onkeydown = function(e) {
      if (_this.$parent.$parent.modal) {
        let key = e.keyCode;
        if (key == 13) {
          _this.importDialog();
        } else if (key == 27) {
          _this.$parent.$parent.closeConfirm();
        }
      }
    };
  },
  destroyed() {
    window.removeEventListener("keydown", this, false);
  }
};
</script>

<style scoped lang="less">
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
      background-color: #fd6442;
      border-color: #fd6442;
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
