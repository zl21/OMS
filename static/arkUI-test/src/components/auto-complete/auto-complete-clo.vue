<template>
  <div>
    <i-select ref="select"
              :class="classes"
              :label="label"
              :disabled="setDisabled"
              :clearable="clearable"
              :placeholder="placeholder"
              :size="size"
              :placement="placement"
              :value="currentValue"
              :scrollWidth="scrollWidth"
              :cleardropVisible="true"
              :clickOutsideBlur="true"
              filterable
              remote
              auto-complete
              :remote-method="remoteMethod"
              @on-change="handleChange"
              :transfer="transfer">
      <slot name="input">
        <i-input :element-id="elementId"
                 ref="input"
                 slot="input"
                 v-model="currentValue"
                 :__disable-placeholder__="isIE"
                 :name="name"
                 :placeholder="placeholder"
                 :disabled="setDisabled"
                 :size="size"
                 :icon="inputIcon"
                 @on-keyup="handleKeyup"
                 @input="handleInput"
                 @on-input-model="inputValue"
                 @on-enter="handleEnter"
                 @on-keypress="handleKeypress"
                 @on-keydown="handleKeydown"
                 @on-click="handleClear"
                 @on-focus="handleFocus"
                 @on-blur="handleBlur"></i-input>
      </slot>
      <template v-if="filteredData.length>0">
        <slot>
            <table class="auto-com-table"
                 v-if="filteredData.length>0">
                <Option v-for="tem in filteredData"
                        :value="itemvalue(tem)"
                        :tem="tem"
                        :hidecolumns="hidecolumns"
                        @on-select-selected="selectOption"
                        :label="callLabel(tem)">
                </Option>
             </table>

        </slot>
      </template>

    </i-select>
  </div>
</template>
<script>
import iSelect from '../select/select.vue';
import iInput from '../input/input.vue';
import { oneOf } from '../../utils/assist';
import Emitter from '../../mixins/emitter';
import Option from '../select/option-col.vue';

import burgeonConfig from '../../assets/config';

