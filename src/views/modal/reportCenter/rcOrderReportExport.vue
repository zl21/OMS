<template>
  <div
    style="width: 250px"
    class="gf"
  >
    <p class="title">
      数据导出中...
    </p>
  </div>
</template>

<script>
  import axios from 'axios';

  const { getModuleName } = R3;

  export default {
    data() {
      return {
        tablename: '',
        tableList: {
          V_OC_B_VIPCOM_DISTRIBUTION: {
            table: 'V_OC_B_VIPCOM_DISTRIBUTION',
            url: '/p/cs/exportVipcomDistribution',
            filename: '配货单导出报表',
            menu: '配货单导出报表',
            type: '',
          },
          ORDEREXPORTVIEW: {
            table: 'ORDEREXPORTVIEW',
            url: '/p/cs/exportOrderReport',
            filename: '订单导出报表',
            menu: '订单导出报表',
          },
          V_SG_B_PHY_OUT_NOTICES: {
            table: 'V_SG_B_PHY_OUT_NOTICES',
            url: '/p/cs/exportPhyOutNoticesReport',
            filename: '出库通知单导出报表',
            menu: '出库通知单导出报表',
            type: '',
          },
          REFUND_IN_EXPORTVIEW: {
            table: 'REFUND_IN_EXPORTVIEW',
            url: '/p/cs/exportRefIn',
            filename: '退货入库导出报表',
            menu: '退货入库导出报表',
          },
          V_RETAIL_REPORT: {
            table: 'V_RETAIL_REPORT',
            url: '/p/cs/exportRetailReport',
            filename: '零售导出报表',
            menu: '零售导出报表',
          },
        },
      };
    },
    components: {},
    props: {
      objList: {
        type: Array,
        defalut: () => []
      },
      idArr: {
        type: Array,
        defalut: () => []
      },
      webid: {
        type: Number
      },
      // tablename: {
      //   type: String,
      // },
      rowData: {
        type: Array,
        defalut: () => []
      },
    },
    created() {
      const self = this;
      self.getBatchNumber();
    },
    methods: {
      getBatchNumber() {
        const self = this;
        // 获取搜索的数据
        const fixedcolumns = self.$parent.$parent.$parent.formItems.data;
        // console.log('fixedcolumns',fixedcolumns);
        const tableMark = self.$route.params.tableName;
        // console.log('tableMark',tableMark);
        const url = self.tableList[tableMark].url;
        // let attrArr = self.$attrs.StopOrEnabled.split('&');
        let type = '';
        // 获取主表的所有信息
        const tableInfo = this.$store.state[getModuleName()].buttons;
        // this.tablename = '';
        // 获取table的Name和主表名
        console.log(tableInfo.tableName);
        if (tableInfo.tabledesc || tableInfo.tabledesc !== undefined) {
          type = tableInfo.tabledesc;
          this.tablename = tableInfo.tableName;
        }
        /* if (attrArr && attrArr.length > 0) {
        attrArr.forEach((item) => {
          if (item.indexOf('type') === 0) {
            let itemArr = item.split('=');
            type = itemArr[1];
          }
        });
      } */
        const searchdata = {
          table: tableMark,
          column_include_uicontroller: true,
          fixedcolumns,
          type,
        };
        const fromdata = new FormData();
        fromdata.append('searchdata', JSON.stringify(searchdata));
        fromdata.append('filename', self.tableList[tableMark].filename);
        fromdata.append('filetype', ' .xlsx');
        fromdata.append('showColumnName', true);
        fromdata.append('menu', self.tableList[tableMark].menu);
        axios({
          url,
          method: 'post',
          data: fromdata,
        }).then((res) => {
          console.log(res);
          self.$emit('closeActionDialog');
          if (res.data.code === 0) {
            const mes = res.data.message || '导出成功！';
            self.$Message.success(mes);
            self.$store.commit('TabOpen', {
              id: res.data.data,
              type: 'singleView',
              name: 'singleView',
              label: '我的任务',
              query: {
                id: res.data.data,
                pid: '10010',
                ptitle: '我的任务',
                ptype: 'table',
                tabTitle: '我的任务',
                tableName: 'CP_C_TASK',
              },
            });
            self.downloadUrlFile(res.data.data);
          } else {
            const err = res.data.message || '失败！';
            self.$Message.error(err);
          }
        });
      },
    },
  };
</script>

<style>
.gf .title {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>
