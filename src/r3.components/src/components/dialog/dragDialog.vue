<!--商品搜索页（可设置参数）-->
<template>
  <my-dialog
    :visible.sync="showFlag"
    :showClose=true
    :close-on-click-modal="false"
    class="screen-dialog"
    :custom-class="DialogClass"
    :title="title"
    :size="size"
    @visible-change="closeDialog"
  >
    <slot></slot>
  </my-dialog>
</template>

<script>
  import MyDialog from './mydialog.vue'

  export default {
    name: 'dragDialog',
    data() {
      return {
        showFlag: true,
      }
    },
    components: {MyDialog},
    props: {
      size: {
        type: String,
        default: 'medium' //弹窗尺寸大小min medium large
      },
      visible: {//显示
        type: Boolean,
        default: true
      },
      display: {
        type: Boolean
      },
      title: {
        type: String
      },
      width: {
        type: String
      },
      height: {
        type: String
      },
      DialogClass: {
        type: String
      }
    },
    computed: {
      style() {
        return {'width': this.width, 'height': this.height};
      }
    },
    mounted() {
    },
    created() {
      const _self = this;
      if (_self.visible) _self.showFlag = true;
      else _self.showFlag = false;
      _self.$nextTick(function () {

        // window.fastfish.emit("popup", null, {id:'dragDialog',top:$(self.$el).find(".drag-dialog .pop-dialog").eq(0).offset().top,left:$(self.$el).find(".drag-dialog .pop-dialog").eq(0).offset().left,width:$(self.$el).find(".drag-dialog .pop-dialog").eq(0).width(),height:$(self.$el).find(".drag-dialog .pop-dialog").eq(0).height()})
        // window.fastfish.emit("shade", null, {id:'vModal',top:$(".v-modal").eq(0).offset().top,left:$(".v-modal").eq(0).offset().left,width:$(".v-modal").eq(0).width(),height:$(".v-modal").eq(0).height(),color:'#000000',alpha:0.3})
      })
    },
    destroyed() {
      // window.fastfish.emit("popupclosed", null, {id:'dragDialog'})
      // window.fastfish.emit("shadeclosed", null, {id:'vModal'})
    },
    methods: {
      getFkChooseItem(val) {
        let self = this
        if (self.selectConfigParams[val.colname]) {
          self.selectConfigParams[val.colname] = []//单选清空之前值
          self.selectConfigParams[val.colname].push(val.pid)
        } else {
          self.selectConfigParams[val.colname] = []
          self.selectConfigParams[val.colname].push(val.pid)
        }

        if (val.enter) {
          self.selectionQueryTable()
        }
        //this.$emit('getFkChooseItem',val)
        // self.backParams()
      },
      getQueryParams() {
        let self = this
        for (var i = 0; i < self.selectConfigList.length; i++) {
          var element = self.selectConfigList[i];

          if (element.display === 'OBJ_CHECK') {
            self.selectConfigParams[element.colname] = element.value === true ? '=Y' : '=N'
          }
          else if (!element.display && element.value) {
            self.selectConfigParams[element.colname] = element.value
          }
        }
        return self.selectConfigParams
      },
      deleteSelectParams(val) {
        let self = this
        if (self.selectConfigParams[val.colname]) {
          delete self.selectConfigParams[val.colname]//单选清空之前值
        }
      },
      configInputEnter(val) {
        this.selectionQueryTable()
      },
      getInputParams(val) {
        let self = this
        self.selectConfigParams[val.inputname] = val.value
        if (val.enter) {
          self.selectionQueryTable()
        }
      },
      getSelectedOption(val) {
        let self = this
        self.selectConfigParams[val.colname] = val.value
        if (val.enter) {
          self.selectionQueryTable()
        }
      },
      getCss(o, key) {
        return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false)[key];
      },
      getChooseItem(val) {
        this.thead.forEach(function (td) {
          if (td.isak) {
            val.DISPLAY = td.colname
          }
        })
        this.$emit('getChooseItem', val)
      },
      selectionQueryTable() {
        let self = this
        setTimeout(function () {
          self.$emit('selectionQueryTable', self.getQueryParams())
        }, 150)

      },
      dialogCenter() {
        let element = $(this.$el).find(".el-dialog")[0]
        var height = document.body.scrollHeight;
        var width = document.body.scrollWidth;
        setTimeout(function () {
          var domwidth = $(element).width()
          element.style.left = (width / 2 - domwidth / 2) + 'px'
        })

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
        this.$emit('selectPageSizeChange', val)
      },
      selectPageCurrentChange(val) {
        this.$emit('selectPageCurrentChange', val)
      },
      selectionCancel() {
        this.handleClose()
      },
      closeDialog(option) {
        let _self = this;
        _self.showFlag = option || false;
        _self.$emit('update:visible', option);
      },
    }
  }
</script>

<style lang="less">
  .drag-dialog {

  }

</style>

