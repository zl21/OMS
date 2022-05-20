<template>
  <div>
    <li
      :class="liClassVal"
      class="lineLiClass"
    >
      <!--<a :class="aClassVal" v-on:getItemData="getItemData(model)" @click.stop='Func(model);open(model);getItemData(model)'>-->
      <a
        :class="aClassVal"
        :style="{'background-color': ID === (isid?model.id : model.ID)? '#C4E2FF' : '#fff'}"
      >
        <!--<img class="icon" @click.stop='open(model);' v-show="!model.isExpand && model.children.length>0" src="../../../static/img/tree2.png" />

        <img class="icon" @click.stop='open(model);' v-show="model.isExpand && model.children.length>0" src="../../../static/img/tree1.png" />-->
        <img
          v-show="(!model.isExpand && model.children.length>0) || (model.isExpand && model.children.length>0)"
          class="icon"
          :src="!model.isExpand && model.children.length>0?  getCollapseImg : getExpandImg "
          @click.stop="open(model);"
        >
        <!-- <span class="select" v-if="showSelect">添加子组织</span> -->
        <i class="linew" />
        <!--<span :class="{loadSyncNode:model.loadNode==1}" v-if='model.loadNode==1'></span>
                    <span :class='model.iconClass' v-show='model.iconClass' v-else></span>-->
        <span
          class="node_name"
          :class="{node_img_name: !((!model.isExpand && model.children.length>0) || (model.isExpand && model.children.length>0))}"
          @click.stop="getItemData(model);Func(model);changId(isid?model.id : model.ID)"
          v-html="matchWords(model[label])"
        >
          {{ model[label] }}
        </span>
        <!-- <span  class="node_name">{{model.MIXNAME}}</span> -->
      </a>
      <ul
        v-show="model.isFolder"
        :class="ulClassVal"
      >
        <!--<i class="lineh" :style="{'height': model.isFolder ? heightLength + 'px' : 0}"></i>-->
        <i class="lineh" />
        <!--最后一个子节点的隐藏线-->
        <i
          v-if="model.lastChild"
          class="hiddenLine"
        />
        <ztree-item
          v-for="(item,i) in getChildren(model)"
          :key="i"
          :search="search"
          :callback="callback"
          :expandfunc="expandfunc"
          :cxtmenufunc="cxtmenufunc"
          :model.sync="item"
          :num.sync="i"
          root="1"
          :nodes.sync="model.children.length"
          :trees.sync="trees"
          :label="label"
          :ID="ID"
          :collapse-img="collapseImg"
          :expand-img="expandImg"
          :isid="isid"
          @getItemData="getItemData"
          @changId="changId"
        />
      </ul>
    </li>
  </div>
