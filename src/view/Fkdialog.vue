<template>
  <my-dialog
    :title="title"
    :visible.sync="t_dialog_show"
    :show-close="true"
    :has-width="true"
    :close-on-click-modal="false"
    :append-to-body="appendToBody"
    :modal-append-to-body="modalAppendToBody"
    class="ark-dialog"
    @MyDialogClose="dialogClose"
  >
    <template #title>
      {{ title }}
    </template>

    <div v-loading.lock="confirmLoading" class="fkdialog">
      <div class="dialog_left">
        <div class="left_top">
          <span>{{ vmI18n.t("SCREENCONDITION") }}</span>
          <span>
            <i v-if="!open_close_icon" class="iconfont" @click="nodeOpen"
              >&#xe61a;</i
            >
            <i v-if="open_close_icon" class="iconfont" @click="nodeCLose"
              >&#xe62c;</i
            >
            <i class="iconfont" @click="clearNode">&#xe61d;</i>
          </span>
        </div>
        <div id="left_scroll_center" class="left_center">
          <tree
            v-loading.lock="tree_loading"
            :tree_lists="tree_lists"
            class="left-tree"
            @tree_change="tree_change"
          />
        </div>
      </div>
      <div
        class="dialog_center"
        :class="{ 'second-width': activeName === 'second' }"
      >
        <el-tabs v-model="activeName">
          <el-tab-pane
            :label="vmI18n.t('SELECTEDRESULTS')"
            name="first"
            class="el-tab-auto"
          >
            <!-- <el-pagination
              :current-page="l_center_data.l_currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="l_center_data.l_page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="l_center_data.total"
              @size-change="l_handleSizeChange"
              @current-change="l_handleCurrentChange"
            /> -->
            <Page
              class-name="dfkialogPage"
              :show-total="true"
              :current="l_center_data.l_currentPage"
              :total="l_center_data.total"
              :page-size="l_center_data.l_page_size"
              :page-size-opts="[10, 20, 50, 100]"
              @on-change="l_handleCurrentChange"
              @on-page-size-change="l_handleSizeChange"
              pager-count="5"
              size="small"
              show-elevator
              show-sizer
            />
            <show-table-data
              ref="screen_ck"
              v-loading.lock="l_screenLoading"
              :table_head="l_table_data.header"
              :table_data="l_table_data.body[l_center_data.l_currentPage - 1]"
              :table_checked="
                l_table_data.checked[l_center_data.l_currentPage - 1]
              "
              :current-page="l_center_data.l_currentPage - 1"
              :size-page="l_center_data.l_page_size"
              id_name="first"
              @center_change="center_change"
              @single="single"
            />
          </el-tab-pane>
          <el-tab-pane
            :label="vmI18n.t('VIEWTHESELECTEDRESULTS')"
            name="second"
            class="el-tab-auto"
          >
            <!-- <el-pagination
              :current-page="r_center_data.r_currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="r_center_data.r_page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="r_center_data.total"
              @size-change="r_handleSizeChange"
              @current-change="r_handleCurrentChange"
            /> -->
            <Page
              class-name="dfkialogPage"
              :show-total="true"
              :current="r_center_data.r_currentPage"
              :total="r_center_data.total"
              :page-size="r_center_data.r_page_size"
              :page-size-opts="[10, 20, 50, 100]"
              @on-change="l_handleCurrentChange"
              @on-page-size-change="l_handleSizeChange"
              pager-count="5"
              size="small"
              show-elevator
              show-sizer
            />
            <show-table-data
              ref="result_ck"
              :table_head="r_table_data.header"
              :table_data="r_table_data.body[r_center_data.r_currentPage - 1]"
              :current-page="r_center_data.r_currentPage - 1"
              :size-page="r_center_data.r_page_size"
              :table_checked="
                r_table_data.checked[r_center_data.r_currentPage - 1]
              "
              id_name="second"
              @center_change="center_change"
            />
          </el-tab-pane>
        </el-tabs>
        <div v-if="activeName === 'first'" class="center_bottom">
          <el-input
            ref="searchWord"
            v-model="searchWord"
            @keyup.enter.native="keyupWord"
            @change="searchWordChange"
          >
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"
              @click="onIconClick"
            />
            <template slot="prepend">
              {{ vmI18n.t("GLOBALSEARCH") }}
            </template>
          </el-input>
          <div class="center-exclude">
            <label for="exclude">
              <input
                id="exclude"
                v-model="exclude"
                type="checkbox"
                name=""
                value=""
              />
              <span class="checked-box" />
              <span> {{ vmI18n.t("EXCLUDE") }}</span>
            </label>
          </div>
        </div>
        <div v-if="activeName !== 'first'" class="center_bottom center-b-t">
          <el-input
            ref="searchResult"
            v-model="searchResult"
            @keyup.enter.native="keyupSearch"
            @change="searchResultChange"
          >
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"
              @click="onSearchResult"
            />
            <!-- 查询结果 -->
            <template slot="prepend">
              {{ vmI18n.t("other.queryResults") }}
            </template>
          </el-input>
        </div>
      </div>
      <div v-if="activeName === 'first'" class="dialog-operation">
        <div
          class="operation-more operation-icon iconfont operation-hover"
          @click="addCondition"
        >
          &#xe606;
        </div>
        <div
          class="operation-single iconfont operation-icon operation-hover"
          @click="center_change(single_data)"
        >
          &#xe613;
        </div>
      </div>
      <div class="dialog_right">
        <div class="right_top">
          <span>{{ vmI18n.t("HASBEENSELECTED") }}</span
          ><span>(</span
          ><span
            >{{ r_center_data.rightTotal }} {{ vmI18n.t("common.piece") }}</span
          ><span>)</span>

          <span>
            <i class="iconfont" @click="showOrHidden = true">&#xe61c;</i>
            <i class="iconfont" @click="clearAllResult">&#xe6a2;</i>
          </span>
        </div>
        <div class="right_center">
          <ul>
            <li v-for="(item, index) in r_result" :key="index">
              <p>{{ item.exclude ? "排除：" : "" }}{{ item.screen_string }}</p>
              <i class="iconfont icon-fork" @click="deleteList(index)" />
            </li>
          </ul>
        </div>
        <div class="right_bottom">
          <el-button @click="dialogClose">
            {{ vmI18n.t("CANCEL") }}
          </el-button>
          <el-button @click="dialogConfirm">
            {{ vmI18n.t("CONFIRM") }}
          </el-button>
        </div>
      </div>
      <div v-if="showOrHidden" class="modalDiv">
        <div class="modalCenter">
          <div class="modalTitle">
            <span class="modalText">{{ vmI18n.t("POTX") }}</span>
            <i
              class="iconfont icon-cha1"
              @click="showOrHidden = !showOrHidden"
            />
          </div>
          <div class="modalContent">
            <i class="iconfont muBan">&#xe637;</i>
            <div class="textCenter">
              <label>{{ vmI18n.t("PAGENAME") }}：</label>
              <input
                v-model="module_name"
                type="text"
              />
            </div>
            <div class="modalBtn">
              <button class="btn result_save" @click="result_save">
                <span>{{ vmI18n.t("ENSURE") }}</span>
              </button>
              <button class="btn" @click="showOrHidden = !showOrHidden">
                <span>{{ vmI18n.t("CANCEL") }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorDialog" class="fk-error-dialog">
      <div class="fk-error-dialog-box">
        <div class="fk-error-dialog-title">
          <!-- 警告 -->
          {{ vmI18n.t("modalTitle.warning") }}
          <span class="fk-error-icon">
            <i class="iconfont icon-cha1" @click="errorDialog = false" />
          </span>
        </div>
        <div class="fk-error-dialog-body">
          <div class="fk-body-top">
            <div class="fk-body-top-left">
              <i class="iconfont">&#xe631;</i>
            </div>
            <div class="fk-body-top-right">
              <p v-for="(list, index) in errorData" :key="index">
                {{ list.message }}
              </p>
            </div>
          </div>
          <div class="fk-body-bottom">
            <!-- 确定 -->
            <el-button @click="errorDialogClose">
              {{ vmI18n.t("common.determine") }}
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </my-dialog>
</template>

<script>
  import Fkdialog from 'burgeonComponents/js/Fkdialog';
  export default Fkdialog;
</script>

<style lang="less" type="text/less">
@import "~omsTheme/public.less";
// 框架有样式 -- 覆盖修改
.detailtable .form_button .buttonFk button {
  background-color: transparent;
  border: none;
}
.ark-dialog {
  .fkdialog {
    .dialog_left {
      // flex: 1;
      width: 200px;
      box-shadow: none;
      .dislogtree {
        .title {
          i,
          label,
          input,
          span {
            display: inline-block;
            vertical-align: middle;
          }
          i {
            &.iconfont {
              // transform:inherit !important;
            }
            &::before {
              color: #ccc;
              content: "\ef90";
              font-family: iconfont !important;
              font-size: 14px;
              font-style: normal;
              font-weight: 400;
              background: #fff;
              position: absolute;
              left: 4px;
              top: 9px;
              width: 14px;
              height: 14px;
              line-height: 14px;
            }
          }
          [style="transform: rotate(90deg);"]::before {
            content: "\efd4";
            transform: rotate(90deg);
            left: 2px;
            top: 7px;
            font-size: 14px;
          }
        }
      }
      .left_top {
        span i {
          color: @base-color;
        }
      }
      .left_center {
        width: 100%;
      }
    }
    .dialog_center {
      flex: 3;
      // width: auto;
      box-shadow: none;
      .el-tabs .el-tabs__header .el-tabs__nav .el-tabs__active-bar {
        background-color: @base-color;
      }
      .el-pagination {
        .el-pagination__jump {
          margin-left: 0;
        }
      }
      .center_bottom {
        .el-input {
          input {
            border-radius: 0;
            height: @base-color;
            line-height: @base-color;
          }
        }
        .center-exclude label {
          input,
          span:last-child {
            vertical-align: middle;
          }
        }
      }

      .pagination__jump {
        margin-left: 0;
      }
    }
    .dialog-operation {
      flex: 0.3;
      // width: auto;
      border-color: #f3f3f3;
      .operation-icon {
        color: @base-color;
        font-size: 14px;
        line-height: 19px;
        border-radius: 3px;
      }
    }
    .dialog_right {
      // flex: 1;
      // width: auto;
      .right_top {
        color: @base-color;
        span {
          &:nth-child(3),
          :last-child,
          &:last-child {
            i {
              color: @base-color;
            }
            color: @base-color;
          }
        }
      }
      .right_bottom {
        padding: 0;
        height: auto;
        & > button {
          #bundle > .basicBtn;
          color: @base-color;
          &:last-child {
            color: #fff;
            background: @base-color;
            border: 1px solid @base-color;
            margin-right: 0;
          }
        }
      }
    }
    .modalCenter{
      height: auto !important;
    }
    .modalContent{
      padding: 50px 30px 20px;
      .textCenter{
        margin: 0;
        text-align:center;
        font-size: 0;
        label{
          font-size: 12px;
          display: inline-block;
          width: 120px;
          text-align: right
        }
        input{
          font-size: 12px;
          width: calc(100% - 120px);
          #bundle > .defalutInput;
        }
      }
      .modalBtn{
        position: relative;
        top: 0;
        right: 0;
        margin-top: 10px;
        button{
          #bundle > .defalutBtn;
          span{
            color: inherit;
          }
          &.result_save{
            #bundle > .defalutBtn;
          }
        }
      }
    }
    
  }
}
.dfkialogPage {
  margin: 10px 0;
}
</style>
