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
        tableName: 'SC_B_TRANSFER',
      },
    };
  },
  mounted() {
  },
  methods: {
    closeActionDialog() {
      this.$emit('closeActionDialog', false); // 关闭弹框
    },
  },
};
