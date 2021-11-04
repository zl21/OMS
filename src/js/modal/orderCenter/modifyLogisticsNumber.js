import businessButton from 'burgeonComponents/businessButton';

export default {
  name: 'ModifyLogisticsNumber',
  components: {
    businessButton
  },
  data() {
    return {
      vmI18n:$i18n,
      sticsNumber: '',
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
          type: '', // 按钮类型
          text: $i18n.t('common.cancel'), // 取消
          icon: '', // 按钮图标
          size: 'small', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.$emit('closeActionDialog');
          }, // 按钮点击事件
        },
          {
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定
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
      if (self.sticsNumber) {
        const obj = {};
        obj.ids = self.idArray;
        obj.logisticNumber = self.sticsNumber;
        const formdata = new FormData();
        formdata.append('param', JSON.stringify(obj));
        self.service.orderCenter.updateLogisticsBeforePacking(formdata).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            self.$Message.success(res.data.message);
            self.$emit('closeActionDialog');
          } else {
            self.$Message.error(res.data.message);
          }
        });
      } else {
        self.$Message.warning($i18n.t('modalTips.ek')); // '请输入物流单号!'
      }
    }
  }
};
