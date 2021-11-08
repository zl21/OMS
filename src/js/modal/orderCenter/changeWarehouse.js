import { OmsForm, OmsTable, OmsButton } from 'burgeonComponents';
import listeningToKeydownMixin from '@/assets/js/mixins/listeningToKeydown.js';

export default {
  mixins: [listeningToKeydownMixin],
  components: {
    OmsForm,
    OmsButton,
    OmsTable
  },
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  computed: {},
  data() {
    return {
      vmI18n:$i18n,
      isShowFromLoading: false, // 加载
      zIndex: 2500,
      totalRowCount: 0,
      pageSize: 10,
      pageNum: 1,
      dataEmptyMessage: '数据加载中...', // 无数据的提示
      columns: ['ename'], // 展现的组
      AutoData: [],
      hidecolumns: ['id'],
      foreignKeyLink: {},
      //
      pid: '',
      updateRemark: '',
      updateRemarkOptions: [
        {
          label: $i18n.t('other.originalWarehouseOutOfStock_change'), // '原仓缺货改仓',
          value: $i18n.t('other.originalWarehouseOutOfStock_change')
        },
        {
          label: $i18n.t('other.sysWrongJudgment_change'), // '系统错判改仓',
          value: $i18n.t('other.sysWrongJudgment_change')
        },
        {
          label: $i18n.t('other.sysWrongJudgment_change'), // '新增仓库改仓',
          value: $i18n.t('other.newWarehouse_change')
        }
      ],
      btnConfig: {
        typeAll: 'default', // 按钮统一风格样式
        btnsite: 'right', // 按钮位置 (right , center , left)
        buttons: [
          {
            type: '', // 按钮类型
            text: $i18n.t('common.cancel'), // 取消
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } // 按钮点击事件
          },
          {
            type: '', // 按钮类型
            text: $i18n.t('common.determine'), // 确定
            icon: '', // 按钮图标
            size: 'small', // 按钮大小
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.determine(false);
            } // 按钮点击事件
          }
        ]
      }
    };
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.onKeyDown);
  },
  mounted() {
    this.zIndex = Number(document.getElementsByClassName('ark-modal-wrap')[0].style.zIndex) + 50;
    // this.getListData();
    document.addEventListener('keydown', this.onKeyDown);
  },
  methods: {
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: 'testModal'
        };
      }
      if (e.keyCode == 13) {
        this.determine(false);
      }
    },
    async determine(isOutOfStockFlag) {
      const self = this;
      const fromdata = new FormData();
      if (!self.pid) {
        self.$Message.warning({
          content: $i18n.t('modalTips.zi'), // 请选择仓库
          duration: 5,
          top: 80
        });
        return false;
      }
      console.log('isOutOfStockFlag', isOutOfStockFlag);
      self.isShowFromLoading = true;
      fromdata.append('ids', self.componentData.ids);
      fromdata.append('warehouseId', self.pid);
      fromdata.append('isOutOfStockFlag ', isOutOfStockFlag);
      fromdata.append('updateRemark', self.updateRemark);
      const {
        data: { data, code, message }
      } = await self.service.orderCenter.updateWarehouse(fromdata);
      self.isShowFromLoading = false;
      if (code === 0) {
        if (self.$route.params.customizedModuleId == 2627) {
          self.$parent.$parent.$parent.getData();
          if (!data) {
            self.$Message.success(message);
            self.$parent.$parent.closeConfirm();
            self.$parent.$parent.$parent.selection = [];
          } else {
            const isOutOfStockFlag = false; // 由于830不上，所以默认为false，暂注释上面的处理逻辑，之后要加，打开注释即可。
            if (isOutOfStockFlag) {
              self.$Modal.confirm({
                title: $i18n.t('modalTitle.tips'), // 提示
                render: h => h('div', {}, [
                    h(
                      'p',
                      {
                        style: {
                          padding: '10px 15px 10px 0px'
                        }
                      },
                      message
                    ),
                    h('Table', {
                      props: {
                        'disabled-hover': true,
                        'highlight-row': false,
                        'no-data-text': $i18n.t('other.noDataAvailable'), // 暂无数据
                        columns: data.columns,
                        data: data.prompt_data
                      }
                    })
                  ]),
                cancelType: true,
                showCancel: true,
                titleAlign: 'left',
                mask: true,
                width: 500,
                draggable: true,
                onOk: () => {
                  self.determine(true);
                },
                onCancel: () => {
                  self.$parent.$parent.closeConfirm();
                }
              });
            } else {
              self.$Modal.error({
                title: $i18n.t('modalTitle.tips'), // 提示
                render: h => h('div', {}, [
                    h(
                      'p',
                      {
                        style: {
                          padding: '10px 15px 10px 0px'
                        }
                      },
                      message
                    ),
                    h('Table', {
                      props: {
                        'disabled-hover': true,
                        'highlight-row': false,
                        'no-data-text': $i18n.t('other.noDataAvailable'), // 暂无数据
                        columns: data.columns,
                        data: data.prompt_data
                      }
                    })
                  ]),
                cancelType: true,
                titleAlign: 'left',
                mask: true,
                width: 500,
                draggable: true,
                onOk: () => {
                  self.$parent.$parent.closeConfirm();
                },
                keyDown: event => {
                  if (event.keyCode == 27) {
                    self.$parent.$parent.closeConfirm();
                  } else if (event.keyCode == 13) {
                    self.$parent.$parent.closeConfirm();
                  }
                }
              });
            }
          }
        } else {
          // self.$parent.$parent.$parent.load();
          self.$Message.success(message);
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.load();
        }
      } else if (code === -1 && !data) {
        self.$Message.error(message);
      } else {
        self.$Modal.error({
          title: $i18n.t('modalTitle.tips'), // 提示
          render: h => h('div', {}, [
              h(
                'p',
                {
                  style: {
                    padding: '10px 15px 10px 0px'
                  }
                },
                message
              ),
              h('Table', {
                props: {
                  'disabled-hover': true,
                  'highlight-row': false,
                  // "no-data-text": "暂无数据",
                  'no-data-text': $i18n.t('other.noDataAvailable'),
                  columns: data.columns,
                  data: data.prompt_data
                }
              })
            ]),
          cancelType: true,
          titleAlign: 'left',
          mask: true,
          width: 500,
          draggable: true
        });
      }
    },
    async getListData() {
      const self = this;
      const fromdata = {
        flag: 2,
        id: self.componentData.CP_C_SHOP_ID,
        num: self.pageNum,
        size: 10,
        inputValue: ''
      };
      const {
        data: { data, count }
      } = await self.service.orderCenter.getQueryList(fromdata);
      if (data) {
        data.forEach(element => {
          element.ecode = {
            val: element.ecode
          };
          element.ename = {
            val: element.ename
          };
          element.ID = {
            val: element.id
          };
        });
        self.foreignKeyLink = {
          start: 0,
          tabth: [
            {
              colname: 'ID',
              name: 'ID',
              show: false
            },
            {
              colname: 'ename',
              // name: "发货仓库名称",
              name: $i18n.t('table_label.deliveryWarehouse_name'),
              show: true
            },
            {
              colname: 'ecode',
              // name: "发货仓库编码",
              name: $i18n.t('table_label.deliveryWarehouse_code'),
              show: false
            }
          ],
          row: data
        };
        self.totalRowCount = count;
      }
    },
    // 输入框改变产生的
    async inputValueChange(value) {
      const self = this;
      const fromdata = {
        flag: 2,
        id: self.componentData.CP_C_SHOP_ID,
        num: self.pageNum,
        size: 10,
        inputValue: value
      };
      const {
        data: { data, code, count }
      } = await self.service.orderCenter.getQueryList(fromdata);
      if (code === 0) {
        self.AutoData = data.map(element => ({
          value: element.ename,
          id: element.id
        }));
        self.totalRowCount = count;
      } else {
        self.AutoData = [];
        self.shopStore.totalRowCount = 0;
      }
      self.foreignKeyLink = {
        start: 0,
        tabth: [
          {
            colname: 'ID',
            name: 'ID',
            show: false
          },
          {
            colname: 'ename',
            // name: "发货仓库名称",
            name: $i18n.t('table_label.deliveryWarehouse_name'),
            show: true
          },
          {
            colname: 'ecode',
            // name: "发货仓库编码",
            name: $i18n.t('table_label.deliveryWarehouse_code'),
            show: false
          }
        ],
        row: data
      };
      self.pageNum = 1;
    },
    // 分页请求数据
    changePage(value) {
      this.pageNum = value;
      this.getListData();
    },
    onFkrpSelected(val) {
      console.log(val);
      this.pid = val[0].ID;
    }
  }
};
