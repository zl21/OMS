<!-- 店铺商品特殊策略 - 商品信息 - 半定制 -->
<template>
  <div class="shopCom" v-loading="loading">
    <businessActionTable
      :jordan-table-config="tabConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-page-change="pageChange"
      @on-page-size-change="pageSizeChange"
    />
    <Modal
      v-model="quDao.modal"
      width="500"
      titleAlign="left"
      :title="quDao.title"
      :mask="true"
      footer-hide
      class-name="ark-dialog"
    >
      <businessActionTable
        :jordan-table-config="tabConfigQu"
        @on-select="onSelectQ"
        @on-select-cancel="onSelectCancelQ"
        @on-select-all="onSelectAllQ"
        @on-select-all-cancel="onSelectAllCancelQ"
        @on-page-change="pageChangeQ"
        @on-page-size-change="pageSizeChangeQ"
      />
      <businessButton :btn-config="btnConfigQu" class="modal-footer" />
    </Modal>
    <businessDialog
      :closable="importTable.closable"
      :component-data="importTable.componentData"
      :draggable="importTable.draggable"
      :exclude-string="importTable.excludeString"
      :keep-alive="importTable.keepAlive"
      :mask="importTable.mask"
      :mask-closable="importTable.maskClosable"
      :name="importTable.name"
      :scrollable="importTable.scrollable"
      :title="importTable.confirmTitle"
      :title-align="importTable.titleAlign"
      :transfer="importTable.transfer"
      :base-path-name="importTable.basePathName"
      :url="importTable.url"
      :width="importTable.width"
      :basePathName="importTable.basePathName"
    />
  </div>
</template>

<script>
/**
 * 店铺商品特殊策略 - 商品信息 - 半定制
 */
import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessDialog from 'professionalComponents/businessDialog';
import dateUtil from '@/assets/js/__utils__/date.js';

