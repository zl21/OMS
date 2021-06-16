<!--
 * @Author: your name
 * @Date: 2021-05-22 15:03:42
 * @LastEditTime: 2021-06-15 14:22:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: /云雀/src/views/pages/orderCenter/addGiftItem.vue
-->

<template>
  <div class="customized-modal">
    <!-- <EasyMatrix :component-data="matrixData" /> -->
    <businessForm :form-config="formConfig"></businessForm>
    <!-- businessButton -->
    <businessButton class="absolute" :btn-config="searchBtn"></businessButton>
    <div class="foot-table">
      <Table :columns="columns10" :data="data9" :highlight-row="highlight" @on-row-click="fnrow" @on-expand="expand"></Table>
    </div>
    <div class="foot-page">
      <Page :total="total" show-sizer  @on-change="onChange" @on-page-size-change="onSizechange"/>
    </div>

    <businessButton class="absolute2" :btn-config="BtnConfig"></businessButton>
  </div>
</template>
<script>
import addGiftItem from '@/js/pages/orderCenter/addGiftItem';

export default addGiftItem;
</script>
<style lang="less">
@import '~omsTheme/public.less';
.customized-modal {
  .absolute {
    position: absolute;
    right: 0;
    top: 3px;
    margin-top: 43px;
  }
  .orderManageEdit {
    &.unFlodStyle {
      padding-right: 0;
    }
    .businessForm_a {
      .ark-row {
        .ark-col {
          margin-top: 0;
        }
      }
    }
  }
  .jordan-table-box {
    margin-top: @base-mr;
  }
  .foot-table {
    margin-top: 15px;
  }
  .foot-page {
    margin-top: 15px;
  }
}
</style>
