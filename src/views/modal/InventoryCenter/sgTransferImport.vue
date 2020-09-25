<template>
  <div style="width: 550px;">
    <importTable
      :component-data="componentData"
      @closeActionDialog="closeActionDialog"
    />
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
          tableName: 'SC_B_TRANSFER',
        },
      };
    },
    mounted() {},
    methods: {
      closeActionDialog() {
        this.$emit('closeActionDialog', false); // 关闭弹框
      },
    },
  };
</script>

<style></style>