export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    businessDialog,
  },
  data() {
    return {
      value15: '11',
      formatNumber: '10%',
      vmI18n: $i18n,
      quDao: {
        modal: false,
        title: '渠道仓 - 库存比例',
      },
      btnConfigQu: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $i18n.t('common.cancel'), // 取消 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.quDao.modal = false;
              // this.$emit('closeActionDialog');
            }, // 按钮点击事件
          },
          {
            type: 'primary', // 按钮类型
            text: $i18n.t('common.determine'), // 确定 按钮文本
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.quDaoOk();
            },
          },
        ],
      },
      loading: false,
      tabConfigQu: {
        indexColumn: true,
        isShowSelection: true,
        pageShow: true, // 控制分页是否显示
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        width: '', // 表格宽度
        height: '200',
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 默认每页条数100条，产品要求
        pageIndex: 1, // 页码
        totalData: [],
        selection: [],
        deleteData: [], // 暂存删除的数据，调保存的时候传给后端
        addData: [], // 暂存添加的数据，调保存的时候传给后端
        updateData: [], // 暂存修改的数据，调保存的时候传给后端
        data: [
          {
            PS_C_SKU_ID: '菜鸟仓',
            PEAK_VALUE: '',
            QTY: 5,
          },
          {
            PS_C_SKU_ID: '唯品会仓',
            PEAK_VALUE: '',
            QTY: 5,
          }
        ],
        columns: [
          {
            title: '渠道仓', // 渠道仓
            key: "PS_C_SKU_ID",
            align: "center",
          },
          {
            title: '库存比例', // 库存比例
            key: 'PEAK_VALUE',
            align: "center",
            render: (h, params) => {
              return h('Input', {
                style: {
                  width: '150px',
                  height: '100%',
                },
                class: 'kucun-scale',
                props: {
                  value: params.row.PEAK_VALUE,
                  autosize: true,
                  regx: /^\d{0,2}$/,
                  suffix: "icon-percent-suffix",
                },
                on: {
                  'on-change': e => {
                    console.log(e.target.value);
                    const v = e.target.value;
                    params.row.PEAK_VALUE = v;
                    this.tabConfigQu.data[params.index] = params.row;
                    // this.getFkChooseItem(params.row);
                  },
                  'on-blur': (e) => {
                    console.log(e.target.value);
                    const v = e.target.value;
                    // params.row.PEAK_VALUE = `${v}%`
                  },
                }
              });
            }
          }
        ],
      },
      tabConfig: {
        pageShow: true, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 默认每页条数100条，产品要求
        pageIndex: 1, // 页码
        totalData: [],
        selection: [],
        deleteData: [], // 暂存删除的数据，调保存的时候传给后端
        addData: [], // 暂存添加的数据，调保存的时候传给后端
        updateData: [], // 暂存修改的数据，调保存的时候传给后端
        data: [],
        columns: [
          {
            type: 'selection',
            width: 30,
            align: 'right'
          },
          {
            type: 'index',
            width: 60,
            align: 'left',
            title: $i18n.t('table_label.serialNo'), // 序号
          },
          {
            title: '店铺名称', // 
            key: "PS_C_SKU_ID",
            align: "center",
          },
          {
            title: '商品类型', // 
            key: "PS_C_SKU_ID",
            align: "center",
          },
          {
            title: '类型值', // 
            key: "PS_C_SKU_ID",
            align: "center",
          },
          {
            title: '安全库存数', // 
            key: "QTY",
            align: "center",
            render: (h, params) => {
              return h("InputNumber", {
                props: {
                  value: params.row.QTY,
                  regx: /^[0-9]\d*$/,
                  min: 0,
                  disabled: false,
                  editable: true,
                },
                on: {
                  "on-change": (e) => {
                    params.row.QTY = e;
                    this.tabConfig.data[params.index] = params.row;
                  },
                },
              });
            }
          },
          {
            title: '渠道仓', // 渠道仓
            key: "PS_C_SKU_ID",
            align: "center",
          },
          {
            title: '库存比例', // 库存比例
            key: 'PEAK_VALUE',
            align: "center",
            render: (h, params) => {
              return h('Input', {
                style: {
                  width: '150px',
                  height: '100%',
                },
                class: 'kucun-scale',
                props: {
                  value: params.row.PEAK_VALUE,
                  autosize: true,
                  regx: /^\d{0,2}$/,
                  suffix: "icon-percent-suffix",
                },
                on: {
                  'on-change': e => {
                    console.log(e.target.value);
                    const v = e.target.value;
                    params.row.PEAK_VALUE = v;
                    this.tabConfig.data[params.index] = params.row;
                    // this.getFkChooseItem(params.row);
                  },
                  'on-blur': (e) => {
                    console.log(e.target.value);
                    const v = e.target.value;
                    // params.row.PEAK_VALUE = `${v}%`
                  },
                }
              });
            }
          }
        ],
        businessFormConfig: {
          gridBar: true,
          formData: [
            {
              version: '1.4',
              colname: 'CP_C_SHOP_ID',
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                colid: 167606, // 当前字段的ID
                colname: 'CP_C_SHOP_ID', // 当前字段的名称
                fkdisplay: 'drp', // 外键关联类型
                isfk: true, // 是否有fk键
                isnotnull: true, // 是否必填
                name: $i18n.t('table_label.shopName'), // 店铺名称
                readonly: false, // 是否可编辑，对应input   readonly属性
                valuedata: '', // 这个是选择的值
                pid: '',
              },
              oneObj: e => {
                console.log(e);
                this.tabConfig.businessFormConfig.formValue.CP_C_SHOP_ID = e.pid;
                this.tabConfig.businessFormConfig.formValue.CP_C_SHOP_ECODE = e.valuedata;
              }
            },
            {
              style: 'select', // 下拉框类型
              label: '商品类型', // 商品类型
              width: '6', // 所占宽度宽度
              value: 'COM_TYPE', // 输入框的值
              multiple: false, // 布尔值,下拉框是否开启多选,默认为不开启
              disabled: false,
              selectChange: () => { }, // 选中事件，默认返回选中的值,默认返回当前值value
              options: [
                {
                  value: 1,
                  label: $i18n.t('other.blessingBag') // 福袋
                },
                {
                  value: 2,
                  label: $i18n.t('other.common') // 普通
                }
              ]
            },
            {
              version: '1.4',
              colname: 'PS_C_PRO_ID',
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                colid: 165990, // 当前字段的ID
                colname: 'PS_C_PRO_ID', // 当前字段的名称
                fkdisplay: 'drp', // 外键关联类型
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                name: $i18n.t('table_label.itemNo01'), // SPU编码
                readonly: false, // 是否可编辑，对应input   readonly属性
                valuedata: '', // 这个是选择的值
                pid: '',
              },
              oneObj: e => {
                console.log(e);
                this.tabConfig.businessFormConfig.formValue.CP_C_SHOP_ID = e.pid;
                this.tabConfig.businessFormConfig.formValue.CP_C_SHOP_ECODE = e.valuedata;
              }
            },
            {
              style: 'input',
              icon: 'ios-search',
              label: '渠道仓', // 渠道仓
              colname: 'MIN_REAL_AMT',
              width: '6',
              disabled: false,
              regx: /^\d*\.{0,1}\d{0,4}$/,
              iconclick: () => { },
              inputFocus: () => {
                this.quDao.modal = true;
              },
              inputenter: () => {
                this.save()
              }
            }
          ],
          formValue: {
            CP_C_SHOP_ID: '',
            PS_C_SPU_ECODE: '',
            PS_C_SKU_ID: '',
            PS_C_SKU_ECODE: '',
            MIN_REAL_AMT: ''
          },
          ruleValidate: {
            COM_TYPE: [{
              required: true,
              message: ' '
            }]
          }
        },
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              webname: 'ST_C_PRICE_SUB_IMPORT',
              text: '添加', // 
              isShow: true,
              type: 'primary',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.addHandel();
              }
            },
            {
              webname: 'ST_C_PRICE_SUB_DELETE',
              text: '删除', // 
              isShow: true,
              type: 'warning',
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.deleteDetail();
              }
            },
            {
              webname: 'ST_C_PRICE_SUB_IMPORT',
              text: $i18n.t('modalTitle.import'), // 导入
              isShow: true,
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.handleImport();
              }
            },
            {
              webname: 'ST_C_PRICE_SUB_EXPORT',
              text: $i18n.t('btn.export'), // 导出
              isShow: true,
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.handleExport();
              }
            }
          ]
        }
      },
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: $i18n.t('modalTitle.import'), // 导入
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
    };
  },
  computed: {
    ID() {
      return this.$route.params.customizedModuleId && (!['New', 'NEW'].includes(this.$route.params.customizedModuleId)) ? this.$route.params.customizedModuleId : '-1' // 记录主界面传入的ID
    },
  },
  async mounted() {
    // if (this.ID == -1 && !this.isCopy) return
    // await this.getBtn()
  },
  methods: {
    // 添加 - 按钮
    addHandel() {
      this.tabConfig.data = [...this.tabConfig.data, ...this.tabConfigQu.data]
    },
    // 渠道仓弹窗-确定
    quDaoOk() {
      // this.tabConfigQu.data
      const data = JSON.parse(JSON.stringify(this.tabConfigQu.data))
      let val = '';
      data.forEach(it => {
        let item = '';
        item = `${it.PS_C_SKU_ID}-${it.PEAK_VALUE}%,`
        val += item
      })
      this.tabConfig.businessFormConfig.formValue.MIN_REAL_AMT = val;
      this.quDao.modal = false;
    },
    // 获取按钮权限
    async getBtn() {
      let params = { table: 'ST_C_PRICE', type: 'OBJ', serviceId: 'r3-oc-oms' }
      const { ACTIONS, SUB_ACTIONS } = await $omsUtils.getPermissions(this, 'btnConfig', params, true)
      const mainWebArr = $OMS2.omsUtils.sonList(ACTIONS, 'webname');
      const subWebArr = $OMS2.omsUtils.sonList(SUB_ACTIONS, 'webname');
      this.tabConfig.businessButtonConfig.buttons.forEach(item => {
        item.isShow = subWebArr.includes(item.webname)
      })
      this.btnConfig.buttons.forEach(item => {
        item.webname != 'fix_back' && (item.isShow = mainWebArr.includes(item.webname))
      })
    },
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.tabConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.tabConfig.selectionData = e;
    },
    onSelectAll(e) {
      this.tabConfig.selectionData = e;
    },
    onSelectAllCancel() {
      this.tabConfig.selectionData = [];
    },
    pageChange(e) {
      this.tabConfig.pageIndex = e;
      this.queryPriceItem();
    },
    pageSizeChange(e) {
      this.tabConfig.pageSize = e;
    },
    onSelectQ(e) {
      // e为选中的数组对象RowArr
      this.tabConfig.selectionData = e;
    },
    onSelectCancelQ(e) {
      this.tabConfig.selectionData = e;
    },
    onSelectAllQ(e) {
      this.tabConfig.selectionData = e;
    },
    onSelectAllCancelQ() {
      this.tabConfig.selectionData = [];
    },
    pageChangeQ(e) {
      this.tabConfig.pageIndex = e;
      this.queryPriceItem();
    },
    pageSizeChangeQ(e) {
      this.tabConfig.pageSize = e;
    },
    // 删除明细
    deleteDetail() {
      const selectArr = this.tabConfig.selectionData
      if (!selectArr.length) return this.$Message.warning($i18n.t('modalTips.hy'))
      const ITEM_IDS = selectArr.map(i => i.ID)
      this.service.strategyPlatform.deletePrice({ ID: this.ID, ITEM_IDS }).then(({ data: { code, message } }) => {
        if (code == 0) {
          this.$Message.success(message)
          this.queryPriceItem()
          return
        }
        this.$Message.error(message)
      })
    },
    // 导入
    handleImport() {
      const componentData = {
        isAction: false,
        tableName: 'ORDER',
        webname: 'import',
        tempApi: '/p/cs/st/v1/price/exportTemplate',
        tempParm: null,
        okApi: '/p/cs/st/v1/price/importData',
        okParm: { id: this.ID },
        downErrorInfo: true,
        showErrorInfo: false,
        // freshPage: Fn,
        importNotes: false,
        dontShowDownloadA: false,
        returnData: this.queryPriceItem,
      }
      this.importTable.componentData = componentData;
      this.$children.find((item) => item.name === 'importTable').openConfirm();
    },
    // 导出
    handleExport() {
      const ITEM_IDS = this.tabConfig.selectionData.map(i => i && i.ID)
      const params = { ID: this.ID, ITEM_IDS: ITEM_IDS || [] }
      this.loading = true
      this.service.strategyPlatform.exportPrice(params).then(({ data: { code, data, message } }) => {
        this.loading = false
        if (code == 0 && data !== null) {
          this.$Message.success(message || "导出成功！");
          this.downloadUrlFile(data);
        } else if (code === 0) {
          this.$Message.success(message);
        } else {
          this.$Message.error(message || "失败！");
        }
      }).catch(() => this.loading = false)
    },
    // 导出
    downloadUrlFile(src) {
      let download_file = {};
      if (typeof download_file.iframe === "undefined") {
        download_file.iframe = document.createElement("iframe");
        document.body.appendChild(download_file.iframe);
      }
      download_file.iframe.src = src;
      download_file.iframe.style.display = "none";
    },
    // 时间戳格式化
    formatDate(time) {
      const date = new Date(time);
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
    },
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
          },
        });
      } else {
        this.onOk();
      }
    },
    // 复制、返回
    onOk(id, isCopy) {
      $omsUtils.tabCloseAppoint(this);
      this.$forceUpdate()
      if (isCopy) {
        this.isCopy = true
        this.setEnable(false)
        this.$nextTick(() => {
          this.$store.commit('global/tabOpen', {
            type: 'C',
            url: `/CUSTOMIZED/ST_C_PRICE/New?copy=${id}`,
            label: this.getCustomLabel(true), // 商品价格策略新增
            customizedModuleName: 'ST_C_PRICE',
            customizedModuleId: 'New',
          })
        });
        return;
      } else if (id) {
        this.$nextTick(() => {
          this.$store.commit('global/tabOpen', {
            type: 'C',
            label: this.getCustomLabel(false), // 商品价格策略编辑
            customizedModuleName: 'ST_C_PRICE',
            customizedModuleId: id,
          })
        });
        return;
      }
      this.$store.commit('global/tabOpen', {
        tableId: 10651,
        type: 'S',
        tableName: 'ST_C_PRICE',
        back: true,
      });
    },
    /**
     * 查找并返回formData数组中该field字段对应的对象
     * @param {Object} formConfig 
     * @param {String} field 
     * @returns
     */
    queryForm(formConfig, field) {
      return formConfig.formData.find(item => item.colname == field);
    },
    queryBtn(btnConfig, btnText) {
      return btnConfig.buttons.find(item => item.text == btnText);
    },
    // 主表表单渲染
    reloadForm() {
      this.isMasterRequired = this.ID != -1
      this.setBtnEnable()
      this.setMainTableFormConfig()
    },
    // 操作按钮是否可编辑
    setBtnEnable() {
      let isEdit = this.ID != -1
      let tableBtnConfig = this.tabConfig.businessButtonConfig
      let isShowTableBtn = this.isEnable ? false : !this.isCopy
      let addBtn = this.queryBtn(this.btnConfig, $i18n.t('common.copy'))
      let delBtn = this.queryBtn(tableBtnConfig, $i18n.t('btn.deleteDetail'))
      let importBtn = this.queryBtn(tableBtnConfig, $i18n.t('modalTitle.import'))
      addBtn && (addBtn.isShow = isEdit) // 复制
      delBtn && (delBtn.isShow = isShowTableBtn) // 删除明细
      importBtn && (importBtn.isShow = isShowTableBtn) // 导入
    },
    // 设置主表表单字段
    setMainTableFormConfig() {
      /**填充字段 */
      this.queryForm(this.formConfig, 'PLAN_ID').style = this.isMasterRequired ? 'input' : ''
      this.queryForm(this.formConfig, 'ISACTIVE').style = this.isMasterRequired ? 'input' : ''
      this.isMasterRequired && this.setEnable()
      /**校验字段 */
      this.formConfig.ruleValidate = {
        ...this.formConfig.ruleValidate,
        PLAN_ID: [{ required: this.isMasterRequired, message: ' ' }],
      }
    },
    /**主子表字段是否可编辑 */
    setEnable() {
      const FIELDS = ['PLAN_ID', 'ISACTIVE', 'CP_C_SHOP_ID', 'BEGIN_TIME', 'END_TIME']
      this.formConfig.formData.forEach(i => {
        if (i.colname == 'CP_C_SHOP_ID') {
          i.itemdata.readonly = this.isCopy ? false : this.isEnable
        }
        i.disabled = this.isCopy
          ? false
          : this.isEnable ? FIELDS.includes(i.colname) : FIELDS.slice(0, 2).includes(i.colname)
      })
      this.tabConfig.businessFormConfig.formData
        .forEach((i, index) => {
          let style = index == 2 ? 'input' : 'popInput'
          i.style = this.isCopy || this.isEnable ? '' : style
        })
    },
    isValid(obj, validFields) {
      let valid = true;
      for (let key of validFields) {
        if (!obj[key]) {
          // TODO! `明细中${key == 'MIN_REAL_AMT' ? '最低成交价格' : 'SPU编码'}不能为空`
          this.$Message.error(`明细中${key == 'MIN_REAL_AMT' ? '最低成交价格' : $i18n.t('table_label.itemNo01')}不能为空`)
          valid = false;
          break;
        }
      }
      return valid;
    },
    setFormValue(formConfig, field, data = {}) {
      const { formValue } = formConfig
      const { pid, valuedata } = data
      formValue[`${field}_ID`] = pid || '';
      formValue[`${field}_ENAME`] = valuedata || '';
      const obj = this.queryForm(formConfig, `${field}_ID`)
      if (!obj) return
      obj.itemdata.pid = pid || ''
      obj.itemdata.valuedata = valuedata || ''
    },

    // 主表查询
    async queryPrice(ID) {
      this.loading = true
      // const data = await $omsUtils.getObject('ST_C_VIPCOM_PROJECT', this.ID);
      this.isWatchChange = false
      // this.formConfig = $omsUtils.initFormConfig(data.addcolums[0].childs, this.formConfig);
      // this.formConfig.formValue.CP_C_SHOP_ID = data.addcolums[0].childs[0].refobjid
      // this.formConfig.formValue.ISACTIVE = this.formConfig.formValue.ISACTIVE == 'true'
      this.service.strategyPlatform.queryPrice({ id: ID || this.ID })
        .then(({ data: { code, data, message } }) => {
          this.loading = false
          this.isWatchChange = true
          if (code == 0) {
            if (data) {
              this.isEnable = data.ISACTIVE == 'Y'
              this.isMasterRequired = true
              this.reloadForm()
              $omsUtils.intersectFormValue(this.formConfig.formValue, data)
              this.setFormValue(this.formConfig, 'CP_C_SHOP', {
                pid: data.CP_C_SHOP_ID,
                valuedata: data.CP_C_SHOP_ENAME
              })
              this.formConfig.formValue.ISACTIVE = this.isEnable ? '启用' : '停用'
            }
          } else {
            this.$Message.error(message)
          }
        }).catch(() => this.loading = false)
    },
    // 子表查询
    queryPriceItem(ID) {
      const params = {
        id: ID || this.ID,
        pageSize: this.tabConfig.pageSize,
        pageNum: this.tabConfig.pageIndex
      }
      this.service.strategyPlatform.queryPriceItem(params)
        .then(({ data: { code, data, message } }) => {
          if (code == 0) {
            this.tabConfig.data = data.ST_C_PRICE_ITEM_LIST || []
            this.tabConfig.total = data.PAGE_INFO.total
          } else {
            this.$Message.error(message)
          }
        })
    },
    // 主子表保存
    save(isSaveAll) {
      /**主表校验 */
      const self = this;
      const valueArr = ['PLAN_NAME', 'BEGIN_TIME', 'END_TIME', 'PRIORITY'];
      const drpArr = ['CP_C_SHOP_ID'];
      const mes = $omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      if (mes) return self.$Message.warning(mes);

      const formConfig = this.tabConfig.businessFormConfig
      /**子表新增校验 */
      // const valueArr2 = ['MIN_REAL_AMT'];
      // let mes2 = $omsUtils.validatorNotEmpty(formConfig, valueArr2);
      const { CP_C_SHOP_ID, PS_C_SKU_ID, MIN_REAL_AMT } = formConfig.formValue
      let mes2 = ''
      if (!MIN_REAL_AMT) {
        mes2 += $i18n.t('form_label.bh') // 最低成交单价
      }
      if (!(CP_C_SHOP_ID || PS_C_SKU_ID)) {
        mes2 += ` SPU/${$i18n.t('table_label.code_SKU')}` // i18n SPU/SKU编码
      }
      mes2 = !mes2 ? '' : `${mes2} 不能为空` // TODO!
      if ((!(CP_C_SHOP_ID || PS_C_SKU_ID)) && this.isMasterRequired && !isSaveAll) {
        return this.$Message.error(mes2);
      } // 非回车保存就不提示子表表单校验提示


      /**子表编辑校验 */
      let validFields = ['PS_C_SKU_ECODE', 'MIN_REAL_AMT']
      const hasNoValid = this.tabConfig.updateData
        .some(i => !this.isValid(i, validFields))
      if (hasNoValid) return

      let params = {
        ID: this.ID || -1,
        ST_C_PRICE: {},
        ST_C_PRICE_ITEM_LIST: []
      }

      /**
       * 主表保存入参的两种情况：
       * 1. 主表已保存，为表单修改字段 modify
       * 2. 主表未保存，为表单所有字段
       */
      params.ST_C_PRICE = this.isMasterRequired ? this.modify.master : this.formConfig.formValue;
      if (this.isCopy) {
        params.ST_C_PRICE = this.formConfig.formValue
        params.COPY_FLAG = this.$route.query.copy
      }

      params.ST_C_PRICE.BEGIN_TIME &&= this.formatDate(params.ST_C_PRICE.BEGIN_TIME)
      params.ST_C_PRICE.END_TIME &&= this.formatDate(params.ST_C_PRICE.END_TIME)
      params.ST_C_PRICE.hasOwnProperty('ISACTIVE')
        && (params.ST_C_PRICE.ISACTIVE = params.ST_C_PRICE.ISACTIVE ? 'Y' : 'N')

      !mes2 && (params.ST_C_PRICE_ITEM_LIST.push({ ID: -1, ...formConfig.formValue }))
      isSaveAll && (params.ST_C_PRICE_ITEM_LIST = [
        ...params.ST_C_PRICE_ITEM_LIST,
        ...this.tabConfig.updateData
      ])

      this.service.strategyPlatform.savePrice(params)
        .then(({ data: { code, data, message } }) => {
          if (code == 0) {
            if (this.ID != -1) {
              // 清空明细表单
              this.tabConfig.businessFormConfig.formValue.MIN_REAL_AMT = ''
              this.setFormValue(this.tabConfig.businessFormConfig, 'PS_C_SKU')
              this.setFormValue(this.tabConfig.businessFormConfig, 'PS_C_SPU')
            }
            this.reloadForm()
            data && (this.ID = data.objId)
            if (isSaveAll) {
              this.modify = { master: {} }
              this.isModify = false
              this.onOk(['New', 'NEW'].includes(this.$route.params.customizedModuleId) && this.ID)
            }
            !this.isCopy && this.queryPrice(data.objId)
            !this.isCopy && this.queryPriceItem(data.objId)
            this.$Message.success(message)
            return
          }
          this.$Message.error(message)
        })
    },
  }
};

</script>
<style lang="less" scoped>
.shopCom {
}
/deep/ .ark-input-wrapper.kucun-scale {
  .ark-input {
    text-align: center;
  }
}
</style>
