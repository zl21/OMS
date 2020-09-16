<!--点击按钮弹出外键关联弹框-->
<template>
  <div class="buttonFk">
    <button
      class="white"
      @click="add"
    >
      批量新增
    </button>
    <fkdialog
      v-if="fkDialog.dialog && itemdata.reftable !== 'VP_C_VIP_ACC'"
      :tablename="itemdata.reftable"
      :tableid="itemdata.reftableid"
      :right-list="fkDialog.lists"
      :is-object="itemdata.isObject"
      :append-to-body="layer"
      :fkshow.sync="fkDialog.dialog"
      :is-one-data="itemdata.isOneData"
      @easyData="getFkdialog"
    />
  </div>
</template>
<script>
  import fkdialog from 'framework/components/tablelist/fkdialog.vue';

  export default {
    name: 'ButtonFk',
    components: {
      fkdialog
    },
    props: {
      itemdata: {
        type: Object
      },
      layer: {
        type: Boolean,
        default: false
      }, // 用于弹框多选蒙层全部放在body上
    },
    data() {
      return {
        fkDialog: {
          // 弹框多选
          dialog: false,
          lists: {},
          tablename: this.itemdata.reftable,
          tableid: this.itemdata.reftableid
        }
      };
    },
    methods: {
      getFkdialog(item) {
        const self = this;
        const ITEM = JSON.parse(item);
        self.itemdata.pid = '';
        self.itemdata.valuedata = '';
        if (ITEM.lists.result.length > 0) {
          self.itemdata.pid = item;
          self.mopDefaultValue = item;
          self.itemdata.valuedata = `已选中${ITEM.total}条数据`;
          self.fkDialog.lists = item;
        } else {
          self.fkDialog.lists = {};
          self.itemdata.pid = '';
          self.mopDefaultValue = {};
          self.itemdata.valuedata = '';
        }
        self.$emit('getFkChooseItem', self.itemdata, self.row);
      },
      add() {
        const self = this;
        self.fkDialog.lists = {};
        self.itemdata.pid = '';
        self.mopDefaultValue = {};
        self.itemdata.valuedata = '';
        this.fkDialog.dialog = true;
      }
    }
  };
</script>
<style lang="less" scoped>
.buttonFk {
    button {
        height: 24px;
        line-height: 24px;
        padding: 0 8px;
        border: 1px solid #fd6442;
        font-size: 12px;
        background: #fff;
        color: #fd6442;
        border-radius: 2px;
        margin-right: 5px;
      }
}
</style>
