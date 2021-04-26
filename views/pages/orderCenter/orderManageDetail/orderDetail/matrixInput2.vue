<template>
  <div
    v-if="!isdisabled && isActive"
    class="ff-input--dialog--matrix"
  >
    <div
      class="ff-order-detail-search"
      @click.stop
    >
      <span>商品编码︰</span>
      <el-popover
        ref="popover"
        v-model="visible"
        placement="bottom"
        width="145"
        trigger="manual"
        transition="el-zoom-in-top"
        :visible-arrow="false"
        popper-class="ff-input--dialog-popover"
      >
        <div
          class="ff-input--dialog-pop"
          @click.stop
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
          style="display: inline-block;position: relative;"
        >
          <input
            ref="searchInput"
            v-model="search"
            type="text"
            :disabled="isdisabled || !isActive"
            placeholder="请输入条码、商品编码"
            class="ff-search-input"
            @keyup.enter.stop="entry"
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
<style lang="less">
  @import "~@/css/pages/orderCenter/orderManageDetail/orderDetail/matrixInput2.less"; 
</style>
<script>
  import matrixInput2 from '@/js/pages/orderCenter/orderManageDetail/orderDetail/matrixInput2.js';

  export default matrixInput2;
</script>
