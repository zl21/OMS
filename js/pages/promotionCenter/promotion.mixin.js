import groups from '@/assets/js/promotion/groups';

export default () => ({
  data() {
    return {
      vmI18n: $i18n,
      objid: '-1', // 新增-1 保存的正整数
      extendBtn: [
        {
          webname: 'PM_C_PROM_ACTI_RETURN_B',
          text: $i18n.t('btn.back'), // 返回
          btnclick: () => {
            this.close();
          }
        },
        {
          webname: 'PM_C_PROM_ACTI_SAVE',
          text: $i18n.t('btn.saveDraft'), // 保存草稿
          btnclick: () => {
            this.saveDraft();
          }
        },
        {
          webname: 'PM_C_PROM_ACTI_PUBLISH',
          text: $i18n.t('btn.publish'), // 发布
          btnclick: () => {
            this.publish();
          }
        },
      ],
      basic_info: {
        activity_name: '', // 活动名称【必填】
        stores: {
          itemdata: {
            // colid: $store.state.forginkeys.columnIds.shop || '1700805184',
            colid: '171929',
            serviceId: "r3-cp",
            colname: 'CP_C_SHOP_ID', // 当前字段的名称
            fkdisplay: 'drp', // 外键关联类型
            isfk: true, // 是否有fk键
            isnotnull: true, // 是否必填
            name: $i18n.t('table_label.shopName'),
            readonly: false, // 是否可编辑，对应input   readonly属性
            isOneData: true,
            valuedata: '', // 这个是选择的值
            isObject: true,
            version: '1.4'
          }
        }, // 多选店仓信息
        order_type: [], // 订单类型,选项1，2，3
        platform_mark: [], // 平台标记
        time_type: '', // 时间类型【必填】
        time_limit: '', // 时间范围
        offline_time: '', // 下线时间
        activity_type: 'GA', // 活动类型
        gradient_gift: '', // 梯度赠送,"1"是是 “0”是否
        order_notes_type: '1', // 订单备注 1买家留言 2卖家留言
        order_note_content: '', // 备注内容
        except_provinces: {
          itemdata: {
            colid: '180257',
            serviceId: "r3-cp",
            colname: 'CP_C_PROVINCE_IDS',
            fkdisplay: 'mrp',
            isfk: true,
            isnotnull: false,
            name: $i18n.t('common.exclude_province'),
            readonly: false,
            valuedata: '',
            version: '1.4'
          }
        }, // 排除省份
        buyer_limit_frequency: '0', // 单个买家参与活动次数  0-不限制 1-限制
        buyer_max_frequency: '1', // 最大次数
        status: '1' // 促销状态
      },
      batch_infos_setting: {
        // 【批量】条件信息设置
        products_origin: '1', // 商品来源  1-系统商品  2-平台商品
        gift_doubles: '0', // 赠品翻倍 1--翻倍 0-不翻倍
        max_doubles_limits: '999', // 最大翻倍次数
        gift_methods: '1', // 赠送方式  1-全部送  2-顺序送  3-随机送
        list: [
          {
            gift_products: {},
            products: {} // 商品列表
          }
        ]
      },
      stepsBar: [
        {
          class: 'icon-jibenxinxi',
          // content: "基础信息",
          content: $i18n.t('other.basic_info'),
          finish: false
        },
        {
          class: 'icon-liuchengtiaojian',
          // content: "条件信息",
          content: $i18n.t('other.condition_info'),
          finish: false
        },
        {
          class: 'icon-zengpin',
          // content: "赠品信息",
          content: $i18n.t('other.gift_info'),
          finish: false
        },
        {
          class: 'icon-huodong',
          // content: "活动概览",
          content: $i18n.t('other.activity_overview'),
          finish: false
        }
      ],
      current: 0,
      loading: false,
      isScorlling: false, // 是否在滚动中
    }
  },
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
  watch: {
    current() {
      if (!this.isScorlling) {
        // 非手动滚动时候触发
        this.scorllArea();
      }
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
      if (this.vueMark == 'addOrEditActi') {
        this.getData();
      } else {
        this.getInitData();
      }
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
    // 发布
    async publish() {
      const validateRes = this.validateModule();
      for (const it of validateRes) {
        if (it.code === -1) return this.$Message.error(it.message);
      }
      // const index = this.basic_info.activity_type + new Date().Format('yyyyMMddHHMMSS');
      const ids = [];
      ids[0] = this.basic_info.objid;
      const params = {
        objid: -1, // 默认参数 保持格式统一 传死-1
        isBatch: true, // 是否批量 传true
        fixcolumn: {
          ids,
          status: 2
        }
      };
      this.loading = true;
      const formData = this.vueMark == 'addOrEditActi' ? new FormData() : new URLSearchParams();
      formData.append('param', JSON.stringify(params));
      try {
        const {
          data: { code, message }
        } = await this.service.promotionCenter.updatePmStatus(formData);
        if (code === 0) {
          this.$Message.success(message);
          this.$nextTick(() => {
            if (this.vueMark == 'addOrEditActi') {
              this.getData(this.objid);
            } else {
              this.getInitData(this.objid);
            }
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    addListener() {
      this.$refs.basicSteps.addEventListener('scroll', this.handleScrollByUser);
    },
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
