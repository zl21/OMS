<!--高级搜索导入组件-->
<template>
  <div class="ff-import-component">
    <button class="ff-import--button-component">
      <span
        class="ff-import--button-text"
        @click="importTable"
      >导入</span>
    </button>
    <span>已匹配到{{ count }}位会员</span>
    <p
      v-if="verify && count === 0"
      class="ff-advanced-search-verify"
    >
      请导入{{ title }}
    </p>
    <!-- 导入提示 -->
    <import-dialog
      v-if="dialog"
      :visible="dialog"
      :title="title"
      :is-card="isCard"
      :is-mobil="isMobil"
      :append-to-body="true"
      :modal-append-to-body="true"
      @searchClose="searchClose"
      @searchImport="searchImport"
    />
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-import-component {
    display: flex;
    align-items: center;
    .ff-import--button-component {
      margin-right: 10px;
      padding: 5px 8px;
      background-color: #fff;
      border-radius: 2px;
      color: #FD6442;
      border: 1px solid;
      &:hover {
        color: rgba(253, 100, 66, .6);
      }
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  import ImportDialog from 'framework/components/tablelist/importDialog';

  export default {
    props: {
      initData: {}, // 初始值
      label: {
        type: String,
        default: '会员卡号'
      },
      verify: {
        type: Boolean,
        default: false
      }// 用于校验(判断是否填写了值)
    },
    data() {
      return {
        count: 0,
        dialog: false, // 控制导入弹框
        title: '会员卡号',
        isMobil: false, // 手机号导入
        isCard: false// 卡号导入
      };
    },
    mounted() {
      this.title = this.label;
      if (this.label === '会员卡号') {
        this.isCard = true;
      } else if (this.label === '手机号') {
        this.isMobil = true;
      }
      if (this.initData && this.initData.length !== 0) {
        this.count = this.initData.length;
      }
    },
    methods: {
      importTable() {
        this.dialog = true;
      },
      searchClose() {
        this.$nextTick(() => {
          this.dialog = false;
        });
      },
      /* 获取导入成功的数据 */
      searchImport(val) {
        this.$message.success(`导入成功${val.length}位`);
        if (val && val.length !== 0) {
          this.$emit('changeData', {
            value: [...val],
            text: `导入成功${this.label}${val.length}位`
          });
          this.count = val.length;
        } else {
          this.$emit('clearData', {
            value: [],
            text: ''
          });
          this.count = 0;
        }
      }
    },
    components: {
      ImportDialog
    }
  };
</script>
