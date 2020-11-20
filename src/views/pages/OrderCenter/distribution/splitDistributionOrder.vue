<template>
  <div class="page" v-loading="pageLoading">
    <re-button :btnConfig="btnConfig" />
    <re-table :jordanTableConfig="tableConfig" />
    <re-dialog ref="dialog" :visible.sync="dialogConfig.visible" :title="dialogConfig.title" :width="dialogConfig.width">
      <div slot="content">
        <re-table
          :jordanTableConfig="dialogTableConfig"
          @table-delete-detail="tableDeleteDetail"
          @table-import="tableImport"
          @table-export="tableExport"
          @on-page-change="onPageChange"
          @on-page-size-change="onPageSizeChange"
          @on-select="dialogTableSelect"
          @on-select-cancel="dialogTableSelect"
          @on-select-all="dialogTableSelect"
          @on-select-all-cancel="dialogTableSelect"
        />
        <div class="dialogFooter">
          <re-button :btnConfig="dialogBtnConfig" />
        </div>
      </div>
    </re-dialog>
  </div>
</template>

<script>
import reButton from 'professionalComponents/businessButton';
import reTable from 'professionalComponents/businessActionTable';
import reDialog from 'professionalComponents/businessDialog';

import { pagingInit } from '@/assets/js/__utils__/common.js';
// import { post } from '@/utils/request';
export default {
  components: {
    reButton,
    reTable,
    reDialog,
  },
  data() {
    return {
      pageConfig: {},
      pageLoading: false,
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: '保存',
            btnclick: () => {
              this.pageSave();
            },
          },
          {
            text: '返回',
            btnclick: () => {
              this.$store.commit('TabHref', {
                id: 24733,
                type: 'table',
                name: 'OC_B_VIPCOM_DISTRIBUTION',
                label: 'JIT配货单',
                back: true,
              });
            },
          },
        ],
      },
      tableConfig: {
        columns: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center',
          },
          {
            title: '拣货单号',
            key: 'PICK_NO',
          },
          {
            title: '原始条码',
            key: 'PS_C_SKU_ECODE',
          },
          {
            title: '实际条码',
            key: 'NEW_PS_C_SKU_ECODE',
          },
          {
            title: 'PO',
            key: 'PO_NO',
          },
          {
            title: '拣货数',
            key: 'TOT_QTY_OUT',
          },
          {
            title: '操作',
            key: 'demo5',
            render: (h, params) => {
              let _this = this;
              // console.log(h, params)
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small',
                      ghost: true,
                    },
                    style: {
                      marginRight: '5px',
                    },
                    on: {
                      click: () => {
                        this.replaceChange(params);
                      },
                    },
                  },
                  params.row.replaceStatus ? '撤回' : '替换'
                ),
              ]);
            },
          },
        ],
        data: [],
      },
      originalTableData: {}, // 存储原始table数据（由后端请求下来的数据）
      selectTableIndex: -1,
      // 弹窗-配置数据
      dialogConfig: {
        visible: false,
        title: '换吊牌',
        width: 800,
      },
      dialogTableConfig: {
        isShowDeleteDetailBtn: true,
        // isShowImportBtn: true,
        // isShowExportBtn: true,
        pageShow: true,
        total: 0,
        pageSize: 10,
        current: 1,
        isShowSelection: true,
        jordanFormConfig: {
          formValue: {
            NEW_PS_C_SKU_ECODE: '',
            NEW_PS_C_SKU_ID: '',
            TOT_QTY_OUT: '1',
          },
          formData: [
            {
              style: 'popInput',
              width: '8',
              itemdata: {
                colid: 172268,
                colname: 'PICK_NO',
                display: 'text',
                fkdisplay: 'drp',
                isfk: true,
                length: 100,
                name: '实际条码',
                reftable: 'PS_C_SKU', //对应的表
                reftableid: 23281, //对应的表ID
                pid: '', // 这个是选择的id
                valuedata: '',
              },
              oneObj: (data) => {
                let formValue = this.dialogTableConfig.jordanFormConfig.formValue;
                formValue['NEW_PS_C_SKU_ECODE'] = data.valuedata;
                formValue['NEW_PS_C_SKU_ID'] = data.pid;
              },
              InputEnter: () => {
                this.dialogInputEnter();
              },
            },
            {
              style: 'input',
              label: '数量',
              width: '6',
              value: 'TOT_QTY_OUT',
              inputenter: () => {
                this.dialogInputEnter();
              },
            },
          ],
        },
        columns: [
          {
            type: 'index',
            title: '序号',
            width: 60,
            align: 'center',
          },
          {
            title: '实际条码',
            key: 'NEW_PS_C_SKU_ECODE',
          },
          {
            title: '数量',
            key: 'TOT_QTY_OUT',
          },
        ],
        data: [],
      },
      // 弹窗-存储所有table数据
      dialogTableData: [],
      // 弹窗-存储勾选的table数据
      selectionData: [],
      dialogBtnConfig: {
        btnsite: 'right',
        buttons: [
          {
            text: '取消',
            ghost: true,
            btnclick: () => {
              this.dialogConfig.visible = false;
            },
          },
          {
            type: 'error',
            text: '确定',
            ghost: true,
            btnclick: () => {
              // 校验
              let configStatus = this.dialogVerify();
              if (configStatus) this.dialogConfirm();
            },
          },
        ],
      },
    };
  },
  mounted() {
    this.pageConfig = this.$route.query;
    this.pageInfo();
  },
  methods: {
    pageInfo() {
      let params = {
        distributionId: this.pageConfig.cid,
      };
      this.pageLoading = true;
      let self = this;
      // post(this.$httpApi.order.distributionFindBydistributionId, params)
      self.service.orderCenter
        .distributionFindBydistributionId(params)
        .then(({ data }) => {
          let res = data;
          if (res.code === 0) {
            this.tableConfig.data = res.data;
            this.originalTableData = JSON.parse(JSON.stringify(res.data));
          }
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
        });
    },
    // 替换和撤回
    replaceChange({ row, index }) {
      if (!row.replaceStatus) {
        // 替换
        this.dialogTableConfig.data = [];
        this.dialogTableData = [];
        this.selectionData = [];
        this.dialogTableConfig.pageSize = 10;
        this.dialogTableConfig.current = 1;
        this.dialogTableConfig.total = 0;
        this.dialogConfig.visible = true;
        this.selectTableIndex = index;
      } else {
        // 撤回
        let newTableData = JSON.parse(JSON.stringify(this.tableConfig.data));
        newTableData.splice(index, 1);
        let item = newTableData.find((val) => val.ID === row.ID);
        if (item) {
          this.tableConfig.data.splice(index, 1);
        } else {
          let newItem = this.originalTableData.find((val) => val.ID === row.ID);
          this.tableConfig.data.splice(index, 1, newItem);
        }
        this.selectTableIndex--;
      }
    },
    // 弹窗的input回车事件
    dialogInputEnter() {
      let formValue = this.dialogTableConfig.jordanFormConfig.formValue;
      let message = '';
      if (!formValue['NEW_PS_C_SKU_ECODE'] || !formValue['NEW_PS_C_SKU_ID']) {
        message = '实际条码为空或不正确';
      } else if (!formValue['TOT_QTY_OUT']) {
        message = '数量不能为空';
      } else if (!/^[0-9]*$/.test(formValue['TOT_QTY_OUT'])) {
        message = '数量格式不正确';
      }
      // 判断报错内容是否不为空
      if (message.length > 0) return this.$message.error(message);
      // 判断数量综合是否超过原始数据的拣货数
      let originalTableDataLength = this.originalTableData.length;
      let selectOriginalTableDataItem = {};
      for (let i = 0; i < originalTableDataLength; i++) {
        let originalTableDataItem = this.originalTableData[i];
        // 找到跟当前替换吊牌原始条码一致的原始数据
        if (originalTableDataItem.ID === this.tableConfig.data[this.selectTableIndex].ID) {
          selectOriginalTableDataItem = originalTableDataItem;
          let num = this.dialogTableData.reduce((sum, item) => sum + Number(item.TOT_QTY_OUT), 0);
          num += Number(formValue['TOT_QTY_OUT']);
          // 判断当前替换吊牌的原属条码的拣货数总和是否超过原始条码的拣货数
          if (num > originalTableDataItem.TOT_QTY_OUT) return this.$message.error('实际条码的总拣货数超过了原始条码的拣货数');
        }
      }
      // 判断是否已存在相同条码的id
      let itemIndex = this.dialogTableData.findIndex((val) => val['NEW_PS_C_SKU_ID'] === formValue['NEW_PS_C_SKU_ID']); // 用id判断可以区分相同条码号却不同条码的情况
      if (itemIndex >= 0) {
        // 存在-数量相加
        this.dialogTableData[itemIndex]['TOT_QTY_OUT'] = Number(this.dialogTableData[itemIndex]['TOT_QTY_OUT']) + Number(formValue['TOT_QTY_OUT']);
      } else {
        // 不存在-数组前插入
        this.dialogTableData.unshift({
          ID: selectOriginalTableDataItem.ID,
          PICK_NO: selectOriginalTableDataItem.PICK_NO,
          PS_C_SKU_ID: selectOriginalTableDataItem.PS_C_SKU_ID,
          PS_C_SKU_ECODE: selectOriginalTableDataItem.PS_C_SKU_ECODE,
          PO_NO: selectOriginalTableDataItem.PO_NO,
          OC_B_VIPCOM_DISTRIBUTION_ID: selectOriginalTableDataItem.OC_B_VIPCOM_DISTRIBUTION_ID,
          replaceStatus: true,
          ...formValue,
        });
      }
      this.dialogTableConfig.total++;
      let pagingData = pagingInit(this.dialogTableData, this.dialogTableConfig);
      this.dialogTableConfig.data = pagingData.data;
      // 清除上次输入的条码
      this.dialogTableConfig.jordanFormConfig.formData[0].itemdata.pid = '';
      this.dialogTableConfig.jordanFormConfig.formData[0].itemdata.valuedata = '';
    },
    // 选中的table数组
    dialogTableSelect(selection) {
      this.selectionData = selection;
    },
    // 删除明细
    tableDeleteDetail() {
      let selectionData = this.selectionData;
      let dialogTableConfig = this.dialogTableConfig;
      let dialogTableConfigData = JSON.parse(JSON.stringify(dialogTableConfig.data));
      if (selectionData.length === 0) {
        this.$message.error('请选择需要删除明细');
        return;
      }
      // 循环去除当前页勾选的数据
      selectionData.forEach((item) => {
        let selectIndex = dialogTableConfigData.findIndex((val) => val.NEW_PS_C_SKU_ID === item.NEW_PS_C_SKU_ID);
        if (selectIndex >= 0) dialogTableConfigData.splice(selectIndex, 1);
      });
      // 弹窗的总table数据去除掉被删除的数据
      let start = (dialogTableConfig.current - 1) * dialogTableConfig.pageSize;
      this.dialogTableData.splice(start, dialogTableConfig.pageSize, ...dialogTableConfigData); // 去除当前页的所有数据，同时添加当前页剩余的数据
      dialogTableConfig.total -= selectionData.length;
      this.selectionData = [];
      let pagingData = pagingInit(this.dialogTableData, this.dialogTableConfig);
      this.dialogTableConfig.data = pagingData.data;
      this.dialogTableConfig.current = pagingData.current;
    },
    // 导入
    tableImport() {},
    // 导出
    tableExport() {},
    // 切换分页的个数
    onPageSizeChange(val) {
      this.dialogTableConfig.pageSize = val;
      let pagingData = pagingInit(this.dialogTableData, this.dialogTableConfig);
      this.dialogTableConfig.data = pagingData.data;
      this.dialogTableConfig.current = pagingData.current;
    },
    // 切换分页的页数
    onPageChange(val) {
      this.dialogTableConfig.current = val;
      let pagingData = pagingInit(this.dialogTableData, this.dialogTableConfig);
      this.dialogTableConfig.data = pagingData.data;
    },
    // 弹窗数据校验
    dialogVerify() {
      let sum = this.dialogTableData.reduce((sum, item) => sum + Number(item.TOT_QTY_OUT), 0);
      let originalTableDataSum = this.tableConfig.data[this.selectTableIndex].TOT_QTY_OUT;
      let status = sum === originalTableDataSum;
      if (!status) this.$message.error(`换吊牌的实际条码总拣货数为：${sum}，不等于原始条码的拣货数：${originalTableDataSum}`);
      return status;
    },
    // 弹窗确定事件
    dialogConfirm() {
      this.tableConfig.data.splice(this.selectTableIndex, 1, ...this.dialogTableData);
      this.dialogConfig.visible = false;
    },
    // 保存
    pageSave() {
      let params = this.tableConfig.data.map((item) => ({
        ID: item.ID,
        PS_C_SKU_ID: item.PS_C_SKU_ID,
        PS_C_SKU_ECODE: item.PS_C_SKU_ECODE,
        NEW_PS_C_SKU_ID: item.NEW_PS_C_SKU_ID,
        NEW_PS_C_SKU_ECODE: item.NEW_PS_C_SKU_ECODE,
        TOT_QTY_OUT: item.TOT_QTY_OUT,
        OC_B_VIPCOM_DISTRIBUTION_ID: item.OC_B_VIPCOM_DISTRIBUTION_ID,
      }));
      this.pageLoading = true;
      let self = this;
      // post(this.$httpApi.order.distributionChangeTag, params)
      self.service.orderCenter
        .distributionChangeTag(params)
        .then(({ data }) => {
          let res = data;
          if (res.code === 0) {
            this.$store.commit('TabHref', {
              id: 24733,
              type: 'table',
              name: 'OC_B_VIPCOM_DISTRIBUTION',
              label: 'JIT配货单',
              back: true,
            });
          }
          this.pageLoading = false;
        })
        .catch(() => {
          this.pageLoading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  padding: 20px 0;
}
/deep/ .dialogFooter {
  margin-top: 20px;
}
</style>
