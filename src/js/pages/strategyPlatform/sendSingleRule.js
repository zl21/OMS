import axios from 'axios';
import { setTimeout } from 'timers';
import jordanButton from 'professionalComponents/businessButton';
import jordanForm from 'professionalComponents/businessForm';
import jordanLabel from 'professionalComponents/businessLabel';
import jordanModal from 'professionalComponents/businessDialog';
import jordanActionTable from 'professionalComponents/businessActionTable';
import jordanStatusFlag from 'professionalComponents/businessStatusFlag';
import publicMethodsUtil from '@/assets/js/public/publicMethods';

export default {
  components: {
    jordanButton,
    jordanForm,
    jordanLabel,
    jordanModal,
    jordanActionTable,
    jordanStatusFlag
  },
  data() {
    return {
      name: '',
      single: false,
      treeData: [],
      theadArr: [],
      listArr: [],
      query: '',
      contentLoading: false,
      tableLoading: false,
      saveLoading: false,
      treeLoading: false,
      showFlag: true,
      // 修改仓库
      modifyWarehouse: {
        refFuns: 'confirmFun',
        confirmTitle: '请选择仓库',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '760',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'modifyWarehouse', // 组件名称
        url: 'modal/strategyPlatform/logisticsStrategy/strategyModifyLogistics',
        keepAlive: true,
        excludeString: 'modifyWarehouse', // 将name传进去，确认不缓存
        componentData: {}
      },
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '导入',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: 'publicDialog/importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      information: {
        formValue: {
          REMARK: '',
          ETYPE: '',
          ENAME: ''
        },
        formData: [
          {
            style: 'input',
            label: '规则名称',
            value: 'ENAME',
            width: '6'
          },
          {
            style: 'select', // 下拉框类型
            label: '类型', // 下拉框前的值
            width: '6', // 所占宽度宽度
            value: 'ETYPE',
            selectChange: () => {
              // this.selectSelectt();
            },
            options: [
              // 下拉框选项值
              {
                value: '1',
                label: '收货地址就近'
              },
              // {
              //   value: "2",
              //   label: "分仓比例"
              // },
              {
                value: '3',
                label: '唯品会'
              }
            ]
          },
          {
            style: 'input',
            label: '备注',
            value: 'REMARK',
            width: '6'
          }
        ],
        ruleValidate: {
          ENAME: [{ required: true, message: ' ', trigger: 'blur' }],
          ETYPE: [{ required: true, message: ' ', trigger: 'blur' }]
        }
      },
      openDefault: [1],
      btnConfig: {
        typeAll: 'error',
        buttons: [
          {
            text: '新增',
            btnclick: () => {
              const _this = this;
              _this.$store.commit('TabHref', {
                id: -1, // 单据id
                type: 'action', // 类型action
                name: 'sendSingleRule', // 文件名
                label: '订单派单规则编辑', // tab中文名
                query: Object.assign({
                  id: -1, // 单据id
                  tabTitle: '订单派单规则编辑' // tab中文名
                }) // 带的参数
              });
            }
          },
          {
            text: '保存',
            btnclick: () => {
              const _this = this;
              _this.save();
            }
          },
          {
            text: '作废',
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.invalid();
            }
          },
          {
            text: '导入',
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = { tableName: 'ST_C_SEND_RULE', objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId };
              _this.$children.find(item => item.name === 'importTable').openConfirm();
            }
          },
          {
            text: '导出',
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.warningOk();
            }
          },
          {
            text: '修改仓库',
            disabled: true,
            btnclick: () => {
              const _this = this;
              this.modifyWarehouse.componentData = { id: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId };
              this.$children.find(item => item.name === 'modifyWarehouse').openConfirm();
            }
          },
          {
            text: '刷新',
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.refresh();
            }
          },
          {
            text: '返回',
            btnclick: () => {
              const _this = this;
              _this.$store.commit('global/tabOpen', {
                type: 'S',
                tableName: 'ST_C_SEND_RULE',
                tableId: 24606
              });
            }
          }
        ]
      },
      jordanTableConfig: {
        jordanFormConfig: {
          formValue: {
            SEND_RATE: '',
            RANK: ''
          },
          formData: [
            {
              style: 'popInput',
              width: '6',
              itemdata: {
                col: 1,
                colid: 169410,
                colname: 'CP_C_PHY_WAREHOUSE_ID',
                datelimit: 'all',
                display: 'text',
                fkdesc: '实体仓档案',
                fkdisplay: 'drp',
                inputname: 'CP_C_PHY_WAREHOUSE_ID:ENAME',
                isfk: true,
                isnotnull: true,
                isuppercase: false,
                length: 20,
                name: '仓库',
                readonly: false,
                reftable: 'CP_C_PHY_WAREHOUSE',
                reftableid: 24486,
                row: 1,
                statsize: -1,
                type: 'STRING',
                valuedata: ''
              },
            },
            {
              style: 'input',
              label: '仓库优先级',
              value: 'RANK',
              width: '6',
              inputenter: () => {
                const _this = this;
                _this.saveWherehouseAdd();
              }
            },
            {
              style: 'input',
              label: '发货比例',
              value: 'SEND_RATE',
              width: '6',
              inputenter: () => {
                const _this = this;
                _this.saveWherehouseAdd();
              }
            }
          ],
          ruleValidate: {
            RANK: [{ required: true, message: ' ', trigger: 'blur' }],
            SEND_RATE: [{ required: true, message: ' ', trigger: 'blur' }]
          }
        }, // 表单配置
        columns: [
          {
            key: 'CP_C_PHY_WAREHOUSE_ENAME',
            title: '仓库'
          },
          {
            key: 'RANK',
            title: '仓库优先级'
          },
          {
            key: 'SEND_RATE',
            title: '发货比例'
          },
          {
            key: 'QTY_SEND',
            title: '发货数量'
          }
        ],
        isShowImportBtn: true,
        isShowExportBtn: true,
        data: [], // 数据配置
        isShowDeleteDetailBtn: true, // 控制是否显示删除明细
        pageShow: false, // 控制分页是否显示
        loading: false,
        height: 400, // 表格高度
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15 // 每页条数
      },
      labelList: [
        {
          label: '按收货地址',
          value: '1',
          isShow: true
        }
      ],
      labelDefaultValue: '1',
      selectAllList: [],
      statusName: '',
      warningModal: false
    };
  },
  mounted() {
    const _this = this;
    //   this.setTableHeight();
    if (_this.$route.params.customizedModuleId !== 'New') {
      _this.information.formData.forEach(item => {
        if (item.label === '规则名称') item.disabled = true;
        else if (item.label === '类型') item.disabled = true;
      });
      this.btnConfig.buttons.forEach(item => {
        if (item.text === '修改仓库') item.disabled = false;
        else if (item.text === '作废') item.disabled = false;
        else if (item.text === '导入') item.disabled = false;
        else if (item.text === '导出') item.disabled = false;
        else if (item.text === '刷新') item.disabled = false;
      });
      this.getMianTable();
    }
  },
  methods: {
    // 保存
    save() {
      const _this = this;
      const ETYPE = _this.information.formValue.ETYPE;
      if (_this.$route.params.customizedModuleId === 'New') {
        if (!_this.information.formValue.ENAME) {
          _this.$Message.error('规则名称必填');
          return;
        }
        if (!ETYPE) {
          _this.$Message.error('规则类型必填');
          return;
        }
      }
      if (!_this.theadArr.length && ETYPE === '1' && _this.$route.params.customizedModuleId !== 'New') {
        _this.$Message.error('请先设置仓库');
        return;
      }
      _this.saveLoading = true;
      _this.name = '';
      _this.query = '';
      const formData = new FormData();
      const cloneListArr = JSON.parse(JSON.stringify(_this.listArr));
      if (cloneListArr.length) {
        cloneListArr.forEach(item => {
          item.WAREHOUSE_RANK.forEach(data => {
            item[data.rankField] = data.rank;
          });
          item.WAREHOUSE_RANK = [];
        });
      }

      const param = {
        fixcolumn: {
          ST_C_SEND_RULE: {
            REMARK: _this.information.formValue.REMARK,
            ENAME: _this.information.formValue.ENAME,
            ETYPE
          },
          ST_C_SEND_RULE_ADDRESS_RENT: [],
          ST_C_SEND_RULE_WAREHOUSE_RATE: [],
          ST_C_SEND_RULE_ADDRESS_RANK_RESULT: ETYPE !== '3' ? cloneListArr : [],
          ST_C_SEND_RULE_ADDRESS_VIP_RESULT: ETYPE === '3' ? cloneListArr : []
        },
        objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId
      };
      formData.append('param', JSON.stringify(param));
      this.service.strategyPlatform
        .saveSendRule(formData)
        // axios({
        //   url: '/p/cs/saveSendRule',
        //   method: 'post',
        //   data: formData
        // })
        .then(res => {
          _this.saveLoading = false;
          if (res.data.data.code === 0) {
            _this.$Message.success('保存成功');
            if (_this.$route.params.customizedModuleId !== 'New') {
              if (ETYPE === '2') _this.getWarehouseRateResult();
              else if (ETYPE === '1' || ETYPE === '3') _this.getTree();
            } else {
              this.$store.commit('TabHref', {
                id: res.data.data.data.objid, // 单据id
                type: 'action', // 类型action
                name: 'sendSingleRule', // 文件名
                label: '订单派单规则编辑', // tab中文名
                query: Object.assign({
                  id: res.data.data.data.objid, // 单据id
                  tabTitle: '订单派单规则编辑' // tab中文名
                }) // 带的参数
              });
            }
          } else {
            _this.$Message.success(res.data.data.message || '保存失败');
          }
        });
    },
    // 明细保存
    saveWherehouseAdd() {
      const _this = this;
      if (_this.$route.params.customizedModuleId == 'New') {
        _this.$Message.info('请先保存主表信息');
        return;
      }
      if (!_this.jordanTableConfig.jordanFormConfig.formData[0].itemdata.pid) {
        _this.$Message.error('仓库必填');
        return;
      }
      if (!_this.information.formValue.ETYPE) {
        _this.$Message.error('仓库优先级必填必填');
        return;
      }

      const formData = new FormData();
      const param = {
        fixcolumn: {
          ST_C_SEND_RULE: {},
          ST_C_SEND_RULE_ADDRESS_RENT: [],
          ST_C_SEND_RULE_WAREHOUSE_RATE: [
            {
              CP_C_PHY_WAREHOUSE_ID: _this.jordanTableConfig.jordanFormConfig.formData[0].itemdata.pid,
              RANK: _this.jordanTableConfig.jordanFormConfig.formValue.RANK,
              SEND_RATE: _this.jordanTableConfig.jordanFormConfig.formValue.SEND_RATE,
              ID: -1
            }
          ],
          ST_C_SEND_RULE_ADDRESS_RANK_RESULT: []
        },
        objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId
      };
      formData.append('param', JSON.stringify(param));
      this.service.strategyPlatform
        .saveSendRule(formData)
        // axios({
        //   url: '/p/cs/saveSendRule',
        //   method: 'post',
        //   data: formData
        // })
        .then(res => {
          if (res.data.data.code === 0) {
            _this.$Message.success('新增成功');
            _this.getWarehouseRateResult();
            _this.jordanTableConfig.jordanFormConfig.formData[0].itemdata.pid = '';
            _this.jordanTableConfig.jordanFormConfig.formData[0].itemdata.valuedata = '';
            _this.jordanTableConfig.jordanFormConfig.formValue.RANK = '';
            _this.jordanTableConfig.jordanFormConfig.formValue.SEND_RATE = '';
          } else {
            _this.$Message.error(res.data.data.message || '新增失败');
          }
        });
    },
    // 获取主表信息
    getMianTable() {
      const _this = this;
      _this.saveLoading = true;
      this.service.strategyPlatform
        .getSendRuleMain({ objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId })
        // axios({
        //   url: '/p/cs/getSendRuleMain',
        //   method: 'post',
        //   data: { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId }
        // })
        .then(res => {
          _this.saveLoading = false;
          if (res.data.code === 0) {
            _this.information.formValue.ENAME = res.data.data.ENAME;
            _this.information.formValue.ETYPE = res.data.data.ETYPE;
            _this.information.formValue.REMARK = res.data.data.REMARK;
            if (res.data.data.ISACTIVE === 'N') {
              _this.statusName = '已作废';
              _this.jordanTableConfig.isShowImportBtn = false;
              _this.jordanTableConfig.isShowExportBtn = false;
              _this.jordanTableConfig.isShowDeleteDetailBtn = false;
              _this.jordanTableConfig.jordanFormConfig = {};
              _this.btnConfig.buttons.forEach(item => {
                if (item.text === '修改仓库') item.disabled = true;
                else if (item.text === '作废') item.disabled = true;
                else if (item.text === '导入') item.disabled = true;
                else if (item.text === '导出') item.disabled = true;
                else if (item.text === '保存') item.disabled = true;
              });
            }
            if (_this.information.formValue.ETYPE === '1' || _this.information.formValue.ETYPE === '3') {
              _this.showFlag = false;
              setTimeout(() => {
                _this.setTableHeight();
              }, 100);
              _this.getTree();
              this.labelList[0].label = _this.information.formValue.ETYPE === '1' ? '按收货地址' : '派单规则明细';
            } else if (_this.information.formValue.ETYPE === '2') {
              _this.showFlag = true;
              _this.getWarehouseRateResult();
              _this.btnConfig.buttons.forEach(item => {
                if (item.text === '修改仓库') item.disabled = true;
                else if (item.text === '导入') item.disabled = true;
                else if (item.text === '导出') item.disabled = true;
              });
              this.labelList[0].label = '分仓比例';
            }
          }
        });
    },
    // 获取收货地址列表数据
    getWarehouseRateResult() {
      const _this = this;
      _this.jordanTableConfig.loading = true;
      this.service.strategyPlatform
        .getWarehouseRateResultTable({ objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId })
        // axios({
        //   url: '/p/cs/getWarehouseRateResultTable',
        //   method: 'post',
        //   data: { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId }
        // })
        .then(res => {
          _this.jordanTableConfig.loading = false;
          if (res.data.code === 0) {
            _this.jordanTableConfig.data = res.data.data;
          }
        });
    },
    // 获取树
    getTree() {
      const _this = this;
      const param = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId };
      // let [url, treeName] = ['', '']
      const ETYPE = _this.information.formValue.ETYPE;
      // if (ETYPE === '1') {
      //   url = '/p/cs/getSendRuleTree'
      //   treeName = 'sendRuleTree'
      // } else {
      //   url = '/p/cs/getSendRuleVipWarehouseTree'
      //   treeName = 'sendRuleVipWarehouseTree'
      // }
      const url = ETYPE === '1' ? '/p/cs/getSendRuleTree' : '/p/cs/getSendRuleVipWarehouseTree';
      this.contentLoading = true;
      axios({
        url,
        method: 'post',
        data: param
      })
        .then(res => {
          this.contentLoading = false;
          if (res.data.code === 0) {
            const treeData = res.data.data.sendRuleTree || [];
            // if (ETYPE === '3') {
            //   treeData.forEach(val => {
            //     val.title = val.warehouseName
            //     val.ecode = val.warehouseCode
            //   })
            // }
            _this.treeData = treeData;
            this.synchronous();
            if (res.data.data.sendRuleAddressRents !== null && res.data.data.sendRuleAddressRents.length) {
              this.theadArr = [];
              res.data.data.sendRuleAddressRents.forEach(item => {
                this.theadArr.push({
                  name: item.CP_C_PHY_WAREHOUSE_ENAME
                });
              });
            } else {
              this.theadArr = [];
            }
          }
        })
        .catch(() => {
          this.contentLoading = false;
        });
    },
    // 全选树
    checkAll(e) {
      if (e) {
        this.treeData.forEach(item => {
          item.checked = true;
        });
      } else {
        this.treeData.forEach(item => {
          item.checked = false;
        });
      }
    },
    // 同步
    synchronous() {
      const _this = this;
      const ETYPE = _this.information.formValue.ETYPE;
      _this.listArr = [];
      _this.tableLoading = true;
      const treeList = [];
      _this.treeData.forEach(item => {
        if (item.checked) {
          treeList.push({
            id: item.id,
            regiontype: item.regiontype
          });
        }
      });
      const param = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId, treeNode: treeList };
      const url = ETYPE === '1' ? '/p/cs/getWarehouseRankResultTable' : ' /p/cs/getVipWarehouseRankResultTable';
      axios({
        url,
        method: 'post',
        data: param
      }).then(res => {
        _this.tableLoading = false;
        if (res.data.code === 0) {
          const listArr = res.data.data !== undefined ? res.data.data : [];
          listArr.forEach(item => {
            // if ( ETYPE === '3') item.CP_C_REGION_PROVINCE_ENAME = item.CP_C_VIPCOM_WAHOUSE_WAREHOUSE_NAME
            item.WAREHOUSE_RANK = JSON.parse(item.WAREHOUSE_RANK);
          });
          _this.listArr = listArr;
        }
      });
    },
    inputBlur(item, rank, index) {
      for (let i = 0; i < item.length; i++) {
        if (!rank.rank) return;
        if (item[i].warehouseEcode !== rank.warehouseEcode && item[i].rank === rank.rank) {
          setTimeout(() => {
            item[index].rank = '';
            this.$Message.info('优先级设置重复');
          }, 200);
          return;
        }
      }
    },
    // 刷新
    refresh() {
      const _this = this;
      _this.listArr = [];
      _this.getMianTable();
    },
    enter(e) {
      const _this = this;
      _this.tableLoading = true;
      _this.listArr = [];
      this.query = e;
      const param = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId, treeLikeKey: e };
      this.service.strategyPlatform
        .getLikeRankResultTable(param)
        // axios({
        //   url: '/p/cs/getLikeRankResultTable',
        //   method: 'post',
        //   data: param
        // })
        .then(res => {
          _this.tableLoading = false;
          if (res.data.code === 0) {
            _this.listArr = res.data.data.sendRuleAddressRanks !== undefined ? res.data.data.sendRuleAddressRanks : [];
            _this.listArr.forEach(item => {
              item.WAREHOUSE_RANK = JSON.parse(item.WAREHOUSE_RANK);
            });
            _this.treeData = res.data.data.sendRuleTree;
          } else {
            _this.$Message.error(res.data.data.message || '失败');
          }
        });
    },
    // 作废
    invalid() {
      const _this = this;
      _this.saveLoading = true;
      const fromdata = new FormData();
      const param = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId };
      fromdata.append('param', JSON.stringify(param));
      this.service.strategyPlatform
        .voidSendRule(fromdata)
        // axios({
        //   url: '/p/cs/voidSendRule',
        //   method: 'post',
        //   data: fromdata
        // })
        .then(res => {
          _this.saveLoading = false;
          if (res.data.data.code === 0) {
            const ess = res.data.data.message || '作废成功';
            _this.getMianTable();
            _this.$Message.success(ess);
          } else {
            const err = res.data.data.message || '作废失败';
            _this.$Message.success(err);
          }
        });
    },
    tableImport() {
      const _this = this;
      _this.importTable.componentData = { tableName: 'ST_C_SEND_RULE_RATE', objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId };
      _this.$children.find(item => item.name === 'importTable').openConfirm();
    },
    tableExport() {
      const _this = this;
      const param = {
        objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId
      };
      this.service.strategyPlatform
        .exportSendRuleWarehouseRate(param)
        // axios({
        //   url: '/p/cs/exportSendRuleWarehouseRate',
        //   method: 'post',
        //   data: param
        // })
        .then(res => {
          if (res.data.code === 0) {
            const ess = res.data.message || '导出成功';
            _this.$Message.success(ess);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            const err = res.data.message || '导出失败';
            _this.$Message.success(err);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          }
        });
    },
    DeleteDetail() {
      const _this = this;
      const ids = [];
      if (_this.selectAllList.length) {
        _this.selectAllList.forEach(item => ids.push(item.ID));
      } else {
        _this.$Message.error('请选择需要删除的数据');
        return;
      }
      const fromdata = new FormData();
      const param = {
        objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId,
        tabitem: {
          ST_C_SEND_RULE_WAREHOUSE_RATE: ids
        }
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.strategyPlatform
        .delSendRule(fromdata)
        // axios({
        //   url: '/p/cs/delSendRule',
        //   method: 'post',
        //   data: fromdata
        // })
        .then(res => {
          if (res.data.data.code === 0) {
            const ess = res.data.data.message || '删除成功';
            _this.getMianTable();
            _this.$Message.success(ess);
          } else {
            const err = res.data.data.message || '删除失败';
            _this.$Message.error(err);
          }
        });
    },
    // 导出确认
    warningOk() {
      const _this = this;
      const treeList = [];
      this.treeData.forEach(item => {
        if (item.checked) {
          treeList.push({
            id: item.id,
            regiontype: item.regiontype
          });
        }
      });
      const param = {
        objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId,
        treeNode: treeList
      };
      this.service.strategyPlatform
        .exportSendRuleWarehouseRank(param)
        // axios({
        //   url: '/p/cs/exportSendRuleWarehouseRank',
        //   method: 'post',
        //   data: param
        // })
        .then(res => {
          if (res.data.code === 0) {
            const ess = res.data.message || '导出成功';
            _this.$Message.success(ess);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            const err = res.data.message || '导出失败';
            _this.$Message.error(err);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          }
        });
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
    // 设置表格高度
    setTableHeight() {
      const _this = this;
      const contentHeight = document.getElementById('content').clientHeight;
      const Theight = document.getElementsByClassName('tableBox')[0];
      if (Theight !== undefined) {
        document.getElementsByClassName('list-table')[0].style = `height: ${contentHeight - 240}px;`;
        Theight.style = `height: ${contentHeight - 200}px;`;
      }
      _this.jordanTableConfig.height = contentHeight - 250;
    },
    paperScroll(e) {
      const sLefts = document.getElementById('fixedDiv');
      sLefts.setAttribute('style', `margin-left: ${-e.target.scrollLeft}px`);
    }
  }
};
