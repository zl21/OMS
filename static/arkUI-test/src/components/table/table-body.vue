<template>
  <!-- <colgroup>
            <col v-for="(column, index) in columns" :style="setCellWidth(column,'body')">
                     @keyup="removeCode"

        </colgroup>-->
  <tbody :class="[ellipsis === false ? prefixCls + '-tbody tbody-ellipsis' :prefixCls + '-tbody']"
         :tabindex="[tabindex ? '999' : 'false' ]"
         @keydown="addKeyCode"
         @keyup="removeCode"
         style="outline: none">

    <template v-for="(row, index) in data">
      <table-tr :row="row"
                :key="row._rowKey"
                :prefix-cls="prefixCls"
                :style="setStyle(objData[index])"
                @mouseenter.native.stop="handleMouseIn(row._index)"
                @mouseleave.native.stop="handleMouseOut(row._index)"
                @click.native="clickCurrentRow($event,row._index)"
                @dblclick.native.stop="dblclickCurrentRow($event,row._index)">
        <template v-for="column in columns"
                  v-if="showMethod(column, row,row._index, column._index)">
          <td :class="alignCls(column, row)"
              :colspan="row.colspan"
              :rowspan="column.rowspan">
            <Cell :fixed="fixed"
                  :prefix-cls="prefixCls"
                  :row="row"
                  :tree-props="setTreeProps"
                  :key="column._columnKey"
                  :column="column"
                  :natural-index="index"
                  :index="row._index"
                  :lazy="lazy"
                  :total="data.length"
                  :style="setCellWidth(column,fixedType)"
                  :checked="rowChecked(row._index)"
                  :disabled="rowDisabled(row._index)"
                  :expanded="rowExpanded(row._index)"></Cell>
          </td>

        </template>

      </table-tr>
      <tr v-if="rowExpanded(row._index)"
          :class="{[prefixCls + '-expanded-hidden']: fixed}">
        <td :colspan="columns.length"
            :class="prefixCls + '-expanded-cell'">          
          <Expand :key="row._rowKey"
                  :row="row"
                  v-if="!setTreeProps.children"
                  :render="expandRender"
                  :index="row._index"></Expand>
        </td>
      </tr>
    </template>
  </tbody>
</template>
<script>
// todo :key="row"
import TableTr from './table-tr.vue';
import Cell from './cell.vue';
import Expand from './expand.js';
import Mixin from './mixin';

