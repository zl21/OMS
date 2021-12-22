/*
 * @Author: your name
 * @Date: 2021-04-27 10:38:48
 * @LastEditTime: 2021-12-07 20:05:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/js/OmsForm.js
 */
// import myInputLd from 'framework/components/element/input.vue' //为多选+导入组件专属引入
// 兼容fktable1.4数据格式（云雀1.0）
import myInput from "burgeonComponents/view/Fkinput.vue";
import fkinputPlus from "burgeonComponents/view/FkinputPlus.vue";
export default {
  name: 'OmsForm',
  components: {
    fkinputPlus,
    myInput,
    myInputLd:$R3_CPS.components.input
  },
  data() {
    return {
      selectInputChangeVal: '',
      flodData: 'el-icon-arrow-down', //折叠箭头动态样式
      currentFlod: 'down' //存储当前选中的箭头状态
    }
  },
  props: {
    /**
     * btn: 搜索按钮、格式同OmsButton
     * iconSite: 'rightTop', // 'bottomCenter' 折叠icon的位置
     * flodClick: 折叠回调
     * setColnum: 4, // 默认4列
     * setRow: 3, // 默认3行
     */
    formConfig: {
      type: Object
    }
  },
  computed: {
    // flodClickClass(){
    //   return this.formConfig.flodClick ? '' : 'unFlodStyle';
    // }
    formFields() {
      return this.formConfig.formData.filter(i => i.style)
    }
  },
  watch: {
    // flodData() {
    //   if (this.flodData === 'el-icon-arrow-up') {
    //     this.$refs[this.currentFlod].style.maxHeight = "";
    //   } else {
    //     // this.$refs[this.currentFlod].style.maxHeight = "96px";
    //     this.$refs[this.currentFlod].style.overflow = "hidden";
    //   }
    // }
  },
  created() {
  },
  updated() {
    console.log('updated');
  },
  mounted() {
    // if (this.formConfig.flodClick) {
    //   // this.$refs[this.formConfig.flodClick].style.maxHeight = "96px";
    //   this.$refs[this.formConfig.flodClick].style.overflow = "hidden";
    // }
    setTimeout(() => {
      this.initRenderForm();
      let nodes = this.$refs.popLabel;
      nodes && nodes.forEach(e => {
        let oldNodeStr = e.$el.firstElementChild.innerHTML;
        if (oldNodeStr.includes('*')) e.$el.firstElementChild.innerHTML = `<i style="color:#ed4014">*</i> ${oldNodeStr.slice(1)}`;
      });
    }, 500);
  },
  methods: {
    initRenderForm() {
      const { setColnum = 4, setRow = 3 } = this.formConfig
      let showNum;
      if (this.formConfig.btn) {
        showNum = setColnum * setRow - 1
      } else {
        showNum = setColnum * setRow
      }
      if (this.currentFlod == 'down') {
        this.formConfig.formData.forEach((it, n) => {
          if (n + 1 > showNum) {
            console.log(n, showNum, it);
            it.class = `${it.class ? it.class : ''} long`
          }
        });
      } else {
        this.formConfig.formData.forEach((it, n) => {
          it.class = it.class ? it.class.replace('long', '') : '';
        });
      }
      this.$forceUpdate()
    },
    selectInputChange(x) {
      this.selectInputChangeVal = x;
    },
    selectEnter(item, val, e) {
      if (e.keyCode == 13) {
        if (typeof item.selectEnter == 'function') {
          this.runMethods(item.selectEnter(this.selectInputChangeVal || val), true);
        } else {
          console.error('未定义selectEnter方法!')
        }
        // this.$emit('selectEnter', this.selectInputChangeVal);
      }
    },
    runMethods(val, flag) {
      if (val) {
        flag ? val(e) : val();
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
      // if (this.flodData === 'el-icon-arrow-up') {
      //   this.flodData = 'el-icon-arrow-down';
      //   // this.currentFlod = val;

      // } else {
      //   this.flodData = 'el-icon-arrow-up';
      //   // this.currentFlod = val;
      // }
      this.flodData === 'el-icon-arrow-down' ? this.flodData = 'el-icon-arrow-up' : this.flodData = 'el-icon-arrow-down';
      this.currentFlod = this.flodData == 'el-icon-arrow-down' ? 'down' : 'up'
      if (typeof val == 'function') {
        val(this.currentFlod);
      }
      this.initRenderForm()
    },
  }
}