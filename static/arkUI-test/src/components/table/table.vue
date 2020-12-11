/* eslint-disable camelcase */
<template>
  <div :class="wrapClasses"
       :style="styles">
    <div :class="classes">
      <div :class="[prefixCls + '-title']"
           v-if="showSlotHeader"
           ref="title">
        <slot name="header"></slot>
      </div>
      <div :class="[prefixCls + '-header']"
           v-if="showHeader"
           v-show="height!==false && height!=='' &&  height!==null"
           ref="header"
           @mousewheel="handleMouseWheel"
           :style="SpanHeight">
        <table cellspacing="0"
               cellpadding="0"
               border="0">
          <colgroup>
            <col v-for="(column, index) in cloneColumnsNav"
                 :style="setCellWidth(column)" />
          </colgroup>
          <table-head :prefix-cls="prefixCls"
                      :style="tableHeaderStyle"
                      :draggable="draggable"
                      :columns="cloneColumnsNav"
                      :type="'thead'"
                      :columnsType="headRowsShow"
                      :column-rows="columnRowsNav"
                      :obj-data="objData"
                      :SpanMethod="SpanMethod"
                      :columns-width="columnsWidth"
                      :data="rebuildData"></table-head>
          <!-- <table-body
                        ref="tbody"
                        :prefix-cls="prefixCls"
                        :style="tableStyle"
                        :columns="cloneColumns"
                        :data="rebuildData"
                        :ellipsis ="ellipsis"
                        :SpanMethod="SpanMethod"
                        :columns-width="columnsWidth"
                        :clickTimerTask="clickTask"
                        :obj-data="objData"></table-body> -->
        </table>
      </div>
      <div :class="[prefixCls + '-body']"
           :style="bodyStyle"
           ref="body"
           @scroll="handleBodyScroll">
        <table cellspacing="0"
               cellpadding="0"
               border="0"
               :style="tbodyStyle"
               ref="table">
          <colgroup>
            <col v-for="(column, index) in cloneColumns"
                 :style="setCellWidth(column,'body')">
          </colgroup>
          <table-head :prefix-cls="prefixCls"
                      :style="tableHeaderStyle"
                      v-if="showHeader"
                      :columns="cloneColumns"
                      :column-rows="columnRows"
                      :obj-data="objData"
                      :SpanMethod="SpanMethod"
                      :columns-width="columnsWidth"
                      :data="rebuildData"></table-head>
          <table-body ref="tbody"
                      :class="totalData.length ? [prefixCls + '-relative'] :''"
                      v-if="!((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))"
                      :prefix-cls="prefixCls"
                      :lazy="lazy"
                      :style="tableStyle"
                      :columns="cloneColumns"
                      :data="rebuildData"
                      :SpanMethod="SpanMethod"
                      :tree-props="setTreeProps"
                      :ellipsis="ellipsis"
                      :tabindex="tabindex"
                      :columns-width="columnsWidth"
                      :clickTimerTask="clickTask"
                      :obj-data="objData"></table-body>
          <tbody :style="tableStyle"
                 :tree-props="setTreeProps"
                 v-if="((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))">
            <tr>

              <!-- <td :style="{'width':`${this.headerWidth ? this.headerWidth+'px' : '100%'}`,'border':'none'}"
                  :colspan="this.cloneColumns.length"></td> -->
            </tr>
          </tbody>
          <table-foot ref="tfoot"
                      v-show="tableFootShow"
                      :prefix-cls="prefixCls"
                      :SpanMethod="SpanMethod"
                      :style="tableStyleFoot"
                      :columns-width="columnsWidth"
                      :columns="cloneColumns"
                      :ellipsis="ellipsis"
                      :obj-data="objTotalData">

          </table-foot>
        </table>
        <div :style="{'padding':(((bodyStyle.bodyHeight-10)/2 )>20  ? (bodyStyle.bodyHeight-20)/2 :20)+'px','vertical-align': 'middle','text-align': 'center',}"
             v-if="!data || data.length === 0">
          <div v-html="localeNoDataText"></div>
        </div>
      </div>
      <!-- <div
                :class="[prefixCls + '-tip']" :style="bodyStyle" @scroll="handleBodyScroll"
                v-show="((!!localeNoDataText && (!data || data.length === 0)) || (!!localeNoFilteredDataText && (!rebuildData || rebuildData.length === 0)))">
                <table cellspacing="0" cellpadding="0" border="0">
                    <tbody
                        :style="tableStyle"
                    >
                    <tr>
                        <td :style="{'height':bodyStyle.height,'width':`${this.headerWidth}px`,'padding-top':`${bodyStyle.height ? (this.theadHeight/2) :this.theadHeight}px`}">
                            <span v-html="localeNoDataText" v-if="!data || data.length === 0"></span>
                            <span v-html="localeNoFilteredDataText" v-else></span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div> -->
      <div :class="[prefixCls + '-fixed']"
           :style="fixedTableStyle"
           v-if="isLeftFixed">
        <div :class="fixedHeaderClasses"
             v-if="showHeader">
          <table-head fixed="left"
                      ref="fixedHeader"
                      :prefix-cls="prefixCls"
                      :styleObject="fixedTableStyle"
                      :columns="leftFixedColumns"
                      :column-rows="columnRows"
                      :fixed-column-rows="leftFixedColumnRows"
                      :obj-data="objData"
                      :columns-width="columnsWidth"
                      :data="rebuildData"></table-head>
        </div>
        <div :class="[prefixCls + '-fixed-body']"
             :style="fixedBodyStyle"
             ref="fixedBody"
             @mousewheel="handleFixedMousewheel"
             @DOMMouseScroll="handleFixedMousewheel">
          <table-body fixed="left"
                      ref="fixedBodyCs"
                      :prefix-cls="prefixCls"
                      :styleObject="fixedTableStyle"
                      :columns="leftFixedColumns"
                      :class="totalData.length ? [prefixCls + '-relative'] :''"
                      :data="rebuildData"
                      :ellipsis="ellipsis"
                      :tabindex="tabindex"
                      :columns-width="columnsWidth"
                      :obj-data="objData"></table-body>
          <table-foot ref="LeftFoot"
                      v-show="tableFootShow"
                      :prefix-cls="prefixCls"
                      :SpanMethod="SpanMethod"
                      :ellipsis="ellipsis"
                      :columns-width="columnsWidth"
                      :columns="leftFixedColumns"
                      :obj-data="objTotalData">

          </table-foot>
        </div>
      </div>
      <div :class="[prefixCls + '-fixed-right']"
           :style="fixedRightTableStyle"
           v-if="isRightFixed">
        <div :class="fixedHeaderClasses"
             v-if="showHeader">
          <table-head fixed="right"
                      :prefix-cls="prefixCls"
                      :styleObject="fixedRightTableStyle"
                      :columns="rightFixedColumns"
                      :column-rows="columnRows"
                      :fixed-column-rows="rightFixedColumnRows"
                      :obj-data="objData"
                      ref="fixedHeader"
                      :columns-width="columnsWidth"
                      :data="rebuildData"></table-head>
          <!--bar-->
          <div v-if="this.showVerticalScrollBar"
               :class="[prefixCls + '-fixed-bar']"
               :style="setFixedBar"></div>

        </div>
        <div :class="[prefixCls + '-fixed-body']"
             :style="fixedBodyStyle"
             ref="fixedRightBody"
             @mousewheel="handleFixedMousewheel"
             @DOMMouseScroll="handleFixedMousewheel">
          <table-body fixed="right"
                      :prefix-cls="prefixCls"
                      :styleObject="fixedRightTableStyle"
                      :columns="rightFixedColumns"
                      :tabindex="tabindex"
                      :data="rebuildData"
                      :class="totalData.length ? [prefixCls + '-relative'] :''"
                      ref="fixedBodyCs"
                      :columns-width="columnsWidth"
                      :obj-data="objData"></table-body>
          <table-foot ref="RightFoot"
                      v-show="tableFootShow"
                      :prefix-cls="prefixCls"
                      :SpanMethod="SpanMethod"
                      :ellipsis="ellipsis"
                      :columns-width="columnsWidth"
                      :columns="rightFixedColumns"
                      :obj-data="objTotalData">

          </table-foot>
        </div>
      </div>
    </div>
    <Spin fix
          size="large"
          v-if="loading">
      <slot name="loading"></slot>
    </Spin>
  </div>
