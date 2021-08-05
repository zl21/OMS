<!--
 * @Author: your name
 * @Date: 2021-05-27 11:04:51
 * @LastEditTime: 2021-08-05 18:15:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-project-logic/views/pages/orderCenter/orderManager/dynamicSearch.vue
-->
<template>
  <!-- 动态搜索组件,零售发货单专用 -->
  <div class="dynamicSearch">
    <div class="obj-label">
      {{groupConditLabel}}:
    </div>
    <div class="search">
      <div
        v-for="(ele , IDX) in dynamicStructure"
        :key="IDX"
        class="obj"
      >
        <div class="combinatorials">
          <Select
            filterable
            v-model="dynamicStructure[IDX].NAME"
            transfer
            @on-change="(val)=>conditionChange(IDX, val)"
          >
            <!-- label-in-value -->
            <Option
              v-for="(item,index) in dynamicData.COMBINE_CONDITION.COMBOBOX"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div class="relation">
          <Select
            v-model="dynamicStructure[IDX].CALC"
            transfer
            :disabled="dynamicStructure[IDX].CALC == null"
          >
            <!-- <template v-if="dynamicStructure[IDX].CALC"> -->
              <Option
                v-for="(item,index) in dynamicData.COMBINE_CONDITION.COMBOBOX[dynamicStructure[IDX].index || 0].calc"
                :key="index"
                :value="item.value"
              >
                {{ item.label }}
              </Option>
            <!-- </template> -->
          </Select>
        </div>
        <div class="value">
          <RadioGroup 
            v-if="dynamicStructure[IDX].DISPLAY == 'RADIOGROUP'"
            v-model="dynamicStructure[IDX].VAL"
            @on-change="radioChange"
          >
            <Radio 
              v-for="(option , index) in dynamicData.COMBINE_CONDITION.COMBOBOX[dynamicStructure[IDX].index].COMBOBOX"
              :key="index"
              :label="option.value"
              :disabled="option.disabled"
            >
              {{option.label || option.title}}
            </Radio>
          </RadioGroup>
          <DatePicker 
            v-else-if="dynamicStructure[IDX].DISPLAY == 'OBJ_DATE'"
            type="datetime"
            split-panels
            transfer
            clearable
            format="yyyy-MM-dd HH:mm:ss"
            v-model="dynamicStructure[IDX].VAL"
            @on-change="dateChange">
          </DatePicker>
          <!-- :format="item.format"
            :options="item.options"
            @on-change="runMethods(item.onChange)"> -->
          <Select
            v-else-if="dynamicStructure[IDX].DISPLAY == 'SELECT'"
            v-model="dynamicStructure[IDX].VAL"
            transfer
          >
            <Option
              v-for="(item, index) in dynamicStructure[IDX].COMBOBOX"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
          <Input v-else-if="dynamicStructure[IDX].DISPLAY == 'TEXT'" v-model="dynamicStructure[IDX].VAL" />
          <div class="bothInput" v-else-if="dynamicStructure[IDX].DISPLAY == 'RANGE'">
              <div class="bothLeft">
                <Input @on-change="bInputChange"
                       v-model.trim="dynamicStructure[IDX].VAL[0]"
                       :regx="dynamicStructure[IDX].REGX"></Input>
              </div>
              <label class="bothLine">一</label>
              <div class="bothRight">
                <Input @on-change="bInputChange"
                       v-model.trim="dynamicStructure[IDX].VAL[1]"
                       :regx="dynamicStructure[IDX].REGX"></Input>
              </div>
            </div>
          <!-- <label v-else>特殊类型,待兼容</label> -->
        </div>
        <div
          v-show="dynamicStructure.length !== IDX+1"
          class="group"
        >
          <Select
            v-model="dynamicStructure[IDX + 1 >= dynamicStructure.length ? 0 : IDX + 1].RLT"
            transfer
            @on-change="rltChange"
          >
            <Option
              v-for="(item,index) in dynamicData.LOGIC_SYMBOL.COMBOBOX"
              :key="index"
              :value="item.value"
            >
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <div
          v-show="dynamicStructure.length == IDX+1"
          class="addOrSub"
        >
          <Icon
            type="md-add"
            @click="mdAdd"
          />
          <Icon
            v-show="dynamicStructure.length !== 2"
            type="md-remove"
            @click="mdRemove"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import dateUtil from '@/assets/js/__utils__/date.js';

  export default {
    name: 'DynamicSearch',
    props: {
      'dynamic-data': {
        type: Object
      },
    },
    created() {
      this.dynamicStructure[0].RLT = this.default_rlt;
      this.dynamicStructure[1].RLT = this.default_rlt;
      // this.dynamicStructure[0].CALC = this.default_cacl;
      // this.dynamicStructure[1].CALC = this.default_cacl;
    },
    computed: {
      groupConditLabel() {
        return this.dynamicData.COMBINE_CONDITION.DESC;
      },
      type() { // 组合条件对应的组件类型
        return this.dynamicData.CALC_SYMBOL.COMBOBOX[0].value;
      },
      default_cacl() { // 默认包含/不包含参数
        // return this.dynamicData.CALC_SYMBOL.COMBOBOX[0].value;
      },
      default_rlt() { // 默认参数且/或
        return this.dynamicData.LOGIC_SYMBOL.COMBOBOX[0].value;
      }
    },
    data() {
      return {
        combinValue: '', // 组合商品值
        dynamicStructure: [ // 动态结构数据
          { // 模板
            DISPLAY: 'TEXT', // 组合条件类型
            NAME: '', // 组合条件选的值
            VAL: '', // 条件值
            RLT: '', // 关系运算符:且/或
            CALC: '', // 计算运算符:包含/不包含
            TYPE: '', // 值类型
          },
          { // 模板
            DISPLAY: 'TEXT', // 组合条件类型
            NAME: '', // 组合条件选的值
            VAL: '', // 条件值
            RLT: '', // 关系运算符:且/或
            CALC: '', // 金酸运算符:包含/不包含
            TYPE: '', // 值类型
          }
        ]

      };
    },
    methods: {
      rltChange(val) {
        const aaa = this.dynamicStructure;
      },
      bInputChange() {

      },
      radioChange(val) {
        console.log(val);
      },
      dateChange() {
        // const dy = JSON.parse(JSON.stringify(this.dynamicStructure));
        /* dy.forEach(it => {
          if (it.VAL instanceof Array && it.VAL.length == 2) {
            it.VAL = typeof it.VAL[0] == 'object' ? `${dateUtil.getFormatDate(new Date(it.VAL[0]), 'yyyy-MM-dd HH:mm:ss')}~${dateUtil.getFormatDate(new Date(it.VAL[1]), 'yyyy-MM-dd HH:mm:ss')}` : `${it.VAL[0]}~${it.VAL[1]}`
          }
        }) */
      },
      conditionChange(index,val) {
        console.log(index, val);
        const aaa = this.dynamicStructure;
        const all = this.dynamicData.COMBINE_CONDITION.COMBOBOX;
        const allCalc = this.dynamicData.CALC_SYMBOL.COMBOBOX;
        all.forEach((it, j) => {
          if (it.value == val) {
            // const curIt = this.dynamicStructure.find(i => i.NAME == val);
            const curItList = [];
            this.dynamicStructure.forEach((m, n) => { // 应该还是要优化，万一不是最后的而是中间的
              if (m.NAME == val) {
                curItList.push(n);
              }
            })
            // const curIt = this.dynamicStructure[curItList[curItList.length - 1]];
            const curIt = this.dynamicStructure[index];
            curIt.DISPLAY = it.DISPLAY;
            curIt.index = j;
            if (it.CALC_SYMBOL && it.CALC_SYMBOL.length) { // 处理每个条件对应的关系运算符
              it.calc = [];
              for (let x = 0; x < it.CALC_SYMBOL.length; x++) {
                allCalc.forEach(y => {
                  if (it.CALC_SYMBOL[x] == y.value) {
                    it.calc.push(y);
                  }
                })
              }
              curIt.CALC = it.calc[0] ? it.calc[0].value ? it.calc[0].value : '' : ''; // 默认取第一个关系运算符
            } else {
              // 可能存在不需要【关系运算符】的情况，那就不展示该控件
              curIt.CALC = null;
            }
            if (curIt.DISPLAY == 'RANGE') { // 处理range类型的组件
              curIt.VAL = ['', ''];
            }
            if (curIt.DISPLAY == 'SELECT') { // 处理select类型的组件的options
              curIt.COMBOBOX = it.COMBOBOX;
            }
          }
        });
      },
      reset() {
        this.dynamicStructure = [ // 动态结构数据
          { // 模板
            DISPLAY: 'TEXT', // 组合条件类型
            NAME: '', // 组合条件选的值
            VAL: '', // 条件值
            RLT: this.default_rlt, // 关系运算符:且/或
            // CALC: this.default_cacl, // 计算运算符:包含/不包含
            CALC: '',
            TYPE: '', // 值类型
          },
          { // 模板
            DISPLAY: 'TEXT', // 组合条件类型
            NAME: '', // 组合条件选的值
            VAL: '', // 条件值
            RLT: this.default_rlt, // 关系运算符:且/或
            // CALC: this.default_cacl, // 金酸运算符:包含/不包含
            CALC: '',
            TYPE: '', // 值类型
          }
        ];
      },
      mdAdd() {
        const self = this;
        const obj = JSON.stringify({ // 模板
          DISPLAY: 'TEXT', // 组合条件类型
          NAME: '', // 组合条件选的值
          VAL: '', // 条件值
          RLT: this.default_rlt, // 关系运算符:且/或
          // CALC: this.default_cacl, // 金酸运算符:包含/不包含
          CALC: '',
          TYPE: '', // 值类型
        });
        self.dynamicStructure.push(JSON.parse(obj));
        self.dynamicStructure.push(JSON.parse(obj));
      },
      mdRemove() {
        this.dynamicStructure.splice(-2, 2);
      },
    }
  };
