<!-- table表格中使用的input -->
<template>
  <div class="tableInput">
    <Form :label-width="100"
          style="width:100%"
          :model="tableFormConfig.formValue"
          onsubmit="return false;">
      <Row>
        <Col v-for="(item , index) in tableFormConfig.formData"
             :key="index"
             :span="item.width">
        <!-- 日期選擇 -->
        <FormItem v-if="item.style === 'date'"
                  :prop="item.value">
          <DatePicker :disabled="item.disabled"
                      :type="'date'"
                      split-panels
                      :placeholder="item.placeholder"
                      v-model="item.value"
                      :format="item.format"
                      :clearable="item.clearable"
                      :transfer="true"
                      @on-change="runMethods(item.onChange(item.value))"></DatePicker>
        </FormItem>

        <!-- 時間選擇 -->
        <FormItem v-if="item.style === 'dateTime'"
                  :prop="item.value">
          <TimePicker :disabled="item.disabled"
                      :type="item.type?item.type:'time'"
                      split-panels
                      :placeholder="item.placeholder"
                      v-model="item.value"
                      :format="item.format"
                      :clearable="item.clearable"
                      :transfer="true"
                      @on-change="dateTimeChange(item.dataTimeChange(item.value))"></TimePicker>
        </FormItem>

        <!-- 输入框弹框单多选 -->
        <FormItem v-if="item.style === 'popInput'"
                  class="popInput">
          <my-input :isActive="true"
                    :isDisabled="false"
                    :inputList="item.inputList?item.inputList:[]"
                    :objList="item.objList?item.objList:[]"
                    :itemdata="item.itemdata"
                    @getFkChooseItem="runMethods(item.tableObj(item.itemdata))"></my-input>
        </FormItem>

        <!-- 下拉选择 -->
        <FormItem v-if="item.style === 'select'"
                  class="popSelect"
                  :prop="item.value">
          <Select @on-change="runMethods(item.selectChange($event))"
                  v-model="item.value"
                  :multiple="item.multiple?item.multiple:false"
                  :disabled="item.disabled"
                  :transfer="true"
                  :placeholder="item.placeholder ? item.placeholder : ''"
                  :clearable="item.clearable"
                  @on-clear="runMethods(item.clearSelect(item.value))">
            <Option v-for="(option , index) in item.options"
                    :key="index"
                    :value="option.value">{{option.label}}</Option>
          </Select>
        </FormItem>

        <!-- 单选框 -->
        <FormItem v-if="item.style === 'checkbox'"
                  :prop="item.value">
          <Checkbox v-model="item.value"
                    :type="'checkbox'"
                    @on-change="runMethods(item.radioChange(item.value))"></Checkbox>
        </FormItem>
        </Col>
      </Row>
    </Form>
  </div>
</template>

<script>
import businessTableInput from './js/businessTableInput.js';
export default businessTableInput;
</script>

<style lang='less'>
@import "css/businessTableInput.less";
</style>

