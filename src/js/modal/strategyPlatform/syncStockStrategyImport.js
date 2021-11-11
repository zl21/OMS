/*
 * @Author: your name
 * @Date: 2021-04-26 18:53:28
 * @LastEditTime: 2021-11-04 14:52:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/src/js/modal/strategyPlatform/syncStockStrategyImport.js
 */
export default {
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
