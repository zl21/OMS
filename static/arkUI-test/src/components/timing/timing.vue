<template>
    <div :class="prefixCls">
        <div :class="selectContainer" :title="getSelectTitle">
            <Select v-bind="selectAttribute" v-on="selectEvent" @on-change="selectOnChange">
                <Option title="" v-for="item in dropList" :value="item.value" :key="item.value" :label="item.label">{{ item.label }}</Option>
            </Select>
        </div>
        <component
            v-if="componentShow"
            :class="component"
            :is="componentName"
            v-bind="componentAttribute"
            v-on="componentEvent"
            :ref="componentName"
            @on-change="componentOnChange"
            :placeholder="placeholder">
        </component>
    </div>
</template>

<script>
    import burgeonConfig from '../../assets/config';
    import Select from '../select/select.vue';
    import Option from '../select/option.vue';
    import TimingTime from './timing-time.vue';
    import TimingDate from './timing-date.vue';

    const prefixCls = `${burgeonConfig.prefixCls}`;
    export default {
        data() {
            return {
                componentAttribute: {
                }, // 组件属性
                componentEvent: {}, // 组件方法
                componentName: 'DatePicker', // 组件类型
                placeholder: '', // 占位文本
                componentShow: true, // 判断组件是否显示
            };
        },
        name: 'Timing',
        components: {
            Select,
            Option,
            TimingDate,
            TimingTime
        },
        watch: {
            defaultComponent(){}
        },
        props: {
            isTitleShow: {
                type: Boolean,
                default: true
            },
            selectAttribute: {
                type: Object,
                default: () =>({})
            },
            selectEvent: {
                type: Object,
                default: () =>({})
            },
            dropDownList: {
                type: Array,
                default: () => []
            } // 左侧下拉列表
        },
        computed: {
            prefixCls() {
                return `${prefixCls}timing`;
            },
            selectContainer() {
                return `${prefixCls}timing-selectContainer`;
            },
            component() {
                return `${prefixCls}timing-component`;
            },
            dropList() {
                this.dropDownList.map(item => {
                    item.label = item.label ? item.label : '';
                    item.value = item.value ? item.value : '';
                    item.componentName = item.componentName ? item.componentName : 'DatePicker';
                    item.componentAttribute = item.componentAttribute ? item.componentAttribute : {};
                    item.componentEvent = item.componentEvent ? item.componentEvent : {};
                });
                return this.dropDownList;
            },
            defaultComponent() {
                if (this.isTitleShow) {
                    if (this.selectAttribute.value) {
                        if (this.dropList.length > 0) {
                            const comObj = this.dropList.find((item) => item.value === this.selectAttribute.value);
                            this.componentName = comObj.componentName;
                            this.componentAttribute = comObj.componentAttribute;
                            this.componentEvent = comObj.componentEvent;
                        }
                    }
                }
            },
            getSelectTitle() {
                if (this.selectAttribute.value) {
                    if (this.dropList.length > 0) {
                        const comObj = this.dropList.find((item) => item.value === this.selectAttribute.value);
                        return comObj.label;
                    }
                }
            }
        },
        methods: {
            componentOnChange() {

            }, // 组件change触发
            selectOnChange(val) {
                this.componentShow = false;
                if (this.selectAttribute['label-in-value']) {
                    if (this.dropList.length > 0) {
                        const comObj = this.dropList.find((item) => item.value === val.value);
                        this.componentName = comObj.componentName;
                        this.componentAttribute = comObj.componentAttribute;
                        this.componentEvent = comObj.componentEvent;
                    }
                }
                setTimeout(() =>{
                    this.componentShow = true;
                },0);

            } // 左侧下拉改变触发
        }
    };
</script>

<style lang="less">
</style>
