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
          if (!res.data.data.data) return;
          this.columns = res.data.data.data.title;
          this.data = res.data.data.data.data;
        } else {
          this.$Message.error(res.data.data.message || '日志服务请求失败!');
        }
      })
    }
  }
}