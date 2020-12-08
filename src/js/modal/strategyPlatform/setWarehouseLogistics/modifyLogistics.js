import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';

export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      jordanTableConfig: {
        columns: [
          {
            key: 'ENAME',
            title: '物流公司'
          },
          {
            key: 'ECODE',
            title: '物流编号'
          }
        ],
        data: [], // 数据配置
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 358, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        border: true // 是否显示纵向边框
      },
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: window.vmI18n.t('common.cancel'), // 取消 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            text: window.vmI18n.t('common.determine'), // 确定 按钮文本
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const _this = this;
              _this.determine();
            } // 按钮点击事件
          }
        ]
      }, // 确定取消按钮
      selectData: [],
      selectAllList: [],
      total: 0,
      cancelModel: false,
      name: '',
      delId: '',
      removeLoading: false
    };
  },
  mounted() {
    this.getLogistics();
  },
  methods: {
    // 确定
    async getLogistics(name, index = '') {
      const _this = this;
      _this.removeLoading = true;
      const param = {
        objid: _this.componentData.id,
        logisticsInfo: name === undefined ? '' : name
      };
      const res = await _this.service.common.getWarehouseLogisticsInfo(param);
      _this.removeLoading = false;
      if (res.data.code === 0) {
        _this.jordanTableConfig.data = res.data.data.cpLogisticsList;
        if (!index) {
          _this.selectData = res.data.data.warehouseLogisticsItems;
          _this.total = _this.selectData.length;
        }
      }
    },
    // 获取物流公司数据
    async determine() {
      const _this = this;
      const fromdata = new FormData();
      const param = {
        fixcolumn: {
          ST_C_WAREHOUSE_LOGISTICS: {},
          ST_C_WAREHOUSE_LOGISTICS_ITEM: _this.selectData,
          ST_C_WAREHOUSE_LOGISTICS_RANK_RESULT: []
        },
        objid: this.$route.query.id
      };
      fromdata.append('param', JSON.stringify(param));
      const res = await this.service.common.saveWarehouseLogistics(fromdata);
      if (res.data.data.code === 0) {
        _this.$parent.$parent.$parent.getTreeData();
        _this.$parent.$parent.$parent.provinceSynchronous();
        _this.$parent.$parent.closeConfirm();
      } else {
        const err = res.data.data.message || '设置失败';
        _this.$Message.error(err);
      }
    },
    // 同步查询
    synchronous() {
      const arr = [];
      if (this.selectAllList.length) {
        this.selectAllList.forEach((item) => {
          arr.push({
            CP_C_LOGISTICS_ID: item.ID,
            CP_C_LOGISTICS_ECODE: item.ECODE,
            CP_C_LOGISTICS_ENAME: item.ENAME,
            ID: -1
          });
        });
      }
      if (!this.selectData.length) this.selectData = arr;
      else if (arr.length) {
        arr.forEach((item) => {
          if (
            !this.selectData.some(
              e => e.CP_C_LOGISTICS_ECODE === item.CP_C_LOGISTICS_ECODE
            )
          ) this.selectData.push(item);
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
          if (this.selectData[i].CP_C_LOGISTICS_ECODE === ecode) {
            this.selectData.splice(i, 1);
            this.total = this.selectData.length;
            this.$Message.success('删除成功');
            break;
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
    async okClick() {
      this.removeLoading = true;
      const ids = [];
      if (this.delId) {
        ids[0] = this.delId;
      } else {
        this.selectData.forEach(item => ids.push(item.ID));
      }
      const fromdata = new FormData();
      const param = {
        objid: this.componentData.id,
        tabitem: {
          ST_C_WAREHOUSE_LOGISTICS_ITEM: ids
        }
      };
      fromdata.append('param', JSON.stringify(param));
      const res = await this.service.common.delWarehouseLogistics(fromdata);
      if (res.data.data.code === 0) {
        const ess = res.data.data.message || '删除成功';
        this.getLogistics();
        this.$parent.$parent.$parent.refresh();
        this.$Message.success(ess);
      } else {
        const err = res.data.data.message || '删除失败';
        this.$Message.error(err);
      }
      this.total = this.selectData.length;
    },
    cancalModal() {
      this.cancelModel = false;
    },
    // 双击
    onRowDblclick(row) {
      const arr = {
        CP_C_LOGISTICS_ID: row.ID,
        CP_C_LOGISTICS_ECODE: row.ECODE,
        CP_C_LOGISTICS_ENAME: row.ENAME,
        ID: -1
      };
      if (
        !this.selectData.some(
          e => e.CP_C_LOGISTICS_ECODE === row.ECODE
        )
      ) this.selectData.push(arr);
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
    }
  }
};
