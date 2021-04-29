import commonUtils from '@burgeon/project-logic/config/config/commonUtils.js';
import ChineseDictionary from 'framework/assets/js/ChineseDictionary';
export default {
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
  created() {
    console.log(this);
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
  computed: {
    queryListUrl() {
      return commonUtils.splitServiceID('/p/cs/QueryList');
    },
  },
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
      isak: 0,
      active: -1,
      visible: 1,
      idArr: [],
      AllRows: [],
      dataEmpty: {
        flag: true,
        message: '数据加载中……'
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
    colorChange(item, rowindex, event) {
      let _self = this
      // _self.active = index
      if (!_self.single) {

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
    fkDimSearch() {
      this.visible = 1
      clearTimeout(this.searchTimeout)
      this.searchTimeout = setTimeout(() => {
        this.searchTable(true)
      }, 500)
    },
    searchTable(fkDim) {
      if (this.tabrow.length > 0) {
      } else {
        this.dataEmpty.flag = true
        this.dataEmpty.message = '数据加载中……'
      }

      this.formObj.startindex = (this.visible - 1) * this.range
      this.formObj.range = this.range
      //下拉多选接口改为newQueryList
      // if (this.itemdata && this.itemdata.fkdisplay == 'mrp') {
      //   // url = '/p/cs/newQueryList'
      //   url = '/p/cs/QueryList' // 下拉多选改为QueryList，不知道为啥要用newQueryList
      // }
      // 配货单下拉
      if (this.itemdata && this.itemdata.fkdisplay == 'mrp') {
        if (this.colname == 'OC_B_PURCHASE_ORDER_ID' || this.colname == 'OC_B_SEND_OUT_ID') {
          this.formObj.isdroplistsearch = false;
        }
      }
      if (fkDim) {
        if (this.fkDimVal) {
          this.formObj.ak = this.fkDimVal.toString().toLocaleUpperCase()
        } else {
          delete this.formObj.ak
        }
        // 配货单下拉
        if (this.itemdata && this.itemdata.fkdisplay == 'mrp') {
          if (this.colname == 'OC_B_PURCHASE_ORDER_ID' || this.colname == 'OC_B_SEND_OUT_ID') {
            this.formObj.isdroplistsearch = false;
          }
        } else {
          this.formObj.isdroplistsearch = true;
        }

        this.formObj.refcolid = this.fkid;
        // url = '/p/cs/newQueryList'
        // url = '/p/cs/QueryList'
      }

      let _self = this;
      const params = new FormData();
      params.append('searchdata', JSON.stringify(this.formObj));
      this.service.common.QueryList(params)
      .then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          console.log(_self.version);
          let dataArr = _self.version === '1.4' ? res.data.data : res.data.datas
          console.log(dataArr);
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
            _self.dataEmpty.message = '数据加载中……'
          } else {
            _self.dataEmpty.flag = true
            _self.dataEmpty.message = '暂无数据'
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
  created: function () {
    let _self = this
    _self.ChineseDictionary = ChineseDictionary

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

    // C_UP_ID 99
    // _self.item = {C_UP_ID:99}
    if (_self.item) {
      _self.formObj.fixedcolumns = _self.item
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
    $('#fkDim').focus();
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