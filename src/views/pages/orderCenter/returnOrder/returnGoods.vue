<!--
 * @Author:xx
 * @Date: 2021-05-22 15:24:50
 * @LastEditTime: 2021-08-10 10:10:50
 * @LastEditors: Please set LastEditors
 * @Description: 退换货订单-退货单明细
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/returnGoods.vue
-->
<template>
  <div v-loading="loading">
    <!-- 退货明细 -->
    <OmsTable :jordan-table-config="omsTableConfig" @on-select="returnOnSelect" @table-delete-detail="returnDeleteDetail" @table-add-detail="returnAddDetail" @on-select-cancel="returnCancel" @on-select-all="returnSelectAll" @on-select-all-cancel="returnSelectAllCancel" />
    <!-- 添加明细弹框 -->
    <Modal v-model="returnDetailAddTable.modal" width="900" titleAlign="left" :title="`添加商品-已选（${returnDetailAddTable.table.selectLength}）`" :mask="true" @on-ok="resetReturnMainTable" @on-cancel="detailAddCancel">
      <OmsTable :jordan-table-config="tableConfig" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" />
    </Modal>
  </div>
</template>

<script>
import { addDetailModalTableColumns } from './returnConfig.js';
import { OmsTable } from 'burgeonComponents'

export default {
  name: 'retunGoods',
  components: {
    OmsTable
  },
  props: {
    mainData: {}
  },
  data() {
    return {
      loading: false,
      indexL: [], // 一并选中待选索引集
      haveGift: '', // 挂靠赠品-商品编码
      haveGroup: '', // 组合/福袋下挂的其他关联商品-商品编码
      omsTableConfig: {
        // businessFormConfig: {}, // 表单配置
        columns: [
          {
            key: 'PS_C_PRO_ECODE',
            title: '平台退款单号'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '零售发货单单号'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: $i18n.t('table_label.productNo') // 商品编码
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '商品名称'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: 'SKU编码'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: 'SKU名称'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '赠品标记'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '规格1'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '规格2'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '规格3'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '购买数量'
          },
          {
            key: 'PRICE_ACTUAL',
            title: '成交单价'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '成交金额'
          },
          {
            key: 'PS_C_PRO_ECODE1',
            title: '可退数量'
          },
          {
            key: 'QTY_CAN_REFUND',
            title: '可退数量',
            colname: 'QTY_CAN_REFUND'
          },
          {
            key: 'PS_C_CLR_ENAME',
            title: '申请退货数量'
          },
          {
            key: 'PS_C_SIZE_ENAME',
            title: '退货单价'
          },
          {
            key: 'PS_C_SIZE_ENAME',
            title: '退货金额'
          }
        ],
        data: [
          {
            PS_C_PRO_ECODE: '1111'
          }
        ], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: true, // 控制是否显示删除明细
        isShowAddDetailBtn: true,
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      }, // 退货明细配置
      returnDetailAddTable: {
        modal: false,
        pageShow: true, // 控制分页是否显示
        table: {
          selectLength: 0
        },
        value: ''
      }, // 弹框配置
      tableConfig: {
        // businessFormConfig: {}, // 表单配置
        selectLength: 0,
        columns: addDetailModalTableColumns, // 表头
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      } // 弹框 - 添加明细
    };
  },
  created() {
    let columns = this.omsTableConfig.columns;
    // 需要添加render的key
    let arr = ['PS_C_PRO_ECODE', 'QTY_CAN_REFUND', 'PRICE_ACTUAL'];
    // key对应的render方法
    let obj = {
      PS_C_PRO_ECODE: (h, params) => {
        return h('Input', {
          props: {
            value: params.row.PS_C_PRO_ECODE,
            autosize: true,
            regx: /^\d*\.{0,1}\d{0,4}$/
          },
          on: {
            'on-change': e => {
              console.log(e.target.value);
            }
          }
        });
      }, // 平台订单
      QTY_CAN_REFUND: (h, params) => {
        return h('Input', {
          props: {
            value: params.row.QTY_CAN_REFUND,
            autosize: true,
            regx: /^\d*\.{0,1}\d{0,4}$/
          },
          on: {
            'on-change': e => {
              console.log(e.target.value);
            }
          }
        });
      },// 退货数量
      PRICE_ACTUAL: (h, params) => {
        return h('Input', {
          props: {
            value: params.row.PRICE_ACTUAL,
            autosize: true,
            regx: /^\d*\.{0,1}\d{0,4}$/
          },
          on: {
            'on-change': e => {
              console.log(e.target.value);
            }
          }
        });
      },// 成交单价
    }
    // 查找对应的key添加render
    columns.forEach((k, i) => arr.includes(k.key) && (columns[i].render = obj[k.key]))
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    async getDetailModal() {
      const param = {
        SOURCE_CODE: this.mainData.SOURCE_CODE,
      };
      this.loading = true;
      const {
        data: { code, data, message },
      } = await this.service.orderCenter.getReturnItemBySourceCode(param).catch(() => {
        this.loading = false;
      });
      if (data) {
        this.tableConfig.columns = data.TABTH;
      }
      if (code == 0) {
        this.tableConfig.data = data.OC_B_RETURN_ORDER_REFUND_ITEMS;
      }
      this.loading = false;
    },

    async getDetail() {
      const formdata = new FormData();
      const sea = {
        column_include_uicontroller: true,
        range: 10,
        fixedcolumns: {},
        startindex: 0
      }
      formdata.append("objid", '-1');
      formdata.append("table", 'OC_B_RETURN_ORDER_REFUND_ITEM');
      formdata.append("searchdata", JSON.stringify(sea));
      formdata.append("refcolid", '180349');
      const {
        data: { code, data, message },
      } = await this.service.orderCenter.objectTableItem(formdata).catch(() => {
        this.$Message.warning('p/cs/objectTableItem catch !')
      });
      if (code === 0) {
        const thead = data.tabth
          .filter((element) => {
            if (element.colname === "ID") return false;
            return true;
          })
          .map((element) => {
            const obj = {
              key: element.colname,
              title: element.name,
            };
            return obj;
          });
        this.omsTableConfig.columns = thead;
      }
    },
    /* -------------------- 退货明细 -------------------- */
    // 退货明细 - 列表勾选
    returnOnSelect(row) {
      console.log(row);
    },
    // 退货明细 - 取消勾选
    returnCancel(row) {
      console.log(row);
    },
    // 退货明细 - 列表全选
    returnSelectAll(row) {
      console.log(row);
    },
    // 退货明细 - 取消全选
    returnSelectAllCancel(row) {
      console.log(row);
    },
    // 退货明细 - 添加明细按钮
    returnAddDetail() {
      if (!this.mainData.SOURCE_CODE) {
        // this.$Message.warning('原平台单号不能为空！');
        this.$Message.warning($i18n.t('modalTips.ho'));
        return
      }
      this.returnDetailAddTable.modal = true;
      setTimeout(() => {
        this.getDetailModal();
      }, 10);
    },
    // 退货明细 - 退货删除明细
    returnDeleteDetail() {
      console.log('退货删除明细');
      this.$Message.warning('请选择退货明细！');
    },
    /* -------------------- 添加明细 - 弹框 -------------------- */
    // 添加明细 - 确定
    resetReturnMainTable() { },
    // 添加明细 - 取消
    detailAddCancel() { },
    // 添加明细 - 取消选中
    onSelectCancel(x) {
      const self = this;
      self.tableConfig.selectData = x;
    },
    // 添加明细 - 选中
    onSelect(x) {
      const self = this;
      self.tableConfig.selectData = x;
      this.selectTogether(x[0]);
    },
    // 添加明细 - 取消全部选中
    onSelectAllCancel(x) {
      const self = this;
      self.tableConfig.selectData = x;
    },
    // 添加明细 - 全部选中
    onSelectAll(x) {
      const self = this;
      self.tableConfig.selectData = x;
    },

    /* -------------------- 业务逻辑处理 -------------------- */
    /**
     * 1.PRD：
     *    非赠品商品选中后，如果挂靠赠品还有可退数量一并选中
     *    如果整单的非挂靠赠品（系统/平台）还有可退数量也一并选中
     *    如果当前选中的商品为组合/福袋中的下挂明细，则对应的其他下卦明细也一并选中
     * 2.系统/平台赠品：gift-type、group-mark俩都为空 且giftType != 0
     * 3.PRO_TYPE：0普通，other组合/福袋
     * 4.GIFT_RELATION：挂靠关系
     * 5.GROUP_GOODS_MARK：组合关系
     * 6.GIFT_TYPE：0非赠品，other赠品
     */
    selectTogether(row) {
      const pT = row.PRO_TYPE; // number
      const gR = row.GIFT_RELATION;
      const gM = row.GROUP_GOODS_MARK;
      const gT = row.GIFT_TYPE; // string
      if (pT == 0) { // 普通
        // 筛选出gR值相等的一并选中，挂靠赠品
        gR && this.screen({ 'GIFT_RELATION': gR })
        // 筛选出gM值相等的一并选中，下挂组合
        gM && this.screen({ 'GROUP_GOODS_MARK': gM })
        // 普通品的非下卦赠品一并选中，其它赠品
        this.screen()
      } else { // 其它

      }
      // 选中操作（去重，设置checked=true）
      this.indexL = [...new Set(this.indexL)];
      this.tableConfig.data.forEach((it, index) => {
        if (this.indexL.includes(index)) {
          it._checked = true;
        }
      })
    },
    screen(o = {}) {
      const allDa = JSON.parse(JSON.stringify(this.tableConfig.data));
      const obj = o;
      const objL = Object.entries(obj).flat(2);
      allDa.forEach((it, index) => {
        if (objL.length && it[objL[0]] == obj[objL[0]]) {
          switch (objL[0]) {
            case 'GIFT_RELATION':
              this.haveGift += `${it.PS_C_SKU_ECODE},`;
              // “请确认是否删除当前选中的退货商品，还存在关联的挂靠赠品：XXXXXX？”
              break;
            case 'GROUP_GOODS_MARK':
              this.haveGroup += `${it.PS_C_SKU_ECODE},`;
              // “请确认是否删除当前选中的退货商品，还存在组合/福袋下挂的其他关联商品：XXXXXX？”
              break;
          }
          this.indexL.push(index);
        } else {
          const gR = it.GIFT_RELATION;
          const gM = it.GROUP_GOODS_MARK;
          const gT = it.GIFT_TYPE;
          if (!gT && !gM && !gR) { // 系统/平台赠品（是赠品&不存在挂靠关系&不存在组合关系）
            this.indexL.push(index);
          }
        }
      });
    },

  }
};
</script>

<style lang="less" scoped>
</style>
