<template>
  <div class="dialog-input">
    <label for="">{{item.coldesc}}:</label>
    <div class="input-auto" v-if="item.display === 'OBJ_FK'">
      <el-autocomplete
        class="inline-input"
        :ref="'autocomplete'+item.colname"
        v-model="item.value"
        :fetch-suggestions="querySearch"
        :placeholder="$t('guideTagPop.enterContent')"
        @keyup.native="inputKeyUp(item,$event)"
        @keyup.enter.native="autocompleteEnter(item,$event)"
        :trigger-on-focus="false"
        @select="handleSelect"
      ></el-autocomplete>
      <el-popover
        class="popover-icon"
        placement="bottom"
        title=""
        trigger="manual"
        v-model="popoverShow[item.colname]"
        v-if="item.fkobj && (item.fkobj.fkdisplay == 'drp' || item.fkobj.fkdisplay == 'mrp') "
      >

        <i class="iconfont" slot="reference" v-if="item.fkobj.fkdisplay == 'drp'" @click.stop="filterInputName(item)">&#xe621;</i>
        <i class="iconfont" slot="reference" v-if="item.fkobj.fkdisplay == 'mrp'" @click.stop="filterInputName(item)">&#xe622;</i>

        <fk-table
          class="view-fktable selection-dialog"
          :single="item.fkobj.fkdisplay == 'drp'?true:false"
          @pop="fktableShow"
          :fkid="item.colid"
          :item="getQueryParams(item)"
          :precolnameslist="item.precolnameslist"
          :colname="item.colname"
          :itemdata='item'
          v-if="popoverShow[item.colname]">

        </fk-table>
      </el-popover>
    </div>
    <div class="input-text" v-else>
      <input @keyup="inputKeyUp(item,$event)" @keyup.enter="configInputEnter(item)" type="text" v-model="item.value">
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import FkTable from '../tablelist/fktable.vue'
  // import i18n from '../../assets/js/i18n'

  export default {
    name: 'dialogInput',
    data() {
      return {
        popoverShow: {},
        SingleSelect: {
          show: false
        },
        queryList: [],
        ishandleSelect: false
      }
    },
    components: {
      FkTable
    },
    props: {

      item: {//后台返回的数据，针对一个字段的
        type: Object
      }
    },

    beforeCreate() {
      this.$t = $i18n.t.bind($i18n)
    },
    
    mounted() {
      let self = this
      $(document).on('click', function (e) {
        $.each(self.popoverShow, function (item) {
          self.popoverShow[item] = false
        })
      })


    },
    updated() {
      //给autocomplete添加blur事件 element UI1.0的bug
      if (this.$refs['autocomplete' + this.item.colname]) {
        this.$refs['autocomplete' + this.item.colname].$el.querySelector('input').addEventListener('blur', this.autocompleteBlur)
      }

    },
    methods: {
      chineseEng(str) {  //中英文转换
        var tmp = "";
        if (!str) {
          return tmp
        }
        if (str.length == 0) {
          return tmp
        }
        for (var i = 0; i < str.length; i++) {
          if (str.charCodeAt(i) == 65292) {// 如果位于全角！到全角～区间内  str.charCodeAt(i) >= 65281 && str.charCodeAt(i) <= 65374

            tmp += String.fromCharCode(str.charCodeAt(i) - 65248)
          } else if (str.charCodeAt(i) == 12288) {//全角空格的值，它没有遵从与ASCII的相对偏移，必须单独处理
            tmp += ' ';
          } else {// 不处理全角空格，全角！到全角～区间外的字符
            tmp += str[i];
          }
        }
        var pattern = new RegExp("'|@|`|~|#|&");
        var rs = "";
        for (var i = 0; i < tmp.length; i++) {
          rs = rs + tmp.substr(i, 1).replace(pattern, '');
        }
        return rs;
      },
      handleSelect(item) {
        // console.log('handleSelect',item)
        this.$emit('getFkChooseItem', {colname: this.item.colname, pid: item.id})
        this.ishandleSelect = true
      },
      configInputEnter(item) {


        this.$emit('configInputEnter', item)
      },
      autocompleteBlur() {
        let self = this
        setTimeout(function () {
          if (self.item.value && !self.ishandleSelect) {
            self.inQueryList(self.item, function (list) {
              if (list.length > 0) {
                self.item.value = list[0].value,
                  self.item.pid = list[0].id
                self.$emit('deleteSelectInput', self.item)
                // console.log('deleteSelectInput')
                self.$emit('getFkChooseItem', {colname: self.item.colname, pid: self.item.pid})
                self.$emit('selectConfigBlur')
              }
              else {
                self.$emit('getInputParams', self.item)
                // console.log('autocompleteBlur',self.item)
              }
            })
          }
          self.ishandleSelect = false
        }, 100)

      },
      autocompleteEnter(item, event) {
        let self = this
        if (this.item.value) {
          self.inQueryList(self.item, function (list) {
            if (list.length > 0) {
              self.item.value = list[0].value,
                self.item.pid = list[0].id
              self.$emit('getFkChooseItem', {colname: self.item.colname, pid: self.item.pid, enter: true})
            }
            else {
              let enterItem = self.item
              enterItem.enter = true
              self.$emit('getInputParams', enterItem)
            }
          })
        }
      },
      inputKeyUp(item) {
        item.value = this.chineseEng(item.value)
        if (!item.value) {
          this.$emit('deleteSelectParams', item)
        }
      },
      inQueryList(item, callback) {
        let self = this;
        let query = {
          ak: item.value,
          colid: item.colid,
          fixedcolumns: {},
        };
        if (item.precolnameslist && item.precolnameslist.length > 0) {
          query.fixedcolumns.precolnameslist = JSON.stringify(item.precolnameslist);
        }
        query.fixedcolumns = JSON.stringify(query.fixedcolumns);
        axios({
          method: 'post',
          url: '/p/cs/fuzzyquerybyak',
          params: query
        })
          .then(function (res) {
            callback(res.data.data)
          })
      },
      querySearch(queryString, cb) {
        let self = this
        self.item.value = self.chineseEng(queryString)

        queryString = self.chineseEng(queryString)

        this.$refs['autocomplete' + self.item.colname].$refs['input']['currentValue'] = queryString
        self.item.value = queryString
        $(event.target).value = queryString
        if (queryString) {
          let query = {
            ak: queryString,
            colid: self.item.colid,
            fixedcolumns: {},
          };
          if (self.item.precolnameslist && self.item.precolnameslist.length > 0) {
            query.fixedcolumns.precolnameslist = JSON.stringify(self.item.precolnameslist);
          }
          query.fixedcolumns = JSON.stringify(query.fixedcolumns);

          axios({
            method: 'post',
            url: '/p/cs/fuzzyquerybyak',
            params: query
          })
            .then(function (res) {
              self.queryList = res.data.data

              if (res.data.data.length > 0) {
                cb(res.data.data)
                $('.fkAutocomplete' + self.item.colname).css('display', 'inline-block')
              } else {
                cb([])
                $('.fkAutocomplete' + self.item.colname).css('display', 'none')
              }

            })
        } else {
          cb([])
          $('.fkAutocomplete' + self.item.colname).css('display', 'none')
        }

      },
      filterInputName(item) {
        let self = this

        $(document).trigger('click')
        $('.pop-dialog-bg').trigger('click')

        if (item.refcolval) {
          if (item.fkobj.fkdisplay == 'drp' || item.fkobj.fkdisplay == 'mrp') {
            self.getQueryClick(item, function () {
              self.popoverShow[item.colname] = true
            })
          } else {
            if (item.fkobj.fkdisplay == 'pop') {
              self.getQueryClick(item, function () {
                self.SingleSelect.show = true
                self.SelectionData.item = item
                self.getSelectConfig(item) // 获取单选框输入配置
                self.getSelectData(item) //获取单选框表格数据
              })
            } else {
              self.fkDialog.lists = {}
              self.fkDialog.dialog = true
            }

          }
        } else {
          if (item.fkobj.fkdisplay == 'drp' || item.fkobj.fkdisplay == 'mrp') {
            self.popoverShow[item.colname] = true
          } else {
            if (item.fkobj.fkdisplay == 'pop') {   //弹框单选
              self.SingleSelect.show = true
              self.SelectionData.item = item
              self.getSelectConfig(item) // 获取单选框输入配置
              self.getSelectData(item) //获取单选框表格数据
            } else {  //弹框多选

              if (self.itemdata.pid != -1 && self.itemdata.pid) { //存在值
                self.fkDialog.lists = self.itemdata.valuedata
              } else {
                self.fkDialog.lists = {}
              }


              self.fkDialog.dialog = true
              setTimeout(function () {
                $('.el-dialog--medium').trigger('click')
              })

            }
          }
        }
      },
      getQueryParams() {

      },
      fktableShow(val) {
        let self = this
        let chooseitem = val.item
        if (jQuery.isArray(chooseitem)) {  //多选
          self.SingleSelect.show = false
          if (val.idArr.length > 0) {
            self.item.pid = val.idArr.join(',')
          } else {
            self.item.pid = ''
          }

          self.item.value = val.desc.join(',')
          self.$emit('getFkChooseItem', self.item)
        } else {
          self.SingleSelect.show = false
          self.item.pid = val.idArr.join(',')
          self.$set(self.item, 'value', val.desc.join(','))
          //self.itemdata.valuedata = item[val.tabth.colname].val
          //console.log('self.itemdata.valuedata',self.itemdata.valuedata)
          self.$emit('getFkChooseItem', self.item)
        }

      },
    }
  }
</script>

<style lang="less">
  .dialog-input {
    label {
      width: 90px;
      display: inline-block;
      text-align: right;
      line-height: 24px;
      height: 24px;
      float: left;
      padding-right: 6px;
    }
    input {
      background: #fff !important;
    }
    .input-text,
    .input-auto {
      display: inline-block;
      width: calc(~"100% - 96px")
    }
    .input-text {
      input {
        width: 100%;
        border: 1px solid #bfcbd9;
        border-radius: 2px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 0 4px;
        height: 22px;
        box-sizing: border-box;
      }
    }
    .popover-icon {
      right: 7px;
    }
    .el-autocomplete {
      .el-input__inner {
        height: 24px;
        border: 1px solid #bfcbd9;
        border-radius: 2px;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        padding: 0 15px 0 4px;
        margin-right: 10px;
      }
    }
  }
</style>


