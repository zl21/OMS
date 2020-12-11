<template>
    <div
        :class="prefixCls"
        v-click-outside:mousedown.capture="handleClose"
        v-click-outside.capture="handleClose"
    >
        <b-input
            ref="input"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="!editable || readonly"
            :icon="iconType"
            v-model="inputValue"

            @on-click="handleIconClick"
            @click.native="handleFocus"
            @mouseenter.native="handleInputMouseenter"
            @mouseleave.native="handleInputMouseleave"
        ></b-input>
        <transition name="transition-drop">
            <Drop
                v-show="visible"
                :placement="placement"
                :class="transferClass"
                ref="drop"
                :data-transfer="transfer"
                :transfer="transfer"
                v-transfer-dom>
                <div :class="pickerPanel" :style="getPanelStyle">
                    <div :class="pickerPanelUpper">
                        <div v-show="!timePickerOpen" :class="pickerPanelUpperBody">
                            <div
                                v-for="(item,index) in panelTextList"
                                :class="pickerPanelUpperText(item)"
                                @click.stop="panelItemClick(index)"
                            >{{item.label}}
                            </div>
                        </div>
                        <div v-show="timePickerOpen">
                            <time-spinner
                                :hours="timeSpinnerHours"
                                :minutes="timeSpinnerMinutes"
                                :seconds="timeSpinnerSeconds"
                                ref="timeSpinner"
                                @on-change="timeSpinnerChange"
                                :show-seconds="showSeconds">
                            </time-spinner>
                        </div>
                    </div>
                    <div :class="pickerPanelLower">
                        <b-button
                            type="text"
                            size="small"
                            :disabled="selectedList.length === 0"
                            :class="pickerPanelLowerText"
                            v-show="!timePickerOpen"
                            @click.stop="selectTimeClick">选择时间
                        </b-button>
                        <b-button
                            type="text"
                            size="small"
                            :class="pickerPanelLowerText"
                            v-show="timePickerOpen"
                            @click.stop="selectWeekClick">{{getSelectText}}
                        </b-button>
                        <div :class="pickerPanelLowerBtns">
                            <b-button size="small" @click.stop="clearWeek">清空</b-button>
                            <b-button size="small" type="primary" @click="confirmWeek">确定</b-button>
                        </div>
                    </div>
                </div>
            </Drop>
        </transition>
    </div>
</template>

