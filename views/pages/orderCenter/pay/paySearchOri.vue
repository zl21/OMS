<!--
 * @Author: zhou.l
 * @Date: 2021-06-01 11:26:07
 * @LastEditTime: 2021-06-09 10:54:37
 * @LastEditors: Please set LastEditors
 * @Description: 赔付单-新增-查询原订单编号-formItem
-->
<template>
  <div class="OC_B_ORDER_ID">
    <!-- <label class="itemLabel"> 零售发货单单号: </label> -->
    <Input
      class="oriCode"
      :autocomplete="'new-password'"
      disabled
      @on-click="iconclick"
      :icon="searchIcon"
      v-model="REDUNDANT_ORDER_ID"
      :placeholder="''"
      @on-blur="inputblur"
      @on-change="inputChange"
    ></Input>
    <Icon
      v-if="REDUNDANT_ORDER_ID && REDUNDANT_ORDER_ID != '-1' && ID == '-1'"
      class="oriCodeclear"
      type="ios-close-circle"
      @click="clear"
    />
    <!-- 查询原定单编号 -->
    <Modal
      v-model="orderModal"
      width="800"
      titleAlign="left"
      :closable="true"
      :mask="true"
      class-name="ark-dialog"
      title="关联原单"
    >
      <div class="dialog-footer" slot="footer">
        <businessButton :btn-config="btnConfigMo" />
      </div>
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

