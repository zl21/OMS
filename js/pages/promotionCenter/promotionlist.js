import businessLabel from 'professionalComponents/businessLabel';
import businessButton from 'professionalComponents/businessButton';
// import errorMessage from 'framework/components/tablelist/error.vue';
// import Mydialog from 'framework/components/dialog/mydialog.vue';
import aTable from 'professionalComponents/agGridTable.vue';
import isFavoriteMixin from '@/assets/js/mixins/isFavorite';
import dialogVisible from '@/views/modal/promotionCenter/setGroup';
import buttonPermissionsMixin from '@/assets/js/mixins/buttonPermissions';
import groups from '@/assets/js/promotion/groups';
import businessForm from 'professionalComponents/businessForm';
import dateUtil from '@/assets/js/__utils__/date.js';
import { baseColumnDefs, logDataCol, diStatusArr } from './promotionConfig.js'

export default {
  mixins: [isFavoriteMixin, buttonPermissionsMixin],
  data() {
    return {
      vmI18n: $i18n,
      loading: false,
      modal: false, // 查看日志弹框
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
      formConfig: {
        formValue: {
          acti_no: '',
          acti_date: [`${this.setData(0, true)}`, `${this.setData(7)}`],
          acti_name: '',
          my_input_sh: '',
          product: '',
          acti_group: '',
          release_name: '',
          STATUS: [1, 2, 3],
        },
        ruleValidate: {},
        formData: [
          {
            style: 'input',
            label: '促销编号',
            colname: 'acti_no',
            width: '6',
            inputenter: () => {
              this.formUserKeyUp();
            }
          },
          {
            style: "date",
            type: "datetimerange",
            label: "活动日期",
            colname: "acti_date",
            format: "yyyy/MM/dd",
            width: "6",
            icon: "md-alarm",
            placeholder: "",
            transfer: true,
            ghost: false, // 是否关闭幽灵按钮，默认开启
            onChange: () => {
              this.handleChange();
            },
            clearable: true,
          },
          {
            style: 'input',
            label: '活动名称',
            colname: 'acti_name',
            width: '6',
            inputenter: () => {
              this.formUserKeyUp();
            }
          },
          {
            version: '1.4',
            style: 'popInput',
            width: '6',
            colname: 'my_input_sh',
            itemdata: {},
            oneObj: (val) => {
              console.log(val);
            },
          },
          {
            style: 'input',
            label: '分组',
            colname: 'acti_group',
            width: '6',
            inputenter: () => {
              this.formUserKeyUp();
            },
            inputChange: () => { },
          },
          {
            style: 'input',
            label: '操作人',
            colname: 'release_name',
            width: '6',
            inputenter: () => {
              this.formUserKeyUp();
            },
          },
          {
            style: 'select',
            label: '促销状态',
            colname: 'STATUS',
            width: '6',
            rules: true,
            multiple: true,
            selectChange: (val) => {
              console.log(this.formConfig.formValue.STATUS);
            },
            options: diStatusArr,
          },
        ],
      },
      logData: {
        columns: logDataCol,
        data: []
      },
      my_input_sh: {
        itemdata: {
          serviceId: "r3-cp",
          colid: 171929,
          colname: 'CP_C_SHOP_ID',
          fkdisplay: 'mrp',
          isfk: true,
          isnotnull: false,
          name: '店铺名称', // 店铺名称
          readonly: false,
          reftable: 'CP_C_SHOP',
          reftableid: 10348,
          valuedata: '',
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
          name: $i18n.t('form_label.offline_stores'), // 线下门店 input前面显示的lable值
          readonly: false, // 是否可编辑，对应input   readonly属性
          reftable: 'CP_C_RSTORE', // 对应的表
          // reftableid: 23296, //对应的表ID
          row: 1,
          statsize: -1,
          type: 'STRING', // 这个是后台用的
          valuedata: '' // 这个是选择的值
        }
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
          name: $i18n.t('table_label.productNo'),
          pid: '',
          tablename: 'DL_B_TRAN_PLAN_ITEM',
          type: 'STRING',
          value: '',
          valuedata: ''
        }
      ],
      tabConfig: [
        {
          label: $i18n.t('common.all'), // 全部
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
            pagenation: this.$comUtils.pageConfig,
          }
        },
        {
          label: $i18n.t('btn.published'), // 已发布
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
          label: $i18n.t('btn.draft'), // 草稿
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
          label: $i18n.t('other.offline_expired'), // 下线/过期
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
          name: $i18n.t('other.participating_goods'),
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
        typeAll: 'default', // 按钮统一风格样式
        buttons: [
          {
            text: $i18n.t('btn.find'), // 查找,
            webname: 'lookup_cuxiaohuodomg',
            btnclick: () => {
              this.getData();
            }
          },
          {
            text: $i18n.t('btn.reset'), // 重置,
            webname: 'chongzhicux_cuxiaohuodomg',
            btnclick: () => {
              this.Reset();
            }
          },
          {
            text: $i18n.t('btn.add'), // 新增,
            webname: 'xinzengcux_cuxiaohuodomg',
            btnclick: () => {
              this.promotionClick();
            }
          },
          {
            text: $i18n.t('btn.batch_add'), // 批量新增,
            webname: 'piliangxinzengcux_cuxiaohuodomg',
            btnclick: () => {
              this.promotionBlukClick();
            }
          },
          {
            text: $i18n.t('btn.publish'), // 发布,
            webname: 'fabucux_cuxiaohuodomg',
            btnclick: () => {
              this.publish();
            }
          },
          {
            text: $i18n.t('btn.offline'), // 下线,
            webname: 'xiaxiancux_cuxiaohuodomg',
            btnclick: () => {
              this.actOffline();
            }
          },
          {
            text: $i18n.t('common.copy'), // 复制,
            webname: 'copy_cuxiaohuodomg',
            btnclick: () => {
              this.copy();
            }
          },
          {
            text: $i18n.t('btn.delete'), // 删除,
            webname: 'deletecux_cuxiaohuodomg',
            btnclick: () => {
              this.deleteActi();
            }
          },
          {
            text: $i18n.t('btn.set_groups'), // 设置分组,
            webname: 'shezhifenzucux_cuxiaohuodomg',
            btnclick: () => {
              this.setGroup();
            }
          },
          {
            text: $i18n.t('btn.simulation'), // 模拟仿真,
            webname: 'fangzhencux_cuxiaohuodomg',
            btnclick: () => {
              this.simulation();
            }
          },
          {
            icon: 'iconfont iconbj_col', // 按钮图标
            webname: 'isFavorite', // 必须写，用于匹配框架的收藏功能（作为key替换掉之前的中文判断）
            name: $i18n.t('btn.collection'), // 收藏
            btnclick: () => {
              const self = this;
              self.setFavorite();
            } // 按钮点击事件
          }
        ]
      },
      newList: [], // 选中行
      newIds: [], // 选中行的ID集
    };
  },
  watch: {
    activeName() {
      this.getData();
    }
  },
  components: {
    businessForm,
    businessButton,
    businessLabel,
    aTable,
    // Mydialog,
    // errorMessage,
    dialogVisible,
  },
  activated(){
    const self = this;
    self.$OMS2.BtnConfig.target = self;
  },
  created() {
    groups.load();
    this.formConfig.formData.filter(item => item.colname == 'my_input_sh')[0].itemdata = this.my_input_sh.itemdata;
  },
  computed: {
    commodity() {
      return this.inputList[0].valuedata;
    }
  },
  async mounted() {
    // this.$nextTick(() => {   //暂时隐藏,因为后端接口未迁移
    //   this.getPermissions('btnConfig', 'promactiquerylist');
    // });
    this.loading = true;
    // 计算高度 通过设置节点 'totalHeight'
    await this.$comUtils.setTableHeight(this, 165);

    await this.times(); // 默认时间

    await this.getData();
    // 检测屏幕变化 设置高度 重新渲染agTabe
    this.$comUtils.onresizes(this, 650);
    this.$OMS2.omsUtils.getPermissions(this, 'btnConfig', { table: 'PROMACTIQUERYLIST', type: 'LIST' });
    console.log('---------------------------------------1111')
  },
  methods: {
    // 获取7天后时间
    setData(day, startTime) {
      let date = startTime ? this.formatDate(new Date().setHours(0, 0, 0, 0) + 86400 * day * 1000) : this.formatDate(new Date().setHours(23, 59, 59, 0) + 86400 * day * 1000)
      return date;
    },
    // 日期格式转换
    formatDate(time) {
      if (time instanceof Array && time[0]) {
        const start = dateUtil.getFormatDate(time[0], 'yyyy-MM-dd HH:mm:ss');
        const end = dateUtil.getFormatDate(time[1], 'yyyy-MM-dd HH:mm:ss');
        return start + '~' + end
      } else {
        const date = new Date(time);
        const resTime = dateUtil.getFormatDate(date, 'yyyy-MM-dd HH:mm:ss');
        return resTime
      }
    },
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
      const { customizedModuleName } = this.$router.currentRoute.params;
      this.loading = true;
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
      setTimeout(() => {
        this.loading = false;
      }, 10);
    },
    // 获取agTable数据
    getAgTableData(info, num, index) {
      const currentPage = this.tabConfig[this.activeName].agTableConfig.pagenation.current;
      const pageSize = this.tabConfig[this.activeName].agTableConfig.pagenation.pageSize;
      info.forEach((item, index) => {
        item.SERIAL_NO = (currentPage - 1) * pageSize + index + 1;
        item.ACTION_LOG = $i18n.t('other.view_log'); // 查看日志
      });
      const agGridChild = `agGridChild${index + 1}`;
      this.tabConfig[index].agTableConfig.rowData = info || [];
      this.tabConfig[index].agTableConfig.pagenation.total = num;
      this.$refs[`${agGridChild}`][0].agGridTable(this.tabConfig[index].agTableConfig.columnDefs, this.tabConfig[index].agTableConfig.rowData, this.getExtendObj());
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
          self.$message.warning($i18n.t('modalTips.r8')); // 查询数据为空
        } else {
          self.logData.data = data;
          self.$message.success(message);
          self.modal = true;
        }
      }
    },
    /**
     * @method 判断选中的行数
     * @return true：表示无选中行
     * */
    chargeSelectRow() {
      this.newList = [];
      this.newIds = [];
      const agGridChild = `agGridChild${Number(this.activeName) + 1}`;
      const agGridTable = this.$refs[`${agGridChild}`][0].AGTABLE;
      if (agGridTable.getSelect().length) {
        agGridTable.getSelect().forEach(item => {
          this.newList.push(item);
          this.newIds.push(item.ACTI_ID);
        });
      }
      if (this.newList.length < 1) {
        this.$Message.warning($i18n.t('modalTips.r9'));
        return true;
      }
    },
    actOffline() {
      const noSelect = this.chargeSelectRow();
      if (noSelect) return;
      // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
      const flag = this.newList.some(item => item.STATUS === 3);
      if (flag) {
        this.$Message.warning($i18n.t('modalTips.q0')); // 选择的促销活动已经下线/过期
        return;
      }
      this.$Modal.info({
        title: $i18n.t('modalTitle.tips'), // 提示
        content: '确定执行下线操作？',
        mask: true,
        showCancel: true,
        okText: $i18n.t('common.determine'), // 确定
        cancelText: $i18n.t('common.cancel'), // 取消
        onOk: () => {
          this.$emit('closeActionDialog', false);
          this.downLine();
        },
        onCancel: () => {
          this.$emit('closeActionDialog', false);
        },
      })
    },
    copy() {
      const agGridChild = `agGridChild${Number(this.activeName) + 1}`;
      const agGridTable = this.$refs[`${agGridChild}`][0].AGTABLE;
      if (agGridTable.getSelect().length) {
        const selectedData = agGridTable.getSelect();
        if (selectedData.length > 1) {
          this.$Message.warning($i18n.t('modalTips.q2')); // 只能选取一条数据
          return;
        }
        const ACTI_ID = selectedData[0].ACTI_ID;
        const IS_BATCH = selectedData[0].IS_BATCH;
        if (IS_BATCH) {
          $omsUtils.tabJump(0, -1, 1, 'PM_C_PROM_ACTI_BATCH_ADD', { i8n: 1, tip: 'panel_label.batchAddPromotion' }, { copy: ACTI_ID }, 0)
        } else {
          $omsUtils.tabJump(0, -1, 1, 'PM_C_PROM_ACTI', { i8n: 1, tip: 'panel_label.addPromotion' }, { copy: ACTI_ID }, 0)
        }
      } else {
        this.$Message.warning($i18n.t('modalTips.r9')); // 请至少选择一条
      }
    },
    promotionClick() {
      $omsUtils.tabJump(0, -1, 1, 'PM_C_PROM_ACTI', { i8n: 1, tip: 'panel_label.addPromotion' }, {}, 0)
    },
    promotionBlukClick() {
      // 【批量新增】
      $omsUtils.tabJump(0, -1, 1, 'PM_C_PROM_ACTI_BATCH_ADD', { i8n: 1, tip: 'panel_label.batchAddPromotion' }, {}, 0)
    },
    async publish() {
      let flag = false;
      const noSelect = this.chargeSelectRow();
      if (noSelect) return;
      flag = this.newList.every(item => item.STATUS === 1);
      if (!flag) {
        // this.$Message.warning($i18n.t('modalTips.q3')); // 选择的促销活动已经发布
        this.$Message.warning('存在【下线过期/已发布】的促销，请重新选择')
        return;
      }
      // 请求发布接口
      const params = {
        objid: -1, // 默认参数 保持格式统一 传死-1
        isBatch: true, // 是否批量 传true
        fixcolumn: {
          ids: this.newIds, // 促销活动ID
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
        this.$Message.success(message);
      }
    }, // 发布
    async deleteActi() {
      const noSelect = this.chargeSelectRow();
      if (noSelect) return;
      // 删除请求接口
      const formData = new FormData();
      formData.append(
        'param',
        JSON.stringify({
          objid: this.newIds // 默认参数 保持格式统一 传死-1
        })
      );
      const {
        data: { code, message }
      } = await this.service.promotionCenter.deletePm(formData);
      if (code === 0) {
        this.getData();
        this.$Message.success(message);
      }
    }, // 删除
    async setGroup() {
      // 设置分组
      const noSelect = this.chargeSelectRow();
      if (noSelect) return;
      // STATUS === 1 草稿 ，STATUS === 2 已发布，STATUS === 3 下线过期
      const flag = this.newList.some(item => item.STATUS === 3);
      if (flag) {
        this.$Message.warning($i18n.t('modalTips.q5')); // 存在【下线过期】的促销，请重新选择
      } else {
        this.checkList = this.newList;
        // 设置分组请求接口
        const formData = new FormData();
        formData.append('param', JSON.stringify({ objids: this.newIds }));
        const {
          data: { code, data }
        } = await this.service.promotionCenter.selectPmGroup(formData);
        if (code === 0) {
          this.setGroupTableData = data;
          this.dialog_visible = true;
        }
      }
    }, // 设置分组
    closeDialog() {
      this.dialog_visible = false;
    },
    simulation() {
      // 模拟仿真
      $omsUtils.tabJump(0, -1, 'CUSTOMIZED', 'PM_C_PROM_PRE_TEST', { i8n: 1, tip: 'btn.simulation' }, {}, 0)
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
          $omsUtils.tabJump(0, ACTI_ID, 1, 'PM_C_PROM_ACTI_BATCH_ADD', { i8n: 1, tip: 'panel_label.batchAddPromotion' }, {}, 0)
        } else {
          $omsUtils.tabJump(0, ACTI_ID, 1, 'PM_C_PROM_ACTI', { i8n: 1, tip: 'panel_label.editPromotion' }, {}, 0)
        }
      }
    },
    async downLine() {
      const params = {
        objid: -1, // 默认参数 保持格式统一 传死-1
        isBatch: true, // 是否批量 传true
        fixcolumn: {
          ids: this.newIds, // 促销活动ID
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
    },
  }
};
