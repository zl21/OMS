<template>
  <div class="jordanModal">
    <!-- 修改仓库 -->
    <div class="order_warehouse_loading" v-show="isShowFromLoading">
      <Spin></Spin>
    </div>
    <div class="jordanModal_box">
      <label for>修改仓库:</label>
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
        :hidecolumns="hidecolumns"
        @on-fkrp-selected="onFkrpSelected"
        @on-input-value-change="inputValueChange"
      ></DropDownSelectFilter>
    </div>
    <div class="jordanModal-input-box">
      <label for>改仓原因:</label>
      <!-- <Input class="jordanModal-input" v-model="updateRemark" /> -->
      <Select class="jordanModal-input" v-model="updateRemark" style="width:200px">
        <Option
          v-for="item in updateRemarkOptions"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</Option>
      </Select>
    </div>
    <jordanBtn :btnConfig="btnConfig" style="margin-top:10px;"></jordanBtn>
  </div>
</template>
<script>
import axios from "axios";
import businessForm from "professionalComponents/businessForm";
import jordanBtn from "professionalComponents/businessButton";
import businessActionTable from "professionalComponents/businessActionTable";

import { listeningToKeydownMixin } from "../../../mixins/listeningToKeydown.js";
export default {
  mixins: [listeningToKeydownMixin],
  components: {
    businessForm,
    jordanBtn,
    businessActionTable
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
      isShowFromLoading: false, // 加载
      zIndex: 2500,
      totalRowCount: 0,
      pageSize: 10,
      pageNum: 1,
      dataEmptyMessage: "数据加载中...", // 无数据的提示
      columns: ["ename"], // 展现的组
      AutoData: [],
      hidecolumns: ["id"],
      foreignKeyLink: {},
      //
      pid: "",
      updateRemark: "",
      updateRemarkOptions: [
        {
          label: '原仓缺货改仓',
          value: '原仓缺货改仓'
        }, {
          label: '系统错判改仓',
          value: '系统错判改仓'
        }, {
          label: '新增仓库改仓',
          value: '新增仓库改仓'
        }
      ],
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
              this.determine(false);
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
  beforeDestroy() {
    document.removeEventListener("keydown", this.onKeyDown);
  },
  mounted() {
    this.zIndex =
      Number(
        document.getElementsByClassName("burgeon-modal-wrap")[0].style.zIndex
      ) + 50;
    this.getListData();
    document.addEventListener("keydown", this.onKeyDown);
  },
  methods: {
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: "testModal"
        };
      }
      if (e.keyCode == 13) {
        this.determine(false);
      }
    },
    determine(isOutOfStockFlag) {
      let self = this;
      let fromdata = new FormData();
      if (!self.pid) {
        self.$Message.warning({
          content: "请选择仓库",
          duration: 5,
          top: 80
        });
        return false;
      }
      self.isShowFromLoading = true;
      fromdata.append("ids", self.componentData.ids);
      fromdata.append("warehouseId", self.pid);
      fromdata.append("isOutOfStockFlag ", isOutOfStockFlag);
      fromdata.append("updateRemark", self.updateRemark);
      axios({
        url: "/api/cs/oc/oms/v1/updateWarehouse",
        method: "post",
        cancelToken: true,
        data: fromdata
      }).then(function (res) {
        self.isShowFromLoading = false;
        if (res.data.code === 0) {
          if (self.$route.query.id == 2627) {
            self.$parent.$parent.$parent.getData();
            if (!res.data.data) {
              self.$Message.success(res.data.message);
              self.$parent.$parent.closeConfirm();
              self.$parent.$parent.$parent.selection = [];
            } else {
              // let isOutOfStockFlag = res.data.data.prompt_data.some(item => item.isOutOfStockFlag===true);
              let isOutOfStockFlag = false; // 由于830不上，所以默认为false，暂注释上面的处理逻辑，之后要加，打开注释即可。
              if (isOutOfStockFlag) {
                self.$Modal.confirm({
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
                  showCancel: true,
                  titleAlign: "left",
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
            self.$parent.$parent.$parent.load();
            self.$Message.success(res.data.message);
            self.$parent.$parent.closeConfirm();
          }

        } else {
          // self.$Message.warning({
          //   content: res.data.message,
          //   duration: 5,
          //   top: 80
          // });
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
          });
        }
      });
    },
    getListData() {
      let self = this;
      // let fromdata = new FormData();
      // fromdata.append("flag", 2);
      // fromdata.append("id", self.componentData.CP_C_SHOP_ID);
      // fromdata.append("num", self.pageNum);
      // fromdata.append("size", 10);
      // fromdata.append("inputValue", "");
      let fromdata = {
        flag: 2,
        id: self.componentData.CP_C_SHOP_ID,
        num: self.pageNum,
        size: 10,
        inputValue: ''
      }
      axios({
        url: "/api/cs/oc/oms/v1/getQueryList",
        method: "post",
        data: fromdata
      }).then(function (res) {
        res.data.data.forEach(element => {
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
              name: "发货仓库名称",
              show: true
            },
            {
              colname: "ecode",
              name: "发货仓库编码",
              show: false
            }
          ],
          row: res.data.data
        };
        self.totalRowCount = res.data.count;
        // if (res.data.code === 0) {
        //   console.log(res);
        // } else {
        //   self.$Message.warning(res.data.message);
        // }
      });
    },
    // 输入框改变产生的
    inputValueChange(value) {
      let self = this;
      // let fromdata = new FormData();
      // fromdata.append("flag", 2);
      // fromdata.append("id", self.componentData.CP_C_SHOP_ID);
      // fromdata.append("num", self.pageNum);
      // fromdata.append("size", 10);
      // fromdata.append("inputValue", value);
      let fromdata = {
        flag: 2,
        id: self.componentData.CP_C_SHOP_ID,
        num: self.pageNum,
        size: 10,
        inputValue: value
      }
      axios({
        url: "/api/cs/oc/oms/v1/getQueryList",
        method: "post",
        data: fromdata
      }).then(function (res) {
        if (res.data.code === 0) {
          // res.data.data.forEach(element => {
          //   element.ecode = {
          //     val: element.ecode
          //   };
          //   element.ename = {
          //     val: element.ename
          //   };
          //   element.ID = {
          //     val: element.id
          //   };
          // });
          self.AutoData = res.data.data.map(element => {
            return {
              value: element.ename,
              id: element.id
            };
          });
          self.totalRowCount = res.data.count;
        } else {
          self.AutoData = [];
          self.shopStore.totalRowCount = 0;
        }
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
              name: "发货仓库名称",
              show: true
            },
            {
              colname: "ecode",
              name: "发货仓库编码",
              show: false
            }
          ],
          row: res.data.data
        };
        self.pageNum = 1;
      });
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
</script>
<style scoped lang='less'>
.jordanModal {
  width: 380px;
  .jordanModal_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
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
  .order_warehouse_loading {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1000 !important;
  }
  .jordanModal-input-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
    .jordanModal-input {
      width: 250px !important;
    }
  }
  // 修改按钮白色字体问题
  /deep/ .one_button {
    > div:last-child {
      span {
        color: #333333 !important;
      }
    }
  }
}
</style>
