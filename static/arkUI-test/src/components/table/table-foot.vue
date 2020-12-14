<template>
       <!-- <colgroup>
            <col v-for="(column, index) in columns" :style="setCellWidth(column,'body')">
        </colgroup>-->
        <tfoot :class="[prefixCls + '-tfoot']">
        <template v-for="(row, index) in data">
            <table-tr
                :row="row"
                :key="row._rowKey"
                :prefix-cls="prefixCls"
                >

                <template v-for="column in columns" v-if="showMethod(column, row,row._index, column._index)">
                    <td 
                        :colspan="row.colspan" :rowspan="column.rowspan">
                        <template v-if="column.fixed!== '' ">
                            <div :class="alignClsfooter(column, row)" ref="cell">
                                                                   <span>{{row[column.key]}}</span>

                            </div>

                        </template>
                        <template v-else>
                            <Cell
                            :fixed="fixed"
                            :prefix-cls="prefixCls"
                            :row="row"
                            :key="column._columnKey"
                            :column="column"
                            :natural-index="index"
                            :index="row._index"
                            :totalType = 'true'
                            :total="data.length"
                            :style="setCellWidth(column)"
                            :checked="rowChecked(row._index)"
                            :disabled="rowDisabled(row._index)"
                            :expanded="rowExpanded(row._index)"
                        ></Cell>

                        </template>
                        
                    </td>

                </template>

            </table-tr>
            <tr v-if="rowExpanded(row._index)" :class="{[prefixCls]: fixed}">
                <td :colspan="columns.length" :class="prefixCls + '-expanded-cell'">
                    <Expand :key="row._rowKey" :row="row" :render="expandRender" :index="row._index"></Expand>
                </td>
            </tr>
        </template>
        </tfoot>
</template>
<script>
    // todo :key="row"
    import TableTr from './table-tr.vue';
    import Cell from './cell.vue';
    import Expand from './expand.js';
    import Mixin from './mixin';

    export default {
        name: 'TableBody',
        data(){
          return {
              clickTimer:null
          };
        },
        mixins: [Mixin],
        components: { Cell, Expand, TableTr },
        props: {
            prefixCls: String,
            styleObject: Object,
            columns: Array,
            objData: Object,
            columnsWidth: Object,
            clickTimerTask:{
                type: Number,
                default () {
                    return 0;
                }
            },
            SpanMethod:{
                type: Function,
                default () {
                    return '';
                }
            },
            fixed: {
                type: [Boolean, String],
                default: false
            },
            ellipsis: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            classes () {
                return function(column) {
                    [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-cell-ellipsis`]: this.ellipsis !== false
                    }
                ];
                };
            },
            data(){
                let dataList=[];
                Object.keys(this.objData).forEach((row,i)=>{
                    this.objData[row].colspan='';
                    this.objData[row]._index=i;
                    dataList.push(this.objData[row]);
                });
                return dataList;
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
        methods: {
            alignClsfooter (column, row = {}) {
                return [
                    `${this.prefixCls}-cell`,
                {
                        [`${this.prefixCls}-cell-ellipsis`]: this.ellipsis !== false
                    }
                ];
            },
            rowChecked (_index) {
                return this.objData[_index] && this.objData[_index]._isChecked;
            },
            rowDisabled(_index){
                return this.objData[_index] && this.objData[_index]._isDisabled;
            },
            rowExpanded(_index){
                return this.objData[_index] && this.objData[_index]._isExpanded;
            },
            handleMouseIn (_index) {
                this.$parent.handleMouseIn(_index);
            },
            handleMouseOut (_index) {
                this.$parent.handleMouseOut(_index);
            },
            clickCurrentRow (_index) {
                clearTimeout(this.clickTimer);
                this.clickTimer=setTimeout(()=>{
                    this.$parent.clickCurrentRow(_index);
                },this.clickTimerTask);
            },
            dblclickCurrentRow (_index) {
                clearTimeout(this.clickTimer);
                this.$parent.dblclickCurrentRow(_index);
            },
            showMethod(row, column, rowIndex, columnIndex){
                let col=this.SpanMethod(row, column, rowIndex, columnIndex);
                this.data[rowIndex].colspan='';
                if (this.columns[columnIndex]){
                    this.columns[columnIndex].rowspan='';
                }
                if (col){
                    if (col.colspan.length>1){
                        console.log(col,columnIndex);

                        if (col.colspan[columnIndex]===1){

                            let spanArry=col.colspan.slice(0,columnIndex).join('');
                            let spanArryLg=spanArry.split(1);
                            if (spanArryLg[spanArryLg.length-1].length>0){
                                let colspan=spanArryLg[spanArryLg.length-1].length+1;
                                this.data[rowIndex].colspan=colspan;

                                //this.colSpan=colspan;
                                return true;
                            }
                            return true;
                        } else if (col.colspan[columnIndex]===undefined){
                            return true;
                        } else {
                            return false;
                        }
                    } else if (col.rowspan.length>1) {
                        if (col.rowspan[rowIndex]===1){
                            let spanArry=col.rowspan.slice(rowIndex+1,col.rowspan.length).join('');
                            let index=spanArry.indexOf(1);
                            if (spanArry.indexOf(1)===-1){
                                this.columns[columnIndex].rowspan=spanArry.length+1;
                            } else if (index!==0){
                                this.columns[columnIndex].rowspan=index+1;
                            }
                            return true;
                        } else if (col.rowspan[rowIndex]===undefined){
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

        }
    };
</script>
