<template>
  <div class="commodityAuthority">
    <div class="content">
      <ul class="tab-nav">
        <li class="active">用户与商品</li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active">
          <div class="navbar">
            <!--<button @click="">保存</button>-->
            <!-- <button
              @click="deleteAuthority"
              v-if="actionFlag.deleteFlag"
            >{{Buttonmap.CMD_DELETE.name}}</button>
            <button @click="refresh">{{Buttonmap.CMD_REFRESH.name}}</button>-->
            <jordanBtn :btnConfig="btnConfig"></jordanBtn>
          </div>
          <div class="content-fixed">
            <div class="content-panel" style="width: 25%">
              <div class="grid-content" style="min-width: 256px;">
                <div class="table-head">
                  <span class="oper-bar">
                    <button class="white-btn">检索</button>
                    <span class="input">
                      <input
                        type="text"
                        @keyup.enter="axiosGroup()"
                        placeholder="请输入角色"
                        v-model="userQuery"
                      />
                      <i class="iconfont" @click="axiosGroup()">&#xe620;</i>
                    </span>
                  </span>
                </div>
                <div class="table-body">
                  <group-tree
                    :search-query="userQuery"
                    :search-flag="userSearchFlag"
                    :refresh="treeRefresh"
                    v-on:selectTreeItem="selectTreeItem"
                    v-on:searchFinish="searchFinish"
                  ></group-tree>
                  <!--<table class="table">
                  <tr>
                    <th width="20%">{{ChineseDictionary.NUMBER}}</th>
                    <th width="35%">用户</th>
                    <th width="45%">姓名</th>
                    <th class="gutter" width="8"></th>
                  </tr>
                </table>
                <div class="table-scroll-body" data-source="userCache" data-target="userList">
                  <table class="table">
                    <tr v-for="(user, i) in userList" :class="user.checked?'checked':''" @click="selectOne(user)" style="cursor: pointer">
                      <td width="20%">{{i+1}}</td>
                      <td width="35%" v-html="matchWords(user.NAME, 'userQuery')"></td>
                      <td width="45%" v-html="matchWords(user.ENAME, 'userQuery')"></td>
                    </tr>
                  </table>
                  </div>-->
                </div>
              </div>
            </div>
            <div class="content-panel right">
              <div class="grid-content" style="min-width: 490px;">
                <div class="table-head">
                  <span class="oper-bar" v-if="actionFlag.saveFlag">
                    <button class="white-btn">添加</button>
                    <span class="input">
                      <el-autocomplete
                        popper-class="my-autocomplete"
                        v-model="commodityResult"
                        :disabled="page.disabled"
                        :trigger-on-focus="page.focus"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入商品"
                        @select="handleSelect"
                      >
                        <template slot-scope="{ item }">
                          <span :title="item.ENAME">{{item.ENAME}}</span>
                        </template>
                      </el-autocomplete>
                      <i @click="insertUserAuthority" class="iconfont blue">&#xe62f;</i>
                    </span>
                  </span>
                  <!--<button @click="insertUserAuthority" v-if="actionFlag.saveFlag"><i class="iconfont">&#xe62f;</i></button>-->
                </div>
                <div class="table-body">
                  <table class="table">
                    <tr>
                      <th width="20%">
                        <label class="checkbox">
                          <input
                            type="checkbox"
                            v-model="authorityFlag"
                            @change="handleChangeAll"
                            :disabled="!actionFlag.deleteFlag"
                          />
                          {{ChineseDictionary.NUMBER}}
                        </label>
                      </th>
                      <th width="40%">商品款号</th>
                      <th width="40%">商品名称</th>
                    </tr>
                  </table>
                  <div class="table-scroll-body" style="overflow-y: auto;">
                    <table class="table">
                      <tr v-for="(commodity, i) in userAuthorityList" :key="commodity.ID">
                        <td width="20%">
                          <label class="checkbox">
                            <input
                              type="checkbox"
                              v-model="commodity.checked"
                              :disabled="!actionFlag.deleteFlag"
                            />
                            {{i+1}}
                          </label>
                        </td>
                        <td width="40%">{{commodity.PROECODE}}</td>
                        <td width="40%">{{commodity.PROENAME}}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <fk-dialog
      v-if="page.dialogShow"
      title="添加商品"
      :tablename="storage.name"
      :tableid="storage.id"
      :showClose="true"
      :fkshow.sync="page.dialogShow"
      :right-list="page.rightList"
      @easyData="easyData"
    ></fk-dialog>
  </div>
