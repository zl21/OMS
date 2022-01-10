<template>
  <div class="jordanModal cus-modal" v-loading="loading">
    <!-- 修改物流 -->
    <!-- <OmsForm :form-config="formConfig" /> -->
    <div class="jordanModal_box">
      <!-- <label for>物流公司:</label> -->
      <label for>{{ vmI18n.t("fL.logisticsCompany") }}:</label>
      <DropDownSelectFilter
        style="width: 285px"
        :single="true"
        :data="foreignKeyLink"
        :z-index="zIndex"
        :total-row-count="totalRowCount"
        :page-size="pageSize"
        :show-colname-key="'show'"
        :data-empty-message="dataEmptyMessage"
        :columns="columns"
        :auto-data="AutoData"
        :disabled="logisticsFlag"
        @on-page-change="changePage"
        @on-fkrp-selected="onFkrpSelected"
        @on-input-value-change="onValueChange"
      />
    </div>
    <div v-if="type == 'EXPRESSCODE'" class="jordanModal_box">
      <!-- <label for>物流单号:</label> -->
      <label for>{{ vmI18n.t("fL.logisticsOrder_No") }}:</label>
      <Input
        v-model="expressCode"
        style="width: 285px"
        :disabled="expressCodeFlag"
      />
    </div>
    <OmsButton :btn-config="btnConfig" class="modal-footer" />
  </div>
</template>
<script>

export default {
  components: {},
  props: {
    componentData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
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
      dataEmptyMessage: $it('tip.du'), // 无数据的提示
      columns: ['ename'], // 展现的组
      AutoData: [],
      foreignKeyLink: {},
      pid: '',
      loading: false,
      btnConfig: {
        typeAll: "default", // 按钮统一风格样式
        btnsite: "right", // 按钮位置 (right , center , left)
        buttons: [
          {
            text: $it("com.cancel"), // 取消
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, // 按钮点击事件
          },
          {
            text: $it("com.determine"), // 确定
            type: 'primary',
            disabled: false, // 按钮禁用控制
            btnclick: () => {
              this.debounce(this.determine, 500);
            }, // 按钮点击事件
          },
        ],
      }, // 确定取消按钮
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
      if (platform === 19) {
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
      setTimeout(() => {
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
            content: $it('tip.yd'),
            duration: 5,
            top: 80,
          });
          return false;
        }
      } else if (!self.pid) {
        self.$Message.warning({
          // content: "请选择物流公司",
          content: $it('tip.ye'),
          duration: 5,
          top: 80,
        });
        return false;
      }
      this.loading = true;
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
                  className: 'ark-dialog',
                  // title: "提示",
                  title: $it('mT.tips'),
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
                        'no-data-text': $it('other.noDataAvailable'),
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
        }).finally(e => this.loading = false);
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
      if (this.$route.params.customizedModuleName === 'ORDERMANAGER') {
        data.ids = self.componentData.ids.toString();
      } else if (this.$route.params.customizedModuleName === 'ORDERMANAGEDETAIL') {
        data.ids = this.$route.params.customizedModuleId.toString();
      }
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
              name: $it('tL.expressName'),
              show: true,
            },
            {
              colname: 'ecode',
              // name: "快递编码",
              name: $it('tL.expressCode'),
              show: false,
            },
            {
              colname: 'shortName',
              // name: "简称",
              name: $it('tL.abbreviation'),
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
    onValueChange(val) {
      let params = {
        ak: val,
        colid: 167630,
        fixedcolumns: {}
      };
      fkFuzzyquerybyak(params).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          let resData = res.data.data;
          this.AutoData = resData;
        }
      })
    }
  },
};
</script>

<style scoped lang='less'>
@import "~@/css/modal/orderCenter/modifyLogistics.less";
.jordanModal {
  min-height: 100px;
}
</style>
