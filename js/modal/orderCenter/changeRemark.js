import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable.vue';
import listeningToKeydownMixin from '@/assets/js/mixins/listeningToKeydown.js';

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
      spinShow: false,
      vmI18n: window.vmI18n,
      // 提示
      confirmModal: false,
      formItem: {
        cover: 0,
        flag: 1,
        textarea: '',
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: window.vmI18n.t('common.cancel'), // 取消
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定
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
  },
  methods: {
    onKeydownModal(event) {
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
          self.btnConfig.buttons[1].disabled = true;
          this.spinShow = true;
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
    cancel() {
      this.btnConfig.buttons[1].disabled = false;
      this.spinShow = false;
    },
    // 保存备注
    async saveRemark() {
      const self = this;
      const fromdata = new FormData();
      const param = {
        IDS: self.componentData.ids,
        REMARK: self.formItem.textarea,
        ORDER_FLAG: self.formItem.flag,
        SELLER_MEMO: self.formItem.cover,
      };
      fromdata.append('param', JSON.stringify(param));
      const { data: { code, message } } = await this.service.orderCenter.remarkUpdate(param);
      if (code === 0) {
        self.btnConfig.buttons[1].disabled = false;
        this.spinShow = false;
        if (self.$route.params.customizedModuleId == 2307) {
          self.$Message.success(message);
          self.$parent.$parent.$parent.query();
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.selection = [];
        } else {
          self.$Message.success(message);
          self.$parent.$parent.$parent.load();
          self.$parent.$parent.closeConfirm();
        }
      } else {
        self.btnConfig.buttons[1].disabled = false;
        this.spinShow = false;
      }
    },
  },
};