</template>
<script>
import elementResizeDetectorMaker from 'element-resize-detector';
import tableHead from './table-head.vue';
import tableBody from './table-body.vue';
import tableFoot from './table-foot.vue';
import Spin from '../spin/spin.vue';
import {
  oneOf, getStyle, deepCopy, getScrollBarSize
} from '../../utils/assist';
import { on, off } from '../../utils/dom';
import Csv from '../../utils/csv';
import ExportCsv from './export-csv';
import Locale from '../../mixins/locale';
import {
  getAllColumns, convertToRows, convertColumnOrder, getRandomStr
} from './util';
import burgeonConfig from '../../assets/config';

const prefixCls = `${burgeonConfig.prefixCls}table`;

let rowKey = 1;
let columnKey = 1;

export default {
  name: 'Table',
  mixins: [Locale],
  components: {
    tableHead, tableBody, Spin, tableFoot
  },
  provide () {
    return {
      tableRoot: this
    };
  },
  props: {
    data: {
      type: Array,
      default () {
        return [];
      }
    },
    totalData: {
      type: Array,
      default () {
        return [];
      }
    },
    clickTimerTask: {
      type: Number,
      default () {
        return 0;
      }
    },
    totalNum: {
      type: [Number, String]
    },
    columns: {
      type: Array,
      default () {
        return [];
      }
    },
    colRowMethod: {
      type: Function,
      default () {
        return '';
      }
    },
    size: {
      validator (value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default () {
        return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size;
      }
    },
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String, Boolean],
      default: false
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return '';
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    index: {
      type: [Number, String]
    },
    loading: {
      type: Boolean,
      default: false
    },
    draggableMethod: {
      type: Function,
      default () {
        return '';
      }
    },
    ctrlAll: {
      type: Function,
      default () {
        return '';
      }
    },
    shiftAdd: {
      type: Function,
      default () {
        return '';
      }
    },
    ctrlAdd: {
      type: Function,
      default () {
        return '';
      }
    },
    draggable: {
      type: Boolean,
      default: false
    },
    tabindex: {
      type: Boolean,
      default: false
    },
    ellipsis: {
      type: Boolean,
      default: true
    },
    treeProps: {
      type: Object,
      default () {
        return {};
      }
    },
    load: {
      type: Function,
      default () {
        return '';
      }
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const colsWithId = this.makeColumnsId(this.columns);
    return {
      ready: false,
      tableWidth: 0,
      columnsWidth: {},
      prefixCls: prefixCls,
      compiledUids: [],
      objData: [], // checkbox or highlight-row
      objTotalData: [],
      indexROW: -1,
      rebuildData: [], // for sort or filter
      cloneColumns: this.makeColumns(colsWithId),
      cloneColumnsNav: this.makeColumns(colsWithId),
      columnRows: this.makeColumnRows(false, colsWithId),
      columnRowsNav: this.makeColumnRows(false, colsWithId),
      leftFixedColumnRows: this.makeColumnRows('left', colsWithId),
      rightFixedColumnRows: this.makeColumnRows('right', colsWithId),
      allColumns: getAllColumns(colsWithId), // for multiple table-head, get columns that have no children
      showSlotHeader: true,
      showSlotFooter: true,
      bodyHeight: 0,
      scrollBarWidth: getScrollBarSize(),
      currentContext: this.context,
      cloneData: [], // when Cell has a button to delete row data, clickCurrentRow will throw an error, so clone a data
      showVerticalScrollBar: false,
      showHorizontalScrollBar: false,
      headerWidth: 0,
      headerHeight: 0,
      widthNumber: [],
      tdwidthNumber: [],
      translateY: 0,
      tableFootShow: false,
      headRowsShow: true,
      scrollFooter: 0,
      tfootHeight: 0, // 表格foot 的高度
      setHeight: '',
      handTimer: '',
      spreadData: [], // 表格展开数据
      Data: [],
      treeIndex: 0,
      showtHeader: true,
      theadHeight: 0,
      clickTimer: null
    };
  },
  computed: {
    clickTask () {
      return this.clickTimerTask;
    },
    setTreeProps () {
      // 子集页面判断
      return this.treeProps;
    },
    localeNoDataText () {
      if (this.noDataText === undefined) {
        return this.t('i.table.noDataText');
      } else {
        return this.noDataText;
      }
    },
    localeNoFilteredDataText () {
      if (this.noFilteredDataText === undefined) {
        return this.t('i.table.noFilteredDataText');
      } else {
        return this.noFilteredDataText;
      }
    },
    wrapClasses () {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-hide`]: !this.ready,
          [`${prefixCls}-with-header`]: this.showSlotHeader,
          [`${prefixCls}-with-footer`]: this.showSlotFooter
        }
      ];
    },
    classes () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size,
          [`${prefixCls}-border`]: this.border,
          [`${prefixCls}-stripe`]: this.stripe,
          [`${prefixCls}-with-fixed-top`]: !!this.setTableHeight
        }
      ];
    },
    fixedHeaderClasses () {
      return [
        `${prefixCls}-fixed-header`,
        {
          [`${prefixCls}-fixed-header-with-empty`]: !this.rebuildData.length
        }
      ];
    },
    styles () {
      let style = {};
      if (this.setTableHeight) {
        const height = parseInt(this.setTableHeight);
        style.height = `${height}px`;
      }
      if (this.width) {
        style.width = `${this.width}px`;
      }
      return style;
    },
    style () {
      let style = {};
      if (this.tableWidth !== 0) {
        let width = '';
        width = this.tableWidth;
        style.width = `${width}px`;
      }
      return style;
    },
    tableHeaderStyle () {
      let style = {};
      if (this.tableWidth !== 0) {
        let width = '';
        if (this.bodyHeight === 0) {
          width = this.tableWidth;
        } else {
          width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        }

        style.width = `${width}px`;
      }
      return style;


    },
    tableStyle () {
      let style = {};
      if (this.tableWidth !== 0) {
        let width = '';
        if (this.bodyHeight === 0) {
          width = this.tableWidth;
        } else {
          width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        }
        style.width = `${width}px`;
      }
      return style;
    },
    setFixedBar () {
      return `width:${this.showVerticalScrollBar ? this.scrollBarWidth : 0}px;
                        right:-${this.showVerticalScrollBar ? this.scrollBarWidth : 0}px;
                        height:${this.theadHeight}px`;
    },
    fixedTableStyle () {
      let style = {};
      let width = 0;
      // this.leftFixedColumns.forEach((col) => {
      //   if (col.fixed && col.fixed === 'left') {
      //     console.log(col);
      //     width += col._width+1;
      //   }
      // });
      // style.width = `${width}px`;
      return style;
    },
    fixedRightTableStyle () {
      let style = {};
      let width = 0;
      this.rightFixedColumns.forEach((col) => {
        if (col.fixed && col.fixed === 'right') {
          width += Number(col.width + 1);

        }
      });
      width = width + 1;
      style.width = `${width}px`;

      //
      if (this.$refs.fixedRightBody && this.$refs.fixedHeader) {
        this.$refs.fixedHeader.$el.style.minWidth = `${width}px`;
        this.$refs.fixedBodyCs.$el.style.minWidth = `${width}px`;
      }
      style.right = `${this.showVerticalScrollBar ? this.scrollBarWidth : 1}px`;
      return style;
    },
    /*   translateY(){
           if (this.$refs.tbody){
               setTimeout(()=>{
                   let height=this.$refs.tbody.$el.offsetHeight;
                   let top=this.$refs.fixedBody.scrollTop;
                   console.log(top+this.setHeight,height,this.tfootHeight,'000');

                   return top+this.setHeight-300-this.tfootHeight;
               },10);


           } else {
               return 0;
           }
       },*/
    tableStyleFoot () {
      let style = {};
      if (this.$refs.tbody && this.spreadData.length > 0) {
        this.tableFootShow = true;
      } else {
        this.tableFootShow = false;
      }

      if (this.tableWidth !== 0) {
        let width = '';
        if (this.bodyHeight === 0) {
          width = this.tableWidth;
        } else {
          width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        }
        style.width = `${width}px`;
        let totalLength = Object.keys(this.totalData).length;

        if (totalLength > 0 && this.showVerticalScrollBar) {
          this.translateY = parseFloat(this.height) - this.theadHeight * totalLength - 1;
          if (this.$refs.fixedBody) {
            let top = this.$refs.fixedBody.scrollTop;
            if (this.$refs.tfoot && this.$refs.tfoot.$el) {
              this.tfootHeight = this.$refs.tfoot.$el.offsetHeight;
              if (this.$refs.body.scrollTop === 0) {
                this.settranslateY(0);
              }
            }
          } else if (this.$refs.body.getClientRects()[0] && this.$refs.body.scrollTop === 0) {
            this.settranslateY(0);
          }

        } else if (totalLength > 0 && !this.showVerticalScrollBar) {
          this.translateY = 0;
          this.setFoottranslate(0);
        }
      }
      return style;

    },
    fixedRightHeaderStyle () {
      let style = {};
      let width = 0;
      let height = this.headerHeight;
      if (this.showVerticalScrollBar) {
        width = this.scrollBarWidth;
      }
      style.width = `${width}px`;
      style.height = `${this.theadHeight}px`;

      //style.height = `${height}px`;
      return style;
    },
    fixedBodyStyle () {
      let style = {};
      if (this.bodyHeight !== 0) {
        let height = this.bodyHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0) - 1;
        style.height = this.showHorizontalScrollBar ? `${height.toFixed(0)}px` : `${height.toFixed(0) - 1}px`;
      }
      return style;
    },
    leftFixedColumns () {
      return convertColumnOrder(this.cloneColumnsNav, 'left');
    },
    rightFixedColumns () {
      //console.log('fix',this.columns);

      return convertColumnOrder(this.cloneColumnsNav, 'right');
    },
    isLeftFixed () {
      return this.columns.some(col => col.fixed && col.fixed === 'left');
    },
    isRightFixed () {
      return this.columns.some(col => col.fixed && col.fixed === 'right');
    },
    SpanMethod (option) {
      return this.colRowMethod;
    },
    tbodyStyle () {
      let style = {};
      if (this.height) {
        style.marginTop = `-${this.theadHeight}px`;
      } else {
        style.marginTop = '0px';
      }
      return style;

    },
    bodyStyle () {
      let style = {};
      if (this.bodyHeight !== 0) {
        const height = this.bodyHeight;
        style.height = `${this.setHeight - 1 - this.theadHeight}px`;
        style.bodyHeight = (height / 2) + 10;
      }
      return style;
    },
    SpanHeight () {
      let width = '';
      if (this.tableWidth !== 0) {
        if (this.bodyHeight === 0) {
          width = this.tableWidth;
        } else {
          width = this.tableWidth - (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        }
      }
      return `height:${this.theadHeight}px;overflow: hidden;position: relative; z-index: 2;`;

    },
    SpanTop () {
      //return `marginTop:-32px;width:${this.tableWidth}px`;
    },
    setTableHeight () {
      return this.setHeight;
    }

  },
  methods: {
    deepCopy (data) {
      return JSON.parse(JSON.stringify(data));
    },
    rowClsName (index) {
      return this.rowClassName(this.spreadData[index], index);
    },
    handleResize (key) {
      // clearTimeout(this.handTimer);
      // this.handTimer = setTimeout(()=>{
      //         },5);

      this.handleResizeInit(key);
    },
    handleResizeInit (key) {
      let hasWidthColumns = [];
      let noWidthColumns = [];
      let maxWidthColumns = [];
      let noMaxWidthColumns = [];
      let that = this;
      let theadHeight = 0;

      if (this.$refs.tbody && this.$refs.tbody.$children && this.$refs.body.querySelector('thead')) {
        theadHeight = this.$refs.body.querySelector('thead').offsetHeight;
        this.theadHeight = theadHeight;
        Object.keys(this.$refs.tbody.objData).forEach((index) => {
          if (this.objData[index]) {
            let _index = index;
            if (that.$refs.tbody.$children[_index]) {
              let item = that.$refs.tbody.$children[_index];
              if (getComputedStyle(item.$el).height === 'auto') {
                that.objData[index]._height = parseFloat(item.$el.offsetHeight).toFixed(2);
              } else {
                that.objData[index]._height = parseFloat(getComputedStyle(item.$el).height).toFixed(2);
              }
            }
          }
        });

      }
      this.objData = Object.assign({}, this.objData);
      this.cloneColumns.forEach((col, i) => {
        if (col.width) {
          hasWidthColumns.push(col);
        } else {
          noWidthColumns.push(col);
          if (col.minWidth) {
            sumMinWidth += col.minWidth;
          }
          if (col.maxWidth) {
            maxWidthColumns.push(col);
          } else {
            noMaxWidthColumns.push(col);
          }
        }

      });
      let tableWidth = this.$el.offsetWidth;
      let readyWidth = 0;
      let computReadyWidth = 0;
      let cloneColumnsNav = deepCopy(this.cloneColumnsNav);
      if (this.$refs.body && this.$refs.body.querySelector('thead').offsetWidth) {
        readyWidth = this.$refs.body.querySelector('thead').offsetWidth;
        //let ScrollBar = this.showVerticalScrollBar ? this.scrollBarWidth : 0;

        this.tableWidth = tableWidth > readyWidth ? tableWidth : readyWidth;
        //computReadyWidth = this.tableWidth;
      }

      for (let i = 0; i < this.cloneColumns.length; i++) {
        const column = this.cloneColumns[i];
        if (this.$refs.body && this.$refs.body.querySelector('thead')) {
          let th = this.$refs.body.querySelector('tbody').querySelector('tr').querySelectorAll('td');
          if (this.rebuildData.length < 1) {
            th = this.$refs.body.querySelector('thead').querySelectorAll('th');
          } else {
            th = this.$refs.body.querySelector('tbody').querySelector('tr').querySelectorAll('td');
          }


          if (th && th[i]) {
            let div = th[i];
            if (this.cloneColumns[i] && !this.cloneColumns[i].width && div) {
              let borderWidth = parseFloat(getComputedStyle(div).borderRight) || 0;
              if (borderWidth === 0 && this.border) {
                let checkActiveXObject = !!window.ActiveXObject || 'ActiveXObject' in window;
                if (!checkActiveXObject) {
                  if (getComputedStyle(div)['-moz-border-end-width']){
                    borderWidth = parseFloat(getComputedStyle(div)['-moz-border-end-width'])|| 1;
                    if (borderWidth === 1){
                        borderWidth = 1.15;
                    }
                  }
                }
              }
              let cloWidth = parseFloat(getComputedStyle(div).width);
              if (i + 1 < this.cloneColumns.length) {
                cloWidth = cloWidth - borderWidth;
              }

              cloneColumnsNav[i].width = cloWidth;
              cloneColumnsNav[i]._width = cloWidth;
            } else if (this.cloneColumns[i] && this.cloneColumns[i].width && div) {
              cloneColumnsNav[i].width = this.cloneColumns[i].width;
              cloneColumnsNav[i]._original = this.cloneColumns[i].width;
              cloneColumnsNav[i]._width = this.cloneColumns[i].width;
            }


          }
          if (i < cloneColumnsNav.length - 1) {
            //computReadyWidth = computReadyWidth -Number(cloneColumnsNav[i].width);

            //console.log(this.tableWidth,this.tableWidth - Number(cloneColumnsNav[i].width),'==',i,cloneColumnsNav[i].width);
          } else {
            // let endWidth = computReadyWidth-Number(cloneColumnsNav[i].width);
            cloneColumnsNav[i].width = cloneColumnsNav[i].width - 1;
            cloneColumnsNav[i]._width = cloneColumnsNav[i].width - 1;

            // if (!this.cloneColumns[i].width){
            //  cloneColumnsNav[i].width = this.cloneColumns[i].width+endWidth;
            //  cloneColumnsNav[i]._original = this.cloneColumns[i].width+endWidth;
            //  this.cloneColumns[i].width = this.cloneColumns[i].width+endWidth;


            // }


          }
        }

      }
      this.cloneColumnsNav = cloneColumnsNav;

      if (this.height === true) {
        let ScrollBar = this.showHorizontalScrollBar ? this.scrollBarWidth : 0;
        if (this.$el.parentNode) {
          this.setHeight = this.$el.parentNode.offsetHeight;
        }
      } else {
        this.setHeight = parseFloat(this.height);
      }
      this.fixedHeader();

    },
    handleMouseIn (_index) {
      if (this.disabledHover) {
        return;
      }
      if (this.objData[_index]._isHover) {
        return;
      }
      this.objData[_index]._isHover = true;
    },
    handleMouseOut (_index) {
      if (this.disabledHover) {
        return;
      }
      this.objData[_index]._isHover = false;
    },
    // 通用处理 highlightCurrentRow 和 clearCurrentRow
    handleCurrentRow (type, _index) {
      let oldIndex = -1;
      for (let i in this.objData) {
        if (this.objData[i]._isHighlight) {
          oldIndex = parseInt(i);
          this.objData[i]._isHighlight = false;
        }
      }
      if (type === 'highlight') {
        this.objData[_index]._isHighlight = true;
      }
      const oldData = oldIndex < 0 ? null : JSON.parse(JSON.stringify(this.cloneData[oldIndex]));
      const newData = type === 'highlight' ? JSON.parse(JSON.stringify(this.cloneData[_index])) : null;
      this.$emit('on-current-change', newData, oldData);
    },
    highlightCurrentRow (_index) {
      if (!this.highlightRow || this.objData[_index]._isHighlight) {
        return;
      }
      this.handleCurrentRow('highlight', _index);
    },
    clearCurrentRow () {
      if (!this.highlightRow) {
        return;
      }
      this.handleCurrentRow('clear');
    },
    clickCurrentRow (_index, event) {
      clearTimeout(this.clickTimer);
      this.indexROW = -1;
      this.clickTimer = setTimeout(() => {
        this.highlightCurrentRow(_index);
        this.$emit('on-row-click', JSON.parse(JSON.stringify(this.cloneData[_index])), _index, event);
      }, this.clickTimerTask);
    },
    dblclickCurrentRow (_index, event) {
      this.indexROW = -1;
      clearTimeout(this.clickTimer);
      this.highlightCurrentRow(_index);
      this.$emit('on-row-dblclick', JSON.parse(JSON.stringify(this.cloneData[_index])), _index, event);
    },
    getSelection () {
      let selectionIndexes = [];
      for (let i in this.objData) {
        if (this.objData[i]._isChecked) {
          selectionIndexes.push(parseInt(i));
        }
      }
      return JSON.parse(JSON.stringify(this.spreadData.filter((data, index) => selectionIndexes.indexOf(index) > -1)));
    },
    toggleSelect (_index) {
      let data = {};
      for (let i in this.objData) {
        if (parseInt(i) === _index) {
          data = this.objData[i];
          break;
        }
      }
      const status = !data._isChecked;

      this.objData[_index]._isChecked = status;
      const selection = this.getSelection();
      this.$emit(status ? 'on-select' : 'on-select-cancel', selection, JSON.parse(JSON.stringify(this.spreadData[_index])));
      this.$emit('on-selection-change', selection);
    },
    toggleExpand (_index) {
      let data = {};

      for (let i in this.objData) {
        if (parseInt(i) === _index) {
          data = this.objData[i];
          break;
        }
      }
      const status = !data._isExpanded;
      this.objData[_index]._isExpanded = status;
      this.$emit('on-expand', JSON.parse(JSON.stringify(this.cloneData[_index])), status);

      if (this.setTableHeight) {
        this.$nextTick(() => this.fixedBody());
      }
    },
    getChildren (index, data, trData, expand) {
      if (Array.isArray(index) === false) {
        return [];
      }
      index.forEach((item, i) => {
        if (i < index.length - 1) {
          let spIndex = index.splice(0, i + 1);

          if (data[item] && data[item].children) {
            if (expand === true) {
              data[item]._expand = expand;
              data[item]._showchildren = expand;
            }
            this.getChildren(index, data[item].children, trData, expand);
          }
        } else {
          if (expand === true) {
            if (data[item].children.toString() !== trData.toString()) {
              data[item].children = JSON.parse(JSON.stringify(trData));
            }
          }
          data[item]._lazy = false;
          data[item]._expand = expand;
          data[item]._showchildren = expand;
        }

      });
    },
    setData (index, expand, data) {
      let message = [];
      if (typeof expand !=='boolean'){
          // eslint-disable-next-line no-throw-literal
          throw `${expand}传参类型出错,请输入布尔值`;
      }
       if (!Array.isArray(data)){
          // eslint-disable-next-line no-throw-literal
          throw `${data}传参类型出错,请输入数组`;
      }
      if (Array.isArray(data)) {
        message = data.reduce((arr, item) => {
          item._showchildren = item._showchildren || false;
          item._expand = item._expand || false;
          arr.push(item);
          return arr;
        }, []);
      }

      this.getChildren(index, this.data, message, expand);
    },
    toggleExpandTree (_index, row) {
      let data = {};
      for (let i in this.objData) {
        if (parseInt(i) === _index) {
          data = this.objData[i];
          break;
        }
      }
      this.treeIndex = _index;
      data._expand = !data._expand;
      const status = data._expand;
      let { _parentIndex } = JSON.parse(JSON.stringify(this.cloneData[_index]));

      if (status === false){
        this.setData(_parentIndex,false,[]);
      }
      this.$emit('on-expand', JSON.parse(JSON.stringify(this.cloneData[_index])), status, _parentIndex, this.setData);

      if (this.setTableHeight) {
        this.$nextTick(() => this.fixedBody());
      }
    },
    selectAll (status) {
      // this.rebuildData.forEach((data) => {
      //     if(this.objData[data._index]._isDisabled){
      //         this.objData[data._index]._isChecked = false;
      //     }else{
      //         this.objData[data._index]._isChecked = status;
      //     }

      // });
      for (const data of this.rebuildData) {
        if (this.objData[data._index]._isDisabled) {
          continue;
        } else {
          this.objData[data._index]._isChecked = status;
        }
      }
      const selection = this.getSelection();
      if (status) {
        this.$emit('on-select-all', selection);
      } else {
        this.$emit('on-select-all-cancel', selection);
      }
      this.$emit('on-selection-change', selection);
    },

    fixedHeader () {

      if (this.setTableHeight) {
        this.$nextTick(() => {
          const titleHeight = parseInt(getStyle(this.$refs.title, 'height')) || 0;
          const headerHeight = parseInt(getStyle(this.$refs.header, 'height')) || 0;
          const footerHeight = parseInt(getStyle(this.$refs.footer, 'height')) || 0;
          this.bodyHeight = this.setTableHeight - titleHeight - headerHeight - footerHeight;
          this.$nextTick(() => this.fixedBody());
        });
      } else {
        this.bodyHeight = 0;
        this.$nextTick(() => this.fixedBody());
      }
    },
    setCellWidth (column, type) {
      let width = '';

      if (column.width) {
        width = column.width;
      } else if (this.columnsWidth[column._index]) {

        width = this.columnsWidth[column._index].width;
      }
      if (width === '0') {
        width = '';
      }
      if (column.fixed) {
        // column.rowspan=4;
        if (!column._columnKey) {
          return `width:${width}px;height:${this.$parent.headHeight}px`;
        }
      }

      return `width:${width}px`;
    },
    fixedBody () {
      if (this.$refs.header) {
        this.headerWidth = this.$refs.header.children[0].offsetWidth;
        this.headerHeight = parseFloat(getComputedStyle(this.$refs.header.children[0]).height) - 1;
        this.headerWidth = parseFloat(getComputedStyle(this.$refs.header.children[0]).width);

        //this.showHorizontalScrollBar = this.headerWidth>this.$refs.header.offsetWidth;
      }

      if (!this.$refs.tbody || !this.spreadData || this.spreadData.length === 0) {
        this.showVerticalScrollBar = false;
      } else {
        let bodyContentEl = this.$refs.tbody.$el;
        let bodyEl = bodyContentEl.parentElement;
        let bodyContentHeight = bodyContentEl.offsetHeight;
        let bodyHeight = bodyEl.offsetHeight;

        this.showHorizontalScrollBar = this.$refs.body.offsetWidth < bodyContentEl.offsetWidth + (this.showVerticalScrollBar ? this.scrollBarWidth : 0);
        this.showVerticalScrollBar = this.bodyHeight ? this.$refs.table.offsetHeight + (this.showHorizontalScrollBar ? this.scrollBarWidth : 0) > this.setHeight : false;
        //console.log(this.$refs.table.offsetHeight,this.setHeight);

        if (this.showVerticalScrollBar) {
          bodyEl.classList.add(`${this.prefixCls}-overflowY`);
          this.settranslateY(this.$refs.body.scrollTop);
        } else {
          bodyEl.classList.remove(`${this.prefixCls}-overflowY`);
        }

        if (this.showHorizontalScrollBar) {
          bodyEl.classList.add(`${this.prefixCls}-overflowX`);
        } else {
          bodyEl.classList.remove(`${this.prefixCls}-overflowX`);
        }
      }
    },

    hideColumnFilter () {
      this.cloneColumns.forEach((col) => col._filterVisible = false);
    },
    settranslateY (Top) {
      // let height = this.$refs.tbody.$el.offsetHeight;
      // return false;
      // if ((this.$refs.table.offsetHeight+(this.showHorizontalScrollBar?this.scrollBarWidth:0)) < this.setHeight){
      //         return false;
      // }
      // if ( this.showVerticalScrollBar && Top!==0){
      //        this.translateY = this.setHeight+Top-this.$refs.table.offsetHeight- (this.showHorizontalScrollBar?this.scrollBarWidth:0);
      //         this.setFoottranslate();
      // } else {
      //     setTimeout(() =>{

      //     });
      // }
      if (!this.height) {
        return false;
      }
      if (this.showVerticalScrollBar) {
        this.translateY = this.setHeight + Top - this.$refs.table.offsetHeight - (this.showHorizontalScrollBar ? this.scrollBarWidth : 0);
      } else {
        this.translateY = 0;

      }
      //console.log(this,this.translateY,this.setHeight,Top,this.$refs.table.offsetHeight);
      //  setTimeout(()=>{
      //         if (Top === 0){
      // 			if (!this.showVerticalScrollBar){
      // 				this.translateY = 0;
      // 				this.setFoottranslate();
      // 			}
      //         }
      //     },0);
      this.setFoottranslate();


    },
    setFoottranslate () {
      if (this.$refs.tfoot) {
        this.$refs.tfoot.$el.style.transform = `translateY(${this.translateY}px)`;
      }
      if (this.$refs.RightFoot) {
        this.$refs.RightFoot.$el.style.transform = `translateY(${this.translateY}px)`;
      }
      if (this.$refs.LeftFoot) {
        this.$refs.LeftFoot.$el.style.transform = `translateY(${this.translateY}px)`;
      }
    },
    handleBodyScroll (event) {
      if (this.$refs.tbody) {
        if (Object.keys(this.totalData).length > 0) {
          this.settranslateY(event.target.scrollTop);
        }
      }
      if (this.showHeader) {
        this.$refs.header.scrollLeft = event.target.scrollLeft;
      }
      if (this.isLeftFixed) {
        this.$refs.fixedBody.scrollTop = event.target.scrollTop;
      }
      if (this.isRightFixed) {
        this.$refs.fixedRightBody.scrollTop = event.target.scrollTop;
      }


      this.hideColumnFilter();
    },
    sethandleBodyScroll (top) {
      if (this.$refs.tbody) {
        // if (Object.keys(this.totalData).length>0){
        //     this.settranslateY(top);
        // }
      }

      if (this.isLeftFixed) {
        this.$refs.fixedBody.scrollTop = top;
      }
      if (this.isRightFixed) {
        this.$refs.fixedRightBody.scrollTop = top;
      }
      this.hideColumnFilter();
    },
    handleFixedMousewheel (event) {
      let { deltaY } = event;
      if (!deltaY && event.detail) {
        deltaY = event.detail * 40;
      }
      if (!deltaY && event.wheelDeltaY) {
        deltaY = -event.wheelDeltaY;
      }
      if (!deltaY && event.wheelDelta) {
        deltaY = -event.wheelDelta;
      }
      if (!deltaY) {
        return;
      }
      const { body } = this.$refs;
      const currentScrollTop = body.scrollTop;
      if (deltaY < 0 && currentScrollTop !== 0) {
        event.preventDefault();
      }
      if (deltaY > 0 && body.scrollHeight - body.clientHeight > currentScrollTop) {
        event.preventDefault();
      }
      body.scrollTop += deltaY;
      //   let step = 0;
      //   let timeId = setInterval(() => {
      //     step += 5;
      //     if (deltaY > 0) {
      //       body.scrollTop += 2;
      //     } else {
      //       body.scrollTop -= 2;
      //     }
      //     if (step >= Math.abs(deltaY)) {
      //       clearInterval(timeId);
      //     }
      //   }, 5);
    },
    handleMouseWheel (event) {
      const { deltaX } = event;
      const $body = this.$refs.body;

      if (deltaX > 0) {
        $body.scrollLeft = $body.scrollLeft + 10;
      } else {
        $body.scrollLeft = $body.scrollLeft - 10;
      }
    },
    sortData (data, type, index) {
      const { key } = this.cloneColumns[index];
      data.sort((a, b) => {
        if (this.cloneColumns[index].sortMethod) {
          return this.cloneColumns[index].sortMethod(a[key], b[key], type);
        } else if (type === 'asc') {
          if (this.columns[index].sortType) {
            this.columns[index].sortType = type;
          }
          return a[key] > b[key] ? 1 : -1;
        } else if (type === 'desc') {
          if (this.columns[index].sortType) {
            this.columns[index].sortType = type;
          }
          return a[key] < b[key] ? 1 : -1;
        }
      });
      return data;
    },
    handleSort (_index, type) {
      const index = this.GetOriginalIndex(_index);
      this.cloneColumns.forEach((col) => col._sortType = 'normal');

      const { key } = this.cloneColumns[index];
      if (this.cloneColumns[index].sortable !== 'custom') { // custom is for remote sort
        if (type === 'normal') {
          this.rebuildData = this.makeDataWithFilter();
        } else {
          this.rebuildData = this.sortData(this.rebuildData, type, index);
        }
      }
      this.cloneColumns[index]._sortType = type;

      this.$emit('on-sort-change', {
        column: JSON.parse(JSON.stringify(this.allColumns[this.cloneColumns[index]._index])),
        key: key,
        order: type
      });
    },
    handleFilterHide (index) { // clear checked that not filter now
      if (!this.cloneColumns[index]._isFiltered) {
        this.cloneColumns[index]._filterChecked = [];
      }
    },
    filterData (data, column) {
      return data.filter((row) => {
        //如果定义了远程过滤方法则忽略此方法
        if (typeof column.filterRemote === 'function') {
          return true;
        }

        let status = !column._filterChecked.length;
        for (let i = 0; i < column._filterChecked.length; i++) {
          status = column.filterMethod(column._filterChecked[i], row);
          if (status) {
            break;
          }
        }
        return status;
      });
    },
    filterOtherData (data, index) {
      let column = this.cloneColumns[index];
      if (typeof column.filterRemote === 'function') {
        column.filterRemote.call(this.$parent, column._filterChecked, column.key, column);
      }

      this.cloneColumns.forEach((col, colIndex) => {
        if (colIndex !== index) {
          data = this.filterData(data, col);
        }
      });
      return data;
    },
    handleFilter (index) {
      const column = this.cloneColumns[index];
      let filterData = this.makeDataWithSort();

      // filter others first, after filter this column
      filterData = this.filterOtherData(filterData, index);
      this.rebuildData = this.filterData(filterData, column);

      this.cloneColumns[index]._isFiltered = true;
      this.cloneColumns[index]._filterVisible = false;
      this.$emit('on-filter-change', column);
    },
    /**
     * #2832
     * 应该区分当前表头的 column 是左固定还是右固定
     * 否则执行到 $parent 时，方法的 index 与 cloneColumns 的 index 是不对应的
     * 左固定和右固定，要区分对待
     * 所以，此方法用来获取正确的 index
     * */
    GetOriginalIndex (_index) {
      return this.cloneColumns.findIndex(item => item._index === _index);
    },
    handleFilterSelect (_index, value) {
      const index = this.GetOriginalIndex(_index);
      this.cloneColumns[index]._filterChecked = [value];
      this.handleFilter(index);
    },
    handleFilterReset (_index) {
      const index = this.GetOriginalIndex(_index);
      this.cloneColumns[index]._isFiltered = false;
      this.cloneColumns[index]._filterVisible = false;
      this.cloneColumns[index]._filterChecked = [];

      let filterData = this.makeDataWithSort();
      filterData = this.filterOtherData(filterData, index);
      this.rebuildData = filterData;
      this.$emit('on-filter-change', this.cloneColumns[index]);
    },
    makeRowChildren (row) {
      let rowmap = row[this.setTreeProps.children].reduce((arr, item, index) => {
        item._parent_ = `${row._parent_}_1`;
        if (item._expand === true && row._expand === false) {
          item._expand = row._expand || false;
        } else {
          item._expand = item._expand || false;
        }
        item._level = row._level + 1;
        item._showchildren = row._expand;
        item._lazy = item._lazy || false;
        if (!item._parentIndex) {
          item._parentIndex = [];
        }
        item._parentIndex = item._parentIndex.concat(row._parentIndex, [index]);

        item._eqIndex = index;
        if (this.setTreeProps && this.setTreeProps.children && Array.isArray(item[this.setTreeProps.children])) {
          arr.push(item);
          let option = this.makeRowChildren(item);
          arr = arr.concat(option);

        } else {
          arr.push(item);
        }


        return arr;
      }, []);
      return rowmap;
    },
    makeData () {
      let data = deepCopy(this.spreadData);
      data.forEach((row, index) => {
        row._index = index;
        row._rowKey = rowKey++;
      });
      return data;

    },
    makeDataWithSort () {
      let data = this.makeData();
      let sortType = 'normal';
      let sortIndex = -1;
      let isCustom = false;

      for (let i = 0; i < this.cloneColumns.length; i++) {
        if (this.cloneColumns[i]._sortType !== 'normal') {
          sortType = this.cloneColumns[i]._sortType;
          sortIndex = i;
          isCustom = this.cloneColumns[i].sortable === 'custom';
          break;
        }
      }
      if (sortType !== 'normal' && !isCustom) {
        data = this.sortData(data, sortType, sortIndex);
      }
      return data;
    },
    makeDataWithFilter () {
      let data = this.makeData();
      this.cloneColumns.forEach(col => data = this.filterData(data, col));
      return data;
    },
    makeDataWithSortAndFilter () {
      let data = this.makeDataWithSort();
      this.cloneColumns.forEach(col => data = this.filterData(data, col));
      return data;
    },
    makeObjData () {
      let data = {};

      if (this.spreadData.length > 0) {
        this.spreadData.forEach((row, index) => {
          // console.log(JSON.stringify(row));
          const newRow = this.deepCopy(row);// todo 直接替换
          //newRow._height = row._height;
          newRow._isHover = false;
          if (newRow._disabled) {
            newRow._isDisabled = newRow._disabled;
          } else {
            newRow._isDisabled = false;
          }
          if (newRow._checked) {
            newRow._isChecked = newRow._checked;
          } else {
            newRow._isChecked = false;
          }
          if (newRow._expanded) {
            newRow._isExpanded = newRow._expanded;
          } else {
            newRow._isExpanded = false;
          }
          if (newRow._highlight) {
            newRow._isHighlight = newRow._highlight;
          } else {
            newRow._isHighlight = false;
          }
          if (newRow._index) {
            newRow._index = newRow._index;
          } else {
            newRow._index = index;
          }
          data[index] = newRow;
        });

      }

      return data;
    },
    makeObjTotalData () {
      let data = {};
      if (this.totalData.length > 0) {
        this.totalData.forEach((row, index) => {
          const newRow = this.deepCopy(row);// todo 直接替换
          newRow._isHover = false;
          if (newRow._disabled) {
            newRow._isDisabled = newRow._disabled;
          } else {
            newRow._isDisabled = false;
          }
          if (newRow._checked) {
            newRow._isChecked = newRow._checked;
          } else {
            newRow._isChecked = false;
          }
          if (newRow._expanded) {
            newRow._isExpanded = newRow._expanded;
          } else {
            newRow._isExpanded = false;
          }
          if (newRow._highlight) {
            newRow._isHighlight = newRow._highlight;
          } else {
            newRow._isHighlight = false;
          }
          newRow._totalType = true;
          data[index] = newRow;

        });
      }
      return data;
    },
    // 修改列，设置一个隐藏的 id，便于后面的多级表头寻找对应的列，否则找不到
    makeColumnsId (columns) {
      return columns.map(item => {
        if ('children' in item) {
          item.children = this.makeColumnsId(item.children);
        }
        item.__id = getRandomStr(6);
        return item;
      });
    },
    makeColumns (cols) {
      // 在 data 时，this.allColumns 暂时为 undefined
      let columns = deepCopy(getAllColumns(cols));
      let left = [];
      let right = [];
      let center = [];

      columns.forEach((column, index) => {
        column._index = index;
        column._columnKey = columnKey++;
        column._width = column.width ? column.width : ''; // update in handleResize()
        column._sortType = 'normal';
        column._filterVisible = false;
        column._isFiltered = false;
        column._filterChecked = [];

        if ('filterMultiple' in column) {
          column._filterMultiple = column.filterMultiple;
        } else {
          column._filterMultiple = true;
        }
        if ('filteredValue' in column) {
          column._filterChecked = column.filteredValue;
          column._isFiltered = true;
        }

        if ('sortType' in column) {
          column._sortType = column.sortType;
        }

        if (column.fixed && column.fixed === 'left') {
          left.push(column);
        } else if (column.fixed && column.fixed === 'right') {
          right.push(column);
        } else {
          center.push(column);
        }
      });
      return left.concat(center).concat(right);
    },
    // create a multiple table-head
    makeColumnRows (fixedType, cols) {
      return convertToRows(cols, fixedType);
    },
    exportCsv (params) {
      if (params.filename) {
        if (params.filename.indexOf('.csv') === -1) {
          params.filename += '.csv';
        }
      } else {
        params.filename = 'table.csv';
      }

      let columns = [];
      let datas = [];
      if (params.columns && params.data) {
        columns = params.columns;
        datas = params.data;
      } else {
        columns = this.allColumns;
        if (!('original' in params)) {
          params.original = true;
        }
        datas = params.original ? this.spreadData : this.rebuildData;
      }

      let noHeader = false;
      if ('noHeader' in params) {
        noHeader = params.noHeader;
      }

      const data = Csv(columns, datas, params, noHeader);
      if (params.callback) {
        params.callback(data);
      } else {
        ExportCsv.download(params.filename, data);
      }
    },
    spread (data, parent) {
      // 数据展开
      let spreadData = data.reduce((arr, item, index) => {
        if (parent) {
          item._parentIndex = JSON.parse(JSON.stringify(parent));
          item._parentIndex = item._parentIndex.push(index);
          item._level = parent.length;
          item._parent_ = `${parent.reduce((parr, pitem, i) => {
            if (i === 0) {
              parr = `${pitem}_`;
            } else {
              parr = Number('1_');
            }
            return parr;
          }, '')}1`;

        } else {
          item._parentIndex = [index];
          item._parent_ = index;
          item._level = 0;
        }

        if (this.setTreeProps && this.setTreeProps.children && Array.isArray(item[this.setTreeProps.children])) {
          if (this.setTreeProps.expand || this.setTreeProps.expand === 0) {
            //  外部配置展开功能

            if (this.setTreeProps.expand === true) {
              item._expand = item._expand || true;
            } else if (this.setTreeProps.expand === false) {
              item._expand = item._expand || false;
            } else if (typeof Number(this.setTreeProps.expand) === 'number') {

              if (index === this.setTreeProps.expand) {
                item._expand = true;
              } else {
                item._expand = item._expand || false;
              }
            }

          } else {
            item._expand = item._expand || false;
          }
          item._lazy = item._lazy || false;
          arr.push(item);
          let option = this.makeRowChildren(item);
          arr.push(...option);
        } else {
          arr.push(item);
        }
        return arr;
      }, []);
      return spreadData;

    }
  },
  created () {
    if (!this.context) {
      this.currentContext = this.$parent;
    }
    this.indexROW = this.index;
    // 数据展开
    if (this.setTreeProps && this.setTreeProps.children) {
      this.spreadData = this.spread(JSON.parse(JSON.stringify(this.data)));
    } else {
      this.spreadData = this.data;
    }
    this.objData = this.makeObjData();
    this.objTotalData = this.makeObjTotalData();
    this.cloneData = this.deepCopy(this.spreadData);
    this.showSlotHeader = this.$slots.header !== undefined;
    this.showSlotFooter = this.$slots.footer !== undefined;
    this.rebuildData = this.makeDataWithSortAndFilter();
  },
  mounted () {
    //this.handleResize(0);
    this.$nextTick(() => this.ready = true);
    on(window, 'resize', this.handleResize('clone'));
    this.observer = elementResizeDetectorMaker();
    if (this.$refs.body) {
      this.observer.listenTo(this.$refs.body, this.handleResize);
    }
    this.$on('on-visible-change', (val) => {
      if (val) {
        this.handleResize(3);
      }
    });

    if (this.totalData.length > 0 && this.spreadData.length) {
      this.tableFootShow = true;
    } else {
      // this.tableFootShow = false;
    }
  },
  beforeDestroy () {
    if (this.$el) {
      off(window, 'resize', this.handleResize(9));
      this.observer.removeListener(this.$el, this.handleResize);
    }
  },
  updated () {
    this.indexROW = this.index;
    this.$nextTick(() => {
      setTimeout(() => {
        if (this.indexROW !== undefined && this.objData[this.indexROW]) {
          this.objData[this.indexROW]._isHighlight = true;
        }
      }, 100);
    });
  },
  watch: {
    cloneColumns: {
      handler (val, old) {
        val.forEach((item, i) => {
          let { width } = this.cloneColumnsNav[i];
          this.cloneColumnsNav[i] = Object.assign(this.cloneColumnsNav[i], item);
          this.cloneColumnsNav[i].width = width;
          this.cloneColumnsNav[i]._width = width;
        });
        if (JSON.stringify(val) !== JSON.stringify(old)) {
          this.$nextTick(() => {
            this.handleResize('clone');
          });
        }

        //this.handleResize(0);
        //   if ( this.$refs.tbody && this.$refs.tbody.$children ){
        //       console.log(this.$refs.tbody.objData,this.$refs.tbody.data);
        //        this.objData = Object.assign(this.$refs.tbody.objData,this.$refs.tbody.data);
        //             Object.keys(this.objData).forEach((index) =>{

        //                 if (this.objData[index]._index){
        //                         let _index = this.objData[index]._index;
        //                         if (this.$refs.tbody.$children[_index]){
        //                         let item = this.$refs.tbody.$children[_index];
        //                             this.objData[index]._height = item.$el.offsetHeight;
        //                         }
        //                 }

        //             });

        //     }


      },
      deep: true
    },
    data: {
      handler (val, old) {
        // 数据展开
        if (this.setTreeProps && this.setTreeProps.children) {
          this.spreadData = this.spread(JSON.parse(JSON.stringify(val)));
        } else {
          this.spreadData = val;
        }
        const oldDataLen = this.rebuildData.length;
        this.objData = this.makeObjData();

        if (this.totalData.length > 0) {
          this.objTotalData = this.makeObjTotalData();
          if (val.length > 0) {
            this.tableFootShow = true;
          }
        } else {
          //this.tableFootShow = false;

        }
        this.rebuildData = this.makeDataWithSortAndFilter();

        this.$nextTick(() => {
          if (this.totalData.length > 0 && this.$refs.body) {
            this.settranslateY(this.$refs.body.scrollTop);
          }
          if (val.length > oldDataLen) {
            this.handleResize(9);
          } else {
            this.handleResize(5);
          }

        });

        if (!oldDataLen) {
          this.fixedHeader();
        }
        // here will trigger before clickCurrentRow, so use async
        setTimeout(() => {
          this.cloneData = this.deepCopy(this.spreadData);
          this.handleResize(11);
        }, 0);

      },
      deep: true
    },
    totalData: {
      handler (val) {
        if (val.length > 0) {
          this.objTotalData = this.makeObjTotalData();
          if (val.length > 0 && this.spreadData.length) {
            this.tableFootShow = true;
          } else {
            // this.tableFootShow = false;
          }
        }

      },
      deep: true
    },
    columns: {
      handler () {
        // todo 这里有性能问题，可能是左右固定计算属性影响的
        let columns = deepCopy(this.columns);
        const colsWithId = this.makeColumnsId(columns);
        this.allColumns = getAllColumns(colsWithId);
        this.cloneColumns = this.makeColumns(colsWithId);
        this.cloneColumnsNav = this.makeColumns(colsWithId);
        this.columnRows = this.makeColumnRows(false, colsWithId);
        this.columnRowsNav = this.makeColumnRows(false, colsWithId);
        this.leftFixedColumnRows = this.makeColumnRows('left', colsWithId);
        this.rightFixedColumnRows = this.makeColumnRows('right', colsWithId);
        this.rebuildData = this.makeDataWithSortAndFilter();
        this.handleResize(5);
      },
      deep: true
    },
    height () {
      this.handleResize(6);
    },
    showHorizontalScrollBar () {
      this.handleResize(8);
    },
    showVerticalScrollBar () {
      this.handleResize(9);
    }
  }
};
</script>
