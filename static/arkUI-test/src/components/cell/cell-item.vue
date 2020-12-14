<template>
    <div :class="cellItem">
        <div :class="cellIcon">
            <slot name="icon"></slot>
        </div>
        <div :class="cellMain">
            <div :class="cellTitle"><slot>{{ title }}</slot></div>
            <div :class="cellLabel"><slot name="label">{{ label }}</slot></div>
        </div>
        <div :class="cellFooter">
            <span :class="cellExtra"><slot name="extra">{{ extra }}</slot></span>
        </div>
    </div>
</template>
<script>
    import burgeonConfig from '../../assets/config';

    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            extra: {
                type: String,
                default: ''
            }
        },
        computed:{
            cellItem () {
                return [
                    `${burgeonConfig.prefixCls}cell-item`
                ];
            },
            cellIcon () {
                return [
                    `${burgeonConfig.prefixCls}cell-icon`
                ];
            },
            cellMain () {
                return [
                    `${burgeonConfig.prefixCls}cell-main`
                ];
            },
            cellTitle () {
                return [
                    `${burgeonConfig.prefixCls}cell-title`
                ];
            },
            cellLabel () {
                return [
                    `${burgeonConfig.prefixCls}cell-label`
                ];
            },
            cellFooter () {
                return [
                    `${burgeonConfig.prefixCls}cell-footer`
                ];
            },
            cellExtra () {
                return [
                    `${burgeonConfig.prefixCls}cell-extra`
                ];
            }

        }
    };
</script>
