<template>
  <div class="groupTree">
    <myTree
      :list="treeList"
      :ids="treeId"
      label="NAME"
      :search="searchQuery"
      :is-open="isopen"
      :collapse-img="collapseImg"
      :expand-img="expandImg"
      @getItemData="selectTreeItem"
    />
  </div>
</template>
<script>
  import { post, fetch } from '../../__utils__/request';
  import myTree from './tree';

  export default {
    props: {
      collapseImg:{
        type:String,
      },
      expandImg:{
        type:String,
      },
      refresh:{},
      searchQuery: {},
      searchFlag:{},
      isopen: {},
      treeObj: {}, // 选中的id对象
    },
    components: {
      myTree,
    },
    created() {
      this.postGroupData();
    },
    data() {
      return {
        //        loading: false,
        treeId: 0,
        treeList: [],
      };
    },
    computed: {},
    watch: {
      searchFlag(val) {
        if (val) this.searchTree();
      },
      refresh(val) {
        if (val) this.reloadTree();
      }
    },
    mounted() {

    },
    methods: {
      postGroupData() {
        const _self = this;
        post('/p/cs/groupTreeload').then((res) => {
          if (res.data.code === 0) {
            const result = res.data.data;
            result[0].clickNode = true;
            _self.insertLineProp(result, true);
            _self.treeList = result;
            if (this.treeObj) {
              _self.selectTreeItem(_self.treeObj);
            } else {
              // 触发默认选中第一条颗树的根节点
              _self.selectTreeItem(result[0]);
            }
            if (_self.searchQuery) _self.searchTree();
          }
        });
      },
      selectTreeItem(item) {
        this.treeId = item.ID;
        this.$emit('selectTreeItem', item);
      },
      // 初始化树结构,提供给树组件
      insertLineProp(item, flag) {
        const l = item.length;
        let isTrue = false;
        item.forEach((i, n) => {
          if (flag) {
            //            i.isFolder = true;
            //            i.isExpand = true;
          }
          if (l === (n + 1)) {
            i.lastChild = true;
          } else {
            i.lastChild = false;
          }
          /* /!*如果ID对应则该数组展开*!/
          if(this.treeObj && i.ID === this.treeObj.ID) {
            isTrue = true; //表示该项的父级也要展开
          } */
          let parent;
          if (i.children.length > 0) {
            parent = this.insertLineProp(i.children);
          } else {
            i.children = [];
          }
          /* 如果子级下面展开的则父级也展开 */
          if (this.treeObj && (i.ID === this.treeObj.ID || parent)) {
            isTrue = true;
            i.isFolder = true;
            i.isExpand = true;
          }
        });
        return isTrue;
      },
      searchTree() {
        this.charge(this.treeList);
        this.$emit('searchFinish', false);
      },
      charge(nodes) {
        const _self = this;
        let result = false;
        for (const node of nodes) {
          //          console.group(node.NAME + '');
          let childrenResult = false;
          if (node.children.length > 0) {
            childrenResult = _self.charge(node.children);
            //            console.log('children result: ' + childrenResult);
            if (childrenResult) {
              this.$set(node, 'isFolder', true);
              this.$set(node, 'isExpand', true);
            } else {
              this.$set(node, 'isExpand', false);
            }
            //            node.isExpand = _self.charge(node.children);
          }

          if (childrenResult || (_self.searchQuery && node.NAME.toUpperCase().indexOf(_self.searchQuery.toUpperCase()) >= 0)) {
            result = true;
          }
          //          console.log(result);
          //          console.groupEnd();
        }
        return result;
      },
      reloadTree() {
        this.postGroupData();
      }
    }
  };
</script>

<style lang="less">
  .groupTree {
    height: 100%;
  }
</style>
