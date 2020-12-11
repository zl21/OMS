<template>
    <li :class="classes">
        {{ data[labelName] }}
        <Icon v-if="showArrow" type='ios-arrow-forward'></Icon>
        <Icon v-if="showLoading" type="ios-loading" :class="showLoadingClasses"></Icon>

    </li>
</template>
<script>
    import burgeonConfig from '../../assets/config';

    export default {
        name: 'Casitem',
        props: {
            data: Object,
            labelName: {
                type: String,
                default: 'label'
            },
            prefixCls: String,
            tmpItem: Object
        },
        computed: {
            classes () {
                return [
                    `${this.prefixCls}-menu-item`,
                    {
                        [`${this.prefixCls}-menu-item-active`]: this.tmpItem.value === this.data.value,
                        [`${this.prefixCls}-menu-item-disabled`]: this.data.disabled
                    }
                ];
            },
            showLoadingClasses () {
                return [
                    `${burgeonConfig.prefixCls}load-loop`
                ];
            },
            showArrow () {
                return (this.data.children && this.data.children.length) || ('loading' in this.data && !this.data.loading);
            },
            showLoading () {
                return 'loading' in this.data && this.data.loading;
            }
        }
    };
</script>
