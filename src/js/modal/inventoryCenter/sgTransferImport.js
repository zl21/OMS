/*
 * @Author: your name
 * @Date: 2021-05-13 13:28:30
 * @LastEditTime: 2021-11-04 15:24:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/modal/inventoryCenter/sgTransferImport.js
 */
import { importTable } from 'burgeonComponents';

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
