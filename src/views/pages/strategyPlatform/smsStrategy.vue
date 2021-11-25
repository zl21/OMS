<template>
  <div class="wphemail">
    <Form :label-width="80">
      <FormItem label="插入字段：" class="mailFormItem">
        <ul>
          <li v-for="(row, index) of lists" :key="index">
            <a @click="row.click">{{ row.label }}</a>
          </li>
        </ul>
      </FormItem>
      <!-- <FormItem label="标题：" class="mailFormItem" style="width:25%;">
        <Input v-model="saveObj.MAIL_TITLE" placeholder="JIT订单下发通知" />
      </FormItem>-->
      <FormItem label="内容：" class="mailFormItem">
        <div class="item-area">
          <component
            :is="currentView"
            :ref="currentView + `${this.objid}`"
            :storage-item="storageItem"
            :itemdata="itemdata"
            :tab-action="!modify"
            @getChangeItem="getChangeItem"
          />
        </div>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import smsStrategy from '@/js/pages/strategyPlatform/smsStrategy';

export default smsStrategy;
</script>
<style  lang='less'  scoped>
@import "~@/css/pages/strategyPlatform/smsStrategy.less";
</style>
