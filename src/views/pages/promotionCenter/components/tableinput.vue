<template>
  <div
    class="item-input item-col"
    :class="{
      readonly: itemdata.readonly || !isActive || isdisabled,
      hidden: getHideColumn(itemdata),
      isnotnull: itemdata.isnotnull
    }"
    :style="{
      overflow: 'hidden',
      height: itemdata.row * 24 + (itemdata.row - 1) * 8 + 'px',
      'line-height': itemdata.row * 24 + (itemdata.row - 1) * 8 + 'px'
    }"
  >
    <!-- <label
      class="title"
      :title="itemdata.name"
      :style="{'line-height':itemdata.row*24 + (itemdata.row-1)*8 + 'px'}"
      v-if="hasLabel"
    >
      <el-tooltip
        class="item"
        effect="light"
        v-if="itemdata.comment"
        :content="itemdata.comment"
        placement="top"
      >
        <i class="iconfont" @click.stop>&#xe640;</i>
      </el-tooltip>
      <i v-if="itemdata.isnotnull">*</i>
      {{itemdata.name}}:&nbsp;
    </label> -->
    <div
      v-if="!isActive || isdisabled"
      class="input-wrap"
    >
      <span
        v-if="!itemdata.ispassword"
        class="readonly-span"
        style="width: 100%"
        :class="itemdata.colname"
      >{{ itemdata.valuedata ? itemdata.valuedata : "" }}</span>
      <input
        v-else
        type="password"
        class="readonly"
        readonly="readonly"
        disabled
        value="111111"
      >
    </div>
    <div
      v-else
      class="input-wrap"
    >
      <span
        v-if="itemdata.readonly && !itemdata.ispassword"
        class="readonly-span"
        :class="itemdata.colname"
      >{{ itemdata.valuedata ? itemdata.valuedata : "" }}</span>
      <input
        v-else-if="itemdata.ispassword && itemdata.readonly"
        class="readonly"
        readonly="readonly"
        disabled
        type="password"
        value="111111"
      >
      <div
        v-else
        class="input-inner"
        :class="itemdata.fkdisplay == 'mop' ? 'mop' : ''"
      >
        <el-autocomplete
          v-if="itemdata.isfk && itemdata.fkdisplay != 'mop'"
          :ref="'autocomplete' + itemdata.colname"
          v-model="itemdata.valuedata"
          :readonly="isdisabled"
          class="table-input"
          :class="itemdata.colname"
          :popper-class="'fkAutocomplete' + itemdata.colname"
          type="text"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          @select="handleSelect"
          @keyup.native="inputKeyUp(itemdata, $event)"
          @keyup.enter.native="autocompleteEnter(itemdata, $event)"
          @blur="autocompleteBlur"
        >
          <!-- <template slot-scope="props">

            <span class="addr">{{ props.item.value }}</span>
            <div class="name">{{ props.item.DBNAME }}</div>
            <span class="addr">{{ props.item.DESCRIPTION }}</span>
          </template>-->
          <template slot-scope="{ item }">
            <span
              v-for="(value, key, index) of item"
              :key="index"
              :class="`length${Object.keys(item).length - 2}`"
              :title="value"
            >
              <span v-if="key != 'id' && key != 'value'">{{ value }}</span>
            </span>
          </template>
        </el-autocomplete>

        <input
          v-else-if="itemdata.ispassword"
          v-model="itemdata.valuedata"
          :maxlength="itemdata.length"
          :readonly="isdisabled"
          type="password"
          class="table-input obj-input"
          :class="itemdata.colname"
          autocomplete="off"
          @change="inputChange(itemdata)"
          @keyup="inputKeyUp(itemdata, $event)"
          @keyup.enter="itemInputEnter($event)"
        >

        <input
          v-else
          :ref="'autocomplete' + itemdata.colname"
          v-model="itemdata.ECODECOL"
          :maxlength="
            itemdata.type === 'NUMBER' ? itemdata.length + 1 : itemdata.length
          "
          :readonly="isdisabled"
          type="text"
          class="table-input obj-input"
          :class="[itemdata.colname, itemdata.fkdisplay]"
          @change="inputChange(itemdata)"
          @keyup="inputKeyUp(itemdata, $event)"
          @keyup.enter="itemInputEnter($event)"
          @blur="InputBlur"
          @mouseover="autocompleteOver"
          @mouseout="autocompleteOut"
        >

        <svg
          v-if="itemdata.isfk && itemdata.fkdisplay === 'pop'"
          class="ffish-icon danxuan"
          aria-hidden="true"
          @click.stop="filterInputName(itemdata)"
        >
          <use xlink:href="#icon-danchuangdanxuan" />
        </svg>
        <div
          v-if="itemdata.fkdisplay == 'mrp' || itemdata.fkdisplay == 'mop'"
          class="deleteDiv"
          @mouseover="DeleteOver"
          @mouseout="DeleteOut"
        >
          <i
            class="iconfont"
            @click.stop="DeleteClick"
            @mouseover.stop="DeleteIconOver"
            @mouseout.stop="DeleteIconOut"
          >&#xe638;</i>
        </div>

        <p
          v-if="itemdata.fkdisplay == 'mop'"
          class="mop"
          :class="'mop' + itemdata.colname"
        >
          <i
            class="iconfont"
            @click.stop="filterInputName(itemdata)"
          >&#xe62f;</i>
          <el-popover
            placement="right"
            trigger="click"
            @show="showFkMore"
          >
            <i
              slot="reference"
              class="iconfont"
              style="cursor: pointer;"
            >&#xe61f;</i>

            <ul class="fkMore">
              <li @click.stop="filterInputName(itemdata)">
                {{ ChineseDictionary.MORESCREENING }}
              </li>
              <li
                v-if="itemdata.reftable !== 'VP_C_VIP_ACC'"
                @click.stop="buttonImoprt(itemdata)"
              >
                {{ ChineseDictionary.IMPORT }}
              </li>
              <li
                v-for="item in modelList"
                :key="item.id"
                @click="modelClick(item)"
              >
                <span :title="item.key">{{ item.key }}</span>
                <i
                  v-if="item.value"
                  class="iconfont"
                  @click.stop="modelDelete(item)"
                >&#xe6b4;</i>
              </li>
            </ul>
            <form
              role="form"
              method="POST"
              enctype="multipart/form-data"
              style="display: none"
            >
              <input
                :id="itemdata.colname + 'mopfile'"
                type="file"
                style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;display: none"
                @change="uploadFileChange(itemdata, $event)"
              >
            </form>
          </el-popover>
        </p>

        <el-popover
          v-if="
            itemdata.isfk &&
              (itemdata.fkdisplay == 'drp' || itemdata.fkdisplay == 'mrp')
          "
          v-model="popoverShow[itemdata.colname]"
          class="popover-icon"
          placement="bottom"
          title
          trigger="manual"
        >
          <div slot="reference">
            <i
              v-if="itemdata.fkdisplay == 'drp'"
              slot="append"
              class="iconfont"
              @click.stop="filterInputName(itemdata)"
            >&#xe621;</i>
            <i
              v-if="itemdata.fkdisplay == 'mrp'"
              slot="append"
              class="iconfont"
              @click.stop="filterInputName(itemdata)"
            >&#xe622;</i>
          </div>
          <fk-table
            v-if="popoverShow[itemdata.colname]"
            class="view-fktable selection-dialog"
            :fkid="itemdata.colid"
            :single="itemdata.fkdisplay == 'drp' ? true : false"
            :default-selected-ids="
              defaultSelectedIds ? String(defaultSelectedIds).split(',') : []
            "
            :item="getFixedColumns(itemdata)"
            :colname="itemdata.colname"
            :precolnameslist="itemdata.precolnameslist"
            :refcolprem="itemdata.refcolprem"
            :itemdata="itemdata"
            :has-label="hasLabel"
            @pop="fktableShow"
          />
        </el-popover>
      </div>
    </div>

    <select-dialog
      v-if="SelectionData.item.fkdisplay === 'pop' && SingleSelect.show"
      class="selection-dialog"
      :title="SelectionData.item.fkdesc"
      :visible.sync="SingleSelect.show"
      :show-close="true"
      :select-config-list="SelectionData.config"
      :table-rows="SelectionData.row"
      :thead="SelectionData.thead"
      :table-datas="SelectionData.tableAllDatas"
      @visible-change="visibleChange"
      @getChooseItem="getSelectChooseItem"
      @selectPageCurrentChange="selectPageCurrentChange"
      @selectPageSizeChange="selectPageSizeChange"
      @selectionQueryTable="selectionQueryTable"
    />

    <!-- 弹框多选 -->
    <!-- :tablename="fkDialog.tablename"
    :tableid="fkDialog.tableid"-->
    <fkdialog
      v-if="fkDialog.dialog && itemdata.reftable !== 'VP_C_VIP_ACC'"
      :tablename="itemdata.reftable"
      :tableid="itemdata.reftableid"
      :right-list="fkDialog.lists"
      :is-object="isObject"
      :append-to-body="layer"
      :fkshow.sync="fkDialog.dialog"
      :is-one-data="itemdata.isOneData"
      @easyData="getFkdialog"
    />
    <advanced-search
      v-if="fkDialog.dialog && itemdata.reftable === 'VP_C_VIP_ACC'"
      :search-conditions="fkDialog.lists"
      @dialogClose="dialogClose"
      @advancedData="advancedData"
    />
    <!-- 导入提示 -->
    <import-dialog
      v-if="importData.importDialog"
      :visible.sync="importData.importDialog"
      :show-close="true"
      :title="importData.importDialogTitle"
      :tablename="storageItem.name"
      @confirmImport="searchData('fresh')"
    />

    <!-- 消息提示 -->
    <my-dialog
      v-if="errorDialog"
      :title="errorDialogTitle"
      :visible.sync="errorDialog"
      :show-close="true"
      class="messageDialog"
      :close-on-click-modal="false"
      :class="errorDialogClass"
    >
      <errorMessage
        :error-message="errorData"
        :dialog-back="errorDialogBack"
        :dialog-class="errorDialogClass"
        @refreshbizlines="errorDialogClose"
      />
    </my-dialog>
  </div>
</template>

<script>
  import tableinput from '@/js/pages/promotionCenter/components/tableinput';

  export default tableinput;
</script>

<style lang="less" scoped type="text/less">
@import "~@/css/pages/promotionCenter/components/tableinput.less";
</style>
