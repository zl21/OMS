<!--
 * @Author: zhou.l
 * @Date: 2021-06-01 11:26:07
 * @LastEditTime: 2021-08-10 16:39:47
 * @LastEditors: Please set LastEditors
 * @Description: 赔付单-新增/编辑-新增明细-按钮
-->
<template>
  <div class="payDetailAdd" v-loading="loading" style="width: 800px">
    <OmsTable
      :jordan-table-config="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <!-- <div class="buttons customized-modal-btn">
      <businessButton :btn-config="btnConfigMo" />
    </div> -->
  </div>
</template>

<script>
import businessButton from 'burgeonComponents/businessButton';
import { OmsTable } from 'burgeonComponents'

export default {
  name: 'payDetailAdd',
  components: {
    businessButton,
    OmsTable,
  },
  props: {
    subData: {
      type: [Array, Object],
      default: () => { }
    },
  },
  computed: {
    ID() {
      return this.$route.params.itemId && this.$route.params.itemId != 'New' ? this.$route.params.itemId : '-1';
    },
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
          btnsite: "right",
          buttons: [
            {
              type: 'primary', // 按钮类型
              text: '搜索', // 按钮文本
              isShow: true,
              btnclick: (e) => {
                console.log('搜索');
                this.initTable(1, this.tableConfig.pageSize);
              } // 按钮点击事件
            },
          ],
        }, // 按钮配置
        businessFormConfig: {
          formValue: {
            skuEcode: '',
            skuEname: '',
            spuEcode: '',
          },
          formData: [
            {
              label: 'SKU编码',
              style: 'dimSearch',
              width: '8',
              value: 'skuEcode',
              columns: ['value'],
              AuotData: [], //匹配的选项
              dimChange: (search) => { },
              dimEnter: (val) => { },
              dimSelect: (obj) => { },
              dimblur: () => { },
            },
            {
              label: $i18n.t('form_label.skuName'), // SKU名称
              style: 'dimSearch',
              width: '8',
              value: 'skuEname',
              columns: ['ENAME'],
              AuotData: [], //匹配的选项
              dimChange: (search) => {
                console.log('dimChange::');
                this.fuzzyquerybyak(search, 171332)
                this.tableConfig.businessFormConfig.formValue.skuFlag = '';
              },
              dimEnter: (val) => { },
              dimSelect: (obj) => {
                console.log('dimSelect::');
                this.tableConfig.businessFormConfig.formValue.skuEname = obj.label || ''
                this.tableConfig.businessFormConfig.formValue.skuFlag = obj.value || 1
              },
              dimblur: () => {
                console.log('dimblur::');
                // 走了dimSelect就会走dimChange，所以暂时控制不了失焦
                const selFlag = this.tableConfig.businessFormConfig.formValue.skuFlag;
                if (selFlag) return
                // this.tableConfig.businessFormConfig.formValue.skuEname = ''
              },
            },
            {
              style: 'dimSearch', //输入框类型
              label: $i18n.t('table_label.itemNo01'), // SPU编码 输入框前文字
              value: 'spuEcode', //输入框的值
              columns: ['ENAME'],
              width: '8',
              AuotData: [], //匹配的选项
              dimChange: (search) => { },
              dimEnter: (val) => { },
              dimSelect: (obj) => { },
              dimblur: () => { },
            }
          ],
        }, // 表单配置
        noDataText: '请输入查询条件进行搜索',
        columns: [], // 表头
        data: [], // 数据配置
        selectData: [],
        pageShow: true, // 控制分页是否显示
        loading: false,
        indexColumn: true, // 是否显示序号
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
      },
      btnConfigMo: {
        typeAll: "default",
        btnsite: "right",
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            btnclick: () => {
              this.$emit('closeActionDialog', false);
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            type: 'primary',
            btnclick: () => {
              if (!this.tableConfig.selectData.length) {
                this.$Message.warning('请选中一条单据！');
                return false
              }
              let data = JSON.parse(JSON.stringify(this.tableConfig.selectData));
              data.map(it => { it.ID = '-1' });
              this.$emit('detailAddData', data);
              this.$emit('closeActionDialog', false);
            },
          },
        ],
      },
    };
  },
  created() {
    console.log();
  },
  destroyed() {

  },
  mounted() {
    this.$nextTick(() => {
      this.initTable(1, 10, true)
    });
  },
  methods: {
    /**
     * 入参说明：
     * 1. 新增 且 无原单号（expressCode不要传
          isInit: false
          mainId: "-1"
          pageNum: 1
          pageSize: 10
          skuEname: "12343214432"
          excludeEcode: [] // 已选ID集
     * 2. 新增 且 已有原单
          expressCode: "9998975701" // 必传
          isInit: false
          mainId: "-1"
          pageNum: 1
          pageSize: 10
          skuEname: "12343214432"
          ocBOrderDeliveryId: [] // 已选ID集
     * 3. 初始化弹窗表头
          expressCode: "-1" // 必传
          isInit: true
          mainId: "-1"
          pageNum: 1
          pageSize: 10
     * 
     */
    async initTable(page = 1, pageSize = 10, isInit) {
      console.log('payDetail::initTable::');
      this.loading = true;
      const paramFv = {
        skuEcode: '',
        skuEname: '',
        spuEcode: '',
        expressCode: '', // 物流单号（原单编号有值的时候必传）	
        mainId: '', // 主表id（原单编号有值的时候必传，新增传-1）	
      };
      let fixedcolumns = JSON.parse(JSON.stringify(this.tableConfig.businessFormConfig.formValue))
      for (const key in fixedcolumns) {
        if (!fixedcolumns[key]) delete fixedcolumns[key];
      }
      if (fixedcolumns.skuEcode && fixedcolumns.spuEcode) {
        fixedcolumns.spuEcode = "";
      }
      const pageInfo = { pageNum: page, pageSize }
      let param = { ...fixedcolumns, ...pageInfo }
      const exCode = R3.store.state.customize.COMPENSATE.exCode || '';
      // 详情时：expressCode、mainId必传（没有原单时除外
      param.expressCode = exCode;
      /* if (this.ID != '-1') {
        let storeOther = JSON.parse(JSON.stringify(R3.store.state.customize.COMPENSATE.other))
        param.expressCode = storeOther.exCode || ''
      } */
      if (isInit) {
        param.expressCode = '-1';
        param.isInit = true;
      } else {
        param.isInit = false;
      }
      if (!isInit && !param.expressCode) {
        delete param.expressCode // 没有原单时,expressCode不传
        param.excludeEcode = $omsUtils.sonList(this.subData, 'PS_C_SKU_ECODE') // 无原单，查询过滤已选数据
      } else if (!isInit && param.expressCode && param.expressCode != '-1') {
        param.ocBOrderDeliveryId = $omsUtils.sonList(this.subData, 'OC_B_ORDER_DELIVERY_ID') // 有原单，查询过滤已选数据
      }
      param.mainId = this.ID;
      param.web = 'payDetailAdd';
      const { data: { code, data } } = await this.service.orderCenter.payQueryProList(param).catch(e => {
        this.loading = false;
      });
      this.loading = false;
      // 特别地：弹窗里仅展示明细里没有的数据
      /* let showDa = data.data || []
      if (this.subData.length) {
        const x = 'OC_B_ORDER_DELIVERY_ID';
        const idList = $omsUtils.sonList(this.subData, x);
        if (data.data.length) {
          showDa = data.data.filter(it => !idList.includes(it[x]));
        }
      } */
      this.tableConfig.columns = data.columns;
      this.tableConfig.data = isInit ? [] : data.data;
      this.tableConfig.total = isInit ? 0 : data.pageInfo.total;
      this.loading = false;
    },
    // 模糊查询 数据
    async fuzzyquerybyak(search, colid) {
      let fixedcolumns = {}
      const formData = new FormData()
      formData.append('ak', search)
      formData.append('colid', colid)
      formData.append('fixedcolumns', JSON.stringify(fixedcolumns))
      const {
        data: { data },
      } = await this.service.common.fuzzyquerybyak(formData);
      this.tableConfig.businessFormConfig.formData[1].AuotData = data;
    },
    /* --------------------- 工具函数： --------------------- */

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
      this.$emit('detailAddData', this.tableConfig.selectData);
    },
    onSelect(selection, row) {
      this.tableConfig.selectData = selection;
      this.$emit('detailAddData', this.tableConfig.selectData);
    },
    onSelectAllCancel(x) {
      this.tableConfig.selectData = x;
      this.$emit('detailAddData', this.tableConfig.selectData);
    },
    onSelectAll(x) {
      this.tableConfig.selectData = x;
      this.$emit('detailAddData', this.tableConfig.selectData);
    },
    /* ------------------- 表格事件 part end ------------------- */
  },
};

</script>

<style lang="less" scoped>
</style>
