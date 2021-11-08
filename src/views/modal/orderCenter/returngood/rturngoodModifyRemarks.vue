<!--
 * @Author: your name
 * @Date: 2021-11-05 15:08:58
 * @LastEditTime: 2021-11-08 15:40:27
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /burgeon-project-logic/src/views/modal/orderCenter/returngood/rturngoodModifyRemarks.vue
-->
<template>
  <div class="modifyRemark customized-modal">
    <Form :label-width="80" :model="bouncedData" :rules="ruleValidate">
      <FormItem label="单据备注"  prop="value">
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
    <OmsButton  class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
  import rturngoodModifyRemarks from '@/js/modal/orderCenter/returngood/rturngoodModifyRemarks';

  export default rturngoodModifyRemarks;
</script>

<style lang="less">
  @import "~@/css/pages/orderCenter/returngood/rturngoodModifyRemarks.less";
</style>
