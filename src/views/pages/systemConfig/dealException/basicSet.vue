<!--基础信息-->
<template>
  <div class="basicInfo">
    <div class="title"><img src='./image/one.png'> </img>基本信息</div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>真实姓名：
      </div>
      <div class="form_content">
        <div class="form_el_input">
          <!--真实姓名 不少于两个汉字-->
          <input v-model="basicData.name" placeholder />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>联系方式：
      </div>
      <div class="form_content">
        <div class="form_el_input">
          <!--联系方式 不少于11数字-->
          <input v-model="basicData.mobile" placeholder />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>异常操作：
      </div>
      <div class="form_content">
        <SingleBox
          :value="basicData.operate_type"
          :options="operateType"
          @changeSingle="checkTypeChange"
        ></SingleBox>
      </div>
    </div>
    <div class="row">
      <div class="form_label">
        <i class="red">*</i>异常操作原因：
      </div>
      <div class="form_content">
        <div class="form_el_input">
          <input v-model="basicData.reason" placeholder="不少于10个汉字" />
        </div>
      </div>
    </div>
  
  </div>
</template>
<script>
import SingleBox from "./components/singleBox";
import groups  from  './js/groups';
export default {
  name: "basicSet",
  components: {
    SingleBox
  },
  data() {
    return {
    };
  },
  props: {
    basicData: {
      //基础信息
      type: Object
    }
  },
  computed:{
       operateType(){
            return  groups.operate_type||[]  
       }
  },
  methods: {
    /**
     *  切换操作类型
     */
    checkTypeChange(val) {
        this.basicData.operate_type = val;
    }
  },
  mounted() {}
};
</script>
<style lang="less">
@lineHeight: 24px;
@inputWidth: 400px;
@fontSize: 14px;
.basicInfo {
  margin: 10px;
  border: 1px solid rgb(235, 235, 235);
  .title {
    margin: 5px;
    display: flex;
    line-height: 32px;
    font-size: 18px;
    font-weight: 500;
    img {
      width: 32px;
      height: 32px;
    }
  }
  .row {
    margin: 20px 0px;
    white-space: nowrap;
    .form_label {
      text-align: center;
      display: inline-block;
      font-size: @fontSize;
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
      margin-right:20px;
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
    }
    .red {
      padding: 5px;
      color: red;
    }
  }
}
</style>
