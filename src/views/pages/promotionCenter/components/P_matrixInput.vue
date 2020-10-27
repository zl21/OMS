<template>
  <div
    v-if="!isdisabled && isActive"
    class="ff-input--query--matrix"
  >
    <div
      class="ff-order-detail-search"
      @click.stop=""
    >
      <el-popover
        ref="popover"
        v-model="visible"
        placement="bottom"
        trigger="manual"
        transition="el-zoom-in-top"
        :visible-arrow="false"
        popper-class="ff-input--matrix-popover"
      >
        <div
          class="ff-input--dialog-pop"
          @click.stop=""
        >
          <!--@keyup.entry="optionEntry"-->
          <ul>
            <li
              v-for="(list, index) of lists"
              :key="index"
              class="ff--pop-option"
              :class="{'ff--pop-option-active': sub === index}"
              @click.stop="optionClick(list, index)"
            >
              <span>{{ list.ECODE }}</span>
              <span>{{ list.ENAME }}</span>
            </li>
          </ul>
        </div>
        <div
          slot="reference"
          style="display: inline-block;position: relative;width:100%;"
        >
          <!--防止显示提示的密码列表-->
          <!--<input type="password" id="preventTipsPassword" style="width: 0; border: 0 none"/>
          <input
            type="text"
            class="ff-search-input pinyin"
            placeholder="请输入条码、商品编码"
            @keyup="keyup($event)"
            @input="keyinput($event)"
            @compositionstart="composition($event, 'start')"
            @compositionend="composition($event, 'end')"
            readonly
            onfocus="$(this).removeAttr('readonly');"
            @keyup.enter.stop="entry"
          />-->
          <input
            ref="searchInput"
            v-model="search"
            type="text"
            :disabled="isdisabled || !isActive"
            placeholder=""
            class="ff-search-input"
            @focus="handFocus($event)"
          >
        </div>
      </el-popover>
      <div
        v-if="matrixInput || isInputShow"
        class="ff-input--dialog--number"
      >
        <span>数量︰</span>
        <input
          type="text"
          :value="count"
          :disabled="isdisabled"
          class="ff-search-input"
          @input="countChange($event)"
          @keyup.enter.stop="entry"
        >
      </div>
    </div>
    <drag-dialog
      v-if="Dialog"
      ref="matrixInputDialog"
      title="矩阵录入"
      :visible.sync="Dialog"
      :close-on-click-modal="false"
      :show-close="true"
    >
      <matrix
        ref="popMatrix"
        v-loading="generalLoading"
        class="ff-input-matrix--self"
        :general="true"
        :obj-list="objList"
        :encode="search"
        :dialog.sync="Dialog"
        v-bind="$attrs"
        :select-item="selectItem"
        :objid="objid"
        :tablename="tablename"
        :isdisabled="isdisabled"
        :is-active="isActive"
        :input-list="inputList"
        :save="save"
        :editsave="editsave"
        :stopsave="stopsave"
        @changeStopSave="changeStopSave"
        @changeEditSave="changeEditSave"
        @objectEdit="objectEdit"
        @customize="customize"
        @changeSave="changeSave"
        @loadChange="generalLoadChange"
        @refreshData="refreshData"
        @changeHeight="changeHeight"
        @amendData="amendData"
        @itemInputEnter="itemInputEnter"
        @newLySave="newLySave"
      />
    </drag-dialog>
  </div>
</template>
<style lang="less" type="text/less">
.ff-input-matrix--self {
  .ff-matrix--table-content {
    max-width: 800px;
    max-height: 400px;
    overflow: auto;
  }
}
.ff-input--matrix-popover {
  right: 0;
  top: 33px;
  background-color: #fff;
  margin-left:-60px;
  /*min-height: 100px;*/
  .ff-input--dialog-pop {
    position: absolute;
    background-color: #fff;
    width:200px;
    padding: 6px;
    box-sizing: border-box;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.04), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
    .ff--pop-option {
      height: 24px;
      box-sizing: border-box;
      align-items: center;
      display: flex;
      span {
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      &:hover {
        background-color: #e4e8f1;
      }
      &:active {
        background-color: #0082e6;
      }
    }
    .ff--pop-option-active {
      background-color: #20a0ff;
      &:hover {
        background-color: #20a0ff;
      }
    }
  }
}
</style>
<style lang="less" scoped type="text/less">
.ff-input--query--matrix {
  display: inline-block;
  vertical-align: middle;
  font-size: 12px;
  position: relative;
  .ff-input--dialog--number {
    display: inline-block;
    margin-left: 30px;
  }
  .ff-order-detail-search {
    line-height: 33px;
  }
  .ff-search-input {
    width: 100%;
    height: 24px;
    box-sizing: border-box;
    padding: 0 6px;
    border-radius: 2px;
    transition: border-color 0.2s ease;
    border: 1px solid #dcdcdc;
    &:focus,
    &:hover {
      border-color: #20a0ff;
    }
    &.pinyin {
      position: absolute;
      top: 4px;
    }
  }
  input[type="password"].ff-search-input.pinyin {
    color: transparent;
    opacity: 0.1;
  }
}
</style>
<script>
  import P_matrixInput from "@/js/pages/promotionCenter/components/P_matrixInput";
  export default P_matrixInput;
</script>
