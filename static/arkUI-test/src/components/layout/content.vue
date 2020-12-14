<template>
    <div :class="wrapClasses"><slot></slot></div>
</template>
<script>
    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}layout`;
    export default {
        name: 'Content',
        computed: {
            wrapClasses () {
                return `${prefixCls}-content`;
            }
        }
    };
</script>
