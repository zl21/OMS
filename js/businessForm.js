/*
 * @Author: your name
 * @Date: 2021-04-27 10:38:48
 * @LastEditTime: 2021-08-20 14:24:08
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
      selectInputChangeVal: '', 
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
    // flodClickClass(){
    //   return this.formConfig.flodClick ? '' : 'unFlodStyle';
    // }
  },
  watch: {
    flodData() {
      if (this.flodData === 'el-icon-arrow-up') {
        this.$refs[this.currentFlod].style.maxHeight = "";
      } else {
        // this.$refs[this.currentFlod].style.maxHeight = "96px";
        this.$refs[this.currentFlod].style.overflow = "hidden";
      }
    }
  },
  created(){
  },
  updated(){
    console.log('updated');
  },
  mounted() {
    if (this.formConfig.flodClick) {
      // this.$refs[this.formConfig.flodClick].style.maxHeight = "96px";
      this.$refs[this.formConfig.flodClick].style.overflow = "hidden";
    }
    setTimeout(() => {
      let nodes = this.$refs.popLabel;
      nodes && nodes.forEach(e => {
        let oldNodeStr = e.$el.firstElementChild.innerHTML;
        if(oldNodeStr.includes('*')) e.$el.firstElementChild.innerHTML = `<i style="color:#ed4014">*</i> ${oldNodeStr.slice(1)}`;
      });
    }, 500);
  },
  methods: {
    selectInputChange(x) {
      this.selectInputChangeVal = x;
    },
    selectEnter(item, val, e) {
      if (e.keyCode == 13) {
        if(typeof item.selectEnter == 'function') {
          this.runMethods(item.selectEnter(this.selectInputChangeVal || val), true);
        } else {
          console.error('未定义selectEnter方法!')
        }
        // this.$emit('selectEnter', this.selectInputChangeVal);
      }
    },
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