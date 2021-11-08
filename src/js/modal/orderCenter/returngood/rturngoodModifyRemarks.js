// import axios from 'axios';
import { OmsButton } from 'burgeonComponents';

export default {
  components: {
    OmsButton
  },
  data() {
    return {
      vmI18n: $i18n,
      bouncedData: {
        animal: '追加到原备注',
        value: '',
        password:''
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消 按钮文本
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
            text: $i18n.t('common.determine'), // 确定 按钮文本
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
      if(!this.bouncedData.value.length){
        self.$Message.error("备注内容不能为空！");
        return
      }

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
