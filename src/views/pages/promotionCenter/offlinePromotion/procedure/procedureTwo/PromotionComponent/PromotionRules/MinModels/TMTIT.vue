<template>
  <!--TMTIT
    descript:组件之一
    1.换购商品多少件
    2.送券多少张
    author:wdq
    date:20180820
  -->
  <div class="propdis6" :class="{ padLeft: mustFill }">
    <!-- <span class="imputStr" v-if="must">*</span> -->
    <my-input
      v-if="showFilterPdts()"
      :isActive="true"
      :isdisabled="false"
      :itemdata="Mitemdata1.itemdata"
      @getFkChooseItem="handleChangeds"
    >
    </my-input>
    <Mtable
      v-if="showFilterVous()"
      id="my-input"
      :itemdata="Mtable.inputItemdata"
      :inputItem="inputItem"
      :disabled="Mtable.isdisabled"
      :isActive="Mtable.isActive"
      @getFkChooseItem="handleChangedVou"
    >
    </Mtable>
    <span class="imputStr" style="padding-left: 10px" v-if="mustFill">*</span>
    <span>{{ getDesc }}</span>
    <input
      class="inputed"
      type="text"
      v-model="rule.prizeNum"
      oninput="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
      onfocus="this.select()"
      maxlength="5"
    />
    <span>{{ getUnit }}</span>
  </div>
</template>


