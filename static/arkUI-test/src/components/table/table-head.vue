<template>

        <thead>
            <tr v-for="(cols, rowIndex) in headRows">
                <th
                    v-for="(column, index) in cols"
                    :draggable="column.draggable"
                    :colspan="column.colSpan"
                    @dragenter="dragEnter(column,$event)"
                    @dragend="dragEnd(column)"
                    @dragover="dragOver"
                    :rowspan="column.rowSpan"
                    :class="alignCls(column)">
                    <div :class="cellClasses(column)" :style="setCellWidth(column,fixedType)">
                        <template v-if="column.type === 'expand'">
                            <span v-if="!column.renderHeader">{{ column.title || '' }}</span>
                            <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
                        </template>
                        <template v-else-if="column.type === 'selection'">
                            <Checkbox  v-if="!column.renderHeader" :value="isSelectAll" :disabled="!data.length || column._disabled" @on-change="selectAll"></Checkbox>
                            <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
                        </template>
                        <template v-else>
                            <span v-if="!column.renderHeader" :class="{[prefixCls + '-cell-sort']: column.sortable}" @click="handleSortByHead(getColumn(rowIndex, index)._index)">{{ column.title || '#' }}</span>
                            <render-header v-else :render="column.renderHeader" :column="column" :index="index"></render-header>
                            <span :class="[prefixCls + '-sort']" v-if="column.sortable">
                                <i  :class="[`${burgeonConfig.prefixCls}icon iconmd-arrow-dropup`,{on: getColumn(rowIndex, index)._sortType === 'asc'}]" @click="handleSort(getColumn(rowIndex, index)._index, 'asc')"></i>
                                <i  :class="[`${burgeonConfig.prefixCls}icon iconmd-arrow-dropdown`,{on: getColumn(rowIndex, index)._sortType === 'desc'}]" @click="handleSort(getColumn(rowIndex, index)._index, 'desc')"></i>
                            </span>
                            <Poptip
                                v-if="isPopperShow(column)"
                                v-model="getColumn(rowIndex, index)._filterVisible"
                                placement="bottom"
                                :popper-class="`${burgeonConfig.prefixCls}table-popper`"
                                transfer
                                @on-popper-hide="handleFilterHide(getColumn(rowIndex, index)._index)">
                                <span :class="[prefixCls + '-filter']">
                                    <i  :class="[`${burgeonConfig.prefixCls}icon iconios-funnel`,{on: getColumn(rowIndex, index)._isFiltered}]"></i>
                                </span>

                                <div slot="content" :class="[prefixCls + '-filter-list']" v-if="getColumn(rowIndex, index)._filterMultiple">
                                    <div :class="[prefixCls + '-filter-list-item']">
                                        <checkbox-group v-model="getColumn(rowIndex, index)._filterChecked">
                                            <checkbox v-for="(item, index) in column.filters" :key="index" :label="item.value">{{ item.label }}</checkbox>
                                        </checkbox-group>
                                    </div>
                                    <div :class="[prefixCls + '-filter-footer']">
                                        <i-button type="text" size="small" :disabled="!getColumn(rowIndex, index)._filterChecked.length" @click.native="handleFilter(getColumn(rowIndex, index)._index)">{{ t('i.table.confirmFilter') }}</i-button>
                                        <i-button type="text" size="small" @click.native="handleReset(getColumn(rowIndex, index)._index)">{{ t('i.table.resetFilter') }}</i-button>
                                    </div>
                                </div>
                                <div slot="content" :class="[prefixCls + '-filter-list']" v-else>
                                    <ul :class="[prefixCls + '-filter-list-single']">
                                        <li
                                            :class="itemAllClasses(getColumn(rowIndex, index))"
                                            @click="handleReset(getColumn(rowIndex, index)._index)">{{ t('i.table.clearFilter') }}</li>
                                        <li
                                            :class="itemClasses(getColumn(rowIndex, index), item)"
                                            v-for="item in column.filters"
                                            @click="handleSelect(getColumn(rowIndex, index)._index, item.value)">{{ item.label }}</li>
                                    </ul>
                                </div>
                            </Poptip>
                        </template>
                    </div>
                </th>

                <th v-if="$parent.showVerticalScrollBar && rowIndex===0 && columnsType" :style="setWidth"
                    :class='scrollBarCellClass()' :rowspan="headRows.length" >
                    <div :style="setWidth"></div>
                    <!--``-->
                </th>
            </tr>
        </thead>
