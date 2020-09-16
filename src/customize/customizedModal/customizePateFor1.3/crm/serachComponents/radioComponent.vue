<!--高级搜索单选框组件-->
<template>
  <div class="ff-radio-component">
    <el-radio-group v-model="radio">
      <el-radio
        v-for="(list, index) in lists"
        :key="list.value"
        size="mini"
        :label="list.value"
      >
        {{ list.label }}
      </el-radio>
    </el-radio-group>
  </div>
</template>
<style lang="less" type="text/less">
  .ff-radio-component {
    .el-radio__inner {
      width: 12px;
      height: 12px;
    }
    .el-radio__input.is-checked .el-radio__inner {
      width: 12px;
      height: 12px;
      background: #fff;
      &::after {
        background: #409EFF;
        width: 7px;
        height: 7px;
      }
    }
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
      }
    },
    watch: {
      radio(val) {
        const obj = this.lists.find(n => n.value === val);
        this.$emit('changeData', {
          value: obj.value,
          text: obj.label
        });
      },
    },
    data() {
      return {
        radio: ''
      };
    },
    mounted() {
      if (this.initData) {
        this.radio = this.initData;// 初始化
      } else {
        this.radio = this.lists[0].value;
      }
    },
  };
</script>
