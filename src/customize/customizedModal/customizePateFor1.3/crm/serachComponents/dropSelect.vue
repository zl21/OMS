<!--高级搜索下拉单选和多选组件-->
<template>
  <div class="ff-drop-select-component">
    <el-select
      v-model="value"
      placeholder="请选择"
      :multiple="multiple"
      size="mini"
      class="ff-drop--el-select"
      @change="valChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
    <p
      v-if="verify && (multiple? value.length === 0 : value === '')"
      class="ff-advanced-search-verify"
    >
      请选择{{ multiple? '多个或' : '' }}一个
    </p>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-drop-select-component {
    display: inline-block;
    .ff-drop--el-select {
      width: 100%;
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';

  export default {
    props: {
      initData: {}, // 初始值
      getData: {
        type: Function,
        default: () => {}
      }, // 获取列表数据
      multiple: {
        type: Boolean,
        default: false
      }, // 多选
      other: {
        type: String,
        default: ''
      }, // 用于联动
      verify: {
        type: Boolean,
        default: false
      }// 用于校验(判断是否填写了值)
    },
    data() {
      return {
        options: [],
        value: this.multiple ? [] : ''
      };
    },
    watch: {
      /* 用于联动类型的，类型变重新获取等级数据 */
      other() {
        this.value = this.multiple ? [] : '';
        this.$emit('changeData', {
          value: this.multiple ? [] : '',
          text: ''
        });
        this.getData((val) => {
          this.options = val;
        });
      }
    },
    methods: {
      valChange(val) {
        if (this.multiple) {
          const value = []; const 
            label = [];
          val.map((obj) => {
            value.push(obj.value);
            label.push(obj.label);
          });
          this.$emit('changeData', {
            value,
            text: label.join(',')
          });
        } else {
          this.$emit('changeData', {
            value: val.value,
            text: val.label
          });
        }
      },
    },
    mounted() {
      this.getData((val) => {
        this.options = val;
        if (this.multiple) {
          if (this.initData && this.initData !== 0) {
            this.initData.map((obj) => {
              const data = val.find(n => n.value === obj);
              this.value.push(Object.assign({}, data));
            });
          }
        } else if (this.initData) this.value = this.options.find(n => n.value === this.initData);
      });
    }
  };
</script>
