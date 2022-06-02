<template>
  <div class="tree myTree">
    <!--（ztree）-->
    <div
      v-if="treeDataSource.length>0"
      class="ztree_content_wrap"
    >
      <div class="zTreeDemoBackground left">
        <ul class="ztree">
          <ztree-item
            v-for="(m,i) in treeDataSource"
            :key="i"
            :search="search"
            :model.sync="m"
            root="0"
            :num.sync="i"
            :nodes.sync="treeDataSource.length"
            :callback="func"
            :expandfunc="expand"
            :cxtmenufunc="contextmenu"
            :trees.sync="()=>treeDataSource"
            :label="label"
            :collapse-img="collapseImg"
            :expand-img="expandImg"
            :i-d="ID"
            @getItemData="getItemData"
            @changId="changId"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

/* import Vue from 'vue' */
  import ztreeItem from './ztreeItem2';

  export default {
    name: 'tree2',
    data() {
      return {
        //
        treeDataSource: [],
        ID: '', // 唯一样式ID
        // 搜索框的数据
        // search: "",
        // dataTreeArr: [],
        // arr: [],

      };
    },
    props: {
      collapseImg:{
        type:String,
      },
      expandImg:{
        type:String,
      },
      search: {
        type: String,
        defalut: ''
      }, // 搜索框的值
      // id和pid形式的数据

      // 树数据
      // changeList:{
      //   	type:Object

      // },
      list: {
        type: Array,
        twoWay: true
      },
      // list: {
      // 	type: Function,
      // 	twoWay: true
      // },
      // 点击节点回调
      func: {
        type: Function,
        default: null
      },
      // 点击展开回调
      expand: {
        type: Function,
        default: null
      },
      // 右击事件
      contextmenu: {
        type: Function,
        default(el) {

        }
      },
      // 是否展开
      isOpen: {
        type: Boolean,
        twoWay: true,
        default: false
      },
      label: {
        type: String,
        default: 'MIXNAME'
      }
    },
    watch: {
      list: {
        handler() {
          this.initTreeData();
        }

      }
    },

    // update(){
    // 	this.initTreeData();
    // },
    mounted() {
      // Vue.nextTick(()=>{
      // 	this.initTreeData();
      // })
      this.initTreeData();
    },


    methods: {
      sendList() {
        return this.list;
      },
      getItemData(item) {
        this.$emit('getItemData', item);
      },

      initTreeData() {
        // console.log(this.list,1)
        // var tempList = JSON.parse(JSON.stringify(this.list));
        const tempList = this.list;
        const self = this;
        // let tempList = this.list;

        // 递归操作，增加删除一些属性。比如: 展开/收起
        var recurrenceFunc = (data) => {
          data.forEach((m) => {
            // if(!m.hasOwnProperty("clickNode")){
            // 	self.$set(m,'clickNode',m.hasOwnProperty("clickNode") ? m.clickNode : false)
            //     // m.clickNode = m.hasOwnProperty("clickNode") ? m.clickNode : false;
            // }
            self.$set(m, 'clickNode', m.hasOwnProperty('clickNode') ? m.clickNode : false);
            self.$set(m, 'children', m.children || []);
            // m.children = m.children || [];

            if (!m.hasOwnProperty('isFolder')) {
              self.$set(m, 'isFolder', m.hasOwnProperty('open') ? m.open : this.isOpen);
              // m.isFolder =  m.hasOwnProperty("open") ? m.open : this.isOpen;
            }
            if (!m.hasOwnProperty('isExpand')) {
              self.$set(m, 'isExpand', m.hasOwnProperty('open') ? m.open : this.isOpen);
              // m.isExpand =  m.hasOwnProperty("open") ? m.open : this.isOpen;
            }
            self.$set(m, 'loadNode', 0);
            // m.loadNode = 0;

            recurrenceFunc(m.children);
          });
        };
        recurrenceFunc(tempList);
        this.treeDataSource = tempList;
        if (this.treeDataSource.length === 0) return;
        this.ID = this.treeDataSource[0].ID;
        // console.log('treeDataSource11',this.treeDataSource)
      },
      changId(id) {
        this.ID = id;
      }, // 改变ID
    },
    components: {
      ztreeItem
    }
  };
</script>


<style lang="less">
.myTree {
	height: 100%;  /*margin-top: 10px;*/
	/*树结构
	字体图标样式*/
	img.icon {

		display: inline-block;
		margin-top: 6px;
		width: 12px;
		height: 12px;
		z-index: 100;
	}
  .ztree_content_wrap {
    width: 230px;
  }
	.ztree * {
		padding: 0;
		margin: 0;
		font-size: 12px;
	}
 /*.tree{overflow-x: hidden; height: 100%;}*/
	.tree {
		height: 100%;
	}
 /*.ztree { overflow-x: hidden;height: 100%;}*/
	.ztree {
		height: 100%;
	}

	.ztree li {
		position: relative;
		padding: 0;
		margin: 0px;
		list-style: none;
		line-height: 24px;
		text-align: left;
		white-space: nowrap;
		outline: 0;
	}

	.ztree li ul {
		margin: 0;
		padding: 0 0 0 18px;
		position: relative;
	}
	.ztree li ul .lineh {
		background: url('../../../static/img/line_iconh.png') repeat-y; // display: inline-block;
		width: 1px;
		height: calc(100% - 5px);
		position: absolute;
		left: 6px;
		top: -9px;
	}

	.ztree li ul .hiddenLine {
		position: absolute;
		top: -13px;
		left: -14px;
		width: 5px;
		height: 100%;
		background: #fff;
		z-index: 99;
	}

	.ztree li a {
		width: 100%;
		cursor: pointer;
		height: 24px;
		margin-bottom: 2px;
		color: #575757;
		text-decoration: none;
		vertical-align: top;
		display: inline-block;
		position: relative;
	}

	.ztree li a:hover {
		background-color: #ECF6FF;
	}

	.ztree li a.curSelectedNode {
		padding-top: 0px;
		/*background-color: #C4E2FF;*/
		color: #575757;
		height: 24px;
		margin-bottom: 2px;
	}
	.linew {
		background: url('../../../static/img/line_icon_w.png') repeat-x;
		width: 12px;
		height: 1px;
		display: inline-block;
		position: absolute;
		left: -12px;
		top: 12px;
	}
 /*.ztree li span {line-height:16px; margin-right:2px; top: 0px; display: inline-block;}*/
	.ztree li a>.node_name {
		line-height: 22px;
		position: absolute;
    width: 180px;
    width: calc( 100% - 12px);
	}
  .ztree li a>.node_img_name {width: 100%;}
	.lineLiClass .node_name .fontClass {
		// display: inline-block;
		color: #fff;
		background-color: #fd6442;
	}

	ul.tmpTargetzTree {
		background-color: #FFE6B0;
		opacity: 0.8;
		filter: alpha(opacity=80)
	}
}

</style>
