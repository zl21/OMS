// const _import = (file , basePathName) => basePathName === 'views' ? require(`projectLogic/${basePathName}/${file}.vue`).default : require(`@burgeon/${basePathName}/${file}.vue`).default;
const _import = (file , basePathName) => require(`@burgeon/${basePathName}/${file}.vue`).default;
import i18n from "@burgeon/internationalization/i18n";
window.$i18n = i18n

export default {
  name: "businessDialog",
  props: {
    // 是否去掉页面缓存
    keepAlive: {
      type: Boolean,
      default: () => true
    },
    title: {
      type: String,
      // default: () => "标题"
      default: () => $i18n.t('modalTitle.title')
    }, // 设置标题title
    titleAlign: {
      type: String,
      default: () => "center"
    }, // 设置标题是否居中 // center left
    width: {
      type: [Number, String]
      // default: () => ''
    }, // 配置弹框宽度
    scrollable: {
      type: Boolean,
      default: () => false
    }, //是否可以滚动
    closable: {
      type: Boolean,
      default: () => true
    }, //是否可以按esc关闭
    draggable: {
      type: Boolean,
      default: () => true
    }, //是否可以拖动
    mask: {
      type: Boolean,
      default: () => true
    }, //是否显示遮罩层
    maskClosable: {
      type: Boolean,
      default: () => true
    }, //是否可以点击叉号关闭
    transfer: {
      type: Boolean,
      default: () => true
    }, //是否将弹层放在body内
    name: {
      type: String,
      default: () => " "
    }, //组件名称
    url: {
      type: String,
      default: () => " "
    }, //组件路由
    componentData: {
      type: Object,
      default: () => {}
    }, //数据填充
    footerHide: {
      type: Boolean,
      default: () => true
    }, //是否显示底部
    okText: {
      type: String,
      // default: () => "确定"
      default: () => $i18n.t('common.determine')
    },
    cancelText: {
      type: String,
      // default: () => "取消"
      default: () => $i18n.t('common.cancel')
    },
    confirm: {
      type: Function
    }, //确定事件
    quit: {
      type: Function
    }, //取消事件
    visible: {
      type: Boolean,
      default: false
    }, // 显示隐藏（使用时请使用sync修饰符，如：visible.sync）
    basePathName: {
      type: String,
      default: 'views'
    }
  },
  data() {
    return {
      vmI18n: i18n,
      modal: this.$props.visible,
      currentView: "",
      commonObj: {},
      showModal: this.$props.visible,
    };
  },
  computed: {
    currentViewData() {
      const _self = this;
      let componentName = _self.name;
      Vue.component(componentName, Vue.extend(_import(_self.url , _self.basePathName)));
      return componentName;
    }
  },
  watch: {
    visible(newValue) {
      this.showModal = newValue
      this.modal = newValue
    },
    modal(newValue) {
      this.$emit('update:visible', newValue)
      this.showModal = newValue
    }
  },
  methods: {
    returnData(data){
      if(this.componentData.returnData&&typeof this.componentData.returnData==="function"){
        this.componentData.returnData(data)
      }
    },
    // 打开弹框
    openConfirm() {
      this.showModal = true;
      this.modal = true;
    },
    //关闭弹框
    closeConfirm() {
      setTimeout(() => {
        this.modal = false;
        this.showModal = false;
      });
    },
    //确定
    onOk() {
      if (typeof this.confirm === "function") {
        this.confirm();
      }
    },
    // 取消
    onCancel() {
      if (typeof this.quit === "function") {
        this.quit();
      } else {
        this.closeConfirm();
      }
    }
  }
};
