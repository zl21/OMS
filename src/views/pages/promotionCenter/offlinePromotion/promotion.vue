<template>
  <div class="promotion" v-loading="loading">
    <ul class="step-container" ref="step-container">
      <li :class="{ active: 0 <= isActive }">
        <span class="firstarrow commonality">
          <span class="arrow-next"></span>
        </span>
        1、选择活动类型
        <span class="arrow commonality">
          <span class="arrow-pre"></span>
        </span>
      </li>
      <li :class="{ active: 1 <= isActive }">
        <span class="backarrow commonality">
          <span class="arrow-next"></span>
        </span>
        2、设置促销活动
        <span class="arrow commonality">
          <span class="arrow-pre"></span>
        </span>
      </li>
      <li :class="{'active':2<=isActive}">
          <span class="backarrow commonality">
              <span class="arrow-next"></span>
          </span>
        3、试算并发布
        <span class="arrow commonality">
              <span class="arrow-pre"></span>
        </span>
      </li>
    </ul>
    <div
      class="procedure_title"
      :class="{ widthSet: isActive === 0 }"
      v-if="!view"
    >
      <p
        v-if="Number($route.query.id ? $route.query.id : -1) < 0"
        v-html="loadTip()"
      ></p>
      <p v-if="Number($route.query.id ? $route.query.id : -1) > 0">
        {{ $route.query.prom_type_name }}:{{ $route.query.prom_type_brief }}
      </p>
      <div>
        <button @click="reverseBack()">返回</button>
        <span
          v-if="
            Number($route.query.status) !== 3 &&
              Number($route.query.status) !== 2
          "
        >
          <button
            @click="Mprocess(false)"
            v-if="
              (Number($route.query.id ? $route.query.id : -1) < 0 ||
                2 === isActive) &&
                0 !== isActive
            "
          >
            上一步
          </button>
          <button v-if="isAkActive !== false" @click="FDrafts">
            保存草稿
          </button>
          <!-- <button
            v-if="
              2 !== isActive &&
                0 !== isActive &&
                Objid > 0 &&
                !$route.query.copy
            "
            @click="publish"
          >
            跳转工作流
          </button> -->
          <button v-if="2!==isActive&&0!==isActive&&Objid>0&&!$route.query.copy" @click="Mprocess(true)">下一步</button>
          <button v-if="2===isActive" @click='publish'>发布</button>
        </span>
      </div>
    </div>
    <proced-dure-one
      v-if="0 === isActive"
      @Mchange="Mchange"
      :isActive="isActive"
    >
    </proced-dure-one>
    <keep-alive>
      <proced-dure-two
        :mutating="mutating"
        :dataOne="dataOne"
        :tobjid="tobjid"
        :M_index="M_index"
        v-if="1 === isActive"
        :active="isActive"
        @SaveDrafts="SaveDrafts"
        @showLoading="showLoading"
        @editOrView="editOrView"
      >
      </proced-dure-two>
    </keep-alive>
    <proced-dure-three v-if="2 == isActive" :active="isActive" :Objid="Objid">
    </proced-dure-three>
  </div>
</template>
<script>
import { httpFormdata } from "framework/__utils__/request";
import procedDureOne from "./procedure/procedureOne/procedureOne";
import procedDureTwo from "./procedure/procedureTwo/index";
import procedDureThree from "./procedure/procedureThree/procedureThree";
import axios from "axios";

