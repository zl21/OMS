import BC from 'burgeonComponents';
const { Components } = BC

export default {
  data() {
    return {
      warningModal: false,
      loading: false,
      tableLoading: false,
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        // confirmTitle: '导入',
        confirmTitle: $it('modalTitle.import'),
        titleAlign: 'left', // 设置标题是否居中 center left
        width: '652',
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
        componentData: {}
      },
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            // text: '保存',
            text: $it('btn.save'), // 按钮文本
            disabled: false,
            btnclick: () => {
              const _this = this;
              _this.save();
            }
          },
          {
            // text: '作废',
            text: $it('btn.void'), // 按钮文本
            disabled: false,
            btnclick: () => {
              const _this = this;
              _this.invalid();
            }
          },
          {
            // text: '导入',
            text: $it('btn.import'), // 按钮文本
            disabled: false,
            btnclick: () => {
              const _this = this;
              _this.importTable.componentData = {
                tableName: 'ST_C_EXPRESS_AREA',
                objid: _this.$route.params.customizedModuleId
              };
              console.log(_this.$children);
              _this.$children.find(item => item.name === 'importTable').openConfirm();
            }
          },
          {
            // text: '导出',
            text: $it('btn.export'), // 按钮文本
            disabled: false,
            btnclick: () => {
              const _this = this;
              _this.warningModal = true;
            }
          },
          {
            // text: '刷新',
            text: $it('btn.refresh'), // 按钮文本
            btnclick: () => {
              const _this = this;
              _this.getTree('', this._objid);
            }
          },
          {
            // text: '返回',
            text: $it('btn.back'), // 按钮文本
            btnclick: () => {
              $omsUtils.tabCloseAppoint(this);
              R3.store.commit('global/tabOpen', {
                type: 'S',
                tableId: 24639,
                tableName: 'ST_C_EXPRESS_AREA',
                label: $it('panel_label.logisticsAreaSetting'), // label: '物流区域设置',
                back: true
              });
            }
          }
        ]
      },
      information: {
        formValue: {
          REMARK: '',
          CP_C_LOGISTICS_ENAME: ''
        },
        formData: [
          {
            style: 'popInput',
            width: '6',
            itemdata: {
              col: 1,
              colid: 169323,
              colname: 'CP_C_LOGISTICS_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              fkdesc: '物流公司',
              inputname: 'CP_C_LOGISTICS_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $it('form_label.logisticsCompany'), // 物流公司
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_LOGISTICS', // 对应的表
              reftableid: 24411, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '' // 这个是选择的值
            },
          },
          {
            style: 'input',
            // label: '备注',
            label: $it('table_label.remarks'),
            value: 'REMARK',
            width: '6'
          }
        ],
        ruleValidate: {
          BUYER_NICK: [{ required: true, message: ' ', trigger: 'blur' }]
        }
      },
      labelList: [
        {
          // label: '区域明细',
          label: $it('form_label.region_details'),
          value: '1',
          isShow: true
        }
      ],
      labelDefaultValue: '1',
      treeData1: [],
      treeData2: [],
      dataArr: [],
      isDelivery: false,
      openDefault: '1',
      query: '',
      query2: '',
      name: '',
      name2: '',
      single: false,
      tableSize: 0,
      statusName: '',
      _objid: -1,
    };
  },
  async mounted() {
    if (this.$route.params.customizedModuleId == 'New') {
      this._objid = -1;
    } else {
      this._objid = this.$route.params.customizedModuleId;
      this.information.formData[0].itemdata.readonly = true;
      await this.setTableHeight();
      await this.getTree('', this._objid);
      await this.synchronous();
    }
  },
  methods: {
    // 保存
    async save() {
      const _this = this;
      if (_this.information.formData[0].itemdata.pid === undefined || !_this.information.formData[0].itemdata.pid) {
        _this.$Message.warning($it('modalTips.em'));
        return;
      }
      // if (_this.tableSize > 1000) return _this.$Message.error('数量过大，请使用导入功能设置是否到达');
      if (_this.tableSize > 1000) {
        _this.$Message.error($it('modalTips.y3'));
        return;
      }
      _this.dataArr.forEach(item => {
        if (item.IS_ARRIVE) {
          item.IS_ARRIVE = 'Y';
        } else {
          item.IS_ARRIVE = 'N';
        }
      });
      _this.loading = true;
      _this.name2 = '';
      _this.query2 = '';
      const formData = new FormData();
      const param = {
        fixcolumn: {
          ST_C_EXPRESS_AREA: {
            CP_C_LOGISTICS_ID: _this.information.formData[0].itemdata.pid,
            REMARK: _this.information.formValue.REMARK
          },
          ST_C_EXPRESS_AREA_ITEM: _this.dataArr
        },
        objid: _this._objid,
      };
      formData.append('param', JSON.stringify(param));
      // 保存
      const {
        data: {
          data: { code, message, data }
        }
      } = await this.service.strategyPlatform.expressAreaSaveCmd(formData);
      _this.loading = false;
      _this.dataArr = [];
      if (code === 0) {
        _this.$Message.success(message);
        _this.getTree('', data.objid);
        this.$store.commit('customize/TabHref', {
          id: data.objid, // 单据id
          type: 'action', // 类型action
          name: 'logisticsArea', // 文件名
          label: $it('panel_label.logisticsAreaSetting'), // 物流区域设置
          query: Object.assign({
            id: data.objid, // 单据id
            tabTitle: $it('panel_label.logisticsAreaSetting') // 物流区域设置
          }) // 带的参数
        });
        this.synchronous();
      } else {
        const err = message || $it('modalTips.y0'); // '保存失败';
        _this.$Message.error(err);
        this.synchronous();
      }
    },
    // 作废
    async invalid() {
      const _this = this;
      _this.loading = true;
      const formData = new FormData();
      const param = { objid: _this._objid };
      formData.append('param', JSON.stringify(param));
      const {
        data: {
          data: { code, message, data }
        }
      } = await this.service.strategyPlatform.expressAreaVoidCmd(formData);
      console.log(code, message, data);
      _this.loading = false;
      if (code === 0) {
        const ess = message || $it('modalTips.y4'); // 作废成功
        _this.getTree('', _this._objid);
        _this.$Message.success(ess);
      } else {
        const err = message || $it('modalTips.y5'); // 作废失败
        _this.$Message.error(err);
      }
    },
    // 获取树
    async getTree(save, objid) {
      const _this = this;
      _this.loading = true;
      objid = objid || _this._objid;
      const {
        data: { code, data }
      } = await this.service.strategyPlatform.getExpressAreaTree({
        objid
      });
      _this.loading = false;
      if (code === 0) {
        const treeList = JSON.parse(JSON.stringify(data.expressAreaTree));
        _this.treeData1 = data.expressAreaTree;
        _this.treeData2 = treeList;
        _this.information.formData[0].itemdata.pid = data.expressArea.CP_C_LOGISTICS_ID;
        _this.information.formData[0].itemdata.valuedata = data.expressArea.CP_C_LOGISTICS_ENAME;
        _this.information.formValue.REMARK = data.expressArea.REMARK;
        this.treeData1.forEach(item => {
          item.disableCheckbox = true;
          item.children.forEach(list => {
            list.disableCheckbox = true;
            list.children.forEach(data => {
              data.disableCheckbox = true;
            });
          });
        });
        if (data.expressArea.ISACTIVE === 'N') {
          _this.statusName = '已作废';
          const btnTxetArr = [$it('btn.save'), $it('btn.void'), $it('btn.import'), $it('btn.export'), $it('btn.refresh')];
          _this.btnConfig.buttons.forEach(item => {
            // ['保存', '作废', '导入', '导出', '刷新']
            if (btnTxetArr.includes(item.text)) {
              item.disabled = true;
            }
          });
        }
        if (save === 'import') {
          _this.synchronous();
        }
      }
    },
    // 全选树
    checkAll(e) {
      if (e) {
        this.treeData2.forEach(item => {
          // item.checked = true;
          item.children.forEach(list => {
            list.checked = true;
            list.children.forEach(data => {
              data.checked = true;
            });
          });
        });
      } else {
        this.treeData2.forEach(item => {
          item.checked = false;
          item.children.forEach(list => {
            list.checked = false;
            list.children.forEach(data => {
              data.checked = false;
            });
          });
        });
      }
    },
    // 省市区搜索
    enter(e) {
      this.treeData1.forEach(item => {
        item.expand = false;
        item.children.forEach(list => {
          list.expand = false;
          list.children.forEach(data => {
            data.expand = false;
          });
        });
      });
      this.query = e;
      this.treeData1.forEach(item => {
        item.children.forEach(list => {
          if (list.title.indexOf(`${e}`) != -1) {
            item.expand = true;
          }
          list.children.forEach(data => {
            if (data.title.indexOf(`${e}`) != -1) {
              item.expand = true;
              list.expand = true;
            }
          });
        });
      });
      // this.data1 = this.data1;
    },
    async enter2(e) {
      const _this = this;
      _this.listArr = [];
      _this.tableLoading = true;
      // const {customizedModuleName}=this.$router.currentRoute.params;
      // this.$R3loading.show(customizedModuleName);
      const param = { objid: _this._objid, treeLikeKey: e };
      const {
        // data: { code, message, data }
        data: { code, data }
      } = await this.service.strategyPlatform.getExpressAreaItemLikeTable(param);
      _this.tableLoading = false;
      // this.$R3loading.hide(customizedModuleName);
      if (code === 0) {
        _this.cityThead = true;
        _this.dataArr = data.ST_C_EXPRESS_AREA_ITEM_RESULT !== undefined ? data.ST_C_EXPRESS_AREA_ITEM_RESULT : [];
        _this.treeData2 = data.REGION_TREE_RESULT;
        _this.dataArr.forEach(item => {
          if (item.IS_ARRIVE === 'Y') item.IS_ARRIVE = true;
          else if (item.IS_ARRIVE === 'N') item.IS_ARRIVE = false;
        });
        _this.query2 = e;
        _this.treeData2.forEach(item => {
          if (item.children.length) {
            item.children.forEach(list => {
              if (list.title.indexOf(`${e}`) != -1) {
                item.expand = true;
              }
              list.children.forEach(data => {
                if (data.title.indexOf(`${e}`) != -1) {
                  item.expand = true;
                  list.expand = true;
                }
              });
            });
          }
        });
      } else {
        // _this.$Message.error(message || $it('modalTips.z3')); // 失败
      }
    },
    // 同步table数据
    async synchronous() {
      const _this = this;
      const { customizedModuleName } = this.$router.currentRoute.params;
      _this.tableLoading = true;
      // this.$R3loading.show(customizedModuleName);
      _this.dataArr = [];
      const treeList = [];
      this.treeData2.forEach(item => {
        if (!item.children.length && item.checked) {
          treeList.push({
            id: item.id,
            regiontype: item.regiontype
          });
        }
        item.children.forEach(list => {
          if (!list.children.length && list.checked) {
            treeList.push({
              id: list.id,
              regiontype: list.regiontype
            });
          }
          list.children.forEach(data => {
            if (data.checked) {
              treeList.push({
                id: data.id,
                regiontype: data.regiontype
              });
            }
          });
        });
      });
      // 明细
      const params = {
        objid: this._objid,
        treeNode: treeList
      };
      const {
        data: { code, data }
      } = await this.service.strategyPlatform.getExpressAreaItemTable(params);
      _this.tableLoading = false;
      // this.$R3loading.hide(customizedModuleName);
      if (code === 0 && data !== null) {
        if (data.ST_C_EXPRESS_AREA_ITEM_RESULT.length) _this.dataArr = data.ST_C_EXPRESS_AREA_ITEM_RESULT;
        _this.tableSize = data.TABLE_SIZE;
        _this.dataArr.forEach(item => {
          if (item.IS_ARRIVE === 'Y') item.IS_ARRIVE = true;
          else if (item.IS_ARRIVE === 'N') item.IS_ARRIVE = false;
        });
      } else {
        _this.tableSize = 0;
      }
    },
    selectChange(e) {
      console.log(e);
    },
    toggleExpand(e) {
      console.log(e);
      console.log(this.data1);
    },
    // 全选是否到达
    handleAllChange(e) {
      if (e) {
        this.dataArr.forEach(item => {
          item.IS_ARRIVE = true;
        });
      } else {
        this.dataArr.forEach(item => {
          item.IS_ARRIVE = false;
        });
      }
    },
    // 是否到达
    isDeliveryChange() {
      if (this.dataArr.every(i => i.IS_ARRIVE === true)) this.isDelivery = true;
      else if (this.dataArr.every(i => i.IS_ARRIVE === false)) this.isDelivery = false;
    },
    // 导出
    async warningOk() {
      const _this = this;
      _this.warningModal = false;
      const treeList = [];
      this.treeData2.forEach(item => {
        item.children.forEach(list => {
          list.children.forEach(data => {
            if (data.checked) {
              treeList.push({
                id: data.id,
                regiontype: data.regiontype
              });
            }
          });
        });
      });
      const param = {
        objid: _this._objid,
        treeNode: treeList
      };
      // 导出
      const {
        data: { code, message, data }
      } = await this.service.strategyPlatform.exportExpressAreaItem(param);
      console.log(code, message, data);
      if (code === 0) {
        const ess = message || $it('modalTips.z2'); // 导出成功
        _this.$Message.success(ess);
        $omsUtils.downloadUrlFile(data);
      } else {
        // const err = message || $it('modalTips.y6'); // 导出失败
        // _this.$Message.success(err);
        $omsUtils.downloadUrlFile(data);
      }
    },
    // 设置表格高度
    setTableHeight() {
      const contentHeight = document.getElementById('content').clientHeight;
      let logisticsAreaHeight = 0;
      this.$nextTick(() => {
        logisticsAreaHeight += document.getElementsByClassName('one_button')[0].clientHeight;
        logisticsAreaHeight += document.getElementsByClassName('tableTop')[0].clientHeight;
        logisticsAreaHeight += document.getElementsByClassName('jordanLabel')[0].clientHeight;
      });
      const tableHeight = contentHeight - logisticsAreaHeight;
      const Theight = document.getElementsByClassName('tableBox')[0];
      Theight.style = `height: ${tableHeight - 250}px;`;
    }
  }
};
