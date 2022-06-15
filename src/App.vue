<template>
  <div>
    <NotifyMsg />
  </div>
</template>

<script>
  import NotifyMsg from '@/component/NotifyMsg.vue';
  export default {
    name: 'RootApp',
    components: {
      NotifyMsg,
    },
  };
</script>
<style scoped lang="less">
  .root {
    h1 {
      color: blue;
    }
  }
</style>