export default {
  data() {
    return {
      isAkActive:true,
      mutating: false, //是否点击了保存草稿
      isActive: 0, //第几个页面
      dataOne: [
        {
          ITEMS: [
            {
              ENAME: "商品打折",
              ENAMESYS: "商品打折",
              C_UP_ID: 1,
              BRIEF: "针对某类商品，满X件或X元，打Y折",
              DORDER: 10,
              EORDER: 10,
              ECODE: "GA11",
              ID: 3,
              ITEMS: [],
              TYPE: 2,
              REMARK: "",
              active: true,
            },
          ],
        },
        {
          ITEMS: [
            {
              ENAME: "全场打折",
              ENAMESYS: "全场打折",
              C_UP_ID: 2,
              BRIEF: "全场满X件或X元，打Y折",
              DORDER: 10,
              EORDER: 10,
              ECODE: "PA11",
              ID: 9,
              ITEMS: [],
              TYPE: 2,
              REMARK: "",
              active: false,
            },
          ],
        },
      ],
      M_index: {},
      Objid: -1,
      tobjid: false,
      loading: false, //是否显示加载
      view: false, //是否是查看，查看不能操作界面上的操作
    };
  },
  watch: {},
  components: {
    procedDureOne,
    procedDureTwo,
    procedDureThree,
  },
  mounted() {
    if (Number(this.$route.query.id) > 0) {
      this.Objid = Number(this.$route.query.id);
      this.$set(this, "isActive", 1);
    }

    //首先查询是否有上传工作流
    // this.fnapproveAction()
  },
  activated(){
 
    if (Number(this.$route.query.id) > 0) {
      this.Objid = Number(this.$route.query.id);
      this.$set(this, "isActive", 1);
    }

    //首先查询是否有上传工作流
    // this.fnapproveAction()

  },
  methods: {
    loadTip() {
      let item = "";
      let html = "";
      try {
        item = this.dataOne[this.M_index.index].ITEMS[this.M_index.i] || {};
        html = item.ENAME + ":" + item.BRIEF;
      } catch (e) {}
      return html;
    },
    FDrafts() {
      //保存草稿
      this.mutating = true;
    },
    SaveDrafts(val) {
      this.caoGaoId = val.Objid;
      //保存草稿时，活动方案抛上来后，mutating变成false
      this.mutating = false;
      //查看是否是第二个界面,才可以修改状态
      if (this.isActive == 2) this.tobjid = false;
      this.Objid = val.Objid || -1;
      this.$store.commit("customize/setshisuanid", val.Objid);
    },
    fntoPath(){// 跳转工作流促销活动
        let id = this.caoGaoId ? this.caoGaoId : this.$route.query.id;
      let urldata = {
        type: "H",
        tableName: "PM_C_PROM_ACTI_WORKFLOW", //工作流促销活动！
        tableId: "249130681",
        id,
      };

      this.$store.commit("global/tabOpen", urldata);
    },
    fnapproveAction(){
      let id = this.caoGaoId ? this.caoGaoId : this.$route.query.id;
      let _this = this
      //上传工作流
       axios({
        method: "post",
        url: "/jflow/p/cs/task/page/approveAction",
        headers: {
         "Content-Type":"application/json",
        },
        data:{
          userId:this.$store.state.global.userInfo.id,
          businessType:249130681,
          businessCode:parseInt(id) 
        }
      }).then(res =>{
        if (res.data.resultCode == 0) {
          if (res.data.data.instanceId) {
            //不显示保存草稿得按钮
            //_this.isActive = 0
            _this.isAkActive = false
           
          }else{
            //显示保存草稿得按钮
           // _this.isActive = 1
            _this.isAkActive = true
          }
        }else{
          this.$Message.warning(res.data.resultMsg);
        }
      })

    },
    // 发布
    publish() {
      let self = this;
      let publishdata = {
        objid: -1, //保持一致
        isBatch: false, //批量与否
        fixcolumn: {
          ids: [self.Objid], //发布的数组 //促销活动ID
          status: 2 //表示发布
        }
      };
      const params = new URLSearchParams();
      params.append("param", JSON.stringify(publishdata));
      httpFormdata({
        method: "post",
        url: "/p/cs/promActiStatusUpdate",
        data: params
      }).then(function(res) {
        if (res.data.code == 0) {
          self.$message({
            message: res.data.message,
            type: "success"
          });
            //返回列表的
          // let params = {
          //   id: 31460007,
          //   type: "action",
          //   name: "promactiquerylist",
          //   label: "促销活动"
          // };
          // self.$store.commit("TabClose", params);

          self.$store.commit("customize/TabHref", {
            id: 2895, // id
            type: "action", // 类型action
            name: "PROMACTIQUERYLIST", // 文件名
            label: "促销活动", // tab中文名
          });
        }
      });
    },
    Mprocess(b) {
      // //b为true是下一步
      let self = this;
      if (b) {
        if (this.isActive === 2) return;
        this.tobjid = false;
        this.isActive++;
      } else {
        this.isActive--; //任何状态都清空
        if (0 === this.isActive) {
          this.tobjid = true;
          this.Objid = -1;
          // 保存草稿后,点击上一步清空之前的数据
          let sd = JSON.parse(
            JSON.stringify(this.$store.state.customize.scheme_data)
          );
          for (let i = 0; i < sd.rules.length; i++) {
            sd.rules[i].skuIds = "";
            sd.rules[i].conditionName = "QTTY";
            sd.rules[i].conditionType = "GE";
            sd.rules[i].conditionValue = "1";
            sd.rules[i].preConditionName = "DISCOUNT";
            sd.rules[i].preConditionType = "GE";
            sd.rules[i].preConditionValue = 0;
            sd.rules[i].prizeItem = "";
            sd.rules[i].prizeNum = 1;
            sd.rules[i].content = 1;
          }
          self.$store.commit("customize/setscheme_data", sd);
          return;
        }
      }
    },
    Mchange(val) {
      this.isActive = 1;
      this.dataOne = val.dataOne;
      this.M_index = val.M_index;
    },
    reverseBack() {
    const _self = this;
    const { fullPath } = this.$route;//获取当前路由fullPath
    const { keepAliveModuleName, tableName } = this.$store.state.global.activeTab;//获取当前缓存模块名称，自定义标识
    this.$store.commit('global/tabCloseAppoint',
    {
        routeFullPath: fullPath,//当前路由fullPath
        stopRouterPush: true, //是否阻止默认跳转到前一个tab
        keepAliveModuleName,//当前模块名称
        tableName,//当前自定义表标识
    }
    )
      //返回按钮
        this.$store.commit("customize/TabHref", {
            id: 2895, // id
            type: "action", // 类型action
            name: "PROMACTIQUERYLIST", // 文件名
            label: "促销活动", // tab中文名
          });

    },
    showLoading(val) {
      this.$set(this, "loading", val);
    },
    editOrView(val) {
      this.$set(this, "view", val);
    },
  },
};
</script>
<style lang="less">
.promotion {
  padding-top: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  .procedure_title {
    background: #fff6f6;
    margin-top: 16px;
    border: 1px solid #ffdcdc;
    display: flex;
    font-size: 0;
    height: 40px;
    justify-content: space-between;
    align-items: center;
    padding: 8px 10px;
    box-sizing: border-box;
    p {
      font-size: 12px;
      color: #575757;
    }
    button {
      padding: 0 8px;
      font-size: 12px;
      box-sizing: border-box;
      height: 24px;
      background: #fff6f6;
      line-height: 22px;
      vertical-align: middle;
      border: 1px solid #fd6442;
      color: #fd6442;
      margin-left: 8px;
      border-radius: 2px;
    }
  }
  .widthSet {
    width: calc(100% - 60px);
    margin: 16px auto 0;
  }
  .step-container {
    margin: 0;
    padding: 0 36px;
    width: 100%;
    display: flex;
    justify-content: start;
    box-sizing: border-box;
    height: 30px;
  }
  .step-container li {
    width: 100%;
    display: inline-block;
    float: left;
    position: relative;
    margin: 0;
    padding: 0;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    background: #adadad;
    text-align: center;
    color: #ffffff;
    .arrow-pre {
      border-left: 15px solid #adadad;
      border-top: 15px solid transparent;
      border-bottom: 15px solid transparent;
    }
    .arrow-next {
      border-left: 15px solid transparent;
      border-top: 15px solid #adadad;
      border-bottom: 15px solid #adadad;
    }
    .firstarrow {
      left: -7.5px;
      .arrow-next {
        margin-left: 0px;
      }
    }
    .backarrow {
      left: 7.5px;
    }
    .arrow {
      right: -7.5px;
    }
    &.active {
      background-color: #26a67a;
      .arrow-pre {
        border-left: 15px solid #26a67a;
      }
      .arrow-next {
        border-top: 15px solid #26a67a;
        border-bottom: 15px solid #26a67a;
      }
    }
    .commonality {
      position: absolute;
      height: 30px;
      background-color: #ffffff;
      z-index: 1;
      span {
        display: inline-block;
        /*border-left: 15px solid transparent;*/
        /*border-top: 15px solid transparent;*/
        /*border-bottom: 15px solid transparent;*/
      }
    }
  }
}
</style>
