<!--
 * @Author: your name
 * @Date: 2021-07-26 08:04:57
 * @LastEditTime: 2021-11-02 17:57:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/buttonFkDialog.vue
-->
<!--点击按钮弹出外键关联弹框-->
<template>
  <div class="buttonFk">
    <button class="white" @click="add">
      <!-- 批量新增 -->
      {{ vmI18n.t("btn.batch_add") }}
    </button>
    <fkdialog
      v-if="fkDialog.dialog && itemdata.reftable !== 'VP_C_VIP_ACC'"
      :title="多选"
      :tablename="itemdata.reftable"
      :tableid="itemdata.reftableid"
      :right-list="fkDialog.lists"
      :is-object="itemdata.isObject"
      :append-to-body="layer"
      :fkshow.sync="fkDialog.dialog"
      :is-one-data="itemdata.isOneData"
      @easyData="getFkdialog"
      :version="itemdata.version || '1.3'"
      :serviceId="itemdata.serviceId || 'r3-cp'"
    />
  </div>
</template>
<script>
import fkdialog from 'burgeonComponents/view/fkdialog.vue';
// import i18n from "@burgeon/internationalization/i18n";
// window.$i18n = i18n

export default {
  name: 'ButtonFkDialog',
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
      // vmI18n: $i18n,
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
        // 已选中 n 条数据
        self.itemdata.valuedata = `${$i18n.t('HASBEENSELECTED')} ${ITEM.total} ${$i18n.t('common.piece')}`;
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
// import ButtonFkDialog from 'burgeonComponents/js/buttonFkDialog';
// export default ButtonFkDialog;
</script>

<style lang="less" scoped>
@import "burgeonComponents/css/buttonFkDialog.less";
</style>
