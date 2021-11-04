<template>
  <!-- JIT配货单-换吊牌 -->
  <div class="changeTag" v-loading="loading">
    <businessButton :btn-config="btnConfig" />
    <div slot="content">
      <OmsTable :jordan-table-config="tableConfig" @on-page-change="pageChange" @on-page-size-change="pageSizeChange" @on-select="onSelect" @on-select-cancel="onSelectCancel" @on-select-all="onSelectAll" @on-select-all-cancel="onSelectAllCancel" />
    </div>
  </div>
</template>

<script>
import businessButton from 'burgeonComponents/businessButton';
import myInput from 'burgeonComponents/fkinput.vue';
import Vue from 'vue';
import { OmsTable } from 'burgeonComponents'

Vue.component('drpInput', myInput);
export default {
  name: 'changeTag',
  components: {
    businessButton,
    OmsTable,
    myInput,
  },
  data() {
    return {
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '条件信息导入',
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        basePathName: 'business-components',
        url: 'importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {},
      },
      loading: false,
      vmI18n: $i18n,
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            text: $i18n.t('btn.save'), // 保存
            btnclick: () => {
              this.save();
            },
          }, {
            text: $i18n.t('common.return'), // 返回
            btnclick: () => {
              this.back();
            },
          },
        ],
      },

      tableConfig: {
        pageShow: true,
        total: 0,
        pageSize: 10,
        current: 1,
        isShowSelection: true,
        indexColumn: true, // 是否展示序号列
        updateData: [],
        columns: [
          {
            title: 'PO',
            key: 'PICK_NO',
          },
          {
            title: '商品条码',
            key: 'PS_C_SKU_ECODE',
          },
          {
            title: '拣货数',
            key: 'TOT_QTY_OUT',
          },
          {
            title: '换吊牌后条码',
            key: 'OLD_BARCODE',
            render: (h, params) => h('drpInput', {
              props: {
                colname: 'OLD_BARCODE',
                style: 'popInput',
                version: '1.4',
                isActive: true,
                itemdata: this.itemdata,
              },
              style: {
                marginRight: '5px',
              },
              on: {
                getFkChooseItem: (val) => {
                  console.log('val:', val);
                  console.log('params:', params);
                  this.getFkChooseItem(val, params);
                },
              },
            }),
          },
        ],
        data: [{
          PICK_NO: 1, PS_C_SKU_ECODE: 1, TOT_QTY_OUT: 1, OLD_BARCODE: ''
        }],
      },
      itemdata: {
        col: 1,
        colid: 169347, // 当前字段的ID
        colname: 'OLD_BARCODE', // 当前字段的名称
        datelimit: 'all',
        display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
        fkdisplay: 'drp', // 外键关联类型
        fkdesc: '商品SPU',
        inputname: 'CP_C_ORIG_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
        isfk: true, // 是否有fk键
        isnotnull: false, // 是否必填
        name: '', // 赔付类型
        readonly: false, // 是否可编辑，对应input   readonly属性
        type: 'STRING', // 这个是后台用的
        valuedata: '',
        pid: '',
      },
    };
  },
  computed: {
    customizedModuleName() {
      return this.$router.currentRoute.params.customizedModuleName;
    },
  },
  mounted() {
    this.initPage();
  },
  methods: {
    async initPage() {
      const params = {
        distributionId: this.ID,
        pageNum: this.tableConfig.current,
        pageSize: this.tableConfig.pageSize,
      };
      this.loading = true;
      const self = this;
      await self.service.orderCenter
        .changeTagQuery(params)
        .then(({ data }) => {
          const res = data;
          if (res.code === 0) {
            this.tableConfig.data = res.data.list;
            this.tableConfig.total = res.data.total;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getFkChooseItem(val, rowD) {
      val.pid = val.ID ? val.ID.val : undefined;
      rowD.row.OLD_PS_C_SKU_ID = val.ID ? val.ID.val : '';
      rowD.row.OLD_BARCODE = val.ADDRESS ? val.ADDRESS.val : '';
      rowD.row.OLD_PS_C_SKU_ECODE = val.ADDRESS ? val.ADDRESS.val : '';
      if (this.$OMS2.omsUtils.getUnionArr(this.tableConfig.updateData, [rowD.row], 'ID').length) {
        // 已存在则覆盖（二次修改）
        const index = this.tableConfig.updateData.findIndex((it) => it.ID === rowD.row.ID);
        this.tableConfig.updateData.splice(index, 1, rowD.row);
        if (!val.pid) {
          // 手动删空input框
          this.tableConfig.updateData.splice(index, 1);
        }
        console.log('this.tableConfig.updateData::', this.tableConfig.updateData);
      } else {
        this.tableConfig.updateData.push(rowD.row);
      }
      console.log('this.tableConfig.data::', this.tableConfig.data);
    },

    // 保存
    async save() {
      const self = this;
      /* =========== 保存校验 start =========== */
      // 未修改，不提示，不操作
      if (!this.tableConfig.updateData.length) return false;
      /* =========== 保存校验 end =========== */
      console.log('this.tableConfig.updateData::', this.tableConfig.updateData);
      return false;
      const param = {
        objid: this.ID,
      };
      this.loading = true;
      const {
        data: { code, data, message },
      } = await self.service.orderCenter.distributionChangeTag(param).catch(() => {
        this.loading = false;
      });
      this.loading = false;
      if (code === 0) {
        this.backable = true;
        self.$Message.success(message || $i18n.t('modalTips.z9'));
        self.tableConfig.updateData = [];
        // 数据回显
        if (data) self.ID = data;
        await self.initPage(self.ID);
      } else {
        // 走框架的报错
      }
    },
    // 返回
    back() {
      const self = this;
      if (self.backable) {
        // 保存成功之后返回
        self.onOk();
        return;
      }
      if (self.tableConfig.updateData.length) {
        this.$Modal.info({
          title: $i18n.t('modalTitle.tips'), // 提示
          content: $i18n.t('modalTips.hu'), // 当前修改未保存，确定返回？
          className: 'ark-dialog',
          mask: true,
          showCancel: true,
          okText: $i18n.t('common.determine'), // 确定
          cancelText: $i18n.t('common.cancel'), // 取消
          onOk: () => {
            self.onOk();
          },
        });
      } else {
        self.onOk();
      }
    },
    onOk() {
      $omsUtils.tabCloseAppoint(this);
      this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId: 24733,
        type: 'S',
        tableName: 'OC_B_VIPCOM_DISTRIBUTION',
        label: 'JIT配货单',
        back: true,
      });
    },

    /* --------------- 表格事件 --------------- */
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

    /* --------------- 工具函数 --------------- */
  },
};
</script>

<style lang="less" scoped>
.changeTag {
  /deep/ .ark-table-cell {
    .el-input__inner {
      height: auto;
      line-height: 1;
      border: none;
    }
    .item-input {
      width: 40%;
    }
    .item-input .add-input {
      padding: 0;
      width: 100%;
    }
  }
}
</style>
