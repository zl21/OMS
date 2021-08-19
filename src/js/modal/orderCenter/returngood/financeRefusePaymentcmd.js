import businessButton from 'professionalComponents/businessButton';

export default {
  components: {
    businessButton
  },
  props: {
    idArray: {
      type: Array
    }
  },
  data() {
    return {
      reason: '',
      reasonType: '2',
      ruleValidate: {
        reason: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
      },
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
          type: '', // 按钮类型
          text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
          icon: '', // 按钮图标
          size: 'small', // 按钮大小
          disabled: false, // 按钮禁用控制
          btnclick: () => {
            this.$emit('closeActionDialog');
          }, // 按钮点击事件
        },
          {
            type: '', // 按钮类型
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
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
  methods: {
    determine() {
      if (!this.reason) {
        if (this.reasonType == 2) {
          return this.$Message.warning('支付宝流水号不能为空!');
        } else {
          return this.$Message.warning('打款失败/拒绝打款原因（财务备注说明）不能为空!');
        }
      }
      // 2 打款成功 3 打款失败
      this.service.orderCenter.refuseToPayOcBReturnAfSend({ ids: this.idArray, reason: this.reason, paymentStatus: this.reasonType }).then(res=>{
        console.log(res);
        if (res.data.data.code == 0) {
          this.$Message.success(res.data.data.message);
          this.$emit('closeActionDialog');
        } else {
          this.$Modal.confirm({
            title: res.data.data.message,
            render: (h) => h('Table', {
              props: {
                columns: [
                  {
                    title: 'id',
                    key: 'objid'
                  },
                  {
                    title: '报错信息',
                    key: 'message'
                  }
                ],
                data: res.data.data.data
              }
            })
          });
          this.$emit('closeActionDialog');
        }
      });
    },
    reasonTypeChage() {
      this.reason = ''
    }
  }
};
