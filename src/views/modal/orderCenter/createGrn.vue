<template>
  <div class="createGrn">
    <div class="form-body">
      <p v-if="isError">
        {{ errorMessage }}
      </p>
      <Form
        v-if="!isError"
        :label-width="120"
      >
        <FormItem label="档期日程归属">
          <DropDownSelectFilter
            :single="true"
            :data="datas"
            :auto-data="autoData"
            :columns="columns"
            :default-selected="defaultSelected"
            @on-fkrp-selected="fkrpSelected"
            @on-input-value-change="inputValueChange"
            @on-clear="clear"
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
        v-if="!isError"
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
        isError: false,
        errorMessage: '',
        transportStyle: '',
        autoData: [],
        columns: ['ENAME', 'value'],
        defaultSelected: [],
        selectData: [],
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
    mounted() {
      this.init();
    },
    methods: {
      determine() {
        const formdata = new FormData();
        const obj = {
          ids: this.idArray,
          ascriptionId: this.selectData[0].ID || this.defaultSelected[0].ID,
          deliveryMethod: this.transportStyle
        };
        formdata.append('param', JSON.stringify(obj));
        this.service.orderCenter.distributionCreateDelivery(formdata)
          .then(res=>{
            console.log(res);
            if (res.data.code === 0) {
              this.$Message.success(res.data.message);
              this.$emit('closeActionDialog');
            } else {
              this.$Message.error(res.data.message);
            }
          });
      },
      init() {
        const formdata = new FormData();
        formdata.append('param', JSON.stringify({ ids: this.idArray }));
        this.service.orderCenter.checkBeforeCreateVipDelivery(formdata).then(res=>{
          console.log(res);
          if (res.data.code === 0) {
            this.transportStyle = res.data.data.deliveryMethod;
            this.defaultSelected = [{ ID: res.data.data.id, Label: res.data.data.eName }];
            this.selectData = this.defaultSelected;
            this.getData();
          } else {
            this.isError = true;
            this.errorMessage = res.data.message;
          }
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
        this.selectData = e;
        this.getDeliveryMethod();
      },
      clear() {
        this.defaultSelected = [];
        this.selectData = [];
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
      },
      getDeliveryMethod() {
        if (!this.selectData.length && !this.defaultSelected.length) {
          this.$Message.warning('档案日程归属不能为空!');
          return;
        }
        const formdata = new FormData();
        formdata.append('param', JSON.stringify({ ids: this.idArray, ascriptionId: this.selectData[0].ID || this.defaultSelected[0].ID }));
        this.service.orderCenter.getDeliveryMethod(formdata).then(res=>{
          console.log(res);
          if (res.data.code === 0) {
            this.transportStyle = res.data.data;
          } else {
            this.$Message.error(res.data.message);
          }
        });
      }
    }
  };
</script>
