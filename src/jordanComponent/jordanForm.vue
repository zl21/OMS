<template>
  <div class="orderManageEdit" :class="formConfig.flodClick?'':'unFlodStyle'" :ref="formConfig.flodClick">

    <div class="imgRight" v-if="formConfig.img &&  formConfig.img.type === 'imgRight'">
      <img :width="formConfig.img.width" :height="formConfig.img.height" :src="formConfig.img.url" alt="">
    </div>

    <Form class="jordanForm_a" :label-width="100" style="width:100%" :model="formConfig.formValue" :rules="formConfig.ruleValidate" onsubmit="return false;">

      <Row>
        <Col v-for="(item , index) in formConfig.formData" :key=index :span='item.width || formConfig.colSpan || "6"' v-if="item.style">
          <template v-if="item.style !== ''">
            <FormItem :label="`${item.label}`+ ':'" v-if="item.style === 'input'" :prop="item.value">
              <!-- 输入框 -->
              <!-- <Input @on-click="iconclick(item.iconclick)" @on-enter="keyDown(item.inputenter)" :icon="item.icon" v-model="item.value" :placeholder="item.placeholder ? item.placeholder : ''"></Input> -->
              <Input  :autocomplete='item.autocomplete ? item.autocomplete : "new-password"'    :disabled='item.disabled||item.readonly' :type="item.type" @on-click="iconclick(item.iconclick)" @on-enter="keyDown(item.inputenter)"
              :icon="item.disabled?'':item.icon" v-model.trim="formConfig.formValue[`${item.value}`]" :placeholder="item.placeholder ? item.placeholder : ''"
              :element-id='item.id' :regx="item.regx" @on-blur="InputBlur(item.inputblur)" @on-change="InputChange(item.inputChange ? item.inputChange() : '')"></Input>
              <!-- 输入框图标 -->
              <!-- <Icon v-if="item.icon" :type="item.icon" /> -->
            </FormItem>
            <!-- 文本框 -->
            <FormItem :label="`${item.label}`+ ':'" v-if="item.style === 'textarea'" :prop="item.value">
              <Input v-model="formConfig.formValue[`${item.value}`]" :disabled='item.disabled' :type="item.style" :autosize="item.autosize ? item.autosize : {minRows: 2,maxRows: 5}" :placeholder="item.placeholder ? item.placeholder : ''" />
            </FormItem>
            <!-- 勾选框 -->
            <FormItem :label="`${item.label}`+ ':'" v-if="item.style === 'checkbox'" :prop="item.value">
              <CheckboxGroup>
                    <input :checked="item.checked" @click="checkboxChange(item.checkboxChange ? item.checkboxChange(formConfig.formValue[`${item.value}`]) : '')" v-model="formConfig.formValue[`${item.value}`]" type="checkbox" :disabled='item.disabled'>
              </CheckboxGroup>
            </FormItem>
            <!-- 下拉框 -->
            <FormItem :label="`${item.label}`+ ':'" v-if="item.style === 'select'" class="popSelect" :prop="item.value">
              <Select @on-change="selectChange(item.selectChange)" v-model="formConfig.formValue[`${item.value}`]"
              :multiple="item.multiple?item.multiple:false"
              :disabled='item.disabled' :transfer='item.transfer?item.transfer:true'
              :placeholder="item.placeholder ? item.placeholder : ''"
              :clearable="item.clearable"
              @on-clear="clearSelect(item.clearSelect(item.value))">
                <Option v-for="(option , index) in item.options" :key="index" :value="option.value" :disabled="option.disabled">{{option.label}}</Option>
              </Select>
            </FormItem>

            <!-- 时间组件 -->
            <FormItem :label="`${item.label}`+ ':'" v-if="item.style === 'date'" :prop="item.value">
              <DatePicker :disabled='item.disabled' :type="item.type?item.type:'date'" split-panels  :placeholder="item.placeholder" :transfer="item.transfer ? item.transfer : true"
              v-model="formConfig.formValue[`${item.value}`]" :format="item.format" :clearable="item.clearable" :options="item.options"
              @on-change="dateNoChange(item.onChange)"></DatePicker>
            </FormItem>

            <!-- 输入框弹框单多选 -->
            <FormItem v-if="item.style === 'popInput'" class="popInput">
              <my-input
              :isActive='true'
              :isDisabled='false'
              :inputList="item.inputList?item.inputList:[]"
              :objList="item.objList?item.objList:[]"
              :itemdata="item.itemdata"
              @getFkChooseItem ="typeof item.oneObj =='undefined'?oneObj:oneObj(item.oneObj(item.itemdata))"
              @itemInputEnter ="InputEnter(item.InputEnter)"
              >
              </my-input>
            </FormItem>

            <!-- 为多选+导入弹框专属引入 -->
            <!-- 输入框弹框单多选 -->
            <FormItem v-if="item.style === 'popInput_ld'" class="popInput">
              <my-input-ld
              :isActive='true'
              :isDisabled='false'
              :inputList="item.inputList?item.inputList:[]"
              :objList="item.objList?item.objList:[]"
              :itemdata="item.itemdata"
              @getFkChooseItem ="oneObj(item.oneObj)"
              >
              </my-input-ld>
            </FormItem>

            <!-- radio 单选 -->
            <FormItem :label="`${item.label}`+ ':'" v-if="item.style==='radio'" :prop="item.value">
              <RadioGroup v-model="formConfig.formValue[`${item.value}`]" @on-change="radioChange(item.radioChange)">
                <Radio v-for="(option , index) in item.options" :key="index" :label="option.value"  :disabled="option.disabled">{{option.label}}</Radio>
              </RadioGroup>
            </FormItem>

            <!-- 模糊查询组件 -->
            <FormItem :label="`${item.label}`+':'" v-if="item.style==='dimSearch'" :prop="item.value">
              <AttachFilter
              v-model="formConfig.formValue[`${item.value}`]"
              :columnsKey="item.columns"
              :AuotData="item.AuotData"
              :filter-method="item.filterMethod"
              :disabled="item.disabled"
              @on-change="item.dimChange"
              @on-enter="item.dimEnter"
              @on-select="item.dimSelect"
              @on-blur="onBlur(item.dimblur)"
              ></AttachFilter>
            </FormItem>
            <!-- 数字框 -->
            <FormItem :label="`${item.label}`+':'" v-if="item.style==='inputNumber'" :prop="item.value">
              <InputNumber v-model.trim="formConfig.formValue[`${item.value}`]" :max="item.max" :min="item.min" :step="item.step" :formatter="item.formatter" :parser="item.parser"></InputNumber>
            </FormItem>

            <!-- 双数字框 -->
            <FormItem :label="`${item.label}`+':'" v-if="item.style==='bothNumber'">
                <!-- <both-num-input :bothNumInput="item.bothNumInput" :allValue="formConfig.formValue[`${item.value}`]"></both-num-input> -->
                <div class="bothNumInput">
                  <div class="bothNumLeft">
                      <InputNumber :max="item.max" :min="item.min" v-model.trim="formConfig.formValue[`${item.value}`].value1" :step="item.step" :formatter="item.formatter" :parser="item.parser"></InputNumber>
                      </div>
                      <div class="bothNumLine">
                          一
                      </div>
                      <div class="bothNumRight">
                          <InputNumber :max="item.max" :min="item.min" v-model.trim="formConfig.formValue[`${item.value}`].value2" :step="item.step" :formatter="item.formatter" :parser="item.parser"></InputNumber>
                      </div>
                  </div>
            </FormItem>
            <!-- 双input框 -->
            <FormItem :label="`${item.label}`+':'" v-if="item.style==='bothInput'">
              <div class="bothNumInput">
                <div class="bothNumLeft">
                  <Input
                    :disabled="item.disabled"
                    :type="item.type"
                    @on-click="iconclick(item.iconclick)"
                    @on-enter="keyDown(item.inputenter)"
                    :icon="item.icon"
                    v-model.trim="formConfig.formValue[`${item.value}`].value1"
                    :placeholder="item.placeholder ? item.placeholder : ''"
                    :element-id="item.id"
                    :regx="item.regx"
                  ></Input>
                </div>
                <div class="bothNumLine">一</div>
                <div class="bothNumRight">
                  <Input
                    :disabled="item.disabled"
                    :type="item.type"
                    @on-click="iconclick(item.iconclick)"
                    @on-enter="keyDown(item.inputenter)"
                    :icon="item.icon"
                    v-model="formConfig.formValue[`${item.value}`].value2"
                    :placeholder="item.placeholder ? item.placeholder : ''"
                    :element-id="item.id"
                    :regx="item.regx"
                  ></Input>
                </div>
              </div>
            </FormItem>
            <FormItem :label="`${item.label}`+':'" v-else-if="item.style === 'formCompile'">
              <slot :rowData="{ item, value: formConfig.formValue }" :rowIndex="index" :name="item.slotName" />
            </FormItem>
            <!-- 内容全自定义脱离form时使用 -->
            <template v-else-if="item.style === 'compile'">
              <slot :rowData="{ item, value: formConfig.formValue }" :rowIndex="index" :name="item.slotName" />
            </template>
          </template>
        </Col>
      </Row>

    </Form>

    <div class="imgLeft" v-if="formConfig.img && formConfig.img.type === 'imgLeft'">
      <img :width="formConfig.img.width" :height="formConfig.img.height" :src="formConfig.img.url" alt="">
    </div>

  <!-- 右上角小箭头 -->
  <i class="flodBtn" v-if="formConfig.flodClick" :class="flodData" @click="flodClick(formConfig.flodClick ? formConfig.flodClick : '')"></i>

  </div>
