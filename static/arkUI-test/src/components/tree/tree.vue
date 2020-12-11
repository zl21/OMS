<template>
    <div :class="prefixCls">
        <Tree-node
            v-for="(item, i) in stateTree"
            :key="i"
            :datas="item"
            visible
            :query="query"
            :queryStyle="queryStyle"
            :selectMessageShow="selectMessageShow"
            :selectMessage="selectMessage"
            :multiple="multiple"
            :show-checkbox="showCheckbox"
            :children-key="childrenKey">
        </Tree-node>

        <div :class="[prefixCls + '-empty']" v-if="!stateTree.length">{{ localeEmptyText }}</div>
    </div>
</template>
<script>
    import TreeNode from './node.vue';
    import Emitter from '../../mixins/emitter';
    import Locale from '../../mixins/locale';
    import burgeonConfig from '../../assets/config';

    const prefixCls = `${burgeonConfig.prefixCls}tree`;

    export default {
        name: 'Tree',
        mixins: [Emitter, Locale],
        components: { TreeNode },
        props: {
            data: {
                type: Array,
                default () {
                    return [];
                }
            },
            multiple: {
                type: Boolean,
                default: false
            },
            showCheckbox: {
                type: Boolean,
                default: false
            },
            emptyText: {
                type: String
            },
            childrenKey: {
                type: String,
                default: 'children'
            },
            loadData: {
                type: Function
            },
            render: {
                type: Function
            },
            nodeInteraction:{
                type: Boolean,
                default: true
            },

            //自定义属性
            query:{ //模糊匹配字符
                type:String
            },
            queryStyle:{ //设置匹配字符样式
                type:Object
            },
            selectMessageShow:{ //控制是否显示当前节点的选中个数
                type:Boolean,
                default:false
            },
            selectMessage:{ //回调函数，可以自定义显示显示内容，返回参数为当前节点选中的个数
                type:Function
            }
        },
        data () {
            return {
                prefixCls: prefixCls,
                stateTree: this.data,
                flatState: [],
                flag:true
            };
        },
        watch: {
            data: {
                deep: true,
                handler () {
                    this.flag = false;
                    this.stateTree = this.data;
                    this.flatState = this.compileFlatState();
                    this.rebuildTree();
                    setTimeout(() => {
                        this.flag = true;
                    });
                }
            }
        },
        computed: {
            localeEmptyText () {
                if (typeof this.emptyText === 'undefined') {
                    return this.t('i.tree.emptyText');
                } else {
                    return this.emptyText;
                }
            }
        },
        methods: {
            compileFlatState () { // so we have always a relation parent/children of each node
                let keyCounter = 0;
                let childrenKey = this.childrenKey;
                const flatTree = [];
                function flattenChildren(node, parent) {
                    node.nodeKey = keyCounter++;
                    node.selectedNum = 0;
                    flatTree[node.nodeKey] = { node: node, nodeKey: node.nodeKey };
                    if (typeof parent !== 'undefined') {
                        flatTree[node.nodeKey].parent = parent.nodeKey;
                        flatTree[parent.nodeKey][childrenKey].push(node.nodeKey);
                    }

                    if (node[childrenKey]) {
                        flatTree[node.nodeKey][childrenKey] = [];
                        node[childrenKey].forEach(child => flattenChildren(child, node));
                    }
                }
                this.stateTree.forEach(rootNode => {
                    flattenChildren(rootNode);
                });
                return flatTree;
            },
            updateTreeUp(nodeKey){
                const parentKey = this.flatState[nodeKey].parent;
                if (typeof parentKey === 'undefined') {
                    return;
                }

                const node = this.flatState[nodeKey].node;
                const parent = this.flatState[parentKey].node;
                if (node.checked === parent.checked && node.indeterminate === parent.indeterminate) {
                    return;
                } // no need to update upwards

                if (this.nodeInteraction){ //父子节点向上联动
                    if (node.checked === true) {
                        this.$set(parent, 'checked', parent[this.childrenKey].every(node => node.checked));
                        this.$set(parent, 'indeterminate', !parent.checked);
                    } else {
                        this.$set(parent, 'checked', false);
                        this.$set(parent, 'indeterminate', parent[this.childrenKey].some(node => node.checked || node.indeterminate));
                    }
                }

                this.updateTreeUp(parentKey);
            },
            rebuildTree () { // only called when `data` prop changes
                const checkedNodes = this.getCheckedNodes();
                const checkedNodeLists = checkedNodes.concat([]).reverse();
                checkedNodeLists.every(node => {
                    this.updateTreeNum(node);
                    return true;
                });
                checkedNodes.forEach(node => {
                    this.updateTreeDown(node, {checked: true});
                    // propagate upwards
                    const parentKey = this.flatState[node.nodeKey].parent;
                    if (!parentKey && parentKey !== 0) {
                        return;
                    }
                    const parent = this.flatState[parentKey].node;
                    const childHasCheckSetter = typeof node.checked !== 'undefined' && node.checked;
                    if (childHasCheckSetter && parent.checked !== node.checked) {
                        this.updateTreeUp(node.nodeKey); // update tree upwards
                    }
                });

            },

            getSelectedNodes () {
                /* public API */
                return this.flatState.filter(obj => obj.node.selected).map(obj => obj.node);
            },
            getCheckedNodes () {
                /* public API */
                return this.flatState.filter(obj => obj.node.checked).map(obj => obj.node);
            },
            updateTreeDown(node, changes = {}) {

                if (this.nodeInteraction){
                    for (let key in changes) {
                        this.$set(node, key, changes[key]);
                    }
                }
                if (node[this.childrenKey]) {
                    node[this.childrenKey].forEach(child => {
                        this.updateTreeDown(child, changes);
                    });
                }
            },
            updateTreeNum (node) { //计算选中个数
                const parentKey = this.flatState[node.nodeKey].parent;
                if (!parentKey && parentKey !== 0) {
                    return;
                }
                const parent = this.flatState[parentKey].node;
                this.$set(parent,'selectedNum',++parent.selectedNum);

                //判断父节点是否还存在父节点
                this.updateTreeNum(parent);
            },
            handleSelect (nodeKey) {
                const node = this.flatState[nodeKey].node;
                if (!this.multiple){ // reset previously selected node
                    const currentSelectedKey = this.flatState.findIndex(obj => obj.node.selected);
                    if (currentSelectedKey >= 0 && currentSelectedKey !== nodeKey) {
                        this.$set(this.flatState[currentSelectedKey].node, 'selected', false);
                    }
                }

                this.$set(node, 'selected', !node.selected);
                this.$emit('on-select-change', this.getSelectedNodes(),node);
            },
            handleCheck({ checked, nodeKey }) {
                const node = this.flatState[nodeKey].node;
                this.$set(node, 'checked', checked);
                this.$set(node, 'indeterminate', false);
                this.updateTreeUp(nodeKey); // propagate up
                this.updateTreeDown(node, {checked, indeterminate: false}); // reset `indeterminate` when going down
                this.$emit('on-check-change', this.getCheckedNodes(),node);
            }
        },
        created(){
            this.flatState = this.compileFlatState();
            this.rebuildTree();

        },
        mounted () {
            this.$on('on-check', this.handleCheck);
            this.$on('on-selected', this.handleSelect);
            this.$on('toggle-expand', node => this.$emit('on-toggle-expand', node));
        }
    };
</script>
