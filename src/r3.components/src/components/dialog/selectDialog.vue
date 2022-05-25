<template>
  <transition name="dialog-fade">
    <div
      v-show="visible"
      class="el-dialog__wrapper"
      @click.self="handleWrapperClick"
    >
      <div
        ref="dialog"
        class="el-dialog sel-dialog"
        :class="[sizeClass, customClass]"
        :style="style"
      >
        <div class="el-dialog__header">
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <button
            v-if="showClose"
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            @click="handleClose"
          >
            <i class="el-dialog__close el-icon el-icon-close" />
          </button>
        </div>
        <div
          v-if="rendered"
          class="el-dialog__body"
        >
          <!-- 弹出框输入框 -->
          <config-items :select-config-list="selectConfigList" />
          <!-- 弹出框操作 -->
          <slot />
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
            <div>
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
            @getChooseItem="getChooseItem"
          />
        </div>
        <div
          v-if="$slots.footer"
          class="el-dialog__footer"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  // import Popup from 'element-ui/src/utils/popup';
  // import emitter from 'element-ui/src/mixins/emitter';
  import emitter from 'r3cps/__utils__/emitter';
  import Popup from 'r3cps/__utils__/popup';
  import SelectionTable from '../element/selectTable.vue';
  import ConfigItems from '../element/configItems.vue';
  // import i18n from '../../assets/js/i18n'

  export default {
    name: 'selectDialog',
    mixins: [Popup, emitter],
    props: {
      title: {
        type: String,
        default: ''
      },
      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        type: Boolean,
        default: true
      },
      closeOnPressEscape: {
        type: Boolean,
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      size: {
        type: String,
        default: 'small'
      },
      customClass: {
        type: String,
        default: ''
      },
      top: {
        type: String,
        default: '15%'
      },
      beforeClose: Function,
      width: {
        type: String
      },
      height: {
        type: String
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
      }
    },
    data() {
      return {
        selectOperation: {
          pageSize: 10,
          pageSizeList: [10, 20, 50, 100, 200]
        },
        // 单选弹出框数据操作
        selectCurrentPage: 1
      };
    },
    components: {
      SelectionTable,
      ConfigItems
    },
    watch: {
      visible(val) {
        const self = this;
        this.$emit('update:visible', val);
        if (val) {
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
          });
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          this.$emit('close');
        }
      }
    },
    computed: {
      sizeClass() {
        return `el-dialog--${this.size}`;
      },
      style() {
        return this.size === 'full' ? {} : { top: this.top, width: this.width, 'max-height': this.height };
      }
    },
    methods: {
      createDrag() {
        // 创建拖拽
        const oWin = $(this.$el).find('.sel-dialog')[0];
        const oH2 = $(this.$el).find('.sel-dialog .el-dialog__header')[0];
        let bDrag = false;
        let disX = 0;
        let disY = 0;

        oH2.onmousedown = function (event) {
          var event = event || window.event;
          bDrag = true;
          disX = event.clientX - oWin.offsetLeft;
          disY = event.clientY - oWin.offsetTop;
          this.setCapture && this.setCapture();
          return false;
        };

        document.onmousemove = function (event) {
          if (!bDrag) return;
          var event = event || window.event;
          let iL = event.clientX - disX;
          let iT = event.clientY - disY;
          const maxL = document.documentElement.clientWidth - oWin.offsetWidth;
          const maxT = document.documentElement.clientHeight - oWin.offsetHeight;
          iL = iL < 0 ? 0 : iL;
          iL = iL > maxL ? maxL : iL;
          iT = iT < 0 ? 0 : iT;
          iT = iT > maxT ? maxT : iT;

          oWin.style.marginTop = oWin.style.marginLeft = 0;
          oWin.style.left = `${iL}px`;
          oWin.style.top = `${iT}px`;
          return false;
        };

        document.onmouseup = window.onblur = oH2.onlosecapture = function () {
          bDrag = false;
          oH2.releaseCapture && oH2.releaseCapture();
        };
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
        this.$emit('selectionQueryTable');
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
        this.$emit('selectPageSizeChange', val);
      },
      selectPageCurrentChange(val) {
        this.$emit('selectPageCurrentChange', val);
      },
      selectionCancel() {
        this.handleClose();
      }
    },

    beforeCreate() {
      // this.$t = i18n.t.bind(i18n)
    },

    mounted() {
      const self = this;
      self.$nextTick(() => {
        self.createDrag();
        self.dialogCenter();
      });
      if (this.visible) {
        this.rendered = true;
        this.open();
      }
    }
  };
</script>

<style lang="less">
.el-dialog {
  .select-data-update{
    display:flex;
    justify-content: space-between
  }
}
.el-dialog-drag-start {

}
</style>
