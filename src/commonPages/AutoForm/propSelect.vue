<template>
  <div class="DropMultiSelectFilterBox">
    <arkDropMultiSelectFilter :PropsData="propsData"
                           :Url="url"
                           :filterMode="true"
                           v-model="value"
                           :http="network"
                           :AutoRequest="sendAutoMessage"
                           :TableRequest="sendTableMessage"
                           @on-change="valueChange"
                           @on-clear="clearFun"
                           @on-keydown="keydownFun"
                           :EventFun="eventFun"></arkDropMultiSelectFilter>
  </div>
</template>

<script>

import R3 from '@syman/burgeon-r3';

const {network} = R3;
export default {
  name: "propSelect",
  components: {
  },
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    },
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
    // 接口入参
    sendAutoMessage() {
      const sendAutoMessage = {
        colid: this.formItem.colid,
        fixedcolumns: this.formItem.fixedcolumns
      }
      if (Object.keys(this.params).length) {
        for (let key in this.params) {
          sendAutoMessage[key] = this.params[key]
        }
      }

      return sendAutoMessage
    },
    // 接口入参
    sendTableMessage() {
      const sendTableMessage = {
        isdroplistsearch: this.formItem.isdroplistsearch || true,
        refcolid: this.formItem.refcolid,
      }
      if (Object.keys(this.params).length) {
        for (let key in this.params) {
          sendTableMessage[key] = this.params[key]
        }
      }

      return sendTableMessage
    },
    columnName() {
      return this.form[this.formItem.columnName]
    },
    propsData() {
      return {
        type: Object,
        default: function () {
          return {
            single: this.formItem.single || true, // 是否单选
            placeholder: this.formItem.placeholder || '请输入',
            enterType: false,
            serviceId: 'add-app',
            pageSize: this.formItem.pageSize || 10,
          };
        }
      }
    }
  },
  watch: {
    value(v) {
      // this.$delete(this.form, this.formItem.columnName);
      // this.$nextTick(() => {
      //   this.$set(this.form, this.formItem.columnName, v);
      //   this.$forceUpdate()
      // })
      this.$set(this.form, this.formItem.columnName, v);
    },
    // 默认值
    columnName(val) {
      this.value = val
    },
  },
  data() {
    return {
      url: {
        autoUrl: '/p/cs/fuzzyquerybyak',
        tableUrl: '/p/cs/QueryList',
        tableSearchUrl:'/p/cs/newQueryList'
      },
      value: [],
      network: network,
      eventFun: {
        'on-input-value-change': () => {
          console.log('on-input-value-change');
        }
      },
    }
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

<style  lang="less">
.DropMultiSelectFilterBox {
  .ark-fkrp-select-icon {
    height: 100%;
    top: 0;
  }
}
</style>
