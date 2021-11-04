/*
 * @Author: your name
 * @Date: 2021-04-26 18:53:28
 * @LastEditTime: 2021-11-04 15:25:04
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/src/js/modal/strategyPlatform/productStrategyShopScaleImport.js
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