<script>
    import {directive as clickOutside} from 'v-click-outside-x';
    import burgeonConfig from '../../assets/config';
    import bInput from '../input/input.vue';
    import bButton from '../button/button.vue';
    import Drop from '../select/dropdown.vue';
    import TimeSpinner from '../date-picker/base/time-spinner.vue';
    import TransferDom from '../../directives/transfer-dom';
    import {oneOf} from '../../utils/assist';

    const prefixCls = `${burgeonConfig.prefixCls}`;
    export default {
        data() {
            return {
                visible: false,
                showClose: false,
                panelTextList: [], // 存放panel里的数据，如周一、周二等
                timePickerOpen: false, // 时间是否显示
                timeSpinnerHours: 0, // 时间的小时
                timeSpinnerMinutes: 0, // 时间的分钟
                timeSpinnerSeconds: 0, // 时间的秒
                selectedList: [], // 选中的值
                inputValue: '', // 输入框双向绑定的值
            };
        },
        name: 'TimingDate',
        directives: {clickOutside, TransferDom},
        components: {
            bInput,
            Drop,
            TimeSpinner,
            bButton
        },
        props: {
            type: {
                validator(value) {
                    return oneOf(value, ['week', 'weektime', 'date', 'datetime']);
                },
                default: 'datetime'
            }, // 显示的类型，week 和 weektime
            placeholder: {
                type: String,
                default: ''
            }, // 占位文本
            hours: {
                type: Number,
                default: 0
            }, // 小时
            minutes: {
                type: Number,
                default: 0
            }, // 小时
            seconds: {
                type: Number,
                default: 0
            }, // 小时
            readonly: {
                type: Boolean,
                default: false
            },
            clearable: {
                type: Boolean,
                default: true
            },
            disabled: {
                type: Boolean,
                default: false
            },
            editable: {
                type: Boolean,
                default: false
            },
            transfer: {
                type: Boolean,
                default: false
            },
            placement: {
                validator(value) {
                    return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
                },
                default: 'bottom-start'
            },
            pickerTexts: {
                type: Array,
                default: () => []
            },
            format: {
                type: String,
                default: 'HH:mm'
            }
        },
        watch: {
            panelTextLists() {
            },
            visible(val) {
                if (!val) {
                    this.timePickerOpen = val;
                }
            },
            getHours() {
            },
            getMinutes() {
            },
            getSeconds() {
            },
            inputSetValue() {
            },
            inputValue() {
                this.handleChange();
            }
        },
        computed: {
            prefixCls() {
                return `${prefixCls}timing-date`;
            },
            transferClass() {
                return `${prefixCls}timing-date-transfer`;
            },
            pickerPanel() {
                return `${prefixCls}timing-date-panel`;
            },
            pickerPanelUpper() {
                return `${prefixCls}timing-date-panel-upper`;
            },
            pickerPanelUpperBody() {
                return `${prefixCls}timing-date-panel-upper-body`;
            },
            pickerPanelUpperText() {
                return (item) => {
                    if (item.selected) {
                        return `${prefixCls}timing-date-panel-upper-text ${prefixCls}timing-date-panel-upper-text-highlight`;
                    }
                    return `${prefixCls}timing-date-panel-upper-text`;
                };
            },
            pickerPanelLower() {
                return `${prefixCls}timing-date-panel-lower`;
            },
            pickerPanelLowerText() {
                return `${prefixCls}timing-date-panel-lower-text`;
            },
            pickerPanelLowerBtns() {
                return `${prefixCls}timing-date-panel-lower-btn`;
            },
            iconType() {
                let icon = 'ios-calendar-outline';
                if (this.showClose) {
                    icon = 'ios-close-circle';
                }
                return icon;
            },
            getPanelStyle() {
                if (this.type === 'date' || this.type === 'datetime') {
                    return 'width: 233px';
                }
            },
            getSelectText() {
                if (this.type === 'week' || this.type === 'weektime') {
                    return '选择周';
                }
                return '选择日期';
            },
            getTimeString() {
                let hours = this.timeSpinnerHours > 9 ? `${this.timeSpinnerHours}` : `0${this.timeSpinnerHours}`;
                let minutes = this.timeSpinnerMinutes > 9 ? `${this.timeSpinnerMinutes}` : `0${this.timeSpinnerMinutes}`;
                let seconds = this.timeSpinnerSeconds > 9 ? `${this.timeSpinnerSeconds}` : `0${this.timeSpinnerSeconds}`;
                if (this.showSeconds) {
                    return `${hours}:${minutes}:${seconds}`;
                }
                return `${hours}:${minutes}`;
            }, // 获取string类型的时间
            inputSetValue() {
                let str = this.selectedList
                    .reduce((acc, cur) => {
                        acc.push(cur.label);
                        return acc;
                    }, [])
                    .join(', ');
                if (this.type === 'weektime' && str.length > 0) {
                    this.$nextTick(() => {
                        this.inputValue = `${str}  ${this.getTimeString}`;
                    });
                    return `${str}  ${this.getTimeString}`;
                }
                if (this.type === 'datetime' && str.length > 0) {
                    this.$nextTick(() => {
                        this.inputValue = `${str}号  ${this.getTimeString}`;
                    });
                    return `${str}号  ${this.getTimeString}`;
                }
                this.$nextTick(() => {
                    this.inputValue = str;
                });
                return str;
            }, // 输入框显示的值
            panelTextLists() {
                let arr = this.pickerTexts.reduce((acc, cur) => {
                    let obj = {...cur};
                    obj.selected = cur.selected ? cur.selected : false;
                    acc.push(obj);
                    return acc;
                }, []);
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.selectedList = arr.reduce((acc, cur) => {
                            if (cur.selected) {
                                acc.push(cur);
                            }
                            return acc;
                        }, []);
                    }, 10);
                });
                this.panelTextList = arr;
                if (this.type === 'date' || this.type === 'datetime') {
                    this.panelTextList.unshift({});
                }
                return arr;
            }, // 面板上的文字，如 周一、周二等
            getHours() {
                this.timeSpinnerHours = this.hours;
                return this.hours;
            }, // 获取props的hours
            getMinutes() {
                this.timeSpinnerMinutes = this.minutes;
                return this.minutes;
            }, // 获取props的minutes
            getSeconds() {
                this.timeSpinnerSeconds = this.seconds;
                return this.seconds;
            }, // 获取props的hours
            showSeconds() {
                return !(this.format || '').match(/mm$/);
            }
        },
        methods: {
            handleChange() {
                if (this.type === 'week' || this.type === 'date') {
                    this.$emit('on-change', {date: this.selectedList}, this);
                }
                if (this.type === 'weektime' || this.type === 'datetime') {
                    this.$emit('on-change', {date: this.selectedList, time: this.getTimeString}, this);
                }
            }, // 输入框改变时触发
            handleIconClick(e) {
                if (this.showClose) {
                    if (e) {
                        e.stopPropagation();
                    }
                    this.clearWeek();
                } else if (!this.disabled) {
                    this.handleFocus();
                }
            }, // 点击输入框的Icon
            handleFocus() {
                if (this.readonly|| this.disabled) {
                    return;
                }
                this.visible = true;
            },
            handleInputMouseenter() {
                if (this.readonly || this.disabled) {
                    return;
                }
                if (this.inputValue && this.clearable) {
                    this.showClose = true;
                }
            },
            handleInputMouseleave() {
                this.showClose = false;
            },
            handleClose() {
                this.visible = false;
            }, // 关闭气泡
            panelItemClick(index) {
                if (this.type === 'date' || this.type === 'datetime') {
                    if (index !== 0) {
                        this.panelTextList[index].selected = !this.panelTextList[index].selected;
                    }
                } else {
                    this.panelTextList[index].selected = !this.panelTextList[index].selected;
                }
                this.getSelectedList();
            }, // 点击panel里的单个
            getSelectedList() {
                this.selectedList = [];
                this.selectedList = this.panelTextList.reduce((acc, cur) => {
                    if (cur.selected) {
                        acc.push(cur);
                    }
                    return acc;
                }, []);
            },
            selectTimeClick() {
                this.timePickerOpen = true;
                this.$refs.timeSpinner.updateScroll();
            }, // 点击选择时间
            selectWeekClick() {
                this.timePickerOpen = false;
            }, // 点击选择周
            timeSpinnerChange(val) {
                if (val.hours) {
                    this.timeSpinnerHours = val.hours;
                }
                if (val.minutes) {
                    this.timeSpinnerMinutes = val.minutes;
                }
                if (val.seconds) {
                    this.timeSpinnerSeconds = val.seconds;
                }
                this.$refs.timeSpinner.updateScroll();
            }, // 选择时间改变触发
            clearWeek() {
                this.selectedList = [];
                this.panelTextList.map((item) => item.selected = false);
                this.visible = false;
                this.timeSpinnerHours = this.hours;
                this.timeSpinnerMinutes = this.minutes;
                this.timeSpinnerSeconds = this.seconds;
                this.$emit('on-clear');
            }, // 清空
            confirmWeek() {
                this.visible = false;
                this.$emit('on-ok');
            }, // 确定
        }
    };
</script>

<style lang="less">
</style>
