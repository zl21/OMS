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
    height: calc(~"100% - 11px");
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