</template>
<script>
import treeCollapseImage from '../../../static/img/tree2.png'
import treeExpandImage from '../../../static/img/tree1.png'
  export default {
    name: 'ZtreeItem',
    data() {
      return {
        aa: {},
        heightLength: 0, // 竖直线的高度
        newArr: [],
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
      treeDataSource: {}, // 整颗树改造后的数据
      ID: '', // 点击样式标记
      isid: {
        type: Boolean,
        defalut: false
      }, // 用来判断是ID还是id
      label: {
        type: String,
        defalut: 'MIXNAME'
      },
      model: {
        type: Object,
        twoWay: true
      },
      num: {
        type: Number,
        twoWay: true
      },
      // 是否显示添加
      showSelect: {
        type: Boolean,
        toway: true,
        default: true
      },
      nodes: {
        type: Number,
        twoWay: true,
        default: 0
      },
      trees: {
        type: Array,
        twoWay: true,
        default: []
      },
      root: {
        type: String,
        twoWay: true
      },
      callback: {
        type: Function
      },
      expandfunc: {
        type: Function
      },
      cxtmenufunc: {
        type: Function
      }
    },
    methods: {
      getChildren(model) {
        if (model.isLoad) {
          return model.children;
        }
        if (model.isExpand && model.isFolder) {
          model.isLoad = true;
          return model.children;
        }
        return [];
      },
      matchWords(value) {
        // console.log(this.search)
        // return value.replace(new RegExp(this.search,"gi"), '<span class="fontclass">' + this.search + '</span>')
        if (this.search == '') {
          return value;
        } if (value != null) {
          const searchQuery = this.search.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?\+\.\(\)\[\]\\]/g, q => `\\${q}`);
          return value.replace(new RegExp(searchQuery, 'gi'), word => `<span class="fontClass">${word}</span>`);
        }
      },
      Func(m) {
        // 查找点击的子节点
        var recurFunc = (data, list) => {
          data.forEach((i) => {
            if ((undefined == i.ID && i.id == m.id) || (undefined == i.id && i.ID == m.ID)) {
              i.clickNode = true;
              if (typeof this.callback === 'function') {
                this.callback.call(null, m, list, this.trees);
              }
            } else {
              i.clickNode = false;
            }
            if (i.children) {
              recurFunc(i.children, i);
            }
          });
        };
        recurFunc(this.trees, this.trees);
      },
      open(m) {
        //
        // this.newArr = JSON.parse(JSON.stringify(this.treeDataSource))
        // this.lienLength(m,event,n)

        // console.log(this.search)
        if (m.children.length) {
          m.isExpand = !m.isExpand;
        }
        if (typeof this.expandfunc === 'function' && m.isExpand) {
          if (m.loadNode != 2) {
            //
            this.expandfunc.call(null, m);
          } else {
            m.isFolder = !m.isFolder;
          }
        } else {
          m.isFolder = !m.isFolder;
        }
      },
      getItemData(item) {
        this.$emit('getItemData', item);
      },
      changId(id) {
        this.$emit('changId', id);
      }, // 样式标记
      // 设置线的高度
      lienLength() {
      }
    },
    computed: {
        getCollapseImg(){
        if(this.collapseImg){
          return this.collapseImg
        }else{
         return treeCollapseImage
        }
      },//关闭
      getExpandImg(){
        if(this.expandImg){
          return this.expandImg
        }else{
         return treeExpandImage 
        }
      },//打开
      // 计算打开节点的长度
      // 给（根 和 子树）赋值不同的样式
      rootClass() {
        let strRootClass = '';
        // 根判断
        if (this.root == '0') {
          strRootClass = (this.num == 0 && this.model.children.length == 0) ? 'roots_docu' : (this.nodes == 1) || (this.num == 0 && this.nodes != this.num + 1)
            ? 'root_' : (this.nodes == this.num + 1) ? 'bottom_' : 'center_';
          // 子树判断
        } else if (this.root == '1') {
          strRootClass = this.nodes > 1 && this.model.children.length > 0 && this.nodes != this.num + 1
            ? 'center_'
            : (this.num == 0 && this.nodes > 1) || (this.nodes != this.num + 1) ? 'center_docu' : this.nodes == 1 && this.num != 0 || (this.nodes == this.num + 1 && this.model.children.length > 0) ? 'bottom_' : 'bottom_docu';
        }
        return strRootClass;
      },
      // 是否有儿子节点
      isChildren() {
        return this.num + 1 != this.nodes;
      },
      // 展开/收起
      prefixClass() {
        let returnChar = '';
        if (this.rootClass.indexOf('docu') == -1) {
          if (this.model.isFolder) {
            returnChar = 'open';
          } else {
            returnChar = 'close';
          }
        }
        if (this.model.children.length == 0 && this.rootClass.indexOf('docu') == -1) {
          returnChar = 'docu';
        }
        return returnChar;
      },
      liClassVal() {
        return `level${this.num}`;
      },
      spanClassVal() {
        //  return "button level"+this.num+" switch "+this.rootClass+this.prefixClass;
        if (this.isOpen) {
          // return "button el-icon-remove-outline level"+this.num+" switch "+this.rootClass+this.prefixClass;
          return '&#xe615;';
        } 
        // return "button el-icon-circle-plus-outline level"+this.num+" switch "+this.rootClass+this.prefixClass;
        return '&#xe7d0;';
      },
      aClassVal() {
        const value = this.model.clickNode ? `level${this.num} curSelectedNode` : `level${this.num}`;
        // if(this.root === "1") {
        // 	value += "linew";
        // }
        // if(!this.model.children.length){
        // 	value +=" padding"
        // }
        return value;
      },
      ulClassVal() {
        return this.model.children.length > 0 ? `level${this.num} line` : `level${this.num}`;
      }
    },
  };
</script>
