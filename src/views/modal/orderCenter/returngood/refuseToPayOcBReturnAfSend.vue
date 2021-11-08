<template>
  <div class="refuseToPayOcBReturnAfSend">
    <div class="form">
      <Form
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem
          label="拒绝打款原因"
          prop="reason"
        >
          <Input
            v-model="reason"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 8}"
            placeholder="请输入拒绝打款原因"
          />
        </FormItem>
      </Form>
    </div>
    <div class="button">
      <OmsButton :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import refuseToPayOcBReturnAfSend from '@/js/modal/orderCenter/returngood/refuseToPayOcBReturnAfSend';

  export default refuseToPayOcBReturnAfSend;
</script>
