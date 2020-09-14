<template>
  <!-- 定制页面通用日志表格 只需要引入组件,传入当前表明和详情id即可-->
  <div class="logTable">
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'LogTable',
  data() {
    return {
      columns: [],
      data: []
    }
  },
  props: {
    tableName: {
      type: String
    },
    id: {
      type: String
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //请求表头和表数据
      axios({
        url: '/p/cs/selectlog',
        method: 'post',
        data: {
          tableName: this.tableName || this.$route.query.tableName,
          objid: this.id || this.$route.query.id
        }
      }).then(res => {
        if (res.data.data.code == 0) {
          this.columns = res.data.data.data.title;
          this.data = res.data.data.data.data;
        } else {
          this.$Message.error(res.data.data.message || '日志服务请求失败!');
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>