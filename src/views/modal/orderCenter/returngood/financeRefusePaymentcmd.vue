<template>
  <div class="refuseToPayOcBReturnAfSend">
    <div class="form">
      <Form
        :label-width="100"
        :rules="ruleValidate"
      >

        <FormItem
          label="打款结果"
          prop="reasonType"
        >
          <RadioGroup v-model="reasonType" @on-change='reasonTypeChage()'>
            <Radio label="2">打款成功</Radio>
            <Radio label="3">打款失败</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          v-if="reasonType == '2'"
          label="支付宝流水号"
          prop="reason"
        >
          <Input
            v-model="reason"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 8}"
            placeholder="请输入支付宝流水号"
          />
        </FormItem>
        <FormItem
          v-if="reasonType == '3'"
          label="打款失败/拒绝打款原因（财务备注说明）"
          prop="reason"
        >
          <Input
            v-model="reason"
            type="textarea"
            :autosize="{minRows: 4,maxRows: 8}"
            placeholder="请输入打款失败/拒绝打款原因（财务备注说明）"
          />
        </FormItem>
      </Form>
    </div>
    <div class="button">
      <business-button :btn-config="btnConfig" />
    </div>
  </div>
</template>

<script>
  import financeRefusePaymentcmd from '@/js/modal/orderCenter/returngood/financeRefusePaymentcmd';

  export default financeRefusePaymentcmd;
</script>
