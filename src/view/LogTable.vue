<!--
 * @Author: your name
 * @Date: 2021-04-26 18:32:29
 * @LastEditTime: 2021-11-02 18:06:29
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/src/view/LogTable.vue
-->
<template>
  <!-- 定制页面通用日志表格 只需要引入组件,传入当前表明和详情id即可-->
  <div class="logTable">
    <Table :columns="columns" :data="data"></Table>
  </div>
</template>

<script>
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
      let params = {
        tableName: this.tableName || this.$route.query.tableName,
        objid: this.id || this.$route.query.id
      }
      this.service.common.SelectLog(params).then(res => {
        if (res.data.data.code == 0) {
          if (!res.data.data.data) return;
          this.columns = res.data.data.data.title;
          this.data = res.data.data.data.data;
        } else {
          console.error(res.data.data.message || '日志服务请求失败!');
        }
      })
    }
  }
}
// import LogTable from 'burgeonComponents/js/LogTable.js';
// export default LogTable;
</script>
