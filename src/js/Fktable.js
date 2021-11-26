import ChineseDictionary from 'framework/assets/js/ChineseDictionary';
// import i18n from "@burgeon/internationalization/i18n";
// window.$i18n = i18n

export default {
  name: 'Fktable',
  props: {
    inputBox: true,
    defaultSelectedIds: {
      type: Array,
      default: () => []
    },
    fkid: {},  // fk id
    single: {},//是否是单选
    colname: {},
    inputname: {},
    flag: {},
    fktable: {},
    precolnameslist: {
      default: () => []
    },//过滤条件
    refcolprem: {},//关联过滤条件
    row: {},
    col: {},
    rowId: {},
    item: {},
    itemdata: {},
    version: {
      type: String
    }

  },
  watch: {
    itemdata: {
      handler: function (val, oldval) {
        let _self = this
        if (!val.pid) {
          _self.idArr = []
          _self.fkobj.idArr = []
          _self.fkobj.desc = []
        }
      },
      deep: true
    },
  },
  computed: {},
  data() {
    return {
      fkDimVal: '',
      ChineseDictionary: '',
      formObj: {
        isdroplistsearch: true
      },
      checkboxAll: false, //全选选中框状态(多选时有效)
      tabth: [],
      tabrow: [],
      startindex: 0,
      range: 10,
      totalRowCount: 0,
      fkobj: {
        index: this.colname,
        inputname: this.inputname,
        idArr: [],
        desc: [],
        item: [],
        row: this.row,
        col: this.col,
        rowId: this.rowId
      },
      fkDimData:[],
      isak: 0,
      active: -1,
      visible: 1,
      idArr: [],
      AllRows: [],
      dataEmpty: {
        flag: true,
        // message: '数据加载中……'
        message: $i18n.t('modalTips.du')
      }  //数据是否为空
    }
  },

  methods: {
    fnfiltersId(item, type) {
      if (type == "ID") {
        return item.filter(em => {
          return em.colname == "ID"
        })
      } else {
        return item.filter(em => {
          return em.colname != "ID"
        })
      }

    },
    resetClick() {
      let _self = this
      $('.fktable .table tbody tr td input[type=checkbox]').prop('checked', false)
      $('.fktable .searchlist input[type=text]').val('')
      _self.idArr = []
    },
    reaptData(obj) {   //深拷贝
      if (obj instanceof Array) {   //array
        let temp = []
        obj.forEach((item, index) => {
          let temp2 = []
          if (item instanceof Array) {
            item.forEach((item2, index) => {
              temp2.push(item2)
            })
            temp.push(temp2)

          } else {
            temp.push(item)
          }
        })
        return temp
      } else {   //obj
        let temp = {}

        for (var item in obj) {
          temp[item] = obj[item]
        }
        return temp
      }
    },
    checkBoxAll() {
      const _self = this;
      _self.checkboxAll = !_self.checkboxAll
      _self.$nextTick(function () {
        if (_self.checkboxAll) {
          //            _self.fkobj.desc = [];
          //            _self.fkobj.idArr = [];
          //            _self.fkobj.item = [];
          _self.tabrow.every(item => {
            if (_self.fkobj.idArr.indexOf(item[0]) < 0) {
              _self.fkobj.desc.push(item[_self.isak]);
              _self.fkobj.idArr.push(item[0]);
              _self.fkobj.item.push(item);
            }
            return true;
          });
        } else {
          _self.tabrow.every(item => {
            let index = _self.fkobj.idArr.indexOf(item[0])
            let index2 = _self.fkobj.desc.indexOf(item[_self.isak])
            if (index >= 0) {
              _self.fkobj.idArr.splice(index, 1)
            }
            if (index2 >= 0) {
              _self.fkobj.desc.splice(index2, 1)
            }
            _self.fkobj.item.splice(index, 1);
            return true;
          });

        }
        _self.tabth.forEach((item) => {
          if (item.isak) {
            _self.fkobj.tabth = item
          }
        })
        _self.$emit('pop', _self.fkobj);
      })
    },
    submitClick() {

    },
    indexClick(item, rowindex) {
      let _self = this
      // _self.active = index
      if (_self.single) {
        _self.fkobj.desc = []
        _self.fkobj.idArr = []
        _self.fkobj.idArr.push(item[0])
        _self.fkobj.desc.push(item[_self.isak])
        _self.fkobj.item = _self.AllRows[rowindex]
        _self.fkobj.tabth = _self.tabth[_self.isak]
        _self.$emit('pop', _self.fkobj)
      }

    },
    checkBoxChange(event, rowindex, item) {
      console.log(event, rowindex, item);
      let _self = this
      if (!_self.single) {
        // _self.submitClick()
        _self.fkobj.item = []

        if (event.target.checked) {

          if (_self.fkobj.idArr.indexOf(item[0]) >= 0) {

          } else {
            _self.fkobj.desc.push(item[_self.isak])
            _self.fkobj.idArr.push(item[0])
            _self.fkobj.item.push(_self.AllRows[rowindex])
          }
        } else {
          let index = _self.fkobj.idArr.indexOf(item[0])
          let index2 = _self.fkobj.desc.indexOf(item[_self.isak])

          if (index >= 0) {
            _self.fkobj.idArr.splice(index, 1)
          }

          if (index2 >= 0) {
            _self.fkobj.desc.splice(index2, 1)
          }
        }
        _self.tabth.forEach((item, index2) => {
          if (item.isak) {
            _self.fkobj.tabth = item
          }
        });

        if (_self.tabrow.every(item => _self.fkobj.idArr.indexOf(item[0]) >= 0)) {
          _self.checkboxAll = true;
        } else {
          _self.checkboxAll = false;
        }

        // modify on 04/19/2019
        const targetIndexList = [];
        _self.fkobj.idArr = _self.fkobj.idArr.sort((a, b) => a - b);
        _self.AllRows.forEach((row, index) => {
          if (_self.fkobj.idArr.indexOf(row.ID.val) !== -1) {
            targetIndexList.push(index);
          }
        });
        _self.fkobj.desc = Object.keys((_self.fkobj.desc.concat(this.tabrow.filter((row, index) => targetIndexList.indexOf(index) !== -1).map(row => row[this.isak]).reverse())).reduce((a, c) => { a[c] = null; return a; }, {}));
        _self.$emit('pop', _self.fkobj)
      } else {
        // 单选类型-选中触发
        _self.formObj.startindex = 0
        _self.visible = 1

        _self.fkobj.desc = []
        _self.fkobj.idArr = []

        _self.fkobj.idArr.push(item[0])
        _self.fkobj.desc.push(item[_self.isak])
        _self.fkobj.item = _self.AllRows[rowindex]
        _self.fkobj.tabth = _self.tabth[_self.isak];
        _self.$emit('pop', _self.fkobj)
        event.stopPropagation()
      }
    },
    currentchange(index) {
      this.visible = index
      this.searchTable(this.fkDimVal ? true : false)
    },
    colorChange(item, rowindex, e) {
      // debugger
      let _self = this
      // _self.active = index
      if (!_self.single) {
        // e.path[1].childNodes[0].childNodes[0].childNodes[0].checked
        const mrpDom = e.path[1].childNodes[0].childNodes[0].childNodes[0];
        mrpDom.target = {};
        mrpDom.target.checked = !mrpDom.checked;
        _self.checkBoxChange(mrpDom, rowindex, item);
      } else {
        _self.fkobj.desc = []
        _self.fkobj.idArr = []
        _self.fkobj.idArr.push(item[0])
        _self.fkobj.desc.push(item[_self.isak])
        _self.fkobj.item = _self.AllRows[rowindex]
        _self.fkobj.tabth = _self.tabth[_self.isak];
        _self.$emit('pop', _self.fkobj)
      }
    },
    // 模糊搜索
    fkDimSearch(val) {
      console.log('val:',val);
      this.visible = 1
      let _self = this;
      let params = new FormData();
      params.append('ak',val)
      params.append('colid',this.fkid)
      params.append('fixedcolumns',JSON.stringify({}))
      const autoRequest = _self.itemdata.autoRequest || {};
      if (autoRequest && Object.keys(autoRequest).length) {
        for (const key in autoRequest) {
          params.append(key, JSON.stringify(autoRequest[key]));
        }
      }
      const serviceId = _self.itemdata.serviceId;
      _self.service.common.fuzzyquerybyak(params, serviceId ? { serviceId } : 0)
      .then((res) => {
        console.log('res:',res);
        this.fkDimData = res.data.data;
      })
    },
    // 模糊搜索选中
    vagenChange(option){
      let _self = this
      _self.fkobj.idArr.push(option.value)
      _self.fkobj.desc.push(option.label)
      _self.$emit('pop', _self.fkobj)
    },
    searchTable() {
      let url = '/p/cs/QueryList';
      let _self = this;
      let params = new FormData();
      if (this.tabrow.length > 0) {
      } else {
        this.dataEmpty.flag = true
        this.dataEmpty.message = $i18n.t('modalTips.du') // '数据加载中……'
      }
      this.formObj.isdroplistsearch = true;
      this.formObj.startindex = (this.visible - 1) * this.range
      this.formObj.range = this.range
      this.formObj.refcolid = this.fkid;
      const tableRequest = _self.itemdata.tableRequest || {};
      if (tableRequest && Object.keys(tableRequest).length) {
        this.formObj = Object.assign(this.formObj, tableRequest);
      }
      params.append('searchdata', JSON.stringify(this.formObj));
      const serviceId = _self.itemdata.serviceId;
      _self.service.common.QueryList(params, serviceId ? { serviceId } : 0)
      .then((res) => {
        if (res.data.code == 0) {
          let dataArr = _self.version === '1.4' ? res.data.data : res.data.datas
          _self.tabrow = []
          _self.tabth = dataArr.tabth
          _self.totalRowCount = dataArr.totalRowCount
          _self.startindex = dataArr.start
          _self.range = dataArr.defaultrange
          dataArr.tabth.forEach((item, index) => {
            if (item.isak && item.colname != 'ID') {
              _self.isak = index
            }
          })

          if (dataArr.row.length > 0) {
            _self.dataEmpty.flag = false
            _self.dataEmpty.message = $i18n.t('modalTips.du') // '数据加载中……'
          } else {
            _self.dataEmpty.flag = true
            _self.dataEmpty.message = $i18n.t('other.noDataAvailable') // '暂无数据'
          }
          _self.AllRows = dataArr.row;

          dataArr.row.forEach((item, index) => {
            let arr = []

            dataArr.tabth.forEach((temp, index) => {
              arr.push(item[temp.colname].val)
            })
            _self.tabrow.push(arr);

          })
          if (_self.tabrow.every(item => _self.fkobj.idArr.indexOf(item[0]) >= 0)) {
            _self.checkboxAll = true;
          } else {
            _self.checkboxAll = false;
          }

          _self.$nextTick(function () {
            if ($('.fktable .table table').width() > 288) {
              if (_self.range > _self.totalRowCount) {
                $('.fktable .table').height(_self.totalRowCount * 24 + 26 + 18);
              } else {
                $('.fktable .table').height(_self.range * 24 + 26 + 18);
              }

            } else {
              if (_self.range > _self.totalRowCount) {
                $('.fktable .table').height(_self.totalRowCount * 24 + 26);
              } else {
                $('.fktable .table').height(_self.range * 24 + 26);
              }
            }
          })
        }
      });

    }
  },
  created() {
    let _self = this
    _self.ChineseDictionary = ChineseDictionary
    // 判断是否是外键关联
    if (_self.fkid) {
      _self.formObj.refcolid = _self.fkid
    } else {
      _self.formObj.table = _self.fktable
    }

    if (_self.precolnameslist && Array.isArray(_self.precolnameslist) && _self.precolnameslist.length > 0) {
      _self.formObj.precolnameslist = _self.precolnameslist;
      if (_self.refcolprem) {
        _self.formObj.precolnameslist.push(_self.refcolprem);
      }
    } else if (_self.refcolprem) {
      _self.formObj.precolnameslist = [_self.refcolprem];
    }
    if (_self.item) {
      _self.formObj.fixedcolumns = _self.item
    }

    if (_self.itemdata.item) {
      _self.formObj.fixedcolumns = _self.itemdata.item
    }

    if (_self.itemdata) {
      if (_self.itemdata.pid) {
        String(_self.itemdata.pid).split(',').forEach((item) => {
          if (item != -1 || item != '-1') {
            _self.idArr.push(item)
            _self.fkobj.idArr.push(item)
          }
        })
        if (_self.itemdata.valuedata) {
          let arr = _self.itemdata.valuedata.split(',')
          arr.forEach((item, index) => {
            _self.fkobj.desc.push(item)
          })
        }
      } else {
        _self.idArr = []
        _self.fkobj.idArr = []
        _self.fkobj.desc = []
      }
    }
    this.searchTable()
  },
  mounted() {
    let nodeRef = document.getElementById('fkDim');
    if(nodeRef) nodeRef.getElementsByClassName('ark-select-input')[0].focus();
    this.defaultSelectedIds.forEach((id) => {
      if (this.fkobj.idArr.indexOf(id) === -1) {
        this.fkobj.idArr.push(id);
      }
    });
    let _self = this
    String.prototype.format = function () {  //占位符
      if (arguments.length == 0) return this;
      var param = arguments[0];
      var s = this;
      if (typeof (param) == 'object') {
        for (var key in param)
          s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
        return s;
      } else {
        for (var i = 0; i < arguments.length; i++)
          s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
        return s;
      }
    }
    // let str = ['world']
    // console.log("hello {0}".format(str))
  }
}