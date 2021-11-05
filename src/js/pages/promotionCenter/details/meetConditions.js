import { SingleBox } from 'burgeonComponents'

export default {
  props: {
    rule: {
      type: Object
    },
    onlyShowRules: {
      type: Boolean
    }
  },
  data() {
    return {
      vmI18n: $i18n,
      CompareNames: [
        {
          value: 'QTTY',
          label: '数量'
        },
        {
          value: 'AMT_LIST',
          label: '吊牌金额'
        },
        {
          value: 'AMT_RETAIL',
          label: '零售金额'
        },
        {
          value: 'AMT_RECEIVABLE',
          label: '应收金额'
        },
      ],
      CompareTypes: [
        {
          value: 'GE',
          label: '大于等于'
        },
        {
          value: 'G',
          label: '大于'
        }
      ],
      // isChangeALLUnit:false,  //是否切换所有的计件（价）单位
    };
  },
  computed: {
    showDescription() {
      const cName = this.rule.name;
      return cName == 'QTTY' ? '数量' : '金额';
    },
    showDescription2() {
      const cName = this.rule.name;
      return cName == 'QTTY' ? '件' : '元';
    },
    groups() {
      return $store.state.customize.forginkeys.groups;
    },
    filterPdtWayShow() {
      return this.rule.filterPdtWayShow && !this.onlyShowRules && this.rule.check;
    },
    amoutStyleShow() {
      return this.rule.amoutStyleShow && !this.onlyShowRules && this.rule.check;
    }
  },
  methods: {
    checkFilterPdtWayChange(val) {
      this.rule.filterPdtWay = val;
    },
    filterOPtWayChange(val) {
      this.rule.amount_style = val;
    }
  },
  components: {
    SingleBox
  },
  mounted() {
    console.log($store.state.customize.forginkeys.groups);
    this.CompareNames = [{ value: 'QTTY', label: '数量' },
    { value: 'AMT_LIST', label: '吊牌金额' }];
  }
};
