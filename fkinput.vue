<template>
  <div class="item-input item-col" :class="{ hidden: getHideColumn(itemdata) }">
    <label v-if="itemdata.name" class="title">
      <i v-if="itemdata.isnotnull">*</i>
      {{ itemdata.name }}:
    </label>

    <Icon
      v-if="!itemdata.readonly && (itemdata.fkdisplay === 'mrp' || itemdata.fkdisplay === 'drp')"
      class="clear"
      type="ios-close-circle"
      @click="clear"
    />

    <div v-if="itemdata.readonly || !isActive || isdisabled">
      <input
        v-model="itemdata.valuedata"
        class="disabled table-input add-input"
        type="text"
        disabled
      />
    </div>
    
    <div v-else style="position: relative">
      <!-- 遮挡输入建议组件的盒子，点击唤出下拉多选弹出框 -->
      <span
        v-if="itemdata.fkdisplay === 'mrp'"
        class="clickbox"
        @click.stop="filterInputName(itemdata)"
      />
      <!-- elementUI 的输入建议组件 -->

      <el-autocomplete
        v-if="itemdata.isfk"
        :ref="'autocomplete' + itemdata.colname"
        v-model="itemdata.valuedata"
        :disabled="itemdata.fkdisplay === 'mrp'"
        class="table-input add-input"
        :class="itemdata.colname"
        :popper-class="'fkAutocomplete' + itemdata.colname"
        :colname="itemdata.colname"
        type="text"
        :fetch-suggestions="querySearchAsync"
        :trigger-on-focus="false"
        @select="handleSelect"
        @change="inputChange(itemdata)"
        @keyup.native="inputKeyUp(itemdata, $event)"
        @keyup.enter.native="autocompleteEnter(itemdata, $event)"
        @blur="autocompleteBlur(itemdata)"
      >
        <!-- 模糊搜索弹出的搜索框结果 -->
        <template slot-scope="{ item }">
          <div v-for="(value, key, index) of item" :key="index">
            <span v-if="key == 'value'" :class="key" :title="value">{{
              value
            }}</span>
          </div>
        </template>
      </el-autocomplete>

      <input
        v-else
        v-model="itemdata.valuedata"
        class="table-input add-input"
        :class="itemdata.colname"
        :colname="itemdata.colname"
        type="text"
        @change="inputChange(itemdata)"
        @keyup.enter="itemInputEnter($event)"
      />

      <svg
        v-if="itemdata.isfk && itemdata.fkdisplay === 'pop'"
        class="ffish-icon danxuan"
        aria-hidden="true"
        @click.stop="filterInputName(itemdata)"
      >
        <use xlink:href="#icon-danchuangdanxuan" />
      </svg>
      <!-- 弹出框，下拉多选的弹出框 -->
      <el-popover
        v-if="
          itemdata.isfk &&
          (itemdata.fkdisplay == 'drp' || itemdata.fkdisplay == 'mrp')
        "
        v-model="popoverShow[itemdata.colname]"
        :data-tag="popoverShow[itemdata.colname]"
        class="popover-icon"
        placement="bottom"
        title
        trigger="manual"
      >
        <i
          v-if="itemdata.fkdisplay === 'drp'"
          slot="reference"
          class="iconfont"
          @click.stop="filterInputName(itemdata)"
          >&#xe621;</i
        >
        <i
          v-if="itemdata.fkdisplay === 'mrp'"
          slot="reference"
          class="iconfont"
          @click.stop="filterInputName(itemdata)"
          >&#xe622;</i
        >
        <fk-table
          v-if="popoverShow[itemdata.colname]"
          class="view-fktable"
          :version="version"
          :input-box="itemdata.fkdisplay == 'mrp' ? true : false"
          :fkid="itemdata.colid"
          :single="itemdata.fkdisplay === 'drp' ? true : false"
          :item="getFixedColumns(itemdata)"
          :precolnameslist="itemdata.precolnameslist"
          :colname="itemdata.colname"
          :itemdata="itemdata"
          @pop="fktableShow"
        />
      </el-popover>
    </div>

    <select-dialog
      :title="SelectionData.item.name"
      :visible.sync="SingleSelect.show"
      :show-close="true"
      :select-config-list="SelectionData.config"
      :table-rows="SelectionData.row"
      :thead="SelectionData.thead"
      :table-datas="SelectionData.tableAllDatas"
      @getChooseItem="getSelectChooseItem"
      @selectPageCurrentChange="selectPageCurrentChange"
      @selectPageSizeChange="selectPageSizeChange"
      @selectionQueryTable="selectionQueryTable"
    />
  </div>
</template>

<script>
import objinput_dz from "./js/fkinput.js";
export default objinput_dz;
</script>

<style scoped lang="less">
@import "css/fkinput.less";
</style>
