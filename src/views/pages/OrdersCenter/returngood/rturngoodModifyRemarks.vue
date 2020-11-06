<template>
  <div class="bounced">
    <Form :label-width="65">
      <FormItem label="修改备注">
        <Input v-model="bouncedData.value" type="textarea" :rows="4" placeholder="请输入" />
        <RadioGroup v-model="bouncedData.animal">
          <Radio label="覆盖原备注"></Radio>
          <Radio label="追加到原备注"></Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <jordanBtn :btnConfig="btnConfig"></jordanBtn>
  </div>
</template>

<script>
  import rturngoodModifyRemarks from '@/js/pages/orderCenter/returngood/rturngoodModifyRemarks';

  export default rturngoodModifyRemarks;
</script>

<style lang="less">
  @import "~@/css/pages/orderCenter/returngood/rturngoodModifyRemarks.less";
</style>

