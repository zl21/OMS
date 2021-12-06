<template>
  <div class="refuseToPayOcBReturnAfSend">
    <div class="form">
      <Form
        :label-width="100"
        :rules="ruleValidate"
      >
        <FormItem
          :label="$it('fL.ea')"
          prop="reason"
        >
          <Input
            v-model="reason"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 8}"
            :placeholder="$it('pH.aa')"
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
