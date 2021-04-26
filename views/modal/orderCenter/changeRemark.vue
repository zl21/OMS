<template>
  <div class="jordanModal--">
    <Spin
      v-if="spinShow"
      size="large"
      fix
    />
    <Form
      :label-width="80"
      :model="formItem"
    >
      <!-- <FormItem label="旗帜:"> -->
      <FormItem :label="vmI18n.t('table_label.flag')">
        <RadioGroup
          v-model="formItem.flag"
          @on-change="radioChange"
        >
          <Radio
            v-for="index of 5"
            :key="index"
            :label="index"
          >
            <img
              :src="require(`@/assets/img/flagImgs/${index}.png`)"
              alt
            >
          </Radio>
        </RadioGroup>
      </FormItem>
      <!-- <FormItem label="当前备注:" v-if="componentData.SELLER_MEMO"> -->
      <FormItem
        v-if="componentData.SELLER_MEMO"
        :label="vmI18n.t('form_label.current_remarks')"
      >
        <p>{{ componentData.SELLER_MEMO }}</p>
      </FormItem>
      <!-- <FormItem label="修改备注:"> -->
      <FormItem :label="vmI18n.t('form_label.modify_remarks')">
        <Input
          v-model="formItem.textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          type="textarea"
          @on-change="inputChange"
        /></Input>
      </FormItem>
      <FormItem>
        <RadioGroup
          v-model="formItem.cover"
          @on-change="coverRadioChange"
        >
          <!-- <Radio label="true">覆盖原备注</Radio> -->
          <Radio label="true">
            {{
              vmI18n.t("other.override_original_remarks")
            }}
          </Radio>
          <!-- <Radio label="false">追加到原备注</Radio> -->
          <Radio label="false">
            {{
              vmI18n.t("other.addTo_original_remarks")
            }}
          </Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <businessButton
      class="modalBth"
      :btn-config="btnConfig"
    />
    <Modal
      v-model="confirmModal"
      :mask="true"
      :z-index="2600"
      title="提示"
      width="300"
      @on-keydown="onKeydownModal"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <!-- <p>是否确认修改备注！</p> -->
      <p>{{ vmI18n.t("modalTips.zh") }}</p>
    </Modal>
  </div>
</template>
<script>
  import changeRemark from '@/js/modal/orderCenter/changeRemark';

  export default changeRemark;
</script>

<style lang='less'>
/* radio框样式调整 */
@import '~@/css/modal/orderCenter/changeRemark.less';
</style>
