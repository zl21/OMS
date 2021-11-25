<template>
  <div class="inputCustom">
    <Input
      v-model="form[formItem.columnName]"
      :type="formItem.type || 'text'"
      :size="formItem.size || 'small'"
      :regx="formItem.regx"
      :clearable="Boolean(formItem.clearable)"
      :placeholder="formItem.placeholder"
      @on-change="valueChange"
      @on-clear="clearFun"
      @on-enter="keydownFun"
    />
  </div>
</template>

<script>

export default {
  name: "inputCustom",
  props: {
    formItem: {
      type: Object,
      default() {
        return {}
      }
    },
    form: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  computed: {},
  watch: {},
  data() {
    return {}
  },
  methods: {
    /**
     * 改变值的事件
     * @param v
     */
    valueChange(v) {
      if (this.formItem.changeFun) {
        this.formItem.changeFun(v)
      }
    },
    /**
     * 清除数据触发
     * @param v
     */
    clearFun() {
      if (this.formItem.clearFun) {
        this.formItem.clearFun()
      }
    },
    keydownFun(v) {
      if (this.formItem.keydownFun) {
        this.formItem.keydownFun(v)
      }
    },
  }
}
</script>
<style lang="less">
.inputCustom {

}
</style>
<style scoped>

</style>
