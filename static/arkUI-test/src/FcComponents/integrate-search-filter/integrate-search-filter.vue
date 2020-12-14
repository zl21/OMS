<template>
    <div :class="prefixCls">
        <div :class="integrateContiner">
            <div :class="integrateSearch" :style="getIntegrateSearchWidth">
                <div :class="dropDown">
                    <Dropdown
                        placement="bottom-start"
                        :trigger="trigger"
                        @on-click="dropDowmClick">
                        <Icon type="md-arrow-dropdown"></Icon>
                        <DropdownMenu slot="list">
                            <DropdownItem
                                v-for="(item, index) in dropList"
                                :key="index"
                                :name="item.column">
                                {{item.label}}
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div v-if="tipText" :class="tipTexts">
                    <div :class="tipTextsContent">{{tipText}}:</div>
                </div>
                <component
                    v-if="dropComponent === 'Select'"
                    :is="dropComponent"
                    v-bind="componentAttribute"
                    v-model="selectedValue"
                    v-on="componentEvent"
                    :ref="dropComponent"
                    @on-change="selectChange"
                    :placeholder="placeholder">
                    <Option
                        v-if="optionList.length > 0"
                        v-for="item in optionList"
                        :value="item.value"
                        :label="item.label"
                        :key="item.value">
                        {{item.label}}
                    </Option>
                </component>
                <component
                    v-else-if="dropComponent === 'Input'"
                    :is="dropComponent"
                    v-bind="componentAttribute"
                    v-on="componentEvent"
                    @on-change="inputChange"
                    v-model="inputValue"
                    :ref="dropComponent"
                    @on-keydown="(e,instance)=>inputKeyDown(e,instance)"
                    :placeholder="placeholder">
                </component>
                <component
                    v-else-if="dropComponent === 'DatePicker'"
                    :is="dropComponent"
                    v-bind="componentAttribute"
                    v-model="componentAttribute.value"
                    v-on="componentEvent"
                    :ref="dropComponent"
                    @on-change="dateChange"
                    :placeholder="placeholder">
                </component>
                <component
                    v-else-if="dropComponent === 'DropDownSelectFilter'"
                    :is="dropComponent"
                    v-bind="componentAttribute"
                    v-on="componentEvent"
                    :ref="dropComponent"
                    @on-fkrp-selected="dropSelectedChange"
                    :placeholder="placeholder">
                </component>
                <component
                    v-else
                    :is="dropComponent"
                    v-bind="componentAttribute"
                    v-on="componentEvent"
                    :ref="dropComponent"
                    @on-change="componentChange"
                    :placeholder="placeholder">
                </component>
                <div :class="searchButton">
                    <Icon type="iconbj_search" @click="handleSearch"></Icon>
                </div>
            </div>
            <div :class="tagClass" v-for="(item,index) in tagTotaoList">
                <Dropdown :trigger="item.trigger">
                    <span>{{item.label}}</span>
                    <div slot="list">
                        <div v-for="(ite,idx) in item.list">
                            <Checkbox v-model="ite.selected" @on-change="(val)=>checkboxChange(val,ite.label,item.column,ite)"></Checkbox>
                            <span :class="tagDropText" @click="checkboxChange(!ite.selected,ite.label,item.column,ite)">{{ite.label}}</span>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </div>
        <div :class="searchItem" v-if="searchItemList.length>0" v-show="isSearchItemShow">
            <!--<Icon type="iconbj_tcduo"></Icon>-->
            <div :class="searchItemTitle">检索项:</div>
            <div :class="searchItemLists" v-for="(item,index) in searchItemList" v-if="item.value">
                <Poptip
                    v-if="item.isPoptip"
                    :width="searchItemMaxWidth"
                    :trigger="searchItemTrigger"
                    :placement="searchItemPlacement"
                    word-wrap
                    :content="poptipContent(item.label,item.value)">
                    <div :id="`id${index}`" :class="searchItemDetail" :style="searchItemWidth">
                        <span>{{item.label}} :</span>
                        <span>{{item.value}}</span>
                    </div>
                </Poptip>
                <div :id="`id${index}`" :class="searchItemDetail" :style="searchItemWidth" v-else>
                    <span>{{item.label}} :</span>
                    <span>{{item.value}}</span>
                </div>
                <Icon type="iconbj_delete2" @click="clearSeatchItem(index)"></Icon>
            </div>
            <div :class="searchItemClear" @click="clearAllSeatchItem">清除</div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable import/extensions,import/no-unresolved,array-callback-return,no-lonely-if */

    import burgeonConfig from '../../assets/config';
    import Dropdown from '../../components/dropdown/dropdown';
    import DropdownMenu from '../../components/dropdown/dropdown-menu';
    import DropdownItem from '../../components/dropdown/dropdown-item';
    import OptionGroup from '../../components/select/option-group';
    import Icon from '../../components/icon/icon';
    import Checkbox from '../../components/checkbox/checkbox';
    import Poptip from '../../components/poptip/poptip';
    import Drop from '../../components/select/dropdown';

    const prefixCls = `${burgeonConfig.prefixCls}`;

    export default {
        name: 'IntegrateSearchFilter',
        mixins: [],
        data() {
            return {
                dropDownSelectFilterSelectedValue: [], // 下拉外键选中的值
                componentAttribute: {}, // 组件属性
                componentEvent: {}, // 组件方法
                dropComponent: 'Input', // 组件类型
                dropSelectedObj: '', // 左侧下拉条选中的对象
                placeholder: '请先选择字段再输入', // 占位文本
                tipText: '', // 字段名称
                tipKey: '', // 字段
                optionList: [], // 下拉选项
                inputValue: '', // Input组件输入的值
                selectValue: '', // 下拉框选中的值
                selectedValue: '', // 下拉框v-model的值
                saveItemList: [], // 临时保存数据
                datePickerValue: '', // 日期组件
                searchItemList: [] // 检索项数据
            };
        },
        props: {
            dropDownList: {
                type: Array,
                default: () => []
            }, // 左侧下拉列表
            trigger: {
                type: String,
                default: 'hover'
            }, // 触发方式
            value: {
                type: Array,
                default: () => []
            }, // 检索项选中的值
            tagList: {
                type: Array,
                default: () => []
            }, // 标签数组
            searchMethod: {
                type: Function,
                default: () => {
                }
            }, // 搜索回调
            searchItemMaxWidth: {
                type: Number,
                default: 200
            }, // 检索项最大宽度
            integrateSearchWidth: {
                type: Number,
                default: 300
            }, // 集成搜索框的宽度
            searchItemTrigger: {
                type: String,
                default: 'hover'
            },
            searchItemPlacement: {
                type: String,
                default: 'top'
            },
            isSearchItemShow: {
                type: Boolean,
                default: true
            }, // 是否显示检索项
            isItemShow: {
                type: Boolean,
                default: true
            }
        },
        components: {
            Drop,
            Poptip,
            Checkbox,
            Icon,
            OptionGroup,
            DropdownItem,
            DropdownMenu,
            Dropdown
        },
        created() {
            let _self = this;
            this.$nextTick(() => {
            });
        },
        watch: {
            value(val) {
                this.setSearchValue(val);
            }
        },
        computed: {
            prefixCls() {
                return `${prefixCls}integrate-search-filter`;
            },
            integrateSearch() {
                return `${prefixCls}integrate-search-filter-valid`;
            },
            integrateContiner() {
                return `${prefixCls}integrate-search-filter-container`;
            },
            dropDown() {
                return `${prefixCls}integrate-search-filter-drop-down`;
            },
            searchButton() {
                return `${prefixCls}integrate-search-filter-search`;
            },
            tipTexts() {
                return `${prefixCls}integrate-search-filter-text`;
            },
            tipTextsContent() {
                return `${prefixCls}integrate-search-filter-text-content`;
            },
            tagClass() {
                return `${prefixCls}integrate-search-filter-tag`;
            },
            tagDropText() {
                return `${prefixCls}integrate-search-filter-tag-drop-text`;
            },
            searchItem() {
                return `${prefixCls}integrate-search-filter-search-item`;
            },
            searchItemTitle() {
                return `${prefixCls}integrate-search-filter-search-item-title`;
            },
            searchItemClear() {
                return `${prefixCls}integrate-search-filter-search-item-clear`;
            },
            searchItemLists() {
                return `${prefixCls}integrate-search-filter-search-item-list`;
            },
            searchItemDetail() {
                return `${prefixCls}integrate-search-filter-search-item-detail`;
            },
            dropList() {
                this.dropDownList.map(item => {
                    item.label = item.label ? item.label : '';
                    item.column = item.column ? item.column : '';
                    item.placeholder = item.placeholder ? item.placeholder : '';
                    item.type = item.type ? item.type : 'Input';
                    item.list = item.list ? item.list : [];
                    item.componentAttribute = item.componentAttribute ? item.componentAttribute : {};
                    item.componentEvent = item.componentEvent ? item.componentEvent : {};
                    item.value = item.value ? item.value : '';
                });
                return this.dropDownList;
            },
            tagTotaoList() {
                this.tagList.map(item => {
                    item.label = item.label ? item.label : '';
                    item.column = item.column ? item.column : '';
                    item.trigger = item.trigger ? item.trigger : 'click';
                    if (item.list) {
                        if (item.list.length > 0) {
                            item.list.map(ite => {
                                ite.label = ite.label?ite.label : '';
                                ite.selected = ite.selected? ite.selected : false;
                            });
                        }
                    }
                    item.list = item.list ? item.list : [];
                    item.selectedList = item.selectedList ? item.selectedList : [];
                    item.value = item.value ? item.value : '';
                });
                return this.tagList;
            },
            searchItemWidth() {
                return `max-width: ${this.searchItemMaxWidth}px`;
            },
            getIntegrateSearchWidth() {
                return `width: ${this.integrateSearchWidth}px`;
            },
            poptipContent() {
                return (label, value) => `${label}:${value}`;
            }
        },
        updated() {
        },
        mounted() {
        },
        methods: {
            setSearchValue(val) {
                let valueStr = val.join('-');
                let searchItemListStr = this.searchItemList.join('-');
                let saveItemListStr = this.saveItemList.join('-');
                if (val.length ===0) {
                    this.searchItemList = [];
                    this.saveItemList = [];
                } else {
                    if (this.isItemShow) {
                        if (valueStr !== searchItemListStr) {
                            val.forEach(item => {
                                let obj = {...item};
                                this.searchItemList.push(obj);
                            });
                        }
                    } else {
                        if (valueStr !== saveItemListStr) {
                            val.forEach(item => {
                                let obj = {...item};
                                this.saveItemList.push(obj);
                            });
                        }
                    }
                }
            },
            dropDowmClick(val) {
                this.dropComponent = '';
                setTimeout(() => {
                    this.inputValue = '';
                    let obj = this.dropList.find((item) => item.column === val);
                    this.dropSelectedObj = obj;
                    this.dropComponent = obj.type;
                    this.placeholder = obj.placeholder;
                    this.tipText = obj.label;
                    this.tipKey = obj.column;
                    if (obj.type === 'Select') {
                        if (obj.list.length > 0) {
                            this.optionList = [];
                            obj.list.forEach(ite =>{
                                let obje = {...ite};
                                this.optionList.push(obje);
                            });
                        }
                    }
                    if (obj.componentAttribute) {
                        this.componentAttribute = obj.componentAttribute;
                        this.componentEvent = obj.componentEvent;
                    }
                    this.$emit('on-drop-change', obj, this);
                },0);
            }, // 点击左侧下拉菜单
            handleSearch() {
                if (this.isItemShow) {
                    this.searchItemShow = true;
                    if (this.dropComponent === 'Input') {
                        if (this.tipKey) {
                            this.changeSearchItemList(this.inputValue);
                        }
                    } else if (this.dropComponent === 'DatePicker') {
                        if (typeof this.datePickerValue ==='string') {
                            this.changeSearchItemList(this.datePickerValue);
                        } else {
                            this.changeSearchItemList(this.datePickerValue.join('~'));
                        }
                    } else if (this.dropComponent === 'Select') {
                        if (this.componentAttribute.multiple) {
                            let labelArr = [];
                            let selectedArr = [];
                            this.selectValue.forEach(item => {
                                labelArr.push(item.label);
                                selectedArr.push(item);
                            });
                            this.changeSearchItemList(labelArr.join(','),'',selectedArr);
                        } else {
                            let obj = this.dropList.find((item) => item.column === this.tipKey);
                            let selectObj = obj.list.find((item) => item.value === this.selectValue);
                            this.changeSearchItemList(selectObj.label,selectObj);
                        }
                        this.selectedValue = '';
                    } else if (this.dropComponent === 'DropDownSelectFilter') {
                        let str = this.dropDownSelectFilterSelectedValue.reduce((acc, cur) => {
                            acc.push(cur.Label);
                            return acc;
                        },[]).join(',');
                        this.changeSearchItemList(str, null, this.dropDownSelectFilterSelectedValue);
                    }
                    this.$emit('input', this.searchItemList);
                    if (typeof this.searchMethod === 'function') {
                        this.searchMethod(this.searchItemList, this);
                    }
                } else {
                    this.searchItemList = [];
                    this.saveItemList.forEach(item =>{
                        this.searchItemList.push({...item});
                    });
                    this.$emit('input', this.searchItemList);
                    if (typeof this.searchMethod === 'function') {
                        this.searchMethod(this.searchItemList, this);
                    }
                }
            }, // 点击搜索Icon
            inputKeyDown(e, instance) {
                if (e.keyCode === 13) {
                    if (this.isSearchItemShow) {
                        this.inputValue = '';
                    }
                    if (this.tipKey) {
                        this.changeSearchItemList(instance.currentValue);
                    }
                }
            }, // 输入框回车事件
            inputChange() {
                this.$emit('on-value-change', this.dropSelectedObj, this.inputValue);
            }, // input  change事件
            selectChange(val, instance) {
                this.selectValue = val;
                this.$emit('on-value-change', this.dropSelectedObj, val);
                // console.log(val);
                // if (this.componentAttribute.multiple) {
                //     let labelArr = [];
                //     let selectedArr = [];
                //     val.forEach(item => {
                //         labelArr.push(item.label);
                //         selectedArr.push(item);
                //     });
                //     this.changeSearchItemList(labelArr.join(','),'',selectedArr);
                // } else {
                //     let obj = this.dropList.find((item) => item.column === this.tipKey);
                //     let selectObj = obj.list.find((item) => item.value === val);
                //     this.changeSearchItemList(selectObj.label,selectObj);
                // }
                // instance.reset();
                // this.selectValue = '';
            }, // 下拉选项框值改变后触发
            changeSearchItemList(val,selectObj,selectedList) {
                if (this.isItemShow){
                    let findIndex = this.searchItemList.findIndex(item => item.column === this.tipKey);
                    let obj = this.dropList.find((item) => item.column === this.tipKey);
                    if (val){
                        if (selectObj) {
                            obj.selectObj = selectObj;
                        }
                        if (selectedList) {
                            obj.selectedList = selectedList;
                        }
                        obj.value = val;
                        if (findIndex > -1) {
                            this.searchItemList.splice(findIndex, 1, obj);
                        } else {
                            this.searchItemList.push(obj);
                        }
                    } else {
                        if (findIndex > -1){
                            this.searchItemList.splice(findIndex, 1);
                        }
                    }
                    this.$emit('input', this.searchItemList);
                    this.poptipIsShow();
                } else {
                    let findIndex = this.saveItemList.findIndex(item => item.column === this.tipKey);
                    let obj = this.dropList.find((item) => item.column === this.tipKey);
                    if (val){
                        if (selectObj) {
                            obj.selectObj = selectObj;
                        }
                        if (selectedList) {
                            obj.selectedList = selectedList;
                        }
                        obj.value = val;
                        if (findIndex > -1) {
                            this.saveItemList.splice(findIndex, 1, obj);
                        } else {
                            this.saveItemList.push(obj);
                        }
                    } else {
                        if (findIndex > -1){
                            this.saveItemList.splice(findIndex, 1);
                        }
                    }
                    this.$emit('input', this.saveItemList);
                    this.poptipIsShow();
                }
            }, // 变更
            poptipIsShow() {
                this.$nextTick(() => {
                    setTimeout(()=>{
                        // this.searchItemList.map((item, index) => {
                        //     let element = document.getElementById(`id${index}`).offsetWidth;
                        //     element === this.searchItemMaxWidth ? item.isPoptip = true : item.isPoptip = false;
                        //     let str = JSON.stringify(item);
                        //     item = JSON.parse(str);
                        // });
                        let arr = this.searchItemList;
                        this.searchItemList = [];
                        arr.forEach((item,index) =>{
                            let element = document.getElementById(`id${index}`).offsetWidth;
                            element === this.searchItemMaxWidth ? item.isPoptip = true : item.isPoptip = false;
                            let str = JSON.stringify(item);
                            let obj = JSON.parse(str);
                            this.searchItemList.push(obj);
                        });
                    },10);
                });
            }, // 判断气泡是否显示
            clearAllSeatchItem(e) {
                if (this.isItemShow === false) {
                    this.searchItemShow = false;
                }
                this.tagTotaoList.map(item => {
                    item.value = '';
                    item.selectedList = [];
                    item.list.map(ite => {
                       ite.selected = false;
                    });
                });
                this.searchItemList = [];
                this.saveItemList = [];
                this.$emit('input', this.searchItemList);
                this.$emit('on-clear-all', e, this);
            }, // 清空全部检索项
            clearSeatchItem(index) {
                this.searchItemList.splice(index, 1);
                this.saveItemList.splice(index, 1);
                this.$emit('input', this.searchItemList);
                this.$emit('on-clear-item', index, this);
            }, // 删除单个检索项
            dateChange(val, type) {
                console.log(val);
                this.datePickerValue = val;
                this.$emit('on-value-change', this.dropSelectedObj, val);
                // if (typeof val ==='string') {
                //     this.changeSearchItemList(val);
                // } else {
                //     this.changeSearchItemList(val.join('~'));
                // }
                // let value = this.$refs[this.dropComponent].visualValue;
                // this.changeSearchItemList(value);
            }, // 日期组件的on-change方法
            dropSelectedChange(val) {
                this.dropDownSelectFilterSelectedValue = val;
                this.$emit('on-value-change', this.dropSelectedObj, val);
            }, // 下拉单选或者多选组件改变时触发
            componentChange(value) {
                this.changeSearchItemList(value);
                this.$emit('on-value-change', this.dropSelectedObj, value);
            }, // 自定义组件的on-change方法
            checkboxChange(isSelected, label, column, ite) {
                let tagTotaoListIndex = this.tagTotaoList.findIndex(item => item.column === column);
                let tagObj = this.tagTotaoList.find(item => item.column === column);
                let tagObjIndex = tagObj.list.findIndex(item => item.label === label);
                this.tagTotaoList[tagTotaoListIndex].list[tagObjIndex].selected = isSelected;
                let findIndex = tagObj.selectedList.findIndex(item => item.label === label);
                if (isSelected) {
                    if (findIndex > -1) {
                        tagObj.selectedList.splice(findIndex, 1, ite);
                    } else {
                        tagObj.selectedList.push(ite);
                    }
                } else {
                    tagObj.selectedList.splice(findIndex, 1);
                }
                let arr = [];
                tagObj.selectedList.forEach(item =>{
                    arr.push(item.label);
                });
                tagObj.value = arr.join(',');
                this.tagChangeSearchItemList(tagObj);
            }, // 标签中的多选改变
            tagChangeSearchItemList(tagObj) {
                let findIndex = this.searchItemList.findIndex(item => item.column === tagObj.column);
                if (tagObj.value){
                    if (findIndex > -1) {
                        this.searchItemList.splice(findIndex, 1, tagObj);
                    } else {
                        this.searchItemList.push(tagObj);
                    }
                } else {
                    if (findIndex > -1){
                        this.searchItemList.splice(findIndex, 1);
                    }
                }
                this.$emit('input', this.searchItemList);
                this.poptipIsShow();
            }
        }
    };
</script>
<style lang="less" scoped>

</style>
