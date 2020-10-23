import importTable from 'professionalComponents/importTable';

export default {
  components: {
    importTable,
  },
  props: {
    objList: {
      type: Array,
    },
    idArray: {
      type: Array,
    },
    webid: {
      type: Number,
    },
    tablename: {
      type: String,
    },
    rowData: {
      type: Array,
    },
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      componentData: {
        tableName: 'SG_B_PHY_OUT_RESULT',
        importType: 1,
      },
    };
  },
  mounted() {
  },
  methods: {},
};
