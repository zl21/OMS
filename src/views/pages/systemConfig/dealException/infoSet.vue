<!--详细操作数据-->
<template>
  <div class="infoSet">
    <tabList :currentTab.sync="currentTab" :panels="operateType">
      <div slot="tab_content">
        <div v-if="currentTab === operateType[0].value ">
          <SingleBox
            :value="infoData.retail_to_es.es_type"
            :options="esType"
            @changeSingle="checkESTypeChange"
          ></SingleBox>
          <div class="content" v-if="infoData.retail_to_es.es_type === 'IDTYPE' ">
            <textarea
              class="text_area"
              v-model="infoData.retail_to_es.billId"
              placeholder=" 填写单据ID,以逗号分隔，如：20201235001,20201235002"
            ></textarea>
          </div>
          <div class="content" v-if="infoData.retail_to_es.es_type === 'DATETYPE'">
            <div class="item">
              <div class="form_label">
                <i class="red">*</i>开始时间：
              </div>
              <div class="form_content">
                <DatePicker
                  :value="infoData.retail_to_es.begin_time"
                  format="yyyy-MM-dd"
                  type="datetime"
                  placeholder
                  style="width: 200px"
                  @on-change="handleBeginTimeChange"
                ></DatePicker>
              </div>
            </div>
            <div class="item">
              <div class="form_label">
                <i class="red">*</i>结束时间：
              </div>
              <div class="form_content">
                <DatePicker
                  :value="infoData.retail_to_es.end_time"
                  format="yyyy-MM-dd"
                  type="datetime"
                  placeholder
                  style="width: 200px"
                  @on-change="handleEndTimeChange"
                ></DatePicker>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentTab  === operateType[1].value">
          <div class="content">
            <textarea
              class="text_area"
              v-model="infoData.retail_to_pg.BILL_NO"
              placeholder=" 按单据编号导入,以逗号分隔，如：RE20201235001,RE20201235002"
            ></textarea>
          </div>
        </div>
        <div v-if="currentTab  === operateType[2].value">
          <!-- <SingleBox
            :value="infoData.managernav_organize.nav_type"
            :options="navType"
            @changeSingle="checkNavTypeChange"
          ></SingleBox>-->
          <div class="content">
            <div class="row">
              <div class="form_label">
                <i class="red"></i>店铺ID：
              </div>
              <div class="form_content">
                <textarea
                  class="text_area"
                  v-model="infoData.managernav_organize.storeIds"
                  placeholder=" 按店铺ID，逗号分隔；如：13345,13355,1678..."
                ></textarea>
              </div>
            </div>
            <div class="row">
              <div class="form_label">
                <i class="red">*</i>日 期：
              </div>
              <div class="form_content">
                <textarea
                  class="text_area"
                  v-model="infoData.managernav_organize.dates"
                  placeholder=" 按日期导入，逗号分隔；如：20200508，20200509，20200515..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </tabList>
  </div>
</template>
<script>
import tabList from "./components/tab_list";
import SingleBox from "./components/singleBox";
import groups from "./js/groups";
export default {
  name: "infoSet",

  data() {
    return {
      timeTypes: [],
      operateType: groups.operate_type,
      // navType: groups.nav_type,
      esType: groups.es_type
    };
  },
  components: {
    tabList,
    SingleBox,
    groups
  },
  computed: {
    currentTab() {
      return this.basicData.operate_type;
    }
  },
  watch:{
    'infoData.retail_to_es.billId':{
      handler(val){
        this.infoData.retail_to_es.billId = val.replace(/[^\d,]/g, '')
      }
    },
    'infoData.retail_to_pg.BILL_NO':{
      handler(val){
        this.infoData.retail_to_pg.BILL_NO = val.replace(/[^\w\.\/,-]/ig,'')
      }
    },
    'infoData.managernav_organize.storeIds':{
       handler(val){
        this.infoData.managernav_organize.storeIds = val.replace(/[^\d,]/g, '')
      }
    },
    'infoData.managernav_organize.dates':{
      handler(val){
        this.infoData.managernav_organize.dates = val.replace(/[^\d,]/g, '')
      }
    }
  },
  props: {
    infoData: {
      type: Object
    },
    basicData: {
      type: Object
    }
  },
  methods: {
    checkESTypeChange(val) {
      this.infoData.retail_to_es.es_type = val;
    },
    checkNavTypeChange(val) {
      this.infoData.managernav_organize.nav_type = val;
    },
    handleBeginTimeChange(val) {
       this.infoData.retail_to_es.begin_time = val;
    },
    handleEndTimeChange(val) {
      this.infoData.retail_to_es.end_time = val;
    }
  },
  mounted() {},
  created() {}
};
</script>
<style lang="less">
@lineHeight: 24px;
@inputWidth: 400px;
@lineHeight: 24px;
@fontSize: 14px;
.infoSet {
  margin: 10px;
  flex: 1;
  position: relative;
  .tabs_content {
    margin: 10px 0;
    .burgeon-radio-inner:after {
      left: 3px !important;
      top: 3px !important;
    }
    .row {
      margin: 20px 0px;
      width: 100%;
      white-space: nowrap;
      .form_label {
        text-align: center;
        display: inline-block;
        font-size: @fontSize;
        width: 80px;
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
        label i {
          font-size: @fontSize;
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
            font-size: @fontSize;
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
        margin-right: 20px;
        .burgeon-date-picker-rel {
          .burgeon-input-wrapper {
            .burgeon-input-icon-normal + .burgeon-input {
              padding: 0 0 0 5px;
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
        .form_el_input {
          width: @inputWidth;
          height: 100%;
          input {
            width: 100%;
            height: 24px;
            padding: 0 5px;
            border-radius: 2px;
            border: 1px solid #dcdfe6;
          }
        }
        .burgeon-radio-inner:after {
          left: 3px !important;
          top: 3px !important;
        }

        .text_area {
          text-indent: 5px;
          width: 100%;
          height: 100px;
          border: 1px solid #ebebeb;
        }
      }
      .red {
        padding: 5px;
        color: red;
      }
    }
    .content {
      padding: 10px 0;
      display: flex;
      .text_area {
        text-indent: 5px;
        width: 100%;
        height: 100px;
        border: 1px solid #ebebeb;
      }
      .burgeon-date-picker-rel {
        .burgeon-input-wrapper {
          .burgeon-input-icon-normal + .burgeon-input {
            padding: 0 0 0 5px;
            height: 24px;
            line-height: 24px;
          }
        }
      }
      .item {
        margin-right: 50px;
        display: -webkit-box;
        .form_label {
          text-align: center;
          display: inline-block;
          font-size: 12px;
          //width: 150px;
          height: 100%;
          line-height: @lineHeight;
          padding: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .red {
    padding: 5px;
    color: red;
  }
}
</style>