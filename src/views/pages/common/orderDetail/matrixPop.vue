<template>
  <div
    v-loading="saveLoading"
    class="ff-matrix--table"
    :class="{'ff-matrix--min-table': general}"
  >
    <div
      v-if="general"
      class="ff-matrix--head"
      :class="{'ff-matrix--head-no-data' : !hasStock}"
    >
      <span>商品编码︰{{ encode }}</span>
      <span
        v-if="hasStock"
        class="ff-matrix--matching"
      >
        <!--数量匹配︰
          <label class="ff-matrix&#45;&#45;radio-one">
            <input type="radio" value="one" v-model="pickerG" /> 在库
          </label>
          <label>
            <input type="radio" value="two" v-model="pickerG" /> 可用
        </label>-->
        <button
          v-show="isStockBtn"
          class="ff-matrix-btn ff-matrix-btn-cancel"
          @click="matchStock"
        >
          <span>匹配在库</span>
        </button>
        <button
          v-show="isStockBtn"
          class="ff-matrix-btn ff-matrix-btn-cancel"
          @click="matchUsable"
        >
          <span>匹配可用</span>
        </button>
      </span>
      <span
        v-else
        class="ff-matrix--clear"
        @click="empty"
      >
        <i class="iconfont icon-qingkong" />
        {{ chinese.EMPTY }}
      </span>
    </div>
    <div
      v-if="general && hasStock"
      class="ff-matrix--choose"
    >
      <span>
        <span v-if="tablename!='SG_B_PHY_ADJUST'"> {{ tablename === 'DL_B_RETAIL'? '门店': '店仓' }}︰{{ store }}</span>
        <label
          v-if="isStoreFlag"
          class="ff-matrix--active-one ff-matrix--active-label"
        >
          <input
            v-model="stock"
            type="checkbox"
          >
          {{ hasReceiving? '发货在库' : '在库' }}
        </label>
        <label
          v-if="!cp_c_phy_warehouse_id || distribIds !== '' && isStoreFlag"
          class="ff-matrix--active-two ff-matrix--active-label"
        >
          <input
            v-model="usable"
            type="checkbox"
          >
          {{ hasReceiving? '发货可用' : '可用' }}
        </label>
        <label
          v-if="hasReceiving"
          class="ff-matrix--active-three ff-matrix--active-label"
        >
          <input
            v-model="stockReceiving"
            type="checkbox"
          > 收货在库
        </label>
        <label
          v-if="hasReceiving"
          class="ff-matrix--active-four ff-matrix--active-label"
        >
          <input
            v-model="usableReceiving"
            type="checkbox"
          > 收货可用
        </label>
        {{ hasReceiving? '' : '（ 彩色区为发货店仓库存情况 ）' }}
      </span>
      <span
        class="ff-matrix--clear"
        @click="empty"
      >
        <i class="iconfont">&#xe648;</i>
        {{ chinese.EMPTY }}
      </span>
    </div>
    <div
      v-if="reveal"
      class="ff-matrix--reveal-choose"
    >
      <label
        v-for="(list, index) of matchData.data"
        :key="index"
        :class="{'ff-matrix--radio-one': index === 0}"
      >
        <input
          v-model="pickerR"
          type="radio"
          :value="index"
        >
        {{ list.label }}
      </label>
      <!--<label>
        <input type="radio" :value="index" v-model="pickerR" :disabled="isdisabled" /> {{matchData.secondName}}
      </label>-->
    </div>
    <div
      class="ff-matrix--table-content"
      :class="{'ff-matrix--edit-reveal': edit || reveal, 'ff-matrix--reveal': reveal }"
    >
      <table>
        <thead>
          <tr class="ff-matrix--edit-color">
            <th class="ff-matrix-th-head">
              <div class="ff-matrix-th-head-box">
                <span>颜色</span>
                <span>尺寸</span>
              </div>
            </th>
            <th v-for="(size, index) of tHead">
              {{ size.name }}
            </th>
            <th class="ff-matrix-font--red">
              行合计
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, key, index) of tBody"
            :key="index"
          >
            <td class="ff-matrix--edit-color">
              {{ key }}
            </td>
            <td
              v-for="(list, sub) of tHead"
              :key="sub"
              class="ff-matrix--table-align"
            >
              <ul v-if="reveal">
                <li
                  v-if="value[list.name].count !== undefined"
                  class="ff-matrix--table-reveal"
                >
                  {{ value[list.name].count }}
                </li>
              </ul>
              <ul v-if="edit || general">
                <li
                  v-if="stock"
                  class="ff-matrix--active-one"
                >
                  {{ value[list.name].stock }}
                </li>
                <li
                  v-if="usable"
                  class="ff-matrix--active-two"
                >
                  {{ value[list.name].usable }}
                </li>
                <li
                  v-if="stockReceiving"
                  class="ff-matrix--active-three"
                >
                  {{ value[list.name].stockReceiving }}
                </li>
                <li
                  v-if="usableReceiving"
                  class="ff-matrix--active-four"
                >
                  {{ value[list.name].usableReceiving }}
                </li>
                <li
                  v-if="value[list.name].disabled"
                  class="ff-matrix--table-disabled"
                >
                  <span>{{ value[list.name].count }}</span>
                </li>
                <li
                  v-else
                  class="ff-matrix--table-compile"
                >
                  <input
                    v-if="value[list.name].count !== undefined"
                    slot="reference"
                    type="text"
                    :disabled="isdisabled || !isActive"
                    :data-id="`${index}-${sub}`"
                    :value="value[list.name].count"
                    class="ff-matrix--input"
                    :class="{'ff-matrix--input-tip': control[value[list.name].TAG],'ff-matrix--input-disabled': isdisabled || !isActive}"
                    @focus="inputFocus($event)"
                    @keyup.enter="keyEntry"
                    @input="countChange($event, key, list, value[list.name].TAG)"
                    @blur="inputBlur(value[list.name].TAG)"
                  >
                  <div
                    v-if="control[value[list.name].TAG]"
                    class="ff-input--prompt"
                  >
                    <i class="iconfont icon-caution" />
                    <span>输入值不能大于7位数</span>
                  </div>
                </li>
              </ul>
            </td>
            <td class="ff-matrix--table-align ff-matrix-font--red">
              <ul>
                <li v-if="stock" />
                <li v-if="usable" />
                <li v-if="stockReceiving" />
                <li v-if="usableReceiving" />
                <li>{{ calculateRow(value, tally, key) }}</li>
              </ul>
            </td>
          </tr>
          <tr class="ff-matrix--table-total">
            <td class="ff-matrix--edit-color">
              合计
            </td>
            <td
              v-for="(size, index) of tHead"
              class="ff-matrix--table-align"
            >
              {{ calculateLine(size, tally) }}
            </td>
            <td>{{ calculateTotal(tally) }}</td>
          </tr>
        </tbody>
      </table>
      <button
        v-if="reveal"
        class="ff-matrix-btn ff-matrix-btn-cancel"
        :disabled="!isActive || isdisabled"
        :class="{'ff-btn-disabled': !isActive || isdisabled}"
        @click="matching"
      >
        <span>{{ chinese.MATCH }}</span>
      </button>
    </div>
    <div
      v-if="general"
      class="ff-matrix--footer"
    >
      <!--<i class="iconfont icon-tishi "></i>-->
      <!--<span class="ff-matrix-hint">提示︰</span>-->
      <span class="ff-matrix--des" />
      <span>该矩形框表示︰条码档案不存在该条码！</span>
    </div>
    <div
      v-if="general"
      class="ff-matrix--box-btn"
    >
      <button
        ref="btnConfirm"
        class="ff-matrix-btn ff-matrix-btn-cancel"
        @click="confirm"
        @keyup.enter="confirm"
      >
        <span>{{ chinese.CONFIRM }}</span>
      </button>
      <button
        class="ff-matrix-btn ff-matrix-btn-cancel"
        @click="cancel"
      >
        <span>{{ chinese.CANCEL }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .span-style () {
    display: inline-block;
    width: 62px;
    height: 18px;
    box-sizing: border-box;
    padding: 0 4px;
    border-radius: 2px;
    border: 1px solid #e6e6e6;
    background-color: #f4f4f4;
  }

  .ff-matrix--min-table {
    max-width: 760px;
  }

  .ff-matrix--table {
    user-select: none;
    font-size: 12px;
    color: #575757;
    user-select: none;
    margin: 10px;

    .ff-matrix--active-one {
      background-color: #f9c89b;
    }

    .ff-matrix--active-two {
      background-color: #9bd0fc;
    }

    .ff-matrix--active-three {
      background-color: #aab5f7;
    }

    .ff-matrix--active-four {
      background-color: #c1e6b0;
    }

    input[type="radio"] {
      transform: translateY(2px);
    }

    .ff-matrix--head {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .ff-matrix--head-no-data {
      margin-bottom: 10px;
    }

    .ff-matrix--clear {
      display: inline-block;
      cursor: pointer;
      color: #0089ea;

      i {
        font-size: 16px;
      }
    }

    .ff-matrix--matching {
      .ff-matrix--radio-one {
        margin: 0 10px 0 5px;
      }
    }

    .ff-matrix--choose {
      display: flex;
      justify-content: space-between;
      margin: 16px 0 6px;

      & > span {
        display: flex;
        align-items: center;
      }

      .ff-matrix--active-label {
        padding: 0 10px;
        border-radius: 2px;
        box-sizing: border-box;
        min-width: 63px;
        height: 20px;
        line-height: normal;
        display: flex;
        align-items: center;
        margin: 0 2px 0 4px;

        input {
          margin-top: 2px;
        }
      }
    }

    .ff-matrix--reveal-choose {
      padding: 6px 0 12px 14px;

      .ff-matrix--radio-one {
        margin-right: 16px;
      }
    }

    .ff-matrix--table-content {
      overflow: scroll;
      .ff-matrix-font--red {
        color: #ed3838;
      }

      table {
        width: 100%;

        th {
          height: 34px;
          font-weight: bold;
        }

        th,
        td {
          border: 1px solid #e6e6e6;
          min-width: 80px;
          text-align: center;
          box-sizing: border-box;
          vertical-align: middle;
        }

        .ff-matrix-th-head {
          background: url("/static/img/matrix.jpg") no-repeat;
          background-size: 100% 100%;

          .ff-matrix-th-head-box {
            display: flex;
            align-items: center;
            height: 100%;

            span {
              flex: 1;
              text-align: center;
            }

            span:first-child {
              padding-top: 10px;
            }

            span:last-child {
              padding-bottom: 10px;
            }
          }
        }

        tr td:first-child {
          font-weight: bold;
        }

        .ff-matrix--table-align {
          text-align: center;

          li {
            min-height: 24px;
            max-height: 24px;
            border-bottom: 1px solid #e6e6e6;
            /*padding: 3px 14px;*/
            padding: 2px;
            box-sizing: border-box;
            text-align: center;
            line-height: 20px;

            &:last-child {
              border-bottom: none;
            }
          }

          .ff-matrix--table-reveal {
          }

          .ff-matrix--table-disabled {
            /*background-color: #F4F4F4;*/
            font-size: 0;
            color: #575757;

            span {
              display: inline-block;
              height: 20px;
              box-sizing: border-box;
              width: 100%;
              border: 1px solid #e6e6e6;
              background-color: #f4f4f4;
              font-size: 12px;
              line-height: 1.4;
              color: #575757;
            }
          }

          .ff-matrix--table-compile {
            position: relative;
            display: flex;
            justify-content: center;
            line-height: 1;

            input {
              /*width: calc(~"100% + 2px");*/
              /*position: absolute;*/
              /*width: 90px;*/
              width: 100%;
              height: 20px;
              box-sizing: border-box;
              padding: 0 4px;
              /*left: -1px;*/
              color: #575757;
              /*border: none;
                border-left: 1px solid #E6E6E6;
                border-right: 1px solid #E6E6E6;*/
              border: 1px solid #e6e6e6;
              transition: border-color 0.2s ease;
              text-align: center;

              &:focus {
                border: 1px solid #0f8ee9;
                /*height: 20px;*/
                /*z-index: 1;
                  top: -1px;*/
              }
            }

            .ff-matrix--input-tip {
              &:focus {
                border-color: #e80000;
              }
            }

            .ff-input--prompt {
              position: absolute;
              top: 100%;
              left: 50%;
              width: 140px;
              margin-top: 7px;
              transform: translateX(-50%);
              border-radius: 4px;
              padding: 7px 8px;
              z-index: 1;
              background-color: #fff;
              border: 1px solid #d8d8d8;

              &::before {
                position: absolute;
                content: "";
                width: 8px;
                height: 8px;
                top: -5px;
                border: 1px solid #d8d8d8;
                left: 50%;
                margin-right: 2px;
                border-bottom-color: transparent;
                border-right-color: transparent;
                background-color: #fff;
                transform: translateX(-50%) rotate(45deg);
              }

              i {
                font-size: 16px;
                color: #e80000;
              }
            }

            .ff-matrix--input-disabled {
              background-color: #f4f4f4;
            }
          }
        }
      }

      .ff-matrix--table-total {
        height: 25px;
        color: #ed3838;

        td {
          padding: 3px 14px;
        }
      }

      .ff-matrix--edit-color {
        background-color: #f5f6fa;
      }
    }

    /*以上公共样式*/
    .ff-matrix--edit-reveal {
      table {
        th,
        td {
          border-color: #d8d8d8;
        }

        .ff-matrix--table-align {
          li {
            border-color: #d8d8d8;
          }

          .ff-matrix--table-disabled {
            span {
              border-color: #d8d8d8;
            }
          }

          .ff-matrix--table-compile {
            input {
              border-color: #d8d8d8;
            }
          }
        }
      }
    }

    /*纯编辑和纯展示时候的样式*/
    .ff-matrix--footer {
      margin: 10px 0 20px;
      /*padding-left: 15px;*/
      box-sizing: border-box;

      i {
        color: #e80000;
        font-size: 15px;
      }

      .ff-matrix-hint {
        color: #e80000;
      }

      .ff-matrix--des {
        .span-style();
        width: 32px;
        height: 14px;
        vertical-align: middle;
        margin: 0 3px 1px;
      }
    }

    .ff-matrix--box-btn {
      padding-bottom: 10px;
    }

    .ff-matrix--box-btn,
    .ff-matrix--reveal,
    .ff-matrix--matching {
      text-align: right;

      .ff-matrix-btn {
        padding: 6px 21px;
        border-radius: 2px;
        box-sizing: border-box;
        user-select: none;
        /*transition: all .2s ease;*/
      }

      .ff-matrix-btn-confirm {
        background-color: #fd6442;
        margin-right: 3px;
        color: #fff;

        &:hover {
          background-color: rgba(253, 100, 66, 0.7);
        }
      }

      .ff-matrix-btn-cancel {
        color: #fd6442;
        padding: 3px 20px;
        border: 1px solid #fd6442;
        background-color: #fff;

        &:hover {
          opacity: 0.5;
        }

        &:first-child:focus {
          opacity: 0.5;
        }
      }

      .ff-btn-disabled {
        cursor: not-allowed;
        background-color: #e6e6e6;
        border: 1px solid #d8d8d8;

        &:hover {
          opacity: 1;
        }
      }
    }

    .ff-matrix--reveal {
      text-align: left;

      table {
        vertical-align: bottom;
        width: auto;
        display: inline-block;

        th,
        td {
          min-width: 63px;
        }

        .ff-matrix--table-align {
          /*li {
              padding: 3px 4px;
            }*/
        }
      }

      .ff-matrix--table-total {
        td {
          padding: 3px 4px;
        }
      }

      .ff-matrix-btn-cancel {
        padding: 4px 8px;
        margin-left: 15px;
      }
    }

    /*纯展示时候的样式*/
  }
</style><style>
  .ff-input--prompt {
    color: #575757;
  }
</style>

<script>
  import new_axios from 'axios';
  import R3 from '@syman/burgeon-r3';
  import axios from 'framework/__utils__/request';
  // import port from '../../../assets/js/connector';
  // import store from '@/__config__/store.config.js';
  import chineseDiction from 'framework/assets/js/ChineseDictionary.js';
  import port from '@/js/pages/common/orderDetail/connector.js';

  const { store } = R3;


  export default {
    props: {
      proEcodeFlag: { // 矩阵框商品新增时,接受父组件组件matrixInput传输标记,itemInputEnter方法需要用的标记
        type: Object,
      },
      encode: {
        type: String,
        default: ''
      }, // 商品编码
      reveal: {
        type: Boolean,
        default: false
      }, // true: 启动纯展示表格
      edit: {
        type: Boolean,
        default: false
      }, // true: 启动纯编辑表格
      general: {
        type: Boolean,
        default: false
      }, // true: 启动通用表格界面
      selectItem: {}, // 表数据
      objid: {}, // 表ID
      inputList: {
        type: Array,
        default: () => []
      }, // objitem数据
      tablename: {
        /* type: String,
        required: true */
      }, // 主表名
      objList: {}, // 配销中心信息
      loading: {
        type: Boolean,
        default: false
      }, // 用于获取数据
      matchTableData: {
        type: Object,
        default: () => ({})
      }, // 用于匹配编辑的库存和再用
      isdisabled: {
        type: Boolean,
        default: false
      }, // 用来禁用input框的
      isActive: Boolean, // 用来禁用input框的
      save: {},
      editsave: Boolean, // 判断编辑的时候主表是否保存完毕
      stopsave: Boolean,
      // distribIds: ,
      isStockBtn: {
        // 控制匹配在库&匹配可用按钮是否显示
        type: Boolean,
        default: true
      },
      // returnType: 
    },
    data() {
      return {
        /* lists: {
          color: [
            {
              ID: 232,
              ENAME: '白色'
            },
            {
              ID: 233,
              ENAME: '黑色'
            }
          ],
          size: [
            {
              ID: 1,
              ENAME: 'M'
            },
            {
              ID: 2,
              ENAME: 'L'
            },
            {
              ID: 3,
              ENAME: 'XL'
            },
            {
              ID: 4,
              ENAME: 'XXL'
            },
          ],
          sku: [
            {
              color: 232,
              size: 1,
              ecode: '7w506',
              id: 88,
              stock: 22,
              qty: 99,
              usable: 99
            },
            {
              color: 233,
              size: 1,
              ecode: '7t506',
              id: 66,
              stock: 44,
              qty: 33,
              usable: 6
            }
          ]
        }, */
        isStoreFlag: true,
        saveLoading: false, // 保存loading
        store: '杭州店仓', // 店仓名字
        tHead: [
          /* 'M','L','XL','XXL' */
        ], // 码数集合
        tColor: [], // color集合
        tBody: {
          /* '白色': [
            {
              stock: 2555,//在库
              usable: 682,//可用
              count: 0,//可编辑
              total: 0,//总计
              disabled: false,//true: 表示不可编辑 false:表示可编辑
            },
            {
              stock: 2555,//在库
              usable: 682,//可用
              count: 0,//可编辑
              total: 0,//总计
              disabled: true,//true: 表示不可编辑 false:表示可编辑
            },
            {
              stock: 2555,//在库
              usable: 682,//可用
              count: 0,//可编辑
              total: 0,//总计
              disabled: true,//true: 表示不可编辑 false:表示可编辑
            },
            {
              stock: 2555,//在库
              usable: 682,//可用
              count: 0,//可编辑
              total: 0,//总计
              disabled: true,//true: 表示不可编辑 false:表示可编辑
            }
          ] */
        }, // 内容
        stock: false, // 控制在库
        usable: false, // 控制可用
        chinese: chineseDiction, // 字段集合
        tally: 0, // 记录改变次数并且用来刷新数据的参数
        focusList: [], // 聚焦列表
        focusIndex: 0, // 聚焦的下标
        pickerR: 0, // 纯展示单选
        amendObj: {}, // 用于保存修改了的矩阵数据
        oldData: {}, // 用来做对比的老数据
        stockData: [], // 通用矩阵在库库存数据
        distribId: '', // 配销中心ID
        cp_c_phy_warehouse_id: '', // add by  wdq 20190521   实体仓逻辑
        hasStock: true, // 默认调取库存接口
        isFooter: false, // 是否显示提示
        SKUID: [], // 获取skuid集合
        control: {}, // 控制提示显示与否
        getStock: '', // 获取库存接口
        deliverStock: '', // 发货店仓
        takeStock: '', // 收货店仓
        matchData: {}, // 匹配的一些参数
        evenPoint: false, // 防止连点
        paramsObj: '', // 保存用的参数
        hasReceiving: false, // 显示收货在库和可用
        receivingData: [], // 通用矩阵收货在库可用数据
        stockReceiving: false, // 控制收货在库
        usableReceiving: false // 控制收货可用
      };
    },
    methods: {
      empty() {
        this.tally += 1; // 每次改变记录加1
        Object.keys(this.tBody).map((obj) => {
          Object.keys(this.tBody[obj]).map((data) => {
            if (
              this.tBody[obj][data].disabled
              || this.tBody[obj][data].count === ''
            ) { return; } // 不可编辑的或者本来就为空的直接跳过
            this.tBody[obj][data].count = ''; // 清空数据
            if (this.oldData[obj][data].count === this.tBody[obj][data].count) {
              // 无变化删除
              if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) { this.$delete(this.amendObj, this.tBody[obj][data].TAG); }
            } else if (
              this.oldData[obj][data].count != ''
              || this.tBody[obj][data].count != 0
            ) {
              this.amendObj[this.tBody[obj][data].TAG] = Object.assign(
                {},
                this.tBody[obj][data]
              );
            }
          });
        });
      }, // 清空
      matchStock() {
        if (!this.hasStock) return; // 不存在库存这些的
        this.tally += 1; // 每次改变记录加1
        Object.keys(this.tBody).map((obj) => {
          Object.keys(this.tBody[obj]).map((data) => {
            if (
              !this.tBody[obj][data].disabled
              && this.tBody[obj][data].count != this.tBody[obj][data].stock
              && this.tBody[obj][data].stock > 0
            ) {
              this.tBody[obj][data].count = this.tBody[obj][data].stock;
              if (this.oldData[obj][data].count == this.tBody[obj][data].count) {
                // 无变化删除
                if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) { this.$delete(this.amendObj, this.tBody[obj][data].TAG); }
              } else if (
                this.oldData[obj][data].count != ''
                || this.tBody[obj][data].count != 0
              ) {
                this.amendObj[this.tBody[obj][data].TAG] = Object.assign(
                  {},
                  this.tBody[obj][data]
                );
              }
            }
          });
        });
        this.$message({
          message: '匹配成功',
          type: 'success'
        });
        this.$emit('amendData', this.amendObj); // 向上传递改变的数据
      }, // 匹配在库
      matchUsable() {
        if (!this.hasStock) return; // 不存在库存这些的
        this.tally += 1; // 每次改变记录加1
        Object.keys(this.tBody).map((obj) => {
          Object.keys(this.tBody[obj]).map((data) => {
            if (
              !this.tBody[obj][data].disabled
              && this.tBody[obj][data].count != this.tBody[obj][data].usable
              && this.tBody[obj][data].usable > 0
            ) {
              this.tBody[obj][data].count = this.tBody[obj][data].usable;
              if (this.oldData[obj][data].count == this.tBody[obj][data].count) {
                // 无变化删除
                if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) { this.$delete(this.amendObj, this.tBody[obj][data].TAG); }
              } else if (
                this.oldData[obj][data].count != ''
                || this.tBody[obj][data].count != 0
              ) {
                this.amendObj[this.tBody[obj][data].TAG] = Object.assign(
                  {},
                  this.tBody[obj][data]
                );
              }
            }
          });
        });
        this.$message({
          message: '匹配成功',
          type: 'success'
        });
        this.$emit('amendData', this.amendObj);
      }, // 匹配可用
      calculateTotal(tally) {
        let total = 0;
        Object.keys(this.tBody).map((obj) => {
          Object.keys(this.tBody[obj]).map((data) => {
            if (this.tBody[obj][data].count === '-') {
              total += Number(this.oldData[obj][data].count);
            } else {
              total += Number(this.tBody[obj][data].count);
            }
          });
        });
        return total;
      }, // 计算总和
      inputBlur(val) {
        this.$set(this.control, [val], false);
      }, // 失焦提示关闭
      countChange(event, key, list, val) {
        this.tally += 1; // 每次改变记录加1
        const value = event.target.value;
        if (
          this.tablename !== 'DL_B_PAND'
          && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS'
          && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK'
          && this.tablename !== 'DL_B_PUR_REQ'
          && this.tablename !== 'DL_B_PUR_ORDER'
          && this.tablename !== 'DL_B_PUR_TMPIN'
            ? /^-/.test(value)
              ? value.length > 8
              : value.length > 7
            : value.length > 7
        ) {
          this.control[val] = true;
          setTimeout(() => {
            if (this.control === undefined) return;
            this.control[val] = false;
          }, 1500);
        }
        const isNum = this.tablename !== 'DL_B_PAND'
          && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS'
          && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK'
          && this.tablename !== 'DL_B_PUR_REQ'
          && this.tablename !== 'DL_B_PUR_ORDER'
          && this.tablename !== 'DL_B_PUR_TMPIN'
          ? /^-?[0-9]*$/.test(value)
          : /^[0-9]*$/.test(value);
        /* const isNum = /^[0-9]*$/.test(value);//判断输入的是否是数字(isNum && Number(value) !== 0) */
        this.$set(
          this.tBody[key][list.name],
          'count',
          (event.target.value = isNum
            ? this.tablename !== 'DL_B_PAND'
              && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK_POS'
              && this.tablename !== 'DL_B_INV_ADJ_WORK_PICK'
              && this.tablename !== 'DL_B_PUR_REQ'
              && this.tablename !== 'DL_B_PUR_ORDER'
              && this.tablename !== 'DL_B_PUR_TMPIN'
              ? /^-/.test(value)
                ? value.slice(0, 8)
                : value.slice(0, 7)
              : Number(value.slice(0, 7))
            : '')
        );
        if (value === '-') return;
        if (
          this.tBody[key][list.name].count === this.oldData[key][list.name].count
        ) {
          // 没有变化，删除amendObj中的这个数据
          if (this.amendObj[this.tBody[key][list.name].TAG] !== undefined) { this.$delete(this.amendObj, this.tBody[key][list.name].TAG); }
        } else {
          this.amendObj[this.tBody[key][list.name].TAG] = Object.assign(
            {},
            this.tBody[key][list.name]
          );
          /* if (this.general) {
            if (this.oldData[key][list.name].count == '' && this.tBody[key][list.name].count == 0) {
              if (this.amendObj[this.tBody[key][list.name].TAG] !== undefined) this.$delete(this.amendObj, this.tBody[key][list.name].TAG);
            } else {
              this.amendObj[this.tBody[key][list.name].TAG] = Object.assign({}, this.tBody[key][list.name]);
            }
            /!*if(this.oldData[key][list.name].count != '' || this.tBody[key][list.name].count != 0) {
              this.amendObj[this.tBody[key][list.name].TAG] = Object.assign({},this.tBody[key][list.name]);
            }else {
              if(this.amendObj[this.tBody[key][list.name].TAG] !== undefined)this.$delete(this.amendObj,this.tBody[key][list.name].TAG);
            }*!/
          } else {
            this.amendObj[this.tBody[key][list.name].TAG] = Object.assign({}, this.tBody[key][list.name]);
          } */
        }
        this.$emit('amendData', this.amendObj);
      }, // 数量改变
      calculateRow(val, tally, key) {
        let total = 0;
        Object.keys(val).map((obj) => {
          if (val[obj].count === '-') {
            total += Number(this.oldData[key][obj].count);
          } else {
            total += Number(val[obj].count);
          }
        });
        return total;
      }, // 计算行总计
      calculateLine(val, tally) {
        let total = 0;
        Object.keys(this.tBody).map((obj) => {
          if (this.tBody[obj][val.name].count === '-') {
            total += Number(this.oldData[obj][val.name].count);
          } else {
            total += Number(this.tBody[obj][val.name].count);
          }
        });
        return total;
      }, // 计算列总计
      confirm() {
        // 订单管理矩阵特殊处理
        if (this.tablename === 'OC_B_ORDER') {
          this.$emit('confirmOk', this.amendObj);
          return;
        } if (this.tablename === 'OC_B_RETURN_ORDER') {
          if (this.returnType === '1') this.$emit('confirmOk', this.amendObj, 1);
          else this.$emit('confirmOk', this.amendObj, 2);
          return;
        }
        // 触发这个页面的保存事件并传递数据
        if (this.evenPoint) return;
        this.evenPoint = true;
        if (Object.keys(this.amendObj).length === 0) {
          return this.$emit('refreshData', {
            status: false,
            clear: true // 是否清空input数据
          }); 
        } // 更新数据并关闭弹框//无变化
        const data = {};
        // data[`${(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`] = [];
        data[
          `${
            this.tablename === 'DL_B_TRAN_OUT'
            || this.tablename === 'DL_B_TRAN_OUT_POS'
              ? port[this.tablename].special
              : port[this.tablename].tableName
          }`
        ] = [];
        Object.keys(this.amendObj).map((keys) => {
          const obj = this.amendObj[keys];
          const tableObj = {
            ID: obj.ID === undefined ? -1 : obj.ID, // 明细ID = 子表ID
            PS_C_PRO_ECODE: this.encode, // 商品编码
            PS_C_SKU_ECODE: obj.PS_C_SKU_ECODE, // SKU编码
            PS_C_SKU_ID: obj.PS_C_SKU_ID // SKUID
          };
          if (this.tablename === 'DL_B_TRAN_PLAN') {
            tableObj.QTY_EXEC_PLAN = obj.count === '' ? 0 : obj.count; // 数量
          } else {
            tableObj.QTY = obj.count === '' ? 0 : obj.count; // 数量
          }
          if (obj.MATRIX_DATA) {
            if (obj.MATRIX_DATA.OLD_QTY_BILL !== undefined) {
              tableObj.OLD_QTY_BILL = obj.MATRIX_DATA.OLD_QTY_BILL;
            }
          }
          // data[`${(this.tablename === 'DL_B_TRAN_OUT' || this.tablename === 'DL_B_TRAN_OUT_POS') ? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`].push(tableObj)
          data[
            `${
              this.tablename === 'DL_B_TRAN_OUT'
              || this.tablename === 'DL_B_TRAN_OUT_POS'
                ? port[this.tablename].special
                : port[this.tablename].tableName
            }`
          ].push(tableObj);
        });
        const index = this.inputList.findIndex(
          n => n.cusurl === 'custompage/matrix'
        );
        if (this.objid == -1) {
          if (index !== -1) {
            this.$set(this.inputList[index], 'matrix', Object.assign({}, data));
            this.$emit('itemInputEnter', this.proEcodeFlag); // 条码或者箱的标识
            this.$emit('refreshData', {
              status: false,
              clear: false // 是否清空input数据
            }); // 新增不做刷新
          } else {
            this.$emit('newLySave', data);
            this.$emit('customize', JSON.parse(JSON.stringify(data)));
            this.$emit('refreshData', {
              status: false,
              clear: true // 是否清空input数据
            });
            setTimeout(() => {
              this.evenPoint = false;
            }, 2000);
          }
        } else {
          this.saveLoading = true;
          this.$set(this, 'paramsObj', data);
          this.$emit('objectEdit', data);
          this.$emit('refreshData', {
            status: false,
            clear: true // 是否清空input数据
          });
        }
      }, // 确认
      waitObjSave() {
        axios({
          url: port[this.tablename].amendBody,
          method: 'post',
          data: {
            table:
              this.tablename === 'DL_B_TRAN_OUT_POS'
                ? this.tablename.replace('_POS', '')
                : this.tablename, // 表名
            objid: this.objid, // 主表ID
            data: JSON.stringify(this.paramsObj)
          }
        })
          .then((res) => {
            const resData = res.data;
            this.$set(this, 'paramsObj', ''); // 初始化
            if (resData.code === 0) {
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            } else {
              let errorData;
              if (resData.data) {
                errorData = resData.data;
                errorData.unshift({
                  message: resData.message
                });
                store.commit('errorDialog', {
                  // 其它报错
                  message: {
                    data: errorData
                  }
                });
              } else {
                store.commit('errorDialog', {
                  // 其它报错
                  message: resData.message
                });
              }
            }
            /* else if(resData.message === undefined || (resData.ext && resData.ext.msgtype === 2)) {
                    let matrixData = res.data.data.error || res.data.data;
                    matrixData.unshift({message: res.data.message});
                    store.commit('errorDialog',{ //其它报错
                      message: {data: matrixData}
                    })
                  } */
            // 任何结果都关闭窗口
            this.saveLoading = false;
            this.$emit('changeEditSave');
            this.$emit('refreshData', {
              status: true,
              clear: true // 是否清空input数据
            }); // 更新数据并关闭弹框
          })
          .catch((error) => {
            // 任何结果都关闭窗口
            this.saveLoading = false;
            this.$emit('changeEditSave');
            this.$emit('refreshData', {
              status: true,
              clear: true // 是否清空input数据
            }); // 更新数据并关闭弹框
          });
      }, // 确认保存
      cancel() {
        this.$emit('refreshData', {
          status: false,
          clear: true // 是否清空input数据
        }); // 关闭弹框
      }, // 取消
      processData(val = [], label) {
        /* this.$set(this, 'tBody', {}); */
        this.isFooter = false;
        this.tColor.map((obj, index) => {
          this.$set(this.tBody, [obj.name], {});
          /* let arr = this.stockData.filter((sku) => sku['PS_C_CLR_ID'] === obj.id);//库存在用数据中获取出这个颜色的所有sku;//在用库存
          let arrVal = val.filter((sku) => sku['PS_C_CLR_ID'] === obj.id);//sku数据中获取出这个颜色的所有sku
          let skuids = this.SKUID.filter(id => id.PS_C_CLR_ID === obj.id);//获取这个颜色对应的所有SKUid */
          // 找不到返回空数组
          this.tHead.map((data, sub) => {
            if (this.reveal) {
              // 纯展示
              const stock = this.stockData.find(
                n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
              ); // 在用库存找出和这个尺寸对应的sku
              this.tBody[obj.name][data.name] = Object.assign(
                {},
                {
                  /* stock: stock === undefined? 0: stock['QTY_STORAGE'],//库存
                usable: stock === undefined? 0: stock['QTY_AVAILABLE'],//可用 */
                  count: stock === undefined ? 0 : stock[label], // 默认显示库存数量
                  TAG: `${index}-${sub}` // 唯一标识符
                }
              );
            } else if (this.edit || this.general) {
              const skuObj = this.SKUID.find(
                n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
              ); // 找出颜色尺寸ID对牢的sku
              if (skuObj === undefined) {
                this.tBody[obj.name][data.name] = Object.assign(
                  {
                    ID: -1 // 新增ID
                  },
                  {
                    // 表示黑掉
                    disabled: true, // 不可编辑
                    stock: 0, // 库存
                    usable: 0, // 可用
                    stockReceiving: 0, // 收货库存
                    usableReceiving: 0, // 收货可用
                    count: '', // 数量
                    TAG: `${index}-${sub}` // 唯一标识符
                  }
                );
                this.isFooter = true;
              } else if (skuObj.ISACTIVE === 'N') {
                const valObj = val.find(
                  n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
                ); // 矩阵数据中查出完全匹配颜色尺寸ID的数据
                const stock = this.stockData.find(
                  n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
                ); // 在用库存找出和这个尺寸对应的sku
                /* 收货在用库存找出和这个尺寸对应的sku */
                const receivingData = this.hasReceiving
                  ? this.receivingData.find(
                    n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
                  )
                  : {};
                this.tBody[obj.name][data.name] = Object.assign(
                  {
                    ID: -1 // 新增ID
                  },
                  {
                    // 表示黑掉
                    disabled: true, // 不可编辑
                    stock: this.hasStock
                      ? stock === undefined
                        ? 0
                        : stock.QTY_STORAGE
                      : 0, // 库存
                    usable: this.hasStock
                      ? stock === undefined
                        ? 0
                        : stock.QTY_AVAILABLE
                      : 0, // 可用
                    stockReceiving: this.hasReceiving
                      ? receivingData === undefined
                        ? 0
                        : receivingData.QTY_STORAGE
                      : 0, // 收货在库
                    usableReceiving: this.hasReceiving
                      ? receivingData === undefined
                        ? 0
                        : receivingData.QTY_AVAILABLE
                      : 0, // 收货可用
                    count:
                      valObj === undefined ? '' : valObj.MATRIX_DATA.QTY, // 数量
                    TAG: `${index}-${sub}` // 唯一标识符
                  }
                );
                this.isFooter = true;
              } else {
                this.$set(this.control, [`${index}-${sub}`], false);
                const valObj = val.find(
                  n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
                ); // 矩阵数据中查出完全匹配颜色尺寸ID的数据
                // let stock = this.stockData.find(n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id); //在用库存找出和这个尺寸对应的sku
                const stock = this.stockData.find(
                  n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
                );
                /* 收货在用库存找出和这个尺寸对应的sku */
                const receivingData = this.hasReceiving
                  ? this.receivingData.find(
                    n => n.PS_C_CLR_ID === obj.id && n.PS_C_SIZE_ID === data.id
                  )
                  : {};
                this.tBody[obj.name][data.name] = valObj === undefined
                  ? Object.assign(
                    {},
                    skuObj,
                    {
                      stock: this.hasStock
                        ? stock === undefined
                          ? 0
                          : stock.QTY_STORAGE
                        : 0, // 在库
                      usable: this.hasStock
                        ? stock === undefined
                          ? 0
                          : stock.QTY_AVAILABLE
                        : 0, // 可用
                      stockReceiving: this.hasReceiving
                        ? receivingData === undefined
                          ? 0
                          : receivingData.QTY_STORAGE
                        : 0, // 收货在库
                      usableReceiving: this.hasReceiving
                        ? receivingData === undefined
                          ? 0
                          : receivingData.QTY_AVAILABLE
                        : 0, // 收货可用
                      count: '', // 数量
                      control: false, // 控制提示框
                      TAG: `${index}-${sub}`, // 唯一标识符
                      disabled: false // true: 表示不可编辑 false:表示可编辑
                    },
                    data,
                    {
                      ID: -1 // 新增ID
                    }
                  )
                  : Object.assign({}, valObj, skuObj, {
                    stock: this.hasStock
                      ? stock === undefined
                        ? 0
                        : stock.QTY_STORAGE
                      : 0, // 在库
                    usable: this.hasStock
                      ? stock === undefined
                        ? 0
                        : stock.QTY_AVAILABLE
                      : 0, // 可用
                    stockReceiving: this.hasReceiving
                      ? receivingData === undefined
                        ? 0
                        : receivingData.QTY_STORAGE
                      : 0, // 收货在库
                    usableReceiving: this.hasReceiving
                      ? receivingData === undefined
                        ? 0
                        : receivingData.QTY_AVAILABLE
                      : 0, // 收货可用
                    TAG: `${index}-${sub}`, // 唯一标识符
                    control: false, // 控制提示框
                    count: valObj.MATRIX_DATA.QTY, // 可编辑(通用都为空，只有纯展示和编辑的时候用后台返回的)
                    disabled: false // true: 表示不可编辑 false:表示可编辑
                  });
              }
            }
          });
          /* let sku_id = skuids.find((n) => n['PS_C_SIZE_ID'] === data.id);//找到这个对应尺寸颜色的skuid
          if(!data.status || !obj.status) {//只要有一个禁用就全部禁用
            this.tBody[obj.name][data.name] = Object.assign({
              ID: -1,//新增ID
            },{//status  = false表示黑掉
              disabled: true,//不可编辑
              stock: 0,//库存
              usable: 0,//可用
              count: '',//数量
              TAG: `${index}-${sub}`//唯一标识符
            })
          }else {
            let stock = arr.find((n) => n['PS_C_SIZE_ID'] === data.id);//在用库存找出和这个尺寸对应的sku
            let skuArr = arrVal.find((n) => n['PS_C_SIZE_ID'] === data.id);//sku数据找出和这个尺寸对应的sku
            this.tBody[obj.name][data.name] = skuArr === undefined? Object.assign({},sku_id,{
                stock: this.hasStock?(stock === undefined? 0: stock['QTY_STORAGE']) : 0,//在库
                usable: this.hasStock?(stock === undefined? 0: stock['QTY_AVAILABLE']) : 0,//可用
                count: '',//数量
                TAG: `${index}-${sub}`,//唯一标识符
                disabled: false,//true: 表示不可编辑 false:表示可编辑
              },data,{
              ID: -1,//新增ID
            }) : Object.assign({},skuArr,{
              stock: this.hasStock?(stock === undefined? 0: stock['QTY_STORAGE']) : 0,//在库
              usable: this.hasStock?(stock === undefined? 0: stock['QTY_AVAILABLE']) : 0,//可用
              TAG: `${index}-${sub}`,//唯一标识符
              count: skuArr['MATRIX_DATA']['QTY_BILL'],//可编辑(通用都为空，只有纯展示和编辑的时候用后台返回的)
              disabled: false,//true: 表示不可编辑 false:表示可编辑
            })
          } */
          /* if(skuArr === undefined || !data.status) return this.tBody[obj.name][data.name] = {//status  = false表示黑掉
            disabled: true,//不可编辑
            stock: 0,//库存
            usable: 0,//可用
            count: ''//数量
          } */
        });
        if (this.reveal) return; // 不可能会修改的，因为没有输入框或者纯展示页面
        this.oldData = JSON.parse(JSON.stringify(this.tBody)); // 深复制
      }, // 处理数据
      getHeadData() {
        this.$set(this, 'tBody', {});
        return axios({
          url: port.matrix,
          method: 'get',
          params: {
            param: {
              ECODE: this.encode,
              CP_C_STORE_ID: this.distribId,
              CP_C_PHY_WAREHOUSE_ID: this.cp_c_phy_warehouse_id
            }
            /* 需更改配销中心获取 */
          }
        }).then((res) => {
          const data = res.data;
          if (data.code === 0) {
            const tHead = data.data.SIZE.map(obj => 
              /* if(!obj['STATUS']) this.isFooter = true; */
              Object.assign(obj, {
                id: obj.ID, // 尺寸id
                name: obj.ENAME // 尺寸名字
                /* status: obj['STATUS']//是否不可编辑状态 */
              }));
            this.tHead = tHead.sort((a, b) => a.MATRIXCOLNO - b.MATRIXCOLNO);
            this.tColor = data.data.COLOR.map(obj => 
              /* if(!obj['STATUS']) this.isFooter = true; */
              Object.assign(obj, {
                id: obj.ID, // 尺寸id
                name: obj.ENAME // 尺寸名字
                /* status: obj['STATUS']//是否不可编辑状态 */
              }));
            /* let tColor = data.data.COLOR.map((obj) => {
              /!*if(!obj['STATUS']) this.isFooter = true;*!/
              return Object.assign(obj, {
                id: obj.ID,//尺寸id
                name: obj.ENAME,//尺寸名字
                /!*status: obj['STATUS']//是否不可编辑状态*!/
              })
            });
            this.tColor = tColor.sort((a, b) => {
              console.log(Number(a.ECODE) - Number(b.ECODE))
              return Number(a.ECODE) - Number(b.ECODE)
            }); */
            // 以上先获取color和size集合
            this.SKUID = data.data.SKU;
          }
        });
      }, // 获取头部信息
      async getBodyData() {
        if (this.general) {
          // 通用矩阵
          if (this.hasStock) {
            await axios({
              // url: this.getStock,
              url: '/p/cs/sg/storage/queryCommonStorageByPro',
              method: 'post',
              data: {
                storeId: this.distribId,
                proEcode: this.encode,
                phyWarehouseId: this.cp_c_phy_warehouse_id
              }
            }).then((res) => {
              const data = res.data;
              if (data.code === 0) {
                this.stockData = data.data;
              }
            });
          }
          if (this.hasReceiving) {
            await axios({
              // url: `/p/cs/stock/${this.takeStock}`,
              url: '/p/cs/sg/storage/queryCommonStorageByPro',
              method: 'post',
              data: {
                storeId: this.takeStock,
                proEcode: this.encode
              }
            }).then((res) => {
              const data = res.data;
              if (data.code === 0) {
                this.receivingData = data.data;
              }
            });
          }
          const paramObj = { PS_C_PRO_ECODE: this.encode };
          if (this.returnType) {
            paramObj.detailTableName = this.returnType === '1'
              ? 'OC_B_RETURN_ORDER_REFUND'
              : this.returnType === '2'
                ? 'OC_B_RETURN_ORDER_EXCHANGE'
                : '';
          }
          //  判断是否是OMS--------- 库存走Post请求 OMS走Get请求
          if (port[this.tablename].getBody != '/p/cs/getMatrixData') {
            const data = new FormData();
            const obj = {
              objid: this.objid, // 主表ID
              table:
                this.tablename === 'DL_B_TRAN_OUT_POS'
                  ? this.tablename.replace('_POS', '')
                  : this.tablename, // 表名
              fixcolumn: paramObj,
              flag: 0 // 箱标识
            };
            data.append('param', JSON.stringify(obj));

            return new_axios({
              url: port[this.tablename].getBody,
              method: 'post',
              data
            });
          }
          return axios({ // 不同页面不同接口  ------------------------------乔丹使用get请求,千百度改为post 这块代码暂时弃用
            url: port[this.tablename].getBody,
            method: 'get',
            params: {
              param: {
                objid: this.objid, // 主表ID
                table: this.tablename === 'DL_B_TRAN_OUT_POS' ? this.tablename.replace('_POS', '') : this.tablename, // 表名
                fixcolumn: paramObj,
              }
            }
            /* 需更改 */
          });
        } if (this.edit && port[this.tablename]) {
          // 可编辑矩阵(不同页面不同接口)
          const paramObj = { PS_C_PRO_ECODE: this.encode };
          if (this.returnType) {
            paramObj.detailTableName = this.returnType === '1'
              ? 'OC_B_RETURN_ORDER_REFUND'
              : this.returnType === '2'
                ? 'OC_B_RETURN_ORDER_EXCHANGE'
                : ''; 
          }
          return axios({
            url: port[this.tablename].getBody,
            method: 'get',
            params: {
              param: {
                objid: this.objid, // 主表ID
                table:
                  this.tablename === 'DL_B_TRAN_OUT_POS'
                    ? this.tablename.replace('_POS', '')
                    : this.tablename, // 表名
                fixcolumn: paramObj
              }
            }
            /* 需更改 */
          });
        } if (this.reveal) {
          // 纯展示的是库存
          return axios({
            // url: this.getStock,
            url: '/p/cs/sg/storage/queryCommonStorageByPro',
            method: 'post',
            data: {
              storeId: this.takeStock,
              proEcode: this.encode
            }
          }).then((res) => {
            const data = res.data;
            if (data.code === 0) {
              this.stockData = data.data;
            }
          });
        }
      }, // 获取内容信息
      keydown(e) {
        if (e.keyCode === 9) {
          // 循环切换
          if (this.focusList.length === 0) return;
          this.focusIndex === this.focusList.length - 1
            ? this.focusList[(this.focusIndex = 0)].focus()
            : this.focusList[(this.focusIndex += 1)].focus();
          e.preventDefault(); // 阻止默认事件
          e.stopPropagation(); // 防止事件冒泡
        }
        if (e.keyCode === 38) {
          // 上
          const arr = this.focusList[this.focusIndex].dataset.id.split('-'); // 当前行  第几个
          const index = this.focusList.findIndex((n) => {
            const data = n.dataset.id.split('-');
            return data[1] === arr[1] && arr[0] - 1 == data[0]; // 行不相同列相同
          }); // 找出下一行 第几个
          if (index === -1) return;
          this.focusIndex = index;
          this.focusList[this.focusIndex].focus();
        }
        if (e.keyCode === 40) {
          // 下
          const arr = this.focusList[this.focusIndex].dataset.id.split('-'); // 当前行  第几个
          const index = this.focusList.findIndex((n) => {
            const data = n.dataset.id.split('-');
            return data[1] === arr[1] && Number.parseInt(arr[0]) + 1 == data[0]; // 行不相同列相同
          }); // 找出下一行 第几个
          if (index === -1) return;
          this.focusIndex = index;
          this.focusList[this.focusIndex].focus();
        }
        if (e.keyCode === 37) {
          // 左
          this.focusIndex === 0
            ? ''
            : this.focusList[(this.focusIndex -= 1)].focus();
        }
        if (e.keyCode === 39) {
          // 右
          this.focusIndex === this.focusList.length - 1
            ? ''
            : this.focusList[(this.focusIndex += 1)].focus();
        }
      }, // 键盘事件
      matching() {
        this.$emit('match', JSON.parse(JSON.stringify(this.tBody)));
      }, // 纯展示匹配按钮
      findId() {
        if (Object.prototype.toString.call(this.objList) === '[object Array]') {
          let id = '';
          let istrue = false; // 判断修改的值是否相同
          this.objList.map((obj) => {
            if (obj.childs) {
              for (const data of obj.childs) {
                if (
                  data.colname === 'CP_C_STORE_ID'
                  || data.colname === 'CP_C_ORIG_ID'
                ) {
                  this.store = data.valuedata;
                  this.deliverStock = /* data.refobjid || */ data.pid; // 发货店仓
                }
                if (data.colname === 'CP_C_STORE_ID') {
                  id = data.pid;
                }
                if (data.colname === 'CP_C_DEST_ID') {
                  if (id === '') id = data.pid;
                  this.takeStock = /* data.refobjid || */ data.pid; // 收货店仓
                }
                if (id === '' && data.colname === 'CP_C_ORIG_ID') id = data.pid;
                if (data.colname === 'CP_C_PHY_WAREHOUSE_ID') { this.cp_c_phy_warehouse_id = data.pid; }
              }
              /* obj.childs.map((data) => {
                /!*if(data.colname === 'CP_C_STORE_ID') this.distribId = data.refobjid || data.pid;*!/
                /!*if(data.name === '配销中心') this.distribId = data.refobjid;*!/
                if(data.colname === 'CP_C_STORE_ID' || data.colname === 'CP_C_ORIG_ID') {
                  this.store = data.valuedata;
                  this.deliverStock = /!*data.refobjid || *!/data.pid;//发货店仓
                  this.distribId = /!*data.refobjid || *!/data.pid;
                }
                if(data.colname === 'CP_C_DEST_ID') {
                  this.takeStock = /!*data.refobjid || *!/data.pid;//收货店仓
                }
              }) */
            }
          });
          istrue = this.distribId === id;
          this.distribId = id;
          this.getStock = `/p/cs/stock/${
            this.deliverStock === '' ? this.takeStock : this.deliverStock
          }`;
          return istrue;
        }
      }, // 查询店仓ID
      getTableData() {
        this.getHeadData().then(() => {
          // 获取头部信息
          this.getBodyData().then((res) => {
            // 根据条码或编码获取body信息
            if (this.reveal) {
              // 纯展示
              this.processData([], this.matchData.data[this.pickerR].value);
              this.$emit('loadChange'); // 关闭loading
              return;
            }
            const data = res.data;
            if (data.code === 0) {
              this.processData(data.data === undefined ? [] : data.data.NotMatchSize);
              this.$emit('loadChange'); // 关闭loading
              if (this.edit || this.general) {
                this.$nextTick(() => {
                  this.focusList = Array.from(
                    this.$el.querySelectorAll('.ff-matrix--input')
                  );
                  if (
                    this.focusList.length === 0
                    || this.isdisabled
                    || !this.isActive
                  ) { return; }
                  this.$el.addEventListener('keydown', this.keydown);
                  if (!this.edit) { this.$el.querySelectorAll('.ff-matrix--input')[0].focus(); }
                  this.$emit('inputFocus');
                });
              }
            }
          }); // 获取内容信息
        });
      }, // 初始化数据
      inputFocus(event) {
        const id = event.target.dataset.id;
        const index = this.focusList.findIndex(n => n.dataset.id === id);
        this.focusIndex = index;
        setTimeout(() => {
          this.focusList[this.focusIndex].select();
        });
      }, // input聚焦事件
      keyEntry() {
        this.focusIndex === this.focusList.length - 1
          ? this.general
            ? this.confirm()
            : this.edit
              ? this.$emit('enterSave', true)
              : ''
          : this.focusList[(this.focusIndex += 1)].focus();
      } // entry下一个输入框聚焦
    },
    watch: {
      loading(val) {
        if (val) {
          this.control = {};
          this.amendObj = {};
          if (this.distribId === '' && this.cp_c_phy_warehouse_id === '') return;
          this.getTableData();
        }
      }, // 刷新数据
      pickerR(val) {
        if (this.matchData.data[val].port === 1) {
          this.getStock = `/p/cs/stock/${this.deliverStock}`;
        } else {
          this.getStock = `/p/cs/stock/${this.takeStock}`;
        }
        /* if(val === 0) {
          this.getStock = `/p/cs/stock/${this.deliverStock}`;
        }else {
          this.getStock = `/p/cs/stock/${this.takeStock}`;
        } */
        this.getBodyData().then(() => {
          this.processData([], this.matchData.data[val].value);
          /* Object.keys(this.tBody).map((obj) => {
            Object.keys(this.tBody[obj]).map((data) => {
              this.tBody[obj][data].count = this.tBody[obj][data][val];
            })
          }) */
        });
      }, // 显示发货店仓还是收获店仓
      matchTableData(val) {
        if (Object.keys(val).length === 0) return;
        this.tally += 1; // 每次改变记录加1
        Object.keys(this.tBody).map((obj) => {
          Object.keys(this.tBody[obj]).map((data) => {
            if (
              this.tBody[obj][data].disabled
              || this.tBody[obj][data].count == val[obj][data].count
              || val[obj][data].count < 0
            ) { return; } // 禁止编辑的不用赋值
            this.$set(this.tBody[obj][data], 'count', val[obj][data].count);
            if (this.oldData[obj][data].count === this.tBody[obj][data].count) {
              // 无变化删除
              if (this.amendObj[this.tBody[obj][data].TAG] !== undefined) { this.$delete(this.amendObj, this.tBody[obj][data].TAG); }
            } else {
              this.amendObj[this.tBody[obj][data].TAG] = Object.assign(
                {},
                this.tBody[obj][data]
              );
            }
          });
        });
        this.$message({
          message: '匹配成功',
          type: 'success'
        });
        this.$emit('amendData', this.amendObj);
      }, // 匹配
      objList: {
        handler(val) {
          const isTrue = this.findId();
          if (this.distribId === '' || isTrue) return;
          this.getTableData();
        },
        deep: true
      }, // 处理数据异步的问题
      stock(val) {
        this.$emit('changeHeight', {
          judge: val,
          count: Object.keys(this.tBody).length
        });
      }, // 在库的高度(已无效)
      usable(val) {
        this.$emit('changeHeight', {
          judge: val,
          count: Object.keys(this.tBody).length
        });
      }, // 可用的高度(已无效)
      stockReceiving(val) {
        this.$emit('changeHeight', {
          judge: val,
          count: Object.keys(this.tBody).length
        });
      }, // 收货在库(已无效)
      usableReceiving(val) {
        this.$emit('changeHeight', {
          judge: val,
          count: Object.keys(this.tBody).length
        });
      }, // 收货可用(已无效)
      editsave(val) {
        if (val) {
          this.waitObjSave();
        }
      }, // 点确定时的保存数据
      stopsave(val) {
        if (val) {
          this.saveLoading = false;
          this.$set(this, 'paramsObj', ''); // 初始化
          this.$emit('changeEditSave'); // 初始化编辑保存
          this.$emit('changeStopSave'); // 初始化主表保存报错
          this.$emit('refreshData', {
            status: false,
            clear: true // 是否清空input数据
          }); // 更新数据并关闭弹框
        }
      } // 关闭矩阵
      /* save (val) {
        if(val && this.general) {
          if(Object.keys(this.amendObj).length === 0) return this.$emit('refreshData',false);//更新数据并关闭弹框//无变化
          let data = {};
          data[`${this.tablename === 'DL_B_TRAN_OUT'? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`] = [];
          Object.keys(this.amendObj).map((keys) => {
            let obj = this.amendObj[keys];
            let tableObj = {
              ID: obj.ID === undefined? -1 : obj.ID,//明细ID = 子表ID
              PS_C_PRO_ECODE: this.encode,//商品编码
              PS_C_SKU_ECODE : obj.PS_C_SKU_ECODE,//SKU编码
              PS_C_SKU_ID: obj.PS_C_SKU_ID,//SKUID
            };
            if(this.tablename === 'DL_B_TRAN_PLAN') {
              tableObj['QTY_EXEC_PLAN'] = obj.count === ''? 0 : obj.count;//数量
            }else {
              tableObj['QTY_BILL'] = obj.count === ''? 0 : obj.count;//数量
            }
            data[`${this.tablename === 'DL_B_TRAN_OUT'? port[this.tablename].special : port[this.tablename].tableName}.MATRIX`].push(tableObj)
          })
          axios({
            url: port[this.tablename].amendBody,
            method: 'post',
            data: {
              table: this.tablename,//表名
              objid: this.objid,//主表ID
              data: JSON.stringify(data)
            }
          }).then((res) => {
            let resData = res.data;
            if(resData.code === 0) {

            }
            //任何结果都关闭窗口
            this.$emit('refreshData', false);//更新数据并关闭弹框
            this.$emit('changeSave', false);
          }).catch(error => {
            //任何结果都关闭窗口
            this.$emit('refreshData', false);//更新数据并关闭弹框
            this.$emit('changeSave', false);
          })
        }
      },//新增的时候保存 */
    },
    mounted() {
      if (this.general && this.hasStock) { port[this.tablename].isStock ? (this.stock = true) : (this.usable = true); }
      this.findId(); // 查找配销中心
      if (this.tablename === 'OC_B_RETURN_ORDER') this.isStoreFlag = false;
      if (this.distribIds && this.distribIds !== undefined) { this.cp_c_phy_warehouse_id = this.distribIds; }
      // if (this.distribId === '' && this.cp_c_phy_warehouse_id === '') return;
      this.getTableData();
    },
    created() {
      if (this.tablename === 'OC_B_ORDER') return;
      if (this.tablename === 'OC_B_RETURN_ORDER') return;
      if (port[this.tablename]) {
        this.matchData = port[this.tablename].matchData; // 矩阵匹配数据
        this.hasStock = port[this.tablename].hasStock; // 是否调取库存接口
        this.hasReceiving = !!port[this.tablename].hasReceiving; // 是否显示收货在库和可用
      }
    },
    beforeDestroy() {
      if (this.edit || this.general) {
        if (this.focusList.length === 0 || this.isdisabled || !this.isActive) { return; }
        this.$el.removeEventListener('keydown', this.keydown);
      }
    }
  };
</script>
