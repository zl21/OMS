<template>
  <div style="width: 550px;">
    <importTable :component-data="componentData" />
  </div>
</template>

<script>
  import importTable from '@/jordanComponent/publicDialog/importTable';

  export default {
    components: {
      importTable
    },
    props: {
      objList: {
        type: Array,
        default: () => []
      },
      idArray: {
        type: Array,
        default: () => []
      },
      webid: {
        type: Number
      },
      tablename: {
        type: String,
        default: () => ''
      },
      rowData: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        componentData: {
          tableName: 'OC_B_SEND_OUT',
          importType: 1
        }
      };
    },
    mounted() {
    },
    methods: {
    },
  };
</script>

<style>
</style>
