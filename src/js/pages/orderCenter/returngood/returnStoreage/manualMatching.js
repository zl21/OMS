import axios from "axios";
import businessButton from "professionalComponents/businessButton";
import businessForm from "professionalComponents/businessForm";
import businessLabel from "professionalComponents/businessLabel";
import businessActionTable from "professionalComponents/businessActionTable";
import jordanModal from "professionalComponents/businessDialog";
import OrderItem from "@/views/pages/OrdersCenter/orderManageDetail/details/orderItem.vue";
import { buttonPermissionsMixin } from "@/assets/js/mixins/buttonPermissions";
export default {
  components: {
    businessButton,
    businessForm,
    businessActionTable,
    jordanModal,
    OrderItem,
    businessLabel
  },
  mixins: [buttonPermissionsMixin],
  data() {
    return {
      returnNumber: {
        refFuns: "confirmFun",
        confirmTitle: "退单编号查询",
        titleAlign: "center", //设置标题是否居中 center left
        width: "900",
        scrollable: false, //是否可以滚动
        closable: true, //是否可以按esc关闭
        draggable: true, //是否可以拖动
        mask: true, //是否显示遮罩层
        maskClosable: true, //是否可以点击叉号关闭
        transfer: true, //是否将弹层放在body内
        name: "returnNumberPop", //组件名称
        url: "returngood/returnStoreage/returnNumberPop",
        keepAlive: true,
        excludeString: "returnNumberPop", //将name传进去，确认不缓存
        componentData: {}
      }, // 退单编号查询
      isSaveLoading: false,
      openDefault: [1], // 默认展开
      returnSelectData: [], // 列表选中数据
      DefaultValue: '1', // tab切换样式
      index: '', // 记录点击的退单编号index
      order: {
        modal: false,
        btn: {
          typeAll: "error", //按钮统一风格样式
          buttons: [
            {
              text: "查找", //按钮文本
              disabled: false, //按钮禁用控制
              btnclick: () => {
                this.queryBounced();
              } //按钮点击事件
            }
          ]
        },
        orderform: {
          formValue: {
            id: '',
            tid: '',
            receive_name: '',
            buyer_nick: '',
            user_nick: '',
            receive_mobile: '',
            orig_order_id: '',
          },
          formData: [
            {
              style: "input",
              label: "退换货单号",
              value: "id",
              width: "8"
            }, {
              style: "input",
              label: "平台单号",
              value: "tid",
              width: "8"
            }, {
              style: "input",
              label: "收货人",
              value: "receive_name",
              width: "8"
            }, {
              style: "input",
              label: "买家昵称",
              value: "buyer_nick",
              width: "8"
            }, {
              style: "input",
              label: "收货人手机",
              value: "receive_mobile",
              width: "8"
            }, {
              style: "input",
              label: "原单单号",
              value: "orig_order_id",
              width: "8"
            }
          ]
        },
        table: {
          columns: [
            {
              key: "ID",
              title: "退换货单号"
            },
            {
              key: "ORIG_ORDER_NO",
              title: "原单单号"
            },
            {
              key: "BUYER_NICK",
              title: "买家昵称"
            },
            {
              key: "LOGISTICS_CODE",
              title: "物流单号"
            },
            {
              key: "RECEIVE_NAME",
              title: "收货人"
            },
            {
              key: "RECEIVE_MOBILE",
              title: "收货人手机号"
            },
            {
              key: "shopName",
              title: "实体仓库"
            },
            {
              key: "IS_ADD",
              title: "是否手工新增"
            },
            {
              key: "CP_C_SHOP_TITLE",
              title: "店铺名称"
            }
          ], //表头
          data: [], //数据配置
          indexColumn: true, // 是否显示序号
          loading: false,
          isShowSelection: true // 是否显示checkedbox
        },
        value: ''
      }, // 查询退单数据
      onSelectData: [], // 选中的原始订单编号
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        buttons: [
          {
            text: "保存", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.saveData();
              // console.log(this.returnPostage);
            } //按钮点击事件
          }, {
            text: "返回", //按钮文本
            disabled: false, //按钮禁用控制
            btnclick: () => {
              const _this = this;
              if (_this.$route.query.form == 'list') {
                _this.$store.commit("customize/TabHref", {
                  id: 2809,
                  type: "action",
                  name: "returnStoreageList",
                  label: "退货入库",
                  query: Object.assign({
                    id: 2809,
                    tabTitle: "退货入库"
                  }),
                  back: true
                });
              } else {
                _this.$store.commit("customize/TabHref", {
                  id: _this.$route.query.id,
                  type: "action",
                  name: "returnTreasuryAdd",
                  label: "退货入库详情",
                  query: Object.assign({
                    id: _this.$route.query.id, //单据id
                    tabTitle: "退货入库详情",
                    statusName: _this.$route.query.statusName
                  })
                });
              }
            } //按钮点击事件
          },
        ]
      }, // 按钮
      information: {
        formValue: {  //存储表单得所有值
          ORIG_ORDER_NO: '', // 原单单号
          SOURCE_CODE: '', // 平台单号
          USER_NICK: '', // 买家昵称
          OC_B_REFUND_BATCH_ID: '', // 退货批次id
          BATCH_NO: '', // 退货批次编码
          IN_STORE_ID: '', // 入库仓库id
          IN_STORE_ENAME: '', // 入库仓库
          LOGISTIC_NUMBER: '', // 物流单号
          RECEIVER_MOBILE: '', // 手机号
          RECEIVER_NAME: '', // 姓名
          SPECIAL_TYPE: '', // 特殊处理类型
          REMARK: '', // 备注
          RECEIVER_ADDRESS: '', // 发件地址
          RESERVE_VARCHAR01: '', // 处理人
          RESERVE_VARCHAR02: '', // 处理人备注
        },
        //表单非空提示
        ruleValidate: {
          ORIG_ORDER_NO: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          OC_B_REFUND_BATCH_ID: [
            { required: true, message: ' ', trigger: 'blur' }
          ],
          SPECIAL_TYPE: [
            { required: true, message: ' ', trigger: 'blur' }
          ]
        },
        formData: [
          {
            style: 'input', //输入框类型
            label: '原单单号',  //输入框前文字
            value: 'ORIG_ORDER_NO',  //输入框的值
            width: '6', //所占的宽度 (宽度分为24份,数值代表所占份数的宽度)
            icon: ' ',  //输入框后带的图标,暂只有输入框支持
            placeholder: '', //占位文本，默认为请输入
            disabled: true, //按钮禁用控制
            ghost: false,   //是否关闭幽灵按钮，默认开启
            inputenter: () => {
              this.queryEnter();
            },  //表单回车事件
            iconclick: () => {
              this.onSelectData = [];
              if (this.$route.query.id == '-1') {
                this.order.modal = true;
              }
            }  //点击icon图标事件
          },
          {
            style: "input",
            label: "平台单号",
            value: "SOURCE_CODE",
            disabled: true, //按钮禁用控制
            width: "6"
          },
          {
            style: "input",
            label: "买家昵称",
            value: "USER_NICK",
            disabled: true, //按钮禁用控制
            width: "6"
          },
          {
            style: "select", //下拉框类型
            label: "退货批次", //下拉框前的值
            width: "6", //所占宽度宽度
            value: "OC_B_REFUND_BATCH_ID",
            disabled: true, //按钮禁用控制
            options: [],
            selectChange: () => {
              this.sleectBatch();
            }
          },
          {
            style: "input", //下拉框类型
            label: "入库仓库", //下拉框前的值
            width: "6", //所占宽度宽度
            disabled: true, //按钮禁用控制
            value: "IN_STORE_ENAME",
          },
          {
            style: "popInput",
            width: "6",
            value: "CP_C_LOGISTICS_ID",
            itemdata: {
              col: 1,
              colid: 170504,
              colname: "CP_C_LOGISTICS_ID",
              datelimit: "all",
              display: "text",
              fkdesc: "物流公司",
              fkdisplay: "drp",
              inputname: "CP_C_LOGISTICS_ID:ID",
              isfk: true,
              isnotnull: false,
              isuppercase: false,
              length: 20,
              name: "物流公司",
              readonly: true,
              reftable: "ST_C_EWAYBILL_LOGISTICS",
              reftableid: 24633,
              row: 1,
              scale: 0,
              statsize: -1,
              type: "NUMBER",
              valuedata: "" //这个是选择的值
            }
          },
          {
            style: "input",
            label: "物流单号",
            value: "LOGISTIC_NUMBER",
            disabled: true, //按钮禁用控制
            width: "6"
          },
          {
            style: "input",
            label: "手机号",
            value: "RECEIVER_MOBILE",
            disabled: true, //按钮禁用控制
            width: "6"
          },
          {
            style: "input",
            label: "姓名",
            value: "RECEIVER_NAME",
            disabled: true, //按钮禁用控制
            width: "6"
          },
          {
            style: "select", //下拉框类型
            label: "特殊处理类型", //下拉框前的值
            width: "6", //所占宽度宽度
            disabled: true, //按钮禁用控制
            value: "SPECIAL_TYPE",
            options: [],
            selectChange: () => {
            }
          },
          {
            style: "input",
            label: "备注",
            value: "REMARK",
            width: "12"
          },
          {
            style: "input",
            label: "发件地址",
            disabled: true, //按钮禁用控制
            value: "RECEIVER_ADDRESS",
            width: "12"
          }
        ]
      }, // 基本信息
      jordanTableConfig: {
        jordanFormConfig: {}, //表单配置
        renderArr: [
          {
            key: "OC_B_RETURN_ORDER_ID",
            // title: "退单编号",
            render: (h, params) => {
              const _this = this;
              return h("div", [
                h("i", {
                  class: "burgeon-icon burgeon-icon-ios-search",
                  style: {
                    fontSize: "14px",
                    color: 'blue',
                    marginRight: "4px"
                  },
                  on: {
                    click: () => {
                      if (params.row.IS_MATCH == '是') {
                        _this.$Message.error('此明细已经匹配，不允许修改退换货单号！')
                        return;
                      }
                      _this.index = params.index;
                      _this.returnNumber.componentData = {
                        ids: params.row.ID,
                        type: _this.isManual
                      };
                      _this.$children
                        .find(item => item.name === "returnNumberPop")
                        .openConfirm();
                    }
                  }
                }),
                h(
                  "span",
                  `${params.row.OC_B_RETURN_ORDER_ID ? params.row.OC_B_RETURN_ORDER_ID : ''}`
                )
              ]);
            }
          }
        ],
        columns: [],
        data: [], //数据配置
        pageShow: false, //控制分页是否显示
        loading: false,
        height: 280, // 表格高度
        isShowDeleteDetailBtn: false,//控制是否显示删除明细
        isShowImportBtn: false,//控制是否显示导入
        isShowExportBtn: false,//控制是否显示导出
        indexColumn: true, // 是否显示序号
        isShowSelection: true, // 是否显示checkedbox
        width: "", // 表格宽度
        border: true, //是否显示纵向边框
        total: 0, //设置总条数
        pageSizeOpts: [15, 30, 45, 60], // 每页条数切换的配置
        pageSize: 15, // 每页条数
      }, // 明细
      labelList: [
        {
          label: "入库单商品明细",
          value: "1",
          isShow: true
        },
        {
          label: "退货入库日志",
          value: "2",
          isShow: true
        }
      ],
      optionsData: [], // 退货批次数据
      labelDefaultValue: true, // 是否显示日志
      tab2: {
        tablename: "",
        objid: ""
      },
      isManual: '',
      isSave: false
    };
  },
  mounted() {
    this.$nextTick(() => {
      // 前提:公共逻辑处理必须使用jordanButton组件才可以使用公共逻辑
      // 参数1  关于是否是定制页面:action 半定制页面:halfaCustom （目前不生效）
      // 参数2  buttons父级json
      // 参数3  true逻辑处理 false定制页面自行处理  按钮权限
      // 逻辑处理则直接调用
      this.getPermissions("btnConfig", "returnStoreageList");
      // 定制页面自行处理
      // let buttonList = this.getPermissions("action", "btnConfig",true);
    });

    // 判断是手工匹配2 / 错发强制匹配3
    this.isManual = this.$route.query.source;
    if (this.$route.query.source == 2) {
      this.jordanTableConfig.columns = [
        {
          key: 'PS_C_PRO_ECODE',
          title: "货号"
        },
        {
          key: "PS_C_CLR_ENAME",
          title: "颜色"
        },
        {
          key: "PS_C_SIZE_ENAME",
          title: "尺码"
        },
        {
          key: "QTY",
          title: "数量"
        },
        {
          key: "PS_C_SKU_ECODE",
          title: "条码"
        },
        {
          key: "GBCODE",
          title: "国标码"
        },
        {
          key: "OC_B_RETURN_ORDER_ID",
          title: "退单编号"
        },
        {
          key: "REAL_SKU_ECODE",
          title: "实收条码"
        },
        {
          key: "PS_C_PRO_ENAME",
          title: "商品名称"
        },
        {
          key: "PRODUCT_MARK",
          title: "商品标记"
        },
        {
          key: "IS_MATCH",
          title: "是否匹配"
        },
        {
          key: "IS_GEN_ADJUST",
          title: "是否生成调整单"
        },
        {
          key: "IS_WITHOUT_ORIG",
          title: "是否无原单条码"
        },
      ];
    } else if (this.$route.query.source == 3) {
      this.jordanTableConfig.columns = [
        {
          key: 'PS_C_PRO_ECODE',
          title: "货号"
        },
        {
          key: "PS_C_CLR_ENAME",
          title: "颜色"
        },
        {
          key: "PS_C_SIZE_ENAME",
          title: "尺码"
        },
        {
          key: "QTY",
          title: "数量"
        },
        {
          key: "PS_C_SKU_ECODE",
          title: "条码"
        },
        {
          key: "GBCODE",
          title: "国标码"
        },
        {
          key: "OC_B_RETURN_ORDER_ID",
          title: "退单编号"
        },
        {
          key: "RESERVE_VARCHAR04",
          title: "实际发出条码"
        },
        {
          key: "REAL_SKU_ECODE",
          title: "实收条码"
        },
        {
          key: "PS_C_PRO_ENAME",
          title: "商品名称"
        },
        {
          key: "PRODUCT_MARK",
          title: "商品标记"
        },
        {
          key: "IS_MATCH",
          title: "是否匹配"
        },
        {
          key: "IS_GEN_ADJUST",
          title: "是否生成调整单"
        },
        {
          key: "IS_WITHOUT_ORIG",
          title: "是否无原单条码"
        },
      ];
    }
    // 判断是新增还是修改
    if (this.$route.query.id === '-1') {
      this.getReturnBatch();
    } else {
      this.getList();
      this.information.formData.push(
        {
          style: "input",
          label: "处理人",
          disabled: false, //按钮禁用控制
          value: "RESERVE_VARCHAR01",
          width: "6"
        },
        {
          style: "input",
          label: "处理人备注",
          disabled: false, //按钮禁用控制
          value: "RESERVE_VARCHAR02",
          width: "6"
        },
        {
          style: "input",
          label: "入库单单号",
          disabled: true, //按钮禁用控制
          value: "ID",
          width: "6"
        })
    }
    this.setTableHeight();
    this.obtainWarehouse();
  },
  methods: {
    // 选中的退货明细赋值
    returnArr(data, itemId) {
      this.jordanTableConfig.data[this.index].OC_B_RETURN_ORDER_ID = data;
      // this.jordanTableConfig.data.RESERVE_BIGINT01 = itemId;
    },
    // 选中的退货明细赋值
    returnArr1(data, data1, itemId) {
      this.jordanTableConfig.data[this.index].OC_B_RETURN_ORDER_ID = data;
      this.jordanTableConfig.data[this.index].RESERVE_VARCHAR04 = data1;
      // this.jordanTableConfig.data[this.index].RESERVE_BIGINT01 = itemId;
    },
    // 保存
    saveData() {
      let item = this.information.formValue;
      if (!item.OC_B_REFUND_BATCH_ID) {
        this.$Message.warning('退货批次必填！');
        return;
      }
      if (!item.SPECIAL_TYPE) {
        this.$Message.warning('特殊处理类型必填！');
        return;
      }
      if (this.isSave) return;
      this.isSave = true;
      let dataArr = JSON.parse(JSON.stringify(this.jordanTableConfig.data));
      dataArr.forEach(item => {
        // 是否无原单条码
        if (item.IS_WITHOUT_ORIG == '是') item.IS_WITHOUT_ORIG = 1;
        else if (item.IS_WITHOUT_ORIG == '否') item.IS_WITHOUT_ORIG = 0;
        // 是否匹配
        if (item.IS_MATCH == '是') item.IS_MATCH = 1;
        else if (item.IS_MATCH == '否') item.IS_MATCH = 0;
        // 是否生成调整单
        if (item.IS_GEN_ADJUST == '是') item.IS_GEN_ADJUST = 1;
        else if (item.IS_GEN_ADJUST == '否') item.IS_GEN_ADJUST = 0;
      })
      let params = {
        ocBRefundInProductItem: dataArr, // 退货入库明细
        OcBRefundIn: {
          'ID': item.ID,
          'ORIG_ORDER_NO': item.ORIG_ORDER_NO, // 原单单号
          'SOURCE_CODE': item.SOURCE_CODE, // 平台单号
          'USER_NICK': item.USER_NICK, // 买家昵称
          'RECEIVE_PHONE': item.RECEIVE_PHONE, // 电话
          'OC_B_REFUND_BATCH_ID': item.OC_B_REFUND_BATCH_ID, // 退货批次id
          'IN_STORE_ECODE': item.IN_STORE_ENAME, // 入库店仓
          'CP_C_LOGISTICS_ENAME': item.CP_C_LOGISTICS_ENAME, // 物流公司
          'LOGISTIC_NUMBER': item.LOGISTIC_NUMBER, // 物流单号
          'RECEIVER_MOBILE': item.RECEIVER_MOBILE, // 手机号
          'RECEIVER_NAME': item.RECEIVER_NAME, // 收货人姓名
          'SPECIAL_TYPE': item.SPECIAL_TYPE, // 特殊处理类型
          'REMARK': item.REMARK, // 备注
          'RECEIVER_ADDRESS': item.RECEIVER_ADDRESS, // 发件地址
        } // 退货入库主表数据
      };
      this.isSaveLoading = true;
      let url = ''
      if (this.$route.query.source == 2) {
        url = "/api/cs/oc/oms/v1/markSureButton";
      } else if (this.$route.query.source == 3) {
        url = "/api/cs/oc/oms/v1/forcedMatching";
      }
      axios({
        url: url,
        method: "post",
        cancelToken: true,
        data: params
      }).then(res => {
        if (res.data.code == 0) {
          this.isSaveLoading = false;
          this.$Message.success(res.data.message);
          // this.getList();
          this.isSave = false;
          if (this.$route.query.form === 'list') {
            this.$store.commit("customize/TabHref", {
              id: 2809,
              type: "action",
              name: "returnStoreageList",
              label: "退货入库",
              query: Object.assign({
                id: 2809,
                tabTitle: "退货入库"
              }),
              back: true
            });
          } else {
            this.$store.commit("customize/TabHref", {
              id: this.$route.query.id,
              type: "action",
              name: "returnTreasuryAdd",
              label: "退货入库详情",
              query: Object.assign({
                id: this.$route.query.id, //单据id
                tabTitle: "退货入库详情",
                statusName: this.$route.query.statusName
              })
            });
          }
        } else {
          this.isSaveLoading = false;
          this.$Message.error(res.data.message);
          this.isSave = false;
        }
      })
    },
    // 获取详情
    getList() {
      const _this = this;
      axios({
        url: "/api/cs/oc/oms/v1/manualMatchingList",
        method: "post",
        data: { id: _this.$route.query.id }
      }).then(res => {
        if (res.data.code === 0) {
          res.data.data.ocBRefundIn.IN_STORE_ENAME = res.data.data.ocBRefundIn.IN_STORE_ENAME;
          _this.information.formValue = res.data.data.ocBRefundIn;
          res.data.data.inProductItem.forEach(item => {
            item.Flag1 = true;
            // 商品标记
            if (item.PRODUCT_MARK == 1) item.PRODUCT_MARK = '正品';
            else if (item.PRODUCT_MARK == 0) item.PRODUCT_MARK = '次品';
            // 是否无原单条码
            if (item.IS_WITHOUT_ORIG == 1) item.IS_WITHOUT_ORIG = '是';
            else if (item.IS_WITHOUT_ORIG == 0) item.IS_WITHOUT_ORIG = '否';
            // 是否匹配
            if (item.IS_MATCH == 1) item.IS_MATCH = '是';
            else if (item.IS_MATCH == 0) item.IS_MATCH = '否';
            // 是否生成调整单
            if (item.IS_GEN_ADJUST == 1) item.IS_GEN_ADJUST = '是';
            else if (item.IS_GEN_ADJUST == 0) item.IS_GEN_ADJUST = '否';
          })
          // 物流公司
          _this.information.formValue.CP_C_LOGISTICS_ID = res.data.data.ocBRefundIn.CP_C_LOGISTICS_ID;
          _this.information.formValue.CP_C_LOGISTICS_ENAME = res.data.data.ocBRefundIn.CP_C_LOGISTICS_ENAME;
          _this.information.formData[5].itemdata.valuedata = res.data.data.ocBRefundIn.CP_C_LOGISTICS_ENAME;
          document.getElementsByClassName('disabled')[0].value = res.data.data.ocBRefundIn.CP_C_LOGISTICS_ENAME;
          _this.information.formData[3].options = [{
            label: _this.information.formValue.BATCH_NO,
            value: _this.information.formValue.OC_B_REFUND_BATCH_ID
          }];
          _this.jordanTableConfig.data = res.data.data.inProductItem;
        }
      })
    },
    // 获取特殊处理类型字段选项组
    async obtainWarehouse() {
      const _this = this;
      let fromdata = new FormData();
      fromdata.append("table", "OC_B_REFUND_IN");
      fromdata.append("objid", -1);
      const res = await this.service.common.getObject(fromdata);
      this.information.formData.forEach(value => {
        if (value.label === "特殊处理类型") {
          res.data.data.addcolums.forEach((item) => {
            if (item.parentdesc === '基本信息') {
              let childItem = item.childs;
              childItem.forEach((item) => {
                if (item.colname === 'SPECIAL_TYPE') {
                  for (let i = 0; i < item.combobox.length; i++) {
                    value.options.push({
                      value: item.combobox[i].limitval,
                      label: item.combobox[i].limitdesc
                    });
                  }
                }
              });
            }
          });
        }
      });
    },
    // 获取退货批次数据
    getReturnBatch() {
      let _this = this;
      axios({
        url: '/api/cs/oc/oms/v1/getCurrentBatch',
        method: 'get',
      }).then(res => {
        if (res.data.code === 0) {
          _this.optionsData = res.data.data
          let options = res.data.data;
          options.map(item => {
            item.label = item.BATCH_NO;
            item.value = item.ID;
          })
          _this.information.formData[3].options = options;
        } else {
          _this.$Message.warning(res.data.message);
        }
      })
    },
    // 选择退货批次
    sleectBatch() {
      this.optionsData.forEach(item => {
        if (item.ID == this.information.formValue.OC_B_REFUND_BATCH_ID) {
          this.information.formValue.IN_STORE_ENAME = item.IN_STORE_ENAME;
          this.information.formValue.IN_STORE_ID = item.IN_STORE_ID;
          this.information.formValue.BATCH_NO = item.BATCH_NO
        }
      });
    },
    // 查询原始订单编号
    queryBounced() {
      //  获取页面数据
      let _this = this;
      _this.order.table.data = [];
      let lists = _this.order.orderform.formValue;
      if (lists.id == '' && lists.tid == '' && lists.receive_name == '' && lists.buyer_nick == '' && lists.receive_mobile == '' && lists.orig_order_id == '') {
        _this.$Message.error('请输入查询条件！');
        return;
      }
      _this.order.table.loading = true;
      let param = {
        id: lists.id,
        tid: lists.tid,
        receive_name: lists.receive_name,
        buyer_nick: lists.buyer_nick,
        receive_mobile: lists.receive_mobile,
        orig_order_id: lists.orig_order_id
      };
      axios({
        url: "/api/cs/oc/oms/v1/searchButtonsInDetail",
        method: "post",
        cancelToken: true,
        data: param
      }).then(res => {
        if (res.data.code == 0) {
          // _this.order.table.data = res.data.data;
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].ORIG_ORDER_NO = res.data.data[i].ORIG_ORDER_ID;
            if (res.data.data[i].IS_ADD == 1) res.data.data[i].IS_ADD = '是';
            else if (res.data.data[i].IS_ADD == 0) res.data.data[i].IS_ADD = '否';
            _this.order.table.data.push(res.data.data[i]);
          }
        }
        _this.order.table.loading = false;
      }).catch(err => {
        _this.$Message.error(err.message);
        _this.order.table.loading = false;
      })
    },
    // 原单单号回车查询
    queryEnter() {
      const _this = this;
      _this.jordanTableConfig.data = [];
      if (_this.information.formValue.ORIG_ORDER_NO == '') {
        _this.information.formValue = [];
        _this.jordanTableConfig.data = [];
      } else {
        let params = {
          orig_order_id: _this.information.formValue.ORIG_ORDER_NO
        }
        axios({
          url: "/api/cs/oc/oms/v1/searchButtonsInDetail",
          method: "post",
          cancelToken: true,
          data: params
        }).then(res => {
          if (res.data.code === 0) {
            let data = _this.information.formValue;
            let resData = res.data.data[0];
            data.ORIG_ORDER_NO = resData.ORIG_ORDER_ID; // 原单单号
            data.SOURCE_CODE = resData.ORIG_SOURCE_CODE; // 平台单号
            data.USER_NICK = resData.BUYER_NICK; // 买家昵称
            data.LOGISTIC_NUMBER = resData.LOGISTICS_CODE; // 物流单号
            data.RECEIVER_MOBILE = resData.RECEIVE_MOBILE; // 手机号
            data.RECEIVER_NAME = resData.RECEIVE_NAME; // 姓名
            data.RECEIVER_ADDRESS = resData.RECEIVE_ADDRESS; // 发件地址

            let item = res.data.data[0].PRODUCTITEMS;
            item.forEach(item => {
              _this.jordanTableConfig.data.push({
                // 'ID': _this.information.formValue.ID, // ，明细id
                'PS_C_SKU_ECODE': item.PS_C_SKU_ECODE, // 条码
                'GBCODE': item.BARCODE, // 国标码
                'OC_B_RETURN_ORDER_ID': resData.formValue.ID, // 退单编号
                'REAL_SKU_ECODE': '', // 实收条码
                'PS_C_PRO_ENAME': item.PS_C_PRO_ENAME, // 商品名称
                'PRODUCT_MARK': item.PRODUCT_MARK, // 商品标记
                'IS_MATCH': resData.formValue.IS_CHECK == 0 ? '否' : '是', // 是否匹配
                'IS_GEN_ADJUST': resData.formValue.IS_TRANSFER == 0 ? '否' : '是', // 是否生成调整单
                'QTY': item.QTY_REFUND, // 数量
                'IS_WITHOUT_ORIG': '否', // 是否无原单条码
                'Flag1': true
              });
            })
          }
        })
      }
    },
    // 确定原始订单编号
    queryorder() {
      const _this = this;
      _this.jordanTableConfig.data = [];
      if (this.onSelectData.length !== 1) {
        _this.$Message.error('请选择一条数据！');
        return;
      }
      let data = _this.information.formValue;
      let resData = _this.onSelectData[0];
      data.ORIG_ORDER_NO = resData.ORIG_ORDER_ID; // 原单单号
      data.SOURCE_CODE = resData.ORIG_SOURCE_CODE; // 平台单号
      data.USER_NICK = resData.BUYER_NICK; // 买家昵称
      data.LOGISTIC_NUMBER = resData.LOGISTICS_CODE; // 物流单号
      data.RECEIVER_MOBILE = resData.RECEIVE_MOBILE; // 手机号
      data.RECEIVER_NAME = resData.RECEIVE_NAME; // 姓名
      data.RECEIVER_ADDRESS = resData.RECEIVE_ADDRESS; // 发件地址
      let item = _this.onSelectData[0].PRODUCTITEMS;
      item.forEach(item => {
        _this.jordanTableConfig.data.push({
          // 'ID': _this.information.formValue.ID, // ，明细id
          'PS_C_SKU_ECODE': item.PS_C_SKU_ECODE, // 条码
          'GBCODE': item.BARCODE, // 国标码
          'OC_B_RETURN_ORDER_ID': resData.ID, // 退单编号
          'REAL_SKU_ECODE': '', // 实收条码
          'PS_C_PRO_ENAME': item.PS_C_PRO_ENAME, // 商品名称
          'PRODUCT_MARK': item.PRODUCT_MARK, // 商品标记
          'IS_MATCH': resData.IS_CHECK == 0 ? '否' : '是', // 是否匹配
          'IS_GEN_ADJUST': resData.IS_TRANSFER == 0 ? '否' : '是', // 是否生成调整单
          'QTY': item.QTY_REFUND, // 数量
          'IS_WITHOUT_ORIG': '否', // 是否无原单条码
          'Flag1': true
        });
      })
    },
    // 取消
    querycancel() {

    },
    // 切换tab
    labelClick(item, index) {
      console.log(item, index);
      const _this = this;
      if (index == '0') {
        _this.labelDefaultValue = true;
      } else if (index == '1') {
        _this.labelDefaultValue = false;
        _this.tab2 = {
          tablename: 'OC_B_REFUND_IN',
          objid: this.$route.query.id
        };
      }
    },
    // 查询原始订单勾选
    onquerySelect(e) {
      this.onSelectData = e;
    },
    // 原始订单取消勾选
    onqueryCancel(e) {
      this.onSelectData = e;
    },
    onqueryAll(e) {
      this.onSelectData = e;
    },
    onqueryAllCancel(e) {
      this.onSelectData = e;
    },
    // 列表勾选
    returnOnSelect(e) {
      this.returnSelectData = e;
    },
    // 取消勾选
    returnCancel(e) {
      this.returnSelectData = e;
    },
    onSelectAll(e) {
      this.returnSelectData = e;
    },
    onSelectAllCancel(e) {
      this.returnSelectData = e;
    },
    oneObjs() {
      switch (val.name) {
        case "物流公司":
          this.information.formValue.CP_C_LOGISTICS_ID = val.pid;
          this.information.formValue.CP_C_LOGISTICS_ENAME = val.valuedata;
          break;
      }
    },
    //设置表格高度
    setTableHeight() {
      let _this = this;
      const contentHeight = document.getElementsByClassName("main-content")[0].clientHeight;
      let returnHeight = 25;
      returnHeight += document.getElementsByClassName("buttonBox")[0].clientHeight;
      returnHeight += document.getElementsByClassName("TreasuryDefault")[0].clientHeight;
      let tableHeight = contentHeight - returnHeight;
      _this.jordanTableConfig.height = tableHeight - 220;
    },
  },
  created() {
    const _this = this;
    window.addEventListener('keydown', e => {
      let key = e.keyCode;
      if (key == 13) {
        if (_this.order.modal && _this.order.table.data.length) {
          _this.queryorder();
        }
      }
      if (key == 27) {
        _this.order.modal = false;
      }
    })
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
  }
};
