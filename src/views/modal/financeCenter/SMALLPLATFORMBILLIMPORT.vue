<template>
  <div class="smallPlatTmport"
       v-loading="loading">
    <div class="i_body">
      <re-form :form-config="formConfig"
               class="formBox" />
      <div class="linkBox">
        <a @click="downloadUrlFile">下载模板</a>
        <!-- <a @click="upLoad">上传文件</a> -->
        <div class="upload">
          <label class="ui_button"
                 for="xFile">{{ text ? '更新文件' : '上传文件' }}</label>
          <form>
            <input id="xFile"
                   type="file"
                   style="position: absolute; clip: rect(0 0 0 0)"
                   accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                   @change="handleFiles($event)" />
          </form>
          <p class="xlsx"
             v-if="!isError">
            <Icon v-if="text"
                  class="icon"
                  type="ios-document-outline" />
            <span>{{ text ? text : '未选择任何文件' }}</span>
          </p>
          <div v-if="isError"
               class="error-message xlsx">
            <Icon type="md-information-circle"
                  size="24"
                  style="color: red" />
            <span v-html="errorMessage"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="i_food">
      <businessButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import reForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';
import Import from '@/views/modal/publicDialog/importTable.vue'
import date from '@/assets/js/__utils__/date';

export default {
  components: {
    Import,
    reForm,
    businessButton
  },
  props: {
    objList: {
      type: Array
    },
    idArray: {
      type: Array
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    selectRowData: {
      type: Array
    }
  },
  data() {
    return {
      text: '',
      pageName: this.$route.params.tableName,
      vmI18n: window.vmI18n,
      files: {}, // 选择的文件
      loading: false,
      isError: false, // 是否导入失败
      errorMessage: '', // 导入失败原因
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            btnclick: () => {
              this.$parent.cancel();
              this.$forceUpdate();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            btnclick: () => {
              this.confirm();
            }
          }
        ]
      },
      formConfig: {
        ruleValidate: {
          CP_C_PLATFORM_ENAME: [{ required: true, message: ' ', trigger: 'blur' }],
          START_TIME: [{ required: true }],
          END_TIME: [{ required: true }],
          IMPORT_TYPE: [{ required: true }],
          BILL_TYPE: [{ required: true }],
        },
        formValue: {
          BILL_IMPORT_NO: '自动生成（XPTZDDR—年+月+日+0001）',
          GENERATE_TIME: '自动生成',
          CP_C_SHOP_ID: '',
          CP_C_PLATFORM_ENAME: '',
          START_TIME: '',
          END_TIME: '',
          IMPORT_TYPE: '',
          BILL_TYPE: '',
        },
        formData: [
          {
            style: 'input',
            label: '平台订单导入编码',
            value: 'BILL_IMPORT_NO',
            width: '12',
            disabled: true,
            inputenter: () => { },
            iconclick: () => { }
          },
          {
            style: 'input',
            label: '创建时间',
            value: 'GENERATE_TIME',
            width: '12',
            disabled: true,
            inputenter: () => { },
            iconclick: () => { }
          },
          {
            style: 'popInputPlus', // 输入框弹框单多选
            width: '12',
            isActive: true,
            isdisabled: false,
            /* inputList: [
              {
                childs: [{ colname: 'CP_C_SHOP_ID', refobjid: 4, valuedata: 2 }]
              }
            ], */
            itemdata: {
              isBackRowItem: true,
              colid: 1700826095,
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              /* refcolval: {
                fixcolumn: 'CP_C_PLATFORM_ID',
                expre: 'equal',
                srccol: 'CP_C_SHOP_ID'
              }, */
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              inputname: 'CP_C_SHOP_ID', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              name: '所属店铺', // 店铺 input前面显示的lable值
              readonly: false, // 是否可编辑，对应input   readonly属性
              valuedata: '' // 这个是选择的值
            },
            oneObj: (obj) => {
              console.log(obj);
              if (Object.keys(obj).length) {
                this.formConfig.formValue.CP_C_SHOP_ID = obj.ID
                const { ECODE, CP_C_PLATFORM_ENAME } = obj.rowItem
                this.formConfig.formValue.shop_ecode = typeof ECODE == 'string' ? ECODE : ECODE.val
                CP_C_PLATFORM_ENAME && this.formConfig.formValue.CP_C_PLATFORM_ENAME = CP_C_PLATFORM_ENAME.val
              } else {
                this.formConfig.formValue.CP_C_PLATFORM_ENAME = ''
              }
            }
          },
          {
            style: 'input',
            label: '所属平台',
            value: 'CP_C_PLATFORM_ENAME',
            width: '12',
            disabled: true,
            inputenter: () => { },
            iconclick: () => { }
          },
          {
            style: 'date',
            type: 'datetime', // 日期组件类型,默认为data  (daterange)为双日期区间选择
            value: 'START_TIME',
            label: '账单起始日期',
            width: '12',
            format: 'yyyy-MM-dd HH:mm:ss',
            placeholder: ''
          },
          {
            style: 'date',
            type: 'datetime',
            value: 'END_TIME',
            label: '账单截止日期',
            width: '12',
            format: 'yyyy-MM-dd HH:mm:ss',
            placeholder: ''
          },
          {
            style: 'select',
            label: '导入类型',
            width: '12',
            value: 'IMPORT_TYPE',
            setRequired: 'required',
            options: [
              {
                value: '1',
                label: '正常账单导入',
              },
              {
                value: '2',
                label: '异常订单导入',
              },
            ],
          },
          {
            style: 'select',
            label: '账单类型',
            width: '12',
            value: 'BILL_TYPE',
            setRequired: 'required',
            options: [
              {
                value: '1',
                label: '整单',
              },
              {
                value: '2',
                label: '明细',
              },
            ],
          },
        ],
      },
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleFiles(e) {
      // 选择文件
      console.log(e.path);
      this.isError = false;
      if (e.path[0].files[0].name) {
        this.text = e.path[0].files[0].name;
        this.files = e.path[0].files[0];
      }
    },
    downloadUrlFile() {
      let src = 'https://semir-r3-upload-prod.oss-cn-zhangjiakou.aliyuncs.com/OSS-Bucket/IMPORT/%E9%80%9A%E7%94%A8%E5%B9%B3%E5%8F%B0%E5%8E%9F%E5%A7%8B%E8%B4%A6%E5%8D%95%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xls'

      const download_file = {};
      if (typeof download_file.iframe === 'undefined') {
        const iframe = document.createElement('iframe');
        download_file.iframe = iframe;
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = 'none';
    },
    // downloadUrlFile(url) {
    //   // 下载模板
    //   const self = this;
    //   const domFrame = window.parent.document.getElementById('downLoadListFrame');
    //   if (domFrame != null) {
    //     window.parent.document.body.removeChild(domFrame);
    //   }
    //   const downloadFile = {};
    //   if (typeof downloadFile.iframe === 'undefined') {
    //     const iframe = document.createElement('iframe');
    //     iframe.setAttribute('id', 'downLoadListFrame');
    //     self.addEvent('load', iframe, () => {
    //       self.iframeLoad(iframe);
    //     });
    //     iframe.src = url;
    //     iframe.style.display = 'none';
    //     downloadFile.iframe = iframe;
    //     document.body.appendChild(downloadFile.iframe);
    //     setTimeout(() => {
    //       iframe.src = '';
    //     }, 1000);
    //   }
    // },
    // iframeLoad(iframe) {
    //   // 判断iframe的src
    //   const src = iframe.src ? iframe.src : iframe.contentWindow.locatiion.href;
    //   console.log('src::', src);
    // },
    upLoad() {
      this.showImport = true
    },
    confirm() {
      const _this = this;

      this.importSmallPlat()
    },
    importSmallPlat() {
      const _this = this;
      _this.loading = true;
      const param = new FormData();
      console.log('fv::', this.formConfig.formValue);
      const data = JSON.parse(JSON.stringify(this.formConfig.formValue))
      if (!data.CP_C_SHOP_ID) {
        _this.loading = false;
        return _this.$Message.error('请选择所属店铺！');
      } else if (!data.START_TIME) {
        _this.loading = false;
        return _this.$Message.error('请选择账单起始日期！');
      } else if (!data.END_TIME) {
        _this.loading = false;
        return _this.$Message.error('请选择账单截止日期！');
      } else if (!data.IMPORT_TYPE) {
        _this.loading = false;
        return _this.$Message.error('请选择导入类型！');
      } else if (!data.BILL_TYPE) {
        _this.loading = false;
        return _this.$Message.error('请选择账单类型！');
      } else if (!_this.text) {
        _this.loading = false;
        return _this.$Message.error('请选择需要导入的文件！');
      }
      data.START_TIME = `${date.getFormatDate(new Date(data.START_TIME), 'yyyy-MM-dd HH:mm:ss')}`
      data.END_TIME = `${date.getFormatDate(new Date(data.END_TIME), 'yyyy-MM-dd HH:mm:ss')}`
      // data.END_TIME = `${date.getFormatDate(new Date(data.END_TIME[0]), 'yyyy-MM-dd HH:mm:ss')}~${date.getFormatDate(new Date(data.END_TIME[1]), 'yyyy-MM-dd HH:mm:ss')}`
      param.append('data', JSON.stringify(data));
      param.append('table', this.pageName);
      param.append('tableName', this.pageName);
      param.append('file', _this.files, _this.text);
      axios({
        url: '/p/cs/ac/v1/import/smallPlatform/bill',
        method: 'post',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: param
      })
        .then(res => {
          if (res.data.code === 0) {
            // 导入成功
            _this.$Message.success(res.data.message || this.vmI18n.t('modalTips.ze'));
            _this.$parent.close();
            _this.$parent.$parent.$parent.getQueryList();
          } else if (res.data.code === -1 && !res.data.data) {
            // 导入失败
            const err = res.data.message
            //  || this.vmI18n.t('modalTips.zd');
            if (!err.includes('文件')) {
              return
            }
            _this.isError = true;
            _this.errorMessage = err;
            // 清空已上传文件
            const xFile = document.getElementById('xFile');
            xFile.value = '';
            this.text = '';
            this.files = {};
            this.file = {};
          } else if (res.data.data) {
            _this.loading = false;
            _this.isError = true;
            // 清空已上传文件
            const xFile = document.getElementById('xFile');
            xFile.value = '';
            this.text = '';
            this.files = {};
            this.file = {};
            _this.errorMessage = res.data.message;
            this.downloadUrlFile(res.data.data);
          }
        })
        .finally(() => {
          _this.loading = false;
        });
    },
  },
};

</script>

<style lang="less" scoped>
.smallPlatTmport {
  width: 900px;
  .formBox {
    border: 1px solid #a5a5a5;
    padding: 16px 10px 16px 0;

    /deep/.ark-form-item.popInput {
      .ark-fkrp-select div {
        &:first-child {
          height: 32px;
        }
        &.ark-fkrp-select-icon {
          right: 10px;
          top: 0;
        }
        .ark-icon-ios-close-circle {
          margin-right: 28px;
        }
      }
    }
  }
  .linkBox {
    border: 1px solid #a5a5a5;
    padding: 20px;
    border-top: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
    a {
      text-decoration-line: underline;
      letter-spacing: 1px;
    }
    .upload {
      line-height: 50px;
      form {
        display: inline-block;
      }
      .xlsx {
        display: inline-block;
        .icon,
        .icon + span {
          color: #2d8cf0;
        }
      }
      .ui_button {
        color: #fd6442;
        border: 1px solid #dcdee2;
        padding: 2px 8px;
        border-radius: 3px;
        &:hover {
          opacity: 0.6;
        }
      }
    }
  }
  .i_body {
    margin-top: 9px;
  }
  .i_food {
    padding-top: 11px;
  }
}
</style>
