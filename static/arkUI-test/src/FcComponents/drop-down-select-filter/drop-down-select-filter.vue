<template>
    <div :class="prefixCls" id="dropDownSelectFilter">
        <autocomplete
            :placeholder="placeholder?placeholder:inputPlaceholder"
            :disabled="disabled ? true: inputValue.length > 0 && inputValueLength > 1 && !single ?true:false"
            :hidecolumns="hidecolumns"
            :columnsKey="columnsKey"
            :transfer="transfer"
            :data="AutoData"
            :enterType="enterType"
            :clearable="disabled ? false : clearable"
            ref="autocomplete"
            @on-keydown="handleKeyDown"
            @on-keyup="handleKeyUp"
            @on-blur="handleBlur"
            @on-focus="handleFocus"
            @on-clear="handleClear"
            @on-input="handleChange"
            @on-select="optionSelected"
            @on-change="autoOnChange"
            v-model="inputValue">
        </autocomplete>
        <div :class="prefixCls + '-icon'" v-if="transfer">
            <Icon type="iconbj_xldx" v-if="!single" ref="icon" @click="handleIconClick"></Icon>
            <Icon type="iconbj_xldan" v-if="single" ref="icon" @click="handleIconClick"></Icon>
        </div>
        <transition name="fade">
            <div
                v-click-outside="handleClose"
                ref="popper"
                id="dropDownSelectPopper"
                :class="[prefixCls + '-popper',wrapClasses]"
                v-if="popperVisible"
                :style="{'z-index': getZindex}"
                :data-transfer="transfer"
                v-transfer-dom>
                <div v-show="trianglePosition ==='bottom'" :class="prefixCls + '-arrow'"></div>
                <div v-show="trianglePosition ==='top'" :class="prefixCls + '-arrow-top'"></div>
                <fktable
                    :data="data"
                    :totalRowCount="totalRowCount"
                    :pageSize="pageSize"
                    :single="single"
                    :transfer="transfer"
                    :inputValue="inputValue"
                    :radioSelected="radioSelected"
                    :showColnameKey="showColnameKey"
                    :defaultSelected="transferDefaultSelected"
                    :isBackRowItem="isBackRowItem"
                    @onFkrpSelected="selectValue"
                    @onPageChange="changePage"
                    @onRadioSelectedChange="changeSelected"
                    :dataEmptyMessage="dataEmptyMessage"
                    slot="content">
                </fktable>
                </div>
        </transition>
        <poptip @on-popper-hide="popperHide"
                @on-popper-show="popperShow"
                v-if="!transfer"
                ref="poptip">
            <Icon type="iconbj_xldx" v-if="!single" ref="icon"></Icon>
            <Icon type="iconbj_xldan" v-if="single" ref="icon"></Icon>

            <fktable
                :data="data"
                :totalRowCount="totalRowCount"
                :pageSize="pageSize"
                :single="single"
                :inputValue="inputValue"
                :radioSelected="radioSelected"
                :showColnameKey="showColnameKey"
                :defaultSelected="defaultSelected"
                :isBackRowItem="isBackRowItem"
                @onFkrpSelected="selectValue"
                @onPageChange="changePage"
                @onRadioSelectedChange="changeSelected"
                :dataEmptyMessage="dataEmptyMessage"
                slot="content"></fktable>
        </poptip>
    </div>