</template>
<script>
    import CheckboxGroup from '../checkbox/checkbox-group.vue';
    import Checkbox from '../checkbox/checkbox.vue';
    import Poptip from '../poptip/poptip.vue';
    import iButton from '../button/button.vue';
    import renderHeader from './header';
    import Mixin from './mixin';
    import Locale from '../../mixins/locale';
    import burgeonConfig from '../../assets/config';

    export default {
        name: 'TableHead',
        mixins: [Mixin, Locale],
        components: {
             CheckboxGroup, Checkbox, Poptip, iButton, renderHeader
            },
        props: {
            prefixCls: String,
            styleObject: Object,
            columns: Array,
            objData: Object,
            colgroup:{
                type:Boolean,
                default: false
            },
            data: Array, // rebuildData
            columnsWidth: Object,
            fixed: {
                type: [Boolean, String],
                default: false
            },
            draggable: {
                type: [Boolean, String],
                default: false
            },
            columnsType:Boolean,
            columnRows: Array,
            fixedColumnRows: Array
        },
        data () {
            return {
                burgeonConfig:burgeonConfig,
                columnRowsClone:[],
                timer:null,
                headRows:[],
                fixedType:'',
                dragIndex:''
            };
        },
        watch:{
            columns:{
                handler (val) {
                    this.fixedType = this.fixed;
                    // clearTimeout(this.timer);
                    // this.timer = setTimeout(()=>{                    },0);

                        this.columnRowsClone = this.setColoms(this.columnRows);
                        this.headRows = this.setHeadRows();

                 },
                 deep: true
            }

        },
        computed: {
            styles () {
                const style = Object.assign({}, this.styleObject);
                const width = parseInt(this.styleObject.width) ;
                //console.log(this.columns);
                style.width = `${width}px`;
                return style;
            },
            setWidth(){
                let width=this.$parent.scrollBarWidth;
                return `width:${width-1}px;border:none`;
            },
            isSelectAll () {
                let isSelectAll = true;
                if (!this.data.length) {
isSelectAll = false;
}
                if (!this.data.find(item => !item._disabled)) {
isSelectAll = false;
} // #1751
                for (let i = 0; i < this.data.length; i++) {
                    if (!this.objData[this.data[i]._index]._isChecked && !this.objData[this.data[i]._index]._isDisabled) {
                        isSelectAll = false;
                        break;
                    }
                }

                return isSelectAll;
            }
            // headRows () {
            //     const isGroup = this.columnRows.length > 1;
            //     this.columnRowsClone = this.setColoms();
            //     console.log('cuputed');
            //     if (isGroup) {
            //         return this.fixed ? this.fixedColumnRows : this.columnRowsClone;
            //     } else {
            //         return [this.columns];
            //     }
            // }
        },
        mounted(){
             this.columnRowsClone = this.setColoms(this.columnRows);
             this.headRows = this.setHeadRows();
             this.fixedType = this.fixed;
        },
        methods: {
                setHeadRows () {
                    const isGroup = this.columnRows.length > 1;
                    this.columnRowsClone = this.setColoms(this.columnRows);
                    let fixedColumnRows = [];
                    if (this.fixed){

                        fixedColumnRows = this.setColoms(this.fixedColumnRows);
                    }
                    if (isGroup) {

                        return this.fixed ? fixedColumnRows : this.columnRowsClone;
                    } else {
                        return [this.columns];
                    }
                },
              setColoms(columnRows){
                    if (!Array.isArray(columnRows)){
                        return false;
                    }
                    let data = columnRows.map((item)=>{
                    let columnArry = [];
                    if (Array.isArray(item)){
                        let column = item.map((option)=>this.setCol(option));
                        item = column;
                    }
                        return item;
                    });
                    return data;
                },
                setCol(column){
                    this.columns.forEach((item)=>{
                        if (item.__id === column.__id && item.width){
                            column.width = item.width;
                        }
                    });
                    return column;
            },
            cellClasses (column) {
                return [
                    `${this.prefixCls}-cell`,
                    {
                        [`${this.prefixCls}-hidden`]: !this.fixed && column.fixed && (column.fixed === 'left' || column.fixed === 'right'),
                        [`${this.prefixCls}-cell-with-selection`]: column.type === 'selection'
                    }
                ];
            },
            dragEnd(column){
                if (!column.draggable){
                    return false;
                }
                let dragColumn=this.$parent.columns[this.dragIndex];
                let columnCol=this.$parent.columns[column._index];
                this.$parent.columns.splice(column._index,1,dragColumn);
                this.$parent.columns.splice(this.dragIndex,1,columnCol);
                this.$parent.draggableMethod(this.$parent.columns);
            },
            dragEnter(column,event){
                event.preventDefault();
                if (!column.draggable){
                   return false;
                }
                this.dragIndex=column._index;

            },
            dragOver(event){
                event.preventDefault();
                return false;
            },
            scrollBarCellClass(){
                let hasRightFixed = false;
                for (let i in this.headRows){
                    for (let j in this.headRows[i]){
                        if (this.headRows[i][j].fixed === 'right') {
                            hasRightFixed=true;
                            break;
                        }
                        if (hasRightFixed) {
                            break;
                            }
                    }
                }
                return [
                    {
                        [`${this.prefixCls}-hidden`]: hasRightFixed
                    }
                ];
            },
            itemClasses (column, item) {
                return [
                    `${this.prefixCls}-filter-select-item`,
                    {
                        [`${this.prefixCls}-filter-select-item-selected`]: column._filterChecked[0] === item.value
                    }
                ];
            },
            itemAllClasses (column) {
                return [
                    `${this.prefixCls}-filter-select-item`,
                    {
                        [`${this.prefixCls}-filter-select-item-selected`]: !column._filterChecked.length
                    }
                ];
            },
            selectAll () {
                const status = !this.isSelectAll;
                this.$parent.selectAll(status);
            },
            handleSort (index, type) {
                const column = this.columns[index];
                const {_index} = column;

                if (column._sortType === type) {
                    type = 'normal';
                }
                this.$parent.handleSort(_index, type);
            },
            handleSortByHead (index) {
                const column = this.columns[index];
                if (column.sortable) {
                    const type = column._sortType;
                    if (type === 'normal') {
                        this.handleSort(index, 'asc');
                    } else if (type === 'asc') {
                        this.handleSort(index, 'desc');
                    } else {
                        this.handleSort(index, 'normal');
                    }
                }
            },
            handleFilter (index) {
                this.$parent.handleFilter(index);
            },
            handleSelect (index, value) {
                this.$parent.handleFilterSelect(index, value);
            },
            handleReset (index) {
                this.$parent.handleFilterReset(index);
            },
            handleFilterHide (index) {
                this.$parent.handleFilterHide(index);
            },
            // 因为表头嵌套不是深拷贝，所以没有 _ 开头的方法，在 isGroup 下用此列
            getColumn (rowIndex, index) {
                const isGroup = this.columnRows.length > 1;

                if (isGroup) {
                    const id = this.headRows[rowIndex][index].__id;
                    return this.columns.filter(item => item.__id === id)[0];
                } else {
                    return this.headRows[rowIndex][index];
                }
            }
        }
    };
</script>
