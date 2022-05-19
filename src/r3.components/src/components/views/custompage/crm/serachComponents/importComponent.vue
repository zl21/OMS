<!--高级搜索导入组件-->
<template>
  <div class="ff-import-component">
    <button class="ff-import--button-component">
      <span
        class="ff-import--button-text"
        @click="importTable"
      >{{$t('buttons.import')}}</span>
    </button>
    <span>{{$t('searchComponent.matchedMatch',{num: count})}}</span>
    <p
      v-if="verify && count === 0"
      class="ff-advanced-search-verify"
    >
      {{$t('searchComponent.pleaseImport')}}{{ title }}
    </p>
    <!-- 导入提示 -->
    <import-dialog
      v-if="dialog"
      :visible="dialog"
      :title="title"
      :is-card="isCard"
      :is-mobil="isMobil"
      :append-to-body="false"
      :modal-append-to-body="false"
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
    color: #fd6442;
    border: 1px solid;
    &:hover {
      color: rgba(253, 100, 66, 0.6);
    }
  }
}
</style>
<script>
  import $http from '../../../../../__utils__/request';
  import ImportDialog from '../../../../tablelist/importDialog.vue';
  import i18n from '../../../../../assets/js/i18n'

  export default {
    name: 'importComponent',
    props: {
      initData: {}, // 初始值
      label: {
        type: String,
        default: function() { return this.$t('advancedSearch.cardNumber')}
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
        title: this.$t('advancedSearch.cardNumber'),
        isMobil: false, // 手机号导入
        isCard: false// 卡号导入
      };
    },

    beforeCreate() {
      this.$t = i18n.t.bind(i18n)
    },

    mounted() {
      this.title = this.label;
      if (this.label === this.$t('advancedSearch.cardNumber')) {
        this.isCard = true;
      } else if (this.label === this.$t('tips.phone')) {
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
        this.$message.success(this.$t('searchComponent.importSuccess',{msg: val.length}));
        if (val && val.length !== 0) {
          this.$emit('changeData', {
            value: [...val],
            text: this.$t('searchComponent.importSuccess',{msg: `${this.label}${val.length}`})
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