</template>
<script>
    /* eslint-disable no-lonely-if */

    import {directive as clickOutside} from 'v-click-outside-x';
    import Popper from '../../components/base/popper';
    import TransferDom from '../../directives/transfer-dom';
    import { transferIndex, transferIncrease } from '../../utils/transfer-queue';
    import Poptip from '../../components/poptip/poptip.vue';
    import Autocomplete from '../../components/auto-complete/auto-complete-clo.vue';
    import Fktable from './fktable.vue';
    import Option from '../../components/select/option-col.vue';
    import burgeonConfig from '../../assets/config';
    import Locale from '../../mixins/locale';

    const prefixCls = `${burgeonConfig.prefixCls}`;

    export default {
        name: 'DropDownSelectFilter',
        directives: {clickOutside, TransferDom },
        mixins: [Popper,Locale],
        data() {
            return {
                middleData: '', // 转换默认数据
                isClear: false,
                trianglePosition: 'bottom', // 三角的位置
                transferDefaultSelected: [], // transfer为true时选中的值
                currentPage: 1, // 当前页码
                modelValue: [], // 双向绑定的value
                inputValue: '', //input中显示的内容。
                radioSelected: 0, // 气泡关闭的时候发生变化，子组件监控，然后清空选中的值。
                popperVisible: false, // 气泡是否显示
                inputValueLength: 0 // 多选的时候，输入框内选中的个数。
            };
        },
        props: {
            isOutsizeDestroy: {
                type: Boolean,
                default: () => false
            },// 是否从外部销毁poptip组件
            isBackRowItem: {
                type: Boolean,
                default: () => false
            },// 多选返回row数据
            zIndex: {
                type: Number,
                default: 1000
            }, // 气泡的z-index
            showColnameKey: {
                type: String,
                default: () => 'isak'
            },// 显示列的key
            placeholder: {
                type: String,
                default: () => ''
            },// 输入框提示
            transfer: {
                type: Boolean,
                default: () => true
            },//是否放到body里
            single: {
                type: Boolean,
                default: () => true
            },//是否是单选
            disabled: {
                type: Boolean,
                default: () => false
            },//是否不可编辑
            clearable: {
                type: Boolean,
                default: () => true
            },//是否可清空
            enterType: {
                type: Boolean,
                default: () => false
            },//是否回车自动选中第一行
            data: {
                type: Object,
                default: () => ({})
            },// 下拉气泡表格里数据
            totalRowCount: {
                type: Number,
                default: () => 0
            },//数据总条数
            pageSize: {
                type: Number,
                default: () => 10
            },//每页条数
            AutoData:{
                type: Array,
                default: () => []
            }, // 模糊搜索的数据
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
            dataEmptyMessage:{
                type: String,
                default: () => '暂无数据'
            }, // 无数据的时候提示
            defaultSelected: {
                type: Array,
                default: () => []
            }, // checkbox默认选中数据
            isShowPopTip: {
                type: Function,
                default: () => true
            },
            className:{ //自定义弹窗的class
                type: String
            }
        },
        components: {
            Poptip,
            Autocomplete,
            Fktable,
            Option
        },
        created() {
            let _self = this;
        },
        watch: {
            inputValue: {
                handler: function (val) {
                    // this.$emit('input', this.modelValue);
                    let inputArray = val.split(',');
                    this.inputValueLength = inputArray.length;
                    if (val === '') {
                        this.transferDefaultSelected = [];
                    }
                }
            },
            data: {
                handler: function (val) {
                    this.computedPoperPosition();
                }
            },
            middleData: {
                handler: function (val) {
                    let arr = [];
                    let arr1 = [];
                    val.forEach(item =>{
                        let obj = JSON.parse(JSON.stringify(item));
                        arr.push(obj);
                        arr1.push(item.Label);
                    });
                    this.transferDefaultSelected = [];
                    val.forEach(item =>{
                        let obj = JSON.parse(JSON.stringify(item));
                        this.transferDefaultSelected.push(obj);
                    });
                    this.inputValue = arr1.join(',');
                }
            },
            getDefault: {
                handler: function (val) {
                }
            },
            popperVisible: {
                handler: function (val) {
                    if (val) {
                        this.$emit('on-popper-show',this);
                    } else {
                        this.$emit('on-popper-hide',this);
                    }
                }
            }
        },
        computed: {
            wrapClasses () {
                return [
                    {
                        [`${this.className}`]: !!this.className
                    }
                ];
            },
            getZindex() {
                if (this.popperVisible) {
                    transferIncrease();
                }
                return transferIndex + this.zIndex;
            },
            getDefault() {
              this.middleData = [...this.defaultSelected];
              return this.defaultSelected;
            },
            filteredData () {
                return this.AutoData;
            },
            prefixCls(){
                return `${prefixCls}fkrp-select`;
            },
            inputPlaceholder() {
                return this.t('i.fkrpSelect.inputPlaceholder');
            }
        },
        updated(){
            window.addEventListener('resize', this.handleClose);
        },
        mounted() {
            let startTag = document.getElementById('dropDownSelectFilter');
            this.getParentDoc(startTag);
        },
        beforeDestroy() {
            let node = document.getElementById('dropDownSelectPopper');
            if (node && !this.isOutsizeDestroy) {
                node.parentNode.removeChild(node);
            }
        },
        destroyed() {
            let node = document.getElementById('dropDownSelectPopper');
            if (node && !this.isOutsizeDestroy) {
                node.parentNode.removeChild(node);
            }
        },
        methods: {
            destroyPoptip() {
                let node = document.getElementById('dropDownSelectPopper');
                if (node) {
                    node.parentNode.removeChild(node);
                }
            },
            handleFocus(e) {
                this.$emit('on-focus', e, this);
            },
            handleClear() {
                this.inputValue = '';
                if (!this.isClear) {
                    this.transferDefaultSelected = [];
                }
                this.isClear = true;
                this.$emit('on-clear', this);
            },
            handleBlur(e) {
                this.$emit('on-blur', e, this);
            },
            handleKeyUp(e) {
                this.$emit('on-keyup',e, this);
            },
            handleKeyDown(e) {
                this.$emit('on-keydown',e, this);
            },
            handleIconClick() {
            if (this.disabled) {
                return false;
            } else {
                if (typeof this.isShowPopTip === 'function' && !this.isShowPopTip()) {
                    return;
                }
                setTimeout(() =>{
                    this.popperVisible = !this.popperVisible;
                    this.computedPoperPosition();
                },100);
            }
        },
            getParentDoc(startTag) {
                if (startTag instanceof HTMLElement) {
                    startTag.addEventListener('scroll',() => {
                    this.computedPoperPosition();
                });
                  this.getParentDoc(startTag.parentElement);
              }
            },
            computedPoperPosition() {
                if (this.popperVisible) {
                    this.$nextTick(() => {
                        let windowWidth = window.innerWidth; // 窗口的宽度
                        let windowHeight = window.innerHeight; // 窗口的高度
                        let bodyHeight = document.body.scrollHeight; // body正文的高度
                        let iconBottom = this.$refs.icon.$el.getClientRects()[0].bottom; // icon的底侧到窗口上边的距离，单位px
                        // console.log('iconBottom',iconBottom);
                        let iconToBottomDistance = windowHeight - iconBottom; // icon到窗口底部的距离
                        if (iconToBottomDistance < 320) {
                            this.trianglePosition = 'top';
                            this.$nextTick(() =>{
                                let iconRight = this.$refs.icon.$el.getClientRects()[0].right; // icon的右侧到窗口左边的距离，单位px
                                let iconHeight = this.$refs.icon.$el.getClientRects()[0].height; // icon的高度，单位px
                                let iconWidth = this.$refs.icon.$el.getClientRects()[0].width; // icon的高度，单位px
                                let inputHeight = this.$refs.autocomplete.$el.getClientRects()[0].height; // input的高度，单位px
                                let heightDifference = (inputHeight - iconHeight) / 2; // icon 到输入框底部的距离
                                let iconToRightDistance = windowWidth - iconRight; // icon到窗口右边的距离
                                let poppetDoc = this.$refs.popper;
                                console.log(poppetDoc.clientHeight);
                                let arrowDoc = document.getElementsByClassName(`${this.prefixCls}-arrow`);
                                let arrowTopDoc = document.getElementsByClassName(`${this.prefixCls}-arrow-top`);
                                if (poppetDoc && arrowTopDoc) {
                                    if (iconToRightDistance < (150 - (iconWidth / 2))){
                                        // console.log(11);
                                        poppetDoc.style.right = `${2}px`;
                                        if (bodyHeight> windowHeight) {
                                            poppetDoc.style.top = `${iconBottom + heightDifference -inputHeight + bodyHeight - windowHeight -poppetDoc.clientHeight -10}px`;
                                        } else {
                                            poppetDoc.style.top = `${iconBottom + heightDifference -inputHeight -poppetDoc.clientHeight-10}px`;
                                        }
                                        // console.log(poppetDoc.style.top);

                                        arrowTopDoc[0].style.top = `${poppetDoc.clientHeight-1}px`;
                                        arrowTopDoc[0].style.right = `${iconToRightDistance -(iconWidth/2)}px`;
                                    } else if (iconRight < 150 + (iconWidth / 2)) {
                                        // console.log(22);
                                        poppetDoc.style.right = `${windowWidth - 312}px`;
                                        if (bodyHeight> windowHeight) {
                                            poppetDoc.style.top = `${iconBottom + heightDifference -inputHeight + bodyHeight - windowHeight -poppetDoc.clientHeight-10}px`;
                                        } else {
                                            poppetDoc.style.top = `${iconBottom + heightDifference -inputHeight -poppetDoc.clientHeight-10}px`;
                                        }
                                        // console.log(poppetDoc.style.top);

                                        arrowTopDoc[0].style.top = `${poppetDoc.clientHeight-1}px`;
                                        arrowTopDoc[0].style.right = `${300 - iconRight}px`;
                                    } else {
                                        // console.log(33);
                                        poppetDoc.style.right = `${iconToRightDistance - 150 + (iconWidth / 2)}px`;
                                        if (bodyHeight> windowHeight) {
                                            poppetDoc.style.top = `${iconBottom + heightDifference -inputHeight + bodyHeight - windowHeight -poppetDoc.clientHeight-10}px`;
                                        } else {
                                            poppetDoc.style.top = `${iconBottom + heightDifference -inputHeight -poppetDoc.clientHeight-10}px`;
                                        }
                                        // console.log(poppetDoc.style.top);

                                        arrowTopDoc[0].style.top = `${poppetDoc.clientHeight-1}px`;
                                        arrowTopDoc[0].style.right = `${150-(iconWidth / 2)}px`;
                                    }
                                }
                            });
                        } else {
                            let iconRight = this.$refs.icon.$el.getClientRects()[0].right; // icon的右侧到窗口左边的距离，单位px
                            let iconHeight = this.$refs.icon.$el.getClientRects()[0].height; // icon的高度，单位px
                            let iconWidth = this.$refs.icon.$el.getClientRects()[0].width; // icon的高度，单位px
                            let inputHeight = this.$refs.autocomplete.$el.getClientRects()[0].height; // input的高度，单位px
                            let heightDifference = (inputHeight - iconHeight) / 2; // icon 到输入框底部的距离
                            let iconToRightDistance = windowWidth - iconRight; // icon到窗口右边的距离
                            let poppetDoc = document.getElementsByClassName(`${this.prefixCls}-popper`);
                            let arrowDoc = document.getElementsByClassName(`${this.prefixCls}-arrow`);
                            this.trianglePosition = 'bottom';
                            if (iconToRightDistance < (150 - (iconWidth / 2))){
                                // console.log(11);
                                poppetDoc[0].style.right = `${2}px`;
                                poppetDoc[0].style.top = `${iconBottom + heightDifference + 7}px`;
                                // console.log(poppetDoc[0].style.top);

                                arrowDoc[0].style.top = `${-7}px`;
                                arrowDoc[0].style.right = `${iconToRightDistance -(iconWidth/2)}px`;
                            } else if (iconRight < 150 + (iconWidth / 2)) {
                                // console.log(22);
                                poppetDoc[0].style.right = `${windowWidth - 302}px`;
                                poppetDoc[0].style.top = `${iconBottom + heightDifference + 7}px`;
                                // console.log(poppetDoc[0].style.top);

                                arrowDoc[0].style.top = `${-7}px`;
                                arrowDoc[0].style.right = `${300 - iconRight}px`;
                            } else {
                                // console.log(33);
                                poppetDoc[0].style.right = `${iconToRightDistance - 158 + (iconWidth / 2)}px`;
                                poppetDoc[0].style.top = `${iconBottom + heightDifference + 7}px`;
                                // console.log(poppetDoc[0].style.top);

                                arrowDoc[0].style.top = `${-7}px`;
                                arrowDoc[0].style.right = `${152-(iconWidth / 2)}px`;
                            }
                        }
                    });
                }
            }, // 计算气泡的位置
            handleClose() {
                this.popperVisible = false;
            },
            optionSelected(value) {
                let _self = this;
                _self.modelValue = [];
                let obj = {
                    ID: value.value,
                    Label: value.label
                };
                if (this.isBackRowItem) {
                    obj.rowItem = value.tem;
                }
                if (_self.transfer) {
                    _self.transferDefaultSelected = [];
                    _self.transferDefaultSelected.push(obj);
                }
                _self.modelValue.push(obj);
                _self.$emit('on-fkrp-selected', this.modelValue,this);
            }, // 模糊搜索选中触发
            selectValue(value) {
                let _self = this;
                if (_self.transfer) {
                    _self.transferDefaultSelected = [];
                    value.forEach(item =>{
                        let str = JSON.stringify(item);
                        let obj = JSON.parse(str);
                        _self.transferDefaultSelected.push(obj);
                    });
                }
                this.modelValue = value;
                _self.inputValue = value.reduce((acc, cur, idx, arr) => {
                    if (idx === arr.length -1) {
                        acc = `${acc + cur.Label}`;
                    } else {
                        acc = `${acc + cur.Label},`;
                    }
                    return acc;
                },'');
                _self.$emit('on-fkrp-selected', value,this);
            }, // 选中的值,value是个数组包含ID和lable
            changePage(value) { //
                let _self = this;
                _self.currentPage = value;
                _self.$emit('on-page-change', value,this);
            }, // 页码更改的时候将页码抛出去
            changeSelected() {
                let _self = this;
                if (_self.single) {
                    if (_self.transfer) {
                        setTimeout(() => {
                            _self.handleClose();
                        }, 50);
                    } else {
                        setTimeout(() => {
                            _self.$refs.poptip.handleClose();
                        }, 50);
                    }
                }
            }, // 单选框选中的时候关闭气泡
            popperHide() {
                let _self = this;
                _self.$emit('on-popper-hide',this);
                if (_self.radioSelected < 1) {
                    _self.radioSelected += 1;
                } else {
                    _self.radioSelected -= 1;
                }
            }, // 气泡关闭的时候触发的事件
            popperShow(instance){
                let _self = this;
                _self.$emit('on-popper-show',this);
                if (this.transfer) {
                } else {
                    let windowWidth = window.innerWidth; // 窗口的宽度
                    let poptipLeft = this.$refs.icon.$el.getClientRects()[0].right; // icon的右侧到窗口左边的距离，单位px
                    let poptipWidth = this.$refs.icon.$el.getClientRects()[0].width/2; // icon的宽度，单位px
                    let distance = windowWidth - poptipLeft; // 气泡到窗口右边的距离，单位px
                    let leftLength = (150 -(windowWidth - poptipLeft) - poptipWidth) + 144; // 右边三角的margin-left像素的值
                    let triangleRightLength = (150 -(windowWidth - poptipLeft) - poptipWidth)-7; // 右边气泡的left像素的值
                    let marginLeft = 'margin-left';
                    let triangleLeftLength = (150 - poptipLeft) + poptipWidth + 13; // 左边三角margin-left像素的值。
                    if (distance < 150){
                        setTimeout(() =>{
                            _self.$refs.poptip.$refs.popper.style.left = `${-leftLength}px`;
                            _self.$refs.poptip.$el.children[1].children[0].children[0].style.marginLeft = `${triangleRightLength}px`;
                        }, 50);
                    }
                    if (poptipLeft < 150){
                        setTimeout(() =>{
                            _self.$refs.poptip.$el.children[1].children[0].children[0].style.marginLeft = `${-triangleLeftLength}px`;
                        }, 50);
                    }
                }
            }, // 气泡弹出时触发事件
            handleChange(val){
                let _self = this;
                _self.$emit('on-input-value-change', val, this);
                _self.transferDefaultSelected = [];
            }, // 输入框输入时触发。
            autoOnChange(val){
                let _self = this;
                _self.$emit('on-change', val, this);
            } // 输入框输入时触发。
        }
    };
</script>
<style lang="less">

</style>
