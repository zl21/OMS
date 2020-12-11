<template>
    <ul :class="classes"><slot></slot></ul>
</template>
<script>
    import burgeonConfig from '../../assets/config';

    export default {
        name: 'DropdownMenu',
        computed:{
            classes () {
                return [
                    `${burgeonConfig.prefixCls}dropdown-menu`
                ];
            }
        }
    };
</script>
