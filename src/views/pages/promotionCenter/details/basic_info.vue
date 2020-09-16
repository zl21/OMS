<!-- 基础信息 -->
<template>
  <div class="basicInfo">
    <div class="title">
      <i class="iconfont iconjibenxinxi" />
      <span>基础活动</span>
    </div>
    <div
      v-if="$route.query.id > 0"
      class="row"
    >
      <div class="form_label">
        <i class="red">*</i>促销编号：
      </div><div class="form_content">
        <div class="form_el_input">
          <input
            v-model="basicData.activity_no"
            placeholder=""
            disabled
            @keyup="limitName"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>活动名称：
      </div><div class="form_content">
        <div class="form_el_input">
          <input
            v-model="basicData.activity_name"
            placeholder=""
            @keyup="limitName"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <myInputLd
        :is-active="true"
        :is-disabled="false"
        :itemdata="basicData.stores.itemdata"
        :is-object="basicData.stores.itemdata.isObject"
      />
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>订单类型：
      </div>
      <div class="form_content">
        <MultipleBox
          :values="basicData.order_type"
          :options="groups.orderTypes"
          @changeOptions="checkOrderTypeChange"
        />
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red" />平台标记：
      </div><div class="form_content">
        <MultipleBox
          :values="basicData.platform_mark"
          :options="groups.platformTabs"
          @changeOptions="checkPlatformTabsChange"
        />
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>时间类型：
      </div><div class="form_content">
        <SingleBox
          :value="basicData.time_type"
          :options="timeTypes"
          @changeSingle="checkTimeTypeChange"
        />
        <div class="form_item">
          <i class="red">*</i>时间范围：
          <DatePicker
            :value="basicData.time_limit"
            format="yyyy/MM/dd HH:mm:ss"
            type="datetimerange"
            placement="bottom-end"
            placeholder
            style="width: 300px"
            @on-change="handleTimeLimitChange"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>下线时间：
      </div><div class="form_content">
        <DatePicker
          :value="basicData.offline_time"
          format="yyyy/MM/dd HH:mm:ss"
          type="datetime" 
          placeholder
          style="width: 200px"
          @on-change="handleOfflineTimeChange"
        />
      </div>
    </div>

    <div class="row">
      <div class="form_label">
        <i class="red">*</i>活动类型：
      </div><div class="form_content">
        <SingleBox
          :value="basicData.activity_type"
          :options="actiTypes"
          @changeSingle="checkActiTypesChange"
        />
      </div>
    </div>
    <div
      v-if="basicData.gradient_gift"
      class="row"
    >
      <div class="form_label">
        <i class="red">*</i>梯度赠送：
      </div><div class="form_content">
        <SingleBox
          :value="basicData.gradient_gift"
          :options="groups.gradientGift"
          @changeSingle="checkGradientGiftChange"
        />
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        订单备注：
      </div><div class="form_content">
        <SingleBox
          :value="basicData.order_notes_type"
          :options="groups.orderRemarks"
          @changeSingle="checkOrderRemarksChange"
        />
        <div class="form_item">
          备注内容：
        </div>
        <div class="form_el_input form_item">
          <input
            v-model="basicData.order_note_content"
            oninput="this.value=this.value.replace(/ /g,'')"
            placeholder="（为空不做控制，关键字依次填写，用中文“；”隔开）"
          >
        </div>
      </div>
    </div>
    <div class="row">
      <myInputLd
        :is-active="true"
        :is-disabled="false"
        :itemdata="basicData.except_provinces.itemdata"
      />
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red" />单个买家参与活动次数：
      </div><div class="form_content">
        <SingleBox
          :value="basicData.buyer_limit_frequency"
          :options="groups.buyerLimitFrequency"
          @changeSingle="checkBuyerLimitFrequencyChange"
        />
        <div class="form_item">
          ,最大次数
        </div>
        <div class="form_el_input form_item limitinput">
          <input
            v-model="basicData.buyer_max_frequency"  
            oninput="this.value= this.value.match(/^[1-9]\d{0,2}/) ? this.value.match(/^[1-9]\d{0,2}/)[0] : ''"
            placeholder
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import dateUtil from '@/customize/customizedModal/customizePateFor1.3/returngood/js/date.js';
  import myInputLd from 'framework/components/element/input.vue';
  import MultipleBox from '../components/multipleBox';
  import SingleBox from '../components/singleBox';

  export default {
    name: 'BasicInfo',
    components: {
      myInputLd,
      MultipleBox,
      SingleBox
    },
    data() {
      return {
        my_input_sh: {
          itemdata: {
            col: 1,
            colid: 1700805184,
            colname: 'CP_C_SHOP_ID', // 当前字段的名称
            datelimit: 'all',
            display: 'text', // 显示什么类型，例如xml表示弹窗多选加导入功能，mrp表示下拉多选
            fkdisplay: 'drp', // 外键关联类型
            fkdesc: '店铺',
            inputname: 'CP_C_SHOP:ENAME', // 这个是做中文类型的模糊查询字段，例如ENAME
            isfk: true, // 是否有fk键
            isnotnull: true, // 是否必填
            isuppercase: false, // 是否转大写
            length: 65535, // 最大长度是多少
            name: '店铺名称', // input前面显示的lable值
            readonly: false, // 是否可编辑，对应input   readonly属性
            reftable: 'CP_C_SHOP', // 对应的表
            // reftableid: 24475, //对应的表ID
            row: 1,
            statsize: -1,
            type: 'STRING', // 这个是后台用的
            valuedata: '' // 这个是选择的值
          }
        },
        prov_data: {
          // 排除省
          itemdata: {
            col: 1,
            colid: 138222,
            colname: 'CP_C_PROVINCE_IDS',
            datelimit: 'all',
            display: 'text',
            fkdesc: '门店档案',
            fkdisplay: 'mrp',
            inputname: 'CP_C_PROVINCE_IDS:ENAME',
            isfk: true,
            isnotnull: false,
            isuppercase: false,
            length: 65535,
            name: '排除省',
            readonly: false,
            reftable: 'CP_C_PROVINCE',
            reftableid: 23862,
            row: 1,
            statsize: -1,
            type: 'STRING',
            valuedata: ''
          }
        },
        ruleValidate: {
          activity_name: [
            {
              required: true,
              message: 'The name cannot be empty',
              trigger: 'blur'
            }
          ]
        },
      };
    },
    computed: {
      groups() {
        return this.$store.state.forginkeys.groups;
      },
      timeTypes() {
        const preOrder = this.groups.orderTypes.find(item => item.title === '预售');
        const flag = !!(preOrder && this.basicData.order_type.includes(preOrder.value));
        let options = this.groups.timeTypes;
        if (!flag) {
          options = this.groups.timeTypes.filter(item => item.title != '定金时间');
        }
        return options;
      },
      actiTypes() {
        let options = this.groups.actiTypes;
        if (!this.basicData.gradient_gift) {
          options = this.groups.actiTypes.filter(item => item.title != '全场买赠');
        }
        return options;
      }
    },
    props: {
      basicData: {
        type: Object
      }
    },
    methods: {
      /**
       * 初始化字段选项组的默认值
       */
      initGroupsDefault() {},
      /**
       * 修改订单类型
       */
      checkOrderTypeChange(vals) {
        this.basicData.order_type = vals;
        // add  by wdq 9代表预售，去掉【预售】类型默认选择【付款时间】
        if (this.basicData.order_type.includes('9')) {
          this.basicData.time_type = '2';
        }
      },
      /**
       * 修改平台类型
       */
      checkPlatformTabsChange(vals) {
        this.basicData.platform_mark = vals;
      },
      /**
       * 修改时间类型
       */
      checkTimeTypeChange(val) {
        this.basicData.time_type = val;
      },
      /**
       * 修改活动类型
       */
      checkActiTypesChange(val) {
        this.basicData.activity_type = val;
      },
      /**
       * 修改梯度赠送
       */
      checkGradientGiftChange(val) {
        this.basicData.gradient_gift = val;
      },
      /**
       * 修改订单备注
       */
      checkOrderRemarksChange(val) {
        this.basicData.order_notes_type = val;
      },
      /**
       * 修改单个买家次数
       */
      checkBuyerLimitFrequencyChange(val) {
        this.basicData.buyer_limit_frequency = val;
      },
      /**
       * 限制活动名称长度
       */
      limitName(event) {
        const value = event.target.value;
        value.length > 50 ? event.target.value = value.slice(0, 50) : value;
      },
      handleTimeLimitChange(val) {
        this.basicData.time_limit = val;
        let endTime = this.basicData.time_limit[1].replace(/\/|\s|\:/g, '');
        endTime = Number(endTime) > 0 ? Number(endTime) : 0;
        let offline_time = 0;
        if (new Date().isDate(this.basicData.offline_time)) {
          offline_time = new Date(this.basicData.offline_time).Format('yyyyMMddhhmmss');
        } else {
          offline_time = this.basicData.offline_time.replace(/\/|\s|\:/g, '');
        }
        offline_time = Number(offline_time) > 0 ? Number(offline_time) : 0;
        const diff = 2000000;
        try {
          // && (Number(endTime) + diff > offline_time)
          if (endTime !== 0) {
            offline_time = new Date().addDays(new Date(this.basicData.time_limit[1]), 2);
            this.basicData.offline_time = offline_time.Format('yyyy/MM/dd hh:mm:ss');
          } 
        } catch (e) {}
      },
      handleOfflineTimeChange(val) {
        this.basicData.offline_time = val;
      }
    },
    mounted() {
      this.initGroupsDefault();
    }
  };
