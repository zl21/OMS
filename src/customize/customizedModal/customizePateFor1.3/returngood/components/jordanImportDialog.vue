<!-- 导入弹框 -->
<template>
  <div class="jordanImport">
    <jordanImportDialog
      :visible="ImportDialog.visible"
      :mode="ImportDialog.mode"
      :title="ImportDialog.title"
      :tablename="ImportDialog.tablename"
      :main-table="ImportDialog.mainTable"
      :main-id="ImportDialog.mainId"
      :append-to-body="ImportDialog.appendToBody"
      :modal-append-to-body="ImportDialog.modalAppendToBody"
    />
  </div>
</template>

<script>
  import jordanImportDialog from 'framework/components/tablelist/importDialog.vue';

  export default {
    components: {
      jordanImportDialog
    },
    data() {
      return {};
    },
    mounted() {
      console.log(this.ImportDialog);
    },
    props: {
      importDialog: {
        type: Object
      }
    },
    methods: {
      shutDown() {
        this.$children
          .find(item => item.mainTable === 'OC_B_ORDER')
          .closeDialog(true);
      }
    }
  };
</script>
