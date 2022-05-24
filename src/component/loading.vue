<template>
  <div>
    <NotifyMsg :notifyProps="notifyProps" />
    <div v-if="loading">
      <Spin fix>
          <div class="loader">
              <svg class="circular" viewBox="25 25 50 50">
                  <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
              </svg>
          </div>
      </Spin>
    </div>
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
  import NotifyMsg from '@/component/NotifyMsg.vue';
  export default {
    props: {
      loading: {
        type: Boolean,
        required: true
      }
    },
    components: {
      NotifyMsg,
    },
    // data() {
    //   return {
    //     notifyProps: {
    //       username: this.$store.state.global.userInfo.name,
    //       appId: 'r3',
    //     }
    //   }
    // },
    mounted() {
      console.log('loading');
      this.notifyProps.username = this.$store.state.global.userInfo.name;
    },
    watch:{

    },
    computed: {
      notifyProps() {
        return {
          username: this.$store.state.global.userInfo.name,
          appId: 'r3',
        };
      }
    },
  };
</script>
