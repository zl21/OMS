<template>
  <div class="ff-user-permission">
    <!-- <tree></tree> -->
    <div class="ff-user-tree">
      <div class="title_sec">
        <input
          v-model="search"
          type="text"
          :placeholder="vmI18n.t('pHolder.organizationCode_or_name')"
          @keyup.enter="searchNode"
        />
        <i class="iconfont icon-sousuo" @click="handleIconClick" />
      </div>
      <div class="ff-user-tree-box">
        <tree
          :list="list"
          :search="search"
          class="ff-box-user-true"
          @getItemData="getItemData"
        />
      </div>
    </div>
    <div class="middleware" v-loading="loading">
      <div class="title_sec">
        <input
          v-model="middleSearch"
          type="text"
          :placeholder="vmI18n.t('pHolder.userName')"
          @keyup.enter="searchMiddleData"
        />
        <i class="iconfont icon-sousuo" @click="handleMiddleIconClick" />
      </div>
      <div class="middleware_body">
        <div class="middleware_table_hidden">
          <table class="table_first">
            <thead>
              <tr>
                <td v-for="(item, index) of middleList.header" :key="index">
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
          ref="middleware_table"
          class="middleware_table"
          @scroll="middleScroll($event)"
        >
          <table>
            <thead>
              <tr>
                <td v-for="(item, index) of middleList.header" :key="index">
                  {{ item.coldesc }}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) of middleList.body"
                :key="index"
                class="ff-user-active"
                :class="{ 'ff-user-click-active': currentItem.ID === item.ID }"
                @click="activeUser(item)"
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
          :key="index"
          :label="list.label"
          :name="list.url"
        />
      </el-tabs>
      <div class="rightware_table_centen" v-loading="loading">
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
                    v-else
                    type="checkbox"
                    disabled="disabled"
                    :checked="list[data.name] === 'Y'"
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
                    v-else
                    type="checkbox"
                    disabled="disabled"
                    :checked="list[data.name] === 'Y'"
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
import userPermission from "@/js/pages/systemConfig/userPermission/userPermission";

export default userPermission;
</script>

<style lang="less" scoped type="text/less">
@import "~@/css/pages/systemConfig/userPermission/userPermission.less";
</style>
