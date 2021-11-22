export default {
  name: 'ScheduleFormDialog',
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  // props: {
  //   dialogConfig: {
  //     type: Array,
  //     default: []
  //   }, // 表单数据
  //   detail: {
  //     type: Object,
  //     default: {}
  //   }, // 明细详情
  //   loading: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    return {
      vmI18n:$i18n,
      // ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      subTableCollapse: [],
      formConfig: {},
      loading: false,
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              // this.$parent.close();
              // this.$emit('clearModify');
              this.$parent.$parent.closeConfirm();
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirmHandel();
            },
          },
        ]
      }
    };
  },
  watch: {
    'componentData.dialogConfig': {
      handler(val) {
        const panelCounts = this.componentData.dialogConfig.length;
        this.subTableCollapse = panelCounts > 1 ? [...new Array(panelCounts).keys()] : [];
      },
      immediate: true
    }
  },
  mounted() {
    this.$emit('initForm'); // 表单初始化渲染
  },
  methods: {
    confirmHandel() {
      console.log(this.componentData.detail.ID);

      if (!this.validate()) return;
      let ID = this.componentData.detail.ID || -1;
      this.getDetail({ ID, ...this.formConfig.formValue });
    },
    // 表单校验
    validate() {
      const self = this;
      let flag = true;
      // 整合表单
      let formData = [];
      let formValue = {};
      let ruleValidate = {};
      this.componentData.dialogConfig.forEach(item => {
        formData = formData.concat(item.formConfig.formData);
        Object.assign(formValue, item.formConfig.formValue);
        Object.assign(ruleValidate, item.formConfig.ruleValidate);
      });
      this.formConfig = { formData, formValue, ruleValidate };

      const objKey = this.formConfig.formData.map(i => i.itemdata && i.itemdata.colname);
      const requiredArr = Object.keys(this.formConfig.ruleValidate).map(i => {
        if (this.formConfig.ruleValidate[i][0].required) return i;
      });
      const drpArr = requiredArr.filter(i => objKey.includes(i));
      const valueArr = requiredArr.filter(i => !drpArr.includes(i));
      const msg = $omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
    
      if (msg) {
        self.$Message.warning(msg);
        flag = false;
      }
      return flag;
    },
    // 确认弹窗数据
    getDetail(data) {
      const { ID } = data;
      let params;
      let PICK_CREATE_TYPE;
      switch (this.componentData.type) {
        case 'pickingForDate':
        case 'pickingForStatus':
          PICK_CREATE_TYPE = this.componentData.type == 'pickingForDate' ? 1 : 2;
          params = ID != -1 ? { ID, ...this.$parent.$parent.$parent.modify.picking } : { ...data, PICK_CREATE_TYPE };
          this.subTableSave(params, 'picking');
          break;
        case 'warehouseWarrant':
          params = ID != -1 ? { ID, ...this.$parent.$parent.$parent.modify.warehouseWarrant } : data;
          if (params.hasOwnProperty('IS_AIR_EMBARGO')) {
            const { IS_AIR_EMBARGO } = data;
            params.IS_AIR_EMBARGO = IS_AIR_EMBARGO ? Number(IS_AIR_EMBARGO) : 0;
          }
          this.subTableSave(params, 'warehouseWarrant');
          break;
        default:
          break;
      }
    },
    /**
     * 拣货单/入库单保存
     * @param {*} params 表单数据
     * @param {*} type 拣货单/入库单
     */
    subTableSave(params, type) {
      let payload = { ...params, ST_C_VIPCOM_PROJECT_ID: this.componentData.ID };
      this.loading = true;
      const api = type == 'picking' ? 'pickSave' : 'warehouseInSave';
      this.service.strategyPlatform[api](payload)
      .then(({ data: { code, message } }) => {
        this.loading = false;
        if (code == 0) {
          this.$Message.success(message);
          this.$parent.$parent.closeConfirm();;
          this.$parent.$parent.$parent.querySchedule();
          this.$parent.$parent.$parent.initModify();
        }
      }).catch(() => this.loading = false);
    },
  }
};