<!--
 * @Author: your name
 * @Date: 2021-05-07 15:56:09
 * @LastEditTime: 2021-08-06 11:25:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/orderCenter/addGiftItem.vue
-->
<!--增加赠品-->
<template>
  <div class="customized-modal">
    <!-- <EasyMatrix :component-data="matrixData" /> -->
    <businessForm :form-config="formConfig"></businessForm>
    <!-- businessButton -->
    <businessButton class="absolute" :btn-config="searchBtn"></businessButton>
    <businessActionTable
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @table-delete-detail="tableDeleteDetail"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <businessButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>
<script>
  import addGiftItem from '@/js/modal/orderCenter/addGiftItem';

  export default addGiftItem;
</script>
<style lang="less">
@import '~omsTheme/public.less';
.customized-modal{
  .absolute{
    position:absolute;
    right: 0;
    top: 3px;
  }
  .orderManageEdit{
    &.unFlodStyle{
      padding-right:0;
    }
    .businessForm_a{
      .ark-row{
        .ark-col{
          // margin-top: 0;
        }
      }
    }
  }
  .jordan-table-box{
    margin-top: @base-mr;
  }
}
</style>
