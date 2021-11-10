<template>
  <div v-if="loading">
    <Spin fix>
        <div class="loader">
            <svg class="circular" viewBox="25 25 50 50">
                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
            </svg>
        </div>
    </Spin>
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
 const Loading = {
   name: 'Loading',
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    }
  };
  export default Loading
</script>
