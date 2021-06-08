<!--
 * @Author:xx
 * @Date: 2021-05-22 15:24:50
 * @LastEditTime: 2021-05-26 18:39:32
 * @LastEditors: Please set LastEditors
 * @Description: 退换货订单-退货单明细
 * @FilePath: /front-standard-product/src/views/pages/orderCenter/returnOrder/returnGoods.vue
-->
<template>
  <div v-loading="loading">
    <!-- 退货明细 -->
    <business-action-table :jordan-table-config="businessActionTable" @on-select="returnOnSelect" @on-select-cancel="returnCancel" @on-select-all="returnSelectAll" @on-select-all-cancel="returnSelectAllCancel" />
    <!-- 添加明细弹框 -->
    <Modal v-model="returnDetailAddTable.modal" width="900" titleAlign="left" :title="`添加商品-已选（${returnDetailAddTable.table.selectLength}）`" :mask="true" @on-ok="resetReturnMainTable" @on-cancel="detailAddCancel">
      <businessActionTable :jordan-table-config="tableConfig" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" />
    </Modal>
    <!-- 替换/添加明细 -->
    <Modal v-model="replaceProductTableModal" width="900" title="替换明细" :mask="true" @on-ok="replaceOk">
      <businessActionTable :jordan-table-config="replaceProductTable" @on-row-click="replaceOnSelect" />
    </Modal>
  </div>
</template>

<script>
import businessActionTable from 'professionalComponents/businessActionTable';
import { addDetailModalTableColumns } from './returnConfig.js';

