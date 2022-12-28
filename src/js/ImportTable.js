/** 
 * @相关属性
 * 下载模板
 * @param {String} tempUrl 模板url地址
 * @param {String} tempApi 接口路径
 * @param {Object} tempParm 接口入参 - formdata格式
 * @param {Object} cusTempParam 自定义接口入参，包括入参格式
 * @param {String} tempMethod 接口请求方式，默认post
 * 导入
 * @param {String} okApi 接口路径
 * @param {Object} okParm 接口入参
 * @param {Boolean} isAsync 是否开启异步导入，默认true
 * @param {Boolean} isErr1Succ1 是否开启部分成功部分失败：下载文件
 * @param {Boolean} dontRefreshTable 是否开启导入成功后刷新页面
 * @param {Boolean} downErrorInfo 是否下载导入失败的文件
 * @param {Boolean} showErrorInfo 是否在弹框内显示错误信息
 * @param {Function} returnData 导入的回调
 * @param {Function} freshPage 导入成功后，定制页面刷新的回调
 * 其他
 * @param {String} tableName 表名
 * @param {String} webname
 * @param {String} prefix 路由前缀，可选值有SYSTEM，CUSTOM
 * @param {Boolean} isAction 是否为动作定义类型的
 * @param {Boolean} dontShowDownloadA 是否显示下载模板，默认false
 * @param {Boolean} importNotes 是否显示覆盖原备注/追加到原备注，默认false - 备注导入专用
 * @param {Boolean} buttonPermission 
 * @param {Boolean} cusDiscretion
 * @param {Boolean} isStandardSingleObject 是否标准单对象
 */
import OmsButton from 'burgeonComponents/view/OmsButton';
import axios from 'axios';
// import loading from 'burgeonComponents/view/Loading';
// import i18n from "@burgeon/internationalization/i18n";
// window.$i18n = i18n

