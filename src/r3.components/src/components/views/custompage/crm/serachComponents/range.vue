<!--高级搜索区间组件-->
<template>
  <div class="ff-search-range-component">
    <!--日期区间-->
    <el-date-picker
      v-if="type === 'date'"
      v-model="value"
      size="mini"
      class="ff-search--range-date"
      type="daterange"
      :format="$t('searchComponent.fullDateFormat')"
      value-format="yyyy-MM-dd"
      :start-placeholder="$t('searchComponent.startDate')"
      :end-placeholder="$t('searchComponent.endDate')"
      @change="handelChange"
    />
    <!--日期快捷区间-->
    <el-date-picker
      v-if="type === 'dateShortcut'"
      v-model="value"
      size="mini"
      class="ff-search--range-date"
      type="daterange"
      align="right"
      unlink-panels
      :format="$t('searchComponent.fullDateFormat')"
      value-format="yyyy-MM-dd"
      :start-placeholder="$t('searchComponent.startDate')"
      :end-placeholder="$t('searchComponent.endDate')"
      :picker-options="pickerOptions"
      @change="handelChange"
    />
    <!--数字区间-->
    <div
      v-if="type === 'number'"
      class="ff-search--range-number"
    >
      <el-input-number
        v-model="numberValue.min"
        class="ff-search--range-input--number"
        :min="0"
        :max="Number(numberValue.max)"
        size="mini"
      />
      {{ unit }}
      <span>{{$t('searchComponent.toDate')}}</span>
      <el-input-number
        v-model="numberValue.max"
        class="ff-search--range-input--number"
        :min="Number(numberValue.min)"
        size="mini"
      />
      {{ unit }}
    </div>
    <p
      v-if="verify && type != 'number' && value.length !== 2"
      class="ff-advanced-search-verify"
    >
      {{$t('advancedSearch.enterComplete')}}
    </p>
  </div>
</template>
<style lang="less" type="text/less">
  .ff-search-range-component {
    display: inline-block;
    margin-right: 7px;
    .ff-search--range-date {
      border-color: #DCDCDC;
    }
    .el-date-editor .el-input__icon {
      top: 4px;
    }
    .el-range-editor--mini .el-range-separator {
      line-height: 20px;
    }
    .ff-search--range-input--number {
      width: 100px;
    }
  }
</style>
<script>
  import $http from '../../../../../__utils__/request';
  // import i18n from '../../../../../assets/js/i18n'

  export default {
    name: 'range',
    props: {
      initData: {}, // 初始值
      type: {
        type: String,
        default: 'date'
      }, // 区间类型(dateShortcut:日期快捷、date:时间区间、number: 数字区间)
      unit: {
        type: String,
        default: ''
      }, // 区间单位
      verify: {
        type: Boolean,
        default: false
      }// 用于校验(判断是否填写了值)
    },
    data() {
      return {
        value: [], // 时间区间
        pickerOptions: {
          shortcuts: [
            {
              text: this.$t('searchComponent.lastWeek'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: this.$t('searchComponent.lastMonth'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: this.$t('searchComponent.lastThreeMonths'),
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        }, // 时间快捷
        numberValue: {
          min: '',
          max: ''
        }// 数字区间值
      };
    },
    watch: {
      'numberValue.min': function (val) {
        if (this.type !== 'number') return;
        this.$emit('changeData', {
          value: [val, this.numberValue.max],
          text: `${val}-${this.numberValue.max}`
        });
      },
      'numberValue.max': function (val) {
        if (this.type !== 'number') return;
        this.$emit('changeData', {
          value: [this.numberValue.min, val],
          text: `${this.numberValue.min}${this.unit}<span class="ff-search-range-gap">${this.$t('searchComponent.toDate')} </span>${val}${this.unit}`
        });
      }
    },
    methods: {
      handelChange(val) {
        this.$emit('changeData', {
          value: [val[0], val[1]],
          text: `${val[0]}<span class="ff-search-range-gap">${this.$t('searchComponent.to')}</span>${val[1]}`
        });
      }
    },

    beforeCreate() {
    this.$t = $i18n.t.bind($i18n)
    },

    mounted() {
      // 初始化值
      if (this.initData && this.initData.length !== 0) {
        if (this.type === 'number') {
          this.numberValue = {
            min: this.initData[0],
            max: this.initData[1]
          };
        } else {
          this.value = [this.initData[0], this.initData[1]];
        }
      } else {
        this.numberValue = {
          min: 0,
          max: 0
        };
      }
    },
  };
</script>
