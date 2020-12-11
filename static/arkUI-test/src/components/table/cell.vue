<template>
  <div :class="classes"
       ref="cell">
    <template v-if="!totalType">
      <!-- 不是合计 -->

      <template v-if="renderType === 'index'"><span>{{ column.indexMethod ? column.indexMethod(row,total) : (naturalIndex + 1) }}</span></template>
      <template v-if="renderType === 'selection'">
        <Checkbox :value="checked"
                  @click.native.stop="handleClick(row)"
                  @on-change="toggleSelect"
                  :disabled="disabled"></Checkbox>
      </template>
      <template v-if="renderType === 'html'"><span v-html="row[column.key]"></span></template>
      <template v-if="renderType === 'normal'">
        <template v-if="row._level>0  && column._index === (treeProps.columnIndex || 0)">
          <span :style="setLevel(row._level)"></span>
        </template>
        <template v-if="treeProps &&treeProps.children && row[treeProps.children] && column._index === (treeProps.columnIndex || 0)">
          <div :class="expandClsTree(row)"
               @click.prevent.stop="toggleExpandTree(row)"
               style="display: inline-block;">
            <Icon v-if="!row._lazy"
                  type="ios-arrow-forward"></Icon>
            <Icon v-if="row._lazy"
                  type="ios-loading"></Icon>
          </div>
        </template>

        <template v-if="column.tooltip">
          <Tooltip transfer
                   :content="row[column.key]"
                   :disabled="!showTooltip"
                   :max-width="300"
                   :word-wrap="true"
                   :class="[`${burgeonConfig.prefixCls}table-cell-tooltip`]">
            <span ref="content"
                  @mouseenter="handleTooltipIn"
                  @mouseleave="handleTooltipOut"
                  :class="[`${burgeonConfig.prefixCls}table-cell-tooltip-content`]">{{ row[column.key] }}</span>
          </Tooltip>
        </template>
        <span v-else>{{row[column.key]}}</span>
      </template>
      <template v-if="renderType === 'expand' && !row._disableExpand">
        <div :class="expandCls"
             @click="toggleExpand">
          <Icon type="ios-arrow-forward"></Icon>
        </div>
      </template>
      <Cell v-if="renderType === 'render'"
            :row="row"
            :column="column"
            :index="index"
            :render="column.render"></Cell>
      <table-slot v-if="renderType === 'slot'"
                  :row="row"
                  :column="column"
                  :index="index"></table-slot>
    </template>
    <template v-else>
      <template>
        <template v-if="column.tooltip">
          <Tooltip transfer
                   :content="row[column.key]"
                   :disabled="!showTooltip"
                   :max-width="300"
                   :word-wrap="true"
                   :class="[`${burgeonConfig.prefixCls}table-cell-tooltip`]">
            <span ref="content"
                  @mouseenter="handleTooltipIn"
                  @mouseleave="handleTooltipOut"
                  :class="[`${burgeonConfig.prefixCls}table-cell-tooltip-content`]">{{ row[column.key] }}</span>
          </Tooltip>
        </template>
        <span v-else>{{row[column.key]}}</span>
      </template>
    </template>

  </div>
</template>
<script>
import Cell from './expand';
import Icon from '../icon/icon.vue';
import Checkbox from '../checkbox/checkbox.vue';
import Tooltip from '../tooltip/tooltip.vue';
import burgeonConfig from '../../assets/config';
import TableSlot from './slot';

