<template>
  <div class="createGrn">
    <div class="form-body">
      <Form
        :model="formItem"
        :label-width="80"
      >
        <FormItem label="档期日程归属">
          <DropDownSelectFilter
            :single="true"
            :data="datas"
            @on-fkrp-selected="fkrpSelected"
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
    data() {
      return {
        vmI18n: window.vmI18n,
        transportStyle: '',
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
      this.getData();
    },
    methods: {
      determine() {
            
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
      }
    }
  };
</script>
