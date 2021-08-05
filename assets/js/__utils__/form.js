import { fkQueryList } from '../fkRequest';

const form = {
  // 表单操作
  refactoringData(defaultFormItemsLists) {
    const list = [];
    defaultFormItemsLists.forEach(ele => {
      const obj = {};
      obj.row = ele.row ? ele.row : 1;
      obj.col = ele.col ? ele.col : 1;
      obj.item = {
        type: this.checkDisplay(ele),
        label: ele.coldesc,
        field: ele.colname,
        value: this.defaultValue(ele),
        inputname: ele.inputname,
        props: {
          clearable: true,
          AutoData:[]
        },
        event: {}
      };

      // 带有combobox的添加到options属性中
      if (ele.combobox) {
        const arr = [];
        ele.combobox.forEach(item => {
          arr.push({
            label: item.limitdesc,
            value: item.limitval
          });
        });
        obj.item.props.options = arr;
      }

      // 外键的单选多选判断
      // if (ele.display === 'OBJ_FK') {
      
      if (ele.type == "object") {
        obj.item.props.single = true;
        obj.item.props.fk_type = 'drp';
        obj.item.props.fkobj = ele.fkobj;
        obj.item.props.defaultSelected = this.defaultValue(ele) || [];
        obj.item.props.data = {
          start: 0,
          tabth: [],
          row: []
        };
        obj.item.props.totalRowCount = 0;
        obj.item.props.pageSize = 10;
        obj.item.props.dataEmptyMessage = '数据加载中...'; // 无数据的提示
        obj.item.props.columns = ['name', 'value']; // 展现的组
        obj.item.props.AutoData = [];
      }


        // switch (ele.fkobj.searchmodel) {
        //   case 'drp':
        //     obj.item.props.single = true;
        //     obj.item.props.fk_type = 'drp';
        //     obj.item.props.fkobj = ele.fkobj;
        //     obj.item.props.defaultSelected = this.defaultValue(ele) || [];
        //     obj.item.props.data = {
        //       start: 0,
        //       tabth: [],
        //       row: []
        //     };
        //     obj.item.props.totalRowCount = 0;
        //     obj.item.props.pageSize = 10;
        //     obj.item.props.dataEmptyMessage = '数据加载中...'; // 无数据的提示
        //     obj.item.props.columns = ['name', 'value']; // 展现的组
        //     obj.item.props.AutoData = [];
        //     break;
        //   case 'mrp':
        //     obj.item.props.single = false;
        //     obj.item.props.data = {};
        //     obj.item.props.fk_type = 'mrp';
        //     obj.item.props.fkobj = ele.fkobj;
        //     obj.item.props.defaultSelected = this.defaultValue(ele) || [];
        //     break;
        //   case 'pop':
        //     obj.item.props.fkobj = ele.fkobj;
        //     obj.item.props.blurType = false;
        //     obj.item.props.fkobj.colid = ele.colid;
        //     obj.item.props.Selected = [];
        //     break;
        //   case 'mop':
        //     obj.item.props.fkobj = ele.fkobj;
        //     obj.item.props.fkobj.colid = ele.colid;
        //     obj.item.props.blurType = false;
        //     obj.item.props.fkobj.url = `/${obj.item.props.fkobj.serviceId}/p/cs/menuimport`;
        //     obj.item.props.datalist = [];
        //     obj.item.props.Selected = [];
        //     obj.item.props.filterDate = {};
        //     break;
        //   default:
        //     break;
        // }
        obj.item.event = {
          'on-popper-hide': () => {
            // 初始化清空数据
            obj.item.props.data = {};
          },
          'on-popper-show': $this => {
            // 当外键下拉站开始去请求数据
            fkQueryList({
              searchObject: {
                isdroplistsearch: true,
                refcolid: ele.colid,
                startindex: 0,
                range: $this.pageSize
              },
    //          serviceId: ele.fkobj.serviceId,
              success: res => {
                obj.item.props.data = Object.assign({}, res.data.data);
                console.log(obj.item.props.data);
                obj.item.props.totalRowCount = res.data.data.totalRowCount;
                obj.item.props.pageSize = res.data.data.defaultrange;
              }
            });
          },
          'on-page-change': (value, $this) => {
           
            fkQueryList({
              searchObject: {
                isdroplistsearch: true,
                refcolid: ele.colid,
                startindex: $this.data.defaultrange * ($this.currentPage - 1),
                range: $this.pageSize
              },
           //   serviceId: ele.fkobj.serviceId,
              success: res => {
                obj.item.props.data = Object.assign({}, res.data.data);
                obj.item.props.totalRowCount = res.data.data.totalRowCount;
                obj.item.props.pageSize = res.data.data.defaultrange;
              }
            });
          },
          'on-input-value-change': (value, $this) => {
            // 下拉多选模糊搜索事件
            obj.item.value = undefined;
            obj.item.props.AutoData = []
            fkQueryList({
              searchObject: {
                isdroplistsearch: true,
                refcolid: ele.colid,
                startindex: 0,
                range: 100
              },
            //  serviceId: ele.fkobj.serviceId,
              success: res => {
                res.data.data.row.forEach(item => {
                  if (ele.colid == 182332) {
                    if (item.SHOP_NICK.val.indexOf(value) != '-1') {
                      this.nobj = {};
                     
                      res.data.data.tabth.forEach(em => {
                        this.nobj[em.name] = item[em.colname].val;
                        this.nobj.value = item[em.colname].val;
                      });
                      obj.item.props.AutoData.push(this.nobj);
                    }
                  }else{
                    if (item.ENAME.val.indexOf(value) != '-1') {
                      this.nobj = {};
                     
                      res.data.data.tabth.forEach(em => {
                        this.nobj[em.name] = item[em.colname].val;
                        this.nobj.value = item[em.colname].val;
                      });
                     obj.item.props.AutoData.push(this.nobj);
                    }
                  }
                  
                });
              }
            });
          },
          'on-fkrp-selected': value => {
            // 下拉单选选中事件
            console.log(value);
            obj.item.value = value[0].ID;
          },
          'on-clear': () => {
         
            obj.item.value = undefined;
         
          }
        };
      // } else if (ele.display == 'OBJ_SELECT') {
        if (ele.type != "object") {
          obj.item.event = {
            'on-change': value => {
              obj.item.value = value.target.value;
            },
            'on-clear': () => {
              obj.item.value = undefined;
            }
          }
        }
      

      // }
      list.push(obj);
    });
    return list;
  },

  checkDisplay(item) {

    if (item.type == "object") {
      return 'DropDownSelectFilter';
    }else{
      return 'Input';
    }

    // if (!item.display || item.display === 'text') {
    //   return 'Input';
    // }
    // if (item.display === 'OBJ_SELECT') {
    //   return 'Select';
    // }
    // if (item.display === 'OBJ_FK') {
    //   switch (item.fkobj.searchmodel) {
    //     case 'drp':
    //       return 'DropDownSelectFilter';
    //     case 'mrp':
    //       return 'DropMultiSelectFilter';
    //     case 'pop':
    //       return 'AttachFilter';
    //     case 'mop':
    //       return 'AttachFilter';
    //     default:
    //       break;
    //   }
    // }
   // return '';
  },
  defaultValue(item) {

    // 设置表单的默认值
    if (item.display === 'OBJ_SELECT' && item.default) {
      // 处理select的默认值
      const arr = [];
      arr.push(item.default);
      return arr;
    }

    if (item.display === 'OBJ_FK' && item.default) {
      // 外键默认值
      const arr = [];
      arr.push({
        ID: item.refobjid,
        Label: item.default
      });
      return arr;
    }
    return item.default;
  }
};
export default form;