export default {
  name: 'TableCell',
  components: {
    Icon, Checkbox, Cell, Tooltip, TableSlot
  },
  inject: ['tableRoot'],
  props: {
    prefixCls: String,
    row: Object,
    column: Object,
    naturalIndex: Number, // index of rebuildData
    index: Number, // _index of data
    checked: Boolean,
    total: Number,
    disabled: Boolean,
    expanded: Boolean,
    totalType: {
      type: [Boolean, String],
      default: false
    },
    fixed: {
      type: [Boolean, String],
      default: false
    },
    treeProps: {
      type: [Object, String]

    },
    lazy: {
      type: Boolean,
      default: false
    }

  },
  data () {
    return {
      burgeonConfig: burgeonConfig,
      renderType: '',
      uid: -1,
      expandClass: false,
      lazySet: false,
      context: this.$parent.$parent.$parent.currentContext,
      showTooltip: false // 鼠标滑过overflow文本时，再检查是否需要显示
    };
  },
  computed: {
    classes () {
      return [
        `${this.prefixCls}-cell`,
        {
          [`${this.prefixCls}-hidden`]: !this.fixed && this.column.fixed && (this.column.fixed === 'left' || this.column.fixed === 'right'),
          [`${this.prefixCls}-cell-ellipsis`]: this.column.ellipsis !== false,
          [`${this.prefixCls}-cell-with-expand`]: this.renderType === 'expand',
          [`${this.prefixCls}-cell-with-selection`]: this.renderType === 'selection'
        }
      ];
    },
    expandClsTree () {
      return (item) => {

        if (item._expand) {
          if (item._lazy) {
            return `${this.prefixCls}-cell-expand ${this.burgeonConfig.prefixCls}load-loop`;
          } else {
            return `${this.prefixCls}-cell-expand ${this.prefixCls}-cell-expand-expanded`;
          }
        } else {
          return `${this.prefixCls}-cell-expand`;
        }

      };


    },
    expandCls () {
      return [
        `${this.prefixCls}-cell-expand`,
        {
          [`${this.prefixCls}-cell-expand-expanded`]: this.expanded
        }
      ];
    }
  },
  methods: {
    setLevel (n) {
      let level = 20 * n;
      return `padding-left:${level}px`;
    },
    toggleSelect () {

      if (this.$parent.$parent.$parent.tabindex) {
        this.$parent.$parent.clickToggleSelect(this.index);
      }
      this.$parent.$parent.$parent.toggleSelect(this.index);

    },
    toggleExpandTree (row) {
      // row._lazy = true;
      let { _expand } = row;
      let { _parent_, _level } = row;
      row._expand = !row._expand;

      if (this.lazy) {
        row._lazy = row._expand;
      }
      this.expandClass = !row._expand;
      let data = JSON.parse(JSON.stringify(this.$parent.$parent.$parent.rebuildData));
      this.$parent.$parent.$parent.rebuildData.forEach((item) => {
        if (new RegExp(`${_parent_}_1`).test(item._parent_)) {
          if (row._level < item._level) {
            if (_expand === true) {
              if (!this.lazy || !row._expand) {
                   item._showchildren = row._expand;
                   item._expand = row._expand;
               }
            } else if (item._level === _level + 1) {
                if (!this.lazy || !row._expand) {
                    item._showchildren = row._expand;
               }
            }
          }
        }
      });
      this.$parent.$parent.$parent.toggleExpandTree(this.index,row);
    },
    toggleExpand () {
      this.$parent.$parent.$parent.toggleExpand(this.index);
    },
    handleClick (row) {
      // 放置 Checkbox 冒泡
    },
    handleTooltipIn () {
      const $content = this.$refs.content;
      this.showTooltip = $content.scrollWidth > $content.offsetWidth;
    },
    handleTooltipOut () {
      // this.showTooltip = false;
    }
  },
  created () {
    if (this.column.type === 'index') {
      this.renderType = 'index';
    } else if (this.column.type === 'selection') {
      this.renderType = 'selection';
    } else if (this.column.type === 'html') {
      this.renderType = 'html';
    } else if (this.column.type === 'expand') {
      this.renderType = 'expand';
    } else if (this.column.render) {
      this.renderType = 'render';
    } else if (this.column.slot) {
      this.renderType = 'slot';
    } else {
      this.renderType = 'normal';
    }
  }
};
</script>
