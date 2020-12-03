import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';

const formConfig = file => require(`./config/${file}.js`).default;
export default {
  components: {
    businessForm,
    businessButton
  },
  props: {
    objList: {
      type: Array,
      defalut: () => []
    },
    idArray: {
      type: Array,
      defalut: () => []
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    selectRowData: {
      type: Array,
      defalut: () => []
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      downLoadModal: false,
      taskId: '',
      downLoadBtnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('btn.download'), // 下载 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              formConfig(this.$route.params.tableName).determine(this);
              // formConfig('IP_B_TAOBAO_ORDER').determine(this)
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            icon: '', // 按钮图标
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            } // 按钮点击事件
          }
        ]
      },
      downLoadFormConfig: {}
    };
  },
  mounted() {
    const self = this;
    this.downLoadFormConfig = formConfig(this.$route.params.tableName).formConfig;
    // self.downLoadFormConfig = formConfig('IP_B_CANCEL_TIME_ORDER_VIP').formConfig

    if (this.$route.params.tableName == 'IP_B_JITX_DELIVERY') {
      // console.log('self.downLoadFormConfig.formValue', self.downLoadFormConfig);
      self.downLoadFormConfig.formValue.order_status = 'NEW';
    }
  },
  methods: {
    standardTimeConversiondateToStr(val) {
      const dateTime = new Date(val);
      if (!(dateTime instanceof Date)) {
        return '';
      }
      const year = dateTime.getFullYear();
      let month = dateTime.getMonth() + 1; // js从0开始取
      let date = dateTime.getDate();
      let hour = dateTime.getHours();
      let minutes = dateTime.getMinutes();
      let second = dateTime.getSeconds();
      if (month < 10) {
        month = `0${month}`;
      }
      if (date < 10) {
        date = `0${date}`;
      }
      if (hour < 10) {
        hour = `0${hour}`;
      }
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (second < 10) {
        second = `0${second}`;
      }
      return (
        `${year
        }-${
          month
        }-${
          date
        } ${
          hour
        }:${
          minutes
        }:${
          second}`
      );
    },
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
        label: this.vmI18n.t('common.interface_download_taskTable_edit'), // 接口下载任务表编辑 tab中文名
        query: {
          id: this.taskId,
          pid: '24775',
          ptitle: this.vmI18n.t('common.interface_download_taskTable'), // 接口下载任务表
          ptype: 'table',
          tabTitle: this.vmI18n.t('common.interface_download_taskTable_edit'), // 接口下载任务表编辑
          tableName: 'IP_T_CONSUMER_LOG'
        }
      });
    },
  }
};
