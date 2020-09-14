<!-- 导入组件-->
<template>
  <div>
    <div class="content">
      <div class="iconclass">
        <i class="burgeon-icon iconfont icondaoru" />
      </div>
      <div class="text">
        <span>注意：上传文件中，不要放置宏或图标，不要更改列的顺序，数据中不要使用公式。</span>
        <a
          v-if="excludeDownloadFlag"
          @click="downloadTemplate"
        >(下载模版)</a>
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
      <!--备注导入专用-->
      <div
        v-if="
          componentData.tableName === 'OUT_OF_STOCK_MEMO' ||
            componentData.tableName === 'OC_B_REFUND_IN' ||
            componentData.tableName === 'OC_B_RETURN_ORDER_remark'
        "
      >
        <RadioGroup
          v-model="cover"
          class="memoImport"
        >
          <Radio label="true">
            覆盖原备注
          </Radio>
          <Radio label="false">
            追加到原备注
          </Radio>
        </RadioGroup>
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
    <jordanBtn
      :btn-config="btnConfig"
      style="margin-top:10px;"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import jordanBtn from 'framework/jordanComponents/jordanButton.vue';
  import { setTimeout } from 'timers';

  export default {
    components: {
      jordanBtn,
    },
    props: {
      componentData: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        text: '', // 选择的导入文件名
        files: {}, // 选择的文件
        loading: false, // 导入中loading
        isError: false, // 是否导入失败
        errorMessage: '', // 导入失败原因
        excludeDownloadTable: [
          'POS_SC_B_TRANSFER',
          'OC_B_SALE',
          'OC_B_REFUND_SALE',
          'SG_B_OUT_PICKORDER',
        ],
        excludeDownloadFlag: true,
        configTableName: [
          'ST_C_PRODUCT_STRATEGY',
          'AC_F_RECEIVABLES_ADJUSTMENT',
          'SG_B_PHY_OUT_RESULT',
          'SC_B_TRANSFER',
          'OC_B_MULTI_STORE_DISTRIBUTION',
          'OC_B_SEND_OUT',
          'OC_B_JD_RETURN_ORDER',
          'POS_SC_B_TRANSFER',
          'OC_B_SALE',
          'OC_B_REFUND_SALE',
          'OC_B_JD_REFUND_IN',
        ],
        btnControlTable: ['OC_B_SEND_OUT'],
        btnConfig: {
          typeAll: 'error', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              text: '取消', // 按钮文本
              disabled: false,
              btnclick: () => {
                const _this = this;
                // 元数据配置窗口特殊处理
                if (
                  _this.configTableName.includes(_this.componentData.tableName)
                ) {
                  _this.$parent.$emit('closeActionDialog', false);
                } else {
                  _this.$parent.$parent.closeConfirm();
                }
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
        cover: 'false', // 缺货备注单选默认选择
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
        if (this.componentData.tableName === 'OC_B_ORDER') {
          // 订单管理
          this.getDownloadTemp('/p/cs/downloadOrderTemp');
        } else if (this.componentData.tableName === 'OC_B_RETURN_ORDER') {
          // 退换货订单
          this.getDownloadTemp('/p/cs/downloadReturnOrderTemp');
        } else if (this.componentData.tableName === 'PS_C_SKUGROUP') {
          if (this.componentData.operationType === 'baseInfo') {
            // 组合商品明细表与虚拟明细
            this.getDownloadTemp('/p/cs/product/downloadSkuGroupTemp', {
              type: this.componentData.type,
            });
          } else {
            this.getDownloadTemp('/p/cs/product/downloadRealSkuGroupTemp', {
              type: this.componentData.type,
            });
          }
        } else if (this.componentData.tableName === 'OC_B_INVOICE_NOTICE') {
          // 开票信息
          this.getDownloadTemp('/p/cs/downloadInvoiceNotice');
        } else if (this.componentData.tableName === 'AC_F_DISTRIBUTION') {
          // 分销代销商品明细
          this.getDownloadTemp('/p/cs/downloadDistributionItem');
        } else if (this.componentData.tableName === 'ST_C_EXPRESS_AREA') {
          // 物流区域设置
          this.getDownloadTemp('/p/cs/downloadExpressAreaItem');
        } else if (this.componentData.tableName === 'OUT_OF_STOCK_MEMO') {
          // 缺货备注
          this.getDownloadTemp('/p/cs/downloadUpdateRemarkTemp');
        } else if (this.componentData.tableName === 'ST_C_WAREHOUSE_LOGISTICS') {
          // 仓库物流优先级设置
          this.getDownloadTemp('/p/cs/downloadWarehouseLogisticsRank', {
            objid: this.componentData.objid,
          });
        } else if (this.componentData.tableName === 'OC_B_REFUND_IN') {
          // 退货入库
          this.getDownloadTemp('/p/cs/downloadRdfundInRemarkTemp');
        } else if (this.componentData.tableName === 'ST_C_SEND_RULE') {
          // 订单派单规则-优先级
          this.getDownloadTemp('/p/cs/downloadSendRuleWarehouseRank', {
            objid: this.componentData.objid,
          });
        } else if (this.componentData.tableName === 'ST_C_SEND_RULE_RATE') {
          // 订单派单规则-比例
          this.getDownloadTemp('/p/cs/downloadSendRuleWarehouseRate', {
            objid: this.componentData.objid,
          });
        } else if (this.componentData.tableName === 'ST_C_PRODUCT_STRATEGY') {
          // 店铺商品特殊设置
          this.getDownloadTemp('/p/cs/downloadProductStrategyItem');
        } else if (this.componentData.tableName === 'OC_B_RETURN_ORDER_remark') {
          // 退换货卖家备注导入
          this.getDownloadTemp('/p/cs/downloadReturnRemarkTemp');
        } else if (
          this.componentData.tableName === 'AC_F_RECEIVABLES_ADJUSTMENT'
        ) {
          // 应收款调整单导入
          this.getDownloadTemp('/p/cs/receivableAdjustmentDownload', {
            billType: this.componentData.billType,
          });
        } else if (this.componentData.tableName === 'SC_B_TRANSFER') {
          if (this.componentData.importType === 3) {
            const downloadUrl = 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/sc_b_transfer/dbd_template.xlsx';
            this.downloadUrlFile(downloadUrl);
          } else {
            // 导入-调拨单
            this.getDownloadTemp(' /p/cs/transfer/downloadTemp');
          }
        } else if (this.componentData.tableName === 'SG_B_PHY_OUT_RESULT') {
          if (this.componentData.importType === 1) {
            this.getDownloadTemp('/p/cs/downLoadSgPhyOutResultTemp');
          }
        } else if (
          this.componentData.tableName === 'OC_B_MULTI_STORE_DISTRIBUTION'
        ) {
          this.getDownloadTemp(
            '/p/cs/oc/v1/sale/downloadMultiStoreDistributionSku'
          );
        } else if (this.componentData.tableName === 'OC_B_SEND_OUT') {
          if (this.componentData.importType === 1) {
            // this.getDownloadTemp("/p/cs/oc/v1/send/downloadSendOut");
            const downloadUrl = 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/saleorder/importTemplate_batch.xlsx';
            this.downloadUrlFile(downloadUrl);
          } else {
            const downloadUrl = 'http://qd-r3-upload-dev.oss-cn-shanghai.aliyuncs.com/import/template/saleorder/importTemplate.xlsx';
            this.downloadUrlFile(downloadUrl);
          }
        } else if (this.componentData.tableName === 'OC_B_JD_RETURN_ORDER') {
          // 导入
          this.getDownloadTemp('/p/cs/ocBJdReturnOrder/downloadTemple');
        } else if (this.componentData.tableName === 'OC_B_JD_REFUND_IN') {
          // 导入
          this.getDownloadTemp('/p/cs/ocBJdRefundInOrder/downloadTemple');
        }
      },

      // 定制下载模板
      getDownloadTemp(url, param) {
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
      // 导出
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
      // 导入
      importDialog() {
        if (this.handleBefore(this.files)) return;
        if (this.componentData.tableName === 'OC_B_ORDER') {
          // 订单管理
          this.getImportDialog('/p/cs/importOcBOrder');
        } else if (this.componentData.tableName === 'OC_B_RETURN_ORDER') {
          // 退换货订单
          this.getImportDialog('/p/cs/importReturnOrder');
        } else if (this.componentData.tableName === 'PS_C_SKUGROUP') {
          if (this.componentData.operationType === 'baseInfo') {
            // 组合商品档案明细与虚拟条码
            this.getImportDialog('/p/cs/product/skuGroupImport');
          } else {
            // 组合商品档案明细
            this.getImportDialog('/p/cs/product/realSkuGroupImport');
          }
        } else if (this.componentData.tableName === 'OC_B_INVOICE_NOTICE') {
          // 开票信息
          this.getImportDialog('/p/cs/importInvoiceNotice');
        } else if (this.componentData.tableName === 'AC_F_DISTRIBUTION') {
          // 分销代销商品明细
          this.getImportDialog('/p/cs/importDistributionItem');
        } else if (this.componentData.tableName === 'ST_C_EXPRESS_AREA') {
          // 物流区域设置
          this.getImportDialog(
            '/p/cs/importExpressAreaItem',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'OUT_OF_STOCK_MEMO') {
          // 缺货备注
          this.getImportDialog('/p/cs/batchImport', this.componentData.objid);
        } else if (this.componentData.tableName === 'ST_C_WAREHOUSE_LOGISTICS') {
          // 仓库物流优先级设置
          this.getImportDialog(
            '/p/cs/importWarehouseLogisticsRank',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'OC_B_REFUND_IN') {
          // 退货入库
          this.getImportDialog('/p/cs/refundInImport');
        } else if (this.componentData.tableName === 'ST_C_SEND_RULE') {
          // 订单派单规则-优先级
          this.getImportDialog(
            '/p/cs/importSendRuleWarehouseRank',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'ST_C_SEND_RULE_RATE') {
          // 订单派单规则-比例
          this.getImportDialog(
            '/p/cs/importSendRuleWarehouseRate',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'ST_C_PRODUCT_STRATEGY') {
          // 店铺商品特殊设置
          this.getImportDialog(
            '/p/cs/importProductStrategyItem',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'OC_B_RETURN_ORDER_remark') {
          // 退换货卖家备注导入
          this.getImportDialog(
            '/p/cs/importReturnSellerRemark',
            this.componentData.objid
          );
        } else if (
          this.componentData.tableName === 'AC_F_RECEIVABLES_ADJUSTMENT'
        ) {
          // 应收款调整单导入
          this.getImportDialog(
            '/p/cs/receivableAdjustmentImport',
            this.componentData.billType
          );
        } else if (this.componentData.tableName === 'SC_B_TRANSFER') {
          if (this.componentData.importType === 3) {
            this.getImportDialog(
              '/p/cs/store/transfer/importTransferItems',
              this.componentData.objid
            );
          } else {
            this.getImportDialog('/p/cs/transfer/sgTransferImport');
          }
        } else if (this.componentData.tableName === 'SG_B_PHY_OUT_RESULT') {
          if (this.componentData.importType === 1) {
            this.getImportDialog('/p/cs/importSgPhyOutResult');
          }
        } else if (
          this.componentData.tableName === 'OC_B_MULTI_STORE_DISTRIBUTION'
        ) {
          this.getImportDialog(
            '/p/cs/oc/v1/sale/importMultiStoreDistributionSku',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'OC_B_SEND_OUT') {
          if (this.componentData.importType === 1) {
            this.getImportDialog('/p/cs/oc/v1/send/importSendOut');
          } else {
            this.getImportDialog(
              '/p/cs/oc/v1/send/importSendOutSku',
              this.componentData.objid
            );
          }
        } else if (this.componentData.tableName === 'OC_B_JD_RETURN_ORDER') {
          this.getImportDialog('/p/cs/ocBJdReturnOrder/importTemple');
        } else if (this.componentData.tableName === 'POS_SC_B_TRANSFER') {
          this.getImportDialog(
            '/p/cs/sg/transferPos/import',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'OC_B_SALE') {
          this.getImportDialog(
            '/p/cs/oc/sale/pdaImport',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'OC_B_REFUND_SALE') {
          this.getImportDialog(
            '/p/cs/oc/refundSale/pdaImport',
            this.componentData.objid
          );
        } else if (this.componentData.tableName === 'OC_B_JD_REFUND_IN') {
          this.getImportDialog('/p/cs/ocBJdRefundInOrder/importTemple');
        } else if (this.componentData.tableName === 'SG_B_OUT_PICKORDER') {
          this.getImportDialog(
            '/p/cs/sg/outPickorder/pdaImport',
            this.componentData.objid
          );
        }
      },
      // 导入请求
      getImportDialog(url, objid) {
        const _this = this;
        if (!_this.text) {
          return _this.$Message.error('请选择需要导入的文件！');
        }
        _this.loading = true;
        const param = new FormData();
        // 物流区域设置特殊处理
        if (objid && this.componentData.tableName === 'ST_C_EXPRESS_AREA') {
          param.append('objid', objid);
        }
        // 缺货备注特殊处理
        if (this.componentData.tableName === 'OUT_OF_STOCK_MEMO') {
          param.append('cover', this.cover);
        }
        // 仓库物流优先级设置
        if (
          objid
          && this.componentData.tableName === 'ST_C_WAREHOUSE_LOGISTICS'
        ) {
          param.append('objid', objid);
        }
        // 退货入库
        if (this.componentData.tableName === 'OC_B_REFUND_IN') {
          param.append('cover', this.cover === 'false' ? 'true' : 'false');
        }
        // 订单派单规则-优先级
        if (objid && this.componentData.tableName === 'ST_C_SEND_RULE') {
          param.append('objid', objid);
        }
        // 订单派单规则-比例
        if (objid && this.componentData.tableName === 'ST_C_SEND_RULE_RATE') {
          param.append('objid', objid);
        }
        // 店铺商品特殊设置
        if (objid && this.componentData.tableName === 'ST_C_PRODUCT_STRATEGY') {
          param.append('mainId', objid);
          param.append('channelType', this.componentData.channelType);
          param.append('table', 'ST_C_PRODUCT_STRATEGY_ITEM');
          param.append('mainTable', 'ST_C_PRODUCT_STRATEGY');
          param.append('menu', '店铺商品特殊设置明细');
        }
        // 退换货卖家备注导入
        if (this.componentData.tableName === 'OC_B_RETURN_ORDER_remark') {
          param.append('cover', this.cover);
        }
        // 应收款调整单导入
        if (
          objid
          && this.componentData.tableName === 'AC_F_RECEIVABLES_ADJUSTMENT'
        ) {
          param.append('billType', objid);
        }
        // 多店配货导入条码明细
        if (
          objid
          && this.componentData.tableName === 'OC_B_MULTI_STORE_DISTRIBUTION'
        ) {
          param.append('objId', objid);
        }
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
        if (
          objid
          && this.excludeDownloadTable.includes(this.componentData.tableName)
        ) {
          param.append('mainId', objid);
          param.append('table', this.componentData.tableName);
          param.append('mainTable', this.componentData.tableName);
          param.append('menu', this.componentData.tableEname);
        }
        param.append('file', _this.files, _this.text);
        if (this.componentData.type) {
          param.append('type', this.componentData.type);
        }
        if (this.componentData.mainId) {
          param.append('mainId', this.componentData.mainId);
        }
        if (_this.btnControlTable.includes(_this.componentData.tableName)) {
          _this.btnConfig.buttons.map((btn) => {
            btn.disabled = true;
          });
        }
        axios({
          url,
          method: 'post',
          // cancelToken: true,
          headers: { 'Content-Type': 'multipart/form-data' },
          data: param,
        }).then((res) => {
          console.log(res);
          if (res.data.code === 0 || res.data.code === 1) {
            _this.$Message.success(res.data.message);
            _this.$emit('returnData', res.data.data);
            if (_this.configTableName.includes(_this.componentData.tableName)) {
              _this.$parent.$emit('closeActionDialog');
            } else {
              _this.$parent.$parent.closeConfirm();
            }
            _this.customizeInvoke(_this.componentData.tableName);
          } else if (res.data.code === -1) {
            const err = res.data.message || '导入失败';
            _this.isError = true;
            _this.errorMessage = err;
            _this.$Message.error(_this.errorMessage);
          } else if (res.data.data) {
            _this.loading = false;
            _this.isError = true;
            _this.errorMessage = res.data.message;
            _this.$Message.error(_this.errorMessage);
            this.downloadUrlFile(res.data.data);
          }
          if (_this.btnControlTable.includes(_this.componentData.tableName)) {
            _this.btnConfig.buttons.map((btn) => {
              btn.disabled = false;
            });
          }
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
        } else if (
          table === 'AC_F_RECEIVABLES_ADJUSTMENT'
          || table === 'SG_B_PHY_OUT_RESULT'
          || table === 'SC_B_TRANSFER'
          || table === 'OC_B_JD_RETURN_ORDER'
          || table === 'OC_B_JD_REFUND_IN'
        ) {
          _this.$parent.$emit('confirmImport');
        } else if (table === 'OC_B_SEND_OUT') {
          _this.$parent.$parent.$parent.objectAddRefresh();
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
      console.log(_this);
      if (this.excludeDownloadTable.includes(this.componentData.tableName)) {
        if (this.componentData.tableName === 'POS_SC_B_TRANSFER') {
          if (this.componentData.importType === 'pdaImport') {
            this.excludeDownloadFlag = false;
          }
        } else {
          this.excludeDownloadFlag = false;
        }
      }
    },
    destroyed() {
    // window.removeEventListener("keydown", this, false);
    },
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
</style>
