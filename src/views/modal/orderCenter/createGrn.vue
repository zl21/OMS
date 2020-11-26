<template>
  <div class="createGrn">
    <div class="form-body">
      <Form
        :label-width="120"
      >
        <FormItem label="档期日程归属">
          <DropDownSelectFilter
            :single="true"
            :data="datas"
            :auto-data="autoData"
            :columns="columns"
            @on-fkrp-selected="fkrpSelected"
            @on-input-value-change="inputValueChange"
          />
        </FormItem>
        <FormItem label="运输方式">
          <Select v-model="transportStyle">
            <Option value="1">
              汽运
            </Option>
            <Option value="2">
              空运
            </Option>
          </Select>
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
    props: {
      idArray: {
        default: []
      }
    },
    data() {
      return {
        vmI18n: window.vmI18n,
        transportStyle: '',
        autoData: [],
        columns: ['ENAME', 'value'],
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
              show: true,
              isak: true
            },
          ],
          row: []
        }
      };
    },
    async mounted() {
      await this.getData();
      await this.init();
    },
    methods: {
      determine() {
            
      },
      init() {
        const formdata = new FormData();
        formdata.append('param', JSON.stringify({ ids: this.idArray }));
        this.service.orderCenter.checkBeforeCreateVipDelivery(formdata).then(res=>{
          console.log(res);
        });
      },
      getData() {
        const formdata = new FormData();
        const obj = { 
          table: 'ST_C_VIPCOM_ASCRIPTION', startindex: 0, fixedcolumns: {}, column_include_uicontroller: true, isolr: false 
        };
        formdata.append('searchdata', JSON.stringify(obj));
        this.service.common.QueryList(formdata).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            this.datas.row = res.data.datas.row;
          }
        });
      },
      fkrpSelected(e) {
        console.log(e);
      },
      inputValueChange(e) {
        const formdata = new FormData();
        formdata.append('ak', e);
        formdata.append('colid', '168138');
        formdata.append('fixedcolumns', JSON.stringify({}));
        this.service.common.fuzzyquerybyak(formdata).then(res=>{
          console.log(res);
          if (res.data.code == 0) {
            this.autoData = res.data.data;
          }
        });
      }
    }
  };
</script>
