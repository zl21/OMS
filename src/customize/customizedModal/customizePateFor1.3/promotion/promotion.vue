<template>
  <div class="promotion">
    <ul
      ref="step-container"
      class="step-container"
    >
      <li :class="{'active':0<=isActive}">
        <span class="firstarrow commonality">
          <span class="arrow-next" />
        </span>
        1、选择活动类型
        <span class="arrow commonality">
          <span class="arrow-pre" />
        </span>
      </li>
      <li :class="{'active':1<=isActive}">
        <span class="backarrow commonality">
          <span class="arrow-next" />
        </span>
        2、设置促销活动
        <span class="arrow commonality">
          <span class="arrow-pre" />
        </span>
      </li>
      <li :class="{'active':2<=isActive}">
        <span class="backarrow commonality">
          <span class="arrow-next" />
        </span>
        3、试算并发布
        <span class="arrow commonality">
          <span class="arrow-pre" />
        </span>
      </li>
    </ul>
    <div
      v-if="0!==isActive"
      class="procedure_title"
    >
      <p v-if="Number($route.query.id?$route.query.id:-1)<0">
        {{ this.dataOne[this.M_index.index].ITEMS[this.M_index.i].ENAME }}:{{ this.dataOne[this.M_index.index].ITEMS[this.M_index.i].BRIEF }}
      </p>
      <p v-if="Number($route.query.id?$route.query.id:-1)>0">
        {{ $route.query.prom_type_name }}:{{ $route.query.prom_type_brief }}
      </p>
      <div>
        <button @click="reverseBack()">
          返回
        </button>
        <span v-if="Number($route.query.status)!==3&&Number($route.query.status)!==2">
          <button
            v-if="Number($route.query.id?$route.query.id:-1)<0||2===isActive"
            @click="Mprocess(false)"
          >上一步</button>
          <button
            v-if="2!==isActive"
            @click="FDrafts"
          >保存草稿</button>
          <button
            v-if="2!==isActive&&Objid>0"
            @click="Mprocess(true)"
          >下一步</button>
          <button
            v-if="2===isActive"
            @click="publish"
          >发布</button>
        </span>
      </div>
    </div>
    <proced-dure-one
      v-if="0===isActive"
      :is-active="isActive"
      @Mchange="Mchange"
    />
    <keep-alive>
      <proced-dure-two
        v-if="1===isActive"
        :mutating="mutating"
        :data-one="dataOne"
        :tobjid="tobjid"
        :m-index="M_index"
        :active="isActive"
        @SaveDrafts="SaveDrafts"
      />
    </keep-alive>
    <proced-dure-three
      v-if="2==isActive"
      :active="isActive"
      :objid="Objid"
    />
  </div>
</template>
<script>
  import { httpFormdata } from 'framework/__utils__/request';

  import procedDureOne from './procedure/procedureOne/procedureOne';
  import procedDureTwo from './procedure/procedureTwo/index';
  import procedDureThree from './procedure/procedureThree/procedureThree';

  export default {
    data() {
      return {
        mutating: false, // 是否点击了保存草稿
        isActive: 0, // 第几个页面
        dataOne: [
          {
            ITEMS: [
              {
                ENAME: '商品打折',
                ENAMESYS: '商品打折',
                C_UP_ID: 1,
                BRIEF: '针对某类商品，满X件或X元，打Y折',
                DORDER: 10,
                EORDER: 10,
                ECODE: 'GA11',
                ID: 3,
                ITEMS: [],
                TYPE: 2,
                REMARK: '',
                active: true
              }
            ]
          },
          {
            ITEMS: [
              {
                ENAME: '全场打折',
                ENAMESYS: '全场打折',
                C_UP_ID: 2,
                BRIEF: '全场满X件或X元，打Y折',
                DORDER: 10,
                EORDER: 10,
                ECODE: 'PA11',
                ID: 9,
                ITEMS: [],
                TYPE: 2,
                REMARK: '',
                active: false
              }
            ]
          }
        ],
        M_index: {},
        Objid: -1,
        tobjid: false,
      };
    },
    watch: {},
    components: {
      procedDureOne,
      procedDureTwo,
      procedDureThree
    },
    mounted() {
      if (Number(this.$route.query.id) > 0) {
        this.Objid = Number(this.$route.query.id);
        this.$set(this, 'isActive', 1);
      }
    },
    methods: {
      FDrafts() {
        // 保存草稿
        this.mutating = true;
      },
      SaveDrafts(val) {
        // 保存草稿时，活动方案抛上来后，mutating变成false
        this.mutating = false;
        this.tobjid = false;
        this.Objid = val.Objid;
      },
      // 发布
      publish() {
        // 发布
        const self = this;
        const publishdata = {
          objid: -1, // 保持一致
          isBatch: false, // 批量与否
          fixcolumn: {
            ids: [self.Objid], // 发布的数组 //促销活动ID
            status: 2 // 表示发布
          }
        };
        const params = new URLSearchParams();
        params.append('param', JSON.stringify(publishdata));
        httpFormdata({
          method: 'post',
          url: '/p/cs/promActiStatusUpdate',
          data: params
        }).then((res) => {
          if (res.data.code == 0) {
            self.$message({
              message: res.data.message,
              type: 'success'
            });
            // 返回列表的
            const params = {
              id: 2663,
              type: 'action',
              name: 'promactiquerylist',
              label: '促销活动'
            };
            self.$store.commit('TabClose', params);
          }
        });
      },
      Mprocess(b) {
        // //b为true是下一步
        if (b) {
          if (this.isActive === 2) return;
          this.tobjid = false;
          this.isActive++;
        } else {
          this.isActive--;
          if (this.isActive === 0) {
            this.tobjid = true;
            this.Objid = -1;
            // 保存草稿后,点击上一步清空之前的数据
            const sd = this.$store.state.customize.scheme_data;
            for (let i = 0; i < sd.rules.length; i++) {
              sd.rules[i].skuIds = '';
              sd.rules[i].conditionName = 'QTTY';
              sd.rules[i].conditionType = 'GE';
              sd.rules[i].conditionValue = '1';
              sd.rules[i].preConditionName = 'DISCOUNT';
              sd.rules[i].preConditionType = 'GE';
              sd.rules[i].preConditionValue = 0;
              sd.rules[i].prizeItem = '';
              sd.rules[i].prizeNum = 1;
              sd.rules[i].content = 1;
            }
          }
        }
      },
      Mchange(val) {
        this.isActive = 1;
        this.dataOne = val.dataOne;
        this.M_index = val.M_index;
      },
      reverseBack() { // 返回按钮
        const _self = this;
        // 返回列表的
        const params = {
          id: 2663,
          type: 'action',
          name: 'promactiquerylist',
          label: '促销活动'
        };
        _self.$store.commit('customize/TabClose', params);
      },
    }
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
