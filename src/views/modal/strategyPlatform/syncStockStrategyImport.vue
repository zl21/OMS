<template>
  <div class="import-page">
    <importTable :component-data="componentData" />
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
</script>

<style lang="less" scoped>
.import-page {
  width: 568px;
}
</style>
