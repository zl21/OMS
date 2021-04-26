import importTable from 'professionalComponents/importTable';

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
        tableName: 'ST_C_SYNC_STOCK_STRATEGY'
      }
    };
  },
  mounted() {
  },
  methods: {
  },
};
