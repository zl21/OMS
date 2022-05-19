<template>
  <div class="fktable">
    <input v-if="inputBox == true" type="text" id="fkDim" v-model="fkDimVal" @input="fkDimSearch()" />
    <div class="table">
      <table>
        <thead>
          <tr>
            <th v-for="(item, index) in tabth" :key="index" v-if="item.colname == 'ID'">
              <input type="checkbox" @click.stop="checkBoxAll" v-model="checkboxAll" v-if="!single" />
              {{ChineseDictionary.NUMBER}}
            </th>
            <th
              v-for="(item, index) in tabth"
              :key="index"
              v-if="item.colname != 'ID'"
            >{{item.name}}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in tabrow"
            :key="index"
            :data-index="index"
            :class="{'selected':active == index}"
            @dblclick.stop="colorChange(item[0],index,$event)"
          >
            <td :data-id="item[0]">
              <label>
                <input
                  type="checkbox"
                  name
                  @click.stop="checkBoxChange($event,index,item)"
                  v-if="!single"
                  :data="fkobj.idArr.indexOf(item[0]) >= 0"
                  :checked="fkobj.idArr.indexOf(item[0]) >= 0 ?true:false"
                />
                <span v-if="!single">{{index + startindex + 1}}</span>
              </label>
              <input
                type="radio"
                name="fktableSingle"
                :checked="fkobj.idArr.indexOf(item[0]) >= 0 ?true:false"
                @click.stop="checkBoxChange($event,index,item)"
                v-if="single"
              />
              <span v-if="single" @click.stop="indexClick(item, index)">{{index + startindex + 1}}</span>
            </td>
            <td
              v-for="(temp, index2) in item"
              :key="index2"
              v-if="index2 > 0"
              :data-val="tabth[index2].colname"
              @click.stop="colorChange(item,index,$event)"
            >{{temp}}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="dataEmpty.flag">
        <span>{{dataEmpty.message}}</span>
      </p>
    </div>
    <div class="page" v-if="totalRowCount>0 && range<=totalRowCount">
      <el-pagination
        small
        layout="prev, pager, next"
        @current-change="currentchange"
        :page-size="range"
        :current-page="Number(visible)"
        :total="Math.ceil(totalRowCount/range) > 500 ? 500*range : totalRowCount"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import ChineseDictionary from '../../../assets/js/ChineseDictionary';
import i18n from '../../../assets/js/i18n'

