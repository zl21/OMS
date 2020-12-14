// <!-- 导入组件-->
import axios from 'axios';
import loading from '@/component/loading.vue';
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
            }, // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.importDialog();
            }, // 按钮点击事件
          }
        ],
      },
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
        case 'PS_C_SKU' || 'SG_B_CHANNEL_PRODUCT' || 'PS_C_PRO' || 'IP_C_TAOBAO_PRODUCT':
          console.log(itemObj[0]);
          // eslint-disable-next-line no-case-declarations
          const searchParam = new URLSearchParams();
          searchParam.append('param', JSON.stringify({ mode: this.componentData.mode }));
          this.getDownloadTemp(itemObj[0].downLoadUrl, searchParam);
          break;
        case 'PS_C_SKUGROUP': 
          if (this.componentData.operationType === 'baseInfo') {
            // 组合商品明细表与虚拟明细
            this.getDownloadTemp(itemObj[0].downloadUrlType, {
              type: this.componentData.type
            });
          } else {
            // 组合商品档案明细
            this.getDownloadTemp(itemObj[0].downLoadUrl, {
              type: this.componentData.type
            });
          }
          break;
        case 'ST_C_WAREHOUSE_LOGISTICS' || 'ST_C_SEND_RULE' || 'ST_C_SEND_RULE_RATE' || '':
          this.getDownloadTemp(itemObj[0].downLoadUrl, {
            objid: this.componentData.objid
          });
          break;
        case 'AC_F_RECEIVABLES_ADJUSTMENT':
          this.getDownloadTemp(itemObj[0].downLoadUrl, {
            billType: this.componentData.billType
          });
          break;
        case 'SC_B_TRANSFER':
          if (this.componentData.importType === 3) {
            this.downloadUrlFile(itemObj[0].downloadUrlType);
          } else {
            // 导入-调拨单
            this.getDownloadTemp(itemObj[0].downLoadUrl);
          }
          break;
        case 'SG_B_PHY_OUT_RESULT':
          if (this.componentData.importType === 1) {
            this.getDownloadTemp(itemObj[0].downLoadUrl);
          }
          break;
        case 'OC_B_SEND_OUT':
          if (this.componentData.importType === 1) {
            this.downloadUrlFile(itemObj[0].downloadUrlType);
          } else {
            // 导入-调拨单
            this.downloadUrlFile(itemObj[0].downLoadUrl);
          }
          break;
        case 'IP_C_STANDPLAT_PRO':
          this.downloadUrlFile(itemObj[0].downLoadUrl);
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
    // 导出
    downloadUrlFile(src) {
      const downloadFile = {};
      if (typeof downloadFile.iframe === 'undefined') {
        const iframe = document.createElement('iframe');
        downloadFile.iframe = iframe;
        document.body.appendChild(downloadFile.iframe);
      }
      downloadFile.iframe.src = src;
      downloadFile.iframe.style.display = 'none';
    },
    // 导入
    importDialog() {
      if (this.handleBefore(this.files)) return;
      // 获取接口数组
      const objArr = this.service.common.importApiArr();
      // 筛选出当前表的接口对象
      const itemObj = objArr.filter(item => item.tableName === this.componentData.tableName);
      console.log(itemObj[0].tableName);
      switch (itemObj[0].tableName) {
        case 'PS_C_SKU' || 'SG_B_CHANNEL_PRODUCT' || 'PS_C_PRO' || 'IP_C_TAOBAO_PRODUCT':
          // 促销中心导入弹窗
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
        case 'ST_C_EXPRESS_AREA' || 'OUT_OF_STOCK_MEMO' || 'ST_C_WAREHOUSE_LOGISTICS' || 'ST_C_SEND_RULE' || 'ST_C_SEND_RULE_RATE' || 'OC_B_RETURN_ORDER_remark' || 'OC_B_MULTI_STORE_DISTRIBUTION' || 'ST_C_PRODUCT_STRATEGY':
          this.getImportDialog(itemObj[0].url, this.componentData.objid);
          break;
        case 'AC_F_RECEIVABLES_ADJUSTMENT':
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
        case 'OC_B_SEND_OUT':
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
      // 判断如果有其他类型
      // if (this.componentData.mode || this.componentData.operationType || this.componentData.importType) {
      //   this.getImportDialog(itemObj[0].urlType, this.componentData.objid ? this.componentData.objid : '');
      // } else {
      //   this.getImportDialog(itemObj[0].url, this.componentData.objid ? this.componentData.objid : '');
      // }
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
      // 物流区域设置特殊处理
      if (objid && this.componentData.tableName === 'ST_C_EXPRESS_AREA') param.append('objid', objid);
      // 缺货备注特殊处理
      if (this.componentData.tableName === 'OUT_OF_STOCK_MEMO') param.append('cover', this.cover);
      // 仓库物流优先级设置
      if (objid && this.componentData.tableName === 'ST_C_WAREHOUSE_LOGISTICS') param.append('objid', objid);
      // 退货入库
      if (this.componentData.tableName === 'OC_B_REFUND_IN') param.append('cover', this.cover === 'false' ? 'true' : 'false');
      // 订单派单规则-优先级
      if (objid && this.componentData.tableName === 'ST_C_SEND_RULE') param.append('objid', objid);
      // 订单派单规则-比例
      if (objid && this.componentData.tableName === 'ST_C_SEND_RULE_RATE') param.append('objid', objid);
      // 店铺商品特殊设置
      if (objid && this.componentData.tableName === 'ST_C_PRODUCT_STRATEGY') {
        param.append('mainId', objid);
        // param.append('channelType', this.componentData.channelType);
        param.append('table', 'ST_C_PRODUCT_STRATEGY_ITEM');
        param.append('mainTable', 'ST_C_PRODUCT_STRATEGY');
        // param.append("menu", "店铺商品特殊设置明细");
        param.append('menu', this.vmI18n.t('modalTitle.a0'));
      }
      // 退换货卖家备注导入
      if (this.componentData.tableName === 'OC_B_RETURN_ORDER_remark') param.append('cover', this.cover);
      // 应收款调整单导入
      if (objid && this.componentData.tableName === 'AC_F_RECEIVABLES_ADJUSTMENT') {
        param.append('billType', objid);
      }
      // 多店配货导入条码明细
      if (objid && this.componentData.tableName === 'OC_B_MULTI_STORE_DISTRIBUTION') param.append('objId', objid);
      // 销售订单导入
      if (objid && this.componentData.tableName === 'OC_B_SEND_OUT') {
        if (this.componentData.importType === 2) {
          param.append('objId', objid);
        }
      }
      if (objid && this.componentData.tableName === 'SC_B_TRANSFER') {
        if (this.componentData.importType === 3) {
          param.append('objid', objid);
        }
      }
      // 促销导入;
      if (this.componentData.tableName === 'PS_C_SKU' || this.componentData.tableName === 'SG_B_CHANNEL_PRODUCT' || this.componentData.tableName === 'PS_C_PRO' || this.componentData.tableName === 'IP_C_TAOBAO_PRODUCT') {
        param.append('table', this.componentData.tableName);
        if (this.componentData.mode) {
          param.append('mode', this.componentData.mode);
        }
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
    }
  }
};
