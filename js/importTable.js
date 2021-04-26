import axios from 'axios';
import businessButton from 'professionalComponents/businessButton';
// import importConfig from './importTable.config.js';(此文件迁移至project-logic了)
import loading from 'professionalComponents/loading';

export default {
  name: 'importTable',
  components: {
    businessButton,
    loading,
  },
  props: {
    // 若存在自定义的父组件，即 非动作定义类型的导入按钮
    componentData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      key: '',
      text: '', // 选择的导入文件名
      files: {}, // 选择的文件
      loading: false, // 导入中loading
      isError: false, // 是否导入失败
      errorMessage: '', // 导入失败的错误信息，展示在导入弹框内
      excludeDownloadTable: ['POS_SC_B_TRANSFER', 'OC_B_SALE', 'OC_B_REFUND_SALE', 'SG_B_OUT_PICKORDER'],
      dontShowDownloadA: false,
      importNotes: false,
      btnControlTable: ['OC_B_SEND_OUT'],
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: '取消', // 按钮文本
            disabled: false,
            btnclick: () => {
              const _this = this;
              _this.closeModal();
            }, // 按钮点击事件
          },
          {
            text: '导入', // 按钮文本
            disabled: false,
            btnclick: () => {
              this.importDialog();
            }, // 按钮点击事件
          },
        ],
      },
      currentConfig: {},
      cover: 'false', // 缺货备注单选默认选择
    };
  },
  computed: {
    webname() {
      if (this.$parent?.$parent?.objTabActionDialogConfig || this.$parent?.$parent?.$parent?.objTabActionDialogConfig) {
        return this.$parent.$parent.objTabActionDialogConfig.webname || this.$parent.$parent.$parent.objTabActionDialogConfig.webname || '';
      } else if (this.componentData) {
        return this.componentData.webname || '';
      } else {
        return '';
      }
    },
    tableName() {
      if (this.$route.params?.tableName) {
        return this.$route.params.tableName || '';
      } else if (this.componentData) {
        return this.componentData.tableName || '';
      } else {
        return ''
      }
    },
    prefix() {
      return this.$route.path.slice(1, 7);
    },
  },
  methods: {
    // 下载模板-配置
    downloadTemplate() {
      const self = this;
      const tempUrl = self.currentConfig.tempUrl;
      const tempApi = self.currentConfig.tempApi;
      const tempParm = self.currentConfig.tempParm;
      if (tempUrl) {
        // 提供了模板Url，通过Url链接直接下载模板
        this.downloadUrlFile(self.currentConfig.tempUrl);
      } else {
        // 通过请求Api接口下载模板
        this.getDownloadTemp(tempApi, tempParm);
      }
    },
    // 通过Api下载模板-Handel
    getDownloadTemp(url, param = null) {
      if (param) {
        axios({
          url,
          method: 'post',
          data: param,
        }).then((res) => {
          if (res.data.code === 0) {
            this.downloadUrlFile(res.data.data);
          }
        });
      } else {
        axios({
          url,
          method: 'post',
        }).then((res) => {
          if (res.data.code === 0) {
            this.downloadUrlFile(res.data.data);
          }
        });
      }
    },

    // 确认导入的操作
    importDialog() {
      if (this.handleBefore(this.files)) return;
      const okApi = this.currentConfig.okApi;
      const okParm = this.currentConfig.okParm;
      this.getImportDialog(okApi, okParm);
    },
    // 导入请求
    getImportDialog(url, paramsObj) {
      const _this = this;
      if (!_this.text) {
        return _this.$Message.error('请选择需要导入的文件！');
      }
      _this.loading = true;
      const param = new FormData();
      for (const key in paramsObj) {
        param.append(key, paramsObj[key]);
      }
      param.append('file', _this.files, _this.text);

      if (_this.currentConfig.buttonPermission) {
        _this.btnConfig.buttons.map((btn) => {
          btn.disabled = true;
        });
      }
      axios({
        url,
        method: 'post',
        // cancelToken: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: param,
      }).then((res) => {
        console.log(res);
        if (res.data.code === 0 || res.data.code === 1) {
          if (res.data.message) _this.$Message.success(res.data.message);
          _this.$emit('returnData', res.data.data);
          _this.closeModal();
          // 刷新列表
          _this.customizeInvoke();
        } else if (res.data.code === -1 && res.data.data) {
          // _this.isError = true;
          _this.handelError(res.data.data);
        } else if (res.data.code === -1) {
          // _this.isError = true;
          // 走框架的错误提示
          // _this.$Message.error(res.data.message || 'no message!');
        } else {
          console.log("Please see : 'http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/749656/1/2061'");
        }
        if (_this.currentConfig.buttonPermission) {
          _this.btnConfig.buttons.map((btn) => {
            btn.disabled = false;
          });
        }
        _this.loading = false;
      }).catch(() => {
        _this.loading = false;
      });
    },
    // 导入成功后的操作 - 关闭弹窗
    closeModal() {
      const _this = this;
      if (_this.currentConfig.isAction) {
        _this.$emit('closeActionDialog', false);
      } else {
        _this.$parent.$parent.closeConfirm();
      }
    },
    // 导入成功后的操作 - 刷新页面
    customizeInvoke() {
      const _this = this;
      if (_this.currentConfig.prefix == 'SYSTEM' && !_this.currentConfig.dontRefreshTable) {
        // 标准列表的刷新
        _this.$parent.$parent.$parent.getQueryList();
      } else {
        // 定制页面的刷新
        if (_this.currentConfig.freshPage && typeof _this.currentConfig.freshPage === "function") {
          if (_this.$parent.$parent[_this.currentConfig.freshPage]) {
            _this.$parent.$parent[_this.currentConfig.freshPage];
            return
          }
        }
        console.log('请配置/传入该定制页面的刷新页面的方法！');
      }
    },
    // 导入失败后的操作 - 下载错误信息/展示错误信息
    handelError(data) {
      const _this = this;
      if (_this.currentConfig.downErrorInfo) {
        _this.downloadUrlFile(data);
        // _this.closeModal();
      } else if (_this.currentConfig.showErrorInfo) {
        // _this.closeModal();
        _this.isError = true;
        _this.errorMessage = data;
      } else {
        console.log('data null !');
      }
    },
    // 选择文件
    handleFiles(e) {
      this.isError = false;
      if (e.path[0].files[0].name) {
        this.text = e.path[0].files[0].name;
        this.files = e.path[0].files[0];
      }
    },
    // 上传文件前判断文件大小
    handleBefore(file) {
      const size = file.size / 1024 / 1024;
      if (size > 64) {
        this.isError = true;
        this.errorMessage = '文件最大64M!';
        return true;
      }
    },
    // 导出错误信息
    downloadUrlFile(src) {
      const download_file = {};
      if (typeof download_file.iframe === 'undefined') {
        const iframe = document.createElement('iframe');
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = 'none';
    },
  },
  created() {
    const _this = this;
    console.log('$OMS2.cusImport::', _this.$OMS2.cusImport);
    console.log('webname::', _this.webname);
    console.log('tableName::', this.tableName);
    console.log('prefix::', this.prefix);
    if (this.prefix == 'SYSTEM') {
      this.key = this.tableName + '__' + this.webname;
      this.currentConfig = _this.$OMS2.cusImport[this.key];
    } else {
      this.key = this.componentData.tableName + '__' + this.componentData.webname;
      if (_this.$OMS2.cusImport[this.key]) {
        // 配置文件中存在配置，则使用配置文件中的配置
        this.currentConfig = _this.$OMS2.cusImport[this.key];
      } else {
        // 反之使用父组件传过来的配置
        this.currentConfig = this.componentData;
      }
    }
    this.dontShowDownloadA = this.currentConfig.dontShowDownloadA || false;
    this.importNotes = this.currentConfig.importNotes || false;
  },
};