<template>
    <li
        :class="classes"
        @click.stop="select"
        @touchend.stop="select"
        @mousedown.prevent
        @touchstart.prevent
    ><Checkbox v-model="checkboxValues" v-if="multiple"></Checkbox><slot>{{ showLabel }}</slot></li>
</template>
<script>
    import Emitter from '../../mixins/emitter';
    import { findComponentUpward } from '../../utils/assist';
    import Checkbox from '../checkbox/checkbox.vue';
    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}select-item`;

    export default {
        name: 'iOption',
        componentName: 'select-item',
        mixins: [Emitter],
        components: { Checkbox },
        props: {
            value: {
                type: [String, Number],
                required: true
            },
            label: {
                type: [String, Number]
            },
            disabled: {
                type: Boolean,
                default: false
            },
            selected: {
                type: Boolean,
                default: false
            },
            isFocused: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                searchLabel: '', // the slot value (textContent)
                autoComplete: false,
                multiple:false,
                multipleType: false,
                checkboxValues:false
            };
        },
        computed: {
            classes () {
                this.checkboxValues = this.selected;
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: this.disabled,
                        [`${prefixCls}-selected`]: this.selected && !this.autoComplete,
                        [`${prefixCls}-focus`]: this.isFocused
                    }
                ];
            },
            showLabel () {

                return this.label ? this.label : this.$slots.default[0].text;
            },
            optionLabel(){

                return this.label || this.$slots.default[0].text;
            }
        },
        methods: {
            select () {
                if (this.disabled) {
                    return false;
                }

                this.dispatch('iSelect', 'on-select-selected', {
                    value: this.value,
                    label: this.optionLabel
                });
                this.$emit('on-select-selected', {
                    value: this.value,
                    label: this.optionLabel
                });
            }
        },
        mounted () {
            const Select = findComponentUpward(this, 'iSelect');

            if (Select) {
                this.autoComplete = Select.autoComplete;
                this.multipleType = Select.multipleType;
                this.multiple = Select.multiple;
            }
        }
    };
</script>
