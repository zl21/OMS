<template>
  <div class="addPlatformLogisticsCompany customized-modal">
    <div class="subtablePart">
      <businessActionTable :jordan-table-config="tableConfig" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" @on-page-change="pageChange" @on-page-size-change="pageSizeChange" />
    </div>
    <businessButton class="modal-footer" :btn-config="btnConfig" />
  </div>
</template>

<script>
import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';

export default {
  name: 'addPlatformLogisticsCompany',
  components: {
    businessButton,
    businessForm,
    businessActionTable,
  },
  data() {
    return {
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      btnConfig: {
        typeAll: 'default',
        btnsite: 'right',
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消,
            btnclick: () => {
              this.$parent.close();
            },
          },
          {
            text: $i18n.t('common.determine'), // 确定
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.confirmHandel();
            },
          },
        ],
      },
      platTypeId: '', //平台类型ID
      tableConfig: {
        isSearchText: true, // 是否修改搜索框为select
        isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        isShowAddDetailBtn: false, // 控制是否显示新增明细
        searchSelectList: [], // isSearchText为false的情况下使用 搜索框list
        pageShow: true, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '332', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30,50,100], // 每页条数切换的配置
        pageSize: 100, // 默认每页条数100条，产品要求
        pageIndex: 1, // 页码
        totalData: [],
        selectionData: [],
        deleteData: [], // 暂存删除的数据，调保存的时候传给后端
        addData: [], // 暂存添加的数据，调保存的时候传给后端
        updateData: [], // 暂存修改的数据，调保存的时候传给后端
        data: [],
        isShowSelection: true, // 是否展示select框
        indexColumn: true, // 是否展示序号列
        columns: [
          {
            title: '平台类型',
            key: 'CP_C_PLATFORM_ENAME',
          },
          {
            title: '平台物流名称',
            key: 'CP_C_LOGISTICS_ENAME',
          },
          {
            title: '平台物流编码',
            key: 'CP_C_LOGISTICS_ECODE',
          },
        ],
        businessFormConfig: {
          formData: [
            {
              style: 'input',
              label: '平台物流名称',
              value: 'CP_C_LOGISTICS_ENAME',
              colname: 'CP_C_LOGISTICS_ENAME',
              width: '12',
              disabled: false,
            },
            {
              version: '1.4',
              colname: 'CP_C_PLATFORM_ID',
              style: 'popInput', // 输入框弹框单多选
              width: '12',
              itemdata: {
                col: 1,
                colid: 168316, // 当前字段的ID
                colname: 'CP_C_PLATFORM_ID', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'drp', // 外键关联类型
                fkdesc: '平台类型',
                inputname: 'CP_C_PLATFORM_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: '平台类型', // 赔付类型
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'CP_C_PLATFORM', // 对应的表
                reftableid: 10340, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                pid: '', // 啥 ？？？
              },
              oneObj: (val) => {
                // 选中触发事件
                console.log('val::', val);
                // if (!val.pid) return;
                this.platTypeId = val.pid || '';
                this.tableConfig.businessFormConfig.formValue.CP_C_PLATFORM_ID = val.valuedata;
              },
            },
          ],
          formValue: {
            CP_C_LOGISTICS_ENAME: '',
            CP_C_PLATFORM_ID: '',
          },
          ruleValidate: {},
        },
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              text: '搜索',
              icon: 'ios-search',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.searchHandel();
              },
            },
            {
              text: '重置',
              icon: 'ios-refresh',
              btnclick: () => {
                this.resetHandel();
              },
            },
          ],
        },
      },
    };
  },
  watch: {},

  async mounted() {
    const self = this;
    await self.searchHandel();
  },
  created() {},
  methods: {
    /* -------------------- 子表Part start -------------------- */
    // 搜索按钮
    async searchHandel() {
      const self = this;
      const ITEM = {
        CP_C_PLATFORM_ID: self.platTypeId, // 平台类型ID
        CP_C_LOGISTICS_ENAME: self.tableConfig.businessFormConfig.formValue.CP_C_LOGISTICS_ENAME, // 物流公司名称
      };
      const param = {
        PAGE_INDEX: self.tableConfig.pageIndex,
        PAGE_SIZE: self.tableConfig.pageSize,
        ITEM,
      };
      this.$comUtils.setLoading(true);
      const {
        data: { code, data, message },
      } = await self.service.basicData.platformQueryItems(param).catch(() => {
        this.$comUtils.setLoading();
      });
      this.$comUtils.setLoading();
      if (code === 0) {
        self.tableConfig.data = data.ITEMS || [];
        self.tableConfig.total = data.TOTAL_COUNT;
      }
    },
    // 重置按钮
    async resetHandel() {
      const self = this;
      const fV = self.tableConfig.businessFormConfig.formValue;
      const fD = self.tableConfig.businessFormConfig.formData;
      fV.CP_C_LOGISTICS_ENAME = '';
      fD[1].itemdata.valuedata = '';
      self.platTypeId = '';
      await self.searchHandel();
    },
    /* -------------------- 子表Part end -------------------- */

    // 确定
    async confirmHandel() {
      const self = this;
      let partArrs = self.tableConfig.selectionData;
      partArrs.map((it) => {
        it.ID = '-1';
        it.repeatKey = it.CP_C_PLATFORM_ENAME + '+' + it.CP_C_LOGISTICS_ECODE;
      });
      this.$emit('getData', partArrs); // 传给父组件
      this.$parent.close();
    },

    /* --------------- 表格事件 --------------- */
    delTableDetail() {},
    addTableDetail() {},
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.tableConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.tableConfig.selectionData = e;
    },
    onSelectAll(e) {
      this.tableConfig.selectionData = e;
    },
    onSelectAllCancel() {
      this.tableConfig.selectionData = [];
    },
    pageChange(e) {
      this.tableConfig.pageIndex = e;
      this.searchHandel();
    },
    pageSizeChange(e) {
      this.tableConfig.pageSize = e;
    },
  },
};
</script>

<style lang="less" scoped>
// @import '~professionalComponents/common/css/theme.less';
.addPlatformLogisticsCompany {
  /deep/ .subtablePart {
    position: relative;
    .ark-form-item {
      margin-bottom: 0;
    }
    .businessForm-box {
      width: 500px;
    }
    .orderManageEdit .businessForm_a {
      padding-bottom: 6px;
      .ark-col {
        margin-top: 0;
      }
    }
    .businessButtons-box {
      position: absolute;
      top: 0;
      left: 520px;
      .one_button {
        padding: 6px 0 2px;
      }

      .one_button .buttonBox button > i.iconfont + span {
        display: initial;
        margin-left: 0;
      }
      .one_button .buttonBox button > i.iconfont {
        position: initial;
        top: 0;
        left: 0;
        transform: inherit;
      }
    }
  }
  /deep/ .one_button .buttonBox {
    justify-content: flex-end;
  }
  /deep/ .ark-table-body {
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 6px;
    }
  }
}
</style>
