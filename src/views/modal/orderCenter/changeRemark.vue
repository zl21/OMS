<!--
 * @Author: your name
 * @Date: 2021-04-28 15:12:49
 * @LastEditTime: 2021-08-19 16:52:58
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /project-logic/views/modal/orderCenter/changeRemark.vue
-->
<template>
  <div class="jordanModal-- cus-modal">
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
      <FormItem :label="$it('tL.flag')">
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
              :src="require(`assetsImg/flagImgs/${index}.png`)"
              alt
            >
          </Radio>
        </RadioGroup>
      </FormItem>
      <!-- <FormItem label="当前备注:" v-if="componentData.SELLER_MEMO"> -->
      <FormItem
        v-if="componentData.SELLER_MEMO"
        :label="$it('fL.current_remarks')"
      >
        <p>{{ componentData.SELLER_MEMO }}</p>
      </FormItem>
      <!-- <FormItem label="修改备注:"> -->
      <FormItem :label="$it('fL.modify_remarks')">
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
          <Radio :label='1'>
            {{
              $it("other.override_original_remarks")
            }}
          </Radio>
          <!-- <Radio label="false">追加到原备注</Radio> -->
          <Radio :label='0'>
            {{
              $it("other.addTo_original_remarks")
            }}
          </Radio>
        </RadioGroup>
      </FormItem>
    </Form>
    <OmsButton
      class="modalBth modal-footer"
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
      <p>{{ $it("tip.zh") }}</p>
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