export default {
  name: 'AutoComplete-col',
  mixins: [Emitter],
  components: { iSelect, Option, iInput },
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    label: {
      type: [Number, String]
    },
    data: {
      type: Array,
      default: () => []
    },
    columnsKey: {
      type: Array,
      default () {
        return [];
      }
    },
    // 显示滚动条
    scrollWidth: {
      type: Boolean,
      default: true
    },
    maxHeight:{
     type: Number,
      default: 180
    },
    hidecolumns: {
      type: Array,
      default () {
        return [];
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String
    },
    onDisable: {
      type: Boolean,
      default: false
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default () {
        return !this.$IVIEW || this.$IVIEW.size === ''
          ? 'default'
          : this.$IVIEW.size;
      }
    },
    icon: {
      type: String
    },
    filterMethod: {
      type: [Function, Boolean],
      default: false
    },
    placement: {
      validator (value) {
        return oneOf(value, ['top', 'bottom']);
      },
      default: 'bottom'
    },
    transfer: {
      type: Boolean,
      default () {
        return this.$IVIEW.transfer === '' ? false : this.$IVIEW.transfer;
      }
    },
    name: {
      type: String
    },
    elementId: {
      type: String
    },
    disableInput: {
      type: Boolean,
      default: false
    },
    enterType: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isIE: window.navigator.userAgent.indexOf('Trident') > -1,
      currentValue: this.value,
      defaultValue: [],
      disableEmitChange: false // for Form reset
    };
  },
  computed: {
    setDisabled(){
        return this.disabled;
    },
    setAutoComTable(){
       if (this.maxHeight >0){
            return `max-height:${this.maxHeight}px`;
       } else {
        return '';
       }
    },
    itemvalue () {
      return function (item) {
        let label = this.columnsKey.reduce((arr, option) => {
          arr.push(item[option]);
          return arr;
        }, []);
        return label.join('|');
      };
    },
    classes () {
      return [`${burgeonConfig.prefixCls}auto-complete`];
    },
    inputIcon () {
      let icon = '';
      if (this.clearable && this.currentValue) {
        icon = 'ios-close-circle';
      } else if (this.icon) {
        icon = this.icon;
      }
      return icon;
    },
    filteredData () {
      if (this.filterMethod) {
        return this.data.filter(item => this.filterMethod(this.currentValue, item));
      } else {
        return this.data;
      }
    }
  },
  watch: {
    value (val) {
      if (this.currentValue !== val) {
        this.disableEmitChange = true;
      }
      this.currentValue = val;
    },
    currentValue (val) {
      this.$refs.select.query = val;
      //this.$emit('input', val);
      this.$emit('on-change', val);
      if (this.disableEmitChange) {
        this.disableEmitChange = false;
      }

      //this.dispatch('FormItem', 'on-form-change', val);
    }
  },
  methods: {
    remoteMethod (query) {
      this.$emit('on-search', query);
    },
    inputValue (val) {
      // 抛出input
      this.$emit('input', val);
    },
    handleChange (val, event) {
      if (val !== undefined) {
        this.currentValue = val;
        this.$refs.input.blur();
        this.$emit('on-disable', true);
      }
      // this.$emit('on-select', val,event);
    },
    handleFocus (event) {
      this.$emit('on-focus', event);
    },
    handleBlur (event) {
          if (this.enterType) {
            setTimeout(()=>{
            if (this.$refs.select.focusIndex === -1 && this.currentValue.length > 0 && !this.defaultValue[0] && this.filteredData.length > 0) {
                  this.autoSelected();
            } else {
              this.$emit('on-blur', event);
            }
           },250);
          } else {
            this.$emit('on-blur', event);
          }


    },
    handleKeydown (event) {
      if (event.keyCode !== 9) {
        this.$refs.select.visible = true;
      }
      if (event.keyCode === 13) {
        if (this.$refs.select.focusIndex === -1) {
          this.$emit('on-keydown', event);
          return false;
        }
        if (this.filteredData.length === 1) {
          let label = this.callLabel(this.filteredData[0]);
          let tem = {
            value: this.filteredData[0].id || this.filteredData[0].ID,
            tem: this.filteredData[0],
            label: label
          };
          this.defaultValue[0] = tem;
          this.currentValue = label;
          this.$emit('on-select', tem, this);
          setTimeout(() => {
            this.$emit('on-keydown', event);
          }, 100);
        } else if (this.filteredData.length > 1) {
          // console.log(this.$refs.select.focusIndex);

          let label = this.callLabel(
            this.filteredData[this.$refs.select.focusIndex]
          );
          let tem = {
            value:
              this.filteredData[this.$refs.select.focusIndex].id
              || this.filteredData[this.$refs.select.focusIndex].ID,
            tem: this.filteredData[this.$refs.select.focusIndex],
            label: label
          };
          this.defaultValue[0] = tem;
          setTimeout(() => {
            this.currentValue = label;
          }, 10);
          this.$emit('on-select', tem, this);
          this.$refs.select.visible = false;

          setTimeout(() => {

            this.$emit('on-keydown', event);
          }, 100);
        }
      }
      if (!this.filteredData || this.filteredData.length < 1) {
        this.$emit('on-keydown', event);
      }

      // this.$emit('on-keydown',event);
    },
    handleKeyup (event) {
      this.$emit('on-keyup', event);
    },
    handleInput (value) {
      this.defaultValue = [];
      this.$emit('on-input', value);
    }, // 输入的时候触发
    handleEnter (event) {
      // eslint-disable-next-line no-empty
      if (this.enterType) {

        if (this.$refs.select.focusIndex === -1 && this.currentValue.length > 0 && !this.defaultValue[0] && this.filteredData.length > 0) {
          this.autoSelected();
        } else {
          this.$emit('on-enter', event);
        }

      } else {
        this.$emit('on-enter', event);
      }

    },
    autoSelected () {
      if (this.filteredData.length > 0) {
        let label = this.callLabel(this.filteredData[0]);
        let tem = {
          value: this.filteredData[0].id || this.filteredData[0].ID,
          tem: this.filteredData[0],
          label: label
        };
        this.defaultValue[0] = tem;
        this.currentValue = label;
        this.$refs.select.visible = false;
        this.$emit('on-select', tem, this);
      }
    },
    handleKeypress (event) {
      this.$emit('on-keypress', event);
    },
    handleClear () {
      console.log('clear');
      this.$emit('on-disable', false);
      if (!this.clearable) {
        return;
      }
      this.currentValue = '';
      this.$refs.select.reset();
      this.$emit('on-clear');
    },
    selectOption (value) {
      this.defaultValue[0] = value;
      this.$emit('on-select', value, this);
    },
    callLabel (value) {
      if (!value) {
        return false;
      }
      let columns = Object.keys(this.columnsKey);
      if (columns.length < 1) {
        columns.push('value');
        this.columnsKey.push('value');
      }
      let lable = this.columnsKey.map((tem, i) => {
        if (i < columns.length - 1) {
          return `[${value[`${tem}`]}]`;
        } else {
          return value[`${tem}`];
        }
      });

      return lable.join('');
    }
  }
};
</script>
