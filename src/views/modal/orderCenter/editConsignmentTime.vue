<template>
  <div style="width: 440px">
    <Form ref="form" :model="form" :rules="rules" :label-width="120">
      <FormItem label="预计发货时间" prop="LATEST_OUT_TIME">
        <DatePicker
          v-model="form.LATEST_OUT_TIME"
          :format="'yyyy-MM-dd HH:mm:ss'"
          vModelFormat
          :options="timeConfig"
          type="datetime"
        />
      </FormItem>
      <FormItem label="预计到货时间" prop="ARRIVAL_TIME">
        <DatePicker
          v-model="form.ARRIVAL_TIME"
          :format="'yyyy-MM-dd HH:mm:ss'"
          vModelFormat
          :options="timeConfig"
          type="datetime"
        />
      </FormItem>
    </Form>
    <OmsButton :btn-config="buttonConfig"/>
  </div>
</template>

<script>
import editConsignmentTime from "@/js/modal/orderCenter/editConsignmentTime";

export default editConsignmentTime;
</script>

<style lang="less" scoped></style>
