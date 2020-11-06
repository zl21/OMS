<template>
  <div class="commodityAuthority">
    <div class="content">
      <ul class="tab-nav">
        <li class="active">
          用户与商品
        </li>
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
            <jordanBtn :btn-config="btnConfig" />
          </div>
          <div class="content-fixed">
            <div
              class="content-panel"
              style="width: 25%"
            >
              <div
                class="grid-content"
                style="min-width: 256px;"
              >
                <div class="table-head">
                  <span class="oper-bar">
                    <button class="white-btn">检索</button>
                    <span class="input">
                      <input
                        v-model="userQuery"
                        type="text"
                        placeholder="请输入角色"
                        @keyup.enter="axiosGroup()"
                      >
                      <i
                        class="iconfont"
                        @click="axiosGroup()"
                      >&#xe620;</i>
                    </span>
                  </span>
                </div>
                <div class="table-body">
                  <group-tree
                    :search-query="userQuery"
                    :search-flag="userSearchFlag"
                    :refresh="treeRefresh"
                    @selectTreeItem="selectTreeItem"
                    @searchFinish="searchFinish"
                  />
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
              <div
                class="grid-content"
                style="min-width: 490px;"
              >
                <div class="table-head">
                  <span
                    v-if="actionFlag.saveFlag"
                    class="oper-bar"
                  >
                    <button class="white-btn">添加</button>
                    <span class="input">
                      <el-autocomplete
                        v-model="commodityResult"
                        popper-class="my-autocomplete"
                        :disabled="page.disabled"
                        :trigger-on-focus="page.focus"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入商品"
                        @select="handleSelect"
                      >
                        <template slot-scope="{ item }">
                          <span :title="item.ENAME">{{ item.ENAME }}</span>
                        </template>
                      </el-autocomplete>
                      <i
                        class="iconfont blue"
                        @click="insertUserAuthority"
                      >&#xe62f;</i>
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
                            v-model="authorityFlag"
                            type="checkbox"
                            :disabled="!actionFlag.deleteFlag"
                            @change="handleChangeAll"
                          >
                          {{ ChineseDictionary.NUMBER }}
                        </label>
                      </th>
                      <th width="40%">
                        商品款号
                      </th>
                      <th width="40%">
                        商品名称
                      </th>
                    </tr>
                  </table>
                  <div
                    class="table-scroll-body"
                    style="overflow-y: auto;"
                  >
                    <table class="table">
                      <tr
                        v-for="(commodity, i) in userAuthorityList"
                        :key="commodity.ID"
                      >
                        <td width="20%">
                          <label class="checkbox">
                            <input
                              v-model="commodity.checked"
                              type="checkbox"
                              :disabled="!actionFlag.deleteFlag"
                            >
                            {{ i+1 }}
                          </label>
                        </td>
                        <td width="40%">
                          {{ commodity.PROECODE }}
                        </td>
                        <td width="40%">
                          {{ commodity.PROENAME }}
                        </td>
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
      :show-close="true"
      :fkshow.sync="page.dialogShow"
      :right-list="page.rightList"
      @easyData="easyData"
    />
  </div>
</template>
<script>
  import commodityAuthority from '@/js/pages/SystemConfig/commodityAuthority/commodityAuthority';

  export default commodityAuthority;
</script>
<style lang="less">
@import "~@/css/pages/SystemConfig/commodityAuthority/commodityAuthority.less";
</style>
