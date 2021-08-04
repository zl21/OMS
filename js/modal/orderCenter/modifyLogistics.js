import businessForm from 'professionalComponents/businessForm';
import businessButton from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable.vue';
import listeningToKeydownMixin from '@/assets/js/mixins/listeningToKeydown.js';

export default {
  mixins: [listeningToKeydownMixin],
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  components: {
    businessForm,
    businessButton,
    businessActionTable,
  },
  computed: {},
  data() {
    return {
      vmI18n:$i18n,
      isClice: false, // 防抖标识
      zIndex: 2500,
      totalRowCount: 0,
      pageSize: 10,
      logisticsFlag: false,
      expressCodeFlag: true,
      expressCode: '',
      type: 'LOGISTICCOMPANY',
      pageNum: 1,
      // dataEmptyMessage: "数据加载中...", // 无数据的提示
      dataEmptyMessage: $i18n.t('modalTips.du'), // 无数据的提示
      columns: ['ename'], // 展现的组
      AutoData: [],
      foreignKeyLink: {},
      //
      pid: '',
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [{
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.debounce(this.determine, 500);
            }, // 按钮点击事件
          }
        ],
      },
      loading: false,
    };
  },
  mounted() {
    this.zIndex = Number(
      document.getElementsByClassName('ark-modal-wrap')[0].style.zIndex
    ) + 50;
    this.setupByDeliver();
  },
  methods: {
    onKeyDown(e) {
      if (e.keyCode === 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: 'testModal',
        };
      }
      if (e.keyCode === 13) {
        this.debounce(this.determine, 500);
      }
    },
    setupByDeliver() {
      const platform = this.componentData.platform;
      if (platform === 50) {
        this.logisticsFlag = true;
        this.expressCodeFlag = false;
        this.type = 'EXPRESSCODE';
      } else {
        this.getListData();
      }
    },
  
    // 防抖
    debounce(fun, time) {
      if (this.isClice) {
        return false;
      }
      this.isClice = true;
      setTimeout(()=>{
        fun();
        this.isClice = false;
      }, time);
    },
    determine() {
      const self = this;
      if (self.type === 'EXPRESSCODE') {
        if (!self.expressCode) {
          self.$Message.warning({
            // content: "请选择物流单号",
            content: $i18n.t('modalTips.fn'),
            duration: 5,
            top: 80,
          });
          return false;
        }
      } else if (!self.pid) {
        self.$Message.warning({
          // content: "请选择物流公司",
          content: $i18n.t('modalTips.ye'),
          duration: 5,
          top: 80,
        });
        return false;
      }
      $omsUtils.setLoading(true);
      const fromdata = new FormData();
      fromdata.append('ids', self.componentData.ids);
      fromdata.append('cLogisticsId', self.pid);
      fromdata.append('expressCode', self.expressCode);
      fromdata.append('type', self.type);
      this.btnConfig.buttons[1].disabled = true;
      this.service.orderCenter.updateLogistics(fromdata)
      .then((res) => {
        if (res.data.code === 0) {
          this.btnConfig.buttons[1].disabled = false;
          if (self.$route.params.customizedModuleId == 2627) {
            self.$parent.$parent.$parent.getData();
            if (!res.data.data) {
              self.$Message.success(res.data.message);
              self.$parent.$parent.closeConfirm();
              self.$parent.$parent.$parent.selection = [];
            } else {
              self.$Modal.error({
                // title: "提示",
                title: $i18n.t('modalTitle.tips'),
                render: h => h('div', {}, [
                  h(
                    'p',
                    {
                      style: {
                        padding: '10px 15px 10px 0px',
                      },
                    },
                    res.data.message
                  ),
                  h('Table', {
                    props: {
                      'disabled-hover': true,
                      'highlight-row': false,
                      // "no-data-text": "暂无数据",
                      'no-data-text': $i18n.t('other.noDataAvailable'),
                      columns: res.data.data.columns,
                      data: res.data.data.prompt_data,
                    },
                  }),
                ]),
                cancelType: true,
                titleAlign: 'left',
                mask: true,
                width: 500,
                draggable: true,
                onOk: () => {
                  self.$parent.$parent.closeConfirm();
                },
                keyDown: (event) => {
                  if (event.keyCode === 27) {
                    self.$parent.$parent.closeConfirm();
                  } else if (event.keyCode === 13) {
                    self.$parent.$parent.closeConfirm();
                  }
                },
              });
            }
          } else {
            // 订单管理详情的刷新方法load()
            self.$parent.$parent.$parent.load();
            self.$Message.success(res.data.message);
            self.$parent.$parent.closeConfirm();
          }
        } else {
          self.$Message.warning({
            content: res.data.message,
            duration: 5,
            top: 80,
          });
          this.btnConfig.buttons[1].disabled = false;
        }
        $omsUtils.setLoading();
      });
    },
    getListData() {
      const self = this;
      const data = {
        flag: 1,
        id: self.componentData.CP_C_PHY_WAREHOUSE_ID,
        num: self.pageNum,
        size: self.pageSize,
        inputValue: '',
      };
      self.service.orderCenter.getQueryList(data).then((res) => {
        res.data.data.forEach((element) => {
          element.ecode = {
            val: element.ecode,
          };
          element.ename = {
            val: element.ename,
          };
          element.shortName = {
            val: element.shortName,
          };
          element.ID = {
            val: element.id,
          };
        });
        console.log(res.data);
        self.foreignKeyLink = {
          start: 0,
          tabth: [
            {
              colname: 'ID',
              name: 'ID',
              show: false,
            },
            {
              colname: 'ename',
              // name: "快递名称",
              name: $i18n.t('table_label.expressName'),
              show: true,
            },
            {
              colname: 'ecode',
              // name: "快递编码",
              name: $i18n.t('table_label.expressCode'),
              show: false,
            },
            {
              colname: 'shortName',
              // name: "简称",
              name: $i18n.t('table_label.abbreviation'),
              show: false,
            },
          ],
          row: res.data.data,
        };
        console.log(res.data.data);
        console.log(self.foreignKeyLink);
        self.totalRowCount = res.data.count;
      });
    },
    // 分页请求数据
    // changePage(value) {
    changePage() {
      this.pageNum = 1;
    },
    onFkrpSelected(val) {
      console.log(val);
      this.pid = val[0].ID;
    },
  },
};