export default {
  name: 'searchOOID',
  components: {
    businessButton,
    businessForm,
    businessActionTable,
  },
  model: {
    prop: 'value',
    event: 'on-Change'
  },
  props: {
    value: {
      type: String,
      default: () => '', // 框架传过来的value
    },
  },
  data() {
    return {
      vmI18n: $i18n,
      orderModal: false,
      loading: false,
      ID: this.$route.params.itemId && this.$route.params.itemId != 'New' ? this.$route.params.itemId : '-1',
      REDUNDANT_ORDER_ID: '',
      backable: false,
      modal: false,
      getCurrenData: [],
      isChecked: false,
      btn: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: "right",
        buttons: [
          /* {
            text: '重置',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.formEmpty(this, 'formConfig');
              this.queryEnter(1, this.table.pageSize, true);
            }, // 按钮点击事件
          }, */
          {
            text: $i18n.t('btn.find'), // 查找 按钮文本
            disabled: false, // 按钮禁用控制
            type: 'primary',
            btnclick: () => {
              this.queryEnter(1, this.table.pageSize);
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
              this.destroyVm();
            },
          },
          {
            text: '确定',
            type: 'primary',
            btnclick: () => {
              if (!this.isChecked) {
                this.$Message.warning('请选中一条单据！');
                return false
              }
              this.$emit('change', this.getCurrenData, this);
              // this.$emit('change', 'SF000000002', this);
              this.REDUNDANT_ORDER_ID = this.getCurrenData[0].billNo;
              this.other.REDUNDANT_ORDER_ID = this.REDUNDANT_ORDER_ID;
              this.other.expressCode = this.getCurrenData[0] ? this.getCurrenData[0].expressCode : '';
              const aa = this.getCurrenData[0].psCSkuEcode;
              R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ other: this.other })));
              R3.store.commit('customize/REDUNDANT_ORDER_ID', JSON.parse(JSON.stringify(this.other.expressCode)));
              this.destroyVm();
            },
          },
        ],
      },
      formConfig: {
        formValue: {
          billNo: "",
          sourceCode: '',
          expressCode: '',
          receiverName: '',
          buyerNick: '',
          receiverMobile: '',
        },
        formData: [
          {
            style: 'input',
            label: '原定单编号', // 原定单编号
            colname: 'billNo',
            width: '8',
            inputenter: () => this.queryEnter(1, 10)
          },
          {
            style: 'input',
            label: $i18n.t('form_label.platform_billNo'), // 平台单号
            colname: 'sourceCode',
            width: '8',
            inputenter: () => this.queryEnter(1, 10)
          },
          {
            style: 'input',
            label: '物流单号', // 物流单号
            colname: 'expressCode',
            width: '8',
            inputenter: () => this.queryEnter(1, 10)
          },
          {
            style: 'input',
            label: $i18n.t('form_label.consignee'), // 收货人
            colname: 'receiverName',
            width: '8',
            inputenter: () => this.queryEnter(1, 10)
          },
          {
            style: 'input',
            label: $i18n.t('table_label.buyerNickname'), // 买家昵称
            colname: 'buyerNick',
            width: '8',
            inputenter: () => this.queryEnter(1, 10)
          },
          {
            style: 'input',
            label: $i18n.t('form_label.consignee_phone'), // 收货人手机
            colname: 'receiverMobile',
            width: '8',
            inputenter: () => this.queryEnter(1, 10)
          },
        ],
      },
      table: {
        columns: [], // 表头
        data: [], // 数据配置
        indexColumn: true, // 是否显示序号
        height: '270',
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
      other: {},
    };
  },
  computed: {
    searchIcon() {
      return this.ID == '-1' ? 'ios-search' : '';
    },
  },
  watch: {
    orderModal(val) {
      !val && this.destroyVm();
    },
    REDUNDANT_ORDER_ID: {
      handler(newValue, oldVal) {
        this.other.REDUNDANT_ORDER_ID = newValue
        this.other.expressCode = this.getCurrenData[0] ? this.getCurrenData[0].expressCode : '';
        R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ other: this.other })));
        R3.store.commit('customize/REDUNDANT_ORDER_ID', this.other.expressCode);
      },
    },
  },

  created() { },
  mounted() {
    console.log('paySearchOri::mounted::');
    const val = this.$parent.$props.value;
    if (val) {
      if (val instanceof Array && val.length) {
        this.REDUNDANT_ORDER_ID = val[0].billNo || '';
      } else {
        this.REDUNDANT_ORDER_ID = val;
      }
      this.other.REDUNDANT_ORDER_ID = this.REDUNDANT_ORDER_ID
      R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ other: this.other })));
      R3.store.commit('customize/REDUNDANT_ORDER_ID', this.other.expressCode);
    }
    this.$nextTick(async () => {
      this.queryEnter(1, 10, true);
    });
  },
  methods: {
    destroyVm() {
      this.orderModal = false;
      this.formEmpty(this, 'formConfig');
      this.table.data = [];
    },
    iconclick() {
      // console.log(e, this);
      this.orderModal = true;
    },
    clear() {
      this.REDUNDANT_ORDER_ID = '';
      // this.$emit('change', [{ ID: '-1', Label: '-1' }], this);
      this.$emit('change', '', this);
      // R3.store.commit('customize/REDUNDANT_ORDER_ID', 'zhoulan');
      // 联动清空子表
      this.getCurrenData[0] = {};
      setTimeout(() => {
        R3.store.commit('customize/REDUNDANT_ORDER_ID', 'clear');
      }, 10);
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
    keyDown() { },
    /* ------------------- 事件 part start ------------------- */
    async queryEnter(page = 1, pageSize = 10, isMounted) {
      console.log(page, pageSize);
      const self = this;
      // 清空数据
      this.table.loading = true;
      this.table.data = [];
      let fixedcolumns = JSON.parse(JSON.stringify(this.formConfig.formValue))
      for (const key in fixedcolumns) {
        if (!fixedcolumns[key]) delete fixedcolumns[key];
      }
      const pageInfo = { pageNum: page, pageSize }
      let param = { ...fixedcolumns, ...pageInfo }
      if (isMounted) param.expressCode = '-1';
      const { data: { code, data } } = await self.service.orderCenter.ocBCompensateOrder(param).catch(e => {
        this.table.loading = false;
      });
      this.table.loading = false;
      this.table.columns = data.columns;
      this.table.data = data.data;
      this.table.total = data.pageInfo.total || 0;
    },
    onRowClick(row, index) {
      if (row.expressCode || row.sourceCode) this.isChecked = true;
      if (!row.expressCode) return this.$$Message.warning('当前选中行没有物流单号！')
      this.getCurrenData = [{ ID: row.expressCode, Label: row.billNo, ...row }];
      // sourceCode 平台单号
      // billNo 原单号
    },
    onRowDblclick(row) {
      console.log(row);
    },
    pageChange(page) {
      console.log('page:', page);
      this.table.pageIndex = page;
      this.queryEnter(page, this.table.pageSize)
    },
    pageSizeChange(size) {
      this.table.pageSize = size;
      this.queryEnter(this.table.pageIndex, size)
    }
    /* ------------------- 子表事件 part end ------------------- */
  },
};

</script>

<style lang="less" scoped>
.OC_B_ORDER_ID {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .itemLabel {
    flex: 0 0 120px;
  }
  .oriCode /deep/.ark-input-innerWrap {
    right: 3px;
  }
  /deep/.ark-input-icon {
    height: 32px;
    line-height: 32px;
  }
  .oriCodeclear {
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    z-index: 9;
    opacity: 0.7;
  }
}
</style>
