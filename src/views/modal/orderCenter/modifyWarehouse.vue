<template>
  <div class="stockOutWarehouse_box">
    <!-- 修改仓库 -->
    <div class="stockOutWarehouse">
      <label>修改仓库:</label>
      <DropDownSelectFilter
        style="width:80%;"
        :single="true"
        :data="foreignKeyLink"
        :zIndex="2500"
        :totalRowCount="totalRowCount"
        :pageSize="pageSize"
        :showColnameKey="'show'"
        @on-page-change="changePage"
        :dataEmptyMessage="dataEmptyMessage"
        :columns="columns"
        :AutoData="AutoData"
        @on-fkrp-selected="onFkrpSelected"
      ></DropDownSelectFilter>
    </div>
    <jordanBtn :btnConfig="btnConfig" style="margin-top:10px;"></jordanBtn>
  </div>
</template>
<script>
import axios from "axios";
import jordanForm from "../../../jordanComponent/jordanForm";
import jordanBtn from "../../../jordanComponent/jordanButton";
import jordanActionTable from "../../../jordanComponent/jordanActionTable";
import R3 from '@syman/burgeon-r3';
const { getModuleName } = R3;
export default {
  components: {
    jordanForm,
    jordanBtn,
    jordanActionTable
  },
  props: {},
  computed: {
    idArr: () => {
      return vm.$store.state[getModuleName()].buttons.selectIdArr
    },
    rowData: () => {
      console.log(this);
      return vm.$store.state[getModuleName()].buttons.selectArr
    }
  },
  data() {
    return {
      totalRowCount: 0,
      pageSize: 10,
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
              let self = this;
              if (!self.pid) {
                self.$Message.warning("请选择仓库");
                return false;
              }
              let param = {
                ids: self.idArr[0],
                warehouseId: self.pid
              };
              let fromdata = new FormData();
              fromdata.append("param", JSON.stringify(param));
              axios({
                url: "/api/cs/vip/distribution/v1/updateBeforeWarehouse",
                method: "post",
                data: fromdata
              }).then(function (res) {
                if (res.data.code === 0) {
                  self.$Message.success(res.data.message);
                  self.$emit("confirmImport");
                } else {
                  self.$Message.warning(res.data.message);
                }
                self.closeActionDialog();
              });
            } //按钮点击事件
          },
          {
            type: "", //按钮类型
            text: "取消", //按钮文本
            icon: "", //按钮图标
            size: "small", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              this.closeActionDialog();
            } //按钮点击事件
          }
        ]
      }
    };
  },
  mounted() {
    console.log(this.$store.state[getModuleName()]);
    this.getListData();
  },
  methods: {
    getListData() {
      let self = this;
      let fromdata = new FormData();
      let rowData = self.rowData;
      let checkId = self.idArr[0];
      let shopId = "";
      rowData.map(item => {
        let rowId = item.ID.val;
        if (rowId === checkId) {
          shopId = item.CP_C_SHOP_ID.refobjid;
        }
      });
      fromdata.append("shopId", shopId);
      fromdata.append("pageNum", self.pageNum);
      fromdata.append("pageSize", self.pageSize);
      axios({
        url: "/p/cs/getWarehourseByShopId",
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
      });
    },
    // 输入框改变产生的
    InputValueChange() { },
    // 分页请求数据
    changePage(value) {
      this.pageNum = value;
    },
    onFkrpSelected(val) {
      this.pid = val[0].ID;
    },
    closeActionDialog() {
      this.$emit("closeActionDialog");
    }
  }
};
</script>
<style  lang='less'>
.stockOutWarehouse_box {
  .stockOutWarehouse {
    box-sizing: border-box;
    label {
      width: 80px;
      margin-right: 10px;
      display: flex;
      justify-content: flex-end;
    }
    #dropDownSelectFilter {
      box-sizing: border-box;
      .burgeon-select {
        box-sizing: border-box;
        input {
          box-sizing: border-box;
        }
      }
    }
  }

  .stockOutWarehouse {
    .label {
      margin-right: 10px;
    }
    display: flex;
    align-items: center;
    html *,
    :after,
    :before {
      box-sizing: border-box !important;
    }
  }
}
</style>
