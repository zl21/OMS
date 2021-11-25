<template>
  <div class="selectCustom">
    <Select v-model="form[formItem.columnName]"
            :multiple="formItem.multiple"
            :clearable="Boolean(formItem.clearable)"
            :placeholder="formItem.placeholder"
            style="width:100%"
            @on-change="valueChange"
            @on-clear="clearFun"
            @on-enter="keydownFun"
    >
      <Option v-for="(item,index) in formItem.optionArr" :value="item.value" :key="`${item.value}${index}`">
        {{ item.label }}
      </Option>
    </Select>
  </div>
</template>

<script>

export default {
  name: "selectCustom",
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
.selectCustom {
  .ark-select-selection-head {
    height: 100%;
    display: flex;
    //flex-direction: column;
    //align-items: center;
  }
}
</style>
<style scoped>

</style>
