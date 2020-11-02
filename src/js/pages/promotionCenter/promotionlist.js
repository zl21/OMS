import axios from "axios";
import customTable from "framework/components/table/P_customTable.vue";
import errorMessage from "framework/components/tablelist/error.vue";
import Mydialog from "framework/components/dialog/mydialog.vue";
import TableInput from "framework/components/element/input";
import aTable from "professionalComponents/agGridTable.vue";
import dialogVisible from "@/views/pages/promotionCenter/setGroup";
import Favorite from "@/views/pages/promotionCenter/components/favorite";

const baseColumnDefs = [
  {
    headerName: "序号",
    // headerName: vmI18n.t("table_label.serialNo"),
    field: "SERIAL_NO",
    pinned: "left",
    maxWidth: 120,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    sort: "asc",
    suppressMovable: true,
  },
  {
    headerName: "促销编号",
    // headerName: vmI18n.t("table_label.serialNo"),
    field: "ACTI_NO",
  },
  {
    headerName: "活动名称",
    // headerName: vmI18n.t("form_label.activityName"),
    field: "ACTI_NAME",
  },
  {
    headerName: "参与店铺",
    // headerName: vmI18n.t("table_label.participating_store"),
    field: "STORE_NAMES",
  },
  {
    headerName: "活动时间段",
    // headerName: vmI18n.t("table_label.activity_period"),
    field: "ACTI_DATE",
  },
  {
    headerName: "失效下线时间",
    // headerName: vmI18n.t("table_label.failure_offline_time"),
    field: "DOWN_TIME",
  },
  {
    headerName: "剩余可送",
    // headerName: vmI18n.t("table_label.rest_sent"),
    field: "STOCK",
  },
  {
    headerName: "已送数量",
    // headerName: vmI18n.t("table_label.delivered_quantity"),
    field: "SEND",
  },
  {
    headerName: "状态",
    // headerName: vmI18n.t("table_label.status"),
    field: "status",
  },
  {
    headerName: "分组名称",
    // headerName: vmI18n.t("table_label.groupName"),
    field: "GROUP_NAME",
  },
  {
    headerName: "优先级",
    // headerName: vmI18n.t("table_label.priority"),
    field: "LEVEL",
  },
  {
    headerName: "创建人",
    // headerName: vmI18n.t("table_label.creator"),
    field: "OWNERENAME",
  },
  {
    headerName: "创建时间",
    // headerName: vmI18n.t("table_label.creationTime"),
    field: "CREATIONDATE",
  },
  {
    headerName: "修改人",
    // headerName: vmI18n.t("table_label.reviser"),
    field: "OWNERENAME",
  },
  {
    headerName: "修改时间",
    // headerName: vmI18n.t("table_label.modificationTime"),
    field: "MODIFIEDDATE",
  },
  {
    headerName: "备注",
    // headerName: vmI18n.t("table_label.remarks"),
    field: "REMARK",
  },
  {
    headerName: "操作",
    // headerName: vmI18n.t("table_label.operation"),
    field: "ACTION_LOG",
  },
];
export default {
  data() {
    return {
      vmI18n: window.vmI18n,
      modal: false, // 查看日志弹框
      logData: {
        columns: [
          {
            // title: "序号",
            title: vmI18n.t("table_label.serialNo"),
            type: "index",
            width: 60,
            align: "center",
          },
          {
            // title: "操作时间",
            title: vmI18n.t("table_label.operatorTime"),
            key: "creationdate",
          },
          {
            // title: "操作人",
            title: vmI18n.t("form_label.operator"),
            key: "operator",
          },
          {
            // title: "操作描述",
            title: vmI18n.t("table_label.operation_description"),
            key: "describes",
          },
        ],
        data: [],
      },
      buttons: [], // 按钮权限列表
      checkedArr1: [],
      checkedArr2: [],
      checkedArr3: [],
      checkedArr4: [],
      my_input_sh: {
        itemdata: {
          col: 1,
          // colid: this.$store.state.forginkeys.columnIds.shop || '1700805184',
          colid: "1700805184",
          colname: "CP_C_SHOP_ID", // 当前字段的名称
          datelimit: "all",
          display: "text", // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: "mrp", // 外键关联类型
          fkdesc: "店铺",
          inputname: "CP_C_SHOP:ENAME", // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          // name: "店铺名称", // input前面显示的lable值
          name: vmI18n.t("table_label.shopName"),
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: "CP_C_SHOP", // 对应的表
          // reftableid: 24475, //对应的表ID
          row: 1,
          statsize: -1,
          type: "STRING", // 这个是后台用的
          valuedata: "", // 这个是选择的值
        },
      },
      my_input_st: {
        itemdata: {
          col: 1,
          colid: 1700805185,
          colname: "CP_C_STORE_ID", // 当前字段的名称
          datelimit: "all",
          display: "text", // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: "mrp", // 外键关联类型
          fkdesc: "店铺",
          inputname: "CP_C_STORE.ENAME", // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          // name: "线下门店", // input前面显示的lable值
          name: vmI18n.t("form_label.offline_stores"),
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: "CP_C_RSTORE", // 对应的表
          // reftableid: 23296, //对应的表ID
          row: 1,
          statsize: -1,
          type: "STRING", // 这个是后台用的
          valuedata: "", // 这个是选择的值
        },
      },
      dataError: {
        show: false, // 控制警告弹框显示
        // title: "错误", // 弹框标题
        title: vmI18n.t("modalTitle.error"), //弹框标题
        type: "warning", // 类型警告
        backBtn: true, // 是否显示返回按钮
        errorList: [{ message: "确定执行下线操作？" }], // 提示内容
      },
      dialog: {
        visible: true, // 控制查看日志弹窗
        param: {},
        title: "",
      }, // 查看日志传参
      query: {
        store: [], // 门店
        firstLevel: [], // 促销大类
        lastLevel: [], // 店仓名称
        distrib: "", // 配销中心,
        storeType: true,
      },
      firstLevel: "",
      lastLevel: "",
      param: {},
      loadings: false, // 下拉框默认loadings值
      acti_date: [], // 时间
      distrib_id: [], // 配销中心
      storeId: "", // 门店
      acti_pro: "", // 商品
      release_name: "", // 操作人
      acti_no: "", // 促销编号
      acti_name: "", // 促销名称
      acti_group: "", // 分组设置
      activeName: "1", // 根据这个，判断是第几个tab
      // Myinput: [],
      // sheetWidth: 0,
      tabulation: [], // 列表数据
      inputList: [
        {
          colname: "PS_C_PRO_ECODE",
          cusurl: "custompage/matrix",
          display: "text",
          // name: "商品编码",
          name: vmI18n.t("table_label.productNo"),
          pid: "",
          tablename: "DL_B_TRAN_PLAN_ITEM",
          type: "STRING",
          value: "",
          valuedata: "",
        },
      ],
      isActive: true, // 表示是否激活状态(false禁用input)
      isCustom: false,
      isdisabled: false, // 表示是否可编辑(true禁用input)
      objid: -1,
      selectItem: {},
      tablename: "DL_B_PAND", // 表名
      agTableConfig1: {
        isIndex: true,
        tableHeight: "450px",
        columnDefs: baseColumnDefs,
        rowData: [],
        renderArr: {
          ACTION_LOG: (params) => {
            // console.log("params :>> ", params);
            if (!params.data.ACTION_LOG) return;

            const resultElement = document.createElement("div");
            const iTag = document.createElement("div");
            iTag.style.color = "#0f8ee9";
            iTag.style.textDecoration = "underline";
            iTag.innerText = params.data.ACTION_LOG;
            iTag.style.cursor = "pointer";
            iTag.onclick = () => {
              // console.log(params.data);
              this.viewLog(params.data);
            };
            resultElement.appendChild(iTag);
            return resultElement;
          },
        },
        pagenation: {
          // 设置总条数
          total: 0,
          // 条数
          pageSize: 20,
          // 页数
          current: 1,
          pageSizeOpts: [20, 50, 150, 1000],
        },
      }, // 全部
      agTableConfig2: {
        isIndex: true,
        tableHeight: "450px",
        columnDefs: baseColumnDefs,
        rowData: [],
        renderArr: {
          ACTION_LOG: (params) => {
            // console.log("params :>> ", params);
            if (!params.data.ACTION_LOG) return;

            const resultElement = document.createElement("div");
            const iTag = document.createElement("div");
            iTag.style.color = "#0f8ee9";
            iTag.style.textDecoration = "underline";
            iTag.innerText = params.data.ACTION_LOG;
            iTag.style.cursor = "pointer";
            iTag.onclick = () => {
              // console.log(params.data);
              this.viewLog(params.data);
            };
            resultElement.appendChild(iTag);
            return resultElement;
          },
        },
        pagenation: {
          // 设置总条数
          total: 0,
          // 条数
          pageSize: 20,
          // 页数
          current: 1,
          pageSizeOpts: [20, 50, 150, 1000],
        },
      }, // 已发布
      agTableConfig3: {
        isIndex: true,
        tableHeight: "450px",
        columnDefs: baseColumnDefs,
        rowData: [],
        renderArr: {
          ACTION_LOG: (params) => {
            // console.log("params :>> ", params);
            if (!params.data.ACTION_LOG) return;

            const resultElement = document.createElement("div");
            const iTag = document.createElement("div");
            iTag.style.color = "#0f8ee9";
            iTag.style.textDecoration = "underline";
            iTag.innerText = params.data.ACTION_LOG;
            iTag.style.cursor = "pointer";
            iTag.onclick = () => {
              // console.log(params.data);
              this.viewLog(params.data);
            };
            resultElement.appendChild(iTag);
            return resultElement;
          },
        },
        pagenation: {
          // 设置总条数
          total: 0,
          // 条数
          pageSize: 20,
          // 页数
          current: 1,
          pageSizeOpts: [20, 50, 150, 1000],
        },
      }, // 草稿
      agTableConfig4: {
        isIndex: true,
        tableHeight: "450px",
        columnDefs: baseColumnDefs,
        rowData: [],
        renderArr: {
          ACTION_LOG: (params) => {
            // console.log("params :>> ", params);
            if (!params.data.ACTION_LOG) return;

            const resultElement = document.createElement("div");
            const iTag = document.createElement("div");
            iTag.style.color = "#0f8ee9";
            iTag.style.textDecoration = "underline";
            iTag.innerText = params.data.ACTION_LOG;
            iTag.style.cursor = "pointer";
            iTag.onclick = () => {
              // console.log(params.data);
              this.viewLog(params.data);
            };
            resultElement.appendChild(iTag);
            return resultElement;
          },
        },
        pagenation: {
          // 设置总条数
          total: 0,
          // 条数
          pageSize: 20,
          // 页数
          current: 1,
          pageSizeOpts: [20, 50, 150, 1000],
        },
      }, // 下线/过期
      STATUS: [1, 2], // 状态 1.草稿，2.已发布，3.下线
      diStatusArr: [
        {
          value: 1,
          // label: "草稿",
          label: vmI18n.t("btn.draft"),
        },
        {
          value: 2,
          // label: "已发布",
          label: vmI18n.t("btn.published"),
        },
        {
          value: 3,
          // label: "下线",
          label: vmI18n.t("btn.offline"),
        },
      ],
      fixedHeight: 351, // 固定高度
      dialog_visible: false,
      checkList: [], // 表格复选框选中的id
      setGroupTableData: [], // 设置分组列表
      product: {
        itemdata_xitong: {
          col: 1,
          // colid: this.$store.state.forginkeys.columnIds.sku || '1700806532',
          colid: "1700806532",
          colname: "PS_C_PRO_ID",
          datelimit: "all",
          display: "text",
          fkdesc: "参与商品",
          fkdisplay: "drp",
          inputname: "PS_C_PRO_ID:ECODE",
          isfk: true,
          isnotnull: false,
          isuppercase: true,
          length: 65535,
          // name: "参与商品",
          name: vmI18n.t("other.participating_goods"),
          readonly: false,
          reftable: "PS_C_PRO",
          reftableid: 23281,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata: "",
        },
      },
    };
  },
  watch: {
    activeName() {
      this.getData();
    },
  },
  components: {
    customTable,
    aTable,
    // currentUserAccessFirstLevel,
    // currentUserAccessLastLevel,
    // currentUserAccessStore,
    // currentUserAccessDistrib,
    // matrixInput,
    // myInput,
    Mydialog,
    errorMessage,
    // myInputLd,
    dialogVisible,
    Favorite,
    TableInput,
  },
  created() {
    this.times(); // 默认时间
  },
  computed: {
    commodity() {
      return this.inputList[0].valuedata;
    },
    tabTotal() {
      return {
        // 全部
        one: `${vmI18n.t("common.all")}(${this.agTableConfig1.pagenation.total
          })`,
        // 已发布
        two: `${vmI18n.t("btn.published")}(${this.agTableConfig2.pagenation.total
          })`,
        // 草稿
        three: `${vmI18n.t("btn.draft")}(${this.agTableConfig3.pagenation.total
          })`,
        // 下线/过期
        four: `${vmI18n.t("other.offline_expired")}(${this.agTableConfig4.pagenation.total
          })`,
      };
    },
  },
  mounted() {
    this.getPermissions();
    this.getData();
  },
  methods: {
    // 分页change 事件
    pageChange1(val) {
      this.agTableConfig1.pagenation.current = val;
      this.getData();
    },
    // 切换分页条数
    pageSizeChange1(val) {
      this.agTableConfig1.pagenation.pageSize = val;
      this.getData();
    },
    // 分页change 事件
    pageChange2(val) {
      this.agTableConfig2.pagenation.current = val;
      this.getData();
    },
    // 切换分页条数
    pageSizeChange2(val) {
      this.agTableConfig2.pagenation.pageSize = val;
      this.getData();
    },
    // 分页change 事件
    pageChange3(val) {
      this.agTableConfig3.pagenation.current = val;
      this.getData();
    },
    // 切换分页条数
    pageSizeChange3(val) {
      this.agTableConfig3.pagenation.pageSize = val;
      this.getData();
    },
    // 分页change 事件
    pageChange4(val) {
      this.agTableConfig4.pagenation.current = val;
      this.getData();
    },
    // 切换分页条数
    pageSizeChange4(val) {
      this.agTableConfig4.pagenation.pageSize = val;
      this.getData();
    },
    getExtendObj() {
      return {
        getRowStyle(params) {
          // console.log("params :>> ", params);
          // 设置行样式
          if (params.data.STATUS === 1) {
            // 草稿
            return { color: "#323233" };
          }
          if (params.data.STATUS === 2) {
            // 已发布
            return { color: "blue" };
          }
          // 下线过期
          return { color: "gray" };
        },
      };
    },
    // 查找
    async getData() {
      const currentPage = this[`agTableConfig${this.activeName}`].pagenation.current;
      const pageSize = this[`agTableConfig${this.activeName}`].pagenation.pageSize;
      this.loadings = true;
      const params = {
        ACTISTATUS: this.STATUS.join(",").replace("bSelect-all", 0), // 活动状态
        SHOP_IDS: this.my_input_sh.itemdata.pid, // 线上店铺ID（1010修改，前端传单个门店）0
        ACTI_PRO: this.product.itemdata_xitong, // 款号0
        ACTI_DATE: this.acti_date ? this.acti_date.join("-") : "", // 活动日期0
        ACTI_NAME: this.acti_name, // 活动名称
        GROUP_NAME: this.acti_group, // 活动分组
        RELEASE_NAME: this.release_name, // 发布人
        ACTI_NO: this.acti_no,
        PAGE: {
          CURRENT_PAGE: currentPage, // 当前页码
          PAGE_SIZE: pageSize, // 分页单位
        },
      }
      let formData = new FormData();
      formData.append("param", JSON.stringify(params));
      // 促销中心列表
      const { data: { code, message, data } } = await this.service.promotionCenter.selectPmList(formData)
      this.loadings = false;
      console.log("促销中心列表", 'code:' + code, 'message:' + message, 'data:' + data);
      if (code === 0) {
        // this.activeName = '1' // 全部
        if (data && data.ACTI_ALL_INFO) {
          data.ACTI_ALL_INFO.forEach((item, index) => {
            item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
            // item.ACTION_LOG = "查看日志";
            item.ACTION_LOG = vmI18n.t("other.view_log");
          });
          this.agTableConfig1.rowData = data.ACTI_ALL_INFO || [];
          this.agTableConfig1.pagenation.total = data.ACTI_ALL_NUM;

          this.$refs.agGridChild1.agGridTable(
            this.agTableConfig1.columnDefs,
            this.agTableConfig1.rowData,
            this.getExtendObj()
          );
        }
        // this.activeName = '2' // 已发布
        if (data && data.ACTI_RELEASE_INFO) {
          data.ACTI_RELEASE_INFO.forEach((item, index) => {
            item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
            // item.ACTION_LOG = "查看日志";
            item.ACTION_LOG = vmI18n.t("other.view_log");
          });
          this.agTableConfig2.rowData = data.ACTI_RELEASE_INFO || [];
          this.agTableConfig2.pagenation.total = data.ACTI_RELEASE_NUM;

          this.$refs.agGridChild2.agGridTable(
            this.agTableConfig2.columnDefs,
            this.agTableConfig2.rowData,
            this.getExtendObj()
          );
        }
        // this.activeName = '3' // 草稿
        if (data && data.ACTI_DRAFT_INFO) {
          data.ACTI_DRAFT_INFO.forEach((item, index) => {
            item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
            // item.ACTION_LOG = "查看日志";
            item.ACTION_LOG = vmI18n.t("other.view_log");
          });
          this.agTableConfig3.rowData = data.ACTI_DRAFT_INFO || [];
          this.agTableConfig3.pagenation.total = data.ACTI_DRAFT_NUM;

          this.$refs.agGridChild3.agGridTable(
            this.agTableConfig3.columnDefs,
            this.agTableConfig3.rowData,
            this.getExtendObj()
          );
        }

        // this.activeName = '4' // 下线过期
        if (data && data.ACTI_OVER_INFO) {
          data.ACTI_OVER_INFO.forEach((item, index) => {
            item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
            // item.ACTION_LOG = "查看日志";
            item.ACTION_LOG = vmI18n.t("other.view_log");
          });
          this.agTableConfig4.rowData = data.ACTI_OVER_INFO || [];
          this.agTableConfig4.pagenation.total = data.ACTI_OVER_NUM;

          this.$refs.agGridChild4.agGridTable(
            this.agTableConfig4.columnDefs,
            this.agTableConfig4.rowData,
            this.getExtendObj()
          );
        }
      }

      // this.axios({
      //   url: "/p/cs/pm/v1/selectPmList",
      //   method: "POST",
      //   data: {
      //     param: JSON.stringify({
      //       ACTISTATUS: this.STATUS.join(",").replace("bSelect-all", 0), // 活动状态
      //       SHOP_IDS: this.my_input_sh.itemdata.pid, // 线上店铺ID（1010修改，前端传单个门店）0
      //       ACTI_PRO: this.product.itemdata_xitong, // 款号0
      //       ACTI_DATE: this.acti_date ? this.acti_date.join("-") : "", // 活动日期0
      //       ACTI_NAME: this.acti_name, // 活动名称
      //       GROUP_NAME: this.acti_group, // 活动分组
      //       RELEASE_NAME: this.release_name, // 发布人
      //       ACTI_NO: this.acti_no,
      //       PAGE: {
      //         CURRENT_PAGE: currentPage, // 当前页码
      //         PAGE_SIZE: pageSize, // 分页单位
      //       },
      //     }),
      //   },
      // }).then((res) => {
      //   this.loadings = false;
      //   if (res.data.code === 0) {
      //     const data = res.data.data;
      //     // console.log("data :>> ", this.$print(data));
      //     // this.activeName = '1' // 全部
      //     if (data && data.ACTI_ALL_INFO) {
      //       data.ACTI_ALL_INFO.forEach((item, index) => {
      //         item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
      //         // item.ACTION_LOG = "查看日志";
      //         item.ACTION_LOG = vmI18n.t("other.view_log");
      //       });
      //       this.agTableConfig1.rowData = data.ACTI_ALL_INFO || [];
      //       this.agTableConfig1.pagenation.total = data.ACTI_ALL_NUM;

      //       this.$refs.agGridChild1.agGridTable(
      //         this.agTableConfig1.columnDefs,
      //         this.agTableConfig1.rowData,
      //         this.getExtendObj()
      //       );
      //     }
      //     // this.activeName = '2' // 已发布
      //     if (data && data.ACTI_RELEASE_INFO) {
      //       data.ACTI_RELEASE_INFO.forEach((item, index) => {
      //         item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
      //         // item.ACTION_LOG = "查看日志";
      //         item.ACTION_LOG = vmI18n.t("other.view_log");
      //       });
      //       this.agTableConfig2.rowData = data.ACTI_RELEASE_INFO || [];
      //       this.agTableConfig2.pagenation.total = data.ACTI_RELEASE_NUM;

      //       this.$refs.agGridChild2.agGridTable(
      //         this.agTableConfig2.columnDefs,
      //         this.agTableConfig2.rowData,
      //         this.getExtendObj()
      //       );
      //     }
      //     // this.activeName = '3' // 草稿
      //     if (res.data.data && res.data.data.ACTI_DRAFT_INFO) {
      //       data.ACTI_DRAFT_INFO.forEach((item, index) => {
      //         item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
      //         // item.ACTION_LOG = "查看日志";
      //         item.ACTION_LOG = vmI18n.t("other.view_log");
      //       });
      //       this.agTableConfig3.rowData = data.ACTI_DRAFT_INFO || [];
      //       this.agTableConfig3.pagenation.total = data.ACTI_DRAFT_NUM;

      //       this.$refs.agGridChild3.agGridTable(
      //         this.agTableConfig3.columnDefs,
      //         this.agTableConfig3.rowData,
      //         this.getExtendObj()
      //       );
      //     }

      //     // this.activeName = '4' // 下线过期
      //     if (res.data.data && res.data.data.ACTI_OVER_INFO) {
      //       data.ACTI_OVER_INFO.forEach((item, index) => {
      //         item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
      //         // item.ACTION_LOG = "查看日志";
      //         item.ACTION_LOG = vmI18n.t("other.view_log");
      //       });
      //       this.agTableConfig4.rowData = data.ACTI_OVER_INFO || [];
      //       this.agTableConfig4.pagenation.total = data.ACTI_OVER_NUM;

      //       this.$refs.agGridChild4.agGridTable(
      //         this.agTableConfig4.columnDefs,
      //         this.agTableConfig4.rowData,
      //         this.getExtendObj()
      //       );
      //     }
      //   }
      // });
    },
    timestampToTime(timestamp) {
      const date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000

      const Y = `${date.getFullYear()}.`;

      const M = `${date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1
        }.`;

      const D = `${date.getDate()} `;

      const h = `${date.getHours()}:`;

      const m = `${date.getMinutes()}:`;

      let s = date.getSeconds();
      if (Number(s) < 10) {
        s = `0${s}`;
      }

      return Y + M + D + h + m + s;
    },
    // 关闭弹框
    closeModal() {
      this.modal = false;
    },
    // 查看日志方法
    async viewLog(e) {
      const self = this;
      const formData = new FormData();
      formData.append("param", JSON.stringify({ promActiId: e.ACTI_ID }));

      // 查看日志
      const { data: { code, message, data } } = await this.service.promotionCenter.cpromLogQuery(formData)
      console.log("查看日志", 'code:' + code, 'message:' + message, 'data:' + data);
      if (code === 0) {
        if (data.length === 0) {
          // self.$message.warning("查询数据为空");
          self.$message.warning(vmI18n.t("modalTips.r8"));
        } else {
          self.logData.data = data;
          self.$message.success(message);
          self.modal = true;
        }
      } else {
        self.$message.error(message);
      }
      // axios({
      //   method: "post",
      //   url: "/p/cs/cpromLogQuery",
      //   data: formData,
      // }).then((res) => {
      //   console.log(res);
      //   if (res.data.code === 0) {
      //     if (res.data.data.length === 0) {
      //       // self.$message.warning("查询数据为空");
      //       self.$message.warning(vmI18n.t("modalTips.r8"));
      //     } else {
      //       self.logData.data = res.data.data;
      //       self.$message.success(res.data.message);
      //       self.modal = true;
      //     }
      //   } else {
      //     self.$message.error(res.data.message);
      //   }
      // });
    },
    // 获取button数组
    async getPermissions() {
      const independent = [];
      const buttons = [];
      const params = {
                        param:{
                          AD_ACTION_NAME: "promactiquerylist",
                        }
                     }
      // 获取button数组
      const { data: { code, message, data } } = await this.service.promotionCenter.fetchActionsInCustomizePage(params)
      console.log("获取button数组", 'code:' + code, 'message:' + message, 'data:' + data);
      if (code === 0) {
        data.map((item) => {
          buttons.push(item.webid);
        });
      }
      // axios({
      //   method: "get",
      //   url: "/p/cs/fetchActionsInCustomizePage",
      //   params: {
      //     param: {
      //       AD_ACTION_NAME: "promactiquerylist",
      //     }
      //   }
      // }).then((res) => {
      //   console.log("paramsparams", res);
      //   if (res.data.code === 0) {
      //     res.data.data.map((item) => {
      //       buttons.push(item.webid);
      //     });
      //   }
      // });
      this.buttons = buttons;
      console.log('获取but', this.buttons);
    },
    errorDialogClose(value, option) {
      if (option) {
        this.downLine();
      } else {
        this.dataError.show = false;
      }
    },
    actOffline() {
      const newList = [];
      const newIds = [];
      this.$refs[`agGridChild${this.activeName}`].AGTABLE.getSelect().forEach(
        (item) => {
          newList.push(item);
          newIds.push(item.ACTI_ID);
        }
      );
      if (newList.length < 1) {
        this.$message({
          // message: "请至少选择一个",
          message: vmI18n.t("modalTips.r9"),
          type: "warning",
        });
        return;
      }
      // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
      const flag = newList.some((item) => item.STATUS === 3);
      if (flag) {
        this.$message({
          // message: "选择的促销活动已经下线/过期",
          message: vmI18n.t("modalTips.q0"),
          type: "warning",
        });
        return;
      }
      this.dataError.show = true;
    },
    copy() {
      const selectedData = this.$refs[
        `agGridChild${this.activeName}`
      ].AGTABLE.getSelect();
      if (selectedData.length === 0) {
        // this.$message.warning("请选择一条数据进行复制操作");
        this.$message.warning(vmI18n.t("modalTips.q1"));
        return;
      }
      if (selectedData.length > 1) {
        // this.$message.warning("只能选取一条数据");
        this.$message.warning(vmI18n.t("modalTips.q2"));
      } else {
        const ACTI_ID = selectedData[0].ACTI_ID;
        const IS_BATCH = selectedData[0].IS_BATCH;
        if (IS_BATCH) {
          this.$store.commit("customize/TabOpen", {
            id: -1, // id
            type: "action", // 类型action
            name: "batchActivity", // 文件名
            // label: "批量新增促销活动", // tab中文名batchAddPromotion
            label: vmI18n.t("panel_label.batchAddPromotion"),
            query: Object.assign({
              id: -1, // id
              copy: ACTI_ID,
              // tabTitle: "批量新增促销活动", // tab中文名
              tabTitle: vmI18n.t("panel_label.batchAddPromotion"),
            }), // 带的参数
          });
        } else {
          this.$store.commit("customize/TabOpen", {
            id: -1, // id
            type: "action", // 类型action
            name: "addOrEditActi", // 文件名
            // label: "新增促销活动", // tab中文名
            label: vmI18n.t("panel_label.addPromotion"),
            query: Object.assign({
              id: -1, // id
              copy: ACTI_ID,
              // tabTitle: "新增促销活动", // tab中文名
              tabTitle: vmI18n.t("panel_label.addPromotion"),
            }), // 带的参数
          });
        }
      }
    },
    promotionClick() {
      this.$store.commit("customize/TabOpen", {
        id: -1, // id
        type: "action", // 类型action
        name: "addOrEditActi", // 文件名
        // label: "新增促销活动", // tab中文名
        label: vmI18n.t("panel_label.addPromotion"),
        query: Object.assign({
          id: -1, // id
          // tabTitle: "新增促销活动", // tab中文名
          tabTitle: vmI18n.t("panel_label.addPromotion"),
        }), // 带的参数
      });
    },
    promotionBlukClick() {
      // 【批量新增】
      this.$store.commit("customize/TabOpen", {
        id: -1, // id
        type: "action", // 类型action
        name: "batchActivity", // 文件名
        // label: "批量新增促销活动", // tab中文名
        label: vmI18n.t("panel_label.batchAddPromotion"),
        query: Object.assign({
          id: -1, // id
          // tabTitle: "批量新增促销活动", // tab中文名
          tabTitle: vmI18n.t("panel_label.batchAddPromotion"),
        }), // 带的参数
      });
    },
    async publish() {
      const newList = [];
      let flag = false;
      const newIds = [];
      const agGridTable = this.$refs[`agGridChild${this.activeName}`].AGTABLE
      if (agGridTable) {
        agGridTable.getSelect().map(
          (item) => {
            newList.push(item);
            newIds.push(item.ACTI_ID);
          }
        );
      }

      if (newList.length < 1) {
        this.$message({
          // message: "请至少选择一个",
          message: vmI18n.t("modalTips.r9"),
          type: "warning",
        });
        return false;
      }
      flag = newList.every((item) => item.STATUS === 1);
      if (!flag) {
        this.$message({
          // message: "选择的促销活动已经发布",
          message: vmI18n.t("modalTips.q3"),
          type: "warning",
        });
        return false;
      }
      this.dataError.show = false; // 关闭弹框

      // 请求发布接口
      let params = {
        objid: -1, // 默认参数 保持格式统一 传死-1
        isBatch: true, // 是否批量 传true
        fixcolumn: {
          ids: newIds, // 促销活动ID
          status: 2, // 3表示下线
        },
      }
      const formData = new FormData();
      formData.append("param", JSON.stringify(params));
      const {data:{code,message}} =  await this.service.promotionCenter.updatePmStatus(formData)
      console.log("请求发布", 'code:' + code, 'message:' + message);
      if (code === 0) {
        this.getData();
        this.$message({
          message: message,
          type: "success",
        });
      } else {
        this.$message({
          message: message,
          type: "success",
        });
      }
    }, // 发布
    async deleteActi() {
      const newIds = [];
      const agGridTable = this.$refs[`agGridChild${this.activeName}`].AGTABLE
      if (agGridTable) {
        agGridTable.getSelect().map(
          (item) => {
            newList.push(item);
            newIds.push(item.ACTI_ID);
          }
        );
      }
      if (newIds.length < 1) {
        this.$message({
          // message: "请至少选择一个",
          message: vmI18n.t("modalTips.r9"),
          type: "warning",
        });
        return;
      }
      // 删除请求接口
      const formData = new FormData();
      formData.append("param", JSON.stringify({
        objid: newIds, // 默认参数 保持格式统一 传死-1
      }));
      const {data:{code,message}} =  await this.service.promotionCenter.deletePm(formData)
      if (code === 0) {
        this.getData();
        this.$message({
          message: message,
          type: "success",
        });
      }
      // this.axios({
      //   url: "/p/cs/pm/v1/deletePm",
      //   method: "POST",
      //   data: {
      //     param: JSON.stringify({
      //       objid: newIds, // 默认参数 保持格式统一 传死-1
      //     }),
      //   },
      // }).then((res) => {
      //   if (res.data.code === 0) {
      //     this.getData();
      //     this.$message({
      //       message: res.data.message,
      //       type: "success",
      //     });
      //   } else {
      //     // this.$message({
      //     //   message: res.data.message,
      //     //   type: "success"
      //     // });
      //   }
      // });
    },// 删除
    async setGroup() {
      // 设置分组
      const newList = [];
      const newIds = [];
      const agGridTable = this.$refs[`agGridChild${this.activeName}`].AGTABLE
      if (agGridTable) {
        agGridTable.getSelect().map(
          (item) => {
            newList.push(item);
            newIds.push(item.ACTI_ID);
          }
        );
      }
      // if (newList.length < 1) {
      //   this.$message({
      //     // message: "请先勾选需要分组的促销",
      //     message: vmI18n.t("modalTips.q4"),
      //     type: "warning",
      //   });
      //   return;
      // }
      // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
      const flag = newList.some((item) => item.STATUS === 3);
      if (flag) {
        this.$message({
          // message: "存在【下线过期】的促销，请重新选择",
          message: vmI18n.t("modalTips.q5"),
          type: "warning",
        });
      } else {
        this.checkList = newList;
        // 设置分组请求接口
        const formData = new FormData();
        formData.append("param", JSON.stringify({ objids: newIds }));
        const {data:{code,message,data}} = await this.service.promotionCenter.selectPmGroup(formData)
        console.clear()
        console.log(code,message,data);
        if (code === 0) {
          this.setGroupTableData = data;
          this.dialog_visible = true;
        } else {
          this.$message.error(message);
        }
        // axios({
        //   method: "post",
        //   url: "/p/cs/pm/v1/selectPmGroup",
        //   data: formData,
        // }).then((res) => {
        //   // console.log(res);
        //   if (res.data.code === 0) {
        //     this.setGroupTableData = res.data.data;
        //     this.dialog_visible = true;
        //   } else {
        //     this.$message.error(res.data.message);
        //   }
        // });
      }
    },//设置分组
    closeDialog() {
      this.dialog_visible = false;
    },
    simulation() {
      // 模拟仿真
      this.$store.commit("customize/TabOpen", {
        id: -1, // id
        type: "CUSTOMIZED", // 类型action
        name: "SIMULATION", // 文件名
        // label: "模拟仿真", // tab中文名
        label: vmI18n.t("btn.simulation"),
        query: Object.assign({
          id: -1, // id
          // tabTitle: "模拟仿真", // tab中文名
          tabTitle: vmI18n.t("btn.simulation"),
        }), // 带的参数
      });
    },
    async times() {
      // 默认时间
      const start = "";
      const end = "";
      this.acti_date = [start, end];
      const _this = this;
      this.acti_date = [start.split("-").join(""), end.split("-").join("")];
      const {data:{code,message,data}} = await this.service.promotionCenter.getweekdate()
      if (code === 0) {
        _this.acti_date = [data.START_WEEK,data.END_WEEK];
        console.log("_this.acti_date_this.acti_date",_this.acti_date);
      }
      // axios.post("/p/cs/getweekdate").then((res) => {
      //   if (res.data.code === 0) {
      //     _this.acti_date = [res.data.data.START_WEEK, res.data.data.END_WEEK];
      //   }
      // });
    },
    Reset() {
      // this.acti_date = "";
      this.acti_no = ""; // 活动编号
      this.times(); // 活动日期:
      this.acti_name = ""; // 活动名称
      this.actiTypes = ["bSelect-all"]; // 活动类型:
      this.orderTypes = ["bSelect-all"]; // 订单类型:
      this.my_input_sh.itemdata.valuedata = ""; // 线上店铺
      this.my_input_sh.itemdata.pid = ""; // 线上店铺
      this.product.itemdata_xitong.valuedata = ""; // 参与商品
      this.product.itemdata_xitong.pid = ""; // 参与商品
      this.product.itemdata_xitong.channelList = ""; // 参与商品
      this.acti_group = ""; // 分组
      this.release_name = ""; // 操作人
      this.STATUS = [1, 2]; // 状态
    }, // 重置
    async handDblClick(row, index) {
      // 双击事件
      const ACTI_ID = row.ACTI_ID;
      const typeId = row.PROM_TYPE_ID;
      const IS_BATCH = row.IS_BATCH;

      // 查询当前点击行的信息
      const formData = new FormData();
      formData.append("param", JSON.stringify({
        objid: ACTI_ID,
        prom_type_id: typeId,
      }));
      const {data:{code,message,data}} = await this.service.promotionCenter.selectPm(formData)
      console.log(code,message,data);
      if (code === 0) {
        // sq存储一套作为清空操作的初始数据
        // let scheme_dataInit = JSON.stringify(res.data.data.scheme_arr);
        // 存储种类id保存草稿时需要
        if (IS_BATCH) {
          this.$store.commit("customize/TabOpen", {
            id: ACTI_ID, // id
            type: "action", // 类型action
            name: "batchActivity", // 文件名
            // label: "批量新增促销活动", // tab中文名
            label: vmI18n.t("panel_label.batchAddPromotion"),
            query: Object.assign({
              id: ACTI_ID, // id
              // tabTitle: "批量新增促销活动", // tab中文名
              tabTitle: vmI18n.t("panel_label.batchAddPromotion"),
            }), // 带的参数
          });
        } else {
          this.$store.commit("customize/TabOpen", {
            id: ACTI_ID, // id
            type: "action", // 类型action
            name: "addOrEditActi", // 文件名
            // label: "编辑促销活动", // tab中文名
            label: vmI18n.t("panel_label.editPromotion"),
            query: Object.assign({
              id: ACTI_ID, // id
              // tabTitle: "编辑促销活动", // tab中文名
              tabTitle: vmI18n.t("panel_label.editPromotion"),
            }), // 带的参数
          });
        }
      }
      // this.axios({
      //   method: "post",
      //   url: "/p/cs/pm/v1/selectPm",
      //   data: {
      //     param: JSON.stringify(),
      //   },
      // }).then((res) => {
      //   if (res.data.code === 0) {
      //     // sq存储一套作为清空操作的初始数据
      //     // let scheme_dataInit = JSON.stringify(res.data.data.scheme_arr);
      //     // 存储种类id保存草稿时需要
      //     if (IS_BATCH) {
      //       this.$store.commit("customize/TabOpen", {
      //         id: ACTI_ID, // id
      //         type: "action", // 类型action
      //         name: "batchActivity", // 文件名
      //         // label: "批量新增促销活动", // tab中文名
      //         label: vmI18n.t("panel_label.batchAddPromotion"),
      //         query: Object.assign({
      //           id: ACTI_ID, // id
      //           // tabTitle: "批量新增促销活动", // tab中文名
      //           tabTitle: vmI18n.t("panel_label.batchAddPromotion"),
      //         }), // 带的参数
      //       });
      //     } else {
      //       this.$store.commit("customize/TabOpen", {
      //         id: ACTI_ID, // id
      //         type: "action", // 类型action
      //         name: "addOrEditActi", // 文件名
      //         // label: "编辑促销活动", // tab中文名
      //         label: vmI18n.t("panel_label.editPromotion"),
      //         query: Object.assign({
      //           id: ACTI_ID, // id
      //           // tabTitle: "编辑促销活动", // tab中文名
      //           tabTitle: vmI18n.t("panel_label.editPromotion"),
      //         }), // 带的参数
      //       });
      //     }
      //   }
      // });
    },
    async downLine() {
      const newList = [];
      const newIds = [];
      this.$refs[`agGridChild${this.activeName}`].AGTABLE.getSelect().forEach(
        (item) => {
          newList.push(item);
          newIds.push(item.ACTI_ID);
        }
      );
      if (newList.length < 1) {
        this.$message({
          // message: "请至少选择一个",
          message: vmI18n.t("modalTips.r9"),
          type: "warning",
        });
        return false;
      }
      // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
      const flag = newList.some((item) => item.STATUS === 3);
      if (flag) {
        this.$message({
          // message: "选择的促销活动已经下线/过期",
          message: vmI18n.t("modalTips.q0"),
          type: "warning",
        });
        return false;
      }
      this.dataError.show = false; // 关闭弹框

      let params = {
        objid: -1, // 默认参数 保持格式统一 传死-1
        isBatch: true, // 是否批量 传true
        fixcolumn: {
          ids: newIds, // 促销活动ID
          status: 2, // 3表示下线
        },
      }
      const formData = new FormData();
      formData.append("param", JSON.stringify(params));
      const {data:{code,message}} =  await this.service.promotionCenter.updatePmStatus(formData)
      if (code === 0) {
        this.getData();
        this.$message({
          message: message,
          type: "success",
        });
      }
      // this.axios({
      //   url: "/p/cs/pm/v1/updatePmStatus",
      //   method: "POST",
      //   data: {
      //     param: JSON.stringify({
      //       objid: -1, // 默认参数 保持格式统一 传死-1
      //       isBatch: true, // 是否批量 传true
      //       fixcolumn: {
      //         ids: newIds, // 促销活动ID
      //         status: 3, // 3表示下线
      //       },
      //     }),
      //   },
      // }).then((res) => {
      //   if (res.data.code === 0) {
      //     // console.log("0", res.data.code);
      //     this.getData();
      //     this.$message({
      //       message: res.data.message,
      //       type: "success",
      //     });
      //   }
      // });
    },
    formUserKeyUp(event) {
      if (event.keyCode === 13) {
        this.getData();
      }
    },
  },
};
