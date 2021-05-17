import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
import businessLabel from 'professionalComponents/businessLabel';
import businessStatusFlag from 'professionalComponents/businessStatusFlag';
import businessActionTable from 'professionalComponents/businessActionTable';
import businessDialog from 'professionalComponents/businessDialog';
import myInput from 'professionalComponents/fkinput.vue';
import orderItem from 'allpages/orderCenter/orderManageDetail/details/orderItem';
import dateUtil from '@/assets/js/__utils__/date.js';
Vue.component('myInput', myInput)

export default {
  components: {
    orderItem,
    businessButton,
    businessForm,
    businessLabel,
    businessStatusFlag,
    businessActionTable,
    businessDialog,
    myInput
  },
  data() {
    return {
      vmI18n:$i18n,
      collapse: ['panel_baseInfo', 'panel_pickInfo', 'panel_warehouseInfo'],
      ID: this.$route.params.customizedModuleId && this.$route.params.customizedModuleId != 'New' ? this.$route.params.customizedModuleId : '-1', // 记录主界面传入的ID
      forceReload: 0, // 组件重载
      loading: false,
      isWatchChange: false, // 监听
      isMasterRequired: false, // 主表是否已保存
      isModify: false,
      isCopy: false,
      subTableConfig: {
        preTablename: '', // 预留属性，便于之后重新封装orderItem.js，用于匹配其相同路径下的config文件的一级key
        tablename: '',
        objid: '',
      },
      btnConfig: {
        typeAll: 'default',
        buttons: [{
          webname: 'lookup_save', // 保存
            text: '保存',
            size: '', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              const self = this;
              self.save(true);
            },
          },
          {
            webname: 'lookup_return', // 返回
            text: $i18n.t('btn.back'),
            btnclick: () => {
              this.back();
            },
          },
          {
            webname: 'lookup_return', // 返回
            text: '启用',
            isShow: false,
            btnclick: () => {
              this.toggleEnable(1)
            },
          },
          {
            webname: 'lookup_return', // 返回
            text: '停用',
            isShow: false,
            btnclick: () => {
              this.toggleEnable(0)
            },
          },
          {
            webname: 'lookup_return', // 返回
            text: '复制',
            isShow: false,
            btnclick: () => {
              this.onOk(true)
            },
          },
        ]
      },
      formConfig: {
        formData: [
          {
            style: '',
            label: '策略ID',
            colname: 'PLAN_ID',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('PLAN_ID', 'master');
            }
          },
          {
            style: 'input',
            label: '策略名称',
            colname: 'PLAN_NAME',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('PLAN_NAME', 'master');
            }
          },
          {
            version: '1.4',
            colname: 'CP_C_SHOP_ID',
            style: 'popInput', // 输入框弹框单多选
            width: '6',
            itemdata: {
              col: 1,
              colid: 171534, // 当前字段的ID
              colname: 'CP_C_SHOP_ID', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              fkdesc: '店铺',
              inputname: 'CP_C_SHOP_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '店铺名称', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'CP_C_SHOP', // 对应的表
              reftableid: 171534, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '', // 啥 ？？？
            },
            oneObj: e => {
              console.log(e);
              this.formConfig.formValue.CP_C_SHOP_ID = e.pid;
              this.formConfig.formValue.CP_C_SHOP_ENAME = e.valuedata;
              this.masterModifyData('CP_C_SHOP_ID', 'master');
              this.masterModifyData('CP_C_SHOP_ENAME', 'master');
            }
          },
          {
            style: 'date', // 输入框类型
            label: '生效开始时间', // 输入框前文字
            colname: 'BEGIN_TIME',
            type: 'date',
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd',
            disabled: false,
            options: {
              disabledDate (date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('BEGIN_TIME', 'master');
            }
          },
          {
            style: 'date', // 输入框类型
            label: '生效结束时间', // 输入框前文字
            colname: 'END_TIME',
            type: 'date',
            width: '6', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            format: 'yyyy-MM-dd',
            disabled: false,
            options: {
              disabledDate (date) {
                return date && date.valueOf() < Date.now() - 86400000;
              }
            },
            onChange: () => {
              this.masterModifyData('END_TIME', 'master');
            }
          },
          {
            style: 'input',
            label: '优先级',
            colname: 'PRIORITY',
            width: '6',
            disabled: false,
            regx: /^[1-9]$/,
            inputChange: () => {
              this.masterModifyData('PRIORITY', 'master');
            }
          },
          {
            style: 'input',
            label: '备注',
            colname: 'REMARK',
            width: '6',
            disabled: false,
            inputChange: () => {
              this.masterModifyData('REMARK', 'master');
            }
          },
          {
            style: '',
            label: '启用状态',
            colname: 'ISACTIVE',
            width: '6',
            disabled: true
          }
        ],
        formValue: {
          PLAN_ID: '', // 策略ID
          PLAN_NAME: '', // 策略名称
          BEGIN_TIME: '', // 生效开始时间
          END_TIME: '', // 生效结束时间
          PRIORITY: '', // 优先级
          ISACTIVE: '', // 启用状态
          CP_C_SHOP_ID: '', // 店铺
          CP_C_SHOP_ENAME: '',
          REMARK: '' // 备注
        },
        ruleValidate: {
          PLAN_ID: [{ required: false, message: ' ' }],
          PLAN_NAME: [{ required: true, message: ' ' }],
          BEGIN_TIME: [{ required: true, message: ' ' }],
          END_TIME: [{ required: true, message: ' ' }],
          PRIORITY: [{ required: true, message: ' ' }],
          CP_C_SHOP_ID: [{ required: true, message: ' ' }]
        }
      },
      goodsTableConfig: {
        pageShow: true, // 控制分页是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10, // 默认每页条数100条，产品要求
        pageIndex: 1, // 页码
        totalData: [],
        selectionData: [],
        deleteData: [], // 暂存删除的数据，调保存的时候传给后端
        addData: [], // 暂存添加的数据，调保存的时候传给后端
        updateData: [], // 暂存修改的数据，调保存的时候传给后端
        data: [], // TODO 假数据
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
            title: '序号'
          },
          {
            title: "SKU编码",
            key: "PS_C_SKU_ID",
            align: "center",
            required: false,
            render: (h, params) => {
              if (this.formConfig.formValue.ISACTIVE == '停用' && !this.isCopy) {
                return h("div", [
                  h("myInput", {
                    style: {
                      marginRight: '5px',
                    },
                    props: {
                      colname: 'PS_C_SKU_ID',
                      style: 'popInput',
                      version: '1.4',
                      isActive: true,
                      itemdata: {
                        colid: 171666,
                        colname: 'PS_C_SKU_ID',
                        fkdisplay: 'drp',
                        isfk: true, // 是否有fk键
                        isnotnull: true, // 是否必填
                        name: '',
                        readonly: false, // 是否可编辑，对应input   readonly属性
                        pid: params.row.PS_C_SKU_ID,
                        valuedata: params.row.PS_C_SKU_ECODE,
                      },
                    },
                    on: {
                      getFkChooseItem: (val) => {
                        const { ID, ECODE } = val
                        params.row.PS_C_SKU_ECODE = ECODE ? ECODE.val : '';
                        params.row.PS_C_SKU_ID = ID ? ID.val : '';
                        this.getFkChooseItem(params.row);
                      },
                    },
                  })
                ]);
              }
              return h('span', params.row.PS_C_SKU_ECODE)
            },
          },
          {
            title: '最低成交价格',
            key: 'PEAK_VALUE',
            align: "center",
            render: (h, params) => {
              if (this.formConfig.formValue.ISACTIVE == '停用' && !this.isCopy) {
                return h('Input', {
                  style: {
                    width: '150',
                    height: '100%',
                    border: '1px solid #dcdee2',
                    'text-align': 'center'
                  },
                  props: {
                    value: params.row.MIN_REAL_AMT,
                    autosize: true,
                    regx: /^\d*\.{0,1}\d{0,4}$/
                  },
                  on: {
                    'on-change': e => {
                      params.row.MIN_REAL_AMT = e.target.value;
                      this.getFkChooseItem(params.row);
                    }
                  }
                });
              }
              return h('span', params.row.MIN_REAL_AMT)
            }
          }
        ],
        businessFormConfig: {
          formData: [
            {
              version: '1.4',
              colname: 'PS_C_SPU_ID',
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                col: 1,
                colid: 171667, // 当前字段的ID
                colname: 'PS_C_SPU_ID', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'drp', // 外键关联类型
                fkdesc: '店铺',
                inputname: 'PS_C_SPU_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: 'SPU编码', // 赔付类型
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'CP_C_SHOP', // 对应的表
                reftableid: 171667, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                pid: '', // 啥 ？？？
              },
              oneObj: e => {
                console.log(e);
                this.goodsTableConfig.businessFormConfig.formValue.PS_C_SPU_ID = e.pid;
                this.goodsTableConfig.businessFormConfig.formValue.PS_C_SPU_ECODE = e.valuedata;
              }
            },
            {
              version: '1.4',
              colname: 'PS_C_SKU_ID',
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                col: 1,
                colid: 171666, // 当前字段的ID
                colname: 'PS_C_SKU_ID', // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                fkdisplay: 'drp', // 外键关联类型
                fkdesc: '店铺',
                inputname: 'PS_C_SKU_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: 'SKU编码', // 赔付类型
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: 'CP_C_SHOP', // 对应的表
                reftableid: 171666, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                pid: '', // 啥 ？？？
              },
              oneObj: e => {
                this.goodsTableConfig.businessFormConfig.formValue.PS_C_SKU_ID = e.pid;
                this.goodsTableConfig.businessFormConfig.formValue.PS_C_SKU_ECODE = e.valuedata;
              }
            },
            {
              style: 'input',
              label: '最低成交单价',
              colname: 'MIN_REAL_AMT',
              width: '6',
              disabled: false,
              regx: /^\d*\.{0,1}\d{0,4}$/,
              inputenter: () => {
                this.save()
              }
            }
          ],
          formValue: {
            PS_C_SPU_ID: '',
            PS_C_SPU_ECODE: '',
            PS_C_SKU_ID: '',
            PS_C_SKU_ECODE: '',
            MIN_REAL_AMT: ''
          },
          ruleValidate: {
            MIN_REAL_AMT: [{
              required: true,
              message: ' '
            }]
          }
        },
        businessButtonConfig: {
          typeAll: 'default',
          buttons: [
            {
              text: '删除明细',
              isShow: true,
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.deleteDetail();
              }
            },
            {
              text: '导入',
              isShow: true,
              disabled: false, // 按钮禁用控制
              btnclick: () => {
                this.handleImport();
              }
            },
            {
              text: '导出',
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
        basePathName: 'business-components',
        url: 'importTable',
        keepAlive: true,
        excludeString: 'importTable', // 将name传进去，确认不缓存
        componentData: {},
     },
      // tab切换配置
      labelList: [
        {
          label: '商品明细',
          value: 'goods',
        },
        {
          label: '操作日志',
          value: 'logTable',
        }
      ],
      labelDefaultValue: 'goods', // 设置tab默认值，默认展示《自定义属性》
      modify: {
        master: {}, // 主表信息
      }, // 修改的信息
    };
  },
  async mounted() {
    let copyId = this.$route.query.copy
    this.isCopy = copyId != undefined
    this.isWatchChange = true
    if (this.ID == -1 && !this.isCopy) return
    this.isWatchChange = false
    // this.reloadForm(false)
    this.setEnable(false)
    await this.queryPrice(copyId)
    await this.queryPriceItem(copyId)
  },
  methods: {
    onSelect(e) {
      // e为选中的数组对象RowArr
      this.goodsTableConfig.selectionData = e;
    },
    onSelectCancel(e) {
      this.goodsTableConfig.selectionData = e;
    },
    onSelectAll(e) {
      this.goodsTableConfig.selectionData = e;
    },
    onSelectAllCancel() {
      this.goodsTableConfig.selectionData = [];
    },
    pageChange(e) {
      this.goodsTableConfig.pageIndex = e;
      this.queryPriceItem();
    },
    pageSizeChange(e) {
      this.goodsTableConfig.pageSize = e;
    },
    // 启用停用
    async toggleEnable(isEnable) {
      const tipText = isEnable ? '启用' : '停用'
      if (this.formConfig.formValue.ISACTIVE == tipText) return this.$message.warning(`当前记录已${tipText}，不允许重复${tipText}！`)
      const formdata = new FormData()
      formdata.append('id', this.ID)
      formdata.append('isActive', isEnable ? 'Y' : 'N')
      const { data: { code, message }} = await this.service.strategyPlatform.priceSetIsActive(formdata)
      if (code == 0) {
        this.setEnable(isEnable)
        this.queryPrice()
        this.queryPriceItem()
        return
      }
      this.$message.error(message);
    },
    // 删除明细
    deleteDetail() {
      const selectArr = this.goodsTableConfig.selectionData
      if (!selectArr.length) return this.$message.warning('请先选择需要删除的记录！')
      if (this.formConfig.formValue.ISACTIVE == '启用') return this.$message.warning('当前记录启用，不允许删除！')
      const ITEM_IDS = selectArr.map(i => i.ID)
      this.service.strategyPlatform.deletePrice({ ID: this.ID, ITEM_IDS }).then(({ data: { code, message }}) => {
        if (code == 0) {
          this.$message.success(message)
          this.queryPriceItem()
          return
        }
        this.$message.error(message)
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
      }
      this.importTable.componentData = componentData;
      this.$children.find((item) => item.name === 'importTable').openConfirm();
    },
    // 导出
    handleExport() {
      const ITEM_IDS = this.goodsTableConfig.selectionData.map(i => i && i.ID)
      const params = { ID: this.ID, ITEM_IDS: ITEM_IDS || [] }
      this.loading = true
      this.service.strategyPlatform.exportPrice(params).then(({ data: { code, data, message }}) => {
        this.loading = false
        if (code == 0 && data !== null) {
          this.$message.success(message || "导出成功！");
          this.downloadUrlFile(data);
        } else if (code === 0) {
          this.$message.success(message);
        } else {
          this.$message.error(message || "失败！");
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
      return dateUtil.getFormatDate(date, 'yyyy-MM-dd');
    },
    labelClick(e) { // tab明细切换
      this.labelDefaultValue = e.value;
      // if (this.labelDefaultValue != 'logTable') return;
      // this.subTableConfig = {
      //   tablename: this.labelDefaultValue,
      //   objid: this.ID,
      // };
    },
    back() {
      if (this.isModify) {
        this.$Modal.info({
          title: $i18n.t('modalTitle.tips'), // 提示
          content: '当前修改未保存，确定返回？',
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
    onOk(isCopy, isSave) {
      this.$comUtils.tabCloseAppoint(this);
      this.$forceUpdate()
      if (isCopy) {
        this.isCopy = true
        this.setEnable(false)
        this.$nextTick(() => {
          this.$store.commit('customize/TabOpen', {
            id: 'New?copy=' + this.ID,
            type: 'action',
            name: 'ST_C_PRICE'
          });
        });
        return;
      } else if (isSave){
        this.$nextTick(() => {
          this.$store.commit('customize/TabOpen', {
            id: this.ID,
            type: 'action',
            name: 'ST_C_PRICE'
          });
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
     * 记录主表修改信息方法
     * @param {*} ecode 记录字段
     * @param {*} obj 修改值存在modify下的某个对象中
     * @returns 
     */
    masterModifyData(ecode, obj) {
      const self = this;
      if (!this.isWatchChange) return;
      self.isModify = true;
      let value = self.formConfig.formValue[ecode]
      self.modify[obj][ecode] = Object.prototype.toString.call(value) == '[object Date]' ? this.formatDate(value) : value;
    },
    getFkChooseItem(row) {
      let itemIndex;
      const curItem = this.goodsTableConfig.updateData.find((i, index) => {
        itemIndex = index;
        return i.ID == row.ID;
      });
      if (curItem) {
        this.goodsTableConfig.updateData.splice(itemIndex, 1, row);
      } else {
        this.goodsTableConfig.updateData.push(row);
      }
    },
    /**
     * 查找并返回formData数组中该field字段对应的对象
     * @param {Object} formConfig 
     * @param {String} field 
     * @returns
     */
    queryForm(formConfig, field) {
      return formConfig.formData.find((item) => item.colname == field); 
    },
    /**
     * 主表表单渲染
     * @param {Boolean} isEnable true 启用 false 停用
     */
    reloadForm(isEnable) {
      this.isMasterRequired = this.ID != -1
      this.setBtnEnable(isEnable)
      this.setMainTableFormConfig(isEnable)
      this.forceReload += 1 // 组件重载
    },
    /**
     * 设置主表表单字段
     * @param {Boolean} isEnable 是否启用 true: 启用 false: 停用
     */
    setMainTableFormConfig(isEnable) {
      /**填充字段 */
      const fieldStyle = this.isMasterRequired ? 'input' : ''
      this.queryForm(this.formConfig, 'PLAN_ID').style = fieldStyle 
      this.queryForm(this.formConfig, 'ISACTIVE').style = fieldStyle
      fieldStyle && this.setEnable(isEnable)
      /**校验字段 */
      this.formConfig.ruleValidate = {
        ...this.formConfig.ruleValidate,
        PLAN_ID: [{ required: this.isMasterRequired, message: ' ' }],
      }
    },
    /**主子表字段是否可编辑 */
    setEnable(isEnable) {
      const FIELDS = ['PLAN_ID', 'ISACTIVE', 'CP_C_SHOP_ID', 'BEGIN_TIME', 'END_TIME']
      this.formConfig.formData.forEach(i => {
        if (i.colname == 'CP_C_SHOP_ID') {
          i.itemdata.readonly = this.isCopy ? false : isEnable
        }
        i.disabled = this.isCopy ? false : isEnable ? FIELDS.includes(i.colname) : FIELDS.slice(0,2).includes(i.colname)
      })
      this.goodsTableConfig.businessFormConfig.formData
        .forEach((i, index) => {
          let style = index == 2 ? 'input' : 'popInput'
          i.style = this.isCopy || isEnable ? '' : style
        })
    },
    /**操作按钮是否可编辑 */
    setBtnEnable(isEnable) {
      let isEdit = this.ID != -1
      let btnText = isEnable ? '启用' : '停用'
      let masterBtns = ['启用','停用','复制']
      let subTableBtns = ['删除明细', '导入']
      this.btnConfig.buttons.forEach(item => {
        masterBtns.includes(item.text)
        && (item.isShow = isEdit && item.text != btnText)
      })
      this.goodsTableConfig.businessButtonConfig.buttons
        .forEach(item => {
          item.isShow = subTableBtns.includes(item.text) && isEnable ? false : !this.isCopy
        })
    },
    isValid(obj, validFields) {
      let valid = true;
      for (let key of validFields) {
        if (!obj[key]) {
          this.$Message.error(`明细中${key == 'MIN_REAL_AMT' ? '最低成交价格' : 'SPU编码'}不能为空`)
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
      // const data = await this.$OMS2.omsUtils.getObject('ST_C_VIPCOM_PROJECT', this.ID);
      this.isWatchChange = false
      // this.formConfig = this.$OMS2.omsUtils.initFormConfig(data.addcolums[0].childs, this.formConfig);
      // this.formConfig.formValue.CP_C_SHOP_ID = data.addcolums[0].childs[0].refobjid
      // this.formConfig.formValue.ISACTIVE = this.formConfig.formValue.ISACTIVE == 'true'
      this.service.strategyPlatform.queryPrice({ id: ID || this.ID })
      .then(({ data: { code, data, message }}) => {
        this.loading = false
        this.isWatchChange = true
        if (code == 0) {
          if (data) {
            this.isMasterRequired = true
            this.reloadForm(data.ISACTIVE == 'Y')
            this.$OMS2.omsUtils.intersectFormValue(this.formConfig.formValue, data)
            this.setFormValue(this.formConfig, 'CP_C_SHOP', { 
              pid: data.CP_C_SHOP_ID,
              valuedata: data.CP_C_SHOP_ENAME
            })
            this.formConfig.formValue.ISACTIVE = data.ISACTIVE == 'Y' ? '启用' : '停用'
          }
        } else {
          this.$message.error(message)
        }
      }).catch(() => this.loading = false)
    },
    // 子表查询
    queryPriceItem(ID) {
      const params = {
        id: ID || this.ID,
        pageSize: this.goodsTableConfig.pageSize,
        pageNum: this.goodsTableConfig.pageIndex
      }
      this.service.strategyPlatform.queryPriceItem(params)
      .then(({ data: { code, data, message }}) => {
        if (code == 0) {
          this.goodsTableConfig.data = data.ST_C_PRICE_ITEM_LIST || []
          this.goodsTableConfig.total = data.PAGE_INFO.total
        } else {
          this.$message.error(message)
        }
      })
    },
    // 主子表保存
    save(isSaveAll) {
      /**主表校验 */
      const self = this;
      const valueArr = ['PLAN_NAME', 'BEGIN_TIME', 'END_TIME', 'PRIORITY'];
      const drpArr = ['CP_C_SHOP_ID'];
      const mes = this.$OMS2.omsUtils.validatorNotEmpty(self.formConfig, valueArr, drpArr);
      if (mes !== 1) return self.$message.error(mes);
      
      const formConfig = this.goodsTableConfig.businessFormConfig
      /**子表新增校验 */
      // const valueArr2 = ['MIN_REAL_AMT'];
      // let mes2 = this.$OMS2.omsUtils.validatorNotEmpty(formConfig, valueArr2);
      const { PS_C_SPU_ID, PS_C_SKU_ID, MIN_REAL_AMT } = formConfig.formValue
      let mes2 = ''
      if (!MIN_REAL_AMT) {
        mes2 += '最低成交单价'
      }
      if (!(PS_C_SPU_ID || PS_C_SKU_ID)) {
        mes2 += ' SPU/SKU编码'
      }
      mes2 = !mes2 ? '' : `${mes2} 不能为空`
      if ((!(PS_C_SPU_ID || PS_C_SKU_ID)) && this.isMasterRequired && !isSaveAll) {
        return this.$message.error(mes2);
      } // 非回车保存就不提示子表表单校验提示


      /**子表编辑校验 */
      const hasNoValid = this.goodsTableConfig.updateData.some(i => !this.isValid(i, ['PS_C_SKU_ECODE', 'MIN_REAL_AMT']))
      if (hasNoValid) return
    
      let params = {
        ID: this.ID || -1,
        COPY_FLAG: 0,
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
        params.COPY_FLAG = 1
      }
 
      for (let key of ['BEGIN_TIME', 'END_TIME']) {
        if (params.ST_C_PRICE.hasOwnProperty(key)) {
          let val = params.ST_C_PRICE[key]
          params.ST_C_PRICE[key] = this.formatDate(val)
        }
      }
      !mes2 && (params.ST_C_PRICE_ITEM_LIST.push({ ID: -1, ...formConfig.formValue }))
      isSaveAll && (params.ST_C_PRICE_ITEM_LIST = [
        ...params.ST_C_PRICE_ITEM_LIST,
        ...this.goodsTableConfig.updateData
      ])
    
      this.service.strategyPlatform.savePrice(params)
      .then(({ data: { code, data, message }}) => {
        if (code == 0) {
          if (this.ID != -1) {
            // 清空明细表单
            this.goodsTableConfig.businessFormConfig.formValue.MIN_REAL_AMT = ''
            this.setFormValue(this.goodsTableConfig.businessFormConfig, 'PS_C_SKU')
            this.setFormValue(this.goodsTableConfig.businessFormConfig, 'PS_C_SPU')
          }
          this.reloadForm(params.ISACTIVE == 'Y')
          if (isSaveAll) {
            this.modify = { master: {} }
            this.isModify = false
          }
          data && (this.ID = data.objId)
          !this.isCopy && this.queryPrice(data.objId)
          !this.isCopy && this.queryPriceItem(data.objId)
          this.$message.success(message)
          this.isCopy && this.onOk(false, true)
          return
        }
        this.$message.error(message)
      })
    },
  }
};
