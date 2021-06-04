<!--
 * @Author: zhou.l
 * @Date: 2021-06-01 11:26:07
 * @LastEditTime: 2021-06-02 10:59:54
 * @LastEditors: Please set LastEditors
 * @Description: 赔付单-新增-查询原订单编号-formItem
 * @FilePath: /burgeon-project-logic/js/pages/orderCenter/paySearchOri.vue
-->
<template>
  <div class="OC_B_ORDER_ID">
    <label class="itemLabel"> 原定单编号： </label>
    <Input
      :autocomplete="'new-password'"
      @on-click="iconclick"
      @on-enter="inputenter"
      icon="ios-search"
      v-model.trim="OC_B_ORDER_ID"
      :placeholder="''"
      @on-blur="inputblur"
      @on-change="inputChange"
    ></Input>

    <!-- 查询原定单编号 -->
    <Modal
      v-model="orderModal"
      width="900"
      titleAlign="left"
      :closable="true"
      :mask="true"
      class-name="ark-dialog"
      title="关联原单"
    >
      <div class="dialog-footer" slot="footer">
        <businessButton :btn-config="btnConfigMo" />
      </div>
      <!-- <searchOOID :orderData="orderData" @getRowData="getRowData"></searchOOID> -->
      <div class="customized-detail-main">
        <businessForm :form-config="formConfig" />
      </div>
      <div class="customized-detail-btn">
        <businessButton :btn-config="btn" />
      </div>
      <div class="customized-detail-table">
        <business-action-table
          :jordan-table-config="table"
          @on-row-click="onRowClick"
          @on-row-dblclick="onRowDblclick"
          @on-page-change="pageChange"
          @on-page-size-change="pageSizeChange"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
// 退换货单详情
import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessLabel from 'professionalComponents/businessLabel';
import { setTimeout } from 'timers';
import businessDialog from 'professionalComponents/businessDialog';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import dataAccessMixin from '@/assets/js/mixins/dataAccess';
import dateUtil from '@/assets/js/__utils__/date.js';