</template>
<script>
import { post, fetch } from "framework/__utils__/request";
import Buttonmap from "framework/assets/js/buttonmap.js";
import ChineseDictionary from "framework/assets/js/ChineseDictionary.js";
import FkDialog from "framework/components/tablelist/fkdialog";
import GroupTree from "framework/components/tree/groupTree";
import jordanBtn from "professionalComponents/businessButton";
import { buttonPermissionsMixin } from "@/assets/js/mixins/buttonPermissions";
/*import Vue from 'vue'*/

export default {
  mixins: [buttonPermissionsMixin],
  props: {},
  components: {
    FkDialog,
    GroupTree,
    jordanBtn
  },
  data() {
    return {
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "left", //按钮位置 (right , center , left)
        buttons: [
          {
            text: "删除", //按钮文本
            btnclick: () => {
              this.deleteAuthority();
            } //按钮点击事件
          },
          {
            text: "刷新", //按钮文本
            btnclick: () => {
              this.refresh;
            } //按钮点击事件
          }
        ]
      },
      Buttonmap: "",
      ChineseDictionary: "",
      actionFlag: { deleteFlag: false, saveFlag: false, freshFlag: false }, //动作权限
      storage: { id: "", name: "" },
      userList: [], //显示的用户列表
      userCache: [], //缓存的用户列表——弃用
      userAuthorityList: [], //用户权限列表
      userId: this.$route.query.cid || 0, //当前用户id/选中的用户id
      userQuery: "", //用户搜索条件
      userSearchFlag: false, //搜索操作标识
      treeRefresh: false,
      userAuthorityQuery: "", //用户权限搜索权限
      authorityFlag: false, //checkbox 全选
      searchQuery: {
        userList: "" //分页搜索条件
      },
      loadNumber: {
        userList: 0 //已加载的记录数
      },
      totalNumber: {
        userList: 0 //总记录数
      },
      axiosLoad: {
        userList: true //请求状态 true空闲/false请求未返回
      },
      page: {
        curFirst: true,
        dialogShow: false,
        focus: false,
        disabled: false,
        rightList: {}
      }, //fkdialog 需要的参数
      commodityResult: "", //下拉筛选条件
      loadSize: 300, //单页加载内容
      loadFlag: false //加载初始化状态
    };
  },
  created() {
    this.axiosAction();
    this.Buttonmap = Buttonmap;
    this.ChineseDictionary = ChineseDictionary;
  },
  watch: {
    userAuthorityList: {
      handler(val, oldVal) {
        let flag;
        if (val.length <= 0) flag = false;
        else flag = val.every(item => item.checked);
        this.authorityFlag = flag;
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 前提:公共逻辑处理必须使用jordanButton组件才可以使用公共逻辑
      // 参数1  关于是否是定制页面:action 半定制页面:halfaCustom （目前不生效）
      // 参数2  buttons父级json
      // 参数3  true逻辑处理 false定制页面自行处理  按钮权限
      // 逻辑处理则直接调用
      // this.getPermissions("action", "btnConfig");
      this.getPermissions("btnConfig", "commodityAuthority");
      // 定制页面自行处理
      // let buttonList = this.getPermissions("action", "btnConfig",true)
    });
    const _self = this;

    this.storage.id = this.$route.query.cid || "15";
    this.storage.name = this.$route.query.tableName || "ps_c_pro";

    //判断链接是否来自用户权限控制
    if (_self.$route.query.from && _self.$route.query.from === "tab") {
      _self.axiosUserName();
    } else {
      //        this.axiosUser(_self.userQuery, true);
      this.axiosGroup();
    }

    //监听滚动条,50%自动加载下一页
    $(".commodityAuthority .table-scroll-body").scroll(() => {
      let $this = $(event.target);
      let target = $this.attr("data-target");
      if (undefined != target) {
        let percent =
          $this.scrollTop() / ($this.find(".table").height() - $this.height());
        if (
          percent > 0.5 &&
          this.axiosLoad.userList &&
          this.loadNumber[target] < this.totalNumber[target]
        )
          this.loadPage(target);
      }
    });
  },
  computed: {},
  methods: {
    //发送请求,通过用户id获取用户信息
    //修改为用户组查询
    axiosUserName() {
      const _self = this;
      let param = new URLSearchParams();
      param.append(
        "param",
        JSON.stringify({ GROUPS_ID: Number(_self.userId) })
      );
      post("/p/cs/groupQueryName", param).then(res => {
        if (res.data.data) _self.userQuery = res.data.data.name;
        _self.axiosGroup();
      });
    },
    //发送请求,获取用户的action权限
    axiosAction() {
      // let param = { AD_ACTION_NAME: this.$route.params[0].split("action/")[1] };
      this.actionFlag.deleteFlag = true;
      this.actionFlag.saveFlag = true;
      // fetch('/p/cs/fetchActionsInCustomizePage', {param: param}).then(res => {
      //   let result = res.data.data;
      //   for(let r of result){
      //     if(r.webname === "CusersproDelCmd") this.actionFlag.deleteFlag = true;
      //     else if(r.webname === "CusersproSaveCmd") this.actionFlag.saveFlag = true;
      //   }
      // });
    },
    //发送请求,用户模糊搜索---弃用
    axiosUser(query, flag) {
      $(".table-scroll-body").scrollTop(0);
      let _self = this;
      let param = new URLSearchParams();
      _self.searchQuery.userList = query;
      param.append(
        "QUERY",
        JSON.stringify({
          QUERY: _self.searchQuery.userList,
          PAGENUM: 1,
          PAGESIZE: _self.loadSize
        })
      );
      post("/p/cs/chrusersquery", param)
        .then(res => {
          if (res.data.code === 0) {
            let result = res.data.data;
            _self.loadFlag = false;
            _self.userList = result.list;

            _self.loadNumber["userList"] = result.endRow;
            _self.totalNumber["userList"] = result.total;

            if (_self.userList.length > 0) {
              _self.selectOne(_self.userList[0]);
              //              _self.$set(_self.userList[0], "checked", true);
              //              _self.userId = _self.userList[0].ID;
              //              _self.axiosUserAuthority();
            } else {
              _self.userId = 0;
              _self.userAuthorityList = [];
              //判断是否是刷新操作,添加提示信息
              if (_self.actionFlag.freshFlag) {
                _self.$message({ message: "刷新成功", type: "success" });
                _self.actionFlag.freshFlag = false;
              }
            }
          } else {
            if (_self.actionFlag.freshFlag) _self.actionFlag.freshFlag = false;
          }
        })
        .catch(error => {
          if (_self.actionFlag.freshFlag) _self.actionFlag.freshFlag = false;
        });
    },
    //用户组模糊搜索
    axiosGroup() {
      this.userSearchFlag = true;
      $(".commodityAuthority .tab-pane")
        .find(".table-body")
        .scrollTop(0);
    },
    //树节点搜索完成
    searchFinish(value) {
      this.userSearchFlag = value;
    },
    //切换用户组tree
    selectTreeItem(object) {
      const _self = this;
      if (_self.userId !== object.ID) {
        _self.userId = object.ID;
        _self.axiosUserAuthority();
        _self.treeRefresh = false;
      }
    },

    // 发送请求,获取指定用户的权限
    axiosUserAuthority() {
      let _self = this;
      let param = new URLSearchParams();
      param.append("param", JSON.stringify({ GROUPS_ID: _self.userId }));
      post("/p/cs/cuserspro/query", param)
        .then(res => {
          if (res.data.code === 0) {
            let result = res.data.data;
            for (let g of result) {
              g.checked = false;
            }
            _self.userAuthorityList = result;
            if (_self.actionFlag.freshFlag) {
              _self.$message({ message: "刷新成功", type: "success" });
              _self.actionFlag.freshFlag = false;
            }
          } else {
            if (_self.actionFlag.freshFlag) {
              _self.actionFlag.freshFlag = false;
            }
          }
        })
        .catch(error => {
          if (_self.actionFlag.freshFlag) {
            _self.actionFlag.freshFlag = false;
          }
        });
    },
    //插入用户权限按钮触发,显示筛选dialog
    insertUserAuthority() {
      this.page.dialogShow = true;
    },
    //用户列表中点击选择一个用户,获取对应的权限------------------弃用
    selectOne(obj) {
      if (!obj.checked) {
        let _self = this;
        for (let u of _self.userList) {
          u.checked = false;
        }
        _self.userId = obj.ID;
        _self.axiosUserAuthority();
        _self.$set(obj, "checked", true);
      }
    },
    //标准保存接口----删除
    deleteAuthority() {
      let _self = this;
      let param = {
        table: "CP_C_HRUSERS_PRO",
        objid: 0,
        isdelmtable: false,
        data: { CP_C_HRUSERS_PRO: [] }
      };
      for (let u of _self.userAuthorityList) {
        if (u.checked) param.data.CP_C_HRUSERS_PRO.push(u.ID);
      }
      if (param.data.CP_C_HRUSERS_PRO.length > 0) {
        fetch("/p/cs/objectDelete", param).then(res => {
          if (res.data.code < 0) {
          } else {
            _self.$message({ message: res.data.message, type: "success" });
            _self.axiosUserAuthority();
          }
        });
      } else {
        _self.$message("没有选中");
      }
    },
    //下拉筛选,auto-complete组件调用方法
    querySearch(queryString, cb) {
      if (queryString.length <= 0) {
        cb([]);
      } else {
        let _self = this;
        let param = new URLSearchParams();
        param.append("query", "{'query':'" + queryString + "'}");
        post("/p/cs/cprolikequery", param).then(res => {
          if (res.data.code === 0) {
            let result = res.data.data;
            cb(result);
          } else {
          }
        });
      }
    },
    //选中下拉的筛选条件,auto-complete组件调用方法
    handleSelect(item) {
      let _self = this;
      if (_self.userId === 0) {
        _self.$message("未选中用户");
        return;
      }
      let insertParam = [];
      insertParam.push({
        ID: -1,
        GROUPS_ID: _self.userId,
        PS_C_PRO_ID: item.ID
      });
      _self.insertAuthority(insertParam);
      _self.commodityResult = "";
      _self.page.disabled = true;
    },

    //弹出框多选组件,确定调用方法
    easyData(result) {
      result = JSON.parse(result);
      let _self = this;
      if (_self.userId === 0) {
        _self.$message("未选中用户");
        return;
      }
      let param = new URLSearchParams();
      param.append("param", JSON.stringify(result.value));
      post("/p/cs/screenresultcheck", param).then(res => {
        if (res.data.code === 0) {
          let searchResult = res.data.data.list;
          if (searchResult.length <= 0) return;
          let insertList = [];
          for (let sr of searchResult) {
            insertList.push({
              ID: -1,
              GROUPS_ID: _self.userId,
              PS_C_PRO_ID: sr.ID
            });
          }
          _self.insertAuthority(insertList);
        } else {
        }
      });
    },
    //发送请求,插入用户权限
    insertAuthority(insertList) {
      let _self = this;
      let insertParam = {
        table: "CP_C_HRUSERS_PRO",
        objid: 0,
        data: { CP_C_HRUSERS_PRO: insertList }
      };
      let param = new URLSearchParams();
      param.append("table", insertParam.table);
      param.append("objid", insertParam.objid);
      param.append("data", JSON.stringify(insertParam.data));
      post("/p/cs/objectSave", param)
        .then(res => {
          _self.page.disabled = false;
          if (res.data.code !== 0) {
          } else {
            _self.$message({ message: res.data.message, type: "success" });
          }
          _self.axiosUserAuthority();
        })
        .catch(error => {
          _self.page.disabled = false;
        });
    },
    //全选/取消
    handleChangeAll() {
      let _self = this;
      if (_self.authorityFlag)
        for (let u of _self.userAuthorityList) _self.$set(u, "checked", true);
      else
        for (let u of _self.userAuthorityList) _self.$set(u, "checked", false);
    },
    //字符串匹配,标红
    matchWords(value) {
      if (null == value || value == "") return "";
      if (this.userQuery === "") return value;
      let searchQuery = this.userQuery.replace(
        /[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?\+\.\(\)\[\]\\]/g,
        q => "\\" + q
      );
      return value.replace(
        new RegExp(searchQuery, "gi"),
        word => '<span class="color-red">' + word + "</span>"
      );
    },
    //刷新操作
    refresh() {
      this.axiosAction();
      this.actionFlag.freshFlag = true;
      this.userQuery = "";
      this.userAuthorityQuery = "";
      this.userId = this.$route.query.cid || 0;
      this.loadFlag = false;
      //        this.axiosUser(this.userQuery);
      this.treeRefresh = true;
      $(".commodityAuthority .tab-pane")
        .find(".table-body")
        .scrollTop(0);
    },

    //发送请求,预加载下一页记录
    loadPage(target) {
      let _self = this;
      _self.axiosLoad[target] = false;
      let param = new URLSearchParams();
      param.append(
        "QUERY",
        JSON.stringify({
          QUERY: _self.searchQuery[target],
          PAGENUM: Number(_self.loadNumber[target] / _self.loadSize) + 1,
          PAGESIZE: _self.loadSize
        })
      );
      post("/p/cs/chrusersquery", param).then(res => {
        let result = res.data.data;
        if (!_self.loadFlag) {
          for (let user of result.list) {
            if (user.ID == _self.userId) {
              _self.loadFlag = true;
              _self.$set(user, "checked", true);
              break;
            }
          }
          _self[target] = _self[target].concat(result.list);
        }
        _self.loadNumber[target] = result.endRow;
        _self.totalNumber[target] = result.total;
        _self.axiosLoad[target] = true;
      });
    }
  }
};
</script>
<style lang="less">
.commodityAuthority {
  height: 100%;
  @import "~@/assets/css/css_1_3/order.less";
  .content {
    .tab-content {
      .content-fixed {
        .content-panel.right {
          margin-right: 0;
          width: calc(~"75% - 10px");
        }
      }
    }
  }
  .table-head .oper-bar .input .el-autocomplete input {
    width: 150px;
  }
}
.my-autocomplete {
  .el-autocomplete-suggestion__wrap {
    padding: 4px 0;
  }
  .el-autocomplete-suggestion li {
    padding: 0 5px;
  }
}
</style>
