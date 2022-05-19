<template>
  <div class="ff-file-dialog">
    <my-dialog
      class="ff-file-dialog-box"
      :visible.sync="showFlag"
      :show-close="true"
      :class="mode"
      :close-on-click-modal="false"
      :title="completeTitle"
      :append-to-body="appendToBody"
      :modal-append-to-body="modalAppendToBody"
      @visible-change="closeDialog"
    >
      <div class="file-content">
        <div class="icon-panel">
          <span class="icon-span">
            <i
              v-if="mode=='import'"
              class="iconfont"
            >&#xe633;</i>
            <i
              v-if="mode=='export'"
              class="iconfont"
            >&#xe632;</i>
          </span>
        </div>
        <el-form
          v-if="mode=='export'"
          label-position="right"
          label-width="100px"
        >
          <el-form-item :label="`${$t('importDialog.fileName')}：`">
            <el-input
              :value="tablename"
              readonly
            />
          </el-form-item>
          <el-form-item :label="`${$t('importDialog.exportLocation')}：`">
            <el-input
              v-model="exportProp.location"
              icon="local"
            />
          </el-form-item>
        </el-form>
        <div
          v-if="mode=='import'"
          class="import-panel"
        >
          <div class="el-upload__tip">
            {{ ChineseDictionary.IMPORTTITLE }}
            <a
              @click.stop="downloadTemplate"
            >{{ ChineseDictionary.DOWNTEMPLATE }}</a>
          </div>
          <el-upload
            ref="upload"
            class="upload-panel"
            :action="action"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :data="table"
            :before-upload="handleBefore"
            :on-success="handleSuccess"
            :on-progress="handleProgress"
            :on-error="handleError"
            :auto-upload="false"
            :file-list="importFlies"
          >
            <el-button
              type="primary"
              @click="clearFile"
            >
              {{ ChineseDictionary.SELECTFILE }}
            </el-button>
            <div
              slot="tip"
              class="upload-tip"
            >
              {{ ChineseDictionary.FILEMAX }}{{ fileSize }}
            </div>
          </el-upload>
          <transition name="fade">
            <span
              v-if="loading"
              class="uploadmessage"
            >
              {{$t('importDialog.waitImport')}}
              <img
                src="../../../static/img/loading-progress@2x.gif"
                alt="......"
              >
            </span>
          </transition>
        </div>
      </div>
      <div slot="footer">
        <div class="button-panel">
          <el-button
            v-if="mode=='import'"
            :disabled="loading"
            @click="submitUpload"
          >
            {{ ChineseDictionary.IMPORT }}
          </el-button>
          <el-button v-if="mode=='export'">
            {{ ChineseDictionary.EXPORT }}
          </el-button>
          <el-button @click.stop="closeDialog(false)">
            {{ ChineseDictionary.CANCEL }}
          </el-button>
        </div>
        <div
          v-if="errorMsg.errorList.length>0"
          class="error-content"
        >
          <div class="error-message">
            <div class="left-icon">
              <i class="iconfont">&#xe631;</i>
            </div>
            <div class="right-content">
              <p
                v-if="errorMsg.errorUrl.length > 0"
                class="link"
              >
                <a :href="errorMsg.errorUrl">（{{$t('importDialog.downError')}}）</a>
              </p>
              <div class="content-message">
                <p class="title">
                  {{ errorMsg.message }}
                </p>
                <p v-for="msg in errorMsg.errorList">
                  <span v-if="msg.rowIndex">{{$t('importDialog.dataError',{num:msg.rowIndex})}}:</span>
                  {{ msg.message }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import axios from '../../__utils__/request';
  import ChineseDictionary from '../../assets/js/ChineseDictionary';
  import MyDialog from '../dialog/mydialog.vue';
  import i18n from '../../assets/js/i18n'

  export default {
    name: 'importDialog',
    props: {
      visible: {// 显示
        type: Boolean,
        default: true
      },
      mode: {// 类型, 导入/导出(弃用)
        type: String,
        default: 'import'
      },
      title: {// 标题
        type: String,
        default: ''
      },
      tablename: {// 表名
        type: String,
        default: ''
      },
      mainTable: {// 主表名
        type: String,
        default: ''
      },
      mainId: {// 主表id
        default: -1
      },
      ischangeShop: Boolean, // 换店特定
      isReadjust: Boolean, // 调价明细
      isRebate: Boolean, // 折让明细
      objId2: {}, // 折让明细
      sublistTable: {}, // 折让明细表名
      isMobil: {
        type: Boolean,
        default: false
      }, // 手机号导入
      isCard: {
        type: Boolean,
        default: false
      }, // 会员卡号导入
      appendToBody: {
        type: Boolean,
        default: false
      }, // 是否将弹框放在body
      modalAppendToBody: {
        type: Boolean,
        default: false
      }, // 蒙层是否放在body
    },
    components: {
      MyDialog
    },
    data() {
      return {
        showFlag: true,
        loading: false, // 是否加载
        ChineseDictionary: {},
        fileSize: '', // 文件尺寸
        importFlies: [], // 导入文件列表
        exportProp: {
          location: '', // 导出位置--弃用
        },
        errorMsg: {// 错误信息
          errorUrl: '',
          message: '',
          errorList: []
        },
      };
    },

    beforeCreate() {
      this.$t = i18n.t.bind(i18n)
    },
    
    created() {
      const _self = this;
      _self.ChineseDictionary = ChineseDictionary;
      if (_self.visible) _self.showFlag = true;
      else _self.showFlag = false;
      _self.axiosSetting();
    },
    computed: {
      // 标题
      completeTitle() {
        if (this.mode === 'export') return `${this.title}导出`;
        if (this.mode === 'import') return `${this.title}导入`;
      },
      // 发送上传请求 同时提供的参数
      table() {
        if (this.isMobil) {
          return {
            param: JSON.stringify({})
          }; 
        }
        if (this.isCard) {
          return {
            param: JSON.stringify({})
          }; 
        }
        if (this.tablename == 'OC_B_ASSIGN_ITEM_ACTIVE') {
          return {
            objid: this.isReadjust ? this.objId2 : this.mainId,
          };
        }

        if (this.mainId === -1) {
          return {
            table: this.tablename,
            menu: this.title
          };
        } if (this.isRebate) {
          return {
            table: this.sublistTable, // 折让明细表名
            mainTable: this.mainTable,
            mainId: this.objId2, // 子表id
            menu: this.title
          };
        } 
        return {
          table: this.tablename,
          mainTable: this.mainTable,
          mainId: this.isReadjust ? this.objId2 : this.mainId,
          menu: this.title
        };
      },
      action() {
        // 订单管理导入接口
        if (this.tablename == 'OC_B_ORDER') return '/p/cs/importOcBOrder';
        // 铺货单导入接口
        if (this.tablename == 'OC_B_ASSIGN_ITEM_ACTIVE') return '/p/cs/sg/qbd/v1/importAssignItem';
        // 采购退货单导入接口
        if (this.tablename == 'OC_B_REFUND_PURCHASE_IMP_ITEM') return '/p/cs/oc/v1/ImportPurchaseRefundOrderItem';
        // 销售单导入接口
        if (this.tablename == 'OC_B_SALE_IMP_ITEM') return ' /p/cs/oc/v1/ImportSaleOrderImpItem';
        // 销售退货单导入接口
        if (this.tablename == 'OC_B_REFUND_SALE_IMP_ITEM') return '/p/cs/oc/v1/importRefundSaleOrderImpItem';
        if (this.isMobil || this.isCard) return '/p/cs/vpaccquery';
        if (this.tablename == 'SC_B_INVENTORY_IMP_ITEM') return '/p/cs/sg/v1/importInventoryItem'; // 如果为盘点单,导入走该定制接口
        if (this.tablename == 'SC_B_TRANSFER_IMP_ITEM') return '/p/cs/sg/v1/importSgTransferItem'; // 如果为调拨单,导入走该定制接口
        return this.ischangeShop
          ? '/p/cs/btranplanChangStoreImport'
          : (this.tablename === 'DL_B_TRAN_OUT'
            ? '/p/cs/tranimport' : (this.tablename === 'SC_B_INVENTORY_ITEM' ? '/p/cs/binventoryimport' : '/p/cs/import'));
      }
    },
    methods: {
      // 发送请求, 获取上传参数
      axiosSetting() {
        const _self = this;
        axios({
          url: '/p/cs/settings',
          method: 'post',
          data: {
            configNames: JSON.stringify(['upload.import.max-file-size'])
          }
        }).then((res) => {
          if (res.data.code === 0) _self.fileSize = res.data.data['upload.import.max-file-size'];
          else _self.fileSize = '0M';
        }).catch((error) => {
          if (error.response.status === 403) {
            _self.closeDialog();
          }
          _self.fileSize = '0M';
        });
      },
      // 定制下载模板
      getDownloadTemp(url) {
        axios({
          url,
          method: 'post',
        }).then((res) => {
          if (res.data.code === 0) {
            const url = `http://bj-oms-upload.oss-cn-shanghai.aliyuncs.com/${res.data.data}`;
            return window.location = url;
          }
        });
      },
      // 发送请求, 下载模板
      downloadTemplate() {
        const _self = this;
        // 订单管理获取导入模板
        if (this.tablename == 'OC_B_ORDER') {
          _self.getDownloadTemp('/p/cs/downloadOrderTemp');
          return;
        }
        // 铺货订单获取导入模板
        if (this.tablename == 'OC_B_ASSIGN_ITEM_ACTIVE') {
          return window.location = '/p/cs/download?filename=oss://import/template/定制/铺货单明细导入模板.xlsx';
        }
        // 卡号模板
        if (_self.isCard) {
          return window.location = 'http://fcweb.oss-cn-hangzhou.aliyuncs.com/Import.CustomTemplate/%E5%8D%A1%E5%8F%B7%E5%AF%BC%E5%85%A5.xlsx';
        // 手机号模板
        } if (_self.isMobil) {
          return window.location = 'http://fcweb.oss-cn-hangzhou.aliyuncs.com/Import.CustomTemplate/%E6%89%8B%E6%9C%BA%E5%8F%B7%E5%AF%BC%E5%85%A5.xlsx';
        }
        if (_self.title === '换店') {
          return window.location = 'http://fcweb.oss-cn-hangzhou.aliyuncs.com/DL_B_TRAN_PLAN/计划单-换店明细.xls';
        } if (_self.tablename === 'DL_B_TRAN_OUT') {
          return window.location = 'http://fcweb.oss-cn-hangzhou.aliyuncs.com/DL_B_TRAN_OUT/调拨出库导入模板.xls';
        }
        axios({
          url: '/p/cs/downloadImportTemplate',
          method: 'get',
          params: {
            searchdata: {
              table: _self.tablename
            }
          }
        }).then((res) => {
          if (res.data.code === 0) {
            const url = `/p/cs/download?filename=${res.data.data}`;
            window.location = url;
          }
        });
      },
      // 提交上传文件请求
      submitUpload() {
        if (this.$refs.upload.$refs['upload-inner'].fileList.length === 0) {
          this.$store.commit('customize/errorDialog', { // 弹框报错
            message: this.$t('importDialog.importFile'),
            type: 'warning'
          });
          return;
        }
        if (!this.isMobil && !this.isCard) {
          if (this.mainId == -1) {
            // 如果主表未新增
            this.$emit('objectSave');
            return;
          }
        }
        this.errorMsg.errorList = [];
        this.$refs.upload.submit();
      },
      // 清除用户选择文件列表
      clearFile() {
        this.$refs.upload.clearFiles();
        this.loading = false;
      },
      // 上传文件前判断文件大小
      handleBefore(file) {
        const sizes = ['B', 'K', 'M', 'G', 'T']; let 
          p;
        const unit = this.fileSize.substr(this.fileSize.length - 1);
        const number = this.fileSize.substr(0, this.fileSize.length - 1);
        for (let i = 0; i < sizes.length; i++) {
          if (unit === sizes[i]) {
            p = i;
            break;
          } 
        }
        if (file.size > parseInt(number) * Math.pow(1024, p)) {
          this.$message(`${$t('messages.fileSizeTip')}${this.fileSize}`);
          this.clearFile();
          return false;
        }
        this.loading = true;
      },
      // 上传文件中操作----unused
      handleProgress(event, file, fileList) {
        //        console.log(event);
        if (file.percentage === 100) {

        }
      },
      // 上传成功
      handleSuccess(response, file, fileList) {
        const _self = this;
        this.loading = false;
        if (response.code === 0) {
          //          _self.$message({message: response.message, type: 'success'});
          if (_self.tablename == 'OC_B_ORDER') {
            _self.$message({ message: response.message, type: 'success' });
          } else if (_self.tablename == 'OC_B_ASSIGN_ITEM_ACTIVE') {
            _self.$message({ message: response.message, type: 'success' });
          } else if (this.isMobil || this.isCard) {
            this.$emit('searchImport', response.data);
          } else {
            _self.$store.dispatch('timingCalcAsyncTask', { id: response.data });
          }
          _self.closeDialog();
        } else {
          // 订单管理导入失败返回错误excl
          if (_self.tablename == 'OC_B_ORDER' && response.code === 10001) {
            const url = `http://bj-oms-upload.oss-cn-shanghai.aliyuncs.com/${response.data}`;
            return window.location = url;
          } 
          if (undefined === response.path) _self.errorMsg.errorUrl = '';
          else _self.errorMsg.errorUrl = `/p/cs/download?filename=${response.path}`;
        
          if (_self.tablename == 'OC_B_ASSIGN_ITEM_ACTIVE') {
            _self.errorMsg.message = response.message;
            _self.errorMsg.errorList = [{ rowIndex: 0, message: '' }];
          } else {
            _self.errorMsg.errorList = response.data || [{ rowIndex: 0, message: '' }];
            _self.errorMsg.message = response.message;
          }
          _self.clearFile();
        }
        // 调拨单、采购拓活动、销售单定制刷新
        if (this.tablename == 'SC_B_TRANSFER_IMP_ITEM' || this.tablename == 'OC_B_REFUND_PURCHASE_IMP_ITEM' || this.tablename == 'OC_B_SALE_IMP_ITEM' || this.tablename == 'OC_B_REFUND_SALE_IMP_ITEM') {
          this.$emit('objectAddRefresh', 'SC_B_TRANSFER_IMP_ITEM');
        } else {
          this.$emit('confirmImport', event);
        }
      },
      // 上传失败
      handleError(err, file, fileList) {
        if (err.status === 403) {
          this.$store.commit('customize/beforeSignout');
          this.closeDialog();
        } else {
          if (this.tablename == 'OC_B_ASSIGN_ITEM_ACTIVE') {
            this.$message({ message: response.message, type: 'error' });
          } else {
            this.$store.commit('customize/errorDialog', { // 弹框报错
              message: err
            });
          }
          this.clearFile();
        }
        this.$emit('searchImport');
      },
      closeDialog(option) {
        const _self = this;
        _self.showFlag = option || false;
        _self.$emit('searchClose');
        _self.$emit('update:visible', option);
      },
    },

  };

</script>

<style lang="less" type="text/less">
@font-color: #575757;
@default-border-color: #d8d8d8;
@default-border: solid 1px @default-border-color;
.ff-file-dialog-box {
  .el-progress {
    display: none;
  }
  &.none {
    display: none;
  }
  &.import {
    .my-dialog {
      min-height: 210px;
      max-height: 710px;
    }
  }
  .uploadmessage {
    font-size: 12px;
    height: 21px;
    line-height: 21px;
    color: #b8b8b8;
    img {
      margin-left: 4px;
      height: 2px;
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0;
  }
  .my-dialog {
    border-radius: 12px;
    color: @font-color;
    font-size: 12px;
    width: 630px;
    .el-dialog__body {
      /*height: 128px;*/
    }
  }
  .file-content {
    width: 590px;
    .icon-panel {
      margin: 0;
      text-align: center;
      .icon-span {
        display: inline-block;
        height: 28px;
        width: 28px;
        i {
          color: #09a155;
          font-size: 28px;
        }
      }
    }
    .import-panel {
      padding: 0 40px;
      position: relative;
      .el-upload__tip {
        margin-top: 10px;
        font-size: 12px;
        color: @font-color;
        a {
          color: #0f8ee9;
          text-decoration: none;
          cursor: pointer;
        }
      }
      .upload-panel {
        height: 50px;
        margin-top: 10px;
        .upload-tip {
          font-size: 12px;
          display: inline-block;
          margin-left: 4px;
          color: #b8b8b8;
        }
        .el-upload-list {
          height: 21px;
        }
        .el-button--primary {
          background-color: #fd6442;
          border-color: #fd6442;
          border-radius: 2px;
          color: #ffffff;
          height: 24px;
          font-size: 12px;
          padding: 0;
          width: 66px;
          &:hover {
            background-color: #e6502f;
            color: #f3cec5;
          }
        }
        .el-upload-list {
          .el-upload-list__item {
            font-size: 12px;
            margin-top: 4px;
            &:first-child {
              font-size: 12px;
              margin-top: 4px;
            }
            .el-upload-list__item-name [class^="el-icon"] {
              margin-right: 4px;
            }
            .el-upload-list__item-status-label {
              display: none;
            }
            .el-icon-close {
              display: none;
            }
            .el-icon-document {
              font-family: "iconfont" !important;
              &:before {
                content: "\e63b";
                color: @font-color;
              }
            }
          }
        }
      }
    }
    .el-form-item {
      margin-bottom: 10px;
      .el-form-item__label {
        font-size: 12px;
        height: 24px;
        line-height: 24px;
        padding: 0;
      }
    }
    .el-form-item__content {
      line-height: 24px;
      font-size: 12px;
      .el-input {
        font-size: 12px;
        .el-input__inner {
          border-radius: 2px;
          border: @default-border;
          height: 24px;
          padding: 0 0 0 6px;
          width: 240px;
        }
      }
    }
  }
  .el-dialog__footer {
    .button-panel {
      margin: 10px 40px;
      .el-button {
        border: solid 1px #fd6442;
        border-radius: 2px;
        color: #fd6442;
        height: 24px;
        font-size: 12px;
        width: 66px;
        padding: 0;
        &:hover {
          opacity: 0.6;
        }
      }
    }

    .error-content {
      border-top: solid 1px #bcbcbc;
      text-align: left;
      position: relative;
      .error-message {
        height: auto;
        margin: 10px 40px;
        max-height: 240px;
        position: relative;
        width: 550px;
        .left-icon {
          height: 28px;
          width: 28px;
          position: absolute;
          left: 0;
          top: 0;
          i {
            font-size: 28px;
            color: #e80000;
          }
        }
        .right-content {
          position: relative;
          margin-left: 38px;
          .link {
            line-height: 16px;
            a {
              color: #0f8ee9;
              cursor: pointer;
              display: inline-block;
              padding-top: 6px;
              text-decoration: none;
            }
          }
          .content-message {
            max-height: 220px;
            min-height: 28px;
            overflow: auto;
            p {
              word-break: break-word;
              line-height: 16px;
              margin: 6px 0;
            }
          }
        }
      }
    }
  }
}
</style>
