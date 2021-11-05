<!--
 * @Author: your name
 * @Date: 2021-05-22 15:03:42
 * @LastEditTime: 2021-08-23 17:59:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit  
 * @FilePath: /云雀/src/views/pages/orderCenter/addGiftItem.vue
-->

<template>
  <div class="customized-modal matchingDetails">
    <!-- <EasyMatrix :component-data="matrixData" /> -->
    <businessForm :form-config="formConfig"></businessForm>
    <!-- businessButton -->
    <OmsButton class="absolute" :btn-config="searchBtn"></OmsButton>
    <div class="foot-table">
      <Table
        :columns="columns10"
        :data="data9"
        :highlight-row="highlight"
        @on-row-click="fnrow"
      ></Table>
    </div>
    <div class="foot-page">
      <Page
        :total="total"
        show-sizer
        @on-change="onChange"
        @on-page-size-change="onSizechange"
      />
    </div>

    <OmsButton class="absolute2" :btn-config="BtnConfig"></OmsButton>
  </div>
</template>
<script>
import addGiftItem from '@/js/pages/orderCenter/addGiftItem';

export default addGiftItem;
</script>
<style lang="less">
@import '~omsTheme/public.less';
.matchingDetails {
  padding-bottom: 0px !important;
  .foot-table {
    max-height: 500px;
    overflow-y: scroll;
  }
  .foot-page {
    .ark-page {
      display: flex;
      justify-content: center;
    }
  }
  .absolute {
    top: 22px !important;
  }
}
.customized-modal {
  .absolute {
    position: absolute;
    right: 0;
    top: 3px;
  }
  .business-form-main {
    &.unFlodStyle {
      padding-right: 0;
    }
    .businessForm_a {
      .ark-row {
        .ark-col {
          // margin-top: 0;
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
