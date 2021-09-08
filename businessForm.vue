<!-- 开发文档：http://knowledge.ark.burgeononline.com/repository#/entryComponents/2/749649/1/2061 -->
<template>
<!-- orderManagEdit -->
  <div class="business-form-main"
       :ref="formConfig.flodClick">

    <div class="imgRight"
         v-if="formConfig.img &&  formConfig.img.type === 'imgRight'">
      <img :width="formConfig.img.width"
           :height="formConfig.img.height"
           :src="formConfig.img.url"
           alt="">
    </div>
  <!-- businessForm_a -->
    <Form class="businessForm"
          :label-width="95"
          style="width:100%"
          ref="businessForm_a"
          :model="formConfig.formValue"
          :rules="formConfig.ruleValidate"
          onsubmit="return false;">

      <Row>
        <Col v-for="(item , index) in formConfig.formData"
             :key=index
             :xs="formConfig.gridBar ? 8 : formConfig.colSpan"
             :sm="formConfig.gridBar ? 8 : formConfig.colSpan"
             :md="formConfig.gridBar ? 6 : formConfig.colSpan" 
             :lg="formConfig.gridBar ? 6 : formConfig.colSpan"
             :span='item.width || formConfig.colSpan || "6"'
             v-if="item.style">
        <template v-if="item.style !== ''">
          <FormItem :label="`${item.label}`+ ':'"
                    :title="item.label"
                    v-if="item.style === 'input'"
                    :prop="item.value || item.colname"
                    :class="item.class || ''">
            <!-- 输入框 -->
            <!-- <Input @on-click="iconclick(item.iconclick)" @on-enter="keyDown(item.inputenter)" :icon="item.icon" v-model="item.value || item.colname" :placeholder="item.placeholder ? item.placeholder : ''"></Input> -->
            <Input :autocomplete='item.autocomplete ? item.autocomplete : "new-password"'
                   :disabled='item.disabled||item.readonly'
                   :type="item.type"
                   @on-click="runMethods(item.iconclick)"
                   @on-enter="runMethods(item.inputenter)"
                   :icon="item.disabled?'':item.icon"
                   v-model.trim="formConfig.formValue[`${item.value || item.colname}`]"
                   :placeholder="item.placeholder ? item.placeholder : ''"
                   :element-id='item.id'
                   :regx="item.regx"
                   :maxlength="item.maxlength"
                   @on-blur="runMethods(item.inputblur)"
                   @on-focus="runMethods(item.inputFocus ? item.inputFocus() : '')"
                   @on-change="runMethods(item.inputChange ? item.inputChange() : '')"></Input>
            <!-- 输入框图标 -->
            <!-- <Icon v-if="item.icon" :type="item.icon" /> -->
          </FormItem>
          <!-- 文本框 -->
          <FormItem :label="`${item.label}`+ ':'"
                    :title="item.label"
                    v-if="item.style === 'textarea'"
                    :class="item.class || ''"
                    :prop="item.value || item.colname">
            <Input v-model="formConfig.formValue[`${item.value || item.colname}`]"
                   :disabled='item.disabled'
                   :type="item.style"
                   :maxlength="item.maxlength"
                   :autosize="item.autosize ? item.autosize : {minRows: 2,maxRows: 5}"
                   :placeholder="item.placeholder ? item.placeholder : ''" 
                   @on-enter="runMethods(item.inputenter)"
                   @on-blur="runMethods(item.inputblur)"
                   @on-change="runMethods(item.inputChange ? item.inputChange() : '')"/>
          </FormItem>
          <!-- select 下拉框 -->
          <FormItem :label="`${item.label}`+ ':'"
                    :title="item.label"
                    v-if="item.style === 'select'"
                    :class="item.class ? `${item.class}`+' '+'popSelect' : 'popSelect'"
                    :prop="item.value || item.colname">
            <Select @on-change="(val)=>runMethods(item.selectChange ? item.selectChange(val) : '')"
                    @on-open-change="(val)=>runMethods(item.onOpenChange ? item.onOpenChange(val) : '')"
                    label-in-value
                    v-model="formConfig.formValue[`${item.value || item.colname}`]"
                    :multiple="item.multiple?item.multiple:false"
                    :disabled='item.disabled'
                    :filterable='item.filterable ? item.filterable : true'
                    :transfer='item.transfer?item.transfer:true'
                    :placeholder="item.placeholder ? item.placeholder : ''"
                    :clearable="item.clearable"
                    @on-query-change="selectInputChange"
                    @keyup.native="runMethods(item.filterable ? selectEnter(item, formConfig.formValue[`${item.value || item.colname}`], $event) : '')"
                    @on-clear="runMethods(item.clearSelect ? item.clearSelect(item.value || item.colname) : false , true)">
              <Option v-for="(option , index) in item.options"
                      :key="index"
                      :value="option.value"
                      :disabled="option.disabled">{{option.label}}</Option>
            </Select>
          </FormItem>

          <!-- 日期组件-年月日 -->
          <FormItem :label="`${item.label}`+ ':'"
                    :title="item.label"
                    v-if="item.style === 'date'"
                    :prop="item.value || item.colname"
                    :class="item.class || ''">
            <DatePicker :disabled='item.disabled'
                        :type="item.type?item.type:'date'"
                        split-panels
                        :placeholder="item.placeholder"
                        :transfer="item.transfer ? item.transfer : true"
                        v-model="formConfig.formValue[`${item.value || item.colname}`]"
                        :format="item.format"
                        :clearable="item.clearable"
                        :options="item.options"
                        :start-date="item.startDate"
                        @on-change="runMethods(item.onChange)"></DatePicker>
          </FormItem>

          <!-- 时间组件-时分秒 -->
          <FormItem :label="`${item.label}`+ ':'"
                    :title="item.label"
                    v-if="item.style === 'time'"
                    :prop="item.value || item.colname"
                    :class="item.class || ''">
            <TimePicker :disabled='item.disabled'
                        :type="item.type?item.type:'time'"
                        :placeholder="item.placeholder"
                        :placement="item.placement || 'top'"
                        v-model="formConfig.formValue[`${item.value || item.colname}`]"
                        :format="item.format"
                        :clearable="item.clearable"
                        :disabled-hours="item.disabledHours || []"
                        :disabled-minutes="item.disabledMinutes || []"
                        @on-change="runMethods(item.onChange)"></TimePicker>
          </FormItem>

          <!-- 输入框弹框单多选 -->
          <!-- :label="`${item.itemdata.isnotnull ? '*' : ''}${item.itemdata.name}`+ ':'" -->
          <FormItem v-if="item.style === 'popInput'"
                     ref="popLabel"
                    :label="`${item.itemdata.isnotnull ? '*' : ''}${item.itemdata.name}`+ ':'"
                    :class="item.class ? `${item.class}`+' '+'popInput' : 'popInput'">
            <my-input :version='item.version'
                        :isActive='true'
                        :isDisabled='false'
                        :inputList="item.inputList?item.inputList:[]"
                        :objList="item.objList?item.objList:[]"
                        :itemdata="item.itemdata"
                        @inputBlur="(row)=>runMethods(typeof item.InputBlur == 'function' && item.InputBlur(item.itemdata.isBackRowItem ? row : item.itemdata))"
                        @getFkChooseItem="(row)=>runMethods(typeof item.oneObj == 'function' && item.oneObj(item.itemdata.isBackRowItem ? row : item.itemdata))"
                        @itemInputEnter="(row)=>runMethods(typeof item.InputEnter == 'function' && item.InputEnter(item.itemdata.isBackRowItem ? row : item.itemdata))">
              </my-input>
            
          </FormItem>

          <!-- 输入框弹框单多选-arkUi -->
          <FormItem v-if="item.style === 'popInputPlus'"
            ref="popLabel"
                    :label="`${item.itemdata.isnotnull ? '*' : ''}${item.itemdata.name}`+ ':'"
                    :class="item.class ? `${item.class}`+' '+'popInput' : 'popInput'">
            <fkinputPlus :isActive='true'
                      :isDisabled='false'
                      :inputList="item.inputList?item.inputList:[]"
                      :objList="item.objList?item.objList:[]"
                      :itemdata="item.itemdata"
                      @pop-show-before="runMethods(item.popBefore(item.itemdata),true)"
                      @inputBlur="(row)=>runMethods(typeof item.inputBlur == 'function' && item.inputBlur(item.itemdata.isBackRowItem ? row : item.itemdata),true)"
                      @getFkChooseItem="(row)=>runMethods(item.oneObj(item.itemdata.isBackRowItem ? row : item.itemdata))"
                      @inputEnter="(row)=>runMethods(item.inputEnter(item.itemdata.isBackRowItem ? row : item.itemdata),true)">
            </fkinputPlus>
          </FormItem>

          <!-- 为多选+导入弹框专属引入 -->
          <!-- 输入框弹框单多选 -->
          <FormItem v-if="item.style === 'popInput_ld'"
                    :class="item.class ? `${item.class}`+' '+'popInput' : 'popInput'">
            <my-input-ld :isActive='true'
                         :isDisabled='false'
                         :inputList="item.inputList?item.inputList:[]"
                         :objList="item.objList?item.objList:[]"
                         :itemdata="item.itemdata"
                         @getFkChooseItem="(row)=>runMethods(item.oneObj(item.itemdata.isBackRowItem ? row : item.itemdata))">
            </my-input-ld>
          </FormItem>

          <!-- radio 单选 -->
          <FormItem :label="`${item.label}`+ ':'"
                    :title="item.label"
                    v-if="item.style==='radio'"
                    :prop="item.value || item.colname"
                    :class="item.class || ''">
            <RadioGroup v-model="formConfig.formValue[`${item.value || item.colname}`]"
                        @on-change="runMethods(item.radioChange)">
              <Radio v-for="(option , index) in item.options"
                     :key="index"
                     :label="option.value"
                     :disabled="option.disabled">{{option.label || option.title}}</Radio>
            </RadioGroup>
          </FormItem>

          <!-- checkbox 单/多选 - 勾选框 -->
          <FormItem :label="`${item.label}` + ':'" 
                    :title="item.label"
                    v-if="item.style === 'checkbox'" 
                    :prop="item.value || item.colname" 
                    :class="item.class || ''">
            <template v-if="!item.options || item.onlyBox">
              <Checkbox v-model="formConfig.formValue[`${item.value || item.colname}`]"
                        @on-change="runMethods(item.checkboxChange ? item.checkboxChange(formConfig.formValue[`${item.value || item.colname}`]) : '', true)"
                        :disabled="item.disabled"
                        :circle="item.circle"
                        >{{item.checkboxLabel}}</Checkbox>
            
            </template>
            <template v-else-if="item.options && !item.onlyBox">
              <Checkbox v-if="item.hasCheckAll"
                        class="checkAllItem"
                        style="float: left;"
                        :indeterminate="item.indeterminate"
                        :value="item.checkAll"
                        @click.prevent.native="runMethods(item.handleCheckAll ? item.handleCheckAll : '')">全选</Checkbox>
              <CheckboxGroup v-model="formConfig.formValue[`${item.value || item.colname}`]" 
                             @on-change="(val) => runMethods(item.checkboxChange ? item.checkboxChange(val) : '')">
                <Checkbox v-for="(option, index) in item.options"
                          :label="option.value"
                          :key="index"
                          :disabled="option.disabled">{{ option.label || option.title }}</Checkbox>
              </CheckboxGroup>
            </template>
          </FormItem>

          <!-- 模糊查询组件 -->
          <FormItem :label="`${item.label}`+':'"
                    :title="item.label"
                    v-if="item.style==='dimSearch'"
                    :class="item.class || ''"
                    :prop="item.value || item.colname">
            <AttachFilter v-model="formConfig.formValue[`${item.value || item.colname}`]"
                          :columnsKey="item.columns"
                          :AuotData="item.AuotData"
                          :filter-method="item.filterMethod"
                          :disabled="item.disabled"
                          @on-change="item.dimChange"
                          @on-enter="item.dimEnter"
                          @on-select="item.dimSelect"
                          @on-clear="runMethods(item.dimClear)"
                          @on-blur="runMethods(item.dimblur)"></AttachFilter>
          </FormItem>
          <!-- 数字框 -->
          <FormItem :label="`${item.label}`+':'"
                    :title="item.label"
                    v-if="item.style==='inputNumber'"
                    :class="item.class || ''"
                    :prop="item.value || item.colname">
            <InputNumber v-model.trim="formConfig.formValue[`${item.value || item.colname}`]"
                         :max="item.max"
                         :min="item.min"
                         :step="item.step"
                         :formatter="item.formatter"
                         :parser="item.parser"></InputNumber>
          </FormItem>

          <!-- 双数字框 -->
          <FormItem :label="`${item.label}`+':'"
                    :title="item.label"
                    :class="item.class || ''"
                    v-if="item.style==='bothNumber'">
            <!-- <both-num-input :bothNumInput="item.bothNumInput" :allValue="formConfig.formValue[`${item.value || item.colname}`]"></both-num-input> -->
            <div class="bothNumInput">
              <div class="bothNumLeft">
                <InputNumber :max="item.max"
                             :min="item.min"
                             v-model.trim="formConfig.formValue[`${item.value || item.colname}`][0]"
                             :step="item.step"
                             :formatter="item.formatter"
                             :parser="item.parser"></InputNumber>
              </div>
              <div class="bothNumLine">
                一
              </div>
              <div class="bothNumRight">
                <InputNumber :max="item.max"
                             :min="item.min"
                             v-model.trim="formConfig.formValue[`${item.value || item.colname}`][1]"
                             :step="item.step"
                             :formatter="item.formatter"
                             :parser="item.parser"></InputNumber>
              </div>
            </div>
          </FormItem>
          <!-- 双input框 -->
          <FormItem :label="`${item.label}`+':'"
                    :title="item.label"
                    :class="item.class || ''"
                    v-if="item.style==='bothInput'">
            <div class="bothNumInput">
              <div class="bothNumLeft">
                <Input :disabled="item.disabled"
                       :type="item.type"
                       @on-click="runMethods(item.iconclick)"
                       @on-enter="runMethods(item.inputenter)"
                       :icon="item.icon"
                       v-model.trim="formConfig.formValue[`${item.value || item.colname}`][0]"
                       :placeholder="item.placeholder ? item.placeholder : ''"
                       :element-id="item.id"
                       :regx="item.regx"></Input>
              </div>
              <div class="bothNumLine">一</div>
              <div class="bothNumRight">
                <Input :disabled="item.disabled"
                       :type="item.type"
                       @on-click="runMethods(item.iconclick)"
                       @on-enter="runMethods(item.inputenter)"
                       :icon="item.icon"
                       v-model="formConfig.formValue[`${item.value || item.colname}`][1]"
                       :placeholder="item.placeholder ? item.placeholder : ''"
                       :element-id="item.id"
                       :regx="item.regx"></Input>
              </div>
            </div>
          </FormItem>

          <!-- switch开关 -->
          <FormItem :label="`${item.label}`+ ':'"
                    :title="item.label"
                    :class="item.class || ''"
                    v-if="item.style==='switch'"
                    :prop="item.value || item.colname">
            <i-switch v-model="formConfig.formValue[`${item.value || item.colname}`]" 
                      :size="item.size || 'small'" 
                      :disabled="item.disabled"
                      @on-change="runMethods(item.switchChange)" >
                    <span v-if="item.showText" slot="open">{{item.showText.open || '开启'}}</span>
                    <span v-if="item.showText" slot="close">{{item.showText.open || '关闭'}}</span>
            </i-switch>
          </FormItem>

          <!-- 插槽 -->
          <FormItem :label="`${item.label}`+':'"
                    :title="item.label"
                    :class="[item.class, { 'req-star': item.reqStar }]"
                    v-else-if="item.style === 'formCompile'">
            <slot :rowData="{ item, value: formConfig.formValue }"
                  :rowIndex="index"
                  :name="item.slotName" />
          </FormItem>
          <!-- 内容全自定义脱离form时使用 -->
          <template v-else-if="item.style === 'compile'">
            <slot :rowData="{ item, value: formConfig.formValue }"
                  :rowIndex="index"
                  :name="item.slotName" />
          </template>
        </template>
          <Tooltip v-if="item.tips" 
                   :content="item.tips.content" 
                   :theme="item.tips.theme || 'light'"
                   transfer
                   class="help-circle"
                   :max-width="item.tips.maxWidth || '200'"
                   :placement="item.tips.placement || 'bottom'"><Icon type="ios-help-circle-outline" />
          </Tooltip>
        </Col>
      </Row>

    </Form>

    <div class="imgLeft"
         v-if="formConfig.img && formConfig.img.type === 'imgLeft'">
      <img :width="formConfig.img.width"
           :height="formConfig.img.height"
           :src="formConfig.img.url"
           alt="">
    </div>

    <!-- 右上角小箭头 -->
    <i class="flodBtn"
       v-if="formConfig.flodClick"
       :class="flodData"
       @click="flodClick(formConfig.flodClick ? formConfig.flodClick : '')"></i>

  </div>
</template>

<script>
import businessForm from './js/businessForm.js';
export default businessForm;
</script>

<style lang='less'>
@import "css/businessForm.less";
</style>


