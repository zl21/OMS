<!--
 * @Author: your name
 * @Date: 2021-05-27 11:05:42
 * @LastEditTime: 2021-07-16 14:08:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/orderCenter/orderManager/proDetail.vue
-->
<template>
  <!-- 零售发货单订单明细查询组件,用于列表查看订单详情 -->
  <div class="proDetail"  v-loading="loading">
    <div v-if="title == '商品详情'">
      <div
        v-show="isQh"
        class="isQh"
        @click="qhClick"
      >
        <Icon type="ios-repeat" />
        <!-- 切换为sku商品显示 -->
         {{Vmi18n.t('form_label.b0')}}
      </div>
      <div
        v-show="!isQh"
        class="isQh"
        @click="qhClick"
      >
        <Icon type="ios-repeat" />
        <!-- 切换平台商品明细 -->
         {{Vmi18n.t('form_label.b1')}}
      </div>
    </div>
    <businessActionTable
      :jordan-table-config="tableConfig"
    />
    <!-- <loading :loading="loading" /> -->
  </div>
</template>
<script>
  import businessActionTable from 'professionalComponents/businessActionTable.vue';
  // import loading from 'professionalComponents/loading.vue';

  export default {
    components: {
      businessActionTable,
      // loading
    },
    props: {
      title: {
        type: String,
      },
      itemid: {
      }
    },
    data() {
      return {
        loading: false,
        isQh: true,
        Vmi18n:$i18n,
        tableConfig: {
          columns: [
            {
              title: $i18n.t('table_label.operation'), // 操作
              key: 'OPARATE_BUTTON',
              render: (h, params)=> h('a', {
                on: {
                  click: ()=>{
                    console.log(params.row);
                    this.querySgStorage(params.row);
                    this.$Modal.confirm({
                      title: '查库存',
                      titleAlign: 'center',
                      mask: true,
                      className: 'ark-dialog',
                      render: (h) => h('Table', {
                        props: {
                          columns: [
                            {
                              title: $i18n.t('table_label.serialNo'), // 序号
                              key: 'Index',
                              type: 'index',
                            },
                            {
                              title: '逻辑仓',
                              key: 'CP_C_STORE_NAME',
                            },
                            {
                              title: '可用数',
                              key: 'QTY_AVAILABLE',
                            },
                          ],
                          data: this.storageData
                        }
                      })
                    });
                  }
                }
              }, '查库存')
            }
          ],
          data: [],
          pageShow: false, // 控制分页是否显示
          btnsShow: true, // 控制操作按钮是否显示
          searchInputShow: false, // 控制搜索框是否显示
          indexColumn: true,
          width: '', // 表格宽度
          height: 300, // 表格高度
          border: true, // 是否显示纵向边框
          total: 0, // 设置总条数
          pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
          pageSize: 10, // 每页条数
          current: '', // 当前页
        },
        storageData:[],
      };
    },
    mounted() {
      this.query();
    },
    methods: {
      querySgStorage(row) {
        const _this = this;
        let formdata = new FormData();
        formdata.append('itemId', row.ID);
        formdata.append('id', _this.itemid);
        /* let param = {
          itemId: row.ID || '', // 子订单id
          id: _this.itemid, // 主表id
        }; */
        _this.loading = true;
        /* _this.storageData = [
          {CP_C_STORE_NAME:'tt',
          QTY_AVAILABLE:1}
        ]; */
        _this.service.orderCenter.querySgStorage(formdata).then(res=>{
          if (res.data.code == 0) {
            const data = res.data.data;
            _this.storageData = data;
          }
        });
        _this.loading = false;
      },
      qhClick() {
        this.isQh = !this.isQh;
        this.queryData();
      },
      async query() {
        const self = this;
        await self.queryColumn();
      },
      queryColumn() {
        const self = this;
        let data = {
          ID: self.itemid,
          TABLE: self.title == '商品详情' ? 'OC_B_ORDER_ITEM' : 'OC_B_ORDER_DELIVERY',
          PT_SKU: true, // true平台 false商品
          SUB_LIST: true
        };
        self.service.orderCenter.initObjectList(data).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            const data = res.data.data;
            if (!data.ZIP) {
              let arr = data.DATA.map(item=>{
                let { headerName, field } = item;
                return { title: headerName, key: field };
              });
              if (self.title == '商品详情') {
                self.tableConfig.columns = arr.concat(self.tableConfig.columns);
              } else {
                self.tableConfig.columns = arr;
              }
              self.queryData();
            }
          }
        });
      },
      queryData() {
        const self = this;
        let data = {
          ID: self.itemid,
          TABLE: 'OC_B_ORDER',
          SUB_TABLE: self.title == '商品详情' ? 'OC_B_ORDER_ITEM' : 'OC_B_ORDER_DELIVERY',
          PT_SKU: self.isQh, // true平台 false商品
          SUB_LIST: true
        };
        self.loading = true;
        self.service.orderCenter.queryObjectList(data).then(res=>{
          if (res.data.code == 0) {
            const data = res.data.data;
            if (!data.ZIP) {
              self.tableConfig.data = data.DATA.SUB_ITEM;
              self.loading = false;
            }
          }
        });
      },
    }
  };
</script>
<style scoped lang="less">
.isQh {
    text-align: right;
    cursor: pointer;
    margin: 10px;
    color: red;
}
</style>
