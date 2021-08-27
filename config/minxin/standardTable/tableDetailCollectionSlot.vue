<!--
 * @Author: your name
 * @Date: 2021-06-18 10:08:27
 * @LastEditTime: 2021-08-27 10:41:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-standard-product/src/config/minxin/tableDetailCollectionSlot.vue
-->
<template>
  <div class="detail-top">
    <!-- button + 搜索 -->
    <div class="detail-operation">
      <slot name="detail-buttons"></slot>
      <slot name="detail-search"></slot>
    </div>
    <!-- 表格 -->
    <slot name="detail-table"></slot>
    <!-- 翻页 -->
    <div class="detail-content">
      <slot name="detail-page"></slot>
    </div>
    <!-- 左右结果展示查询结果 -->
    <slot name="detail-queryCondition"></slot>
  </div>
</template>
<script>
export default {
  mounted() {},
};
</script>
<style lang="less" scoped>
@import "~@burgeon/oms-theme/skin/public.less";
.TableDetailCollection {
  .detail-operation {
    /deep/ .detail-buttons .ark-btn-primary {
      margin-right: 0;
    }
    .detail-buttons a {
      padding: 10px 8px 10px 0;
    }

    .detail-search {
      padding-right: 16px;
      /deep/ .ark-select-single .ark-select-selection {
        height: 32px;
        .ark-select-selected-value {
          height: 32px;
          line-height: 32px;
        }
      }
      .detail-search-input {
        /deep/ .ark-input {
          height: 32px;
        }
        /deep/ .ark-input-group-prepend .ark-btn span {
          bottom: 0;
        }
        /deep/ .ark-input-icon {
          height: 32px;
          line-height: 32px;
        }
      }
    }
  }
  
  .detail-buttons .ark-btn-primary {
    margin-right: 0;
  }
  .detail-content {
    height: 40px;
    #bundle > .flex(@justify:center,@align:center);
  }
  .detail-operation {
    #bundle > .flex(@justify:space-between,@align:center);
    // margin-bottom: @base-mr;
  }
}
</style>
