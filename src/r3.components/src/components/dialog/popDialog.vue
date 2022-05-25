<template>
  <my-dialog
    v-if="showFlag"
    :visible.sync="showFlag"
    :show-close="true"
    :close-on-click-modal="false"
    class="pop-dialog"
    :title="title"
    @visible-change="handleClose"
  >
    <div class="pop-dialog-body">
      <config-items
        :select-config-list="selectConfigList"
        @getFkChooseItem="getFkChooseItem"
        @deleteSelectParams="deleteSelectParams"
        @deleteSelectInput="deleteSelectInput"
        @getInputParams="getInputParams"
        @getSelectedOption="getSelectedOption"
        @configInputEnter="configInputEnter"
      />
      <div class="select-data-update">
        <el-pagination
          class="table-pagination"
          :current-page="selectCurrentPage"
          :page-sizes="selectOperation.pageSizeList"
          :page-size="selectOperation.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableDatas.totalRowCount"
          @size-change="selectPageSizeChange"
          @current-change="selectPageCurrentChange"
        />
        <div class="table-btns">
          <el-button
            class="cancel"
            type=""
            size="small"
            @click="selectionCancel"
          >
            {{$t('buttons.cancel')}}
          </el-button>
          <el-button
            class="submit"
            type="primary"
            size="small"
            @click="selectionQueryTable"
          >
            {{$t('buttons.search')}}
          </el-button>
        </div>
      </div>
      <!-- 弹出框表格 -->
      <selection-table
        :table-name="'selectTable'"
        :table-rows="tableRows"
        :thead="thead"
        :start="tableDatas.start"
        @getChooseItem="getChooseItem"
      />
    </div>
  </my-dialog>
</template>

