import businessButton from 'professionalComponents/businessButton';

export default {
  name: 'ModifyWms',
  components: {
    businessButton
  },
  data() {
    return {
      send_wms_pick: '',
      vmI18n: window.vmI18n,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
          type: '', // 按钮类型
          text: window.vmI18n.t('common.cancel'), // 取消
          icon: '', // 按钮图标
          size: 'small', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.$emit('closeActionDialog');
          }, // 按钮点击事件
        },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
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
  props: {
    idArray: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    determine() {
      const self = this;
      if (self.send_wms_pick) {
        const obj = {};
        obj.ids = self.idArray;
        obj.send_wms_pick = self.send_wms_pick;
        const formdata = new FormData();
        formdata.append('param', JSON.stringify(obj));
        self.service.orderCenter.sendWmsPick(formdata).then(res=>{
          console.log(res);
          if (res.data.data.code == 0) {
            self.$Message.success(res.data.data.message);
            self.$emit('closeActionDialog');
          } else {
            self.$Message.error(res.data.data.message);
          }
        });
      } else {
        self.$Message.warning(window.vmI18n.t('modalTips.el')); // '请输入传WMS拣货单字段!'
      }
    }
  }
};
