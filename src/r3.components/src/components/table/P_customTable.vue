<template>
  <div
    class="ff-query--table"
    :style="contentStyleObj"
  >
    <div
      class="ff-custom--table-lower-box"
      :style="{'min-width': width,'padding-right': HasPadding? '17px': 0}"
    >
      <table class="ff-custom--table-content ff-custom--table-lower">
        <thead>
          <tr>
            <th class="ff-custom--table-thbox">
              <input
                v-if="hasChecked"
                type="checkbox"
                class="ff-custom--table-checkbox"
                :checked="checked"
                @change.stop="checkedChange($event)"
              >
              <span class="ff-custom--table-label">{{$t('table.index')}}</span>
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
            <!-- 操作列 -->
            <th v-if="operation">
              {{$t('tips.operation')}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(list, index) of tBody"
            :class="{'ff-custom--table-active': sub === index && !isCheckActive,
                     'ff-custom--table-checked-active' : isCheckActive && list.checked,
                     'ff-custom--table-hover' : isCheckActive,'ff-custom--table-red':list.red,'ff-custom--table-blue':list.blue,'ff-custom--table-grey':list.grey,'ff-custom--table-black':list.black}"
            @click="active($event,index)"
            @dblclick="handDblClick($event, index)"
          >
            <td class="ff-custom--table-tdbox">
              <input
                v-if="hasChecked"
                type="checkbox"
                class="ff-custom--table-checkbox"
                :checked="list.checked"
                @change.stop="tdCheckChange(index)"
              >
              <span class="ff-custom--table-label">{{ hasNation? list.start : index + 1 }}</span>
            </td>
            <td
              v-for="(label, sub) of tHead"
              :key="sub"
              :class="{'ff-custom--align': label.type === 'NUMBER'}"
              title="111"
            >
              <el-popover
                v-if="label.name === 'IMG'"
                placement="right"
                trigger="hover"
                content=""                
              >
                <img
                  :src="list[label.name]"
                  alt=""
                >
                <img
                  slot="reference"
                  :src="list[label.name]"
                  alt=""
                  class="ff-custom--table-img"
                >
              </el-popover>
              <input
                v-else-if="label.type === 'input'"
                type="text"
                :value="list[label.name]"
                class="ff-custom--table-adjust"
                :type="label.limit"
                @input="adjustChange($event, list, label, index)"
                @blur="dataFocus($event, list, label, index)"
              >
              <my-text
                v-else-if="label.type === 'select'"
                :itemdata="list[label.name]"
                :disabled="false"
                :is-active="true"
                :has-label="false"
                class="ff-custom-select"
              />
              <span
                v-else-if="label.type === 'popup'"
                class="ff-custom--table-popup"
                @click.stop="popup(index)"
              >{{ list[label.name] }}</span>
              <span
                v-else
                :class="{'ff-custom--proname': label.colname === 'PS_C_PRO_ECODE'}"
                @click="rowDialog(label, list)" 
              >
                {{ label.position === 'fixed'?(list[label.name]?list[label.name].toFixed(2) : '') : list[label.name] }}
              </span>
            </td>
            <!-- 操作列 -->
            <td
              v-if="operation"
              style="text-decoration:underline;"
              @click="viewLog(list)"
            >
              {{$t('table.viewLog')}}
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
    >
      <table
        ref="customTable"
        class="ff-custom--table-content"
      >
        <thead>
          <tr>
            <th class="ff-custom--table-thbox">
              <input
                v-if="hasChecked"
                type="checkbox"
                class="ff-custom--table-checkbox"
                :checked="checked"
                @change.stop="checkedChange($event)"
              >
              <span class="ff-custom--table-label">{{$t('table.index')}}</span>
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
            <!-- 操作列 -->
            <th v-if="operation">
              {{$t('tips.operation')}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(list, index) of tBody"
            :class="{'ff-custom--table-active': sub === index && !isCheckActive,
                     'ff-custom--table-checked-active' : isCheckActive && list.checked,
                     'ff-custom--table-hover' : isCheckActive,'ff-custom--table-red':list.red,'ff-custom--table-blue':list.blue,'ff-custom--table-grey':list.grey,'ff-custom--table-black':list.black}"
            @click="active($event,index)"
            @dblclick="handDblClick($event, index)"
          >
            <td
              class="ff-custom--table-tdbox"
              title="111"
            >
              <input
                v-if="hasChecked"
                type="checkbox"
                class="ff-custom--table-checkbox"
                :checked="list.checked"
                @change.stop="tdCheckChange(index)"
              >
              <!-- <span class="ff-custom--table-label">{{hasNation? list.start : index + 1}}</span> -->
              <span class="ff-custom--table-label">{{ hasNation? list.start : index + 1 }}</span>
            </td>
            <td
              v-for="(label, sub) of tHead"
              :class="{'ff-custom--align': label.type === 'NUMBER'}"
              :title="list[label.name]"
            >
              <el-popover
                v-if="label.name === 'IMG'"
                placement="right"
                trigger="hover"
                content=""
              >
                <img
                  :src="list[label.name]"
                  alt=""
                >
                <img
                  slot="reference"
                  :src="list[label.name]"
                  alt=""
                  class="ff-custom--table-img"
                >
              </el-popover>
              <input
                v-else-if="label.type === 'input'"
                type="text"
                :disabled="isdisabled || !isActive"
                :value="list[label.name]"
                :type="label.limit"
                class="ff-custom--table-adjust"
                :class="{'ff-custom--table-disabeld': isdisabled || !isActive}"
                @input="adjustChange($event, list, label, index)"
                @blur="dataFocus($event, list, label, index)"
              >
              <my-text
                v-else-if="label.type === 'select'"
                :itemdata="list[label.name]"
                :disabled="false"
                :is-active="true"
                :has-label="false"
                class="ff-custom-select"
              />
              <span
                v-else-if="label.type === 'popup'"
                class="ff-custom--table-popup"
                @click.stop="popup(index)"
              >{{ list[label.name] }}</span>
              <span
                v-else
                :class="{'ff-custom--proname': label.colname === 'PS_C_PRO_ECODE'}"
                @click="rowDialog(label, list)"
              >
                {{ label.position === 'fixed'?(list[label.name]?list[label.name].toFixed(2) : '') : list[label.name] }}
              </span>
            </td>
            <!-- 操作列 -->
            <td
              v-if="operation"
              style="text-decoration:underline;"
              @click="viewLog(list)"
            >
              {{$t('table.viewLog')}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p
      v-if="isNOData"
      class="ff-custom--no-data"
    >
      {{$t('tips.noData')}}
    </p>
    <div
      v-if="isTotal && subtotalRow.length !== 0"
      class="ff-custom--table-total"
      :style="{'min-width': width,'padding-right': HasPadding? '17px': 0}"
    >
      <table>
        <thead>
          <tr>
            <th class="ff-custom--table-thbox">
              {{$t('table.summation')}}
            </th>
            <th
              v-for="(list, index) of subtotalRow"
              :class="{'ff-custom--align': tHead[index].type === 'NUMBER'}"
            >
              <!--<span v-if="list.isTotal">{{calculateTotal(list.name)}}</span>-->
              <span v-if="list">{{ list }}</span>
            </th>
          </tr>
          <tr>
            <th class="ff-custom--table-thbox">
              <input
                v-if="hasChecked"
                type="checkbox"
                class="ff-custom--table-checkbox"
                :checked="checked"
                @change.stop="checkedChange($event)"
              >
              <span class="ff-custom--table-label">{{$t('table.index')}}</span>
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
                     'ff-custom--table-hover' : isCheckActive,'ff-custom--table-red':list.red,'ff-custom--table-blue':list.blue,'ff-custom--table-grey':list.grey,'ff-custom--table-black':list.black}"
            @click="active($event,index)"
            @dblclick="handDblClick($event, index)"
          >
            <td class="ff-custom--table-tdbox">
              <input
                v-if="hasChecked"
                type="checkbox"
                class="ff-custom--table-checkbox"
                :checked="list.checked"
                @change.stop="tdCheckChange(index)"
              >
              <span class="ff-custom--table-label">{{ hasNation? list.start : index + 1 }} {{ list.grey }}</span>
            </td>
            <td
              v-for="(label, sub) of tHead"
              :key="sub"
              :class="{'ff-custom--align': label.type === 'NUMBER'}"
            >
              <el-popover
                v-if="label.name === 'IMG'"
                placement="right"
                trigger="hover"
                content=""
              >
                <img
                  :src="list[label.name]"
                  alt=""
                >
                <img
                  slot="reference"
                  :src="list[label.name]"
                  alt=""
                  class="ff-custom--table-img"
                >
              </el-popover>
              <input
                v-else-if="label.type === 'input'"
                type="text"
                :value="list[label.name]"
                class="ff-custom--table-adjust"
                :type="label.limit"
                @input="adjustChange($event, list, label, index)"
                @blur="dataFocus($event, list, label, index)"
              >
              <my-text
                v-else-if="label.type === 'select'"
                :itemdata="list[label.name]"
                :disabled="false"
                :is-active="true"
                :has-label="false"
                class="ff-custom-select"
              />
              <span
                v-else-if="label.type === 'popup'"
                class="ff-custom--table-popup"
                @click.stop="popup(index)"
              >{{ list[label.name] }}</span>
              <span
                v-else
                :class="{'ff-custom--proname': label.colname === 'PS_C_PRO_ECODE'}"
                @click="rowDialog(label, list)"
              >
                {{ label.position === 'fixed'?(list[label.name]?list[label.name].toFixed(2) : '') : list[label.name] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-else-if="calculation && tBody.length!==0"
      class="ff-custom--table-total"
      :style="{'min-width': width,'padding-right': HasPadding? '17px': 0}"
    >
      <table>
        <thead>
          <tr>
            <th class="ff-custom--table-thbox">
              {{$t('table.summation')}}
            </th>
            <th
              v-for="(list, index) of tHead"
              :class="{'ff-custom--align': list.type === 'NUMBER'}"
            >
              <span v-if="list.isTotal">{{ calculateTotal(list.name, list.position) }}</span>
            </th>
          </tr>
          <tr>
            <th class="ff-custom--table-thbox">
              <input
                v-if="hasChecked"
                type="checkbox"
                class="ff-custom--table-checkbox"
                :checked="checked"
                @change.stop="checkedChange($event)"
              >
              <span class="ff-custom--table-label">{{$t('table.index')}}</span>
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
            @dblclick="handDblClick($event, index)"
          >
            <td class="ff-custom--table-tdbox">
              <input
                v-if="hasChecked"
                type="checkbox"
                class="ff-custom--table-checkbox"
                :checked="list.checked"
                @change.stop="tdCheckChange(index)"
              >
              <span class="ff-custom--table-label">{{ hasNation ? list.start : index + 1 }} {{ index }}</span>
            </td>
            <td
              v-for="(label, sub) of tHead"
              :class="{'ff-custom--align': label.type === 'NUMBER'}"
            >
              <el-popover
                v-if="label.name === 'IMG'"
                placement="right"
                trigger="hover"
                content=""
              >
                <img
                  :src="list[label.name]"
                  alt=""
                >
                <img
                  slot="reference"
                  :src="list[label.name]"
                  alt=""
                  class="ff-custom--table-img"
                >
              </el-popover>
              <input
                v-else-if="label.type === 'input'"
                type="text"
                :value="list[label.name]"
                class="ff-custom--table-adjust"
                :type="label.limit"
                @input="adjustChange($event, list, label, index)"
                @blur="dataFocus($event, list, label, index)"
              >
              <my-text
                v-else-if="label.type === 'select'"
                :itemdata="list[label.name]"
                :disabled="false"
                :is-active="true"
                :has-label="false"
                class="ff-custom-select"
              />
              <span
                v-else-if="label.type === 'popup'"
                class="ff-custom--table-popup"
                @click.stop="popup(index)"
              >{{ list[label.name] }}</span>
              <span
                v-else
                :class="{'ff-custom--proname': label.colname === 'PS_C_PRO_ECODE'}"
                @click="rowDialog(label, list)"
              >
                {{ label.position === 'fixed'?(list[label.name]?list[label.name].toFixed(2) : '') : list[label.name] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 列表指定弹框 -->
    <tips-dialog
      v-if="customDialog.show"
      class="custom-dialog"
      :visible.sync="customDialog.show"
      :title="customDialog.title"
      :close-on-click-modal="false"
      top="48%"
      :show-close="true"
    >
      <component
        :is="customComponent"
        :ref="customComponent"
        :query="customDialog.query"
        :obj-list="objList"
        @closeActionDialog="closeCustomDialog"
      />
    </tips-dialog>
  </div>
</template>
<style lang="less" scoped type="text/less">
  .ff-query--table {
    /*  margin-right: 10px;*/
    overflow-y: hidden;
    overflow-x: auto;
    flex: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    // height: 100%;
  //  height: 400px;
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
          content: '';
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
      color: #E80000;
      position: relative;
      box-sizing: border-box;
      background-color: #fff;
      text-align: left;
      flex-basis: 30px;
      /*overflow-y: hidden;*/
      height: 30px;
      table {
        width: 100%;
        th,td {
          min-width: 80px;
          height: 28px;
          padding-left: 18px;
          padding-right: 4px;
          white-space: nowrap;
          box-sizing: border-box;
          background-color: #fff;
          border: 1px solid #D8D8D8;
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
      background-color: #F5F6FA;
      position: relative;
      border-bottom: 1px solid #E6E6E6;
      height: 24px;
      /*overflow-y: hidden;*/
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
      th, td {
        height: 24px;
        box-sizing: border-box;
        min-width: 80px;
        white-space: nowrap;
        padding-left: 18px;
        padding-right: 4px;
        text-align: left;
        span:not(:first-child) {
          display: inline;
        }
        &:last-child {
          padding-right: 20px;
        }
      }
     th:nth-child(1){
        width: 100px;
     }
     th:nth-child(6){
        width: 10%;
     }
     th:nth-child(4){
        width: 100px;
     }
     th:nth-child(2),th:nth-child(3),th:nth-child(5){
         width: 200px;
      }
      td:nth-child(2),td:nth-child(3),td:nth-child(5){
         width: 250px;
      }
      td:nth-child(1) {
        width:100px;
      }
      td:nth-child(4) {
        width: 100px;
      }
      td:nth-child(6) {
        width: 10%;
      }
      td:nth-child(2) , td:nth-child(3), td:nth-child(5) {
        span{
          width:250px;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
        background-color: #F5F6FA;
        /*font-size: 0;*/
      }
      td {
        border-bottom: 1px solid #D8D8D8;
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
        border: 1px solid #E6E6E6;
        font-size: 12px;
        padding: 0 2px;
        box-sizing: border-box;
        border-radius: 2px;
        &:focus {
          border-color: #20a0ff;
        }
      }
      .ff-custom--table-disabeld {
        background-color: transparent;
        border: none;
      }
      .ff-custom--table-popup {
        text-decoration: underline;
        cursor: pointer;
      }
      .ff-custom--proname {
        cursor: pointer;
        color: #0F8EE9;
        text-decoration: underline;
      }
      .ff-custom--table-thbox {
        min-width: 60px;
      }
      .ff-custom--table-tdbox {
        font-size: 0;
        color: #007AE5;
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
        color: #f00;
      }
      .ff-custom--table-blue{
        color: #0000ff;
      }
      .ff-custom--table-grey{
        color: #999;
      }
      .ff-custom--table-black{
        color: #000;
      }
    }
    .ff-custom--table-content{

    }
    .ff-custom--table-lower {
      height: 24px;
    }
    .ff-custom--table-layer {
      position: relative;
      background-color: #fff;
      overflow-y: auto;
      border-top: 1px solid #D8D8D8;
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
  }

  .M_table {
    .ff-custom--table {
      height: 218px !important
    }
  }
</style>
<style lang="less" type="text/less">
  .ff-custom-select {
    .el-input__inner {
      height: 22px !important;
      font-size: 12px !important;
      border-radius: 4px !important;
    }
  }
</style>
<script>
  /*  表头：
    order：true表示有排序
    isTotal：true，表示有合计
    type: popup 表示是弹框
    type: input 表示是输入框
    genre: NUMBER 表示输入框的输入类型
  */
  import TipsDialog from '../dialog/mydialog.vue';
  import MyText from '../element/input.vue';
  // import i18n from '../../assets/js/i18n'

  // const _import_custom = file => require(`@/components/views/${file}.vue`).default;
  export default {
    name: 'P_customTable',
    props: {
      tHead: {
        type: Array,
        default: () => []
      }, // 表头
      tBody: {
        type: Array,
        default: () => []
      }, // 表内容
      isTotal: {
        type: Boolean,
        default: true
      }, // 是否显示合计
      subtotalRow: {
        type: Array,
        default: () => []
      }, // 总计一栏
      hasChecked: {
        type: Boolean,
        default: true
      }, // 是否存在多选框
      hasNation: {
        type: Boolean,
        default: true
      }, // 是否使用下标为序号
      isdisabled: {
        type: Boolean
      }, // 用于判断状态是否变更
      isActive: Boolean, // true显示 false表示禁用
      calculation: Boolean, // 是否动态计算
      objList: {}, // 查询配销中心
      activeSub: Boolean, // 用来判断刷新数据时高亮是否变第一个(true为不变)
      isCheckActive: Boolean, // 判断选中后是否要高亮的
      operation: {
        type: Boolean,
        default: false
      } // 是否显示操作列
    },
    components: {
      TipsDialog,
      MyText
    },
    data() {
      return {
        contentStyleObj: { height: '' }, // 表格高度
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
          query: {}, //
        },
        customComponent: '', // 组件名
        distribId: ''// 配销中心ID
      };
    },
    methods: {
      // 查看日志方法
      viewLog(e) {
        this.$emit('viewLog', e);
      },
      getHeight() {
        this.contentStyleObj.height = `${window.innerHeight - 381}px`;
      }, // 表格高度自适应
      popup(index) {
        this.sub = index;
        this.$emit('popup', index);
      }, // 弹框类型向上派发事件
      calculateTotal(name, type) {
        let total = 0;
        this.tBody.map((obj) => {
          total = this.M_add(total, obj[name] ? Number(obj[name]) : 0);
        });
        return type === 'fixed' ? total.toFixed(2) : total;
      }, // 计算合计
      checkedChange(e) {
        this.checked = e.target.checked;
        this.tBody.map((obj, index) => {
          this.tBody[index].checked = e.target.checked;
        });
        this.$emit('change');
      }, // 全选
      tdCheckChange(index) {
        let total = 0;
        /* this.tBody[index].checked = !this.tBody[index].checked; */
        this.$set(this.tBody[index], 'checked', !this.tBody[index].checked);
        this.tBody.map((obj) => {
          if (obj.checked) total += 1;
        });
        this.checked = total === this.tBody.length;
        this.$emit('change', index);
      }, // 单个选中
      active(event, index) {
        /* if(this.sub === index) return; */
        /* this.$listeners.loadChange(); */
        const obj = {
          y: event.layerY,
          scrollTop: this.$refs.customTableBox.scrollTop,
          sub: index
        };
        if (this.sub === index) return;

        this.sub = index;
        this.$emit('popShow', obj);// 显示右边的弹框
      }, // 高亮激活
      up(index) {
        this.sortSub = index;// 那个th排序
        this.sortStyle = 'up';// 排序方式
        this.$emit('asc', index);// 升序
      }, // 升序
      down(index) {
        this.sortSub = index;// 那个th排序
        this.sortStyle = 'down';// 排序方式
        this.$emit('des', index);// 降序
      }, // 降序
      handDblClick(event, index) {
        this.$emit('handDblClick', index);
      }, // 双击事件
      dataFocus(e, list, label, index) {
        if (label.genre === 'NUMBER') {
          if (e.target.value === '') {
            list[label.name] = e.target.value = '';
          } else {
            list[label.name] = e.target.value = Number(e.target.value).toFixed(label.fixed);
          }
        }
        if (this.oldDate[index][label.name] === list[label.name]) { // 没有变化删除上次添加的
          if (this.amendDate[list.start] !== undefined) this.$delete(this.amendDate, list.start);
        } else {
          this.amendDate[list.start] = Object.assign({}, list);
        }
        this.$emit('amendChange', this.amendDate);
      },
      adjustChange(e, list, label, index) {
        if (label.genre === 'NUMBER') {
          const reg = new RegExp('[^0-9\\.]|(?<=\\..*)\\.|^\\.', 'g');
          list[label.name] = e.target.value = e.target.value.replace(reg, '');
        } else if (label.genre === 'STRING') {
          list[label.name] = e.target.value;
        }
        if (this.oldDate[index][label.name] === list[label.name]) { // 没有变化删除上次添加的
          if (this.amendDate[list.start] !== undefined) this.$delete(this.amendDate, list.start);
        } else {
          this.amendDate[list.start] = Object.assign({}, list);
        }
        this.$emit('amendChange', this.amendDate);
      }, // 输入框值变化
      findId() {
        if (Object.prototype.toString.call(this.objList) === '[object Array]') {
          this.objList.map((obj) => {
            if (obj.childs) {
              obj.childs.map((data) => {
                if (data.name === '配销中心') this.distribId = data.refobjid;
              });
            }
          });
        }
      }, // 查询配销中心ID
      rowDialog(th, val) {
        if (th.colname !== 'PS_C_PRO_ECODE') return;
        this.findId();
        const _self = this;
        let value = {};
        if (th.customerurl.tableurl) {
          // 定制界面
          if (th.customerurl.objdistype == 'popwin') {
            // 弹框形式
            const refField = th.customerurl.refobjid.split(',');// 需要传递多个条件
            value = {};
            for (const field of refField) {
              const temp = val[field];
              if (temp) {
                value[field] = temp;
              } else {
                value[field] = '';
              }
            }
            value.CP_C_DISTRIB_ID = this.distribId;
            _self.customDialog.show = true;
            _self.customDialog.title = th.customerurl.reftabdesc;
            _self.customDialog.query = value;
            const componentName = th.customerurl.tableurl.split('?')[0].replace(/\//g, '_');
            // Vue.component(componentName, Vue.extend(_import_custom(th.customerurl.tableurl)));
            _self.customComponent = componentName;// 动态加载配置的tableurl路径
          }
        }
      }, // 列表公共弹框
      closeCustomDialog() {

      },
      M_add(a, b) { // 相加
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
        return e = Math.pow(10, Math.max(c, d)), (this.M_mul(a, e) + this.M_mul(b, e)) / e;
      },
      M_mul(a, b) { // 主体
        let c = 0;
        const d = a.toString();
        const e = b.toString();
        try {
          c += d.split('.')[1].length;
        } catch (f) {
        }
        try {
          c += e.split('.')[1].length;
        } catch (f) {
        }
        return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
      }
    },
    watch: {
      changeMainSize() {
        this.height.height = `${window.offsetHeight - 140 - 20 - 200}px`;
      },
      tBody(val) {
        this.oldDate = JSON.parse(JSON.stringify(val));
        if (val.length === 0) {
          this.checked = false;
          this.isNOData = true;
        } else {
          this.isNOData = false;
        }
        if (!this.activeSub) this.sub = 0;
        this.oldDate = val.map(obj => Object.assign({}, obj));// 初始化数据
        this.amendDate = {};// 初始修改了的数据
        this.$emit('amendChange', {});
        if (this.tBody.length === 0) return;
        this.$nextTick(() => {
          this.width = `${this.$refs.customTable.clientWidth}px`;
          this.HasPadding = this.$refs.customTable.clientHeight - 24 > this.$refs.customTableBox.clientHeight;
        });
      },
    },
    mounted() {
      this.oldDate = JSON.parse(JSON.stringify(this.tBody));
      this.$nextTick(() => {
        try {
          this.width = `${this.$refs.customTable.clientWidth}px`;
          this.HasPadding = this.$refs.customTable.clientHeight - 24 > this.$refs.customTableBox.clientHeight;
        } catch (e) {}
      });
    },

    beforeCreate() {
    this.$t = $i18n.t.bind($i18n)
    },

    created() {
      window.addEventListener('resize', this.getHeight);
      this.getHeight();
    },
    destroyed() {
      window.removeEventListener('resize', this.getHeight);
    },
    activated() {
      this.checked = false;
      if (this.tBody.length === 0) return;
      this.$nextTick(() => {
        this.width = `${this.$refs.customTable.clientWidth}px`;
        this.HasPadding = this.$refs.customTable.clientHeight - 24 > this.$refs.customTableBox.clientHeight;
      });
    }
  };
</script>
