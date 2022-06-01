/*
 * @Author: your name
 * @Date: 2021-04-27 10:38:48
 * @LastEditTime: 2021-12-07 20:05:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /burgeon-business-components/js/OmsForm.js
 */
// import myInputLd from 'framework/components/element/input.vue' //为多选+导入组件专属引入
import myInputLd from 'r3cps/components/element/input.vue'
// 兼容fktable1.4数据格式（云雀1.0）
import myInput from "burgeonComponents/view/Fkinput.vue";
import fkinputPlus from "burgeonComponents/view/FkinputPlus.vue";
export default {
  name: 'OmsForm',
  components: {
    fkinputPlus,
    myInput,
    myInputLd
  },
  data() {
    return {
      no: '',
      selectInputChangeVal: '',
      flodData: 'el-icon-arrow-down', //折叠箭头动态样式
      currentFlod: 'down', //存储当前选中的箭头状态
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
      },
      defaultGrid: { // 默认响应式栅格占位格数
        xs: 12,
        sm: 8,
        md: 8,
        lg: 6,
        span: 6
      },
      curGridColnum: 4,
      showNum: '' // 初始显示条数
    }
  },
  props: {
    /**
     * btn: 搜索按钮、格式同OmsButton
     * iconSite: 'rightTop', // 'bottomCenter' 折叠icon的位置
     * flodClick: 折叠回调
     * setColnum: 4, // 默认4列
     * setRow: 3, // 默认3行
     * isGrid: true, // 默认不启用栅格
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
    },
    // 查询条件默认显示行数
    queryDisNumber(v) {
      return $store.state.global.changeSearchFoldnum.queryDisNumber || 3
    },
    // 是否启用栅格（默认不启用）
    isGrid() {
      return this.formConfig.hasOwnProperty('isGrid') ? this.formConfig.isGrid : false
    },
    // 判断是否显示折叠按钮（判断查询条件是否 大于 查询条件默认显示行数*一行显示条数，大于才显示折叠按钮 ）
    searchInputLenMoreThanShowNum() {
      return this.formConfig.formData.length > this.showNum
    }
  },
  watch: {
     // 根据 查询条件默认显示行数 显示多少行
    queryDisNumber(v) {
      this.initRenderForm();
    },
    curGridColnum() {
      this.initRenderForm()
    },
    // flodData() {
    //   if (this.flodData === 'el-icon-arrow-up') {
    //     this.$refs[this.currentFlod].style.maxHeight = "";
    //   } else {
    //     // this.$refs[this.currentFlod].style.maxHeight = "96px";
    //     this.$refs[this.currentFlod].style.overflow = "hidden";
    //   }
    // }
    "formConfig.formData": {
      handler(n,o) {
        console.log('watch');
        if (n && n.length) {
          this.initRenderForm();
        }
      },
      immediate: true,
      deep: true,
    }
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
    const _this = this;
    window.addEventListener('keydown', e => {
      if (e.keyCode == 13) {
        if (_this.formConfig.btn && _this.formConfig.btn.buttons.length) {
          _this.formConfig.btn.buttons.find(it => it.webname == 'search').btnclick()
        }
      }
    });
    this.asteriskColor()
    // 响应式栅格
    window.addEventListener('resize', () => this.getGridColnum(), false)
    this.getGridColnum()
  },
  destroyed() {
    window.removeEventListener('keydown', this, false);
    window.removeEventListener('resize', () => this.getGridColnum(), false)
  },
  methods: {
    // 必填星号(*)颜色
    asteriskColor(ms = 500) {
      setTimeout(() => {
        let nodes = this.$refs.popLabel;
        let nodes2 = this.$refs.dropSelect;
        let allNodes = [nodes, nodes2].filter(i => Array.isArray(i)).flat()
        allNodes.forEach(e => {
          let oldNodeStr = e.$el.firstElementChild.innerHTML;
          if (oldNodeStr.includes('*')) e.$el.firstElementChild.innerHTML = `<i style="color:#ed4014;">*</i> ${oldNodeStr.slice(1)}`;
        });
      }, ms);
    },
    /**
     * 常规栅格：即表单中都是span: 6
     * 特殊栅格：即表单中不都是span: 6
     */
    gridSize(item) {
      let oldSpan = Number(item.width)
      let mainSpan = this.getMost(this.formConfig.formData.map(i => i.width)).max
      let gridSize = {}
      if (this.isGrid) { // 开启响应式栅格
        Object.keys(this.defaultGrid).forEach(key => {
          switch (key) {
            case 'span':
              gridSize[key] = item.width || this.formConfig.colSpan || this.defaultGrid[key]
              break;
            case 'xs':
            case 'sm':
            case 'md':
            case 'lg':
              switch (oldSpan) {
                case 8:
                  gridSize[key] = mainSpan == 8 && key == 'lg' ? oldSpan : this.defaultGrid[key]
                  break;
                case 12:
                case 16:
                  gridSize[key] = ['sm', 'md'].includes(key) ? 16 : key == 'lg' ? oldSpan : 24
                  break;
                case 24:
                  gridSize[key] = oldSpan
                  break;
                default:
                  gridSize[key] = this.defaultGrid[key] 
                  break;
              }
              break;
            default:
              break;
          }
        })
      } else {
        gridSize.span = item.width || this.formConfig.colSpan || this.defaultGrid.span
      }
      // console.log(item.width, item.label, gridSize)
      return gridSize
    },
    getMost(arr) {
      let max = null; // 出现次数最多的元素
      let num = 1; // 该元素出现次数
      arr.reduce((p, k)=>{   
        p[k]? p[k]++ : p[k]=1;  
        if(p[k] > num){
            num = p[k]
            max = k  
        }
        return p
      },{})
      return { max, num }   
    },
    // 当前栅格列数
    getGridColnum() {
      if (!this.formConfig.isGrid) return
      let clientWidth = document.body.clientWidth
      if (clientWidth >= 1200) {
        this.curGridColnum = 24 / this.defaultGrid.lg
        return
      }
      if (clientWidth >= 992) {
        this.curGridColnum = 24 / this.defaultGrid.md
        return
      }
      if (clientWidth >= 768) {
        this.curGridColnum = 24 / this.defaultGrid.sm
        return
      }
      if (clientWidth < 768) {
        this.curGridColnum = 24 / this.defaultGrid.xs
      }
    },
    initRenderForm() {
      if (!this.formConfig.flodClick) {
        return
      }
      
      const { setColnum = this.curGridColnum, setRow = this.queryDisNumber } = this.formConfig
      let showNum;

      if (this.formConfig.btn) { // 场景：表单中含搜索按钮（预留按钮占位）
        showNum = setColnum * setRow - 1
      } else {
        showNum = setColnum * setRow
      }
      this.showNum = showNum
      /* if ( setColnum * setRow > this.formConfig.formData.length ) {
        // 不需要折叠icon的情况
        this.no = 'noFlod'
      } else {
        this.no = ''
      } */
      if (this.currentFlod == 'down') {
        this.formConfig.formData.forEach((it, n) => {
          if (n + 1 > showNum) {
            it.class = it.class ? `${it.class} long` : 'long'
          } else {
            it.class = it.class ? it.class.replace(/long/g, '').trim() : '';
          }
        });
      } else {
        this.formConfig.formData.forEach((it, n) => {
          it.class = it.class ? it.class.replace(/long/g, '').trim() : '';
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
      this.flodData = this.flodData === 'el-icon-arrow-down' ? 'el-icon-arrow-up' : 'el-icon-arrow-down';
      this.currentFlod = this.flodData == 'el-icon-arrow-down' ? 'down' : 'up'
      if (typeof val == 'function') {
        val(this.currentFlod);
      }
      this.initRenderForm()
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
        placeholder: item.itemdata.placeholder || $i18n.t('form.selectPlaceholder'),
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
