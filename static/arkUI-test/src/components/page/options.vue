<template>
    <div v-if="showSizer || showElevator || showTotal" :class="optsClasses">
        <div v-if="showElevator" :class="ElevatorClasses">
            <span>{{ t('i.page.goto') }}</span>
            <input
              type="text"
              :value="_current"
              autocomplete="off"
              spellcheck="false"
              @keyup.enter="changePage"
            >
            <span>{{ t('i.page.p') }} <span v-if="showTotal || showSizer">，</span></span>
        </div>
        <span :class="showTotalClassses" v-if="showTotal">
            <slot>{{t('i.page.total')}}{{total}}<template v-if="total <= 1">{{t('i.page.item')}}</template><template v-else>{{ t('i.page.item') }}</template></slot>
        </span>
        <div v-if="showSizer" :class="sizerClasses">
            <i-select v-model="currentPageSize" :size="size" :placement="placement" :transfer="transfer" @on-change="changeSize">
                <i-option v-for="item in pageSizeOpts" :key="item" :value="item" style="text-align:center;">{{ item }} {{ t('i.page.page') }}</i-option>
            </i-select>
        </div>
    </div>
</template>
<script>
    import iSelect from '../select/select.vue';
    import iOption from '../select/option.vue';
    import Locale from '../../mixins/locale';

    import BurgeonConfig from '../../assets/config';

    const prefixCls = `${BurgeonConfig.classFix}page`;

    function isValueNumber (value) {
        return (/^[1-9][0-9]*$/).test(`${value}`);
    }

    export default {
        name: 'PageOption',
        mixins: [Locale],
        components: { iSelect, iOption },
        props: {
            pageSizeOpts: Array,
            showSizer: Boolean,
            showElevator: Boolean,
            current: Number,
            _current: Number,
            pageSize: Number,
            allPages: Number,
            isSmall: Boolean,
            placement: String,
            transfer: Boolean,
            showTotal:Boolean,
            total:Number
        },
        data () {
            return {
                currentPageSize: this.pageSize
            };
        },
        watch: {
            pageSize (val) {
                this.currentPageSize = val;
            }
        },
        computed: {
            size () {
                return this.isSmall ? 'small' : 'default';
            },
            optsClasses () {
                return [
                    `${prefixCls}-options`
                ];
            },
            sizerClasses () {
                return [
                    `${prefixCls}-options-sizer`
                ];
            },
            ElevatorClasses () {
                return [
                    `${prefixCls}-options-elevator`
                ];
            },
            showTotalClassses () {
                return [
                    `${prefixCls}-total`
                ];
            }
        },
        methods: {
            changeSize () {
                this.$emit('on-size', this.currentPageSize);
            },
            changePage (event) {
                let val = event.target.value.trim();
                let page = 0;

                if (isValueNumber(val)) {
                    val = Number(val);
                    // if (val != this.current) {
                    if (true) { // 敲回车一直触发页码改变
                        const {allPages} = this;

                        if (val > allPages) {
                            page = allPages;
                        } else {
                            page = val;
                        }
                    }
                } else {
                    page = 1;
                }

                if (page) {
                    this.$emit('on-page', page);
                    event.target.value = page;
                }
            }
        }
    };
</script>
