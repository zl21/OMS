<template>
  <transition name="dialog-fade">
    <div
      v-show="visible"
      ref="dialogRoot"
      class="el-dialog__wrapper fc-dialog-root"
      @click.self="handleWrapperClick"
    >
      <div
        ref="dialog"
        class="el-dialog my-dialog dialog-popup"
        :class="[sizeClass, customClass]"
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
          <slot />
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

  // import emitter from 'element-ui/src/mixins/emitter';
  // import Popup from 'element-ui/src/utils/popup';
  import emitter from 'r3cps/__utils__/emitter';
  import Popup from 'r3cps/__utils__/popup';
  export default {
    name: 'mydialog',
    mixins: [Popup, emitter],
    props: {
      hasWidth: {
        type: Boolean,
        default: true
      }, // 判断是否要计算宽度
      title: {
        type: String,
        default: ''
      },
      modal: {
        type: Boolean,
        default: true
      },
      appendToBody: {
        type: Boolean,
        default: false
      },
      modalAppendToBody: {
        type: Boolean,
        default: false
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
        default: 'medium' // 弹窗尺寸大小min medium large
      },
      customClass: {
        type: String,
        default: ''
      },
      beforeClose: Function,
      width: {
        type: String
      },
      height: {
        type: String
      },
      idArr: {
        type: Array
      }
    },
    data() {
      return {
        closed: false
      };
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
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          this.$emit('close');
        }
      },
      title(val) {
        // 实时计算宽度
        const self = this;
        self.$nextTick(() => {
          const body = $(self.$el).find('.my-dialog .el-dialog__body').find('>div');
          $(self.$el).find('.my-dialog').width(body.width() + (!self.hasWidth ? 0 : 40));
        });
      }
    },
    computed: {
      sizeClass() {
        return `el-dialog--${this.size}`;
      },
    },
    methods: {
      getCss(o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
      },
      startDrag(b, t, callback) {
        const self = this;
        let bar; let 
          target;
        if (b == undefined && t === undefined) {
          bar = $(self.$el).find('.my-dialog .el-dialog__header')[0];
          target = $(self.$el).find('.my-dialog')[0];
        } else {
          bar = b;
          target = t;
        }
        const params = {
          left: 0,
          top: 0,
          currentX: 0,
          currentY: 0,
          flag: false
        };
        if (self.getCss(target, 'left') !== 'auto') {
          params.left = self.getCss(target, 'left');
        }
        if (self.getCss(target, 'top') !== 'auto') {
          params.top = self.getCss(target, 'top');
        }
        //
        bar.onmousedown = function (event) {
          params.flag = true;
          if (!event) {
            event = window.event;
            // IE
            bar.onselectstart = function () {
              return false;
            };
          }
          const e = event;
          params.currentX = e.clientX;
          params.currentY = e.clientY;
        };
        document.onmouseup = function () {
          params.flag = false;
          if (self.getCss(target, 'left') !== 'auto') {
            params.left = self.getCss(target, 'left');
          }
          if (self.getCss(target, 'top') !== 'auto') {
            params.top = self.getCss(target, 'top');
          }
        };
        document.onmousemove = function (event) {
          const e = event || window.event;
          if (params.flag) {
            const nowX = e.clientX; 
            const nowY = e.clientY;
            var disX = nowX - params.currentX; 
            var disY = nowY - params.currentY;
            target.style.left = `${parseInt(params.left) + disX}px`;
            target.style.top = `${parseInt(params.top) + disY}px`;


            // window.fastfish.emit("popupregionchanged", null, {id:'FcDialog',top:$(self.$el).find(".my-dialog").eq(0).offset().top,left:$(self.$el).find(".my-dialog").eq(0).offset().left,width:$(self.$el).find(".my-dialog").eq(0).width(),height:$(self.$el).find(".my-dialog").eq(0).height()})
            if (event.preventDefault) {
              event.preventDefault();
            }
            return false;
          }

          if (typeof callback === 'function') {
            callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
          }
        };
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
        this.$emit('MyDialogClose');
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('visible-change', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      recordDomInfoForDestroy() {
        // 此函数是一个补丁函数，用以触发记录相关Dom节点信息，供repairOtherDialog()函数使用。
        this.currentParentDomNode = this.$refs.dialogRoot.parentElement;
        console.log(this.currentParentDomNode);
      },
      repairOtherDialog() {
        // 此函数是一个补丁函数，用以修复，多层弹框情况下，最上级弹框关闭后，次级弹框无法操作问题。
        if (this.currentParentDomNode) {
          const currentVModal = this.currentParentDomNode.querySelector('div.v-modal') || '';
          if (currentVModal !== '') {
            this.currentParentDomNode.removeChild(currentVModal);
          }
        }
        if (this.$route.params['0'] !== 'table/SG_B_CHANNEL_PRODUCT') { // 渠道商品表,绑定渠道商品下拉多选弹框处理弹框蒙层z-index问题
          setTimeout(() => {
            const fcDialogRootList = document.querySelectorAll('.fc-dialog-root');
            if (fcDialogRootList.length > 0) {
              const upperFcDialogRoot = fcDialogRootList[fcDialogRootList.length - 1];
              const upperParentDomNode = upperFcDialogRoot.parentElement;
              upperFcDialogRoot.dialogRoot.startDrag();
              const upperFcDialogRootZIndex = parseFloat(getComputedStyle(upperFcDialogRoot).zIndex);
              const modalDiv = document.createElement('div');
              modalDiv.classList.add('v-modal');
              modalDiv.setAttribute('tab-index', '0');
              modalDiv.setAttribute('style', `z-index:${upperFcDialogRootZIndex - 1}`);
              upperParentDomNode.appendChild(modalDiv);
            } else {
              document.querySelectorAll('div.v-modal').forEach((dom) => { dom.remove(); });
            }
          }, 25);
        }
      }
    },
    mounted() {
      const self = this;
      this.recordDomInfoForDestroy();
      this.$refs.dialogRoot.dialogRoot = this;
      self.$nextTick(() => {
        // self.dialogCenter()
        // var oBox = $(this.$el).find(".pop-dialog")[0]
        // var oBar = $(this.$el).find(".pop-dialog .header")[0]

        // 实时计算宽度
        const body = $(self.$el).find('.my-dialog .el-dialog__body').find('>div');
        $(self.$el).find('.my-dialog').width(body.width() + (!self.hasWidth ? 0 : 40));

        self.startDrag();
      });
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }
    },
    created() {
      const self = this;

      self.$nextTick(() => {

      // window.fastfish.emit("popup", null, {id:'FcDialog',top:$(self.$el).find(".my-dialog").eq(0).offset().top,left:$(self.$el).find(".my-dialog").eq(0).offset().left,width:$(self.$el).find(".my-dialog").eq(0).width(),height:$(self.$el).find(".my-dialog").eq(0).height()})
      // window.fastfish.emit("shade", null, {id:'vModal',top:$(".v-modal").eq(0).offset().top,left:$(".v-modal").eq(0).offset().left,width:$(".v-modal").eq(0).width(),height:$(".v-modal").eq(0).height(),color:'#000000',alpha:0.3})
      });
    },
    beforeDestroy() {
      this.repairOtherDialog();
    },
    destroyed() {
    // window.fastfish.emit("popupclosed", null, {id:'FcDialog'})
    // window.fastfish.emit("shadeclosed", null, {id:'vModal'})
    }
  };