</script>
<style lang="less">
@lineHeight: 24px;
@inputWidth: 400px;
@fontSize: 12px;
.basicInfo {
  padding: 10px;
  border: 1px solid rgb(235, 235, 235);
  .title {
    i {
      font-size: 36px;
      color: rgb(236, 110, 78);
    }
    >span {
      line-height: 36px;
      font-size: 20px;
      font-weight: 600;
    }
  }
  .row {
    margin: 20px 0px;
    white-space: nowrap;
    .form_label {
      text-align: center;
      display: inline-block;
      font-size: 12px;
      width: 150px;
      height: 100%;
      line-height: @lineHeight;
      padding: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .item-input {
      height: 25px !important;
      label.title {
        width: 150px;
        text-align: center;
      }
      label i{
        font-size: 12px;
        line-height: 10px;
      }
      .input-wrap {
        .input-inner {
          width: @inputWidth;
          .el-input {
            width: @inputWidth;
            .el-input__inner {
              font-size: @fontSize;
              border-radius: 2px;
              height: @lineHeight;
              line-height: @lineHeight;
              padding: 0 5px;
            }
          }
        }
      }
      .el-select {
        width: 300px;
        .el-input {
          font-size: 12px;
          .el-input__inner {
            font-size: @fontSize;
            height: @lineHeight;
            line-height: @lineHeight;
            border-radius: 2px;
          }
        }
      }
    }
    .burgeon-date-picker {
      .burgeon-date-picker-rel {
        .burgeon-input-wrapper {
          .burgeon-input-icon-normal + .burgeon-input {
            padding: 0;
            height: 24px;
            line-height: 24px;
          }
        }
      }
    }
    .form_content {
      height: 100%;
      line-height: @lineHeight;
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 150px);
      .form_item {
        display: inline-block;
      }
      .limitinput{
        width: 60px !important;
      }
      .form_el_input {
        width: @inputWidth;
        height: 100%;
        input {
          width: 100%;
          height: 24px;
          padding: 0 5px;
          border-radius: 2px;
          border: 1px solid #dcdfe6;
          box-sizing: border-box;
        }
      }
    }
    .red {
      padding: 5px;
      color: red;
    }
  }
}
</style>
