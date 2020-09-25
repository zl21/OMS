<template>
  <div style="width: 550px;">
    <importTable :component-data="componentData" />
  </div>
</template>

<script>
  import importTable from 'professionalComponents/publicDialog/importTable';
  // import importTable from "../../publicDialog/importTable";
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
      rowData: {
        type: Array,
      },
    },
    data() {
      return {
        componentData: {
          tableName: 'SG_B_PHY_OUT_RESULT',
          importType: 1,
        },
      };
    },
    mounted() {},
    methods: {},
  };
</script>

<style></style>
