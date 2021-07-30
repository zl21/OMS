<!--
 * @Author: zhou.l
 * @Date: 2021-06-01 11:26:07
 * @LastEditTime: 2021-07-29 19:14:22
 * @LastEditors: Please set LastEditors
 * @Description: 赔付单-新增/编辑-商品明细
 * @FilePath: /burgeon-project-logic/js/pages/orderCenter/payDetail.vue
-->
<template>
  <div class="payDetail" v-loading="loading">
    <businessActionTable
      :key="key"
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
      <payDetailAdd
        @detailAddData="detailAddDataHandel"
        :subData="tableConfig.data"
      ></payDetailAdd>
    </Modal>
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable';
import payDetailAdd from './payDetailAdd.vue';

export default {
  // name: 'payDetail',
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
      key: 0,
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
                if (!this.tableConfig.selectData.length) {
                  this.$Message.warning('请选中一条单据！');
                  return false
                }
                const allDa = this.tableConfig.data;
                const selDa = this.tableConfig.selectData;
                this.tableConfig.data = $omsUtils.getDifferentArr(
                  allDa,
                  selDa,
                  "PS_C_SKU_ECODE"
                );
                // this.totalNum();
                this.tableConfig.total = this.tableConfig.data.length;
                let deleteIds = $omsUtils.sonList(selDa, 'ID')
                deleteIds = deleteIds.filter(id => id != '-1');
                R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ deleteIds })));
                const detail = this.tableConfig.data;
                R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail })));
                this.tableConfig.selectData = [];
              }
            },
          ],
        }, // 按钮配置
        businessFormConfig: {}, // 表单配置
        columns: [], // 表头
        data: [], // 数据配置
        // data: [{ "COMPENSATE_AMT": '0.00', "COMPENSATE_QTY": 0, "OC_B_ORDER_DELIVERY_ID": null, "OC_B_ORDER_ID": null, "PRICE": 23, "PRICE_ACTUAL": 23, "PS_C_PRO_ECODE": "0011", "PS_C_PRO_ENAME": "轩妈中秋大礼包", "PS_C_SKU_ECODE": "12343214432", "PS_C_SKU_ENAME": "12343214432", "PS_C_SPEC1_ENAME": null, "PS_C_SPEC2_ENAME": null, "PS_C_SPEC3_ENAME": null, "QTY": 0, "REAL_AMT": '0.00', "ID": "-1" }],
        selectData: [],
        pageShow: true, // 控制分页是否显示
        loading: false,
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10 // 每页条数
      },
      btnConfigMo: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.tableConfig.modal = false;
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            type: 'primary',
            btnclick: () => {
              const self = this;
              if (!this.addData.length) {
                this.$Message.warning('请选中一条单据！');
                return false
              } else {
                if (!this.exCode || this.exCode == '-1') {
                  // 未关联原单-展示0.00
                  this.addData.forEach(it => {
                    it.COMPENSATE_AMT = it.COMPENSATE_AMT === 0 ? '0.00' : it.COMPENSATE_AMT;
                    it.REAL_AMT = it.REAL_AMT === 0 ? '0.00' : it.REAL_AMT;
                    it.COMPENSATE_QTY = it.COMPENSATE_QTY === 0 ? 1 : it.COMPENSATE_QTY;
                  })
                }
                this.tableConfig.data = this.tableConfig.data.concat(this.addData);
                this.tableConfig.total += this.addData.length;
                const detail = this.tableConfig.data;
                R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail })));
              }
              setTimeout(() => {
                self.addData = [];
                self.tableConfig.modal = false;
              }, 100);
            },
          },
        ],
      },
      addData: [],
    };
  },
  computed: {
    exCode() {
      // clear时监听不到store上的值的变化（因为存的是对象），在store中调整修改对象值的方式
      return R3.store.state.customize.COMPENSATE.exCode
    },
    ID() {
      return this.$route.params.itemId && this.$route.params.itemId != 'New' ? this.$route.params.itemId : '-1';
    },
    isEdit() {
      // return R3.store.state.customize.REDUNDANT_ORDER_ID; // store.REDUNDANT_ORDER_ID 存的是物流单号
      return R3.store.state.customize.COMPENSATE.orderId
    }
  },
  watch: {
    /* isEdit(newVal) {
      setTimeout(() => {
        if (newVal == 'zhoulan') return
        if (newVal == 'clear') {
          this.initTable(1, 10, true, ''); // 清空明细
        } else {
          this.initTable(1, 10, newVal ? false : true, newVal ? newVal : '');
        }
      }, 10);
    } */
    exCode(newVal, oldVal) {
      setTimeout(() => {
        /* if (newVal == oldVal) {
          return
        } */
        this.initTable(1, 10, newVal ? false : true, newVal);
      }, 10);
    }
  },
  activated() {
    const data = R3.store.state.customize.COMPENSATE.detail;
    this.tableConfig.data = data;
  },
  created() { },
  destroyed() {
    this.initTable(1, 10, true, ''); // 清空明细
  },
  mounted() {
    this.getData();
    // 刷新
    window.addEventListener('customizeClick', e => {
      if (e.detail.type == 'refresh') {
        if (this.ID != '-1') {
          this.getData();
        } else {
          this.initTable(1, 10, 1, this.exCode)
        }
      }
    })
  },
  methods: {
    getData() {
      const _this = this;
      const step1 = new Promise(async function (resolve, reject) {
        // _this.tableConfig.loading = true;
        const subData = await _this.$OMS2.omsUtils.initSubtable('OC_B_COMPENSATE_ORDER_ITEM', _this.ID, '181120')
        console.log(subData);
        // subData.catch(() => {
        //   _this.tableConfig.loading = false;
        //   console.error('查询子表接口（/p/cs/objectTableItem）报错！');
        //   reject()
        // });
        const columns = subData.columns.filter(it => it.key != 'ID');
        console.log('columns::', columns);
        _this.tableConfig.columns = columns;
        if (_this.ID != '-1') {
          _this.tableConfig.data = subData.rowData;
          _this.key += 1;
          const detail = _this.tableConfig.data
          _this.tableConfig.total = subData.otherData.totalRowCount;
          R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail })));
        } else {
          _this.renderHandle(['COMPENSATE_QTY', 'COMPENSATE_AMT']);
        }
        resolve();
        _this.tableConfig.loading = false;
      });
      step1.then(async () => {
        if (_this.ID != '-1') {
          // 详情-单据状态=0（未客审）时，才展示新增/删除明细
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
          const status = data.addcolums[1].childs.find(i => i.colname == "ORDER_STATUS").valuedata;
          let storeOther = JSON.parse(JSON.stringify(R3.store.state.customize.COMPENSATE.other))
          storeOther.exCode = data.addcolums[1].childs.find(i => i.colname == "EXPRESS_CODE").valuedata;
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
    },
    /**
     * >> 仅新增页面会走，通过watch监听'物流单号'触发，仅用于新增时初始化原单带出的明细
     * 入参说明：
     * 1. 新增时根据原单带出明细（页面新增 且 有原单）
        expressCode: "9998975701" // 没有就传'-1'(clear的情况)
        mainId: "-1"
        pageNum: 1
        pageSize: 10
     * 2. 新增页面初始化表头没走这个：在mounted里走的框架标准子表接口
     */
    async initTable(page = 1, pageSize = 10, isInit, oriId) {
      console.log('payDetailAdd::initTable::');
      if (this.ID != '-1') return
      this.loading = true;
      if (isInit) {
        this.tableConfig.data = []
        this.tableConfig.total = 0;
      }
      // store上取不到刚刚通过defined自定义表单组件设置的值，好像没有触发框架去保存在store上
      const pageInfo = { pageNum: page, pageSize }
      let param = { ...pageInfo }
      param.expressCode = oriId ? oriId : R3.store.state.customize.COMPENSATE.exCode || '-1';
      param.mainId = this.ID;
      const { data: { code, data } } = await this.service.orderCenter.payQueryProList(param).catch(() => {
        this.loading = false;
      });
      if (this.ID == '-1') {
        data.data.map(it => it.ID = '-1')
      }
      // this.tableConfig.data = param.expressCode != '-1' ? this.tableConfig.data.concat(data.data) : this.tableConfig.data.concat([]);
      this.tableConfig.data = data.data;
      this.tableConfig.total = data.pageInfo.total;
      R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
      this.loading = false;
    },
    renderHandle(arr) {
      let obj = {
        COMPENSATE_QTY: (h, params) => {
          const self = this;
          // 赔付数量
          return h('InputNumber', {
            props: {
              value: Number(params.row.COMPENSATE_QTY || 1),
              // regx: /^[1-9]\d*$/, // 此组件正则不管用
              max: self.exCode ? Number(params.row.QTY || 0) : Infinity,
              // min: (self.isEdit && !['zhoulan', 'clear'].includes(self.isEdit)) ? 1 : 0, // 关联了原单最小1，反之最小0
              min: 1,
              editable: true,
              formatter: value => `${value}`.replace(/\./g, ''),
              parser: value => value.replace(/\./g, ''),
            },
            on: {
              'on-change': e => {
                /**
                 * 1.赔付数量：默认取“购买数量”（ QTY ），可编辑，仅支持录入大于0的正整数，且小于等于可退数（可退数由零售发货单计算得出）；
                    注：若主表未关联原订单，则赔付数量默认为0；
                 * 2.赔付金额：默认为 赔付数量*成交单价（ PRICE_ACTUAL ），可手动修改，但不能超过“赔付数量*成交单价”，保留两位小数；
                 */
                // params.row.COMPENSATE_QTY = null;
                params.row.COMPENSATE_QTY = e;
                if (e) {
                  params.row.COMPENSATE_AMT = $omsUtils.floatNumber(e * Number(params.row.PRICE_ACTUAL || 0), 2);
                  this.tableConfig.data[params.index] = params.row;
                  R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
                }
                // params.row._rowKey = $omsUtils.generateKey(); // 写上就删不掉输入框里面的0
              },
              'on-blur': e => {
                const cq = params.row.COMPENSATE_QTY;
                if (!cq && cq !== 0) {
                  // params.row.COMPENSATE_QTY = (self.isEdit && !['zhoulan', 'clear'].includes(self.isEdit)) ? 1 : 0;
                  params.row.COMPENSATE_QTY = 1;
                  params.row.COMPENSATE_AMT = $omsUtils.floatNumber(params.row.COMPENSATE_QTY * Number(params.row.PRICE_ACTUAL || 0), 2);
                  params.row._rowKey = $omsUtils.generateKey();
                  this.tableConfig.data[params.index] = params.row;
                  R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
                }
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
              regx: /^\d*\.{0,1}\d{0,2}$/,
            },
            on: {
              'on-change': e => {
                // setTimeout(() => {
                // this.$nextTick(()=>{
                //   const ca = Number(e.target.value);
                //   // const ca = Number(e);
                //   const relCa = Number(params.row.COMPENSATE_QTY) * Number(params.row.PRICE_ACTUAL || 0);
                //   if (ca > relCa) {
                //     params.row.COMPENSATE_AMT = $omsUtils.floatNumber(relCa, 2);
                //   } else {
                //     params.row.COMPENSATE_AMT = $omsUtils.floatNumber(ca, 2);
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
                  params.row.COMPENSATE_AMT = $omsUtils.floatNumber(ca, 2);
                  if (self.exCode) {
                    if (ca > relCa) {
                      params.row.COMPENSATE_AMT = $omsUtils.floatNumber(relCa, 2);
                    }
                  }
                  params.row._rowKey = $omsUtils.generateKey();
                  this.tableConfig.data[params.index] = params.row;
                  R3.store.commit('customize/COMPENSATE', JSON.parse(JSON.stringify({ detail: this.tableConfig.data })));
                });
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
      data.map(it => it.ID = '-1')
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