</template>

<script>
import myInputLd from 'framework/components/element/input.vue' //为多选+导入组件专属引入
import myInput from "framework/components/input/objinput_dz.vue";
    export default {
        components:{
          myInput,
          myInputLd
        },
        data(){
          return {

            flodData: 'el-icon-arrow-down',  //折叠箭头动态样式
            currentFlod: '' //存储当前选中的箭头状态
          }
        },
        props: {
          formConfig: {
            type:Object
          }
        },
        watch:{
          flodData(){
            if(this.flodData === 'el-icon-arrow-up') {
              this.$refs[this.currentFlod].style.height = "";
            } else {
              this.$refs[this.currentFlod].style.height = "65px";
              this.$refs[this.currentFlod].style.overflow = "hidden";
            }
          }
        },
        mounted() {
          console.log(this.formConfig.formData)
          if(this.formConfig.flodClick){
            this.$refs[this.formConfig.flodClick].style.height = "65px";
              this.$refs[this.formConfig.flodClick].style.overflow = "hidden";
          }
        },
        methods: {
            clearSelect(val){
              if(val){
                val(e);
              }
            },
            checkboxChange(val) {
              if (val) {
                val(e)
              }
            },
            dateNoChange(val){
              if(val){
                val();
              }
            },
            onBlur(val){
              if(val){
                val();
              }

            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

          oneObj(val){
            if(val){
              val(e);
            }
          },
          InputEnter(val) {
            if(val){
              val();
            }
          },
          InputBlur(val){
             if(val){
              val();
            }
          },
          InputChange(val) {
            if (val) {
              val()
            }
          },
          iconclick(val){
            if(val){
              val();
            }
          },
          //radio切换方法
          radioChange(val){
            if(val){
              val();
            }
          },
          keyDown(val){
            val();
          },
          //点击折叠按钮事件
          flodClick(val){
            // alert(val);
            if(this.flodData === 'el-icon-arrow-up') {
              this.flodData = 'el-icon-arrow-down';
              this.currentFlod = val;
              // this.$refs[val].style.height = " ";
              // console.log(this.$refs[val].style);
              // this.$refs[val].style.overflow = "hidden";

            } else {
              this.flodData = 'el-icon-arrow-up';
              this.currentFlod = val;
              // this.$refs[val].style.height = "75px";
              // this.$refs[val].style.overflow = "hidden";
            }
            if (val) {
              val();
            }
          },
          selectChange(val){
            if(val){
              val();
            }
          } //下拉选项方法
        }
    }
</script>

<style>
  .burgeon-form-item-content {
    position: relative;
  }
  /* .burgeon-form-item-content .burgeon-icon-md-alarm {
    position: absolute;
    top: 15px;
    right: 5px;
  } */
  /*.orderManageEdit {*/
    /*width: 100%;*/
  /*}*/
  .orderManageEdit .jordanForm_a {
    padding-bottom: 10px;
    box-sizing: border-box;

  }
  .jordanForm_a .burgeon-form-item {
    margin-bottom: 0;
  }
  .orderManageEdit .jordanForm_a .burgeon-input {
    box-sizing: border-box;
    padding: 5px 4px !important;
  }

  .orderManageEdit .jordanForm_a .burgeon-col-span-6,
  .orderManageEdit .jordanForm_a .burgeon-col-span-8,
  .orderManageEdit .jordanForm_a .burgeon-col-span-12,
  .orderManageEdit .jordanForm_a .burgeon-col-span-24 {
    height: 30px;
    /* margin-top: 8px; */
  }
  /* .orderManageEdit .jordanForm_a .burgeon-col-span-16 {
    margin-top: 8px;
  } */
  .orderManageEdit .jordanForm_a .burgeon-input {
    height: 24px;
  }

  .orderManageEdit {
    display: flex;
    border: 1px solid #d8d8d8;
  }

  /* 日期组件宽度调整 */
  .orderManageEdit .jordanForm_a .burgeon-date-picker {
    width: 100%;
  }
  .orderManageEdit .jordanForm_a .burgeon-input-wrapper {
    line-height: 30px;
  }
  /* 折叠按钮 */
  .orderManageEdit .flodBtn {
    width: 28px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    background: #fe6846;
  }
  /* 未折叠情况下的样式 */
  .unFlodStyle {
    padding-right: 28px;
    border: none;
  }
  .orderManageEdit .popInput .burgeon-form-item-content {
    margin-left: 0px !important;
    padding-top: 2px;
  }
  .orderManageEdit .popInput .item-input label.title {
    width: 100px;
    padding: 4px 4px 4px 0 !important;
    box-sizing: border-box;
    line-height: 1 !important;
  }
  .orderManageEdit .popInput .item-input .input-wrap {
    overflow: initial;
  }
  .orderManageEdit .popInput .el-autocomplete {
    width: 100%;
  }
  .orderManageEdit .popInput .el-input__inner {
    height: 22px;
    border-radius: 2px;
    border: 1px solid #fff;
    padding: 0px 15px 0px 4px !important;
    font-size: 12px !important;
    color: #575757;
    background: #fff !important;
  }
  .orderManageEdit .popInput .item-input .input-wrap .input-inner input {
    height: 24px !important;
    border: 1px solid  rgba(216, 216, 216, 1);
  }
  .orderManageEdit .item-input .title {
    text-align: right;
  }
  .orderManageEdit .item-input label i {
    top : 0 !important;
    left: -5px !important;
  }
  .orderManageEdit .item-input .add-input {
    /* border: none !important; */
    padding: 0 !important;
    background-color: #F7F7F7 !important;
  }

  .orderManageEdit .item-input .table-input {
    margin: 0 !important;
  }
  /* select下拉框样式调整 */
  .popSelect .burgeon-select-single .burgeon-select-selection {
    height: 24px;
    line-height: 24px;
  }
  .popSelect .burgeon-select-single
  .burgeon-select-selection .burgeon-select-placeholder,
  .burgeon-select-single .burgeon-select-selection
  .burgeon-select-selected-value {
    height: 24px;
    line-height: 24px;
  }

  /* 必选标识字体样式调整为框架相同 */
  .burgeon-form-item-required .burgeon-form-item-label:before {
    vertical-align:-webkit-baseline-middle;
    display: inline-block;
    font-style: italic !important;
    font-family: auto !important;
    font-size: 18px !important;
    line-height: 10px !important;
  }

  /* 日期组件样式 */
  html *, :after, :before{
      box-sizing: border-box;
  }

  /* 双数字输入框样式 */
  .bothNumInput{
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    /* label样式 */
     .burgeon-form .burgeon-form-item-label {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 10px 4px 10px 0 ;
    }
    .burgeon-form .burgeon-form-item-label:hover {
      overflow:inherit;
      white-space:normal;
    }

    .orderManageEdit  .burgeon-time-picker-cells .burgeon-time-picker-cells-list{
       box-sizing: border-box;
    }
</style>


