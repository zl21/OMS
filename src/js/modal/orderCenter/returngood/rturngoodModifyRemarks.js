// import axios from 'axios';

export default {
  data() {
    return {
      bouncedData: {
        animal: '覆盖原备注',
        value: ''
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $it('com.cancel'), // 取消
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: 'primary', // 按钮类型
            text: $it('com.determine'), // 确定
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.okClick();
            } // 按钮点击事件
          }
        ]
      },
      ruleValidate: {
        value: [
          { required: true, message: ' ', trigger: 'blur' },
          { type: 'string', min: 1, message: '', trigger: 'blur' }
        ],
      }
    };
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    initData() {
      this.bouncedData.value = '';
    },
    async okClick() {
      const self = this;
      if (this.bouncedData.value.length > 200) {
        self.$Message.error("最大只能输入200个字符！");
        return
      }
      if (!this.bouncedData.value.length) {
        self.$Message.error("备注内容不能为空！");
        return
      }
      let cover = self.bouncedData.animal === '覆盖原备注' ? 'true' : 'false';
      // let fromdata = new FormData();
      let param = {};
      // let url = '';
      let res;
      if (self.componentData.type == 1) {
        param = {
          ids: self.componentData.ids,
          remark: self.bouncedData.value,
          cover
        };
        // url = '/api/cs/oc/oms/v1/reRemarkUpdate';
        res = await this.service.orderCenter.reRemarkUpdate(param);
      } else if (self.componentData.type == 2) {
        param = {
          IDS: self.componentData.ids,
          BACK_MESSAGE: self.bouncedData.value,
          COVER: cover
        };
        // url = '/api/cs/oc/oms/v1/modifyReturnSellerRemark';
        res = await this.service.orderCenter.modifyReturnSellerRemark(param);
      }
      if (res.data.code === 0) {
        self.$Message.success(res.data.message);
        console.log(self);
        // self.$parent.$parent.$parent.query();
        self.$parent.$parent.$parent.getList(self.componentData.status);
        self.$parent.$parent.closeConfirm();
      } else {
        self.$Message.error(res.data.message);
      }
    }
  },
  mounted() {
    const _this = this;
    window.addEventListener('keydown', e => {
      const key = e.keyCode;
      if (key == 13) {
        if (_this.bouncedData.value) {
          _this.okClick();
        }
      } else if (key == 27) {
        _this.$parent.$parent.closeConfirm();
      }
    });
  },
  destroyed() {
    this.initData();
    window.removeEventListener('keydown', this, false);
  }
};
