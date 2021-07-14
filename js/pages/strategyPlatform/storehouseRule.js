import businessButton from 'professionalComponents/businessButton';
import businessForm from 'professionalComponents/businessForm';
// import loading from 'professionalComponents/loading';
import businessLabel from 'professionalComponents/businessLabel';
import service from '@/service/index';
import businessDialog from 'professionalComponents/businessDialog';
import dateUtil from '@/assets/js/__utils__/date.js';
import subTable from 'professionalComponents/subTable';
import businessActionTable from 'professionalComponents/businessActionTable'
import modifycurrentLabel from '../../../assets/js/mixins/modifycurrentLabel';


export default {
  components: {
    businessButton,
    businessForm,
    businessLabel,
    businessDialog,
    businessActionTable,
    subTable
  },
  mixins: [modifycurrentLabel],
  data() {
    return {
      baseInformation:$i18n.t('other.basic_info'),
      placeholder: '省市搜索',//省市搜索
      loading: false,
      pageShow: false,
      seachVal: '',
      pageNum: 1, //页码
      pageSize: 10, //每页条数
      id: '', // 判断页面类型
      panelDefaultValue: 'panel_baseInfo', // 设置默认打开'基本信息'
      // tab切换配置
      labelList: [
        {
          label: $i18n.t('form_label.a5'),
          value: 'PROPERTY'
        },
        {
          label: $i18n.t('panel_label.operationLog'), // 操作日志
          value: 'ST_ASSIGN_LOGISTICS_LOG'
        }
      ],
      labelDefaultValue: 'PROPERTY', // 设置tab默认值，默认展示'自定义属性'
      btnConfig: {
        typeAll: 'default',
        buttons: [
          {
            text: $i18n.t('btn.save'), // 保存
            size: '', // 按钮大小
            isShow: false,
            webname: this.$route.params.customizedModuleName + "_save",
            disabled: false, // 按钮禁用控制
            btnclick: this.isfnSave
          },
          {
            isShow: false,
            webname: this.$route.params.customizedModuleName + "_back",
            text: $i18n.t('btn.back'),
            btnclick: this.back
          },
          {
            text: $i18n.t('common.copy'),//'复制',
            isShow: false,
            webname:"copy",
            disabled: false, // 按钮禁用控制
            btnclick: this.fnCopy
          },

          {
            text: '下一步',
            isShow: false,
            btnclick: () => {
              this.fnSave(2);
            }
          },
          {
            text: '上一步',
            isShow: false,
            btnclick: () => {
              this.lastStep();
            }
          }
        ]
      },
      btnConfig2: {
        typeAll: 'default',
        buttons: [
          {
            text: $i18n.t('btn.import'),//'导入',
            isShow: false,
            webname: this.$route.params.customizedModuleName + "_Import",
            disabled: false, // 按钮禁用控制
            btnclick: this.importData
          },
          {
            text: $i18n.t('btn.export'),//'导出',
            disabled: false, // 按钮禁用控制
            btnclick: this.fnoWexportData
          }
        ]
      },
      formConfig: {
        formData: [
          {
            style: null,
            label: '策略ID',
            value: 'ecode',
            colname: 'ecode',
            width: '8',
            disabled: true,
            inputChange: () => { }
          },
          {
            style: 'input',
            label: '策略名称',
            value: 'ename',
            colname: 'ename',
            width: '8',
            maxlength: 200,
            disabled: false,
            inputChange: () => { }
          },
          {
            style: 'date',
            type: "datetime",
            label: '生效开始时间',
            value: 'beginTime',
            colname: 'beginTime',
            format: 'yyyy-MM-dd HH:mm:ss',
            width: '8',
            disabled: false,
            transfer: true,
            onChange: () => {

            }
          },
          {
            style: 'date',
            label: '生效结束时间',
            type: "datetime",
            value: 'endTime',
            colname: 'endTime',
            format: 'yyyy-MM-dd HH:mm:ss',
            width: '8',
            disabled: false,
            transfer: true,
            onChange: () => {
              if (!this.formConfig.formValue.endTime) return
              this.formConfig.formValue.endTime = $omsUtils.defaultEndTime(this.formConfig.formValue.endTime, this.formConfig.formValue.endTime)

            }
          },
          {
            style: 'select',
            label: '类型',
            value: 'type',
            colname: 'type',
            width: '8',
            disabled: false,
            selectChange: v => {
            
              if (v.value == 171897) { //表示选择了唯品会
                this.qurefrom("areaLevel")[0].style = null
              } else {
                this.qurefrom("areaLevel")[0].style = "radio"
              }
              this.formConfig.formValue.type = v.value
              this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.pid = '';
              this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.valuedata = '';
              this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.colid = v.value;
            
            }, // 选中事件，默认返回选中的值,默认返回当前值value
            options: [
              // 下拉框选项值
              {
                value: 171868,
                label: '收货地址就近'
              },
              {
                value: 171897,
                label: '唯品会'
              }
            ]
          },
          {
            version: '1.4',
            colname: 'cpCPhyWarehouseEname',
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 171647, // 当前字段的ID
              colname: 'CP_C_SHOP_IDS:CP_C_SHOP_TITLE', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'drp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: '仓库名称', // 赔付类型
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
              reftableid: 10285, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              isBackRowItem: true,
              pid: '' // 啥 ？？？
            },
            oneObj: val => {
              console.log(val);
              if (val.ECODE.val) {
                // 选中触发事件
                this.formConfig.formValue.cpCPhyWarehouseEcode = val.ECODE.val;
                this.formConfig.formValue.cpCPhyWarehouseEname = val.ENAME.val;
                this.formConfig.formValue.cpCPhyWarehouseId = val.ID.val;
              } else {
                this.formConfig.formValue.cpCPhyWarehouseEcode = val.ECODE;
                this.formConfig.formValue.cpCPhyWarehouseEname = val.ENAME
                this.formConfig.formValue.cpCPhyWarehouseId = val.id
              }

            }
          },
          {
            version: '1.4',
            colname: 'CP_C_SHOP_IDS',
            style: 'popInput', // 输入框弹框单多选
            width: '8',
            itemdata: {
              col: 1,
              colid: 171868, // 当前字段的ID
              colname: 'CP_C_SHOP_IDS:CP_C_SHOP_TITLE', // 当前字段的名称
              datelimit: 'all',
              display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
              fkdisplay: 'mrp', // 外键关联类型
              isfk: true, // 是否有fk键
              isnotnull: true, // 是否必填
              isuppercase: false, // 是否转大写
              length: 65535, // 最大长度是多少
              name: $i18n.t('table_label.shopName'), // 店铺名称
              readonly: false, // 是否可编辑，对应input   readonly属性
              reftable: 'PS_C_PRO_CLASSIFY', // 对应的表
              reftableid: 10285, // 对应的表ID
              row: 1,
              statsize: -1,
              type: 'STRING', // 这个是后台用的
              valuedata: '', // 这个是选择的值
              pid: '' // 啥 ？？？
            },
            oneObj: val => {
              // 选中触发事件
              console.log(val);
              this.formConfig.formValue.cpCShopIds = val.pid;
              this.formConfig.formValue.cpCShopEnames = val.valuedata;
            }
          },
          {
            style: 'input',
            label: '优先级',
            value: 'priority',
            colname: 'priority',
            width: '8',
            regx: /^[0-9]*$/,
            disabled: false,
            inputChange: () => { }
          },
          {
            style: 'radio',
            label: '区域级别', // 输入框前文字
            value: 'areaLevel', // 输入框的值
            colname: 'areaLevel', // 输入框的值
            width: '8', // 所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            options: [
              {
                label: '省份',
                value: 1
              },
              {
                label: '市级',
                value: 2
              }
            ]
          },
          {
            style: null,
            label: '启用状态',
            value: 'isactive',
            colname: 'isactive',
            width: '8',
            disabled: true,
            // inputChange: () => {
            //   let isactive = this.formConfig.formValue.isactive;
            //   this.qurefrom('beginTime')[0].disabled = isactive;
            //   this.qurefrom('endTime')[0].disabled = isactive;
            //   this.btnConfig2.buttons[0].disabled = isactive;
            // }
          },
          {
            style: 'input',
            label: $i18n.t('table_label.remarks'), // 备注
            value: 'remark',
            colname: 'remark',
            width: '16',
            maxlength: 1000,
            disabled: false,
            inputChange: () => { }
          }
        ],
        formValue: {
          type: 171868, // 类型 1:收货地址就近 2:唯品会
          areaLevel: '', // 区域级别 1:省级 2:市级
          beginTime: '', // 开始日期
          cpCShopIds: '', //  店铺ID，多个以逗号分隔
          cpCShopEnames: '', //店铺的名字
          ename: '', //   方案名称
          endTime: '', //   结束日期
          priority: '', // 优先级 正整数
          remark: '', // 备注
          isactive: '', // 启用状态
          cpCPhyWarehouseEname: '', //仓库名称
          cpCPhyWarehouseId: '', //仓库编码
          cpCPhyWarehouseEcode: '',
          ecode: '' // 方案ID
        },
        ruleValidate: {
          areaLevel: [{ required: true, message: ' ' }], // 增加必填项
          beginTime: [{ required: true, message: ' ' }],
          ename: [{ required: true, message: ' ' }],
          endTime: [{ required: true, message: ' ' }],
          priority: [{ required: true, message: ' ' }],
          type: [{ required: true, message: ' ' }]
        }
      },
      importTable: {
        refFuns: 'confirmFun',
        confirmTitle: '分仓策略-导入',
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
        componentData: {
          isAction: false,
          tableName: '',
          webname: 'import',
          tempApi: '',
          tempParm: null,
          okApi: '/p/cs/st/v1/orderWarehouse/importData',
          okParm: '',
          downErrorInfo: true,
          showErrorInfo: false,
          importNotes: false,
          returnData: this.returnData,
          dontShowDownloadA: false
        }
      },
      changeCount: 0, //判断数据是否修改过
      customizedModuleName: '',
      subTableConfig: {
        centerName: '',
        tablename: '',
        objid: '',
      },
      tableConfig: {
        indexColumn: false,
        isShowSelection: false,
        columns: [],
        data: [],
        pageShow: true, // 控制分页是否显示
        btnsShow: false, // 控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: '', // 表格宽度
        height: '', // 表格高度
        border: true, // 是否显示纵向边框
        total: 0, // 设置总条数
        current: 1,
        pageSizeOpts: [10, 20, 30, 50, 100], // 每页条数切换的配置
        pageSize: 10, // 每页条数
      },
    };
  },
  watch: {
    'formConfig.formValue': {
      //监听主表
      handler(val) {
        //页面加载完成后执行
        val && this.changeCount++;
        console.log(this.changeCount);
      },
      deep: true
    }
  },
  computed: {},
  mounted() {
    this.init()
    this.getBtns()
 
  },
  created() { },

  methods: {
    getBtns() {
      $OMS2.omsUtils.getPermissions(this, '', { table: this.$route.params.customizedModuleName, type: 'OBJ', serviceId: 'r3-oc-oms' }, true).then(res => {
        const { ACTIONS, SUB_ACTIONS } = res
        this.btnConfig.buttons.forEach(x => {
          ACTIONS.some(y => y.webname == x.webname) && (x.isShow = true)
        })

        this.btnConfig2.buttons.forEach(x => {
          SUB_ACTIONS.some(y => y.webname == x.webname) && (x.isShow = true)
        })

      })
    },
    init() {
      let { customizedModuleId, customizedModuleName } = this.$route.params;
      let query = this.$route.query;
      this.customizedModuleName = customizedModuleName;
      if (customizedModuleId == "New" || customizedModuleId == 'NEW') {
        this.id = "-1"
      } else {
        this.id = customizedModuleId
      }


      //ST_C_ORDER_WAREHOUSE  分仓规则
      if (customizedModuleName == 'ST_C_ORDER_WAREHOUSE') {
        this.labelList[0].label = $i18n.t('form_label.a5')//'按收货地址';
        this.labelList[1].value = "ST_C_ORDER_WAREHOUSE_LOG"
        this.qurefrom('cpCPhyWarehouseEname')[0].style = null;
        // 表示分仓策略》分仓规则
        if (customizedModuleId == 'New' || customizedModuleId == '-1' || customizedModuleId == 'NEW') {
          this.btnConfig.buttons.forEach(em => {
            if (em.text == '下一步') {
              em.isShow = true;
            }
          });

          // 表示新增
          if (vm.$route.query.copy) {
            this.pageShow = true;
            this.fninit(vm.$route.query.copy);
            setTimeout(()=>{
              this.fntableData(vm.$route.query.copy);
            },500)
          
            this.btnConfig2.buttons = []
          } else if (query.id) {
            this.fninit(query.id);
          } else {
            this.pageShow = false;
            this.id = '-1';
          }
        } else if (query.saveType && query.saveType == 2) {
          const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`;//拼接当前定制界面模块名称 
          const data = { label: '分仓规则编辑', name: keepAliveModuleName }; //当前界面模块名称 

          this.fninit(this.id);

          setTimeout(()=>{
            this.fntableData(this.id);
          },500)
         
          this.pageShow = true;
          this.btnConfig.buttons.forEach(em => {
            if (em.text == '启用' || em.text == '停用' || em.text == '上一步') {
              em.isShow = true;
            }
            if (em.text == '下一步') {
              em.isShow = false;
            }
          });
        } else {
          // const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`;//拼接当前定制界面模块名称 
          // const data = { label: '分仓规则编辑', name:keepAliveModuleName}; //当前界面模块名称 
          // this.$store.commit('global/modifycurrentLabel' , data)
          this.fninit(this.id);

          setTimeout(()=>{
            this.fntableData(this.id);
          },500)
         
          this.pageShow = true; //显示明细表
          this.btnConfig.buttons.forEach(em => {
            if (em.webname == 'copy') {
              em.isShow = true;
            }
          });
        }



      }
      //  分物流规则
      if (customizedModuleName == 'ST_C_ASSIGN_LOGISTICS') {
        //CP_C_SHOP_IDS  type
        this.qurefrom('CP_C_SHOP_IDS')[0].style = null;
        this.qurefrom('type')[0].style = null;
        this.labelList[0].label = $i18n.t('form_label.region_details')//'区域明细';
        this.labelList[1].value = "ST_ASSIGN_LOGISTICS_LOG"
        // 表示分物流策略》分物流规则
        if (customizedModuleId == 'New' || customizedModuleId == '-1' || customizedModuleId == 'NEW') {
          // const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`;//拼接当前定制界面模块名称 
          // const data = { label: '分物流规则新增', name:keepAliveModuleName}; //当前界面模块名称 
          // this.$store.commit('global/modifycurrentLabel' , data)
          // 表示新增
          this.formConfig.formValue.priority = '9'
          this.btnConfig.buttons.forEach(em => {
            if (em.text == '下一步') {
              em.isShow = true;
            }
          });

          if (vm.$route.query.copy) {
            this.pageShow = true;
            this.fninit(vm.$route.query.copy);

            setTimeout(()=>{
              this.fntableData(vm.$route.query.copy);
            },500)
        
            this.btnConfig2.buttons = []
          } else if (query.id) {
            this.fninit(query.id);
          } else {
            this.pageShow = false;
            this.id = '-1';
          }
        } else if (query.saveType && query.saveType == 2) {
          // const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`;//拼接当前定制界面模块名称 
          // const data = { label: '分物流规则编辑', name:keepAliveModuleName}; //当前界面模块名称 
          // this.$store.commit('global/modifycurrentLabel' , data)

          this.fninit(this.id);

          setTimeout(()=>{
            this.fntableData(this.id);
          },500)
         
          this.pageShow = true;
          this.btnConfig.buttons.forEach(em => {
            if (em.text == '上一步') {
              em.isShow = true;
            }
            if (em.text == '下一步') {
              em.isShow = false;
            }
          });
        } else {
          // const keepAliveModuleName = `C.${customizedModuleName}.${customizedModuleId}`;//拼接当前定制界面模块名称 
          // const data = { label: '分物流规则编辑', name:keepAliveModuleName}; //当前界面模块名称 
          // this.$store.commit('global/modifycurrentLabel' , data)
          this.fninit(this.id);

          setTimeout(()=>{
            this.fntableData(this.id);
          },500)
        

          this.pageShow = true;
          this.btnConfig.buttons.forEach(em => {
            if (em.webname == 'copy' ) {
              em.isShow = true;
            }
          });
        }

      }
    },
    lastStep() {


      this.$store.commit('global/tabOpen', {
        type: 'C',
        url: `/CUSTOMIZED/${this.customizedModuleName}/-1?id=${this.id}`,
        label: this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS' ? '分物流规则' : '分仓规则',
        customizedModuleName: this.customizedModuleName,
        customizedModuleId: '-1',
        dynamicRoutingForCustomizePage: true
      })
    },
    isfnSave() {
      //判断是什么情况下的保存
      let query = this.$route.query;
      if (query.saveType) {
        this.fnSave(3);
      } else {
        this.fnSave(1);
      }
    },
    returnData() {
      this.tableConfig.current = 1;
      this.fninit(this.id);
      this.fntableData(this.id);
    },
    fninput(v) {
     
      console.log( );
      if (v.keyCode == 13) {
        this.seachVal = v.target.value;
        this.tableConfig.current = 1;
        this.fntableData(this.id);
      }

    },
    fnSize(v) {
      this.tableConfig.pageSize = v;
      this.fntableData(this.id);
    },
    fnchange(v) {
      this.tableConfig.current = v;
      this.fntableData(this.id);
    },
    importData() {
      console.log(  this.formConfig.formValue.type);
      this.changeCount = 0;
      if (this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS') {
        //下载模版的地址
        this.importTable.componentData.tempApi = '/p/cs/st/v1/assignLogistics/exportDetail?ID=' + this.id;
        //上传文件的地址
        this.importTable.componentData.okApi = `/p/cs/st/v1/assignLogistics/importDetail`;
        this.importTable.componentData.okParm = { ID: this.id };
        this.$children.find(item => item.name === 'importTable').openConfirm();
        return;
      }

      if (this.customizedModuleName == 'ST_C_ORDER_WAREHOUSE'){
        //下载模版的地址
        this.importTable.componentData.tempApi = `/p/cs/st/v1/orderWarehouse/exportData?id=${this.id}`;
        if (this.formConfig.formValue.type == 171897) { //表示唯品会
          this.importTable.componentData.tempApi = `/p/cs/st/v1/orderWarehouse/exportVipData?id=${this.id}`;
            //导入文件的地址
           this.importTable.componentData.okApi = `/p/cs/st/v1/orderWarehouse/importVipData`;
        }
        //上传文件的参数
        this.importTable.componentData.okParm = { id: this.id };
        this.$children.find(item => item.name === 'importTable').openConfirm();
      }
     
    },
    fnoWexportData() {
      //导出
      if (this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS') {
        service.strategyPlatform.assignLogisticsexportDetail(this.id).then(res => {
          if (res.data.code == 0) {
            window.location.href = res.data.data;
            this.$Message.success(res.data.message);
          }
        });
        return;
      }

      //导出
      service.strategyPlatform.oWexportData(this.id).then(res => {
        if (res.data.code == 0) {
          window.location.href = res.data.data;
          this.$Message.success(res.data.message);
        }
      });
    },

    fnCopy() {
      this.$store.commit('global/tabOpen', {
        type: 'C',
        url: `/CUSTOMIZED/${this.customizedModuleName}/New?copy=${this.id}`,
        label: this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS' ? '分物流规则' : '分仓规则',
        customizedModuleName: this.customizedModuleName,
        customizedModuleId: 'New',
        dynamicRoutingForCustomizePage: true
      })

    },
    qurefrom(key) {
      let objitem = this.formConfig.formData.filter(item => item.colname == key);
      return objitem;
    },
    fntableData(id) {

      if (this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS') {
        this.placeholder = "省市搜索"
        service.strategyPlatform
          .assignLogisticsqueryDetailById({
            ID: this.$route.query.copy || id,
            SIZE: this.tableConfig.pageSize,
            CURRENT: this.tableConfig.current,
            regionName: this.seachVal
          })
          .then(res => {
            let { columns, data, pageInfo } = res.data.data;
            data.forEach((em, index) => {
              em.index = index + 1;
            });
            this.tableConfig.total = pageInfo.total;
            if (columns.length > 0) {
              this.tableConfig.columns = [
                {
                  title: $i18n.t('table_label.serialNo'), // 序号
                  key: 'index'
                }
              ];
              this.tableConfig.columns = this.tableConfig.columns.concat(columns);
            }
            this.tableConfig.data = data;
          });

        return;
      }

      if (this.formConfig.formValue.type == 171897) {  //调用唯品会查询接口
        this.placeholder = "请输入唯品会仓库名称"
        service.strategyPlatform
          .getWarehouseVipInfo({
            params: {
              id: this.$route.query.copy || id,
              pageSize: this.tableConfig.pageSize,
              pageNum: this.tableConfig.current,
              vipWarehouseName: this.seachVal
            }
          })
          .then(res => {
         
            if (res.data.code == 0) {
              let { columns, data, pageInfo } = res.data.data;
              data.forEach((em, index) => {
                em.index = index + 1;
              });
              this.tableConfig.total = pageInfo.total;
              if (columns.length > 0) {
                this.tableConfig.columns = [
                  {
                    title: $i18n.t('table_label.serialNo'), // 序号
                    key: 'index'
                  }
                ];
                this.tableConfig.columns = this.tableConfig.columns.concat(columns);
              }
              this.tableConfig.data = data;
            }

          });

      } else {
        service.strategyPlatform
          .getWarehouseRegionInfo({
            params: {
              id: this.$route.query.copy || id,
              pageSize: this.tableConfig.pageSize,
              pageNum: this.tableConfig.current,
              regionName: this.seachVal
            }
          })
          .then(res => {
            if (res.data.code == 0) {
              let { columns, data, pageInfo } = res.data.data;
              data.forEach((em, index) => {
                em.index = index + 1;
              });
              this.tableConfig.total = pageInfo.total;
              if (columns.length > 0) {
                this.tableConfig.columns = [
                  {
                    title: $i18n.t('table_label.serialNo'), // 序号
                    key: 'index'
                  }
                ];
                this.tableConfig.columns = this.tableConfig.columns.concat(columns);
              }
              this.tableConfig.data = data;
            }

          });
      }


    },
    setbtn() {
      //设置按钮属性
      console.log(this.qurefrom('ecode'));
      this.qurefrom('ecode')[0].style = null;
      this.qurefrom('isactive')[0].style = null;
      this.qurefrom('type')[0].disabled = false;
      this.qurefrom('areaLevel')[0].options.forEach(em => {
        em.disabled = false;
      });

      this.qurefrom('cpCPhyWarehouseEname')[0].itemdata.readonly = false;
      this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.readonly = false;
    },
    initbtn() {
      //初始化按钮
      this.qurefrom('ecode')[0].style = 'input';
      this.qurefrom('isactive')[0].style = 'input';
      this.qurefrom('type')[0].disabled = true;
      this.qurefrom('areaLevel')[0].options.forEach(em => {
        em.disabled = true;
      });

      this.qurefrom('cpCPhyWarehouseEname')[0].itemdata.readonly = true;
      this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.readonly = true;
    },
    fninit(id) {
      if (!vm.$route.query.copy) {
        this.initbtn();
      }
      if (vm.$route.query.id) {
        this.setbtn();
      }

      //分物流规则
      if (this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS') { //分物流
        service.strategyPlatform.assignLogisticsqueryById({ ID: id }).then(res => {
          let warehouseData = res.data.data;
          for (const key in this.formConfig.formValue) {
            if (key == 'isactive') {
              this.formConfig.formValue[key] = warehouseData[key] == 'Y' ? '启用' : '停用';
              //isactive  Y只有方案名称，优先级，备注 可以编辑
              if (warehouseData[key] == 'Y' && !vm.$route.query.copy) {
                this.qurefrom('beginTime')[0].disabled = true;
                this.qurefrom('endTime')[0].disabled = true;
                this.btnConfig2.buttons.length > 0 && (this.btnConfig2.buttons[0].disabled = true);

              } else {
                this.qurefrom('beginTime')[0].disabled = false;
                this.qurefrom('endTime')[0].disabled = false;
                this.btnConfig2.buttons.length > 0 && (this.btnConfig2.buttons[0].disabled = false);
              }
            } else if (key == 'cpCPhyWarehouseEname') {
              this.formConfig.formValue[key] = warehouseData[key];
              this.qurefrom('cpCPhyWarehouseEname')[0].itemdata.valuedata = warehouseData.cpCPhyWarehouseEname;
            } else if (key == 'cpCPhyWarehouseId') {
              this.formConfig.formValue[key] = warehouseData[key];
              this.qurefrom('cpCPhyWarehouseEname')[0].itemdata.pid = warehouseData.cpCPhyWarehouseId;
            } else if (key == 'beginTime') {
              //开始时间
              this.formConfig.formValue[key] = dateUtil.getFormatDate(new Date(warehouseData[key]), 'yyyy-MM-dd HH:mm:ss');
            } else if (key == 'endTime') {
              this.formConfig.formValue[key] = dateUtil.getFormatDate(new Date(warehouseData[key]), 'yyyy-MM-dd HH:mm:ss');
            } else {
              this.formConfig.formValue[key] = warehouseData[key];
            }
          }
        });

      }
      //分仓规则---------
      if (this.customizedModuleName == 'ST_C_ORDER_WAREHOUSE') {
        service.strategyPlatform.getWarehouseInfo({ params: { id } }).then(res => {
          let warehouseData = res.data.data;
          for (const key in this.formConfig.formValue) {
            if (key == 'isactive') {
              this.formConfig.formValue[key] = warehouseData[key] == 'Y' ? '启用' : '停用';
              //isactive  Y只有方案名称，优先级，备注 可以编辑
              if (warehouseData[key] == 'Y' && !vm.$route.query.copy) {
                this.qurefrom('beginTime')[0].disabled = true;
                this.qurefrom('endTime')[0].disabled = true;
                this.btnConfig2.buttons.length > 0 && (this.btnConfig2.buttons[0].disabled = true)
                // this.qurebtn(this.btnConfig.buttons, "启用")[0].disabled = true
              } else {
                this.qurefrom('beginTime')[0].disabled = false;
                this.qurefrom('endTime')[0].disabled = false;
                this.btnConfig2.buttons.length > 0 && (this.btnConfig2.buttons[0].disabled = false);
                // this.qurebtn(this.btnConfig.buttons, "停用")[0].disabled = true
              }

            }  else if (key == 'beginTime') {
              //开始时间
              this.formConfig.formValue[key] = dateUtil.getFormatDate(new Date(warehouseData[key]), 'yyyy-MM-dd HH:mm:ss');
            } else if (key == 'endTime') {
              this.formConfig.formValue[key] = dateUtil.getFormatDate(new Date(warehouseData[key]), 'yyyy-MM-dd HH:mm:ss');
            } else {
              this.formConfig.formValue[key] = warehouseData[key];
            }

          }
          setTimeout(()=>{
            this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.valuedata = warehouseData.cpCShopEnames;
            this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.pid = warehouseData.cpCShopIds;
          },500)

        });
      
      }

    },

    fnSave(saveType) {

      for (const em in this.formConfig.formValue) {
        for (const item in this.formConfig.ruleValidate) {
          if (em == item && this.qurefrom(em)[0].style != null) {
            if (this.formConfig.formValue[em] == '') {
              this.$Message.error('请填写' + this.qurefrom(em)[0].label + '!');
              return;
            }
          }
        }
      }

      let copyFlag = '';
      if (vm.$route.query.copy) {
        copyFlag = vm.$route.query.copy;
      }

      if (this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS') {
        if (this.qurefrom('cpCPhyWarehouseEname')[0].itemdata.valuedata == '') {
          this.$Message.error('请填写' + this.qurefrom('cpCPhyWarehouseEname')[0].itemdata.name + '!');
          return;
        }

        let { areaLevel, cpCPhyWarehouseEname, cpCPhyWarehouseEcode, cpCPhyWarehouseId, ename, priority, remark, isactive } = this.formConfig.formValue;
        let data = {
          ST_C_ASSIGN_LOGISTICS: {
            id: vm.$route.query.id ? vm.$route.query.id : this.id == 'New' ? '-1' : this.id,
            ename,
            areaLevel,
            cpCPhyWarehouseId,
            cpCPhyWarehouseEname,
            cpCPhyWarehouseEcode,
            priority,
            remark,
            isactive: isactive == '启用' ? 'Y' : 'N'
          },
          copyFlag
        };
        if (saveType) {
          data.saveType = saveType;
        }
        let begintime = this.formConfig.formValue.beginTime;
        data.ST_C_ASSIGN_LOGISTICS.beginTime = begintime
        let endtime = this.formConfig.formValue.endTime;
        data.ST_C_ASSIGN_LOGISTICS.endTime = endtime

        service.strategyPlatform.assignLogisticssave(data).then(res => {
          this.$Message.success(res.data.message);

          if ((this.id == "New" || this.id == "-1") && saveType == 1) {
            this.$store.commit('global/tabOpen', {
              type: 'C',
              url: `/CUSTOMIZED/${this.customizedModuleName}/-1?id=${res.data.data.objId}`,
              label: this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS' ? '分物流规则' : '分仓规则',
              customizedModuleName: this.customizedModuleName,
              customizedModuleId: '-1',
              dynamicRoutingForCustomizePage: true
            })
            return
          }

          if (saveType == 2) {

            this.$store.commit('global/tabOpen', {
              type: 'C',
              url: `/CUSTOMIZED/${this.customizedModuleName}/${res.data.data.objId}?saveType=${saveType}`,
              label: this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS' ? '分物流规则' : '分仓规则',
              customizedModuleName: this.customizedModuleName,
              customizedModuleId: res.data.data.objId,
              dynamicRoutingForCustomizePage: true
            })
          }
          if (saveType == 1 && this.id != "-1") {
            this.changeCount = 0
            this.pageback();
          }

        });
        return;
      }
      if (this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.valuedata == '') {
        this.$Message.error('请填写' + this.qurefrom('CP_C_SHOP_IDS')[0].itemdata.name + '!');
        return;
      }

      let { areaLevel, cpCShopIds, ename, priority, remark, type, cpCShopEnames, isactive } = this.formConfig.formValue;
      let data = {
        id: vm.$route.query.id ? vm.$route.query.id : this.id == 'New' ? '-1' : this.id,
        areaLevel,
        cpCShopIds,
        ename,
        cpCShopEnames,
        priority,
        remark,
        type,
        copyFlag,
        isactive: isactive == '启用' ? 'Y' : 'N'
      };
      if (saveType) {
        data.saveType = saveType;
      }
      let begintime = this.formConfig.formValue.beginTime;
      data.beginTime = begintime
      let endtime = this.formConfig.formValue.endTime;
      data.endTime = endtime

      service.strategyPlatform.orderwarehouse(data).then(res => {
        if (res.data.code == 0) {
          this.$Message.success(res.data.message);

          if ((this.id == "New" || this.id == "-1") && saveType == 1) {

            this.$store.commit('global/tabOpen', {
              type: 'C',
              url: `/CUSTOMIZED/${this.customizedModuleName}/-1?id=${res.data.data.objId}`,
              label: this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS' ? '分物流规则' : '分仓规则',
              customizedModuleName: this.customizedModuleName,
              customizedModuleId: '-1',
              dynamicRoutingForCustomizePage: true
            })
            return
          }

          if (saveType == 2) {
            this.$store.commit('global/tabOpen', {
              type: 'C',
              url: `/CUSTOMIZED/${this.customizedModuleName}/${res.data.data.objId}?saveType=${saveType}`,
              label: this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS' ? '分物流规则' : '分仓规则',
              customizedModuleName: this.customizedModuleName,
              customizedModuleId: res.data.data.objId,
              dynamicRoutingForCustomizePage: true
            })
          }
          if (saveType == 1 && this.id != "-1") {
            this.changeCount = 0
            this.pageback();
          }
        }
      });
    },
    // 返回
    back() {
      let self = this
      if (this.id == '-1') {
        if (this.changeCount > 0) {
          this.$Modal.info({
            title: $i18n.t('modalTitle.tips'), // 提示
            content: '当前修改未保存，确定返回？',
            mask: true,
            showCancel: true,
            okText: $i18n.t('common.determine'), // 确定
            cancelText: $i18n.t('common.cancel'), // 取消
            onOk: () => {
              this.pageback();
            }
          });
        } else {
          this.pageback();
        }
      } else if (this.changeCount > 3) {
        this.$Modal.info({
          title: $i18n.t('modalTitle.tips'), // 提示
          content: '当前修改未保存，确定返回？',
          mask: true,
          showCancel: true,
          okText: $i18n.t('common.determine'), // 确定
          cancelText: $i18n.t('common.cancel'), // 取消
          onOk: () => {
            this.pageback();
          }
        });
      } else {
        this.pageback();
      }

    },
    pageback() {
      let tableName = 'ST_C_ORDER_WAREHOUSE';
      let tableId = 10641;
      if (this.customizedModuleName == 'ST_C_ASSIGN_LOGISTICS') {
        tableName = 'ST_C_ASSIGN_LOGISTICS';
        tableId = 10657;
      }
      // this.$comUtils.tabCloseAppoint(this);
      // this.$destroy(true);
      this.$store.commit('global/tabOpen', {
        tableId,
        type: 'S',
        tableName,
        back: true
      });
    },
    keyDown(v) {
      console.log(v);
    },
    // 切换Label & 实时渲染subTable
    labelClick(item) {
      this.labelDefaultValue = item.value;
      if (this.labelDefaultValue == 'PROPERTY') return;
      this.subTableConfig = {
        centerName: 'strategyPlatform',
        tablename: this.labelDefaultValue,
        pageShow: true,
        objid: this.id
      };
    }
  }
};
