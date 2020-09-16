<!--高级搜索弹框-->
<template>
  <my-dialog
    :title="title"
    :visible.sync="memberDialog"
    :show-close="true"
    :close-on-click-modal="false"
    :append-to-body="appendToBody"
    :modal-append-to-body="modalAppendToBody"
    class="dialog-div"
    @MyDialogClose="MyDialogClose"
  >
    <div
      v-loading="loading"
      class="ff-advanced-search"
    >
      <div class="ff-advanced-search-filter">
        <h5 class="ff-advanced-search-title">
          信息筛选
        </h5>
        <div class="ff-advanced-search-filter-data">
          <div class="ff-advanced-search-filter-group">
            <div class="ff-advanced-search--scroll">
              <ul>
                <li
                  v-for="(group, i) in groups"
                  class="ff-advanced-search--group-list"
                >
                  <h5
                    class="ff-advanced-search--group-title"
                    @click.stop="handleExpandIconClick(i)"
                  >
                    <span
                      class="el-tree-node__expand-icon el-icon-caret-right"
                      :class="{expanded: group.open}"
                    />
                    <span>{{ group.label }}</span>
                  </h5>
                  <el-collapse-transition>
                    <div
                      v-show="group.open"
                      class="ff-advanced-search--group-tree"
                    >
                      <ul>
                        <li
                          v-for="(tree, index) in group.trees"
                          class="ff-advanced-search--group-detail"
                        >
                          <el-checkbox
                            :value="tree.checked"
                            :disabled="tree.disabled"
                            @change="treeChange($event, i, index, tree)"
                          >
                            {{ tree.label }}
                          </el-checkbox>
                        </li>
                      </ul>
                    </div>
                  </el-collapse-transition>
                </li>
              </ul>
            </div>
          </div>
          <div class="ff-advanced-search-filter-content">
            <div class="ff-advanced-search--scroll">
              <ul>
                <li
                  v-for="(condition, i) in conditions"
                  class="ff-advanced-search--filter-list"
                >
                  <h5 class="ff-advanced-search--filter-title">
                    <span>{{ condition.label }}</span>
                    <span
                      class="ff-advanced-search--filter-delete"
                      @click="deleteFilter(condition, i)"
                    >
                      <i class="el-icon-close" />
                      <i class="el-icon-circle-close" />
                    </span>
                  </h5>
                  <div class="ff-advanced-search--filter-tree">
                    <ul>
                      <li
                        v-for="list in condition.count"
                        class="ff-advanced-search--filter-component"
                      >
                        <component
                          :is="condition.component"
                          :init-data="
                            condition.component === 'multipleDialog'?
                              condition.string :
                              (condition.more?
                                condition.value[list - 1] :
                                (condition.component === 'dropDownComponent'?
                                  condition.text :
                                  condition.value)
                              )"
                          :verify="verify"
                          :label="condition.label"
                          :lists="condition.lists"
                          :unit="condition.unit"
                          :multiple="condition.multiple"
                          :search="condition.search"
                          :get-data="condition.getData"
                          :type="condition.type"
                          @changeData="changeData($event, i, list - 1, condition.more)"
                        />
                        <button
                          v-if="condition.more"
                          class="ff-advanced-search--filter-btn ff-advanced-search--btn-add"
                          @click="filterAdd(i)"
                        >
                          <span>添加</span>
                        </button>
                        <button
                          v-if="condition.more && list === condition.count && list !== 1"
                          class="ff-advanced-search--filter-btn ff-advanced-search--btn-delete"
                          @click="filterDel(i, list - 1)"
                        >
                          <span>删除</span>
                        </button>
                        <p
                          v-if="condition.verify && controlVerify"
                          class="ff-advanced-search-verify"
                        >
                          请填写完整
                        </p>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="ff-advanced-search-result">
        <h5 class="ff-advanced-search-title">
          <span>已选条件</span>
          <i
            class="iconfont icon-lajitong"
            @click="clearAll"
          />
          <i
            class="iconfont icon-danchuangduoxuan-baocun"
            @click="saveTemplate"
          />
        </h5>
        <div class="ff-advanced-search--show">
          <div class="ff-advanced-search--scroll">
            <ul>
              <li
                v-for="(condition, i) in conditions"
                class="ff-advanced-search--show-li"
              >
                <span class="ff-advanced-search--show-title">{{ condition.label }}:</span>
                <p
                  class="ff-advanced-search--show-text"
                  v-html="condition.more?condition.text.join(',') : condition.text"
                />
              </li>
            </ul>
          </div>
        </div>
        <div class="ff-advanced-search-btns">
          <button
            class="ff-advanced-search--btn ff-advanced-search--btn-confirm"
            @click="confirm"
          >
            <span>确定</span>
          </button>
          <button
            class="ff-advanced-search--btn ff-advanced-search--btn-cancel"
            @click="cancel"
          >
            <span>取消</span>
          </button>
        </div>
      </div>
      <div
        v-if="showOrHidden"
        class="ff-advanced-search-modalDiv"
      >
        <div class="ff-advanced-search-modalCenter">
          <div class="ff-advanced-search-modalTitle">
            <span class="ff-advanced-search-modalText">{{ ChineseDictionary.POTX }}</span>
            <i
              class="iconfont icon-cha1"
              @click="showOrHidden = !showOrHidden"
            />
          </div>
          <div class="ff-advanced-search-modalContent">
            <i class="iconfont ff-advanced-search-muBan">&#xe637;</i>
            <div class="ff-advanced-search-textCenter">
              {{ ChineseDictionary.PAGENAME }}：<input
                v-model.trim="module_name"
                type="text"
              >
            </div>
            <div class="ff-advanced-search-modalBtn">
              <button
                class="ff-advanced-search-btn"
                @click="result_save"
              >
                <span>{{ ChineseDictionary.ENSURE }}</span>
              </button>
              <button
                class="ff-advanced-search-btn"
                @click="showOrHidden = !showOrHidden"
              >
                <span>{{ ChineseDictionary.CANCEL }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="errorDialog"
        class="fk-advanced-search-error-dialog"
      >
        <div class="fk-advanced-search-error-dialog-box">
          <div class="fk-advanced-search-error-dialog-title">
            警告
            <span class="fk-advanced-search-error-icon">
              <i
                class="iconfont icon-cha1"
                @click="errorDialog = false"
              />
            </span>
          </div>
          <div class="fk-advanced-search-error-dialog-body">
            <div class="fk-advanced-search-body-top">
              <div class="fk-advanced-search-body-top-left">
                <i class="iconfont">&#xe631;</i>
              </div>
              <div class="fk-advanced-search-body-top-right">
                <p v-for="(list, index) in errorData">
                  {{ list.message }}
                </p>
              </div>
            </div>
            <div class="fk-advanced-search-body-bottom">
              <el-button @click="errorDialogClose">
                确定
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </my-dialog>
</template>
<style lang="less" type="text/less">
  .ff-advanced-search {
    .ff-advanced-search-verify {
      color: #f52f2f;
      margin-top: 6px;
    }
    .el-checkbox__input {
      .el-checkbox__inner {
        width: 12px;
        height: 12px;
        margin-top: 2px;
      }
    }
    .ff-search-range-gap {
      color: #575757;
    }
    .ff-advanced-search--scroll {
      .el-tree-node__expand-icon {
        border: none;
      }
    }
  }
</style>
<style lang="less" scoped type="text/less">
  @border-color: #DEDEDE;
  @font-color: #FD6442;
  .border-class () {
    border: 1px solid @border-color;
    border-radius: 12px;
  }
  .ff-advanced-search {
    //position: relative;
    color: #575757;
    min-width: 1000px;
    height: 520px;
    display: flex;
    .ff-advanced-search--scroll {
      width: 100%;
      padding-right: 18px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .ff-advanced-search-filter, .ff-advanced-search-result {
      flex: 1;
      box-sizing: border-box;
      padding: 6px 10px 0;
      .border-class();
      .ff-advanced-search-title {
        font-weight: 400;
        line-height: 30px;
        height: 30px;
        box-sizing: border-box;
        padding: 0 6px;
        overflow: hidden;
        border-bottom: 1px solid @border-color;
      }
    }
    .ff-advanced-search-filter {
      flex: 3;
      margin-right: 16px;
      .ff-advanced-search-filter-data {
        display: flex;
        height: 482px;
      }
      .ff-advanced-search-filter-group, .ff-advanced-search-filter-content {
        padding: 14px 6px 0 0;
      }
      /*分组*/
      .ff-advanced-search-filter-group {
        flex: 4;
        overflow: hidden;
        border-right: 1px solid @border-color;
        .ff-advanced-search--group-list {
          margin-bottom: 6px;
        }
        .el-tree-node__expand-icon {
          color: #505050;
        }
        .ff-advanced-search--group-title {
          font-weight: 400;
          height: 23px;
          line-height: 23px;
          background-color: #F8F8F8;
        }
        .ff-advanced-search--group-tree {
          padding: 14px 0 14px 24px;
        }
        .ff-advanced-search--group-detail {
          margin-bottom: 2px;
        }
      }
      /*分组勾选的内容*/
      .ff-advanced-search-filter-content {
        padding-left: 17px;
        overflow-x: hidden;
        flex: 11;
        .ff-advanced-search--filter-list {

        }
        .ff-advanced-search--filter-title {
          display: flex;
          align-items: center;
          font-weight: 400;
          justify-content: space-between;
          background-color: #F5F6FA;
          margin-bottom: 12px;
          padding: 0 9px;
          height: 24px;
        }
        .ff-advanced-search--filter-delete {
          cursor: pointer;
          color: #CCC;
          .el-icon-circle-close {
            display: none;
            font-size: 17px;
            color: #EC0D0D;
          }
          &:hover {
            .el-icon-close {
              display: none;
            }
            .el-icon-circle-close {
              display: inherit;
            }
          }
        }
        .ff-advanced-search--filter-component {
          padding-bottom: 12px;
          .ff-advanced-search--filter-btn {
            padding: 5px 8px;
            border-radius: 4px;
            border: 1px solid;
            background-color: #fff;
          }
          .ff-advanced-search--btn-add {
            color: #FD6442;
            &:hover {
              color: rgba(253, 100, 66, .7)
            }
          }
          .ff-advanced-search--btn-delete {
            border-color: #DCDCDC;
            color: #575757;
            &:hover {
              color: rgba(87, 87, 87, .7);
              border-color: rgba(220, 220, 220, .7);
            }
          }
        }
      }
    }
    .ff-advanced-search-result {
      .icon-lajitong, .icon-danchuangduoxuan-baocun {
        color: @font-color;
        cursor: pointer;
        font-size: 15px;
        float: right;
        line-height: 15px;
        margin-top: 10px;
      }
      .icon-danchuangduoxuan-baocun {
        margin-right: 4px;
      }
      .ff-advanced-search--show {
        height: 440px;
        padding-top: 20px;
        border-bottom: 1px solid @border-color;
        box-sizing: border-box;
        overflow-x: hidden;
      }
      .ff-advanced-search--show-li {
        overflow: hidden;
        padding-left: 14px;
        margin-bottom: 5px;
        clear: both;
      }
      .ff-advanced-search--show-title {
        float: left;
        box-sizing: border-box;
        width: 100px;
        margin-right: 4px;
        line-height: 25px;
      }
      .ff-advanced-search--show-text {
        color: #FD6442;
        line-height: 25px;
      }
      .ff-advanced-search--scroll {
        padding-right: 12px;
      }
      .ff-advanced-search-btns {
        text-align: right;
      }
      .ff-advanced-search--btn-confirm {
        color: #fff;
        margin-right: 4px;
        background-color: #FD6442;
      }
      .ff-advanced-search--btn-cancel {
        color: #FD6442;
        background-color: #fff;
      }
      .ff-advanced-search--btn {
        border: 1px solid #FD6442;
        margin-top: 8px;
        border-radius: 2px;
        padding: 3px 7px;
        &:hover {
          opacity: .7;
        }
      }
    }
    /*模板弹框*/
    .ff-advanced-search-modalDiv {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 100;
      position: absolute;
      top: 0;
      left: 0;
      .ff-advanced-search-modalCenter {
        width: 418px;
        height: 152px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -210px;
        margin-top: -71px;
        background-color: #fff;
        border: 1px solid #f8f7f7;
        border-radius: 12px;
        overflow: hidden;
      }
      .ff-advanced-search-modalTitle {
        height: 28px;
        width: 100%;
        line-height: 28px;
        text-align: center;
        background-color: #f8f7f7;
        border-bottom: 1px solid #bcbcbc;
      }
      .ff-advanced-search-modalTitle .icon-cha1 {
        width: 14px;
        height: 14px;
        font-size: 16px;
        position: absolute;
        /*top: 8px;*/
        right: 10px;
        cursor: pointer;
      }
      .ff-advanced-search-modalContent .ff-advanced-search-muBan {
        position: absolute;
        top: 39px;
        left: 50%;
        font-size: 28px;
        margin-left: -14px;
        display: block;
        width: 28px;
        height: 28px;
        color: #09A155;
      }
      .ff-advanced-search-textCenter {
        margin: 48px 0 0 60px;
      }
      .ff-advanced-search-textCenter input {
        border: 1px solid #d8d8d8;
        width: 228px;
        height: 22px;
        padding: 0 5px;
        border-radius: 2px;
        font-size: 12px;
        color: #575757;
        &:focus {
          border-color: #0f8ee9;
        }
      }
      .ff-advanced-search-modalBtn {
        position: absolute;
        bottom: 10px;
        right: 40px;
      }
      .ff-advanced-search-modalBtn .ff-advanced-search-btn {
        padding: 0 18px;
        width: 66px;
        height: 24px;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid;
        color: #FD6442;
        font-size: 12px;
        border-radius: 2px;
        span {
          color: #FD6442;
        }
        &:hover {
          background-color: rgba(253, 100, 66, .3);
          color: rgba(253, 100, 66, .6);
        }
      }
    }
  }
</style>
<style lang="less" type="text/less">
  .ff-advanced-search {
    .fk-advanced-search-error-dialog {
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 100;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .fk-advanced-search-error-dialog-box {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 10px;
        width: 400px;
        height: 140px;
        overflow: hidden;
        margin: auto;
        .fk-advanced-search-error-dialog-title {
          line-height: 30px;
          text-align: center;
          position: relative;
          background-color: #f7b901;
          color: #fff;
          font-size: 13px;
          .fk-advanced-search-error-icon {
            position: absolute;
            width: 16px;
            height: 16px;
            right: 8px;
            .icon-cha1 {
              font-size: 18px;
              cursor: pointer;
            }
          }
        }
        .fk-advanced-search-error-dialog-body {
          height: 110px;
          background-color: #fff;
          box-sizing: border-box;
          align-items: center;
          padding: 20px;
          .fk-advanced-search-body-top {
            display: flex;
            .fk-advanced-search-body-top-left i{
              font-size: 30px;
              color: #f7b901;
            }
            .fk-advanced-search-body-top-right {
              margin-left: 10px;
              p {
                line-height: 20px;
              }
            }
          }
          .fk-advanced-search-body-bottom {
            margin-top: 10px;
            text-align: right;
            button {
              height: 24px;
              width: auto;
              margin-right: 8px;
              margin-left: 0px;
              padding: 0 8px;
              background: #fff;
              color: #fd6442;
              border: 1px solid #fd6442;
              border-radius: 2px;
              font-size: 12px;
              &:hover {
                border-color: rgba(253, 100, 66, .6);
                color: rgba(253, 100, 66, .6)
              }
            }
          }
        }
      }
    }
  }
</style>
<script>
  import $http from 'framework/__utils__/request';
  import ChineseDictionary from '@/assets/js/ChineseDictionary.js';
  import MyDialog from 'framework/components/dialog/mydialog.vue';
  import {
    importComponent, radioComponent, checkedComponent, complexSelect, dropSelect, tagComponent, proComponent, range, rangeComplex, multipleDialog, dropDownComponent
  } from './serachComponents';

  export default {
    props: {
      tablename: {
        type: String,
        default: ''
      }, // 表名
      tableid: {
        type: [String, Number],
        default: ''
      }, // 表id
      appendToBody: {
        type: Boolean,
        default: true
      }, // 是否将弹框放在body
      modalAppendToBody: {
        type: Boolean,
        default: true
      }, // 蒙层是否放在body
      searchConditions: {}, // 已选中的数据
    },
    components: {
      MyDialog,
      importComponent,
      radioComponent,
      checkedComponent,
      complexSelect,
      dropSelect,
      tagComponent,
      proComponent,
      range,
      rangeComplex,
      multipleDialog,
      dropDownComponent
    },
    data() {
      return {
        loading: false, // 保存loading
        title: '会员高级搜索', // 弹框标题
        memberDialog: true, // 会员弹框显示
        groups: [
          {
            label: '基础信息',
            open: true, // 是否展开
            trees: [
              {
                label: '会员卡号',
                checked: false,
                disabled: false,
                component: 'importComponent',
                module: 'VP_C_VIP_ACC',
                key: 'VIP_IMPORTANT',
                count: 1
              },
              {
                label: '手机号',
                checked: false,
                disabled: false,
                component: 'importComponent',
                module: 'VP_C_VIP_ACC',
                key: 'VIP_IMPORTANT',
                count: 1
              },
              {
                label: '性别',
                checked: false,
                component: 'radioComponent',
                disabled: false,
                lists: [
                  {
                    label: '男',
                    text: '男',
                    value: 'M'
                  },
                  {
                    label: '女',
                    text: '女',
                    value: 'W'
                  },
                  {
                    label: '保密',
                    text: '保密',
                    value: 'X'
                  }
                ],
                module: 'VP_C_VIP',
                key: 'SEX',
                count: 1
              },
              {
                label: '会员类型/等级',
                checked: false,
                disabled: false,
                component: 'complexSelect',
                module: 'VP_C_VIP_ACC',
                key: 'VP_C_VIPTYPE_ID',
                count: 1
              },
              {
                label: '开卡日期',
                checked: false,
                disabled: false,
                type: 'date',
                component: 'range',
                module: 'VP_C_VIP_ACC',
                key: 'OPENDATE',
                count: 1,
                more: true
              },
              {
                label: '地区',
                checked: false,
                disabled: false,
                component: 'proComponent',
                module: 'VP_C_VIP',
                key: 'AREA',
                count: 1,
                more: true
              },
              {
                label: '可用积分',
                checked: false,
                disabled: false,
                type: 'number',
                component: 'range',
                module: 'VP_C_VIP_ACC',
                key: 'INTE',
                count: 1,
                more: true
              },
              {
                label: '是否关注公众号',
                checked: false,
                disabled: false,
                component: 'checkedComponent',
                module: 'VP_C_VIP_DETAILS',
                key: 'IS_FOCUS',
                count: 1,
                lists: [
                  {
                    label: '未关注',
                    value: '0'
                  },
                  {
                    label: '已关注',
                    value: '1'
                  },
                  {
                    label: '已取关',
                    value: '2'
                  }
                ]
              },
              {
                label: '微信小程序是否绑卡',
                checked: false,
                disabled: false,
                component: 'radioComponent',
                lists: [
                  {
                    label: '是',
                    text: '是',
                    value: '1'
                  },
                  {
                    label: '否',
                    text: '否',
                    value: '0'
                  }
                ],
                module: 'VPCRM_DETAILS_PRO',
                key: 'IS_BIND1',
                count: 1
              },
              {
                label: '微信会员卡是否绑卡',
                checked: false,
                disabled: false,
                component: 'radioComponent',
                lists: [
                  {
                    label: '是',
                    text: '是',
                    value: '1'
                  },
                  {
                    label: '否',
                    text: '否',
                    value: '0'
                  }
                ],
                module: 'VPCRM_DETAILS_PRO',
                key: 'IS_BIND2',
                count: 1
              },
              {
                label: '淘宝是否绑卡',
                checked: false,
                disabled: false,
                component: 'radioComponent',
                lists: [
                  {
                    label: '是',
                    text: '是',
                    value: '1'
                  },
                  {
                    label: '否',
                    text: '否',
                    value: '0'
                  }
                ],
                module: 'VPCRM_DETAILS_PRO',
                key: 'IS_BIND3',
                count: 1
              },
              {
                label: '会员标签',
                checked: false,
                disabled: false,
                component: 'tagComponent',
                module: 'VP_C_VIP_ACC',
                key: 'TXTDIM7',
                count: 1
              },
              /* {
                label: '商品标签',
                checked: false,
                disabled: false,
                component: 'tagComponent',
                module: 'VP_C_VIP_ACC',
                key: 'TXTDIM6',
                count: 1
              } */
            ]
          },
          /* {
            label: '所属关系',
            open: false,//是否展开
            trees: [
              {
                label: '专属导购',
                checked: false,
                disabled: false,
                component: 'dropDownComponent',
                module: 'VP_C_VIP_ACC',
                key: 'NUMDIM1',
                search: {
                  "coldesc": "专属导购",
                  "colname": "EXCLUSIVE_SHOPPER_ID",
                  "isuppercase": false,
                  "display": "OBJ_FK",
                  "colid": 165092,
                  "inputname": "EXCLUSIVE_SHOPPER_ID:ENAME",
                  "fkobj": {
                    "reftable": "CP_C_EMP",
                    "fkdisplay": "drp",
                    "reftableid": 23191,
                    "url": "",
                    "option": null,
                    "searchmodel": "drp"
                  }
                },
                count: 1
              },//下拉单选
              {
                label: '专属门店',
                checked: false,
                disabled: false,
                component: 'multipleDialog',
                module: 'VP_C_VIP_ACC',
                key: 'NUMDIM2',
                count: 1
              },
              {
                label: '开卡门店',
                checked: false,
                disabled: false,
                component: 'multipleDialog',
                module: 'VP_C_VIP_ACC',
                key: 'CP_C_STORE_ID',
                count: 1
              },
              {
                label: '开卡导购',
                checked: false,
                disabled: false,
                component: 'dropDownComponent',
                module: 'VP_C_VIP_ACC',
                key: 'CP_C_SALER_ID',
                search: {
                  coldesc: "开卡导购",
                  colname: "CP_C_SALER_ID",
                  isuppercase: false,
                  display: "OBJ_FK",
                  colid: 164674,
                  inputname: "CP_C_SALER_ID:ENAME",
                  fkobj: {
                    reftable: "CP_C_EMP",
                    fkdisplay: "drp",
                    reftableid: 23191,
                    url: "",
                    option: null,
                    searchmodel: "drp"
                  },
                  default: ''//默认值
                },
                count: 1
              },//下拉单选
              {
                label: '开卡渠道',
                checked: false,
                disabled: false,
                component: 'dropSelect',
                getData: function (cb) {
                  let arr = [
                    {
                      label: '小程序',
                      value: 1
                    },
                    {
                      label: '微信',
                      value: 2
                    },
                    {
                      label: '淘宝',
                      value: 3
                    },
                    {
                      label: '京东',
                      value: 4
                    },
                    {
                      label: '门店POS',
                      value: 5
                    },
                    {
                      label: '蘑菇街',
                      value: 6
                    }
                  ]
                  cb(arr);
                },
                multiple: true,
                module: 'VP_C_VIP_ACC',
                key: 'TXTDIM1',
                count: 1
              },
              {
                label: '活跃门店',
                checked: false,
                disabled: false,
                component: 'multipleDialog',
                module: 'VP_C_VIP_ACC',
                key: 'NUMDIM3',
                count: 1
              }
            ]
          }, */
          {
            label: '消费属性',
            open: false, // 是否展开
            trees: [
              {
                label: '最近一次消费日期',
                checked: false,
                disabled: false,
                type: 'dateShortcut',
                component: 'range',
                module: 'VP_C_VIP_ACC',
                key: 'LASTDATE',
                count: 1,
                more: true
              },
              {
                label: '累计消费金额',
                checked: false,
                disabled: false,
                component: 'rangeComplex',
                module: 'VP_C_VIP_ACC',
                key: 'AMT_ACTUAL',
                unit: '元',
                count: 1,
                more: true
              },
              {
                label: '消费次数',
                checked: false,
                disabled: false,
                unit: '次',
                component: 'rangeComplex',
                module: 'VP_C_VIP_ACC',
                key: 'TIMES',
                count: 1,
                more: true
              },
              {
                label: '连带率',
                checked: false,
                disabled: false,
                unit: '%',
                component: 'rangeComplex',
                module: 'VP_C_VIP_ACC',
                key: 'JOINT_RATE',
                count: 1,
                more: true
              },
              {
                label: '平均客单价',
                checked: false,
                disabled: false,
                unit: '元',
                component: 'rangeComplex',
                module: 'VP_C_VIP_ACC',
                key: 'AVG_TIME_ACTUAL',
                count: 1,
                more: true
              }
            ]
          },
          {
            label: '生命周期',
            open: false, // 是否展开
            trees: [
              {
                label: '新老会员',
                checked: false,
                disabled: false,
                component: 'radioComponent',
                lists: [
                  {
                    label: '新会员',
                    value: '1'
                  },
                  {
                    label: '老会员',
                    value: '2'
                  }
                ],
                module: 'BIG_DATA',
                key: 'IS_OLD_VIP',
                count: 1
              },
              {
                label: '活动程度',
                checked: false,
                disabled: false,
                component: 'checkedComponent',
                module: 'BIG_DATA',
                key: 'VIP_LIVE',
                count: 1,
                lists: [
                  {
                    label: '活跃会员',
                    value: '1'
                  },
                  {
                    label: '不活跃会员',
                    value: '2'
                  },
                  {
                    label: '沉睡会员',
                    value: '3'
                  },
                  {
                    label: '流失会员',
                    value: '4'
                  }
                ]
              }
            ]
          }
        ], // 分组
        conditions: [], // 勾选出的条件
        verify: false, // 校验(已废弃,但不要删除,也不要改变)
        controlVerify: false, // 用于选择条件时隐藏未填写的警告
        showOrHidden: false, // 控制模板弹框显示
        ChineseDictionary: '',
        module_name: '', // 模板名字
        errorData: [{ message: '模板名称不能为空' }], // 弹框内容
        errorDialog: false, // 控制错误弹框
      };
    },
    created() {
      this.ChineseDictionary = ChineseDictionary;
    },
    mounted() {
      if (this.searchConditions) {
        const str = typeof this.searchConditions === 'object' ? false : JSON.parse(this.searchConditions);
        if (!str) return;
        this.conditions = str.restore;
        this.conditions.map((obj) => {
          const arr = obj.id.split('-');
          this.groups[arr[0]].open = true;
          this.groups[arr[0]].trees[arr[1]].checked = true;
        });
        if (this.groups[0].trees[0].checked) {
          this.groups[0].trees[1].disabled = true;
        } else if (this.groups[0].trees[1].checked) {
          this.groups[0].trees[0].disabled = true;
        }
      }
    },
    methods: {
      /* 关闭模板错误弹框 */
      errorDialogClose() {
        this.errorDialog = false;
      },
      /* 模板保存 */
      result_save() {
        if (this.module_name === '') return this.errorDialog = true;
      },
      /* 模板弹框 */
      saveTemplate() {
        this.showOrHidden = true;
      },
      /* 确认 */
      confirm() {
        let flag = 0;
        const obj = {};
        this.conditions.forEach((n) => {
          // 多选或多选弹框或下拉多选或more = true为数组
          if (!obj[n.module]) {
            obj[n.module] = {};
          }
          obj[n.module][n.key] = n.value;
          if (Array.isArray(n.value)) {
            if (n.value.length === 0) {
              flag++;
              n.verify = true;
            } else if (n.more && n.value.length !== n.count) {
              flag++;
              n.verify = true;
            } else {
              n.verify = false;
            }
          } else {
            n.verify = n.value === '';
            n.value === '' ? flag++ : '';
          }
        });
        if (flag) return this.controlVerify = true;
        // 值被清空
        if (Object.keys(obj).length === 0) {
          this.$emit('advancedData', false);
          this.$emit('dialogClose');
          return;
        }
        // 没有改变
        if (this.searchConditions) {
          const str = typeof this.searchConditions === 'object' ? false : JSON.parse(this.searchConditions);
          if (str) {
            if (JSON.stringify(str.restore) == JSON.stringify(this.conditions)) return this.$emit('dialogClose');
          }
        }
        this.loading = true;
        $http({
          url: '/p/cs/vipseniorsearch',
          method: 'post',
          data: {
            param: JSON.stringify(obj)
          }
        }).then((res) => {
          const data = res.data;
          this.loading = false;
          if (data.code === 0) {
            this.$message.success('搜索成功');
            this.$emit('advancedData', JSON.stringify({
              count: data.data.total,
              condition: obj,
              restore: this.conditions
            }));
          } else {
            this.$emit('advancedData', false);
          }
          this.$emit('dialogClose');
        }).catch((_) => {
          this.$emit('dialogClose');
          this.$emit('advancedData', false);
          this.loading = false;
        });
      },
      /* 清空所有选择的 */
      clearAll() {
        this.conditions = [];
        this.groups = this.groups.map((obj) => {
          const arr = obj.trees.map(data => Object.assign({}, data, {
            disabled: false,
            checked: false
          }));
          return Object.assign({}, obj, {
            trees: arr
          });
        });
      },
      /* 关闭弹框 */
      cancel() {
        this.$emit('dialogClose');
      },
      /* 删除条件 */
      filterDel(index, sub) {
        this.conditions[index].count--;
        this.conditions[index].value.splice(sub, 1);
        this.conditions[index].text.splice(sub, 1);
      },
      /* 筛选条件+1 */
      filterAdd(index) {
        this.conditions[index].count++;
      },
      /* 更新筛选数据 */
      changeData(val, index, sub, more) {
        if (more) {
          this.conditions[index].value[sub] = val.value;
          this.$set(this.conditions[index].text, [sub], val.text);
        } else {
          this.conditions[index].value = val.value;
          this.$set(this.conditions[index], 'text', val.text);
          if (val.multipleData) {
            this.conditions[index].string = val.multipleData;
          }
        }
      },
      /* 关闭会员高级搜索弹框 */
      MyDialogClose() {
        this.$emit('dialogClose');
      },
      /* 打开节点 */
      handleExpandIconClick(index) {
        this.groups[index].open = !this.groups[index].open;
      },
      /* 勾选相应的组件 */
      treeChange(flag, i, index, val) {
        this.controlVerify = false;
        this.groups[i].trees[index].checked = flag;
        const sub = this.groups[i].trees.findIndex(n => n.key === val.key && n.label !== val.label);
        if (sub != -1) {
          this.groups[i].trees[sub].disabled = flag;
        }
        if (flag) {
          this.conditions.push({
            module: val.module, // 表示属于哪个模块下的
            key: val.key, // 表示传给后台的字段
            count: val.count, // 表示组件个数
            more: !!val.more, // 表示是否会有多个这样的组件
            value: val.more ? [] : '', // 传给后台的数据
            text: val.more ? [] : '', // 显示的字段
            multiple: !!val.multiple, // 多选
            getData: val.getData ? val.getData : function (cb) {
              cb([]);
            }, // 用于获取下拉列表数据
            type: val.type ? val.type : '', // 区间类型
            id: `${i}-${index}`,
            unit: val.unit ? val.unit : '', // 单位
            label: val.label, // 标名
            component: val.component, // 对应的组件
            lists: val.lists, // 单选多选数据列表
            verify: false, // 用于验证
            search: val.search, // 用于弹框单选和多选
            string: '', // 为多选弹框准备的(编辑时)
          });
        } else {
          this.conditions = this.conditions.filter(n => n.id !== `${i}-${index}`);
        }
      },
      /* 删除筛选出的条件 */
      deleteFilter(val, index) {
        this.conditions.splice(index, 1);
        const id = val.id.split('-');
        this.groups[id[0]].trees[id[1]].checked = false;
        const sub = this.groups[id[0]].trees.findIndex(n => n.key === val.key && n.label !== val.label);
        if (sub != -1) {
          this.groups[id[0]].trees[sub].disabled = false;
        }
      },
    }
  };
</script>
