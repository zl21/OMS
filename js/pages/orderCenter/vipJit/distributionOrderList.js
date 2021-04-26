import businessActionTable from 'professionalComponents/businessActionTable.vue';
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
  name: 'DistributionOrderList',
  components: {
    businessActionTable
  },
  data() {
    return {
      tableConfig: {
        page: 1,
        current: 1,
        pageShow: true,
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        indexColumn: true,
        columns: [
          {

          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    query() {
      network.get(`/api/cs/vip/distribution/v1/out/storage?ocBVipcomDeliveryId=${this.$route.params.itemId}&pageNum=${this.tableConfig.current}&pageSize=${this.tableConfig.pageSize}`).then(res=>{
        console.log(res);
        if (res.data.code === 0) {
          res.data.data.headers.forEach(item=>{
            if (item.label !== 'ID') {
              item.title = item.label;
              item.key = item.prop;
            }
          });
          this.tableConfig.columns = res.data.data.headers; // 赋值表头
          this.tableConfig.data = res.data.data.records; // 赋值列表数据
          this.tableConfig.current = res.data.data.current; // 赋值当前页
          this.tableConfig.page = res.data.data.pages;
          this.tableConfig.pageSize = res.data.data.size;
          this.tableConfig.total = res.data.data.total;
        }
      });
    },
    pageChange(val) {
      this.tableConfig.current = val;
      this.query();
    },
    pageSizeChange(val) {
      this.tableConfig.pageSize = val;
    }
  }
};
