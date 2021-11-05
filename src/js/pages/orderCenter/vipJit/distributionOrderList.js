/*
 * @Author: your name
 * @Date: 2021-06-07 20:40:40
 * @LastEditTime: 2021-06-29 10:49:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/js/pages/orderCenter/vipJit/distributionOrderList.js
 */
import { OmsTable } from 'burgeonComponents'
import R3 from '@syman/burgeon-r3';

const { network } = R3;
export default {
  name: 'DistributionOrderList',
  components: {
    OmsTable
  },
  data() {
    return {
      tableConfig: {
        page: 1,
        current: 1,
        pageShow: true,
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
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
