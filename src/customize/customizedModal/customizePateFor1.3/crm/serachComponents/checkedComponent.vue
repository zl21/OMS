<!--高级搜索多选组件-->
<template>
  <div class="ff-checked-component">
    <el-checkbox-group
      v-model="checked"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox
        v-for="(list, index) in lists"
        :key="index"
        :label="list.value"
      >
        {{ list.label }}
      </el-checkbox>
    </el-checkbox-group>
    <p
      v-if="verify && checked.length === 0"
      class="ff-advanced-search-verify"
    >
      请选择一种或多种
    </p>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-checked-component {

  }
</style>
<script>
  import $http from 'framework/__utils__/request';

  export default {
    props: {
      initData: {}, // 初始值
      lists: {
        type: Array,
        default: () => []
      }, // 值列表
      verify: {
        type: Boolean,
        default: false
      }// 用于校验(判断是否填写了值)
    },
    data() {
      return {
        checked: []
      };
    },
    mounted() {
      if (this.initData && this.initData.length !== 0) {
        this.checked = [...this.initData];
      }
    },
    methods: {
      handleCheckedCitiesChange(val) {
        const data = [];
        const label = [];
        val.map((obj) => {
          data.push(obj);
          const checked = this.lists.find(n => n.value === obj);
          label.push(checked.label);
        });
        this.$emit('changeData', {
          value: data,
          text: label.join(',')
        });
      }
    }
  };
</script>
