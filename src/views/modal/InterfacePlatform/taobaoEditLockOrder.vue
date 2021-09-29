<template>
  <div class="taobao-page">
    <Form :model="form" label-position="left" :label-width="100">
      <FormItem label="是否自动解锁" prop="status" :rules="{ required: true }">
        <RadioGroup v-model="form.status">
          <Radio :label="1">是</Radio>
          <Radio :label="0">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="预计解锁时间" prop="time" :rules="{ required: true, type: 'string', message: '请选择预计解锁时间', trigger: 'change' }">
        <DatePicker
          v-model="form.time"
          :options="{
            disabledDate(date) {
              return date && date.valueOf() < Date.now() - 86400000;
            },
          }"
          type="datetime"
          placeholder="请选择预计解锁时间"
          style="width: 200px"
          vModelFormat
          format="yyyy-MM-dd HH:mm:ss"
          @on-change="timeChange"
        ></DatePicker>
      </FormItem>
    </Form>
    <!-- <business-form :form-config="formConfig" /> -->
    <business-btn :btn-config="btnConfig" />
  </div>
</template>

<script>
import taobaoEditLockOrder from '@/js/modal/InterfacePlatform/taobaoEditLockOrder';

export default taobaoEditLockOrder;
</script>

<style lang="less" scoped>
@import '~@/css/modal/InterfacePlatform/taobaoEditLockOrder.less';
</style>
