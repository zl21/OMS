import BasicInfo from 'allpages/promotionCenter/details/basicInfo.vue';
import BatchInfoSet from 'allpages/promotionCenter/details/batchInfoSet.vue';
import stepsBars from 'burgeonComponents/steps';
import groups from '@/assets/js/promotion/groups';
import businessButton from 'burgeonComponents/businessButton';
import promotionMixin from './promotion.mixin';

export default {
  components: {
    BasicInfo,
    BatchInfoSet,
    stepsBars,
    businessButton
  },
	mixins: [promotionMixin()],
  data() {
    return {
      vueMark: 'batchActivity',
      btnConfig: {
        btnsite: 'right',
        typeAll: 'default',
        buttons: []
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
          class: 'icon-huodong',
          // content: "活动概览",
          content: $i18n.t('other.activity_overview'),
          finish: false
        }
      ],
    };
  },
  computed: { },
  watch: { },
  methods: {
    /**
     * 查询促销的详情
     */
    async getInitData(_objid) {
      const formData = new URLSearchParams();
      const obj = {
        objid: this.objid
      };
      if (_objid) obj.objid = _objid;
      formData.append('param', JSON.stringify(obj));
      const {
        data: { code, data }
      } = await this.service.promotionCenter.selectPm(formData);
      if (code === 0) {
        this.basic_info = data.basic_info || {};
        this.batch_infos_setting = data.batch_infos_setting || {};
      }
      this.initBtn();
    },
    /**
     * 新增 初始化数据
     */
    initData() {
      try {
        const groups = this.groups;
        // 基础信息设置
        this.basic_info.order_type = groups.orderTypes.map(item => item.value);
        // this.basic_info.platform_mark = groups.platformTabs.map((item)=>{//平台标记
        //   return item.value;
        // });
        this.basic_info.time_type = groups.timeTypes.find(item => item.title === $i18n.t('other.payment_date')).value; // 付款日期
        this.basic_info.activity_type = groups.actiTypes.find(item => item.title === $i18n.t('other.Designated_free_purchase')).value; // 指定买赠
        this.basic_info.buyer_limit_frequency = groups.buyerLimitFrequency.find(item => item.title === $i18n.t('other.unlimited')).value; // 不限制
        this.basic_info.order_notes_type = groups.orderRemarks.find(item => item.title === $i18n.t('form_label.buyer_message')).value; // 买家留言
        // 条件设置
        this.batch_infos_setting.products_origin = groups.productsOrigin.find(item => item.title === $i18n.t('other.systemCommodity_SKU')).value; // 系统商品SKU
        this.batch_infos_setting.gift_doubles = groups.giftDoubles.find(item => item.title === $i18n.t('other.no_double')).value; // 不翻倍
        this.batch_infos_setting.gift_methods = groups.batchGiftMethods.find(item => item.title === $i18n.t('other.sendAll')).value; // 全部送
        this.basic_info.activity_name = '';
        this.basic_info.stores.itemdata.valuedata = '';
        this.basic_info.stores.itemdata.pid = '';
        this.basic_info.except_provinces.itemdata.valuedata = '';
        this.basic_info.except_provinces.itemdata.pid = '';
        this.basic_info.time_limit = ''; // 时间范围
        this.basic_info.offline_time = ''; // 下线时间
        this.basic_info.order_note_content = ''; // 备注内容
        this.basic_info.buyer_max_frequency = '1'; // 基础活动最大次数
        this.batch_infos_setting.max_doubles_limits = '1'; // 条件信息最大次数
        this.batch_infos_setting.list = [
          {
            gift_products: [],
            products: []
          }
        ]; // 条件信息最大次数
      } catch (e) {
        console.log(e.stack);
      }
    },
    /**
     * @needTip 是否需要提示出来，哪一项存在问题
     */
    validateModule() {
      const f1 = this.validate1();
      this.stepsBar[0].finish = [0].includes(f1.code);
      const f2 = this.validate2();
      this.stepsBar[1].finish = [0].includes(f2.code);
      this.stepsBar[2].finish = this.stepsBar[0].finish && this.stepsBar[1].finish;
      return [f1, f2];
    },
    validate2() {
      let rs = {
        code: 0,
        message: $i18n.t('modalTips.s4')
      }; // 校验完成
      if (this.batch_infos_setting.gift_doubles === '1' && this.batch_infos_setting.max_doubles_limits === '') {
        return {
          code: -1,
          message: $i18n.t('modalTips.r0')
        }; // 最大翻倍数未填写！
      }
      if (this.batch_infos_setting.list.length === 0) {
        return {
          code: -1,
          message: $i18n.t('modalTips.r1')
        }; // 请先添加商品和赠品！
      }
      for (let i = 0; i < this.batch_infos_setting.list.length; i++) {
        const productArr = this.batch_infos_setting.list[i].products;
        const giftArr = this.batch_infos_setting.list[i].gift_products;
        if (productArr.length === 0) {
          return {
            code: -1,
            message: $i18n.t('modalTips.r2')
          }; // 商品列表无数据
        }
        rs = this.checkTableProducts(productArr, i);
        if (rs.code == -1) {
          return rs;
        }

        if (giftArr.length === 0) {
          return {
            code: -1,
            message: $i18n.t('modalTips.r3')
          }; // 赠品列表无数据
        }
        rs = this.checkTableGift(giftArr, i);
        if (rs.code == -1) {
          return rs;
        }
      }
      return rs;
    },
    checkTableProducts(arr, index) {
      for (let i = 0; i < arr.length; i++) {
        const row = arr[i];
        for (const j in row) {
          const notnull = ['ECODE', 'ENAME', 'NUM'];
          if (notnull.includes(j) && row[j] === '') {
            return {
              code: -1,
              message: `商品列表第${index + 1}组 第${i + 1}行数据未填写完毕`
            };
          }
        }
      }
      return {
        code: 0,
        message: $i18n.t('modalTips.s4')
      }; // 校验完成
    },
    checkTableGift(arr, index) {
      for (let i = 0; i < arr.length; i++) {
        const row = arr[i];
        for (const j in row) {
          const notnull = ['ECODE', 'GIFTNUM', 'TOTALNUM'];
          if (notnull.includes(j) && row[j] === '') {
            return {
              code: -1,
              message: `赠品列表第${index + 1}组 第${i + 1}行数据未填写完毕`
            };
          }
        }
      }
      return {
        code: 0,
        message: $i18n.t('modalTips.s4')
      }; // 校验完成
    },
    /**
     * 初始化默认时间  时间范围好下线时间
     */
    initDefaultTime() {},
    /**
     * 保存草稿
     */
    async saveDraft() {
      const validateRes = this.validateModule();
      for (const it of validateRes) {
        if (it.code === -1) return this.$Message.error(it.message);
      }
      // const index = this.basic_info.activity_type + new Date().Format('yyyyMMddHHMMSS');
      const index = this.basic_info.activity_type + $omsUtils.dateFormat(new Date() , 'yyyyMMddHHMMSS')
      const params = {
        objid: this.objid,
        basic_info: this.basic_info,
        batch_infos_setting: this.batch_infos_setting,
        index
      };
      this.loading = true;
      const formData = new URLSearchParams();
      formData.append('param', JSON.stringify(params));
      try {
        const {
          data: { code, message, data }
        } = await this.service.promotionCenter.saveBatchPm(formData);
        console.log(code, message, data);
        if (code === 0) {
          this.$Message.success(message);
          // let action = this.objid == -1 ? 0 : 1;
          this.objid = String(data.objid) || -1;
          this.$nextTick(() => {
            $omsUtils.tabJump(3, this.objid, 1, 'PM_C_PROM_ACTI_BATCH_ADD', { i8n: 1, tip: 'panel_label.batchAddPromotion' }, {}, 0)
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    /**
     * 滚动选中区域
     */
    scorllArea() {
      const area0 = this.$refs.area_0.$el.offsetHeight;
      const area1 = this.$refs.area_1.$el.offsetHeight;
      //   let area_2 = this.$refs.area_2.$el.offsetHeight;
      if (this.current === 0) this.$refs.basicSteps.scrollTop = 0;
      else if (this.current === 1) {
        this.$refs.basicSteps.scrollTop = area0;
      } else if (this.current === 2) {
        this.$refs.basicSteps.scrollTop = area0 + area1;
      }
    },
    /**
     * 用户手动滚动,监听页面滚动
     */
    handleScrollByUser() {
      const scroll = this.$refs.basicSteps.scrollTop;
      const area0 = this.$refs.area_0.$el.offsetHeight;
      const area1 = this.$refs.area_1.$el.offsetHeight;
      // const area2 = this.$refs.area_2.$el.offsetHeight;
      // console.log("scroll-----",scroll)
      // console.log("area0-----",area0)
      // console.log("area1-----",area1)
      if (scroll < area0) {
        this.current = 0;
      } else if (scroll < area0 + area1) {
        this.current = 1;
      } else if (scroll < area0 + area1 + area2) {
        this.current = 3;
      }
      this.validateModule();
      this.$nextTick(() => {
        this.isScorlling = false;
      });
    }
  },
  beforeDestroy() {
    this.$refs.basicSteps.removeEventListener('scroll', this.handleScrollByUser, false);
  },
  mounted() {
    // 新增
    // 修改草稿
    this.addListener();
  },
  async created() { }
};
