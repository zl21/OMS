<template>
    <tr
        :class="classes"
        @click.stop="select"
        @touchend.stop="select"
        @mousedown.prevent
        @touchstart.prevent
    ><Checkbox v-model="checkboxValues" v-if="multiple"></Checkbox>
            <td v-for="(item,index) in itemList"  :span="colLengt(tem,index)" :title="item.key" >
                        <span class="text-oveflow" >
                            {{item.key}}
                        </span>
            </td>
    </tr>
</template>
<script>
    import Emitter from '../../mixins/emitter';
    import { findComponentUpward } from '../../utils/assist';
    import Checkbox from '../checkbox/checkbox.vue';
    import Col from '../grid/col.vue';
    import Row from '../grid/row.vue';
    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}select-item`;

    export default {
        name: 'iOption-col',
        componentName: 'select-item',
        mixins: [Emitter],
        components: { Checkbox,Row,Col },
        props: {
            value: {
                type: [Number, String],
                required: true
            },
            tem: {
                type: Object
            },
            columns:{
                type: Array,
                default () {
                    return [];
                }
            },
            columnsKey:{
                type: Array,
                default () {
                    return ['value'];
                }
            },
            hidecolumns:{
                type: Array,
                default () {
                    return [];
                }
            },
            label: {
                type: [Number, String]
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
            },
            disableInput:{
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
            itemList(){
                return Object.keys(this.tem).reduce((item,option) =>{
                        let check=this.hidecolumns.some(x=>x===option);
                        if (check===false){
                            item.push({
                                key:this.tem[option]
                            });
                        }
                        return item;
                },[]);
            },
            showLabel () {
                //return this.label ? this.label : this.value;
                return  this.tem.ID ? this.tem.ID : this.tem.id ;
            },
            optionLabel(){
                //return this.label || (this.$el && this.$el.textContent);
                return this.label || (this.$el && this.$el.textContent);
            }
        },
        methods: {
            select () {
                if (this.disabled) {
                    return false;
                }
                //console.log(this.showLabel,this.optionLabel,this.tem);
                this.dispatch('iSelect', 'on-select-selected', {
                    value: this.optionLabel,
                    label: this.optionLabel
                });
                this.$emit('on-select-selected', {
                    value: this.showLabel,
                    label: this.optionLabel,
                    tem:this.tem
                });
            },
            showCol(index){ // 显示
               // console.log(index,this.value);
               /* let Turn =this.value.map((tem) =>{
                    if (tem===index){
                        return true;
                    }
                });
                return Turn.join('');*/

            },
            colLengt(tem,index){ // 计算平均长度
                let liTem=Object.keys(this.itemList);
                let liLeng=liTem.some(x => x ==='id') ? liTem.length-1 :liTem.length;
                return Math.floor(24/liLeng);
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
