<!--增加赠品-->
<template>
  <div>
    <EasyMatrix :componentData="matrixData"></EasyMatrix>
    <businessActionTable
      :jordanTableConfig="tableConfig"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-select-all-cancel="onSelectAllCancel"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
    ></businessActionTable>
    <input v-focus id="focus" class="focusStyle" />
    <div class="order-footer">
      <businessButton :btnConfig="btnConfig"></businessButton>
    </div>
  </div>
</template>

<script>
import businessButton from "professionalComponents/businessButton";
import businessActionTable from "professionalComponents/businessActionTable.vue";
import EasyMatrix from "professionalComponents/easyMatrix";
import axios from "axios";
import { listeningToKeydownMixin } from "@/assets/js/mixins/listeningToKeydown.js";
export default {
  mixins: [listeningToKeydownMixin],
  data() {
    return {
      vmI18n: window.vmI18n,
      tableItemUrl: "/api/cs/oc/oms/v1/getOrderDetailList",
      tableConfig: {
        indexColumn: true,
        isShowSelection: false,
        columns: [
          {
            key: "ECODE",
            // title: "条码"
            title: vmI18n.t("form_label.barCode"),
          },
          {
            key: "sizeName",
            // title: "尺码",
            title: vmI18n.t("other.size"),
          },
          {
            key: "colorName",
            // title: "颜色",
            title: vmI18n.t("other.color"),
          },
          {
            key: "QTY",
            // title: "数量",
            title: vmI18n.t("table_label.quantities"),
          },
          {
            key: "PS_C_PRO_ENAME",
            // title: "商品名称",
            title: vmI18n.t("table_label.productName"),
          },
          {
            key: "IS_GIFT",
            // title: "是否赠品",
            title: vmI18n.t("table_label.whetherGift"),
            render: (h, params) => {
              let IS_GIFT = params.row.IS_GIFT == 1 ? "是" : "否";
              return h("span", {}, IS_GIFT);
            },
          },
          {
            key: "IS_DELETE",
            // title: "操作",
            title: vmI18n.t("table_label.operation"),
            render: (h, params) =>
              h(
                "a",
                {
                  on: {
                    click: () => {
                      let index = params.index;
                      this.tableConfig.data.splice(index, 1);
                    },
                  },
                },
                // "删除"
                vmI18n.t("btn.delete")
              ),
          },
        ],
        data: [],
        pageShow: false, //控制分页是否显示
        btnsShow: true, //控制操作按钮是否显示
        searchInputShow: false, // 控制搜索框是否显示
        width: "", // 表格宽度
        height: "", // 表格高度
        border: true, //是否显示纵向边框
        total: 0, //设置总条数
        pageSizeOpts: [10, 20, 30], // 每页条数切换的配置
        pageSize: 10, // 每页条数
      },
      matrixData: {
        //条码  数量  回调函数
        fun: (obj) => {
          let self = this;
          self.add(obj);
        },
      },
      objid: "",
      options: {}, //自定义属性（选填）
      btnConfig: {
        typeAll: "error", //按钮统一风格样式
        btnsite: "right", //按钮位置 (right , center , left)
        buttons: [
          {
            // text: "确定", //按钮文本
            text: vmI18n.t("common.determine"), //按钮文本
            btnclick: () => {
              this.submit();
            },
          },
          {
            // text: "取消", //按钮文本
            text: vmI18n.t("common.cancel"), //按钮文本
            btnclick: () => {
              this.$parent.$parent.closeConfirm();
            }, //按钮点击事件
          },
        ],
      },
    };
  },
  components: {
    businessActionTable,
    EasyMatrix,
    businessButton,
  },
  props: {
    componentData: {},
  },
  methods: {
    // 选中某一项时触发
    onSelect(selection, row) {},
    // 取消选中某一项时触发
    onSelectCancel(selection, row) {},
    // 点击全选时触发
    onSelectAll(selection) {},
    // 点击取消全选时触发
    onSelectAllCancel(selection) {},
    // 单击某一行时触发
    onRowClick(row, index) {},
    // 单击某二行时触发
    onRowDblclick(row, index) {},
    // 分页change 事件
    //添加赠品
    add(obj) {
      //判断是否是要加一行明细  还是更新数量
      let data = this.tableConfig.data;
      let d = data.find((item) => item.ECODE === obj.ECODE);
      if (d) {
        d.QTY = parseInt(d.QTY) + parseInt(obj.QTY);
        this.tableConfig.data = [...data];
      } else {
        this.tableConfig.data.push(obj);
      }
    },
    submit() {
      let self = this;
      console.log(self.objid);
      let rows = this.tableConfig.data.map((item) => {
        return {
          PS_C_SKU_ECODE: item.ECODE,
          QTY: item.QTY,
          IS_GIFT: item.IS_GIFT,
        };
      });
      if (rows.length === 0) return self.$Message.error("无赠品可添加！");

      let param = {
        OcBorderDto: { id: self.componentData.objid },
        OcBorderItemDto: rows,
      };
      axios({
        url: "/api/cs/oc/oms/v1/addGit",
        method: "post",
        cancelToken: true,
        data: param,
      }).then(function (res) {
        if (res.data.code === 0) {
          self.$Message.success(res.data.message);
          self.$parent.$parent.$parent.getData();
          self.$parent.$parent.closeConfirm();
          self.$parent.$parent.$parent.selection = [];
        } else {
          // let mes = res.data.message || "失败";
          let mes = res.data.message || vmI18n.t("modalTips.z3");
          self.$Message.error(mes);
        }
      });
    },
    request(req) {
      let self = this;
      console.log(req.objid);
      self.objid = req.objid;
    },
    getColumns() {
      let cols = [
        {
          key: "ECODE",
          // title: "条码",
          title: vmI18n.t("form_label.barCode"),
        },
        {
          key: "QTY",
          // title: "数量",
          title: vmI18n.t("table_label.quantities"),
        },
        {
          key: "PS_C_PRO_ENAME",
          // title: "商品名称",
          title: vmI18n.t("table_label.productName"),
        },
        {
          key: "GBCODE",
          // title: "国标码",
          title: vmI18n.t("form_label.gBCode"),
        },
        {
          key: "IS_GIFT",
          // title: "是否赠品",
          title: vmI18n.t("table_label.whetherGift"),
        },
      ];
      this.columns = cols;
    },
    showTable(obj) {
      let tbody = obj;
      let tabname = obj.tabname;
      this.tableConfig = Object.assign(this.tableConfig, {
        columns: this.columns,
        indexColumn: true, //是否展示需要
        data: tbody,
        pageShow: true, //控制分页是否显示
        btnsShow: true, //控制操作按钮是否显示
        searchInputShow: true, // 控制搜索框是否显示
        width: "", // 表格宽度
        height: "", // 表格高度
        border: true, //是否显示纵向边框
        total: obj.totalRowCount, //设置总条数
        pageSizeOpts: obj.selectRange, // 每页条数切换的配置
        pageSize: obj.defaultrange, // 每页条数
      });
    },
    confirm() {
      //确认添加赠品
    },
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: "testModal",
        };
      }
      if (e.keyCode == 13) {
        // setTimeout(() => {
        //   this.submit();
        // }, 500);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.order-footer {
  margin-top: 10px;
}
.focusStyle {
  margin-top: -40px;
  z-index: -1;
  opacity: 0;
}
</style>


