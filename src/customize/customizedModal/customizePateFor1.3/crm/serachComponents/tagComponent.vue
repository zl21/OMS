<!--高级搜索贴标签组件-->
<template>
  <div class="ff-tag-component">
    <ul>
      <li
        class="ff-tag-component-add"
        @click="dialog = true"
      >
        +添加
      </li>
      <li
        v-for="(list, index) in guideTags"
        class="ff-tag-component-tag"
      >
        <span>{{ list }}</span>
        <span
          class="ff-tag-component-delete"
          @click="tagDelete(index)"
        >
          <i class="el-icon-close" />
          <i class="el-icon-circle-close" />
        </span>
      </li>
    </ul>
    <p
      v-if="verify && guideTags.length === 0"
      class="ff-advanced-search-verify"
    >
      请添加标签
    </p>
    <!--弹框-->
    <my-dialog
      v-if="dialog"
      title="选择标签"
      :visible.sync="dialog"
      :close-on-click-modal="false"
      :append-to-body="true"
      :modal-append-to-body="true"
      :show-close="true"
      size="large"
    >
      <guide-tag-pop
        :tag-lists="guideTags"
        :vip-id="VP_C_VIP_ID"
        :acc-id="VP_C_VIP_ACC_ID"
        :no-port="true"
        @tag-confirm="tagConfirm"
        @tag-cancel="tagCancel"
      />
    </my-dialog>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-tag-component {
    border: 1px solid #DEDEDE;
    overflow: hidden;
    padding: 5px;
    .ff-tag-component-add {
      float: left;
      color: #FD6442;
      border: 1px dashed;
      padding: 3px 5px;
      margin-right: 4px;
      cursor: default;
    }
    .ff-tag-component-tag {
      float: left;
      margin-right: 4px;
      padding: 3px 7px;
      background-color: #F5F6FA;
    }
    .ff-tag-component-delete {
      margin-left: 3px;
      cursor: pointer;
      color: #CCC;
      .el-icon-circle-close {
        display: none;
        color: #EC0D0D;
      }
      &:hover {
        .el-icon-close {
          display: none;
        }
        .el-icon-circle-close {
          display: inherit;
        }
      }
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  import MyDialog from 'framework/components/dialog/mydialog.vue';
  import guideTagPop from '../guideTagPop.vue';

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
        dialog: false,
        guideTags: [],
        VP_C_VIP_ID: 55,
        VP_C_VIP_ACC_ID: 17
      };
    },
    mounted() {
      if (this.initData && this.initData.length !== 0) {
        this.guideTags = [...this.initData];
      }
    },
    components: {
      guideTagPop,
      MyDialog
    },
    methods: {
      /* 添加标签 */
      tagConfirm(arr) {
        const val = arr.slice();
        this.guideTags = val;
        this.$emit('changeData', {
          value: val,
          text: val.join('、')
        });
        this.dialog = false;
      },
      /* 关闭弹框 */
      tagCancel() {
        this.dialog = false;
      },
      /* 删除单个标签 */
      tagDelete(index) {
        this.guideTags.splice(index, 1);
        const arr = this.guideTags.slice();
        this.$emit('changeData', {
          value: arr,
          text: arr.join('、')
        });
      },
    }
  };
</script>
