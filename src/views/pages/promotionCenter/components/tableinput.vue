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
              v-if="key != 'id' && key != 'value'"
              :key="index"
              :class="`length${Object.keys(item).length - 2}`"
              :title="value"
            >{{ value }}</span>
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
  import tableinput from "@/js/pages/promotionCenter/components/tableinput";
  export default tableinput;
</script>

<style lang="less" scoped type="text/less">
.item-input.isnotnull {
  input {
    background: #fcf7f1;
  }

  .popover-icon {
    background: #fcf7f1;
  }

  .danxuan {
    width: 20px;
    /* height: 24px; */
    right: 0 !important;
    top: 0 !important;
    padding: 5px 0px 4px 0px;
    border: 1px solid #bfcbd9;
    border-left: 0;
    background: #fcf7f1;
  }
}

.view-fktable {
  z-index: 99999;
  background: #fff;
  /*/ / margin-top: 20 px;*/
}

.hidden {
  display: none !important;
}

.item-input {
  width: 100%;
  height: 100%;
  display: flex;
  /*/ / border: 1 px dashed #000;*/
  box-sizing: border-box;
  border-radius: 6px;
  position: relative;

  label.title {
    float: left;
    display: block;
    width: 102px;
    font-weight: 400;
    line-height: 14px;
    text-align: right;
    padding-right: 0px;
  }
  .input-wrap.readonly-span {
    border: 1px solid #bfcbd9;
    background: #f4f4f4;
    padding: 0 4px;
    border-radius: 2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .input-wrap {
    display: flex;
    flex: 1;
    width: calc(~"100% - 102px");
    overflow: hidden;
    /* / / max-width: 280 px;*/

    .readonly-span {
      border: 1px solid #bfcbd9;
      display: inline-block;
      box-sizing: border-box;
      height: 100%;
      width: 100%;
    }

    input[type="password"].readonly {
      border: 1px solid #bfcbd9;
      background: #f4f4f4;
      margin-right: 0;
    }
    .input-inner.mop {
      box-sizing: border-box;
      left: 0;
      i {
        color: #0f8ee9;
        cursor: pointer;
      }
      .deleteDiv {
        width: calc(~"100% - 40px") !important;
      }
    }

    .input-inner {
      width: 100%;
      position: relative;

      input.mrp {
        height: 22px;
        margin-right: 0;
        position: relative;
        z-index: 2;
      }

      input {
        width: 100%;
        height: 22px;
        float: left;

        /*  / / height: 20 px;*/
      }

      input:focus {
        border-color: #bfcbd9;
      }

      .deleteDiv {
        position: absolute;
        left: 0;
        right: 18px;
        top: 0;
        z-index: 3;
        height: 24px;
        display: none;
        width: calc(~"100% - 23px") !important;
        background: rgba(0, 0, 0, 0.1);
        padding-right: 4px;
        text-align: right;

        i {
          color: #fff;
          background: #918f8f;
          &:hover {
            cursor: pointer;
          }
        }
      }

      p.mop {
        position: absolute;
        top: 0;
        right: 6px;
      }
    }
  }
  .name {
    padding: 0 10px;
  }
  .danxuan {
    width: 13px;
    height: 13px;
    cursor: pointer;
    z-index: 999;
    position: absolute;
    top: 6px;
    right: 0px;
    color: #0f8ee9;
  }
  label {
    i {
      height: 14px;
      width: 8px;
      line-height: 14px;
      vertical-align: middle;
      display: inline-block;
      position: relative;
      top: 3px;
      right: 4px;
      color: #f52f2f;
      font-size: 18px;
    }
  }

  input {
    /* / / border-bottom: 1 px solid #bfcbd9;*/
    border: 1px solid #bfcbd9;
    border-radius: 2px;
    flex: 1;
    padding: 0 4px;
    margin-right: 10px;
    width: calc(~"100% - 10px") !important;
  }

  span.readonly-span {
    border: 1px solid #bfcbd9;
    flex: 1;
    background: #f4f4f4;
    padding: 0 4px;
    border-radius: 2px;
    margin-right: 0;
    white-space: nowrap;
    // overflow: hidden;
    text-overflow: ellipsis;
  }

  .item-input.readonly {
    color: #333;
  }

  input:focus {
    border-color: #0f8ee9;
  }

  .el-input {
    flex: 1;
    padding-right: 10px;
    margin-top: 4px;
  }
}
</style>
