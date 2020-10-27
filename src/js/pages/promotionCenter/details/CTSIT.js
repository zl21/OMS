import myInput from 'framework/components/element/input';
import SingleBox from '@/views/pages/promotionCenter/components/singleBox';

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
          },
        // {
        //   value: "E",
        //   label: "等于"
        // }
        ],
      // isChangeALLUnit:false,  //是否切换所有的计件（价）单位
      };
    },
    computed: {
      showDescription() {
        const c_name = this.rule.name;
        return c_name == 'QTTY' ? '数量' : '金额';
      },
      showDescription2() {
        const c_name = this.rule.name;
        return c_name == 'QTTY' ? '件' : '元';
      },
      groups() {
        return this.$store.state.customize.forginkeys.groups;
      },
      filterPdtWayShow() {
        return this.rule.filterPdtWayShow && !this.onlyShowRules && this.rule.check;
      }
    },
    methods: {
      checkFilterPdtWayChange(val) {
        this.rule.filterPdtWay = val;
      }
    },
    components: {
      myInput,
      SingleBox
    },
    mounted() {
      this.CompareNames = [{ value: 'QTTY', label: '数量' },
                           { value: 'AMT_LIST', label: '吊牌金额' }];
    }
  };
