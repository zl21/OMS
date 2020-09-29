<template>
  <div class="jordanModal">
    <!-- 修改物流 -->
    <!-- <jordanForm style="margin-top:10px;" :formConfig="formConfig"></jordanForm> -->
    <div class="jordanModal_box">
      <label for>物流公司:</label>
      <DropDownSelectFilter
        style="width:250px;"
        :single="true"
        :data="foreignKeyLink"
        :zIndex="zIndex"
        :totalRowCount="totalRowCount"
        :pageSize="pageSize"
        :showColnameKey="'show'"
        @on-page-change="changePage"
        :dataEmptyMessage="dataEmptyMessage"
        :columns="columns"
        :AutoData="AutoData"
        :disabled="logisticsFlag"
        @on-fkrp-selected="onFkrpSelected"
      ></DropDownSelectFilter>
    </div>
    <div class="jordanModal_box" v-if="type == 'EXPRESSCODE'">
      <label for>物流单号:</label>
      <Input style="width: 250px" v-model="expressCode" :disabled="expressCodeFlag" />
    </div>

    <jordanBtn :btnConfig="btnConfig" style="margin-top:10px;"></jordanBtn>
  </div>
</template>
<script>
import axios from "axios";
import jordanForm from "professionalComponents/jordanForm";
import jordanBtn from "professionalComponents/jordanButton";
import jordanActionTable from "professionalComponents/jordanActionTable.vue";
import { listeningToKeydownMixin } from "@/assets/js/mixins/listeningToKeydown.js";
export default {
  mixins: [listeningToKeydownMixin],
  props: {
    componentData: {
      type: Object,
      default: {}
    }
  },
  components: {
    jordanForm,
    jordanBtn,
    jordanActionTable
  },
  computed: {},
  data() {
    return {
      zIndex: 2500,
      totalRowCount: 0,
      pageSize: 10,
      logisticsFlag: false,
      expressCodeFlag: true,
      expressCode: "",
      type: "LOGISTICCOMPANY",
      pageNum: 1,
      dataEmptyMessage: "数据加载中...", // 无数据的提示
      columns: ["ename"], // 展现的组
      AutoData: [],
      foreignKeyLink: {},
      //
      pid: "",
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        buttons: [
          {
            type: "", //按钮类型
            text: "确定", //按钮文本
            icon: "", //按钮图标
            size: "small", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.determine();
            } //按钮点击事件
          },
          {
            type: "", //按钮类型
            text: "取消", //按钮文本
            icon: "", //按钮图标
            size: "small", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            } //按钮点击事件
          }
        ]
      }
    };
  },
  mounted() {
    this.zIndex =
      Number(
        document.getElementsByClassName("burgeon-modal-wrap")[0].style.zIndex
      ) + 50;
    this.setupByDeliver();
  },
  methods: {
    onKeyDown(e) {
      if (e.keyCode === 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: "testModal"
        };
      }
      if (e.keyCode === 13) {
        this.determine();
      }
    },
    setupByDeliver() {
      let platform = this.componentData.platform;
      if (platform === 50) {
        this.logisticsFlag = true;
        this.expressCodeFlag = false;
        this.type = "EXPRESSCODE";
      } else {
        this.getListData();
      }
    },
    determine() {
      let self = this;
      if (self.type === "EXPRESSCODE") {
        if (!self.expressCode) {
          self.$Message.warning({
            content: "请选择物流单号",
            duration: 5,
            top: 80
          });
          return false;
        }
      } else {
        if (!self.pid) {
          self.$Message.warning({
            content: "请选择物流公司",
            duration: 5,
            top: 80
          });
          return false;
        }
      }
      let fromdata = new FormData();
      fromdata.append("ids", self.componentData.ids);
      fromdata.append("cLogisticsId", self.pid);
      fromdata.append("expressCode", self.expressCode);
      fromdata.append("type", self.type);
      axios({
        // url: "/p/cs/updateLogistics",
        url: "/api/cs/oc/oms/v1/updateLogistics",  //切换接口服务
        method: "post",
        cancelToken: true,
        data: fromdata
      }).then(function (res) {
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
                title: "提示",
                render: h =>
                  h("div", {}, [
                    h(
                      "p",
                      {
                        style: {
                          padding: "10px 15px 10px 0px"
                        }
                      },
                      res.data.message
                    ),
                    h("Table", {
                      props: {
                        "disabled-hover": true,
                        "highlight-row": false,
                        "no-data-text": "暂无数据",
                        columns: res.data.data.columns,
                        data: res.data.data.prompt_data
                      }
                    })
                  ]),
                cancelType: true,
                titleAlign: "left",
                mask: true,
                width: 500,
                draggable: true,
                onOk: () => {
                  self.$parent.$parent.closeConfirm();
                },
                keyDown: event => {
                  if (event.keyCode === 27) {
                    self.$parent.$parent.closeConfirm();
                  } else if (event.keyCode === 13) {
                    self.$parent.$parent.closeConfirm();
                  }
                }
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
            top: 80
          });
        }
      });
    },
    getListData() {
      let self = this;
      // let fromdata = new FormData();
      // fromdata.append("flag", 1);
      // fromdata.append("id", self.componentData.CP_C_PHY_WAREHOUSE_ID);
      // fromdata.append("num", self.pageNum);
      // fromdata.append("size", self.pageSize);
      // fromdata.append("inputValue", "");
      let data = {
        flag: 1,
        id: self.componentData.CP_C_PHY_WAREHOUSE_ID,
        num: self.pageNum,
        size: self.pageSize,
        inputValue: ''
      }
      axios({
        url: "/api/cs/oc/oms/v1/getQueryList",
        method: "post",
        data
      }).then(function (res) {
        res.data.data.forEach(element => {
          element.ecode = {
            val: element.ecode
          };
          element.ename = {
            val: element.ename
          };
          element.shortName = {
            val: element.shortName
          };
          element.ID = {
            val: element.id
          };
        });
        console.log(res.data);
        self.foreignKeyLink = {
          start: 0,
          tabth: [
            {
              colname: "ID",
              name: "ID",
              show: false
            },
            {
              colname: "ename",
              name: "快递名称",
              show: true,
            },
            {
              colname: "ecode",
              name: "快递编码",
              show: false
            },
            {
              colname: "shortName",
              name: "简称",
              show: false
            }
          ],
          row: res.data.data
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
    }
  }
};
</script>

<style scoped lang='less'>
.jordanModal {
  width: 380px;
  .jordanModal_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 5px;
  }
  .header {
    background-color: #eee;
    color: black;
    font-size: 13px;
  }
  .footer {
    width: 100%;
    margin-top: 20px;
  }
}
</style>
