<template>
  <div class="formlayout"
       :style="setForm"
       ref="formlayout">
    <div class="formlayout-Item"
         v-for="(options,index) in formList"
         :key="index"
         v-if="options.show"
         :style="setDiv(options)">
      <slot :item="options.item"
            v-if="!options.item.soltName"
            name="content">
        <!-- 组件文字 -->
        <slot name="label"
              :item="options.item">
          <div ref="label"
               class="formlayout-label"><i v-if="options.item.required">*</i>{{options.item.label}}：</div>
        </slot>
        <!-- 组件渲染 -->
        <div class="formlayout-div">
          <template v-if="options.item.vHtml">
            <!-- v-text -->
            <component :is="options.item.type"
                       :ref="`item${index}`"
                       @on-blur="onblur(options,index)"
                       v-on="options.item.event"
                       v-html="options.item.vHtml"
                       :key="index"
                       v-bind="options.item.props">
              <slot v-if="options.item.type ==='Select'">
                <Option v-for="item in options.item.props.options"
                        :value="item.value"
                        :key="item.value">{{ item.label }}
                  <span v-if="item.html"
                        v-html="item.html"></span>
                </Option>
              </slot>
            </component>

          </template>
          <template v-if="!options.item.vHtml">
            <component :is="options.item.type"
                       v-on="options.item.event"
                       :ref="`item${index}`"
                       @on-blur="onblur(options,index)"
                       v-model="options.item.props.value"
                       :key="index"
                       v-bind="options.item.props">
              <slot v-if="options.item.type ==='Select'">
                <Option v-for="item in options.item.props.options"
                        :value="item.value"
                        :key="item.value">{{ item.label }}
                  <span v-if="item.html"
                        v-html="item.html"></span>
                </Option>
              </slot>
            </component>

          </template>
          <slot name="tip"
                :item="options.item">
            <transition name="fade">
              <div class="formlayout-error-tip"
                   v-if="options.item.field && validateMessage[options.item.field]">{{validateMessage[options.item.field]}}</div>
            </transition>
          </slot>

        </div>
      </slot>

      <!-- 卡槽 -->
      <slot :name="options.item.soltName"
            :item="options.item"
            v-if="options.item.soltName"></slot>

    </div>
  </div>
</template>
<script>
import layoutAlgorithm from '../../utils/layoutAlgorithm';
import { deepCopy } from '../../utils/assist';

import burgeonConfig from '../../assets/config';

const prefixCls = `${burgeonConfig.prefixCls}FormLayout-item`;

export default {
  name: 'FormLayout',
  props: {
    defaultColumn: {
      //   默认展示列
      type: Number,
      default: 4
    },
    labelWidth: {
      //   默认展示列
      type: Number,
      default: 120

    },
    defaultconfig: {
      //   默认配置
      type: Array,
      default () {
        return [];
      }
    }
  },
  data () {
    return {
      formList: [],
      newdefaultconfig: [],
      prefixCls: prefixCls,
      validateMessage: {

      },
      deepCopyDefaultconfig: [],
      formData: {},
      type: [],

      verify: []
    };
  },
  computed: {
    // 计算属性的 div 的坐标起始点
    setDiv () {
      let { userAgent } = navigator;
      let rMsie = /(msie\s|trident.*rv:)([\w.]+)/;
      let match = rMsie.exec(userAgent.toLowerCase());
      if (match === null) {
        return item => ` grid-column:${item.x}/${item.col + item.x};grid-row:${
          item.y
          }/${item.y + item.row};`;

      } else {
        return item => ` 
        
         grid-column:${item.x};
        -ms-grid-columns:${item.x};
        grid-column-span:${item.col};
        -ms-grid-column-span:${item.col};
        -ms-grid-row:${item.y};
        -ms-grid-row-span:${item.row};
        grid-row-span:${item.row};
          grid-row:${item.y};`;

      }

    },
    setForm () {
      let width = (100 / this.defaultColumn).toFixed(2);
      let fr = new Array(this.defaultColumn).fill('1fr').join(' ');
      return `display: -ms-grid; display: grid;grid-columns: ${fr};grid-template-columns: repeat(${this.defaultColumn}, ${width}%);`;
    }

  },
  watch: {
    defaultconfig: {
      handler (val, old) {
        this.formList = this.dataColRol();
      },
      deep: true
    },
    defaultColumn: {
      handler (val, old) {
        this.formList = this.dataColRol();
      },
      deep: true
    }
  },
  methods: {
    dataColRol (type) {
      // 计算表单布局
      let list = {};
      let self = this;
      if (type === 'reset') {
        list = layoutAlgorithm(this.defaultColumn, deepCopy(this.deepCopyDefaultconfig));
      } else {
        list = layoutAlgorithm(this.defaultColumn, this.defaultconfig);
      }

      return Object.keys(list).reduce((temp, current) => {
        if (list[current].item.field){
          if (list[current].item.props){
            this.formData[list[current].item.field] = list[current].item.props && list[current].item.props.value;
          }
        }
        if (list[current].show !== false) {
          list[current].show = true;
        }
        temp.push(list[current]);
        return temp;
      }, []);
    },
    verifyMessage () {
      // 校验 必填
      this.verify = [];
      this.formList.forEach((item, index) => {
        // 是否必填 且 是显示的
        this.verifyMessageItem(item, index);
      });
      return this.verify;
    },
    onblur (item, index) {
      if (item.item.trigger) {
        this.verify = [];
        this.verifyMessageItem(item, index);
        this.$set(this.validateMessage, item.item.field, this.verify[0] && this.verify[0].tip || '');
      }
    },
    verifyMessageItem (item, index) {

      if (item.item.props && item.item.props.value && typeof item.item.props.value === 'string') {
        item.item.props.value = item.item.props.value.replace(/^\s+|\s+$/g, '');
      }
      if (item.item && item.item.required && item.show !== false) {
        if (item.item) {
          if ((!item.item.props.value && item.item.props.value !== 0) || JSON.stringify(item.item.props.value) === '[]') {
            this.verify.push({
              index: index,
              tip: `请输入${item.item.label}`
            });
            //return `请输入${item.item.label}`;
          } else if (item.item.props.regx) {
            let { value } = item.item.props;
            item.item.props.regx.lastIndex = 0;
            let checked = item.item.props.regx.test(value);
            if (!checked) {
              this.verify.push({
                index: index,
                tip: `请输入${item.item.label}`
              });
            }
          }
        }
      }


    },
    reset () {

      this.formList = this.dataColRol('reset');
      console.log(this.deepCopyDefaultconfig[0]);
    }

  },
  mounted () {
    this.deepCopyDefaultconfig = deepCopy(this.defaultconfig);
    this.formList = this.dataColRol();
  }
};
</script>


