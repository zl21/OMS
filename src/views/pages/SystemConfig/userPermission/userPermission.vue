<template>
  <div class="ff-user-permission">
    <!-- <tree></tree> -->
    <div class="ff-user-tree">
      <div class="title_sec">
        <input
          type="text"
          v-model="search"
          @keyup.enter="searchNode"
          :placeholder="vmI18n.t('pHolder.organizationCode_or_name')"
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
          :placeholder="vmI18n.t('pHolder.userName')"
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
                <td>{{ vmI18n.t("table_label.serialNo") }}</td>
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
                <td colspan="5" style="color: red">
                  {{ vmI18n.t("table_label.total") }}{{ rightListBody.length
                  }}{{ vmI18n.t("table_label.rows") }}
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
  import userPermission from "@/js/pages/SystemConfig/userPermission/userPermission.js";
  export default userPermission;
</script>

<style lang="less" scoped type="text/less">
@import "~@/css/pages/SystemConfig/userPermission/userPermission.less";
</style>
