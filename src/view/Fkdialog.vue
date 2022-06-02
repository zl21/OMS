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
    :custom-class="customClass"
    @MyDialogClose="dialogClose"
  >
    <template #title>
      {{ title }}
    </template>

    <div v-loading.lock="confirmLoading" class="fkdialog">
      <div class="dialog_left">
        <div class="left_top">
          <span>{{ ChineseDictionary.SCREENCONDITION }}</span>
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
        <!-- <el-tabs v-model="activeName">
          <el-tab-pane
            :label="ChineseDictionary.SELECTEDRESULTS"
            name="first"
            class="el-tab-auto"
          > -->
            <!-- <el-pagination
              :current-page="l_center_data.l_currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="l_center_data.l_page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="l_center_data.total"
              @size-change="l_handleSizeChange"
              @current-change="l_handleCurrentChange"
            /> -->
        <Tabs :value="activeName">
          <TabPane 
            :label="ChineseDictionary.SELECTEDRESULTS"
            name="first"
          >
            <Page
              class-name="dfkialogPage"
              :show-total="true"
              :current="l_center_data.l_currentPage"
              :total="l_center_data.total"
              :page-size="l_center_data.l_page_size"
              :page-size-opts="[10, 20, 50, 100]"
              :pager-count="5"
              @on-change="l_handleCurrentChange"
              @on-page-size-change="l_handleSizeChange"
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
          </TabPane>
          <!-- <el-tab-pane
            :label="ChineseDictionary.VIEWTHESELECTEDRESULTS"
            name="second"
            class="el-tab-auto"
          > -->
            <!-- <el-pagination
              :current-page="r_center_data.r_currentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="r_center_data.r_page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="r_center_data.total"
              @size-change="r_handleSizeChange"
              @current-change="r_handleCurrentChange"
            /> -->
          <TabPane 
            :label="ChineseDictionary.VIEWTHESELECTEDRESULTS"
            name="second"
          >
            <Page
              class-name="dfkialogPage"
              :show-total="true"
              :current="r_center_data.r_currentPage"
              :total="r_center_data.total"
              :page-size="r_center_data.r_page_size"
              :page-size-opts="[10, 20, 50, 100]"
              :pager-count="5"
              @on-change="l_handleCurrentChange"
              @on-page-size-change="l_handleSizeChange"
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
          </TabPane>
        </Tabs>
        <div v-if="activeName === 'first'" class="center_bottom">
          <!-- <el-input
            ref="searchWord"
            v-model="searchWord"
            @keyup.enter.native="keyupWord"
            @change="searchWordChange"
          >
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"
              @click="onIconClick"
            /> -->
          <Input
            ref="searchWord"
            v-model="searchWord"
            @on-enter="keyupWord"
            @on-change="filterKeyword('searchWordChange')"
          >
            <Icon type="ios-search" slot="suffix" @click="onIconClick" />
            <template slot="prepend">
              {{ ChineseDictionary.GLOBALSEARCH }}
            </template>
          </Input>
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
              <span> {{ ChineseDictionary.EXCLUDE }}</span>
            </label>
          </div>
        </div>
        <div v-if="activeName !== 'first'" class="center_bottom center-b-t">
          <!-- <el-input
            ref="searchResult"
            v-model="searchResult"
            @keyup.enter.native="keyupSearch"
            @change="searchResultChange"
          >
            <i
              slot="suffix"
              class="el-icon-search el-input__icon"
              @click="onSearchResult"
            />-->
          <Input 
            ref="searchResult"
            v-model="searchResult"
            @on-enter="keyupSearch"
            @on-change="filterKeyword('searchResultChange')"
          >
            <Icon type="ios-search" slot="suffix" @click="onSearchResult" />
            <!-- 查询结果 -->
            <template slot="prepend">
              {{ vmI18n.t("other.queryResults") }}
            </template>
          </Input>
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
          <span>{{ ChineseDictionary.HASBEENSELECTED }}</span
          ><span>(</span
          ><span
            >{{ r_center_data.rightTotal }} {{ vmI18n.t("com.piece") }}</span
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
        <div class="ark-modal-footer" style="padding-right: 0">
          <Button @click="dialogClose">
            {{ ChineseDictionary.CANCEL }}
          </Button>
          <Button type="primary" @click="dialogConfirm">
            {{ ChineseDictionary.CONFIRM }}
          </Button>
        </div>
      </div>
      <div v-if="showOrHidden" class="modalDiv">
        <div class="modalCenter">
          <div class="modalTitle">
            <span class="modalText">{{ ChineseDictionary.POTX }}</span>
            <i
              class="iconfont icon-cha1"
              @click="showOrHidden = !showOrHidden"
            />
          </div>
          <div class="modalContent">
            <i class="iconfont muBan">&#xe637;</i>
            <div class="textCenter">
              <label>{{ ChineseDictionary.PAGENAME }}：</label>
              <input
                v-model="module_name"
                type="text"
              />
            </div>
            <div class="modalBtn">
              <button class="btn result_save" @click="result_save">
                <span>{{ ChineseDictionary.ENSURE }}</span>
              </button>
              <button class="btn" @click="showOrHidden = !showOrHidden">
                <span>{{ ChineseDictionary.CANCEL }}</span>
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
          {{ vmI18n.t("mT.warning") }}
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
            <Button @click="errorDialogClose">
              {{ vmI18n.t("com.determine") }}
            </Button>
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

<style lang="less" type="text/less" scoped>
// 框架有样式 -- 覆盖修改
.detailtable .form_button .buttonFk .el-dialog__headerbtn {
  background-color: transparent !important;
  border: none !important;
}
.ark-dialog {
  .fkdialog {
    .dialog_left {
      // flex: 1;
      width: 200px;
      // box-shadow: none;
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
          color: var(--b2-color);
        }
      }
      .left_center {
        width: 100%;
      }
    }
    .dialog_center {
      flex: 3;
      // width: auto;
      // box-shadow: none;
      .el-tabs .el-tabs__header .el-tabs__nav .el-tabs__active-bar {
        background-color: var(--b2-color);
      }
      .el-pagination {
        .el-pagination__jump {
          margin-left: 0;
        }
      }
      .center_bottom {
        // .el-input {
        //   input {
        //     border-radius: 0;
        //     height: var(--b2-color);
        //     line-height: var(--b2-color);
        //   }
        // }
        display: flex;
        align-items: center;
        .ark-input-group {
          width: 50%;
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
        color: var(--b2-color);
        font-size: 14px;
        line-height: 19px;
        border-radius: 3px;
      }
    }
    .dialog_right {
      // flex: 1;
      // width: auto;
      .right_top {
        color: var(--b2-color);
        span {
          &:nth-child(3),
          :last-child,
          &:last-child {
            i {
              color: var(--b2-color);
            }
            color: var(--b2-color);
          }
        }
      }
      .right_bottom {
        padding: 0;
        height: auto;
        & > button {
          // #bundle > .basicBtn;
          font-size: 12px;
          height: 32px;
          line-height: 1;
          padding: 0 16px;
          border-radius: 3px;
          border: 1px solid var(--b2-color);

          & * {
            font-size: 12px;
            width: 100%;
          }

          color: var(--b2-color);
          &:last-child {
            color: #fff;
            background: var(--b2-color);
            border: 1px solid var(--b2-color);
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
          // #bundle > .defalutInput;
          height: 32px;
          line-height: 30px;
          color: #292F43;
          border: 1px solid #dbdde8;
          border-radius: 3px;
          padding-right: 32px;
        }
      }
      .modalBtn{
        position: relative;
        top: 0;
        right: 0;
        margin-top: 10px;
        button{
          // #bundle > .defalutBtn;
          span{
            color: inherit;
          }
          &, &.result_save {
            // #bundle > .defalutBtn;
            font-size: 12px;
            height: 32px;
            line-height: 1;
            padding: 0 16px;
            border-radius: 3px;
            border: 1px solid var(--b2-color);

            & * {
              font-size: 12px;
              width: 100%;
            }
            color: var(--b2-color);
            border-color: var(--b2-color);
            background-color: #fff;

            &:hover {
              // color: var(--b2-color);
              // border-color: var(--b2-color);
              opacity: .6;
            }
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
