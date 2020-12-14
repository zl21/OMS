import businessButton from 'professionalComponents/businessButton.vue';
import businessForm from 'professionalComponents/businessForm.vue';
import businessLabel from 'professionalComponents/businessLabel.vue';
import businessModal from 'professionalComponents/businessDialog.vue';
import publicMethodsUtil from '@/assets/js/public/publicMethods';
import businessStatusFlag from 'professionalComponents/businessStatusFlag.vue';
import { setTimeout } from 'timers';
import comUtils from '@/assets/js/__utils__/common';
import loading from '@/component/loading.vue';

export default {
  components: {
    businessButton,
    businessForm,
    businessLabel,
    businessModal,
    businessStatusFlag,
    loading
  },
  data() {
    return {
      vmI18n: window.vmI18n,
      warningModal: false,
      saveModal: false,
      saveModalText: '', // 保存空物流提示
      isSaveLoading: false,
      tableLoading: false,
      cityThead: true,
      // 弹框配置 导入
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '600',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'importTable', // 组件名称
        url: 'modal/publicDialog/importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {}
      },
      // 修改物流
      modifyLogistics: {
        refFuns: 'confirmFun',
        // confirmTitle: "请选择物流公司",
        confirmTitle: '',
        titleAlign: 'center', // 设置标题是否居中 center left
        width: '760',
        scrollable: false, // 是否可以滚动
        closable: true, // 是否可以按esc关闭
        draggable: true, // 是否可以拖动
        mask: true, // 是否显示遮罩层
        maskClosable: true, // 是否可以点击叉号关闭
        transfer: true, // 是否将弹层放在body内
        name: 'modifyLogistics', // 组件名称
        url: 'modal/strategyPlatform/setWarehouseLogistics/modifyLogistics',
        keepAlive: true,
        excludeString: 'modifyLogistics', // 将name传进去，确认不缓存
        componentData: {}
      },
      btnConfig: {
        typeAll: 'error',
        buttons: []
      },
      information: {
        formValue: {
          REMARK: '',
          CP_C_LOGISTICS_ENAME: ''
        },
        formData: [],
        ruleValidate: {
          BUYER_NICK: [{ required: true, message: ' ', trigger: 'blur' }]
        }
      },
      labelList: [],
      labelDefaultValue: '1',
      openDefault: '1',
      name: '',
      query: '',
      treeData: [],
      theadArr: [],
      listArr: [],
      single: false,
      statusName: ''
    };
  },
  mounted() {
    this.labelList = [
      {
        // label: "区域明细",
        label: this.vmI18n.t('form_label.region_details'),
        value: '1',
        isShow: true
      }
    ];
    this.btnConfig.buttons = [
      // {
      //   // text: "新增",
      //   text: this.vmI18n.t('btn.add'), // 按钮文本
      //   btnclick: () => {
      //     const _this = this;
      //     _this.$store.commit('customize/TabHref', {
      //       id: -1, // 单据id
      //       type: 'action', // 类型action
      //       name: 'setWarehouseLogistics', // 文件名
      //       // label: "仓库物流优先级设置", // tab中文名
      //       label: this.vmI18n.t('panel_label.setWarehouseLogistics'),
      //       query: Object.assign({
      //         id: -1, // 单据id
      //         // tabTitle: "仓库物流优先级设置", // tab中文名
      //         tabTitle: this.vmI18n.t('panel_label.setWarehouseLogistics')
      //       }) // 带的参数
      //     });
      //   }
      // },
      {
        // text: "保存",
        text: this.vmI18n.t('btn.save'), // 按钮文本
        btnclick: () => {
          const _this = this;
          if (this.$route.params.customizedModuleId !== 'New') {
            if (_this.listArr.length == 0) {
              // _this.$Message.warning("请选择物流区域!");
              _this.$Message.warning(this.vmI18n.t('modalTips.y7'));
              return;
            }
            if (_this.theadArr.length == 0) {
              // _this.$Message.warning("请选择区域物流!");
              _this.$Message.warning(this.vmI18n.t('modalTips.y7'));
              return;
            }
            if (_this.listArr.length > 0) {
              let text = '';
              _this.listArr.forEach(item => {
                let flag = true;
                item.LOGISTICS_RANK.forEach(i => {
                  if (i.rank != '') {
                    flag = false;
                  }
                });
                if (flag) {
                  text += `${item.CP_C_REGION_CITY_ENAME || item.CP_C_REGION_PROVINCE_ENAME},`;
                }
              });
              if (text) {
                // _this.saveModalText = `${text}的物流优先级为空,保存会导致该数据删除,是否确认保存?`;
                _this.saveModalText = `${text}${this.vmI18n.t('modalTips.y8')}`;
                _this.saveModal = true;
              } else {
                _this.save();
              }
            }
          } else {
            _this.save();
          }
        }
      },
      {
        // text: "作废",
        text: this.vmI18n.t('btn.void'), // 按钮文本
        disabled: true,
        btnclick: () => {
          const _this = this;
          _this.invalid();
        }
      },
      {
        // text: "导入",
        text: this.vmI18n.t('btn.import'), // 按钮文本
        disabled: true,
        btnclick: () => {
          const _this = this;
          _this.importTable.componentData = {
            tableName: 'ST_C_WAREHOUSE_LOGISTICS',
            objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId
          };
          _this.$children.find(item => item.name === 'importTable').openConfirm();
        }
      },
      {
        // text: "导出",
        text: this.vmI18n.t('btn.export'), // 按钮文本
        disabled: true,
        btnclick: () => {
          const _this = this;
          _this.warningOk();
        }
      },
      {
        // text: "修改物流",
        text: this.vmI18n.t('btn.modify_logistics'), // 按钮文本
        disabled: true,
        btnclick: () => {
          this.modifyLogistics.componentData = { id: this.$route.params.customizedModuleId == 'New' ? '-1' : this.$route.params.customizedModuleId };
          this.$children.find(item => item.name === 'modifyLogistics').openConfirm();
        }
      },
      {
        // text: "刷新",
        text: this.vmI18n.t('btn.refresh'), // 按钮文本
        disabled: true,
        btnclick: () => {
          const _this = this;
          _this.refresh();
        }
      },
      {
        // text: "返回",
        text: this.vmI18n.t('btn.back'), // 按钮文本
        btnclick: () => {
          const _this = this;
          comUtils.tabCloseAppoint(_this);
          _this.$store.commit('global/tabOpen', {
            type: 'S',
            tableName: 'ST_C_WAREHOUSE_LOGISTICS',
            tableId: 1111113
          });
        }
      }
    ];
    this.information.formData = [
      {
        style: 'popInput',
        width: '6',
        itemdata: {
          col: 1,
          colid: 168444,
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
          name: this.vmI18n.t('form_label.warehouse'),
          readonly: false,
          refobjid: '14',
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
        label: this.vmI18n.t('table_label.remarks'),
        value: 'REMARK',
        width: '6'
      }
    ];

    if (this.$route.params.customizedModuleId !== 'New') {
      this.information.formData[0].itemdata.readonly = true;
      this.setTableHeight();
      this.refresh();
      this.btnConfig.buttons.forEach(item => {
        // "修改物流" || "作废" || "导入" || "刷新"
        switch (item.text) {
          case this.vmI18n.t('btn.modify_logistics'):
          case this.vmI18n.t('btn.void'):
          case this.vmI18n.t('btn.import'):
          case this.vmI18n.t('btn.refresh'):
            item.disabled = false;
            break;
        }
      });
    }
    window.onresize = () => {
      this.setTableHeight();
    };
    this.importTable.confirmTitle = this.vmI18n.t('modalTitle.import');
    this.modifyLogistics.confirmTitle = this.vmI18n.t('modalTitle.select_logisticsCompany');
  },
  methods: {
    // 保存
    async save() {
      const _this = this;
      if (!_this.information.formData[0].itemdata.pid) return _this.$Message.warning('仓库不能为空!');
      _this.isSaveLoading = true;
      _this.name = '';
      _this.query = '';
      const fromData = new FormData();
      const cloneListArr = JSON.parse(JSON.stringify(_this.listArr));

      if (cloneListArr.length) {
        cloneListArr.forEach(item => {
          item.LOGISTICS_RANK.forEach(data => {
            item[data.rankField] = data.rank;
          });
          item.LOGISTICS_RANK = [];
        });
      }
      const param = {
        fixcolumn: {
          ST_C_WAREHOUSE_LOGISTICS: {
            CP_C_PHY_WAREHOUSE_ID: _this.information.formData[0].itemdata.pid,
            REMARK: _this.information.formValue.REMARK
          },
          ST_C_WAREHOUSE_LOGISTICS_ITEM: [],
          ST_C_WAREHOUSE_LOGISTICS_RANK_RESULT: cloneListArr
        },
        objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId
      };
      fromData.append('param', JSON.stringify(param));
      // 保存
      this.service.strategyPlatform
        .saveWarehouseLogistics(fromData)
        .then(res => {
          _this.isSaveLoading = false;
          if (res.data.oK) {
            _this.$Message.success(window.vmI18n.t('modalTips.z9')); // 保存成功
            if (this.$route.params.customizedModuleId !== 'New') {
              this.refresh();
            } else {
              this.$store.commit('customize/TabHref', {
                id: res.data.data.data.objid, // 单据id
                type: 'action', // 类型action
                name: 'setWarehouseLogistics', // 文件名
                label: window.vmI18n.t('panel_label.setWarehouseLogistics'), // 仓库物流优先级设置
                query: Object.assign({
                  id: res.data.data.data.objid, // 单据id
                  tabTitle: window.vmI18n.t('panel_label.setWarehouseLogistics') // 仓库物流优先级设置
                }) // 带的参数
              });
            }
          } else {
            const err = res.data.data.message || window.vmI18n.t('modalTips.y0'); // 保存失败
            _this.$Message.error(err);
            // _this.refresh();
          }
        })
        .catch(error => {
          const err = error || window.vmI18n.t('modalTips.y0'); // 保存失败
          _this.$Message.error(err);
          // _this.refresh();
        });
    },
    // 获取树
    getTreeData() {
      console.log('getTreeData::');
      const _this = this;
      _this.isSaveLoading = true;
      const param = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId };

      this.service.common.getWarehouseLogisticsTree(param).then(res => {
        _this.isSaveLoading = false;
        if (res.data.code == 0) {
          _this.treeData = res.data.data.warehouseLogisticsTree;
          if (res.data.data.warehouseLogistics) {
            _this.information.formData[0].itemdata.pid = res.data.data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ID;
            _this.information.formData[0].itemdata.valuedata = res.data.data.warehouseLogistics.CP_C_PHY_WAREHOUSE_ENAME;
            _this.information.formValue.REMARK = res.data.data.warehouseLogistics.REMARK;
            if (res.data.data.warehouseLogistics.ISACTIVE === 'N') {
              // _this.statusName = "已作废";
              _this.statusName = _this.vmI18n.t('common.voided');
              _this.btnConfig.buttons.forEach(item => {
                // if (item.text === ("修改物流" || "作废" || "导入" || "导出" || "保存"))
                switch (item.text) {
                  case _this.vmI18n.t('btn.modify_logistics'):
                  case _this.vmI18n.t('btn.void'):
                  case _this.vmI18n.t('btn.import'):
                  case _this.vmI18n.t('btn.refresh'):
                    item.disabled = true;
                    break;
                }
              });
            }
          }
          if (res.data.data.warehouseLogisticsItems && res.data.data.warehouseLogisticsItems.length) {
            _this.theadArr = [];
            res.data.data.warehouseLogisticsItems.forEach(item => {
              _this.theadArr.push({
                name: item.CP_C_LOGISTICS_ENAME
              });
            });
          }
        } else {
          this.theadArr = [];
        }
        // _this.provinceSynchronous();
      });
    },
    // 同步查询
    async synchronous() {
      const _this = this;
      _this.tableLoading = true;
      _this.listArr = [];
      const treeList = [];
      if (this.treeData) {
        this.treeData.forEach(item => {
          item.children.forEach(list => {
            if (list.checked) {
              treeList.push({
                id: list.id,
                regiontype: list.regiontype
              });
            }
          });
        });
      }
      // 接口
      _this.tableLoading = false;
      const params = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId, treeNode: treeList };
      // 接口
      const {
        data: { oK, data }
      } = await this.service.common.getLogisticsRankResultTable(params);
      if (oK) {
        _this.cityThead = true;
        console.log(data);
        if (!data || !data.length) return;
        _this.listArr = data;
        _this.listArr.forEach(item => {
          item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK);
        });
      }
    },
    // 省同步查询
    async provinceSynchronous() {
      const _this = this;
      _this.tableLoading = true;
      _this.listArr = [];
      const treeList = [];
      if (this.treeData) {
        this.treeData.forEach(item => {
          item.children.forEach(list => {
            if (list.checked) {
              treeList.push({
                id: list.id,
                regiontype: list.regiontype
              });
            }
          });
        });
      }
      const params = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId, treeNode: treeList };
      // 接口
      this.service.common.getLogisticsRankResultTable(params).then(res => {
        _this.tableLoading = false;
        if (res.data.oK) {
          _this.cityThead = false;
          _this.listArr = res.data.data !== undefined ? res.data.data : [];
          _this.listArr.forEach(item => {
            item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK);
          });
        }
      });
    },
    // 全选树
    checkAll(e) {
      if (e) {
        this.treeData.forEach(item => {
          item.children.forEach(list => {
            list.checked = true;
          });
        });
      } else {
        this.treeData.forEach(item => {
          item.checked = false;
          item.children.forEach(list => {
            list.checked = false;
          });
        });
      }
    },
    inputBlur(item, rank, index) {
      for (let i = 0; i < item.length; i++) {
        if (!rank.rank) return;
        if (item[i].logisticsEcode !== rank.logisticsEcode && item[i].rank === rank.rank) {
          setTimeout(() => {
            item[index].rank = '';
            // this.$Message.info("优先级设置重复");
            this.$Message.info(this.vmI18n.t('modalTips.y9'));
          }, 200);
          return;
        }
      }
    },
    // 检索
    async enter(e) {
      const _this = this;
      _this.listArr = [];
      _this.tableLoading = true;
      const params = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId, treeLikeKey: e };
      // 接口
      const {
        data: { oK, data }
      } = await this.service.strategyPlatform.getLogisticsLikeRankResultTable(params);
      console.log(oK, data);
      _this.tableLoading = false;
      if (oK) {
        _this.cityThead = true;
        _this.listArr = data.warehouseLogisticsRanks !== undefined ? data.warehouseLogisticsRanks : [];
        _this.listArr.forEach(item => {
          item.LOGISTICS_RANK = JSON.parse(item.LOGISTICS_RANK);
        });
        _this.treeData = data.warehouseLogisticsTree;
        _this.query = e;
        _this.treeData.forEach(item => {
          item.children.forEach(list => {
            if (list.title.indexOf(`${e}`) != -1) {
              item.expand = true;
            }
          });
        });
      } else {
        _this.$Message.error(
          data.message || this.vmI18n.t('modalTips.z3') // 失败
        );
      }
    },
    // 刷新
    refresh() {
      this.getTreeData();
    },
    // 作废
    async invalid() {
      const _this = this;
      _this.isSaveLoading = true;
      const fromData = new FormData();
      const param = { objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId };
      fromData.append('param', JSON.stringify(param));
      const {
        data: { code, data, message }
      } = await this.service.strategyPlatform.voidWarehouseLogistics(fromData);
      _this.isSaveLoading = false;
      if (code === 0) {
        const ess = data.message || this.vmI18n.t('modalTips.y4'); // 作废成功
        _this.getTreeData();
        _this.$Message.success(ess);
      } else {
        const err = message || this.vmI18n.t('modalTips.y4'); // 作废失败
        _this.$Message.success(err);
      }
    },
    // 导出
    async warningOk() {
      const _this = this;
      _this.warningModal = false;
      const treeList = [];
      this.treeData.forEach(item => {
        item.children.forEach(list => {
          if (list.checked) {
            treeList.push({
              id: list.id,
              regiontype: list.regiontype
            });
          }
        });
      });

      const fromData = new FormData();
      const param = {
        objid: _this.$route.params.customizedModuleId == 'New' ? '-1' : _this.$route.params.customizedModuleId,
        treeNode: treeList
      };
      fromData.append('param', JSON.stringify(param));
      const {
        data: { code, data }
      } = await this.service.strategyPlatform.exportWarehouseLogisticsRank(fromData);
      if (code === 0) {
        const ess = data.message || this.vmI18n.t('modalTips.z2'); // 导出成功
        _this.$Message.success(ess);
        publicMethodsUtil.downloadUrlFile(data);
      } else {
        const err = data.message || this.vmI18n.t('modalTips.y6'); // 导出失败
        _this.$Message.success(err);
        publicMethodsUtil.downloadUrlFile(data);
      }
    },
    saveOk() {
      this.save();
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
      Theight.style = `height: ${tableHeight - 260}px;`;
    },
    paperScroll(e) {
      const sLefts = document.getElementById('fixedDiv');
      sLefts.setAttribute('style', `margin-left: ${-e.target.scrollLeft}px`);
    }
  }
};