</script>

<style lang="less">
.el-dialog {
  
  &.el-dialog--mini {
    width: 340px;
  }
  &.el-dialog--medium {
  }
  &.el-dialog--large {
  }
}
.errorMessage {
  display: flex;
  flex: 1;
  flex-direction: column;
  .hiddenButton {
    height: 20px;
  }
  .top {
    flex: 1;
    min-height: 30px;
    display: flex;
    max-height: 160px;
    overflow: auto;

    .left {
      width: 48px;
      padding: 0 10px;
      box-sizing: border-box;
      i {
        color: red;
        font-size: 28px;
      }
    }

    .right {
      flex: 1;
      padding: 4px 10px 0 0;
      width: 332px;
      box-sizing: border-box;
      overflow: auto;
      p {
        line-height: 16px;
        word-wrap: break-word;
        font-size: 12px;
      }
    }
  }

  .bottom {
    height: 34px;
    padding-top: 10px;
    box-sizing: border-box;
    text-align: right;

    button {
      height: 24px;
      width: auto;
      margin-right: 8px;
      margin-left: 0px;
      padding: 0 8px;
      background: #fff;
      color: #fd6442;
      border: 1px solid #fd6442;
      border-radius: 2px;
      font-size: 12px;

      &:hover {
        border-color: rgba(253, 100, 66, 0.6);
        color: rgba(253, 100, 66, 0.6);
      }
    }
  }
}
.el-dialog__wrapper.fc-dialog-root.dialog-div {
  display: flex !important;
}
.el-dialog__wrapper.messageDialog {
  .el-dialog {
    width: 380px;
    max-height: 240px;
    .el-dialog__title,
    .el-dialog__close {
      //color: white!important;
    }
  }
}

.el-dialog__wrapper.success {
  .el-dialog__header {
    background-color: #09a155;
    .el-dialog__title {
      color: #fff;
    }
  }

  .el-dialog__body {
    i {
      color: #09a155;
    }
  }
}

.el-dialog__wrapper.warning {
  .el-dialog__header {
    background-color: #f7b901;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }

  .el-dialog__body {
    i {
      color: #f7b901;
    }
  }
}

.el-dialog__wrapper.error {
  .el-dialog__header {
    background-color: #e80000;
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: #fff;
    }
  }

  .el-dialog__body {
    i {
      color: #e80000;
    }
  }
}

.pop-dialog-wrapper.warning {
  .pop-dialog-body {
    i {
      color: #f7b901;
    }
  }
}
</style>
