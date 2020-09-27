<template>
  <div class="ff-user-permission">
    <!-- <tree></tree> -->
    <div class="ff-user-tree">
      <div class="title_sec">
        <input
          type="text"
          v-model="search"
          @keyup.enter="searchNode"
          placeholder="请输入机构编码或名称"
        />
        <i class="iconfont icon-sousuo" @click="handleIconClick"></i>
      </div>
      <div class="ff-user-tree-box">
        <tree
          v-on:getItemData="getItemData"
          :list="list"
          :search="search"
          class="ff-box-user-true"
        ></tree>
      </div>
    </div>
    <div class="middleware" v-loading="dataLoading">
      <div class="title_sec">
        <input
          type="text"
          placeholder="用户名"
          v-model="middleSearch"
          @keyup.enter="searchMiddleData"
        />
        <i class="iconfont icon-sousuo" @click="handleMiddleIconClick"></i>
      </div>
      <div class="middleware_body">
        <div class="middleware_table_hidden">
          <table class="table_first">
            <thead>
              <tr>
                <td :key="index" v-for="(item, index) of middleList.header">
                  {{ item.coldesc }}
                </td>
              </tr>
            </thead>
            <!--<tbody>
              <tr>
                <td>1</td>
              </tr>
            </tbody>-->
          </table>
        </div>
        <div
          class="middleware_table"
          @scroll="middleScroll($event)"
          ref="middleware_table"
        >
          <table>
            <thead>
              <tr>
                <td :key="index" v-for="(item, index) of middleList.header">
                  {{ item.coldesc }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) of middleList.body"
                @click="activeUser(item)"
                class="ff-user-active"
                :class="{ 'ff-user-click-active': currentItem.ID === item.ID }"
                :key="index"
              >
                <td v-for="(list, i) of middleList.header" :key="i">
                  {{ item[list.colname] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="rightware_table">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane
          v-for="(list, index) of tabsList"
          :label="list.label"
          :name="list.url"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
      <div class="rightware_table_centen" v-loading="rightLoading">
        <div class="rightware_table_head">
          <table>
            <thead>
              <tr>
                <td>序号</td>
                <td
                  v-for="(list, index) of rightListHead[activeName]"
                  :key="index"
                >
                  {{ list.label }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) of rightListBody" :key="index">
                <td>{{ index + 1 }}</td>
                <td v-for="(data, sub) of rightListHead[activeName]" :key="sub">
                  <span
                    v-if="
                      data.name !== 'ISMAIN' &&
                        data.name !== 'ISREAD' &&
                        data.name !== 'ISWRITE'
                    "
                    >{{ list[data.name] }}</span
                  >
                  <input
                    type="checkbox"
                    disabled="disabled"
                    :checked="list[data.name] === 'Y'"
                    v-else
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="rightware_table_center_M">
          <table>
            <tbody>
              <tr v-for="(list, index) of rightListBody" :key="index">
                <td>{{ index + 1 }}</td>
                <td v-for="(data, sub) of rightListHead[activeName]" :key="sub">
                  <span
                    v-if="
                      data.name !== 'ISMAIN' &&
                        data.name !== 'ISREAD' &&
                        data.name !== 'ISWRITE'
                    "
                    >{{ list[data.name] }}</span
                  >
                  <input
                    type="checkbox"
                    disabled="disabled"
                    :checked="list[data.name] === 'Y'"
                    v-else
                  />
                </td>
              </tr>
              <tr>
                <td colspan="5" style="color: red;">
                  总计{{ rightListBody.length }}行
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tree from 'framework/components/tree/tree2.vue'
import axios from 'framework/__utils__/request'
export default {
  data() {
    return {
      rightLoading: false, //右边数据loading
      activeName: '/p/cs/chrstoregroupquery', //激活的id
      treeList: [], //树数据
      middleList: {
        header: [],
        body: [],
      }, //中间数据
      sheetWidth: '',
      tabsList: [
        {
          label: '店仓权限',
          url: '/p/cs/chrstoregroupquery',
        },
        {
          label: '供应商权限',
          url: '/p/cs/chrsuppgroupquery',
        },
        {
          label: '配销中心权限',
          url: '/p/cs/chrgroupsdistrib/query',
        },
        {
          label: '品牌权限',
          url: '/p/cs/cgroupsbrand/query',
        },
        {
          label: '商品权限',
          url: '/p/cs/cgrouppro/query',
        },
        {
          label: '公司权限',
          url: '/p/cs/chrgroupscompany/query',
        },
        {
          label: '角色权限',
          url: '/p/cs/cusergroupquery',
        },
      ], //右边tab列表

      obj: {}, //传给table的对象
      layerOut: false, //蒙层

      search: '', //树的搜索字段
      saveObj: {}, //存储的每次节点的对象
      treeNodes: [], //树的所有节点的数据
      treeShow: true,
      list: [], //传给树组件的数组
      //  changeList: {
      //      list: []
      //  },
      treeData: [
        { id: 1, pid: 0, name: '1' },
        { id: 2, pid: 4, name: '2[父4]' },
        { id: 3, pid: 7, name: '3[父7]' },
        { id: 4, pid: 1, name: '4[父1]' },
        { id: 5, pid: 6, name: '5[父6]' },
        { id: 6, pid: 0, name: '6' },
        { id: 7, pid: 4, name: '7[父4]' },
        { id: 8, pid: 6, name: '8[父6]' },
        { id: 9, pid: 0, name: '9' },
        { id: 10, pid: 6, name: '10[父6]' },
      ], // 请求回来的初始data

      // arrayList:[],//把匹配到item 存放这个数组
      ztreeDataSource: [], //请求回来的初始data

      rightListHead: {
        '/p/cs/chrstoregroupquery': [
          {
            label: '配销中心名称',
            name: 'CP_C_DISTRIB_ENAME',
          },
          {
            label: '店仓',
            name: 'STOREENAME',
          },
          {
            label: '制单主店仓',
            name: 'ISMAIN',
          },
          {
            label: '查看主店仓',
            name: 'ISREAD',
          },
        ], //店仓权限
        '/p/cs/chrsuppgroupquery': [
          {
            label: '供应商编码',
            name: 'SUPECODE',
          },
          {
            label: '供应商名称',
            name: 'SUPENAME',
          },
          {
            label: '供应商全称',
            name: 'AllNAME',
          },
        ], //供应商权限
        '/p/cs/chrgroupsdistrib/query': [
          {
            label: '配销中心编码',
            name: 'CP_C_DISTRIB_ECODE',
          },
          {
            label: '配销中心名称',
            name: 'CP_C_DISTRIB_ENAME',
          },
          {
            label: '查看',
            name: 'ISREAD',
          },
          {
            label: '编辑',
            name: 'ISWRITE',
          },
        ], //配销中心权限
        '/p/cs/cgroupsbrand/query': [
          {
            label: '品牌',
            name: 'BRANDENAME',
          },
          {
            label: '查看',
            name: 'ISREAD',
          },
        ], //品牌权限
        '/p/cs/cgrouppro/query': [
          {
            label: '商品编号',
            name: 'ecode',
          },
          {
            label: '商品名称',
            name: 'ename',
          },
        ], //商品权限
        '/p/cs/chrgroupscompany/query': [
          {
            label: '公司编码',
            name: 'ECODE',
          },
          {
            label: '公司名称',
            name: 'ENAME',
          },
          {
            label: '查看',
            name: 'ISREAD',
          },
          {
            label: '编辑',
            name: 'ISWRITE',
          },
        ],
        '/p/cs/cusergroupquery': [
          {
            label: '角色',
            name: 'name',
          },
          {
            label: '说明',
            name: 'description',
          },
        ], //角色权限
      }, //最右边table头部
      rightListBody: [
        /*{
            distribCenter: '杭州仓',//配销中心
            storehouse: '32004【汉中店】',//店仓
            touching: 'N',//制单主店仓
            examine: 'Y',//查看主店仓
          }*/
      ], //最右边table内容
      currentItem: '', //当前用户信息
      dataLoading: true, //加载效果
      middleSearch: '', //中间用户名搜索字段
    }
  },
  mounted() {
    const _this = this
    this.obj = {
      table: 'CP_C_HRUSERS',
      column_include_uicontroller: true,
      fixedcolumns: {},
      multiple: [],
      startindex: 0,
      range: 100,
      reffixedcolumns: {},
      orderby: [{ column: 'CP_C_HRUSERS.ID', asc: true }],
    } //初始参数
    this.getUserHeadData() //获取用户头部数据
    this.getUserBodyData().then(() => {
      this.getPermission(this.currentItem)
    }) //获取用户头部数据
    this.getCstoreorgload() //获取树节点
  },
  components: {
    tree,
  },
  methods: {
    getPermission(item) {
      if (item === undefined) return (this.rightListBody = [])
      this.rightLoading = true
      axios({
        url: this.activeName,
        method: 'post',
        data: {
          param: JSON.stringify({
            CP_C_HRUSERS_ID: item.ID, //用户item.ID
          }),
        },
      }).then((res) => {
        let data = res.data
        this.rightLoading = false
        if (data.code === 0) {
          this.rightListBody = data.data
        }
      })
    }, //获取最右边的数据
    activeUser(item) {
      this.currentItem = item
      this.getPermission(this.currentItem)
    }, //点击用户
    middleScroll(event) {
      this.obj.startindex = this.middleList.body.length
      if (
        event.target.scrollHeight - event.target.scrollTop ===
          event.target.offsetHeight &&
        event.target.scrollTop !== 0
      ) {
        this.dataLoading = true
        axios({
          url: '/p/cs/QueryList',
          method: 'post',
          data: {
            searchdata: JSON.stringify(this.obj),
          },
        }).then((res) => {
          let data = res.data
          if (data.code === 0) {
            let arr = data.datas.row.map((obj) => {
              let listData = {}
              Object.keys(obj).forEach((label) => {
                listData[label] = obj[label].val
              })
              return listData
            })
            this.middleList.body.push(...arr)
            this.dataLoading = false
          }
        })
      }
    }, //懒加载数据
    getUserHeadData() {
      axios({
        url: '/p/cs/getTableQuery',
        method: 'post',
        data: {
          table: 'CP_C_HRUSERS',
          getcmd: 'y',
        },
      }).then((res) => {
        let data = res.data
        if (data.code === 0) {
          data.datas['dataarry'].forEach((obj, index) => {
            if (index > 1) return
            this.middleList.header.push(obj)
          })
        }
      })
    }, //获取用户头部数据
    getUserBodyData() {
      this.dataLoading = true
      return axios({
        url: '/p/cs/QueryList',
        method: 'post',
        data: {
          searchdata: JSON.stringify(this.obj),
        },
      }).then((res) => {
        let data = res.data
        if (data.code === 0) {
          this.$refs['middleware_table'].scrollTop = 0 //初始scrollTop
          this.middleList.body = data.datas.row.map((obj) => {
            let listData = {}
            Object.keys(obj).map((label) => {
              listData[label] = obj[label].val
            })
            return listData
          })
          this.currentItem = this.middleList.body[0] //默认获取当前第一个用户的信息
          this.dataLoading = false //关闭加载
        }
      })
    }, //获取用户头部数据
    getTableWay(bo) {
      let self = this
      let num = 0
      let sendObj = {} //存储传给table的对象

      this.$ajax.dataAjax('/p/cs/userstreeload', {}, function(res) {
        res = JSON.parse(JSON.stringify(res))
        if (res.code === 0) {
          // 储存原始数据以便后续模糊查询使用
          self.ztreeDataSource = JSON.parse(JSON.stringify(res.data))
          //储存渲染树的数据
          self.treeData = res.data
        }
        if (res.code == -1) {
          self.errorMessage({
            action: 'confirm',
            title: '警告',
            type: 'error',
            list: [],
            isAction: true,
            desc: res.message,
          })
        }
      })
    }, //表格返回时的状态
    async getItemData(val) {
      this.obj = {
        table: 'CP_C_HRUSERS',
        column_include_uicontroller: true,
        fixedcolumns: {
          NAME: this.middleSearch,
        },
        multiple: [],
        startindex: 0,
        range: 100,
        reffixedcolumns: {},
        orderby: [{ column: 'CP_C_HRUSERS.ID', asc: true }],
      }
      this.saveObj = val
      let valID = val.ID.split('.')[1]
      valID = parseInt(valID)
      if (val.CP_C_ORGUP_ID !== null) {
        //当item的TYPE为店仓时
        if (val.TYPE === 'CP_C_STORE_ID') {
          this.obj['reffixedcolumns'].CP_C_STORE_ID = ['=' + valID]
        }
        if (val.TYPE === 'CP_C_HRORG_ID') {
          await axios({
            url: '/p/cs/usertreequery',
            method: 'post',
            data: {
              CP_C_HRORG_ID: valID,
            },
          }).then((res) => {
            let data = res.data
            if (data.code === 0) {
              let HRORG = 'in (' //储存键名为CP_C_HRORG_ID对象的ID
              let STORE = 'in (' //储存键名为CP_C_STORE_ID对象的ID
              data.CP_C_HRORG_ID.forEach((item) => {
                HRORG += item.ID + ',' // in 1,2,3,5,6,87,8,6
              })
              data.CP_C_STORE_ID.forEach((item) => {
                STORE += item.ID + ','
              })
              if (data.CP_C_HRORG_ID.length > 0) {
                this.obj['reffixedcolumns'].CP_C_HRORG_ID =
                  HRORG.substring(0, HRORG.length - 1) + ')'
              }
              if (data.CP_C_STORE_ID.length > 0) {
                this.obj['reffixedcolumns'].CP_C_STORE_ID =
                  STORE.substring(0, STORE.length - 1) + ')'
              }
            }
            if (data.code == -1) {
              self.errorMessage({
                action: 'confirm',
                title: '警告',
                type: 'error',
                list: [],
                isAction: true,
                desc: res.message,
              })
            }
          })
        }
      }
      this.getUserBodyData().then(() => {
        this.getPermission(this.currentItem) //获取右边的信息
      }) //获取中间body数据
    }, //获取树组件传过来的值
    handleMiddleIconClick() {
      /*if(this.middleSearch.trim().length === 0) return*/
      this.obj.fixedcolumns = {
        NAME: this.middleSearch,
      }
      this.getUserBodyData().then(() => {
        this.getPermission(this.currentItem) //获取右边的信息
      }) //获取中间body数据
    }, //middleIcon点击事件
    searchMiddleData() {
      this.handleMiddleIconClick()
    }, //middle搜索

    //以下都是左边树的操作
    getCstoreorgload() {
      let self = this
      this.$ajax.dataAjax('/p/cs/userstreeload', {}, function(res) {
        res = JSON.parse(JSON.stringify(res))
        if (res.code === 0) {
          // 储存原始数据以便后续模糊查询使用
          self.ztreeDataSource = JSON.parse(JSON.stringify(res.data))
          //储存渲染树的数据
          self.treeData = res.data
          self.initTreeNodes()
        }
        if (res.code == -1) {
          self.errorMessage({
            action: 'confirm',
            title: '警告',
            type: 'error',
            list: [],
            isAction: true,
            desc: res.message,
          })
        }
      })
    }, //获取初始接口传过来的值
    searchNode(func, b) {
      let self = this
      let k = 0
      if (!this.search.trim()) return
      if (typeof func !== 'function') {
        let upper = this.search.trim().toUpperCase() //将输入框的数据转成大写
        if (upper === '') {
          return
        }
        func = (item) => item.MIXNAME_UPPER.indexOf(upper) !== -1
      }
      let start = Date.now()
      if (b === undefined) {
        this.treeNodes.forEach((item) => {
          item.clickNode = false
          item.isFolder = false
          item.isExpand = false
        })
      }
      let end = Date.now()
      var begin = new Date().getTime()
      for (var i = 0; i < this.treeNodes.length; i++) {
        var treeNode = this.treeNodes[i]
        if (func(treeNode)) {
          k++
          treeNode.clickNode = true
          var parent = treeNode.parent
          while (parent != null) {
            parent.isFolder = true
            parent.isExpand = true
            parent = parent.parent
          }
        }
        if (k >= 100) {
          i = this.treeNodes.length
        }
      }
      var end1 = new Date().getTime()
    }, //时时改变list的值
    handleIconClick() {
      this.searchNode()
    }, //搜索框匹配
    openFather(_item) {
      let self = this
      this.treeData.forEach((item) => {
        if (_item.CP_C_ORGUP_ID !== item.ID) {
          return self.treeData
        }

        // item.clickNode = true;
        item.isFolder = true
        item.isExpand = true
        self.openFather(item)
      })
      this.treeData.forEach((item) => {
        if (_item.CP_C_STORE_ID !== item.ID) {
          return self.treeData
        }
        // item.clickNode = true;
        item.isFolder = true
        item.isExpand = true
        self.openFather(item)
      })
      //    console.log("why")
    }, //递归把父节点打开
    initTree() {
      // 过滤出顶级结点
      this.list = this.treeData.filter((item) => item.CP_C_ORGUP_ID == null)
      // this.list[0].clickNode = true;
      // 填充children
      this.list.forEach((item) => this.getTreeChildren(item))
    },
    getTreeChildren(pnode) {
      let self = this
      pnode.children = this.treeData.filter(
        (item) => item.CP_C_ORGUP_ID === pnode.ID
      )
      pnode.children.forEach((item) => {
        item.lastChild = false
        pnode.children[pnode.children.length - 1].lastChild = true
        self.getTreeChildren(item)
      })
    }, //获取每个子节点的方法
    initTreeNodes() {
      let result = this.convertTree(this.treeData)
      if (result.roots[0] !== undefined) {
        result.roots[0].clickNode = true
      }
      this.list = result.roots
      this.treeNodes = result.nodes
    }, //加载树的方法
    convertTree(datas) {
      var begin = new Date().getTime()
      var map = {}
      var roots = []
      var nodes = []

      function get(id) {
        var n = map[id]
        if (n === undefined) {
          n = {
            ID: id,
            parent: null,
            MIXNAME_UPPER: '',
            isExpand: false,
            isFolder: false,
            clickNode: false,
            lastChild: false,
          }
          let children = []
          n.getChildren = function() {
            return children
          }
          map[id] = n
          nodes.push(n)
        }
        return n
      }

      function node(val) {
        var n = get(val.ID)
        n.CP_C_ORGUP_ID = val.CP_C_ORGUP_ID
        n.ID = val.ID
        n.MIXNAME = val.MIXNAME
        n.MIXNAME_UPPER = val.MIXNAME == null ? '' : val.MIXNAME.toUpperCase()
        n.TYPE = val.TYPE
        if (val.CP_C_ORGUP_ID == null) {
          roots.push(n)
        } else {
          var parent = get(val.CP_C_ORGUP_ID)
          parent.getChildren().push(n)
          n.parent = parent
        }
        return n
      }

      for (let index = 0; index < datas.length; index++) {
        node(datas[index])
      }
      nodes = nodes.concat(roots)
      for (var index = 0; index < nodes.length; index++) {
        var node = nodes[index]
        if (node.getChildren().length > 0) {
          node.getChildren()[node.getChildren().length - 1].lastChild = true
        }
      }
      var end = new Date().getTime()
      return (window.$test = { roots, map, nodes, vm: this })
    }, //转化树节点数据
  },
  watch: {
    'middleList.header': {
      handler: function(val, oldval) {
        const _self = this
        this.$nextTick(function() {
          _self.sheetWidth = $('.table_first').width() + 17
        })
      },
    },
    activeName() {
      this.getPermission(this.currentItem) //获取当前用户当前tab的数据
    }, //tab切换
  },
}
</script>

<style lang="less" scoped type="text/less">
.ff-user-permission {
  display: flex;
  position: absolute;
  box-sizing: border-box;
  top: 10px;
  bottom: 20px;
  left: 20px;
  right: 20px;
  overflow: hidden;
  flex-direction: row;
  flex: 1;
  .ff-user-tree {
    position: absolute;
    top: 0;
    bottom: 41px;
    width: 241px;
    overflow: auto;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 0 10px 10px;
    box-sizing: border-box;
  }
  .ff-user-tree,
  .middleware {
    .title_sec {
      width: 198px;
      /*height: 24px;*/
      position: relative;
      padding: 10px 10px 6px 0px;
      input {
        width: 100%;
        height: 24px;
        padding: 0 0 0 20px;
        border: 1px solid #dcdcdc;
        box-sizing: border-box;
        border-radius: 2px;
        font-size: 12px;
        transition: border-color 0.2s ease;
        color: #505050;
        &:hover,
        &:focus {
          border-color: #0f8ee9;
        }
      }
      i {
        font-size: 16px;
        position: absolute;
        right: 14px;
        top: 14px;
        color: #bebebe;
        cursor: pointer;
      }
    }
  }
  .middleware {
    padding: 0 10px;
    box-sizing: border-box;
    width: 241px;
    border: 1px solid #dcdcdc;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 251px;
    bottom: 41px;
    border-radius: 4px;
    .middleware_body {
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .middleware_table {
      flex: 1;
      overflow-y: auto;
      table {
        font-size: 12px;
        min-width: 100%;
        margin-top: -25px;
        text-align: center;
      }
      thead {
        background: #f5f6fa;
        border-bottom: 1px solid #dcdcdc;
        tr {
          td {
            padding: 0px 8px;
            white-space: nowrap;
            min-width: 60px;
            color: #505050;
            height: 24px;
            line-height: 24px;
          }
        }
      }
      tbody {
        overflow-y: auto;
        tr {
          border-bottom: 1px solid #dcdcdc;
          td {
            padding: 0px 8px;
            white-space: nowrap;
            min-width: 60px;
            color: #505050;
            height: 24px;
            line-height: 24px;
          }
        }
      }
      .ff-user-active:hover {
        background-color: #f8f7f7;
      }
      .ff-user-click-active {
        background-color: #f8f7f7;
      }
    }
    .middleware_table_hidden {
      box-sizing: border-box;
      height: 24px;
      overflow-y: hidden;
      width: 100%;
      table {
        font-size: 12px;
        min-width: 100%;
        text-align: center;
      }
      thead {
        background: #f5f6fa;
        border-bottom: 1px solid #dcdcdc;
        tr {
          td {
            padding: 0px 8px;
            white-space: nowrap;
            min-width: 60px;
            color: #505050;
            height: 24px;
            line-height: 24px;
          }
        }
      }
      tbody {
        overflow-y: auto;
        tr {
          border-bottom: 1px solid #dcdcdc;
          td {
            padding: 0px 8px;
            white-space: nowrap;
            min-width: 60px;
            color: #505050;
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
  }
  .rightware_table {
    position: absolute;
    min-width: 560px;
    top: 0;
    right: 0;
    left: 504px;
    bottom: 41px;
  }
  .rightware_table_centen {
    width: 100%;
    font-size: 12px;
    position: absolute;
    padding: 11px 10px;
    box-sizing: border-box;
    width: 100%;
    top: 28px;
    bottom: 0;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    border-top: 0;
    overflow: hidden;
    table {
      width: 100%;
    }
  }
  .rightware_table_head {
    height: 25px;
    overflow: hidden;
    table {
      tr {
        background: #f5f6fa;
        height: 25px;
        line-height: 25px;
        td {
          min-width: 80px;
        }
        td:first-child {
          padding-left: 20px;
        }
        td {
          input {
            margin-left: 4px;
          }
        }
      }
    }
  }
  .rightware_table_center_M {
    overflow: auto;
    height: calc(~'100% - 11px');
    table {
      tr {
        height: 25px;
        line-height: 25px;
        border-bottom: 1px solid #dcdcdc;
        td {
          min-width: 80px;
        }
        td:first-child {
          padding-left: 20px;
        }
        td {
          input {
            margin-left: 4px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.rightware_table {
  .el-tabs__header {
    margin-bottom: 0;
    box-sizing: border-box;
    min-width: 560px;
    margin-left: 2px;
    margin-bottom: -1px;
    border-bottom-color: #dcdcdc;
  }
  .el-tabs__nav-wrap {
    padding: 0 10px;
  }
  .el-tabs__item {
    height: 27px;
    line-height: 27px;
    font-size: 12px;
    color: #575757;
    padding: 0 16px;
  }
  .el-tabs__item.is-active {
    color: #fd6442;
  }
}
.ff-user-permission .ff-user-tree-box .ff-box-user-true {
  width: 100%;
}
.ff-user-permission .ff-user-tree-box .ztree > div > li > a i {
  display: none;
}
.ff-user-permission .myTree .ztree_content_wrap {
  width: inherit;
}
</style>