export default {
  name: 'fktable',
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
    itemdata: {}

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
        message: `${this.$t('tips.loading')}……`
      }  //数据是否为空
    }
  },

  methods: {
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
      _self.checkboxAll=!_self.checkboxAll
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
        this.dataEmpty.message = `${this.$t('tips.loading')}……`
      }

      this.formObj.startindex = (this.visible - 1) * this.range
      this.formObj.range = this.range
      let url = '/p/cs/QueryList'
      //下拉多选接口改为newQueryList
      if (this.itemdata && this.itemdata.fkdisplay == 'mrp') {
        url = '/p/cs/newQueryList'
      }
      // 配货单下拉
      if (this.itemdata && this.itemdata.fkdisplay == 'mrp') {
         if ( this.colname=='OC_B_PURCHASE_ORDER_ID'||this.colname=='OC_B_SEND_OUT_ID'){
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
          if ( this.colname=='OC_B_PURCHASE_ORDER_ID'||this.colname=='OC_B_SEND_OUT_ID'){
            this.formObj.isdroplistsearch = false;
          }
        }else {
          this.formObj.isdroplistsearch = true;
        }

        this.formObj.refcolid = this.fkid;
        url = '/p/cs/newQueryList'
      }

      let _self = this;
      this.$ajax.dataAjax(url, { searchdata: JSON.stringify(this.formObj) }, function (res) {
        if (res.code == 0) {
          _self.tabrow = []
          _self.tabth = res.datas.tabth
          _self.totalRowCount = res.datas.totalRowCount
          _self.startindex = res.datas.start
          _self.range = res.datas.defaultrange
          res.datas.tabth.forEach((item, index) => {
            if (item.isak && item.colname != 'ID') {
              _self.isak = index
            }
          })

          if (res.datas.row.length > 0) {
            _self.dataEmpty.flag = false
            _self.dataEmpty.message = `${_self.$t('tips.loading')}……`
          } else {
            _self.dataEmpty.flag = true
            _self.dataEmpty.message = _self.$t('tips.noData')
          }
          _self.AllRows = res.datas.row;

          res.datas.row.forEach((item, index) => {
            let arr = []

            res.datas.tabth.forEach((temp, index) => {
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
      })

    }
  },

  beforeCreate() {
    this.$t = i18n.t.bind(i18n)
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
</script>

<style lang="less">
.fktable {
  width: 300px;
  min-width: 150px;
  max-height: 398px;
  box-sizing: border-box;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  border: 1px solid #d1dbe5;
  padding: 5px;

  .searchlist {
    margin-bottom: 6px;
    height: 24px;
    .el-autocomplete {
      float: left;
      input[type="text"] {
        height: 24px;
        border-radius: 2px;
        border: 1px solid #d2d2d2;
        font-size: 12px;
        padding: 3px 10px;
        width: 200px;
      }
    }

    .buttonGrops {
      float: right;
      font-size: 0px;
      button {
        width: 66px;
        height: 24px;
        border-radius: 2px;
        text-align: center;
        font-size: 12px;
      }

      button:first-child {
        margin-right: 6px;
        background-color: #fd6442;
        color: #fff;

        &:hover {
          background-color: #e6502f;
          color: #f3cec5;
        }
      }

      button:last-child {
        border: 1px solid #fd6442;
        color: #fd6442;
        background-color: white;

        &:hover {
          opacity: 0.6;
        }
      }
    }
  }

  .table {
    flex: 1;
    width: 100%;
    overflow: auto;
    table {
      width: 100%;
      flex-direction: column;

      flex: 1;
      color: #575757;
      thead {
        background-color: #f5f6fa;
        height: 26px;
        min-width: 100%;

        tr {
          th {
            height: 26px;
            line-height: 26px;
            white-space: nowrap;
            padding: 0 5px;
            text-align: left;
            min-width: 50px;
          }

          th:first-child {
            min-width: 30px;
          }
        }
      }

      tbody {
        flex: 1;
        min-width: 100%;

        tr {
          border-bottom: 1px solid #d8d8d8;

          td {
            height: 23px;

            line-height: 23px;
            white-space: nowrap;
            padding: 0 5px;
            text-align: left;
            min-width: 50px;
          }

          td:first-child {
            min-width: 30px;
            span {
              margin-left: 5px;
            }
          }
        }

        tr.selected {
          background-color: #f8f7f7;
        }
      }
    }

    p {
      text-align: center;
      font-weight: normal;
      color: #575757;
    }
  }

  .page {
    height: 14px;
    margin-top: 6px;
    button {
      height: 14px;
      width: 14px;
      line-height: 14px;
      padding: 0;
      min-width: 14px;
      border-width: 0;

      &:hover {
        color: #d4dade;
      }
    }

    ul {
      li {
        height: 14px;
        padding: 0 4px;
        line-height: 14px;
        min-width: auto;
        width: auto;
        border: none;
      }

      li:last-child {
        height: 14px;
        padding: 0;
        line-height: 14px;
        min-width: 14px;
      }
    }
  }

  /* 覆盖饿了么UI原有样式 */
    .el-pagination--small li.more::before {
      line-height: 14px;
    }
    .el-pagination--small .el-pager li,
    .el-pagination--small .el-pager li.btn-quicknext {
      height: 14px;
      line-height: 14px;
    }
}
</style>

