<!--高级搜索下拉单选+区间组件-->
<template>
  <div class="ff-rang-complex-component">
    <drop-select
      :get-data="getData"
      class="ff-rang-complex--select"
      :init-data="selectObj.value"
      @changeData="changeData"
    />
    <range
      type="number"
      :unit="unit"
      class="ff-rang-complex--range"
      :init-data="rangObj.value"
      @changeData="rangeChangeData"
    />
    <p
      v-if="verify && selectObj.value == ''"
      class="ff-advanced-search-verify"
    >
      请选择累计月份
    </p>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-rang-complex-component {
    display: inline-block;
    .ff-rang-complex--select {
      width: 100px;
    }
    .ff-rang-complex--range {
      margin-right: 0;
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  import range from './range.vue';
  import dropSelect from './dropSelect.vue';

  export default {
    props: {
      initData: {}, // 初始值
      unit: {
        type: String,
        default: ''
      }, // 单位
      verify: {
        type: Boolean,
        default: false
      }// 用于校验(判断是否填写了值)
    },
    data() {
      return {
        getData(cb) {
          const arr = [];
          for (let i = 0; i < 9; i++) {
            if (i === 0) {
              arr.push({
                label: '累计',
                value: 0
              });
            } else {
              arr.push({
                label: `近${i * 3}个月`,
                value: i * 3
              });
            }
          }
          cb(arr);
        },
        selectObj: {
          value: '',
          text: ''
        }, // 累计月份
        rangObj: {
          value: [],
          text: ''
        }// 区间组件
      };
    },
    beforeMount() {
      if (this.initData && Object.keys(this.initData).length !== 0) {
        const arr = Object.keys(this.initData);
        const id = this.initData[arr[0]];
        this.getData((arr) => {
          const obj = arr.find(n => n.value === id);
          this.selectObj = {
            value: obj.value,
            text: obj.label
          };
        });
        this.rangObj.value = [...this.initData[arr[1]]];
      }
    },
    methods: {
      /* 获取单选值 */
      changeData(val) {
        this.selectObj = {
          value: val.value,
          text: val.text
        };
        this.$emit('changeData', {
          value: {
            MONTH: val.value,
            RANGE: this.rangObj.value
          },
          text: `${this.selectObj.text} ${this.rangObj.text}`
        });
      },
      /* 区间值变化 */
      rangeChangeData(val) {
        this.rangObj = {
          value: [...val.value],
          text: val.text
        };
        this.$emit('changeData', {
          value: {
            MONTH: this.selectObj.value,
            RANGE: [...val.value]
          },
          text: `${this.selectObj.text} ${val.text}`
        });
      },
    },
    components: {
      dropSelect,
      range
    }
  };
</script>