export default {
  name: 'ImportTable',
  components: {
    OmsButton,
    // loading,
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
      // vmI18n: i18n,
      inpNum: '2', // 有效起始行
      singleValue: '', // 更新记录
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
            text: $i18n.t('com.cancel'), // 按钮文本
            disabled: false,
            btnclick: () => {
              const _this = this;
              _this.closeModal();
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('btn.import'), // 按钮文本
            type: "primary", // 按钮类型
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
    rowControl() {
      return this.currentConfig.rowControl || false; // 默认false，即不展示控制从多少行开始导入
    },
    isAsync() {
      return this.currentConfig.isAsync === false ? false : true; // 默认true，即异步
    },
    webname() {
      const { objTabActionDialogConfig, dialogComponentName } = this.$parent?.$parent || this.$parent?.$parent?.$parent
      if (objTabActionDialogConfig) {
        return objTabActionDialogConfig.webname || objTabActionDialogConfig.webname || '';
      } else if (dialogComponentName) { // 单对象定制导入，由于取的是组件名 CUSTOMIZED/xxx 中的xxx，需要求后端组件名与webname一致
        return dialogComponentName
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
    handleInput() {
      const val = event.target.value.trim();
      // 只能是正整数或空,可根据需求修改正则
      if (/^[1-9]\d*$|^$/.test(val)) {
        this.inputValue = val;
      } else {
        event.target.value = this.inputValue;
      }
    },
    // 下载模板-配置
    downloadTemplate() {
      const self = this;
      const { tempUrl, tempApi, tempParm, cusTempParam, tempMethod: type = 'post' } = self.currentConfig
      let param = tempParm;
      if (tempParm && type == 'post') { // 下载模板参数处理
        param = new FormData();
        /* for (const key in tempParm) {
          param.append(key, tempParm[key]);
        } */
        param.append('param', JSON.stringify(tempParm));
      }
      cusTempParam && (param = cusTempParam) // 自定义模板参数
      if (tempUrl) {
        // 提供了模板Url，通过Url链接直接下载模板
        this.downloadUrlFile(self.currentConfig.tempUrl);
      } else {
        // 通过请求Api接口下载模板
        this.getDownloadTemp(tempApi, param, type);
      }
    },
    // 通过Api下载模板-Handel
    getDownloadTemp(url, param = null, type) {
      if (param) {
        // 兼容框架标准下载模板
        if (url == '/p/cs/downloadImportTemplate') {
          axios({
            url: '/p/cs/downloadImportTemplate',
            method: type,
            params: param
          }).then((res) => {
            if (res.data.code == 0) {
              const url = `${location.origin}/p/cs/download?filename=${res.data.data}`;
              this.downloadUrlFile(url);
            }
          })
        } else {
          $network[type](url, param).then((res) => {
            if (res.data.code === 0) {
              let url = res.data.data
              if (!/https|http/.test(url) && this.currentConfig.cusTempParam) {
                url = `${location.origin}/p/cs/download?filename=${url}`
              }
              this.downloadUrlFile(url);
            }
          });
        }
      } else {
        $network[type](url).then((res) => {
          if (res.data.code === 0) {
            this.downloadUrlFile(res.data.data);
          }
        });
      }
    },

    // 确认导入的操作
    importDialog: _.throttle(function () {
      if (this.handleBefore(this.files)) return;
      const { okApi, okParm = {} } = this.currentConfig
      if (!okApi) {
        const tip2 = 'Please config okApi, see: http://101.132.182.36:20003/?path=/story/basic-importtable--page'
        throw new Error(tip2)
      }
      this.getImportDialog(okApi, okParm);
    }, 3000, { 'trailing': false }),
    // 导入请求
    getImportDialog(url, paramsObj) {
      const _this = this;
      if (!_this.text) {
        // 请选择需要导入的文件！
        return _this.$Message.error($i18n.t('tip.hj'));
      }
      _this.loading = true;
      const param = new FormData();
      for (const key in paramsObj) {
        if (key == 'id' && this.currentConfig.isStandardSingleObject) {
          param.append(key, _this.$route.params.itemId);
        } else {
          param.append(key, paramsObj[key]);
        }
      }
      if (this.importNotes) {
        param.append('cover', this.cover);
      }
      if (this.rowControl) {
        param.append('isUpdate', this.singleValue ? 'Y' : 'N');
        param.append('startRow', this.inpNum);
      }
      param.append('file', _this.files, _this.text);

      const curParam = {
        ...paramsObj,
        text: _this.text,
        cover: this.cover,
        isUpdate: this.singleValue,
        inpNum: this.inpNum, 
        file: _this.files
      }
      this.$emit('changeParam', curParam) // 自定义入参
      const incom = this.currentConfig.incom // 入参回传导入组件

      if (_this.currentConfig.buttonPermission) {
        _this.btnConfig.buttons.map((btn) => {
          btn.disabled = true;
        });
      }
      $network.post(url, incom ? incom : param).then((res) => {
        document.getElementById("xFile").value = ""
        if (this.isAsync) {
        /** 异步导入优化（同框架保持交互效果一致）：
         * 1. 点击'确定'直接关闭弹窗，后续操作都到异步任务里去做
         * 2. 有些特殊的页面还是要走同步导入的需要单独处理
         */
          _this.loading = false;
          this.closeModal();
          if ([0, 1, -1].includes(res.data.code) && res.data.data) {
            window.dispatchEvent(new CustomEvent('addTask',{
              detail: {
                type: 'notice',
              },
            }))
          }
          return
        }
        if ([0, 1].includes(res.data.code) && !_this.currentConfig.cusDiscretion) {
          if (res.data.message) {
            if (/失败/.test(res.data.message) && !_this.currentConfig.downErrorInfo) {
              $fcError(res.data.message.replace(/\n/g, '<br/>'))
            } else {
              _this.$Message.success(res.data.message)
            }
          }
          _this.$emit('returnData', res.data.data);
          _this.closeModal();
          _this.customizeInvoke(); // 刷新列表
          // isErr1Succ1: false, // 走部分成功部分失败且code为0/1的处理吗，默认false(不走的意思)
          if (_this.currentConfig.isErr1Succ1) {
            res.data.data && _this.handelError(res.data.data, true); // 部分成功部分失败：下载错误信息
          }
        } else if (res.data.code === -1 && res.data.data) {
          // _this.isError = true;
          _this.handelError(res.data.data);
          _this.file = {};
          _this.text = '';
          // _this.errorMessage = '导入失败,详情见文件内容';
          _this.errorMessage = $i18n.t('tip.hk');
          _this.isError = true;
        } else if (res.data.code === -1) {
          // _this.isError = true;
          // 走框架的错误提示
          // _this.$Message.error(res.data.message || 'no message!');
          _this.file = {};
          _this.text = '';
          _this.errorMessage = $i18n.t('tip.hk');
          _this.isError = true;
        } else {
          console.warn("Please see : 'http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/749656/1/2061'");
        }
        if (_this.currentConfig.cusDiscretion) {
          _this.$emit('returnData', res);
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
      const { close, closeConfirm } = _this.$parent.$parent
      if (close) {
        // 标准页面
        _this.$parent.$parent.close();
      } else if (closeConfirm) {
        // 定制页面
        _this.$parent.$parent.closeConfirm();
      }
    },
    // 导入成功后的操作 - 刷新页面
    customizeInvoke() {
      const _this = this;
      if (_this.currentConfig.prefix == 'SYSTEM' && !_this.currentConfig.dontRefreshTable) {
        if (_this.currentConfig.isStandardSingleObject) {
          // 标准单对象的刷新
          document.getElementById("refresh").click();
        } else {
          // 标准列表的刷新
          _this.$parent.$parent.$parent.getQueryList();
        }
      } else {
        // 定制页面的刷新
        if (_this.currentConfig.freshPage && typeof _this.currentConfig.freshPage === "function") {
          if (_this.$parent.$parent[_this.currentConfig.freshPage]) {
            _this.$parent.$parent[_this.currentConfig.freshPage];
            return
          }
        }
        console.warn('请配置/传入该定制页面的刷新页面的方法！');
      }
    },
    // 导入失败后的操作 - 下载错误信息/展示错误信息
    handelError(data, Err1Succ1) {
      const _this = this;
      if (_this.currentConfig.downErrorInfo) {
        if (Err1Succ1) {
          let reUrl = /(http|https):\/\/([\w.]+\/?)\S*/;
          if (reUrl.test(data) === false) {
            console.error('code为0或1，部分成功部分失败，请返回以 http 或者 https 开头的错误信息下载链接！')
            return
          } else {
            _this.downloadUrlFile(data);
          }
        } else {
          _this.downloadUrlFile(data);
        }
        // _this.closeModal();
      } else if (_this.currentConfig.showErrorInfo) {
        // _this.closeModal();
        _this.isError = true;
        _this.errorMessage = data;
      } else {
        console.warn('data null !');
      }
    },
    // 选择文件
    handleFiles(e) {
      this.isError = false;
      if (e.path[0].files[0].name) {
        this.text = e.path[0].files[0].name;
        this.files = e.path[0].files[0];
      }
      this.$emit('change', {fileEvent: e, files: e.path[0].files[0]})
    },
    // 上传文件前判断文件大小
    handleBefore(file) {
      const size = file.size / 1024 / 1024;
      if (size > 64) {
        this.isError = true;
        // this.errorMessage = '文件最大64M!';
        this.errorMessage = $i18n.t('tip.zb');
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
    const tip1 = 'Please set the importTable config, see: http://101.132.182.36:20003/?path=/story/basic-importtable--page'
    if (this.prefix == 'CUSTOM' && !this.componentData?.isAction) {
      // 纯定制导入
      if (!Object.keys(_this.componentData).length) {
        throw new Error(tip1)
      }
      const { tableName, webname } = _this.componentData
      this.key = webname ? `${tableName}__${webname}` : tableName;
    } else if (this.prefix == 'SYSTEM') {
      // 标准动作定义
      this.key = this.tableName + '__' + this.webname;
      if (!_this.$OMS2.cusImport[this.key]) {
        console.warn(tip1)
      }
    }
    if (_this.$OMS2.cusImport[this.key]) {
      // 配置文件中存在配置，则使用配置文件中的配置
      this.currentConfig = _this.$OMS2.cusImport[this.key];
    } else {
      // 反之使用父组件传过来的配置
      this.currentConfig = this.componentData;
    }
    this.dontShowDownloadA = this.currentConfig.dontShowDownloadA || false;
    this.importNotes = this.currentConfig.importNotes || false;
  },
};
