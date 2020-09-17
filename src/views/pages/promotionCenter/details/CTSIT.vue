<template>
  <!--TMT
    descript:CheckBox + Desc + Select + Input + Desc ,用来表示条件（数量、金额）比较大小
    author:wdq
    date:20200312
  -->
  <div class="proodis_cisit">
    <Checkbox
      v-if="!(rule.show === false)"
      v-model="rule.check"
    />
    <p style="text-align: right">
      {{ showDescription }}
    </p>
    <el-select
      v-model="rule.type"
      placeholder="请选择"
    >
      <el-option
        v-for="item in CompareTypes"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <input
      v-model="rule.value"
      type="text"
      class="input-number"
      oninput="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
      onfocus="this.select()"
      maxlength="8"
    >
    <p class="desc2">
      {{ showDescription2 }}
    </p>
    <SingleBox
      v-if="filterPdtWayShow"
      :value="rule.filterPdtWay"
      :options="groups.diffFilterPdts"
      @changeSingle="checkFilterPdtWayChange"
    />
  </div>
</template>
<script>
  import myInput from 'framework/components/element/input';
  import SingleBox from '../components/singleBox';

  export default {
    props: {
      rule: {
        type: Object
      },
      onlyShowRules: {
        type: Boolean
      }
    },
    data() {
      return {
        CompareNames: [
          {
            value: 'QTTY',
            label: '数量'
          },
          {
            value: 'AMT_LIST',
            label: '吊牌金额'
          },
          {
            value: 'AMT_RETAIL',
            label: '零售金额'
          },
          {
            value: 'AMT_RECEIVABLE',
            label: '应收金额'
          },
        ],
        CompareTypes: [
          {
            value: 'GE',
            label: '大于等于'
          },
          {
            value: 'G',
            label: '大于'
          },
        // {
        //   value: "E",
        //   label: "等于"
        // }
        ],
      // isChangeALLUnit:false,  //是否切换所有的计件（价）单位
      };
    },
    computed: {
      showDescription() {
        const c_name = this.rule.name;
        return c_name == 'QTTY' ? '数量' : '金额';
      },
      showDescription2() {
        const c_name = this.rule.name;
        return c_name == 'QTTY' ? '件' : '元';
      },
      groups() {
        return this.$store.state.customize.forginkeys.groups;
      },
      filterPdtWayShow() {
        return this.rule.filterPdtWayShow && !this.onlyShowRules && this.rule.check;
      }
    },
    methods: {
      checkFilterPdtWayChange(val) {
        this.rule.filterPdtWay = val;
      }
    },
    components: {
      myInput,
      SingleBox
    },
    mounted() {
      this.CompareNames = [{ value: 'QTTY', label: '数量' },
                           { value: 'AMT_LIST', label: '吊牌金额' }];
    }
  };
</script>
<style  lang="less">
.proodis_cisit {
  // float: left;
  // flex: 1;
  display: flex;
  align-items: center;
  font-size: 12px;
  // width: 40%;
  margin: 0px 0px 12px  0px;
  .el-select {
    input {
      width: 80px;
      height: 24px;
      line-height: 24px;
      padding: 0 3px;
    }
  }
  input {
    width: 60px;
    height: 24px;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #d8d8d8;
    padding-left: 3px;
    margin: 0 2px;
  }
  .input-number{
    text-align: center;
  }
  .desc2{
    padding-right:10px ;
  }
}
</style>
