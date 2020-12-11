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
                <div :class="pickerPanel">
                    <div :class="pickerPanelUpper">
                        <div>
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
                isClear: false, // 是否清空
                timeSpinnerHours: 0, // 时间的小时
                timeSpinnerMinutes: 0, // 时间的分钟
                timeSpinnerSeconds: 0, // 时间的秒
                inputValue: '', // 输入框双向绑定的值
            };
        },
        name: 'TimingTime',
        directives: {clickOutside, TransferDom},
        components: {
            bInput,
            Drop,
            TimeSpinner,
            bButton
        },
        props: {
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
            format: {
                type: String,
                default: 'HH:mm'
            }
        },
        watch: {
            visible(val) {
                if (val) {
                    this.$refs.timeSpinner.updateScroll();
                }
            },
            getHours() {},
            getMinutes() {},
            getSeconds() {},
            inputSetValue() {},
            inputValue() {
                this.handleChange();
            }
        },
        computed: {
            prefixCls() {
                return `${prefixCls}timing-time`;
            },
            transferClass() {
                return `${prefixCls}timing-time-transfer`;
            },
            pickerPanel() {
                return `${prefixCls}timing-time-panel`;
            },
            pickerPanelUpper() {
                return `${prefixCls}timing-time-panel-upper`;
            },
            pickerPanelUpperBody() {
                return `${prefixCls}timing-time-panel-upper-body`;
            },
            pickerPanelLower() {
                return `${prefixCls}timing-time-panel-lower`;
            },
            pickerPanelLowerBtns() {
                return `${prefixCls}timing-time-panel-lower-btn`;
            },
            iconType() {
                let icon = 'ios-time-outline';
                if (this.showClose) {
                    icon = 'ios-close-circle';
                }
                return icon;
            },
            getTimeString() {
                if (this.isClear) {
                    return '';
                }
                let hours = this.timeSpinnerHours > 9? `${this.timeSpinnerHours}` : `0${this.timeSpinnerHours}`;
                let minutes = this.timeSpinnerMinutes > 9? `${this.timeSpinnerMinutes}` : `0${this.timeSpinnerMinutes}`;
                let seconds = this.timeSpinnerSeconds > 9? `${this.timeSpinnerSeconds}` : `0${this.timeSpinnerSeconds}`;
                if (this.showSeconds) {
                    return `${hours}:${minutes}:${seconds}`;
                }
                return `${hours}:${minutes}`;
            }, // 获取string类型的时间
            inputSetValue() {
                this.$nextTick(() =>{
                    this.inputValue = this.getTimeString;
                });
                return this.getTimeString;
            }, // 输入框显示的值
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
        mounted() {},
        methods: {
            handleChange() {
                this.$emit('on-change',this.getTimeString,this);
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
                if (this.readonly||this.disabled) {
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
            timeSpinnerChange(val) {
                this.isClear = false;
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
                this.visible = false;
                this.isClear = true;
                this.timeSpinnerHours = this.hours;
                this.timeSpinnerMinutes = this.minutes;
                this.timeSpinnerSeconds = this.seconds;
                this.$emit('on-clear');
            }, // 清空
            confirmWeek() {
                this.visible = false;
                this.$emit('on-ok');
            } // 确定
        }
    };
</script>

<style lang="less">
</style>
