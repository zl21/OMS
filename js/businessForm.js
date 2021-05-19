/*
 * @Author: your name
 * @Date: 2021-04-27 10:38:48
 * @LastEditTime: 2021-05-19 18:15:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/js/businessForm.js
 */
import myInputLd from 'framework/components/element/input.vue' //为多选+导入组件专属引入
// import myInput from "framework/components/input/objinput_dz.vue";
// 兼容fktable1.4数据格式（云雀1.0）
import myInput from "../fkinput.vue";
import fkinputPlus from "../fkinputPlus.vue";
export default {
  components: {
    fkinputPlus,
    myInput,
    myInputLd
  },
  data() {
    return {
      flodData: 'el-icon-arrow-down', //折叠箭头动态样式
      currentFlod: '' //存储当前选中的箭头状态
    }
  },
  props: {
    formConfig: {
      type: Object
    }
  },
  computed:{
    flodClickClass(){
      return this.formConfig.flodClick ? '' : 'unFlodStyle';
    }
  },
  watch: {
    flodData() {
      if (this.flodData === 'el-icon-arrow-up') {
        this.$refs[this.currentFlod].style.maxHeight = "";
      } else {
        this.$refs[this.currentFlod].style.maxHeight = "90px";
        this.$refs[this.currentFlod].style.overflow = "hidden";
      }
    }
  },
  mounted() {
    if (this.formConfig.flodClick) {
      this.$refs[this.formConfig.flodClick].style.maxHeight = "90px";
      this.$refs[this.formConfig.flodClick].style.overflow = "hidden";
    }
  },
  methods: {
    runMethods(val , flag){
      if(val){
        flag? val(e):val();
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    oneObj(val) {
      if (val) {
        val(e);
      }
    },
    
    //点击折叠按钮事件
    flodClick(val) {
      // alert(val);
      if (this.flodData === 'el-icon-arrow-up') {
        this.flodData = 'el-icon-arrow-down';
        this.currentFlod = val;

      } else {
        this.flodData = 'el-icon-arrow-up';
        this.currentFlod = val;
      }
      if (val) {
        val();
      }
    },
  }
}