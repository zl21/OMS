import businessLabel from 'professionalComponents/businessLabel';
import businessButton from 'professionalComponents/businessButton';
import errorMessage from 'framework/components/tablelist/error.vue';
import Mydialog from 'framework/components/dialog/mydialog.vue';
import TableInput from 'framework/components/element/input';
import aTable from 'professionalComponents/agGridTable.vue';
import { isFavoriteMixin } from '@/assets/js/mixins/isFavorite';
import dialogVisible from '@/views/pages/promotionCenter/setGroup';
import Favorite from '@/views/pages/promotionCenter/components/favorite';
import { buttonPermissionsMixin } from '@/assets/js/mixins/buttonPermissions';
import loading from '@/component/loading.vue';
import comUtils from '@/assets/js/__utils__/common';

const baseColumnDefs = [
  {
    headerName: '序号',
    // headerName: vmI18n.t("table_label.serialNo"),
    field: 'SERIAL_NO',
    pinned: 'left',
    maxWidth: 120,
    headerCheckboxSelection: true,
    checkboxSelection: true,
    sort: 'asc',
    suppressMovable: true
  },
  {
    headerName: '促销编号',
    // headerName: vmI18n.t("table_label.serialNo"),
    field: 'ACTI_NO'
  },
  {
    headerName: '活动名称',
    // headerName: vmI18n.t("form_label.activityName"),
    field: 'ACTI_NAME'
  },
  {
    headerName: '参与店铺',
    // headerName: vmI18n.t("table_label.participating_store"),
    field: 'STORE_NAMES'
  },
  {
    headerName: '活动时间段',
    // headerName: vmI18n.t("table_label.activity_period"),
    field: 'ACTI_DATE'
  },
  {
    headerName: '失效下线时间',
    // headerName: vmI18n.t("table_label.failure_offline_time"),
    field: 'DOWN_TIME'
  },
  {
    headerName: '剩余可送',
    // headerName: vmI18n.t("table_label.rest_sent"),
    field: 'STOCK'
  },
  {
    headerName: '已送数量',
    // headerName: vmI18n.t("table_label.delivered_quantity"),
    field: 'SEND'
  },
  {
    headerName: '状态',
    // headerName: vmI18n.t("table_label.status"),
    field: 'STATUS'
  },
  {
    headerName: '分组名称',
    // headerName: vmI18n.t("table_label.groupName"),
    field: 'GROUP_NAME'
  },
  {
    headerName: '优先级',
    // headerName: vmI18n.t("table_label.priority"),
    field: 'LEVEL'
  },
  {
    headerName: '创建人',
    // headerName: vmI18n.t("table_label.creator"),
    field: 'OWNERENAME'
  },
  {
    headerName: '创建时间',
    // headerName: vmI18n.t("table_label.creationTime"),
    field: 'CREATIONDATE'
  },
  {
    headerName: '修改人',
    // headerName: vmI18n.t("table_label.reviser"),
    field: 'OWNERENAME'
  },
  {
    headerName: '修改时间',
    // headerName: vmI18n.t("table_label.modificationTime"),
    field: 'MODIFIEDDATE'
  },
  {
    headerName: '备注',
    // headerName: vmI18n.t("table_label.remarks"),
    field: 'REMARK'
  },
  {
    headerName: '操作',
    // headerName: vmI18n.t("table_label.operation"),
    field: 'ACTION_LOG'
  }
];
export default {
  mixins: [isFavoriteMixin, buttonPermissionsMixin],
  data() {
    return {
      vmI18n: window.vmI18n,
      modal: false, // 查看日志弹框
      loadings: false, // 下拉框默认loadings值
      release_name: '', // 操作人
      acti_no: '', // 促销编号
      acti_name: '', // 促销名称
      acti_group: '', // 分组设置
      activeName: 0, // tabs默认值 根据这个，判断是第几个tab
      dialog_visible: false,
      acti_date: [], // 时间
      checkList: [], // 表格复选框选中的id
      setGroupTableData: [], // 设置分组列表
      STATUS: [1, 2, 3], // 状态 1.草稿，2.已发布，3.下线
      logData: {
        columns: [
          {
            // title: "序号",
            title: window.vmI18n.t('table_label.serialNo'),
            type: 'index',
            width: 60,
            align: 'center'
          },
          {
            // title: "操作时间",
            title: window.vmI18n.t('table_label.operatorTime'),
            key: 'creationdate'
          },
          {
            // title: "操作人",
            title: window.vmI18n.t('form_label.operator'),
            key: 'operator'
          },
          {
            // title: "操作描述",
            title: window.vmI18n.t('table_label.operation_description'),
            key: 'describes'
          }
        ],
        data: []
      },
      my_input_sh: {
        itemdata: {
          col: 1,
          // colid: this.$store.state.forginkeys.columnIds.shop || '1700805184',
          colid: '1700805184',
          colname: 'CP_C_SHOP_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'mrp', // 外键关联类型
          fkdesc: '店铺',
          inputname: 'CP_C_SHOP:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: window.vmI18n.t('table_label.shopName'), // 店铺名称 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_SHOP', // 对应的表
          // reftableid: 24475, //对应的表ID
          row: 1,
          statsize: -1,
          type: 'STRING', // 这个是后台用的
          valuedata: '' // 这个是选择的值
        }
      },
      my_input_st: {
        itemdata: {
          col: 1,
          colid: 1700805185,
          colname: 'CP_C_STORE_ID', // 当前字段的名称
          datelimit: 'all',
          display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
          fkdisplay: 'mrp', // 外键关联类型
          fkdesc: '店铺',
          inputname: 'CP_C_STORE.ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
          isfk: true, // 是否有fk键
          isnotnull: false, // 是否必填
          isuppercase: false, // 是否转大写
          length: 65535, // 最大长度是多少
          name: window.vmI18n.t('form_label.offline_stores'), // 线下门店 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_RSTORE', // 对应的表
          // reftableid: 23296, //对应的表ID
          row: 1,
          statsize: -1,
          type: 'STRING', // 这个是后台用的
          valuedata: '' // 这个是选择的值
        }
      },
      dataError: {
        show: false, // 控制警告弹框显示
        title: window.vmI18n.t('modalTitle.error'), // 错误 弹框标题
        type: 'warning', // 类型警告
        backBtn: true, // 是否显示返回按钮
        errorList: [{ message: '确定执行下线操作？' }] // 提示内容
      },
      dialog: {
        visible: true, // 控制查看日志弹窗
        param: {},
        title: ''
      }, // 查看日志传参
      query: {
        store: [], // 门店
        firstLevel: [], // 促销大类
        lastLevel: [], // 店仓名称
        distrib: '', // 配销中心,
        storeType: true
      },
      inputList: [
        {
          colname: 'PS_C_PRO_ECODE',
          cusurl: 'custompage/matrix',
          display: 'text',
          // name: "商品编码",
          name: window.vmI18n.t('table_label.productNo'),
          pid: '',
          tablename: 'DL_B_TRAN_PLAN_ITEM',
          type: 'STRING',
          value: '',
          valuedata: ''
        }
      ],
      tabConfig: [
        {
          label: window.vmI18n.t('common.all'), // 全部
          agTableConfig: {
            isIndex: true,
            tableHeight: '100px',
            columnDefs: baseColumnDefs,
            rowData: [],
            renderArr: {
              ACTION_LOG: params => {
                if (!params.data.ACTION_LOG) return;
                const resultElement = document.createElement('div');
                const iTag = document.createElement('div');
                iTag.style.color = '#0f8ee9';
                iTag.style.textDecoration = 'underline';
                iTag.innerText = params.data.ACTION_LOG;
                iTag.style.cursor = 'pointer';
                iTag.onclick = () => {
                  this.viewLog(params.data);
                };
                resultElement.appendChild(iTag);
              }
            },
            pagenation: comUtils.pageConfig,
          }
        },
        {
          label: window.vmI18n.t('btn.published'), // 已发布
          agTableConfig: {
            isIndex: true,
            tableHeight: '',
            columnDefs: baseColumnDefs,
            rowData: [],
            renderArr: {
              ACTION_LOG: params => {
                if (!params.data.ACTION_LOG) return;
                const resultElement = document.createElement('div');
                const iTag = document.createElement('div');
                iTag.style.color = '#0f8ee9';
                iTag.style.textDecoration = 'underline';
                iTag.innerText = params.data.ACTION_LOG;
                iTag.style.cursor = 'pointer';
                iTag.onclick = () => {
                  this.viewLog(params.data);
                };
                resultElement.appendChild(iTag);
                // return resultElement;
              }
            },
            pagenation: {
              // 设置总条数
              total: 0,
              // 条数
              pageSize: 20,
              // 页数
              current: 1,
              pageSizeOpts: [20, 50, 150, 1000]
            }
          }
        },
        {
          label: window.vmI18n.t('btn.draft'), // 草稿
          agTableConfig: {
            isIndex: true,
            tableHeight: '',
            columnDefs: baseColumnDefs,
            rowData: [],
            renderArr: {
              ACTION_LOG: params => {
                if (!params.data.ACTION_LOG) return;
                const resultElement = document.createElement('div');
                const iTag = document.createElement('div');
                iTag.style.color = '#0f8ee9';
                iTag.style.textDecoration = 'underline';
                iTag.innerText = params.data.ACTION_LOG;
                iTag.style.cursor = 'pointer';
                iTag.onclick = () => {
                  this.viewLog(params.data);
                };
                resultElement.appendChild(iTag);
                // return resultElement;
              }
            },
            pagenation: {
              // 设置总条数
              total: 0,
              // 条数
              pageSize: 20,
              // 页数
              current: 1,
              pageSizeOpts: [20, 50, 150, 1000]
            }
          }
        },
        {
          label: window.vmI18n.t('other.offline_expired'), // 下线/过期
          agTableConfig: {
            isIndex: true,
            tableHeight: '',
            columnDefs: baseColumnDefs,
            rowData: [],
            renderArr: {
              ACTION_LOG: params => {
                if (!params.data.ACTION_LOG) return;
                const resultElement = document.createElement('div');
                const iTag = document.createElement('div');
                iTag.style.color = '#0f8ee9';
                iTag.style.textDecoration = 'underline';
                iTag.innerText = params.data.ACTION_LOG;
                iTag.style.cursor = 'pointer';
                iTag.onclick = () => {
                  this.viewLog(params.data);
                };
                resultElement.appendChild(iTag);
                // return resultElement;
              }
            },
            pagenation: {
              // 设置总条数
              total: 0,
              // 条数
              pageSize: 20,
              // 页数
              current: 1,
              pageSizeOpts: [20, 50, 150, 1000]
            }
          }
        }
      ],
      diStatusArr: [
        {
          value: 1,
          label: window.vmI18n.t('btn.draft') // 草稿
        },
        {
          value: 2,
          label: window.vmI18n.t('btn.published') // 已发布
        },
        {
          value: 3,
          label: window.vmI18n.t('btn.offline') // 下线
        }
      ],
      product: {
        itemdata_xitong: {
          col: 1,
          // colid: this.$store.state.forginkeys.columnIds.sku || '1700806532',
          colid: '1700806532',
          colname: 'PS_C_PRO_ID',
          datelimit: 'all',
          display: 'text',
          fkdesc: '参与商品',
          fkdisplay: 'drp',
          inputname: 'PS_C_PRO_ID:ECODE',
          isfk: true,
          isnotnull: false,
          isuppercase: true,
          length: 65535,
          // name: "参与商品",
          name: window.vmI18n.t('other.participating_goods'),
          readonly: false,
          reftable: 'PS_C_PRO',
          reftableid: 23281,
          row: 1,
          statsize: -1,
          type: 'STRING',
          valuedata: ''
        }
      },
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        buttons: [
          {
            text: window.vmI18n.t('btn.find'), // 按钮文本,
            webname: 'lookup_cuxiaohuodomg',
            btnclick: () => {
              this.getData();
            }
          },
          {
            text: window.vmI18n.t('btn.reset'), // 按钮文本,
            webname: 'chongzhicux_cuxiaohuodomg',
            btnclick: () => {
              this.Reset();
            }
          },
          {
            text: window.vmI18n.t('btn.add'), // 按钮文本,
            webname: 'xinzengcux_cuxiaohuodomg',
            btnclick: () => {
              this.promotionClick();
            }
          },
          {
            text: window.vmI18n.t('btn.batch_add'), // 按钮文本,
            webname: 'piliangxinzengcux_cuxiaohuodomg',
            btnclick: () => {
              this.promotionBlukClick();
            }
          },
          {
            text: window.vmI18n.t('btn.publish'), // 按钮文本,
            webname: 'fabucux_cuxiaohuodomg',
            btnclick: () => {
              this.publish();
            }
          },
          {
            text: window.vmI18n.t('btn.offline'), // 按钮文本,
            webname: 'xiaxiancux_cuxiaohuodomg',
            btnclick: () => {
              this.actOffline();
            }
          },
          {
            text: window.vmI18n.t('common.copy'), // 按钮文本,
            webname: 'copy_cuxiaohuodomg',
            btnclick: () => {
              this.copy();
            }
          },
          {
            text: window.vmI18n.t('btn.delete'), // 按钮文本,
            webname: 'deletecux_cuxiaohuodomg',
            btnclick: () => {
              this.deleteActi();
            }
          },
          {
            text: window.vmI18n.t('btn.set_groups'), // 按钮文本,
            webname: 'shezhifenzucux_cuxiaohuodomg',
            btnclick: () => {
              this.setGroup();
            }
          },
          {
            text: window.vmI18n.t('btn.simulation'), // 按钮文本,
            webname: 'fangzhencux_cuxiaohuodomg',
            btnclick: () => {
              this.simulation();
            }
          },
          {
            icon: 'iconfont iconbj_col', // 按钮图标
            name: window.vmI18n.t('btn.collection'), // 收藏
            btnclick: () => {
              const self = this;
              self.setFavorite();
            } // 按钮点击事件
          }
        ]
      }
    };
  },
  watch: {
    activeName() {
      this.getData();
    }
  },
  components: {
    businessButton,
    businessLabel,
    aTable,
    Mydialog,
    errorMessage,
    dialogVisible,
    Favorite,
    TableInput,
    loading
  },
  created() { },
  computed: {
    commodity() {
      return this.inputList[0].valuedata;
    }
  },
  async mounted() {
    this.$nextTick(() => {
      this.getPermissions('btnConfig', 'promactiquerylist');
    });

    // 计算高度 通过设置节点 'totalHeight'
    await comUtils.setTableHeight(this, 100);

    await this.times(); // 默认时间

    await this.getData();
    // 检测屏幕变化 设置高度 重新渲染agTabe
    comUtils.onresizes(this, 100);
  },
  methods: {
    // 处理时间
    handleChange(dateArr) {
      const filterDate = [];
      dateArr.forEach(item => {
        filterDate.push(item.replace(/\-/g, ''));
      });
      this.acti_date = filterDate;
    },
    // 分页change 事件
    pageChange(val) {
      this.tabConfig[this.activeName].agTableConfig.pagenation.current = val;
      this.getData();
    },
    // 切换分页条数
    pageSizeChange(val) {
      this.tabConfig[this.activeName].agTableConfig.pagenation.pageSize = val;
      this.getData();
    },
    getExtendObj() {
      return {
        getRowStyle(params) {
          // 设置行样式
          if (params.data.STATUS === 1) {
            // 草稿
            return { color: '#323233' };
          }
          if (params.data.STATUS === 2) {
            // 已发布
            return { color: 'blue' };
          }
          // 下线过期
          return { color: 'gray' };
        }
      };
    },
    // 查找
    async getData() {
      const currentPage = this.tabConfig[this.activeName].agTableConfig.pagenation.current;
      const pageSize = this.tabConfig[this.activeName].agTableConfig.pagenation.pageSize;
      this.loadings = true;
      const params = {
        ACTISTATUS: this.STATUS.join(',').replace('bSelect-all', 0), // 活动状态
        SHOP_IDS: this.my_input_sh.itemdata.pid, // 线上店铺ID（1010修改，前端传单个门店）0
        ACTI_PRO: this.product.itemdata_xitong, // 款号0
        ACTI_DATE: this.acti_date ? this.acti_date.join('-') : '', // 活动日期0
        ACTI_NAME: this.acti_name, // 活动名称
        GROUP_NAME: this.acti_group, // 活动分组
        RELEASE_NAME: this.release_name, // 发布人
        ACTI_NO: this.acti_no,
        PAGE: {
          CURRENT_PAGE: currentPage, // 当前页码
          PAGE_SIZE: pageSize // 分页单位
        }
      };
      const formData = new FormData();
      formData.append('param', JSON.stringify(params));
      // 促销中心列表
      const {
        data: { code, data }
      } = await this.service.promotionCenter.selectPmList(formData);
      this.loadings = false;
      if (code === 0) {
        if (data && data.ACTI_ALL_INFO) {
          // 全部
          this.getAgTableData(data.ACTI_ALL_INFO, data.ACTI_ALL_NUM, 0);
        }
        if (data && data.ACTI_RELEASE_INFO) {
          // 1 已发布
          this.getAgTableData(data.ACTI_RELEASE_INFO, data.ACTI_RELEASE_NUM, 1);
        }
        if (data && data.ACTI_DRAFT_INFO) {
          // 2  草稿
          this.getAgTableData(data.ACTI_DRAFT_INFO, data.ACTI_DRAFT_NUM, 2);
        }
        if (data && data.ACTI_OVER_INFO) {
          // 3 下线过期
          this.getAgTableData(data.ACTI_OVER_INFO, data.ACTI_OVER_NUM, 3);
        }
      }
    },
    // 获取agTable数据
    getAgTableData(info, num, index) {
      const currentPage = this.tabConfig[this.activeName].agTableConfig.pagenation.current;
      const pageSize = this.tabConfig[this.activeName].agTableConfig.pagenation.pageSize;
      info.forEach((item, index) => {
        item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
        item.ACTION_LOG = window.vmI18n.t('other.view_log'); // 查看日志
      });
      const agGridChild = `agGridChild${index + 1}`;
      this.tabConfig[index].agTableConfig.rowData = info || [];
      this.tabConfig[index].agTableConfig.pagenation.total = num;
      this.$refs[`${agGridChild}`][0].agGridTable(this.tabConfig[index].agTableConfig.columnDefs, this.tabConfig[index].agTableConfig.rowData, this.getExtendObj());
    },
    timestampToTime(timestamp) {
      const date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000

      const Y = `${date.getFullYear()}.`;

      const M = `${date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}.`;

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
      formData.append('param', JSON.stringify({ promActiId: e.ACTI_ID }));

      // 查看日志
      const {
        data: { code, message, data }
      } = await this.service.promotionCenter.cpromLogQuery(formData);
      if (code === 0) {
        if (data.length === 0) {
          self.$message.warning(window.vmI18n.t('modalTips.r8')); // 查询数据为空
        } else {
          self.logData.data = data;
          self.$message.success(message);
          self.modal = true;
        }
      } else {
        self.$message.error(message);
      }
    },
    errorDialogClose(value, option) {
      console.log(value, option);
      if (option) {
        this.downLine();
      } else {
        this.dataError.show = false;
      }
    },
    actOffline() {
      const newList = [];
      const newIds = [];
      const agGridChild = `agGridChild${Number(this.activeName) + 1}`;
      const agGridTable = this.$refs[`${agGridChild}`][0].AGTABLE;
      if (agGridTable.getSelect().length) {
        agGridTable.getSelect().forEach(item => {
          newList.push(item);
          newIds.push(item.ACTI_ID);
        });
      }
      if (newList.length < 1) {
        this.$Message.warning(window.vmI18n.t('modalTips.r9'));
        return;
      }
      // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
      const flag = newList.some(item => item.STATUS === 3);
      if (flag) {
        this.$Message.warning(window.vmI18n.t('modalTips.q0')); // 选择的促销活动已经下线/过期
        return;
      }
      this.dataError.show = true;
    },
    copy() {
      const agGridChild = `agGridChild${Number(this.activeName) + 1}`;
      const agGridTable = this.$refs[`${agGridChild}`][0].AGTABLE;
      console.log(agGridTable.getSelect().length);
      if (agGridTable.getSelect().length) {
        const selectedData = agGridTable.getSelect();
        if (selectedData.length > 1) {
          this.$Message.warning(window.vmI18n.t('modalTips.q2')); // 只能选取一条数据
          return;
        }
        const ACTI_ID = selectedData[0].ACTI_ID;
        const IS_BATCH = selectedData[0].IS_BATCH;
        if (IS_BATCH) {
          this.$store.commit('customize/TabOpen', {
            id: -1, // id
            type: 'action', // 类型action
            name: 'batchActivity', // 文件名
            label: window.vmI18n.t('panel_label.batchAddPromotion'), // 批量新增促销活动
            query: Object.assign({
              id: -1, // id
              copy: ACTI_ID,
              tabTitle: window.vmI18n.t('panel_label.batchAddPromotion') // 批量新增促销活动
            }) // 带的参数
          });
        } else {
          this.$store.commit('customize/TabOpen', {
            id: -1, // id
            type: 'action', // 类型action
            name: 'addOrEditActi', // 文件名
            label: window.vmI18n.t('panel_label.addPromotion'), // 新增促销活动
            query: Object.assign({
              id: -1, // id
              copy: ACTI_ID,
              tabTitle: window.vmI18n.t('panel_label.addPromotion') // 新增促销活动
            }) // 带的参数
          });
        }
      } else {
        this.$Message.warning(window.vmI18n.t('modalTips.r9')); // 请至少选择一条
      }
    },
    promotionClick() {
      this.$store.commit('customize/TabOpen', {
        id: -1, // id
        type: 'action', // 类型action
        name: 'addOrEditActi', // 文件名
        label: window.vmI18n.t('panel_label.addPromotion'), // 新增促销活动
        query: Object.assign({
          id: -1, // id
          tabTitle: window.vmI18n.t('panel_label.addPromotion') // 新增促销活动
        }) // 带的参数
      });
    },
    promotionBlukClick() {
      // 【批量新增】
      this.$store.commit('customize/TabOpen', {
        id: -1, // id
        type: 'action', // 类型action
        name: 'batchActivity', // 文件名
        label: window.vmI18n.t('panel_label.batchAddPromotion'), // 批量新增促销活动
        query: Object.assign({
          id: -1, // id
          tabTitle: window.vmI18n.t('panel_label.batchAddPromotion') // 批量新增促销活动
        }) // 带的参数
      });
    },
    async publish() {
      const newList = [];
      let flag = false;
      const newIds = [];

      const agGridChild = `agGridChild${Number(this.activeName) + 1}`;
      const agGridTable = this.$refs[`${agGridChild}`][0].AGTABLE;
      if (agGridTable.getSelect().length) {
        agGridTable.getSelect().forEach(item => {
          newList.push(item);
          newIds.push(item.ACTI_ID);
        });
      }
      if (newList.length < 1) {
        this.$Message.warning(window.vmI18n.t('modalTips.r9')); // 请至少选择一个
        return;
      }
      flag = newList.every(item => item.STATUS === 1);
      if (!flag) {
        this.$Message.warning(window.vmI18n.t('modalTips.q3')); // 选择的促销活动已经发布
        return;
      }
      this.dataError.show = false; // 关闭弹框

      // 请求发布接口
      const params = {
        objid: -1, // 默认参数 保持格式统一 传死-1
        isBatch: true, // 是否批量 传true
        fixcolumn: {
          ids: newIds, // 促销活动ID
          status: 2 // 3表示下线
        }
      };
      const formData = new FormData();
      formData.append('param', JSON.stringify(params));
      const {
        data: { code, message }
      } = await this.service.promotionCenter.updatePmStatus(formData);
      if (code === 0) {
        this.getData();
        this.$message({
          message,
          type: 'success'
        });
      } else {
        this.$message({
          message,
          type: 'success'
        });
      }
    }, // 发布
    async deleteActi() {
      const newIds = [];
      const newList = [];
      const agGridChild = `agGridChild${Number(this.activeName) + 1}`;
      const agGridTable = this.$refs[`${agGridChild}`][0].AGTABLE;
      if (agGridTable.getSelect().length) {
        agGridTable.getSelect().forEach(item => {
          newList.push(item);
          newIds.push(item.ACTI_ID);
        });
      }
      if (newIds.length < 1) {
        this.$Message.warning(window.vmI18n.t('modalTips.r9')); // 请至少选择一个
        return;
      }
      // 删除请求接口
      const formData = new FormData();
      formData.append(
        'param',
        JSON.stringify({
          objid: newIds // 默认参数 保持格式统一 传死-1
        })
      );
      const {
        data: { code, message }
      } = await this.service.promotionCenter.deletePm(formData);
      if (code === 0) {
        this.getData();
        this.$message({
          message,
          type: 'success'
        });
      }
    }, // 删除
    async setGroup() {
      // 设置分组
      const newList = [];
      const newIds = [];
      const agGridChild = `agGridChild${Number(this.activeName) + 1}`;
      const agGridTable = this.$refs[`${agGridChild}`][0].AGTABLE;
      if (agGridTable.getSelect().length) {
        agGridTable.getSelect().forEach(item => {
          newList.push(item);
          newIds.push(item.ACTI_ID);
        });
      }
      if (newList.length < 1) {
        this.$Message.warning(window.vmI18n.t('modalTips.q4')); // 请先勾选需要分组的促销
        return;
      }
      // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
      const flag = newList.some(item => item.STATUS === 3);
      if (flag) {
        this.$Message.warning(window.vmI18n.t('modalTips.q5')); // 存在【下线过期】的促销，请重新选择
      } else {
        this.checkList = newList;
        // 设置分组请求接口
        const formData = new FormData();
        formData.append('param', JSON.stringify({ objids: newIds }));
        const {
          data: { code, message, data }
        } = await this.service.promotionCenter.selectPmGroup(formData);
        if (code === 0) {
          this.setGroupTableData = data;
          this.dialog_visible = true;
        } else {
          this.$Message.error(message);
        }
      }
    }, // 设置分组
    closeDialog() {
      this.dialog_visible = false;
    },
    simulation() {
      // 模拟仿真
      this.$store.commit('customize/TabOpen', {
        id: -1, // id
        type: 'CUSTOMIZED', // 类型action
        name: 'SIMULATION', // 文件名
        label: window.vmI18n.t('btn.simulation'), // 模拟仿真
        query: Object.assign({
          id: -1, // id
          tabTitle: window.vmI18n.t('btn.simulation') // 模拟仿真
        }) // 带的参数
      });
    },
    async times() {
      // 默认时间
      const start = '';
      const end = '';
      this.acti_date = [start, end];
      const _this = this;
      this.acti_date = [start.split('-').join(''), end.split('-').join('')];
      const {
        data: { code, data }
      } = await this.service.promotionCenter.getweekdate();
      if (code === 0) {
        _this.acti_date = [data.START_WEEK, data.END_WEEK];
      }
    },
    Reset() {
      this.acti_no = ''; // 活动编号
      this.times(); // 活动日期:
      this.acti_name = ''; // 活动名称
      this.actiTypes = ['bSelect-all']; // 活动类型:
      this.orderTypes = ['bSelect-all']; // 订单类型:
      this.my_input_sh.itemdata.valuedata = ''; // 线上店铺
      this.my_input_sh.itemdata.pid = ''; // 线上店铺
      this.product.itemdata_xitong.valuedata = ''; // 参与商品
      this.product.itemdata_xitong.pid = ''; // 参与商品
      this.product.itemdata_xitong.channelList = ''; // 参与商品
      this.acti_group = ''; // 分组
      this.release_name = ''; // 操作人
      this.STATUS = [1, 2]; // 状态
    }, // 重置
    async handDblClick(row) {
      // 双击事件
      const ACTI_ID = row.ACTI_ID;
      const typeId = row.PROM_TYPE_ID;
      const IS_BATCH = row.IS_BATCH;

      // 查询当前点击行的信息
      const formData = new FormData();
      formData.append(
        'param',
        JSON.stringify({
          objid: ACTI_ID,
          prom_type_id: typeId
        })
      );
      const {
        data: { code }
      } = await this.service.promotionCenter.selectPm(formData);
      if (code === 0) {
        // sq存储一套作为清空操作的初始数据
        // let scheme_dataInit = JSON.stringify(res.data.data.scheme_arr);
        // 存储种类id保存草稿时需要
        if (IS_BATCH) {
          this.$store.commit('customize/TabOpen', {
            id: ACTI_ID, // id
            type: 'action', // 类型action
            name: 'batchActivity', // 文件名
            label: window.vmI18n.t('panel_label.batchAddPromotion'), // 批量新增促销活动
            query: Object.assign({
              id: ACTI_ID, // id
              tabTitle: window.vmI18n.t('panel_label.batchAddPromotion') // 批量新增促销活动
            }) // 带的参数
          });
        } else {
          this.$store.commit('customize/TabOpen', {
            id: ACTI_ID, // id
            type: 'action', // 类型action
            name: 'addOrEditActi', // 文件名
            label: window.vmI18n.t('panel_label.editPromotion'), // 编辑促销活动
            query: Object.assign({
              id: ACTI_ID, // id
              // tabTitle: window.vmI18n.t('panel_label.editPromotion') // 编辑促销活动
            }) // 带的参数
          });
        }
      }
    },
    async downLine() {
      const newList = [];
      const newIds = [];
      const agGridChild = `agGridChild${Number(this.activeName) + 1}`;
      const agGridTable = this.$refs[`${agGridChild}`][0].AGTABLE;
      if (agGridTable.getSelect().length) {
        agGridTable.getSelect().forEach(item => {
          newList.push(item);
          newIds.push(item.ACTI_ID);
        });
      }
      if (newList.length < 1) {
        this.$message.warning(window.vmI18n.t('modalTips.r9')); // 请至少选择一个
        return;
      }
      // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
      const flag = newList.some(item => item.STATUS === 3);
      if (flag) {
        this.$Message.warning(window.vmI18n.t('modalTips.q0')); // //选择的促销活动已经下线/过期
        return;
      }
      this.dataError.show = false; // 关闭弹框

      const params = {
        objid: -1, // 默认参数 保持格式统一 传死-1
        isBatch: true, // 是否批量 传true
        fixcolumn: {
          ids: newIds, // 促销活动ID
          status: 3 // 3表示下线
        }
      };
      const formData = new FormData();
      formData.append('param', JSON.stringify(params));
      const {
        data: { code, message }
      } = await this.service.promotionCenter.updatePmStatus(formData);
      if (code === 0) {
        this.getData();
        this.$Message.success(message);
      }
    },
    formUserKeyUp(event) {
      if (event.keyCode === 13) {
        this.getData();
      }
    }
  }
};
