<template>
    <div :class="cellGroupClasses">
        <slot></slot>
    </div>
</template>
<script>
    import burgeonConfig from '../../assets/config';

    export default {
        name: 'CellGroup',
        provide () {
            return {
                cellGroup: this
            };
        },
        computed:{
            cellGroupClasses () {
                return [
                    `${burgeonConfig.prefixCls}cell-group`
                ];
            }
        },
        methods: {
            handleClick (name) {
                this.$emit('on-click', name);
            }
        }
    };
</script>
