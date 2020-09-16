<template>
  <div class="ff-drop-down-component">
    <table-obj
      :class="{'ff-drop-down--table' : hasClass}"
      :search="item"
      :search-component="true"
      :chinese-dictionary="ChineseDictionary"
      @changeQuery="changeQuery"
    />
  </div>
</template>
<style lang="less" type="text/less">
  .ff-drop-down-component {
    .tableobj .el-input-group__append .iconDelete {
      display: none;
      cursor: pointer;
      box-sizing: border-box;
      background: #918f8f;
      color: white;
      line-height: 30px;
      height: 30px;
      margin-right: 0;
      border-radius: 4px;
    }
    .el-input-group--append .el-input__inner {
      line-height: 28px;
      height: 28px;
      border-radius: 4px;
      border-right: none;
      color: #575757;
      border-color: #dcdfe6;
      background-color: #fff;
    }
    .el-autocomplete{
      &:hover {
        .el-input-group__append, .el-input-group--append .el-input__inner {
          border-color: #c0c4cc;
        }
      }
      .el-input-group--append .el-input__inner:focus {
        border-color: #409EFF;
      }
    }
    .el-input-group--append .el-input__inner:focus + .el-input-group__append{
      border-color: #409EFF;
    }
    .tableobj .el-input-group__append i {
      margin-right: 4px;
    }
    .el-input-group__append {
      position: absolute;
      top: 0;
      right: 0;
      height: 28px;
      line-height: 28px;
      box-sizing: border-box;
      overflow: hidden;
      background-color: #fff;
      text-align: right;
      border-radius: 4px;
      padding: 0;
      width: 45px;
      color: #0f8ee9;
      transition: border-color .2s cubic-bezier(.645,.045,.355,1);
      border-left: none;
    }
    .ff-drop-down-component:hover {
      .el-autocomplete .el-input-group--append .el-input__inner {
        background-color: rgba(0,0,0,.1);
      }
      .el-input-group__append .iconDelete {
        display: inline-block;
      }
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  import tableObj from 'framework/components/element/tableobj.vue';
  import ChineseDictionary from '@/assets/js/ChineseDictionary.js';

  export default {
    props: {
      initData: {}, // 初始值
      search: {}, // 弹框多选和单选的参数
    },
    data() {
      return {
        hasClass: false, // 有值时input鼠标放上去时的阴影显示
        item: this.search,
        ChineseDictionary: '',
        show: false
      };
    },
    methods: {
      changeQuery(obj, str) {
        let value = []; let 
          text = '';
        if (obj[this.search.colname]) {
          value = obj[this.search.colname];
          text = str;
          this.hasClass = true;
        } else {
          this.hasClass = false;
        }
        this.$emit('changeData', {
          value,
          text,
        });
      },
    },
    mounted() {
      if (this.initData) {
        this.hasClass = true;
        this.search.default = this.initData;
      }
      /* this.$nextTick(() => {
        this.show = true;
      }) */
    },
    created() {
      this.ChineseDictionary = ChineseDictionary;
    },
    components: {
      tableObj
    }
  };
</script>
