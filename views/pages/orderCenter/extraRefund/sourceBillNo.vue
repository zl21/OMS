<!--
 * @Author: zhou.l
 * @Date: 2021-06-01 11:26:07
 * @LastEditTime: 2021-07-08 17:04:23
 * @LastEditors: Please set LastEditors
-->
<template>
  <div class="OC_B_ORDER_ID">
    <label class="itemLabel"> 零售发货单单号: </label>
    <Input
      :autocomplete="'new-password'"
      @on-click="iconclick"
      @on-enter="inputenter"
      clearable
      icon="ios-search"
      v-model="BILL_NO"
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
    <div class="customized-modal">
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
    </div>
    <div class="dialog-footer" slot="footer">
      <businessButton :btn-config="btnConfigMo" />
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
// import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
// import dataAccessMixin from '@/assets/js/mixins/dataAccess';
import dateUtil from '@/assets/js/__utils__/date.js';

export default {
  name: 'sourceBillNo',
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessDialog,
    businessLabel,
    businessStatusFlag
  },
  // model: {
  //   prop: 'value',
  //   event: 'change'
  // },
  props: {
    value: {
      type: String,
      default: () => '', // 框架传过来的value
    },
  },
  // mixins: [buttonPermissionsMixin, dataAccessMixin],
  data() {
    return {
      BILL_NO:'',
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
            text: $i18n.t('btn.reset'), //重置
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              // this.formEmpty(this, 'formConfig', ['ORDER_DATE', 'PAY_TIME']);
              this.queryEnter(1, this.table.pageSize, true);
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('btn.find'), // 查找 按钮文本
            disabled: false, // 按钮禁用控制
            type: 'primary',
            btnclick: () => {
              this.queryEnter(1, this.table.pageSize, true);
            }, // 按钮点击事件
          },
        ],
      },
      btnConfigMo: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.orderModal = false;
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            type: 'primary',
            btnclick: () => {
              if (!this.table.selectionArr.length) {
                this.$Message.warning('请选中一条单据！');
                return false
              }
              R3.store.commit('customize/originalOrder',this.table.selectionArr[0].BILL_NO);
              this.BILL_NO = this.table.selectionArr[0].BILL_NO;
              this.table.selectionArr[0].ID = this.BILL_NO;
              this.$emit('change',this.table.selectionArr,this)
              this.orderModal = false;
              this.table.selectionArr = [];
            },
          },
        ],
      },
      formConfig: {
        formValue: {
          BILL_NO: "",
          SOURCE_CODE: '',
          EXPRESS_CODE: '',
          RECEIVER_NAME:'',
          BUYER_NICK: '',
          RECEIVER_MOBILE: '',
        },
        formData: [
          {
            style: 'input',
            label: '原定单编号', // 原定单编号
            colname: 'BILL_NO',
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
            colname: 'EXPRESS_CODE',
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
        columns: [
          {
            key: 'BILL_NO',
            title: '原订单编号'
          },{
            key: 'SOURCE_CODE',
            title: '原平台单号'
          },{
            key: 'EXPRESS_CODE',
            title: '物流单号'
          },{
            key: 'CP_C_LOGISTICS_ID',
            title: '物流公司'
          },{
            key: 'ECODE',
            title: 'SKU编码'
          },{
            key: 'BUYER_NICK',
            title: '买家昵称'
          },{
            key: 'RECEIVER_NAME',
            title: '收货人'
          },{
            key: 'RECEIVER_NAME',
            title: '收货人手机'
          }
        ], // 表头
        data: [], // 数据配置
        selectionArr:[],
        indexColumn: true, // 是否显示序号
        height: '300',
        loading: false,
        isShowSelection: false, // 是否显示checkedbox
        pageShow: true, // 控制分页是否显示
        btnsShow: true, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
        pageIndex: 1, // 页码
      },
    };
  },
  watch:{
    BILL_NO(newVal){
      if(!newVal){
        console.log(newVal);
        R3.store.commit('customize/originalOrder','');
      }
    }
  },
  created() {
    console.log();
  },
  destroyed() {

  },
  mounted() {
    if(!(this.$route.params.itemId == 'New')){
        const ID = this.$route.params.itemId;
        const key = `V.OC_B_REFUND_ORDER_EXTRA.10825.${ID}`;
      setTimeout(() => {
        this.BILL_NO = this.$store.state[key].mainFormInfo.formData.data.addcolums[0].childs[1].valuedata
      }, 100);
    }
  },
  methods: {

    iconclick() {
      this.orderModal = true;
      // 获取
      console.log('获取');
      this.queryEnter();
    },
    inputenter() { },
    inputblur() { },
    inputChange() {},
    /* --------------------- 工具函数： --------------------- */
    keyDown() { },
    /* ------------------- 事件 part start ------------------- */
    async queryEnter(pageNum = 1, pageSize = 10) {
      const self = this;
      this.table.loading = true;
      let formValue = this.formConfig.formValue;
      let paramsNull
      let params = {
        pageNum:pageNum,
        pageSize:pageSize,
        BILL_NO: formValue.BILL_NO ? formValue.BILL_NO : paramsNull,
        SOURCE_CODE: formValue.SOURCE_CODE ? formValue.SOURCE_CODE : paramsNull,
        EXPRESS_CODE: formValue.EXPRESS_CODE ? formValue.EXPRESS_CODE : paramsNull,
        RECEIVER_NAME:formValue.RECEIVER_NAME ? formValue.RECEIVER_NAME : paramsNull,
        BUYER_NICK: formValue.BUYER_NICK ? formValue.BUYER_NICK : paramsNull,
        RECEIVER_MOBILE: formValue.RECEIVER_MOBILE ? formValue.RECEIVER_MOBILE : paramsNull,
      }
      const {data:{code,data}} = await self.service.orderCenter.queryExtraReturnOrder(params);
      this.table.loading = false;
      if(code === 0){
        this.table.data = data.ORDER;
        this.table.total = data.TOTAL;
      }
    },
    onRowClick(row, index) {
      const self = this;
      self.table.selectionArr[0] = row;
    },
    onRowDblclick(row) {
      const self = this;
    },
    pageChange(page) {
      this.table.pageIndex = page;
      this.queryEnter(page, this.table.pageSize, showData)
    },
    pageSizeChange(size) {
      this.table.pageSize = size;
      this.queryEnter(1, size, showData)
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
