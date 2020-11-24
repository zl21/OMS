<template>
  <div class="createGrn">
    <div class="form-body">
      <Form
        :model="formItem"
        :label-width="80"
      >
        <FormItem label="档期">
          <DropMultiSelectFilter
            :data="datas"
            :total-row-count="totalRowCount"
            :page-size="pageSize"
            :show-colname-key="'show'"
            :default-selected="defaultSelected"
            :auto-data="AutoData"
            @on-page-change="changePage"
            @on-fkrp-selected="fkrpSelected"
            @on-clear="clear"
            @on-input-value-change="inputValueChange"
          />
        </FormItem>
        <FormItem label:"运输方式">
          <!-- <Select>
          <Option>1</Option>
          </Select> -->
        </FormItem>
      </Form>
    </div>
    <div class="dialog-footer">
      <!-- 确定 -->
      <Button
        type="primary"
        size="small"
        @click="determine"
      >
        {{ vmI18n.t("common.determine") }}
      </Button>
      <!-- 取消 -->
      <Button
        type="error"
        ghost
        size="small"
        @click="
          () => {
            this.$emit('closeActionDialog');
          }
        "
      >
        {{ vmI18n.t("common.cancel") }}
      </Button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        vmI18n: window.vmI18n,
        defaultSelected: [], // 默认展示项
        selectDatas: [],
        AutoData: [],
        datas: {
          start: 0,
          tabth: [
            {
              colname: 'ID',
              name: 'ID',
              show: false
            },
            {
              colname: 'ENAME',
              name: '日程归属名称',
              show: true
            },
          ],
          row: []
        },
        totalRowCount: 100,
        pageSize: 10,
      };
    },
    mounted() {
      this.getDataList();
    },
    methods: {
      determine() {
            
      },
      getDataList() {
        const formdata = new FormData();
        const obj = { 
          table: 'ST_C_VIPCOM_ASCRIPTION', startindex: 0, range: 1000, fixedcolumns: {}, column_include_uicontroller: true, isolr: false 
        };
        formdata.append('searchdata', JSON.stringify(obj));
        this.service.common.QueryList(formdata).then(res=>{
          this.$nextTick(()=>{
            this.datas.row = res.data.datas.row;
            this.totalRowCount = res.data.datas.totalRowCount;
          });
        });
      },
      fkrpSelected(e) {
        this.selectDatas = e;
      },
      clear() {
        this.selectDatas = [];
      },
      changePage(e) {
        // this.datas.start = this.pageSize * (e - 1);
        // this.getDataList();
      },
      inputValueChange(e) {
        console.log(e);
        const formdata = new FormData();
        const obj = { 
          table: 'ST_C_VIPCOM_ASCRIPTION', startindex: this.datas.start, range: this.pageSize, fixedcolumns: { ENAME: e }, column_include_uicontroller: true, isolr: false 
        };
        formdata.append('searchdata', JSON.stringify(obj));
        this.service.common.QueryList(formdata).then(res=>{
          console.log(res);
        });
      }
    }
  };
</script>
