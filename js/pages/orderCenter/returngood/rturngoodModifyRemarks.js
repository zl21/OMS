// import axios from 'axios';
import jordanBtn from 'professionalComponents/businessButton';

export default {
  components: {
    jordanBtn
  },
  data() {
    return {
      vmI18n: $i18n,
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
            text: '取消', // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: '确定', // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.okClick();
            } // 按钮点击事件
          }
        ]
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
      let ids = self.componentData.ids.map(em => {
        return em.ID
      })

      let param = {
        ids,
        cover: this.bouncedData.animal == "覆盖原备注" ? true : false,//true:覆盖 false 追加
        remark: this.bouncedData.value, //备注
      }

      const res = await this.service.orderCenter.updateReturnOrderRemark(param)
      if (res.data.code === 0) {
        self.$Message.success(res.data.message);
        //query
        self.$parent.$parent.$parent.query();
        self.$parent.$parent.closeConfirm();
      } else {
        self.$Message.error(res.data.message);
      }

      // if (!self.bouncedData.value) return;
      // let cover = '';
      // if (self.bouncedData.animal === $i18n.t("other.override_original_remarks")) { // '覆盖原备注'
      //   cover = 'true';
      // } else {
      //   cover = 'false';
      // }
      // // let fromdata = new FormData();
      // let param = {};
      // // let url = '';
      // let res;
      // if (self.componentData.type == 1) {
      //   param = {
      //     ids: self.componentData.ids,
      //     remark: self.bouncedData.value,
      //     cover
      //   };
      //   // url = '/api/cs/oc/oms/v1/reRemarkUpdate';
      //   res = await this.service.orderCenter.remarkUpdate(param);
      // } else if (self.componentData.type == 2) {
      //   param = {
      //     IDS: self.componentData.ids,
      //     BACK_MESSAGE: self.bouncedData.value,
      //     COVER: cover
      //   };
      //   // url = '/api/cs/oc/oms/v1/modifyReturnSellerRemark';
      //   res = await this.service.orderCenter.modifyReturnSellerRemark(param);
      // }
      // if (res.data.code === 0) {
      //   self.$Message.success(res.data.message);
      //   console.log(self);
      //   self.$parent.$parent.$parent.getList(self.componentData.status);
      //   self.$parent.$parent.closeConfirm();
      // } else {
      //   self.$Message.error(res.data.message);
      // }
      // fromdata.append("param", JSON.stringify(param));

      // axios({
      //   url,
      //   method: 'post',
      //   data: param
      // }).then(res => {
      //   if (res.data.code === 0) {
      //     self.$Message.success(res.data.message);
      //     console.log(self);
      //     self.$parent.$parent.$parent.getList(self.componentData.status);
      //     self.$parent.$parent.closeConfirm();
      //   } else {
      //     self.$Message.error(res.data.message);
      //   }
      // });
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
