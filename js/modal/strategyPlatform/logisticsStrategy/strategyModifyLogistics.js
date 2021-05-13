// 发货单派单规则 - 修改仓库
import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable.vue';

export default {
  name: 'strategyModifyLogistics',
  components: {
    businessButton,
    businessActionTable,
  },
  props: {
    componentData: {},
  },
  data() {
    return {
      vmI18n:$i18n,
      jordanTableConfig: {
        columns: [
          {
            key: 'ENAME',
            title: $i18n.t('table_label.warehouseName'), // '仓库名称',
          },
          {
            key: 'ECODE',
            title: $i18n.t('table_label.warehouseNo'), // '仓库编号',
          },
        ],
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 358, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        border: true, // 是否显示纵向边框
      },
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $i18n.t('common.determine'), // 确定
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.determine();
            }, // 按钮点击事件
          },
        ],
      }, // 确定取消按钮
      selectData: [],
      selectAllList: [],
      total: 0,
      cancelModel: false,
      name: '',
      delId: '',
      removeLoading: false,
    };
  },
  mounted() {
    this.getLogistics();
  },
  methods: {
    // 确定
    determine() {
      const _this = this;
      const formdata = new FormData();
      const param = {
        fixcolumn: {
          ST_C_SEND_RULE: {},
          ST_C_SEND_RULE_ADDRESS_RENT: _this.selectData,
          ST_C_SEND_RULE_WAREHOUSE_RATE: [],
          ST_C_SEND_RULE_ADDRESS_RANK_RESULT: [],
        },
        objid: _this.$route.params.customizedModuleId === 'New' ? -1 : _this.$route.params.customizedModuleId,
      };
      formdata.append('param', JSON.stringify(param));
      this.service.strategyPlatform.saveSendRule(formdata).then(res => {
        if (res.data.data.code === 0) {
          _this.$parent.$parent.$parent.refresh();
          _this.$Message.success(res.data.data.message);
          _this.$parent.$parent.closeConfirm();
        }
      });
    },
    // 获取仓库数据
    getLogistics(name, index = '') {
      const _this = this;
      _this.removeLoading = true;
      const param = {
        objid: _this.componentData.id,
        warehouseInfo: name === undefined ? '' : name,
      };
      this.service.strategyPlatform.getSendRuleWarehouseInfo(param).then(res => {
        _this.removeLoading = false;
        if (res.data.code === 0) {
          _this.jordanTableConfig.data = res.data.data.cpCPhyWarehouseList;
          if (!index) {
            _this.selectData = res.data.data.sendRuleAddressRents || [];
            _this.total = _this.selectData.length;
          }
        }
      });
    },
    // 同步查询
    synchronous() {
      const arr = [];
      if (this.selectAllList.length) {
        this.selectAllList.forEach((item) => {
          arr.push({
            CP_C_PHY_WAREHOUSE_ID: item.ID,
            CP_C_PHY_WAREHOUSE_ECODE: item.ECODE,
            CP_C_PHY_WAREHOUSE_ENAME: item.ENAME,
            ID: -1,
          });
        });
      }
      if (!this.selectData.length) this.selectData = arr;
      else if (arr.length) {
        arr.forEach((item) => {
          if (!this.selectData.some((e) => e.CP_C_PHY_WAREHOUSE_ECODE === item.CP_C_PHY_WAREHOUSE_ECODE)) {
            this.selectData.push(item);
          }
        });
      }
      this.total = this.selectData.length;
    },
    // 删除
    DeleteSelect(ecode, id) {
      if (id !== -1) {
        this.cancelModel = true;
        this.delId = id;
      } else {
        for (let i = 0, list = this.selectData.length; i < list; i++) {
          if (this.selectData[i].CP_C_PHY_WAREHOUSE_ECODE === ecode) {
            this.selectData.splice(i, 1);
            this.total = this.selectData.length;
            this.$Message.success($i18n.t('modalTips.ay')); // '删除成功'
            return;
          }
        }
      }
    },
    DeleteAll() {
      if (!this.selectData.length) return;
      this.delId = '';
      this.cancelModel = true;
    },
    // 删除确认
    okClick() {
      this.removeLoading = true;
      const ids = [];
      if (this.delId) {
        ids[0] = this.delId;
      } else {
        this.selectData.forEach((item) => ids.push(item.ID));
      }
      const formdata = new FormData();
      const param = {
        objid: this.componentData.id,
        tabitem: {
          ST_C_SEND_RULE_ADDRESS_RENT: ids,
        },
      };
      formdata.append('param', JSON.stringify(param));
      this.service.strategyPlatform.delSendRule(formdata).then(res => {
        this.removeLoading = false;
        if (res.data.data.code === 0) {
          this.getLogistics();
          this.$parent.$parent.$parent.refresh();
          this.$Message.success(res.data.data.message);
        } 
      });
      this.total = this.selectData.length;
    },
    cancalModal() {
      this.cancelModel = false;
    },
    // 双击
    onRowDblclick(row) {
      const arr = {
        CP_C_PHY_WAREHOUSE_ID: row.ID,
        CP_C_PHY_WAREHOUSE_ECODE: row.ECODE,
        CP_C_PHY_WAREHOUSE_ENAME: row.ENAME,
        ID: -1,
      };
      if (!this.selectData.some((e) => e.CP_C_PHY_WAREHOUSE_ECODE === row.ECODE)) {
        this.selectData.push(arr);
      }
      this.total = this.selectData.length;
    },
    OnSelect(e) {
      this.selectAllList = e;
    },
    Cancel(e) {
      this.selectAllList = e;
    },
    SelectAll(e) {
      this.selectAllList = e;
    },
    SelectAllCancel(e) {
      this.selectAllList = e;
    },
  },
};
