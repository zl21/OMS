<template>
  <div class="jordanModal--">
    <Form :label-width="80" :model="formItem">
      <!-- <FormItem label="旗帜:"> -->
      <FormItem :label="vmI18n.t('table_label.flag')">
        <RadioGroup @on-change="radioChange" v-model="formItem.flag">
          <Radio :label="index" v-for="index of 5" :key="index">
            <img :src="'@/assets/image/img/' + index + '.png'" alt />
          </Radio>
        </RadioGroup>
      </FormItem>
      <!-- <FormItem label="当前备注:" v-if="componentData.SELLER_MEMO"> -->
      <FormItem
        :label="vmI18n.t('form_label.current_remarks')"
        v-if="componentData.SELLER_MEMO"
      >
        <p>{{ componentData.SELLER_MEMO }}</p>
      </FormItem>
      <!-- <FormItem label="修改备注:"> -->
      <FormItem :label="vmI18n.t('form_label.modify_remarks')">
        <Input
          :autosize="{ minRows: 2, maxRows: 5 }"
          @on-change="inputChange"
          type="textarea"
          v-model="formItem.textarea"
        ></Input>
      </FormItem>
      <FormItem>
        <RadioGroup @on-change="coverRadioChange" v-model="formItem.cover">
          <!-- <Radio label="true">覆盖原备注</Radio> -->
          <Radio label="true">{{
            vmI18n.t("other.override_original_remarks")
          }}</Radio>
          <!-- <Radio label="false">追加到原备注</Radio> -->
          <Radio label="false">{{
            vmI18n.t("other.addTo_original_remarks")
          }}</Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <businessButton :btnConfig="btnConfig"></businessButton>
    <Modal
      :mask="true"
      :z-index="2600"
      @on-keydown="onKeydownModal"
      @on-ok="ok"
      title="提示"
      v-model="confirmModal"
      width="300"
    >
      <!-- <p>是否确认修改备注！</p> -->
      <p>{{ vmI18n.t("modalTips.zh") }}</p>
    </Modal>
  </div>
</template>
<script>
  import changeRemark from "@/js/modal/orderCenter/changeRemark";
  export default changeRemark;
</script>

<style lang='less'>
  /* radio框样式调整 */
  @import "~@/css/modal/orderCenter/changeRemark.less";
</style>
