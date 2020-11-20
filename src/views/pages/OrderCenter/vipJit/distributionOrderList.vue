<template>
  <!-- 唯品会退货单->配货单明细 -->
  <div class="distributionOrderList">
    <businessActionTable :jordan-table-config="tableConfig" />
  </div>
</template>

<script>
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
          pageShow: true,
          total: 0, // 设置总条数
          pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
          pageSize: 10, // 每页条数
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
        network.get(`/api/cs/vip/distribution/v1/out/storage?OcBVipcomDeliveryId=${this.$route.params.tableId}&pageNum=${1}&pageSize=${10}`).then(res=>{
          console.log(res);
        });
      }
    }
  };
</script>
