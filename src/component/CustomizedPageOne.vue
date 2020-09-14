<template>
  <h1>{自定义界面接入测试模块入口:CustomizedPageOne}</h1>
</template>

<script>
  import R3 from '@syman/burgeon-r3'

const {
    network,
    urlSearchParams,
    store,
  } = R3;
  // const {
  //   network,
  //   urlSearchParams,
  //   store,
  // } = R3.default;
  export default {
    name: 'CustomizedPageOne',
    mounted() {
      console.log('tableName', this.$route);
    }
  };
</script>

<style scoped>
h1{
  margin-top:30%;
}
</style>
