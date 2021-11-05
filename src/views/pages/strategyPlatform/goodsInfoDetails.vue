<template>
  <div v-loading="loading">
    <businessActionTable
      :jordan-table-config="goodsTableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
  </div>
</template>
<script>
import businessActionTable from "burgeonComponents/businessActionTable";

export default {
  name: "retunGoods",
  components: {
    businessActionTable,
  },
  props: {
    mainData: {},
    returnProduct: "",
  },
  data() {
    return {
      ID: this.$route.params.itemId && this.$route.params.itemId != 'New' ? this.$route.params.itemId : '-1', // 记录主界面传入的ID
      loading: false,
      colRowNum: 4, // 针对于定制界面 form表单根据屏幕变化设置个数（用于计算）
      fieldsConfig: {
        1: {
          colid: 171667,
          prefix: 'PS_C_SPU',
          api: 'strategyPlatform.dropDownSPUList'
        },
        2: {
          colid: 171666,
          prefix: 'PS_C_SKU',
          api: 'strategyPlatform.dropDownSKUList'
        },
        3: {
          colname: 'PS_C_G1_ID'
        },
        4: {
          colname: 'PS_C_G2_ID'
        },
      },
      goodsTableConfig: {
        pageShow: true, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 10, // 默认每页条数100条，产品要求
        pageIndex: 1, // 页码
        totalData: [],
        selectionData: [],
        deleteData: [], // 暂存删除的数据，调保存的时候传给后端
        addData: [], // 暂存添加的数据，调保存的时候传给后端
        updateData: [], // 暂存修改的数据，调保存的时候传给后端
        data: [], // TODO 假数据
        columns: [
          {
            type: 'selection',
            width: 30,
            align: 'right'
          },
          {
            type: 'index',
            width: 60,
            align: 'left',
            title: $i18n.t('table_label.serialNo'), // 序号
          },
          {
            title: '商品类型', // 商品类型
            key: "SKU_TYPE",
            align: "center",
          },
          {
            title: '类型值', // 类型值
            key: 'SKUSPU_ECODE',
            align: "center",
          }
        ],
        businessFormConfig: {
          gridBar: true,
          formData: [
            {
              style: 'select',
              label: '商品类型', // 商品类型
              value: 'PICK_FLAG',
              width: '6',
              disabled: false,
              colname: 'PICK_FLAG',
              options: [],
            },
            {
              version: '1.4',
              colname: null,
              style: 'popInputPlus', // 输入框弹框单多选
              width: '6',
              itemdata: {
                isCustom: true,
                api: 'strategyPlatform.dropDownSPUList',
                serviceId: 'r3-sg',
                params: { 'ECODE': 1 },
                dataEmptyMessage: '请输入值查询',
                colid: null, // 当前字段的ID
                colname: null, // 当前字段的名称
                fkdisplay: 'drp', // 外键关联类型
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                name: '类型值', // 类型值
                readonly: false, // 是否可编辑，对应input   readonly属性
                valuedata: '', // 这个是选择的值
                pid: ''
              },
              popBefore: e => {
                console.log(e);
                this.goodsTableConfig.businessFormConfig.formData[1].itemdata.params = { "ECODE": e.valuedata, "pageNumber": 1, "pageSize": 10 }
              },
              oneObj: e => {
                console.log(e);
                this.goodsTableConfig.businessFormConfig.formValue = {
                  ...this.goodsTableConfig.businessFormConfig.formValue,
                  PS_C_SPU_ID: '',
                  PS_C_SPU_ECODE: '',
                  PS_C_SKU_ID: '',
                  PS_C_SKU_ECODE: ''
                }
                let reftable = this.goodsTableConfig.businessFormConfig.formData[1].itemdata.reftable;
                this.goodsTableConfig.businessFormConfig.formValue[`${reftable}_ID`] = e.pid;
                this.goodsTableConfig.businessFormConfig.formValue[`${reftable}_ECODE`] = e.valuedata;
              }
            },
            {
              style: '',
              label: '类型值',
              colname: null,
              width: '6',
              maxlength: 225,
              disabled: false,
              inputChange: () => {
                // this.masterModifyData('PS_C_G1_ID', 'master');
              }
            }
          ],
          formValue: {
            PICK_FLAG: '',
            PS_C_SPU_ID: '',
            PS_C_SPU_ECODE: '',
            PS_C_SKU_ID: '',
            PS_C_SKU_ECODE: '',
            PS_C_G1_ID: '',
            PS_C_G2_ID: ''
          },
          ruleValidate: {
            PICK_FLAG: [{
              required: true,
              message: ' '
            }]
          }
        },
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              webname: 'ST_C_PRICE_SUB_DELETE',
              text: $i18n.t('btn.add'), // 新增
              isShow: true,
              type: 'primary',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.addDetail();
              }
            },
            {
              webname: 'ST_C_PRICE_SUB_DELETE',
              text: $i18n.t('modalTitle.deleteDetails'), // 删除明细
              isShow: true,
              type: 'warning',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.deleteDetail();
              }
            },
            {
              webname: 'ST_C_PRICE_SUB_IMPORT',
              text: $i18n.t('modalTitle.import'), // 导入
              isShow: true,
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.handleImport();
              }
            },
            {
              webname: 'ST_C_PRICE_SUB_EXPORT',
              text: $i18n.t('btn.export'), // 导出
              isShow: true,
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.handleExport();
              }
            }
          ]
        },
      }
    };
  },
  watch: {
    'goodsTableConfig.businessFormConfig.formValue.PICK_FLAG': {
      handler(val) {
        this.toggleType(val);
      }
    },
  },
  async created() {
    // this.getBtn();
    this.getOptions();
    this.queryList();
  },
  async activated() {
  },
  async mounted() {
    this.goodsTableConfig.businessFormConfig.formValue.PICK_FLAG = 1;
  },
  methods: {
    async getOptions() {
      const fo = new FormData();
      fo.append('table', 'SG_B_SHOP_SKU_LOCK_STRATEGY_ITEM');
      fo.append('inlinemode', 'Y');
      const { data: { code, data } } = await this.service.common.inputForitem(fo);
      if (code == 0) {
        const item = data.inpubobj[0];
        const options = item.combobox.map((i) => ({
          label: i.limitdesc,
          value: i.limitval,
        }))
        this.goodsTableConfig.businessFormConfig.formData[0].options = options;
        this.goodsTableConfig.businessFormConfig.formValue.PICK_FLAG = '1';
      }
    },
    // 获取按钮权限
    async getBtn() {
      let params = { table: 'SG_B_SHOP_SKU_LOCK_STRATEGY', type: 'OBJ', serviceId: 'r3-oc-oms' }
      const { SUB_ACTIONS } = await $omsUtils.getPermissions(this, 'btnConfig', params, true)
      const subWebArr = $OMS2.omsUtils.sonList(SUB_ACTIONS, 'webname');
      this.goodsTableConfig.businessButtonConfig.buttons.forEach(item => {
        item.isShow = subWebArr.includes(item.webname)
      })
    },
    toggleType(val) {
      const { prefix, colid, colname, api } = this.fieldsConfig[val]
      if (['1', '2'].includes(val)) {
        this.goodsTableConfig.businessFormConfig.formData[2].style = null
        this.goodsTableConfig.businessFormConfig.formData[1].style = 'popInputPlus'
        this.goodsTableConfig.businessFormConfig.formData[1].colname = `${prefix}_ID`
        this.goodsTableConfig.businessFormConfig.formData[1].itemdata = {
          ...this.goodsTableConfig.businessFormConfig.formData[1].itemdata,
          colid, // 对应的表ID
          colname, // 当前字段的名称
          api
        }
        this.goodsTableConfig.businessFormConfig.formValue[`${prefix}_ID`] = null;
        this.goodsTableConfig.businessFormConfig.formValue[`${prefix}_ECODE`] = null;
      } else if (['3', '4'].includes(val)) {
        this.goodsTableConfig.businessFormConfig.formData[1].style = null;
        this.goodsTableConfig.businessFormConfig.formData[2].style = 'input';
        this.goodsTableConfig.businessFormConfig.formData[2].colname = colname;
      }
    },
    async queryList() {
      let fromdata = new FormData();
      fromdata.append('table', 'SG_B_SHOP_SKU_LOCK_STRATEGY_ITEM');
      fromdata.append('objid', this.ID);
      fromdata.append('refcolid', 184331);
      fromdata.append(
        'searchdata',
        '{"column_include_uicontroller":true,"startindex":0,"range":10,"fixedcolumns":{}}'
      );
      const { data: { code, data, message }} = await this.service.common.objectTableItem(fromdata)
      if (code == 0) {
        let result = data.row.map(i => ({
          ID: i.ID.val,
          SKU_TYPE: i.SKU_TYPE.val,
          SKUSPU_ECODE: i.SKUSPU_ECODE.val
        }))
        this.goodsTableConfig.data = result
      } else {
        this.$Message.error(message)
      }
    },
    async addDetail() {
      console.log(this.goodsTableConfig.businessFormConfig.formValue);
      const { PICK_FLAG,  } = this.goodsTableConfig.businessFormConfig.formValue
      let params = {
        SG_B_SHOP_SKU_LOCK_STRATEGY: {
          ename: "test_strategy_01",
          cpCShopId: "10001",
          lockBeginTime: "2021-09-08 10:00:00",
          lockEndTime: "2021-09-08 11:00:00",
          remarks: "这是一个备注",
          isactive: "Y"
        },
        SG_B_SHOP_SKU_LOCK_STRATEGY_ITEM: [{
          skuType: PICK_FLAG,
          skuspuId: "121",
          skuspuEcode: "121",
          skuspuEname: "121",
        }]
      }
      const { data: { code, data, message } } = await this.service.strategyPlatform.lockStorageSave(params);
      if (code == 0) {
        this.$Message.success(message);
      }
      console.log(data);
    },
    async deleteDetail() {
      let params = {
        delMTable: false,
        objId: this.ID,
        tabItem: { SG_B_SHOP_SKU_LOCK_STRATEGY_ITEM: [{ ID: "28" }]},
        SG_B_SHOP_SKU_LOCK_STRATEGY_ITEM: [{ ID: "28" }],
        0: { ID: "28" },
        table: "SG_B_SHOP_SKU_LOCK_STRATEGY"
      }
      const { data } = await this.service.common.objectDelete(params)
      
    },
    handleImport() {

    },
    handleExport() {

    },
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.goodsTableConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.goodsTableConfig.selectionData = e;
    },
    onSelectAll(e) {
      this.goodsTableConfig.selectionData = e;
    },
    onSelectAllCancel() {
      this.goodsTableConfig.selectionData = [];
    },
    pageChange(e) {
      this.goodsTableConfig.pageIndex = e;
      this.queryLogistics();
    },
    pageSizeChange(e) {
      this.goodsTableConfig.pageSize = e;
    }
  }
};
</script>

<style lang="less" scoped>
@import '~@burgeon/oms-theme/skin/public.less';
.detail-table-form{
  position: relative;
  &.formBottomPd{
    padding-bottom: 65px;
    
  }
  .button-combina{
    position: absolute;
    right: -8px;
    bottom: 0;
  }
}
/deep/ .ark-form-item-content {
  .ark-select-selection {
    border: none;
  }
  input {
    #bundle>.defalutInput;
  }
}
</style>
