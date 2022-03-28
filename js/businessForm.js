/*
 * @Author: your name
 * @Date: 2021-04-27 10:38:48
 * @LastEditTime: 2021-08-30 17:16:10
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
      currentFlod: '', //存储当前选中的箭头状态
      url: {
        autoUrl: '/p/cs/fuzzyquerybyak',
        tableUrl: '/p/cs/QueryList',
        tableSearchUrl: '/p/cs/newQueryList'
      },
      network: R3.network,
      eventFun: {
        'on-input-value-change': () => {
          console.log('on-input-value-change');
        },
        'on-fkrp-selected': () => {
          // item.oneObj(item.itemdata.isBackRowItem ? row : item.itemdata)
          console.log('on-fkrp-selected');
        },
        'on-page-change': () => {
          console.log('on-page-change');
        }
      }
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
    // flodData() {
    //   if (this.flodData === 'el-icon-arrow-up') {
    //     this.$refs[this.currentFlod].style.maxHeight = "";
    //   } else {
    //     // this.$refs[this.currentFlod].style.maxHeight = "96px";
    //     this.$refs[this.currentFlod].style.overflow = "hidden";
    //   }
    // }
  },
  created(){
  },
  updated(){
    console.log('updated');
  },
  mounted() {
    // if (this.formConfig.flodClick) {
    //   // this.$refs[this.formConfig.flodClick].style.maxHeight = "96px";
    //   this.$refs[this.formConfig.flodClick].style.overflow = "hidden";
    // }
    setTimeout(() => {
      let nodes = this.$refs.popLabel;
      let nodes2 = this.$refs.dropSelect;
      let allNodes = [nodes, nodes2].filter(i => Array.isArray(i)).flat()
      allNodes.forEach(e => {
        let oldNodeStr = e.$el.firstElementChild.innerHTML;
        if (oldNodeStr.includes('*')) e.$el.firstElementChild.innerHTML = `<i style="color:#ed4014;">*</i> ${oldNodeStr.slice(1)}`;
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
      // if (this.flodData === 'el-icon-arrow-up') {
      //   this.flodData = 'el-icon-arrow-down';
      //   // this.currentFlod = val;

      // } else {
      //   this.flodData = 'el-icon-arrow-up';
      //   // this.currentFlod = val;
      // }
      this.flodData === 'el-icon-arrow-down' ? this.flodData = 'el-icon-arrow-up' : this.flodData = 'el-icon-arrow-down';
      if (val) {
        val(this.flodData === 'el-icon-arrow-down' ? 'down' : 'up');
      }
    },
    // 接口入参- 模糊传参
    sendAutoMessage(item) {
      const { colid, fixedcolumns } = item.itemdata
      return {
        colid,
        fixedcolumns
      }
    },
    // 接口入参- 表格模糊传参
    sendTableMessage(item) {
      const { isdroplistsearch, colid } = item.itemdata
      // 定制查询接口
      if (typeof item.popBefore == 'function') {
        this.url.tableSearchUrl = item.itemdata.api
        this.runMethods(item.popBefore(item.itemdata))
        return item.itemdata.params
      }
      this.url.tableSearchUrl = '/p/cs/newQueryList'
      return {
        isdroplistsearch: isdroplistsearch || true,
        refcolid: colid,
      }
    },

    propsData(item) {
      const { single, fkdisplay, pid, valuedata } = item.itemdata;
      const defaultSelectedDrp = item.style == 'dropSelect'
        && fkdisplay == 'drp'
        && [{ ID: pid, Label: valuedata }]

      return {
        single: fkdisplay == 'mrp' ? false : fkdisplay == 'drp' ? true : !!single, // 是否单选
        placeholder: item.itemdata.placeholder || '请输入',
        enterType: false,
        serviceId: item.itemdata.serviceId || '',
        // totalRowCount: item.itemdata.totalRowCount || 0,
        pageSize: item.itemdata.pageSize || 10,
        isBackRowItem: item.itemdata.isBackRowItem || false,
        dataEmptyMessage: item.itemdata.dataEmptyMessage || '数据加载中...',
        columns: item.itemdata.columns || [],
        columnsKey: item.itemdata.columnsKey || [],
        showColnameKey: item.itemdata.showColnameKey || 'isak',
        hidecolumns: item.itemdata.hidecolumns || [],
        defaultSelected: item.itemdata.defaultSelectedMrp || defaultSelectedDrp || [],
        className: item.itemdata.className || ''
      };
    },
    valueChange(val, item) {
      let arg
      val = val || []
      const { fkdisplay, isBackRowItem } = item.itemdata
      if (fkdisplay == 'drp' && val.length) {
        item.itemdata.pid = val[0].ID;
        item.itemdata.valuedata = val[0].Label;
        item.itemdata.defaultSelectedMrp = val;
        arg = isBackRowItem ? val[0] : item.itemdata
      } else {
        item.itemdata.pid = '';
        item.itemdata.valuedata = '';
        val.forEach((it) => {
          item.itemdata.pid += `${it.ID},`;
          item.itemdata.valuedata += `${it.Label},`;
        })
        item.itemdata.pid = item.itemdata.pid.replace(/,$/, '');
        item.itemdata.valuedata = item.itemdata.valuedata.replace(/,$/, '');
        item.itemdata.defaultSelectedMrp = val;
        arg = isBackRowItem ? val : item.itemdata
      }
      if (typeof item.oneObj == 'function') {
        this.runMethods(item.oneObj(arg))
      }
    },
    blur(val, itemdata) {
      // 失焦：模糊搜索的选中、clear都会先走失焦
      // if (this.isFuzzy && !this.isHandleSelect) {
      //   console.warn('fuzzy blur，模糊搜索失去焦点了，自行处理！');
      //   setTimeout(() => {
      //     if (this.itemdata.pid && this.itemdata.valuedata) { // 假装已经走了选中事件
      //       return
      //     } else {
      //       if (this.AutoData.length) {
      //         const val = this.AutoData;
              itemdata.pid = val.map(i => i.ID).join();
              itemdata.valuedata = val.map(i => i.Label).join();
      //         if (this.isBackRowItem) {
      //           this.$emit('inputBlur', val[0]);
      //         } else {
                this.$emit('inputBlur', itemdata);
      //         }
      //       } else {
      //         console.warn('模糊搜索未查询到数据！');
      //         this.itemdata.pid = '';
      //         this.itemdata.valuedata = '';
      //         if (this.isBackRowItem) {
      //           this.$emit('inputBlur', {});
      //         } else {
      //           this.$emit('inputBlur', this.itemdata);
      //         }
      //       }
      //     }
      //     this.isHandleSelect = false;
      //   }, 3000);
      // } else {
      //   console.warn('not fuzzy blur');
      // }
    },
    clear(val, itemdata) {
      console.log(itemdata);
      itemdata.pid = '';
      itemdata.valuedata = '';
      this.$emit('inputClear', itemdata);
      // if (this.isBackRowItem) {
      //   this.$emit('getFkChooseItem', {});
      // } else {
      //   this.$emit('getFkChooseItem', this.itemdata);
      // }
    },
  }
}