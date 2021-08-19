<!-- 基础信息 -->
<template>
  <div class="basicInfo">
    <div class="143142">
      <Collapse v-model="panelDefaultValue">
        <Panel name="basic">
          <!-- {{ vmI18n.t("other.basic_info") }} -->
          基础信息
          <p slot="content">
            <businessForm :form-config="formConBasic" :key="formKey1" />
          </p>
        </Panel>
      </Collapse>
    </div>
  </div>
</template>

<script>
import BurgeonDate from '@/assets/js/__utils__/date';
import fkinput from 'professionalComponents/fkinputPlus.vue';
import groups from '@/assets/js/promotion/groups'; // 促销的一些初始化配置文件
import i18n from '@burgeon/internationalization/i18n'; // 国际化
import businessForm from "professionalComponents/businessForm";
groups.load();

export default {
  name: 'BasicInfoP',
  components: {
    fkinput,
    businessForm,
  },
  data() {
    return {
      vmI18n: i18n,
      $i18n: i18n,
      formKey1: 0,
      panelDefaultValue: 'basic',
      formConBasic: {
        formData: [
          {
            style: "input",
            colname: "activity_no", // 促销编号,y
            label: $i18n.t("form_label.promotionNo"),
            width: "18",
            inputChange: () => {
              const an = this.formConBasic.formValue.activity_no;
              an.length > 50 ? an.slice(0, 50) : an
              this.basicData.activity_no = an;
            },
          },
          {
            style: "input",
            colname: "activity_name", // y
            label: $i18n.t("form_label.activityName"),
            width: "18",
            inputChange: () => {
              const an = this.formConBasic.formValue.activity_name;
              an.length > 50 ? an.slice(0, 50) : an
              this.basicData.activity_name = an;
            },
          },
          {
            style: "popInputPlus",
            width: "18",
            colname: "stores",
            itemdata: {
              version: '1.4',
              colid: 168864,
              colname: "CP_C_SHOP_ID",
              name: "店铺名称",
              valuedata: "",
              pid: "",
              fkdisplay: "drp",
              isfk: true,
              isnotnull: true,
              readonly: false,
            },
            oneObj: (val) => {
              const _this = this;
              _this.oneObj_shop(val);
            },
          },
          {
            style: "checkbox",
            hasCheckAll: true,
            indeterminate: false, // true:展示小横线
            checkAll: true,
            label: $i18n.t("form_label.orderType"),
            colname: "order_type", // y
            width: "18",
            options: [],
            // options: groups.orderTypes,
            checkboxChange: (val) => {
              this.checkAll_checkboxChange('order_type', val);
              this.checkOrderTypeChange(val);
              this.basicData.order_type = val;
            },
            handleCheckAll: () => {
              const ot = this.formConBasic.formValue.order_type
              this.checkOrderTypeChange(ot);
              this.checkAll_handleCheckAll('order_type');
              this.basicData.order_type = ot;
            }
          },
          {
            style: "checkbox",
            label: $i18n.t("form_label.platform_marking"),
            colname: "platform_mark",
            width: "18",
            hasCheckAll: true,
            indeterminate: false, // true:展示小横线
            checkAll: false,
            options: [],
            // options: groups.platformTabs,
            checkboxChange: (val) => {
              this.checkAll_checkboxChange('platform_mark', val);
              this.checkPlatformTabsChange(val);
              this.basicData.platform_mark = val;
            },
            handleCheckAll: () => {
              this.checkAll_handleCheckAll('platform_mark');
              const pm = this.formConBasic.formValue.platform_mark
              this.checkPlatformTabsChange(pm);
              this.basicData.platform_mark = pm;
            }
          },
          {
            style: "radio",
            label: $i18n.t("form_label.timeType"),
            colname: "time_type", // y
            width: "8",
            options: [],
            // options: this.timeTypes,
            radioChange: () => {
              const tt = this.formConBasic.formValue.time_type
              this.checkTimeTypeChange(tt);
              this.basicData.time_type = tt;
            },
          },
          {
            style: "date",
            type: "datetimerange",
            label: $i18n.t("form_label.timeRange"),
            colname: "time_limit", // y
            format: "yyyy/MM/dd HH:mm:ss",
            width: "12",
            icon: "md-alarm",
            placement: "bottom-end",
            placeholder: "",
            transfer: true,
            ghost: false,
            onChange: () => {
              const tl = this.formConBasic.formValue.time_limit
              this.handleTimeLimitChange(tl);
              this.basicData.time_limit = tl;
            },
            clearable: true,
          },
          {
            style: "date",
            type: "datetime",
            label: $i18n.t("form_label.offlineTime"),
            colname: "offline_time", // y
            format: "yyyy/MM/dd HH:mm:ss",
            width: "18",
            icon: "md-alarm",
            placeholder: "",
            transfer: true,
            ghost: false,
            onChange: () => {
              const ot = this.formConBasic.formValue.offline_time
              this.handleOfflineTimeChange(ot);
              this.basicData.offline_time = ot;
            },
            clearable: true,
          },
          {
            style: "radio",
            label: $i18n.t("form_label.activityType"),
            colname: "activity_type", // y
            width: "18",
            options: [],
            // options: this.actiTypes,
            // options: [{ "title": "指定买赠", "value": "GA" }, { "title": "全场买赠", "value": "PA" }],
            radioChange: () => {
              const at = this.formConBasic.formValue.activity_type
              this.checkActiTypesChange(at);
              this.basicData.activity_type = at;
            },
          },
          {
            style: "radio",
            label: $i18n.t("form_label.gradient_gift"),
            colname: "gradient_gift", // y
            width: "18",
            options: [],
            // options: this.groups.gradientGift,
            // options: [{ "title": "否", "value": "0" }, { "title": "是", "value": "1" }],
            radioChange: () => {
              const gg = this.formConBasic.formValue.gradient_gift
              this.checkGradientGiftChange(gg);
              this.basicData.gradient_gift = gg;
            },
          },
          {
            style: "radio",
            label: $i18n.t("form_label.order_notes"),
            colname: "order_notes_type",
            width: "8",
            options: [],
            // options: this.groups.orderRemarks,
            // options: [{ "title": "买家留言", "value": "1" }, { "title": "卖家备注", "value": "2" }],
            radioChange: () => {
              const ont = this.formConBasic.formValue.order_notes_type;
              this.checkOrderRemarksChange(ont);
              this.basicData.order_notes_type = ont;
            },
          },
          {
            style: "input",
            colname: "order_note_content",
            label: $i18n.t("form_label.remarks_content"),
            width: "12",
            placeholder: $i18n.t('pHolder.a0'),
            inputChange: () => {
              const onc = this.formConBasic.formValue.order_note_content.replace(/ /g, '');
              this.basicData.order_note_content = onc;
            },
          },
          {
            style: "popInputPlus",
            width: "18",
            colname: "except_provinces",
            itemdata: {
              version: '1.4',
              colid: 180257,
              colname: "CP_C_PROVINCE_IDS",
              name: $i18n.t('common.exclude_province'),
              valuedata: "",
              fkdisplay: "mrp",
              isfk: true,
              isnotnull: false,
              readonly: false,
            },
            oneObj: (val) => {
              const _this = this;
              _this.oneObj_province(val);
            },
          },
          {
            style: "radio",
            label: $i18n.t("form_label.one_participation_times"),
            colname: "buyer_limit_frequency",
            width: "8",
            options: [],
            // options: this.groups.buyerLimitFrequency,
            // options: [{ "title": "不限制", "value": "0" }, { "title": "限制", "value": "1" }],
            radioChange: () => {
              const blf = this.formConBasic.formValue.buyer_limit_frequency;
              this.checkBuyerLimitFrequencyChange(blf);
              this.basicData.buyer_limit_frequency = blf;
            },
          },
          {
            style: "inputNumber",
            colname: "buyer_max_frequency",
            min: 0,
            label: $i18n.t("form_label.max_times"),
            width: "6",
            inputChange: () => {
              const bmf = this.formConBasic.formValue.buyer_max_frequency;
              this.basicData.buyer_max_frequency = bmf;
            },
          },
        ],
        formValue: {
          activity_no: this.basicData.activity_no,
          activity_name: this.basicData.activity_name,
          stores: this.basicData.stores,
          order_type: this.basicData.order_type,
          platform_mark: this.basicData.platform_mark || [],
          time_type: this.basicData.time_type,
          time_limit: this.basicData.time_limit,
          offline_time: this.basicData.offline_time,
          activity_type: this.basicData.activity_type,
          gradient_gift: this.basicData.gradient_gift,
          order_notes_type: this.basicData.order_notes_type,
          order_note_content: this.basicData.order_note_content,
          except_provinces: this.basicData.except_provinces,
          buyer_limit_frequency: this.basicData.buyer_limit_frequency,
          buyer_max_frequency: this.basicData.buyer_max_frequency,
        },
        ruleValidate: {
          activity_no: [{ required: true, message: " ", trigger: "blur" }],
          activity_name: [{ required: true, message: " ", trigger: "blur" }],
          order_type: [{ required: true, message: " ", trigger: "blur" }],
          time_type: [{ required: true, message: " ", trigger: "blur" }],
          time_limit: [{ required: true, message: " ", trigger: "blur" }],
          activity_type: [{ required: true, message: " ", trigger: "blur" }],
          gradient_gift: [{ required: true, message: " ", trigger: "blur" }],
        },
      },
      toMain: this.basicData,
    };
  },
  watch: {},
  computed: {
    groups() {
      return $store.state.customize.forginkeys.groups;
    },
    orderTypes() { return this.groups.orderTypes },
    platformTabs() { return this.groups.platformTabs },
    gradientGift() { return this.groups.gradientGift },
    orderRemarks() { return this.groups.orderRemarks },
    buyerLimitFrequency() { return this.groups.buyerLimitFrequency },
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
      default: () => ({})
    }
  },
  methods: {
    checkAll_checkboxChange(key, val) {
      const length = this.findIt(key).options.length;
      console.log('checkAll_checkboxChange::', val, length);
      if (val.length === length) {
        this.findIt(key).indeterminate = false;
        this.findIt(key).checkAll = true;
      } else if (val.length > 0) {
        this.findIt(key).indeterminate = true;
        this.findIt(key).checkAll = false;
      } else {
        this.findIt(key).indeterminate = false;
        this.findIt(key).checkAll = false;
      }
    },
    checkAll_handleCheckAll(key) {
      let indeterminate = this.findIt(key).indeterminate;
      let checkAll = this.findIt(key).checkAll;
      console.log('checkAll_handleCheckAll::', indeterminate, checkAll);
      if (indeterminate) {
        this.findIt(key).checkAll = false;
      } else {
        checkAll = !checkAll
        this.findIt(key).checkAll = checkAll;
      }
      this.findIt(key).indeterminate = false;
      if (checkAll) {
        let keyArr = this.findIt(key).options.map(it => it.value);
        console.log('keyArr::', keyArr);
        this.formConBasic.formValue[key] = keyArr;
      } else {
        this.formConBasic.formValue[key] = [];
      }

    },
    findIt(key, type) {
      return this[type ? type : "formConBasic"].formData.find(
        (item) => item.colname == key
      );
    },
    oneObj_shop(val) {
      console.log(val.valuedata);
      this.toMain.stores.itemdata = val;
      this.$emit('changeBasicData', this.toMain);
    },
    oneObj_province(val) {
      console.log(val.valuedata);
      this.toMain.except_provinces.itemdata = val;
      this.$emit('changeBasicData', this.toMain);
    },
    /**
     * 初始化basicData上字段的默认值
     */
    initGroupsDefault() {
      for (const key in this.formConBasic.formValue) {
        if (Object.keys(this.basicData).includes(key)) {
          const optionObj = { 'order_type': 'orderTypes', 'platform_mark': 'platformTabs', 'time_type': 'timeTypes', 'activity_type': 'actiTypes', 'gradient_gift': 'gradientGift', 'order_notes_type': 'orderRemarks', 'buyer_limit_frequency': 'buyerLimitFrequency' }
          if (Object.keys(optionObj).includes(key)) {
            this.findIt(key).options = this[optionObj[key]]; // 初始化options
          }
          this.formConBasic.formValue[key] = this.basicData[key];
          if (['stores', 'except_provinces'].includes(key)) {
            this.findIt(key).itemdata = this.basicData[key].itemdata;
          }
          // 特别地：
          this.formConBasic.formValue.buyer_max_frequency = Number(this.basicData.buyer_max_frequency);
        }
      }
    },
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
        this.offlineTime = this.$comUtils.dateFormat(this.basicData.offline_time, 'yyyyMMddhhmmss');
      } else {
        this.offlineTime = this.basicData.offline_time.replace(/\/|\s|\:/g, '');
      }
      this.offlineTime = Number(this.offlineTime) > 0 ? Number(this.offlineTime) : 0;
      try {
        // && (Number(endTime) + diff > offline_time)
        if (endTime !== 0) {
          this.offlineTime = BurgeonDate.addDays(new Date(this.basicData.time_limit[1]), 2);
          this.basicData.offline_time = this.$comUtils.dateFormat(this.offlineTime, 'yyyy/MM/dd hh:mm:ss')
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    handleOfflineTimeChange(val) {
      this.basicData.offline_time = val;
    }
  },
  created() {
    this.findIt('activity_no').style = this.$route.query.id > 0 ? 'input' : ''
  },
  mounted() {
    console.log('==:', this.basicData);
    setTimeout(() => {
      this.initGroupsDefault();
      this.formKey1 += 1;
    }, 200);
  }
};

</script>
