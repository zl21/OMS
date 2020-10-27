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
  import commodityAuthority from "@/js/pages/SystemConfig/commodityAuthority/commodityAuthority.js";
  export default commodityAuthority;
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
