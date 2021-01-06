import importTable from '@/views/modal/publicDialog/importTable.vue';

export default {
  components: {
    importTable
  },
  props: {
    objList: {
      type: Array
    },
    idArr: {
      type: Array
    },
    webid: {
      type: Number
    },
    tablename: {
      type: String
    },
    rowData: {
      type: Array
    }
  },
  data() {
    return {
      componentData: {
        tableName: 'ST_C_PRODUCT_STRATEGY',
        objid: this.$route.params.itemId
      }
    };
  },
  mounted() {
  },
  methods: {
  },
};
