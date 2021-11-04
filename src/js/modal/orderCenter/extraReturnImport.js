/*
 * @Author: your name
 * @Date: 2021-04-26 18:53:28
 * @LastEditTime: 2021-11-04 15:24:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/src/js/modal/orderCenter/extraReturnImport.js
 */
import { importTable } from 'burgeonComponents';

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
        tableName: 'OC_B_RETURN_AF_SEND_MANUAL'
      }
    };
  }
};
