// import axios from 'axios';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import BC from 'burgeonComponents';
const { Components } = BC

export default {
  components: {},
  data() {
    return {
      name: '',
      single: false,
      treeData: [],
      theadArr: [],
      listArr: [],
      query: '',
      tableLoading: false,
      saveLoading: false,
      treeLoading: false,
      showFlag: true,
      // 修改仓库
      modifyWarehouse: {
        refFuns: 'confirmFun',
        confirmTitle: $i18n.t('modalTitle.a3'), // 请选择仓库
        titleAlign: 'left', // 设置标题是否居中 center left
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
        componentData: {},
      },
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: $i18n.t('modalTitle.import'),
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: Components.ImportTable,
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {},
      },
      information: {
        formValue: {
          REMARK: '',
          ETYPE: '',
          ENAME: '',
        },
        formData: [
          {
            style: 'input',
            label: $i18n.t('form_label.ruleName'),
            value: 'ENAME',
            width: '6',
          },
          {
            style: 'select',
            label: $i18n.t('form_label.type'),
            width: '6',
            value: 'ETYPE',
            selectChange: () => {
              // this.selectSelectt();
            },
            options: [
              // 下拉框选项值
              {
                value: '1',
                label: $i18n.t('form_label.a0'),
              },
              // {
              //   value: "2",
              //   label: "分仓比例"
              // },
              {
                value: '3',
                label: $i18n.t('form_label.a1'),
              },
            ],
          },
          {
            style: 'input',
            label: $i18n.t('table_label.remarks'),
            value: 'REMARK',
            width: '6',
          },
        ],
        ruleValidate: {
          ENAME: [{ required: true, message: ' ', trigger: 'blur' }],
          ETYPE: [{ required: true, message: ' ', trigger: 'blur' }],
        },
      },
      openDefault: [1],
      btnConfig: {
        typeAll: 'default',
        buttons: [
          // {
          //   text: '新增',
          //   btnclick: () => {
          //     const _this = this;
          //     _this.$store.commit('customize/TabHref', {
          //       id: -1, // 单据id
          //       type: 'action', // 类型action
          //       name: 'sendSingleRule', // 文件名
          //       label: '订单派单规则编辑', // tab中文名
          //       query: Object.assign({
          //         id: -1, // 单据id
          //         tabTitle: '订单派单规则编辑' // tab中文名
          //       }) // 带的参数
          //     });
          //   }
          // },
          {
            text: $i18n.t('btn.save'), // '保存',
            btnclick: () => {
              const _this = this;
              _this.save();
            },
          },
          {
            text: $i18n.t('btn.void'), // '作废',
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.invalid();
            },
          },
          {
            text: $i18n.t('btn.import'), // '导入',
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = {
                tableName: 'ST_C_SEND_RULE',
                objid:
                  _this.$route.params.customizedModuleId == 'New'
                    ? '-1'
                    : _this.$route.params.customizedModuleId,
              };
              _this.$children
                .find((item) => item.name === 'importTable')
                .openConfirm();
            },
          },
          {
            text: $i18n.t('btn.export'), // '导出',
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.warningOk();
            },
          },
          {
            text: $i18n.t('btn.modifyWarehouse'), // '修改仓库',
            disabled: true,
            btnclick: () => {
              const _this = this;
              this.modifyWarehouse.componentData = {
                id:
                  _this.$route.params.customizedModuleId == 'New'
                    ? '-1'
                    : _this.$route.params.customizedModuleId,
              };
              this.$children
                .find((item) => item.name === 'modifyWarehouse')
                .openConfirm();
            },
          },
          {
            text: $i18n.t('btn.refresh'), // '刷新',
            disabled: true,
            btnclick: () => {
              const _this = this;
              _this.refresh();
            },
          },
          {
            text: $i18n.t('btn.back'), // '返回',
            btnclick: () => {
              $omsUtils.tabCloseAppoint(this);
              const _this = this;
              _this.$store.commit('global/tabOpen', {
                type: 'S',
                tableName: 'ST_C_SEND_RULE',
                tableId: 24606,
              });
            },
          },
        ],
      },
      jordanTableConfig: {
        businessFormConfig: {
          formValue: {
            SEND_RATE: '',
            RANK: '',
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
                name: $i18n.t('form_label.warehouse'), // '仓库',
                readonly: false,
                reftable: 'CP_C_PHY_WAREHOUSE',
                reftableid: 24486,
                row: 1,
                statsize: -1,
                type: 'STRING',
                valuedata: '',
              },
            },
            {
              style: 'input',
              label: $i18n.t('form_label.a2'), // '仓库优先级',
              value: 'RANK',
              width: '6',
              inputenter: () => {
                const _this = this;
                _this.saveWherehouseAdd();
              },
            },
            {
              style: 'input',
              label: $i18n.t('form_label.a3'), // '发货比例',
              value: 'SEND_RATE',
              width: '6',
              inputenter: () => {
                const _this = this;
                _this.saveWherehouseAdd();
              },
            },
          ],
          ruleValidate: {
            RANK: [{ required: true, message: ' ', trigger: 'blur' }],
            SEND_RATE: [{ required: true, message: ' ', trigger: 'blur' }],
          },
        }, // 表单配置
        columns: [
          {
            key: 'CP_C_PHY_WAREHOUSE_ENAME',
            title: $i18n.t('form_label.warehouse'), // '仓库'
          },
          {
            key: 'RANK',
            title: $i18n.t('form_label.a2'), // '仓库优先级'
          },
          {
            key: 'SEND_RATE',
            title: $i18n.t('form_label.a3'), // '发货比例'
          },
          {
            key: 'QTY_SEND',
            title: $i18n.t('form_label.a4'), // '发货数量'
          },
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
        pageSize: 15, // 每页条数
      },
      labelList: [
        {
          label: $i18n.t('form_label.a5'), // '按收货地址',
          value: '1',
          isShow: true,
        },
      ],
      labelDefaultValue: '1',
      selectAllList: [],
      statusName: '',
      warningModal: false,
      btnTxetArr: [],
    };
  },
  mounted() {
    const _this = this;
    // [修改仓库,导入,导出,作废,刷新]
    _this.btnTxetArr = [
      $i18n.t('btn.modifyWarehouse'),
      $i18n.t('btn.import'),
      $i18n.t('btn.export'),
      $i18n.t('btn.void'),
      $i18n.t('btn.refresh'),
    ];
    if (_this.$route.params.customizedModuleId !== 'New') {
      // [规则名称,类型]
      const formLabelArr = [
        $i18n.t('form_label.ruleName'),
        $i18n.t('form_label.type'),
      ];
      _this.information.formData.forEach((item) => {
        if (formLabelArr.includes(item.label)) {
          item.disabled = true;
        }
      });
      this.btnConfig.buttons.forEach((item) => {
        if (_this.btnTxetArr.includes(item.text)) {
          item.disabled = false;
        }
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
          _this.$Message.error($i18n.t('modalTips.cp')); // '规则名称必填'
          return;
        }
        if (!ETYPE) {
          _this.$Message.error($i18n.t('modalTips.cq')); // '规则类型必填'
          return;
        }
      }
      if (
        !_this.theadArr.length &&
        ETYPE === '1' &&
        _this.$route.params.customizedModuleId !== 'New'
      ) {
        _this.$Message.error($i18n.t('modalTips.cr')); // '请先设置仓库'
        return;
      }
      _this.saveLoading = true;
      _this.name = '';
      _this.query = '';
      const formData = new FormData();
      const cloneListArr = JSON.parse(JSON.stringify(_this.listArr));
      if (cloneListArr.length) {
        cloneListArr.forEach((item) => {
          item.WAREHOUSE_RANK.forEach((data) => {
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
            ETYPE,
          },
          ST_C_SEND_RULE_ADDRESS_RENT: [],
          ST_C_SEND_RULE_WAREHOUSE_RATE: [],
          ST_C_SEND_RULE_ADDRESS_RANK_RESULT: ETYPE !== '3' ? cloneListArr : [],
          ST_C_SEND_RULE_ADDRESS_VIP_RESULT: ETYPE === '3' ? cloneListArr : [],
        },
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
      };
      formData.append('param', JSON.stringify(param));
      this.service.strategyPlatform.saveSendRule(formData).then((res) => {
        _this.saveLoading = false;
        if (res.data.data.code === 0) {
          _this.$Message.success($i18n.t('modalTips.z9')); // '保存成功'
          if (_this.$route.params.customizedModuleId !== 'New') {
            if (ETYPE === '2') _this.getWarehouseRateResult();
            else if (ETYPE === '1' || ETYPE === '3') _this.getTree();
          } else {
            this.$store.commit('customize/TabHref', {
              id: res.data.data.data.objid, // 单据id
              type: 'action', // 类型action
              name: 'sendSingleRule', // 文件名
              label: $i18n.t('panel_label.edit_order_dispatch_rule'), // '订单派单规则编辑', // tab中文名
              query: Object.assign({
                id: res.data.data.data.objid, // 单据id
                tabTitle: $i18n.t(
                  'panel_label.edit_order_dispatch_rule'
                ), // '订单派单规则编辑' // tab中文名
              }), // 带的参数
            });
          }
        } else {
          // _this.$Message.success(res.data.data.message || $i18n.t('modalTips.y0')); // '保存失败'
        }
      });
    },
    // 明细保存
    saveWherehouseAdd() {
      const _this = this;
      if (_this.$route.params.customizedModuleId == 'New') {
        _this.$Message.info($i18n.t('modalTips.cu')); // '请先保存主表信息'
        return;
      }
      if (
        !_this.jordanTableConfig.businessFormConfig.formData[0].itemdata.pid
      ) {
        _this.$Message.error($i18n.t('modalTips.cv')); // '仓库必填'
        return;
      }
      if (!_this.information.formValue.ETYPE) {
        _this.$Message.error($i18n.t('modalTips.cw')); // '仓库优先级必填必填'
        return;
      }

      const formData = new FormData();
      const param = {
        fixcolumn: {
          ST_C_SEND_RULE: {},
          ST_C_SEND_RULE_ADDRESS_RENT: [],
          ST_C_SEND_RULE_WAREHOUSE_RATE: [
            {
              CP_C_PHY_WAREHOUSE_ID:
                _this.jordanTableConfig.businessFormConfig.formData[0].itemdata
                  .pid,
              RANK: _this.jordanTableConfig.businessFormConfig.formValue.RANK,
              SEND_RATE:
                _this.jordanTableConfig.businessFormConfig.formValue.SEND_RATE,
              ID: -1,
            },
          ],
          ST_C_SEND_RULE_ADDRESS_RANK_RESULT: [],
        },
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
      };
      formData.append('param', JSON.stringify(param));
      this.service.strategyPlatform.saveSendRule(formData).then((res) => {
        if (res.data.data.code === 0) {
          _this.$Message.success($i18n.t('modalTips.cx')); // '新增成功'
          _this.getWarehouseRateResult();
          _this.jordanTableConfig.businessFormConfig.formData[0].itemdata.pid =
            '';
          _this.jordanTableConfig.businessFormConfig.formData[0].itemdata.valuedata =
            '';
          _this.jordanTableConfig.businessFormConfig.formValue.RANK = '';
          _this.jordanTableConfig.businessFormConfig.formValue.SEND_RATE = '';
        } else {
          // _this.$Message.error(res.data.data.message || $i18n.t('modalTips.cy')); // '新增失败'
        }
      });
    },
    // 获取主表信息
    getMianTable() {
      const _this = this;
      _this.saveLoading = true;
      this.service.strategyPlatform
        .getSendRuleMain({
          objid:
            _this.$route.params.customizedModuleId == 'New'
              ? '-1'
              : _this.$route.params.customizedModuleId,
        })
        .then((res) => {
          _this.saveLoading = false;
          if (res.data.code === 0) {
            _this.information.formValue.ENAME = res.data.data.ENAME;
            _this.information.formValue.ETYPE = res.data.data.ETYPE;
            _this.information.formValue.REMARK = res.data.data.REMARK;
            if (res.data.data.ISACTIVE === 'N') {
              _this.statusName = $i18n.t('common.voided'); // '已作废';
              _this.jordanTableConfig.isShowImportBtn = false;
              _this.jordanTableConfig.isShowExportBtn = false;
              _this.jordanTableConfig.isShowDeleteDetailBtn = false;
              _this.jordanTableConfig.businessFormConfig = {};
              // [修改仓库,导入,导出,作废,保存]
              _this.btnTxetArr.splice(-1, 1, $i18n.t('btn.save'));
              _this.btnConfig.buttons.forEach((item) => {
                if (_this.btnTxetArr.includes(item.text)) {
                  item.disabled = true;
                }
              });
            }
            if (
              _this.information.formValue.ETYPE === '1' ||
              _this.information.formValue.ETYPE === '3'
            ) {
              _this.showFlag = false;
              setTimeout(() => {
                _this.setTableHeight();
              }, 100);
              _this.getTree();
              // '按收货地址' : '派单规则明细'
              this.labelList[0].label =
                _this.information.formValue.ETYPE === '1'
                  ? $i18n.t('form_label.a5')
                  : $i18n.t('form_label.a6');
            } else if (_this.information.formValue.ETYPE === '2') {
              _this.showFlag = true;
              _this.getWarehouseRateResult();
              // [修改仓库,导入,导出]
              _this.btnTxetArr.splice(-1, 2);
              _this.btnConfig.buttons.forEach((item) => {
                if (_this.btnTxetArr.includes(item.text)) {
                  item.disabled = true;
                }
              });
              // '分仓比例'
              this.labelList[0].label = $i18n.t('form_label.a7');
            }
          }
        });
    },
    // 获取收货地址列表数据
    getWarehouseRateResult() {
      const _this = this;
      _this.jordanTableConfig.loading = true;
      this.service.strategyPlatform
        .getWarehouseRateResultTable({
          objid:
            _this.$route.params.customizedModuleId == 'New'
              ? '-1'
              : _this.$route.params.customizedModuleId,
        })
        .then((res) => {
          _this.jordanTableConfig.loading = false;
          if (res.data.code === 0) {
            _this.jordanTableConfig.data = res.data.data;
          }
        });
    },
    // 获取树
    async getTree() {
      const _this = this;
      const param = {
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
      };
      const ETYPE = _this.information.formValue.ETYPE;
      const query =
        ETYPE === '1'
          ? _this.service.strategyPlatform.getSendRuleTree
          : _this.strategyPlatform.getSendRuleVipWarehouseTree;
      // const url = ETYPE === '1' ? '/p/cs/getSendRuleTree' : '/p/cs/getSendRuleVipWarehouseTree';
      try {
        const { data } = await query(param);
        if (data.code === 0) {
          const treeData = data.data.sendRuleTree || [];
          _this.treeData = treeData;
          this.synchronous();
          if (
            data.data.sendRuleAddressRents !== null &&
            data.data.sendRuleAddressRents.length
          ) {
            this.theadArr = [];
            data.data.sendRuleAddressRents.forEach((item) => {
              this.theadArr.push({
                name: item.CP_C_PHY_WAREHOUSE_ENAME,
              });
            });
          } else {
            this.theadArr = [];
          }
        }
      } finally {
      }
    },
    // 全选树
    checkAll(e) {
      if (e) {
        this.treeData.forEach((item) => {
          item.checked = true;
        });
      } else {
        this.treeData.forEach((item) => {
          item.checked = false;
        });
      }
    },
    // 同步
    async synchronous() {
      const _this = this;
      const ETYPE = _this.information.formValue.ETYPE;
      _this.listArr = [];
      _this.tableLoading = true;
      const treeList = [];
      _this.treeData.forEach((item) => {
        if (item.checked) {
          treeList.push({
            id: item.id,
            regiontype: item.regiontype,
          });
        }
      });
      const param = {
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
        treeNode: treeList,
      };
      const query =
        ETYPE === '1'
          ? _this.service.strategyPlatform.getWarehouseRankResultTable
          : _this.service.strategyPlatform.getVipWarehouseRankResultTable;
      // const url = ETYPE === '1' ? '/p/cs/getWarehouseRankResultTable' : '/p/cs/getVipWarehouseRankResultTable';
      const { data } = await query(param);
      _this.tableLoading = false;
      if (data.code === 0) {
        const listArr = data.data !== undefined ? data.data : [];
        listArr.forEach((item) => {
          item.WAREHOUSE_RANK = JSON.parse(item.WAREHOUSE_RANK);
        });
        _this.listArr = listArr;
      }
    },
    inputBlur(item, rank, index) {
      for (let i = 0; i < item.length; i++) {
        if (!rank.rank) return;
        if (
          item[i].warehouseEcode !== rank.warehouseEcode &&
          item[i].rank === rank.rank
        ) {
          setTimeout(() => {
            item[index].rank = '';
            this.$Message.info($i18n.t('modalTips.y9')); // '优先级设置重复'
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
      const param = {
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
        treeLikeKey: e,
      };
      this.service.strategyPlatform
        .getLikeRankResultTable(param)
        .then((res) => {
          _this.tableLoading = false;
          if (res.data.code === 0) {
            _this.listArr =
              res.data.data.sendRuleAddressRanks !== undefined
                ? res.data.data.sendRuleAddressRanks
                : [];
            _this.listArr.forEach((item) => {
              item.WAREHOUSE_RANK = JSON.parse(item.WAREHOUSE_RANK);
            });
            _this.treeData = res.data.data.sendRuleTree;
          } else {
            // _this.$Message.error(res.data.data.message || $i18n.t('modalTips.z3')); // '失败'
          }
        });
    },
    // 作废
    invalid() {
      const _this = this;
      _this.saveLoading = true;
      const fromdata = new FormData();
      const param = {
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.strategyPlatform.voidSendRule(fromdata).then((res) => {
        _this.saveLoading = false;
        if (res.data.data.code === 0) {
          const ess = res.data.data.message || $i18n.t('modalTips.y4'); // '作废成功';
          _this.getMianTable();
          _this.$Message.success(ess);
        } else {
          // const err = res.data.data.message || $i18n.t('modalTips.y5'); // '作废失败';
          // _this.$Message.error(err);
        }
      });
    },
    tableImport() {
      const _this = this;
      _this.importTable.componentData = {
        tableName: 'ST_C_SEND_RULE_RATE',
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
      };
      _this.$children.find((item) => item.name === 'importTable').openConfirm();
    },
    tableExport() {
      const _this = this;
      const param = {
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
      };
      this.service.strategyPlatform
        .exportSendRuleWarehouseRate(param)
        .then((res) => {
          if (res.data.code === 0) {
            const ess = res.data.message || $i18n.t('modalTips.z2'); // '导出成功';
            _this.$Message.success(ess);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            // const err = res.data.message || $i18n.t('modalTips.y6'); // '导出失败';
            // _this.$Message.error(err);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          }
        });
    },
    DeleteDetail() {
      const _this = this;
      const ids = [];
      if (_this.selectAllList.length) {
        _this.selectAllList.forEach((item) => ids.push(item.ID));
      } else {
        _this.$Message.error($i18n.t('modalTips.df')); // '请选择需要删除的数据'
        return;
      }
      const fromdata = new FormData();
      const param = {
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
        tabitem: {
          ST_C_SEND_RULE_WAREHOUSE_RATE: ids,
        },
      };
      fromdata.append('param', JSON.stringify(param));
      this.service.strategyPlatform.delSendRule(fromdata).then((res) => {
        if (res.data.data.code === 0) {
          const ess = res.data.data.message || $i18n.t('modalTips.ay'); // '删除成功';
          _this.getMianTable();
          _this.$Message.success(ess);
        } else {
          // const err = res.data.data.message || $i18n.t('modalTips.cs'); // '删除失败';
          // _this.$Message.error(err);
        }
      });
    },
    // 导出确认
    warningOk() {
      const _this = this;
      const treeList = [];
      this.treeData.forEach((item) => {
        if (item.checked) {
          treeList.push({
            id: item.id,
            regiontype: item.regiontype,
          });
        }
      });
      const param = {
        objid:
          _this.$route.params.customizedModuleId == 'New'
            ? '-1'
            : _this.$route.params.customizedModuleId,
        treeNode: treeList,
      };
      this.service.strategyPlatform
        .exportSendRuleWarehouseRank(param)
        .then((res) => {
          if (res.data.code === 0) {
            const ess = res.data.message || $i18n.t('modalTips.z2'); // '导出成功';
            _this.$Message.success(ess);
            publicMethodsUtil.downloadUrlFile(res.data.data);
          } else {
            // const err = res.data.message || $i18n.t('modalTips.y6'); // '导出失败';
            // _this.$Message.error(err);
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
      const contentHeight = document.getElementById('content').clientHeight;
      let logisticsAreaHeight = 0;
      this.$nextTick(() => {
        logisticsAreaHeight += document.getElementsByClassName('one_button')[0]
          .clientHeight;
        logisticsAreaHeight += document.getElementsByClassName('jordanLabel')[0]
          .clientHeight;
        logisticsAreaHeight += document.getElementsByClassName('jordanLabel')[0]
          .clientHeight;
      });
      const tableHeight = contentHeight - logisticsAreaHeight;
      const Theight = document.getElementsByClassName('tableBox')[0];
      Theight.style = `height: ${tableHeight - 240}px;`;
    },
    paperScroll(e) {
      const sLefts = document.getElementById('fixedDiv');
      sLefts.setAttribute('style', `margin-left: ${-e.target.scrollLeft}px`);
    },
  },
};
