<template>
    <collapse-transition>
        <ul :class="classes">
            <li>
                <span :class="arrowClasses" v-if="showArrow" @click="handleExpand">

                    <!-- <Icon v-if="showArrow" type="ios-arrow-forward"></Icon> -->

                    <Icon v-if="showArrow && data.expand" type="iconbj_off" ></Icon>
                    <Icon v-if="showArrow && !data.expand" type="iconbj_on" ></Icon>
                    <Icon v-if="showLoading" type="ios-loading"  :class="[`${burgeonConfig.prefixCls}load-loop`]"></Icon>
                </span>
                <label>
                    <Checkbox
                            v-if="showCheckbox"
                            :value="data.checked"
                            :indeterminate="data.indeterminate"
                            :disabled="data.disabled || data.disableCheckbox"
                            @click.native.prevent="handleCheck"></Checkbox>
                    <p v-if="data.render" style="display: inline-block;" :class="titleClasses" @click="handleSelect"><Render  :render="data.render" :data="data" :node="node" @click.native="handleSelect"></Render></p>
                    <p style="display: inline-block;" :class="titleClasses" @click="handleSelect"  v-else-if="isParentRender"><Render  :render="parentRender" :data="data" :node="node" ></Render></p>
                    <span v-else :class="titleClasses" @click="handleSelect" >
                        <textDisplay
                            :query="query"
                            :title="data.title"
                            :queryStyle="queryStyle"
                        ></textDisplay>

                        <span>{{text}}</span>
                    </span>
                </label>
                <Tree-node
                        v-if="data.expand"
                        v-for="(item, i) in children"
                        :key="i"
                        :datas="item"
                        :query="query"
                        :queryStyle="queryStyle"
                        :selectMessageShow="selectMessageShow"
                        :selectMessage="selectMessage"
                        :multiple="multiple"
                        :show-checkbox="showCheckbox"
                        :children-key="childrenKey">
                </Tree-node>
            </li>
        </ul>
    </collapse-transition>
</template>
<script>
    import Vue from 'vue';
    import Checkbox from '../checkbox/checkbox.vue';
    import Icon from '../icon/icon.vue';
    import Render from './render';
    import textDisplay from './textDisplay';
    import CollapseTransition from '../base/collapse-transition';
    import Emitter from '../../mixins/emitter';
    import { findComponentUpward } from '../../utils/assist';
    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}tree`;

    export default {
        name: 'TreeNode',
        mixins: [Emitter],
        components: {
            Checkbox, Icon, CollapseTransition, Render,textDisplay
        },
        props: {
            datas: {
                type: Object,
                default () {
                    return {};
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            childrenKey: {
                type: String,
                default: 'children'
            },
            showCheckbox: {
                type: Boolean,
                default: false
            },
            query:{
                type:String
            },
            queryStyle:{
                type:Object
            },
            selectMessageShow:{
                type:Boolean,
                default:false
            },
            selectMessage:{
                type:Function
            }
        },
        data () {
            return {
                text:'',
                data:{},
                prefixCls: prefixCls
            };
        },
        watch:{
            datas:{
                handler (val) {
                    this.data = val;
                    this.text = this.selectedMessage();
                },
                deep:true
            }
        },
        created () {
            this.data = this.datas;
            this.text = this.selectedMessage();
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}-children`
                ];
            },
            selectedCls () {
                return [
                    {
                        [`${prefixCls}-node-selected`]: this.data.selected
                    }
                ];
            },
            arrowClasses () {
                return [
                    `${prefixCls}-arrow`,
                    {
                        [`${prefixCls}-arrow-disabled`]: this.data.disabled,
                        [`${prefixCls}-arrow-open`]: this.data.expand
                    }
                ];
            },
            titleClasses () {
                return [
                    `${prefixCls}-title`,
                    {
                        [`${prefixCls}-title-selected`]: this.data.selected
                    }
                ];
            },
            showArrow () {

                return (this.data[this.childrenKey] && this.data[this.childrenKey].length) || ('loading' in this.data && !this.data.loading);
            },
            showLoading () {
                return 'loading' in this.data && this.data.loading;
            },
            isParentRender () {
                const Tree = findComponentUpward(this, 'Tree');
                return Tree && Tree.render;
            },
            parentRender () {
                const Tree = findComponentUpward(this, 'Tree');
                if (Tree && Tree.render) {
                    return Tree.render;
                } else {
                    return null;
                }
            },
            node () {
                const Tree = findComponentUpward(this, 'Tree');
                if (Tree) {
                    // 将所有的 node（即flatState）和当前 node 都传递
                    return [Tree.flatState, Tree.flatState.find(item => item.nodeKey === this.data.nodeKey)];
                } else {
                    return [];
                }
            },
            children () {
                return this.data[this.childrenKey]?this.data[this.childrenKey]:[];
            }

        },
        methods: {
            selectedMessage () {
                if (this.children.length > 0 && this.selectMessageShow){
                    if (this.selectMessage){
                        return this.selectMessage(this.data.selectedNum);
                    } else {
                        return `(已选择${this.data.selectedNum})`;
                    }
                } else {
                    return null;
                }
            },
            handleExpand () {
                const item = this.data;
                if (item.disabled) {
                    return;
                }

                // async loading
                if (item[this.childrenKey].length === 0) {
                    const tree = findComponentUpward(this, 'Tree');
                    if (tree && tree.loadData) {
                        this.$set(this.data, 'loading', true);
                        tree.loadData(item, children => {
                            this.$set(this.data, 'loading', false);
                            if (children.length) {
                                this.$set(this.data, this.childrenKey, children);
                                this.$nextTick(() => this.handleExpand());
                            }
                        });
                        return;
                    }
                }

                if (item[this.childrenKey] && item[this.childrenKey].length) {
                    this.$set(this.data, 'expand', !this.data.expand);
                    this.dispatch('Tree', 'toggle-expand', this.data);
                }
            },
            handleSelect () {
                if (this.data.disabled) {
return;
}
                this.dispatch('Tree', 'on-selected', this.data.nodeKey);
            },
            handleCheck () {

                if (this.data.disabled) {
return;
}
                const changes = {
                    checked: !this.data.checked && !this.data.indeterminate,
                    nodeKey: this.data.nodeKey
                };
                this.dispatch('Tree', 'on-check', changes);
            }
        }
    };
</script>
