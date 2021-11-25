<template>
  <Form ref="actionForm" :model="form" :inline="true" :label-width="labelWidth" class="pd-rt-10">
    <div class="flex-wrap-wrap flex flex-direction-row">
      <div v-for="(formItem, index) in formItems" :key="`${String(new Date())}${index}`"
           :style="{width:`${colWidth}%`}">
        <FormItem :label="formItem.labelName" style="width: 100%">
          <component
            :is="formItem.displayType"
            :form-item="formItem"
            :form="form"
            :params="params"
          />
        </FormItem>
      </div>
    </div>
  </Form>
</template>

<script>
import propSelect from './propSelect'
import selectCustom from './selectCustom'
import selectTag from './selectTag'
import inputCustom from './inputCustom'

export default {
  components: {
    propSelect, // pop弹窗多选
    selectTag, // 标签下拉选择
    selectCustom,// 下拉框
    inputCustom // 输入框
  },
  name: 'ActionForm',
  props: {
    span: {
      type: Number,
      default: 24
    },
    labelPostion: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: [Number, String],
      default: 100
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    },
    // 入参
    params: {
      type: Object,
      default() {
        return {}
      }
    },
    formItems: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {}
  },
  computed: {
    colWidth() {
      const span = Number(this.formItem && this.formItem.span ? this.formItem.span : this.span)
      return 100 / (24 / span)
    }
  },
  methods: {}
}
</script>
