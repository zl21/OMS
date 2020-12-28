import axios from 'axios';
import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable.vue';
import { listeningToKeydownMixin } from '@/assets/js/mixins/listeningToKeydown.js';

export default {
  mixins: [listeningToKeydownMixin],
  components: {
    businessButton,
    businessActionTable,
  },
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  computed: {},
  data() {
    return {
      vmI18n: window.vmI18n,
      // 提示
      confirmModal: false,
      formItem: {
        cover: 'false',
        flag: '1',
        textarea: '',
      },
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
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine();
            }, // 按钮点击事件
          }
        ],
      },
    };
  },
  mounted() {
    if (this.componentData.ORDER_FLAG) {
      this.formItem.flag = this.componentData.ORDER_FLAG;
    }
    // ORDER_FLAG
  },
  methods: {
    onKeydownModal() {
      if (event.keyCode == 13 && this.btnConfig.buttons[0].disabled == false) {
        this.saveRemark();
      }
    },
    onKeyDown(e) {
      if (e.keyCode == 27) {
        console.log(this.confirmModal);
        if (!this.confirmModal) {
          this.$parent.$parent.closeConfirm();
          this.$parent.$parent.$parent.publicBouncedIndex = {
            name: 'testModal',
          };
        } else {
          this.confirmModal = false;
        }
      }
      if (e.keyCode == 13 && this.btnConfig.buttons[0].disabled == false) {
        this.determine();
      }
    },
    determine() {
      const self = this;
      if (typeof self.componentData.status === 'object') {
        if (
          self.componentData.status.includes(2)
          || self.componentData.status.includes(1)
        ) {
          self.confirmModal = true;
        } else {
          self.saveRemark();
        }
      } else if (
        self.componentData.status === '1'
        || self.componentData.status === '2'
      ) {
        self.confirmModal = true;
      } else {
        self.saveRemark();
      }
    },
    inputChange() {
      this.btnConfig.buttons[0].disabled = false;
    },
    // radio change事件
    coverRadioChange() {
      this.btnConfig.buttons[0].disabled = false;
    },
    // radio change事件
    radioChange() {
      this.btnConfig.buttons[0].disabled = false;
    },
    // 确定事件
    ok() {
      this.saveRemark();
    },
    // 保存备注
    saveRemark() {
      const self = this;
      const data = typeof self.componentData.ids === 'number'
        ? self.componentData.ids
        : self.componentData.ids.join(',');
      const fromdata = new FormData();
      const param = {
        ids: data,
        remark: self.formItem.textarea,
        order_flag: self.formItem.flag,
        cover: self.formItem.cover,
      };
      fromdata.append('param', JSON.stringify(param));
      axios({
        url: '/api/cs/oc/oms/v1/remarkUpdate', // 接口调整,切换服务地址
        method: 'post',
        // cancelToken: true,
        data: param,
      }).then((res) => {
        if (res.data.code === 0) {
          if (self.$route.params.customizedModuleId == 2627) {
            self.$Message.success(res.data.message);
            self.$parent.$parent.$parent.getData();
            self.$parent.$parent.closeConfirm();
            self.$parent.$parent.$parent.selection = [];
          } else {
            self.$Message.success(res.data.message);
            self.$parent.$parent.$parent.load();
            self.$parent.$parent.closeConfirm();
          }
        } else {
          self.$Message.error(res.data.message);
        }
      });
    },
  },
};
