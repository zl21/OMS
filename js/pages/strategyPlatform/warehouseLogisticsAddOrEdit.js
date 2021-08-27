import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import businessActionTable from 'professionalComponents/businessActionTable';
import subTable from 'professionalComponents/subTable';
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';

export default {
  components: {
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
    businessActionTable,
    subTable
  },
  mixins: [new modifycurrentLabel()],
  data() {
    return {
      colRowNum:4, // 针对于定制界面 form表单根据屏幕变化设置个数（用于计算）
      vmI18n:$i18n,
      collapse: 'panel_baseInfo',
      loading: false,
      isAuto: true, // 自动分配
      isModify: false,
      isWatchChange: false, // 监听
      isMasterRequired: false,
      forceReload: 0, // 组件重载
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
        pageShow: true
      },
      btnConfig: {
        btnsite: 'right', // 按钮对齐方式
        typeAll: 'default',
        buttons: [
          {
            webname: 'ST_C_WAREHOUSE_LOGISTICS_MAIN_SAVE', // 保存
            text: $i18n.t('btn.save'), // 保存
            disabled: false, // 按钮禁用控制
            isShow: false,
            btnclick: () => {
              const self = this;
              self.save(true);
            },
          },
          {
            webname: 'fix_back', // 返回
            text: $i18n.t('btn.back'),
            btnclick: () => {
              this.back();
            },
          }
        ]
      },
      formConfig: {
        formData: [
          {
            version: '1.4',
            colname: 'CP_C_PHY_WAREHOUSE_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 169092, // 当前字段的ID
              colname: 'CP_C_PHY_WAREHOUSE_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              inputname: 'CP_C_PHY_WAREHOUSE_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('table_label.warehouseName'), // 仓库名称 // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_PHY_WAREHOUSE', // 对应的表
              reftableid: 169092, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '' // 啥 ？？？
            },
            oneObj: (e) => {
              this.service.strategyPlatform.checkPhyWarehouse({ ID: e.pid })
              .then(({ data: { code }}) => {
                // 判断这个实体仓是否已经存在，如果已经存在就提示用户，并清掉仓库名称的值，让用户重新选择
                if (code == -1) {
                  this.setFormValue(this.formConfig, 'CP_C_PHY_WAREHOUSE');
                  return
                }
                this.setFormValue(this.formConfig, 'CP_C_PHY_WAREHOUSE', e);
                this.masterModifyData('CP_C_PHY_WAREHOUSE_ID', 'master');
                this.masterModifyData('CP_C_PHY_WAREHOUSE_ENAME', 'master');
              })
            }
          },
          {
            style: 'radio',
            label: $i18n.t('panel_label.ar'), // 物流分配
            value: 'IS_AUTO_LOGISTICS_DISTRIBUTION',
            colname: 'IS_AUTO_LOGISTICS_DISTRIBUTION',
            width: '6',
            disabled: false,
            radioChange: ()=>{
              this.toggleRadio();
              this.masterModifyData('IS_AUTO_LOGISTICS_DISTRIBUTION', 'master');
            }, // 切换时的方法
            options: [ // radio选项
              {
                value: 1,
                label: $i18n.t('panel_label.ao'), // 自动分配
              },
              {
                value: 2,
                label: $i18n.t('panel_label.aj'), // 默认物流
              }
            ]
          },
          {
            version: '1.4',
            colname: 'CP_C_LOGISTICS_ID',
            style: '', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 171650, // 当前字段的ID
              colname: 'CP_C_LOGISTICS_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              inputname: 'CP_C_LOGISTICS_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.logisticsCompany'), // 物流公司
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_LOGISTICS', // 对应的表
              reftableid: 171650, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '' // 啥 ？？？
            },
            oneObj: e => {
              console.log(e);
              this.formConfig.formValue.CP_C_LOGISTICS_ID = e.pid;
              this.formConfig.formValue.CP_C_LOGISTICS_ENAME = e.valuedata;
              this.masterModifyData('CP_C_LOGISTICS_ID', 'master');
              this.masterModifyData('CP_C_LOGISTICS_ENAME', 'master');
            }
          },
          {
            style: 'input',
            label: $i18n.t('table_label.remarks'), // 备注
            colname: 'REMARK',
            value: 'REMARK',
            width: '6',
            maxlength: 225,
            disabled: false,
            inputChange: () => {
              this.masterModifyData('REMARK', 'master');
            }
          },
          {
            style: '',
            label: $i18n.t('form_label.bg'), // 启用状态
            colname: 'ISACTIVE',
            value: 'ISACTIVE',
            width: '6',
            disabled: true,
            // inputChange: () => {
            //   this.masterModifyData('ISACTIVE', 'master');
            //   this.setEnable(this.formConfig.formValue.ISACTIVE);
            // }
          }
        ],
        formValue: {
          IS_AUTO_LOGISTICS_DISTRIBUTION: 1, // 物流分配
          REMARK: '', // 备注
          CP_C_PHY_WAREHOUSE_ID: '', // 仓库
          CP_C_LOGISTICS_ID: '', // 物流公司
          CP_C_LOGISTICS_ENAME: '',
          ISACTIVE: '' // 启用状态
        },
        ruleValidate: {
          IS_AUTO_LOGISTICS_DISTRIBUTION: [{ required: true, message: ' ' }],
          CP_C_PHY_WAREHOUSE_ID: [{ required: true, message: ' ' }],
          CP_C_LOGISTICS_ID: [{ required: false, message: ' ' }]
        }
      },
      filterData: {
        start: 0,
        tabth: [],
        row: []
      },
      logisticsTableFormConfig: {
        gridBar:true,
        formData: [
          {
            label: $i18n.t('form_label.logisticsCompany'), // 物流公司
            colname: 'CP_C_LOGISTICS_ID',
            defVal: 'CP_C_LOGISTICS_ID1',
            style: 'formCompile',
            slotName: 'logistics',
            reqStar: false, // 插槽必填标识
            width: '6',
            disabled: false,
            pageSize: 10, // 每页条数
            itemdata: {
              col: 1,
              colid: 171650, // 当前字段的ID
              colname: 'CP_C_LOGISTICS_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              inputname: 'CP_C_LOGISTICS_ID:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: false, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('form_label.logisticsCompany'), // 物流公司
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_LOGISTICS', // 对应的表
              reftableid: 171650, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '' // 啥 ？？？
            },
            fkrpSelected: e => {
              console.log(e);
              this.getItems(e);
            }, // 选中
            clearInput: () => {
              this.getItems();
            }, // 点击clearIcon
            popShow: () => {
              this.getDropDownOptions(1);
            }, // 点击下拉小icon
            changePage: pageNum => {
              this.getDropDownOptions(pageNum);
            }, // 页码改变
            inputValueChange: keyword => {
              this.getDropDownOptions(keyword, true);
            } // 模糊搜索
          }
        ],
        formValue: {
          CP_C_LOGISTICS_ID: '',
          CP_C_LOGISTICS_ENAME: '',
          CP_C_LOGISTICS_ID1: {
            totalRowCount: 0,
            autoData: [],
            data: {
              start: 0,
              tabth: [],
              row: []
            },
            defaultSelected: []
          }
        }
      },
      logisticsTableButtonConfig: {
        typeAll: 'default',
        buttons: [
          {
            webname: 'ST_C_WAREHOUSE_LOGISTICS_SUB_ADD',
            type:'primary',
            text: $i18n.t('btn.increase'), // 添加
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            isShow: false,
            btnclick: () => {
              this.save();
            }
          },
          {
            webname: 'ST_C_WAREHOUSE_LOGISTICS_SUB_DELETE',
            type:'warning',
            text: $i18n.t('btn.delete'), // 删除
            disabled: false, // 按钮禁用控制
            isShow: false,
            btnclick: () => {
              this.handleDelete();
            }
          }
        ]
      },
      logisticsTableConfig: {
        // isSearchText: true, // 是否修改搜索框为select
        // isShowDeleteDetailBtn: false, // 控制是否显示删除明细
        // isShowAddDetailBtn: false, // 控制是否显示新增明细
        // searchSelectList: [], // isSearchText为false的情况下使用 搜索框list
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
        data: [],
        isShowSelection: true, // 是否展示select框
        indexColumn: true, // 是否展示序号列
        columns: [
          {
            title: $i18n.t('form_label.logisticsCompany'), // 物流公司
            key: 'CP_C_LOGISTICS_ENAME'
          }
        ]
      },
      // tab切换配置
      labelList: [
        {
          label: $i18n.t('panel_label.aq'), // 启用物流
          value: 'logistics',
          isShow: true
        },
        {
          label: $i18n.t('panel_label.al'), // 物流信息
          value: 'logistics',
          isShow: false
        },
        {
          label: $i18n.t('panel_label.operationLog'), // 操作日志
          value: 'ST_WAREHOUSE_LOGISTICS_LOG',
          isShow: false
        }
      ],
      labelDefaultValue: 'logistics', // 设置tab默认值，默认展示《自定义属性》
      // 修改的信息
      modify: {
        master: {} // 主表信息
      },
      backup: [] // 备份物流信息
    };
  },
  async mounted() {
    await this.getBtn()
    this.initPanel();
    this.isWatchChange = true
    this.ID != -1 && (await this.queryLogistics());
    await this.getDropDownOptions(1); // 初始化，解决下拉多选首次渲染问题
  },
  created() {},
  methods: {
    // 获取按钮权限
    async getBtn() {
      let params = { table: 'ST_C_WAREHOUSE_LOGISTICS_SET', type: 'OBJ', serviceId: 'r3-oc-oms' }
      const { ACTIONS, SUB_ACTIONS } = await $omsUtils.getPermissions(this, 'btnConfig', params, true)
      const mainWebArr = $OMS2.omsUtils.sonList(ACTIONS, 'webname');
      const subWebArr = $OMS2.omsUtils.sonList(SUB_ACTIONS, 'webname');
      this.logisticsTableButtonConfig.buttons.forEach(item => {
        item.isShow = subWebArr.includes(item.webname)
      })
      this.btnConfig.buttons.forEach(item => {
        item.webname != 'fix_back' && (item.isShow = mainWebArr.includes(item.webname))
      })
    },
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.logisticsTableConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.logisticsTableConfig.selectionData = e;
    },
    onSelectAll(e) {
      this.logisticsTableConfig.selectionData = e;
    },
    onSelectAllCancel() {
      this.logisticsTableConfig.selectionData = [];
    },
    pageChange(e) {
      this.logisticsTableConfig.pageIndex = e;
      this.queryLogistics();
    },
    pageSizeChange(e) {
      this.logisticsTableConfig.pageSize = e;
    },
    // 物流分配切换
    toggleRadio() {
      this.isAuto = this.formConfig.formValue.IS_AUTO_LOGISTICS_DISTRIBUTION == '1';
      this.queryForm(this.formConfig, 'CP_C_LOGISTICS_ID').style = this.isAuto ? '' : 'popInput';
      this.formConfig.ruleValidate.CP_C_LOGISTICS_ID.required = !this.isAuto;
      this.initPanel()
      this.clearTableData();
      this.forceReload += 1; // 组件重载
      this.logisticsTableConfig.data = this.backup;
    },
    clearTableData() {
      this.logisticsTableConfig = {
        ...this.logisticsTableConfig,
        data: [],
        addData: [],
        updateData: [],
        deleteData: []
      };
    },
    // 返回
    back() {
      if (this.isModify) {
        this.$Modal.info({
          className: 'ark-dialog',
          title: $i18n.t('modalTitle.tips'), // 提示
          content: $i18n.t('modalTips.hu'), // 当前修改未保存，确定返回？
          mask: true,
          showCancel: true,
          okText: $i18n.t('common.determine'), // 确定
          cancelText: $i18n.t('common.cancel'), // 取消
          onOk: () => {
            this.onOk();
          }
        });
      } else {
        this.onOk();
      }
    },
    onOk(id) {
      $omsUtils.tabCloseAppoint(this);
      this.$destroy(true);
      if (id) {
        this.$store.commit('global/tabOpen', {
          type: 'C',
          label: this.getCustomLabel(false), // 仓库物流编辑
          customizedModuleId: id,
          customizedModuleName: 'ST_C_WAREHOUSE_LOGISTICS_SET'
        });
      } else {
        this.$store.commit('global/tabOpen', {
          tableId: 10661,
          type: 'S',
          tableName: 'ST_C_WAREHOUSE_LOGISTICS_SET',
          back: true,
          query: {
            isTreeTable: true
          }
        });
      }
    },
    initPanel() {
      let showIndex
      switch (this.ID == -1) {
        case true:
          showIndex = this.isAuto ? [0] : []
          this.labelDefaultValue = this.isAuto ? 'logistics' : ''
          break;
        case false:
          showIndex = this.isAuto ? [1,2] : [2]
          this.labelDefaultValue = this.isAuto ? 'logistics' : 'ST_WAREHOUSE_LOGISTICS_LOG'
          break;
        default:
          break;
      }
      this.labelList = this.labelList.map((i, index) => {
        i.isShow = showIndex.includes(index);
        return i;
      });
    },
    setFormValue(formConfig, field, data = {}) {
      const { formValue } = formConfig;
      const { pid, valuedata } = data;
      formValue[`${field}_ID`] = pid || '';
      formValue[`${field}_ENAME`] = valuedata || '';
      const obj = this.queryForm(formConfig, `${field}_ID`);
      if (!obj) return;
      obj.itemdata.pid = pid || '';
      obj.itemdata.valuedata = valuedata || '';
    },
    queryForm(formConfig, field) {
      return formConfig.formData.find(item => item.colname == field);
    },
    // 删除按钮
    handleDelete() {
      const self = this;
      let partArrs = self.logisticsTableConfig.selectionData;
      for (let item of partArrs) {
        if (item.ID == '-1') {
          // 刚新增的被删除了则不push，且要从addData中移除
          let deArritem = [];
          deArritem.push(item);
          self.logisticsTableConfig.addData = $omsUtils.getDifferentArr(self.logisticsTableConfig.addData, deArritem, 'ID');
          return;
        }
        item.actionName = 'DELETE';
        self.logisticsTableConfig.deleteData = self.logisticsTableConfig.deleteData.concat(partArrs);
      }
      this.deleteLogisticsCorp();
    },
    // 记录主表修改信息方法
    /**
     * ecode 记录字段
     * error 删除记录条件
     * obj 修改值存在modify下的某个对象中
     */
    masterModifyData(ecode, obj) {
      const self = this;
      if (!this.isWatchChange) return
      self.isModify = true;
      self.modify[obj][ecode] = self.formConfig.formValue[ecode];
    },
    labelClick(e) {
      // tab明细切换
      this.labelDefaultValue = e.value;
      if (this.labelDefaultValue == 'ST_WAREHOUSE_LOGISTICS_LOG') {
        this.subTableConfig = {
          centerName: 'strategyPlatform',
          tablename: this.labelDefaultValue,
          objid: this.ID,
          pageShow: true
        }
      }
    },
    setEnable(isEnable) {
      this.formConfig.formData.forEach(i => {
        i.colname == 'CP_C_PHY_WAREHOUSE_ID' && (i.itemdata.readonly = true)
        i.disabled = isEnable ? true : i.colname == 'ISACTIVE' ? true : false
      })
      this.logisticsTableButtonConfig.buttons.forEach(item => item.disabled = item.isShow && isEnable)
      this.logisticsTableFormConfig.formData[0].disabled = isEnable
      this.logisticsTableFormConfig.formData[0].style = isEnable ? 'input' : 'formCompile'
    },
    // 查询
    async queryLogistics() {
      this.loading = true;
      // const obj = await $omsUtils.getObject('ST_C_EXPRESS_ALLOCATION', this.ID);
      this.isWatchChange = false;
      // this.formConfig = $omsUtils.initFormConfig(obj.addcolums[0].childs, this.formConfig);

      const params = {
        ID: this.ID,
        SIZE: this.logisticsTableConfig.pageSize,
        CURRENT: this.logisticsTableConfig.pageIndex
      };
      const {
        data: { code, data, message }
      } = await this.service.strategyPlatform.queryLogistics(params);
      this.loading = false;
      if (code == 0) {
        const { ST_C_EXPRESS_ALLOCATION, ST_C_EXPRESS_ALLOCATION_ITEM = {} } = data
        if (ST_C_EXPRESS_ALLOCATION) {
          this.isAuto = ST_C_EXPRESS_ALLOCATION.IS_AUTO_LOGISTICS_DISTRIBUTION == '1';
          const isEnable = ST_C_EXPRESS_ALLOCATION.ISACTIVE == 'Y';
          this.queryForm(this.formConfig, 'CP_C_LOGISTICS_ID').style = this.isAuto ? '' : 'popInput';
          this.setEnable(isEnable);

          $omsUtils.intersectFormValue(this.formConfig.formValue, ST_C_EXPRESS_ALLOCATION);
          let fieldNames = ['CP_C_PHY_WAREHOUSE', 'CP_C_LOGISTICS']
          fieldNames.forEach(i => {
            this.setFormValue(this.formConfig, i, {
              pid: ST_C_EXPRESS_ALLOCATION[`${i}_ID`],
              valuedata: ST_C_EXPRESS_ALLOCATION[`${i}_ENAME`]
            })
          })
          this.isMasterRequired = true;
          this.queryForm(this.formConfig, 'ISACTIVE').style = 'input';
          this.formConfig.formValue.ISACTIVE = isEnable ? '启用' : '停用';
          this.formConfig.formValue.REMARK = ST_C_EXPRESS_ALLOCATION.remark;
          this.initPanel();
        }
        const { records = [], total } = ST_C_EXPRESS_ALLOCATION_ITEM || {}
        this.logisticsTableConfig.data = records
        this.backup = records
        this.logisticsTableConfig.total = total
        setTimeout(() => {
          this.isWatchChange = true;
        }, 1000)
        return
      }
      this.$Message.error(message);
    },
    async save(isSaveAll) {
      // 保存
      const self = this;
      /* =========== 保存校验 start =========== */
      const valueArr = ['IS_AUTO_LOGISTICS_DISTRIBUTION'];
      const drpArr = this.isAuto ? ['CP_C_PHY_WAREHOUSE_ID'] : ['CP_C_PHY_WAREHOUSE_ID', 'CP_C_LOGISTICS_ID'];
      const mes = $omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      if (mes) {
        self.$Message.warning(mes);
        return false;
      }

      const inputIDs = self.logisticsTableFormConfig.formValue.CP_C_LOGISTICS_ID; // 仓库
      if (!inputIDs && this.isAuto && !isSaveAll) return this.$Message.warning('请选择物流公司！');

      const isEdit = this.isMasterRequired;
      const ST_C_EXPRESS_ALLOCATION = isEdit ? this.modify.master : this.formConfig.formValue;
      const ITEMS = this.logisticsTableConfig.addData;

      let params = {
        ST_C_EXPRESS_ALLOCATION: { 
          ID: this.ID || -1,
          ...ST_C_EXPRESS_ALLOCATION,
          ISACTIVE: ST_C_EXPRESS_ALLOCATION.ISACTIVE ? 'Y' : 'N'
        },
        ITEMS
      };
      const {
        data: { code, data, message }
      } = await this.service.strategyPlatform.saveLogisticsCorp(params);
      if (code == 0) {
        this.ID = data.objId || -1
        this.clearTableData()
        !isSaveAll && this.$Message.success(message)
        if (isSaveAll) {
          this.onOk(this.$route.params.customizedModuleId == 'New' && this.ID)
        } else {
          this.queryLogistics()
          this.setFormValue(self.logisticsTableFormConfig, 'CP_C_LOGISTICS')
        }
        return
      }
      this.$Message.error(message);
    },
    // 删除明细
    async deleteLogisticsCorp() {
      let partArrs = this.logisticsTableConfig.selectionData;
      if (!partArrs.length) return this.$Message.warning('请先选择需要删除的记录！');
      let allArrs = this.logisticsTableConfig.data;
      const ids = partArrs.map(i => i.ID).join(',');
      const {
        data: { code, message }
      } = await this.service.strategyPlatform.deleteLogisticsCorp({ ID: ids });
      if (code == 0) {
        // 筛选出差集作为展示
        this.logisticsTableConfig.selectionData = []
        this.logisticsTableConfig.data = $omsUtils.getDifferentArr(allArrs, partArrs, 'CP_C_LOGISTICS_ID');
        code == 0 ? this.$Message.success(message) : this.$Message.error(message);
      }
    },
    /**
     * 获取下拉项
     * @param {Number} val 当前页数 / 输入的关键字
     * @param {Boolean} isFilter 是否是模糊搜索
     */
    async getDropDownOptions(val, isFilter) {
      const query = new FormData();
      const startindex = isFilter ? 0 : (val - 1) * 10;
      const search = {
        isdroplistsearch: true,
        refcolid: 171650,
        fixedcolumns: {},
        startindex,
        range: 10
      };
      query.append('searchdata', JSON.stringify(search));

      const formdata = new FormData();
      if (isFilter) {
        formdata.append('ak', val.trim());
        formdata.append('colid', 171650);
        formdata.append('fixedcolumns', JSON.stringify({ whereKeys: {} }));
      }

      const { data: { code, data } } = isFilter 
        ? await this.service.common.fuzzyquerybyak(formdata)
        : await this.service.common.QueryList(query);
      if (code == 0) {
        if (isFilter) {
          const autoData = data.map(item => ({ ID: item.ID || item.id, value: item.ENAME }));
          this.logisticsTableFormConfig.formValue.CP_C_LOGISTICS_ID1.autoData = autoData;
          return;
        }
        const { row, tabth, totalRowCount } = data;
        this.logisticsTableFormConfig.formValue.CP_C_LOGISTICS_ID1.data = {
          ...this.logisticsTableFormConfig.formValue.CP_C_LOGISTICS_ID1.data,
          row,
          tabth
        };
        this.logisticsTableFormConfig.formValue.CP_C_LOGISTICS_ID1.totalRowCount = totalRowCount;
        this.filterData = { ...this.filterData, row, tabth };
      }
    },
    getItems(options) {
      let pid = [];
      let valuedata = [];
      let rows = [];

      if (options) {
        // const storeIds = this.logisticsTableConfig.data.map(i => i.CP_C_LOGISTICS_ID)
        options.forEach(i => {
          // 由于默认物流切到自动配送后，可能会选中与当前默认物流公司重复而被前端去重，故改为由后端做去重处理
          // if (!storeIds.includes(Number(i.ID))) {
          rows.push({ ID: '-1', CP_C_LOGISTICS_ID: Number(i.ID), CP_C_LOGISTICS_ENAME: i.Label });
          // }
          pid.push(i.ID);
          valuedata.push(i.Label);
        });
      }
      this.logisticsTableConfig.addData = rows;
      const obj = pid.length && { pid: pid.join(','), valuedata: valuedata.join(',') };
      this.setFormValue(this.logisticsTableFormConfig, 'CP_C_LOGISTICS', obj || '');
    }
  },
};
