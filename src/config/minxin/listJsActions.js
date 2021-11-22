export default () => ({
  updated() {
    const tableName = this.$router.currentRoute.params.tableName;
    if (tableName === 'OC_B_COMPENSATE_ORDER') { // 判断是否为需要操作的表
      console.log(tableName);
      setTimeout(() => {
        /* const dom = document.getElementById('actionMODIFY');
        console.log('dom::', dom);
        if (dom) {
          dom.style.display = 'none';
        } */
      }, 500);
    }
  },
  methods: {},
});
