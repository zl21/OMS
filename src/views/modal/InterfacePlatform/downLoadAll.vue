<template>
  <div style="width:440px;" />
</template>

<script>
  export default {
    components: {},
    props: {
      idArray: {
        type: Array,
        default: () => []
      },
      objList: {
        type: Array
      },
    },
    data() {
      return {};
    },
    methods: {
      init() {
        if (this.props.idArray.length !== 1) {
          this.$message.error('请先选择一条数据更换吊牌！');
        }
        // if () {
        //   this.$message.error('当前单据状态不可操作!')
        // }
      }
    },
    mounted() {
      // this.$emit('closeActionDialog');
      this.init();
    }
  };
</script>
