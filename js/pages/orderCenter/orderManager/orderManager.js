
  import businessButton from 'professionalComponents/businessButton';
  import businessForm from 'professionalComponents/businessForm';
  import agTable from 'professionalComponents/agGridTable';
  import BurgeonEvent from 'burgeonConfig/config/event.config';
  import businessDialog from 'professionalComponents/businessDialog';
  // import loading from 'professionalComponents/loading.vue';
  import dateUtil from '@/assets/js/__utils__/date.js';
  import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
  import dynamicSearch from '@/views/pages/orderCenter/orderManager/dynamicSearch.vue';
  import formSetting from '@/views/pages/orderCenter/orderManager/formSetting.vue';
  import proDetail from '@/views/pages/orderCenter/orderManager/proDetail';
  import businessAgTable from 'professionalComponents/businessAgTable';
  import modifycurrentLabel from '../../../../assets/js/mixins/modifycurrentLabel';
  export default {
    components: {
      businessButton,
      businessForm,
      agTable,
      dynamicSearch,
      formSetting,
      businessDialog,
      // loading,
      proDetail,
      businessAgTable
    },
    mixins: [isFavoriteMixin, new modifycurrentLabel(true)],
    data() {
      return {
        vmI18n: $i18n,
        vueAgTable:true, //是否切换为vue-ag-table
        modal: false,
        buttonInit: true,
        loading: false,
        agLoaing: false,
        selectKey: [],
        proDetailConfig: {
          // 列表商品明细弹窗配置
          modal_proDetail: false, // 列表商品明细弹窗显示控制
          title: '',
          ID: '',
        },
        importTable: {
          refFuns: 'confirmFun',
          confirmTitle: '导入',
          titleAlign: 'center', // 设置标题是否居中 center left
          width: '572',
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
          componentData: {
            tempApi: '/p/cs/oc/oms/v1/downloadOrderTemp',
            okApi: '/p/cs/oc/oms/v1/importOcBOrder',
            downErrorInfo: true,
            showErrorInfo: true,
          },
        },
        isFolding: true, // 高级搜索是否折叠
        labelValue: '',
        publicBouncedConfig: {
          name: '',
          url: '',
          componentData:{}
        },

        isFolding: true, // 高级搜索是否折叠
        labelValue: '',
        selection: [],
        extendBtn: [
          {
            webname: 'approvalOfAbnormalSellingPrice', // 售价异常审批
            btnclick: () => {
              const self = this;
              self.publicBouncedConfig.name = 'approvalOfAbnormalSellingPrice';
              self.publicBouncedConfig.url = 'modal/orderCenter/exceptionHandle';
              self.publicBouncedConfig.confirmTitle = '售价异常审批';
              self.publicBouncedConfig.width = 800;
              setTimeout(() => {
                self.$children.find((item) => item.name === 'approvalOfAbnormalSellingPrice').openConfirm();
              }, 100);
            },
          },
          {
            webname: 'exceptionAddressMatching', // 异常地址匹配
            btnclick: () => {
              const self = this;
              self.publicBouncedConfig.name = 'exceptionAddressMatching';
              self.publicBouncedConfig.url = 'modal/orderCenter/addressError';
              self.publicBouncedConfig.confirmTitle = '异常地址匹配';
              self.publicBouncedConfig.width = 800;
              setTimeout(() => {
                self.$children.find((item) => item.name === 'exceptionAddressMatching').openConfirm();
              }, 100);
            },
          },
          {
            webname: 'ORDER_DE_AUDIT_ORDER', // 反审核
            btnclick: () => {
              const self = this;
              if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
              if (self.selection.length) {
                let arr = self.selection.map((item) => ({ id: item.ID, bill_no: item.BILL_NO }));
                self.service.orderCenter.backAudit(arr).then((res) => {
                  if (res.data.code == 0) {
                    $omsUtils.msgTips(self, 'success', res.data.message, 0);
                    self.query();
                  } else {
                    // $omsUtils.msgTips(self, 'error', res.data.message, 0);
                    self.$Modal.confirm({
                      title: res.data.message,
                      width: 500,
                      mask: true,
                      className: 'ark-dialog',
                      render: (h) => {
                        if (res.data.data) {
                          return h('Table', {
                            props: {
                              columns: [
                                {
                                  title: $i18n.t('table_label.serialNo'), // 序号
                                  key: 'index'
                                },
                                {
                                  title: $i18n.t('form_label.billNo'), // 单据编号
                                  key:'billNo'
                                },
                                {
                                  title: '失败原因', // '提示信息',
                                  key: 'message',
                                },
                              ],
                              data: res.data.data,
                            },
                          });
                        }
                        return false;
                      },
                    });
                  }
                });
              } else {
                $omsUtils.msgTips(self, 'success', 'a8');
              }
            },
          },
          {
            webname: 'ORDER_AUDIT', // 审核
            btnclick: () => {
              const self = this;
              if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
              if (self.selection.length) {
                let arr = self.selection.map((item) => ({ id: item.ID, bill_no: item.BILL_NO }));
                self.service.orderCenter.audit(arr).then((res) => {
                  if (res.data.code == 0) {
                    $omsUtils.msgTips(self, 'success', res.data.message, 0);
                    self.query();
                  } else {
                    // $omsUtils.msgTips(self, 'error', res.data.message, 0);
                    self.$Modal.confirm({
                      title: res.data.message,
                      width: 500,
                      mask: true,
                      className: 'ark-dialog',
                      render: (h) => {
                        if (res.data.data) {
                          return h('Table', {
                            props: {
                              columns: [
                                {
                                  title: $i18n.t('table_label.serialNo'), // 序号
                                  key: 'index'
                                },
                                {
                                  title: $i18n.t('form_label.billNo'), // 单据编号
                                  key:'billNo'
                                },
                                {
                                  title: '失败原因', // '提示信息',
                                  key: 'message',
                                },
                              ],
                              data: res.data.data,
                            },
                          });
                        }
                        return false;
                      },
                    });
                  }
                });
              } else {
                $omsUtils.msgTips(self, 'success', 'a8');
              }
            },
          },
          {
            webname: 'modificationOfAbnormalMerchandise', // 异常商品修改
            btnclick: () => {
              const self = this;
              self.publicBouncedConfig.name = 'modificationOfAbnormalMerchandise';
              self.publicBouncedConfig.url = 'modal/orderCenter/productError';
              self.publicBouncedConfig.confirmTitle = '异常商品修改';
              self.publicBouncedConfig.width = 800;
              setTimeout(() => {
                self.$children.find((item) => item.name === 'modificationOfAbnormalMerchandise').openConfirm();
              }, 100);
            },
          },
          {
            webname: 'MarkingOcBOrder', // 加急发货
            btnclick: () => {
              this.urgentShipment();
            },
          },
          {
            webname: 'returnConfirmation', // 退货确认
            btnclick: () => {
              this.returnConfirm();
            },
          },
          {
            webname: 'returnModifyWarehouse', // 改退回仓库
            btnclick: () => {
              const self = this;
              if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
              if(!self.selection.length){
                $omsUtils.msgTips(self, 'warning', 'l0');
                return;
              }
              //前置条件判断
              let arr = self.selection.map(item=>{
                return {
                  ID:item.ID,
                  BILL_NO:item.BILL_NO
                }
              })
              self.service.orderCenter.checkReturnOrderBeforeWarehouse({
                ID_AND_BILL_NO_LIST:arr
              }).then(res=>{
                if(res.data.code == 0){
                  self.publicBouncedConfig.name = 'modifyWarehouse';
                  self.publicBouncedConfig.url = 'modal/orderCenter/modifyWarehouse';
                  self.publicBouncedConfig.confirmTitle = '改退回仓库';
                  self.publicBouncedConfig.width = 500;
                  self.publicBouncedConfig.maskClosable = false;
                  self.publicBouncedConfig.componentData = {
                    row : self.selection
                  }
                  setTimeout(() => {
                    self.$children.find((item) => item.name === 'modifyWarehouse').openConfirm();
                  }, 100);
                }else {
                  $omsUtils.msgTips(self, 'warning', res.data.message, 0);
                }
              });
            },
          },
          {
            webname: 'returnModifyLogistics', // 改退回物流
            btnclick: () => {
              const self = this;
              if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
              if(!self.selection.length){
                $omsUtils.msgTips(self, 'warning', 'l0');
                return;
              }
              if(self.selection.length > 1){
                $omsUtils.msgTips(self, 'warning', 'dr');
                return;
              }
              //前置条件判断
              let arr = self.selection.map(item=>{
                return {
                  ID:item.ID,
                  BILL_NO:item.BILL_NO
                }
              })
              self.service.orderCenter.checkReturnOrderBeforeLogistics({
                ID_AND_BILL_NO_LIST:arr,
                MOCK_TYPE:1
              }).then(res=>{
                if(res.data.code == 0){
                  self.publicBouncedConfig.name = 'returnModifyLogistics';
                  self.publicBouncedConfig.url = 'modal/orderCenter/modifyReturnLogistics';
                  self.publicBouncedConfig.confirmTitle = '改退回物流';
                  self.publicBouncedConfig.width = 500;
                  self.publicBouncedConfig.maskClosable = false;
                  self.$set(self.publicBouncedConfig.componentData , 'row' , self.selection);
                  self.$set(self.publicBouncedConfig.componentData , 'data' , res.data.data);
                  setTimeout(() => {
                    self.$children.find((item) => item.name === 'returnModifyLogistics').openConfirm();
                  }, 100);
                }else {
                  $omsUtils.msgTips(self, 'warning', res.data.message, 0);
                }
              });
            },
          },
          {
            webname: 'OC_ORDER_ADD_LABEL',  //添加标记
            btnclick:()=>{
              const self = this;
              if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
              if(!self.selection.length){
                $omsUtils.msgTips(self, 'warning', '请选择需要标记的单据' , 0);
                return;
              }
              const ids = self.selection.map(item=>item.ID);
              self.publicBouncedConfig.name = 'OC_ORDER_ADD_LABEL';
              self.publicBouncedConfig.url = 'modal/orderCenter/addFlag';
              self.publicBouncedConfig.confirmTitle = '添加标记';
              self.publicBouncedConfig.width = 500;
              self.publicBouncedConfig.componentData = {
                ids,
                title:'添加标记'
              }
              setTimeout(() => {
                self.$children.find((item) => item.name === 'OC_ORDER_ADD_LABEL').openConfirm();
              }, 100);
            },
          },
          {
            webname: 'OC_ORDER_CANCEL_LABEL',  //取消标记
            btnclick:()=>{
              const self = this;
              if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
              if(!self.selection.length){
                $omsUtils.msgTips(self, 'warning', '请选择需要标记的单据' , 0);
                return;
              }
              const ids = self.selection.map(item=>item.ID);
              self.publicBouncedConfig.name = 'OC_ORDER_ADD_LABEL';
              self.publicBouncedConfig.url = 'modal/orderCenter/addFlag';
              self.publicBouncedConfig.confirmTitle = '取消标记';
              self.publicBouncedConfig.width = 500;
              self.publicBouncedConfig.componentData = {
                ids,
                title:'取消标记'
              }
              setTimeout(() => {
                self.$children.find((item) => item.name === 'OC_ORDER_ADD_LABEL').openConfirm();
              }, 100);
            },
          },
          {
            webname: 'orderExport', //导出
            btnclick:()=>{
              const self = this;
              if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
              const ids = self.selection.map(item=>item.ID);
              if(self.selection.length){
                self.exportDate(self.tablename , ids)
              }else {
                this.$Modal.warning({
                  title:'警告',
                  className: 'ark-dialog',
                  content:'该操作为全量导出,导出数据较大,建议在服务器空闲时候导出,如需继续,请点击确定按钮!',
                  showCancel:true,
                  mask:true,
                  onOk:()=>{
                    self.exportDate(self.tablename , ids)
                  }
                })
              }
            }
          },
          {
            webname: 'returnOrderExport', //导出
            btnclick:()=>{
              const self = this;
              if(!self.vueAgTable){
                self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
              }
              const ids = self.selection.map(item=>item.ID);
              if(self.selection.length){
                self.exportDate(self.tablename , ids)
              }else {
                this.$Modal.warning({
                  title:'警告',
                  className: 'ark-dialog',
                  content:'该操作为全量导出,导出数据较大,建议在服务器空闲时候导出,如需继续,请点击确定按钮!',
                  showCancel:true,
                  mask:true,
                  onOk:()=>{
                    self.exportDate(self.tablename , ids)
                  }
                })
              }
            }
          },
        ],
        dropDownList: [],
        btnConfig: {
          typeAll: 'default', // 按钮统一风格样式
          loading: false, // 按钮加载
          buttons: [],
        },
        eventGather: BurgeonEvent,
        searchBtn: {
          btnsite: 'right',
          buttonsRight: [
            {
              text: $i18n.t('btn.find'), // 查找 按钮文本
              // text: $i18n.t('btn.search'), // 搜索
              size: 'large',
              shape: 'circle',
              // icon: 'ios-search',
              webname: 'search',
              btnclick: () => {
                this.agTableConfig.pagenation.current = 1;
                this.query();
              }, // 按钮点击事件
            },
            {
              text: $i18n.t('btn.reset'), // 按钮文本 重置
              size: 'large',
              shape: 'circle',
              // icon: 'ios-refresh',
              webname: 'reset',
              btnclick: () => {
                this.reset();
                if (this.$refs.dynamicSearch) this.$refs.dynamicSearch.reset();
              }, // 按钮点击事件
            },
          ],
        },
        formConfig: {
          flodClick: () => {
            this.shutDownOrbounceOff();
          },
          gridBar:true,
          formData: [],
          formValue: {},
          ruleValidate: {},
        },
        tabList: [],
        agTableConfig: {
          pageShow: true,
          tableHeight: '412px',
          columnDefs: [],
          rowData: [],
          renderArr: {
            PRODUCT_DETAILS: (params) => {
              const proDetail = document.createElement('a');
              const self = this;
              proDetail.innerText = params.data.PRODUCT_DETAILS;
              proDetail.onclick = function () {
                self.proDetailConfig.modal_proDetail = true;
                self.proDetailConfig.title = params.data.PRODUCT_DETAILS;
                self.proDetailConfig.ID = params.data.ID;
              };
              return proDetail;
            },
            PACKAGE_DETAILS: (params) => {
              const proDetail = document.createElement('a');
              const self = this;
              proDetail.innerText = params.data.PACKAGE_DETAILS;
              proDetail.onclick = function () {
                self.proDetailConfig.modal_proDetail = true;
                self.proDetailConfig.title = params.data.PACKAGE_DETAILS;
                self.proDetailConfig.ID = params.data.ID;
              };
              return proDetail;
            },
            ORDER_TAG: (params) => {
              const resultElement = document.createElement('div');
              params.data.ORDER_TAG.forEach((item) => {
                const tag = document.createElement('span');
                tag.innerText = item.text;
                tag.style.color = item.clr;
                tag.style.border = `1px solid${item.clr}`;
                tag.style.margin = '0 2px';
                tag.style.borderRadius = '6px';
                tag.style.padding = '2px';
                resultElement.appendChild(tag);
              });
              return resultElement;
            },
          },
          pagenation: {
            // 设置总条数
            total: 0,
            // 条数
            pageSize: 10,
            // 页数
            current: 1,
            pageSizeOpts: [],
          },
          renderParams:(cellData)=> {
            if (cellData.field == 'ORDER_TAG') {
                return {
                    renderContainer: 'CellRenderByFunction',
                    renderComponent: (h, params) => {
                        return h('div', {
                            domProps: {
  
                            }
                        },
                            params.row.ORDER_TAG.map(item => h('span', {
                                domProps: {
                                    innerText: item.text
                                },
                                style: {
                                    border: `1px solid${item.clr}`,
                                    color: item.clr,
                                    margin: '0 2px',
                                    borderRadius: '6px',
                                    padding: '2px'
                                }
                            }))
                        )
                    }
                }
            }else if(cellData.field == 'PRODUCT_DETAILS'){
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h , params) => {
                  return h('a' , {
                    on:{
                      click:()=>{
                        this.proDetailConfig.modal_proDetail = true;
                        this.proDetailConfig.title = params.row.PRODUCT_DETAILS;
                        this.proDetailConfig.ID = params.row.ID;
                      }
                    }
                  }, params.row.PRODUCT_DETAILS)
                }
              }
            }else if(cellData.field == 'PACKAGE_DETAILS'){
              return {
                renderContainer: 'CellRenderByFunction',
                renderComponent: (h , params) => {
                  return h('a' , {
                    on:{
                      click:()=>{
                        this.proDetailConfig.modal_proDetail = true;
                        this.proDetailConfig.title = params.row.PACKAGE_DETAILS;
                        this.proDetailConfig.ID = params.row.ID;
                      }
                    }
                  }, params.row.PACKAGE_DETAILS)
                }
              }
            }
          },
        },
        options:{
          rowHeight: 40,
          getMainMenuItems: this.getMainMenuItems,
          datas:{},
          floatingFilter:false
        },
        dynamicData: {},
        modifyWarehouse:{
          componentData:{}
        },
      };
    },
    watch: {},
    computed: {
      tablename() {
        const self = this;
        return self.$route.params.customizedModuleName == 'ORDERMANAGER' ? 'OC_B_ORDER' : self.$route.params.customizedModuleName;
      },
      colRowNum(){
        return $store.state.customize.colRowNum;
      }
    },
    activated(){
      const self = this;
      this.$OMS2.BtnConfig.target = self;
      BurgeonEvent.target = self;
      this.$OMS2.BtnConfig.singleType = 0;
    
    },
    mounted() {
      const self = this;
      self.initList();
      /* setTimeout(() => {
        let ZH = localStorage.getItem("locale") == "zh"
        if(!ZH) {
          const p1 = document.getElementsByClassName('ark-page-options-elevator')[0];
          p1.children[0].innerHTML = 'Page:'
          p1.children[2].innerText = ''
          const p2 = document.getElementsByClassName('ark-page-options-sizer')[0];
          p2.childNodes[0].innerText = '  10 items / page';
        }
      }, 10); */
    },
    methods: {
      gridReady() {
        this.tabth = [
          {
            field: 'name',
            displayName: '名称'
          }
        ];
        this.row = [
          {
            name: '测试'
          }
        ];
      },
      shutDownOrbounceOff() {
        const self = this;
        self.isFolding = !self.isFolding;
        self.reset();
        self.initList(self.isFolding);
      },
      handleDragDrop(name, newName, a, b, names) {
        // names 为调整后的 name 集合
        this.tabList.splice(b, 1, ...this.tabList.splice(a, 1, this.tabList[b]));
      },
      labelClick(val) {
        this.agTableConfig.pagenation.current = 1;
        this.labelValue = val;
        this.query();
      },
      initList(fold = true, aG = false) {
        const self = this;
        const data = {
          TABLE: self.tablename,
          FOLD: fold,
        };
        self.service.orderCenter.initList(data).then((res) => {
          if (res.data.code === 0) {
            if (res.data.data.ZIP) {
            } else {
              const data = res.data.data.DATA;
              if (!aG) {
                self.initForm(data.ADVANCE); // 高级搜索赋值
                self.dynamicData = data.DYNAMIC; // 动态搜索赋值
              }
              // 列表初始化
              const columns = data.TAB_HEADER; // 表头赋值
              const rowData = [];
              // 存储表格数据
              self.agTableConfig.pagenation.pageSizeOpts = data.PAGE_INFO.SIZE_GROUP;
              self.agTableConfig.pagenation.pageSize = data.PAGE_INFO.DEFAULT_SIZE;
              if(self.vueAgTable){
                columns.forEach(item => {
                  // item['displayName'] = item.headerName;
                  item.thAlign = 'center';
                });
                columns.unshift({
                  "headerName":"序号",
                  "width":90,
                  "field":"index",
                  "sort":10,
                  checkboxSelection:true ,
                  pinned: 'left',
                  headerClass: '',
                  thAlign: 'center',
                  tdAlign: 'center',
                  cellStyle: {color: 'rgb(15, 142, 233)'},
                })
              }
              self.agTableConfig.columnDefs = columns;
              self.agTableConfig.rowData = rowData;
              if(!self.vueAgTable){
                self.$refs.agGridChild.agGridTable(columns, rowData);
              }
              self.tabList = data.TAB_LABEL; // tabs赋值
              self.labelValue = data.TAB_LABEL[0].value;
              self.query(aG);
            }
          }
        });
        if (aG) return
        self.btnConfig.buttons = []; // 清空按钮缓存,防止重复叠加按钮
        const buttons = self.$OMS2.BtnConfig.config();
        self.btnConfig.buttons = [...buttons.buttons, ...self.extendBtn];
        $omsUtils.getPermissions(self, 'btnConfig', { table: self.tablename, type: 'LIST' });
      },
      initForm(data) {
        const self = this;
        const formdata = [];
        self.selectKey = [];
        data.forEach((ele, i) => {
          switch (ele.DISPLAY) {
          case 'TEXT':
            formdata.push({
              colname: ele.NAME,
              style: 'input', // 控件类型
              label: ele.DESC, // 控件label名称
              value: ele.NAME, // 控件key
              width: '6', // 控件宽度
              disabled: false, // 是否禁用
              maxlength: ele.LENGTH, // 输入长度
              regx: /^[^']*$/,
              inputChange: () => {
              },
              inputenter: () => {
                this.agTableConfig.pagenation.current = 1;
                this.query();
              },
            });
            self.$set(self.formConfig.formValue, ele.NAME, '');
            break;
          case 'SELECT':
            self.selectKey.push(ele.NAME);
            formdata.push({
              colname: ele.NAME,
              style: 'select', // 下拉框类型
              label: ele.DESC,
              width: '6', // 所占宽度宽度
              value: ele.NAME, // 输入框的值
              clearable: true,
              selectChange: () => { },
              disabled: false,
              options: ele.COMBOBOX,
              multiple: true,
            });
            self.$set(self.formConfig.formValue, ele.NAME, '');
            break;
          case 'FK_TABLE':
            formdata.push({
              version: '1.4',
              colname: ele.NAME, // 控件key
              style: 'popInput', // 输入框弹框单多选
              width: '6',
              itemdata: {
                col: 1,
                colid: ele.ID, // 当前字段的ID
                colname: ele.NAME, // 当前字段的名称
                datelimit: 'all',
                display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
                // fkdisplay: 'drp', // 外键关联类型
                fkdisplay: ele.REF_DISPLAY, // 外键关联类型
                fkdesc: '商品SPU',
                inputname: 'PS_C_PRO_ID:ECODE', // 这个是做中文类型的模糊查询字段，例如ENAME
                isfk: true, // 是否有fk键
                isnotnull: false, // 是否必填
                isuppercase: false, // 是否转大写
                length: 65535, // 最大长度是多少
                name: ele.DESC, // 赔付类型
                readonly: false, // 是否可编辑，对应input   readonly属性
                reftable: ele.REF_TB_NAME, // 对应的表
                reftableid: ele.REF_TB_ID, // 对应的表ID
                row: 1,
                statsize: -1,
                type: 'STRING', // 这个是后台用的
                valuedata: '', // 这个是选择的值
                pid: '', // 啥 ？？？
                serviceId: ele.CENTER
              },
              oneObj: (e) => {
                self.$set(self.formConfig.formValue, ele.NAME, e.pid);
              },
            });
            self.$set(self.formConfig.formValue, ele.NAME, '');
            break;
          case 'OBJ_DATE':
            formdata.push({
              style: 'date',
              type: 'daterange',
              colname: ele.NAME,
              // type: 'datetimerange', // 日期组件类型,默认为data  (daterange)为双日期区间选择
              value: ele.NAME,
              label: ele.DESC, // 平台修改时间
              width: '6',
              format: 'yyyy-MM-dd HH:mm:ss', // 格式参照burgeonui
              placeholder: '',
              onChange: (val) => {
              },
            });
            self.$set(self.formConfig.formValue, ele.NAME, ['', '']);
            break;
          case 'RANGE':
            formdata.push({
              style: 'bothInput', // 双input框控件
              colname: ele.NAME,
              label: ele.DESC,
              value: ele.NAME,
              regx: /^\d/,
            });
            self.$set(self.formConfig.formValue, ele.NAME, ['', '']);
            break;
          case 'RADIOGROUP':
            formdata.push({
              style: 'radio',
              colname: ele.NAME,
              value: ele.NAME,
              label: ele.DESC,
              width: '6',
              options: ele.COMBOBOX,
            });
            self.$set(self.formConfig.formValue, ele.NAME, '');
            break;
          }
        });
        self.formConfig.formData = formdata;
      // 配置必填**************************************************
      // self.formConfig.ruleValidate = {
      //   ORDER_TAG: [{ required: true, message: ' ', trigger: 'blur' }],
      // };
      },
      queryData() {
        const self = this;
        const obj = {};
        obj.TABLE = self.tablename;
        // 整合参数
        const ADVANCE = []; // 高级搜索输入参数
        const formValue = JSON.parse(JSON.stringify(self.formConfig.formValue));
        for (const key in formValue) {
          if (formValue[key] instanceof Array) {
            // '全部'参数过滤
            if (formValue[key] && formValue[key].length && formValue[key][0] == 'bSelect-all') {
              formValue[key] = '';
            } else if (formValue[key].length) {
              formValue[key] = formValue[key].filter(it => it != '');
              if (!formValue[key].length) {
                formValue[key] = '';
              } else {
                const obj = {
                  NAME: key,
                  VAL: self.getFormStyle(key) == 'date' ? `${dateUtil.getFormatDate(new Date(formValue[key][0]), 'yyyy-MM-dd HH:mm:ss')}~${dateUtil.getFormatDate(new Date(formValue[key][1]), 'yyyy-MM-dd HH:mm:ss')}` : self.getFormStyle(key) == 'bothInput' ? `${formValue[key][0]}~${formValue[key][1]}` : `${formValue[key].join(',')}`,
                };
                ADVANCE.push(obj);
              }
            }
          } else if (typeof formValue[key] == 'object') {
            if (self.selectKey.includes(key)) {
              const obj = {
                NAME: key,
                VAL: formValue[key].join(','),
              };
              ADVANCE.push(obj);
            } else if (formValue[key][0]) {
              const obj = {
                NAME: key,
                VAL: typeof formValue[key][0] == 'object' ? `${dateUtil.getFormatDate(new Date(formValue[key][0]), 'yyyy-MM-dd HH:mm:ss')}~${dateUtil.getFormatDate(new Date(formValue[key][1]), 'yyyy-MM-dd HH:mm:ss')}` : `${formValue[key][0]}~${formValue[key][1]}`,
              };
              ADVANCE.push(obj);
            }
          } else if (formValue[key]) {
            if (!formValue[key]) return;
            const obj = {
              NAME: key,
              VAL: formValue[key],
            };
            ADVANCE.push(obj);
          }
        }
        obj.ADVANCE = ADVANCE; // 高级搜索
        if (self.$refs.dynamicSearch && self.$route.params.customizedModuleName == 'ORDERMANAGER') {
          const pa = JSON.parse(JSON.stringify(self.$refs.dynamicSearch.dynamicStructure));
          obj.DYNAMIC = pa.filter(i => typeof i.VAL != 'undefined' && i.VAL); // 动态搜索
          obj.DYNAMIC.forEach(it => {
            // 日期类型入参处理
            if (it.DISPLAY == 'OBJ_DATE') {
              if (it.VAL instanceof Array) {
                // 日期范围类型
                it.VAL = typeof it.VAL[0] == 'string' ? `${dateUtil.getFormatDate(new Date(it.VAL[0]), 'yyyy-MM-dd HH:mm:ss')}~${dateUtil.getFormatDate(new Date(it.VAL[1]), 'yyyy-MM-dd HH:mm:ss')}` : `${it.VAL[0]}~${it.VAL[1]}`
              } else {
                it.VAL = dateUtil.getFormatDate(new Date(it.VAL[0]), 'yyyy-MM-dd HH:mm:ss');
              }
            }
            if (it.DISPLAY == 'RANGE') {
              it.VAL = `${it.VAL[0]}~${it.VAL[1]}`
            }
            // 删除后端不要的字段
            delete it.DISPLAY;
            delete it.TYPE;
            delete it.index;
            delete it.COMBOBOX;
          })
          if(obj.DYNAMIC.length) obj.DYNAMIC[0].RLT = "AND";
        }

        // 分页数据
        const pagenation = self.agTableConfig.pagenation;
        const PAGE = {
          SIZE: pagenation.pageSize,
          INDEX: pagenation.current,
          NUM: 21,
          COUNT: pagenation.total,
        };
        obj.PAGE = PAGE;
        // tabs状态
        const TAB_LABEL = {
          // NAME: 'ORDER_STATUS',
          VAL: self.labelValue,
        // ORDER_STATUS.OC_B_ORDER_ITEM
        // 1,2
        };
        obj.TAB_LABEL = TAB_LABEL;
        const SORT = [
        // 排序
        // {
        //   NAME: 'CREATIONDATE',
        //   ASC: false
        // }, {
        //   NAME: 'MODIFIEDDATE',
        //   ASC: true
        // }
        ];
        obj.SORT = SORT;
        return obj;
      },
      query(aG = false) {
        const self = this;
        const data = self.queryData();
        // self.loading = true;
        self[aG ? 'loading' : 'agLoaing'] = true;
        self.service.orderCenter.queryList(data).then((res) => {
          if (res.data.code == 0) {
            let data;
            if (!res.data.data.ZIP) {
              // 为未压缩数据
              data = res.data.data.DATA;
            }
            // 分页赋值
            self.agTableConfig.pagenation.total = data.COUNT;
            data.ITEMS.forEach((item , index)=> {
              item['index'] = index+1
            })
            self.agTableConfig.rowData = data.ITEMS;
            if(!self.vueAgTable){
              self.$refs.agGridChild.agGridTable(self.agTableConfig.columnDefs, self.agTableConfig.rowData);
            }
          }
          self[aG ? 'loading' : 'agLoaing'] = false;
          // self.loading = false;
        });
        self.service.orderCenter.queryStatistics(data).then((res) => {
          if (res.data.code == 0) {
            if (!res.data.data.ZIP) {
              const data = res.data.data.DATA;
              self.tabList.forEach((item) => {
                // if (data[item.value]) { // 拿到的是值,所以0条的时候会异常
                if (Object.keys(data).includes(item.value)) {
                  item.label = `${item.label.split('(')[0]}(${data[item.value]})`;
                }
              });
            }
          }
          self[aG ? 'loading' : 'agLoaing'] = false;
          // self.loading = false;
        });
        this.selection = []; // 解决弹窗关闭后刷新页面没有刷掉选中项目的问题
      // self.service.orderCenter.queryStatistics(data).then((res) => {
      //   if (res.data.code == 0) {
      //     if (!res.data.data.ZIP) {
      //       const data = res.data.data.DATA;
      //       self.tabList.forEach((item) => {
      //         // if (data[item.value]) { // 拿到的是值,所以0条的时候会异常
      //         if (Object.keys(data).includes(item.value)) {
      //           item.label = `${item.label.split('(')[0]}(${data[item.value]})`;
      //         }
      //       });
      //     }
      //   }
      // });
      },
      onRowDblclick(val) {
        const self = this;
        switch(self.tablename){
          case 'OC_B_ORDER':
            this.$store.commit('global/tabOpen', {
            type: 'C',
            customizedModuleName: this.tablename,
            label: $i18n.t('panel_label.retailInvoice_details'), //零售发货单详情
            customizedModuleId: val.ID,
          });
          break;
          case 'OC_B_RETURN_ORDER':
            if(val.BILL_TYPE == 0){
              this.$store.commit('global/tabOpen', {
              type: 'V',
              tableName: 'OC_B_RETURN_ORDER_VIRTUAL_TABLE',
              label: $i18n.t('menu.b7'), //退货单详情
              tableId: 10728,
              id:`${val.ID}?RETURN_SOURCE=${val.RETURN_SOURCE}&SOURCE_CODE=${val.SOURCE_CODE}`
            });
            }else if(val.BILL_TYPE == 1) {
              this.$store.commit('global/tabOpen', {
              type: 'V',
              tableName: 'OC_B_RETURN_ORDER_ECXCHANGE_TABLE',
              label: $i18n.t('menu.b8'), //换货单详情
              tableId: 10754,
              id:`${val.ID}?RETURN_SOURCE=${val.RETURN_SOURCE}&SOURCE_CODE=${val.SOURCE_CODE}`
            });
            }
            break;
        }
      },
      pageSizeChange(val) {
        const self = this;
        self.agTableConfig.pagenation.pageSize = val;
      },
      pageChange(val) {
        const self = this;
        self.agTableConfig.pagenation.current = val;
        self.query();
      },
      reset() {
        const self = this;
        self.agTableConfig.pagenation.current = 1;
        const formValue = self.formConfig.formValue;
        for (const key in formValue) {
          if (typeof formValue[key] == 'object') {
            const arr = ['', ''];
            formValue[key] = arr;
          } else {
            formValue[key] = '';
          }
        }

        // 清空外键关联项的显示参数
        self.formConfig.formData.forEach(item => {
          if (item.itemdata) {
            item.itemdata.pid = '';
            item.itemdata.valuedata = '';
          }
        });
      },
      urgentShipment() {
        const self = this;
        if(!self.vueAgTable){
          self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
        }
        const IDS = self.selection.map((item) => item.ID);
        if (!IDS.length) {
          $omsUtils.msgTips(self, 'warning', '请选择需要打标的单据!', 0);
          return;
        }
        self.$Modal.fcWarning({
          title: '加急打标',
          content: self.vmI18n.t('modalTips.yc'),
          showCancel: true,
          onOk: () => {
            if (IDS.length == 1) {
              // 单条数据效验状态是否符合
              self.service.orderCenter.checkOrderDeliveryUrgent({ IDS }).then((res) => {
                if (res.data.code == 0) {
                  this.urgentShipmentRqu(IDS);
                }
              });
            } else {
              this.urgentShipmentRqu(IDS);
            }
          }
        });
      },
      urgentShipmentRqu(IDS) {
        const self = this;
        self.service.orderCenter.orderDeliveryUrgent({ IDS }).then((res) => {
          if (res.data.code == 0) {
            $omsUtils.msgTips(self, 'success', res.data.message, 0);
            self.query();
          }
        });
      },
      returnConfirm(){  //退货确认
        let self = this;
        if(!self.vueAgTable){
          self.selection = self.$refs.agGridChild.AGTABLE.getSelect();
        }
        if(!self.selection.length){
          $omsUtils.msgTips(self, 'warning', 'ju');
          return;
        }
        if(self.selection.length > 1){
          $omsUtils.msgTips(self, 'warning', 'kg');
          return;
        }
        self.service.orderCenter.returnConfirmCheck({ID:self.selection[0].ID}).then(res=>{
          if(res.data.code == 0){
            this.$Modal.confirm({
              className: 'ark-dialog',
              title: $i18n.t('modalTitle.tips'),
              content:res.data.message,
              showCancel:true,
              mask: true,
              onOk:()=>{
                self.service.orderCenter.returnConfirm({
                  ID:self.selection[0].ID
                }).then(res=>{
                  if(res.data.code == 0){
                    $omsUtils.msgTips(self, 'success', res.data.message, 0)
                    self.query();
                  }else {
                    // $omsUtils.msgTips(self, 'error', res.data.message, 0)
                  }
                })
              }
            })
          } else {
            // $omsUtils.msgTips(self, 'error', res.data.message, 0)
          };
        })
      },
      /**
       * 
       * 该方法用于根据formValue里的字段,在formData里查询对应的控件类型
       * @param {String} colname formValue里的字段
       */
      getFormStyle(colname){
        const self = this;
        const formData = self.formConfig.formData;
        return formData.filter(item=>item.colname == colname)[0].style;
      },
      /**
       * 该方法用于数据导出
       * @param {String} tablename 导出表名
       * @param {Array} ids 列表选中数据
       */
      exportDate(tablename , ids){
        let self = this;
        let obj = {};
        if(ids.length){
          obj = {
            IDS:ids
          }
        }else {
          obj = self.queryData();
        }
        obj.TABLE = tablename;
        self.service.orderCenter.orderExport(obj).then(res=>{
          if(res.data.code == 0){
            $omsUtils.msgTips(self, 'success', res.data.message, 0)
            let a = document.createElement("a");
            a.download = tablename + ".xls";
            a.href = res.data.data;
            $("body").append(a); // 修复firefox中无法触发click
            a.click();
            $(a).remove();
          }else {
            $omsUtils.msgTips(self, 'error', res.data.message, 0)
          }
        })
      },
      colPinned(data) { },
      colMoved(columns) {
        let newCol = [], obj = {};
        columns.forEach((x,y) => {
          if (x.colId == 'index') {
            return
          } else {
            obj = {
              NO: (y + 1) * 10,
              NAME: x.colId,
              // ID: parentNode[i].getAttribute('ID'),
              DISPLAY: x.visible,
              DESC: x.colDef.displayName,
            };
            newCol.push(obj);
          }
        });
        const data = {
          TABLE: this.tablename,
          TYPE: 'L_TAB_HEAD',
          ACTION: 'SAVE',
          DATA: newCol
        };
        this.service.orderCenter.customSettings(data).then(res => {
        }).catch(e => {
        });
      },
      getMainMenuItems() {
        return [
          'pinSubMenu',
          'separator',
          'autoSizeThis',
          'autoSizeAll',
          'separator',
          {
            name: '重置所有列位置信息',
            action: () => {
             this.handelColnumn('L_TAB_HEAD', 'RELOAD', {});
            },
          },
        ];
      },
      handelColnumn (type, action, obj) {
        const self = this;
        const data = {
          TABLE: self.tablename,
          TYPE: type,
          ACTION: action,
          DATA: obj
        };
        self.service.orderCenter.customSettings(data).then(res => {
          if (res.data.code == 0) {
            self.$Message.success(res.data.message);
            self.initList(0,1);
          } else {
            // self.$Message.error(res.data.message);
          }
        });
      },
      colSortChange(data) { },
      onSelectionChange(data){
        this.selection = data;
      }
    },
  };
