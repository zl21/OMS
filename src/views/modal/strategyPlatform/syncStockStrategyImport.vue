<template>
  <div class="import-page">
    <importTable :componentData="componentData"></importTable>
  </div>
</template>

<script>
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
          tableName: 'ST_C_SYNC_STOCK_STRATEGY'
        }
      };
    },
    mounted() {
    },
    methods: {
    },
  }
</script>

<style lang="less" scoped>
.import-page {
  width: 550px;
}
</style>
