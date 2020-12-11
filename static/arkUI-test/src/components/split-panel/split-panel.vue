<template>
    <div :class="`${prefix}-container`">
        <div v-if="isHorizontal" ref="splitWrapper" :class="wrapperClasses">
            <div
                v-if="splitPanels.length>0"
                :class="`${prefix}-split-panel`"
                v-for="(item,index) in splitPanels"
                :style="{width: panelWidth(index)}"
            >
                <div
                    v-if="!item.divide"
                    :ref="`${index}-pane`"
                    :class="paneClasses">
                    <!--<div v-if="index % 2 ===0">-->
                    <!--{{showWidth(index)}}-->
                    <!--</div>-->
                    <component
                        :is="item.component"
                    ></component>
                </div>
                <div
                    v-if="item.divide"
                    :class="divideClasses"
                    @mouseout="handleMouseout"
                    :style="{width: `${divideWidth}px`}"
                    @mousedown.stop="(e)=>handleMousedown(e,index,mode)">
                    <component
                        :is="divideComp"
                    ></component>
                </div>
            </div>
        </div>
        <div v-else ref="splitWrapper" :class="wrapperClasses">
            <div
                v-if="splitPanels.length>0"
                :class="`${prefix}-split-panel`"
                v-for="(item,index) in splitPanels"
                :style="{height: panelWidth(index)}"
            >
                <div
                    v-if="!item.divide"
                    :ref="`${index}-pane`"
                    :class="paneClasses">
                    <!--<div v-if="index % 2 ===0">-->
                    <!--{{showWidth(index)}}-->
                    <!--</div>-->
                    <component
                        :is="item.component"
                    ></component>
                </div>
                <div
                    v-if="item.divide"
                    :class="divideClasses"
                    @mouseout="handleMouseout"
                    :style="{height: `${divideWidth}px`}"
                    @mousedown.stop="(e)=>handleMousedown(e,index)">
                    <component
                        :is="divideComp"
                    ></component>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /* eslint-disable no-lonely-if,array-callback-return */

    import Divide from './divide.vue';
    import DivideVertical from './divide-vertical.vue';
    import {oneOf} from '../../utils/assist';
    import EmptyComponent from '../tab-panels/empty-panel.vue';
    import {on, off} from '../../utils/dom';
    import burgeonConfig from '../../assets/config';

    export default {
        name: 'SplitPanel',
        props:{
            mode: {
                validator (value) {
                    return oneOf(value, ['horizontal', 'vertical']);
                },
                default: 'horizontal'
            }, // 排列方式，horizontal水平，vertival垂直
            panels: {
                type: Array,
                default: ()=>[]
            },
            divideWidth: {
                type: Number,
                default: ()=> 10
            },
            divideComponent: {
                default: () =>Divide
            }
        },
        data(){
            return {
                divideComp: '', // 可移动条组件
                totalNum: 0, // panels数组里有几个对象有percentage属性
                defaultPercentage: 1, // panels数组里对象没有有percentage属性时的值
                totalPercentage: 0, // panels数组里对象有percentage属性的值的和
                totalPercent: 100, // 总的面盘占页面的百分数
                splitPanels: [], // 渲染界面的数组
                flag: true, // 移动的时候判断是否要延时
                divideIndex: 0, // 分割线的index
                initOffset: 0, // 鼠标点击的时候pageX的大小
                totalWidth: 0, // panels数组中每个元素的width的和
                prefix: `${burgeonConfig.prefixCls}split-panel`,
                isMoving: false
            };
        },
        computed: {
            isHorizontal () {
                return this.mode === 'horizontal';
            },
            offsetSize () {
                return this.isHorizontal ? 'offsetWidth' : 'offsetHeight';
            },
            showWidth() {
                return (index) => {
                    if (this.$refs[`${index}-pane`]) {
                        return this.$refs[`${index}-pane`][0].offsetHeight;
                    }
                };
            },
            wrapperClasses () {
                return this.isHorizontal ? [
                    `${this.prefix}-wrapper`,
                    this.isMoving ? 'no-select' : ''
                ] : [
                    `${this.prefix}-wrapper-vertical`,
                    this.isMoving ? 'no-select' : ''
                ];
            },
            paneClasses () {
                return [
                    `${this.prefix}-pane`,
                    {
                        [`${this.prefix}-pane-moving`]: this.isMoving
                    }
                ];
            },
            divideClasses () {
                return [
                    `${this.prefix}-divide`,
                    {
                        [`${this.prefix}-divide-moving`]: this.isMoving
                    }
                ];
            },
            panelWidth(){
                return (index) => {
                    if (index % 2 === 0) {
                        if (this.splitPanels[index].isFixed) {
                            return `${this.splitPanels[index].fixedWidthOrHeight}px`;
                        } else {
                            return `${(parseFloat(this.splitPanels[index].percentage) / this.totalWidth) * this.totalPercent}%`;
                        }
                    }
                };
            } // panel宽度的计算属性
        },
        created(){
            this.addDefaultData();
            this.getTotalPercentage();
            if (this.divideComponent === Divide){
                this.mode === 'horizontal' ? this.divideComp = Divide : this.divideComp = DivideVertical;
            } else {
                this.divideComp = this.divideComponent;
            }
        },
        mounted(){
            this.totalPercent = (1 - (((this.divideWidth * (this.panels.length - 1)) + this.getTotalWidth()) / this.$refs.splitWrapper[this.offsetSize])) * 100;
        },
        methods: {
            addDefaultData(){
                let divide = {
                    divide: true
                };
                let oldPanels = [];
                this.panels.forEach((item, index) => {
                    if (item.percentage) {
                        this.totalNum += 1;
                        this.totalPercentage += item.percentage;
                    }
                });
                if (this.totalNum > 0) {
                    this.defaultPercentage = this.totalPercentage / this.totalNum;
                }
                this.panels.forEach((item, index) => {
                    if (!item.component) {
                        item.component = EmptyComponent;
                    }
                    if (!item.percentage) {
                        item.percentage = this.defaultPercentage;
                    }
                    if (!item.isFixed) {
                        item.isFixed = false;
                        item.fixedWidthOrHeight = 0;
                    } else {
                        if (!item.fixedWidthOrHeight){
                            item.fixedWidthOrHeight = 50;
                        }
                    }
                    oldPanels.push(item);
                    if (index < this.panels.length - 1) {
                        oldPanels.push(divide);
                    }
                });
                this.copyPanels(oldPanels);
            }, // 添加panels默认值
            copyPanels(panels){
                let newPanels = [];
                panels.forEach((item,index)=>{
                    let obj = {};
                    if (index % 2 ===0){
                        obj.fixedWidthOrHeight = item.fixedWidthOrHeight;
                        obj.isFixed = item.isFixed;
                        obj.percentage = item.percentage;
                    } else {
                        obj.divide = item.divide;
                    }
                    newPanels.push(obj);
                });
                this.splitPanels = JSON.parse(JSON.stringify(newPanels));
                panels.forEach((item,index)=>{
                    if (index % 2 ===0){
                        this.splitPanels[index].component = item.component;
                    }
                });
            }, // 深度拷贝panels
            getTotalPercentage(){
                let total = 0;
                this.splitPanels.forEach((item, idx) => {
                    if (idx % 2 === 0) {
                        if (!item.isFixed) {
                            total += parseFloat(item.percentage);
                        }
                    }
                });
                this.totalWidth = total;
            }, // 获取渲染界面时候的总的percentage
            handleMousedown(e,index){
                this.isMoving = true;
                this.isHorizontal? this.initOffset = e.pageX:this.initOffset = e.pageY;
                // this.oldOffset = this.value;
                // this.isMoving = true;


                this.divideIndex = index;
                on(document, 'mousemove', this.handleMove);
                on(document, 'mouseup',this.handleUp);
                this.$emit('on-move-start');
            }, // 鼠标按下触发的方法
            handleMove(e){
                if (this.flag){
                    this.flag = false;
                    setTimeout(() => {
                        this.flag = true;
                        let moveDistance = 0;
                        this.isHorizontal? moveDistance = e.pageX - this.initOffset:moveDistance = e.pageY - this.initOffset;
                        this.isHorizontal? this.initOffset = e.pageX:this.initOffset = e.pageY;
                        this.horizontalMove(moveDistance);
                    },10);
                }
            }, // 鼠标移动触发的方法
            horizontalMove(moveDistance){
                let leftTotal = this.getLeftTotal();
                let rightTotal = this.getRightTotal();
                // if (leftTotal >0 && rightTotal > 0){
                    let moveLeftPercent = this.computeMoveLeftPercent(moveDistance);
                    let moveRightPercent = this.computeMoveRightPercent(moveDistance);
                    if (moveDistance < 0 && leftTotal >0 && moveRightPercent.toString() !== 'Infinity'){
                        this.computeMove(moveLeftPercent,moveRightPercent);
                    } else if (moveDistance > 0 && rightTotal >0 && moveLeftPercent.toString() !== 'Infinity'){
                        this.computeMove(moveLeftPercent,moveRightPercent);
                    }
                // }
            }, // 水平放大跟缩小
            computeMoveLeftPercent(moveDistance){
                return parseFloat(moveDistance) / (parseFloat(this.$refs.splitWrapper[this.offsetSize] -this.computeTotalDivideWidth() - this.getTotalWidth())*(parseFloat(this.getLeftTotal())/parseFloat(this.totalWidth)));
            }, // 计算当前移动条左边的每个panel移动的百分比
            computeMoveRightPercent(moveDistance){
                return parseFloat(moveDistance) / (parseFloat(this.$refs.splitWrapper[this.offsetSize] - this.computeTotalDivideWidth() - this.getTotalWidth())*(parseFloat(this.getRightTotal())/parseFloat(this.totalWidth)));
            }, // 计算当前移动条右边的每个panel移动的百分比
            computeTotalDivideWidth(){
                return this.divideWidth * ((this.divideIndex + 1) / 2);
            }, // 计算总的移动条的宽度
            computeMove(moveLeftPercent,moveRightPercent){
                this.splitPanels.map((item,index) => {
                    if (index % 2 ===0){
                        if (index < this.divideIndex){
                            item.percentage = item.percentage * (1+moveLeftPercent);
                        } else {
                            item.percentage = item.percentage * (1 -moveRightPercent);
                        }
                    }
                });
            }, // 移动时计算并修改panels
            handleMouseout(){
                // off(document, 'mousemove',this.handleMove);
            },
            handleUp(e){
                this.isMoving = false;
                off(document, 'mousemove',this.handleMove);
                off(document, 'mouseup',this.handleUp);
            },
            getLeftTotal(){
                let leftTotal = 0;
                this.splitPanels.forEach((item, idx) => {
                    if (idx < this.divideIndex) {
                        if (idx % 2 === 0) {
                            if (!item.isFixed) {
                                leftTotal += parseFloat(item.percentage);
                            }
                        }
                    }
                });
                return leftTotal;
            }, // 获取移动条左边的总的percentage
            getRightTotal(){
                let rightTotal = 0;
                this.splitPanels.forEach((item, idx) => {
                    if (idx > this.divideIndex) {
                        if (idx % 2 === 0) {
                            if (!item.isFixed) {
                                rightTotal += parseFloat(item.percentage);
                            }
                        }
                    }
                });
                return rightTotal;
            }, // 获取移动条右边的总的percentage
            getTotalWidth(){
                return this.splitPanels.reduce((acc, cur,idx) => {
                    if (idx===0){
                        acc = parseFloat(cur.fixedWidthOrHeight);
                    } else {
                        if (idx % 2 ===0){
                            acc = parseFloat(acc) + parseFloat(cur.fixedWidthOrHeight);
                        }
                    }
                    return acc;
                },'');
            } // 获取总的fixedWidthOrHeight
        }
    };
</script>
