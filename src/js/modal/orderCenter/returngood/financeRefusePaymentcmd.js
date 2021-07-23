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
      reasonType: '1',
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
      // if (!this.reason) return this.$Message.warning('拒绝打款原因不能为空!');
      this.service.orderCenter.refuseToPayOcBReturnAfSend({ ids: this.idArray, reason: this.reason }).then(res=>{
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
