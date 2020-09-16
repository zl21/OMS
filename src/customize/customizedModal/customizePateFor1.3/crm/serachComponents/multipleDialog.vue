<!--高级搜索多选弹框组件-->
<template>
  <div class="ff-multiple-dialog">
    <table-obj
      :class="{'ff-multiple-dialog-table' : hasClass}"
      :search="search"
      :search-component="true"
      :chinese-dictionary="ChineseDictionary"
      @changeQuery="changeQuery"
    />
    <p
      v-if="verify && !hasClass"
      class="ff-advanced-search-verify"
    >
      请填写完整
    </p>
  </div>
</template>
<style lang="less" type="text/less">
  .ff-multiple-dialog {
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
    .ff-multiple-dialog-table:hover {
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
      verify: {
        type: Boolean,
        default: false
      }// 用于校验(判断是否填写了值)
    },
    data() {
      return {
        hasClass: false, // 有值时input鼠标放上去时的阴影显示
        search: {
          coldesc: '开卡店仓',
          colname: 'CP_C_STORE_ID',
          isuppercase: false,
          display: 'OBJ_FK',
          colid: 158776,
          inputname: 'CP_C_STORE_ID:MIXNAME',
          fkobj: {
            reftable: 'CP_C_RSTORE',
            fkdisplay: 'drp',
            reftableid: 23446,
            url: '',
            option: null,
            searchmodel: 'mop'
          },
          default: ''// 默认值
        },
        ChineseDictionary: '',
      };
    },
    mounted() {
      this.search.fkobj.rightList = this.initData;
      if (this.initData) {
        this.hasClass = true;
        this.search.default = `已选中${JSON.parse(this.initData).total}条`;
      }
    },
    methods: {
      changeQuery(obj, str, data) {
        let value = []; let 
          text = '';
        if (obj.CP_C_STORE_ID) {
          value = obj.CP_C_STORE_ID;
          this.hasClass = true;
          text = str;
          /* if(data) {
            let string = JSON.parse(data).lists.result.map(dat => data.screen_string);
            text = string;
          }else {
            text = str;
          } */
        } else {
          this.hasClass = false;
        }
        this.$emit('changeData', {
          value,
          text,
          multipleData: data || ''
        });
      },
    },
    created() {
      this.ChineseDictionary = ChineseDictionary;
    },
    components: {
      tableObj
    }
  };
</script>