<script>
  import SelectionTable from '../element/selectTable.vue';
  import ConfigItems from '../element/configItems.vue';
  import MyDialog from './mydialog.vue';
  // import i18n from '../../assets/js/i18n'

  export default {
    name: 'popDialog',
    components: {
      SelectionTable,
      ConfigItems,
      MyDialog
    },
    data() {
      return {
        showFlag: true,
        selectOperation: {
          pageSize: 10,
          pageSizeList: [10, 20, 50, 100, 200]
        },
        // 单选弹出框数据操作
        selectCurrentPage: 1,
        selectConfigParams: {}
      };
    },
    props: {
      visible: {
        type: Boolean
      },
      thead: {
        type: Array
      },
      tableRows: {
        type: Array
      },
      selectConfigList: {
        type: Array
      },
      tableDatas: {
        type: Object
      },
      queryParams: {
        type: Object
      },
      title: {
        type: String
      },
      top: {
        type: String
      },
      width: {
        type: String
      },
      height: {
        type: String
      }
    },
    mounted() {
      const self = this;
      self.$nextTick(() => {
        //       var oBox = $(this.$el).find(".pop-dialog")[0]
        //       var oBar = $(this.$el).find(".pop-dialog .header")[0]
        //       self.startDrag(oBar, oBox);
      });
      setTimeout(() => { // 页面拿到参数获取明细
        self.selectionQueryTable();
      }, 150);
    },

    beforeCreate() {
      this.$t = $i18n.t.bind($i18n)
    },

    created() {
      const _self = this;
      if (_self.visible) _self.showFlag = true;
      else _self.showFlag = false;
      _self.$nextTick(() => {
      });
    },
    watch: {
      showFlag(val) {
        this.$emit('update:visible', val);// 关闭弹框
      },
    },
    destroyed() {
      // window.fastfish.emit("popupclosed", null, {id:'popDialog'})
      // window.fastfish.emit("shadeclosed", null, {id:'vModal'})
    },
    methods: {
      getFkChooseItem(val) {
        const self = this;
        if (self.selectConfigParams[val.colname]) {
          self.selectConfigParams[val.colname] = [];// 单选清空之前值
          self.selectConfigParams[val.colname].push(val.pid);
        } else {
          self.selectConfigParams[val.colname] = [];
          self.selectConfigParams[val.colname].push(val.pid);
        }

        if (val.enter) {
          self.selectionQueryTable();
        }
        // this.$emit('getFkChooseItem',val)
        // self.backParams()
      },
      getQueryParams() {
        const self = this;
        for (let i = 0; i < self.selectConfigList.length; i++) {
          const element = self.selectConfigList[i];

          if (element.display === 'OBJ_CHECK') {
            self.selectConfigParams[element.colname] = element.value === true ? '=Y' : '=N';
          }
          // else if(element.display === 'OBJ_FK' && element.value) {
          //     self.selectConfigParams[element.colname] = element.value
          // }
          else if (!element.display && element.value) {
            self.selectConfigParams[element.colname] = element.value;
            // eval("params."+element.colinputName+"="+element.value)
          }
        }
        return self.selectConfigParams;
      },
      deleteSelectParams(val) {
        const self = this;
        if (self.selectConfigParams[val.colname]) {
          delete self.selectConfigParams[val.colname];// 单选清空之前值
        }
        if (self.selectConfigParams[val.inputname]) {
          delete self.selectConfigParams[val.inputname];// 单选清空之前值
        }
      },
      deleteSelectInput(val) {
        const self = this;
        if (self.selectConfigParams[val.inputname]) {
          delete self.selectConfigParams[val.inputname];// 单选清空之前值
        }
      },
      configInputEnter(val) {
        this.selectionQueryTable();
      },
      getInputParams(val) {
        const self = this;
        self.selectConfigParams[val.inputname] = val.value;
        if (val.enter) {
          self.selectionQueryTable();
        }
      },
      getSelectedOption(val) {
        const self = this;

        if (val.value && val.value.length > 0) {
          self.selectConfigParams[val.colname] = val.value;
        } else if (val.value && val.value.length == 0) {
          delete self.selectConfigParams[val.colname];
        }
        if (val.enter) {
          self.selectionQueryTable();
        }
      },
      getCss(o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
      },

      getChooseItem(val) {
        this.thead.forEach((td) => {
          if (td.isak) {
            val.DISPLAY = td.colname;
          }
        });
        this.$emit('getChooseItem', val);
      },
      selectionQueryTable() {
        const self = this;
        setTimeout(() => {
          self.$emit('selectionQueryTable', self.getQueryParams());
        }, 300);
      },
      dialogCenter() {
        const element = $(this.$el).find('.el-dialog')[0];
        const height = document.body.scrollHeight;
        const width = document.body.scrollWidth;
        setTimeout(() => {
          const domwidth = $(element).width();
          element.style.left = `${width / 2 - domwidth / 2}px`;
        });
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('visible-change', false);
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      selectPageSizeChange(val) {
        this.$emit('selectPageSizeChange', { page: val, param: this.getQueryParams() });
      },
      selectPageCurrentChange(val) {
        this.$emit('selectPageCurrentChange', { page: val, param: this.getQueryParams() });
      },
      selectionCancel() {
        this.handleClose();
      }
    }
  };
</script>

<style lang="less">
  .pop-dialog-body {
    width: 790px;
    height: 540px;
    .table-pagination {
      display: inline-block;
    }
    .select-data-update {
      margin-bottom: 8px;
    }
  }
  .pop-dialog {
    .el-input-group__append {
      border: 1px solid #bfcbd9 !important;
      border-left: none !important;
    }
    .select-data-update {
      input {
        background: #fff;
      }
    }

    .el-pagination .el-select .el-input {
      input {
        background: #fff;
      }
      .el-pagination__editor {
        input {
          background: #fff;
        }
      }
    }
    .el-autocomplete {
      font-size: 0;
      .el-input {
        font-size: 12px !important;
      }

    }
    .select-table {
      .left {
        max-height: 323px;
      }
    }
    .table-btns {
      float: right;
      height: 24px;
      .el-button {
        padding: 5px 20px;
        background: #fff;
        border: 1px solid #fd6442;
        border-color: #fd6442;
        color: #fd6442;
        border-radius: 2px;
      }
      .el-button.submit {
        background: #fd6442;
        color: #fff;
      }
    }
  }
</style>
