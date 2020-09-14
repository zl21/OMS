<template>
  <div class="root">
    <h1>
      This is an application based on vue.js.
    </h1>
  </div>
</template>

<script>
  export default {
    name: 'RootApp',
    mounted() {
      console.log('mounted');
    },
  }
</script>
<style scoped lang="less">
  .root {
    h1 {
      color: blue;
    }
  }
</style>
