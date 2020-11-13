// import dateUtil from "@/assets/js/__utils__/date";
import myInputLd from 'framework/components/element/input.vue';
import MultipleBox from '@/views/pages/promotionCenter/components/multipleBox';
import SingleBox from '@/views/pages/promotionCenter/components/singleBox';

export default {
  name: 'BasicInfo',
  components: {
    myInputLd,
    MultipleBox,
    SingleBox,
  },
  data() {
    return {
      vmI18n: window.vmI18n,
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
          // name: "店铺名称", // input前面显示的lable值
          name: window.vmI18n.t('table_label.shopName'),
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_SHOP', // 对应的表
          // reftableid: 24475, //对应的表ID
          row: 1,
          statsize: -1,
          type: 'STRING', // 这个是后台用的
          valuedata: '', // 这个是选择的值
        },
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
          // name: "排除省",
          name: window.vmI18n.t('common.exclude_province'),
          readonly: false,
          reftable: 'CP_C_PROVINCE',
          reftableid: 23862,
          row: 1,
          statsize: -1,
          type: 'STRING',
          valuedata: '',
        },
      },
      ruleValidate: {
        activity_name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  computed: {
    groups() {
      return this.$store.state.customize.forginkeys.groups;
    },
    timeTypes() {
      const self = this;
      const preOrder = self.groups.orderTypes.find(
        item => item.title === '预售'
      );
      const flag = !!(
        preOrder && self.basicData.order_type.includes(preOrder.value)
      );
      let options = self.groups.timeTypes;
      if (!flag) {
        options = self.groups.timeTypes.filter(
          item => item.title != '定金时间'
        );
      }
      return options;
    },
    actiTypes() {
      const self = this;
      let options = self.groups.actiTypes;
      if (!self.basicData.gradient_gift) {
        options = self.groups.actiTypes.filter(
          item => item.title != '全场买赠'
        );
      }
      return options;
    },
  },
  props: {
    basicData: {
      type: Object,
      defaults: () => [],
    },
  },
  methods: {
    /**
     * 初始化字段选项组的默认值
     */
    initGroupsDefault() { },
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
      value.length > 50 ? (event.target.value = value.slice(0, 50)) : value;
    },
    handleTimeLimitChange(val) {
      this.basicData.time_limit = val;
      let endTime = this.basicData.time_limit[1].replace(/\/|\s|\:/g, '');
      endTime = Number(endTime) > 0 ? Number(endTime) : 0;
      let offline_time = 0;
      if (new Date().isDate(this.basicData.offline_time)) {
        offline_time = new Date(this.basicData.offline_time).Format(
          'yyyyMMddhhmmss'
        );
      } else {
        offline_time = this.basicData.offline_time.replace(/\/|\s|\:/g, '');
      }
      offline_time = Number(offline_time) > 0 ? Number(offline_time) : 0;
      const diff = 2000000;
      try {
        // && (Number(endTime) + diff > offline_time)
        if (endTime !== 0) {
          offline_time = new Date().addDays(
            new Date(this.basicData.time_limit[1]),
            2
          );
          this.basicData.offline_time = offline_time.Format(
            'yyyy/MM/dd hh:mm:ss'
          );
        }
      } catch (e) { }
    },
    handleOfflineTimeChange(val) {
      this.basicData.offline_time = val;
    },
  },
  mounted() {
    this.initGroupsDefault();
  },
};
