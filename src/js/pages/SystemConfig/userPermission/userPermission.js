import tree from "framework/components/tree/tree2.vue";
import axios from "framework/__utils__/request";

export default {
  data() {
    return {
      vmI18n: window.vmI18n,
      rightLoading: false, //右边数据loading
      activeName: "/p/cs/chrstoregroupquery", //激活的id
      treeList: [], //树数据
      middleList: {
        header: [],
        body: [],
      }, //中间数据
      sheetWidth: "",
      tabsList: [
        {
          label: vmI18n.t("panel_label.warehouse_authority"),
          url: "/p/cs/chrstoregroupquery",
        },
        {
          label: vmI18n.t("panel_label.supplier_authority"),
          url: "/p/cs/chrsuppgroupquery",
        },
        {
          label: vmI18n.t("panel_label.distributionCenter_authority"),
          url: "/p/cs/chrgroupsdistrib/query",
        },
        {
          label: vmI18n.t("panel_label.brand_authority"),
          url: "/p/cs/cgroupsbrand/query",
        },
        {
          label: vmI18n.t("panel_label.commodity_authority"),
          url: "/p/cs/cgrouppro/query",
        },
        {
          label: vmI18n.t("panel_label.company_authority"),
          url: "/p/cs/chrgroupscompany/query",
        },
        {
          label: vmI18n.t("panel_label.role_authority"),
          url: "/p/cs/cusergroupquery",
        },
      ], //右边tab列表
      obj: {}, //传给table的对象
      layerOut: false, //蒙层

      search: "", //树的搜索字段
      saveObj: {}, //存储的每次节点的对象
      treeNodes: [], //树的所有节点的数据
      treeShow: true,
      list: [], //传给树组件的数组
      //  changeList: {
      //      list: []
      //  },
      treeData: [
        { id: 1, pid: 0, name: "1" },
        { id: 2, pid: 4, name: "2[父4]" },
        { id: 3, pid: 7, name: "3[父7]" },
        { id: 4, pid: 1, name: "4[父1]" },
        { id: 5, pid: 6, name: "5[父6]" },
        { id: 6, pid: 0, name: "6" },
        { id: 7, pid: 4, name: "7[父4]" },
        { id: 8, pid: 6, name: "8[父6]" },
        { id: 9, pid: 0, name: "9" },
        { id: 10, pid: 6, name: "10[父6]" },
      ], // 请求回来的初始data

      // arrayList:[],//把匹配到item 存放这个数组
      ztreeDataSource: [], //请求回来的初始data

      rightListHead: {
        "/p/cs/chrstoregroupquery": [
          {
            label: vmI18n.t("table_label.distributionCenterName"),
            // label: "配销中心名称",
            name: "CP_C_DISTRIB_ENAME",
          },
          {
            label: vmI18n.t("table_label.storehouse"),
            // label: "店仓",
            name: "STOREENAME",
          },
          {
            label: vmI18n.t("table_label.mainStore_warehouse"),
            // label: "制单主店仓",
            name: "ISMAIN",
          },
          {
            label: vmI18n.t("table_label.check_mainStore"),
            // label: "查看主店仓",
            name: "ISREAD",
          },
        ], //店仓权限
        "/p/cs/chrsuppgroupquery": [
          {
            label: vmI18n.t("table_label.supplierCode"),
            // label: "供应商编码",
            name: "SUPECODE",
          },
          {
            label: vmI18n.t("table_label.supplierName"),
            // label: "供应商名称",
            name: "SUPENAME",
          },
          {
            label: vmI18n.t("table_label.supplier_fullName"),
            // label: "供应商全称",
            name: "AllNAME",
          },
        ], //供应商权限
        "/p/cs/chrgroupsdistrib/query": [
          {
            label: vmI18n.t("table_label.distributionCenterCode"),
            // label: "配销中心编码",
            name: "CP_C_DISTRIB_ECODE",
          },
          {
            label: vmI18n.t("table_label.distributionCenterName"),
            // label: "配销中心名称",
            name: "CP_C_DISTRIB_ENAME",
          },
          {
            label: vmI18n.t("table_label.view"),
            // label: "查看",
            name: "ISREAD",
          },
          {
            label: vmI18n.t("table_label.edit"),
            // label: "编辑",
            name: "ISWRITE",
          },
        ], //配销中心权限
        "/p/cs/cgroupsbrand/query": [
          {
            label: vmI18n.t("table_label.brand"),
            // label: "品牌",
            name: "BRANDENAME",
          },
          {
            label: vmI18n.t("table_label.view"),
            // label: "查看",
            name: "ISREAD",
          },
        ], //品牌权限
        "/p/cs/cgrouppro/query": [
          {
            label: vmI18n.t("table_label.productNo"),
            // label: "商品编号",
            name: "ecode",
          },
          {
            label: vmI18n.t("table_label.productName"),
            // label: "商品名称",
            name: "ename",
          },
        ], //商品权限
        "/p/cs/chrgroupscompany/query": [
          {
            label: vmI18n.t("table_label.companyCode"),
            // label: "公司编码",
            name: "ECODE",
          },
          {
            label: vmI18n.t("table_label.companyName"),
            // label: "公司名称",
            name: "ENAME",
          },
          {
            label: vmI18n.t("table_label.view"),
            // label: "查看",
            name: "ISREAD",
          },
          {
            label: vmI18n.t("table_label.edit"),
            // label: "编辑",
            name: "ISWRITE",
          },
        ],
        "/p/cs/cusergroupquery": [
          {
            label: vmI18n.t("table_label.roles"),
            // label: "角色",
            name: "name",
          },
          {
            label: vmI18n.t("table_label.description"),
            // label: "说明",
            name: "description",
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
      currentItem: "", //当前用户信息
      dataLoading: true, //加载效果
      middleSearch: "", //中间用户名搜索字段
    };
  },
  mounted() {
    const _this = this;
    this.obj = {
      table: "CP_C_HRUSERS",
      column_include_uicontroller: true,
      fixedcolumns: {},
      multiple: [],
      startindex: 0,
      range: 100,
      reffixedcolumns: {},
      orderby: [{ column: "CP_C_HRUSERS.ID", asc: true }],
    }; //初始参数
    this.getUserHeadData(); //获取用户头部数据
    this.getUserBodyData().then(() => {
      this.getPermission(this.currentItem);
    }); //获取用户头部数据
    this.getCstoreorgload(); //获取树节点
  },
  components: {
    tree,
  },
  methods: {
   async getPermission(item) {
      if (item === undefined) return (this.rightListBody = []);
      this.rightLoading = true;
      // 接口
      const formData = new FormData();
      formData.append("param", JSON.stringify({
        CP_C_HRUSERS_ID: item.ID, //用户item.ID
      }));
      const {data:{data,code}} = await this.service.systemConfig.chrstoregroupquery(this.activeName,formData);
      console.log(data,code);
      this.rightLoading = false;
      if (code === 0 && data) {
        this.rightListBody = data.data;
      }
      // axios({
      //   url: this.activeName,
      //   method: "post",
      //   data: {
      //     param: JSON.stringify({
      //       CP_C_HRUSERS_ID: item.ID, //用户item.ID
      //     }),
      //   },
      // }).then((res) => {
      //   let data = res.data;
      //   this.rightLoading = false;
      //   if (data.code === 0) {
      //     this.rightListBody = data.data;
      //   }
      // });
    }, //获取最右边的数据
    activeUser(item) {
      this.currentItem = item;
      this.getPermission(this.currentItem);
    }, //点击用户
    async middleScroll(event) {
      this.obj.startindex = this.middleList.body.length;
      if (
        event.target.scrollHeight - event.target.scrollTop ===
          event.target.offsetHeight &&
        event.target.scrollTop !== 0
      ) {
        this.dataLoading = true;
        const res = await this.service.common.QueryList({
          searchdata: JSON.stringify(this.obj),
        });
        let data = res.data;
        if (data.code === 0) {
          let arr = data.datas.row.map((obj) => {
            let listData = {};
            Object.keys(obj).forEach((label) => {
              listData[label] = obj[label].val;
            });
            return listData;
          });
          this.middleList.body.push(...arr);
          this.dataLoading = false;
        }
      }
    }, //懒加载数据
    async getUserHeadData() {
      const formData = new FormData();
      formData.append("table",'CP_C_HRUSERS');
      formData.append("getcmd",'y');
      console.log(formData);
      const {data:{code,datas,tabcmd}} = await this.service.systemConfig.getTableQuery(formData);
      if (code === 0) {
        datas["dataarry"].forEach((obj, index) => {
          if (index > 1) return;
          this.middleList.header.push(obj);
        });
      }
      // axios({
      //   url: "/p/cs/getTableQuery",
      //   method: "post",
      //   data:params,
      // }).then((res) => {
      //   let data = res.data;
      //   if (data.code === 0) {
      //     data.datas["dataarry"].forEach((obj, index) => {
      //       if (index > 1) return;
      //       this.middleList.header.push(obj);
      //     });
      //   }
      // });
    }, //获取用户头部数据
    getUserBodyData() {
      this.dataLoading = true;
      return this.service.common.QueryList({
        searchdata: JSON.stringify(this.obj),
      }).then((res) => {
        let data = res.data;
        if (data.code === 0) {
          this.$refs["middleware_table"].scrollTop = 0; //初始scrollTop
          this.middleList.body = data.datas.row.map((obj) => {
            let listData = {};
            Object.keys(obj).map((label) => {
              listData[label] = obj[label].val;
            });
            return listData;
          });
          this.currentItem = this.middleList.body[0]; //默认获取当前第一个用户的信息
          this.dataLoading = false; //关闭加载
        }
      });
    }, //获取用户头部数据
    async etTableWay(bo) {
      let self = this;
      let num = 0;
      let sendObj = {}; //存储传给table的对象
      const {data:{data,code}} = await this.service.systemConfig.userstreeload();
      console.log(data,code);
      if (code === 0) {
        // 储存原始数据以便后续模糊查询使用
        self.ztreeDataSource = JSON.parse(JSON.stringify(res.data));
        //储存渲染树的数据
        self.treeData = res.data;
      }else{
        this.$message.warning(message)
      }
      // this.$ajax.dataAjax("/p/cs/userstreeload", {}, function (res) {
      //   res = JSON.parse(JSON.stringify(res));
      //   if (res.code === 0) {
      //     // 储存原始数据以便后续模糊查询使用
      //     self.ztreeDataSource = JSON.parse(JSON.stringify(res.data));
      //     //储存渲染树的数据
      //     self.treeData = res.data;
      //   }
      //   if (res.code == -1) {
      //     self.errorMessage({
      //       action: "confirm",
      //       title: "警告",
      //       type: "error",
      //       list: [],
      //       isAction: true,
      //       desc: res.message,
      //     });
      //   }
      // });
    }, //表格返回时的状态
    async getItemData(val) {
      this.obj = {
        table: "CP_C_HRUSERS",
        column_include_uicontroller: true,
        fixedcolumns: {
          NAME: this.middleSearch,
        },
        multiple: [],
        startindex: 0,
        range: 100,
        reffixedcolumns: {},
        orderby: [{ column: "CP_C_HRUSERS.ID", asc: true }],
      };
      this.saveObj = val;
      let valID = val.ID.split(".")[1];
      valID = parseInt(valID);
      if (val.CP_C_ORGUP_ID !== null) {
        //当item的TYPE为店仓时
        if (val.TYPE === "CP_C_STORE_ID") {
          this.obj["reffixedcolumns"].CP_C_STORE_ID = ["=" + valID];
        }
        if (val.TYPE === "CP_C_HRORG_ID") {
          // 接口
          const formData = new FormData(); 
          formData.append('CP_C_HRORG_ID','valID')
          const {data:{message,code,CP_C_HRORG_ID,CP_C_STORE_ID}} = await this.service.systemConfig.usertreequery(formData);
          if (code === 0) {
            let HRORG = "in ("; //储存键名为CP_C_HRORG_ID对象的ID
            let STORE = "in ("; //储存键名为CP_C_STORE_ID对象的ID
            CP_C_HRORG_ID.forEach((item) => {
              HRORG += item.ID + ","; // in 1,2,3,5,6,87,8,6
            });
            CP_C_STORE_ID.forEach((item) => {
              STORE += item.ID + ",";
            });
            if (CP_C_HRORG_ID.length > 0) {
              this.obj["reffixedcolumns"].CP_C_HRORG_ID =
                HRORG.substring(0, HRORG.length - 1) + ")";
            }
            if (CP_C_STORE_ID.length > 0) {
              this.obj["reffixedcolumns"].CP_C_STORE_ID =
                STORE.substring(0, STORE.length - 1) + ")";
            }
          }else{
            this.$message.error(message)
          }
          // await axios({
          //   url: "/p/cs/usertreequery",
          //   method: "post",
          //   data: {
          //     CP_C_HRORG_ID: valID,
          //   },
          // }).then((res) => {
          //   let data = res.data;
          //   if (data.code === 0) {
          //     let HRORG = "in ("; //储存键名为CP_C_HRORG_ID对象的ID
          //     let STORE = "in ("; //储存键名为CP_C_STORE_ID对象的ID
          //     data.CP_C_HRORG_ID.forEach((item) => {
          //       HRORG += item.ID + ","; // in 1,2,3,5,6,87,8,6
          //     });
          //     data.CP_C_STORE_ID.forEach((item) => {
          //       STORE += item.ID + ",";
          //     });
          //     if (data.CP_C_HRORG_ID.length > 0) {
          //       this.obj["reffixedcolumns"].CP_C_HRORG_ID =
          //         HRORG.substring(0, HRORG.length - 1) + ")";
          //     }
          //     if (data.CP_C_STORE_ID.length > 0) {
          //       this.obj["reffixedcolumns"].CP_C_STORE_ID =
          //         STORE.substring(0, STORE.length - 1) + ")";
          //     }
          //   }
          //   if (data.code == -1) {
          //     self.errorMessage({
          //       action: "confirm",
          //       title: "警告",
          //       type: "error",
          //       list: [],
          //       isAction: true,
          //       desc: res.message,
          //     });
          //   }
          // });
        }
      }
      this.getUserBodyData().then(() => {
        this.getPermission(this.currentItem); //获取右边的信息
      }); //获取中间body数据
    }, //获取树组件传过来的值
    handleMiddleIconClick() {
      /*if(this.middleSearch.trim().length === 0) return*/
      this.obj.fixedcolumns = {
        NAME: this.middleSearch,
      };
      this.getUserBodyData().then(() => {
        this.getPermission(this.currentItem); //获取右边的信息
      }); //获取中间body数据
    }, //middleIcon点击事件
    searchMiddleData() {
      this.handleMiddleIconClick();
    }, //middle搜索

    //以下都是左边树的操作
    getCstoreorgload() {
      let self = this;
      this.$ajax.dataAjax("/p/cs/userstreeload", {}, function (res) {
        res = JSON.parse(JSON.stringify(res));
        if (res.code === 0) {
          // 储存原始数据以便后续模糊查询使用
          self.ztreeDataSource = JSON.parse(JSON.stringify(res.data));
          //储存渲染树的数据
          self.treeData = res.data;
          self.initTreeNodes();
        }
        if (res.code == -1) {
          self.errorMessage({
            action: "confirm",
            title: "警告",
            type: "error",
            list: [],
            isAction: true,
            desc: res.message,
          });
        }
      });
    }, //获取初始接口传过来的值
    searchNode(func, b) {
      let self = this;
      let k = 0;
      if (!this.search.trim()) return;
      if (typeof func !== "function") {
        let upper = this.search.trim().toUpperCase(); //将输入框的数据转成大写
        if (upper === "") {
          return;
        }
        func = (item) => item.MIXNAME_UPPER.indexOf(upper) !== -1;
      }
      let start = Date.now();
      if (b === undefined) {
        this.treeNodes.forEach((item) => {
          item.clickNode = false;
          item.isFolder = false;
          item.isExpand = false;
        });
      }
      let end = Date.now();
      var begin = new Date().getTime();
      for (var i = 0; i < this.treeNodes.length; i++) {
        var treeNode = this.treeNodes[i];
        if (func(treeNode)) {
          k++;
          treeNode.clickNode = true;
          var parent = treeNode.parent;
          while (parent != null) {
            parent.isFolder = true;
            parent.isExpand = true;
            parent = parent.parent;
          }
        }
        if (k >= 100) {
          i = this.treeNodes.length;
        }
      }
      var end1 = new Date().getTime();
    }, //时时改变list的值
    handleIconClick() {
      this.searchNode();
    }, //搜索框匹配
    openFather(_item) {
      let self = this;
      this.treeData.forEach((item) => {
        if (_item.CP_C_ORGUP_ID !== item.ID) {
          return self.treeData;
        }

        // item.clickNode = true;
        item.isFolder = true;
        item.isExpand = true;
        self.openFather(item);
      });
      this.treeData.forEach((item) => {
        if (_item.CP_C_STORE_ID !== item.ID) {
          return self.treeData;
        }
        // item.clickNode = true;
        item.isFolder = true;
        item.isExpand = true;
        self.openFather(item);
      });
      //    console.log("why")
    }, //递归把父节点打开
    initTree() {
      // 过滤出顶级结点
      this.list = this.treeData.filter((item) => item.CP_C_ORGUP_ID == null);
      // this.list[0].clickNode = true;
      // 填充children
      this.list.forEach((item) => this.getTreeChildren(item));
    },
    getTreeChildren(pnode) {
      let self = this;
      pnode.children = this.treeData.filter(
        (item) => item.CP_C_ORGUP_ID === pnode.ID
      );
      pnode.children.forEach((item) => {
        item.lastChild = false;
        pnode.children[pnode.children.length - 1].lastChild = true;
        self.getTreeChildren(item);
      });
    }, //获取每个子节点的方法
    initTreeNodes() {
      let result = this.convertTree(this.treeData);
      console.log(result);
      if (result.roots[0] !== undefined) {
        result.roots[0].clickNode = true;
      }
      this.list = result.roots;
      this.treeNodes = result.nodes;
    }, //加载树的方法
    convertTree(datas) {
      let begin = new Date().getTime();
      let map = {};
      let roots = [];
      let nodes = [];

      function get(id) {
        let n = map[id];
        if (n === undefined) {
          n = {
            ID: id,
            parent: null,
            MIXNAME_UPPER: "",
            isExpand: false,
            isFolder: false,
            clickNode: false,
            lastChild: false,
          };
          let children = [];
          n.getChildren = function () {
            return children;
          };
          map[id] = n;
          nodes.push(n);
        }
        return n;
      }

      function node(val) {
        let n = get(val.ID);
        n.CP_C_ORGUP_ID = val.CP_C_ORGUP_ID;
        n.ID = val.ID;
        n.MIXNAME = val.MIXNAME;
        n.MIXNAME_UPPER = val.MIXNAME == null ? "" : val.MIXNAME.toUpperCase();
        n.TYPE = val.TYPE;
        if (val.CP_C_ORGUP_ID == null) {
          roots.push(n);
        } else {
          var parent = get(val.CP_C_ORGUP_ID);
          parent.getChildren().push(n);
          n.parent = parent;
        }
        return n;
      }

      for (let index = 0; index < datas.length; index++) {
        node(datas[index]);
      }
      nodes = nodes.concat(roots);
      for (let index = 0; index < nodes.length; index++) {
        let node = nodes[index];
        if (node.getChildren().length > 0) {
          node.getChildren()[node.getChildren().length - 1].lastChild = true;
        }
      }
      let end = new Date().getTime();
      // return (window.$test = { roots, map, nodes, vm: this })  //2020-09-27 为何要将参数挂载在windows对象？观察一段时间
      return { roots, map, nodes, vm: this };
    }, //转化树节点数据
  },
  watch: {
    "middleList.header": {
      handler: function (val, oldval) {
        const _self = this;
        this.$nextTick(function () {
          _self.sheetWidth = $(".table_first").width() + 17;
        });
      },
    },
    activeName() {
      this.getPermission(this.currentItem); //获取当前用户当前tab的数据
    }, //tab切换
  },
};