<script>
import myInput from "framework/components/element/input";
import Mtable from "framework/components/input/objinput.vue";
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: ["rule", "value", "scheme_data", "tobjid", "must"],
  watch: {
    tobjid: {
      handler(val, oldval) {
        if (val) {
          this.Mitemdata1.itemdata.valuedata = "";
          this.Mitemdata1.itemdata.pid = "";
        }
      },
    }
  },
  mounted() {
    if (this.rule.prizeItem.name) {
      this.Mtable.inputItemdata.valuedata = this.rule.prizeItem.name;
    }
    if (this.scheme_data.choose_commodity.value7 == 1) {
      this.Mitemdata1.itemdata.reftable = "PS_C_PRO_VOU";
    } else {
      this.Mitemdata1.itemdata.reftable ='PS_C_SKU' //"PS_C_SKU";商品条码过滤材料，需要换张表
    }
  },
  data() {
    return {
      inputItem: {
        params: {},
        changes: {},
      },
      desc1: "",
      Mitemdata1: {
        //参与门店
        itemdata: {
          col: 1,
          colid: 138222,
          colname: `PS_C_PRO_ID${Math.floor(Math.random() * 100)}`,
          datelimit: "all",
          display: "text",
          fkdesc: "门店档案",
          fkdisplay: "mop",
          inputname: "PS_C_PRO_ID:ECODE",
          isfk: true,
          isnotnull: true,
          isuppercase: true,
          length: 65535,
          name: this.GetType(),
          readonly: false,
          reftable: "PS_C_PRO_VOU",
          reftableid: 23446,
          row: 1,
          statsize: -1,
          type: "STRING",
          valuedata: this.value ? JSON.stringify(this.value) : "",
        },
      },
      Mtable: {
        isActive: true,
        isdisabled: false,
        inputItemdata: {
          col: 1,
          colid: "1641070000",
          colname: "VP_C_VOUSGROUP_ID",
          datelimit: "all",
          display: "text",
          fkdesc: "购物券",
          fkdisplay: "drp",
          inputname: "VP_C_VOUSGROUP_ID:ECODE",
          isfk: true,
          isnotnull: false,
          isuppercase: false,
          length: 20,
          name: "赠送券",
          readonly: false,
          reftable: "VP_C_VOUSGROUP",
          reftableid: "245290000",
          row: 1,
          statsize: -1,
          type: "STRING",
          pid:this.value?this.value.pid||'':'',
          valuedata: this.value?this.value.name||'':''
        },
      },
      desc2: "",
    };
  },
  computed: {
    getUnit() {
      console.log("scheme_data", this);
      const { scheme_data = {} } = this;
      // if(scheme_data.detail_code.indexOf("coupon")<0){
      // if(scheme_data.detail_code.indexOf("GA1403"||"GA1404"||"GA1303"||"GA1304")<0){
      if (
        scheme_data.detail_code === "GA1407" ||
        scheme_data.detail_code === "GA1408" ||
        scheme_data.detail_code === "GA1409"
      ) {
        return "";
      } else if (
        scheme_data.detail_code.indexOf("GA1403") < 0 &&
        scheme_data.detail_code.indexOf("GA1404") < 0 &&
        scheme_data.detail_code.indexOf("PA1303") < 0 &&
        scheme_data.detail_code.indexOf("PA1304") < 0
      ) {
        return "件";
      } else {
        return "张";
      }
    },
    getDesc() {
      const { scheme_data = {} } = this;
      // if(scheme_data.detail_code.indexOf("coupon")<0){
      if (
        scheme_data.detail_code === "GA1409" ||
        scheme_data.detail_code === "GA1407" ||
        scheme_data.detail_code === "GA1408"
      ) {
        return "赠送积分:";
      } else if (
        scheme_data.detail_code.indexOf("GA1403") < 0 &&
        scheme_data.detail_code.indexOf("GA1404") < 0 &&
        scheme_data.detail_code.indexOf("PA1303") < 0 &&
        scheme_data.detail_code.indexOf("PA1304") < 0
      ) {
        return "";
      } else {
        return "券";
      }
    },
    mustFill() {
      const { scheme_data = {} } = this;
      let rs = false;
      if (
        scheme_data.detail_code === "GA1409" ||
        scheme_data.detail_code === "GA1407" ||
        scheme_data.detail_code === "GA1408"
      ) {
        rs = true;
      } else {
        rs = false;
      }
      return rs;
    },
  },
  methods: {
    handleChangedVou(value) {
      if (value) {
        let valuePid = value;
        //this.$emit("change", value.pid);
        //促销设置条数太多时nameList数据返回太多，没有用到nameList，直接赋值空数组
        this.$emit("change", { id: value.ID.val, name: value.ENAME.val });
      } else {
        this.$emit("change");
      }
    },
    handleChangeds(value) {
      if (value.pid) {
        let valuePid = JSON.parse(value.pid);
        this.$emit("change", valuePid);
      } else {
        this.$emit("change");
      }
    },
    GetType() {
      const { scheme_data = {} } = this;
      const { rules = [] } = scheme_data;
      let type = scheme_data.promotionType_code;
      let code = scheme_data.detail_code;
      let rs = "";
      switch (type) {
        case "PA13":
          rs = "赠送商品";
          break;
        case "GA15":
        case "PA14":
          rs = "换购商品";
          break;
        case "GA14":
          if (code === "GA1407" || code === "GA1408" || code === "GA1409") {
            rs = "赠送积分";
          } else {
            rs = "赠送商品";
          }
          break;
        default:
          rs = "";
      }
      return rs;
    },
    showFilterPdts() {
      const { scheme_data = {} } = this;
      //  return scheme_data.detail_code.indexOf("coupon")<0;
      return (
        scheme_data.detail_code.indexOf("GA1403") < 0 &&
        scheme_data.detail_code.indexOf("GA1404") < 0 &&
        scheme_data.detail_code.indexOf("PA1303") < 0 &&
        scheme_data.detail_code.indexOf("PA1304") < 0 &&
        scheme_data.detail_code !== "GA1409" &&
        scheme_data.detail_code !== "GA1407" &&
        scheme_data.detail_code !== "GA1408"
      );
    },
    showFilterVous() {
      const { scheme_data = {} } = this;
      return (
        (scheme_data.promotionType_code == "GA14" ||
          scheme_data.promotionType_code == "PA13") &&
        (scheme_data.detail_code === "GA1403" ||
          scheme_data.detail_code === "GA1404" ||
          scheme_data.detail_code === "PA1303" ||
          scheme_data.detail_code === "PA1304") &&
        scheme_data.detail_code !== "GA1409"
      );
    },
  },
  components: {
    myInput,
    Mtable,
  },
};
</script>
<style>
.propdis6 {
  /* float: left; */
  /* flex: 1; */
  display: flex;
  align-items: center;
  font-size: 12px;
  /* width: 30%; */
  position: relative;
}
.padLeft {
  padding-left: 30px;
}
.propdis6 .imputStr {
  color: red;
  position: absolute;
  left: 3px;
}
.obj-input {
  width: 238px !important;
  margin: 0;
}
.propdis6 .inputed {
  background: #fcf7f1;
  font-size: 12px;
  width: 60px;
  height: 24px;
  border-radius: 2px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #d8d8d8;
  padding-left: 3px;
  margin: 0 3px;
  text-align: center;
}

.item-input {
  line-height: 24px;
}
.propdis6 .input-wrap p.mop {
  right: 12px !important;
}
.item-input.isnotnull label i {
  font-size: 12px;
  line-height: 10px;
  font-style: normal;
}
.propdis6 .item-input .VP_C_VOUSGROUP_ID {
  padding: 0;
  border: 0;
}
.propdis6 .item-input .VP_C_VOUSGROUP_ID .el-input input {
  height: 24px;
}
</style>
