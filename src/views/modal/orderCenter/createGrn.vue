<template>
  <div class="createGrn">
    <div class="form-body">
      <div style="display:flex">
        <label>档期</label>
        <DropMultiSelectFilter
          :data="datas"
          :total-row-count="totalRowCount"
          :page-size="pageSize"
          :show-colname-key="'show'"
          :default-selected="defaultSelected"
          @on-page-change="changePage"
          @on-fkrp-selected="fkrpSelected"
          @on-clear="clear"
          @on-input-value-change="inputValueChange"
        />
      </div>
      <div style="display:flex">
        <label>运输方式</label>
        <!-- <Select>
          <Option>1</Option>
        </Select> -->
      </div>
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
        defaultSelected: [{ ID: '1', Label: '唯品会日程归属' }], // 默认展示项
        selectDatas: [],
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
      getDataList(fixedcolumns = {}) {
        const formdata = new FormData();
        const obj = { 
          table: 'ST_C_VIPCOM_ASCRIPTION', startindex: this.datas.start, range: this.pageSize, fixedcolumns, column_include_uicontroller: true, isolr: false 
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
        this.datas.start = this.pageSize * (e - 1);
        this.getDataList();
      },
      inputValueChange(e) {
        console.log(e);
        this.getDataList({ ENAME: e });
      }
    }
  };
</script>
