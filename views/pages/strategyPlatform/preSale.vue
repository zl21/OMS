<!--
 * @Author: your name
 * @Date: 2021-07-22 15:47:49
 * @LastEditTime: 2021-08-05 14:37:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/strategyPlatform/preSale.vue
-->
<template>
  <div class="preSale">
    <div class="preSale-list" v-for="(li, index) in datalist" :key="index">
      <div class="preSale-lable">
        <span>*</span>
        预售识别规则：
      </div>
      <Select
        v-model="li.PRESELL_DISCERN_TYPE"
        style="width: 100px"
        @on-change="change(li.PRESELL_DISCERN_TYPE, li)"
      >
        <Option
          v-for="item in li.slectList"
          :value="item.value"
          :key="item.value"
          >{{ item.label }}</Option
        >
      </Select>
      <div class="preSale-center" v-show="li.show">
        <Input
          v-model="li.PRESELL_DISCERN_CENTENT"
          :placeholder="li.placeholder"
          style="width: 250px"
        />

        <div class="preSale-lable">
          <span>*</span>
          预计发货时间：
        </div>
        <RadioGroup v-model="li.value" @on-change="radiochange($event, li)">
          <Radio label="固定时间"></Radio>
          <DatePicker
            type="datetime"
            placeholder="固定时间"
            style="width: 200px"
            :value="li.PREDICT_DELIVER_GOODS_TIME"
            @on-change="fndatachange($event, li)"
          ></DatePicker>
          <div class="preSale-lable">
            <Radio label="付款后"></Radio>
            <Input v-model="li.DAY_NUM" style="width: 100px" />
            天
          </div>
        </RadioGroup>
        <div class="preSale-text" v-show="index != 0">
           或
        </div>
        <div class="preSale-add" v-show="index == indexlenth">
          <Icon type="md-add" color="#ed4014" @click="add"  size="24" />
          <Icon type="md-close" color="#19be6b" @click="fndel(index)" size="24"  v-if="index != 0"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/service/index';
// import commonUtils from '@/config/config/commonUtils.js';

export default {
  data() {
    return {
      indexlenth: 0,
      dataobj: {
        PRESELL_DISCERN_TYPE: '',
        PRESELL_DISCERN_CENTENT: '',
        DAY_NUM: '',
        placeholder: '商品标题/规格名称中可用特殊符号和文字',
        show: false,
        icon: true,
        value: '',
        PREDICT_TYPE: '',
        PREDICT_DELIVER_GOODS_TIME: '', //预计发货时间
        slectList: [
          {
            label: '自定义关键字',
            value: 1,
          },
          {
            label: '平台SKUID',
            value: 2,
          },
          {
            label: '平台商品ID',
            value: 3,
          },
          {
            label: '系统SKU编码',
            value: 4,
          },
          {
            label: '系统SPU编码',
            value: 5,
          },
        ],
      },
      datalist: [],
    };
  },
  created() {},
  beforeDestroy() {
    window.removeEventListener('customizeClick', this.Save);
  },
  mounted() {
    window.addEventListener('customizeClick', this.Save);
    //先清理页面
    this.$nextTick(() => {
      $('.preSale').parent().parent().find('.itemLabel').remove();
    });
    if (this.$route.params.itemId != 'New') {
      this.init();
    } else {
      this.datalist.push(this.dataobj);
    }
  },
  methods: {
    fndel(i){
        this.datalist.splice(i,1)
        this.indexlenth = this.datalist.length - 1;
    },
    Save(data) {
      if (data.detail.type == 'save') {
        let reqdata = [];
        this.datalist.forEach((item) => {
          let obj = {
            ID:
              this.$route.params.itemId == 'New'
                ? '-1'
                : this.$route.params.itemId,
            PRESELL_DISCERN_TYPE: item.PRESELL_DISCERN_TYPE,
            PRESELL_DISCERN_CENTENT: item.PRESELL_DISCERN_CENTENT,
            PREDICT_TYPE: item.PREDICT_TYPE,
            PREDICT_DELIVER_GOODS_TIME: item.PREDICT_DELIVER_GOODS_TIME,
            DAY_NUM: item.DAY_NUM,
          };
          reqdata.push(obj);
        });

        this.$emit('change', reqdata);
      }
    },
    keyDown() {},
    add() {
      this.datalist.push(JSON.parse(JSON.stringify(this.dataobj)));
      this.indexlenth = this.datalist.length - 1;
    },
    radiochange(v, en) {
      if (v == '付款后') {
        en.PREDICT_TYPE = 2;
      } else {
        en.PREDICT_TYPE = 1;
      }
    },
    fndatachange(data, en) {
      en.PREDICT_DELIVER_GOODS_TIME = data;
    },
    change(v, en) {
      en.show = true;
      if (v > 1) {
        en.placeholder = '请输入识别内容，多关键字使用中文“，”隔开';
      } else {
        en.placeholder = '商品标题/规格名称中可用特殊符号和文字';
      }
    },
    init() {
      let data = {
        ID: this.$route.params.itemId,
      };
      service.strategyPlatform.selItemByMainId(data).then((res) => {
        if (res.data.code == 0) {
          let data =
            res.data.data.ST_C_CUSTOM_PRESELL_STRATEGY
              .ST_C_CUSTOM_PRESELL_STRATEGY_ITEM;

          data.forEach((item) => {
            for (const k in item) {
              this.dataobj[k] = item[k];
            }
            this.dataobj.show = true;
            let newdata = new Date(item.PREDICT_DELIVER_GOODS_TIME);
            this.dataobj.PREDICT_DELIVER_GOODS_TIME = $omsUtils.dateFormat(
              newdata,
              'yyyy-MM-dd hh:mm:ss'
            );
            this.dataobj.value =
              item.PREDICT_TYPE == 2 ? '付款后' : '预计发货时间';
            this.datalist.push(JSON.parse(JSON.stringify(this.dataobj)));
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.preSale {
  .preSale-list {
    display: flex;
    align-items: center;
    padding: 15px;
    .preSale-center {
      display: flex;
      align-items: center;
      .ark-input-wrapper{
        margin-left: 10px;
      }
    }
    .preSale-lable {
      padding: 0 5px;
      span {
        color: red;
      }
    }
    .preSale-add {
      margin-left: 10px;
    }
    .ark-radio-group {
      display: flex;
      align-items: center;
    }
    .preSale-text{
      position: relative;
      top: -30px;
    }
  }
}
</style>
