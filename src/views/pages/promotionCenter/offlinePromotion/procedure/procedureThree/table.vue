
<template>
  <div
    class="ff-custom--table"
    @scroll="scrollA"
  >
    <div
      class="ff-custom--table-lower-box"
      :style="{'min-width': width}"
    >
      <table
        ref="customTable"
        class="ff-custom--table-content ff-custom--table-lower"
      >
        <thead>
          <tr>
            <th class="ff-custom--table-thbox">
              <span class="ff-custom--table-label">序号</span>
            </th>
            <th
              v-for="(list, index) of tHead"
              :class="{'ff-custom--align': list.type === 'NUMBER'}"
            >
              <span class="ff-custom--table-label">{{ list.label }}</span>
              <span
                v-if="list.order"
                class="ff-custom--order-icon"
              >
                <i
                  class="ff-custom--order-icon-up ff-custom--order-icon-i"
                  :class="{'ff-custom--icon-up-active': sortSub === index && sortStyle === 'up'}"
                  @click="up(index)"
                />
                <i
                  class="ff-custom--order-icon-down ff-custom--order-icon-i"
                  :class="{'ff-custom--icon-down-active': sortSub === index && sortStyle === 'down'}"
                  @click="down(index)"
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(list, index) of tBody"
            :class="{'ff-custom--table-active': sub === index && !isCheckActive,
                     'ff-custom--table-checked-active' : isCheckActive && list.checked,
                     'ff-custom--table-hover' : isCheckActive}"
            @click="active($event,index)"
          >
            <td class="ff-custom--table-tdbox">
              <span class="ff-custom--table-label">{{ index + 1 }}</span>
            </td>
            <td
              v-for="(label, sub) of tHead"
              :key="sub"
            >
              <input
                v-if="label.type === 'input'"
                type="text"
                :value="list[label.name]"
                :disabled="true"
                class="ff-custom--table-adjust"
                :type="label.limit"
                @input="adjustChange($event, list, label, index)"
              >
              <span
                v-else
              >
                {{ label.position === 'fixed'?(list[label.name]?list[label.name].toFixed(2) : '') : list[label.name] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="tBody.length !== 0"
      ref="customTableBox"
      class="ff-custom--table-layer"
      :style="{'min-width': width}"
      @scroll="scrollB"
    >
      <table
        ref="customTable"
        class="ff-custom--table-content"
      >
        <thead>
          <tr>
            <th class="ff-custom--table-thbox">
              <span class="ff-custom--table-label">序号</span>
            </th>
            <th v-for="(list, index) of tHead">
              <span class="ff-custom--table-label">{{ list.label }}</span>
              <span
                v-if="list.order"
                class="ff-custom--order-icon"
              >
                <i
                  class="ff-custom--order-icon-up ff-custom--order-icon-i"
                  :class="{'ff-custom--icon-up-active': sortSub === index && sortStyle === 'up'}"
                  @click="up(index)"
                />
                <i
                  class="ff-custom--order-icon-down ff-custom--order-icon-i"
                  :class="{'ff-custom--icon-down-active': sortSub === index && sortStyle === 'down'}"
                  @click="down(index)"
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(list, index) of tBody"
            :class="{'ff-custom--table-active': sub === index && !isCheckActive,
                     'ff-custom--table-checked-active' : isCheckActive && list.checked,
                     'ff-custom--table-hover' : isCheckActive,}"
            @click="active($event,index)"
          >
            <td class="ff-custom--table-tdbox">
              <span class="ff-custom--table-label">{{ index + 1 }}</span>
            </td>
            <td v-for="(label, sub) of tHead">
              <input
                v-if="label.type === 'input'"
                type="text"
                :value="list[label.name]!==0?list[label.name]:''"
                placeholder="0"
                autoComplete="off"
                maxlength="4"
                class="ff-custom--table-adjust"
                :type="label.limit"
                @input="adjustChange($event, list, label.name, index)"
                @keyup="textLimitCheck($event,4);"
              >
              <span
                v-else
              >
                {{ label.position === 'fixed'?(list[label.name]?list[label.name].toFixed(2) : '') : list[label.name] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="tBody.length !== 0"
      class="ff-custom--table-left"
    >
      <table class="ff-custom--table-content">
        <tbody>
          <tr
            v-for="(list, index) of tBody"
            :class="{'ff-custom--table-active': sub === index && !isCheckActive,
                     'ff-custom--table-checked-active' : isCheckActive && list.checked,
                     'ff-custom--table-hover' : isCheckActive,}"
            @click="active($event,index)"
          >
            <td class="ff-custom--table-tdbox">
              <span class="ff-custom--table-label">{{ index + 1 }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="tBody.length !== 0"
      class="ff-custom--table-right"
    >
      <table class="ff-custom--table-content">
        <tbody>
          <tr
            v-for="(list, index) of tBody"
            :class="{'ff-custom--table-active': sub === index && !isCheckActive,
                     'ff-custom--table-checked-active' : isCheckActive && list.checked,
                     'ff-custom--table-hover' : isCheckActive,}"
            @click="active($event,index)"
          >
            <td class="ff-custom--table-tdbox">
              <span
                class="ff-custom--table-label label-delete"
                @click="Delete(index)"
              >
                <span style="color:white;">x</span></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="tBody.length !== 0"
      class="ff-custom--table-number"
    >
      序号
    </div>
    <div
      v-if="tBody.length !== 0"
      class="ff-custom--table-op"
    >
      操作
    </div>
    <p
      v-if="tBody.length === 0"
      class="ff-custom--no-data"
    >
      暂无数据
    </p>

    <div
      class="table-total ff-custom--table-number"
      style="left:0;width:100%;"
      @scroll="scrollC(this)"
    >
      <div class="shops-code">
        <!-- @changeSave="changeSave"
 @newLySave="newLySave"
 @noContent="noContent"
 @errorHasContent="errorHasContent"
 @changeEditSave="changeEditSave"
 @objectEdit="objectEdit"
 @changeStopSave="changeStopSave" -->
        <matrix-input
          ref="inputMatrix"
          :stopsave="stopsave"
          :is-custom="isCustom"
          :select-item="selectItem"
          :objid="objid"
          :obj-list="objList"
          :tablename="tablename"
          :input-list="inputList"
          :isdisabled="isdisabled"
          :is-active="isActive"

          :save="save"
          :editsave="editsave"
          @itemInputEnter="itemInputEnter"
        />
        <!-- <label for="" class="text">商品：</label><input type="text" placeholder="请输入条码、商品编码" @keyup.enter="entry"> -->
      </div>
      <div class="total-map">
        吊牌金额:{{ calculateTotal('AMT_LIST',null) }}
      </div>
      <div class="total-map">
        零售金额:{{ calculateTotal('AMT_RETAIL',null) }}
      </div>
      <div class="total-map">
        数量:{{ calculateTotal('QTY',null) }}
      </div>
      <div class="total-map">
        应收金额:{{ calculateTotal('SUM_AMT_RECEIVABLE',null) }}
      </div>
      <div class="delete-total">
        <button
          type="text"
          @click="emptydata"
        >
          清空明细
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/*  表头：
    order：true表示有排序
    isTotal：true，表示有合计
    type: popup 表示是弹框
    type: input 表示是输入框 */
  import matrix from 'framework/components/views/custompage/procedureMatrix.vue';
  import DragDialog from 'framework/components/dialog/dragDialog.vue';
  import matrixInput from 'framework/components/input/procedureMatrixInput.vue';
  import { httpFormdata } from 'framework/__utils__/request.js';

  Array.prototype.distinct = function () {
    const arr = this;
    const len = arr.length;
    arr.sort((a, b) => 
      // 对数组进行排序才能方便比较
      a - b);
    function loop(index) {
      if (index >= 1) {
        if (arr[index] === arr[index - 1]) {
          arr.splice(index, 1);
        }
        loop(index - 1); // 递归loop函数进行去重
      }
    }
    loop(len - 1);
    return arr;
  };

  export default {
    components: {
      matrixInput,
      DragDialog,
      matrix
    },

    props: {
      tHead: {
        type: Array,
        default: () => []
      }, // 表头
      tBody: {
        type: Array,
        default: () => []
      }, // 表内容
      calculation: Boolean, // 是否动态计算
      objList: {
        type: Array,
        default: () => []
      }, // 查询配销中心
      activeSub: Boolean, // 用来判断刷新数据时高亮是否变第一个(true为不变)
      isCheckActive: Boolean, // 判断选中后是否要高亮的
      // 门店中心id
      iddata: {
        type: Object
      },
      mingxilist: {
        type: Array,
        default: () => []
      },
      mingxilist: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        tableArray: [],
        isNOData: false, // 是否有数据(true表示没有数据)
        sub: 0, // 高亮下标
        sortSub: -1, // 排序下标
        sortStyle: '', // 排序类型
        width: '100%', // 宽度
        HasPadding: false, // 是否有padding
        checked: false, // 全选
        oldDate: [], // 旧数据
        amendDate: {}, // 修改了的数据
        customDialog: {
          show: false, // 显示弹框
          title: '', // 弹框标题
          query: {} //
        },
        customComponent: '', // 组件名
        distribId: '', // 配销中心ID

        // Dialog: false, //矩阵录入
        // generalLoading: false, //loading加载
        search: '', // 搜索字段
        // selectItem: {}, //表信息
        // objid: {} //表ID
        editsave: false,
        inputList: [
          {
            colname: 'PS_C_PRO_ECODE',
            cusurl: 'custompage/matrix',
            display: 'text',
            name: '商品编码',
            pid: '',
            tablename: 'DL_B_TRAN_PLAN_ITEM',
            type: 'STRING',
            value: '',
            valuedata: ''
          }
        ],
        isActive: true, // 表示是否激活状态(false禁用input)
        isCustom: false,
        isdisabled: false, // 表示是否可编辑(true禁用input)
        itemdata: {
          colname: 'PS_C_PRO_ECODE',
          cusurl: 'custompage/matrix',
          display: 'text',
          name: '商品',
          pid: '',
          tablename: 'DL_B_TRAN_PLAN_ITEM',
          type: 'STRING',
          value: '',
          valuedata: ''
        },
        objid: -1,
        save: false,
        selectItem: {},
        stopsave: false,
        tablename: 'DL_B_PAND' // 表名
      // tBody: [],
      };
    },

    mounted() {
      this.oldDate = JSON.parse(JSON.stringify(this.tBody));
      if (this.tBody.length === 0) return;
      this.$nextTick(() => {
        this.width = `${this.$refs.customTable.clientWidth}px`;
      });
    },
    watch: {
      tBody(val) {
        this.oldDate = JSON.parse(JSON.stringify(val));
        if (val.length === 0) {
          this.checked = false;
          this.isNOData = true;
        } else {
          this.isNOData = false;
        }
        if (!this.activeSub) this.sub = 0;
        this.oldDate = val.map(obj => Object.assign({}, obj)); // 初始化数据
        this.amendDate = {}; // 初始修改了的数据
        this.$emit('amendChange', {});
        if (this.tBody.length === 0) return;
        this.$nextTick(() => {
          this.width = `${this.$refs.customTable.clientWidth}px`;
        });
      },
      iddata: {
        handler(val, oldVal) {
          this.objList[0].childs[0].valuedata = val.valuedata;
          this.objList[0].childs[0].pid = val.pid;
        },
        deep: true
      },
      inputList: {
        handler(val, oldVal) {
          this.$emit('cleardatalist');
        },
        deep: true
      }
    },
    methods: {
      // 向上派发，取矩阵录入数据
      // 执行促销获取商品列表接口
      itemInputEnter(data) {
        const self = this;
        let query = [];
        if (data == undefined) {
          query = self.inputList[0].matrix;
        } else {
          const ary = [];
          const jsondata = {
            ID: -1,
            PS_C_PRO_ECODE: '',
            PS_C_SKU_ECODE: data.PS_C_SKU_ECODE,
            PS_C_SKU_ID: data.PS_C_SKU_ID,
            QTY_BILL: 1
          };
          ary.push(jsondata);
          const jsonval = {
            'DL_B_PAND_ITEM.MATRIX': ary
          };
          query = jsonval;
        }
        const params = JSON.stringify(query);
        if (self.iddata.pid == '') {
          self.$message({
            message: '请选择门店',
            type: 'warning'
          });
        } else {
          const queryjson = {
            objid: self.iddata.pid,
            data: query
          };
          const params = new URLSearchParams();
          params.append('param', JSON.stringify(queryjson));
          httpFormdata({
            method: 'post',
            url: '/p/cs/promtrailproitemtest',
            data: params
          }).then((res) => {
            if (res.data.code == 0) {
              self.$refs.inputMatrix.search = '';
              const a = res.data.data;
              if (self.tableArray.length === 0) {
                self.tableArray = a;
              } else {
                for (const j of self.tableArray) {
                  for (const i of a) {
                    if (i.PS_C_SKU_ECODE === j.PS_C_SKU_ECODE) {
                      j.QTY += i.QTY;
                      i.select = true;
                    }
                  }
                }
                const b = a.filter((obj) => {
                  if (!obj.select) {
                    if (obj.QTY != 0) {
                      return obj;
                    }
                  }
                });
                self.tableArray = [...self.tableArray, ...b];
              }
              const c = self.tableArray.filter((obj) => {
                if (obj.QTY != 0) {
                  return obj;
                }
              });
              // console.log(c);
              self.$emit('spot', c);
            }
          });
        }
      },
      // 清空明细
      emptydata() {
        // console.log("清空明细");
        this.$emit('cleardata');
        this.$refs.inputMatrix.search = '';
        this.tableArray = [];
      },
      scrollA(e) {
        const left = $(e.target).scrollLeft();
        $('.ff-custom--table-number').css('left', `${left}px`);
        $('.ff-custom--table-left').css('left', `${left}px`);
        $('.ff-custom--table-right').css('right', `${-left}px`);
        $('.ff-custom--table-op').css('right', `${-left}px`);
      },

      scrollB(e) {
        const top = $(e.target).scrollTop();
        $('.ff-custom--table-left').css('top', `${-top}px`);
        $('.ff-custom--table-right').css('top', `${-top}px`);
      },
      scrollC(e) {
        const left = $(e.target).scrollLeft();
        // console.log(left);
        $('.table-total').css('left', `${-left}px`);
        $('.table-total').css('right', `${left}px`);
      },
      calculateTotal(name, type) {
        let total = 0;
        this.tBody.map((obj) => {
          if (name == 'AMT_LIST') {
            total = this.M_add(
              total,
              obj.AMT_LIST
                ? Number(obj.AMT_LIST) * Number(obj.QTY === '' ? 0 : obj.QTY)
                : 0
            ).toFixed(2);
          } else if (name == 'QTY') {
            total = this.M_add(
              total,
              obj.QTY ? Number(obj.QTY === '' ? 0 : obj.QTY) : 0
            );
          } else if (name == 'AMT_RETAIL') {
            total = this.M_add(
              total,
              obj.AMT_RETAIL
                ? Number(obj.AMT_RETAIL) * Number(obj.QTY === '' ? 0 : obj.QTY)
                : 0
            ).toFixed(2);
          } else if (name == 'SUM_AMT_RECEIVABLE') {
            total = this.M_add(total, obj[name] ? Number(obj[name]) : 0).toFixed(
              2
            );
          }
        });
        return total;
      }, // 计算合计
      active(event, index) {
        const obj = {
          y: event.layerY,
          scrollTop: this.$refs.customTableBox.scrollTop,
          sub: index
        };
        if (this.sub === index) return;
        this.sub = index;
      }, // 高亮激活
      up(index) {
        this.sortSub = index; // 那个th排序
        this.sortStyle = 'up'; // 排序方式
        this.$emit('asc', index); // 升序
      }, // 升序
      down(index) {
        this.sortSub = index; // 那个th排序
        this.sortStyle = 'down'; // 排序方式
        this.$emit('des', index); // 降序
      }, // 降序
      Delete(index) {
        this.tBody.splice(index, 1);
        this.tableArray.splice(index, 1);
        // console.log(this.tBody)
        // console.log('删除数据')
        this.$emit('cleardatalist');
      },
      adjustChange(e, list, name, index) {
        e.target.value = e.target.value.replace(/[^\d]/g, '');
        list[name] = Number(e.target.value) === '' ? 0 : Number(e.target.value);
        // 应收金额
        const SUM_AMT_RECEIVABLE = list.AMT_RETAIL * list[name];
        list.SUM_AMT_RECEIVABLE = SUM_AMT_RECEIVABLE.toFixed(2);
        // 应收价
        const AMT_RECEIVABLE = list.AMT_RETAIL;
        // console.log(AMT_RECEIVABLE);
        list.AMT_RECEIVABLE = AMT_RECEIVABLE;
        // 折扣
        const DISCOUNT = list.AMT_RECEIVABLE / list.AMT_LIST;
        list.DISCOUNT = DISCOUNT.toFixed(2);
        // 执行促销
        list.actis = '';
        // console.log();
        this.$emit('amendChange');
        this.$emit('cleardatalist');
      }, // 输入框值变化
      textLimitCheck(e, maxLength) {
        if (e.target.value.length > maxLength) {
          e.target.value = e.target.value.substring(0, 4); 
          e.target.value.focus();
        } /* 回写input的值，当前填写文字的数量 */  
      }, // 限制输入框值不能超过9999
      M_add(a, b) {
        // 相加
        let c; 
        let d; 
        let e;
        try {
          c = a.toString().split('.')[1].length;
        } catch (f) {
          c = 0;
        }
        try {
          d = b.toString().split('.')[1].length;
        } catch (f) {
          d = 0;
        }
        return (
          (e = Math.pow(10, Math.max(c, d))),
          (this.M_mul(a, e) + this.M_mul(b, e)) / e
        );
      },
      M_mul(a, b) {
        // 主体
        let c = 0;
        const d = a.toString();
        const e = b.toString();
        try {
          c += d.split('.')[1].length;
        } catch (f) {}
        try {
          c += e.split('.')[1].length;
        } catch (f) {}
        return (
          (Number(d.replace('.', '')) * Number(e.replace('.', '')))
          / Math.pow(10, c)
        );
      }
    },

    activated() {}
  };
</script>
<style lang="less" scoped type="text/less">
.ff-custom--table {
  overflow-y: hidden;
  overflow-x: auto;
  min-height: 228px;
  // min-width: 1026px;
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-size: 12px;
  .ff-custom--order-icon {
    display: inline-block;
    font-size: 0;
    margin-left: 5px;
    width: 16px;
    vertical-align: middle;
    .ff-custom--order-icon-i {
      display: block;
      position: relative;
      cursor: pointer;
      /*background-color: #E3E3E3;*/
      width: 16px;
      height: 8px;
      &::before {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .ff-custom--order-icon-up {
      margin-bottom: 2px;
      &::before {
        border-color: transparent transparent #97a8be;
        border-width: 0 5px 5px;
        border-style: none solid solid;
      }
    }
    .ff-custom--order-icon-down {
      &::before {
        border-color: #97a8be transparent transparent;
        border-width: 5px 5px 0;
        border-style: solid solid none;
      }
    }
    .ff-custom--icon-up-active {
      &::before {
        border-color: transparent transparent #48576a;
      }
    }
    .ff-custom--icon-down-active {
      &::before {
        border-color: #48576a transparent transparent;
      }
    }
  }
  .ff-custom--table-total {
    color: #e80000;
    position: relative;
    box-sizing: border-box;
    background-color: #fff;
    text-align: left;
    flex-basis: 30px;
    /*overflow-y: hidden;*/
    height: 30px;
    table {
      width: 100%;
      th,
      td {
        min-width: 80px;
        height: 28px;
        padding-left: 18px;
        padding-right: 4px;
        white-space: nowrap;
        box-sizing: border-box;
        background-color: #fff;
        border: 1px solid #d8d8d8;
        border-right: none;
        border-left: none;
        &:last-child {
          padding-right: 20px;
        }
      }
      .ff-custom--table-thbox {
        min-width: 60px;
        .ff-custom--table-checkbox {
          margin-bottom: -1px;
        }
      }
      .ff-custom--table-tdbox {
        min-width: 60px;
      }
      .ff-custom--align {
        text-align: right;
      }
    }
  }
  .ff-custom--table-lower-box {
    box-sizing: border-box;
    background-color: #f5f6fa;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    height: 24px;
    /*overflow-y: hidden;*/
  }
  //  // //
  .label-delete {
    width: 13px;
    height: 13px;
    // line-height: 13px;
    text-align: center;
    border-radius: 50%;
    background-color: #007ae5;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    span {
      color: white;
      margin-bottom: 1px;
    }
  }
  .ff-custom--table-label {
    display: inline-block;
    vertical-align: middle;
    font-size: 12px;
  }
  .ff-custom--table-checkbox {
    vertical-align: middle;
    margin-right: 3px;
  }
  .ff-custom--table-content {
    width: 100%;
    th,
    td {
      height: 24px;
      box-sizing: border-box;
      min-width: 80px;
      white-space: nowrap;
      padding-left: 18px;
      padding-right: 4px;
      text-align: left;
      &:last-child {
        padding-right: 20px;
      }
    }
    .ff-custom--table-thbox {
      min-width: 60px;
      .ff-custom--table-checkbox {
        margin-bottom: -1px;
      }
    }
    .ff-custom--align {
      text-align: right;
    }
    th {
      background-color: #f5f6fa;
      /*font-size: 0;*/
    }
    td {
      border-bottom: 1px solid #d8d8d8;
      .ff-custom--table-img {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
    .ff-custom-select {
      width: 140px;
    }
    .ff-custom--table-adjust {
      width: 100px;
      height: 18px;
      border: 1px solid #e6e6e6;
      font-size: 12px;
      padding: 0 2px;
      box-sizing: border-box;
      border-radius: 2px;
      &:focus {
        border-color: #20a0ff;
      }
    }
    .ff-custom--table-popup {
      text-decoration: underline;
      cursor: pointer;
    }
    .ff-custom--proname {
      cursor: pointer;
      color: #0f8ee9;
      text-decoration: underline;
    }
    .ff-custom--table-thbox {
      min-width: 60px;
    }
    .ff-custom--table-tdbox {
      font-size: 0;
      color: #007ae5;
      min-width: 60px;
    }
    .ff-custom--table-active {
      background-color: #f8f7f7;
    }
    .ff-custom--table-checked-active {
      background-color: #f8f7f7;
    }
    .ff-custom--table-hover:hover {
      background-color: #f8f7f7;
    }
    .ff-custom--table-red {
      color: #c00000;
    }
    .ff-custom--table-blue {
      color: #0000ff;
    }
  }
  .ff-custom--table-lower {
    height: 24px;
  }
  .ff-custom--table-layer {
    position: relative;
    background-color: #fff;
    overflow-y: auto;
    border-top: 1px solid #d8d8d8;
    overflow-x: hidden;
    flex: 1;
    table {
      margin-top: -24px;
    }
  }
  .ff-custom--no-data {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 30px;
  }
  .ff-custom--table-left {
    width: 62px;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 25px;
    background: #fff;
    z-index: 1;
  }
  .ff-custom--table-right {
    width: 62px;
    position: absolute;
    top: 0;
    right: 0;
    padding-top: 25px;
    background: #fff;
    z-index: 1;
    span {
      cursor: pointer;
    }
  }
  .ff-custom--table-number {
    width: 62px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    background: #f5f6fa;
    border-bottom: 1px solid #ddd;
  }
  .ff-custom--table-op {
    width: 62px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    background: #f5f6fa;
    border-bottom: 1px solid #ddd;
  }
  .table-total {
    // padding: 10px 15px;
    position: relative;
    z-index: 1;
    background: #fff;
    border-top: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .shops-code {
      display: flex;
      flex-direction: row;
      align-items: center;
      // .text {
      //   width: 50px;
      // }
      input {
        width: 238px;
      }
    }
    .total-map {
      // width: 100%;
    }
    .delete-total {
      padding-right: 36px;
      button {
        color: #007ae5;
      }
    }
  }
}
</style>