export default {
  name: 'TableBody',
  data () {
    return {
      clickTimer: null,
      eq: '',
      index: [],
      shiftKey: false, // 键盘shift 标记
      ctrlKey:false,
      rowIndex:null,
      fixedType:'',
      setTreeProps:'',
      columnsclick:{},
      moveTimer:null,
      repeat: false
    };
  },
  mixins: [Mixin],
  components: { Cell, Expand, TableTr },
  props: {
    prefixCls: String,
    styleObject: Object,
    columns: Array,
    data: Array, // rebuildData
    objData: Object,
    columnsWidth: Object,
    clickTimerTask: {
      type: Number,
      default () {
        return 0;
      }
    },
    SpanMethod: {
      type: Function,
      default () {
        return '';
      }
    },
    fixed: {
      type: [Boolean, String],
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
    treeProps:{
      type: Object
    },
    lazy: {
      type: Boolean,
      default: false
    }
  },
   watch:{
      columns:{
         handler (val) {
            this.fixedType =this.fixed;
         }
      },
      setTreeProps:{
        handler (val) {
            this.setTreeProps =this.treeProps;
         }
    }
  },
  computed: {
    setStyle () {
      return function (rows) {
        if (this.fixed !== false && rows._height) {
          return `height:${rows._height}px`;
        } else {
          if (rows._index && this.data[rows._index] && this.data[rows._index]._showchildren === false){
             return 'display:none';
          } else if (rows._index && this.data[rows._index] && this.data[rows._index]._showchildren === true){
             return '';
          }
          return '';
        }

      };
    },
    expandRender () {
      let render = function () {
        return '';
      };
      for (let i = 0; i < this.columns.length; i++) {
        const column = this.columns[i];
        if (column.type && column.type === 'expand') {
          if (column.render) {
            render = column.render;
          }
        }
      }
      return render;
    }

  },
  mounted(){
      this.fixedType = this.fixed;
       this.setTreeProps =this.treeProps;


  },
  methods: {
     childrenRow(row){
       let rowArr = [];
       if (this.setTreeProps.children && row[this.setTreeProps.children]){
                row[this.setTreeProps.children].forEach((item)=>{
                   rowArr = item;
                });
       }
       return rowArr[0];
        //return row;


    },
    rowChecked (_index) {
      // if (this.objData[_index]){
      //     this.objData[_index]._isHighlight=this.objData[_index]._isChecked;
      // }
      return this.objData[_index] && this.objData[_index]._isChecked;
    },
    rowDisabled (_index) {
      return this.objData[_index] && this.objData[_index]._isDisabled;
    },
    rowExpanded (_index) {
      return this.objData[_index] && this.objData[_index]._isExpanded;
    },
    handleMouseIn (_index) {
      clearTimeout(this.moveTimer);
      this.moveTimer = setTimeout(()=>{
        this.$parent.handleMouseIn(_index);
      },100);
    },
    handleMouseOut (_index) {
     clearTimeout(this.moveTimer);
     this.$parent.handleMouseOut(_index);

    },
    clickToggleSelect (_index) {
      this.eq = _index || 0;
      if (this.index.length < 1) {
        this.index[0] = this.eq;
      }
      if (this.shiftKey) {
        if (this.index[0] !== undefined) {
          this.index[1] = this.eq;
        }
        this.sortAdd();
      }
    },
    clickCurrentRow (event, _index) {
      clearTimeout(this.clickTimer);
      this.clickTimer = setTimeout(() => {
        this.eq = _index || 0;
        if (this.index.length < 1) {
          this.index[0] = this.eq;
        }
        if (this.tabindex){
            this.shiftKey = event.shiftKey;
            this.ctrlKey = event.ctrlKey;
        }
        //let index = event.path.findIndex((x) => /table-cell/.test(x.className));
        this.$parent.clickCurrentRow(_index,event);
        if (this.columns[0].type === 'selection' && this.tabindex === true && this.shiftKey) {
          this.$parent.toggleSelect(_index);
        }

        if (this.shiftKey) {
          if (this.index[0] !== undefined) {
            this.index[1] = this.eq;
          }
          this.$parent.toggleSelect(_index);
          this.sortAdd();
        } else if (this.ctrlKey){
            this.ctrlKeydata(_index);
          } else if (this.columns[0].type !== 'selection' && this.tabindex === true) {
          this.setisHighlight(_index);
        }
      }, this.clickTimerTask);
    },
    dblclickCurrentRow (event, _index) {
      clearTimeout(this.clickTimer);
      // if (index !== -1) {
      //   let column = event.path[index] && event.path[index].__vue__ && event.path[index].__vue__.column;
      //   this.$parent.dblclickCurrentRow(_index,event, column);
      //   this.setisHighlight(_index);
      // } else {
      //   this.setisHighlight(_index);
      // }
        this.$parent.dblclickCurrentRow(_index, event);

    },
    removeCode (event) {
      this.index = [];
      if (event.keyCode === 16) {
        let data = [];
        Object.keys(this.objData).forEach((item) => {
          if (this.objData[item]._isChecked === true) {
            data.push(this.objData[item]);
          }
        });
        this.$parent.shiftAdd(data);
      } else {
        let data = [];
        Object.keys(this.objData).forEach((item) => {
          if (this.objData[item]._isHighlight === true) {
            data.push(this.objData[item]);
          }
        });
        if (event.keyCode === 17){
            this.$parent.ctrlAdd(data);
        } else if (event.keyCode === 65){
        this.$parent.ctrlAll(data);
        }
      }
      this.$el.onselectstart = function () {
        return true;
      };
      this.shiftKey = false;
      this.ctrlKey = false;

    },
    continuity (event) {
      if (this.columns[0].type !== 'selection') {
        return false;
      }
      if (event.keyCode === 40) {
        if (Object.keys(this.objData).length - 1 > this.eq) {
          this.eq = Number(this.eq) + 1;
        }
        this.objData[this.eq]._isChecked = !this.objData[this.eq]._isChecked;
        this.objData[this.eq]._isHighlight = this.setCheckeType(!this.objData[this.eq]._isHighlight);
        return false;
      } else if (event.keyCode === 38) {
        this.objData[this.eq]._isChecked = !this.objData[this.eq]._isChecked;
        this.objData[this.eq]._isHighlight = this.setCheckeType(!this.objData[this.eq]._isHighlight);
        if (this.eq > 0) {
          this.eq = this.eq - 1;
        }
        return false;

      } else if (event.keyCode === 16) {
        this.sortAdd();
      }
    },
    sortAdd () {
      let sortArry = this.index.concat([]);
          sortArry = sortArry.sort((a,b) => a-b);
      if (sortArry.length < 2) {
        return false;
      }
      Object.keys(this.objData).forEach((item, i) => {
        if (i > (sortArry[0] - 1) && i < sortArry[1] + 1) {
          this.objData[i]._isChecked = true;
        } else {
          this.objData[i]._isChecked = false;

        }
      });
      this.setisHighlight('key');

    },
    setCheckeType(key){
        if (this.columns[0].type ==='selection'){
            return false;
        } else {
            return key;
        }
    },
    setisHighlight (type) {
        // 判断是否高亮
        if (this.columns[0].type ==='selection'){
            return false;
      }
      Object.keys(this.objData).forEach((item, i) => {
        if (type === 'key') {
          if (this.objData[i]._isChecked) {
            this.objData[i]._isHighlight = this.setCheckeType(true);
          } else {
            this.objData[i]._isHighlight = false;
          }
        } else if (i === type) {
          this.objData[i]._isHighlight = this.setCheckeType(true);
        } else {
          this.objData[i]._isHighlight = false;
          this.objData[i]._isChecked = false;
        }

      });
    },
    addKeyCode (event) {
      // 键盘 事件
      let that = this;
    //   if (event.target.tagName.toUpperCase() === 'INPUT' && event.target.type === 'checkbox') {
    //     return false;
    //   }
         if ( event.target.tagName !== 'TBODY'){
             if (this.columnsclick){
             return false;
             }
          }

      if (event.ctrlKey === true && event.keyCode === 65) {
        event.preventDefault();
        this.$parent.selectAll(true);
        this.$parent.ctrlAll(this.objData);
        this.setisHighlight('key');
      } else if (event.shiftKey === true) {
        this.shiftKey = true;
        this.$el.onselectstart = function () {
          return false;
        };
        this.continuity(event);

        return false;

      } else if (event.shiftKey === false) {
        this.shiftKey = false;
        this.index = [];
        if (event.ctrlKey === true && this.columns[0].type !== 'selection') {
            this.ctrlKey = true;
            this.ctrlKeydata(this.eq,'before');
        } else {
            this.ctrlKey = false;
        }
      }
    },
    ctrlKeydata(index ,type){
        if (type === 'before'){
        //this.objData[index]._isHighlight = this.setCheckeType(!this.objData[index]._isHighlight);
        } else {
            this.objData[index]._isHighlight = this.setCheckeType(!this.objData[index]._isHighlight);
        }
        this.objData[index]._isChecked = !this.objData[index]._isChecked;
    },
    showMethod (row, column, rowIndex, columnIndex) {
      if (!this.data[rowIndex]){
          return false;
      }
      let col = this.SpanMethod(row, column, rowIndex, columnIndex);
      this.data[rowIndex].colspan = '';
      if (this.columns[columnIndex]) {
        this.columns[columnIndex].rowspan = '';
      }
      if (col) {
        if (col.colspan.length > 1) {
          if (col.colspan[columnIndex] === 1) {
            let spanArry = col.colspan.slice(0, columnIndex).join('');
            let spanArryLg = spanArry.split(1);
            if (spanArryLg[spanArryLg.length - 1].length > 0) {
              let colspan = spanArryLg[spanArryLg.length - 1].length + 1;
              this.data[rowIndex].colspan = colspan;
              //this.colSpan=colspan;
              return true;
            }
            return true;
          } else if (col.colspan[columnIndex] === undefined) {
            return true;
          } else {
            return false;
          }
        } else if (col.rowspan.length > 1) {
          if (col.rowspan[rowIndex] === 1) {
            let spanArry = col.rowspan.slice(rowIndex + 1, col.rowspan.length).join('');
            let index = spanArry.indexOf(1);
            if (spanArry.indexOf(1) === -1) {
              this.columns[columnIndex].rowspan = spanArry.length + 1;
            } else if (index !== 0) {
              this.columns[columnIndex].rowspan = index + 1;
            }
            return true;
          } else if (col.rowspan[rowIndex] === undefined) {
            return true;
          } else {
            return false;
          }


          return true;

        } else {
          return true;
        }
      } else {
        return true;
      }


    }

  },
  updated () {
    //console.log('666');
  }
};
</script>
