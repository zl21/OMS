<template>
    <div :class="itemClasses">
        <div :class="headerClasses" @click="toggle" v-show="isTitleShow">
            <Icon type="ios-arrow-forward" v-if="!hideArrow && titleType ==='left'"></Icon>
            <slot></slot>
            <Icon type="md-arrow-dropdown" v-if="!hideArrow && titleType ==='center'"></Icon>
        </div>
        <collapse-transition>
            <div :class="contentClasses" v-show="isActive">
                <div :class="boxClasses"><slot name="content"></slot></div>
            </div>
        </collapse-transition>
    </div>
</template>
<script>
    import Icon from '../icon/icon.vue';
    import CollapseTransition from '../base/collapse-transition';
    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}collapse`;

    export default {
        name: 'Panel',
        components: { Icon, CollapseTransition },
        props: {
            name: {
                type: String
            },
            hideArrow: {
                type: Boolean,
                default: false
            },
            isTitleShow: {
                type: Boolean,
                default: true
            },
            titleType: {
                type: String,
                default: 'left'
            }
        },
        data () {
            return {
                index: 0, // use index for default when name is null
                isActive: false
            };
        },
        computed: {
            itemClasses () {
                return [
                    `${prefixCls}-item`,
                    {
                        [`${prefixCls}-item-active`]: this.isActive
                    }
                ];
            },
            headerClasses () {
                return [
                    `${prefixCls}-header`,
                    {
                        [`${prefixCls}-header-center`]: this.titleType === 'center'
                    }
                ];
                // return `${prefixCls}-header`;
            },
            contentClasses () {
                return `${prefixCls}-content`;
            },
            boxClasses () {
                return `${prefixCls}-content-box`;
            }
        },
        methods: {
            toggle () {
                this.$parent.toggle({
                    name: this.name || this.index,
                    isActive: this.isActive
                });
            }
        }
    };
</script>
