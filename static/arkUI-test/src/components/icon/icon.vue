<template>
    <i :class="classes" :style="styles" @click="handleClick"></i>
</template>
<script>
    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}icon`;

    export default {
        name: 'Icon',
        props: {
            type: {
                type: String,
                default: ''
            },
            size: [Number, String],
            color: String,
            custom: {
                type: String,
                default: ''
            }
        },
        computed: {
            classes () {
                const iconfont = 'iconfont';
                return [
                    `${prefixCls}`,
                    {
                        [`${iconfont} ${this.type} `]: this.type.indexOf('icon') >= 0,
                        [`iconfont icon${this.type} ${iconfont} `]: this.type !== '',
                        [`${this.custom} `]: this.custom !== ''
                    }
                ];
            },
            styles () {
                let style = {};

                if (this.size) {
                    style['font-size'] = `${this.size}px`;
                }

                if (this.color) {
                    style.color = this.color;
                }

                return style;
            }
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
            }
        }
    };
</script>
