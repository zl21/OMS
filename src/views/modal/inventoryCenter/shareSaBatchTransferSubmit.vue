<template>
</template>

<script>
export default {
  name: "transferSubmit",
  mounted() {
       this.$emit('closeActionDialog');

    const fromdata = new FormData();
    fromdata.append('table', this.$route.params.tableName);
    fromdata.append('mainId', this.$route.params.itemId);
    this.service.common.publicUrlParams('/p/cs/sg/share/batchSubmitTransfer', fromdata).then((res) => {
      if (res.data.code === 0) {
        this.$Message.success(res.data.message);
      }
    })
  },
  methods: {}
}
</script>

<style scoped>

</style>
