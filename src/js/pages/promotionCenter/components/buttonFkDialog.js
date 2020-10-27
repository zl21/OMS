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
