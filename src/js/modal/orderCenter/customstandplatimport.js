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
      page: this.$route.params.tableName,
    };
  },
  computed: {
    componentData() {
      let obj = {}
      // obj.tableName = this.page == "PS_C_SKU" ? "PS_SKU_WAREHOUSE_TAG_IMPORT" : this.page
      let tabName = ''
      switch (this.page) {
        case "PS_C_SKU":
          tabName = "PS_SKU_WAREHOUSE_TAG_IMPORT"
          break;
        case "IP_C_STANDPLAT_PRO":
          tabName = "IP_C_STANDPLAT_PRO_mcdr"
          break;
        default:
          tabName = this.page
          break;
      }
      obj.tableName = tabName
      return obj
    }
  }
};
