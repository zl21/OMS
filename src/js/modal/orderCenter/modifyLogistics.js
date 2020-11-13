import axios from 'axios';
import businessForm from 'professionalComponents/businessForm';
import jordanBtn from 'professionalComponents/businessButton';
import businessActionTable from 'professionalComponents/businessActionTable.vue';
import { listeningToKeydownMixin } from '@/assets/js/mixins/listeningToKeydown.js';

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
    jordanBtn,
    businessActionTable,
  },
  computed: {},
  data() {
    return {
      vmI18n: window.vmI18n,
      zIndex: 2500,
      totalRowCount: 0,
      pageSize: 10,
      logisticsFlag: false,
      expressCodeFlag: true,
      expressCode: '',
      type: 'LOGISTICCOMPANY',
      pageNum: 1,
      // dataEmptyMessage: "数据加载中...", // 无数据的提示
      dataEmptyMessage: vmI18n.t('modalTips.ye'), // 无数据的提示
      columns: ['ename'], // 展现的组
      AutoData: [],
      foreignKeyLink: {},
      //
      pid: '',
      btnConfig: {
        typeAll: 'error', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            // text: "确定", //按钮文本
            text: vmI18n.t('common.determine'), // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine();
            }, // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            // text: "取消", //按钮文本
            text: vmI18n.t('common.cancel'), // 按钮文本
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
        ],
      },
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
        this.determine();
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
    determine() {
      const self = this;
      if (self.type === 'EXPRESSCODE') {
        if (!self.expressCode) {
          self.$Message.warning({
            // content: "请选择物流单号",
            content: vmI18n.t('modalTips.yd'),
            duration: 5,
            top: 80,
          });
          return false;
        }
      } else if (!self.pid) {
        self.$Message.warning({
          // content: "请选择物流公司",
          content: vmI18n.t('modalTips.ye'),
          duration: 5,
          top: 80,
        });
        return false;
      }
      const fromdata = new FormData();
      fromdata.append('ids', self.componentData.ids);
      fromdata.append('cLogisticsId', self.pid);
      fromdata.append('expressCode', self.expressCode);
      fromdata.append('type', self.type);
      axios({
        // url: "/p/cs/updateLogistics",
        url: '/api/cs/oc/oms/v1/updateLogistics', // 切换接口服务
        method: 'post',
        cancelToken: true,
        data: fromdata,
      }).then((res) => {
        if (res.data.code === 0) {
          console.log(self.$route.query.id);
          if (self.$route.query.id == 2627) {
            self.$parent.$parent.$parent.getData();
            if (!res.data.data) {
              self.$Message.success(res.data.message);
              self.$parent.$parent.closeConfirm();
              self.$parent.$parent.$parent.selection = [];
            } else {
              self.$Modal.error({
                // title: "提示",
                title: vmI18n.t('modalTitle.tips'),
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
                      'no-data-text': vmI18n.t('other.noDataAvailable'),
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
        }
      });
    },
    getListData() {
      const self = this;
      // let fromdata = new FormData();
      // fromdata.append("flag", 1);
      // fromdata.append("id", self.componentData.CP_C_PHY_WAREHOUSE_ID);
      // fromdata.append("num", self.pageNum);
      // fromdata.append("size", self.pageSize);
      // fromdata.append("inputValue", "");
      const data = {
        flag: 1,
        id: self.componentData.CP_C_PHY_WAREHOUSE_ID,
        num: self.pageNum,
        size: self.pageSize,
        inputValue: '',
      };
      axios({
        url: '/api/cs/oc/oms/v1/getQueryList',
        method: 'post',
        data,
      }).then((res) => {
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
              name: vmI18n.t('table_label.expressName'),
              show: true,
            },
            {
              colname: 'ecode',
              // name: "快递编码",
              name: vmI18n.t('table_label.expressCode'),
              show: false,
            },
            {
              colname: 'shortName',
              // name: "简称",
              name: vmI18n.t('table_label.abbreviation'),
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
    changePage(value) {
      this.pageNum = 1;
    },
    onFkrpSelected(val) {
      console.log(val);
      this.pid = val[0].ID;
    },
  },
};
