<template>
  <div class="selectTag relative">
    <ul class="clearfix absolute pd-lf-5 tagBox">
      <li class="pull-left flag width-20  mg-tp-1 flex flex-direction-row align-items-center "
          v-for="(item,index) in formData2" :key="`${item}${index}`"
          :value="item.value"
          :style="{background:formItem.colorObj[item] || 'pink'}">
        {{ item ? chooseTagNameArr[index].slice(0, 1) : '' }}
      </li>
    </ul>
    <Select class="tag-select" v-model="form[formItem.columnName]"
            :multiple="formItem.multiple" :clearable="Boolean(formItem.clearable)"
            :placeholder="formItem.placeholder"
            @on-change="valueChange"
            @on-clear="clearFun"
            @on-enter="keydownFun"
    >
      <Option v-for="(item,index) in formItem.optionArr" :value="item.value" :key="`${item.value}${index}`"
      >
        <div class="flag" :style="{background:formItem.colorObj[item.value] || 'pink'}">
          {{ item.label ? item.label.slice(0, 1) : '' }}
        </div>
      </Option>
    </Select>
  </div>
</template>

<script>

export default {
  name: "selectTag",
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
  computed: {
    formData() {
      const val = this.form[this.formItem.columnName]
      return this.formItem.multiple ? val : val ? [val] : []
    },
    // 获取已选的标签中文名
    chooseTagNameArr() {
      let chooseTagNameArr = []
      this.formItem.optionArr.forEach((item) => {
        this.formData2.forEach((item2) => {
          if (item2 === item.value) {
            chooseTagNameArr.push(item.label)
          }
        })
      })
      return chooseTagNameArr
    }
  },
  watch: {
    formData(v) {
      this.formData2 = v
      if (v && v.length && v[0] === 'bSelect-all') { // 选择全部时
        const formData = []
        this.formItem.optionArr.forEach((item) => {
          formData.push(item.value)
        })
        this.formData2 = formData
      }
    }
  },
  data() {
    return {
      formData2: []
    }
  },
  mounted() {
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
.tagBox {
  top: 50%;
  transform: translateY(-50%);
}

.selectTag {
  .flag {
    display: inline-block;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    transform: scale(0.8);
    font-size: 14px;
  }

  .tagBox {

  }


  .tag-select {
    .ark-select-item {
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .ark-select-selection-head span {
      opacity: 0;

      &.ark-select-placeholder {
        opacity: 1;
      }
    }

    .ark-select-selection {
      background: transparent;
    }
  }


}
</style>
<style scoped>

</style>
