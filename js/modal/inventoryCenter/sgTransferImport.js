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
    selectRowData: {
      type: Array,
    },
  },
  data() {
    return {
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