</script>

<style lang="less">
@import '~omsTheme/public.less';
.dynamicSearch{
    width: 100%;
    display: flex;
    margin-top: @base-mr;
    .bothInput {
      display: flex;
      justify-content: space-between;
      width: 100%;
      .bothLine {
        align-self: center;
      }
    }
    .obj-label {
      width: 95px;
      height: @base-height + 10px;
      line-height: @base-height + 10px;
      text-align: right;
      padding-right: 10px;
    }
    .search {
      display: flex;
      flex-wrap: wrap;
      flex: 1;
      padding-right: 20px;
     .obj {
        display: flex;
        width: 50%;
        justify-content: flex-start;
        align-items: center;
        margin: 5px 0;
        .ark-select-selection,.ark-input{
          height: @base-height;
          line-height: @base-height;
          border-radius: @base-radius;
          border: 1px solid @input-border;
        }
        .ark-select-placeholder,.ark-select-selected-value{
           height: @base-height - 2px;
          line-height: @base-height - 2px;
        }
        .ark-select-arrow{
          top: 16px;
        }
        >div {
          margin-right: 8px;
        }
        .combinatorials {
          flex: 0.35;
        }
        .relation {
          flex: 0.1;
        }
        .value {
          flex: 0.4;
        }
        .group {
          flex: 0.15;
          .ark-select-default .ark-select-selection {
            border: 1px solid #d6d9ec;
            background-color: #f0f1f7;
            border-radius: 15px;
            text-align: center;
            height: 26px;
            line-height: 26px;
            .ark-select-selected-value {
              height: 26px;
              line-height: 26px;
            }
            .ark-select-arrow {
              color: #5864b3;
              top: 12px;
            }
          }
        }
        .addOrSub {
          display: flex;
          justify-content: flex-end;
          flex: 0.15;
          color: red;
        }
    }
    }
}
</style>
