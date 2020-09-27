<template>
  <ul id="container" class="setFromDrag">
    <li
      class="ele"
      :orderno="item.orderno"
      :isfilter="item.isfilter"
      :label="item.label"
      :colname="item.colname"
      :id="item.id"
      draggable="true"
      v-for="(item,index) in dragList"
      :key="index"
    >
      <input
        type="checkbox"
        id="checkboxid"
        :checked="item.isfilter === false ? false : true"
        @click="checkbox($event,item)"
      />
      {{item.label}}
    </li>
  </ul>
</template>

<script>
import axios from "axios";
import jordanForm from "../../../components/jordanForm";
import jordanBtn from "professionalComponents/jordanButton";
import jordanActionTable from "../../../components/jordanActionTable";
import { listeningToKeydownMixin } from "../../../mixins/listeningToKeydown.js";
export default {
  mixins: [listeningToKeydownMixin],
  components: {
    jordanForm,
    jordanBtn,
    jordanActionTable
  },
  data() {
    return {
      childArr: [],
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
            btnclick: () => { } //按钮点击事件
          },
          {
            type: "", //按钮类型
            text: "取消", //按钮文本
            icon: "", //按钮图标
            size: "small", //按钮大小
            disabled: false, //按钮禁用控制
            btnclick: () => {
              // this.$refs.changeLogistics.close();
              this.$parent.$parent.closeConfirm();
            } //按钮点击事件
          }
        ]
      },
      dragList: []
    };
  },
  mounted() {
    let self = this;
    // 请求数据
    self.getData();
    var node = document.querySelector("#container");
    var draging = null;
    node.ondragstart = function (event) {
      event.dataTransfer.setData("te", event.target.innerText);
      draging = event.target;
    };
    node.ondragover = function (event) {
      event.preventDefault();
      var target = event.target;
      if (target.nodeName === "LI" && target !== draging) {
        if (self._index(draging) < self._index(target)) {
          target.parentNode.insertBefore(draging, target.nextSibling);
        } else {
          target.parentNode.insertBefore(draging, target);
        }
      }
      var parentNode = document.getElementById("container").childNodes;
      let childArr = [];
      for (let i = 0; i < parentNode.length; i++) {
        childArr[i] = {
          isfilter:
            parentNode[i].getAttribute("isfilter") == null ? false : true,
          label: parentNode[i].getAttribute("label"),
          orderno: (i + 1) * 10,
          colname: parentNode[i].getAttribute("colname"),
          id: parentNode[i].getAttribute("id")
        };
      }
      self.childArr = childArr;
    };
    // 完成拖拽后
    node.ondrop = function (event) {
      let param = {
        tableName: "OC_B_ORDER",
        useronfigList: self.childArr
      };
      axios({
        url: "/api/cs/oc/oms/v1/saveQueryListConfig",
        method: "post",
        data: param
      }).then(function (res) {
        self.$parent.$parent.$parent.getHeaderList();
      });
    }
  },
  methods: {
    onKeyDown(e) {
      if (e.keyCode == 27) {
        this.$parent.$parent.closeConfirm();
        this.$parent.$parent.$parent.publicBouncedIndex = {
          name: "testModal"
        };
      }
    },
    saveDragData() {
      let self = this;
      if (self.childArr.length !== 0) {
        // 保存
        let param = {
          tableName: "OC_B_ORDER",
          useronfigList: self.childArr
        };
        axios({
          url: "/api/cs/oc/oms/v1/saveQueryListConfig",
          method: "post",
          cancelToken: true,
          data: param
        }).then(function (res) {
          if (res.data.code === 0) {
            // self.$Message.success("保存成功");
            self.$parent.$parent.$parent.getHeaderList();
          } else {
            self.$Message.warning({
              content: res.data.message,
              duration: 5,
              top: 80
            });
          }
        });
      }
    },
    //获取拖拽数据
    getData() {
      let self = this;
      let fromdata = new FormData();
      let param = {
        table: "OC_B_ORDER",
        column_include_uicontroller: true,
        fixedcolumns: {},
        multiple: [],
        startindex: 0
      };
      fromdata.append("param", JSON.stringify(param));
      axios({
        url: "/api/cs/oc/oms/v1/queryListConfig",
        method: "post",
        data: fromdata
      }).then(function (res) {
        let formArr = [];
        let homearr = [];
        res.data.date.map((item, index) => {
          formArr[index] = {
            isfilter: item.tabth.isfilter,
            label: item.tabth.name,
            orderno: item.tabth.orderno,
            colname: item.tabth.colname,
            id: item.tabth.colid
          };
        });
        self.dragList = formArr;
      });
    },
    //
    _index(el) {
      var index = 0;
      if (!el || !el.parentNode) {
        return -1;
      }
      while (el && (el = el.previousElementSibling)) {
        index++;
      }
      return index;
    },
    // 判断当前是否显示
    checkbox(e, item) {
      let self = this;
      self.dragList.forEach(ele => {
        if (item.label === ele.label) {
          if (e.target.checked) {
            ele.isfilter = true;
          } else {
            ele.isfilter = false;
          }
        }
      });
      // 保存
      let param = {
        tableName: "OC_B_ORDER",
        useronfigList: self.dragList
      };
      console.log(param);
      axios({
        url: "/api/cs/oc/oms/v1/saveQueryListConfig",
        method: "post",
        data: param
      }).then(function (res) {
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 8px 20px;
  height: 300px;
  overflow: auto;
  margin-bottom: 10px;
}
.ele {
  width: 100%;
  border: 1px solid #f0f0f0;
  padding: 6px 0px 6px 0px;
  margin-bottom: 4px;
  margin-top: 2px;
  padding-left: 10px;
  color: black;
  cursor: move;
}
</style>
