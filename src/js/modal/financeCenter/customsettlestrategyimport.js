import importTable from '@/views/modal/publicDialog/importTable.vue';

export default {
  components: {
    importTable
  },
  props: {
    objList: {
      type: Array
    },
    idArray: {
      type: Array
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    selectRowData: {
      type: Array
    }
  },
  data() {
    return {
      componentData: {
        tableName: 'AC_F_RECONCILIATION_SETTLE_STRATEGY'
      }
    };
  }
};