export default {
  name: 'searchOOID',
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessDialog,
    businessLabel,
    businessStatusFlag
  },
  mixins: [buttonPermissionsMixin, dataAccessMixin],
  data() {
    return {
      vmI18n: $i18n,
      orderModal: false,
      OC_B_ORDER_ID: '',
      loading: false,
      ID: this.$route.params.customizedModuleId && (this.$route.params.customizedModuleId != 'NEW' || this.$route.params.customizedModuleId != 'New') ? this.$route.params.customizedModuleId : '-1',
      backable: false,
      modal: false,
      getCurrenData: {},
      btn: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: "right",
        buttons: [
          {
            text: '重置',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.formEmpty(this, 'formConfig', ['ORDER_DATE', 'PAY_TIME']);
              this.queryEnter(0, this.table.pageSize, true);
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('btn.find'), // 查找 按钮文本
            disabled: false, // 按钮禁用控制
            type: 'primary',
            btnclick: () => {
              this.queryEnter(0, this.table.pageSize, true);
            }, // 按钮点击事件
          },
        ],
      },
      btnConfigMo: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: "取消",
            btnclick: () => {
              this.orderModal = false;
            },
          },
          {
            text: '确定',
            type: 'primary',
            btnclick: () => {
              // queryorder() {
              if (!Object.keys(this.platformData).length) {
                this.$Message.warning('请选中一条单据！');
                return false
              }
              // this.renderForm(this.platformData);
              this.orderModal = false;
              // },
              // this.queryorder();
            },
          },
        ],
      },
      formConfig: {
        formValue: {
          CP_C_SHOP_ID: "",
          SOURCE_CODE: '',
          PLATFORM_STATUS: '',
          ORDER_STATUS: '',
          BUYER_NICK: '',
          RECEIVER_NAME: '',
          RECEIVER_MOBILE: '',
          ORDER_DATE: [`${this.getData(7, true)}`, `${this.getData(7)}`],
          PAY_TIME: [`${this.getData(7, true)}`, `${this.getData(7)}`],
          BILL_NO: '',
        },
        formData: [
          {
            style: 'input',
            label: '原定单编号', // 原定单编号
            colname: 'SOURCE_CODE',
            width: '8',
            // inputenter: () => this.queryBounced(),
          },
          {
            style: 'input',
            label: $i18n.t('form_label.platform_billNo'), // 平台单号
            colname: 'SOURCE_CODE',
            width: '8',
            // inputenter: () => this.queryBounced(),
          },
          {
            style: 'input',
            label: '物流单号', // 物流单号
            colname: 'SOURCE_CODE',
            width: '8',
            // inputenter: () => this.queryBounced(),
          },
          {
            style: 'input',
            label: $i18n.t('form_label.consignee'), // 收货人
            colname: 'RECEIVER_NAME',
            width: '8',
            // inputenter: () => this.queryBounced(),
          },
          {
            style: 'input',
            label: $i18n.t('table_label.buyerNickname'), // 买家昵称
            colname: 'BUYER_NICK',
            width: '8',
            // inputenter: () => this.queryBounced(),
          },
          {
            style: 'input',
            label: $i18n.t('form_label.consignee_phone'), // 收货人手机
            colname: 'RECEIVER_MOBILE',
            width: '8',
            // inputenter: () => this.queryBounced(),
          },
        ],
      },
      table: {
        columns: [], // 表头
        data: [], // 数据配置
        indexColumn: true, // 是否显示序号
        height: '300',
        loading: false,
        isShowSelection: false, // 是否显示checkedbox
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
      },
    };
  },
  created() {
    console.log();
  },
  destroyed() {

  },
  mounted() {
    this.$nextTick(async () => {
      // await this.initObjItem(-1);
      // 获取
      // this.queryEnter();
    });
  },
  methods: {

    iconclick() {
      this.orderModal = true;
    },
    inputenter() { },
    inputblur() { },
    inputChange() { },
    /* --------------------- 工具函数： --------------------- */
    // 清空表单
    formEmpty(_this, form, notvalueArr = [], notdrpArr = []) {
      _this[form].formData.forEach((it) => {
        if (it.itemdata && !notdrpArr.includes(it.colname)) {
          it.itemdata.pid = '';
          it.itemdata.valuedata = '';
        }
      })
      for (const key in _this[form].formValue) {
        if (!notvalueArr.includes(key)) {
          _this[form].formValue[key] = ''
        }
      }
      return _this[form]
    },
    // 获取几天前日期 0获取当前日期
    getData(day, startTime) {
      let date = startTime ? this.formatDate(new Date().setHours(0, 0, 0, 0) - 86400 * day * 1000) : this.formatDate(new Date().setHours(23, 59, 59, 0) - 86400 * day * 1000)
      return date;
    },
    // 时间戳格式化
    formatDate(time) {
      if (time instanceof Array && time[0]) {
        const start = dateUtil.getFormatDate(time[0], 'yyyy-MM-dd HH:mm:ss');
        const end = dateUtil.getFormatDate(time[1], 'yyyy-MM-dd HH:mm:ss');
        return start + '~' + end
      } else {
        const date = new Date(time);
        const resTime = dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
        return resTime
      }
    },
    keyDown() { },
    /* ------------------- 事件 part start ------------------- */
    async initObjItem(id) {
      const self = this;
      this.loading = true;
      let formData = new FormData();
      formData.append("table", 'OC_B_ORIG_ORDER');
      formData.append("getcmd", 'y');
      const res = await this.service.common.getTableQuery(formData);
      // let base = res?.data?.data?.datas?.dataarry || [];
      let base = res.data.data.datas.dataarry || [];
      base.map(it => {
        it.name = it.coldesc;
        it.display = it.display == 'OBJ_SELECT' ? 'select' : it.display;
      })
      self.formConfig = this.$OMS2.omsUtils.initFormConfig(
        base,
        self.formConfig
      );
      setTimeout(() => {
        this.loading = false;
      }, 100);
    },
    async queryEnter(page = 0, pageSize = 10, showData) {
      console.log(page, pageSize);
      const self = this;
      if (page >= 1) page = `${page - 1}0`
      // 清空数据
      this.table.loading = true,
        this.table.data = [];
      // 获取查询条件
      let { CP_C_SHOP_ID, SOURCE_CODE, PLATFORM_STATUS, ORDER_STATUS, BUYER_NICK, RECEIVER_NAME, RECEIVER_MOBILE, ORDER_DATE, PAY_TIME, BILL_NO } = self.formConfig.formValue;
      // 处理时间格式
      if (ORDER_DATE[0]) {
        ORDER_DATE = `${this.formatDate(ORDER_DATE[0])}~${this.formatDate(ORDER_DATE[1])}`
      }
      if (PAY_TIME[0]) {
        PAY_TIME = `${this.formatDate(PAY_TIME[0])}~${this.formatDate(PAY_TIME[1])}`
      }
      // 组合查询条件
      let fixedcolumns = {
        CP_C_SHOP_ID,//店铺
        SOURCE_CODE,//平台
        PLATFORM_STATUS,//平台状态
        ORDER_STATUS,//订单状态
        BUYER_NICK,// 昵称
        RECEIVER_NAME, //收货人姓名
        RECEIVER_MOBILE, //收货人手机号
        ORDER_DATE, // 
        PAY_TIME,//
        BILL_NO,
      };
      for (const key in fixedcolumns) {
        if (!fixedcolumns[key]) delete fixedcolumns[key];
      }
      let searchdata = { "table": "OC_B_ORIG_ORDER", "startindex": page, "range": pageSize, "fixedcolumns": fixedcolumns, "column_include_uicontroller": true, "isolr": false };
      let formData = new FormData();
      formData.append("searchdata", JSON.stringify(searchdata));
      // 调用查询接口
      const { data: { code, data } } = await self.service.common.QueryList(formData, { serviceId: "r3-oc-oms" });
      this.table.loading = false;
      if (code === 0) {
        // 处理表头和数据
        this.table.columns = data.tabth.map(element => ({ title: `${element.name}`, key: `${element.colname}`, dataAcessKey: `${element.colname}` }));
        // 是否显示数据
        if (showData) {
          let tableKey = data.row.length ? Object.keys(data.row[0]) : []; // 获取行数据的key
          this.getCurrenData = data.row.length ? data.row : [];
          this.table.total = data.totalRowCount
          data.row.forEach((item) => { //处理数据
            let curentData = {}
            tableKey.forEach(element => curentData[element] = item[element].val);
            this.table.data.push(curentData)
          });
        }
      }
    },
    onRowClick(row, index) {
      const self = this;
      console.log(row, index);
      this.$emit('getRowData', this.getCurrenData[index]);
    },
    onRowDblclick(row) {
      const self = this;
      console.log(row);
    },
    pageChange(page) {
      console.log('page:', page);
      this.table.pageIndex = page;
      this.queryEnter(page, this.table.pageSize, showData)
    },
    pageSizeChange(size) {
      this.table.pageSize = size;
      this.queryEnter(0, size, showData)
    }
    /* ------------------- 子表事件 part end ------------------- */
  },
};

</script>

<style lang="less" scoped>
.searchOOID {
  /deep/ .button-combina .button-content {
    justify-content: flex-end;
  }
}
.OC_B_ORDER_ID {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .itemLabel {
    flex: 0 0 120px;
  }
  /deep/.ark-input-icon {
    // top: 5px;
    // right: 2px;
    height: 32px;
    line-height: 32px;
  }
}
</style>
