<template>
  <div style="width:440px;">hello</div>
</template>

<script>
  export default {
    components: {},
    props: {
      idArray: {
        type: Array,
        default: () => []
      },
      selectRowData: {
        type: Array
      },
    },
    data() {
      return {
        tipModal: true,
      };
    },
    methods: {
      init() {
        this.$emit('closeActionDialog');
        if (this.idArray.length !== 1) {
          this.$message.error('请先选择一条数据更换吊牌！');
          return;
        }
        if (this.selectRowData[0].STATUS && this.selectRowData[0].STATUS.val === '缺货') {
          this.$message.error('缺货状态的单据不能执行换吊牌操作！');
          return;
        }
        this.$store.commit('customize/TabHref', {
          id: this.idArray[0],
          type: 'CUSTOMIZED',
          name: 'splitDistributionOrder',
          label: 'JIT配货单换吊牌',
        });
      }
    },
    mounted() {
      this.init();
    }
  };
</script>
