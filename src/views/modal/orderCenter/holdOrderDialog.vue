<template>
  <div class="hold-dialog" v-loading="dialogLoad">
    <div class="hold-form">
      <re-form :formConfig="formConfig">
        <template #formCompile="{ rowData }">
          <div class="form-compile">
            <Select class="form-compile-item" v-model="formConfig.formValue.DAY_TYPE">
              <Option
                v-for="item in rowData.item.options1"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
            <InputNumber
              class="form-compile-item compile-item-input"
              :max="10000"
              :min="1"
              v-model="formConfig.formValue.FIXED_DURATION"
            ></InputNumber>
            <Select class="form-compile-item" v-model="formConfig.formValue.TIME_UNIT">
              <Option
                v-for="item in rowData.item.options2"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </div>
        </template>
      </re-form>
    </div>
    <re-button :btnConfig="btnConfig" />
  </div>
</template>

<script>
// import httpServer, { post } from '@/utils/request'
import reForm from "professionalComponents/businessForm";
import reButton from "professionalComponents/businessButton";
import axios from 'axios'
export default {
  components: {
    reForm,
    reButton,
  },
  props: ['componentData'],
  data() {
    let _this = this
    return {
      dialogLoad: false,
      formConfig: {
        formValue: {
          HOLD_ORDER_REASON: '',
          IS_AUTO_RELEASE: false,
          RELEASE_TIME_TYPE: '',
          RELEASE_TIME: '',
          DAY_TYPE: '',
          FIXED_DURATION: 1,
          TIME_UNIT: ''
        },
        formData: [
          {
            style: 'select',
            label: 'HOLD单原因',
            width: '24',
            value: 'HOLD_ORDER_REASON',
            setRequired: 'required',
            options: [
              {
                value: '1',
                label: '直播HOLD单'
              }, {
                value: '2',
                label: '买家HOLD单'
              }
            ]
          }, {
            style: 'checkbox',
            label: '自动释放',
            value: 'IS_AUTO_RELEASE',
            width: 24
          }
        ],
        ruleValidate: {
          HOLD_ORDER_REASON: [
            { required: true, message: " ", trigger: "blur" }
          ]
        }
      },
      elseFormData: [
        {
          style: 'select',
          label: '释放时点',
          width: 24,
          value: 'RELEASE_TIME_TYPE',
          options: [
            {
              label: '指定时点释放',
              value: '1'
            }, {
              label: '固定时长后释放',
              value: '2'
            }
          ],
          selectChange: () => {
            _this.formConfig.formValue.RELEASE_TIME = ''
            _this.formConfig.formValue.DAY_TYPE = ''
            _this.formConfig.formValue.FIXED_DURATION = 1
            _this.formConfig.formValue.TIME_UNIT = ''
            if (_this.formConfig.formValue.RELEASE_TIME_TYPE === '1') _this.formConfig.formData[3] = _this.elseFormData[1]
            else _this.formConfig.formData[3] = _this.elseFormData[2]
          }
        }, {
          style: "date",
          type: "datetime",
          value: "RELEASE_TIME",
          label: " ",
          width: 24,
          format: "yyyy-MM-dd HH:mm:ss", //格式参照burgeonui
          placeholder: "",
          options: {
            disabledDate(date) {
              return date && date.valueOf() < Date.now() - 86400000;
            }
          }
        }, {
          style: 'formCompile',
          label: ' ',
          slotName: 'formCompile',
          width: 24,
          options1: [
            {
              label: '下单时间',
              value: '1'
            }, {
              label: '付款时间',
              value: '2'
            }
          ],
          options2: [
            {
              label: '分钟',
              value: '1'
            }, {
              label: '小时',
              value: '2'
            }, {
              label: '天',
              value: '3'
            }
          ]
        }
      ],
      btnConfig: {
        typeAll: "error",
        btnsite: "right",
        buttons: [
          {
            text: "取消",
            btnclick: () => {
              this.$parent.$parent.closeConfirm()
            }
          }, {
            text: "确定",
            btnclick: () => {
              this.confirmChange()
            }
          }
        ]
      }
    }
  },
  watch: {
    'formConfig.formValue.IS_AUTO_RELEASE'(newValue) {
      let formData = this.formConfig.formData
      let oldForm = [
        formData[0],
        formData[1]
      ]
      if (newValue) this.formConfig.formData = [...oldForm, this.elseFormData[0]]
      else {
        this.formConfig.formData = oldForm
        this.formConfig.formValue.RELEASE_TIME_TYPE = ''
        this.formConfig.formValue.RELEASE_TIME = ''
        this.formConfig.formValue.DAY_TYPE = ''
        this.formConfig.formValue.FIXED_DURATION = 1
        this.formConfig.formValue.TIME_UNIT = ''
      }
    }
  },
  methods: {
    // 确定请求
    confirmInfo(data) {
      this.dialogLoad = true
      axios({
        url: this.$httpApi.order.managementOrderHold,
        data: data,
        method: 'post'
      }).then(res => {
        this.dialogLoad = false
        if (res.data.code === 0) {
          this.$Message.success('HOLD单成功')
          if (this.$route.query.id == 2627) {
            this.$parent.$parent.closeConfirm();
            this.$nextTick(() => {
              this.$parent.$parent.$parent.getData();
            })
          } else {
            this.$parent.$parent.closeConfirm();
            this.$nextTick(() => {
              this.$parent.$parent.$parent.load();
            })
          }

        } else {
          this.$Message.error(res.data.message);
        }
      })
      // post(this.$httpApi.order.managementOrderHold, data).then(res => {
      //   this.dialogLoad = false
      //   console.log(res)
      //   if (res.data.code === 0) {
      //     this.$message.success('HOLD单成功')
      //     this.$parent.$parent.closeConfirm();
      //     this.$nextTick(() => {
      //       this.$parent.$parent.$parent.getData();
      //     })
      //   }
      // }).catch(() => {
      //   this.dialogLoad = false
      // })
    },
    // 确定事件校验和参数赋值
    confirmVerifyAssignment() {
      let params = {}
      let formValue = this.formConfig.formValue
      // 判断HOLD单原因
      if (!formValue.HOLD_ORDER_REASON) return { message: 'HOLD单原因不能为空' }
      params['HOLD_ORDER_REASON'] = formValue.HOLD_ORDER_REASON
      // 判断是否有勾选自动释放
      if (formValue.IS_AUTO_RELEASE) {
        params['IS_AUTO_RELEASE'] = 'Y'
        params['RELEASE_TIME_TYPE'] = formValue.RELEASE_TIME_TYPE
        // 判断释放时点
        if (formValue.RELEASE_TIME_TYPE === '1') {
          // 判断指定时点释放的时间
          if (!formValue.RELEASE_TIME) return { message: '指定时点释放的时间不能为空' }
          if (new Date(formValue.RELEASE_TIME).getTime() < Date.now()) return { message: '指定时点释放的时间不能小于当前时间' }
          params['RELEASE_TIME'] = this.$comUtils.dateFormat(formValue.RELEASE_TIME, 'yyyy-MM-dd hh:mm:ss')
        } else if (formValue.RELEASE_TIME_TYPE === '2') {
          // 判断固定时长后释放的相应参数
          if (formValue.DAY_TYPE && formValue.FIXED_DURATION && formValue.TIME_UNIT) {
            if (formValue.FIXED_DURATION.toString().indexOf('.') >= 0) return { message: '固定时长后释放的固定时长只能是整数' }
            params['DAY_TYPE'] = formValue.DAY_TYPE
            params['FIXED_DURATION'] = formValue.FIXED_DURATION
            params['TIME_UNIT'] = formValue.TIME_UNIT
          } else {
            return { message: '固定时长后释放的相关数据不能为空' }
          }
        } else {
          return { message: '释放时点不能为空' }
        }
      } else {
        params['IS_AUTO_RELEASE'] = 'N'
      }
      return {
        params
      }
    },
    // 确定事件
    confirmChange() {
      let requestData = this.confirmVerifyAssignment()
      if (requestData.message) return this.$message.error(requestData.message)
      let params = {
        IDS: this.componentData.ids,
        ...requestData.params
      }
      this.confirmInfo(params)
    }
  }
}
</script>

<style lang="less" scoped>
.hold-dialog {
  display: flex;
  width: 100%;
  flex-direction: column;
  .hold-form {
    .form-compile {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-top: 6px;
      > .form-compile-item {
        width: 100px;
      }
      > .compile-item-input {
        line-height: 26px;
        /deep/ input {
          height: 26px;
        }
      }
    }
  }
}
</style>
