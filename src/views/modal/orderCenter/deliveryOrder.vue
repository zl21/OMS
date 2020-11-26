<template>
  <div style="width: 400px; padding-right: 20px">
    <businessForm :form-config="formConfig" />
    <!-- <Form
      :label-width="120"
    >
      <FormItem label="出仓单">
        <DropDownSelectFilter
          :single="true"
          :data="datas"
          :auto-data="autoData"
          :columns="columns"
          @on-fkrp-selected="fkrpSelected"
          @on-input-value-change="inputValueChange"
        />
      </FormItem>
    </Form> -->
    <jordanBtn :btn-config="btnConfig" />
  </div>
</template>

<script>
  import deliveryOrder from '@/js/modal/orderCenter/deliveryOrder';

  export default deliveryOrder;
</script>
<style lang="less" scoped></style>
