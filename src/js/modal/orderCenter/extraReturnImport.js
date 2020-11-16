import importTable from 'professionalComponents/importTable';

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
        tableName: 'OC_B_RETURN_AF_SEND_MANUAL'
      }
    };
  }
};
