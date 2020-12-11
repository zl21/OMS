<!--suppress JSPotentiallyInvalidTargetOfIndexedPropertyAccess -->
<template>
    <div :class="prefixCls" @click.stop>
        <autocomplete
            :placeholder="searchPlaceholder"
            :hidecolumns="hidecolumns"
            :columnsKey="columnsKey"
            :transfer="transfer"
            :data="AutoData"
            :enterType="enterType"
            clearable
            ref="autocomplete"
            @on-keydown="handleKeyDown"
            @on-keyup="handleKeyUp"
            @on-blur="handleBlur"
            @on-focus="handleFocus"
            @on-input="handleChange"
            @on-select="optionSelected"
            class="tableSearch"
            v-model="inputSearchValue">
        </autocomplete>
        <div class="table multi-table">
            <table>
                <thead>
                <tr>
                    <th v-for="(item, index) in tabth" :key="index" v-if="item.colname === 'ID'">
                        <checkbox v-if="!single" v-model="thCheckBox" @on-change="thCheckBoxChange($event)">
                            <span>{{localeIdText}}</span>
                        </checkbox>
                        <span v-if="single">{{localeIdText}}</span>
                    </th>
                    <th v-for="(item, index) in tabth" :key="index" v-if="item.colname !== 'ID'">{{item.name}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in tabrow" :key="index" :data-index="index" v-if="single">
                    <radio-group v-model="radioValue" @on-change="(selectedValue)=>radioChange(selectedValue,radioLable[index],item)">
                        <td :data-id="item[0]">
                            <radio :label="radioId[index]">
                                <span>{{index + startindex + 1}}</span>
                            </radio>
                        </td>
                    </radio-group>
                    <td v-for="(temp, index2) in tabth" :key="index2" v-if="index2 > 0"
                        :data-val="tabth[index2].colname" @click.stop="radioChange(radioSelectedValue(item),radioLable[index],item)">{{item[temp.colname].val}}
                    </td>
                </tr>
                <tr v-for="(item, index) in tabrow" :key="index" :data-index="index" v-if="!single">
                        <td>
                            <!--<checkbox v-model="item.checked" ref='mycheckbox' @click.native="checkBoxChange($event,item, index)">-->
                            <checkbox v-model="Selected[index].checked" ref='mycheckbox' @on-change="checkBoxChange($event,item,index)">
                                <span v-if="!single">{{index + startindex + 1}}</span>
                            </checkbox>
                        </td>
                    <td v-for="(temp, index2) in tabth" :key="index2" v-if="index2 > 0"
                        :data-val="tabth[index2].colname" @click.stop="rowSelected(item)">{{item[temp.colname].val}}
                    </td>
                </tr>
                </tbody>
            </table>
            <p v-if="dataEmpty.flag">
                <span>{{dataEmpty.message}}</span>
            </p>
        </div>
        <div class="page" v-if="totalRowCount>0">
            <page
                size="small"
                @on-change="onPageChange"
                :page-size="pageSize"
                :total="Math.ceil(totalRowCount/10) > 500 ? 500*10 : totalRowCount">
            </page>
        </div>
        <Spin fix v-show="spinShow">
            <Icon type="ios-loading" size=30 class="demo-spin-icon-load"></Icon>
            <div>加载中</div>
        </Spin>
    </div>
</template>

<script>
    /* eslint-disable no-shadow,no-empty,prefer-arrow-callback */

    import Page from '../../components/page/page.vue';
    import RadioGroup from '../../components/radio/radio-group.vue';
    import Radio from '../../components/radio/radio.vue';
    import CheckboxGroup from '../../components/checkbox/checkbox-group.vue';
    import Checkbox from '../../components/checkbox/checkbox.vue';
    import Autocomplete from '../../components/auto-complete/auto-complete-clo.vue';
    import Locale from '../../mixins/locale';
    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}`;

    export default {
        name: 'Fktable',
        mixins: [Locale],
        props: {
            isBackRowItem: {
                type: Boolean,
                default: () => false
            },// 多选返回row数据
            transfer: {
                type: Boolean,
                default: () => false
            },//是否放到body里
            single: {
                type: Boolean,
                default: true
            },//是否是单选，默认是单选
            inputValue: {
                type: String,
                default: () => ''
            },//输入框的值
            showColnameKey: {
                type: String,
                default: () => 'isak'
            },// 显示列的key
            totalRowCount: {
                type: Number,
                default: () => 0
            },//数据总条数
            pageSize: {
                type: Number,
                default: () => 10
            },//每页条数
            data: {
                type: Object,
                default: () => ({})
            },// 下拉气泡表格里数据
            radioSelected: {
                type: Number,
                default: 0
            }, // 单选气泡关闭时传过来的值
            dataEmptyMessage:{
                type: String,
                default: () => '暂无数据'
            }, // 无数据的时候提示
            searchPlaceholder: {
                type: String,
                default: () => '请输入模糊搜索关键词'
            },// 模糊搜索输入框提示
            defaultSelected: {
                type: Array,
                default: () => []
            }, // checkbox默认选中数据
            columnsKey:{
                type: Array,
                default () {
                    return [];
                }
            }, // 模糊搜索展示的列
            hidecolumns:{
                type: Array,
                default: () => []
            }, // 模糊搜索要隐藏的列
            AutoData:{
                type: Array,
                default: () => []
            }, // 模糊搜索的数据
            enterType: {
                type: Boolean,
                default: () => false
            },//是否回车自动选中第一行
        },
        components: {
            Page,
            Radio,
            RadioGroup,
            Checkbox,
            CheckboxGroup,
            Autocomplete
        },
        watch: {
            defaultSelected: {
                handler(val) {
                },
                deep: true
            },
            Selected: {
                handler(val) {
                    if (this.data.row && this.data.row.length > 0) {
                        let findIndex = val.findIndex(item => item.checked === false);
                        if (findIndex === -1) {
                            this.thCheckBox = true;
                        } else {
                            this.thCheckBox = false;
                        }
                    }
                    return false;
                },
                deep: true
            },
            radioSelected: {
                handler: function () {
                    // this.radioValue = '';
                }
            }, // 监控父页面传过来的值，气泡关闭的时候清空单选的选中
            inputValue: {
                handler: function (val) {
                    let _self = this;
                    // _self.radioValue = val;
                    if (val === '') {
                        _self.checkboxSelected = [];
                        _self.Selected.forEach(item => {
                            if (item.checked){
                                item.checked = false;
                            }
                        });
                    }
                    // let arr = val.split(',');
                    // console.log(arr.length);
                    // if (arr.length === 1){
                    //     let object = _self.Selected.find(function (value) {
                    //         return value ===val;
                    //     });
                    //     console.log(object);
                    //     if (object === undefined){
                    //         _self.Selected.forEach(item => {
                    //             if (item.checked){
                    //                 item.checked = false;
                    //             }
                    //         });
                    //     }
                    // }
                }
            },
            data: {
                handler: function () {
                    let _self = this;
                    _self.spinShow = false;
                    if (_self.single) {
                        _self.radioValue = '';
                        _self.radioSearchTable();
                        this.$nextTick(() =>{
                            if (_self.defaultSelected.length > 0) {
                                if (_self.defaultSelected[0].ID) {
                                    _self.radioValue = _self.defaultSelected[0].ID;
                                }
                            }
                        });
                    } else {
                        _self.checkboxSearchTable();
                    }
                }
            },
            middleSelectedData: {
                handler: function (val) {
                    if (!this.transfer) {
                        if (val.length > 0) {
                            let _self = this;
                            if (_self.single) {
                                this.$nextTick(() =>{
                                    if (val.length > 0) {
                                        if (val[0].ID) {
                                            _self.radioValue = val[0].ID.toString();
                                        }
                                    }
                                });
                            } else {
                                val.forEach(item => {
                                    _self.checkboxSelected.push(item);
                                });
                                _self.checkboxSearchTable();
                            }
                        }
                    } else {
                        let _self = this;
                        if (_self.single) {
                            this.$nextTick(() =>{
                                if (val.length > 0) {
                                    if (val[0].ID) {
                                        _self.radioValue = val[0].ID.toString();
                                    }
                                }
                            });
                        } else {
                            val.forEach(item => {
                                if (_self.checkboxSelected.findIndex(cur => cur.ID === item.ID) === -1) {
                                    _self.checkboxSelected.push(item);
                                }
                            });
                            _self.checkboxSearchTable();
                        }
                    }
                }
            },
            getDefaultSelected() {
            }
        },
        data() {
            return {
                inputSearchValue: '', // 模糊搜索输入框的值
                thCheckBox: false, // 表格头部的checkbox
                spinShow: false, // 是否显示loading
                middleSelectedData: [], // defaultSelected中间转换值
                radioValue: '', // 单选v-model绑定的值
                checkboxSelected: [], // 存放默认数据，以及选中的数据，包括ID和Lable
                tabth: [],
                tabrow: [],
                showColname: '', // 选中后输入框里显示表格的哪一列
                Selected: [], // 存放checkbox的v-model的数据
                dataEmpty: {
                    flag: true,
                    message: ''
                }, //数据是否为空
                startindex: 0 // 表格每页序号的起始值，如果没有赋值默认从1开始。
            };
        },
        computed: {
            localeIdText() {
                return this.t('i.fkrpSelect.idText');
            },
            radioSelectedValue() {
                return (item) => {
                    return item.ID.val;
                };
            },
            radioLable() {
                let _self = this;
                let radioLable = [];
                _self.data.tabth.forEach((item) => {
                    if (item[this.showColnameKey]) {
                        _self.data.row.forEach(ite => {
                            radioLable.push(ite[item.colname].val);
                        });
                    }
                });
                return radioLable;
            },
            radioId() {
                let _self = this;
                let radioId = [];
                _self.data.tabth.forEach((item) => {
                    if (item.colname === 'ID') {
                        _self.data.row.forEach(ite => {
                            radioId.push(ite[item.colname].val);
                        });
                    }
                });
                return radioId;
            },
            prefixCls(){
                return `${prefixCls}fktable`;
            },
            getDefaultSelected () {
                this.middleSelectedData = [...this.defaultSelected];
                return this.defaultSelected;
            }
        },
        methods: {
            optionSelected(val) {
                let _self = this;
                let selectedIndex = _self.checkboxSelected.findIndex(item => item.ID === val.value);
                if (selectedIndex === -1){
                    let obj = {
                        ID: val.value,
                        Label: val.label
                    };
                    _self.checkboxSelected.push(obj);
                    _self.Selected.find(item => item.ID === val.value);
                }
                _self.$emit('onFkrpSelected', _self.checkboxSelected);
                _self.inputSearchValue = '';
                setTimeout(() => {
                    _self.inputSearchValue = '';
                    _self.$refs.autocomplete.$refs.input.focus();
                }, 50);
                _self.$refs.autocomplete.$refs.input.focus();
            }, // 模糊搜索选中后触发
            handleKeyDown(e) {
                this.$emit('on-keydown',e, this);
            }, // 模糊搜索框keydown事件
            handleKeyUp(e) {
                this.$emit('on-keyup',e, this);
            }, // 模糊搜索框keyup事件
            handleBlur(e) {
                this.$emit('on-blur', e, this);
            }, // 模糊搜索框失去焦点事件
            handleFocus(e) {
                this.$emit('on-focus', e, this);
            }, // 模糊搜索框聚焦事件
            handleChange(val) {
                this.$emit('on-input-change', val, this);
            }, // 模糊搜索框改变事件
            thCheckBoxChange(val) {
                if (val) {
                    this.Selected.map((item) => {
                        item.checked = true;
                        let findIndex = this.checkboxSelected.findIndex(cur => cur.ID === item.ID );
                        if (findIndex === -1) {
                            let obj = {ID: item.ID, Label: item.lable};
                            if (this.isBackRowItem && this.data.row && this.data.row.length > 0) {
                                obj.rowItem = this.data.row.find(cur => cur.ID.val === item.ID);
                            }
                            this.checkboxSelected.push(obj);
                        }
                        return item;
                    });
                    this.$emit('onFkrpSelected', this.checkboxSelected);
                } else {
                    this.Selected.map((item) => {
                        item.checked = false;
                        let findIndex = this.checkboxSelected.findIndex(cur => cur.ID === item.ID );
                        if (findIndex > -1) {
                            this.checkboxSelected.splice(findIndex, 1);
                        }
                        return item;
                    });
                    this.$emit('onFkrpSelected', this.checkboxSelected);
                }
            }, // 头部checkbox改变时触发
            radioChange(selectedValue,value,item) {
                let _self = this;
                _self.radioValue = selectedValue;
                let radioSelected = [];
                let obj ={
                  ID: item.ID.val,
                  Label: value
                };
                if (this.isBackRowItem) {
                    obj.rowItem = item;
                }
                radioSelected.push(obj);
                _self.$emit('onFkrpSelected', radioSelected);
                _self.$emit('onRadioSelectedChange', '');
            }, // 单选改变选中值时触发的方法
            checkBoxChange(e,item) {
                let _self = this;
                if (e) {
                    let obj = {
                        ID: item.ID.val,
                        Label: item[_self.showColname].val
                    };
                    if (this.isBackRowItem) {
                        obj.rowItem = item;
                    }
                    _self.checkboxSelected.push(obj);
                } else {
                    let object = _self.checkboxSelected.find(function (val) {
                        return val.ID === item.ID.val;
                    });
                    let index = _self.checkboxSelected.indexOf(object);
                    _self.checkboxSelected.splice(index, 1);
                }
                // _self.checkboxSelected.forEach(item =>{
                //     console.log(item.Lable);
                // });
                _self.$emit('onFkrpSelected', _self.checkboxSelected);
            }, // 多选改变值时触发的方法
            rowSelected(item){
                let _self =this;
                let object = _self.Selected.find(function (val) {
                    return val.ID === item.ID.val;
                });
                if (object.checked){
                    object.checked = false;
                    let object1 = _self.checkboxSelected.find(function (val) {
                        return val.ID === item.ID.val;
                    });
                    let index = _self.checkboxSelected.indexOf(object1);
                    _self.checkboxSelected.splice(index, 1);
                } else {
                    object.checked = true;
                    let obj = {
                        ID: item.ID.val,
                        Label: item[_self.showColname].val
                    };
                    if (this.isBackRowItem) {
                        obj.rowItem = item;
                    }
                    _self.checkboxSelected.push(obj);
                }
                _self.$emit('onFkrpSelected', _self.checkboxSelected);
            }, // 多选，选中行时触发的方法
            onPageChange(value) {
                let _self = this;
                // _self.tabth = [];
                // _self.tabrow = [];
                _self.spinShow = true;
                _self.radioValue = '';
                _self.$emit('onPageChange', value);
                _self.dataEmpty.flag = true;
                setTimeout(() => {
                    _self.dataEmpty.message = _self.dataEmptyMessage;
                }, 100);
            }, // 页码改变时触发的方法
            checkboxSearchTable() {
                let _self = this;
                let showData = _self.data;
                _self.tabrow = [];
                _self.Selected = [];
                _self.tabrow = showData.row;
                if (showData.row === undefined || showData.row.length === 0){
                    _self.dataEmpty.flag = true;
                    _self.dataEmpty.message = _self.dataEmptyMessage;
                    _self.tabrow = [];
                } else {
                    _self.dataEmpty.flag = false;
                    _self.tabrow = showData.row;
                }
                if (showData.tabth === undefined || showData.tabth.length === 0){
                    _self.dataEmpty.flag = true;
                    _self.dataEmpty.message = _self.dataEmptyMessage;
                    _self.tabth = [];
                } else {
                    _self.dataEmpty.flag = false;
                    _self.tabth = showData.tabth;
                }
                if (showData.start === undefined){
                    _self.startindex = 0;
                } else {
                    _self.startindex = showData.start;
                }
                _self.tabth.forEach((item1) => {
                    if (item1[this.showColnameKey]) {
                        _self.showColname = item1.colname;
                    }
                });
                _self.tabrow.forEach(item => {
                    let object = _self.checkboxSelected.find(val => val.ID.toString() === item.ID.val.toString());
                    if (object !== undefined){
                        let ite = {
                            ID: item.ID.val,
                            lable: item[_self.showColname].val,
                            checked: true
                        };
                        _self.Selected.push(ite);
                    } else {
                        let ite = {
                            ID: item.ID.val,
                            lable: item[_self.showColname].val,
                            checked: false
                        };
                        _self.Selected.push(ite);
                    }
                });
                // _self.$emit('onFkrpSelected', _self.checkboxSelected);
                _self.$nextTick(() => {
                });
            },
            radioSearchTable() {
                let _self = this;
                let showData = _self.data;
                _self.tabrow = [];
                if (showData.row === undefined || showData.row.length === 0){
                    _self.dataEmpty.flag = true;
                    _self.dataEmpty.message = _self.dataEmptyMessage;
                    _self.tabrow = [];
                } else {
                    _self.dataEmpty.flag = false;
                    _self.tabrow = showData.row;
                }
                if (showData.tabth === undefined || showData.tabth.length === 0){
                    _self.dataEmpty.flag = true;
                    _self.dataEmpty.message = _self.dataEmptyMessage;
                    _self.tabth = [];
                } else {
                    _self.dataEmpty.flag = false;
                    _self.tabth = showData.tabth;
                }
                if (showData.start === undefined){
                    _self.startindex = 0;
                } else {
                    _self.startindex = showData.start;
                }
                _self.tabth.forEach((item1) => {
                    if (item1.show) {
                        _self.showColname = item1.colname;
                    }
                });
                _self.$nextTick(() => {
                });
            }
        },
        created: function () {
            let _self = this;
            if (_self.single) {
                _self.radioValue = '';
                if (_self.defaultSelected.length > 0) {
                    if (_self.defaultSelected[0].ID) {
                        _self.radioValue = _self.defaultSelected[0].ID.toString();
                    }
                }
                _self.radioSearchTable();
            } else {
                if (_self.inputValue) {
                    _self.defaultSelected.forEach(item => {
                        _self.checkboxSelected.push(item);
                    });
                }
                _self.checkboxSearchTable();
            }
        },
        mounted() {
        },
        beforeDestroy() {
            let _self = this;
            _self.radioValue = '';
            _self.tabth = [];
            _self.tabrow = [];
        }
    };
</script>

<style lang="less">

</style>

