<!--
 * @Author: zhou.l
 * @Date: 2021-06-01 11:26:07
 * @LastEditTime: 2021-06-03 20:33:06
 * @LastEditors: Please set LastEditors
 * @Description: 赔付单-新增/编辑-商品明细
 * @FilePath: /burgeon-project-logic/js/pages/orderCenter/payDetail.vue
-->
<template>
  <div class="payDetail" v-loading="loading">
    <businessActionTable
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <Modal
      v-model="tableConfig.modal"
      width="830"
      titleAlign="left"
      title="新增明细"
      :mask="true"
    >
      <div class="dialog-footer" slot="footer">
        <businessButton :btn-config="btnConfigMo" />
      </div>
      <payDetailAdd @detailAddData="detailAddDataHandel"></payDetailAdd>
    </Modal>
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import payDetailAdd from './payDetailAdd.vue';
const _ = require("lodash");

export default {
  name: 'payDetail',
  components: {
    payDetailAdd,
    businessButton,
    businessActionTable,
  },
  props: {
    idArray: {// 获取ID用于多选
      type: [Array, Object],
      default: () => { }
    },
    itemId: {// 获取当前子表表名
      type: String,
      default: () => ''
    },
    saveDialog: {   //  子表保存数据方法
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      vmI18n: $i18n,
      loading: false,
      tableConfig: {
        height: 300,
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        modal: false,
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: "left",
          buttons: [
            {
              type: 'primary', // 按钮类型
              text: '新增明细', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                this.tableConfig.modal = true;
              }
            },
            {
              type: 'default', // 按钮类型
              text: '删除明细', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log('删除明细');
                if (!this.tableConfig.selectData) {
                  this.$Message.warning('请选中一条单据！');
                  return false
                }
                const allDa = this.tableConfig.data;
                const selDa = this.tableConfig.selectData;
                this.tableConfig.data = this.$OMS2.omsUtils.getDifferentArr(
                  allDa,
                  selDa,
                  "PS_C_SKU_ECODE"
                );
                // this.totalNum();
                let deleteIds = this.$OMS2.omsUtils.sonList(selDa, 'ID')
                deleteIds = deleteIds.filter(id => id != '-1');
                R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ deleteIds })));
                const detail = this.tableConfig.data;
                R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail })));
                this.tableConfig.selectData = [];
                R3.store.commit('customize/REDUNDANT_ORDER_ID', 'zhoulan');
              }
            },
          ],
        }, // 按钮配置
        businessFormConfig: {}, // 表单配置
        columns: [], // 表头
        data: [], // 数据配置
        selectData: [],
        pageShow: true, // 控制分页是否显示
        loading: false,
        indexColumn: true, // 是否显示序号
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10 // 每页条数
      },
      btnConfigMo: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: "取消",
            btnclick: () => {
              this.tableConfig.modal = false;
            },
          },
          {
            text: '确定',
            type: 'primary',
            btnclick: () => {
              if (!this.addData.length) {
                this.$Message.warning('请选中一条单据！');
                return false
              } else {
                this.tableConfig.data = this.tableConfig.data.concat(this.addData);
                const detail = this.tableConfig.data;
                R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail })));
              }
              this.tableConfig.modal = false;
            },
          },
        ],
      },
      addData: [],
    };
  },
  computed: {
    ID() {
      return this.$route.params.itemId && this.$route.params.itemId != 'New' ? this.$route.params.itemId : '-1';
    },
    isEdit() {
      return R3.store.state.customize.REDUNDANT_ORDER_ID; // store.REDUNDANT_ORDER_ID 存的是物流单号
    }
  },
  watch: {
    isEdit(newVal) {
      setTimeout(() => {
        if (newVal == 'zhoulan') return
        if (newVal == 'clear') {
          this.initTable(1, 10, true, '-1'); // 清空明细
        } else {
          this.initTable(1, 10, newVal ? false : true, newVal ? newVal : '-1');
        }
      }, 10);
    }
  },
  created() { },
  destroyed() { },
  mounted() {
    this.$nextTick(async () => {
      const _this = this;
      const step1 = new Promise(async function (resolve, reject) {
        _this.tableConfig.loading = true;
        const subData = await _this.$OMS2.omsUtils.initSubtable('OC_B_COMPENSATE_ORDER_ITEM', _this.ID, '181120').catch(() => {
          _this.tableConfig.loading = false; _this.$Message.error('查询子表接口（/p/cs/objectTableItem）报错！')
          reject()
        });
        const columns = subData.columns.filter(it => it.key != 'ID');
        console.log('columns::', columns);
        _this.tableConfig.columns = columns;
        if (_this.ID != '-1') {
          _this.tableConfig.data = subData.rowData;
          const detail = _this.tableConfig.data
          _this.tableConfig.total = subData.otherData.totalRowCount;
          R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail })));
        } else {
          _this.renderHandle(['COMPENSATE_QTY', 'COMPENSATE_AMT']);
        }
        resolve();
      });
      step1.then(async () => {
        if (_this.ID != '-1') {
          // 详情-单据状态=0时，才展示新增/删除明细
          // 详情-单据状态=0时，商品明细才可编辑
          const fromdata = new FormData();
          fromdata.append('table', 'OC_B_COMPENSATE_ORDER');
          fromdata.append('objid', _this.ID);
          const {
            data: { code, data, message },
          } = await _this.service.common.getObject(fromdata).catch(e => {
            _this.tableConfig.loading = false;
            if (code != '-1') return _this.$Message.error('查询详情接口（/p/cs/getObject）报错！')
          })
          const status = data.addcolums[1].childs[3].valuedata;
          let storeOther = JSON.parse(JSON.stringify(R3.store.state.customize.COMPENSATE.other))
          storeOther.exCode = data.addcolums[1].childs[4].valuedata;
          R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ other: storeOther })));
          const buttonList = _this.tableConfig.businessButtonConfig.buttons;
          if (status == '0') {
            _this.renderHandle(['COMPENSATE_QTY', 'COMPENSATE_AMT']);
            _this.tableConfig.businessButtonConfig.buttons = buttonList;
          } else {
            _this.tableConfig.businessButtonConfig.buttons = [];
          }
        }
        _this.tableConfig.loading = false;
      });
    });
  },
  methods: {
    // 新增时带出明细
    async initTable(page = 1, pageSize = 10, isInit, oriId) {
      if (this.ID != '-1') return
      this.loading = true;
      if (isInit) {
        this.tableConfig.data = []
        this.tableConfig.total = 0;
      }
      // store上取不到刚刚通过defined自定义表单组件设置的值，好像没有触发框架去保存在store上
      const pageInfo = { pageNum: page, pageSize }
      let param = { ...pageInfo }
      param.expressCode = oriId ? oriId : R3.store.state.customize.COMPENSATE.other.expressCode || '';
      if (!param.expressCode) delete param.expressCode;
      param.mainId = this.ID;
      const { data: { code, data } } = await this.service.orderCenter.payQueryProList(param).catch(() => {
        this.loading = false;
      });
      if (this.ID == '-1') {
        data.data.map(it => it.ID = '-1')
      }
      this.tableConfig.data = param.expressCode != '-1' ? this.tableConfig.data.concat(data.data) : this.tableConfig.data.concat([]);
      this.tableConfig.total += param.expressCode != '-1' ? data.pageInfo.total : 0;
      R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
      this.loading = false;
    },
    renderHandle(arr) {
      let obj = {
        COMPENSATE_QTY: (h, params) => {
          // 赔付数量
          return h('InputNumber', {
            props: {
              value: Number(params.row.COMPENSATE_QTY || 0),
              regx: /^[1-9]\d*$/,
              max: Number(params.row.QTY || 0),
              min: 0,
              editable: true,
            },
            on: {
              'on-change': e => {
                /**
                 * 1.赔付数量：默认取“购买数量”（ QTY ），可编辑，仅支持录入大于0的正整数，且小于等于可退数（可退数由零售发货单计算得出）；
                    注：若主表未关联原订单，则赔付数量默认为0；
                 * 2.赔付金额：默认为 赔付数量*成交单价（ PRICE_ACTUAL ），可手动修改，但不能超过“赔付数量*成交单价”，保留两位小数；
                 */
                params.row.COMPENSATE_QTY = e;
                params.row.COMPENSATE_AMT = this.$OMS2.omsUtils.floatNumber(e * Number(params.row.PRICE_ACTUAL || 0), 2);
                this.tableConfig.data[params.index] = params.row;
                R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
              }
            }
          });

        },
        COMPENSATE_AMT: (h, params) => {
          const self = this;
          // 赔付金额
          return h('Input', {
            props: {
              value: params.row.COMPENSATE_AMT,
              autosize: true,
              regx: /^(\s*|([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
              // max: Number(this.$OMS2.omsUtils.floatNumber(params.row.COMPENSATE_QTY * params.row.PRICE_ACTUAL || 0, 2)),
              // min: 0,
              // step: 0.01,
              // formatter: value => `¥ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ','),
              // parser: value => value.replace(/$s?|(,*)/g, ''),
            },
            on: {
              'on-change': e => {
                // setTimeout(() => {
                // this.$nextTick(()=>{
                //   const ca = Number(e.target.value);
                //   // const ca = Number(e);
                //   const relCa = Number(params.row.COMPENSATE_QTY) * Number(params.row.PRICE_ACTUAL || 0);
                //   if (ca > relCa) {
                //     params.row.COMPENSATE_AMT = this.$OMS2.omsUtils.floatNumber(relCa, 2);
                //   } else {
                //     params.row.COMPENSATE_AMT = this.$OMS2.omsUtils.floatNumber(ca, 2);
                //   }
                //   this.tableConfig.data[params.index] = JSON.parse(JSON.stringify(params.row));
                //   R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
                // })
                // }, 300);
              },
              'on-blur': e => {
                this.$nextTick(() => {
                  console.log(e.target._value);
                  const ca = Number(e.target._value);
                  const relCa = Number(params.row.COMPENSATE_QTY) * Number(params.row.PRICE_ACTUAL);
                  if (self.isEdit && !['zhoulan', 'clear'].includes(self.isEdit)) {
                    // 关联了原单
                    if (ca > relCa) {
                      params.row.COMPENSATE_AMT = this.$OMS2.omsUtils.floatNumber(relCa, 2);
                    } else {
                      params.row.COMPENSATE_AMT = this.$OMS2.omsUtils.floatNumber(ca, 2);
                    }
                  } else {
                    params.row.COMPENSATE_AMT = this.$OMS2.omsUtils.floatNumber(ca, 2);
                  }
                  this.tableConfig.data[params.index] = params.row;
                  R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
                });
                // const ca = Number(params.row.COMPENSATE_AMT);
                // const relCa = this.$OMS2.omsUtils.floatNumber(Number(params.row.COMPENSATE_QTY) * Number(params.row.PRICE_ACTUAL), 2);
                // if (ca > relCa) {
                //   params.row.COMPENSATE_AMT = relCa;
                // } else {
                //   params.row.COMPENSATE_AMT = this.$OMS2.omsUtils.floatNumber(ca, 2);
                // }
                // this.tableConfig.data[params.index] = params.row;
                // R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
              },
            }
          });
        },
      }
      const columns = JSON.parse(JSON.stringify(this.tableConfig.columns));
      columns.forEach((k, i) => {
        arr.includes(k.key) && (columns[i].render = obj[k.key]);
      });
      this.tableConfig.columns = columns;
    },
    /* --------------------- 工具函数： --------------------- */
    detailAddDataHandel(data) {
      this.addData = data;
    },
    /* ------------------- 表格事件 part start ------------------- */
    pageChange(e) {
      this.tableConfig.pageIndex = e;
      this.initTable(e, this.tableConfig.pageSize)
    },
    pageSizeChange(s) {
      this.tableConfig.pageSize = s;
      this.initTable(this.tableConfig.pageIndex, s)
    },
    onSelectCancel(selection, row) {
      this.tableConfig.selectData = selection;
    },
    onSelect(selection, row) {
      this.tableConfig.selectData = selection;
    },
    onSelectAllCancel(x) {
      this.tableConfig.selectData = x;
    },
    onSelectAll(x) {
      this.tableConfig.selectData = x;
    },
    /* ------------------- 表格事件 part end ------------------- */
  },
};

</script>

<style lang="less" scoped>
.payDetail {
  /deep/ .button-combina .button-content {
    // justify-content: flex-end;
  }
}
</style>
