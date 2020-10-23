<!-- 导入组件-->
import axios from "axios";
import {setTimeout} from "timers";

export default {
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      text: "", // 选择的导入文件名
      files: {}, // 选择的文件
      loading: false, // 导入中loading
      isError: false, // 是否导入失败
      errorMessage: "", // 导入失败原因
      configTableName: [
        "ST_C_PRODUCT_STRATEGY",
        "AC_F_RECEIVABLES_ADJUSTMENT",
        "SG_B_PHY_OUT_RESULT",
        "SC_B_TRANSFER",
        "OC_B_MULTI_STORE_DISTRIBUTION",
        "OC_B_SEND_OUT",
        "OC_B_JD_RETURN_ORDER",
      ],
      cover: "false", // 缺货备注单选默认选择
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
      if (this.componentData.tableName === "OC_B_ORDER") {
        // 零售发货单
        this.getDownloadTemp("/api/cs/oc/oms/v1/downloadOrderTemp");
        return;
      } else if (this.componentData.tableName === "OC_B_RETURN_ORDER") {
        // 退换货订单
        this.getDownloadTemp("/api/cs/oc/oms/v1/downloadReturnOrderTemp");
        return;
      } else if (this.componentData.tableName === "PS_C_SKUGROUP") {
        if (this.componentData.operationType === "baseInfo") {
          // 组合商品明细表与虚拟明细
          this.getDownloadTemp("/p/cs/product/downloadSkuGroupTemp", {
            type: this.componentData.type,
          });
        } else {
          this.getDownloadTemp("/p/cs/product/downloadRealSkuGroupTemp", {
            type: this.componentData.type,
          });
        }
        return;
      } else if (this.componentData.tableName === "OC_B_INVOICE_NOTICE") {
        // 开票信息
        this.getDownloadTemp("/api/cs/oc/oms/v1/downloadInvoiceNotice");
        return;
      } else if (this.componentData.tableName === "AC_F_DISTRIBUTION") {
        // 分销代销商品明细
        this.getDownloadTemp("/p/cs/downloadDistributionItem");
        return;
      } else if (this.componentData.tableName === "ST_C_EXPRESS_AREA") {
        // 物流区域设置
        this.getDownloadTemp("/p/cs/downloadExpressAreaItem");
        return;
      } else if (this.componentData.tableName === "OUT_OF_STOCK_MEMO") {
        // 缺货备注
        this.getDownloadTemp("/api/cs/oc/oms/v1/downloadUpdateRemarkTemp");
        return;
      } else if (this.componentData.tableName === "ST_C_WAREHOUSE_LOGISTICS") {
        // 仓库物流优先级设置
        this.getDownloadTemp("/p/cs/downloadWarehouseLogisticsRank", {
          objid: this.componentData.objid,
        });
        return;
      } else if (this.componentData.tableName === "OC_B_REFUND_IN") {
        // 退货入库
        this.getDownloadTemp("/api/cs/oc/oms/v1/downloadRdfundInRemarkTemp");
        return;
      } else if (this.componentData.tableName === "ST_C_SEND_RULE") {
        // 订单派单规则-优先级
        this.getDownloadTemp("/p/cs/downloadSendRuleWarehouseRank", {
          objid: this.componentData.objid,
        });
        return;
      } else if (this.componentData.tableName === "ST_C_SEND_RULE_RATE") {
        // 订单派单规则-比例
        this.getDownloadTemp("/p/cs/downloadSendRuleWarehouseRate", {
          objid: this.componentData.objid,
        });
        return;
      } else if (this.componentData.tableName === "ST_C_PRODUCT_STRATEGY") {
        // 店铺商品特殊设置
        this.getDownloadTemp("/p/cs/downloadProductStrategyItem");
        return;
      } else if (this.componentData.tableName === "OC_B_RETURN_ORDER_remark") {
        // 退换货卖家备注导入
        this.getDownloadTemp("/api/cs/oc/oms/v1/downloadReturnRemarkTemp");
        return;
      } else if (
        this.componentData.tableName === "AC_F_RECEIVABLES_ADJUSTMENT"
      ) {
        // 应收款调整单导入
        this.getDownloadTemp("/p/cs/receivableAdjustmentDownload", {
          billType: this.componentData.billType,
        });
        return;
      } else if (this.componentData.tableName === "SC_B_TRANSFER") {
        if (this.componentData.importType === 3) {
          let downloadUrl =
            "http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/sc_b_transfer/dbd_template.xlsx";
          this.downloadUrlFile(downloadUrl);
        } else {
          // 导入-调拨单
          this.getDownloadTemp(" /p/cs/transfer/downloadTemp");
        }
        return;
      } else if (this.componentData.tableName === "SG_B_PHY_OUT_RESULT") {
        if (this.componentData.importType === 1) {
          this.getDownloadTemp("/p/cs/downLoadSgPhyOutResultTemp");
        }
      } else if (
        this.componentData.tableName === "OC_B_MULTI_STORE_DISTRIBUTION"
      ) {
        this.getDownloadTemp(
          "/p/cs/oc/v1/sale/downloadMultiStoreDistributionSku"
        );
      } else if (this.componentData.tableName === "OC_B_SEND_OUT") {
        if (this.componentData.importType === 1) {
          // this.getDownloadTemp("/p/cs/oc/v1/send/downloadSendOut");
          let downloadUrl =
            "http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/saleorder/importTemplate_batch.xlsx";
          this.downloadUrlFile(downloadUrl);
        } else {
          let downloadUrl =
            "http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/saleorder/importTemplate.xlsx";
          this.downloadUrlFile(downloadUrl);
        }
      } else if (this.componentData.tableName === "OC_B_JD_RETURN_ORDER") {
        // 导入-调拨单
        this.getDownloadTemp("/p/cs/ocBJdReturnOrder/downloadTemple");
        return;
      } else if (this.componentData.tableName === "IP_C_STANDPLAT_PRO") {
        // 通用商品下载
        let downloadUrl =
          "http://smtools.oss-cn-shanghai.aliyuncs.com/import/template/893/商品下载-商品代码上传模板-root-20200622161110098.xlsx";
        this.downloadUrlFile(downloadUrl);
      }
    },

    // 定制下载模板
    getDownloadTemp(url, param) {
      if (param) {
        axios({
          url: url,
          method: "post",
          data: param,
        }).then((res) => {
          if (res.data.code === 0) {
            this.downloadUrlFile(res.data.data);
          }
        });
      } else {
        axios({
          url: url,
          method: "post",
        }).then((res) => {
          if (res.data.code === 0) {
            this.downloadUrlFile(res.data.data);
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
      if (this.componentData.tableName === "OC_B_ORDER") {
        // 零售发货单
        this.getImportDialog("/api/cs/oc/oms/v1/importOcBOrder");
        return;
      } else if (this.componentData.tableName === "OC_B_RETURN_ORDER") {
        // 退换货订单
        this.getImportDialog("/api/cs/oc/oms/v1/importReturnOrder");
        return;
      } else if (this.componentData.tableName === "PS_C_SKUGROUP") {
        if (this.componentData.operationType === "baseInfo") {
          // 组合商品档案明细与虚拟条码
          this.getImportDialog("/p/cs/product/skuGroupImport");
        } else {
          // 组合商品档案明细
          this.getImportDialog("/p/cs/product/realSkuGroupImport");
        }
        return;
      } else if (this.componentData.tableName === "OC_B_INVOICE_NOTICE") {
        // 开票信息
        this.getImportDialog("/api/cs/oc/oms/v1/importInvoiceNotice");
        return;
      } else if (this.componentData.tableName === "AC_F_DISTRIBUTION") {
        // 分销代销商品明细
        this.getImportDialog("/p/cs/importDistributionItem");
        return;
      } else if (this.componentData.tableName === "ST_C_EXPRESS_AREA") {
        // 物流区域设置
        this.getImportDialog(
          "/p/cs/importExpressAreaItem",
          this.componentData.objid
        );
        return;
      } else if (this.componentData.tableName === "OUT_OF_STOCK_MEMO") {
        // 缺货备注
        this.getImportDialog(
          "/api/cs/oc/oms/v1/batchImport",
          this.componentData.objid
        );
        return;
      } else if (this.componentData.tableName === "ST_C_WAREHOUSE_LOGISTICS") {
        // 仓库物流优先级设置
        this.getImportDialog(
          "/p/cs/importWarehouseLogisticsRank",
          this.componentData.objid
        );
        return;
      } else if (this.componentData.tableName === "OC_B_REFUND_IN") {
        // 退货入库
        this.getImportDialog("/api/cs/oc/oms/v1/refundInImport");
        return;
      } else if (this.componentData.tableName === "ST_C_SEND_RULE") {
        // 订单派单规则-优先级
        this.getImportDialog(
          "/p/cs/importSendRuleWarehouseRank",
          this.componentData.objid
        );
        return;
      } else if (this.componentData.tableName === "ST_C_SEND_RULE_RATE") {
        // 订单派单规则-比例
        this.getImportDialog(
          "/p/cs/importSendRuleWarehouseRate",
          this.componentData.objid
        );
        return;
      } else if (this.componentData.tableName === "ST_C_PRODUCT_STRATEGY") {
        // 店铺商品特殊设置
        this.getImportDialog(
          "/p/cs/importProductStrategyItem",
          this.componentData.objid
        );
        return;
      } else if (this.componentData.tableName === "OC_B_RETURN_ORDER_remark") {
        // 退换货卖家备注导入
        this.getImportDialog(
          "/api/cs/oc/oms/v1/importReturnSellerRemark",
          this.componentData.objid
        );
        return;
      } else if (
        this.componentData.tableName === "AC_F_RECEIVABLES_ADJUSTMENT"
      ) {
        // 应收款调整单导入
        this.getImportDialog(
          "/p/cs/receivableAdjustmentImport",
          this.componentData.billType
        );
        return;
      } else if (this.componentData.tableName === "SC_B_TRANSFER") {
        if (this.componentData.importType === 3) {
          this.getImportDialog(
            "/p/cs/store/transfer/importTransferItems",
            this.componentData.objid
          );
        } else {
          this.getImportDialog("/p/cs/transfer/sgTransferImport");
        }
        return;
      } else if (this.componentData.tableName === "SG_B_PHY_OUT_RESULT") {
        if (this.componentData.importType === 1) {
          this.getImportDialog("/p/cs/importSgPhyOutResult");
        }
      } else if (
        this.componentData.tableName === "OC_B_MULTI_STORE_DISTRIBUTION"
      ) {
        this.getImportDialog(
          "/p/cs/oc/v1/sale/importMultiStoreDistributionSku",
          this.componentData.objid
        );
      } else if (this.componentData.tableName === "OC_B_SEND_OUT") {
        if (this.componentData.importType === 1) {
          this.getImportDialog("/p/cs/oc/v1/send/importSendOut");
        } else {
          this.getImportDialog(
            "/p/cs/oc/v1/send/importSendOutSku",
            this.componentData.objid
          );
        }
      } else if (this.componentData.tableName === "OC_B_JD_RETURN_ORDER") {
        this.getImportDialog("/p/cs/ocBJdReturnOrder/importTemple");
        return;
      } else if (this.componentData.tableName === "IP_C_STANDPLAT_PRO") {
        // 通用商品下载
        this.getImportDialog("/p/cs/getItemIdsForExcel");
        return;
      }
    },
    closeConfirm() {
      const _this = this;
      // 元数据配置窗口特殊处理
      if (_this.configTableName.includes(_this.componentData.tableName)) {
        _this.$parent.$emit("closeActionDialog");
      } else {
        _this.$parent.$parent.closeConfirm();
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
      // 物流区域设置特殊处理
      if (objid && this.componentData.tableName === "ST_C_EXPRESS_AREA")
        param.append("objid", objid);
      // 缺货备注特殊处理
      if (this.componentData.tableName === "OUT_OF_STOCK_MEMO")
        param.append("cover", this.cover);
      // 仓库物流优先级设置
      if (objid && this.componentData.tableName === "ST_C_WAREHOUSE_LOGISTICS")
        param.append("objid", objid);
      // 退货入库
      if (this.componentData.tableName === "OC_B_REFUND_IN")
        param.append("cover", this.cover === "false" ? "true" : "false");
      // 订单派单规则-优先级
      if (objid && this.componentData.tableName === "ST_C_SEND_RULE")
        param.append("objid", objid);
      // 订单派单规则-比例
      if (objid && this.componentData.tableName === "ST_C_SEND_RULE_RATE")
        param.append("objid", objid);
      // 店铺商品特殊设置
      if (objid && this.componentData.tableName === "ST_C_PRODUCT_STRATEGY") {
        param.append("mainId", objid);
        param.append("channelType", this.componentData.channelType);
        param.append("table", "ST_C_PRODUCT_STRATEGY_ITEM");
        param.append("mainTable", "ST_C_PRODUCT_STRATEGY");
        // param.append("menu", "店铺商品特殊设置明细");
        param.append("menu", vmI18n.t('modalTitle.a0'));
      }
      // 退换货卖家备注导入
      if (this.componentData.tableName === "OC_B_RETURN_ORDER_remark")
        param.append("cover", this.cover);
      // 应收款调整单导入
      if (
        objid &&
        this.componentData.tableName === "AC_F_RECEIVABLES_ADJUSTMENT"
      ) {
        param.append("billType", objid);
      }
      // 多店配货导入条码明细
      if (
        objid &&
        this.componentData.tableName === "OC_B_MULTI_STORE_DISTRIBUTION"
      )
        param.append("objId", objid);
      // 销售订单导入
      if (objid && this.componentData.tableName === "OC_B_SEND_OUT") {
        if (this.componentData.importType === 2) {
          param.append("objId", objid);
        }
      }
      if (objid && this.componentData.tableName === "SC_B_TRANSFER") {
        if (this.componentData.importType === 3) {
          param.append("objid", objid);
        }
      }
      param.append("file", _this.files, _this.text);
      if (this.componentData.type) {
        param.append("type", this.componentData.type);
      }
      if (this.componentData.mainId) {
        param.append("mainId", this.componentData.mainId);
      }
      axios({
        url: url,
        method: "post",
        cancelToken: true,
        headers: {"Content-Type": "multipart/form-data"},
        data: param,
      })
        .then((res) => {
          if (res.data.code === 0) {
            // _this.$Message.success(res.data.message || "导入成功");
            _this.$Message.success(res.data.message || vmI18n.t('modalTips.zd'));
            _this.$emit("returnData", res.data.data);
            if (_this.configTableName.includes(_this.componentData.tableName)) {
              _this.$parent.$emit("closeActionDialog");
            } else {
              _this.$parent.$parent.closeConfirm();
            }
            _this.customizeInvoke(_this.componentData.tableName);
          } else if (res.data.code === -1) {
            // let err = res.data.message || "导入失败";
            let err = res.data.message || vmI18n.t('modalTips.ze');
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
        })
        .catch(() => {
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
      } else if (table === "ST_C_PRODUCT_STRATEGY") {
        _this.$parent.$parent.$parent.objectAddRefresh();
      } else if (
        table === "AC_F_RECEIVABLES_ADJUSTMENT" ||
        table === "SG_B_PHY_OUT_RESULT" ||
        table === "SC_B_TRANSFER" ||
        table === "OC_B_JD_RETURN_ORDER"
      ) {
        _this.$parent.$emit("confirmImport");
      }
    },
    // 上传文件前判断文件大小
    handleBefore(file) {
      let size = file.size / 1024 / 1024;
      if (size > 64) {
        this.isError = true;
        // this.errorMessage = "文件最大64M!";
        this.errorMessage = vmI18n.t('modalTips.zb');
        return true;
      }
    },
  },
  created() {
    const _this = this;
    // document.onkeydown = function(e) {
    //   if(_this.$parent.$parent.modal) {
    //     let key = e.keyCode;
    //     if (key == 13) {
    //       _this.importDialog();
    //     } else if (key == 27) {
    //       _this.$parent.$parent.closeConfirm();
    //     }
    //   }
    // };
  },
  destroyed() {
    // window.removeEventListener("keydown", this, false);
  },
};
