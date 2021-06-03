// import dateUtil from "@/assets/js/__utils__/date";
// import myInputLd from 'framework/components/element/input.vue';
import MultipleBox from 'professionalComponents/multipleBox';
import SingleBox from 'professionalComponents/singleBox';
import BurgeonDate from '@/assets/js/__utils__/date';
import fkinput from 'professionalComponents/fkinputPlus.vue';
import groups from '@/assets/js/promotion/groups'; // 促销的一些初始化配置文件
groups.load();

export default {
  name: 'BasicInfo',
  components: {
    fkinput,
    // myInputLd,
    MultipleBox,
    SingleBox
  },
  data() {
    return {
      vmI18n:$i18n,
      toMain: {},
      storesItemdata: {
        // colid: $store.state.forginkeys.columnIds.shop || '1700805184',
        colid: '171929',
        colname: 'CP_C_SHOP_ID', // 当前字段的名称
        fkdisplay: 'drp', // 外键关联类型
        serviceId: "r3-cp",
        isfk: true, // 是否有fk键
        isnotnull: true, // 是否必填
        name: $i18n.t('table_label.shopName'),
        readonly: false, // 是否可编辑，对应input   readonly属性
        isOneData: true,
        valuedata: '', // 这个是选择的值
        isObject: true
      }, // 多选店仓信息
      except_provincesItemdata: {
        colid: '180257',
        colname: 'CP_C_PROVINCE_IDS',
        fkdisplay: 'mrp',
        serviceId: "r3-cp",
        isfk: true,
        isnotnull: false,
        isuppercase: false,
        name: $i18n.t('common.exclude_province'),
        readonly: false,
        reftable: 'CP_C_PROVINCE',
        reftableid: 23862,
        valuedata: ''
      },
      my_input_sh: {
        itemdata: {
          col: 1,
          colid: 1700805184,
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'drp', // 外键关联类型
          fkdesc: '店铺',
          inputname: 'CP_C_SHOP:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: true, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: $i18n.t('table_label.shopName'), // 店铺名称
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_SHOP', // 对应的表
          // reftableid: 24475, //对应的表ID
          row: 1,
          statsize: -1,
          type: 'STRING', // 这个是后台用的
          valuedata: '' // 这个是选择的值
        }
      },
      prov_data: {
        // 排除省
        itemdata: {
          col: 1,
          colid: 138222,
          colname: 'CP_C_PROVINCE_IDS',
          datelimit: 'all',
          display: 'text',
          fkdesc: '门店档案',
          fkdisplay: 'mrp',
          inputname: 'CP_C_PROVINCE_IDS:ENAME',
          isfk: true,
          isnotnull: false,
          isuppercase: false,
          length: 65535,
          name: $i18n.t('common.exclude_province'), // 排除省
          readonly: false,
          reftable: 'CP_C_PROVINCE',
          reftableid: 23862,
          row: 1,
          statsize: -1,
          type: 'STRING',
          valuedata: ''
        }
      },
      ruleValidate: {
        activity_name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur'
          }
        ]
      }
    };
  },
  watch: {
    storesItemdata: {
      handler(val, oldVal) {
        this.toMain.stores = val;
        this.$emit('basicData', this.toMain);
      },
      deep: true
    },
  },
  computed: {
    groups() {
      return $store.state.customize.forginkeys.groups;
    },
    timeTypes() {
      const self = this;
      const preOrder = self.groups.orderTypes.find(item => item.title === '预售');
      const flag = !!(preOrder && self.basicData.order_type.includes(preOrder.value));
      let options = self.groups.timeTypes;
      if (!flag) {
        options = self.groups.timeTypes.filter(item => item.title != '定金时间');
      }
      return options;
    },
    actiTypes() {
      const self = this;
      let options = self.groups.actiTypes;
      if (!self.basicData.gradient_gift) {
        options = self.groups.actiTypes.filter(item => item.title != '全场买赠');
      }
      return options;
    }
  },
  props: {
    basicData: {
      type: Object,
      defaults: () => []
    }
  },
  methods: {
    storeOneObj(val) {
      // this.toMain.stores = val;
      // this.$emit('basicData', this.toMain);
    },
    /**
     * 初始化字段选项组的默认值
     */
    initGroupsDefault() {},
    /**
     * 修改订单类型
     */
    checkOrderTypeChange(vals) {
      this.basicData.order_type = vals;
      // add  by wdq 9代表预售，去掉【预售】类型默认选择【付款时间】
      if (this.basicData.order_type.includes('9')) {
        this.basicData.time_type = '2';
      }
    },
    /**
     * 修改平台类型
     */
    checkPlatformTabsChange(vals) {
      this.basicData.platform_mark = vals;
    },
    /**
     * 修改时间类型
     */
    checkTimeTypeChange(val) {
      this.basicData.time_type = val;
    },
    /**
     * 修改活动类型
     */
    checkActiTypesChange(val) {
      this.basicData.activity_type = val;
    },
    /**
     * 修改梯度赠送
     */
    checkGradientGiftChange(val) {
      this.basicData.gradient_gift = val;
    },
    /**
     * 修改订单备注
     */
    checkOrderRemarksChange(val) {
      this.basicData.order_notes_type = val;
    },
    /**
     * 修改单个买家次数
     */
    checkBuyerLimitFrequencyChange(val) {
      this.basicData.buyer_limit_frequency = val;
    },
    /**
     * 限制活动名称长度
     */
    limitName(event) {
      const value = event.target.value;
      event.target.value = value.length > 50 ? value.slice(0, 50) : value;
    },
    handleTimeLimitChange(val) {
      this.basicData.time_limit = val;
      let endTime = this.basicData.time_limit[1].replace(/\/|\s|\:/g, '');
      endTime = Number(endTime) > 0 ? Number(endTime) : 0;
      this.offlineTime = 0;
      if (BurgeonDate.isDate(this.basicData.offline_time)) {
        this.offlineTime = new Date(this.basicData.offline_time).Format('yyyyMMddhhmmss');
      } else {
        this.offlineTime = this.basicData.offline_time.replace(/\/|\s|\:/g, '');
      }
      this.offlineTime = Number(this.offlineTime) > 0 ? Number(this.offlineTime) : 0;
      try {
        // && (Number(endTime) + diff > offline_time)
        if (endTime !== 0) {
          this.offlineTime = new Date().addDays(new Date(this.basicData.time_limit[1]), 2);
          this.basicData.offline_time = this.offlineTime.Format('yyyy/MM/dd hh:mm:ss');
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    handleOfflineTimeChange(val) {
      this.basicData.offline_time = val;
    }
  },
  mounted() {
    this.initGroupsDefault();
  }
};
