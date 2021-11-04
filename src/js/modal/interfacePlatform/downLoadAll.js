import businessForm from 'burgeonComponents/businessForm.vue';
import businessButton from 'burgeonComponents/businessButton.vue';
import businessDialog from 'burgeonComponents/businessDialog.vue';

import CustomConfig from '@/config/customized.config.js';
const modalConfig = CustomConfig.cusDownLoadAllConfig;

// const formConfig = (file) => require(`./config/${file}.js`).default;

export default {
  components: {
    businessDialog,
    businessForm,
    businessButton,
  },
  props: {
    objList: {
      type: Array,
      defalut: () => [],
    },
    idArray: {
      type: Array,
      defalut: () => [],
    },
    webid: {
      type: Number,
    },
    tablename: {
      type: String,
    },
    selectRowData: {
      type: Array,
      defalut: () => [],
    },
  },
  data() {
    return {
      vmI18n:$i18n,
      spinShow: false, // loading动画
      downLoadModal: false,
      taskId: '',
      tableName: this.$route.params.tableName ? this.$route.params.tableName : 'CantNotFind_tableName',
      downLoadBtnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
              modalConfig[this.tableName].cancel(this);
            }, // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('btn.download'), // 下载 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              modalConfig[this.tableName].determine(this);
            }, // 按钮点击事件
          },
        ],
      },
      downLoadFormConfig: {},
      dialogConfig: {
        title: $i18n.t('btn.import'),
        componentData: {
          tableName: 'IP_C_STANDPLAT_PRO',
          returnData(data) {
            this.downLoadFormConfig.formValue.sp_ids = data;
          }
        },
        name: 'importTable',
        basePathName: 'business-components',
        url: 'importTable',
        width: 600
      }
    };
  },
  computed: {
    modalTitle() {
      let title = modalConfig[this.tableName].modalTitle ? modalConfig[this.tableName].modalTitle : $i18n.t('modalTitle.orderDownload');
      return title;
    },
  },
  mounted() {
    const self = this;
    this.downLoadFormConfig = modalConfig[this.tableName].formConfig;
    if (this.$route.params.tableName == 'IP_B_JITX_DELIVERY') {
      self.downLoadFormConfig.formValue.order_status = 'NEW';
    }
  },
  methods: {
    downLoadOk() {
      const self = this;
      self.$emit('confirmImport');
      self.$emit('closeActionDialog');
    },
    downLoadCancel() {
      const self = this;
      self.$emit('confirmImport');
      self.$emit('closeActionDialog');
    },
    taskIDClick() {
      const self = this;
      self.$emit('confirmImport');
      self.$emit('closeActionDialog');
      this.downLoadModal = false;
      this.$store.commit('customize/TabOpen', {
        id: this.taskId,
        type: 'singleView', // 类型action
        name: 'singleView',
        label: $i18n.t('common.interface_download_taskTable_edit'), // 接口下载任务表编辑 tab中文名
        query: {
          id: this.taskId,
          pid: '24775',
          ptitle: $i18n.t('common.interface_download_taskTable'), // 接口下载任务表
          ptype: 'table',
          tabTitle: $i18n.t('common.interface_download_taskTable_edit'), // 接口下载任务表编辑
          tableName: 'IP_T_CONSUMER_LOG',
        },
      });
    },
    // 打开导入弹窗
    importBoxOpen() {
      const _this = this;
      // 导入
      this.dialogConfig = {
        title: $i18n.t('btn.import'),
        componentData: {
          // 导入：key存在则在配置中找(tableName_webname)
          tableName: 'IP_C_STANDPLAT_PRO',
          webname: '',
          returnData(data) {
            this.downLoadFormConfig.formValue.sp_ids = data;
          }
        },
        name: 'importTable',
        basePathName: 'business-components',
        url: 'importTable',
        width: 450
      };
      this.$refs.dialog.openConfirm();
    }
  },
};
