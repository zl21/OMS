<template>
  <div style="width: 400px; padding-right: 20px">
<!--    <businessForm :form-config="formConfig" />-->
    <Form
      :label-width="120"
    >
      <FormItem label="唯品会入库单">
        <DropDownSelectFilter
          :single="true"
          :data="datas"
          :total-row-count="totalRowCount"
          :page-size="pageSize"
          :auto-data="autoData"
          :columns="columns"
          :columnsKey="columnsKey"
          :hidecolumns="hidecolumns"
          :dataEmptyMessage="dataEmptyMessage"
          @on-popper-show="onPoperShow"
          @on-page-change="onPageChange"
          @on-fkrp-selected="fkrpSelected"
          @on-input-value-change="inputValueChange"
        />
      </FormItem>
    </Form>
    <businessButton :btn-config="btnConfig" />
  </div>
</template>

<script>
  import deliveryOrder from '@/js/modal/orderCenter/deliveryOrder';

  export default deliveryOrder;
</script>
<style lang="less" scoped></style>
