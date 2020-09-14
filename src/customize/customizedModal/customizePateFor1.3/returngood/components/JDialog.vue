<!--引入曼卡龙的弹框组件-->
<template>
  <div v-if="showModal">
    <Modal
      v-model="modal"
      :title="title"
      :title-align="titleAlign"
      :width="width"
      :scrollable="scrollable"
      :closable="closable"
      :draggable="draggable"
      :mask="mask"
      :mask-closable="maskClosable"
      :transfer="transfer"
      :name="name"
      :url="url"
      :footer-hide="footerHide"
      :ok-text="okText"
      :cancel-text="cancelText"
      :z-index="2500"
      :class-name="className"
      @on-cancel="onCancel"
      @on-ok="onOk"
    >
      <component
        :is="currentViewData"
        :ref="currentView"
        :component-data="componentData"
        :s_data="sData"
        :objids="objids"
        :objname="objname"
        :obj-list="objList"
        :cp_c_dest_id="cpCDestId"
        @returnData="returnData"
        @objectEdit="objectEdit"
        @objectSaveNew="objectSaveNew"
        @pageChange="pageChange"
        @objectAddRefresh="objectAddRefresh"
      />
    </Modal>
  </div>
</template>

<script>
  const _import = file => require(`@/jordanComponents/views/${file}.vue`).default;

  const _import_qbd = file => require(`@/${file}.vue`).default;
  export default {
    name: 'JordanDialog',
    props: {
      cpCDestId: {
        type: String
      }, // 特定单据铺货单的矩阵明细中的收货仓库id
      className: {
        type: String
      },
      objList: {
        type: Array
      },
      // 是否去掉页面缓存
      keepAlive: {
        type: Boolean,
        default: () => true
      },
      title: {
        type: String,
        default: () => '标题'
      }, // 设置标题title
      titleAlign: {
        type: String,
        default: () => 'center'
      }, // 设置标题是否居中 // center left
      width: {
        type: [Number, String]
      // default: () => ''
      }, // 配置弹框宽度
      scrollable: {
        type: Boolean,
        default: () => false
      }, // 是否可以滚动
      closable: {
        type: Boolean,
        default: () => true
      }, // 是否可以按esc关闭
      draggable: {
        type: Boolean,
        default: () => true
      }, // 是否可以拖动
      mask: {
        type: Boolean,
        default: () => true
      }, // 是否显示遮罩层
      maskClosable: {
        type: Boolean,
        default: () => true
      }, // 是否可以点击叉号关闭
      transfer: {
        type: Boolean,
        default: () => true
      }, // 是否将弹层放在body内
      name: {
        type: String,
        default: () => ' '
      }, // 组件名称
      url: {
        type: String,
        default: () => ' '
      }, // 组件路由
      componentData: {
        type: Object,
        default: () => {}
      }, // 数据填充
      footerHide: {
        type: Boolean,
        default: () => true
      }, // 是否显示底部
      okText: {
        type: String,
        default: () => '确定'
      },
      cancelText: {
        type: String,
        default: () => '取消'
      },
      confirm: {
        type: Function
      }, // 确定事件
      quit: {
        type: Function
      }, // 取消事件   
      qbdCustom: {
        type: Boolean,
        default: () => false
      }, // 取消事件
      sData: {
        type: Object,
        default: () => {}
      },
      objids: {
        type: String
      },
      objname: {
        type: String
      }, // 矩阵保存,先保存主表,返回新增后的id
    },
    data() {
      return {
        modal: false,
        currentView: '',
        commonObj: {},
        showModal: false,
      };
    },
    computed: {
      currentViewData() {
        const _self = this;
        const componentName = _self.name;
        if (!_self.qbd_custom) {
          Vue.component(componentName, Vue.extend(_import(_self.url)));
        } else {
          Vue.component(componentName, Vue.extend(_import_qbd(_self.url)));
        }

        return componentName;
      }

    },
    methods: {
      objectAddRefresh() {
        this.$emit('objectAddRefresh');
      },
      pageChange(page, newObjid) { // 刷新双表格
        this.$emit('pageChange', page, newObjid);
      },
      objectSaveNew(table, data, callback, subtablesave, sku_tues) {
        this.$emit('objectSaveNew', table, data, callback, subtablesave, sku_tues);
      },
      objectEdit() {
        this.$emit('objectEdit');
      },
      // 打开弹框
      openConfirm() {
        this.showModal = true;
        this.modal = true;
      },
      // 关闭弹框
      closeConfirm() {
        setTimeout(() => {
          this.modal = false;
          this.showModal = false;
        });
      },
      returnData(data) {
        if (this.componentData.returnData && typeof this.componentData.returnData === 'function') {
          this.componentData.returnData(data);
        }
      },
      // 确定
      onOk() {
        if (typeof this.confirm === 'function') {
          this.confirm();
        }
      },
      // 取消
      onCancel() {
        if (typeof this.quit === 'function') {
          this.quit();
        } else {
          this.closeConfirm();
        }
      }
    }
  };
</script>

<style lang="less">
.s_modal {
  .ark-modal-header {
    background-color: #F8F8F8;
    .ark-modal-header-inner {
      color: #000;
      font-size: 13px;
      font-weight: 500;
    }
  }
}
.ark-modal-footer {
  border: none;
}

.ark-modal-footer button > span {
  font-size: 12px;
}

.ark-modal-footer button {
  width: auto;
  border-radius: 2px;
  height: 26px;
  line-height: 0px;
}
</style>
