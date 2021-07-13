<template>
  <div class="modifyRemark customized-modal">
    <Form :label-width="80" :model="bouncedData" :rules="ruleValidate">
      <FormItem label="修改备注"  prop="value">
        <Input
          v-model="bouncedData.value"
          type="textarea"
          :rows="4"
          placeholder="请输入"
        />
      </FormItem>
      <FormItem>
        <RadioGroup v-model="bouncedData.animal">
          <Radio label="覆盖原备注" />
          <Radio label="追加到原备注" />
        </RadioGroup>
      </FormItem>
    </Form>
    <jordanBtn  class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import rturngoodModifyRemarks from '@/js/modal/orderCenter/returngood/rturngoodModifyRemarks';

  export default rturngoodModifyRemarks;
</script>

<style lang="less">
  @import "~@/css/pages/orderCenter/returngood/rturngoodModifyRemarks.less";
</style>
