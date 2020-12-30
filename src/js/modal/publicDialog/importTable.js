// <!-- 导入组件-->
import axios from 'axios';
import loading from '@/component/loading.vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    loading,
    businessButton
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      text: '', // 选择的导入文件名
      files: {}, // 选择的文件
      loading: false, // 导入中loading
      isError: false, // 是否导入失败
      errorMessage: '', // 导入失败原因
      configTableName: ['ST_C_PRODUCT_STRATEGY', 'AC_F_RECEIVABLES_ADJUSTMENT', 'SG_B_PHY_OUT_RESULT', 'SC_B_TRANSFER', 'OC_B_MULTI_STORE_DISTRIBUTION', 'OC_B_SEND_OUT', 'OC_B_JD_RETURN_ORDER'],
      cover: 'false', // 缺货备注单选默认选择
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.closeConfirm();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.importDialog();
            } // 按钮点击事件
          }
        ]
      }
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
      // 获取接口数组
      const objArr = this.service.common.importApiArr(this.componentData.objid ? this.componentData.objid : '');
      // 筛选出当前表的接口对象
      const itemObj = objArr.filter(item => item.tableName === this.componentData.tableName);
      switch (itemObj[0].tableName) {
        case 'PS_C_SKU':
        case 'SG_B_CHANNEL_PRODUCT':
        case 'PS_C_PRO':
        case 'IP_C_TAOBAO_PRODUCT':
          // eslint-disable-next-line no-case-declarations
          const searchParam = new URLSearchParams();
          searchParam.append('param', JSON.stringify({ mode: this.componentData.mode }));
          this.getDownloadTemp(itemObj[0].downloadUrl, searchParam);
          break;
        case 'PS_C_SKUGROUP':
          if (this.componentData.operationType === 'baseInfo') {
            // 组合商品明细表与虚拟明细
            this.getDownloadTemp(itemObj[0].downloadUrlType, {
              type: this.componentData.type
            });
          } else {
            // 组合商品档案明细
            this.getDownloadTemp(itemObj[0].downloadUrl, {
              type: this.componentData.type
            });
          }
          break;
        // 仓库物流优先级 订单派单规则-优先级 订单派单规则-比例
        case 'ST_C_WAREHOUSE_LOGISTICS':
        case 'ST_C_SEND_RULE':
        case 'ST_C_SEND_RULE_RATE':
          this.getDownloadTemp(itemObj[0].downloadUrl, {
            objid: this.componentData.objid
          });
          break;
        case 'AC_F_RECEIVABLES_ADJUSTMENT': // 退换货卖家备注导入
          this.getDownloadTemp(itemObj[0].downloadUrl, {
            billType: this.componentData.billType
          });
          break;
        case 'SC_B_TRANSFER':
          if (this.componentData.importType === 3) {
            this.downloadUrlFile(itemObj[0].downloadUrlType);
          } else {
            // 导入-调拨单
            this.getDownloadTemp(itemObj[0].downloadUrl);
          }
          break;
        case 'SG_B_PHY_OUT_RESULT':
          if (this.componentData.importType === 1) {
            this.getDownloadTemp(itemObj[0].downloadUrl);
          }
          break;
        case 'OC_B_SEND_OUT': // 出库结果单
          if (this.componentData.importType === 1) {
            this.downloadUrlFile(itemObj[0].downloadUrlType);
          } else {
            // 导入-调拨单
            this.downloadUrlFile(itemObj[0].downloadUrl);
          }
          break;
        case 'IP_C_STANDPLAT_PRO': // 通用商品下载
          this.downloadUrlFile(itemObj[0].downloadUrl);
          break;
        default:
          this.getDownloadTemp(itemObj[0].downloadUrl);
          break;
      }
    },

    // 定制下载模板
    getDownloadTemp(url, param) {
      if (param) {
        this.loading = true;
        axios({
          url,
          method: 'post',
          data: param
        }).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.downloadUrlFile(res.data.data);
          }
        });
      } else {
        this.loading = true;
        axios({
          url,
          method: 'post'
        }).then(res => {
          this.loading = false;
          if (res.data.code === 0) {
            this.downloadUrlFile(res.data.data);
          }
        });
      }
    },
    // 动态创建iframe标签用于下载模板
    downloadUrlFile(url) {
      const self = this;
      const domFrame = window.parent.document.getElementById('downLoadListFrame');
      if (domFrame != null) {
        window.parent.document.body.removeChild(domFrame);
      }
      const downloadFile = {};
      if (typeof downloadFile.iframe === 'undefined') {
        const iframe = document.createElement('iframe');
        iframe.setAttribute('id', 'downLoadListFrame');
        self.addEvent('load', iframe, () => {
          self.iframeLoad(iframe);
        });
        iframe.src = url;
        iframe.style.display = 'none';
        downloadFile.iframe = iframe;
        document.body.appendChild(downloadFile.iframe);
        setTimeout(() => {
          iframe.src = '';
        }, 1000);
      }
    },
    // 判断iframe的src
    iframeLoad(iframe) {
      const src = iframe.src ? iframe.src : iframe.contentWindow.locatiion.href;
      console.log('src::', src);
    },
    // 调用方法时绑定iframe的load事件
    addEvent(eventName, element, fn) {
      if (element.attachEvent) element.attachEvent(`on${eventName}`, fn);
      else element.addEventListener(eventName, fn, false);
    },
    // 导入
    importDialog() {
      if (this.handleBefore(this.files)) return;
      // 获取接口数组
      const objArr = this.service.common.importApiArr();
      // 筛选出当前表的接口对象
      const itemObj = objArr.filter(item => item.tableName === this.componentData.tableName);
      // 促销
      const promotionTableName = ['PS_C_SKU', 'SG_B_CHANNEL_PRODUCT', 'PS_C_PRO', 'IP_C_TAOBAO_PRODUCT'];
      // 物流区域设置 缺货备注 仓库物流优先级设置 订单派单规则-优先级 订单派单规则-比例 退换货卖家备注导入  OC_B_MULTI_STORE_DISTRIBUTION  店铺商品特殊设置 - 多店铺比例-明细导入
      const objidParamsTableName = ['ST_C_EXPRESS_AREA', 'OUT_OF_STOCK_MEMO', 'ST_C_WAREHOUSE_LOGISTICS', 'ST_C_SEND_RULE', 'ST_C_SEND_RULE_RATE', 'OC_B_RETURN_ORDER_remark', 'OC_B_MULTI_STORE_DISTRIBUTION', 'ST_C_PRODUCT_STRATEGY'];
      switch (itemObj[0].tableName) {
        case promotionTableName.find(n => n === this.componentData.tableName):
          if (this.componentData.mode == 'batch') {
            this.getImportDialog(itemObj[0].urlType);
          } else {
            this.getImportDialog(itemObj[0].url);
          }
          break;
        case 'PS_C_SKUGROUP':
          if (this.componentData.operationType === 'baseInfo') {
            // 组合商品档案明细与虚拟条码
            this.getImportDialog(itemObj[0].urlType);
          } else {
            // 组合商品档案明细
            this.getImportDialog(itemObj[0].url);
          }
          break;
        case objidParamsTableName.find(n => n === this.componentData.tableName):
          this.getImportDialog(itemObj[0].url, this.componentData.objid);
          break;
        case 'AC_F_RECEIVABLES_ADJUSTMENT': // 应收款调整单导入
          this.getImportDialog(itemObj[0].url, this.componentData.billType);
          break;
        case 'SC_B_TRANSFER':
          if (this.componentData.importType === 3) {
            this.getImportDialog(itemObj[0].urlType, this.componentData.objid);
          } else {
            this.getImportDialog(itemObj[0].url);
          }
          break;
        case 'SG_B_PHY_OUT_RESULT':
          if (this.componentData.importType === 1) {
            this.getImportDialog(itemObj[0].url);
          }
          break;
        case 'OC_B_SEND_OUT': // 销售订单导入
          if (this.componentData.importType === 1) {
            this.getImportDialog(itemObj[0].urlType);
          } else {
            this.getImportDialog(itemObj[0].url, this.componentData.objid);
          }
          break;
        default:
          this.getImportDialog(itemObj[0].url);
          break;
      }
    },
    // 导入请求
    getImportDialog(url, objid) {
      const _this = this;
      if (!_this.text) {
        _this.$Message.error('请选择需要导入的文件！');
        return;
      }
      _this.loading = true;
      const param = new FormData();
      // 物流区域设置 仓库物流优先级 订单派单规则-优先级 订单派单规则-比例
      const objidParamsTableName = ['ST_C_EXPRESS_AREA', 'ST_C_WAREHOUSE_LOGISTICS', 'ST_C_SEND_RULE', 'ST_C_SEND_RULE_RATE'];
      // 缺货备注特殊处理 退换货卖家备注导入
      const coverParamsTableName = ['OUT_OF_STOCK_MEMO', 'OC_B_RETURN_ORDER_remark'];
      // 促销活动
      const promotionTableName = ['PS_C_SKU', 'SG_B_CHANNEL_PRODUCT', 'PS_C_PRO', 'IP_C_TAOBAO_PRODUCT'];
      switch (this.componentData.tableName) {
        case objidParamsTableName.find(n => n === this.componentData.tableName):
          if (objid) param.append('objid', objid);
          break;
        case coverParamsTableName.find(n => n === this.componentData.tableName):
          param.append('cover', this.cover);
          break;
        case 'OC_B_REFUND_IN': // 退货入库
          param.append('cover', this.cover === 'false' ? 'true' : 'false');
          break;
        case 'ST_C_PRODUCT_STRATEGY': // 店铺商品特殊设置
          if (objid) {
            param.append('mainId', objid);
            param.append('table', 'ST_C_PRODUCT_STRATEGY_ITEM');
            param.append('mainTable', 'ST_C_PRODUCT_STRATEGY');
            param.append('menu', this.vmI18n.t('modalTitle.a0')); // 店铺商品特殊设置明细
          }
          break;
        case 'AC_F_RECEIVABLES_ADJUSTMENT': // 应收款调整单导入
          if (objid) param.append('billType', objid);
          break;
        case 'OC_B_MULTI_STORE_DISTRIBUTION': // 多店配货导入条码明细
          if (objid) param.append('objId', objid);
          break;
        case 'OC_B_SEND_OUT': // 销售订单导入
          if (objid && this.componentData.importType === 2) {
            param.append('objId', objid);
          }
          break;
        case 'SC_B_TRANSFER':
          if (objid && this.componentData.importType === 3) {
            param.append('objid', objid);
          }
          break;
        case promotionTableName.find(n => n === this.componentData.tableName): // 促销导入
          param.append('table', this.componentData.tableName);
          if (this.componentData.mode) {
            param.append('mode', this.componentData.mode);
          }
          break;
      }
      param.append('file', _this.files, _this.text);
      if (this.componentData.type) {
        param.append('type', this.componentData.type);
      }
      if (this.componentData.mainId) {
        param.append('mainId', this.componentData.mainId);
      }
      axios({
        url,
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: param
      })
        .then(res => {
          if (res.data.code === 0) {
            // 导入成功
            _this.$Message.success(res.data.message || this.vmI18n.t('modalTips.ze'));
            _this.$emit('returnData', res.data.data);
            _this.customizeInvoke(_this.componentData.tableName);
            _this.loading = false;
          } else if (res.data.code === -1) {
            // 导入失败
            const err = res.data.message || this.vmI18n.t('modalTips.zd');
            _this.isError = true;
            _this.errorMessage = err;
            _this.loading = false;
            // 清空已上传文件
            const xFile = document.getElementById('xFile');
            xFile.value = '';
            this.text = '';
            this.file = {};
          } else if (res.data.data) {
            _this.loading = false;
            _this.isError = true;
            _this.errorMessage = res.data.message;
            this.downloadUrlFile(res.data.data);
            _this.loading = false;
          }
        })
        .catch(() => {
          _this.loading = false;
        });
    },
    // 导入成功后操作
    customizeInvoke(table) {
      const _this = this;
      if (table === 'AC_F_DISTRIBUTION') {
        _this.$parent.$parent.$parent.getDetail();
      } else if (table === 'ST_C_EXPRESS_AREA') {
        _this.$parent.$parent.$parent.getTree('import');
      } else if (table === 'OUT_OF_STOCK_MEMO') {
        _this.$parent.$parent.$parent.getData();
      } else if (table === 'ST_C_WAREHOUSE_LOGISTICS') {
        _this.$parent.$parent.$parent.refresh();
      } else if (table === 'OC_B_REFUND_IN') {
        _this.$parent.$parent.$parent.requestBefore();
      } else if (table === 'OC_B_INVOICE_NOTICE') {
        _this.$parent.$parent.$parent.find();
      } else if (table === 'ST_C_SEND_RULE') {
        _this.$parent.$parent.$parent.refresh();
      } else if (table === 'ST_C_SEND_RULE_RATE') {
        _this.$parent.$parent.$parent.refresh();
      } else if (table === 'ST_C_PRODUCT_STRATEGY') {
        _this.$parent.$parent.$parent.objectAddRefresh();
      } else if (table === 'AC_F_RECEIVABLES_ADJUSTMENT' || table === 'SG_B_PHY_OUT_RESULT' || table === 'SC_B_TRANSFER' || table === 'OC_B_JD_RETURN_ORDER') {
        _this.$parent.$emit('confirmImport');
      }
    },
    // 上传文件前判断文件大小
    handleBefore(file) {
      const size = file.size / 1024 / 1024;
      if (size > 64) {
        this.isError = true;
        // this.errorMessage = "文件最大64M!";
        this.errorMessage = this.vmI18n.t('modalTips.zb');
        return true;
      }
      return false;
    },
    closeConfirm() {
      const _this = this;
      // 元数据配置窗口特殊处理
      if (_this.configTableName.includes(_this.componentData.tableName)) {
        _this.$parent.$emit('closeActionDialog');
      } else if (_this.$parent.$parent.closeConfirm) {
        _this.$parent.$parent.closeConfirm();
      } else {
        _this.$parent.$emit('closeActionDialog');
      }
    }
  }
};