export default {
  name: 'retunGoods',
  components: {
    businessActionTable
  },
  props: {
    mainData: {},
    returnProduct:'',
  },
  data() {
    return {
      loading: false,
      renderColumn:[], //存放render过后的
      detailsArrData:[], // 
      indexL: [], // 一并选中待选索引集
      haveGift: '', // 挂靠赠品-商品编码
      haveGroup: '', // 组合/福袋下挂的其他关联商品-商品编码      
      businessActionTable: {
        businessFormConfig: {}, // 表单配置
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'left', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: 'primary',
              text: '新增明细', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log(this.mainData);
                if (this.$route.params.customizedModuleId === 'New' && !this.mainData.SOURCE_CODE) {
                  this.$Message.warning('原平台单号不能为空！');
                  return
                }
                this.returnDetailAddTable.modal = true;
                setTimeout(() => {
                  this.getDetailModal();
                }, 10);
              } // 按钮点击事件
            },
            {
              type: 'primary', // 按钮类型
              text: '替换明细', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log(R3.store);
                this.replaceProductTableModal = true;
              } // 按钮点击事件
            },
            {
              type: 'warning', // 按钮类型
              text: '删除明细', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log(e,this.detailsArrData.length);
                this.deleteMainTableData();
              } // 按钮点击事件
            }
          ]
        }, // 按钮配置
        columns: [],
        data: [
          /* {
            PS_C_SKU_ECODE:'1010',
            PS_C_PRO_ECODE: '1111',
            QTY_REFUND:1,
            AMT_REFUND_SINGLE:10,
            REFUND_FEE:10,
          }, */
        ], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      }, // 退货明细配置
      replaceProductTableModal:false,
      returnDetailAddTable: {
        modal: false,
        pageShow: true, // 控制分页是否显示
        table: {
          selectLength: 0
        },
        value: ''
      }, // 弹框配置
      tableConfig: {
        businessFormConfig: {}, // 表单配置
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
      }, // 弹框 - 添加明细
      replaceProductTable:{
        businessButtonConfig: {
          typeAll: 'default', // 按钮统一风格样式
          btnsite: 'right', // 按钮位置 (right , center , left)
          buttons: [
            {
              type: 'primary', // 按钮类型
              text: '搜索', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log('搜索');
              } // 按钮点击事件
            }
          ]
        }, // 按钮配置
        businessFormConfig: {
          formValue: {
            SKU_CODE: '',
            SPU_CODE: '',
            SPU_NAE: '',
          },
          formData: [
            {
              label: 'SKU编码',
              style: 'dimSearch',
              width: '8',
              value: 'SKU_CODE',
              columns: ['value'],
              AuotData: [], //匹配的选项
              dimChange: (search) => {
                //模糊查询的方法
                // this.fuzzyquerybyak(search)
              },
              dimEnter: (val) => {},
              dimSelect: (obj) => {},
              dimblur: () => {},
            },
            {
              label: 'SPU编码',
              style: 'dimSearch',
              width: '8',
              value: 'SPU_CODE',
              columns: ['ECODE'],
              AuotData: [], //匹配的选项
              dimChange: (search) => {},
              dimEnter: (val) => {},
              dimSelect: (obj) => {},
              dimblur: () => {},
            },
            {
              style: 'dimSearch', //输入框类型
              label: 'SPU名称', //输入框前文字
              value: 'SPU_NAE', //输入框的值
              columns: ['ENAME'],
              width: '8',
              AuotData: [], //匹配的选项
              dimChange: (search) => {},
              dimEnter: (val) => {},
              dimSelect: (obj) => {},
              dimblur: () => {},
            }
          ],
        }, // 表单配置
        selectLength: 0,
        columns: [], // 表头
        data: [], // 数据配置
        selectData:[],
        pageShow: false, // 控制分页是否显示
        loading: false,
        indexColumn: true, // 是否显示序号
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      },// 弹框 - 添加/替换商品
    };
  },
  watch:{
    returnProduct:{
      async handler(newData){
        let tableName; // 接口表名
        let renderKeys = []; // render key
        // 判断新增页面是退货还是换货
        if (newData === '1') {
          console.log('退货单');
          tableName = 'OC_B_RETURN_ORDER_REFUND_ITEM';
          renderKeys = ['REFUND_ID', 'QTY_REFUND']
          this.businessActionTable.businessButtonConfig.buttons[0].isShow = true;
          this.businessActionTable.businessButtonConfig.buttons[1].isShow = false;
          this.businessActionTable.businessButtonConfig.buttons[2].isShow = true;
        }else if (newData === '2'){
          console.log('退换货单');
          tableName = 'OC_B_RETURN_ORDER_EXCHANGE';
          renderKeys = ['REFUND_ID', 'QTY_REFUND']
          this.businessActionTable.businessButtonConfig.buttons[0].isShow = false;
          this.businessActionTable.businessButtonConfig.buttons[1].isShow = true;
          this.businessActionTable.businessButtonConfig.buttons[1].text = '新增明细';
          this.businessActionTable.businessButtonConfig.buttons[2].isShow = true;
        }
        await this.getColumns(tableName);
        await this.renderHandle(renderKeys);
      },
      immediate: true
    }
  },
  async created() { },
  async activated(){
    //编辑页面 换货/退货逻辑
    if(this.$route.params.customizedModuleId !== 'New'){
      let tableName;
      let BtnConfig = this.businessActionTable.businessButtonConfig.buttons

      if (this.$parent.$parent.panelRef === '换货明细') {
        BtnConfig[0].isShow = false;
        BtnConfig[1].isShow = true;
        BtnConfig[2].isShow = false;
        tableName = 'OC_B_RETURN_ORDER_EXCHANGE';
      } else if(this.$parent.$parent.panelRef === '退货明细'){
        if(this.$route.query.RETURN_SOURCE === '平台'){
          BtnConfig[0].isShow = false;
          BtnConfig[1].isShow = false;
        }
        BtnConfig[0].isShow = true;
        BtnConfig[1].isShow = false;
        BtnConfig[2].isShow = true;
        tableName = 'OC_B_RETURN_ORDER_REFUND_ITEM';
      }
      await this.getColumns(tableName);
      await this.getSubTableData(tableName);
      this.renderHandle(['REFUND_ID', 'QTY_REFUND']);
    }
  },
  async mounted() {
  },
  methods: {
    // 获取表头
    async getColumns(tableName) {
      try {
        // 
        const { data: { data } } = await this.service.orderCenter.initObject({ "TABLE": tableName });
        let arr = [];
        data.DATA.forEach(element => {
          arr.push({ title: `${element.headerName}`, key: `${element.field}` });
        });
        this.renderColumn = arr;
        this.tableConfig.columns = arr;
        this.replaceProductTable.columns = arr;
      } catch (error) {
        new Error(error)
      }
    },
    // 获取数据
    async getSubTableData(tableName) {
      this.loading = true;
      this.tableConfig.data = [];
      this.tableConfig.pageShow = false;
      let params = {
        ID: 3, 
        TABLE: 'OC_B_RETURN_ORDER_VIRTUAL_TABLE',
        SUB_TABLE:tableName
      };
      try {
        const { data: { data } } = await this.service.orderCenter.queryObject(params);
        this.loading = false;
        this.tableConfig.data = arr;
        this.replaceProductTable.data = arr;
      } catch (error) {
        this.loading = false;
        new Error(error)
      }
        
    },
    async getDetailModal() {
      const param = {
        SOURCE_CODE: this.mainData.SOURCE_CODE,
      };
      this.loading = true;
      const {
        data: { code, data },
      } = await this.service.orderCenter.getReturnItemBySourceCode(param).catch(() => {
        this.loading = false;
      });
      if (data) {
        this.tableConfig.columns = data.TABTH;
      }
      if (code == 0) {
        // data.OC_B_RETURN_ORDER_REFUND_ITEMS.map(it=>it._checked = true)
        this.tableConfig.data = data.OC_B_RETURN_ORDER_REFUND_ITEMS;
      }
      this.loading = false;
    },
    // 保存 
    async save(){
      console.log();
      const param = {
        OC_B_ORDER_ITEMS: this.OC_B_ORDER_ITEMS,
      };
      console.log("param::", param);
      // return false
      this.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.returnSaveBill(param).catch(() => {
        this.loading = false;
      });
    },

    /* --------------------- 工具函数/列表表格方法： --------------------- */
    // 
    renderHandle(arr){
      // key对应的render方法
      let obj = {
        REFUND_ID: (h, params) => {
          return h('Input', {
            props: {
              value: params.row.REFUND_ID,
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
        QTY_REFUND: (h, params) => {
          return h('Input', {
            props: {
              value: params.row.QTY_REFUND,
              autosize: true,
              regx: /^\d*\.{0,1}\d{0,4}$/
            },
            on: {
              'on-change': e => {
                console.log(e.target.value);
                let CurrentQTY = e.target.value;
                params.row.REFUND_FEE = Number(CurrentQTY) * params.row.AMT_REFUND_SINGLE;

              }
            }
          });
        },// 退货数量
      }
      // 查找对应的key添加render
      this.renderColumn.forEach((k, i) => arr.includes(k.key) && (this.renderColumn[i].render = obj[k.key]));
      // 赋值
      this.businessActionTable.columns = this.renderColumn;
    },
    // 生成'合计'行
    totalNum() {
      const self = this;
      let amt = 0;
      let qty = 0;
      self.jordanTableConfig.totalData = [];
      self.jordanTableConfig.data.forEach((item) => {
        qty += parseInt(item.QTY || 0);
        amt = _.add(parseFloat(item.REAL_AMT || 0).toFixed(2), amt);
      });
      setTimeout(() => {
        self.jordanTableConfig.totalData.push({
          selection: `${$i18n.t("other.total")}:`, // 合计
          REAL_AMT: _.ceil(amt, 2), // 精确到两位小数
          QTY: qty,
        });
      }, 10);
    },
    // 退-新增明细弹窗-插入列表格的过滤处理-累加/直接push
    insertOrderDetail(dataArr = []) {
      const self = this;
      const data = dataArr;
      const allDa = self.jordanTableConfig.data;
      data.length && data.map((it) => (it.pryKey = it.OOID || "" + "_" + it.PS_C_SKU_ECODE));
      allDa.length && allDa.map((it) => (it.pryKey = it.OOID || "" + "_" + it.PS_C_SKU_ECODE));
      let pryKeyArr = [];
      if (!allDa.length) {
        // 当前为空，则直接新增
        self.jordanTableConfig.data = data;
        self.totalNum();
        return;
      }
      data.forEach((it) => {
        it.pryKey && (it.pryKey = it.OOID || "" + "_" + it.PS_C_SKU_ECODE);
        allDa.forEach((item) => {
          !item.pryKey && (item.pryKey = item.OOID || "" + "_" + item.PS_C_SKU_ECODE);
          pryKeyArr = this.$OMS2.omsUtils.sonList(allDa, "pryKey");
          if (!it.OOID && item.pryKey == it.pryKey) {
            // 1.非复制的且已存在该条明细(已经存在的明细都是刚刚新增的，不是复制带出来的，且，即将新增的是已经存在的，累加)
            item.QTY += it.QTY;
            item.REAL_AMT = _.ceil(_.add(item.REAL_AMT, it.REAL_AMT), 2);
          } else if (!it.OOID && !pryKeyArr.includes(it.pryKey)) {
            // 2.非复制的且不存在该条明细
            self.jordanTableConfig.data.push(it);
            // self.jordanTableConfig.addData.push(it);
          } else if (it.OOID) {
            // 3.复制的
            self.jordanTableConfig.data.push(it);
            // self.jordanTableConfig.addData.push(it);
          } else {
            console.log("other!");
          }
        });
      });
      // self.jordanTableConfig.total = res.data.data.total;
      self.totalNum();
    },
    /* -------------------- 退/换货明细 - 列表表格事件 -------------------- */
    // 退货明细 - 列表勾选
    returnOnSelect(row) {
      this.detailsArrData = row;
    },
    // 退货明细 - 取消勾选
    returnCancel(row) {
      this.detailsArrData = row;
    },
    // 退货明细 - 列表全选
    returnSelectAll(row) {
      this.detailsArrData = row;
    },
    // 退货明细 - 取消全选
    returnSelectAllCancel(row) {
      console.log(row);
    },
    // 删除明细 - 本地删
    deleteMainTableData() {
      /* 可能要判断是哪个明细的 */
      const self = this;
      const allDa = self.businessActionTable.data;
      const selDa = self.detailsArrData;
      if (!selDa.length) {
        this.$OMS2.omsUtils.msgTips(self, "warning", "a8");
        return;
      }
      // 取差集展示：
      self.businessActionTable.data = this.$OMS2.omsUtils.getDifferentArr(
        allDa,
        selDa,
        "PS_C_SKU_ECODE"
      );
      self.detailsArrData = [];
      this.$emit('subTableData',self.businessActionTable.data);
    },
    /* -------------------- 退-添加明细 - 弹框 -------------------- */
    // 添加明细 - 确定
    resetReturnMainTable() {
      console.log('添加明细 - 确定');
      this.businessActionTable.data = this.tableConfig.selectData;
      this.$emit('subTableData',this.businessActionTable.data);
     },
    // 添加明细 - 取消
    detailAddCancel() {
      console.log('添加明细 - 取消');
     },
    // 添加明细 - 取消选中
    onSelectCancel(x) {
      const self = this;
      self.tableConfig.selectData = x;
    },
    // 添加明细 - 选中
    onSelect(x) {
      const self = this;
      self.tableConfig.selectData = x; // push
      this.selectTogether(x[x.length-1]);
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
    /* -------------------- 添加/替换明细 - 弹框 -------------------- */
    // 加/替换明细 - 选中 
    replaceOnSelect(row){
      console.log(row);
      this.replaceProductTable.selectData = row;
    },
    // 加/替换明细 - 确定 
    replaceOk(){
      let self = this;
      let tableData = this.businessActionTable.data; 
      let selectData = this.replaceProductTable.selectData; //新的对象
      let arr = ['QTY_REFUND','REFUND_FEE'] //不需要替换的key
      tableData.forEach((item,index) => {
        // 相同的sku替换
        if(item.PS_C_SKU_ECODE === selectData.PS_C_SKU_ECODE){
          // 对象的改变不会更新dom 使用$set
          Object.keys(item).forEach(key => { if(!arr.includes(key)) self.$set(tableData[index],key,selectData[key])});
        }
      })
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
      // if (pT == 0) { // 普通
        // 筛选出gR值相等的一并选中，挂靠赠品
        gR && this.screen({ 'GIFT_RELATION': gR })
        // 筛选出gM值相等的一并选中，下挂组合
        gM && this.screen({ 'GROUP_GOODS_MARK': gM })
        // 普通品的非下卦赠品一并选中，其它赠品
        this.screen()
      // }
      // 选中操作（去重，设置checked=true）
      this.indexL = [...new Set(this.indexL)];
      const allDa = JSON.parse(JSON.stringify(this.tableConfig.data));
      allDa.forEach((it, index) => {
       // 首先记录当前选中行的index
       if (it.REAL_AMT == row.REAL_AMT) { // 暂时的唯一标识
         this.indexL.push(index);
       }
        it._checked = this.indexL.includes(index);
      })
      this.tableConfig.data = allDa;
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
          if (gT != '0' && !gM && !gR) { // 系统/平台赠品（是赠品&不存在挂靠关系&不存在组合关系）
            this.indexL.push(index);
          }
        }
      });
    },

  }
};
</script>

<style lang="less" scoped>
  .unFlodStyle{
    margin-right: 0;
  }
</style>
