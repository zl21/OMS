import groups from '@/assets/js/promotion/groups';

export default () => ({
  computed: {
    customizedModuleName() {
      return this.$router.currentRoute.params.customizedModuleName;
    },
    groups() {
      return $store.state.customize.forginkeys.groups;
    },
    showSaveButton() {
      if (this.objid > 0 && (this.basic_info.status === '2' || this.basic_info.status === '3')) {
        return false;
      }
      return true;
    },
    showPublishButton() {
      if (this.objid < 0 || this.basic_info.status !== '1') {
        return false;
      }
      return true;
    }
  },
  updated() { },
  async created() {
    const buttons = self.$OMS2.BtnConfig.config();
    console.log(buttons);
    this.btnConfig.buttons = [...this.extendBtn];
    await groups.load();
    const routeId = this.$route.query.id;
    if (routeId > 0) {
      this.$OMS2.omsUtils.getPermissions(this, 'btnConfig', { table: 'PM_C_PROM_ACTI', type: 'OBJ', serviceId: 'r3-oc-oms' }, true);
      this.objid = String(routeId);
      this.getData();
    } else {
      this.objid = '-1';
      const copy = this.$route.query.copy;
      if (this.vueMark == 'addOrEditActi') {
        this.initData();
        this.freshKey += 1;
        if (copy && copy > 1) this.getData(copy);
      } else {
        if (copy && copy > 1) this.getInitData(copy);
      }
      this.initBtn();
    }
  },
  methods: {
    /**
     * 取消(关闭) 返回列表界面
     */
    close() {
      const _self = this;
      this.$comUtils.tabCloseAppoint(_self);
      this.$destroy(true);
      $omsUtils.tabJump(0, 0, 'C', 'PROMACTIQUERYLIST', { i8n: 1, tip: 'panel_label.promotionList' }, {}, 1, 1, 2895)
      // $omsUtils.tabJump(2, 31460113, 'CUSTOMIZED', 'PROMACTIQUERYLIST', { i8n: 1, tip: 'panel_label.promotionList' }, {}, 0)
      // $omsUtils.tabJump(2, 2895, 'CUSTOMIZED', 'PROMACTIQUERYLIST', { i8n: 1, tip: 'panel_label.promotionList' }, {}, 1, 0)
    },
    validate1() {
      if (this.basic_info.activity_name === '') {
        return {
          code: -1,
          message: $i18n.t('modalTips.s5')
        }; // 活动名称未填写！
      }
      if (!this.basic_info.stores.itemdata.valuedata) {
        return {
          code: -1,
          message: $i18n.t('modalTips.s6')
        }; // 店铺名称未填写！
      }
      if (this.basic_info.order_type.length === 0) {
        return {
          code: -1,
          message: $i18n.t('modalTips.s7')
        }; // 订单类型必选！
      }
      // if(this.basic_info.platform_mark.length === 0){
      //    return {code:-1,message:'平台标记未填写！'};
      // }
      if (this.basic_info.time_limit === '' || this.basic_info.time_limit[0] === '' || this.basic_info.time_limit[1] === '') {
        return {
          code: -1,
          message: $i18n.t('modalTips.t8')
        }; // 时间范围未填写！
      }
      if (this.basic_info.offline_time === '') {
        return {
          code: -1,
          message: $i18n.t('modalTips.s8')
        }; // 下线时间未填写！
      }
      if (this.basic_info.buyer_limit_frequency === '1' && !this.basic_info.buyer_max_frequency) {
        return {
          code: -1,
          message: $i18n.t('modalTips.s9')
        }; // 最大限制次数未填写！
      }

      return {
        code: 0,
        message: $i18n.t('modalTips.s4')
      }; // 校验完成
    },
    initBtn() {
      let self = this;
      if (self.objid > 0 && (self.basic_info.status === '2' || self.basic_info.status === '3')) {
        let arr = [];
        arr = self.btnConfig.buttons.filter(item => item.text != '保存草稿');
        self.btnConfig.buttons = arr;
      };
      if (self.objid < 0 || self.basic_info.status !== '1') {
        let arr = [];
        arr = self.btnConfig.buttons.filter(item => item.text != '发布');
        self.btnConfig.buttons = arr;
      }
    },
  },
});
